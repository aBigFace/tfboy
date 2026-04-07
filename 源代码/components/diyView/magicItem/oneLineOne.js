var e = require("../utils.js"),
  i = require("../../../common/vendor.js"),
  t = {
    name: "oneLineOne",
    props: ["viewData"],
    setup: function(t) {
      var n = i.toRefs(t).viewData;
      return {
        goLink: e.goLink,
        viewData: n,
        getViewData: function(e) {
          return n.value.imgListConfig.slice(4 * (e - 1), 4 * e)
        }
      }
    }
  };
var n = i._export_sfc(t, [
  ["render", function(e, t, n, a, o, r) {
    return i.e({
      a: !1 === a.viewData.isHiddenConfig
    }, !1 === a.viewData.isHiddenConfig ? {
      b: i.t(a.viewData.titleConfig.val),
      c: a.viewData.psConfig,
      d: a.viewData.moduleFontColor
    } : {}, {
      e: i.f(Math.ceil(a.viewData.imgListConfig.length / 4), (function(e, t, n) {
        return {
          a: i.f(a.getViewData(e), (function(e, t, n) {
            return {
              a: e.img,
              b: i.t(e.title),
              c: i.o((function() {
                return a.goLink({
                  type: e.linkType,
                  value: e.linkValue
                })
              }))
            }
          })),
          b: e
        }
      })),
      f: i.n("circular" === a.viewData.styleConfig ? "circular" : ""),
      g: a.viewData.titleFontColor,
      h: 2 * a.viewData.mbConfig + "rpx",
      i: 2 * a.viewData.mbConfig + "rpx"
    })
  }],
  ["__scopeId", "data-v-efe99bbe"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/magicItem/oneLineOne.vue"]
]);
wx.createComponent(n);