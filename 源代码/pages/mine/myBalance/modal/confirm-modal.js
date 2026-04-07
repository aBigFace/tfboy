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
                    u = e || o, i = n || o
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
          r.value.close(), i()
        },
        handleConfirm: function() {
          r.value.close(), u()
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
      a: e.$static + "/static/image/mine/balance-banner@2x.png",
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
      g: t.t(e.cancelButtonText),
      h: t.o((function() {
        return e.handleClose && e.handleClose.apply(e, arguments)
      })),
      i: e.confirmButtonText
    }, e.confirmButtonText ? {
      j: t.t(e.confirmButtonText),
      k: e.confirmButtonColor,
      l: t.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}, {
      m: t.sr("popupRef", "1297e282-0"),
      n: t.p({
        type: "center"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myBalance/modal/confirm-modal.vue"]
]);
wx.createComponent(u);