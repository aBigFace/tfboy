function e(e) {
  var t, n = {
      value: "",
      unit: ""
    },
    a = 1e4;
  return e < a ? (n.value = e, n.unit = "") : (t = Math.floor(Math.log(e) / Math.log(a)), n.value = (e / Math.pow(a, t)).toFixed(1), n.value = 10 * n.value % 10 == 0 ? parseInt(n.value) : n.value, n.unit = ["", "万", "亿", "万亿"][t]), n.value + n.unit
}
exports.getSellNum = function(t) {
  return t < 0 ? "" : t >= 0 && t <= 10 || t >= 10 && t <= 1e3 ? "销量".concat(t) : t > 1e3 && t <= 1e4 ? "销量".concat(parseInt(String(t / 1e3)), "000+") : t > 1e4 && t <= 1e8 || t > 1e8 ? "销量".concat(e(t), "+") : void 0
}, exports.getStockInfo = function(e) {
  return e <= 0 ? "缺货" : e > 0 && e <= 5 ? "库存不足5" : e > 5 && e <= 10 ? "库存不足10" : e > 10 && e <= 20 ? "库存不足20" : e > 20 && e <= 100 ? "库存不足100" : e > 100 && e <= 1e3 ? "库存".concat(parseInt(String(e / 100)), "00+") : e > 1e3 && e <= 1e4 ? "库存".concat(parseInt(String(e / 1e3)), "000+") : e > 1e4 ? "" : void 0
};