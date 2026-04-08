const { readJson, writeJson } = require("../store/persist");

const FILE = "rush-app-settings.json";

/** @type {{ usePlaceProxy: boolean }} */
let cache = loadFromDisk();

function normalize(raw) {
  const o = raw && typeof raw === "object" ? raw : {};
  return {
    /** 提交订单是否走代理池；默认 true */
    usePlaceProxy: o.usePlaceProxy === false ? false : true,
  };
}

function loadFromDisk() {
  return normalize(readJson(FILE, {}));
}

function get() {
  return { ...cache };
}

function getUsePlaceProxy() {
  return cache.usePlaceProxy !== false;
}

function setUsePlaceProxy(v) {
  cache.usePlaceProxy = Boolean(v);
  writeJson(FILE, cache);
}

function patch(body) {
  if (!body || typeof body !== "object") return get();
  if (Object.prototype.hasOwnProperty.call(body, "usePlaceProxy")) {
    cache.usePlaceProxy = Boolean(body.usePlaceProxy);
    writeJson(FILE, cache);
  }
  return get();
}

module.exports = {
  get,
  getUsePlaceProxy,
  setUsePlaceProxy,
  patch,
};
