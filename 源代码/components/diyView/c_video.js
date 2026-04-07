var r = require("../../common/vendor.js"),
  e = {
    name: "c_video",
    props: ["formData"],
    setup: function() {
      return {}
    }
  };
var o = r._export_sfc(e, [
  ["render", function(e, o, t, n, a, i) {
    return {
      a: t.formData.mp4Config.id ? t.formData.mp4Config.url : t.formData.mp4Config.diyUrl,
      b: r.t(t.formData.titleConfig)
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_video.vue"]
]);
wx.createComponent(o);