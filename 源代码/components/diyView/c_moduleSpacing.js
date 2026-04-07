var e = require("../../common/vendor.js"),
  r = require("./moduleSpacing.js"),
  o = {
    name: "c_moduleSpacing",
    components: {},
    props: {
      formData: {
        type: Object,
        default: function() {
          return JSON.parse(JSON.stringify(r.defaultModuleSpacingData))
        }
      }
    },
    setup: function(r) {
      return {
        formData: e.toRefs(r).formData
      }
    }
  };
var t = e._export_sfc(o, [
  ["render", function(e, r, o, t, a, n) {
    return {
      a: 2 * t.formData.mbConfig + "rpx",
      b: 2 * t.formData.mbConfig + "rpx",
      c: t.formData.bgcColor
    }
  }],
  ["__scopeId", "data-v-26ff7f76"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_moduleSpacing.vue"]
]);
wx.createComponent(t);