var e = require("../../../common/vendor.js"),
  t = e.defineComponent({
    name: "couponItem",
    props: {
      isGrey: {
        type: Boolean
      },
      val: {
        type: Object,
        default: {}
      },
      name: {
        type: String
      }
    }
  });
var n = e._export_sfc(t, [
  ["render", function(t, n, r, o, a, p) {
    return {
      a: e.n({
        grey: t.isGrey
      }),
      b: t.val.filePath,
      c: e.n({
        grey: t.isGrey
      }),
      d: e.t(t.name)
    }
  }],
  ["__scopeId", "data-v-0e6612ee"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myCoupon/detailItem.vue"]
]);
wx.createComponent(n);