var e = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  r = t.defineComponent({
    name: "confirmModalReason",
    emits: ["confirm", "cancel"],
    setup: function(r, a) {
      var s = t.ref(),
        i = t.reactive({
          showClose: !1,
          title: "",
          message: "",
          confirmButtonText: "",
          cancelButtonText: "",
          cancelButtonColor: "#444",
          confirmButtonColor: "#E85252",
          reasonDesc: "",
          params: {},
          itemId: "",
          arrowTop: !1,
          arrowBottom: !0,
          reasonDisplay: !1,
          heightValue: 250
        }),
        u = function() {
          var e = n(o().mark((function e(n) {
            return o().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return Object.assign(i, n), s.value.open(), e.abrupt("return", new Promise((function(e, o) {})));
                case 3:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function(o) {
            return e.apply(this, arguments)
          }
        }();
      return e(e({}, t.toRefs(i)), {}, {
        popupRef: s,
        handleClose: function() {
          s.value.close()
        },
        handleConfirm: function() {
          s.value.close();
          var o = {
            reasonDesc: i.reasonDesc,
            itemId: i.itemId
          };
          a.emit("confirm", e(e({}, i.params), o)), i.reasonDesc = "", i.itemId = ""
        },
        open: u,
        dispReason: function() {
          i.reasonDisplay ? (i.arrowTop = !1, i.arrowBottom = !0, i.reasonDisplay = !1, i.heightValue = 250) : (i.arrowTop = !0, i.arrowBottom = !1, i.reasonDisplay = !0, i.heightValue = 520)
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
var a = t._export_sfc(r, [
  ["render", function(e, o, n, r, a, s) {
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
      h: e.arrowTop
    }, e.arrowTop ? {
      i: t.p({
        type: "top",
        size: 16,
        color: "#6495ed"
      })
    } : {}, {
      j: e.arrowBottom
    }, e.arrowBottom ? {
      k: t.p({
        type: "bottom",
        size: 16,
        color: "#6495ed"
      })
    } : {}, {
      l: t.o((function() {
        return e.dispReason && e.dispReason.apply(e, arguments)
      })),
      m: e.reasonDisplay
    }, e.reasonDisplay ? {
      n: e.reasonDesc,
      o: t.o((function(o) {
        return e.reasonDesc = o.detail.value
      }))
    } : {}, {
      p: e.heightValue + "rpx",
      q: e.cancelButtonText
    }, e.cancelButtonText ? {
      r: t.t(e.cancelButtonText),
      s: t.n(e.confirmButtonText ? "" : "one-btn-type"),
      t: t.o((function() {
        return e.handleClose && e.handleClose.apply(e, arguments)
      })),
      v: e.cancelButtonColor
    } : {}, {
      w: e.confirmButtonText
    }, e.confirmButtonText ? {
      x: t.t(e.confirmButtonText),
      y: t.n(e.cancelButtonText ? "" : "one-confirmbtn-type"),
      z: e.confirmButtonColor,
      A: t.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}, {
      B: e.heightValue + "rpx",
      C: t.sr("popupRef", "6adf5128-0"),
      D: t.p({
        type: "center"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/modal/confirm-modal-reason.vue"]
]);
wx.createComponent(a);