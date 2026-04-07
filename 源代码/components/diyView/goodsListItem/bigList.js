var t = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../common/vendor.js"),
  e = require("../../../apis/goods.js"),
  o = require("./common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var l = {
  name: "bigList",
  props: ["idList", "allData", "isLast"],
  emits: ["skuChange"],
  components: {
    SelectSku: function() {
      return "../../select-sku.js"
    }
  },
  setup: function(l, n) {
    var s = n.emit,
      i = a.toRefs(l),
      r = i.idList,
      c = i.allData,
      g = i.isLast,
      d = a.ref(),
      p = a.reactive({
        data: [],
        total: 0,
        pageNum: 1
      });
    a.watch(r, (function(t) {
      var a = getApp().globalData.shopInfo.companyId;
      e.apiPageListForShopMall({
        companyId: a,
        goodsIds: t,
        pageNum: 1,
        pageSize: g.value ? 12 : Math.min(r.value.length, 12),
        sortFieldType: c.value.goodsSort.type,
        sortType: c.value.goodsSort.val,
        applyType: 1
      }).then((function(t) {
        p.data = t.data.records, p.total = t.data.total
      }))
    }));
    return a.onMounted((function() {
      e.apiPageListForShopMall({
        companyId: 2,
        goodsIds: r.value,
        pageNum: 1,
        pageSize: g.value ? 12 : r.value.length,
        sortFieldType: c.value.goodsSort.type,
        sortType: c.value.goodsSort.val,
        applyType: 1
      }).then((function(t) {
        p.data = t.data.records, p.total = t.data.total
      }))
    })), t({
      getSellNum: o.getSellNum,
      getStockInfo: o.getStockInfo,
      selectSkuRef: d,
      handleSelectSpec: function(t) {
        s("skuChange", t)
      },
      handleGoGoodsDetail: function(t) {
        a.index.navigateTo({
          url: "/pages/product/detail?id=" + t
        })
      },
      allData: c
    }, a.toRefs(p))
  }
};
var n = a._export_sfc(l, [
  ["render", function(t, e, o, l, n, s) {
    return {
      a: a.f(t.data, (function(e, o, n) {
        var s;
        return a.e({
          a: (null == (s = e.goodsFiles) ? void 0 : s.filter((function(t) {
            return 0 == t.type
          }))[0].filePath) || "",
          b: 0 == e.startSelling
        }, 0 == e.startSelling || 1 == e.hotSell ? {} : 6 != l.allData.marketingIcon.type ? a.e({
          d: 5 == l.allData.marketingIcon.type
        }, 5 == l.allData.marketingIcon.type ? {
          e: l.allData.marketingIcon.img
        } : {
          f: a.t(l.allData.marketingIcon.text)
        }) : {}, {
          c: 1 == e.hotSell,
          g: a.o((function(t) {
            return l.handleGoGoodsDetail(e.goodsId)
          })),
          h: a.t(e.saleName),
          i: l.allData.goodsConfig.includes("5") && e.goodsDescribe
        }, l.allData.goodsConfig.includes("5") && e.goodsDescribe ? {
          j: a.t(e.goodsDescribe)
        } : {}, 0 != l.allData.goodsTag.length ? {
          k: a.f(l.allData.goodsTag, (function(t, e, o) {
            return {
              a: a.t(t)
            }
          })),
          l: e
        } : {}, l.allData.goodsConfig.includes("3") ? {
          m: a.t(l.getStockInfo(e.stock))
        } : {}, {
          n: l.getStockInfo(e.stock) && l.getStockInfo(e.sellNum)
        }, (l.getStockInfo(e.stock) && l.getStockInfo(e.sellNum), {}), l.allData.goodsConfig.includes("2") ? {
          o: a.t(l.getSellNum(e.sellNum))
        } : {}, {
          p: a.t(e.sellPrice || 0),
          q: l.allData.goodsConfig.includes("1") && e.marketPrice
        }, l.allData.goodsConfig.includes("1") && e.marketPrice ? {
          r: a.t(e.marketPrice || 0)
        } : {}, l.allData.goodsConfig.includes("4") ? a.e({
          s: 0 === l.allData.shoppCarStyle.type
        }, 0 === l.allData.shoppCarStyle.type ? {
          t: t.$static + "/static/image/product/icon_shop_cart_new.png"
        } : {}, {
          v: 1 === l.allData.shoppCarStyle.type
        }, 1 === l.allData.shoppCarStyle.type ? {
          w: t.$static + "/static/image/product/icon_add.png"
        } : {}, {
          x: 2 === l.allData.shoppCarStyle.type
        }, 2 === l.allData.shoppCarStyle.type ? {
          y: a.t(l.allData.shoppCarStyle.tagText)
        } : {}, {
          z: a.o((function(t) {
            return l.handleSelectSpec(e.goodsId)
          }))
        }) : {}, {
          A: e.id
        })
      })),
      b: 6 != l.allData.marketingIcon.type,
      c: 0 != l.allData.goodsTag.length,
      d: l.allData.goodsConfig.includes("3"),
      e: l.allData.goodsConfig.includes("2"),
      f: l.allData.goodsConfig.includes("4")
    }
  }],
  ["__scopeId", "data-v-1aca1440"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/goodsListItem/bigList.vue"]
]);
wx.createComponent(n);