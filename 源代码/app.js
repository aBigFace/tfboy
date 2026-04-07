var e = require("./@babel/runtime/helpers/defineProperty");
Object.defineProperties(exports, e({
  __esModule: {
    value: !0
  }
}, Symbol.toStringTag, {
  value: "Module"
}));
var t = require("./common/vendor.js"),
  o = require("./utils/filters.js"),
  r = require("./utils/checkVersion.js"),
  i = require("./common/user.js");
require("./apis/user.js"), require("./utils/http.js"), require("./config/apiPrefix.js"), require("./utils/common.js"), require("./common/app-theme.js"), Math;
var a = {
    globalData: {
      hasLoin: !1,
      refreshPage: {
        searchOrder: !1
      },
      tempData: null,
      shopInfo: {
        companyId: 2,
        orgId: 35
      },
      shareInfo: {},
      navBarInfo: {
        statusBarHeight: 20,
        top: 24,
        height: 32,
        paddingTop: 80,
        windowHeight: 667
      },
      sysCode: "tf",
      companyId: 2,
      afterSaleAddress: {},
      evaluationGoodsInfo: {},
      afterSaleUpload: {
        videoUrl: "",
        pictureUrlList: []
      }
    },
    onShow: function() {
      r.checkVersion()
    },
    onLaunch: function(e) {
      i.iniAppData(e.query);
      var t = wx.getSystemInfoSync(),
        o = wx.getMenuButtonBoundingClientRect();
      this.globalData.navBarInfo = {
        statusBarHeight: t.statusBarHeight,
        top: o.top,
        height: o.height,
        paddingTop: o.top + o.height + o.top - t.statusBarHeight,
        windowHeight: t.windowHeight
      }
    }
  },
  s = t._export_sfc(a, [
    ["__file", "E:/project/TF/tf-wechat/src/App.vue"]
  ]),
  n = function() {
    return "./components/customNav/customNav.js"
  };

function p() {
  var e = t.createSSRApp(s);
  return e.config.globalProperties.$static = "https://cos.tfent.cn/xgg-file-folder/tf-app/wechat", e.config.globalProperties.$videoBg = "https://cos.tfent.cn/xgg-file-folder/tf-app/cover/video-bg.png", e.config.globalProperties.$filters = o.filters, e.component("customNav", n), {
    app: e
  }
}
p().app.mount("#app"), exports.createApp = p;