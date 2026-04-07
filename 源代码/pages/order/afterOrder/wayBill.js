var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../common/vendor.js"),
  o = require("../../../apis/order.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var t = n.defineComponent({
  name: "waybill",
  components: {
    confirmDialog: function() {
      return "../../dialog/conformDialog.js"
    }
  },
  setup: function(e) {
    var t = n.ref(null),
      i = n.ref(),
      s = n.computed$1((function() {
        var e = a.expressType,
          r = a.waybillNo;
        return e && r
      })),
      a = n.reactive({
        expressText: "",
        afterOrderId: "",
        expressType: "",
        waybillNo: "",
        expressList: []
      });
    n.onLoad((function(e) {
      e.afterOrderId && (a.afterOrderId = e.afterOrderId), p()
    }));
    var p = function() {
        o.apiDictAfterReasonList({
          dictCode: "saleAfterExpressDelivery"
        }).then((function(e) {
          a.expressList = e.data, a.expressList.forEach((function(e) {
            e.checked = !1
          }))
        }))
      },
      c = function() {
        t.value.close()
      };
    return r(r({}, n.toRefs(a)), {}, {
      selectExpressType: function() {
        t.value.open()
      },
      getExpressType: p,
      handleGoWaybill: function() {
        n.index.navigateTo({
          url: "/pages/order/myOrder/waybill?id=".concat(e.order.id, "&orderType=").concat(e.orderType)
        })
      },
      confirmDialogRef: i,
      canSubmit: s,
      handleChangeExpress: function(e) {
        var r = a.expressList.find((function(e) {
          return e.checked
        }));
        r && (r.checked = !1), e.checked = !0, a.expressType = e.dictType, a.expressText = e.dictValue, c()
      },
      handleClose: c,
      expressPopup: t,
      handleSubmit: function() {
        n.index.showModal({
          title: "确认提交退货物流信息吗？",
          content: "提交后您将无法再进行修改",
          success: function(e) {
            if (e.confirm) {
              var r = a.afterOrderId,
                t = a.expressType,
                i = a.waybillNo,
                s = Number(r);
              o.apiSendWayBillNo({
                afterOrderId: s,
                expressCode: a.expressText,
                expressType: t,
                waybillNo: i
              }).then((function(e) {
                n.index.navigateBack()
              }))
            } else e.cancel && console.log("取消")
          }
        })
      }
    })
  }
});
Array || (n.resolveComponent("uni-icons") + n.resolveComponent("uni-popup") + n.resolveComponent("confirm-dialog"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var i = n._export_sfc(t, [
  ["render", function(r, o, t, i, s, a) {
    return n.e({
      a: r.expressText
    }, r.expressText ? {
      b: n.t(r.expressText)
    } : {}, {
      c: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      d: n.o((function() {
        return r.selectExpressType && r.selectExpressType.apply(r, arguments)
      })),
      e: r.waybillNo,
      f: n.o((function(e) {
        return r.waybillNo = e.detail.value
      })),
      g: n.o(r.handleClose),
      h: n.p({
        type: "closeempty",
        color: "#666"
      }),
      i: n.f(r.expressList, (function(e, o, t) {
        return {
          a: n.t(e.dictValue),
          b: e.checked ? 1 : "",
          c: o,
          d: n.o((function(n) {
            return r.handleChangeExpress(e)
          }))
        }
      })),
      j: n.sr("expressPopup", "406f41b9-1"),
      k: n.p(e({
        type: "bottom"
      }, "safe-area", !1)),
      l: n.sr("confirmDialogRef", "406f41b9-3"),
      m: n.o((function() {
        return r.handleSubmit && r.handleSubmit.apply(r, arguments)
      })),
      n: !r.canSubmit
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterOrder/wayBill.vue"]
]);
wx.createPage(i);