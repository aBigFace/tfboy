var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  o = r.defineComponent({
    name: "orderPay",
    components: {
      confirmModal: function() {
        return "../../../components/modal/confirm-modal.js"
      }
    },
    setup: function(o, n) {
      var d = r.ref(null),
        t = r.ref(),
        a = r.reactive({
          successTip: 0,
          orderIds: ""
        });
      r.onLoad((function(e) {
        a.orderIds = e.orderIds || ""
      }));
      return e(e({}, r.toRefs(a)), {}, {
        confirmModalRef: d,
        confirmRef: t,
        handleGoOrderDetail: function() {
          r.index.redirectTo({
            url: "/pages/order/myOrder/detail?id=".concat(a.orderIds, "&fromPage='payResult'")
          })
        },
        handleGoMyOrderList: function() {
          r.index.redirectTo({
            url: "/pages/order/myOrder/list"
          })
        }
      })
    }
  });
Array || r.resolveComponent("confirm-modal")();
var n = r._export_sfc(o, [
  ["render", function(e, o, n, d, t, a) {
    return {
      a: e.$static + "/static/image/myOrder/successPay@2x.png",
      b: r.o((function() {
        return e.handleGoMyOrderList && e.handleGoMyOrderList.apply(e, arguments)
      })),
      c: r.o((function() {
        return e.handleGoOrderDetail && e.handleGoOrderDetail.apply(e, arguments)
      })),
      d: r.sr("confirmModalRef", "7f170d30-0"),
      e: r.sr("confirmRef", "7f170d30-1")
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/payResult.vue"]
]);
wx.createPage(n);