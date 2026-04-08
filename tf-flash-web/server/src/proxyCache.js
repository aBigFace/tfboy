const fs = require("fs");
const path = require("path");
const {
  createProxyDispatcher,
  request,
  proxyPullDispatcher,
} = require("./httpClient");
const { DATA_DIR } = require("./store/persist");
const { formatLocalTimestamp } = require("./rush/logs");
const { getShelvesSkuReachableProbe } = require("./tfApi");
const { DEFAULT_GOODS_BODY } = require("./apiDefaults");

/** 与 rushEngine RUSH_OFFICIAL_TIMEOUT_MS 一致量级 */
const PROXY_AGENT_TIMEOUT_MS = 25_000;
/** 定时拉取代理写入池的间隔（毫秒） */
const POOL_REFRESH_MS = 15_000;
const POOL_CAP = 200;
const FETCH_TIMEOUT_MS = 12_000;

/**
 * 延迟探活：走 getShelvesSku，仅当耗时 < 此值才入池（毫秒）。
 * 默认 2500：1000 对「代理→app.tfent.cn」常过严，易大批丢弃；更紧可设环境变量 TF_PROXY_SHELF_LATENCY_MAX_MS。
 */
const SHELF_LATENCY_MAX_MS = (() => {
  const r = Number(process.env.TF_PROXY_SHELF_LATENCY_MAX_MS);
  if (Number.isFinite(r) && r >= 100 && r <= 60_000) return Math.floor(r);
  return 2500;
})();

/** 探活请求超时（应大于 SHELF_LATENCY_MAX_MS，避免慢响应被误判为网络错误） */
const SHELF_PROBE_TIMEOUT_MS = (() => {
  const r = Number(process.env.TF_PROXY_SHELF_PROBE_TIMEOUT_MS);
  if (Number.isFinite(r) && r >= 2000 && r <= 120_000) return Math.floor(r);
  return Math.max(8000, SHELF_LATENCY_MAX_MS * 3);
})();

/**
 * 是否对拉取的线路做货架延迟探活（TF_PROXY_SHELF_LATENCY_TEST=0/false 关闭；关闭后不做探活、日志无 ms）。
 */
const SHELF_LATENCY_TEST_ON = (() => {
  const v = process.env.TF_PROXY_SHELF_LATENCY_TEST;
  if (v == null || String(v).trim() === "") return true;
  const s = String(v).toLowerCase();
  return !(s === "0" || s === "false" || s === "no");
})();

/**
 * 一批代理探活全弃时，立刻再请求取号接口拉新一批；封顶避免刷爆取号线。
 * `TF_PROXY_LATENCY_ALL_FAIL_RETRIES`：1～30，默认 8。
 */
const PROXY_LATENCY_ALL_FAIL_MAX_RETRIES = (() => {
  const r = Number(process.env.TF_PROXY_LATENCY_ALL_FAIL_RETRIES);
  if (Number.isFinite(r) && r >= 1 && r <= 30) return Math.floor(r);
  return 8;
})();

/**
 * 多米 dmgetip 默认取号（可被 DM_PROXY_FETCH_URL 或 data/proxy-pool-fetch-url.txt 覆盖）。
 * apikey/pwd 写在源码中有泄露风险，仓库若公开请改用环境变量。
 */
const DEFAULT_DM_PROXY_FETCH_URL =
  "http://api.dmdaili.com/dmgetip.asp?apikey=29a0386e&pwd=327470a5e147f4c4ace722d4c75fe09d&getnum=10&httptype=1&geshi=1&fenge=1&fengefu=&operate=all";

const PLACE_ORDER_SLOT = "place_order";

/** @type {{ host: string, port: number }[]} */
let pool = [];
let rrIndex = 0;

let intervalId = null;
let lastFailMonitored = 0;

function resolveFetchUrl() {
  const env = process.env.DM_PROXY_FETCH_URL;
  if (env != null && String(env).trim()) return String(env).trim();
  try {
    const p = resolveFetchUrlPath();
    if (p && fs.existsSync(p)) {
      const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
      for (const line of lines) {
        const t = String(line || "").trim();
        if (t && !t.startsWith("#")) return t;
      }
    }
  } catch (_) {
    /* ignore */
  }
  return DEFAULT_DM_PROXY_FETCH_URL;
}

function resolveFetchUrlPath() {
  return path.join(DATA_DIR, "proxy-pool-fetch-url.txt");
}

function isPlaceProxyConfigured() {
  return Boolean(resolveFetchUrl());
}

function resolveShelfProbeGoodsId() {
  const raw = process.env.TF_PROXY_LATENCY_TEST_GOODS_ID;
  if (raw != null && String(raw).trim()) {
    const n = Number(String(raw).trim());
    if (Number.isFinite(n) && n > 0) return n;
  }
  const ids = DEFAULT_GOODS_BODY.goodsIds;
  if (Array.isArray(ids) && ids.length && Number.isFinite(Number(ids[0]))) {
    return Number(ids[0]);
  }
  return 1601;
}

/**
 * 并行探活，仅保留 ms < SHELF_LATENCY_MAX_MS 的线路。
 */
async function measureShelfLatencyAndFilter(list) {
  const goodsId = resolveShelfProbeGoodsId();
  const results = await Promise.all(
    list.map(async (entry) => {
      const wave = buildWaveProxyFromEntry(entry);
      const probe = await getShelvesSkuReachableProbe(goodsId, 1, {
        ...wave,
        timeout: SHELF_PROBE_TIMEOUT_MS,
      });
      return { entry, probe };
    })
  );
  /** @type {{ entry: (typeof list)[0]; ms: number }[]} */
  const kept = [];
  for (const r of results) {
    const { entry, probe } = r;
    if (probe.ok && probe.ms < SHELF_LATENCY_MAX_MS) {
      kept.push({ entry, ms: probe.ms });
    }
  }
  return { kept, total: list.length, goodsId };
}

function normalizeHostPort(host, port) {
  const h = String(host || "").trim();
  const p = Number(port);
  if (!h || !Number.isFinite(p) || p <= 0 || p > 65535) return null;
  return { host: h, port: Math.floor(p) };
}

function parseProxyLine(line) {
  const s = String(line || "").trim();
  if (!s || s.startsWith("#")) return null;
  const m1 = s.match(/^https?:\/\/\[([^\]]+)\]:(\d+)/i);
  if (m1) return normalizeHostPort(m1[1], m1[2]);
  const m2 = s.match(/^https?:\/\/([^/:]+):(\d+)/i);
  if (m2) return normalizeHostPort(m2[1], m2[2]);
  const lastColon = s.lastIndexOf(":");
  if (lastColon <= 0) return null;
  const hostPart = s.slice(0, lastColon).replace(/^\[|\]$/g, "");
  const portPart = s.slice(lastColon + 1);
  return normalizeHostPort(hostPart, portPart);
}

function extractProxiesFromJson(obj, out) {
  if (obj == null) return;
  if (typeof obj === "string") {
    const e = parseProxyLine(obj);
    if (e) out.push(e);
    return;
  }
  if (Array.isArray(obj)) {
    for (const x of obj) extractProxiesFromJson(x, out);
    return;
  }
  if (typeof obj === "object") {
    if (obj.host != null && obj.port != null) {
      const e = normalizeHostPort(obj.host, obj.port);
      if (e) out.push(e);
    }
    if (obj.ip != null && obj.port != null) {
      const e = normalizeHostPort(obj.ip, obj.port);
      if (e) out.push(e);
    }
    for (const k of Object.keys(obj)) {
      if (k === "host" || k === "port" || k === "ip") continue;
      extractProxiesFromJson(obj[k], out);
    }
  }
}

function parseProxyPayload(rawText) {
  const text = String(rawText || "").trim();
  if (!text) return [];
  const out = [];
  try {
    const j = JSON.parse(text);
    extractProxiesFromJson(j, out);
    if (out.length) return out;
  } catch (_) {
    /* 按纯文本解析 */
  }
  for (const line of text.split(/\r?\n/)) {
    const e = parseProxyLine(line);
    if (e) out.push(e);
  }
  return out;
}

function dedupeCap(list) {
  const seen = new Set();
  const out = [];
  for (const e of list) {
    const k = `${e.host}:${e.port}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(e);
    if (out.length >= POOL_CAP) break;
  }
  return out;
}

function buildWaveProxyFromEntry(entry) {
  const proxyUrl = `http://${entry.host}:${entry.port}`;
  const dispatcher = createProxyDispatcher(proxyUrl, {
    connectTimeout: PROXY_AGENT_TIMEOUT_MS,
  });
  return {
    dispatcher,
    _proxyPoolMeta: { host: entry.host, port: entry.port },
  };
}

/**
 * 每轮抢购 fanout 内每次 placeOrder 调用一次：从池里轮询取一条线路（可重叠波次并发取用）。
 * 未配置取号 URL 或池为空时返回 null，由下层直连官方。
 */
function takeProxyWaveOptions() {
  const url = resolveFetchUrl();
  if (!url || !pool.length) return null;
  const entry = pool[rrIndex % pool.length];
  rrIndex++;
  return buildWaveProxyFromEntry(entry);
}

function peekPlaceEndpoint() {
  if (!resolveFetchUrl() || !pool.length) return null;
  const entry = pool[rrIndex % pool.length];
  return { host: entry.host, port: entry.port };
}

/** 与 rushEngine place_intent / proxyEndpointMeta 展示一致 */
function getPlaceIntentLogMeta() {
  const ep = peekPlaceEndpoint();
  if (ep) {
    return {
      used: true,
      host: ep.host,
      port: ep.port,
      label: `走代理 ${ep.host}:${ep.port}`,
    };
  }
  if (resolveFetchUrl()) {
    return {
      used: true,
      host: null,
      port: null,
      label: "走代理（池暂无可用线路，将尝试直连）",
    };
  }
  return {
    used: false,
    host: null,
    port: null,
    label: "未使用代理（直连官方）",
  };
}

/** @param {string} _slot */
function getProxyEndpoint(_slot) {
  return peekPlaceEndpoint();
}

function shouldInvalidateProxyForError(err) {
  if (!err) return false;
  const code = err.code;
  if (
    code === "ECONNREFUSED" ||
    code === "ENOTFOUND" ||
    code === "ETIMEDOUT" ||
    code === "ECONNRESET" ||
    code === "EPIPE" ||
    code === "EPROTO"
  ) {
    return true;
  }
  const msg = String(err.message || "");
  if (/proxy|407|tunnel|TlsWrap|SSL/i.test(msg) && /socket|connect|TLS|ECONN/i.test(msg)) {
    return true;
  }
  return false;
}

function maybePushFetchFail(reason, tag = "background") {
  const now = Date.now();
  if (now - lastFailMonitored < 60_000) return;
  lastFailMonitored = now;
  try {
    const logs = require("./rush/logs");
    logs.pushMonitor({
      event: "proxy_fetch_fail",
      reason: String(reason),
      tag,
    });
  } catch (_) {
    /* ignore */
  }
}

/**
 * 拉取一批代理并**整体替换**池（成功时）；失败则保留旧池。
 * 允许与上一次 tick 重叠执行，不置 busy 标志截断后续请求（遵守仓库抢购并发约定）。
 */
async function refreshOnce() {
  const url = resolveFetchUrl();
  if (!url) return { ok: false, reason: "no_url" };

  for (
    let attempt = 0;
    attempt < PROXY_LATENCY_ALL_FAIL_MAX_RETRIES;
    attempt++
  ) {
    if (attempt > 0) {
      console.log(
        `[proxy-pool] ${formatLocalTimestamp()} 货架探活全弃，立即重新取号（第 ${attempt + 1}/${PROXY_LATENCY_ALL_FAIL_MAX_RETRIES} 批）`
      );
    }

    try {
      const res = await request({
        method: "GET",
        url,
        timeout: FETCH_TIMEOUT_MS,
        dispatcher: proxyPullDispatcher,
        headers: { "User-Agent": "tf-flash-server/proxy-pool" },
        parseJson: false,
      });
      if (res.status < 200 || res.status >= 300) {
        console.warn(
          `[proxy-pool] ${formatLocalTimestamp()} 拉取失败 HTTP ${res.status}`
        );
        return { ok: false, reason: `http_${res.status}` };
      }
      const text = res.data == null ? "" : String(res.data);
      try {
        const j = JSON.parse(text);
        if (j && typeof j === "object") {
          if (j.success === false) {
            const reason = `dm_${j.code}:${String(j.msg || "").slice(0, 200)}`;
            console.warn(`[proxy-pool] ${formatLocalTimestamp()} ${reason}`);
            return { ok: false, reason };
          }
          const c = j.code;
          if (c !== undefined && c !== 0 && c !== "0") {
            const reason = `dm_${c}:${String(j.msg || "").slice(0, 200)}`;
            console.warn(`[proxy-pool] ${formatLocalTimestamp()} ${reason}`);
            return { ok: false, reason };
          }
        }
      } catch (_) {
        /* 非 JSON（如纯文本 ip:port）正常走下方解析 */
      }
      let list = dedupeCap(parseProxyPayload(text));
      if (!list.length) {
        console.warn(
          `[proxy-pool] ${formatLocalTimestamp()} 拉取失败 响应中未解析到 ip:port（empty_parse）`
        );
        return { ok: false, reason: "empty_parse" };
      }

      const ts = formatLocalTimestamp();
      if (SHELF_LATENCY_TEST_ON) {
        const { kept, total, goodsId } = await measureShelfLatencyAndFilter(list);
        if (!kept.length) {
          console.warn(
            `[proxy-pool] ${ts} 货架探活 getShelvesSku goodsId=${goodsId} 无线路 <${SHELF_LATENCY_MAX_MS}ms（${total} 条全弃）`
          );
          if (attempt + 1 >= PROXY_LATENCY_ALL_FAIL_MAX_RETRIES) {
            return { ok: false, reason: "latency_all_fail" };
          }
          continue;
        }
        pool = kept.map((k) => k.entry);
        const lines = kept
          .map((k) => `${k.entry.host}:${k.entry.port}(${k.ms}ms)`)
          .join(", ");
        const drop = total - kept.length;
        const dropHint = drop > 0 ? ` 丢弃${drop}条` : "";
        console.log(
          `[proxy-pool] ${ts} 拉取成功 共 ${pool.length}/${total} 条 goodsId=${goodsId} 延迟<${SHELF_LATENCY_MAX_MS}ms${dropHint} → ${lines}`
        );
      } else {
        pool = list;
        const lines = list.map((e) => `${e.host}:${e.port}`).join(", ");
        console.log(
          `[proxy-pool] ${ts} 拉取成功 共 ${list.length} 条 → ${lines}`
        );
      }
      return { ok: true, count: pool.length };
    } catch (e) {
      const reason = e.code || e.message || "fetch_error";
      console.warn(`[proxy-pool] ${formatLocalTimestamp()} 拉取异常 ${reason}`);
      return { ok: false, reason };
    }
  }

  return { ok: false, reason: "latency_all_fail" };
}

/** 提交订单前：若已配置取号线且池空，尽力补一轮（不阻塞其它波次的定时刷新） */
async function ensurePlaceProxyAvailable() {
  if (!resolveFetchUrl()) return;
  if (pool.length > 0) return;
  const r = await refreshOnce();
  if (!r.ok) maybePushFetchFail(String(r.reason), "place_ensure");
}

function startProxyPoolMaintenance() {
  if (intervalId != null) return;
  const tick = () => {
    void refreshOnce().then((r) => {
      if (
        !r.ok &&
        r.reason !== "no_url" &&
        r.reason !== "empty_parse" &&
        r.reason !== "latency_all_fail"
      ) {
        maybePushFetchFail(String(r.reason));
      }
    });
  };
  tick();
  intervalId = setInterval(tick, POOL_REFRESH_MS);
  if (typeof intervalId.unref === "function") intervalId.unref();
}

module.exports = {
  PLACE_ORDER_SLOT,
  POOL_REFRESH_MS,
  getProxyEndpoint,
  shouldInvalidateProxyForError,
  startProxyPoolMaintenance,
  takeProxyWaveOptions,
  getPlaceIntentLogMeta,
  ensurePlaceProxyAvailable,
  isPlaceProxyConfigured,
  /** 单测 / 排查用 */
  _refreshOnce: refreshOnce,
  _resetForTest: () => {
    pool = [];
    rrIndex = 0;
  },
};
