var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  r = t.defineComponent({
    name: "confirmModal",
    setup: function() {
      var r = t.ref(),
        i = null,
        u = null,
        c = t.reactive({
          showClose: !1,
          tip: "",
          description: "",
          bookName: "",
          bookPhone: "",
          receiverAddressStr: "",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          cancelButtonColor: "#444",
          confirmButtonColor: "#fff"
        }),
        a = function() {
          var e = o(n().mark((function e(o) {
            return n().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return Object.assign(c, o), r.value.open(), e.abrupt("return", new Promise((function(e, n) {
                    var o = function() {};
                    i = e || o, u = n || o
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
        confirmDialogRef: r,
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
  return "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var i = t._export_sfc(r, [
  ["render", function(e, n, o, r, i, u) {
    return t.e({
      a: t.t(e.description),
      b: e.tip
    }, e.tip ? {
      c: t.t(e.tip)
    } : {}, {
      d: t.t(e.bookName),
      e: t.t(e.bookPhone),
      f: t.t(e.receiverAddressStr),
      g: t.n(e.confirmButtonText ? "activeContent" : " inactiveContent"),
      h: e.showClose
    }, e.showClose ? {
      i: t.o(e.handleClose),
      j: t.p({
        type: "closeempty",
        color: "#666"
      })
    } : {}, {
      k: e.cancelButtonText
    }, e.cancelButtonText ? {
      l: t.t(e.cancelButtonText),
      m: t.o((function() {
        return e.handleClose && e.handleClose.apply(e, arguments)
      })),
      n: e.cancelButtonColor
    } : {}, {
      o: e.confirmButtonText
    }, e.confirmButtonText ? {
      p: t.t(e.confirmButtonText),
      q: e.confirmButtonColor,
      r: t.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}, {
      s: t.sr("confirmDialogRef", "452076a6-0"),
      t: t.p({
        type: "center"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/dialog/conformDialog.vue"]
]);
wx.createComponent(i);