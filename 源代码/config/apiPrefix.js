var t = "https://app.tfent.cn",
  p = "https://app.tfent.cn",
  n = "";
p = t, n = "", __wxConfig && ("trial" === __wxConfig.envVersion ? (p = "https://app.tfent.cn", n = "") : "develop" === __wxConfig.envVersion && (p = t, n = ""));
var e = {
  ip: p,
  port: n
};
exports.apiPrefix = e;