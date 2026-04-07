var e = require("../../common/vendor.js"),
  n = {
    name: "c_magic",
    components: {
      oneLineOne: function() {
        return "./magicItem/oneLineOne.js"
      },
      oneLineMore: function() {
        return "./magicItem/oneLineMore.js"
      }
    },
    props: ["formData"],
    setup: function(n) {
      return {
        formData: e.toRefs(n).formData
      }
    }
  };
Array || (e.resolveComponent("oneLineOne") + e.resolveComponent("oneLineMore"))();
var o = e._export_sfc(n, [
  ["render", function(n, o, r, t, a, i) {
    return e.e({
      a: "oneLineOne" === t.formData.tsConfig
    }, "oneLineOne" === t.formData.tsConfig ? {
      b: e.p({
        viewData: t.formData
      })
    } : {}, {
      c: "oneLineMore" === t.formData.tsConfig
    }, "oneLineMore" === t.formData.tsConfig ? {
      d: e.p({
        viewData: t.formData
      })
    } : {}, {
      e: t.formData.bgColor
    })
  }],
  ["__scopeId", "data-v-f768de8a"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_magic.vue"]
]);
wx.createComponent(o);