var a = require("../utils.js"),
  t = require("../../../common/vendor.js"),
  e = {
    name: "modelOne",
    props: ["viewData", "allData"],
    setup: function(e) {
      var i = t.toRefs(e);
      return {
        viewData: i.viewData,
        allData: i.allData,
        goLink: a.goLink
      }
    }
  };
var i = t._export_sfc(e, [
  ["render", function(a, e, i, l, n, o) {
    return {
      a: t.f(l.viewData, (function(a, e, i) {
        return t.e({
          a: a.img
        }, a.img ? {
          b: a.img,
          c: "circle" === l.allData.imgConfig ? 1 : "",
          d: 2 * l.allData.ihConfig + "rpx",
          e: 2 * l.allData.widthConfig + "rpx"
        } : {}, {
          f: t.t(a.title)
        }, l.allData.isShowBtn.type ? {
          g: t.t(l.allData.isShowBtn.text)
        } : {}, {
          h: e,
          i: t.o((function() {
            return l.goLink({
              value: a.linkValue,
              type: a.linkType
            })
          }))
        })
      })),
      b: "circle" === l.allData.imgConfig ? 1 : "",
      c: 2 * l.allData.ihConfig + "rpx",
      d: 2 * l.allData.widthConfig + "rpx",
      e: l.allData.isShowBtn.type,
      f: 2 * l.allData.mbConfig + "rpx",
      g: 2 * l.allData.mbConfig + "rpx"
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/imgTextItem/modelOne.vue"]
]);
wx.createComponent(i);