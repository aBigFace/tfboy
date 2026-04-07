const fs = require("fs");
const path = require("path");

/**
 * 多进程：每个进程内存独立（含代理缓存）。勿让多个进程共写同一目录下的 rush-*.json。
 * 每实例设置不同 TF_DATA_DIR（及不同 PORT），例如：
 *   TF_DATA_DIR=data-w1 PORT=3001 node src/index.js
 *   TF_DATA_DIR=data-w2 PORT=3002 node src/index.js
 */
function resolveDataDir() {
  const raw = process.env.TF_DATA_DIR;
  if (raw == null || String(raw).trim() === "") {
    return path.join(__dirname, "..", "..", "data");
  }
  return path.isAbsolute(raw) ? raw : path.resolve(process.cwd(), raw);
}

const DATA_DIR = resolveDataDir();

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson(file, fallback) {
  ensureDir();
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function writeJson(file, data) {
  ensureDir();
  const p = path.join(DATA_DIR, file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readJson, writeJson, DATA_DIR };
