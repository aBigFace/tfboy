var a = require("../../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../../@babel/runtime/helpers/toConsumableArray"),
  t = require("../../../common/vendor.js"),
  o = require("../../../apis/goods.js"),
  l = require("./common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var n = {
  name: "oneLineTwo",
  props: ["idList", "allData", "isLast", "nowDate"],
  setup: function(n, i) {
    var s = i.emit,
      r = t.toRefs(n),
      c = r.idList,
      g = r.allData,
      d = r.isLast,
      u = r.nowDate,
      p = t.reactive({
        data: [],
        total: 0,
        pageNum: 1
      }),
      m = function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        o.apiPageListForShopMall({
          companyId: 2,
          goodsIds: c.value,
          pageNum: p.pageNum,
          pageSize: d.value ? 12 : c.value.length,
          sortFieldType: g.value.goodsSort.type,
          sortType: g.value.goodsSort.val,
          applyType: 1
        }).then((function(t) {
          var o;
          a ? p.data = t.data.records : p.data = (o = p.data).concat.apply(o, e(t.data.records));
          p.total = t.data.total
        }))
      };
    t.watch(u, (function(a) {
      a && 12 * p.pageNum < p.total && (p.pageNum += 1, m())
    })), t.watch(c, (function(a) {
      p.pageNum = 1, p.total = -1, m(!0)
    }));
    return t.onMounted((function() {
      p.pageNum = 1, p.total = -1, p.data = [], m()
    })), a({
      getSellNum: l.getSellNum,
      getStockInfo: l.getStockInfo,
      handleGoGoodsDetail: function(a) {
        t.index.navigateTo({
          url: "/pages/product/detail?id=" + a
        })
      },
      allData: g,
      handleSelectSpec: function(a) {
        s("skuChange", a)
      }
    }, t.toRefs(p))
  }
};
var i = t._export_sfc(n, [
  ["render", function(a, e, o, l, n, i) {
    return {
      a: t.f(a.data, (function(e, o, n) {
        return t.e({
          a: e.goodsFiles.filter((function(a) {
            return 0 == a.type
          }))[0].filePath,
          b: 0 == e.startSelling
        }, 0 == e.startSelling || 1 == e.hotSell ? {} : 6 != l.allData.marketingIcon.type ? t.e({
          d: 5 == l.allData.marketingIcon.type
        }, 5 == l.allData.marketingIcon.type ? {
          e: l.allData.marketingIcon.img
        } : {
          f: t.t(l.allData.marketingIcon.text)
        }) : {}, {
          c: 1 == e.hotSell,
          g: t.o((function(a) {
            return l.handleGoGoodsDetail(e.goodsId)
          })),
          h: t.t(e.saleName),
          i: l.allData.goodsConfig.includes("5") && e.goodsDescribe
        }, l.allData.goodsConfig.includes("5") && e.goodsDescribe ? {
          j: t.t(e.goodsDescribe)
        } : {}, 0 != l.allData.goodsTag.length ? {
          k: t.f(l.allData.goodsTag, (function(a, e, o) {
            return {
              a: t.t(a)
            }
          })),
          l: e
        } : {}, l.allData.goodsConfig.includes("3") ? {
          m: t.t(l.getStockInfo(e.stock))
        } : {}, {
          n: l.getStockInfo(e.stock) && l.getSellNum(e.sellNum) && l.allData.goodsConfig.includes("3")
        }, (l.getStockInfo(e.stock) && l.getSellNum(e.sellNum) && l.allData.goodsConfig.includes("3"), {}), l.allData.goodsConfig.includes("2") ? {
          o: t.t(l.getSellNum(e.sellNum))
        } : {}, {
          p: t.t(e.sellPrice || 0),
          q: !0 === e.morePriceFlag
        }, (e.morePriceFlag, {}), {
          r: l.allData.goodsConfig.includes("1") && e.marketPrice
        }, l.allData.goodsConfig.includes("1") && e.marketPrice ? {
          s: t.t(e.marketPrice || 0)
        } : {}, l.allData.goodsConfig.includes("4") ? t.e({
          t: 0 === l.allData.shoppCarStyle.type
        }, 0 === l.allData.shoppCarStyle.type ? {
          v: a.$static + "/static/image/product/icon_shop_cart_new.png"
        } : {}, {
          w: 1 === l.allData.shoppCarStyle.type
        }, 1 === l.allData.shoppCarStyle.type ? {
          x: a.$static + "/static/image/product/icon_add.png"
        } : {}, {
          y: 2 === l.allData.shoppCarStyle.type
        }, 2 === l.allData.shoppCarStyle.type ? {
          z: t.t(l.allData.shoppCarStyle.tagText)
        } : {}, {
          A: t.o((function(a) {
            return l.handleSelectSpec(e.goodsId)
          }))
        }) : {}, {
          B: o
        })
      })),
      b: 6 != l.allData.marketingIcon.type,
      c: 0 != l.allData.goodsTag.length,
      d: l.allData.goodsConfig.includes("3"),
      e: l.allData.goodsConfig.includes("2"),
      f: l.allData.goodsConfig.includes("4")
    }
  }],
  ["__scopeId", "data-v-3047e540"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/goodsListItem/oneLineTwo.vue"]
]);
wx.createComponent(i);