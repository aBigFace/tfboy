var e = require("../../../common/vendor.js"),
  i = require("../utils.js"),
  n = {
    name: "oneLineMore",
    props: ["viewData"],
    setup: function(n) {
      var t = e.toRefs(n).viewData,
        a = e.computed$1((function() {
          return Math.ceil(t.value.imgListConfig.length / (t.value.lineConfig * t.value.numConfig))
        })),
        o = e.computed$1((function() {
          return 1 === a.value ? 105 * Math.ceil(t.value.imgListConfig.length / t.value.numConfig) + "px" : 105 * t.value.lineConfig + "px"
        }));
      return {
        goLink: i.goLink,
        viewData: t,
        getViewData: function(e) {
          var i = t.value.lineConfig * t.value.numConfig;
          return t.value.imgListConfig.slice((e - 1) * i, e * i)
        },
        pageNumber: a,
        heightNumber: o
      }
    }
  };
var t = e._export_sfc(n, [
  ["render", function(i, n, t, a, o, u) {
    return e.e({
      a: !1 === a.viewData.isHiddenConfig
    }, !1 === a.viewData.isHiddenConfig ? {
      b: e.t(a.viewData.titleConfig),
      c: a.viewData.psConfig,
      d: a.viewData.moduleFontColor
    } : {}, {
      e: e.f(a.pageNumber, (function(i, n, t) {
        return {
          a: e.f(a.getViewData(i), (function(i, n, t) {
            return {
              a: i.img,
              b: e.t(i.title),
              c: e.o((function() {
                return a.goLink({
                  type: i.linkType,
                  value: i.linkValue
                })
              }))
            }
          })),
          b: i
        }
      })),
      f: e.n("circular" === a.viewData.styleConfig ? "circular" : ""),
      g: a.viewData.titleFontColor,
      h: 100 / a.viewData.numConfig + "%",
      i: a.heightNumber,
      j: a.viewData.mbConfig + "px",
      k: a.viewData.mbConfig + "px"
    })
  }],
  ["__scopeId", "data-v-10d768ac"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/magicItem/oneLineMore.vue"]
]);
wx.createComponent(t);