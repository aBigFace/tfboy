var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../common/vendor.js"),
  o = {
    name: "c_shoppCart",
    components: {
      StyleThree: function() {
        return "./shoppCartItem/styleThree.js"
      },
      c_magic: function() {
        return "./c_magic.js"
      },
      c_imgBox: function() {
        return "./c_imgBox.js"
      },
      c_swiper: function() {
        return "./c_swiper.js"
      },
      c_goodsList: function() {
        return "./c_goodsList.js"
      },
      c_rollingNotice: function() {
        return "./c_rollingNotice.js"
      },
      c_moduleSpacing: function() {
        return "./c_moduleSpacing.js"
      },
      c_search: function() {
        return "./c_search.js"
      },
      c_title: function() {
        return "./c_title.js"
      },
      c_video: function() {
        return "./c_video.js"
      },
      c_presale: function() {
        return "./c_presale.js"
      }
    },
    props: ["formData", "totalData", "viewData"],
    setup: function(o, a) {
      var n = t.toRefs(o).viewData,
        c = t.reactive({
          statusCode: 2,
          codeList: [-1, 0, 1]
        });
      return e(e({
        goIndex: function() {
          t.index.switchTab({
            url: "/pages/index/index"
          })
        }
      }, t.toRefs(c)), {}, {
        validState: function(e, t) {
          c.statusCode = e, a.emit("validState", e, t)
        },
        viewData: n
      })
    }
  };
Array || (t.resolveComponent("StyleThree") + t.resolveComponent("c_swiper") + t.resolveComponent("c_imgBox") + t.resolveComponent("c_goodsList") + t.resolveComponent("c_magic") + t.resolveComponent("c_rollingNotice") + t.resolveComponent("c_search") + t.resolveComponent("c_moduleSpacing") + t.resolveComponent("c_title") + t.resolveComponent("c_presale"))();
var a = t._export_sfc(o, [
  ["render", function(e, o, a, n, c, r) {
    return t.e({
      a: 0 == n.viewData.length && !e.codeList.includes(e.statusCode)
    }, 0 != n.viewData.length || e.codeList.includes(e.statusCode) ? {
      c: t.f(a.formData, (function(e, o, c) {
        return t.e({
          a: "c_shoppCart" == e.name && "styleThree" == e.tsConfig.list[e.tsConfig.type].val
        }, "c_shoppCart" == e.name && "styleThree" == e.tsConfig.list[e.tsConfig.type].val ? {
          b: t.o(n.validState),
          c: "323f1408-0-" + c,
          d: t.p({
            formData: n.viewData,
            totalData: a.totalData
          })
        } : "c_swiper" === e.name ? {
          f: "323f1408-1-" + c,
          g: t.p({
            formData: e
          })
        } : "c_imgBox" === e.name ? {
          i: "323f1408-2-" + c,
          j: t.p({
            formData: e
          })
        } : "c_goodsList" === e.name ? {
          l: "323f1408-3-" + c,
          m: t.p({
            formData: e,
            isLast: o === a.formData.value.length - 1
          })
        } : "c_magic" === e.name ? {
          o: "323f1408-4-" + c,
          p: t.p({
            formData: e
          })
        } : "c_rollingNotice" === e.name ? {
          r: "323f1408-5-" + c,
          s: t.p({
            formData: e
          })
        } : "c_search" === e.name ? {
          v: "323f1408-6-" + c,
          w: t.p({
            formData: e
          })
        } : "c_moduleSpacing" === e.name ? {
          y: "323f1408-7-" + c,
          z: t.p({
            formData: e
          })
        } : "c_rollingNotice" === e.name ? {
          B: "323f1408-8-" + c,
          C: t.p({
            formData: e
          })
        } : "c_title" === e.name ? {
          E: "323f1408-9-" + c,
          F: t.p({
            formData: e
          })
        } : "c_presale" === e.name ? {
          H: "323f1408-10-" + c,
          I: t.p({
            formData: e
          })
        } : {}, {
          e: "c_swiper" === e.name,
          h: "c_imgBox" === e.name,
          k: "c_goodsList" === e.name,
          n: "c_magic" === e.name,
          q: "c_rollingNotice" === e.name,
          t: "c_search" === e.name,
          x: "c_moduleSpacing" === e.name,
          A: "c_rollingNotice" === e.name,
          D: "c_title" === e.name,
          G: "c_presale" === e.name,
          J: o
        })
      }))
    } : {
      b: e.$static + "/static/image/mine/shoppingCart.png"
    })
  }],
  ["__scopeId", "data-v-323f1408"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_shoppCart.vue"]
]);
wx.createComponent(a);