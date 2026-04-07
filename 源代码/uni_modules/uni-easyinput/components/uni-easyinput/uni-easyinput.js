var t = require("../../../../common/vendor.js");

function e(t) {
  var e = "";
  for (var o in t) {
    var i = t[o];
    e += "".concat(o, ":").concat(i, ";")
  }
  return e
}
var o = {
  name: "uni-easyinput",
  emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change"],
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  options: {
    virtualHost: !0
  },
  inject: {
    form: {
      from: "uniForm",
      default: null
    },
    formItem: {
      from: "uniFormItem",
      default: null
    }
  },
  props: {
    name: String,
    value: [Number, String],
    modelValue: [Number, String],
    type: {
      type: String,
      default: "text"
    },
    clearable: {
      type: Boolean,
      default: !0
    },
    autoHeight: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: " "
    },
    placeholderStyle: String,
    focus: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    confirmType: {
      type: String,
      default: "done"
    },
    clearSize: {
      type: [Number, String],
      default: 24
    },
    inputBorder: {
      type: Boolean,
      default: !0
    },
    prefixIcon: {
      type: String,
      default: ""
    },
    suffixIcon: {
      type: String,
      default: ""
    },
    trim: {
      type: [Boolean, String],
      default: !0
    },
    passwordIcon: {
      type: Boolean,
      default: !0
    },
    styles: {
      type: Object,
      default: function() {
        return {
          color: "#333",
          disableColor: "#F7F6F6",
          borderColor: "#e5e5e5"
        }
      }
    },
    errorMessage: {
      type: [String, Boolean],
      default: ""
    }
  },
  data: function() {
    return {
      focused: !1,
      val: "",
      showMsg: "",
      border: !1,
      isFirstBorder: !1,
      showClearIcon: !1,
      showPassword: !1,
      focusShow: !1,
      localMsg: ""
    }
  },
  computed: {
    isVal: function() {
      var t = this.val;
      return !(!t && 0 !== t)
    },
    msg: function() {
      return this.localMsg || this.errorMessage
    },
    inputMaxlength: function() {
      return Number(this.maxlength)
    },
    boxStyle: function() {
      return "color:".concat(this.inputBorder && this.msg ? "#e43d33" : this.styles.color, ";")
    },
    inputContentClass: function() {
      return function(t) {
        var e = "";
        for (var o in t) {
          t[o] && (e += "".concat(o, " "))
        }
        return e
      }({
        "is-input-border": this.inputBorder,
        "is-input-error-border": this.inputBorder && this.msg,
        "is-textarea": "textarea" === this.type,
        "is-disabled": this.disabled
      })
    },
    inputContentStyle: function() {
      var t = this.focusShow ? "#2979ff" : this.styles.borderColor;
      return e({
        "border-color": (this.inputBorder && this.msg ? "#dd524d" : t) || "#e5e5e5",
        "background-color": this.disabled ? this.styles.disableColor : "#fff"
      })
    },
    inputStyle: function() {
      return e({
        "padding-right": "password" === this.type || this.clearable || this.prefixIcon ? "" : "10px",
        "padding-left": this.prefixIcon ? "" : "10px"
      })
    }
  },
  watch: {
    value: function(t) {
      this.val = t
    },
    modelValue: function(t) {
      this.val = t
    },
    focus: function(t) {
      var e = this;
      this.$nextTick((function() {
        e.focused = e.focus, e.focusShow = e.focus
      }))
    }
  },
  created: function() {
    var t = this;
    this.init(), this.form && this.formItem && this.$watch("formItem.errMsg", (function(e) {
      t.localMsg = e
    }))
  },
  mounted: function() {
    var t = this;
    this.$nextTick((function() {
      t.focused = t.focus, t.focusShow = t.focus
    }))
  },
  methods: {
    init: function() {
      this.value || 0 === this.value ? this.val = this.value : this.modelValue || 0 === this.modelValue ? this.val = this.modelValue : this.val = null
    },
    onClickIcon: function(t) {
      this.$emit("iconClick", t)
    },
    onEyes: function() {
      this.showPassword = !this.showPassword, this.$emit("eyes", this.showPassword)
    },
    onInput: function(t) {
      var e = t.detail.value;
      this.trim && ("boolean" == typeof this.trim && this.trim && (e = this.trimStr(e)), "string" == typeof this.trim && (e = this.trimStr(e, this.trim))), this.errMsg && (this.errMsg = ""), this.val = e, this.$emit("input", e), this.$emit("update:modelValue", e)
    },
    onFocus: function() {
      var t = this;
      this.$nextTick((function() {
        t.focused = !0
      })), this.$emit("focus", null)
    },
    _Focus: function(t) {
      this.focusShow = !0, this.$emit("focus", t)
    },
    onBlur: function() {
      this.focused = !1, this.$emit("focus", null)
    },
    _Blur: function(t) {
      (t.detail.value, this.focusShow = !1, this.$emit("blur", t), this.$emit("change", this.val), this.form && this.formItem) && ("blur" === this.form.validateTrigger && this.formItem.onFieldChange())
    },
    onConfirm: function(t) {
      this.$emit("confirm", this.val), this.$emit("change", this.val)
    },
    onClear: function(t) {
      this.val = "", this.$emit("input", ""), this.$emit("update:modelValue", ""), this.$emit("clear")
    },
    trimStr: function(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "both";
      return "both" === e ? t.trim() : "left" === e ? t.trimLeft() : "right" === e ? t.trimRight() : "start" === e ? t.trimStart() : "end" === e ? t.trimEnd() : "all" === e ? t.replace(/\s+/g, "") : t
    }
  }
};
Array || t.resolveComponent("uni-icons")();
Math;
var i = t._export_sfc(o, [
  ["render", function(e, o, i, n, r, s) {
    return t.e({
      a: i.prefixIcon
    }, i.prefixIcon ? {
      b: t.o((function(t) {
        return s.onClickIcon("prefix")
      })),
      c: t.p({
        type: i.prefixIcon,
        color: "#c0c4cc",
        size: "22"
      })
    } : {}, {
      d: "textarea" === i.type
    }, "textarea" === i.type ? {
      e: i.inputBorder ? 1 : "",
      f: i.name,
      g: r.val,
      h: i.placeholder,
      i: i.placeholderStyle,
      j: i.disabled,
      k: s.inputMaxlength,
      l: r.focused,
      m: i.autoHeight,
      n: t.o((function() {
        return s.onInput && s.onInput.apply(s, arguments)
      })),
      o: t.o((function() {
        return s._Blur && s._Blur.apply(s, arguments)
      })),
      p: t.o((function() {
        return s._Focus && s._Focus.apply(s, arguments)
      })),
      q: t.o((function() {
        return s.onConfirm && s.onConfirm.apply(s, arguments)
      }))
    } : {
      r: "password" === i.type ? "text" : i.type,
      s: t.s(s.inputStyle),
      t: i.name,
      v: r.val,
      w: !r.showPassword && "password" === i.type,
      x: i.placeholder,
      y: i.placeholderStyle,
      z: i.disabled,
      A: s.inputMaxlength,
      B: r.focused,
      C: i.confirmType,
      D: t.o((function() {
        return s._Focus && s._Focus.apply(s, arguments)
      })),
      E: t.o((function() {
        return s._Blur && s._Blur.apply(s, arguments)
      })),
      F: t.o((function() {
        return s.onInput && s.onInput.apply(s, arguments)
      })),
      G: t.o((function() {
        return s.onConfirm && s.onConfirm.apply(s, arguments)
      }))
    }, {
      H: "password" === i.type && i.passwordIcon
    }, "password" === i.type && i.passwordIcon ? t.e({
      I: s.isVal
    }, s.isVal ? {
      J: "textarea" === i.type ? 1 : "",
      K: t.o(s.onEyes),
      L: t.p({
        type: r.showPassword ? "eye-filled" : "eye-slash-filled",
        size: 22,
        color: r.focusShow ? "#2979ff" : "#c0c4cc"
      })
    } : {}) : i.suffixIcon ? t.e({
      N: i.suffixIcon
    }, i.suffixIcon ? {
      O: t.o((function(t) {
        return s.onClickIcon("suffix")
      })),
      P: t.p({
        type: i.suffixIcon,
        color: "#c0c4cc",
        size: "22"
      })
    } : {}) : t.e({
      Q: i.clearable && s.isVal && !i.disabled && "textarea" !== i.type
    }, i.clearable && s.isVal && !i.disabled && "textarea" !== i.type ? {
      R: "textarea" === i.type ? 1 : "",
      S: t.o(s.onClear),
      T: t.p({
        type: "clear",
        size: i.clearSize,
        color: s.msg ? "#dd524d" : r.focusShow ? "#2979ff" : "#c0c4cc"
      })
    } : {}), {
      M: i.suffixIcon,
      U: t.n(s.inputContentClass),
      V: t.s(s.inputContentStyle),
      W: s.msg ? 1 : "",
      X: t.s(s.boxStyle)
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]
]);
wx.createComponent(i);