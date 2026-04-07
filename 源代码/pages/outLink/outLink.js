var e = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../common/vendor.js"),
  n = {
    name: "c_swiper",
    setup: function() {
      var n = r.reactive({
        outLinkSrc: ""
      });
      return r.onLoad((function(e) {
        if (e.outLinkSrc.indexOf("huanxin.html") > -1) {
          var o = r.index.getStorageSync("userInfo"),
            t = e.outLinkSrc + "?uid=" + o.userId;
          n.outLinkSrc = decodeURIComponent(t), console.log(t)
        } else n.outLinkSrc = decodeURIComponent(e.outLinkSrc)
      })), e({}, r.toRefs(n))
    }
  };
var o = r._export_sfc(n, [
  ["render", function(e, r, n, o, t, c) {
    return {
      a: e.outLinkSrc
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/outLink/outLink.vue"]
]);
wx.createPage(o);