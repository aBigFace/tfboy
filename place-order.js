/**
 * 提交商城订单 place-order/mallOrder/placeOrder（与小程序 apiSubmitOrder 一致）
 *
 * ⚠️ 会真实下单，请先改好 body 再执行。
 *
 *   node place-order.js
 *
 * 覆盖请求体：
 *   PLACE_ORDER_BODY='{"payMethod":null,...}' node place-order.js
 *   PLACE_ORDER_REQUEST_JSON=./my-place-order.json node place-order.js
 *
 * 默认经快代理隧道（kdl tps）：TF_KDL_TUNNEL_PROXY 或 TF_KDL_TUNNEL_HOST/PORT/USER/PASS（内置默认值与 test-kdl-proxy 一致，建议 .env 覆盖）。
 *   仍用 getkps 动态取线：TF_KDL_USE_GETKPS=1（TF_KDL_GETKPS_URL、TF_KDL_PROXY_AUTH）
 *   青果隧道：TF_PLACE_ORDER_TUNNEL=1 且 TF_TUNNEL_AUTHKEY / TF_TUNNEL_AUTHPWD
 *   或整段代理 URL：TF_PLACE_ORDER_PROXY / TF_ORDER_FEE_PROXY / HTTP(S)_PROXY
 * 直连：TF_PLACE_ORDER_DIRECT=1 或 TF_ORDER_FEE_DIRECT=1
 * 静默一行路由：TF_PLACE_ORDER_LOG=0 或 TF_ORDER_FEE_LOG=0
 * 校验是否走代理（比出口 IP）：TF_PLACE_ORDER_VERIFY_PROXY=1 或 TF_ORDER_FEE_VERIFY_PROXY=1
 *
 * 默认连续尝试下单 20 次、间隔 500ms，成功即停并写入结果；可覆盖：
 *   PLACE_ORDER_ATTEMPTS=20 PLACE_ORDER_INTERVAL_MS=500 node place-order.js
 * 每次尝试会打印耗时（ms）：自即将发出 POST 起至解析完响应 JSON 止。
 *
 * Token：account-login.json（或 TF_LOGIN_JSON）
 * 结果：place-order.json
 */

const fs = require("fs");
const path = require("path");
const { fetch: fetchWithDispatcher, ProxyAgent } = require("undici");

const BASE = "https://app.tfent.cn";

/**
 * 快代理 getkps：必须带 f_auth=1，文本行为 ip:port:用户名:密码（见文档 generateType=1）
 * 与 server/src/proxyCache 默认保持一致；覆盖请设 TF_KDL_GETKPS_URL
 * 使用官方生产域 kps.kdlapi.com（dev 域名易导致行为不一致）；签名若不匹配请用控制台重新生成 API 链接
 */
const KDL_GETKPS_URL_DEFAULT =
  "https://kps.kdlapi.com/api/getkps?secret_id=obh8w6r3lnmvq197he59&signature=ea9i061rl9knf73j47dgqzmr7f9t7ouq&format=text&sep=1&generateType=1&f_auth=1";

/** 快代理订单里「代理鉴权」用户名:密码；getkps 一行已含账密时以 API 为准，否则拼进 ProxyAgent */
const KDL_PROXY_AUTH_DEFAULT = "jeinmabt:w6ykxdyb";

/** 快代理隧道（*.kdltps.com）；默认走此出口。请用 .env 覆盖账密与入口 */
const KDL_TUNNEL_DEFAULT = {
  host: "y440.kdltps.com",
  port: "15818",
  user: "t17545308493289",
  pass: "yix3qvem",
};

/** 未设 TF_TUNNEL_HOST/PORT 时使用的隧道入口（仅 TF_PLACE_ORDER_TUNNEL=1 时） */
const DEFAULT_TUNNEL_HOST = "tun-xqcbgv.qg.net";
const DEFAULT_TUNNEL_PORT = "21864";

const DEFAULT_PLACE_ATTEMPTS = 20;
const DEFAULT_PLACE_INTERVAL_MS = 500;

const LOGIN_JSON_PATH =
  process.env.TF_LOGIN_JSON ||
  path.join(__dirname, "account-login.json");

const OUTPUT_JSON_PATH = path.join(
  __dirname,
  path.basename(__filename, path.extname(__filename)) + ".json"
);

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf254162e) XWEB/18163";

/** 从脚本所在目录读取 .env（不覆盖已有 process.env），与 account-login.js 一致 */
function loadEnvFile() {
  const filePath = path.join(__dirname, ".env");
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadEnvFile();

/** 仅用于代理校验 */
const EXIT_IP_CHECKS = [
  { url: "https://api.ipify.org?format=json", kind: "json" },
  { url: "https://api64.ipify.org?format=json", kind: "json" },
  { url: "https://icanhazip.com/", kind: "text" },
];

/** 与提供 curl 的 -d 一致（请按需修改收货人与金额等） */
const DEFAULT_BODY = {
  payMethod: null,
  chkParentAuth: 0,
  orderPrice: 99,
  buyItemInfos: [
    {
      companyId: 2,
      orgId: 35,
      remark: "",
      productList: [
        {
          skuId: 2937,
          num: 1,
          pullerId: null,
          expectedDeliveryTime: null,
        },
      ],
    },
  ],
  receiverInfo: {
    id: 15407893,
    receiver: "陈芳",
    receiverPhone: "15883762356",
    receiverProvince: "四川省",
    receiverCity: "巴中市",
    receiverCounty: "巴州区",
    receiverAddress: "王爷庙1号",
    bookDefaultStatus: 1,
    bookType: 1,
  },
  remark: "",
  orderSource: 3,
  validCode: "",
  orderType: 1,
  deliveryMethod: 2,
  cartIds: [],
  applyType: 1,
};

function resolveRequestBody() {
  const filePath = process.env.PLACE_ORDER_REQUEST_JSON;
  if (filePath) {
    const abs = path.isAbsolute(filePath)
      ? filePath
      : path.join(__dirname, filePath);
    return JSON.parse(fs.readFileSync(abs, "utf8"));
  }
  const raw = process.env.PLACE_ORDER_BODY;
  if (raw && String(raw).trim()) {
    return JSON.parse(raw);
  }
  return DEFAULT_BODY;
}

function loadAccessToken() {
  if (!fs.existsSync(LOGIN_JSON_PATH)) {
    throw new Error(
      `找不到登录文件: ${LOGIN_JSON_PATH}\n请先运行 node account-login.js`
    );
  }
  const login = JSON.parse(fs.readFileSync(LOGIN_JSON_PATH, "utf8"));
  const token = login.access_token;
  if (!token) throw new Error(`${LOGIN_JSON_PATH} 中缺少 access_token`);
  return token;
}

function routeLogDisabled() {
  return (
    process.env.TF_PLACE_ORDER_LOG === "0" ||
    process.env.TF_ORDER_FEE_LOG === "0"
  );
}

function verifyProxyWanted() {
  return (
    process.env.TF_PLACE_ORDER_VERIFY_PROXY === "1" ||
    process.env.TF_ORDER_FEE_VERIFY_PROXY === "1"
  );
}

/** 文本行：ip:port 或 ip:port:user:pass（快代理 f_auth=1 + generateType=1） */
function parseKdlProxyLine(line) {
  const t = String(line ?? "").trim();
  if (!t || /^ERROR\s*\(/i.test(t)) return null;
  const parts = t.split(":");
  if (parts.length >= 4) {
    const host = parts[0];
    const port = Number(parts[1]);
    const user = parts[2];
    const pass = parts.slice(3).join(":");
    if (
      Number.isFinite(port) &&
      port >= 1 &&
      port <= 65535 &&
      host &&
      user &&
      pass
    ) {
      return { host, port, user, pass };
    }
  }
  const m2 = t.match(/^([\w.-]+):(\d+)\s*$/);
  if (!m2) return null;
  const port = Number(m2[2]);
  if (!Number.isFinite(port) || port < 1 || port > 65535) return null;
  return { host: m2[1], port };
}

function parseAllKdlProxiesFromBody(rawText) {
  const raw = String(rawText ?? "").replace(/^\uFEFF/, "");
  const trimmed = raw.trim();
  if (trimmed.startsWith("{")) {
    let j;
    try {
      j = JSON.parse(trimmed);
    } catch {
      j = null;
    }
    if (j && j.code != null && Number(j.code) !== 0 && j.msg) {
      throw new Error(`快代理取号失败 code=${j.code}: ${j.msg}`);
    }
    const list = j?.data?.proxy_list;
    if (Array.isArray(list) && list.length) {
      const out = [];
      for (const item of list) {
        const rec = parseKdlProxyLine(String(item));
        if (rec) out.push(rec);
      }
      if (out.length) return out;
    }
  }
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const out = [];
  for (const line of lines) {
    if (/^ERROR\s*\(/i.test(line)) {
      throw new Error(`快代理取号 ${line.slice(0, 200)}`);
    }
    const rec = parseKdlProxyLine(line);
    if (rec) out.push(rec);
  }
  if (!out.length) {
    throw new Error(`快代理无可用代理行：${trimmed.slice(0, 200)}`);
  }
  return out;
}

/** @param {Set<string> | undefined} excludeHostPorts `host:port` */
function pickKdlRecord(records, excludeHostPorts) {
  const ex = excludeHostPorts || new Set();
  const keyOf = (r) => `${r.host}:${r.port}`;
  let candidates = records.filter((r) => !ex.has(keyOf(r)));
  if (!candidates.length) {
    candidates = records;
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function recordToProxyUrl(rec) {
  const { host, port } = rec;
  if (rec.user && rec.pass) {
    return `http://${encodeURIComponent(rec.user)}:${encodeURIComponent(rec.pass)}@${host}:${port}`;
  }
  const authRaw = (
    process.env.TF_KDL_PROXY_AUTH != null &&
    String(process.env.TF_KDL_PROXY_AUTH).trim() !== ""
      ? String(process.env.TF_KDL_PROXY_AUTH).trim()
      : KDL_PROXY_AUTH_DEFAULT
  ).trim();
  if (authRaw) {
    const idx = authRaw.indexOf(":");
    if (idx <= 0) {
      throw new Error("代理鉴权格式应为 user:pass（TF_KDL_PROXY_AUTH 或 KDL_PROXY_AUTH_DEFAULT）");
    }
    const user = authRaw.slice(0, idx);
    const pass = authRaw.slice(idx + 1);
    return `http://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}`;
  }
  return `http://${host}:${port}`;
}

function hostPortFromProxyUrl(proxyUrl) {
  try {
    const u = new URL(proxyUrl);
    const p = u.port || (u.protocol === "https:" ? "443" : "80");
    return `${u.hostname}:${p}`;
  } catch {
    return null;
  }
}

/** 快代理隧道 HTTP 代理 URL（与 test-kdl-proxy.js 一致） */
function resolveKdlTunnelProxyUrl() {
  const single = (
    process.env.TF_KDL_TUNNEL_PROXY ||
    process.env.TF_KDL_HTTP_PROXY ||
    ""
  ).trim();
  if (single) return single;

  const host = (
    process.env.TF_KDL_TUNNEL_HOST || KDL_TUNNEL_DEFAULT.host
  ).trim();
  const port = (
    process.env.TF_KDL_TUNNEL_PORT || KDL_TUNNEL_DEFAULT.port
  ).trim();
  const user = (
    process.env.TF_KDL_TUNNEL_USER || KDL_TUNNEL_DEFAULT.user
  ).trim();
  const pass = (
    process.env.TF_KDL_TUNNEL_PASS || KDL_TUNNEL_DEFAULT.pass
  ).trim();
  return `http://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}`;
}

function describeFetchError(err) {
  const parts = [];
  let e = err;
  const seen = new Set();
  let depth = 0;
  while (e && typeof e === "object" && !seen.has(e) && depth < 8) {
    seen.add(e);
    depth += 1;
    if (typeof e.message === "string" && e.message && !parts.includes(e.message)) {
      parts.push(e.message);
    }
    if (e.code != null && String(e.code)) parts.push(`code=${e.code}`);
    e = e.cause;
  }
  return parts.length ? parts.join(" ← ") : String(err);
}

/** CONNECT 阶段代理返回非 200（如 502/503/407），换一条线路往往可恢复 */
function isProxyTunnelFailure(err) {
  const s = describeFetchError(err);
  return (
    /Proxy response\s*\(\d+\)\s*!==\s*200/i.test(s) ||
    /when HTTP Tunneling/i.test(s)
  );
}

/** 当前脚本为「快代理 getkps 动态取线」时可自动换线；固定隧道 / 显式 URL / 青果 / 直连不换 */
function usesKdlDynamicProxy() {
  if (
    process.env.TF_PLACE_ORDER_DIRECT === "1" ||
    process.env.TF_ORDER_FEE_DIRECT === "1"
  ) {
    return false;
  }
  const explicit = [
    process.env.TF_PLACE_ORDER_PROXY,
    process.env.TF_ORDER_FEE_PROXY,
    process.env.HTTP_PROXY,
    process.env.HTTPS_PROXY,
  ]
    .map((s) => (s && String(s).trim()) || "")
    .find(Boolean);
  if (explicit) return false;
  if (process.env.TF_PLACE_ORDER_TUNNEL === "1") return false;
  return process.env.TF_KDL_USE_GETKPS === "1";
}

/**
 * 从快代理 getkps 拉列表后 **随机选一条**（可排除刚失败的 host:port，避免永远打第一条）。
 */
async function fetchKdlPlaceOrderProxyUrl(excludeHostPorts) {
  const api =
    (process.env.TF_KDL_GETKPS_URL &&
      String(process.env.TF_KDL_GETKPS_URL).trim()) ||
    KDL_GETKPS_URL_DEFAULT;
  const t0 = performance.now();
  /** 与官方「API 接口 · Node.js」一致：gzip 加速取号；undici fetch 会自动解压 */
  const res = await fetchWithDispatcher(api, {
    method: "GET",
    headers: {
      Accept: "text/plain,*/*",
      "Accept-Encoding": "gzip",
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`快代理 getkps HTTP ${res.status}: ${text.slice(0, 120)}`);
  }
  const list = parseAllKdlProxiesFromBody(text);
  const rec = pickKdlRecord(list, excludeHostPorts);
  const { host, port } = rec;
  const elapsed = Math.round(performance.now() - t0);
  if (!routeLogDisabled()) {
    const authHint = rec.user
      ? "（取号行内账密）"
      : "（取号仅 ip:port，将用控制台固定鉴权 KDL_PROXY_AUTH_DEFAULT）";
    const totalHint =
      list.length > 1 ? ` 共${list.length}条随机/剔除失败` : " 订单仅1条出口";
    console.log(
      `[place-order] 快代理取号 ${host}:${port} ${authHint}${totalHint} · 接口 ${elapsed}ms`
    );
  }
  return recordToProxyUrl(rec);
}

function resolveTunnelProxyUrlIfEnabled() {
  if (process.env.TF_PLACE_ORDER_TUNNEL !== "1") return null;
  const key = (process.env.TF_TUNNEL_AUTHKEY || "").trim();
  const pwd = (process.env.TF_TUNNEL_AUTHPWD || "").trim();
  const host = (process.env.TF_TUNNEL_HOST || DEFAULT_TUNNEL_HOST).trim();
  const port = (process.env.TF_TUNNEL_PORT || DEFAULT_TUNNEL_PORT).trim();
  if (!key || !pwd) {
    throw new Error(
      "TF_PLACE_ORDER_TUNNEL=1 时需配置 TF_TUNNEL_AUTHKEY 与 TF_TUNNEL_AUTHPWD"
    );
  }
  return `http://${encodeURIComponent(key)}:${encodeURIComponent(pwd)}@${host}:${port}`;
}

/**
 * @returns {Promise<string>} 空字符串表示直连
 */
async function resolvePlaceOrderProxyUrlAsync() {
  if (
    process.env.TF_PLACE_ORDER_DIRECT === "1" ||
    process.env.TF_ORDER_FEE_DIRECT === "1"
  ) {
    return "";
  }

  const explicit = [
    process.env.TF_PLACE_ORDER_PROXY,
    process.env.TF_ORDER_FEE_PROXY,
    process.env.HTTP_PROXY,
    process.env.HTTPS_PROXY,
  ]
    .map((s) => (s && String(s).trim()) || "")
    .find(Boolean);
  if (explicit) return explicit;

  const tunnel = resolveTunnelProxyUrlIfEnabled();
  if (tunnel) return tunnel;

  if (process.env.TF_KDL_USE_GETKPS === "1") {
    return fetchKdlPlaceOrderProxyUrl();
  }

  return resolveKdlTunnelProxyUrl();
}

function logPlaceOrderRoute(proxyUrl) {
  if (routeLogDisabled()) return;
  if (!proxyUrl) {
    console.log("[place-order] 直连", BASE.replace(/^https:\/\//, ""));
    return;
  }
  try {
    const u = new URL(proxyUrl);
    const port =
      u.port ||
      (u.protocol === "https:" ? "443" : u.protocol === "http:" ? "80" : "");
    const ep = port ? `${u.hostname}:${port}` : u.hostname;
    const via = (() => {
      if (process.env.TF_PLACE_ORDER_TUNNEL === "1") return "青果隧道";
      if (process.env.TF_KDL_USE_GETKPS === "1") return "快代理 getkps";
      if (u.hostname && String(u.hostname).includes("kdltps.com")) {
        return "快代理隧道";
      }
      return "HTTP 代理";
    })();
    console.log(`[place-order] 经${via}`, ep);
  } catch {
    console.log("[place-order] 经 HTTP 代理（已配置）");
  }
}

async function fetchPublicIp(dispatcher) {
  let lastErr = null;
  for (const { url, kind } of EXIT_IP_CHECKS) {
    try {
      const res = await fetchWithDispatcher(url, {
        method: "GET",
        dispatcher: dispatcher || undefined,
        headers: {
          Accept: kind === "json" ? "application/json" : "text/plain,*/*",
          "User-Agent": USER_AGENT,
        },
      });
      if (!res.ok) {
        lastErr = new Error(`${url} HTTP ${res.status}`);
        continue;
      }
      const raw = await res.text();
      if (kind === "json") {
        const j = JSON.parse(raw);
        const ip = j.ip;
        if (ip && typeof ip === "string") return ip.trim();
        lastErr = new Error(`${url} JSON 无 ip`);
        continue;
      }
      const ip = raw.trim().split(/\r?\n/)[0].trim();
      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip) || ip.includes(":")) {
        return ip;
      }
      lastErr = new Error(`${url} 非 IP 文本`);
    } catch (e) {
      lastErr = e;
    }
  }
  const msg = lastErr && lastErr.message ? lastErr.message : "未知错误";
  const cause = lastErr && lastErr.cause ? ` (${lastErr.cause})` : "";
  throw new Error(`出口 IP 探测均失败: ${msg}${cause}`);
}

async function verifyProxyExitIp() {
  if (!verifyProxyWanted()) return;
  try {
    const direct = await fetchPublicIp(null);
    console.log("[place-order] 校验出口 直连 IP:", direct);
    let proxyUrl;
    try {
      proxyUrl = await resolvePlaceOrderProxyUrlAsync();
    } catch (e) {
      console.error("[place-order] 校验：无法解析代理配置:", e.message);
      return;
    }
    if (!proxyUrl) {
      console.log(
        "[place-order] 校验：当前为直连模式，下单不会经隧道（可去掉 *_DIRECT 再测）"
      );
      return;
    }
    const agent = new ProxyAgent(proxyUrl);
    try {
      const via = await fetchPublicIp(agent);
      console.log("[place-order] 校验出口 经本脚本代理 IP:", via);
      if (via !== direct) {
        console.log(
          "[place-order] 校验：与直连不同 → 代理生效；placeOrder 使用同一 ProxyAgent"
        );
      } else {
        console.log(
          "[place-order] 校验：与直连 IP 相同（少见：可对照隧道控制台请求计数）"
        );
      }
    } finally {
      await agent.close();
    }
  } catch (e) {
    console.error("[place-order] 校验出口失败:", e.message);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function placeOrderAttemptEnv() {
  const n = Number(process.env.PLACE_ORDER_ATTEMPTS);
  const attempts =
    Number.isFinite(n) && n >= 1 ? Math.floor(n) : DEFAULT_PLACE_ATTEMPTS;
  const iv = Number(process.env.PLACE_ORDER_INTERVAL_MS);
  const intervalMs =
    Number.isFinite(iv) && iv >= 0 ? Math.floor(iv) : DEFAULT_PLACE_INTERVAL_MS;
  return { attempts, intervalMs };
}

/** 使用同一 dispatcher（可多次调用）；直连时 dispatcher 为 undefined */
async function placeOrderHttp(accessToken, body, dispatcher) {
  const url = `${BASE}/place-order/mallOrder/placeOrder`;
  let res;
  try {
    res = await fetchWithDispatcher(url, {
      method: "POST",
      dispatcher: dispatcher || undefined,
      headers: {
        "Content-Type": "application/json",
        sysCode: "tf",
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": USER_AGENT,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    const wrapped = new Error(describeFetchError(e));
    wrapped.cause = e;
    throw wrapped;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${JSON.stringify(data)}`);
    err.response = { status: res.status, body: data };
    throw err;
  }
  if (data.code !== undefined && data.code !== 200) {
    const err = new Error(data.message || JSON.stringify(data));
    err.body = data;
    throw err;
  }
  return data;
}

async function main() {
  try {
    await verifyProxyExitIp();
    const token = loadAccessToken();
    const body = resolveRequestBody();
    const { attempts, intervalMs } = placeOrderAttemptEnv();

    const proxyUrl = await resolvePlaceOrderProxyUrlAsync();
    logPlaceOrderRoute(proxyUrl);
    let sharedDispatcher = proxyUrl ? new ProxyAgent(proxyUrl) : undefined;
    let activeProxyUrl = proxyUrl || "";
    /** 隧道 503 时剔除这些 host:port，避免 getkps 总随机到同一条（此前永远用列表第一条） */
    const kdlTunnelFailedHostPorts = new Set();

    let lastErr = null;
    try {
      for (let i = 1; i <= attempts; i++) {
        const t0 = performance.now();
        try {
          console.log(`[place-order] 第 ${i}/${attempts} 次 placeOrder…`);
          const ret = await placeOrderHttp(token, body, sharedDispatcher);
          const elapsedMs = Math.round(performance.now() - t0);
          fs.writeFileSync(
            OUTPUT_JSON_PATH,
            JSON.stringify(ret, null, 2),
            "utf8"
          );
          console.log(
            `[place-order] 第 ${i} 次 成功 耗时 ${elapsedMs}ms（发起到收满响应体）`
          );
          console.log("成功，已写入:", OUTPUT_JSON_PATH);
          return;
        } catch (e) {
          const elapsedMs = Math.round(performance.now() - t0);
          lastErr = e;
          console.error(
            `[place-order] 第 ${i} 次失败 耗时 ${elapsedMs}ms:`,
            e.message || describeFetchError(e)
          );
          if (
            sharedDispatcher &&
            usesKdlDynamicProxy() &&
            isProxyTunnelFailure(e)
          ) {
            console.warn(
              "[place-order] 代理隧道异常（如 503），关闭当前线路并重新 getkps…"
            );
            const badHp = hostPortFromProxyUrl(activeProxyUrl);
            if (badHp) kdlTunnelFailedHostPorts.add(badHp);
            await sharedDispatcher.close().catch(() => {});
            sharedDispatcher = undefined;
            try {
              const nextUrl = await fetchKdlPlaceOrderProxyUrl(
                kdlTunnelFailedHostPorts
              );
              activeProxyUrl = nextUrl;
              logPlaceOrderRoute(nextUrl);
              sharedDispatcher = new ProxyAgent(nextUrl);
            } catch (re) {
              console.error("[place-order] 快代理重取号失败:", re.message);
            }
          }
          if (i < attempts && intervalMs > 0) {
            await sleep(intervalMs);
          }
        }
      }
      throw lastErr || new Error("placeOrder 未成功");
    } finally {
      if (sharedDispatcher) {
        await sharedDispatcher.close().catch(() => {});
      }
    }
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}

main();
