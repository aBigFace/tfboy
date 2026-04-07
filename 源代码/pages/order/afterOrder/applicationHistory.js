var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../apis/order.js"),
  o = require("../../../common/vendor.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var n = o.defineComponent({
  name: "orderDetail",
  components: {
    historyRoute: function() {
      return "../components/history-route.js"
    },
    noData: function() {
      return "../../../components/no-data.js"
    }
  },
  setup: function() {
    var e = o.reactive({
      routeList: []
    });
    o.onLoad((function(e) {
      n(e.afterOrderNo)
    }));
    var n = function(r) {
      t.apiGetAfterOrderDetail({
        afterOrderNo: r
      }).then((function(r) {
        var t = r.data.saleAfterOrderLogs;
        e.routeList = t
      }))
    };
    return r(r({}, o.toRefs(e)), {}, {
      getDetail: n
    })
  }
});
Array || (o.resolveComponent("history-route") + o.resolveComponent("no-data"))();
var i = o._export_sfc(n, [
  ["render", function(r, t, n, i, a, s) {
    return o.e({
      a: 0 != r.routeList.length
    }, 0 != r.routeList.length ? {
      b: o.p({
        routeList: r.routeList
      })
    } : {}, {
      c: 0 == r.routeList.length
    }, 0 == r.routeList.length ? {
      d: o.p(e(e({
        icon: r.$static + "/static/image/no-data/no_order.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterOrder/applicationHistory.vue"]
]);
wx.createPage(i);