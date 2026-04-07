var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  r = o.defineComponent({
    name: "mParentAuthDialog",
    setup: function() {
      var r = o.ref(),
        u = null,
        i = null,
        c = o.reactive({
          showClose: !1,
          title: "",
          message: "",
          confirmButtonText: "",
          cancelButtonText: "取消"
        }),
        a = function() {
          var e = t(n().mark((function e(t) {
            return n().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  return Object.assign(c, t), r.value.open(), e.abrupt("return", new Promise((function(e, n) {
                    var t = function() {};
                    u = e || t, i = n || t
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
      return e(e({}, o.toRefs(c)), {}, {
        popupRef: r,
        confirm: a,
        handleClose: function() {
          r.value.close(), i()
        },
        closePopup: function() {
          r.value.close()
        },
        handleConfirm: function() {
          r.value.close(), u()
        }
      })
    }
  });
Array || (o.resolveComponent("uni-icons") + o.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var u = o._export_sfc(r, [
  ["render", function(e, n, t, r, u, i) {
    return o.e({
      a: e.$static + "/static/image/mine/parentBanner.png",
      b: o.o(e.closePopup),
      c: o.p({
        type: "closeempty",
        color: "#666"
      }),
      d: e.message
    }, e.message ? {
      e: o.t(e.message)
    } : {}, {
      f: e.title
    }, e.title ? {
      g: o.t(e.title)
    } : {}, {
      h: e.cancelButtonText
    }, e.cancelButtonText ? {
      i: o.t(e.cancelButtonText),
      j: o.o((function() {
        return e.handleClose && e.handleClose.apply(e, arguments)
      }))
    } : {}, {
      k: e.confirmButtonText
    }, e.confirmButtonText ? {
      l: o.t(e.confirmButtonText),
      m: o.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}, {
      n: o.sr("popupRef", "5ee99a12-0"),
      o: o.p({
        type: "center"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/dialog/parentAuthDialog.vue"]
]);
wx.createComponent(u);