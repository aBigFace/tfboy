var e = require("../@babel/runtime/helpers/defineProperty"),
  r = require("../@babel/runtime/helpers/objectSpread2"),
  t = require("../common/vendor.js"),
  p = require("../common/common.js");
require("../apis/shopCart.js"), require("../utils/http.js"), require("../config/apiPrefix.js"), require("../utils/common.js"), require("../common/app-theme.js"), require("../utils/util.js"), require("../utils/commonEnum.js");
var o = {
  components: {
    price: function() {
      return "./price.js"
    }
  },
  props: {
    showSaleAfter: {
      prop: Boolean,
      default: !0
    },
    product: {
      type: Object,
      default: function() {
        return {}
      }
    },
    pageType: {
      prop: String,
      default: ""
    },
    pageFlag: {
      type: Boolean,
      default: !0
    },
    invalid: {
      prop: Boolean,
      default: !1
    },
    supportUpdateSku: {
      type: Boolean,
      default: !1
    },
    imgTips: {
      type: String,
      default: ""
    },
    showPrice: {
      type: Boolean,
      default: !0
    },
    orderType: {
      type: String,
      default: ""
    },
    payMethod: {
      type: String,
      default: ""
    },
    orderTime: {
      type: String,
      defalut: ""
    }
  },
  emits: ["update-sku"],
  setup: function(e, o) {
    return {
      handleUpdateSku: function() {
        e.supportUpdateSku && o.emit("update-sku")
      },
      product: t.computed$1((function() {
        var t = e.product;
        return r(r({}, t), {}, {
          imgUrl: t.imgUrl || t.imageUrl,
          spuName: t.spuName || t.productName,
          sellPrice: t.sellPrice || t.originalPrice,
          skuName: t.skuName || t.skuName,
          number: t.number || t.num
        })
      })),
      handleToDetail: function(e) {
        t.index.navigateTo({
          url: "/pages/order/afterOrder/detail?afterOrderNo=".concat(e.afterOrderNo, "&afterOrderId=").concat(e.afterOrderId)
        })
      },
      doGetPayMethodDesc: function() {
        return p.getPayMethodDesc(e.payMethod)
      }
    }
  }
};
Array || (t.resolveComponent("price") + t.resolveComponent("uni-icons"))();
Math;
var a = t._export_sfc(o, [
  ["render", function(r, p, o, a, u, d) {
    return t.e({
      a: "1" == o.orderType
    }, "1" == o.orderType ? t.e({
      b: a.product.imgUrl,
      c: o.invalid
    }, (o.invalid, {}), {
      d: o.imgTips
    }, o.imgTips ? {
      e: t.t(o.imgTips)
    } : {}, {
      f: a.product.voucherNo
    }, (a.product.voucherNo, {})) : {}, {
      g: "3" != o.orderType
    }, "3" != o.orderType ? {
      h: t.t("" != a.product.saleName && null != a.product.saleName ? a.product.saleName : a.product.spuName)
    } : {}, {
      i: "3" == o.orderType
    }, "3" == o.orderType ? {
      j: t.t("" != a.product.saleName && null != a.product.saleName ? a.product.saleName : a.product.spuName),
      k: t.t(a.product.number || 0)
    } : {}, {
      l: o.showPrice
    }, o.showPrice ? t.e({
      m: "detail" !== o.pageType
    }, "detail" !== o.pageType ? {
      n: t.p(e(e({
        type: "order",
        className: "text-xs"
      }, "className", o.pageFlag ? "price-order-total" : "list-item-price"), "price", a.product.sellPrice || 0))
    } : {}) : {}, {
      o: "detail" == o.pageType
    }, "detail" == o.pageType ? t.e({
      p: "3" != o.orderType
    }, "3" != o.orderType ? t.e({
      q: t.t(a.product.number || 0),
      r: a.product.skuName
    }, a.product.skuName ? {
      s: t.t(a.product.skuName)
    } : {}, {
      t: o.supportUpdateSku && a.product.skuName
    }, o.supportUpdateSku && a.product.skuName ? {
      v: t.p({
        type: "bottom",
        size: 14,
        color: "#999"
      })
    } : {}, {
      w: t.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      }))
    }) : {}) : t.e({
      x: "3" != o.orderType
    }, "3" != o.orderType ? t.e({
      y: a.product.skuName
    }, a.product.skuName ? {
      z: t.t(a.product.skuName)
    } : {}, {
      A: o.supportUpdateSku && a.product.skuName
    }, o.supportUpdateSku && a.product.skuName ? {
      B: t.p({
        type: "bottom",
        size: 14,
        color: "#999"
      })
    } : {}, {
      C: t.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      }))
    }) : {}, {
      D: "3" == o.orderType
    }, "3" == o.orderType ? {
      E: t.t(o.orderTime),
      F: t.t(a.doGetPayMethodDesc()),
      G: t.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      }))
    } : {}, {
      H: "3" != o.orderType
    }, "3" != o.orderType ? {
      I: t.t(a.product.number || 0)
    } : {}), {
      J: (a.product.afterOrderState || "detail" == o.pageType) && "3" != o.orderType
    }, !a.product.afterOrderState && "detail" != o.pageType || "3" == o.orderType ? {} : {
      K: t.p({
        price: a.product.sellPrice || 0,
        className: o.pageType ? "list-item-price" : "",
        type: "detail" == o.pageType ? "order" : ""
      })
    }, {
      L: o.invalid
    }, o.invalid ? {
      M: t.t(a.product.errorMessage)
    } : {}, {
      N: o.invalid ? 1 : ""
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/order-product-item-detail.vue"]
]);
wx.createComponent(a);