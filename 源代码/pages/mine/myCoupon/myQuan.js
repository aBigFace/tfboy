var e = require("../../../@babel/runtime/helpers/defineProperty"),
  a = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  r = require("../../../common/constant.js"),
  i = require("../../../apis/coupon.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var s = n.defineComponent({
  name: "myCoupon",
  props: {},
  emits: ["handleSelect"],
  components: {
    noData: function() {
      return "../../../components/no-data.js"
    },
    couponItem: function() {
      return "./couponItem.js"
    }
  },
  setup: function(e, s) {
    var u = n.reactive({
      commonImg: "/static/image/mine/tu_quan_free@2x.png",
      isActive: 1,
      count: null,
      pullRefresh: !1,
      loadMoreStatus: r.LoadMoreStatus.noMore,
      availableDetailList: [],
      searchParam: {
        pageNum: 1,
        pageSize: 10
      }
    });
    n.onLoad((function(e) {
      c()
    })), n.onPullDownRefresh((function() {
      u.searchParam.pageNum = 1, u.pullRefresh = !0, c()
    })), n.onReachBottom((function() {
      u.loadMoreStatus === r.LoadMoreStatus.more && (u.searchParam.pageNum++, c())
    }));
    var c = function() {
      var e = t(a().mark((function e() {
        var t, s;
        return a().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return u.loadMoreStatus = r.LoadMoreStatus.loading, e.next = 3, i.apiGetCouponList(u.searchParam);
            case 3:
              t = e.sent, s = t.data.availableDetailList.map((function(e) {
                return o(o({}, e), {}, {
                  showVisible: !1,
                  upOrDown: "bottom",
                  isChecked: !1
                })
              })), u.count = s.length, u.availableDetailList = 1 === u.searchParam.pageNum ? s : u.availableDetailList.concat(s), u.loadMoreStatus = s.length < u.searchParam.pageSize ? r.LoadMoreStatus.noMore : r.LoadMoreStatus.more, u.pullRefresh && n.index.stopPullDownRefresh();
            case 9:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    return o(o({}, n.toRefs(u)), {}, {
      getVisibleCouponList: c,
      handleGoUse: function(e) {
        if (0 == e.length) n.index.navigateTo({
          url: "/pages/mine/myCoupon/couponGoods"
        });
        else {
          var a = getApp().globalData.shopInfo.companyId,
            o = e.map((function(e) {
              return {
                companyId: a,
                spuCodes: e.spu
              }
            }));
          n.index.navigateTo({
            url: "/pages/mine/myCoupon/couponGoods?companyId=".concat(o[0].companyId, "&spuCodes=").concat(o[0].spuCodes)
          })
        }
      },
      LoadMoreStatus: r.LoadMoreStatus,
      handleGoHistory: function() {
        n.index.navigateTo({
          url: "/pages/mine/myCoupon/historyQuan"
        })
      }
    })
  }
});
Array || (n.resolveComponent("coupon-item") + n.resolveComponent("no-data"))();
var u = n._export_sfc(s, [
  ["render", function(a, o, t, r, i, s) {
    return n.e({
      a: n.f(a.availableDetailList, (function(e, o, t) {
        return {
          a: n.o((function(o) {
            return a.handleGoUse(e.adapterSkuBeanList)
          })),
          b: "dccb92bc-0-" + t,
          c: n.p({
            item: e,
            isActive: a.isActive,
            url: a.$static + a.commonImg
          }),
          d: o
        }
      })),
      b: a.loadMoreStatus === a.LoadMoreStatus.noMore && 0 === a.availableDetailList.length
    }, a.loadMoreStatus === a.LoadMoreStatus.noMore && 0 === a.availableDetailList.length ? {
      c: n.p(e(e({
        icon: a.$static + "/static/image/mine/tu_que_no_carquan@2x.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "20vh"
      }))
    } : {}, {
      d: n.o((function() {
        return a.handleGoHistory && a.handleGoHistory.apply(a, arguments)
      })),
      e: 0 === a.availableDetailList.length ? "#fff" : ""
    })
  }],
  ["__scopeId", "data-v-dccb92bc"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myCoupon/myQuan.vue"]
]);
wx.createPage(u);