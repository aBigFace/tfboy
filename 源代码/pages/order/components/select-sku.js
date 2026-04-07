var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../common/vendor.js"),
  o = require("../../../common/app-theme.js"),
  t = n.defineComponent({
    name: "confirmModal",
    props: {
      list: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    emits: ["on-success"],
    setup: function(t, r) {
      var u = n.ref(),
        c = n.reactive({
          selectId: ""
        });
      return e(e({
        AppTheme: o.AppTheme
      }, n.toRefs(c)), {}, {
        popupRef: u,
        open: function(e) {
          c.selectId = e.skuId, u.value.open()
        },
        confirm: confirm,
        handleClose: function() {
          u.value.close()
        },
        handleConfirm: function() {
          r.emit("on-success", c.selectId), u.value.close()
        },
        handleChangeSku: function(e) {
          c.selectId = e.skuId
        }
      })
    }
  });
Array || (n.resolveComponent("uni-icons") + n.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var r = n._export_sfc(t, [
  ["render", function(e, o, t, r, u, c) {
    return {
      a: n.o(e.handleClose),
      b: n.p({
        type: "closeempty",
        color: "#666"
      }),
      c: n.f(e.list, (function(o, t, r) {
        return n.e({
          a: n.t(o.skuName),
          b: o.skuId === e.selectId
        }, o.skuId === e.selectId ? {
          c: "6749b635-2-" + r + ",6749b635-0",
          d: n.p({
            type: "checkbox-filled",
            size: 24,
            color: e.AppTheme.themeColor
          })
        } : {
          e: "6749b635-3-" + r + ",6749b635-0",
          f: n.p({
            type: "circle",
            size: 24,
            color: "#CACACA"
          })
        }, {
          g: t,
          h: n.o((function(n) {
            return e.handleChangeSku(o)
          }))
        })
      })),
      d: n.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      })),
      e: n.sr("popupRef", "6749b635-0"),
      f: n.p({
        type: "bottom"
      })
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/select-sku.vue"]
]);
wx.createComponent(r);