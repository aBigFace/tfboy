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
      g: t.t("" != a.product.saleName && null != a.product.saleName ? a.product.saleName : a.product.spuName),
      h: o.showPrice
    }, o.showPrice ? t.e({
      i: "detail" !== o.pageType
    }, "detail" !== o.pageType ? {
      j: t.p(e(e({
        type: "order",
        className: "text-xs"
      }, "className", o.pageFlag ? "price-order-total" : "list-item-price"), "price", a.product.sellPrice || 0))
    } : {}) : {}, {
      k: "detail" == o.pageType
    }, "detail" == o.pageType ? t.e({
      l: "3" != o.orderType
    }, "3" != o.orderType ? t.e({
      m: t.t(a.product.number || 0),
      n: a.product.skuName
    }, a.product.skuName ? {
      o: t.t(a.product.skuName)
    } : {}, {
      p: o.supportUpdateSku && a.product.skuName
    }, o.supportUpdateSku && a.product.skuName ? {
      q: t.p({
        type: "bottom",
        size: 14,
        color: "#999"
      })
    } : {}, {
      r: t.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      }))
    }) : {}) : t.e({
      s: "3" != o.orderType
    }, "3" != o.orderType ? t.e({
      t: a.product.skuName
    }, a.product.skuName ? {
      v: t.t(a.product.skuName)
    } : {}, {
      w: o.supportUpdateSku && a.product.skuName
    }, o.supportUpdateSku && a.product.skuName ? {
      x: t.p({
        type: "bottom",
        size: 14,
        color: "#999"
      })
    } : {}, {
      y: t.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      }))
    }) : {}, {
      z: "3" == o.orderType
    }, "3" == o.orderType ? {
      A: t.t(o.orderTime),
      B: t.t(a.doGetPayMethodDesc()),
      C: t.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      }))
    } : {}, {
      D: "3" != o.orderType
    }, "3" != o.orderType ? {
      E: t.t(a.product.number || 0)
    } : {}), {
      F: (a.product.afterOrderState || "detail" == o.pageType) && "3" != o.orderType
    }, !a.product.afterOrderState && "detail" != o.pageType || "3" == o.orderType ? {} : {
      G: t.p({
        price: a.product.sellPrice || 0,
        className: o.pageType ? "list-item-price" : "",
        type: "detail" == o.pageType ? "order" : ""
      })
    }, {
      H: o.invalid
    }, o.invalid ? {
      I: t.t(a.product.errorMessage)
    } : {}, {
      J: o.invalid ? 1 : ""
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/order-product-item.vue"]
]);
wx.createComponent(a);