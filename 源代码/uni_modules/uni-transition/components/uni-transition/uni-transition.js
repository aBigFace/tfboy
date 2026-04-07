var t = require("../../../../@babel/runtime/helpers/toConsumableArray"),
  i = require("../../../../@babel/runtime/helpers/typeof"),
  n = require("../../../../@babel/runtime/helpers/objectSpread2"),
  o = require("./createAnimation.js"),
  a = require("../../../../common/vendor.js"),
  e = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: !1
      },
      modeClass: {
        type: [Array, String],
        default: function() {
          return "fade"
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default: function() {
          return {}
        }
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        isShow: !1,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      }
    },
    watch: {
      show: {
        handler: function(t) {
          t ? this.open() : this.isShow && this.close()
        },
        immediate: !0
      }
    },
    computed: {
      stylesObject: function() {
        var t = n(n({}, this.styles), {}, {
            "transition-duration": this.duration / 1e3 + "s"
          }),
          i = "";
        for (var o in t) {
          i += this.toLine(o) + ":" + t[o] + ";"
        }
        return i
      },
      transformStyles: function() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject
      }
    },
    created: function() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      }, this.durationTime = this.duration
    },
    methods: {
      init: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t.duration && (this.durationTime = t.duration), this.animation = o.createAnimation(Object.assign(this.config, t), this)
      },
      onClick: function() {
        this.$emit("click", {
          detail: this.isShow
        })
      },
      step: function(n) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (this.animation) {
          for (var a in n) try {
            var e;
            if ("object" === i(n[a]))(e = this.animation)[a].apply(e, t(n[a]));
            else this.animation[a](n[a])
          } catch (t) {
            console.error("方法 ".concat(a, " 不存在"))
          }
          return this.animation.step(o), this
        }
      },
      run: function(t) {
        this.animation && this.animation.run(t)
      },
      open: function() {
        var t = this;
        clearTimeout(this.timer), this.transform = "", this.isShow = !0;
        var i = this.styleInit(!1),
          n = i.opacity,
          a = i.transform;
        void 0 !== n && (this.opacity = n), this.transform = a, this.$nextTick((function() {
          t.timer = setTimeout((function() {
            t.animation = o.createAnimation(t.config, t), t.tranfromInit(!1).step(), t.animation.run(), t.$emit("change", {
              detail: t.isShow
            })
          }), 20)
        }))
      },
      close: function(t) {
        var i = this;
        this.animation && this.tranfromInit(!0).step().run((function() {
          i.isShow = !1, i.animationData = null, i.animation = null;
          var t = i.styleInit(!1),
            n = t.opacity,
            o = t.transform;
          i.opacity = n || 1, i.transform = o, i.$emit("change", {
            detail: i.isShow
          })
        }))
      },
      styleInit: function(t) {
        var i = this,
          n = {
            transform: ""
          },
          o = function(t, o) {
            "fade" === o ? n.opacity = i.animationType(t)[o] : n.transform += i.animationType(t)[o] + " "
          };
        return "string" == typeof this.modeClass ? o(t, this.modeClass) : this.modeClass.forEach((function(i) {
          o(t, i)
        })), n
      },
      tranfromInit: function(t) {
        var i = this,
          n = function(t, n) {
            var o = null;
            "fade" === n ? o = t ? 0 : 1 : (o = t ? "-100%" : "0", "zoom-in" === n && (o = t ? .8 : 1), "zoom-out" === n && (o = t ? 1.2 : 1), "slide-right" === n && (o = t ? "100%" : "0"), "slide-bottom" === n && (o = t ? "100%" : "0")), i.animation[i.animationMode()[n]](o)
          };
        return "string" == typeof this.modeClass ? n(t, this.modeClass) : this.modeClass.forEach((function(i) {
          n(t, i)
        })), this.animation
      },
      animationType: function(t) {
        return {
          fade: t ? 1 : 0,
          "slide-top": "translateY(".concat(t ? "0" : "-100%", ")"),
          "slide-right": "translateX(".concat(t ? "0" : "100%", ")"),
          "slide-bottom": "translateY(".concat(t ? "0" : "100%", ")"),
          "slide-left": "translateX(".concat(t ? "0" : "-100%", ")"),
          "zoom-in": "scaleX(".concat(t ? 1 : .8, ") scaleY(").concat(t ? 1 : .8, ")"),
          "zoom-out": "scaleX(".concat(t ? 1 : 1.2, ") scaleY(").concat(t ? 1 : 1.2, ")")
        }
      },
      animationMode: function() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        }
      },
      toLine: function(t) {
        return t.replace(/([A-Z])/g, "-$1").toLowerCase()
      }
    }
  };
var s = a._export_sfc(e, [
  ["render", function(t, i, n, o, e, s) {
    return a.e({
      a: e.isShow
    }, e.isShow ? {
      b: e.animationData,
      c: a.n(n.customClass),
      d: a.s(s.transformStyles),
      e: a.o((function() {
        return s.onClick && s.onClick.apply(s, arguments)
      }))
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]
]);
wx.createComponent(s);