const MAX = 400;
const buffers = new Map();
/** taskId -> Set<(line: string) => void>，单行与 getLogs 条目格式一致 */
const subscribers = new Map();

/** 全局抢购监控日志（按商品合并轮询 + 各任务下单），单路缓冲与订阅 */
const monitorBuffer = [];
/** @type {Set<(entry: object) => void>} */
const monitorSubscribers = new Set();

/** 本地时间 YYYY-MM-DD HH:mm:ss.SSS，便于阅读（与 toISOString 的 UTC+Z 区分） */
function formatLocalTimestamp(d = new Date()) {
  const pad = (n, len = 2) => String(n).padStart(len, "0");
  return [
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`,
  ].join(" ");
}

function push(taskId, line) {
  const ts = formatLocalTimestamp();
  const msg = `[${ts}] ${line}`;
  if (!buffers.has(taskId)) buffers.set(taskId, []);
  const arr = buffers.get(taskId);
  arr.push(msg);
  while (arr.length > MAX) arr.shift();
  const subs = subscribers.get(taskId);
  if (subs) {
    for (const fn of subs) {
      try {
        fn(msg);
      } catch {
        /* 忽略单路订阅回调异常 */
      }
    }
  }
}

/** 返回副本：最新一条在最前，便于前端从上往下扫 */
function getLogs(taskId) {
  const arr = buffers.get(taskId);
  if (!arr) return [];
  return [...arr].reverse();
}

function clear(taskId) {
  buffers.delete(taskId);
  subscribers.delete(taskId);
}

/**
 * @param {string} taskId
 * @param {(line: string) => void} listener 收到新行（含时间前缀，与 getLogs 单条一致）
 * @returns {() => void} 取消订阅
 */
function subscribe(taskId, listener) {
  if (!subscribers.has(taskId)) subscribers.set(taskId, new Set());
  subscribers.get(taskId).add(listener);
  return () => {
    const set = subscribers.get(taskId);
    if (!set) return;
    set.delete(listener);
    if (set.size === 0) subscribers.delete(taskId);
  };
}

/**
 * 监控日志：结构化条目（带本地时间戳），便于前端用卡片展示。
 * 仍支持传入 string，会归一为 { event: 'text', message }。
 */
function pushMonitor(payload) {
  const ts = formatLocalTimestamp();
  const at = Date.now();
  const entry =
    typeof payload === "string"
      ? { event: "text", message: payload, ts, at }
      : { ts, at, ...payload };
  if (entry.event == null) entry.event = "unknown";
  monitorBuffer.push(entry);
  while (monitorBuffer.length > MAX) monitorBuffer.shift();
  for (const fn of monitorSubscribers) {
    try {
      fn(entry);
    } catch {
      /* ignore */
    }
  }
}

function getMonitorLogs() {
  return [...monitorBuffer].reverse();
}

function subscribeMonitor(listener) {
  monitorSubscribers.add(listener);
  return () => {
    monitorSubscribers.delete(listener);
  };
}

function clearMonitor() {
  monitorBuffer.length = 0;
}

module.exports = {
  formatLocalTimestamp,
  push,
  getLogs,
  clear,
  subscribe,
  pushMonitor,
  getMonitorLogs,
  subscribeMonitor,
  clearMonitor,
};
