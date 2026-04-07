const http = require("http");
const https = require("https");
const axios = require("axios");
const { derBase64ToPemPublicKey, getRsaCode } = require("./rsa");

const BASE = "https://app.tfent.cn";

/** 复用 TCP/TLS，减少抢购时重复握手（对 app.tfent.cn 长连） */
const officialHttpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 128,
});
const officialHttpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 128,
});

/** 仅当 TF_DEBUG_API=1 / true 时打印 [官方接口请求]（默认关闭，避免控制台刷屏） */
function debugApiOn() {
  const v = process.env.TF_DEBUG_API;
  if (v == null || String(v).trim() === "") return false;
  const s = String(v).toLowerCase();
  return s === "1" || s === "true" || s === "yes" || s === "on";
}

/** 控制台用本地时间，与 rush/logs formatLocalTimestamp 一致：YYYY-MM-DD HH:mm:ss.SSS */
function localLogTimestamp(d = new Date()) {
  const pad = (n, len = 2) => String(n).padStart(len, "0");
  return [
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`,
  ].join(" ");
}

/** Query 串脱敏（RSA 密文 password、可选 client_secret） */
function maskSensitiveUrl(url) {
  if (!url || typeof url !== "string") return url;
  return url
    .replace(/([?&]password=)([^&]*)/gi, "$1***REDACTED***")
    .replace(/([?&]client_secret=)([^&]*)/gi, "$1***");
}

function pickLogHeaders(h) {
  if (!h || typeof h !== "object") return {};
  const out = {};
  const keys = ["Content-Type", "content-type", "sysCode", "Authorization", "User-Agent"];
  for (const k of keys) {
    if (h[k] != null) out[k] = h[k];
  }
  if (out.Authorization && String(out.Authorization).startsWith("Bearer "))
    out.Authorization = "Bearer ***";
  return out;
}

function logOfficialRequest(config) {
  if (!debugApiOn()) return;
  const rawUrl = `${config.baseURL || ""}${config.url || ""}`;
  const url = maskSensitiveUrl(rawUrl);
  const entry = {
    method: String(config.method || "get").toUpperCase(),
    officialUrl: url,
    headers: pickLogHeaders(config.headers),
  };
  if (config.params != null && Object.keys(config.params).length) {
    entry.queryParams = config.params;
  }
  const data = config.data;
  if (data != null && data !== "") {
    if (typeof data === "string") {
      try {
        entry.bodyJson = JSON.parse(data);
      } catch {
        entry.bodyRaw =
          data.length > 4000 ? data.slice(0, 4000) + "…(truncated)" : data;
      }
    } else if (typeof data === "object") {
      entry.bodyJson = data;
    }
  }
  console.log("[官方接口请求]", JSON.stringify(entry, null, 2));
}

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf254162e) XWEB/18163";

function headers(token) {
  return {
    "Content-Type": "application/json",
    sysCode: "tf",
    "User-Agent": USER_AGENT,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const ax = axios.create({
  baseURL: BASE,
  validateStatus: () => true,
  timeout: 60000,
  httpAgent: officialHttpAgent,
  httpsAgent: officialHttpsAgent,
});

ax.interceptors.request.use((config) => {
  logOfficialRequest(config);
  return config;
});

/**
 * 控制台 / 监控用：压缩官方失败响应（尤其 EdgeOne 整页 HTML），避免刷屏。
 * @param {number} [status] HTTP 状态码
 * @param {*} data 响应 body（axios res.data）
 * @param {number} [maxLen]
 */
function summarizeTfErrorForLog(status, data, maxLen = 360) {
  if (data == null) return String(data);
  if (typeof data === "string") {
    const s = data;
    if (
      /EdgeOne|Tencent Cloud EdgeOne|安全策略拦截|请求已被拦截|Restricted Access/i.test(
        s
      )
    ) {
      const ridMatch =
        s.match(/id=["']?requestId["']?[^>]*>([^<]+)</i) ||
        s.match(/requestId[>\s"]+(\d{6,})/i);
      const rid = ridMatch ? String(ridMatch[1]).trim() : "";
      const codeMatch = s.match(/id=["']?statusCode["']?[^>]*>(\d+)/i);
      const pageCode = codeMatch ? codeMatch[1] : "";
      const hint = `[WAF/EdgeOne] http=${status ?? "?"}${pageCode ? ` page=${pageCode}` : ""}${rid ? ` requestId=${rid}` : ""}`;
      return hint.length <= maxLen ? hint : hint.slice(0, maxLen);
    }
    if (/^\s*</.test(s) && s.length > 400) {
      const preview = s.slice(0, 100).replace(/\s+/g, " ");
      return `[HTML 非业务 JSON] http=${status ?? "?"} len=${s.length} ${preview}…`;
    }
    if (s.length > maxLen) return `${s.slice(0, maxLen)}…(共${s.length}字)`;
    return s;
  }
  if (typeof data === "object") {
    try {
      const j = JSON.stringify(data);
      if (j.length <= maxLen) return j;
      return `${j.slice(0, maxLen)}…(共${j.length}字)`;
    } catch {
      return String(data).slice(0, maxLen);
    }
  }
  const t = String(data);
  return t.length > maxLen ? `${t.slice(0, maxLen)}…` : t;
}

async function assertTfOk(res, label) {
  if (res.status >= 400) {
    const detail = summarizeTfErrorForLog(res.status, res.data, 480);
    const err = new Error(`${label} HTTP ${res.status}: ${detail}`);
    err.response = res;
    throw err;
  }
  const d = res.data;
  if (d && typeof d === "object" && d.code !== undefined && d.code !== 200) {
    const msg = d.message || `${label} 业务 code=${d.code}`;
    const err = new Error(
      msg.length > 400 ? `${msg.slice(0, 400)}…` : msg
    );
    err.response = res;
    throw err;
  }
  return d;
}

async function loginPassword(username, passwordPlain) {
  const pkRes = await ax.get("/out-api/auth/login/getPublicKey", {
    headers: headers(),
  });
  const pkJson = await assertTfOk(pkRes, "getPublicKey");
  const pem = derBase64ToPemPublicKey(pkJson.data.publicKey);
  const enc = getRsaCode(passwordPlain, pem);
  const passwordParam = encodeURIComponent(enc);
  const tokenUrl =
    `/out-api/auth/oauth/token?grant_type=password` +
    `&username=${encodeURIComponent(username)}` +
    `&client_id=tf&client_secret=123` +
    `&password=${passwordParam}` +
    `&loginPlatform=2`;
  const tokenRes = await ax.post(tokenUrl, {}, { headers: headers() });
  if (tokenRes.status >= 400) {
    const err = new Error(
      tokenRes.data?.error_description || "登录失败"
    );
    err.response = tokenRes;
    throw err;
  }
  const data = tokenRes.data;
  if (data.code !== undefined && data.code !== 200) {
    throw new Error(data.message || "登录业务错误");
  }
  return data;
}

/** rush 商品列表传 null 时不带 Bearer（与 getShelvesSku 为仅两种不带 token 的查询） */
async function goodsPageList(token, body) {
  const res = await ax.post("/goods/goodsSpu/pageListForShopMall", body, {
    headers: headers(token),
  });
  return assertTfOk(res, "pageListForShopMall");
}

/** token 传 null 时不带 Bearer（rush SKU 与波次内查库存；与 goodsPageList 为仅两类无 token 查询） */
async function getShelvesSku(token, goodsId, applyType = 1, reqOptions = {}) {
  const { _proxyPoolMeta: _omitPoolMeta, ...restReq } =
    reqOptions && typeof reqOptions === "object" ? reqOptions : {};
  const opts =
    restReq.httpsAgent != null ? { ...restReq, proxy: false } : restReq;
  const res = await ax.get(
    `/goods/shelves/getShelvesSku/${goodsId}?applyType=${applyType}`,
    {
      headers: headers(token),
      ...opts,
    }
  );
  return assertTfOk(res, "getShelvesSku");
}

/**
 * 代理池探活：与 getShelvesSku 同 URL / 头 / 代理选项，但不校验业务 body（避免 code≠200 误判线路不可用）。
 */
async function getShelvesSkuReachableProbe(
  goodsId,
  applyType = 1,
  reqOptions = {}
) {
  const { _proxyPoolMeta: _omitPoolMeta, ...restReq } =
    reqOptions && typeof reqOptions === "object" ? reqOptions : {};
  const opts =
    restReq.httpsAgent != null ? { ...restReq, proxy: false } : restReq;
  const t0 = Date.now();
  try {
    const res = await ax.get(
      `/goods/shelves/getShelvesSku/${goodsId}?applyType=${applyType}`,
      {
        headers: headers(null),
        ...opts,
      }
    );
    const ms = Date.now() - t0;
    if (res.status !== 200) {
      return { ok: false, ms, httpStatus: res.status };
    }
    return { ok: true, ms, httpStatus: res.status };
  } catch (e) {
    return {
      ok: false,
      ms: Date.now() - t0,
      err: e.code || e.message || String(e),
    };
  }
}

async function personal(token) {
  const res = await ax.post("/member-v2/my/personal", {}, {
    headers: headers(token),
  });
  return assertTfOk(res, "personal");
}

async function bookPageQuery(token, body, reqOptions = {}) {
  const res = await ax.post("/gis/book/pageQuery", body, {
    headers: headers(token),
    ...reqOptions,
  });
  return assertTfOk(res, "bookPageQuery");
}

async function orderFee(token, body, reqOptions = {}) {
  const res = await ax.post("/fee/compute/order-fee", body, {
    headers: headers(token),
    ...reqOptions,
  });
  const d = await assertTfOk(res, "order-fee");
  try {
    console.log("[order-fee 响应]", JSON.stringify(d, null, 2));
  } catch {
    console.log("[order-fee 响应]", d);
  }
  return d;
}

/**
 * @param {string | null} [logAccountTag] 控制台失败日志附加：任务名·用户名·手机等，由调用方拼好
 */
async function placeOrder(token, body, reqOptions = {}, logAccountTag = null) {
  const accBracket =
    logAccountTag && String(logAccountTag).trim()
      ? ` [${String(logAccountTag).trim()}]`
      : "";
  if (debugApiOn()) {
    try {
      const redacted =
        body && typeof body === "object"
          ? {
              ...body,
              receiverInfo: body.receiverInfo
                ? { id: body.receiverInfo.id }
                : body.receiverInfo,
            }
          : body;
      console.log("[placeOrder 请求]", JSON.stringify(redacted, null, 2));
    } catch {
      console.log("[placeOrder 请求]", "(无法序列化)");
    }
  }
  const t0 = Date.now();
  let res;
  const opts = reqOptions && typeof reqOptions === "object" ? reqOptions : {};
  const axiosOpts =
    opts.httpsAgent != null ? { ...opts, proxy: false } : opts;
  try {
    res = await ax.post("/place-order/mallOrder/placeOrder", body, {
      headers: headers(token),
      ...axiosOpts,
    });
  } catch (e) {
    const elapsed = Date.now() - t0;
    console.log(
      `[${localLogTimestamp()}] [placeOrder 请求异常]${accBracket} ${elapsed}ms`,
      e.code || "",
      e.message || e
    );
    throw e;
  }
  const elapsed = Date.now() - t0;
  const raw = res.data;
  const bizBad =
    raw &&
    typeof raw === "object" &&
    raw.code !== undefined &&
    raw.code !== 200;
  if (res.status >= 400 || bizBad) {
    console.log(
      `[${localLogTimestamp()}] [placeOrder 响应·失败]${accBracket} ${elapsed}ms`,
      summarizeTfErrorForLog(res.status, raw, 600)
    );
  }
  const d = await assertTfOk(res, "placeOrder");
  if (debugApiOn()) {
    try {
      console.log("[placeOrder 响应]", JSON.stringify(d, null, 2));
    } catch {
      console.log("[placeOrder 响应]", d);
    }
  } else {
    const inner = d && typeof d === "object" && d.data != null ? d.data : d;
    const idsRaw =
      inner && typeof inner === "object"
        ? inner.orderIds ?? inner.orderId
        : null;
    let idsHint = "—";
    if (Array.isArray(idsRaw) && idsRaw.length) {
      idsHint = idsRaw.map((x) => String(x)).join(",");
    } else if (idsRaw != null && idsRaw !== "") {
      idsHint = String(idsRaw);
    }
    console.log(
      `[${localLogTimestamp()}] [placeOrder 响应·成功]${accBracket} ${elapsed}ms orderIds=${idsHint}`
    );
  }
  return d;
}

/** 订单分页列表（须登录 token，与小程序一致） */
async function orderPageQueryV2(token, body, reqOptions = {}) {
  const res = await ax.post(
    "/sale-order/saleOrderManager/mobile/pageQueryV2",
    body,
    { headers: headers(token), ...reqOptions }
  );
  return assertTfOk(res, "pageQueryV2");
}

/** 取消订单（待付款等，小程序 apiCancelListOrder：body 为 id 数组） */
async function cancelMallOrder(token, orderIds, reqOptions = {}) {
  const res = await ax.post(
    "/place-order/mallOrder/cancelOrder",
    orderIds,
    { headers: headers(token), ...reqOptions }
  );
  return assertTfOk(res, "cancelOrder");
}

module.exports = {
  loginPassword,
  goodsPageList,
  getShelvesSku,
  getShelvesSkuReachableProbe,
  personal,
  bookPageQuery,
  orderFee,
  placeOrder,
  orderPageQueryV2,
  cancelMallOrder,
  summarizeTfErrorForLog,
};
