var e = require("../common/vendor.js"),
  n = require("../common/app-theme.js");
exports.showGoLogin = function() {
  return new Promise((function(o, i) {
    "0" !== e.index.getStorageSync("loginFlag") && e.index.getStorageSync("loginFlag") ? "1" === e.index.getStorageSync("loginFlag") && i() : (e.index.setStorageSync("loginFlag", "1"), e.index.showModal({
      title: "登录提示",
      content: "您暂未登录，登录后可体验更多服务",
      cancelText: "暂不登录",
      cancelColor: n.AppTheme.textGray,
      confirmColor: n.AppTheme.themeColor,
      confirmText: "立即登录",
      success: function(n) {
        e.index.setStorageSync("loginFlag", "0"), n.confirm ? (e.index.navigateTo({
          url: "/pages/login/login"
        }), o()) : o()
      },
      fail: function(n) {
        e.index.setStorageSync("loginFlag", "0"), i(n)
      }
    }))
  }))
};