var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = require("../../../apis/message.js"),
  r = require("../../../utils/uniUtil.js"),
  n = require("../../../apis/user.js"),
  s = require("../../../common/constant.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var o = t.defineComponent({
  name: "messagePost",
  setup: function() {
    var o = t.reactive({
      loadMoreStatus: s.LoadMoreStatus.loading,
      params: {
        pageSize: 10,
        pageNum: 1
      },
      listData: []
    });
    t.onShow((function() {
      i()
    })), t.onPullDownRefresh((function() {
      o.params.pageNum = 1, o.listData = [], i()
    })), t.onReachBottom((function() {
      o.loadMoreStatus === s.LoadMoreStatus.more && (o.params.pageNum++, i())
    }));
    var i = function() {
      a.apiGetPostMsg(o.params).then((function(e) {
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
      getUnRead: function(e) {
        return e >= 100 ? "99+" : e.toString()
      },
      getData: i,
      getDesc: function(e) {
        return "" != o.listData[e].afterSaleOrderNo ? "售后单号：\n" + o.listData[e].afterSaleOrderNo : "订单号：\n" + o.listData[e].orderNo
      },
      handleRead: function() {
        if (o.listData.every((function(e) {
            return 1 == e.readState
          }))) return r.uniUtil.showToast("没有未读消息");
        n.apiOrderReadAllMessage().then((function(e) {
          o.params.pageNum = 1, i()
        }))
      },
      readOneMsg: function(e, n) {
        if (0 == o.listData[n].readState) {
          var s = [o.listData[n].id];
          o.listData[n].readState = 1, a.apiReadPostOneMsg(s).then((function(e) {
            200 == e.code && e.data
          })).finally((function() {}))
        }
        if (e.orderNo) t.index.navigateTo({
          url: "/pages/order/myOrder/detail?id=".concat(e.orderNo)
        });
        else {
          if ("" == e.orderImage || null == e.orderImage) return void r.uniUtil.showToast("此单为仅退运费售后单", {
            icon: "success"
          });
          t.index.navigateTo({
            url: "/pages/order/afterOrder/detail?afterOrderNo=".concat(e.afterSaleOrderNo, "&afterOrderId=").concat(e.id)
          })
        }
      }
    })
  }
});
Array || (t.resolveComponent("Text") + t.resolveComponent("uni-load-more"))();
Math;
var i = t._export_sfc(o, [
  ["render", function(e, a, r, n, s, o) {
    return t.e({
      a: e.listData.length
    }, e.listData.length ? {
      b: t.o((function() {
        return e.handleRead && e.handleRead.apply(e, arguments)
      })),
      c: t.f(e.listData, (function(a, r, n) {
        return t.e({
          a: t.t(a.messageTitle),
          b: 0 == a.readState
        }, (a.readState, {}), {
          c: t.t(e.getTime(a.createTime)),
          d: "" == a.orderImage || null == a.orderImage ? "/static/icon_logo.png" : a.orderImage,
          e: "确认收货地址" == a.messageTitle
        }, (a.messageTitle, {}), {
          f: "确认收货地址" == a.messageTitle
        }, "确认收货地址" == a.messageTitle ? {
          g: t.t(e.listData[r].receiver + " " + e.listData[r].receiverPhone)
        } : {}, {
          h: "确认收货地址" == a.messageTitle
        }, "确认收货地址" == a.messageTitle ? {
          i: t.t(e.listData[r].receiverAddress)
        } : {}, {
          j: "确认收货地址" != a.messageTitle
        }, "确认收货地址" != a.messageTitle ? {
          k: t.t(e.getDesc(r)),
          l: "f3ca5bfe-0-" + n
        } : {}, {
          m: r,
          n: t.o((function(t) {
            return e.readOneMsg(a, r)
          }))
        })
      }))
    } : {}, {
      d: t.p({
        status: e.loadMoreStatus
      })
    })
  }],
  ["__scopeId", "data-v-f3ca5bfe"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/msg/messagePost.vue"]
]);
wx.createPage(i);