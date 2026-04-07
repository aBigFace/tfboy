/**
 * 快代理隧道：axios + HttpsProxyAgent（http/https 共用同一代理，与官方示例一致）
 *
 *   node test-kdl-proxy.js
 *
 * 隧道（默认走此路径，可用环境变量覆盖）：
 *   TF_KDL_TUNNEL_PROXY — 一整段 http://user:pass@host:port（优先）
 *   或 TF_KDL_TUNNEL_HOST / TF_KDL_TUNNEL_PORT / TF_KDL_TUNNEL_USER / TF_KDL_TUNNEL_PASS
 *
 * 仍测 getkps 动态代理时：
 *   TF_KDL_USE_GETKPS=1 node test-kdl-proxy.js
 *   （此时 TF_KDL_GETKPS_URL、TF_KDL_PROXY_AUTH 与 place-order.js 一致）
 *
 * 测通 URL：
 *   KDL_TEST_HTTPS_URL — 默认 https://dev.kdlapi.com/testproxy
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { fetch: fetchWithDispatcher } = require("undici");

const KDL_GETKPS_URL_DEFAULT =
  "https://kps.kdlapi.com/api/getkps?secret_id=obh8w6r3lnmvq197he59&signature=ea9i061rl9knf73j47dgqzmr7f9t7ouq&format=text&sep=1&generateType=1&f_auth=1";

const KDL_PROXY_AUTH_DEFAULT = "jeinmabt:w6ykxdyb";

/** 快代理隧道入口（kdl tps）；请用 .env 覆盖以免提交仓库 */
const KDL_TUNNEL_DEFAULT = {
  host: "y440.kdltps.com",
  port: "15818",
  user: "t17545308493289",
  pass: "yix3qvem",
};

const DEFAULT_TEST_URL = "https://dev.kdlapi.com/testproxy";

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
      throw new Error("代理鉴权格式应为 user:pass（TF_KDL_PROXY_AUTH）");
    }
    const user = authRaw.slice(0, idx);
    const pass = authRaw.slice(idx + 1);
    return `http://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}:${port}`;
  }
  return `http://${host}:${port}`;
}

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

async function fetchKdlRecords() {
  const api =
    (process.env.TF_KDL_GETKPS_URL &&
      String(process.env.TF_KDL_GETKPS_URL).trim()) ||
    KDL_GETKPS_URL_DEFAULT;
  const t0 = performance.now();
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
  const elapsed = Math.round(performance.now() - t0);
  return { list, elapsed };
}

async function main() {
  const testUrl =
    (process.env.KDL_TEST_HTTPS_URL &&
      String(process.env.KDL_TEST_HTTPS_URL).trim()) ||
    DEFAULT_TEST_URL;

  let proxyUrl;
  if (process.env.TF_KDL_USE_GETKPS === "1") {
    const { list, elapsed } = await fetchKdlRecords();
    const rec = list[Math.floor(Math.random() * list.length)];
    proxyUrl = recordToProxyUrl(rec);
    const authHint = rec.user ? "取号行内账密" : "控制台/TF_KDL_PROXY_AUTH";
    console.log(
      `[test-kdl-proxy] getkps ${rec.host}:${rec.port}（${authHint}）共${list.length}条 · ${elapsed}ms`
    );
  } else {
    proxyUrl = resolveKdlTunnelProxyUrl();
    try {
      const u = new URL(proxyUrl);
      const ep = u.port ? `${u.hostname}:${u.port}` : u.hostname;
      console.log(`[test-kdl-proxy] 隧道 HTTP 代理 ${ep}（user=${u.username || "—"}）`);
    } catch {
      console.log("[test-kdl-proxy] 隧道 HTTP 代理（已配置）");
    }
  }

  console.log(`[test-kdl-proxy] 测通 GET ${testUrl}`);

  const agent = new HttpsProxyAgent(proxyUrl);
  try {
    const res = await axios({
      url: testUrl,
      method: "GET",
      timeout: 30000,
      httpAgent: agent,
      httpsAgent: agent,
      proxy: false,
      validateStatus: () => true,
    });
    console.log(`[test-kdl-proxy] HTTP ${res.status}`);
    const body =
      typeof res.data === "string"
        ? res.data.slice(0, 500)
        : JSON.stringify(res.data, null, 0).slice(0, 500);
    console.log(body);
    if (res.status < 200 || res.status >= 300) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(
      "[test-kdl-proxy] 请求失败:",
      err && err.message ? err.message : err
    );
    if (err.response) {
      console.error("status:", err.response.status);
      console.error("data:", err.response.data);
    }
    process.exitCode = 1;
  }
}

main();
