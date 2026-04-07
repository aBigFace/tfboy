var e = require("../../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../../common/vendor.js"),
  r = t.defineComponent({
    name: "confirmModal",
    setup: function() {
      var r = t.ref(),
        u = null,
        i = null,
        c = t.reactive({
          showClose: !1,
          title: "",
          message: "",
          confirmButtonText: "",
          cancelButtonText: "取消",
          confirmButtonColor: "#FFFFFF"
        }),
        a = function() {
          var e = o(n().mark((function e(o) {
            return n().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return Object.assign(c, o), r.value.open(), e.abrupt("return", new Promise((function(e, n) {
                    var o = function() {};
                    u = n || o, i = e || o
                  })));
                case 3:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function(n) {
            return e.apply(this, arguments)
          }
        }();
      return e(e({}, t.toRefs(c)), {}, {
        popupRef: r,
        confirm: a,
        handleClose: function() {
          r.value.close(), u()
        },
        handleConfirm: function() {
          r.value.close(), i()
        }
      })
    }
  });
Array || (t.resolveComponent("uni-icons") + t.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var u = t._export_sfc(r, [
  ["render", function(e, n, o, r, u, i) {
    return t.e({
      a: e.$static + "/static/image/mine/exchange-banner.png",
      b: t.o(e.handleClose),
      c: t.p({
        type: "closeempty",
        color: "#666"
      }),
      d: e.message
    }, e.message ? {
      e: t.t(e.message)
    } : {}, {
      f: t.t(e.title),
      g: e.confirmButtonText
    }, e.confirmButtonText ? {
      h: t.t(e.confirmButtonText),
      i: t.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}, {
      j: t.t(e.cancelButtonText),
      k: e.confirmButtonColor,
      l: t.o((function() {
        return e.handleClose && e.handleClose.apply(e, arguments)
      })),
      m: t.sr("popupRef", "9f2cf148-0"),
      n: t.p({
        type: "center"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/vipCode/modal/confirm-modal.vue"]
]);
wx.createComponent(u);