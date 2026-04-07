var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = require("../../../apis/message.js"),
  i = require("../../../utils/uniUtil.js"),
  s = require("../../../apis/user.js"),
  n = require("../../../common/constant.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var r = t.defineComponent({
  name: "messageVipService",
  setup: function() {
    var r = t.getCurrentInstance().proxy,
      o = t.reactive({
        loadMoreStatus: n.LoadMoreStatus.loading,
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
      m()
    })), t.onPullDownRefresh((function() {
      o.params.pageNum = 1, o.listData = [], m()
    })), t.onReachBottom((function() {
      o.loadMoreStatus === n.LoadMoreStatus.more && (o.params.pageNum++, m())
    }));
    var m = function() {
      a.apiMembertMsg(o.params).then((function(e) {
        if (200 == e.code && null != e.data) {
          var t = e.data.records;
          o.listData = 1 === o.params.pageNum ? t : o.listData.concat(t), o.loadMoreStatus = t.length < o.params.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more
        }
      })).finally((function() {
        t.index.stopPullDownRefresh()
      }))
    };
    return e(e({}, t.toRefs(o)), {}, {
      getTime: function(e) {
        return "" == e ? e : e.substring(0, 4) == (new Date).getFullYear().toString() ? e.substring(5, e.length - 3) : e.substring(0, e.length - 3)
      },
      getUnRead: function(e) {
        return e >= 100 ? "99+" : e.toString()
      },
      getData: m,
      handleRead: function() {
        if (o.listData.every((function(e) {
            return 1 == e.readState
          }))) return i.uniUtil.showToast("没有未读消息");
        s.apiMemberReadAllMessage().then((function(e) {
          o.params.pageNum = 1, m()
        }))
      },
      getDesc: function(e) {
        return 1 == o.listData[e].messageType || 2 == o.listData[e].messageType ? "有效期至" + o.listData[e].expireTime : 3 == o.listData[e].messageType ? "费用已原路退回至您的支付账户" : ""
      },
      readOneMsg: function(e) {
        if (0 == o.listData[e].readState) {
          var t = [o.listData[e].id];
          o.listData[e].readState = 1, a.apireadOneVipMsg(t).then((function(e) {
            200 == e.code && e.data
          }))
        }
      }
    })
  }
});
Array || (t.resolveComponent("Text") + t.resolveComponent("uni-load-more"))();
Math;
var o = t._export_sfc(r, [
  ["render", function(e, a, i, s, n, r) {
    return t.e({
      a: e.listData.length
    }, e.listData.length ? t.e({
      b: t.o((function() {
        return e.handleRead && e.handleRead.apply(e, arguments)
      })),
      c: e.listData.length
    }, e.listData.length ? {
      d: t.f(e.listData, (function(a, i, s) {
        return t.e({
          a: t.t(a.messageTitle),
          b: 0 == a.readState
        }, (a.readState, {}), {
          c: t.t(e.getTime(a.createTime)),
          d: 1 == a.messageType ? e.img1 : 2 == e.listData[i].messageType ? e.img4 : e.img3,
          e: t.t(1 == a.messageType ? "您已成功购买[" + a.familyName + "]会员" : 2 == e.listData[i].messageType ? "您购买的[" + a.familyName + "]会员有效期已调整" : "您购买的[" + e.listData[i].familyName + "]会员，已完成退款"),
          f: "确认收货地址" != a.messageTitle
        }, "确认收货地址" != a.messageTitle ? {
          g: t.t(e.getDesc(i)),
          h: "c71ce30e-0-" + s
        } : {}, {
          i: i,
          j: t.o((function(t) {
            return e.readOneMsg(i)
          }))
        })
      }))
    } : {}) : {}, {
      e: t.p({
        status: e.loadMoreStatus
      })
    })
  }],
  ["__scopeId", "data-v-c71ce30e"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/msg/messageVipService.vue"]
]);
wx.createPage(o);