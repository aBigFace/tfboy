var e = require("../../@babel/runtime/helpers/defineProperty");
require("../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../common/vendor.js"),
  a = require("../../utils/util.js"),
  i = require("../../common/constant.js"),
  n = require("../../apis/searchHotWords.js"),
  r = require("../../utils/commonEnum.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var s = {
  name: "searchContent",
  components: {
    SearchNavBar: function() {
      return "../../components/searchNavbar.js"
    },
    SearchForm: function() {
      return "../../components/searchForm.js"
    },
    price: function() {
      return "../../components/price.js"
    }
  },
  setup: function() {
    var e = getApp();
    o.useRoute();
    var s = o.reactive({
        loadMoreStatus: i.LoadMoreStatus.loading,
        viewData: [],
        paddingTop: "",
        isShowCountdownFlag: !0,
        pullRefresh: !1,
        params: {
          applyType: 1,
          companyId: e.globalData.shopInfo.companyId,
          orgId: e.globalData.shopInfo.orgId,
          searchKeys: "",
          pageSize: 10,
          pageNum: 1
        }
      }),
      u = function() {
        n.apiGetProductList(s.params).then((function(e) {
          var o = e.data.records;
          console.log(s.viewData, "state.viewData"), s.viewData = 1 === s.params.pageNum ? o : s.viewData.concat(o), s.loadMoreStatus = o.length < s.params.pageSize ? i.LoadMoreStatus.noMore : i.LoadMoreStatus.more, s.viewData.forEach((function(e) {
            e.activityFeignVo = t(t({}, e.activityFeignVo), a.saleTimeDataDeal(e.activityFeignVo))
          }))
        })).finally((function() {
          s.pullRefresh && o.index.stopPullDownRefresh()
        }))
      };
    return o.onLoad((function(t) {
      s.paddingTop = e.globalData.navBarInfo.paddingTop, s.params.searchKeys = t.value || "", u()
    })), o.onReachBottom((function() {
      s.loadMoreStatus === i.LoadMoreStatus.more && (s.params.pageNum++, u())
    })), o.onPullDownRefresh((function() {
      s.params.pageNum = 1, s.pullRefresh = !0, u()
    })), t({
      handleProductDetail: function(e) {
        o.index.navigateTo({
          url: "/pages/product/detail?id=".concat(e)
        })
      },
      searchFn: function(e) {
        s.params.searchKeys = e, u()
      },
      timeup: function() {
        s.isShowCountdownFlag = !1
      },
      EActivityStatus: r.EActivityStatus
    }, o.toRefs(s))
  }
};
Array || (o.resolveComponent("SearchNavBar") + o.resolveComponent("uni-countdown") + o.resolveComponent("price") + o.resolveComponent("uni-load-more"))();
Math || (function() {
  return "../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js"
} + function() {
  return "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"
})();
var u = o._export_sfc(s, [
  ["render", function(t, a, i, n, r, s) {
    var u, l;
    return o.e({
      a: o.o(n.searchFn),
      b: o.p({
        searchContent: t.params.searchKeys,
        backType: !0
      }),
      c: 0 == (null == (u = t.viewData) ? void 0 : u.length)
    }, 0 == (null == (l = t.viewData) ? void 0 : l.length) ? {
      d: t.$static + "/static/image/home/searchNoData.png"
    } : {
      e: o.f(t.viewData, (function(a, i, r) {
        var s, u, l, c, p, d, v, m, g, h, f, y, F;
        return o.e({
          a: 0 == a.startSelling
        }, (0 == a.startSelling || a.hotSell, {}), {
          b: 1 == a.hotSell,
          c: a.imgUrl,
          d: [n.EActivityStatus.before_presale, n.EActivityStatus.presale].includes(null == (s = a.activityFeignVo) ? void 0 : s.type)
        }, ([n.EActivityStatus.before_presale, n.EActivityStatus.presale].includes(null == (u = a.activityFeignVo) ? void 0 : u.type), {}), {
          e: o.t(a.saleName),
          f: (null == (l = a.activityFeignVo) ? void 0 : l.type) === n.EActivityStatus.before_presale
        }, (null == (c = a.activityFeignVo) ? void 0 : c.type) === n.EActivityStatus.before_presale ? {
          g: o.t(null == (p = a.activityFeignVo) ? void 0 : p.timeText)
        } : (null == (d = a.activityFeignVo) ? void 0 : d.type) === n.EActivityStatus.presale ? o.e({
          i: null == (v = a.activityFeignVo) ? void 0 : v.timeText
        }, (null == (m = a.activityFeignVo) ? void 0 : m.timeText) ? {
          j: o.t(null == (g = a.activityFeignVo) ? void 0 : g.timeText)
        } : o.e({
          k: t.isShowCountdownFlag
        }, t.isShowCountdownFlag ? {
          l: o.o(n.timeup),
          m: "feee6b40-1-" + r,
          n: o.p(e(e(e(e(e(e(e({
            splitorColor: "#FFFFFF"
          }, "font-size", 12), "show-day", !1), "hour", null == (h = a.activityFeignVo) ? void 0 : h.times.hours), "minute", null == (f = a.activityFeignVo) ? void 0 : f.times.minutes), "second", null == (y = a.activityFeignVo) ? void 0 : y.times.seconds), "color", "#E85252"), "background-color", "#FFFFFF"))
        } : {})) : {}, {
          h: (null == (F = a.activityFeignVo) ? void 0 : F.type) === n.EActivityStatus.presale,
          o: "feee6b40-2-" + r,
          p: o.p({
            price: a.sellPrice,
            className: "price-list-order-total",
            type: "order"
          }),
          q: !0 === a.morePriceFlag
        }, (a.morePriceFlag, {}), {
          r: o.o((function(e) {
            return n.handleProductDetail(a.goodsId)
          })),
          s: i
        })
      })),
      f: o.p({
        status: t.loadMoreStatus
      })
    })
  }],
  ["__scopeId", "data-v-feee6b40"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/index/searchContent.vue"]
]);
wx.createPage(u);