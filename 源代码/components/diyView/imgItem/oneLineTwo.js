var e = require("../utils.js"),
  t = require("../../../common/vendor.js"),
  i = {
    name: "oneLineTwo",
    props: ["viewData"],
    setup: function(i) {
      var n = t.toRefs(i).viewData,
        o = function(e) {
          var t = n.value.imgListConfig.length - 1,
            i = t % 2,
            o = "0px";
          if (t > 1) {
            for (var r = !1; i > -1;) e === t - i && (r = !0), i--;
            r || (o = n.value.pvsConfig + "px")
          }
          return o
        };
      return {
        itemStyle: function(e) {
          return {
            position: "relative",
            marginBottom: o(e),
            width: "calc(50% - ".concat(n.value.mrConfig, "px)"),
            marginRight: e % 2 == 1 ? "" : "".concat(n.value.mrConfig, "px")
          }
        },
        goLink: e.goLink
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
  ["__scopeId", "data-v-dfd5b69e"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/imgItem/oneLineTwo.vue"]
]);
wx.createComponent(n);