var e = require("../../../common/vendor.js"),
  t = require("../utils.js"),
  i = {
    name: "oneLineThree",
    props: ["viewData"],
    setup: function(i) {
      var n = e.toRefs(i).viewData,
        o = function(e) {
          var t = n.value.imgListConfig.length - 1,
            i = t % 3,
            o = "0px";
          if (t > 2) {
            for (var r = !1; i > -1;) e === t - i && (r = !0), i--;
            r || (o = n.value.pvsConfig + "px")
          }
          return o
        };
      return {
        goLink: t.goLink,
        getMarginBottom: o,
        itemStyle: function(e) {
          return {
            position: "relative",
            marginBottom: o(e),
            width: "calc((100%/3) - ".concat(2 * n.value.mrConfig / 3, "px)"),
            marginRight: e % 3 == 2 ? "" : "".concat(n.value.mrConfig, "px")
          }
        }
      }
    }
  };
var n = e._export_sfc(i, [
  ["render", function(t, i, n, o, r, a) {
    return {
      a: e.f(n.viewData.imgListConfig, (function(t, i, r) {
        return e.e({
          a: t.img,
          b: e.o((function() {
            return o.goLink({
              type: t.linkType,
              value: t.linkValue
            })
          })),
          c: t.title
        }, t.title ? {
          d: e.t(t.title),
          e: 1 === n.viewData.imgConfig ? 1 : ""
        } : {}, {
          f: e.s(o.itemStyle(i))
        })
      })),
      b: 2 * n.viewData.mbConfig + "rpx",
      c: 2 * n.viewData.mbConfig + "rpx"
    }
  }],
  ["__scopeId", "data-v-76aa607a"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/imgItem/oneLineThree.vue"]
]);
wx.createComponent(n);