var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  r = require("../../apis/user.js"),
  i = require("../../common/app-theme.js"),
  a = require("../../common/user.js"),
  u = require("../../utils/uniUtil.js"),
  s = require("../../utils/util.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../utils/commonEnum.js");
var c = t.defineComponent({
  name: "login",
  setup: function() {
    var c = t.reactive({
      isRead: !1,
      num: 0,
      goIndex: !1,
      code: "",
      wxLoginInfo: {
        openId: "",
        sessionKey: "",
        userExist: !1
      }
    });
    t.onLoad(o(n().mark((function e() {
      var o;
      return n().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return console.info("onLoad========>页面加载完成"), c.isRead = !1, c.num = 0, c.goIndex = !1, e.next = 6, a.wxLogin();
          case 6:
            o = e.sent, c.code = o.code, r.apiWxLoginByCode(o.code).then((function(e) {
              c.wxLoginInfo = e.data, t.index.setStorageSync("appletOpenId", e.data.openId), t.index.setStorageSync("unionId", e.data.unionId), console.log("state.wxLoginInfo", c.wxLoginInfo)
            }));
          case 9:
          case "end":
            return e.stop()
        }
      }), e)
    })))), t.onShow((function() {
      c.isRead = !1, c.num = 0, c.goIndex = !1
    }));
    var p = function() {
        var i = o(n().mark((function o(i) {
          var u, s, p;
          return n().wrap((function(n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                return u = getApp(), n.next = 3, a.wxLogin();
              case 3:
                s = n.sent, p = s.code, r.apiWxLoginByCode(s.code).then((function(n) {
                  c.wxLoginInfo = n.data, t.index.setStorageSync("appletOpenId", n.data.openId), a.loginByWeixin(e(e(e({}, i), c.wxLoginInfo), {}, {
                    code: p,
                    shareId: u.globalData.shopInfo.shareId,
                    orgId: u.globalData.shopInfo.orgId,
                    type: 1
                  })).then((function() {
                    d()
                  }))
                }));
              case 6:
              case "end":
                return n.stop()
            }
          }), o)
        })));
        return function(e) {
          return i.apply(this, arguments)
        }
      }(),
      d = function() {
        var e = o(n().mark((function e() {
          var o, i;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return (o = getApp()).globalData.hasLogin = !0, o.globalData.refreshPage.searchOrder = !0, c.isRead = !1, c.num = 0, e.next = 7, r.apiGetUserInfo();
              case 7:
                i = e.sent, t.index.setStorageSync("userInfo", i.data), c.goIndex ? t.index.switchTab({
                  url: "/pages/index/index"
                }) : (t.index.setStorageSync("fromType", ""), u.uniUtil.goBackAndRefresh());
              case 10:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, t.toRefs(c)), {}, {
      AppTheme: i.AppTheme,
      changeRead: function() {
        c.isRead = !c.isRead, c.num += 1
      },
      getPhoneNumber: function(e) {
        if (c.num % 2 == 0) return t.index.showToast({
          title: "请阅读并同意对应协议",
          icon: "none"
        }), null;
        if (e.target.code) {
          var n = t.index.getStorageSync("fromType");
          c.goIndex = 0 === Number(n), p({
            encryptPhone: e.target.code
          })
        } else u.uniUtil.showToast("获取手机号失败")
      },
      checkRead: function() {
        if (c.num % 2 == 0) return t.index.showToast({
          title: "请阅读并同意对应协议",
          icon: "none"
        }), null
      },
      handleLogin: function() {
        if (c.num % 2 == 0) return t.index.showToast({
          title: "请阅读并同意对应协议",
          icon: "none"
        }), null;
        c.wxLoginInfo.userExist && p({})
      },
      accountLogin: function() {
        c.isRead = !1, c.num = 0, t.index.navigateTo({
          url: "/pages/login/accountLogin"
        })
      },
      openService: function() {
        s.openArguments("xieyi.png")
      },
      openRule: function() {
        s.openArguments("yinsi.png")
      },
      openArguments: s.openArguments
    })
  }
});
var p = t._export_sfc(c, [
  ["render", function(e, n, o, r, i, a) {
    return t.e({
      a: e.$static + "/static/logo.png",
      b: e.wxLoginInfo.userExist
    }, e.wxLoginInfo.userExist ? {
      c: t.o((function() {
        return e.handleLogin && e.handleLogin.apply(e, arguments)
      }))
    } : {
      d: e.isRead ? "getPhoneNumber" : "",
      e: t.o((function() {
        return e.getPhoneNumber && e.getPhoneNumber.apply(e, arguments)
      })),
      f: t.o((function() {
        return e.checkRead && e.checkRead.apply(e, arguments)
      }))
    }, {
      g: t.o((function() {
        return e.accountLogin && e.accountLogin.apply(e, arguments)
      })),
      h: t.o((function() {
        return e.changeRead && e.changeRead.apply(e, arguments)
      })),
      i: e.isRead,
      j: t.o((function() {
        return e.openService && e.openService.apply(e, arguments)
      })),
      k: t.o((function() {
        return e.openRule && e.openRule.apply(e, arguments)
      })),
      l: t.o((function(n) {
        return e.openArguments("weichengnian.png")
      }))
    })
  }],
  ["__scopeId", "data-v-23b3be22"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/login.vue"]
]);
wx.createPage(p);