const crypto = require("crypto");
const {
  loginPassword,
  personal,
  getShelvesSku,
  placeOrder,
  summarizeTfErrorForLog,
} = require("../tfApi");
const { readJson, writeJson } = require("../store/persist");
const { buildPlaceBody } = require("./orderBuild");
const logs = require("./logs");
const proxyCache = require("../proxyCache");

function taskMonLabel(task) {
  if (!task) return "「?」";
  const n = task.name != null ? String(task.name).trim() : "";
  if (n) return `「${n}」`;
  return `「${String(task.id).slice(0, 8)}」`;
}

/** placeOrder 控制台失败日志：任务名 · 登录名 · 手机 */
function placeOrderLogTag(task, account) {
  if (!account) return null;
  const bits = [];
  if (task) bits.push(taskMonLabel(task));
  const u = (account.username || "").trim();
  const phone = (account.phone || "").trim();
  if (u) bits.push(u);
  if (phone && phone !== u) bits.push(phone);
  if (bits.length <= (task ? 1 : 0)) {
    const id = account.id != null ? String(account.id).trim() : "";
    if (id) bits.push(`id:${id.slice(0, 12)}`);
  }
  return bits.length ? bits.join(" · ") : null;
}

function goodsTitleFromTasks(taskArr, gid) {
  const nm = taskArr
    .map((t) => t.goodsName)
    .find((x) => x && String(x).trim());
  return nm && String(nm).trim() ? String(nm).trim() : `goodsId=${gid}`;
}

/** 本波关注的 SKU：相同 skuId+数量只一条，供监控 JSON 展示 */
function watchedSkuRows(eligibleTasks, skuList) {
  const rows = [];
  const seen = new Set();
  for (const task of eligibleTasks) {
    const need = Number(task.quantity) || 1;
    const k = `${task.skuId}:${need}`;
    if (seen.has(k)) continue;
    seen.add(k);
    const sku = skuList.find((s) => s.id === task.skuId);
    rows.push({
      skuId: task.skuId,
      need,
      stock: sku != null ? sku.stock : null,
    });
  }
  return rows;
}

/** 监测到有货时：控制台打印该商品本轮 getShelvesSku 返回的全部 SKU */
function logAllSkusToConsoleOnStockHit(gid, gTitle, skuList) {
  const ts = logs.formatLocalTimestamp(new Date());
  const title =
    gTitle && String(gTitle).trim() ? String(gTitle).trim() : `goodsId=${gid}`;
  const list = Array.isArray(skuList) ? skuList : [];
  console.log(
    `[rush] ${ts} 监测到有货 goodsId=${gid} · ${title} · 货架 SKU 共 ${list.length} 条`
  );
  for (const s of list) {
    const name = String(s.skuName ?? s.skuTitle ?? "").trim() || "—";
    const price = s.sellPrice ?? s.totalPrice;
    const pricePart =
      price != null && price !== "" ? ` price=${price}` : "";
    console.log(`  skuId=${s.id} stock=${s.stock}${pricePart} ${name}`);
  }
}

const ACCOUNTS_FILE = "rush-accounts.json";
const TASKS_FILE = "rush-tasks.json";
/** 有货快照（满足下单库存的每一波一条），便于核对上货时间；数据目录下 JSON */
const STOCK_HITS_FILE = "rush-stock-hits.json";
const MAX_STOCK_HIT_RECORDS = (() => {
  const raw = Number(process.env.TF_STOCK_HIT_MAX);
  if (Number.isFinite(raw) && raw >= 20) {
    return Math.min(Math.floor(raw), 50_000);
  }
  return 3000;
})();

/** 官方接口经代理时不宜用 60s 默认，否则日志只看到「代理」长时间无下一句 */
const RUSH_OFFICIAL_TIMEOUT_MS = 25_000;

/**
 * 抢购语义（本文件约定）：
 * - 同一 goodsId 一次查货架后，凡「库存 ≥ 要买」的任务各占一条独立链路，Promise.all 并行，互不等待。
 * - 每个任务对同一 placeBody 并发提单 PLACE_ORDER_FANOUT 次（默认 3）；可加大以提高单账号命中概率（可能多笔待付）。
 * - 库存份数少于任务数时，谁能成单由官方决定；本机侧保证的是「有货瞬间全员并发出手」，而不是保证每人一单。
 *
 * 可通过环境变量调整，例如 TF_RUSH_PLACE_FANOUT=5（默认见 DEFAULT_PLACE_ORDER_FANOUT，clamp 1～32）。
 */
const DEFAULT_PLACE_ORDER_FANOUT = 3;
const PLACE_ORDER_FANOUT = (() => {
  const raw = Number(process.env.TF_RUSH_PLACE_FANOUT);
  const n =
    Number.isFinite(raw) && raw > 0
      ? Math.floor(raw)
      : DEFAULT_PLACE_ORDER_FANOUT;
  return Math.max(1, Math.min(32, n));
})();

/**
 * placeOrder 全失败且含 401 时：刷新 token 再整轮 fanout；可连续执行多次（默认 2 次）。
 * 环境变量 TF_RUSH_PLACE_401_RETRIES（0～5，默认 2）；0 表示不重试。
 */
const DEFAULT_PLACE_ORDER_401_RETRIES = 2;
const PLACE_ORDER_401_RETRIES = (() => {
  const raw = Number(process.env.TF_RUSH_PLACE_401_RETRIES);
  const n =
    Number.isFinite(raw) && raw >= 0
      ? Math.floor(raw)
      : DEFAULT_PLACE_ORDER_401_RETRIES;
  return Math.max(0, Math.min(5, n));
})();

/** 任务里持久化的地址快照允许的字段（与 bookPageQuery records 项一致） */
const ADDRESS_SNAPSHOT_KEYS = [
  "id",
  "bookName",
  "bookPhone",
  "bookProvince",
  "bookCity",
  "bookCounty",
  "bookAddress",
  "bookDefaultStatus",
  "bookType",
];

function sanitizeAddressBookSnapshot(raw) {
  if (raw == null || typeof raw !== "object") return null;
  const id = raw.id;
  if (id == null || id === "") return null;
  const out = {};
  for (const k of ADDRESS_SNAPSHOT_KEYS) {
    if (Object.prototype.hasOwnProperty.call(raw, k)) out[k] = raw[k];
  }
  out.id = Number(id);
  if (!Number.isFinite(out.id)) return null;
  if (
    out.bookProvince == null &&
    out.bookCity == null &&
    out.bookAddress == null
  ) {
    return null;
  }
  return out;
}

/** 任务上已存快照是否与当前任务的 addressBookId 一致（未指定 id 则任意快照可用） */
function bookFromTaskSnapshot(task) {
  const snap = task.addressBookSnapshot;
  const s = sanitizeAddressBookSnapshot(snap);
  if (!s) return null;
  if (
    task.addressBookId != null &&
    task.addressBookId !== "" &&
    Number(task.addressBookId) !== Number(s.id)
  ) {
    return null;
  }
  return s;
}

/** 单任务最多保留的「提交订单成功」条数（写入 rush-tasks.json） */
const MAX_PLACE_RECORDS = 80;

/** taskId -> 定时 / 状态（reflow 无独立 interval，由 goodsMonitors 轮询） */
const timers = new Map();

/**
 * goodsId -> { taskIds, intervalId? }
 * 同一商品多任务仅发起一次 getShelvesSku，再按各任务 skuId 匹配库存并分别下单。
 */
const goodsMonitors = new Map();

function taskShouldPollNow(task) {
  if (!task?.running) return false;
  const h = timers.get(task.id);
  if (!h) return false;
  if (task.mode === "reflow") return h.kind === "reflow";
  if (task.mode === "scheduled") return h.kind === "scheduled_run";
  return false;
}

/** 仅运行中且在轮询窗口内的任务才允许发下单请求（停任务 / 定时结束则不再请求） */
function taskStillActiveForOrder(task) {
  return !!(task && task.running && taskShouldPollNow(task));
}

/**
 * 同一 goodsId 只打一路 getShelvesSku，间隔由「当前正在轮询的」任务共同决定。
 * 取各任务 pollIntervalMs 的**最大值**（最慢为准）：多 SKU 任务不会把监控频率拉快，
 * 一次货架即带出全部 SKU 库存，任务仅区分下单目标 SKU。
 */
function maxPollIntervalMsForActiveGoodsTasks(goodsId) {
  const g = goodsMonitors.get(Number(goodsId));
  if (!g) return null;
  let maxMs = null;
  for (const tid of g.taskIds) {
    const task = tasks.find((t) => t.id === tid);
    if (!task || !task.running) continue;
    const h = timers.get(tid);
    if (!h) continue;
    if (task.mode === "reflow" && h.kind === "reflow") {
      const ms = Math.max(50, Number(task.pollIntervalMs) || 1000);
      maxMs = maxMs == null ? ms : Math.max(maxMs, ms);
    } else if (task.mode === "scheduled" && h.kind === "scheduled_run") {
      const ms = Math.max(50, Number(task.pollIntervalMs) || 500);
      maxMs = maxMs == null ? ms : Math.max(maxMs, ms);
    }
  }
  return maxMs;
}

function refreshGoodsMonitorInterval(goodsId) {
  const gid = Number(goodsId);
  const g = goodsMonitors.get(gid);
  if (!g) return;
  const ms = maxPollIntervalMsForActiveGoodsTasks(gid);

  if (g.intervalId != null) {
    clearInterval(g.intervalId);
    g.intervalId = undefined;
  }
  if (ms == null) return;

  g.intervalId = setInterval(() => {
    void runWaveForGoods(gid);
  }, ms);
}

function registerTaskForGoodsMonitor(task) {
  const gid = Number(task.goodsId);
  let g = goodsMonitors.get(gid);
  if (!g) {
    g = { taskIds: new Set(), intervalId: undefined };
    goodsMonitors.set(gid, g);
  }
  const shared = g.taskIds.size > 0 && !g.taskIds.has(task.id);
  g.taskIds.add(task.id);
  if (shared) {
    logs.pushMonitor({
      event: "shared_monitor",
      taskLabel: taskMonLabel(task),
      goodsId: gid,
    });
  }
  refreshGoodsMonitorInterval(gid);
}

function unregisterTaskFromGoodsMonitor(task) {
  const gid = Number(task.goodsId);
  const g = goodsMonitors.get(gid);
  if (!g) return;
  g.taskIds.delete(task.id);
  if (g.taskIds.size === 0) {
    if (g.intervalId != null) {
      clearInterval(g.intervalId);
      g.intervalId = undefined;
    }
    goodsMonitors.delete(gid);
  } else {
    refreshGoodsMonitorInterval(gid);
  }
}

let accounts = [];
let tasks = [];
/** @type {object[]} */
let stockHitRecords = [];

function loadStockHitsFromDisk() {
  const arr = readJson(STOCK_HITS_FILE, []);
  stockHitRecords = Array.isArray(arr) ? arr : [];
}

function appendStockHitRecord(rec) {
  stockHitRecords.push(rec);
  while (stockHitRecords.length > MAX_STOCK_HIT_RECORDS) stockHitRecords.shift();
  writeJson(STOCK_HITS_FILE, stockHitRecords);
}

function listStockHits(limit = 200) {
  const n = Math.max(1, Math.min(5000, Number(limit) || 200));
  return [...stockHitRecords].slice(-n).reverse();
}

function load() {
  accounts = readJson(ACCOUNTS_FILE, []);
  tasks = readJson(TASKS_FILE, []);
  loadStockHitsFromDisk();
  let tasksTouched = false;
  for (const t of tasks) {
    if (t.running) {
      t.running = false;
      tasksTouched = true;
    }
    if (t.mode === "scheduled") {
      if (t.pollIntervalMs == null || Number(t.pollIntervalMs) < 50) {
        t.pollIntervalMs = 500;
        tasksTouched = true;
      }
      if (
        t.scheduledDurationSec == null ||
        Number(t.scheduledDurationSec) < 1
      ) {
        t.scheduledDurationSec = 60;
        tasksTouched = true;
      }
    }
    if (!Array.isArray(t.placeRecords)) {
      t.placeRecords = [];
      tasksTouched = true;
    }
  }
  if (tasksTouched) writeJson(TASKS_FILE, tasks);
}

function saveAccounts() {
  writeJson(ACCOUNTS_FILE, accounts);
}

function saveTasks() {
  writeJson(TASKS_FILE, tasks);
}

/** 下单成功后追加一条提交记录（持久化，便于不靠日志也能确认成单） */
function appendPlaceRecord(taskId, rec) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;
  if (!Array.isArray(task.placeRecords)) task.placeRecords = [];
  task.placeRecords.push(rec);
  while (task.placeRecords.length > MAX_PLACE_RECORDS) task.placeRecords.shift();
  saveTasks();
}

function normOrderIdsKey(ids) {
  if (!Array.isArray(ids)) return "";
  const nums = ids
    .map((x) => Number(x))
    .filter((x) => Number.isFinite(x))
    .sort((a, b) => a - b);
  return nums.join(",");
}

/**
 * 按前端行数据删除一条 placeRecords（body: { at, orderIds }）；仅本地 JSON，不调官方。
 */
function removePlaceRecord(taskId, body) {
  const rawAt = body?.at;
  const orderIds = body?.orderIds;
  const task = tasks.find((t) => t.id === taskId);
  if (!task) throw new Error("任务不存在");
  if (!Array.isArray(task.placeRecords)) task.placeRecords = [];
  const atMs = Number(rawAt);
  if (!Number.isFinite(atMs)) {
    throw new Error("缺少或无效的 at");
  }
  const wantKey = normOrderIdsKey(orderIds);
  const idx = task.placeRecords.findIndex((rec) => {
    const recAt = Number(rec?.at);
    if (!Number.isFinite(recAt) || recAt !== atMs) return false;
    return normOrderIdsKey(rec.orderIds) === wantKey;
  });
  if (idx === -1) throw new Error("未找到匹配的提交记录");
  task.placeRecords.splice(idx, 1);
  saveTasks();
  return task;
}

/** personal 接口 body：{ code, data: { memberSubjectVOS } } */
function memberSubjectsFromPersonalBody(apiBody) {
  const vos = apiBody?.data?.memberSubjectVOS;
  if (!Array.isArray(vos)) return [];
  return vos.map((v) => {
    const subjectName =
      v.subjectName != null && String(v.subjectName).trim() !== ""
        ? String(v.subjectName).trim()
        : "";
    const td =
      v.termDay != null && v.termDay !== ""
        ? Number(v.termDay)
        : NaN;
    return {
      subjectName,
      termDay: Number.isFinite(td) ? td : null,
    };
  });
}

async function syncMemberSubjectsForAccount(account) {
  if (!account.access_token) return;
  const body = await personal(account.access_token);
  account.memberSubjects = memberSubjectsFromPersonalBody(body);
  account.personalAt = Date.now();
}

function memberSummaryForMask(a) {
  if (!a.access_token) return "—";
  if (a.memberSubjects === undefined)
    return "未同步（请点「刷新 Token」）";
  if (!a.memberSubjects.length) return "无";
  return a.memberSubjects
    .map((m) => {
      const n = m.subjectName || "会员";
      if (m.termDay != null && Number.isFinite(m.termDay))
        return `${n}（剩${m.termDay}天）`;
      return n;
    })
    .join("、");
}

const MAX_ACCOUNT_REMARK = 512;

function maskAccount(a) {
  const { id, username, updatedAt, currentUser } = a;
  const nickRaw = currentUser?.nickName;
  const nickName =
    nickRaw != null && String(nickRaw).trim() ? String(nickRaw).trim() : "";
  return {
    id,
    username,
    updatedAt,
    hasToken: !!a.access_token,
    phone: currentUser?.phone || currentUser?.account,
    nickName,
    memberSummary: memberSummaryForMask(a),
    remark: a.remark != null ? String(a.remark) : "",
  };
}

async function refreshAccountToken(account) {
  const data = await loginPassword(account.username, account.password);
  account.access_token = data.access_token;
  account.currentUser = data.currentUser;
  account.updatedAt = Date.now();
  try {
    await syncMemberSubjectsForAccount(account);
  } catch {
    /* 保留原有 memberSubjects；首次登录拉取失败则仍为 undefined */
  }
  saveAccounts();
  return account.access_token;
}

async function getToken(account) {
  if (account.access_token) return account.access_token;
  return refreshAccountToken(account);
}

/**
 * 与本次波次实际传入 tfApi 的 waveProxy 一致（看是否带 dispatcher），
 * 避免仅用 getProxyEndpoint 缓存、在 TTL 边界上误标成「直连」。
 */
function proxyEndpointMeta(waveProxy, proxySlot) {
  if (waveProxy?.dispatcher || waveProxy?.httpsAgent) {
    const meta = waveProxy._proxyPoolMeta;
    if (meta && meta.host != null && meta.port != null) {
      return {
        used: true,
        host: meta.host,
        port: meta.port,
        label: `走代理 ${meta.host}:${meta.port}`,
      };
    }
    const p = proxyCache.getProxyEndpoint(proxySlot);
    if (p && p.host != null && p.port != null) {
      return {
        used: true,
        host: p.host,
        port: p.port,
        label: `走代理 ${p.host}:${p.port}`,
      };
    }
    return { used: true, host: null, port: null, label: "走代理" };
  }
  return {
    used: false,
    host: null,
    port: null,
    label: "未使用代理（直连官方）",
  };
}

function proxyLabelForWave(waveProxy, proxySlot) {
  return proxyEndpointMeta(waveProxy, proxySlot).label;
}

function proxyMetaForPlaceWave(waveProxy) {
  return proxyEndpointMeta(waveProxy, proxyCache.PLACE_ORDER_SLOT);
}

function rushReq(waveProxy) {
  if (!waveProxy || typeof waveProxy !== "object") {
    return { timeout: RUSH_OFFICIAL_TIMEOUT_MS };
  }
  const { _proxyPoolMeta: _m, ...rest } = waveProxy;
  return { ...rest, timeout: RUSH_OFFICIAL_TIMEOUT_MS };
}

/** 用抢购账号 token 调商城接口；401 时自动刷新 token 再请求一次 */
async function withAccountApi(accountId, apiCall) {
  const account = accounts.find((a) => a.id === accountId);
  if (!account) throw new Error("账号不存在");
  let token = await getToken(account);
  try {
    return await apiCall(token);
  } catch (e) {
    if (
      e.response?.status === 401 ||
      (typeof e.message === "string" && e.message.includes("401"))
    ) {
      token = await refreshAccountToken(account);
      return await apiCall(token);
    }
    throw e;
  }
}

/**
 * 已确认有货后的下单链：只用任务里已保存的 addressBookSnapshot 组单。
 * 若配置了 DM_PROXY_FETCH_URL（或 data/proxy-pool-fetch-url.txt），placeOrder 从代理池轮询取线；否则直连官方。
 * 错误写入该任务日志，不向外抛。任意时刻任务已停止或不在轮询窗口则不再调用 placeOrder。
 */
async function tryPlaceOrderForTask(task, detail, sku, wave, skuMs) {
  const taskId = task.id;
  const liveTask = () => tasks.find((t) => t.id === taskId);

  let t = liveTask();
  if (!t) return;
  const account = accounts.find((a) => a.id === t.accountId);
  if (!account || !taskStillActiveForOrder(t)) return;

  const need = Number(t.quantity) || 1;
  let token = await getToken(account);

  t = liveTask();
  if (!t || !taskStillActiveForOrder(t)) {
    logs.pushMonitor({
      event: "skip_inactive",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
      skuId: task.skuId,
      stock: sku.stock,
      need,
    });
    return;
  }

  const book = bookFromTaskSnapshot(t);

  t = liveTask();
  if (!t || !taskStillActiveForOrder(t)) {
    logs.pushMonitor({
      event: "skip_inactive",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
      skuId: task.skuId,
      stock: sku.stock,
      need,
    });
    return;
  }

  if (!book) {
    logs.pushMonitor({
      event: "no_address",
      taskLabel: taskMonLabel(t),
      goodsId: t.goodsId,
      skuId: t.skuId,
      hint: "任务里没有可用的地址快照：请在页面选好收货地址并保存任务后再抢购",
    });
    return;
  }

  const companyId = detail.companyId;
  const orgId = detail.orgId;
  if (companyId == null || orgId == null) {
    logs.pushMonitor({
      event: "shelf_incomplete",
      taskLabel: taskMonLabel(t),
      goodsId: t.goodsId,
      skuId: t.skuId,
      missing: "companyId_or_orgId",
    });
    return;
  }

  const unitYuan = Number(sku.sellPrice ?? sku.totalPrice);
  if (!Number.isFinite(unitYuan) || unitYuan < 0) {
    logs.pushMonitor({
      event: "bad_price",
      taskLabel: taskMonLabel(t),
      goodsId: t.goodsId,
      skuId: t.skuId,
    });
    return;
  }
  const orderFeeVal = unitYuan * need;

  t = liveTask();
  if (!t || !taskStillActiveForOrder(t)) {
    logs.pushMonitor({
      event: "skip_inactive",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
      skuId: task.skuId,
      stock: sku.stock,
      need,
    });
    return;
  }

  await proxyCache.ensurePlaceProxyAvailable();

  t = liveTask();
  if (!t || !taskStillActiveForOrder(t)) {
    logs.pushMonitor({
      event: "skip_inactive",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
      skuId: task.skuId,
      stock: sku.stock,
      need,
    });
    return;
  }

  const pm = proxyCache.getPlaceIntentLogMeta();

  const placeBody = buildPlaceBody({
    companyId,
    orgId,
    skuId: t.skuId,
    quantity: need,
    orderPrice: orderFeeVal,
    book,
  });

  const poLogTag = placeOrderLogTag(t, account);
  const callPlace = (curTok) => {
    const waveProxy = proxyCache.takeProxyWaveOptions();
    const px = rushReq(waveProxy);
    return placeOrder(curTok, placeBody, px, poLogTag);
  };

  const is401 = (err) => err?.response?.status === 401;

  async function fanoutPlace(curTok) {
    return Promise.allSettled(
      Array.from({ length: PLACE_ORDER_FANOUT }, () => callPlace(curTok))
    );
  }

  const fanoutP = fanoutPlace(token);
  logs.pushMonitor({
    event: "place_intent",
    taskLabel: taskMonLabel(t),
    goodsId: t.goodsId,
    skuId: t.skuId,
    stock: sku.stock,
    need,
    addressFrom: "task_snapshot",
    durationMs: skuMs,
    proxyUsed: pm.used,
    proxyHost: pm.host,
    proxyPort: pm.port,
    placeFanout: PLACE_ORDER_FANOUT,
  });

  let settled = await fanoutP;
  let successes = settled
    .filter((s) => s.status === "fulfilled")
    .map((s) => s.value);
  let failures = settled
    .filter((s) => s.status === "rejected")
    .map((s) => s.reason);

  let retries401Left = PLACE_ORDER_401_RETRIES;
  while (
    successes.length === 0 &&
    retries401Left > 0 &&
    failures.some(
      (e) =>
        is401(e) && !proxyCache.shouldInvalidateProxyForError(e)
    )
  ) {
    retries401Left -= 1;
    t = liveTask();
    if (!t || !taskStillActiveForOrder(t)) return;
    const newTok = await refreshAccountToken(account);
    settled = await fanoutPlace(newTok);
    successes = settled
      .filter((s) => s.status === "fulfilled")
      .map((s) => s.value);
    failures = settled
      .filter((s) => s.status === "rejected")
      .map((s) => s.reason);
  }

  t = liveTask() || t;
  for (const placeRes of successes) {
    const okSnippet = JSON.stringify(placeRes.data || placeRes).slice(0, 400);
    const payload = placeRes.data != null ? placeRes.data : placeRes;
    const idsRaw = payload?.orderIds ?? payload?.orderId;
    const orderIds = Array.isArray(idsRaw)
      ? idsRaw.map((x) => Number(x)).filter((x) => Number.isFinite(x))
      : idsRaw != null && idsRaw !== ""
        ? [Number(idsRaw)].filter((x) => Number.isFinite(x))
        : [];
    const at = Date.now();
    const waveMs = Number(wave);
    const atLocal = logs.formatLocalTimestamp(new Date(at));
    const waveLocal = Number.isFinite(waveMs)
      ? logs.formatLocalTimestamp(new Date(waveMs))
      : null;
    appendPlaceRecord(taskId, {
      at,
      atLocal,
      wave,
      waveLocal,
      orderIds,
      goodsId: t.goodsId,
      skuId: t.skuId,
      quantity: need,
    });
    logs.pushMonitor({
      event: "place_ok",
      taskId,
      taskLabel: taskMonLabel(t),
      goodsId: t.goodsId,
      skuId: t.skuId,
      need,
      quantity: need,
      orderIds,
      at,
      atLocal,
      wave,
      waveLocal,
      snippet: okSnippet,
    });
    const idsStr =
      orderIds.length > 0 ? orderIds.map((x) => String(x)).join(",") : "—";
    console.log(
      `[rush] ${atLocal} 提交成功 ${taskMonLabel(t)} goodsId=${t.goodsId} skuId=${t.skuId} orderIds=${idsStr} resp=${okSnippet}`
    );
  }

  if (successes.length === 0) {
    const last = failures[failures.length - 1];
    const fb = last
      ? summarizeTfErrorForLog(
          last.response?.status,
          last.response?.data != null ? last.response.data : last.message,
          360
        )
      : "";
    console.warn(
      `[rush] ${logs.formatLocalTimestamp(new Date())} 提交全部失败 ${taskMonLabel(
        liveTask() || t
      )} goodsId=${t.goodsId} skuId=${t.skuId} ${fb}`
    );
    throw last || new Error("placeOrder 全部失败");
  }
}

/**
 * 同一 goodsId 单次查货架直连官方；有货后的 placeOrder 在配置取号 URL 时走代理池。setInterval 到点即发。
 */
async function runWaveForGoods(goodsId) {
  const gid = Number(goodsId);
  const g = goodsMonitors.get(gid);
  if (!g || !g.taskIds.size) return;

  const eligibleTasks = [...g.taskIds]
    .map((id) => tasks.find((t) => t.id === id))
    .filter((t) => t && taskShouldPollNow(t));

  if (!eligibleTasks.length) return;

  const proxySlot = proxyCache.PLACE_ORDER_SLOT;
  const wave = `${Date.now()}`;
  const gTitle = goodsTitleFromTasks(eligibleTasks, gid);

  try {
    const skuT0 = Date.now();
    let detailRes;
    try {
      detailRes = await getShelvesSku(null, gid, 1, rushReq(null));
    } catch (e) {
      const tunnelHint =
        e.code === "ECONNABORTED" || /timeout/i.test(String(e.message));
      const body = summarizeTfErrorForLog(
        e.response?.status,
        e.response?.data != null ? e.response.data : e.message,
        280
      );
      logs.pushMonitor({
        event: "wave_fail",
        goodsId: gid,
        goodsTitle: gTitle,
        body,
        tunnelHint,
        shelfDirect: true,
      });
      return;
    }
    const skuMs = Date.now() - skuT0;
    const pxMeta = proxyEndpointMeta(null, proxySlot);

    const detail = detailRes.data;
    const skuList = detail?.goodsSkuList || [];
    const watched = watchedSkuRows(eligibleTasks, skuList);

    const toPlace = [];
    for (const task of eligibleTasks) {
      if (!task.running || !taskShouldPollNow(task)) continue;

      const account = accounts.find((a) => a.id === task.accountId);
      if (!account) {
        logs.pushMonitor({
          event: "account_missing",
          taskLabel: taskMonLabel(task),
          goodsId: gid,
        });
        continue;
      }

      const sku = skuList.find((s) => s.id === task.skuId);
      const need = Number(task.quantity) || 1;
      if (!sku) {
        logs.pushMonitor({
          event: "sku_missing",
          taskLabel: taskMonLabel(task),
          goodsId: gid,
          skuId: task.skuId,
          skuCount: skuList.length,
          durationMs: skuMs,
          proxyUsed: pxMeta.used,
          proxyHost: pxMeta.host,
          proxyPort: pxMeta.port,
        });
        continue;
      }
      if (sku.stock < need) {
        continue;
      }

      toPlace.push({ task, sku });
    }

    if (toPlace.length > 0) {
      const tsHit = logs.formatLocalTimestamp(new Date());
      for (const { task, sku } of toPlace) {
        const needHit = Number(task.quantity) || 1;
        const snHit =
          sku.skuName != null && String(sku.skuName).trim() !== ""
            ? String(sku.skuName).trim()
            : task.skuName != null
              ? String(task.skuName).trim()
              : "";
        const namePart = snHit ? ` ${snHit}` : "";
        console.log(
          `[rush] ${tsHit} 有库存可下单 ${taskMonLabel(task)} goodsId=${gid} skuId=${sku.id} stock=${sku.stock} 需购=${needHit}${namePart}`
        );
      }
      logAllSkusToConsoleOnStockHit(gid, gTitle, skuList);
      const hitsPayload = toPlace.map(({ task, sku }) => {
        const need = Number(task.quantity) || 1;
        const sn =
          sku.skuName != null && String(sku.skuName).trim() !== ""
            ? String(sku.skuName).trim()
            : task.skuName != null
              ? String(task.skuName).trim()
              : "";
        const gn =
          task.goodsName != null ? String(task.goodsName).trim() : "";
        return {
          taskId: task.id,
          taskLabel: taskMonLabel(task),
          accountId: task.accountId,
          goodsName: gn,
          skuId: sku.id,
          skuName: sn,
          stock: sku.stock,
          need,
        };
      });
      const hitAt = Date.now();
      const waveMs = Number(wave);
      appendStockHitRecord({
        at: hitAt,
        atLocal: logs.formatLocalTimestamp(new Date(hitAt)),
        wave,
        waveLocal: Number.isFinite(waveMs)
          ? logs.formatLocalTimestamp(new Date(waveMs))
          : null,
        goodsId: gid,
        goodsTitle: gTitle,
        shelfFetchMs: skuMs,
        hits: hitsPayload,
      });
      logs.pushMonitor({
        event: "stock_available",
        goodsId: gid,
        goodsTitle: gTitle,
        shelfFetchMs: skuMs,
        hitCount: hitsPayload.length,
        hits: hitsPayload,
      });
    }

    /**
     * 有货：先并发拉起每个账号的下单链（不互相 await），再写货架监控，避免日志/推送挡首批 HTTP。
     * toPlace 内一任务一行，多账号即多路并行 tryPlaceOrderForTask。
     */
    const placeP = Promise.all(
      toPlace.map(({ task, sku }) =>
        tryPlaceOrderForTask(task, detail, sku, wave, skuMs).catch((e) => {
          const timeoutHint =
            e.code === "ECONNABORTED" ||
            /timeout/i.test(String(e.message));
          const body = summarizeTfErrorForLog(
            e.response?.status,
            e.response?.data != null ? e.response.data : e.message,
            280
          );
          console.warn(
            `[rush] ${logs.formatLocalTimestamp(new Date())} 提交失败 ${taskMonLabel(task)} goodsId=${gid} skuId=${task.skuId}${timeoutHint ? " timeout" : ""} ${body}`
          );
          logs.pushMonitor({
            event: "place_fail",
            taskLabel: taskMonLabel(task),
            goodsId: gid,
            body,
            timeoutHint,
          });
        })
      )
    );

    logs.pushMonitor({
      event: "shelf_poll",
      goodsId: gid,
      skuCount: skuList.length,
      durationMs: skuMs,
      shelfDirect: true,
      placeDirect: !proxyCache.isPlaceProxyConfigured(),
      proxyUsed: pxMeta.used,
      proxyHost: pxMeta.host,
      proxyPort: pxMeta.port,
      watched,
    });

    await placeP;
  } catch (e) {
    const tunnelHint =
      e.code === "ECONNABORTED" || /timeout/i.test(String(e.message));
    const body = summarizeTfErrorForLog(
      e.response?.status,
      e.response?.data != null ? e.response.data : e.message,
      280
    );
    logs.pushMonitor({
      event: "wave_fail",
      goodsId: gid,
      goodsTitle: gTitle,
      body,
      tunnelHint,
      shelfDirect: true,
    });
  }
}

/** 前端常用 `YYYY-MM-DD HH:mm:ss.SSS`，转成 Date 可稳定解析的形式 */
function parseScheduledAtMs(scheduledAt) {
  const s = String(scheduledAt ?? "").trim();
  if (!s) return NaN;
  const normalized = s.includes("T") ? s : s.replace(/^(\d{4}-\d{2}-\d{2})\s+/, "$1T");
  return new Date(normalized).getTime();
}

function stopTaskTimers(taskId) {
  const h = timers.get(taskId);
  if (h == null) return;
  if (h.kind === "scheduled_wait") clearTimeout(h.id);
  else if (h.kind === "scheduled_run") clearTimeout(h.endTimeoutId);
  timers.delete(taskId);
}

function startTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return { ok: false, message: "任务不存在" };

  stopTaskTimers(taskId);

  task.running = true;
  saveTasks();
  registerTaskForGoodsMonitor(task);

  if (task.mode === "reflow") {
    const ms = Math.max(50, Number(task.pollIntervalMs) || 1000);
    timers.set(taskId, { kind: "reflow" });
    void runWaveForGoods(task.goodsId);
    refreshGoodsMonitorInterval(Number(task.goodsId));
    logs.pushMonitor({
      event: "task_reflow_start",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
      intervalMs: ms,
    });
  } else if (task.mode === "scheduled") {
    const at = parseScheduledAtMs(task.scheduledAt);
    if (Number.isNaN(at)) {
      unregisterTaskFromGoodsMonitor(task);
      task.running = false;
      saveTasks();
      return { ok: false, message: "scheduledAt 不是合法时间" };
    }
    const delay = Math.max(0, at - Date.now());
    const ms = Math.max(50, Number(task.pollIntervalMs) || 1000);
    const durationSec = Math.max(
      1,
      Number(task.scheduledDurationSec) || 60
    );

    const waitId = setTimeout(() => {
      const tt = tasks.find((x) => x.id === taskId);
      logs.pushMonitor({
        event: "task_scheduled_begin",
        taskLabel: taskMonLabel(tt),
        goodsId: tt?.goodsId,
        intervalMs: ms,
        durationSec,
      });
      const endTimeoutId = setTimeout(() => {
        const t2 = tasks.find((x) => x.id === taskId);
        stopTaskTimers(taskId);
        if (t2) {
          unregisterTaskFromGoodsMonitor(t2);
          t2.running = false;
          saveTasks();
          refreshGoodsMonitorInterval(Number(t2.goodsId));
          logs.pushMonitor({
            event: "task_scheduled_end",
            taskLabel: taskMonLabel(t2),
            durationSec,
          });
        } else {
          logs.pushMonitor({
            event: "task_scheduled_end",
            taskIdShort: String(taskId).slice(0, 8),
            durationSec,
          });
        }
      }, durationSec * 1000);

      timers.set(taskId, { kind: "scheduled_run", endTimeoutId });
      void runWaveForGoods(Number(task.goodsId));
      refreshGoodsMonitorInterval(Number(task.goodsId));
    }, delay);

    timers.set(taskId, { kind: "scheduled_wait", id: waitId });
    logs.pushMonitor({
      event: "task_scheduled_wait",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
      scheduledAt: task.scheduledAt,
      delaySec: Math.round(delay / 1000),
      intervalMs: ms,
      durationSec,
    });
  } else {
    unregisterTaskFromGoodsMonitor(task);
    task.running = false;
    saveTasks();
    return { ok: false, message: "mode 须为 reflow 或 scheduled" };
  }

  return { ok: true };
}

function stopTask(taskId) {
  stopTaskTimers(taskId);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    unregisterTaskFromGoodsMonitor(task);
    task.running = false;
    saveTasks();
    logs.pushMonitor({
      event: "task_stop",
      taskLabel: taskMonLabel(task),
      goodsId: task.goodsId,
    });
  } else {
    logs.pushMonitor({
      event: "task_stop",
      taskIdShort: String(taskId).slice(0, 8),
    });
  }
  return { ok: true };
}

// —— CRUD ——

function listAccountsMasked() {
  return accounts.map(maskAccount);
}

function hasAccount(accountId) {
  return accounts.some((a) => a.id === accountId);
}

async function addAccount({ username, password, remark }) {
  if (!username || !password) throw new Error("需要 username、password");
  const data = await loginPassword(String(username), String(password));
  const acc = {
    id: crypto.randomUUID(),
    username: String(username),
    password: String(password),
    access_token: data.access_token,
    currentUser: data.currentUser,
    updatedAt: Date.now(),
    remark: clipLabel(remark, MAX_ACCOUNT_REMARK),
  };
  try {
    await syncMemberSubjectsForAccount(acc);
  } catch {
    /* memberSubjects 仍为 undefined，列表显示「未同步」 */
  }
  accounts.push(acc);
  saveAccounts();
  return maskAccount(acc);
}

function deleteAccount(id) {
  for (const t of tasks.filter((x) => x.accountId === id)) {
    stopTask(t.id);
  }
  accounts = accounts.filter((a) => a.id !== id);
  tasks = tasks.filter((t) => t.accountId !== id);
  saveAccounts();
  saveTasks();
}

function listTasks() {
  return tasks.map((t) => ({ ...t }));
}

/** 持久化前截断，防止异常长字符串撑爆 JSON */
function clipLabel(s, maxLen) {
  if (s == null) return "";
  const t = String(s).trim();
  if (!t) return "";
  return t.length > maxLen ? `${t.slice(0, maxLen)}…` : t;
}

/** 与 addTask / updateTask 共用的字段校验与快照（不含 id、running、placeRecords） */
function normalizeTaskPayload(body) {
  const {
    accountId,
    name,
    goodsId,
    skuId,
    quantity,
    addressBookId,
    addressBookSnapshot: rawAddressSnap,
    mode,
    pollIntervalMs,
    scheduledAt,
    scheduledDurationSec,
    goodsName,
    skuName,
  } = body;
  if (!accounts.find((a) => a.id === accountId)) {
    throw new Error("账号不存在");
  }
  if (mode !== "reflow" && mode !== "scheduled") {
    throw new Error("mode 须为 reflow 或 scheduled");
  }
  if (mode === "reflow" && (!pollIntervalMs || Number(pollIntervalMs) < 50)) {
    throw new Error("回流须设置 pollIntervalMs ≥ 50");
  }
  if (mode === "scheduled") {
    if (!scheduledAt) throw new Error("定时须设置 scheduledAt ISO 时间");
    if (!pollIntervalMs || Number(pollIntervalMs) < 50) {
      throw new Error("定时须设置波次间隔 pollIntervalMs ≥ 50");
    }
    const dur = Number(scheduledDurationSec);
    if (!Number.isFinite(dur) || dur < 1) {
      throw new Error("定时须设置持续秒数 scheduledDurationSec ≥ 1");
    }
  }
  const base = {
    name: name || `task-${goodsId}-${skuId}`,
    accountId,
    goodsId: Number(goodsId),
    skuId: Number(skuId),
    goodsName: clipLabel(goodsName, 512),
    skuName: clipLabel(skuName, 512),
    quantity: Number(quantity) || 1,
    addressBookId: addressBookId != null && addressBookId !== "" ? Number(addressBookId) : null,
    mode,
    pollIntervalMs:
      mode === "reflow" || mode === "scheduled"
        ? Number(pollIntervalMs)
        : null,
    scheduledAt: mode === "scheduled" ? String(scheduledAt) : null,
    scheduledDurationSec:
      mode === "scheduled"
        ? Math.max(1, Math.floor(Number(scheduledDurationSec)))
        : null,
  };
  if (Object.prototype.hasOwnProperty.call(body, "addressBookSnapshot")) {
    const s = sanitizeAddressBookSnapshot(rawAddressSnap);
    base.addressBookSnapshot = s == null ? undefined : s;
  }
  return base;
}

function addTask(body) {
  const snap = normalizeTaskPayload(body);
  const createdAt = Date.now();
  const task = {
    id: crypto.randomUUID(),
    ...snap,
    running: false,
    createdAt,
    createdAtLocal: logs.formatLocalTimestamp(new Date(createdAt)),
    placeRecords: [],
  };
  tasks.push(task);
  saveTasks();
  return task;
}

function updateTask(id, body) {
  const task = tasks.find((t) => t.id === id);
  if (!task) throw new Error("任务不存在");
  if (task.running) throw new Error("运行中无法修改，请先停止");
  const snap = normalizeTaskPayload(body);
  Object.assign(task, snap);
  saveTasks();
  return task;
}

function deleteTask(id) {
  stopTask(id);
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  logs.clear(id);
}

load();

async function refreshAccountById(accountId) {
  const account = accounts.find((a) => a.id === accountId);
  if (!account) throw new Error("账号不存在");
  await refreshAccountToken(account);
  return maskAccount(account);
}

function updateAccountRemark(accountId, remark) {
  const account = accounts.find((a) => a.id === accountId);
  if (!account) throw new Error("账号不存在");
  account.remark = clipLabel(remark, MAX_ACCOUNT_REMARK);
  account.updatedAt = Date.now();
  saveAccounts();
  return maskAccount(account);
}

/** 进程退出前再写盘一层，防止极端情况下未触发 save */
function persistSnapshot() {
  saveAccounts();
  saveTasks();
  writeJson(STOCK_HITS_FILE, stockHitRecords);
}

module.exports = {
  load,
  listStockHits,
  listAccountsMasked,
  hasAccount,
  addAccount,
  deleteAccount,
  refreshAccountById,
  updateAccountRemark,
  listTasks,
  addTask,
  updateTask,
  deleteTask,
  removePlaceRecord,
  startTask,
  stopTask,
  getLogs: logs.getLogs,
  getMonitorLogs: logs.getMonitorLogs,
  withAccountApi,
  persistSnapshot,
};
