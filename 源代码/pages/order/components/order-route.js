var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  r = t.defineComponent({
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
      var r = t.reactive({});
      return e(e({}, t.toRefs(r)), {}, {
        changeRouteImg: function(e, t, r) {
          var n = "";
          return t == e.length - 1 && 1 == e.length && (n = "/static/image/order/send@2x.png"), e.length > 1 && 0 == t && (n = "/static/image/order/sendPassed@2x.png"), r && (n = "/static/image/order/put@2x.png"), e.length > 1 && t == e.length - 1 && (n = "/static/image/order/transport@2x.png"), e.length > 1 && t > 0 && t !== e.length - 1 && (n = "/static/image/order/transportPassed@2x.png"), console.log(n), n
        }
      })
    }
  });
var n = t._export_sfc(r, [
  ["render", function(e, r, n, o, a, s) {
    return {
      a: t.f(e.routeList, (function(r, n, o) {
        return {
          a: e.changeRouteImg(e.routeList, n, e.hasSign),
          b: t.t(r.stateDesc),
          c: t.t(r.acceptTime),
          d: t.t(r.remark),
          e: n
        }
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/order-route.vue"]
]);
wx.createComponent(n);