var e = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("../common/vendor.js"),
  t = {
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
      }
    },
    emits: ["update-sku"],
    setup: function(t, o) {
      return {
        handleUpdateSku: function() {
          t.supportUpdateSku && o.emit("update-sku")
        },
        product: r.computed$1((function() {
          var r = t.product;
          return e(e({}, r), {}, {
            imgUrl: r.imgUrl || r.imageUrl,
            spuName: r.spuName || r.productName,
            sellPrice: r.sellPrice || r.originalPrice,
            skuName: r.skuName || r.skuName,
            number: r.number || r.num
          })
        })),
        handleToDetail: function(e) {
          r.index.navigateTo({
            url: "/pages/order/afterOrder/detail?afterOrderNo=".concat(e.afterOrderNo, "&afterOrderId=").concat(e.afterOrderId)
          })
        }
      }
    }
  };
Array || (r.resolveComponent("uni-icons") + r.resolveComponent("price"))();
Math;
var o = r._export_sfc(t, [
  ["render", function(e, t, o, p, a, u) {
    return r.e({
      a: p.product.imgUrl,
      b: o.invalid
    }, (o.invalid, {}), {
      c: o.imgTips
    }, o.imgTips ? {
      d: r.t(o.imgTips)
    } : {}, {
      e: p.product.voucherNo
    }, (p.product.voucherNo, {}), {
      f: r.t(p.product.productName),
      g: o.showPrice
    }, (o.showPrice, {}), {
      h: p.product.skuName
    }, p.product.skuName ? {
      i: r.t(p.product.skuName)
    } : {}, {
      j: o.supportUpdateSku && p.product.skuName
    }, o.supportUpdateSku && p.product.skuName ? {
      k: r.p({
        type: "bottom",
        size: 14,
        color: "#999"
      })
    } : {}, {
      l: r.o((function() {
        return p.handleUpdateSku && p.handleUpdateSku.apply(p, arguments)
      })),
      m: p.product.afterOrderState || "detail" == o.pageType
    }, p.product.afterOrderState || "detail" == o.pageType ? {
      n: r.p({
        price: p.product.sellPrice || 0,
        className: o.pageType ? "list-item-price" : "",
        type: "detail" == o.pageType ? "order" : ""
      })
    } : {}, {
      o: o.invalid
    }, o.invalid ? {
      p: r.t(p.product.errorMessage)
    } : {}, {
      q: o.invalid ? 1 : ""
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/after-order-product-item.vue"]
]);
wx.createComponent(o);