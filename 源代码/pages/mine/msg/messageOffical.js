var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = require("../../../apis/message.js"),
  i = require("../../../utils/uniUtil.js"),
  n = require("../../../apis/user.js"),
  s = require("../../../common/constant.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var r = t.defineComponent({
  name: "messageOffical",
  setup: function() {
    var r = t.getCurrentInstance().proxy,
      o = t.reactive({
        loadMoreStatus: s.LoadMoreStatus.loading,
        params: {
          pageSize: 10,
          pageNum: 1
        },
        listData: [],
        img1: r.$static + "/static/image/msg/ic_vip_buy_success.png",
        img2: r.$static + "/static/image/msg/ic_vip_end.png",
        img3: r.$static + "/static/image/msg/ic_vip_money_back.png",
        img4: r.$static + "/static/image/msg/ic_vip_time_change.png"
      });
    t.onShow((function() {
      u()
    })), t.onPullDownRefresh((function() {
      o.params.pageNum = 1, o.listData = [], u()
    })), t.onReachBottom((function() {
      o.loadMoreStatus === s.LoadMoreStatus.more && (o.params.pageNum++, u())
    }));
    var u = function() {
      a.apiOfficaltMsg(o.params).then((function(e) {
        if (200 == e.code && null != e.data) {
          var t = e.data.records;
          o.listData = 1 === o.params.pageNum ? t : o.listData.concat(t), o.loadMoreStatus = t.length < o.params.pageSize ? s.LoadMoreStatus.noMore : s.LoadMoreStatus.more
        }
      })).finally((function() {
        t.index.stopPullDownRefresh()
      }))
    };
    return e(e({}, t.toRefs(o)), {}, {
      getTime: function(e) {
        return "" == e ? e : e.substring(0, 4) == (new Date).getFullYear().toString() ? e.substring(5, e.length - 3) : e.substring(0, e.length - 3)
      },
      getData: u,
      handleRead: function() {
        if (o.listData.every((function(e) {
            return 1 == e.readState
          }))) return i.uniUtil.showToast("没有未读消息");
        n.apiAuthReadAllMessage().then((function(e) {
          o.params.pageNum = 1, u()
        }))
      },
      readOneMsg: function(e) {
        if (0 == o.listData[e].readState) {
          var i = [o.listData[e].id];
          o.listData[e].readState = 1, a.apireadOneOfficalMsg(i).then((function(e) {
            200 == e.code && e.data
          })).finally((function() {}))
        }
        t.index.setStorageSync("officalMsg", o.listData[e]), t.index.navigateTo({
          url: "/pages/mine/msg/messageOfficalDetail"
        })
      }
    })
  }
});
Array || t.resolveComponent("uni-load-more")();
Math;
var o = t._export_sfc(r, [
  ["render", function(e, a, i, n, s, r) {
    return t.e({
      a: e.listData.length
    }, e.listData.length ? {
      b: t.o((function() {
        return e.handleRead && e.handleRead.apply(e, arguments)
      })),
      c: t.f(e.listData, (function(a, i, n) {
        return t.e({
          a: 0 == a.readState
        }, (a.readState, {}), {
          b: t.t(e.getTime(a.createTime)),
          c: t.t(e.listData[i].title),
          d: i,
          e: t.o((function(t) {
            return e.readOneMsg(i)
          }))
        })
      })),
      d: e.$static + "/static/image/msg/ic_item_officmsg.png",
      e: t.t("官方消息")
    } : {}, {
      f: t.p({
        status: e.loadMoreStatus
      })
    })
  }],
  ["__scopeId", "data-v-de8acc3a"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/msg/messageOffical.vue"]
]);
wx.createPage(o);