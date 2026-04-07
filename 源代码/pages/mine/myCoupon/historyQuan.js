var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("../../../common/vendor.js"),
  r = require("../../../common/constant.js"),
  n = require("../../../apis/coupon.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var u = i.defineComponent({
  name: "historyQuan",
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
  setup: function(e, u) {
    var s = i.reactive({
      greyImg: "/static/image/mine/tu_quanshixiao_free@2x.png",
      tabList: [{
        id: 2,
        label: "已使用"
      }, {
        id: 3,
        label: "已过期"
      }, {
        id: 9,
        label: "已作废"
      }],
      historyLogo: {
        usedImg: "/static/image/mine/tu_quan_used@2x.png",
        overdueImg: "/static/image/mine/tu_quan_guoqi@2x.png",
        invalidImg: "/static/image/mine/tu_quan_out@2x.png"
      },
      voucherDetailStatus: 2,
      isActive: 0,
      pullRefresh: !1,
      loadMoreStatus: r.LoadMoreStatus.noMore,
      notAvailableDetailList: [],
      searchParam: {
        pageNum: 1,
        pageSize: 10
      }
    });
    i.onLoad((function(e) {
      l()
    })), i.onPullDownRefresh((function() {
      s.searchParam.pageNum = 1, s.pullRefresh = !0, l()
    })), i.onReachBottom((function() {
      s.loadMoreStatus === r.LoadMoreStatus.more && (s.searchParam.pageNum++, l())
    }));
    var l = function() {
      var e = o(t().mark((function e() {
        var o, u, l;
        return t().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return s.loadMoreStatus = r.LoadMoreStatus.loading, e.next = 3, n.apiGetCouponList(s.searchParam);
            case 3:
              o = e.sent, u = o.data.notAvailableDetailList.map((function(e) {
                return a(a({}, e), {}, {
                  showVisible: !1,
                  upOrDown: "bottom",
                  isChecked: !1
                })
              })), l = u.filter((function(e) {
                return e.voucherDetailStatus === s.voucherDetailStatus
              })), s.notAvailableDetailList = 1 === s.searchParam.pageNum ? l : s.notAvailableDetailList.concat(l), s.loadMoreStatus = u.length < s.searchParam.pageSize ? r.LoadMoreStatus.noMore : r.LoadMoreStatus.more, s.pullRefresh && i.index.stopPullDownRefresh();
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
    return a(a({}, i.toRefs(s)), {}, {
      changeTab: function(e) {
        s.voucherDetailStatus = e, l()
      },
      getHistoryList: l,
      LoadMoreStatus: r.LoadMoreStatus
    })
  }
});
Array || (i.resolveComponent("coupon-item") + i.resolveComponent("no-data") + i.resolveComponent("uni-load-more"))();
Math;
var s = i._export_sfc(u, [
  ["render", function(t, a, o, r, n, u) {
    return i.e({
      a: i.f(t.tabList, (function(e, a, o) {
        return {
          a: i.t(e.label),
          b: t.voucherDetailStatus === e.id ? 1 : "",
          c: i.o((function(a) {
            return t.changeTab(e.id)
          })),
          d: e.id
        }
      })),
      b: 2 === t.voucherDetailStatus
    }, 2 === t.voucherDetailStatus ? {
      c: i.f(t.notAvailableDetailList, (function(e, a, o) {
        return {
          a: "7e5bb260-0-" + o,
          b: i.p({
            item: e,
            isActive: t.isActive,
            url: t.$static + t.greyImg
          }),
          c: a
        }
      })),
      d: t.$static + t.historyLogo.usedImg
    } : {}, {
      e: 3 === t.voucherDetailStatus
    }, 3 === t.voucherDetailStatus ? {
      f: i.f(t.notAvailableDetailList, (function(e, a, o) {
        return {
          a: "7e5bb260-1-" + o,
          b: i.p({
            item: e,
            isActive: t.isActive,
            url: t.$static + t.greyImg
          }),
          c: a
        }
      })),
      g: t.$static + t.historyLogo.overdueImg
    } : {}, {
      h: 9 === t.voucherDetailStatus
    }, 9 === t.voucherDetailStatus ? {
      i: i.f(t.notAvailableDetailList, (function(e, a, o) {
        return {
          a: "7e5bb260-2-" + o,
          b: i.p({
            item: e,
            isActive: t.isActive,
            url: t.$static + t.greyImg
          }),
          c: a
        }
      })),
      j: t.$static + t.historyLogo.invalidImg
    } : {}, {
      k: t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === t.notAvailableDetailList.length
    }, t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === t.notAvailableDetailList.length ? i.e({
      l: 2 === t.voucherDetailStatus
    }, (t.voucherDetailStatus, {}), {
      m: 3 === t.voucherDetailStatus
    }, (t.voucherDetailStatus, {}), {
      n: 9 === t.voucherDetailStatus
    }, (t.voucherDetailStatus, {}), {
      o: i.p(e(e({
        icon: t.$static + "/static/image/mine/tu_que_no_carquan@2x.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "20vh"
      }))
    }) : {
      p: i.p({
        status: t.loadMoreStatus
      })
    }, {
      q: 0 === t.notAvailableDetailList.length ? "#fff" : ""
    })
  }],
  ["__scopeId", "data-v-7e5bb260"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myCoupon/historyQuan.vue"]
]);
wx.createPage(s);