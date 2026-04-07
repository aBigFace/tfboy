var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  n = t.defineComponent({
    name: "searchFilterModal",
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    emits: ["confirm", "close"],
    setup: function(n, r) {
      var a = t.ref(null),
        o = t.reactive({
          params: {
            timeValue: ""
          }
        }),
        u = function() {
          a.value.close(), r.emit("close")
        };
      return e(e({}, t.toRefs(o)), {}, {
        popupRef: a,
        open: function(e) {
          e && (o.params = e), a.value.open()
        },
        close: function() {
          u()
        },
        handleSubmit: function() {
          r.emit("confirm", o.params), r.emit("close"), a.value.close()
        },
        handleClose: u,
        handleReset: function() {
          o.params.timeValue = "1"
        }
      })
    }
  });
Array || t.resolveComponent("uni-popup")();
Math;
var r = t._export_sfc(n, [
  ["render", function(e, n, r, a, o, u) {
    return {
      a: t.f(e.list, (function(n, r, a) {
        return {
          a: t.t(n.label),
          b: n.value === e.params.timeValue ? 1 : "",
          c: r,
          d: t.o((function(t) {
            return e.params.timeValue = n.value
          }))
        }
      })),
      b: t.o((function() {
        return e.handleReset && e.handleReset.apply(e, arguments)
      })),
      c: t.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      })),
      d: t.sr("popupRef", "1ceeb0e4-0"),
      e: t.p({
        type: "top"
      })
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/search-filter.vue"]
]);
wx.createComponent(r);