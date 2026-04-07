var t = require("./utils.js"),
  e = require("../../common/vendor.js"),
  o = {
    name: "c_title",
    props: ["formData"],
    setup: function() {
      return {
        goLink: t.goLink
      }
    }
  };
var r = e._export_sfc(o, [
  ["render", function(t, o, r, a, n, i) {
    return e.e({
      a: r.formData.textStyle.includes("rule")
    }, r.formData.textStyle.includes("rule") ? {
      b: e.t(r.formData.titleConfig),
      c: r.formData.fontSize + "px"
    } : {
      d: e.t(r.formData.titleConfig),
      e: r.formData.fontColor,
      f: r.formData.fontSize + "px",
      g: r.formData.textStyle.includes("bold") ? 1 : "",
      h: r.formData.textStyle.includes("italic") ? 1 : "",
      i: r.formData.textStyle.includes("underline") ? 1 : ""
    }, {
      j: r.formData.textPosition,
      k: e.o((function() {
        return a.goLink(r.formData.linkConfig)
      })),
      l: 2 * r.formData.mbConfig + "rpx",
      m: 2 * r.formData.mbConfig + "rpx",
      n: r.formData.bgColor
    })
  }],
  ["__scopeId", "data-v-f3c08834"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_title.vue"]
]);
wx.createComponent(r);