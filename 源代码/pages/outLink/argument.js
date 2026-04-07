var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../common/vendor.js"),
  i = require("../../utils/util.js");
require("../../utils/commonEnum.js");
var t = {
  name: "c_swiper",
  methods: {
    openArguments: i.openArguments
  },
  setup: function() {
    var i = n.reactive({
      img: "",
      imgPath: "",
      show: !1
    });
    return n.onLoad((function(e) {
      n.index.showLoading({
        title: "请稍等",
        mask: !0
      });
      var t = "https://tfapk.tfent.cn/mobile/web/webImg/" + e.img;
      i.imgPath = t, n.index.getImageInfo({
        src: t,
        success: function(e) {
          i.img = e.path, i.show = !0, n.index.hideLoading()
        },
        fail: function(e) {
          console.log(e), n.index.showToast({
            title: "网络不佳",
            icon: "none",
            duration: 1500
          }), n.index.hideLoading()
        }
      })
    })), e({}, n.toRefs(i))
  }
};
var o = n._export_sfc(t, [
  ["render", function(e, i, t, o, r, s) {
    return n.e({
      a: e.show
    }, e.show ? {
      b: e.img
    } : {}, {
      c: e.imgPath.indexOf("xieyi.png") > -1
    }, (e.imgPath.indexOf("xieyi.png"), {}), {
      d: e.imgPath.indexOf("xieyi.png") > -1 && e.show
    }, e.imgPath.indexOf("xieyi.png") > -1 && e.show ? {
      e: n.o((function(e) {
        return s.openArguments("fujian1.png")
      })),
      f: n.o((function(e) {
        return s.openArguments("fujian2.png")
      }))
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/outLink/argument.vue"]
]);
wx.createPage(o);