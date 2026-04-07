var e = require("./imgText.js"),
  t = require("../../common/vendor.js"),
  r = {
    name: "c_imgText",
    components: {
      modelOne: function() {
        return "./imgTextItem/modelOne.js"
      }
    },
    props: {
      formData: {
        type: Object,
        default: function() {
          return JSON.parse(JSON.stringify(e.defaultImgTextData))
        }
      }
    }
  };
Array || t.resolveComponent("modelOne")();
var o = t._export_sfc(r, [
  ["render", function(e, r, o, n, a, m) {
    return {
      a: t.p({
        viewData: o.formData.imgListConfig,
        allData: o.formData
      }),
      b: o.formData.bgColor
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_imgText.vue"]
]);
wx.createComponent(o);