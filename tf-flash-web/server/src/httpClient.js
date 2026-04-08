/**
 * 本服务「出站 HTTP」统一入口：undici + keep-alive / 连接复用。
 *
 * 约定：除 Node 内置 `http.createServer`（入站）外，勿在其它文件直接使用 axios、
 * 全局 fetch、`http(s).request` 等发外网；新请求一律经本模块（或经 tfApi 间接使用）。
 *
 * 响应形态刻意贴近原 axios：`{ status, data }`，`data` 已按 JSON 解析（或文本兜底）。
 */
const { fetch, Agent, ProxyAgent } = require("undici");

/** 官网抢购等高并发：复用连接 */
const DEFAULT_OFFICIAL = {
  connections: 128,
  keepAliveTimeout: 60_000,
  keepAliveMaxTimeout: 600_000,
};

/** 拉代理列表等低频：小池即可 */
const DEFAULT_PULL = {
  connections: 8,
  keepAliveTimeout: 30_000,
  keepAliveMaxTimeout: 300_000,
};

function createOfficialDispatcher(overrides = {}) {
  return new Agent({ ...DEFAULT_OFFICIAL, ...overrides });
}

/** 代理取号 HTTP 拉取等非官网域名 */
const proxyPullDispatcher = new Agent(DEFAULT_PULL);

/**
 * HTTP 代理线路（CONNECT）；每线路独立 dispatcher，与原先每波 new Agent 一致。
 * @param {string} uri 如 `http://host:port`
 * @param {{ connectTimeout?: number }} [options] 其余字段透传 undici ProxyAgent
 */
function createProxyDispatcher(uri, options = {}) {
  const { connectTimeout = 25_000, ...rest } = options;
  return new ProxyAgent({
    uri,
    connectTimeout,
    keepAliveTimeout: 60_000,
    keepAliveMaxTimeout: 600_000,
    ...rest,
  });
}

function buildURL(baseURL, path, params) {
  let pathPart;
  if (/^https?:\/\//i.test(path)) {
    pathPart = path;
  } else {
    const base = String(baseURL || "").replace(/\/$/, "");
    const p = path.startsWith("/") ? path : `/${path}`;
    pathPart = `${base}${p}`;
  }
  if (!params || typeof params !== "object" || !Object.keys(params).length) {
    return pathPart;
  }
  const u = new URL(pathPart);
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    u.searchParams.append(k, String(v));
  }
  return u.toString();
}

/** 去掉仅 axios 使用的字段，避免透传到 undici */
function stripLegacyReqFields(config) {
  const c = config && typeof config === "object" ? { ...config } : {};
  delete c._proxyPoolMeta;
  delete c.httpsAgent;
  delete c.httpAgent;
  delete c.proxy;
  return c;
}

async function parseBody(res, asJson = true) {
  const text = await res.text();
  if (text === "") return null;
  if (!asJson) return text;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * @param {{
 *   method: string,
 *   url: string,
 *   baseURL?: string,
 *   headers?: Record<string, string>,
 *   params?: Record<string, string | number>,
 *   data?: *,
 *   timeout?: number,
 *   dispatcher?: import("undici").Dispatcher,
 *   signal?: AbortSignal,
 *   parseJson?: boolean,
 * }} opts
 * @returns {Promise<{ status: number, data: *, headers: import("undici").Headers }>}
 */
async function request(opts) {
  const {
    method,
    url,
    baseURL = "",
    headers = {},
    params,
    data,
    timeout = 60_000,
    dispatcher,
    signal: outerSignal,
    parseJson = true,
  } = opts;

  const finalUrl = buildURL(baseURL, url, params);
  /** @type {import("undici").RequestInit} */
  const init = {
    method: String(method || "GET").toUpperCase(),
    headers: { ...headers },
  };
  if (dispatcher != null) init.dispatcher = dispatcher;

  const methodUp = init.method;
  const sig =
    outerSignal ||
    (timeout > 0 ? AbortSignal.timeout(timeout) : undefined);
  if (sig) init.signal = sig;

  if (
    data !== undefined &&
    data !== null &&
    methodUp !== "GET" &&
    methodUp !== "HEAD"
  ) {
    if (typeof data === "string" || Buffer.isBuffer(data)) {
      init.body = data;
    } else {
      init.body = JSON.stringify(data);
    }
  }

  const res = await fetch(finalUrl, init);
  const body = await parseBody(res, parseJson);
  return { status: res.status, data: body, headers: res.headers };
}

/**
 * @param {{
 *   baseURL: string,
 *   dispatcher: import("undici").Dispatcher,
 *   defaultTimeout?: number,
 *   onRequest?: (cfg: {
 *     method: string,
 *     baseURL: string,
 *     url: string,
 *     headers?: Record<string, string>,
 *     params?: Record<string, string | number>,
 *     data?: *,
 *   }) => void,
 * }} options
 */
function createHttpClient(options) {
  const {
    baseURL,
    dispatcher,
    defaultTimeout = 60_000,
    onRequest,
  } = options;

  async function exec(method, path, data, config = {}) {
    const c = stripLegacyReqFields(config);
    const h = c.headers && typeof c.headers === "object" ? c.headers : {};
    const req = {
      method,
      url: path,
      baseURL,
      headers: h,
      params: c.params,
      data,
      timeout: c.timeout != null ? c.timeout : defaultTimeout,
      dispatcher: c.dispatcher != null ? c.dispatcher : dispatcher,
      signal: c.signal,
    };
    if (onRequest) {
      onRequest({
        method,
        baseURL,
        url: path,
        headers: h,
        params: c.params,
        data,
      });
    }
    return request(req);
  }

  return {
    get(path, config) {
      return exec("GET", path, undefined, config);
    },
    post(path, data, config) {
      return exec("POST", path, data, config);
    },
  };
}

module.exports = {
  createOfficialDispatcher,
  createProxyDispatcher,
  createHttpClient,
  request,
  stripLegacyReqFields,
  proxyPullDispatcher,
};
