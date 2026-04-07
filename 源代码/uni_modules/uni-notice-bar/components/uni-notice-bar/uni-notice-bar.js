var e = require("../../../../common/vendor.js"),
  o = {
    name: "UniNoticeBar",
    emits: ["click", "getmore", "close"],
    props: {
      text: {
        type: String,
        default: ""
      },
      moreText: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: "#FFF9EA"
      },
      speed: {
        type: Number,
        default: 100
      },
      color: {
        type: String,
        default: "#FF9A43"
      },
      moreColor: {
        type: String,
        default: "#FF9A43"
      },
      single: {
        type: [Boolean, String],
        default: !1
      },
      scrollable: {
        type: [Boolean, String],
        default: !1
      },
      showIcon: {
        type: [Boolean, String],
        default: !1
      },
      showGetMore: {
        type: [Boolean, String],
        default: !1
      },
      showClose: {
        type: [Boolean, String],
        default: !1
      }
    },
    data: function() {
      return {
        textWidth: 0,
        boxWidth: 0,
        wrapWidth: "",
        webviewHide: !1,
        elId: "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36)),
        elIdBox: "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36)),
        show: !0,
        animationDuration: "none",
        animationPlayState: "paused",
        animationDelay: "0s"
      }
    },
    mounted: function() {
      var e = this;
      this.$nextTick((function() {
        e.initSize()
      }))
    },
    methods: {
      initSize: function() {
        var o = this;
        if (this.scrollable) {
          var t = [],
            n = new Promise((function(t, n) {
              e.index.createSelectorQuery().in(o).select("#".concat(o.elId)).boundingClientRect().exec((function(e) {
                o.textWidth = e[0].width, t()
              }))
            })),
            i = new Promise((function(t, n) {
              e.index.createSelectorQuery().in(o).select("#".concat(o.elIdBox)).boundingClientRect().exec((function(e) {
                o.boxWidth = e[0].width, t()
              }))
            }));
          t.push(n), t.push(i), Promise.all(t).then((function() {
            o.animationDuration = "".concat(o.textWidth / o.speed, "s"), o.animationDelay = "-".concat(o.boxWidth / o.speed, "s"), setTimeout((function() {
              o.animationPlayState = "running"
            }), 1e3)
          }))
        }
      },
      loopAnimation: function() {},
      clickMore: function() {
        this.$emit("getmore")
      },
      close: function() {
        this.show = !1, this.$emit("close")
      },
      onClick: function() {
        this.$emit("click")
      }
    }
  };
Array || e.resolveComponent("uni-icons")();
Math;
var t = e._export_sfc(o, [
  ["render", function(o, t, n, i, r, a) {
    return e.e({
      a: r.show
    }, r.show ? e.e({
      b: !0 === n.showIcon || "true" === n.showIcon
    }, !0 === n.showIcon || "true" === n.showIcon ? {
      c: e.p({
        type: "sound",
        color: n.color,
        size: "22"
      })
    } : {}, {
      d: e.t(n.text),
      e: r.elId,
      f: n.scrollable ? 1 : "",
      g: n.scrollable || !n.single && !n.showGetMore ? "" : 1,
      h: n.color,
      i: r.wrapWidth + "px",
      j: r.animationDuration,
      k: r.animationDuration,
      l: r.webviewHide ? "paused" : r.animationPlayState,
      m: r.webviewHide ? "paused" : r.animationPlayState,
      n: r.animationDelay,
      o: r.animationDelay,
      p: r.elIdBox,
      q: n.scrollable ? 1 : "",
      r: n.scrollable || !n.single && !n.moreText ? "" : 1,
      s: n.scrollable ? 1 : "",
      t: n.scrollable || !n.single && !n.moreText ? "" : 1,
      v: !0 === n.showGetMore || "true" === n.showGetMore
    }, !0 === n.showGetMore || "true" === n.showGetMore ? e.e({
      w: n.moreText.length > 0
    }, n.moreText.length > 0 ? {
      x: e.t(n.moreText),
      y: n.moreColor
    } : {
      z: e.p({
        type: "right",
        color: n.moreColor,
        size: "16"
      })
    }, {
      A: e.o((function() {
        return a.clickMore && a.clickMore.apply(a, arguments)
      }))
    }) : {}, {
      B: !(!0 !== n.showClose && "true" !== n.showClose || !1 !== n.showGetMore && "false" !== n.showGetMore)
    }, !0 !== n.showClose && "true" !== n.showClose || !1 !== n.showGetMore && "false" !== n.showGetMore ? {} : {
      C: e.o(a.close),
      D: e.p({
        type: "closeempty",
        color: n.color,
        size: "16"
      })
    }, {
      E: n.backgroundColor,
      F: e.o((function() {
        return a.onClick && a.onClick.apply(a, arguments)
      }))
    }) : {})
  }],
  ["__scopeId", "data-v-edcb72ac"],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue"]
]);
wx.createComponent(t);