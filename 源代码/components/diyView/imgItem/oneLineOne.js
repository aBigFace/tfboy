var e = require("../utils.js"),
  t = require("../../../common/vendor.js"),
  i = {
    name: "oneLineOne",
    props: ["viewData"],
    setup: function(i) {
      var n = t.toRefs(i).viewData,
        o = function(e) {
          var t = "0px";
          return n.value.imgListConfig.length - 1 !== e && (t = n.value.pvsConfig + "px"), t
        };
      return {
        getMarginBottom: o,
        goLink: e.goLink,
        itemStyle: function(e) {
          return {
            position: "relative",
            marginBottom: o(e),
            width: "100%"
          }
        }
      }
    }
  };
var n = t._export_sfc(i, [
  ["render", function(e, i, n, o, r, a) {
    return {
      a: t.f(n.viewData.imgListConfig, (function(e, i, r) {
        return t.e({
          a: e.img,
          b: t.o((function() {
            return o.goLink({
              type: e.linkType,
              value: e.linkValue
            })
          })),
          c: e.title
        }, e.title ? {
          d: t.t(e.title),
          e: 1 === n.viewData.imgConfig ? 1 : ""
        } : {}, {
          f: t.s(o.itemStyle(i))
        })
      })),
      b: 2 * n.viewData.mbConfig + "rpx",
      c: 2 * n.viewData.mbConfig + "rpx"
    }
  }],
  ["__scopeId", "data-v-77ad73cb"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/imgItem/oneLineOne.vue"]
]);
wx.createComponent(n);