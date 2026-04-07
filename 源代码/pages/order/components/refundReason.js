var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../common/vendor.js"),
  t = o.defineComponent({
    name: "refundReason",
    emits: ["reason-data"],
    props: {
      hasSign: {
        type: Boolean,
        default: !1
      },
      title: {
        type: String,
        default: ""
      },
      routeList: {
        type: Array,
        default: []
      }
    },
    setup: function(e, t) {
      var r = o.ref(null),
        u = o.reactive({
          reasonList: [],
          showOtherReason: ""
        });
      o.onShow((function() {}));
      var a = function() {
        r.value.close()
      };
      return n(n({}, o.toRefs(u)), {}, {
        refundpopup: r,
        handleChangeReason: function(e) {
          var n = u.reasonList.find((function(e) {
            return e.checked
          }));
          n && (n.checked = !1), e.checked = !0, t.emit("reason-data", e), a()
        },
        handleClose: a,
        openReason: function() {
          u.reasonList.forEach((function(e) {
            e.checked = !1
          })), r.value.open()
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
var r = o._export_sfc(t, [
  ["render", function(n, t, r, u, a, s) {
    return {
      a: o.t(n.title),
      b: o.o(n.handleClose),
      c: o.p({
        type: "closeempty",
        color: "#666"
      }),
      d: o.f(n.reasonList, (function(e, t, r) {
        return {
          a: o.t(e.dictValue),
          b: e.checked ? 1 : "",
          c: t,
          d: o.o((function(o) {
            return n.handleChangeReason(e)
          }))
        }
      })),
      e: o.sr("refundpopup", "b3cdcdf6-0"),
      f: o.p(e({
        type: "bottom"
      }, "safe-area", !1))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/refundReason.vue"]
]);
wx.createComponent(r);