var o = require("../../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../../common/vendor.js"),
  n = require("../../../utils/commonEnum.js"),
  t = {
    name: "logoutCount",
    setup: function() {
      var t = e.ref(),
        u = e.reactive({
          formData: {
            password: "",
            askPassword: ""
          },
          logoutSuccess: !1
        });
      return o(o({
        popupRef: t
      }, e.toRefs(u)), {}, {
        continueLogout: function() {
          t.value.open()
        },
        handleClose: function() {
          t.value.close(), e.index.navigateTo({
            url: "/pages/login/login"
          })
        },
        closePopup: function() {
          t.value.close()
        },
        handleConfirm: function() {
          e.index.navigateTo({
            url: "/pages/mine/setting/changeMobile?checkMethod=loginAccount&validType=".concat(n.EValidType.cancel)
          })
        },
        notLogout: function() {
          e.index.navigateBack()
        }
      })
    }
  };
Array || (e.resolveComponent("uni-icons") + e.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var u = e._export_sfc(t, [
  ["render", function(o, n, t, u, c, s) {
    return e.e({
      a: o.$static + "/static/image/mine/logout_banner.png",
      b: o.$static + "/static/image/mine/know-left.png",
      c: o.$static + "/static/image/mine/know-right.png",
      d: e.o((function() {
        return u.continueLogout && u.continueLogout.apply(u, arguments)
      })),
      e: e.o((function() {
        return u.notLogout && u.notLogout.apply(u, arguments)
      })),
      f: o.logoutSuccess
    }, o.logoutSuccess ? {
      g: o.logoutSuccess ? "518rpx" : "408rpx",
      h: o.$static + "/static/image/mine/logout-success.png"
    } : {
      i: o.logoutSuccess ? "518rpx" : "408rpx",
      j: o.$static + "/static/image/mine/logout-notice.png"
    }, {
      k: e.o(u.closePopup),
      l: e.p({
        type: "closeempty",
        color: "#666"
      }),
      m: e.t(o.logoutSuccess ? "您的账号已注销成功" : "注销后无法撤回，确定注销吗？"),
      n: e.t(o.logoutSuccess ? "期待未来与您再次相遇" : "操作注销后账号数据皆无法找回"),
      o: !o.logoutSuccess
    }, o.logoutSuccess ? {} : {
      p: e.o((function() {
        return u.closePopup && u.closePopup.apply(u, arguments)
      }))
    }, {
      q: !o.logoutSuccess
    }, o.logoutSuccess ? {} : {
      r: e.o((function() {
        return u.handleConfirm && u.handleConfirm.apply(u, arguments)
      }))
    }, {
      s: o.logoutSuccess
    }, o.logoutSuccess ? {
      t: e.o((function() {
        return u.handleClose && u.handleClose.apply(u, arguments)
      }))
    } : {}, {
      v: o.logoutSuccess ? "816rpx" : "728rpx",
      w: e.sr("popupRef", "57c377a4-0"),
      x: e.p({
        type: "center"
      })
    })
  }],
  ["__scopeId", "data-v-57c377a4"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/logoutCount.vue"]
]);
wx.createPage(u);