var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  r = require("../../../common/constant.js"),
  i = require("../../../apis/coupon.js"),
  u = require("../../../common/app-theme.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var s = a.defineComponent({
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
    var c = a.reactive({
      couponImg: {
        greyImg: "/static/image/mine/tu_quanshixiao_free@2x.png",
        commonImg: "/static/image/mine/tu_quan_free@2x.png"
      },
      tabType: 1,
      count: null,
      pullRefresh: !1,
      loadMoreStatus: r.LoadMoreStatus.noMore,
      tabList: [{
        id: 1,
        label: "可用"
      }, {
        id: 0,
        label: "不可使用"
      }],
      list: [],
      searchParam: {
        tabType: 1,
        pageNum: 1,
        pageSize: 10,
        checkedInfoList: []
      },
      voucherIds: []
    });
    a.onLoad((function(e) {
      if (e.params) {
        var t = JSON.parse(e.params);
        c.searchParam.checkedInfoList = t.checkedInfoList, c.voucherIds = t.voucherIds
      }
      l(1)
    })), a.onPullDownRefresh((function() {
      c.searchParam.pageNum = 1, c.pullRefresh = !0, p()
    })), a.onReachBottom((function() {
      c.loadMoreStatus === r.LoadMoreStatus.more && (c.searchParam.pageNum++, p())
    }));
    var l = function(e) {
        c.tabType = e, c.count = null, c.list = [], p(), a.index.pageScrollTo({
          scrollTop: 0
        })
      },
      p = function() {
        var e = n(t().mark((function e() {
          var n, u, s;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return c.loadMoreStatus = r.LoadMoreStatus.loading, e.next = 3, i.apiGetCouponList(c.searchParam);
              case 3:
                n = e.sent, u = 1 === c.tabType ? "availableDetailList" : "notAvailableDetailList", s = n.data[u].map((function(e) {
                  var t, n = 1 === c.tabType && (null == (t = c.voucherIds) ? void 0 : t.length) && c.voucherIds.some((function(t) {
                    return t === e.voucherDetailNo
                  }));
                  return o(o({}, e), {}, {
                    showVisible: !1,
                    upOrDown: "bottom",
                    isChecked: n
                  })
                })), c.count = s.length, c.list = s, c.loadMoreStatus = r.LoadMoreStatus.noMore, c.pullRefresh && a.index.stopPullDownRefresh();
              case 10:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return o(o({
      AppTheme: u.AppTheme
    }, a.toRefs(c)), {}, {
      changeTab: l,
      handleIsSelect: function(e) {
        c.list.filter((function(t, o) {
          return t.isChecked && o !== e
        })).forEach((function(e) {
          e.isChecked = !1
        })), c.list[e].isChecked = !c.list[e].isChecked
      },
      handleConfirm: function() {
        getApp().globalData.tempData = {
          type: "selectCoupon",
          data: {
            list: c.list.filter((function(e) {
              return e.isChecked
            })),
            availableCount: c.list.length
          }
        }, a.index.navigateBack({
          delta: 1
        })
      },
      LoadMoreStatus: r.LoadMoreStatus
    })
  }
});
Array || (a.resolveComponent("coupon-item") + a.resolveComponent("no-data") + a.resolveComponent("uni-load-more"))();
Math;
var c = a._export_sfc(s, [
  ["render", function(t, o, n, r, i, u) {
    return a.e({
      a: a.f(t.tabList, (function(e, o, n) {
        return a.e({
          a: a.t(e.label),
          b: t.tabType === e.id && t.count
        }, t.tabType === e.id && t.count ? {
          c: a.t(t.count)
        } : {}, {
          d: t.tabType === e.id ? 1 : "",
          e: a.o((function(o) {
            return t.changeTab(e.id)
          })),
          f: e.id
        })
      })),
      b: 1 == t.tabType
    }, 1 == t.tabType ? {
      c: a.f(t.list, (function(e, o, n) {
        return {
          a: e.isChecked,
          b: e.isChecked,
          c: "97f2de92-0-" + n,
          d: a.p({
            item: e,
            isActive: t.tabType,
            url: t.couponImg.commonImg
          }),
          e: a.o((function(e) {
            return t.handleIsSelect(o)
          })),
          f: o
        }
      })),
      d: t.AppTheme.themeColor
    } : {
      e: a.f(t.list, (function(e, o, n) {
        return {
          a: "97f2de92-1-" + n,
          b: a.p({
            item: e,
            url: t.$static + t.couponImg.greyImg,
            isActive: t.tabType
          }),
          c: o
        }
      }))
    }, {
      f: 1 === t.tabType && 0 !== t.list.length
    }, 1 === t.tabType && 0 !== t.list.length ? {
      g: a.o((function() {
        return t.handleConfirm && t.handleConfirm.apply(t, arguments)
      }))
    } : {}, {
      h: t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === t.list.length
    }, t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === t.list.length ? {
      i: a.p(e(e({
        icon: "/static/image/mine/tu_tips_no quan@2x.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "20vh"
      }))
    } : {
      j: a.p({
        status: t.loadMoreStatus
      })
    }, {
      k: 1 === t.tabType ? 1 : "",
      l: 0 === t.list.length ? "#fff" : ""
    })
  }],
  ["__scopeId", "data-v-97f2de92"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myCoupon/myCoupon.vue"]
]);
wx.createPage(c);