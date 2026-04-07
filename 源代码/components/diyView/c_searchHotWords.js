var e = require("../../common/vendor.js"),
  n = require("./utils.js"),
  o = {
    name: "c_searchHotWord",
    props: ["formData"],
    setup: function(o) {
      return {
        handleGoLink: function(n) {
          e.index.navigateTo({
            url: "/pages/index/searchContent?value=" + n.keyWord
          })
        },
        handleGoProductList: function(n) {
          e.index.navigateTo({
            url: "/pages/index/searchContent?value=" + n
          })
        },
        formData: e.toRefs(o).formData,
        goLink: n.goLink
      }
    }
  };
var r = e._export_sfc(o, [
  ["render", function(n, o, r, t, a, i) {
    var c;
    return {
      a: e.f(null == (c = t.formData) ? void 0 : c.info, (function(n, o, r) {
        return {
          a: e.t(n.keyWord),
          b: e.o((function(e) {
            return t.handleGoLink(n)
          }))
        }
      }))
    }
  }],
  ["__scopeId", "data-v-722bfaf4"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_searchHotWords.vue"]
]);
wx.createComponent(r);