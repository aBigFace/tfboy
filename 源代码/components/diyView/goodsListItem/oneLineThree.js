var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../common/vendor.js"),
  t = require("../../../apis/goods.js"),
  o = require("./common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var l = {
  name: "oneLineThree",
  props: ["idList", "allData", "isLast"],
  setup: function(l) {
    var n = a.toRefs(l),
      i = n.idList,
      r = n.allData,
      s = n.isLast,
      d = a.reactive({
        data: [],
        total: 0,
        pageNum: 1
      });
    a.watch(i, (function(e) {
      t.apiPageListForShopMall({
        applyType: 1,
        companyId: 2,
        goodsIds: e,
        pageNum: 1,
        pageSize: s.value ? 12 : Math.min(i.value.length, 12),
        sortFieldType: r.value.goodsSort.type,
        sortType: r.value.goodsSort.val
      }).then((function(e) {
        d.data = e.data.records, d.total = e.data.total
      }))
    }));
    return a.onMounted((function() {
      t.apiPageListForShopMall({
        applyType: 1,
        companyId: 2,
        goodsIds: i.value,
        pageNum: 1,
        pageSize: s.value ? 12 : i.value.length,
        sortFieldType: r.value.goodsSort.type,
        sortType: r.value.goodsSort.val
      }).then((function(e) {
        d.data = e.data.records, d.total = e.data.total
      }))
    })), e({
      getSellNum: o.getSellNum,
      getStockInfo: o.getStockInfo,
      handleGoGoodsDetail: function(e) {
        a.index.navigateTo({
          url: "/pages/product/detail?id=" + e
        })
      },
      allData: r
    }, a.toRefs(d))
  }
};
var n = a._export_sfc(l, [
  ["render", function(e, t, o, l, n, i) {
    return {
      a: a.f(e.data, (function(e, t, o) {
        return a.e({
          a: e.goodsFiles.filter((function(e) {
            return 0 == e.type
          }))[0].filePath,
          b: 0 == e.startSelling
        }, 0 == e.startSelling || 1 == e.hotSell ? {} : 6 != l.allData.marketingIcon.type ? a.e({
          d: 5 == l.allData.marketingIcon.type
        }, 5 == l.allData.marketingIcon.type ? {
          e: l.allData.marketingIcon.img
        } : {
          f: a.t(l.allData.marketingIcon.text)
        }) : {}, {
          c: 1 == e.hotSell,
          g: a.o((function(a) {
            return l.handleGoGoodsDetail(e.goodsId)
          })),
          h: a.t(e.saleName),
          i: l.allData.goodsConfig.includes("5") && e.goodsDescribe
        }, l.allData.goodsConfig.includes("5") && e.goodsDescribe ? {
          j: a.t(e.goodsDescribe)
        } : {}, 0 != l.allData.goodsTag.length ? {
          k: a.f(l.allData.goodsTag, (function(e, t, o) {
            return {
              a: a.t(e)
            }
          })),
          l: e
        } : {}, l.allData.goodsConfig.includes("3") ? {
          m: a.t(l.getSellNum(e.sellNum))
        } : {}, l.allData.goodsConfig.includes("2") ? {
          n: a.t(l.getStockInfo(e.stock))
        } : {}, {
          o: a.t(e.sellPrice || 0),
          p: l.allData.goodsConfig.includes("1") && e.marketPrice
        }, l.allData.goodsConfig.includes("1") && e.marketPrice ? {
          q: a.t(e.marketPrice || 0)
        } : {}, {
          r: t
        })
      })),
      b: 6 != l.allData.marketingIcon.type,
      c: 0 != l.allData.goodsTag.length,
      d: l.allData.goodsConfig.includes("3"),
      e: l.allData.goodsConfig.includes("2")
    }
  }],
  ["__scopeId", "data-v-232fa892"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/goodsListItem/oneLineThree.vue"]
]);
wx.createComponent(n);