var e = require("../common/vendor.js"),
  o = {
    name: "NoData",
    props: {
      styles: {
        type: Object,
        default: {}
      },
      icon: {
        type: String,
        default: ""
      },
      iconType: {
        type: String,
        default: "icon"
      }
    }
  };
Array || e.resolveComponent("uni-icons")();
Math;
var n = e._export_sfc(o, [
  ["render", function(o, n, t, c, r, i) {
    return e.e({
      a: "image" === t.iconType
    }, "image" === t.iconType ? {
      b: t.icon
    } : e.e({
      c: t.icon
    }, t.icon ? {
      d: e.p({
        color: "#fff",
        type: t.icon,
        size: "40"
      })
    } : {}), {
      e: e.s(t.styles)
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/no-data.vue"]
]);
wx.createComponent(n);