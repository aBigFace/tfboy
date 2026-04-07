var t = require("../../../../common/vendor.js"),
  e = {
    name: "UniNumberBox",
    emits: ["change", "input", "update:modelValue", "blur", "focus"],
    props: {
      value: {
        type: [Number, String],
        default: 1
      },
      modelValue: {
        type: [Number, String],
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      background: {
        type: String,
        default: "#f5f5f5"
      },
      color: {
        type: String,
        default: "#333"
      },
      disabled: {
        type: Boolean,
        default: !1
      }
    },
    data: function() {
      return {
        inputValue: 0
      }
    },
    watch: {
      value: function(t) {
        this.inputValue = +t
      },
      modelValue: function(t) {
        this.inputValue = +t
      }
    },
    created: function() {
      1 === this.value && (this.inputValue = +this.modelValue), 1 === this.modelValue && (this.inputValue = +this.value)
    },
    methods: {
      _calcValue: function(t) {
        if (!this.disabled) {
          var e = this._getDecimalScale(),
            i = this.inputValue * e,
            u = this.step * e;
          if ("minus" === t) {
            if ((i -= u) < this.min * e) return;
            i > this.max * e && (i = this.max * e)
          }
          if ("plus" === t) {
            if ((i += u) > this.max * e) return;
            i < this.min * e && (i = this.min * e)
          }
          this.inputValue = (i / e).toFixed(String(e).length - 1), this.$emit("change", +this.inputValue), this.$emit("input", +this.inputValue), this.$emit("update:modelValue", +this.inputValue)
        }
      },
      _getDecimalScale: function() {
        var t = 1;
        return ~~this.step !== this.step && (t = Math.pow(10, String(this.step).split(".")[1].length)), t
      },
      _onBlur: function(t) {
        this.$emit("blur", t);
        var e = t.detail.value;
        if (e) {
          (e = +e) > this.max ? e = this.max : e < this.min && (e = this.min);
          var i = this._getDecimalScale();
          this.inputValue = e.toFixed(String(i).length - 1), this.$emit("change", +this.inputValue), this.$emit("input", +this.inputValue)
        }
      },
      _onFocus: function(t) {
        this.$emit("focus", t)
      }
    }
  };
var i = t._export_sfc(e, [
  ["render", function(e, i, u, n, a, l) {
    return {
      a: a.inputValue <= u.min || u.disabled ? 1 : "",
      b: u.color,
      c: t.o((function(t) {
        return l._calcValue("minus")
      })),
      d: u.background,
      e: u.disabled,
      f: t.o((function() {
        return l._onFocus && l._onFocus.apply(l, arguments)
      })),
      g: t.o((function() {
        return l._onBlur && l._onBlur.apply(l, arguments)
      })),
      h: u.background,
      i: u.color,
      j: a.inputValue,
      k: t.o((function(t) {
        return a.inputValue = t.detail.value
      })),
      l: a.inputValue >= u.max || u.disabled ? 1 : "",
      m: u.color,
      n: t.o((function(t) {
        return l._calcValue("plus")
      })),
      o: u.background
    }
  }],
  ["__scopeId", "data-v-6afca881"],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue"]
]);
wx.createComponent(i);