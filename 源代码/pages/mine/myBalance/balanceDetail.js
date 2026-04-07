var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../common/vendor.js"),
  n = require("../../../common/constant.js"),
  s = require("../../../apis/user.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var u = o.defineComponent({
  name: "balanceDetail",
  components: {
    noData: function() {
      return "../../../components/no-data.js"
    }
  },
  setup: function() {
    var e = o.reactive({
      tabStatus: 1,
      pullRefresh: !1,
      loadMoreStatus: n.LoadMoreStatus.noMore,
      tabList: [{
        value: 1,
        name: "获取"
      }, {
        value: 2,
        name: "使用"
      }],
      searchParam: {
        pageNum: 1,
        pageSize: 20
      },
      acquireList: [],
      usedList: []
    });
    o.onLoad((function(e) {
      u(1)
    }));
    o.onPullDownRefresh((function() {
      e.searchParam.pageNum = 1, e.pullRefresh = !0, u(e.tabStatus)
    })), o.onReachBottom((function() {
      console.log("底部了"), e.loadMoreStatus === n.LoadMoreStatus.more && (e.searchParam.pageNum++, u(e.tabStatus))
    }));
    var u = function() {
      var t = r(a().mark((function t(r) {
        var u, i, c, l, p;
        return a().wrap((function(t) {
          for (;;) switch (t.prev = t.next) {
            case 0:
              if (u = JSON.parse(JSON.stringify(e.searchParam)), 1 != r) {
                t.next = 10;
                break
              }
              return t.next = 4, s.apiGetSurplusRecord(u).catch((function() {
                e.loadMoreStatus = n.LoadMoreStatus.noMore
              })).finally((function() {
                e.pullRefresh && o.index.stopPullDownRefresh()
              }));
            case 4:
              i = t.sent, c = i.data.records, e.acquireList = 1 === e.searchParam.pageNum ? c : e.acquireList.concat(c), e.loadMoreStatus = c.length < e.searchParam.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more, t.next = 16;
              break;
            case 10:
              return t.next = 12, s.apiGiveSurplusRecord(u).catch((function() {
                e.loadMoreStatus = n.LoadMoreStatus.noMore
              })).finally((function() {
                e.pullRefresh && o.index.stopPullDownRefresh()
              }));
            case 12:
              l = t.sent, p = l.data.records, e.usedList = 1 === e.searchParam.pageNum ? p : e.usedList.concat(p), e.loadMoreStatus = p.length < e.searchParam.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more;
            case 16:
            case "end":
              return t.stop()
          }
        }), t)
      })));
      return function(e) {
        return t.apply(this, arguments)
      }
    }();
    return t(t({}, o.toRefs(e)), {}, {
      LoadMoreStatus: n.LoadMoreStatus,
      changeTab: function(t) {
        e.loadMoreStatus = n.LoadMoreStatus.more, e.tabStatus = t, e.searchParam = {
          pageNum: 1,
          pageSize: 10
        }, u(e.tabStatus)
      },
      getBalanceList: u
    })
  }
});
Array || (o.resolveComponent("no-data") + o.resolveComponent("uni-load-more"))();
Math;
var i = o._export_sfc(u, [
  ["render", function(t, a, r, n, s, u) {
    return o.e({
      a: o.f(t.tabList, (function(e, a, r) {
        return {
          a: o.t(e.name),
          b: o.n(e.value === t.tabStatus ? "active" : ""),
          c: e.value,
          d: o.o((function(a) {
            return t.changeTab(e.value)
          }), e.value)
        }
      })),
      b: 1 == t.tabStatus
    }, 1 == t.tabStatus ? {
      c: o.f(t.acquireList, (function(e, t, a) {
        return {
          a: o.t(e.desc),
          b: o.t(e.createTime),
          c: o.t(e.surplusCentStr)
        }
      }))
    } : {
      d: o.f(t.usedList, (function(e, a, r) {
        return o.e({
          a: o.t(e.desc),
          b: 1 == e.type ? 1 : "",
          c: 2 == e.type
        }, 2 == e.type ? {
          d: o.t(e.orderNo),
          e: t.$static + "/static/image/mine/copy.png"
        } : {}, {
          f: o.t(e.createTime),
          g: o.t(e.surplusCentStr),
          h: 2 == e.type ? 1 : ""
        })
      }))
    }, {
      e: t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === (1 == t.tabStatus ? t.acquireList : t.usedList).length
    }, t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === (1 == t.tabStatus ? t.acquireList : t.usedList).length ? {
      f: o.p(e(e({
        icon: t.$static + "/static/image/no-data/no-use.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      g: o.p({
        status: t.loadMoreStatus
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myBalance/balanceDetail.vue"]
]);
wx.createPage(i);