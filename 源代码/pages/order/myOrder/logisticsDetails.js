var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../apis/order.js"),
  i = require("../../../utils/uniUtil.js"),
  r = require("../../../common/vendor.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var n = r.defineComponent({
  name: "orderDetail",
  components: {
    orderRoute: function() {
      return "../components/order-route.js"
    },
    noData: function() {
      return "../../../components/no-data.js"
    }
  },
  setup: function() {
    var e = r.reactive({
      waybillNo: "",
      waybillNolist: [],
      routeList: []
    });
    r.onLoad((function(t) {
      var o;
      console.log(t), e.waybillNo = t.waybillNo, e.waybillNolist = null == (o = t.waybillNolist) ? void 0 : o.split(","), e.waybillNolist = [{}], console.log("state.waybillNolist======>", e.waybillNolist), n(t.waybillNo)
    }));
    var n = function(t) {
      e.waybillNo = t, e.routeList = [], o.apiExpressDetail(t).then((function(t) {
        e.routeList = t.data
      }))
    };
    return t(t({
      handleCopy: function(e) {
        i.uniUtil.copyText(e)
      }
    }, r.toRefs(e)), {}, {
      handleProductTab: n
    })
  }
});
Array || (r.resolveComponent("order-route") + r.resolveComponent("no-data"))();
var l = r._export_sfc(n, [
  ["render", function(t, o, i, n, l, a) {
    return r.e({
      a: 0 != t.routeList.length || t.waybillNolist.length > 1
    }, 0 != t.routeList.length || t.waybillNolist.length > 1 ? r.e({
      b: t.waybillNolist.length > 1
    }, t.waybillNolist.length > 1 ? {
      c: r.f(t.waybillNolist, (function(e, o, i) {
        return {
          a: r.t(o + 1),
          b: e,
          c: r.n(t.waybillNo == e ? "package-group active" : "package-group"),
          d: r.o((function(o) {
            return t.handleProductTab(e)
          }))
        }
      }))
    } : {}, {
      d: r.t(t.waybillNo),
      e: r.o((function(e) {
        return t.handleCopy(t.waybillNo)
      })),
      f: r.p({
        routeList: t.routeList
      }),
      g: 0 == t.routeList.length
    }, 0 == t.routeList.length ? {
      h: r.p(e(e({
        icon: t.$static + "/static/image/no-data/no_order.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "0vh",
        "padding-bottom": "5vh"
      }))
    } : {}) : r.e({
      i: 0 == t.routeList.length
    }, 0 == t.routeList.length ? {
      j: r.p(e(e({
        icon: t.$static + "/static/image/no-data/no_order.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "0vh",
        "padding-bottom": "5vh"
      }))
    } : {}))
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/logisticsDetails.vue"]
]);
wx.createPage(l);