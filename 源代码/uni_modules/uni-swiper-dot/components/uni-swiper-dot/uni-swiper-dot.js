var t = require("../../../../common/vendor.js"),
  o = {
    name: "UniSwiperDot",
    emits: ["clickItem"],
    props: {
      info: {
        type: Array,
        default: function() {
          return []
        }
      },
      current: {
        type: Number,
        default: 0
      },
      dotsStyles: {
        type: Object,
        default: function() {
          return {}
        }
      },
      mode: {
        type: String,
        default: "default"
      },
      field: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        dots: {
          width: 6,
          height: 6,
          bottom: 10,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, .3)",
          border: "1px rgba(0, 0, 0, .3) solid",
          selectedBackgroundColor: "#333",
          selectedBorder: "1px rgba(0, 0, 0, .9) solid"
        }
      }
    },
    watch: {
      dotsStyles: function(t) {
        this.dots = Object.assign(this.dots, this.dotsStyles)
      },
      mode: function(t) {
        "indexes" === t ? (this.dots.width = 14, this.dots.height = 14) : (this.dots.width = 6, this.dots.height = 6)
      }
    },
    created: function() {
      "indexes" === this.mode && (this.dots.width = 12, this.dots.height = 12), this.dots = Object.assign(this.dots, this.dotsStyles)
    },
    methods: {
      clickItem: function(t) {
        this.$emit("clickItem", t)
      }
    }
  };
var e = t._export_sfc(o, [
  ["render", function(o, e, d, r, n, s) {
    return t.e({
      a: "default" === d.mode
    }, "default" === d.mode ? {
      b: t.f(d.info, (function(o, e, r) {
        return {
          a: t.o((function(t) {
            return s.clickItem(e)
          })),
          b: (e === d.current ? 2 * n.dots.width : n.dots.width) + "px",
          c: e !== d.current ? n.dots.backgroundColor : n.dots.selectedBackgroundColor,
          d: e
        }
      })),
      c: n.dots.width / 2 + "px",
      d: n.dots.bottom + "px"
    } : {}, {
      e: "dot" === d.mode
    }, "dot" === d.mode ? {
      f: t.f(d.info, (function(o, e, r) {
        return {
          a: t.o((function(t) {
            return s.clickItem(e)
          })),
          b: e !== d.current ? n.dots.backgroundColor : n.dots.selectedBackgroundColor,
          c: e !== d.current ? n.dots.border : n.dots.selectedBorder,
          d: e
        }
      })),
      g: n.dots.width + "px",
      h: n.dots.height + "px",
      i: n.dots.bottom + "px"
    } : {}, {
      j: "round" === d.mode
    }, "round" === d.mode ? {
      k: t.f(d.info, (function(o, e, r) {
        return {
          a: t.o((function(t) {
            return s.clickItem(e)
          })),
          b: t.n(e === d.current && "uni-swiper__dots-long"),
          c: (e === d.current ? 3 * n.dots.width : n.dots.width) + "px",
          d: e !== d.current ? n.dots.backgroundColor : n.dots.selectedBackgroundColor,
          e: e !== d.current ? n.dots.border : n.dots.selectedBorder,
          f: e
        }
      })),
      l: n.dots.height + "px",
      m: n.dots.bottom + "px"
    } : {}, {
      n: "nav" === d.mode
    }, "nav" === d.mode ? {
      o: t.t(d.current + 1 + "/" + d.info.length + " " + d.info[d.current][d.field]),
      p: d.dotsStyles.color,
      q: d.dotsStyles.backgroundColor
    } : {}, {
      r: "indexes" === d.mode
    }, "indexes" === d.mode ? {
      s: t.f(d.info, (function(o, e, r) {
        return {
          a: t.t(e + 1),
          b: t.o((function(t) {
            return s.clickItem(e)
          })),
          c: e === d.current ? n.dots.selectedColor : n.dots.color,
          d: e !== d.current ? n.dots.backgroundColor : n.dots.selectedBackgroundColor,
          e: e !== d.current ? n.dots.border : n.dots.selectedBorder,
          f: e
        }
      })),
      t: n.dots.width + "px",
      v: n.dots.height + "px",
      w: n.dots.bottom + "px"
    } : {})
  }],
  ["__scopeId", "data-v-517c38d4"],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.vue"]
]);
wx.createComponent(e);