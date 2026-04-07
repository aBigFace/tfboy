var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  i = require("../../../apis/message.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var s = t.defineComponent({
  name: "messageList",
  setup: function() {
    var s = t.getCurrentInstance().proxy,
      a = t.reactive({
        pages: ["/pages/mine/service/service", "/pages/mine/msg/messagePost", "/pages/mine/msg/messageVipService", "/pages/mine/msg/messageOffical"],
        listData: [{
          title: "客服消息",
          icon: s.$static + "/static/image/msg/ic_msg_service.png",
          desc: "暂无消息",
          time: "",
          count: 0
        }, {
          title: "交易物流",
          icon: s.$static + "/static/image/msg/ic_msg_post.png",
          desc: "暂无消息",
          time: "",
          count: 0
        }, {
          title: "服务通知",
          icon: s.$static + "/static/image/msg/ic_msg_vip.png",
          desc: "暂无消息",
          time: "",
          count: 0
        }, {
          title: "官方消息",
          icon: s.$static + "/static/image/msg/ic_msg_offical.png",
          desc: "暂无消息",
          time: "",
          count: 0
        }]
      });
    t.onShow((function() {
      n()
    }));
    var n = function() {
      i.apiGetMsgCount({}).then((function(e) {
        var t, i, n, o, c, r;
        if (e.data) {
          var g = e.data.eoMemberMessageVo,
            u = e.data.memberMessageCountVo,
            m = e.data.authorityMessageCountVo;
          a.listData[1] = {
            title: "交易物流",
            icon: s.$static + "/static/image/msg/ic_msg_post.png",
            desc: null != (t = g.orderMessageVo.messageTitle) ? t : "暂无未读消息",
            time: null != (i = g.orderMessageVo.createTime) ? i : "",
            count: g.count
          }, a.listData[2] = {
            title: "服务通知",
            icon: s.$static + "/static/image/msg/ic_msg_vip.png",
            desc: null != (n = u.memberMessageVo.messageTitle) ? n : "暂无未读消息",
            time: null != (o = u.memberMessageVo.createTime) ? o : "",
            count: u.count
          }, a.listData[3] = {
            title: "官方消息",
            icon: s.$static + "/static/image/msg/ic_msg_offical.png",
            desc: null == m.authorityMessageHistoryDetailVo ? "暂无未读消息" : null != (c = m.authorityMessageHistoryDetailVo.title) ? c : "暂无未读消息",
            time: null == m.authorityMessageHistoryDetailVo ? "" : null != (r = m.authorityMessageHistoryDetailVo.createTime) ? r : "",
            count: m.count
          }
        }
      }))
    };
    return e(e({}, t.toRefs(a)), {}, {
      getTime: function(e) {
        return "" == e ? e : e.substring(0, 4) == (new Date).getFullYear().toString() ? e.substring(5, e.length - 3) : e.substring(0, e.length - 3)
      },
      getUnRead: function(e) {
        return e >= 100 ? "99+" : e.toString()
      },
      getData: n,
      goHx: function() {
        var e = t.index.getStorageSync("userInfo");
        (null == e ? void 0 : e.id) ? t.index.navigateTo({
          url: "/pages/mine/service/service"
        }): t.index.showToast({
          title: "请先登陆后再尝试",
          icon: "none"
        })
      },
      gotoPage: function(e) {
        if (0 === e) {
          var i = t.index.getStorageSync("userInfo"),
            s = "".concat(a.pages[e]).concat(i.userId);
          t.index.navigateTo({
            url: "/pages/outLink/outLink?outLinkSrc=".concat(encodeURIComponent(s))
          })
        } else t.index.navigateTo({
          url: a.pages[e]
        })
      }
    })
  }
});
var a = t._export_sfc(s, [
  ["render", function(e, i, s, a, n, o) {
    return {
      a: t.o((function() {
        return e.goHx && e.goHx.apply(e, arguments)
      })),
      b: t.f(e.listData, (function(i, s, a) {
        return t.e({
          a: i.icon,
          b: t.t(i.title),
          c: t.t(e.getTime(i.time)),
          d: t.t(i.desc),
          e: i.count > 0
        }, i.count > 0 ? {
          f: t.t(e.getUnRead(i.count))
        } : {}, {
          g: s,
          h: t.o((function(t) {
            return e.gotoPage(s)
          }))
        })
      }))
    }
  }],
  ["__scopeId", "data-v-ad9e8a02"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/msg/messageList.vue"]
]);
wx.createPage(a);