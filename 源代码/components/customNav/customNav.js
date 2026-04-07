var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../common/vendor.js"),
  a = {
    name: "customNav",
    setup: function() {
      var a = t.reactive({
        styleClass: {
          paddingTop: "20px",
          height: "32px"
        }
      });
      return t.onShow((function() {
        var e = getApp().globalData.navBarInfo;
        console.log("navBarInfo======>", e), a.styleClass = {
          paddingTop: e.statusBarHeight + "px",
          height: 2 * (e.top - e.statusBarHeight) + e.height + "px"
        }
      })), e({}, t.toRefs(a))
    }
  };
var o = t._export_sfc(a, [
  ["render", function(e, a, o, r, s, n) {
    return {
      a: t.s(e.styleClass)
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/customNav/customNav.vue"]
]);
wx.createComponent(o);