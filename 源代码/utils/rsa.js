var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../common/vendor.js"),
  t = require("../apis/user.js"),
  u = function() {
    return new Promise((function(e, r) {
      var u = n.index.getStorageSync("publicKey");
      u ? e(u) : t.apiGetPublicKey().then((function(r) {
        n.index.setStorageSync("publicKey", r.data.publicKey), e(r.data.publicKey)
      })).catch((function(e) {
        r(e)
      }))
    }))
  };

function i() {
  return (i = r(e().mark((function r(t) {
    var i, c, a;
    return e().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return i = new n.JSEncrypt, e.next = 3, u();
        case 3:
          return c = e.sent, i.setPublicKey(c), a = i.encryptLong(t), e.abrupt("return", a);
        case 7:
        case "end":
          return e.stop()
      }
    }), r)
  })))).apply(this, arguments)
}
exports.getRsaCode = function(e) {
  return i.apply(this, arguments)
};