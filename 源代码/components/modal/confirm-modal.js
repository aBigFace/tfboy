var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  r = t.defineComponent({
    name: "confirmModal",
    setup: function() {
      var r = t.ref(),
        u = null,
        c = null,
        i = t.reactive({
          showClose: !1,
          title: "",
          message: "",
          confirmButtonText: "",
          cancelButtonText: "",
          cancelButtonColor: "#444",
          confirmButtonColor: "#E85252"
        }),
        l = function() {
          var e = o(n().mark((function e(o) {
            return n().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return Object.assign(i, o), r.value.open(), e.abrupt("return", new Promise((function(e, n) {
                    var o = function() {};
                    u = e || o, c = n || o
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
      return e(e({}, t.toRefs(i)), {}, {
        popupRef: r,
        confirm: l,
        handleClose: function() {
          r.value.close(), c()
        },
        handleConfirm: function() {
          r.value.close(), u()
        }
      })
    }
  });
Array || (t.resolveComponent("uni-icons") + t.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var u = t._export_sfc(r, [
  ["render", function(e, n, o, r, u, c) {
    return t.e({
      a: e.title
    }, e.title ? {
      b: t.t(e.title)
    } : {}, {
      c: e.showClose
    }, e.showClose ? {
      d: t.o(e.handleClose),
      e: t.p({
        type: "closeempty",
        color: "#666"
      })
    } : {}, {
      f: e.message
    }, e.message ? {
      g: t.t(e.message)
    } : {}, {
      h: e.cancelButtonText
    }, e.cancelButtonText ? {
      i: t.t(e.cancelButtonText),
      j: t.n(e.confirmButtonText ? "" : "one-btn-type"),
      k: t.o((function() {
        return e.handleClose && e.handleClose.apply(e, arguments)
      })),
      l: e.cancelButtonColor
    } : {}, {
      m: e.confirmButtonText
    }, e.confirmButtonText ? {
      n: t.t(e.confirmButtonText),
      o: t.n(e.cancelButtonText ? "" : "one-confirmbtn-type"),
      p: e.confirmButtonColor,
      q: t.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}, {
      r: t.sr("popupRef", "05d6ad19-0"),
      s: t.p({
        type: "center"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/modal/confirm-modal.vue"]
]);
wx.createComponent(u);