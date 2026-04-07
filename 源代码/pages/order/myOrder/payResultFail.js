var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  n = require("../../../common/app-theme.js"),
  o = r.defineComponent({
    name: "orderPay",
    components: {
      confirmModal: function() {
        return "../../../components/modal/confirm-modal.js"
      }
    },
    setup: function(o, a) {
      var t = r.ref(null),
        i = r.ref(),
        c = r.reactive({
          orderIds: "",
          fromPage: ""
        });
      r.onLoad((function(e) {
        c.orderIds = e.orderIds || "", c.fromPage = e.fromPage || ""
      }));
      var d = function() {
        "orderConfirm" == c.fromPage ? (r.index.navigateBack(), r.index.navigateTo({
          url: "/pages/order/myOrder/list?orderType=".concat(4)
        })) : r.index.navigateBack()
      };
      return e(e({}, r.toRefs(c)), {}, {
        confirmModalRef: t,
        confirmRef: i,
        handlePay: d,
        handleAlertPay: function(e) {
          t.value.confirm({
            title: "确定要放弃支付吗？",
            message: "",
            confirmButtonText: "继续支付",
            confirmButtonColor: n.AppTheme.themeColor,
            cancelButtonText: "放弃"
          }).then((function() {
            d()
          })).catch((function() {
            r.index.switchTab({
              url: "/pages/index/index"
            })
          }))
        }
      })
    }
  });
Array || r.resolveComponent("confirm-modal")();
var a = r._export_sfc(o, [
  ["render", function(e, n, o, a, t, i) {
    return {
      a: e.$static + "/static/image/myOrder/failPay@2x.png",
      b: r.o((function(r) {
        return e.handleAlertPay(1)
      })),
      c: r.o((function() {
        return e.handlePay && e.handlePay.apply(e, arguments)
      })),
      d: r.sr("confirmModalRef", "67820da6-0"),
      e: r.sr("confirmRef", "67820da6-1")
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/payResultFail.vue"]
]);
wx.createPage(a);