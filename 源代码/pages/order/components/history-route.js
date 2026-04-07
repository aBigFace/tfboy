var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  t = r.defineComponent({
    name: "orderRoute",
    props: {
      hasSign: {
        type: Boolean,
        default: !1
      },
      routeList: {
        type: Array,
        default: []
      }
    },
    setup: function() {
      var t = r.reactive({});
      return e({}, r.toRefs(t))
    }
  });
var o = r._export_sfc(t, [
  ["render", function(e, t, o, n, u, a) {
    return {
      a: r.f(e.routeList, (function(e, t, o) {
        return {
          a: 0 === t ? 1 : "",
          b: r.t(e.opNote),
          c: r.t(e.opTime),
          d: t
        }
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/history-route.vue"]
]);
wx.createComponent(o);