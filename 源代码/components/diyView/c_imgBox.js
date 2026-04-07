var e = require("../../common/vendor.js"),
  n = {
    name: "c_imgBox",
    components: {
      oneLineOne: function() {
        return "./imgItem/oneLineOne.js"
      },
      oneLineTwo: function() {
        return "./imgItem/oneLineTwo.js"
      },
      oneLineThree: function() {
        return "./imgItem/oneLineThree.js"
      },
      oneLineFour: function() {
        return "./imgItem/oneLineFour.js"
      }
    },
    props: ["formData"],
    setup: function(n) {
      return {
        formData: e.toRefs(n).formData
      }
    }
  };
Array || (e.resolveComponent("oneLineOne") + e.resolveComponent("oneLineTwo") + e.resolveComponent("oneLineThree") + e.resolveComponent("oneLineFour"))();
var o = e._export_sfc(n, [
  ["render", function(n, o, t, r, a, i) {
    return e.e({
      a: "oneLineOne" === r.formData.tsConfig
    }, "oneLineOne" === r.formData.tsConfig ? {
      b: e.p({
        viewData: r.formData
      })
    } : "oneLineTwo" === r.formData.tsConfig ? {
      d: e.p({
        viewData: r.formData
      })
    } : "oneLineThree" === r.formData.tsConfig ? {
      f: e.p({
        viewData: r.formData
      })
    } : "oneLineFour" === r.formData.tsConfig ? {
      h: e.p({
        viewData: r.formData
      })
    } : {}, {
      c: "oneLineTwo" === r.formData.tsConfig,
      e: "oneLineThree" === r.formData.tsConfig,
      g: "oneLineFour" === r.formData.tsConfig,
      i: r.formData
    })
  }],
  ["__scopeId", "data-v-308f2d6a"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_imgBox.vue"]
]);
wx.createComponent(o);