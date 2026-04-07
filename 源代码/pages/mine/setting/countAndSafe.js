var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../common/vendor.js"),
  a = require("../../../utils/commonEnum.js"),
  r = require("../../../apis/user.js"),
  s = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var u = o.defineComponent({
  name: "countAndSafe",
  setup: function() {
    var e = o.reactive({
      phone: "",
      email: "",
      wxNickName: "",
      isAbnormal: 0,
      isWeiXinBind: 0,
      authDesc: "",
      auth: 0,
      visited: 0
    });
    o.onShow((function() {
      e.email = o.index.getStorageSync("userInfo").email, e.phone = o.index.getStorageSync("userInfo").phone, e.wxNickName = o.index.getStorageSync("userInfo").wxNickName, e.isAbnormal = o.index.getStorageSync("userInfo").isAbnormal, e.isWeiXinBind = o.index.getStorageSync("userInfo").isWeiXinBind, e.authDesc = o.index.getStorageSync("userInfo").authDesc, e.auth = o.index.getStorageSync("userInfo").auth, e.visited = o.index.getStorageSync("countAndSafeVisited"), null != e.visited && null != e.visited && "" != e.visited || (e.visited = 0, o.index.setStorageSync("countAndSafeVisited", 1))
    }));
    var u = o.ref(),
      c = function() {
        u.value.open()
      },
      d = function() {
        u.value.close()
      },
      l = function() {
        var n = t(i().mark((function n(t) {
          var a, u, c;
          return i().wrap((function(n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                if (a = t.detail.value, !s.isEmpty(a.inputWxNickName)) {
                  n.next = 4;
                  break
                }
                return o.index.showToast({
                  title: "请输入正确昵称",
                  icon: "error",
                  duration: 500
                }), n.abrupt("return");
              case 4:
                if (u = o.index.getStorageSync("appletOpenId"), c = o.index.getStorageSync("unionId"), !s.isEmpty(u) && !s.isEmpty(c)) {
                  n.next = 9;
                  break
                }
                return o.index.showToast({
                  title: "获取微信数据失败。",
                  icon: "error",
                  duration: 500
                }), n.abrupt("return");
              case 9:
                r.apiGetAppletBind(u, c, a.inputWxNickName).then((function(n) {
                  200 == n.code && n.data && o.index.showToast({
                    title: "绑定成功",
                    success: function() {
                      e.wxNickName = n.data, e.isWeiXinBind = 1;
                      var i = o.index.getStorageSync("userInfo");
                      i.wxNickName = e.wxNickName, i.isWeiXinBind = 1, o.index.setStorageSync("userInfo", i), o.index.setStorageSync("countAndSafeVisited", 1), d()
                    },
                    icon: "success",
                    duration: 800
                  })
                }));
              case 10:
              case "end":
                return n.stop()
            }
          }), n)
        })));
        return function(e) {
          return n.apply(this, arguments)
        }
      }(),
      p = o.ref(),
      g = function() {
        p.value.open()
      },
      f = function() {
        p.value.close()
      };
    return n(n({}, o.toRefs(e)), {}, {
      handleChangeMobile: function() {
        e.phone ? o.index.navigateTo({
          url: "/pages/mine/setting/changeMobile?validType=".concat(a.EValidType.beforeChangeTelEmail, "&checkMethod=changeRememberPhone")
        }) : o.index.navigateTo({
          url: "/pages/mine/setting/resetMobile?validType=".concat(a.EValidType.changeMemberBind, "&checkMethod=bindMobilePhone")
        })
      },
      handleChangeEmail: function() {
        e.email ? o.index.navigateTo({
          url: "/pages/mine/setting/changeMobile?validType=".concat(a.EValidType.beforeChangeTelEmail, "&checkMethod=changeRememberEmail")
        }) : o.index.navigateTo({
          url: "/pages/mine/setting/emailSetting?validType=".concat(a.EValidType.changeMemberBind)
        })
      },
      handleIssettingLoginPass: function() {
        var e = o.index.getStorageSync("userInfo").loginPasswordSet;
        o.index.navigateTo({
          url: 1 == e ? "/pages/mine/setting/loginPassword" : "/pages/mine/setting/changeLoginPassword?type=1"
        })
      },
      handleLogout: function() {
        o.index.navigateTo({
          url: "/pages/mine/setting/logoutCount"
        })
      },
      goPageCertify: function() {
        e.auth, o.index.navigateTo({
          url: "/pages/mine/user/certifyInfo"
        })
      },
      handleChangeWx: function() {
        1 === e.isWeiXinBind ? g() : c()
      },
      wxNickNameRef: u,
      wxNickNameRefOpen: c,
      wxNickNameRefClose: d,
      doAppletBind: l,
      unBindRef: p,
      unBindRefOpen: g,
      unBindRefClose: f,
      doAppletUnBind: function() {
        r.apiGetAppletUnBind().then((function(n) {
          200 == n.code && n.data && o.index.showToast({
            title: "解绑成功",
            success: function() {
              e.wxNickName = "", e.isWeiXinBind = 0;
              var n = o.index.getStorageSync("userInfo");
              n.wxNickName = "", n.isWeiXinBind = 0, o.index.setStorageSync("userInfo", n), f()
            },
            icon: "success",
            duration: 800
          })
        }))
      }
    })
  }
});
Array || (o.resolveComponent("uni-icons") + o.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var c = o._export_sfc(u, [
  ["render", function(n, i, t, a, r, s) {
    return o.e({
      a: o.t(n.$filters.encryptPhone(n.phone) || "去绑定"),
      b: o.p({
        type: "forward",
        size: 18,
        color: "#CACACA"
      }),
      c: o.o((function(e) {
        return n.handleChangeMobile()
      })),
      d: o.t(n.$filters.encryptEmail(n.email) || "去绑定"),
      e: o.p({
        type: "forward",
        size: 18,
        color: "#CACACA"
      }),
      f: o.o((function(e) {
        return n.handleChangeEmail()
      })),
      g: 0 == n.isWeiXinBind && 0 == n.visited
    }, 0 == n.isWeiXinBind && 0 == n.visited ? {
      h: n.$static + "/static/image/mine/icon_red_16.png"
    } : {}, {
      i: o.t(n.wxNickName || "去绑定"),
      j: o.p({
        type: "forward",
        size: 18,
        color: "#CACACA"
      }),
      k: o.o((function(e) {
        return n.handleChangeWx()
      })),
      l: 1 == n.isAbnormal && 1 == n.auth
    }, 1 == n.isAbnormal && 1 == n.auth ? {
      m: n.$static + "/static/image/mine/icon_warning_black.png"
    } : {}, {
      n: 0 == n.isAbnormal && 0 == n.auth
    }, 0 == n.isAbnormal && 0 == n.auth ? {
      o: n.$static + "/static/image/mine/icon_red_16.png"
    } : {}, {
      p: 1 == n.auth
    }, (n.auth, {}), {
      q: 0 == n.auth
    }, 0 == n.auth ? {
      r: o.p({
        type: "forward",
        size: 18,
        color: "#CACACA"
      })
    } : {}, {
      s: o.o((function(e) {
        return n.goPageCertify()
      })),
      t: o.p({
        type: "forward",
        size: 18,
        color: "#CACACA"
      }),
      v: o.o((function(e) {
        return n.handleIssettingLoginPass()
      })),
      w: o.p({
        type: "forward",
        size: 18,
        color: "#CACACA"
      }),
      x: o.o((function() {
        return n.handleLogout && n.handleLogout.apply(n, arguments)
      })),
      y: o.o((function(e) {
        return n.wxNickNameRefClose()
      })),
      z: o.o((function() {
        return n.doAppletBind && n.doAppletBind.apply(n, arguments)
      })),
      A: o.sr("wxNickNameRef", "122398a1-6"),
      B: o.p(e({}, "mask-click", !1)),
      C: o.o((function(e) {
        return n.unBindRefClose()
      })),
      D: o.o((function(e) {
        return n.doAppletUnBind()
      })),
      E: o.sr("unBindRef", "122398a1-7"),
      F: o.p(e({}, "mask-click", !1))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/countAndSafe.vue"]
]);
wx.createPage(c);