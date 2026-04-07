var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = require("../../../common/app-theme.js"),
  n = require("../../../apis/order.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var o = t.defineComponent({
  name: "afterSaleType",
  components: {
    refundReason: function() {
      return "../components/refundReason.js"
    }
  },
  setup: function() {
    var o = t.ref(null),
      r = t.getCurrentInstance().proxy,
      s = t.reactive({
        goodsInfo: [],
        applyList: [],
        refundReason: [{}],
        reasonList: [],
        supportList: [],
        saleType: "",
        payMethod: 0,
        dialogTitle: "",
        saleOrderId: ""
      }),
      i = function(e, t) {
        n.apiDictAfterReasonList({
          dictCode: e
        }).then((function(e) {
          var a = e.data;
          if (1 == t || 2 == t) o.value.reasonList = a;
          else if (3 == t)
            for (var n = 0; n < a.length; n++) "换货原因" == a[n].dictDesc && o.value.reasonList.push(a[n]);
          else if (4 == t)
            for (var r = 0; r < a.length; r++) "补寄原因" == a[r].dictDesc && o.value.reasonList.push(a[r])
        }))
      };
    t.onLoad((function(e) {
      console.log(e), i("afterReasonReturn", -1), e.id && (s.saleOrderId = e.id, s.payMethod = Number(e.payMethod), p())
    }));
    var p = function() {
        s.goodsInfo = t.index.getStorageSync("afterSaleGoods");
        var e = [];
        s.goodsInfo.forEach((function(t, a) {
          e[a] = t.id
        })), c(e)
      },
      c = function(e) {
        n.apiGetAfterSaleIntersection({
          saleOrderId: s.saleOrderId,
          saleOrderProductIds: e
        }).then((function(e) {
          s.supportList = e.data, console.log(e.data), s.supportList.length ? s.supportList.forEach((function(e) {
            1 == e ? s.applyList.push({
              type: "1",
              name: "退款",
              icon: r.$static + "/static/image/afterSale/refund.png",
              desc: "没收到货，申请退款"
            }) : 2 == e ? s.applyList.push({
              type: "2",
              name: "退货退款",
              icon: r.$static + "/static/image/afterSale/replaceRefund.png",
              desc: "已收到货，需要退回收到的货物"
            }) : 3 == e ? s.applyList.push({
              type: "3",
              name: "换货",
              icon: r.$static + "/static/image/afterSale/replacement.png",
              desc: "已收到货，需要更换已收到的商品"
            }) : 4 == e && s.applyList.push({
              type: "4",
              name: "补寄",
              icon: r.$static + "/static/image/afterSale/resend.png",
              desc: "已收到货，但少发了商品"
            })
          })) : t.index.showModal({
            title: "提示",
            content: "所选商品无可申请售后类型，请重新选择售后商品",
            confirmText: "重新选择",
            success: function(e) {
              e.confirm ? t.index.navigateBack() : e.cancel && console.log("取消")
            }
          })
        }))
      };
    return e(e({
      popupRef: o,
      handApply: function(e, t) {
        s.saleType = e, o.value.reasonList = [], "1" != e && "2" != e || i("afterReasonReturn", Number(e)), "3" != e && "4" != e || i("afterReasonChange", Number(e)), s.dialogTitle = s.applyList[t].name, o.value.openReason()
      },
      handleClose: function() {
        o.value.close()
      }
    }, t.toRefs(s)), {}, {
      AppTheme: a.AppTheme,
      getAfterSaleGoodsList: p,
      getAfterSaleInter: c,
      reasonData: function(e) {
        console.log(e);
        var a = s.saleType,
          n = s.payMethod,
          o = s.saleOrderId;
        t.index.navigateTo({
          url: "/pages/order/afterSale/applyAfterSale?type=".concat(a, "&reasonlabel=").concat(e.dictValue, "&payMethod=").concat(n, "&id=").concat(o)
        })
      },
      getRefundReason: i
    })
  }
});
Array || (t.resolveComponent("uni-icons") + t.resolveComponent("refundReason"))();
Math;
var r = t._export_sfc(o, [
  ["render", function(e, a, n, o, r, s) {
    return {
      a: t.f(e.applyList, (function(a, n, o) {
        return {
          a: a.icon,
          b: t.t(a.name),
          c: t.t(a.desc),
          d: "532d3a21-0-" + o,
          e: n,
          f: t.o((function(t) {
            return e.handApply(a.type, n)
          }))
        }
      })),
      b: t.p({
        type: "forward",
        size: 16,
        color: e.AppTheme.textGray
      }),
      c: t.sr("popupRef", "532d3a21-1"),
      d: t.o(e.reasonData),
      e: t.p({
        title: e.dialogTitle
      })
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterSale/afterSaleType.vue"]
]);
wx.createPage(r);