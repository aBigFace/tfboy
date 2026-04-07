var e = require("../../common/vendor.js"),
  t = require("./search.js"),
  r = {
    name: "c_search",
    components: {
      typeOne: function() {
        return "./searchItem/typeOne.js"
      },
      typeTwo: function() {
        return "./searchItem/typeTwo.js"
      },
      otypeThree: function() {
        return "./searchItem/typeThree.js"
      }
    },
    props: {
      formData: {
        type: Object,
        default: function() {
          return JSON.parse(JSON.stringify(t.defaultSearchData))
        }
      }
    },
    setup: function(t) {
      return {
        formData: e.toRefs(t).formData
      }
    }
  };
Array || (e.resolveComponent("typeOne") + e.resolveComponent("typeTwo") + e.resolveComponent("otypeThree"))();
var o = e._export_sfc(r, [
  ["render", function(t, r, o, a, n, f) {
    return e.e({
      a: "typeOne" === a.formData.viewConfig
    }, "typeOne" === a.formData.viewConfig ? {
      b: e.p({
        viewData: a.formData
      })
    } : "typeTwo" === a.formData.viewConfig ? {
      d: e.p({
        viewData: a.formData
      })
    } : "typeThree" === a.formData.viewConfig ? {
      f: e.p({
        viewData: a.formData
      })
    } : {}, {
      c: "typeTwo" === a.formData.viewConfig,
      e: "typeThree" === a.formData.viewConfig,
      g: a.formData.bgColor
    })
  }],
  ["__scopeId", "data-v-7fd2900a"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_search.vue"]
]);
wx.createComponent(o);