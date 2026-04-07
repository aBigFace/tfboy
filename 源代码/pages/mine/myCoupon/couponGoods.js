var e = require("../../../@babel/runtime/helpers/defineProperty"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  n = require("../../../common/constant.js"),
  s = require("../../../apis/coupon.js"),
  u = require("../../../common/common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js"), require("../../../utils/commonEnum.js");
var i = a.defineComponent({
  name: "couponGoods",
  components: {
    noData: function() {
      return "../../../components/no-data.js"
    },
    selectSku: function() {
      return "../../../components/select-sku.js"
    }
  },
  setup: function() {
    var e = a.ref(null),
      i = a.reactive({
        searchParam: {
          pageNum: 1,
          pageSize: 10,
          companyId: null,
          spuCodes: [],
          applyType: 1
        },
        pullRefresh: !1,
        loadMoreStatus: n.LoadMoreStatus.noMore,
        goodsList: []
      });
    a.onLoad((function(e) {
      e ? (i.searchParam = Object.assign(i.searchParam, e), i.searchParam.spuCodes = [e.spuCodes]) : i.searchParam = {}, c()
    })), a.onPullDownRefresh((function() {
      i.searchParam.pageNum = 1, i.pullRefresh = !0, c()
    })), a.onReachBottom((function() {
      i.loadMoreStatus === n.LoadMoreStatus.more && (i.searchParam.pageNum++, c())
    }));
    var c = function() {
      var e = t(r().mark((function e() {
        var o, t;
        return r().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, s.apiGetSelectGoods(i.searchParam);
            case 2:
              o = e.sent, t = o.data.records, i.goodsList = 1 === i.searchParam.pageNum ? t : i.goodsList.concat(t), i.loadMoreStatus = t.length < i.searchParam.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more, i.pullRefresh && a.index.stopPullDownRefresh();
            case 7:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    return o(o({}, a.toRefs(i)), {}, {
      selectSkuRef: e,
      handleGoProductDetail: function(e) {
        a.index.navigateTo({
          url: "/pages/product/detail?id=".concat(e)
        })
      },
      handleToBuy: function(o) {
        u.getSkuData(o).then((function(o) {
          e.value.open(o)
        }))
      },
      getGoodsList: c,
      LoadMoreStatus: n.LoadMoreStatus
    })
  }
});
Array || (a.resolveComponent("no-data") + a.resolveComponent("uni-load-more") + a.resolveComponent("select-sku"))();
Math;
var c = a._export_sfc(i, [
  ["render", function(o, r, t, n, s, u) {
    return a.e({
      a: a.f(o.goodsList, (function(e, r, t) {
        return a.e({
          a: e.goodsFiles[0].filePath,
          b: a.o((function(r) {
            return o.handleGoProductDetail(e.goodsId)
          })),
          c: a.t(e.saleName),
          d: a.t(e.searchKeys),
          e: a.t(e.sellPrice),
          f: e.marketPrice
        }, e.marketPrice ? {
          g: a.t(e.marketPrice)
        } : {}, {
          h: e.stock <= 0,
          i: a.o((function(r) {
            return o.handleToBuy(e.goodsId)
          })),
          j: r
        })
      })),
      b: o.loadMoreStatus === o.LoadMoreStatus.noMore && 0 === o.goodsList.length
    }, o.loadMoreStatus === o.LoadMoreStatus.noMore && 0 === o.goodsList.length ? {
      c: a.p(e(e({
        icon: o.$static + "/static/image/no-data/no_order.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      d: a.p({
        status: o.loadMoreStatus
      })
    }, {
      e: a.sr("selectSkuRef", "36dab01b-2"),
      f: a.p(e({}, "sku-type", 2))
    })
  }],
  ["__scopeId", "data-v-36dab01b"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myCoupon/couponGoods.vue"]
]);
wx.createPage(c);