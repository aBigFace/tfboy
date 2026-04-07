var e = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../common/vendor.js"),
  t = {
    name: "videoPlay",
    setup: function() {
      var t = r.reactive({
        src: ""
      });
      r.onLoad((function(e) {
        e.src && (t.src = e.src)
      }));
      var a = r.toRefs(t);
      return e({}, a)
    }
  };
var a = r._export_sfc(t, [
  ["render", function(e, r, t, a, c, o) {
    return {}
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/videoPlay/videoPlay.vue"]
]);
wx.createPage(a);