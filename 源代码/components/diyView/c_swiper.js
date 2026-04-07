var r = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../common/vendor.js"),
  t = require("./utils.js"),
  a = function(r) {
    return r[r.dot = 0] = "dot", r[r.default = 1] = "default", r[r[""] = 2] = "", r
  }(a || {}),
  e = function(r) {
    return r[r.startClass = 0] = "startClass", r[r.centerClass = 1] = "centerClass", r[r.endClass = 2] = "endClass", r
  }(e || {}),
  n = {
    name: "c_swiper",
    props: ["formData"],
    setup: function(n) {
      var i = o.reactive({
          ModeType: a,
          ClassType: e,
          indicatorColor: "",
          autoplay: !0,
          interval: 2e3,
          duration: 500,
          current: 0
        }),
        f = o.toRefs(n).formData;
      return r({
        changeSwiper: function(r) {
          i.current = r.detail.current
        },
        formData: f,
        goLink: t.goLink
      }, o.toRefs(i))
    }
  };
Array || o.resolveComponent("uni-swiper-dot")();
Math;
var i = o._export_sfc(n, [
  ["render", function(r, t, a, e, n, i) {
    return {
      a: o.f(e.formData.imgListConfig, (function(r, t, a) {
        return {
          a: r.img,
          b: t,
          c: o.o((function() {
            return e.goLink({
              value: r.linkValue,
              type: r.linkType
            })
          }))
        }
      })),
      b: 1 == e.formData.imgConfig ? 1 : "",
      c: 2 * e.formData.ihConfig + "rpx",
      d: 1 == e.formData.imgConfig ? 1 : "",
      e: 1 == e.formData.imgConfig ? 1 : "",
      f: r.autoplay,
      g: r.interval,
      h: r.duration,
      i: r.indicatorColor,
      j: 1 == e.formData.imgConfig ? 1 : "",
      k: o.o((function() {
        return e.changeSwiper && e.changeSwiper.apply(e, arguments)
      })),
      l: 2 * e.formData.ihConfig + "rpx",
      m: 2 * e.formData.mbConfig + "rpx",
      n: 2 * e.formData.mbConfig + "rpx",
      o: o.n(r.ClassType[e.formData.txtStyle]),
      p: 2 * e.formData.mbConfig + "rpx",
      q: 2 * e.formData.mbConfig + "rpx",
      r: 2 * e.formData.ihConfig + "rpx",
      s: 1 == e.formData.imgConfig ? "8px" : "0px",
      t: o.p({
        info: e.formData.imgListConfig,
        current: r.current,
        field: "content",
        mode: r.ModeType[e.formData.docConfig],
        dotsStyles: {
          backgroundColor: "rgba(0,0,0,0.2)",
          border: "rgba(0,0,0,0.2)",
          selectedBackgroundColor: "rgba(0,0,0,0.7)",
          selectedBorder: "rgba(0,0,0,0.7)",
          width: 4,
          height: 4
        }
      }),
      v: 1 == e.formData.imgConfig ? 1 : "",
      w: e.formData.bgColor,
      x: 2 * e.formData.ihConfig + "rpx"
    }
  }],
  ["__scopeId", "data-v-74542a4c"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_swiper.vue"]
]);
wx.createComponent(i);