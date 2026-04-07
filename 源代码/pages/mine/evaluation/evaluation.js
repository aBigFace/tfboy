var a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  o = require("../../../common/constant.js"),
  n = require("../../../apis/evaluation.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var r = t.defineComponent({
  name: "evaluation",
  components: {
    noData: function() {
      return "../../../components/no-data.js"
    }
  },
  setup: function() {
    var a = t.reactive({
      hiddenStatus: !1,
      isHighIndex: !1,
      hiddenTabs: !0,
      pullRefresh: !1,
      loadMoreStatus: o.LoadMoreStatus.noMore,
      tabbarList: [{
        name: "待评价",
        value: 0
      }, {
        name: "已评价",
        value: 1
      }],
      searchParam: {
        companyId: "",
        status: 0,
        pageNum: 1,
        pageSize: 10,
        sysCode: "tf",
        userId: ""
      },
      evaluationList: []
    });
    t.onShow((function() {
      r()
    })), t.onLoad((function(e) {
      var t = Number(e.orderType || 0);
      a.searchParam.status = t, r()
    })), t.onPullDownRefresh((function() {
      a.searchParam.pageNum = 1, a.pullRefresh = !0, u()
    })), t.onReachBottom((function() {
      a.loadMoreStatus === o.LoadMoreStatus.more && (a.searchParam.pageNum++, u())
    }));
    var r = function() {
        a.searchParam.pageNum = 1, a.evaluationList = [], u()
      },
      u = function() {
        var e = t.index.getStorageSync("userInfo");
        a.searchParam.userId = e.userId, a.loadMoreStatus = o.LoadMoreStatus.loading;
        var r = JSON.parse(JSON.stringify(a.searchParam));
        r.timeValue = "-1" !== r.timeValue ? r.timeValue : "", n.apiGetEvaluationList(r).then((function(e) {
          var t = e.data.records;
          a.evaluationList = 1 === a.searchParam.pageNum ? t : a.evaluationList.concat(t), a.loadMoreStatus = t.length < a.searchParam.pageSize ? o.LoadMoreStatus.noMore : o.LoadMoreStatus.more
        })).catch((function() {
          a.loadMoreStatus = o.LoadMoreStatus.noMore
        })).finally((function() {
          a.pullRefresh && t.index.stopPullDownRefresh()
        }))
      };
    return e(e({}, t.toRefs(a)), {}, {
      LoadMoreStatus: o.LoadMoreStatus,
      handleChangeTabbar: function(e) {
        a.searchParam.status = e, r()
      },
      handleSearchOrder: r,
      goEvaluation: function(e) {
        var o = getApp(),
          n = e.imageUrl,
          r = e.num,
          u = e.skuName,
          i = e.spuName,
          s = e.originalPrice,
          l = e.saleName;
        console.log(e), o.globalData.evaluationGoodsInfo = {
          imageUrl: n,
          num: r,
          skuName: u,
          spuName: i,
          originalPrice: s,
          saleName: l
        }, 0 == a.searchParam.status ? t.index.navigateTo({
          url: "/pages/mine/evaluation/evaluationContent?id=".concat(e.evaluationId)
        }) : t.index.navigateTo({
          url: "/pages/mine/evaluation/evaluationDetail?id=".concat(e.evaluationId)
        })
      }
    })
  }
});
Array || (t.resolveComponent("no-data") + t.resolveComponent("uni-load-more"))();
Math;
var u = t._export_sfc(r, [
  ["render", function(e, o, n, r, u, i) {
    return t.e({
      a: t.f(e.tabbarList, (function(a, o, n) {
        return {
          a: t.t(a.name),
          b: t.n(a.value === e.searchParam.status ? "active" : ""),
          c: o,
          d: t.o((function(t) {
            return e.handleChangeTabbar(a.value)
          }))
        }
      })),
      b: e.hiddenTabs,
      c: e.isHighIndex ? 1 : "",
      d: e.evaluationList.length
    }, e.evaluationList.length ? {
      e: t.f(e.evaluationList, (function(a, o, n) {
        return {
          a: a.imageUrl,
          b: t.t(a.saleName),
          c: t.t(a.num + "  "),
          d: t.t(a.skuName),
          e: t.o((function(t) {
            return e.goEvaluation(a)
          })),
          f: o
        }
      })),
      f: t.t(0 == e.searchParam.status ? "评价" : "查看评价"),
      g: 1 == e.searchParam.status ? 1 : "",
      h: e.hiddenStatus ? "hidden" : "unset",
      i: e.hiddenStatus ? "50vh" : "unset"
    } : {}, {
      j: e.loadMoreStatus === e.LoadMoreStatus.noMore && 0 === e.evaluationList.length
    }, e.loadMoreStatus === e.LoadMoreStatus.noMore && 0 === e.evaluationList.length ? {
      k: t.p(a(a({
        icon: e.$static + "/static/image/no-data/no-evaluation.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      l: t.p({
        status: e.loadMoreStatus
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/evaluation/evaluation.vue"]
]);
wx.createPage(u);