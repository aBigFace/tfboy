var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../@babel/runtime/helpers/toConsumableArray"),
  r = require("../../../common/vendor.js"),
  t = require("../../../apis/order.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var n = r.defineComponent({
  name: "afterSaleGoods",
  setup: function() {
    var n = r.reactive({
      goodsInfo: [],
      id: 0,
      canSubmit: !1,
      orderState: 0,
      productAfterType: "",
      payMethod: 0
    });
    r.onLoad((function(e) {
      e.id && (n.id = Number(e.id), n.orderState = Number(e.orderState), n.payMethod = Number(e.payMethod), a(n.id))
    }));
    var a = function(e) {
      t.apiGetAfterSaleGoods({
        id: n.id
      }).then((function(e) {
        n.goodsInfo = e.data;
        for (var o = 0; o < n.goodsInfo.length; o++) n.goodsInfo[o].isChecked = !1;
        0 == n.goodsInfo.length && r.index.showToast({
          icon: "none",
          title: "暂无可售后的商品"
        })
      }))
    };
    return e(e({}, r.toRefs(n)), {}, {
      handleConfirm: function() {
        var e = n.goodsInfo.filter((function(e) {
          return e.isChecked
        }));
        r.index.setStorageSync("afterSaleGoods", e), r.index.navigateTo({
          url: "/pages/order/afterSale/afterSaleType?id=".concat(n.id, "&payMethod=").concat(n.payMethod)
        })
      },
      getCurrentGoods: function(e) {
        n.goodsInfo[e].isChecked = !n.goodsInfo[e].isChecked;
        for (var o = !1, r = 0; r < n.goodsInfo.length; r++)
          if (n.goodsInfo[r].isChecked) {
            n.canSubmit = !0, o = !0;
            break
          } n.canSubmit = o
      },
      removal: function(e) {
        return o(new Set(e)).join("")
      }
    })
  }
});
var a = r._export_sfc(n, [
  ["render", function(e, o, t, n, a, i) {
    return {
      a: r.f(e.goodsInfo, (function(o, t, n) {
        return {
          a: o.imageUrl,
          b: r.t(o.productName),
          c: r.t(o.num),
          d: r.t(o.skuName),
          e: r.t(o.originalPrice),
          f: r.o((function(o) {
            return e.getCurrentGoods(t)
          })),
          g: o.isChecked,
          h: o.productAfterType,
          i: t
        }
      })),
      b: e.canSubmit || "#FFC6C6" ? 1 : "",
      c: !e.canSubmit,
      d: r.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterSale/afterSaleGoods.vue"]
]);
wx.createPage(a);