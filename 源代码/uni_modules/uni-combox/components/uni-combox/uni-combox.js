var t = require("../../../../common/vendor.js"),
  e = {
    name: "uniCombox",
    emits: ["input", "update:modelValue"],
    props: {
      border: {
        type: Boolean,
        default: !0
      },
      label: {
        type: String,
        default: ""
      },
      labelWidth: {
        type: String,
        default: "auto"
      },
      placeholder: {
        type: String,
        default: ""
      },
      candidates: {
        type: Array,
        default: function() {
          return []
        }
      },
      emptyTips: {
        type: String,
        default: "无匹配项"
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      labelKey: {
        type: String,
        default: "header"
      },
      valueKey: {
        type: String,
        default: "dutyParagraph"
      }
    },
    data: function() {
      return {
        showSelector: !1,
        inputVal: ""
      }
    },
    computed: {
      labelStyle: function() {
        return "auto" === this.labelWidth ? "" : "width: ".concat(this.labelWidth)
      },
      filterCandidates: function() {
        return this.candidates
      },
      filterCandidatesLength: function() {
        return this.filterCandidates.length
      }
    },
    watch: {
      modelValue: {
        handler: function(t) {
          this.inputVal = t
        },
        immediate: !0
      }
    },
    methods: {
      toggleSelector: function() {
        this.showSelector = !this.showSelector
      },
      onFocus: function() {
        this.showSelector = !0
      },
      onBlur: function() {
        var t = this;
        setTimeout((function() {
          t.showSelector = !1
        }), 153)
      },
      onSelectorClick: function(t) {
        this.inputVal = this.filterCandidates[t]["".concat(this.labelKey)], this.showSelector = !1, this.$emit("input", this.inputVal), this.$emit("update:modelValue", this.inputVal), this.$emit("idValue", this.filterCandidates[t]["".concat(this.valueKey)])
      },
      onInput: function() {
        var t = this;
        setTimeout((function() {
          t.$emit("input", t.inputVal), t.$emit("update:modelValue", t.inputVal)
        }))
      }
    }
  };
Array || t.resolveComponent("uni-icons")();
Math;
var n = t._export_sfc(e, [
  ["render", function(e, n, o, i, l, a) {
    return t.e({
      a: o.label
    }, o.label ? {
      b: t.t(o.label),
      c: t.s(a.labelStyle)
    } : {}, {
      d: o.placeholder,
      e: t.o([function(t) {
        return l.inputVal = t.detail.value
      }, function() {
        return a.onInput && a.onInput.apply(a, arguments)
      }]),
      f: t.o((function() {
        return a.onFocus && a.onFocus.apply(a, arguments)
      })),
      g: t.o((function() {
        return a.onBlur && a.onBlur.apply(a, arguments)
      })),
      h: l.inputVal,
      i: t.o(a.toggleSelector),
      j: t.p({
        type: l.showSelector ? "top" : "bottom",
        size: "0",
        color: "#999"
      }),
      k: l.showSelector
    }, l.showSelector ? t.e({
      l: 0 === a.filterCandidatesLength
    }, 0 === a.filterCandidatesLength ? {
      m: t.t(o.emptyTips)
    } : {}, {
      n: t.f(a.filterCandidates, (function(e, n, i) {
        return {
          a: t.t(e["".concat(o.labelKey)]),
          b: n,
          c: t.o((function(t) {
            return a.onSelectorClick(n)
          }))
        }
      }))
    }) : {}, {
      o: t.n(o.border ? "" : "uni-combox__no-border")
    })
  }],
  ["__scopeId", "data-v-1469e41e"],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-combox/components/uni-combox/uni-combox.vue"]
]);
wx.createComponent(n);