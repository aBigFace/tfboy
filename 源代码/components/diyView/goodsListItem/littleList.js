var t = require("../../../@babel/runtime/helpers/defineProperty");
require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../@babel/runtime/helpers/toConsumableArray"),
  o = require("../../../common/vendor.js"),
  i = require("../../../apis/goods.js"),
  l = require("./common.js"),
  n = require("../../../utils/util.js"),
  s = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var r = {
  name: "littleList",
  props: ["idList", "allData", "isLast", "nowDate"],
  emits: ["skuChange"],
  components: {
    price: function() {
      return "../../price.js"
    }
  },
  setup: function(t, r) {
    var c = r.emit,
      u = o.toRefs(t),
      g = u.idList,
      d = u.allData,
      p = u.isLast,
      m = u.nowDate,
      y = o.reactive({
        data: [],
        total: 0,
        isShowCountdownFlag: !0,
        pageNum: 1,
        countdownObj: {
          day: 0,
          hour: 0,
          minute: 0,
          seconds: 0
        }
      });
    o.watch(m, (function(t, e) {
      t && 12 * y.pageNum < y.total && (y.pageNum += 1, f())
    })), o.watch(g, (function(t) {
      y.pageNum = 1, y.total = -1, f(!0)
    }));
    var f = function() {
      var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      i.apiPageListForShopMall({
        companyId: 2,
        goodsIds: g.value,
        pageNum: y.pageNum,
        pageSize: p.value ? 12 : g.value.length,
        sortFieldType: d.value.goodsSort.type,
        sortType: d.value.goodsSort.val,
        applyType: 1
      }).then((function(o) {
        var i;
        t ? y.data = o.data.records : y.data = (i = y.data).concat.apply(i, a(o.data.records));
        y.total = o.data.total, y.data.forEach((function(t) {
          t.activityFeignVo = e(e({}, t.activityFeignVo), n.saleTimeDataDeal(t.activityFeignVo))
        }))
      }))
    };
    return o.onMounted((function() {
      y.pageNum = 1, y.total = -1, y.data = [], f()
    })), e({
      getSellNum: l.getSellNum,
      getStockInfo: l.getStockInfo,
      handleSelectSpec: function(t) {
        c("skuChange", t)
      },
      timeup: function() {
        y.isShowCountdownFlag = !1
      },
      EActivityStatus: s.EActivityStatus,
      handleGoGoodsDetail: function(t) {
        o.index.navigateTo({
          url: "/pages/product/detail?id=" + t
        })
      },
      allData: d
    }, o.toRefs(y))
  }
};
Array || (o.resolveComponent("uni-countdown") + o.resolveComponent("price"))();
Math;
var c = o._export_sfc(r, [
  ["render", function(e, a, i, l, n, s) {
    return {
      a: o.f(e.data, (function(a, i, n) {
        var s;
        return o.e({
          a: (null == (s = a.goodsFiles) ? void 0 : s.filter((function(t) {
            return 0 == t.type
          }))[0].filePath) || "",
          b: [l.EActivityStatus.before_presale, l.EActivityStatus.presale].includes(a.activityFeignVo.type)
        }, ([l.EActivityStatus.before_presale, l.EActivityStatus.presale].includes(a.activityFeignVo.type), {}), {
          c: 0 == a.startSelling
        }, 0 == a.startSelling || 1 == a.hotSell ? {} : 6 != l.allData.marketingIcon.type ? o.e({
          e: 5 == l.allData.marketingIcon.type
        }, 5 == l.allData.marketingIcon.type ? {
          f: l.allData.marketingIcon.img
        } : {
          g: o.t(l.allData.marketingIcon.text)
        }) : {}, {
          d: 1 == a.hotSell,
          h: o.o((function(t) {
            return l.handleGoGoodsDetail(a.goodsId)
          })),
          i: o.t(a.saleName),
          j: a.activityFeignVo.type === l.EActivityStatus.before_presale
        }, a.activityFeignVo.type === l.EActivityStatus.before_presale ? {
          k: o.t(a.activityFeignVo.timeText)
        } : a.activityFeignVo.type === l.EActivityStatus.presale ? o.e({
          m: a.activityFeignVo.timeText
        }, a.activityFeignVo.timeText ? {
          n: o.t(a.activityFeignVo.timeText)
        } : {
          o: o.o(l.timeup),
          p: "6b110082-0-" + n,
          q: o.p(t(t(t(t(t(t(t({
            splitorColor: "#FFFFFF"
          }, "font-size", 12), "show-day", !1), "hour", a.activityFeignVo.times.hours), "minute", a.activityFeignVo.times.minutes), "second", a.activityFeignVo.times.seconds), "color", "#E85252"), "background-color", "#FFFFFF"))
        }) : {}, {
          l: a.activityFeignVo.type === l.EActivityStatus.presale,
          r: l.allData.goodsConfig.includes("5") && a.goodsDescrib
        }, l.allData.goodsConfig.includes("5") && a.goodsDescrib ? {
          s: o.t(a.goodsDescribe)
        } : {}, 0 != l.allData.goodsTag.length ? {
          t: o.f(l.allData.goodsTag, (function(t, e, a) {
            return {
              a: o.t(t)
            }
          })),
          v: a
        } : {}, l.allData.goodsConfig.includes("3") ? {
          w: o.t(l.getStockInfo(a.stock))
        } : {}, {
          x: l.getStockInfo(a.stock) && l.getSellNum(a.sellNum) && l.allData.goodsConfig.includes("3")
        }, (l.getStockInfo(a.stock) && l.getSellNum(a.sellNum) && l.allData.goodsConfig.includes("3"), {}), l.allData.goodsConfig.includes("2") ? {
          y: o.t(l.getSellNum(a.sellNum))
        } : {}, {
          z: o.o((function(t) {
            return l.handleGoGoodsDetail(a.goodsId)
          })),
          A: "6b110082-1-" + n,
          B: o.p({
            price: a.sellPrice || 0,
            className: "littleList",
            type: "order"
          }),
          C: !0 === a.morePriceFlag
        }, (a.morePriceFlag, {}), {
          D: l.allData.goodsConfig.includes("1") && a.marketPrice
        }, l.allData.goodsConfig.includes("1") && a.marketPrice ? {
          E: o.t(a.marketPrice || 0)
        } : {}, l.allData.goodsConfig.includes("4") ? o.e({
          F: 0 === l.allData.shoppCarStyle.type
        }, 0 === l.allData.shoppCarStyle.type ? {
          G: e.$static + "/static/image/product/icon_shop_cart_new.png"
        } : {}, {
          H: 1 === l.allData.shoppCarStyle.type
        }, 1 === l.allData.shoppCarStyle.type ? {
          I: e.$static + "/static/image/product/icon_add.png"
        } : {}, {
          J: 2 === l.allData.shoppCarStyle.type
        }, 2 === l.allData.shoppCarStyle.type ? {
          K: o.t(l.allData.shoppCarStyle.tagText)
        } : {}, {
          L: o.o((function(t) {
            return l.handleSelectSpec(a.goodsId)
          }))
        }) : {}, {
          M: a.id
        })
      })),
      b: 6 != l.allData.marketingIcon.type,
      c: 0 != l.allData.goodsTag.length,
      d: l.allData.goodsConfig.includes("3"),
      e: l.allData.goodsConfig.includes("2"),
      f: l.allData.goodsConfig.includes("4")
    }
  }],
  ["__scopeId", "data-v-6b110082"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/goodsListItem/littleList.vue"]
]);
wx.createComponent(c);