var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../common/vendor.js"),
  t = require("../../../utils/util.js");
require("../../../utils/commonEnum.js");
var i = n.defineComponent({
  name: "setting",
  methods: {
    openArguments: t.openArguments,
    openArguments_zizhi: t.openArguments_zizhi
  },
  setup: function() {
    var i = n.reactive({
      phone: "",
      passwordSet: "",
      countAndSafeVisited: "2",
      isAbnormal: 0,
      isWeiXinBind: 0,
      auth: 1
    });
    n.onLoad((function(e) {
      i.phone = e.phone
    })), n.onShow((function() {
      i.passwordSet = n.index.getStorageSync("userInfo").passwordSet, i.isAbnormal = n.index.getStorageSync("userInfo").isAbnormal, i.isWeiXinBind = n.index.getStorageSync("userInfo").isWeiXinBind, i.auth = n.index.getStorageSync("userInfo").auth, 0 == i.isWeiXinBind ? i.countAndSafeVisited = n.index.getStorageSync("countAndSafeVisited") : "" == i.countAndSafeVisited && (i.countAndSafeVisited = "2")
    }));
    return e(e({}, n.toRefs(i)), {}, {
      handleIssettingPayPass: function() {
        i.passwordSet ? n.index.navigateTo({
          url: "/pages/mine/setting/changePayPassword"
        }) : n.index.navigateTo({
          url: "/pages/mine/setting/setPayPass?fromPage=setting"
        })
      },
      handleGoPage: function(e) {
        n.index.navigateTo({
          url: e
        })
      },
      openArguments: t.openArguments,
      openArguments_zizhi: t.openArguments_zizhi,
      handleOut: function() {
        n.index.showModal({
          title: "提示",
          content: "确定退出登录吗？",
          success: function(e) {
            e.confirm ? (n.index.removeStorageSync("token"), n.index.removeStorageSync("userInfo"), n.index.reLaunch({
              url: "/pages/index/index"
            })) : e.cancel && console.log("取消")
          }
        })
      }
    })
  }
});
Array || n.resolveComponent("uni-icons")();
Math;
var o = n._export_sfc(i, [
  ["render", function(e, t, i, o, r, s) {
    return n.e({
      a: "" == e.countAndSafeVisited || 0 == e.auth
    }, "" == e.countAndSafeVisited || 0 == e.auth ? {
      b: e.$static + "/static/image/mine/icon_red_16.png"
    } : 1 == e.isAbnormal && 1 == e.auth ? {
      d: e.$static + "/static/image/mine/icon_warning_black.png"
    } : {}, {
      c: 1 == e.isAbnormal && 1 == e.auth,
      e: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      f: n.o((function(n) {
        return e.handleGoPage("/pages/mine/setting/countAndSafe")
      })),
      g: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      h: n.o((function() {
        return e.handleIssettingPayPass && e.handleIssettingPayPass.apply(e, arguments)
      })),
      i: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      j: n.o((function(n) {
        return e.openArguments("xieyi.png")
      })),
      k: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      l: n.o((function(n) {
        return e.openArguments("yinsi.png")
      })),
      m: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      n: n.o((function(n) {
        return e.openArguments("shiming.png")
      })),
      o: n.p({
        type: "forward",
        size: 18,
        color: "#7F7D7D"
      }),
      p: n.o((function(n) {
        return e.openArguments_zizhi("zizhi.jpg")
      })),
      q: n.o((function() {
        return e.handleOut && e.handleOut.apply(e, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-61a3b3d9"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/setting.vue"]
]);
wx.createPage(o);