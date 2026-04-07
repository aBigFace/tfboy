var e = require("../../../../common/vendor.js"),
  t = require("./i18n/index.js"),
  a = e.initVueI18n(t.messages).t,
  n = {
    name: "UniSearchBar",
    emits: ["input", "update:modelValue", "clear", "cancel", "confirm", "blur", "focus"],
    props: {
      placeholder: {
        type: String,
        default: ""
      },
      radius: {
        type: [Number, String],
        default: 5
      },
      clearButton: {
        type: String,
        default: "auto"
      },
      cancelButton: {
        type: String,
        default: "auto"
      },
      cancelText: {
        type: String,
        default: "取消"
      },
      bgColor: {
        type: String,
        default: "#F8F8F8"
      },
      maxlength: {
        type: [Number, String],
        default: 100
      },
      value: {
        type: [Number, String],
        default: ""
      },
      modelValue: {
        type: [Number, String],
        default: ""
      },
      focus: {
        type: Boolean,
        default: !1
      },
      readonly: {
        type: Boolean,
        default: !1
      }
    },
    data: function() {
      return {
        show: !1,
        showSync: !1,
        searchVal: ""
      }
    },
    computed: {
      cancelTextI18n: function() {
        return this.cancelText || a("uni-search-bar.cancel")
      },
      placeholderText: function() {
        return this.placeholder || a("uni-search-bar.placeholder")
      }
    },
    watch: {
      modelValue: {
        immediate: !0,
        handler: function(e) {
          this.searchVal = e, e && (this.show = !0)
        }
      },
      focus: {
        immediate: !0,
        handler: function(e) {
          var t = this;
          if (e) {
            if (this.readonly) return;
            this.show = !0, this.$nextTick((function() {
              t.showSync = !0
            }))
          }
        }
      },
      searchVal: function(e, t) {
        this.$emit("input", e), this.$emit("update:modelValue", e)
      }
    },
    methods: {
      searchClick: function() {
        var e = this;
        this.readonly || this.show || (this.show = !0, this.$nextTick((function() {
          e.showSync = !0
        })))
      },
      clear: function() {
        this.$emit("clear", {
          value: this.searchVal
        }), this.searchVal = ""
      },
      cancel: function() {
        this.readonly || (this.$emit("cancel", {
          value: this.searchVal
        }), this.searchVal = "", this.show = !1, this.showSync = !1)
      },
      confirm: function() {
        this.$emit("confirm", {
          value: this.searchVal
        })
      },
      blur: function() {
        this.$emit("blur", {
          value: this.searchVal
        })
      },
      emitFocus: function(e) {
        this.$emit("focus", e.detail)
      }
    }
  };
Array || e.resolveComponent("uni-icons")();
Math;
var c = e._export_sfc(n, [
  ["render", function(t, a, n, c, r, o) {
    return e.e({
      a: e.p({
        color: "#c0c4cc",
        size: "18",
        type: "search"
      }),
      b: r.show || r.searchVal
    }, r.show || r.searchVal ? {
      c: r.showSync,
      d: n.readonly,
      e: o.placeholderText,
      f: n.maxlength,
      g: e.o((function() {
        return o.confirm && o.confirm.apply(o, arguments)
      })),
      h: e.o((function() {
        return o.blur && o.blur.apply(o, arguments)
      })),
      i: e.o((function() {
        return o.emitFocus && o.emitFocus.apply(o, arguments)
      })),
      j: r.searchVal,
      k: e.o((function(e) {
        return r.searchVal = e.detail.value
      }))
    } : {
      l: e.t(n.placeholder)
    }, {
      m: r.show && ("always" === n.clearButton || "auto" === n.clearButton && "" !== r.searchVal) && !n.readonly
    }, r.show && ("always" === n.clearButton || "auto" === n.clearButton && "" !== r.searchVal) && !n.readonly ? {
      n: e.p({
        color: "#c0c4cc",
        size: "20",
        type: "clear"
      }),
      o: e.o((function() {
        return o.clear && o.clear.apply(o, arguments)
      }))
    } : {}, {
      p: n.radius + "px",
      q: n.bgColor,
      r: e.o((function() {
        return o.searchClick && o.searchClick.apply(o, arguments)
      })),
      s: "always" === n.cancelButton || r.show && "auto" === n.cancelButton
    }, "always" === n.cancelButton || r.show && "auto" === n.cancelButton ? {
      t: e.t(o.cancelTextI18n),
      v: e.o((function() {
        return o.cancel && o.cancel.apply(o, arguments)
      }))
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"]
]);
wx.createComponent(c);