var e = require("../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../common/vendor.js"),
  n = require("../../utils/util.js");
require("../../utils/commonEnum.js");
var t = {
  name: "argument_zizhi",
  methods: {
    openArguments: n.openArguments
  },
  setup: function() {
    var n = i.reactive({
      img: "",
      imgPath: "",
      show: !1
    });
    return i.onLoad((function(e) {
      i.index.showLoading({
        title: "请稍等",
        mask: !0
      });
      var t = "https://tfapk.tfent.cn/mobile/web/webImg/" + e.img;
      n.imgPath = t, i.index.getImageInfo({
        src: t,
        success: function(e) {
          n.img = e.path, n.show = !0, i.index.hideLoading()
        },
        fail: function(e) {
          console.log(e), i.index.showToast({
            title: "网络不佳",
            icon: "none",
            duration: 1500
          }), i.index.hideLoading()
        }
      })
    })), e({}, i.toRefs(n))
  }
};
var o = i._export_sfc(t, [
  ["render", function(e, n, t, o, r, s) {
    return i.e({
      a: e.show
    }, e.show ? {
      b: e.img
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/outLink/argument_zizhi.vue"]
]);
wx.createPage(o);