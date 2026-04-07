var e = require("../../../../@babel/runtime/helpers/typeof"),
  t = require("../../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../../@babel/runtime/helpers/defineProperty"),
  i = require("../../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../../common/vendor.js"),
  s = {
    name: "uniFormsItem",
    options: {
      virtualHost: !0
    },
    provide: function() {
      return {
        uniFormItem: this
      }
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      rules: {
        type: Array,
        default: function() {
          return null
        }
      },
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: !1
      },
      label: {
        type: String,
        default: ""
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: ""
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data: function() {
      return {
        errMsg: "",
        isRequired: !1,
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "65px",
        localLabelPos: "left",
        border: !1,
        isFirstBorder: !1
      }
    },
    computed: {
      msg: function() {
        return this.errorMessage || this.errMsg
      }
    },
    watch: {
      "form.formRules": function(e) {
        this.init()
      },
      "form.labelWidth": function(e) {
        this.localLabelWidth = this._labelWidthUnit(e)
      },
      "form.labelPosition": function(e) {
        this.localLabelPos = this._labelPosition()
      },
      "form.labelAlign": function(e) {}
    },
    created: function() {
      var e = this;
      console.log(this.name), this.init(!0), this.name && this.form && this.$watch((function() {
        return e.form._getDataValue(e.name, e.form.localData)
      }), (function(t, r) {
        if (!e.form._isEqual(t, r) && void 0 !== r) {
          var i = e.itemSetValue(t);
          e.onFieldChange(i, !1)
        }
      }), {
        immediate: !1
      })
    },
    unmounted: function() {
      this.__isUnmounted = !0, this.unInit()
    },
    methods: {
      setRules: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        this.userRules = e, this.init(!1)
      },
      setValue: function() {
        console.log("setValue 方法已经弃用，请使用最新版本的 uni-forms 表单组件以及其他关联组件。")
      },
      onFieldChange: function(e) {
        var s = arguments,
          l = this;
        return i(t().mark((function i() {
          var a, o, u, h, f, m, d, c, b, g, p, v;
          return t().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (a = !(s.length > 1 && void 0 !== s[1]) || s[1], o = l.form, u = o.formData, o.localData, h = o.errShowType, f = o.validateCheck, m = o.validateTrigger, d = o._isRequiredField, c = o._realName, b = c(l.name), e || (e = l.form.formData[b]), g = l.itemRules.rules && l.itemRules.rules.length, l.validator && g && 0 !== g) {
                  t.next = 7;
                  break
                }
                return t.abrupt("return");
              case 7:
                if (p = d(l.itemRules.rules || []), v = null, "bind" !== m && !a) {
                  t.next = 18;
                  break
                }
                return t.next = 12, l.validator.validateUpdate(r({}, b, e), u);
              case 12:
                v = t.sent, p || void 0 !== e && "" !== e || (v = null), v && v.errorMessage ? ("undertext" === h && (l.errMsg = v ? v.errorMessage : ""), "toast" === h && n.index.showToast({
                  title: v.errorMessage || "校验错误",
                  icon: "none"
                }), "modal" === h && n.index.showModal({
                  title: "提示",
                  content: v.errorMessage || "校验错误"
                })) : l.errMsg = "", f(v || null), t.next = 19;
                break;
              case 18:
                l.errMsg = "";
              case 19:
                return t.abrupt("return", v || null);
              case 20:
              case "end":
                return t.stop()
            }
          }), i)
        })))()
      },
      init: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          r = this.form || {},
          i = r.validator,
          n = r.formRules,
          s = r.childrens,
          l = (r.formData, r.localData),
          a = r._realName,
          o = r.labelWidth,
          u = r._getDataValue;
        r._setDataValue;
        if (this.localLabelAlign = this._justifyContent(), this.localLabelWidth = this._labelWidthUnit(o), this.localLabelPos = this._labelPosition(), this.isRequired = this.required, this.form && t && s.push(this), i && n) {
          this.form.isFirstBorder || (this.form.isFirstBorder = !0, this.isFirstBorder = !0), this.group && (this.group.isFirstBorder || (this.group.isFirstBorder = !0, this.isFirstBorder = !0)), this.border = this.form.border;
          var h = a(this.name),
            f = this.userRules || this.rules;
          "object" === e(n) && f && (n[h] = {
            rules: f
          }, i.updateSchema(n));
          var m = n[h] || {};
          this.itemRules = m, this.validator = i, this.itemSetValue(u(this.name, l)), this.isRequired = this._isRequired()
        }
      },
      unInit: function() {
        var e = this;
        if (this.form) {
          var t = this.form,
            r = t.childrens,
            i = t.formData,
            n = t._realName;
          r.forEach((function(t, r) {
            t === e && (e.form.childrens.splice(r, 1), delete i[n(t.name)])
          }))
        }
      },
      itemSetValue: function(e) {
        var t = this.form._realName(this.name),
          r = this.itemRules.rules || [],
          i = this.form._getValue(t, e, r);
        return this.form._setDataValue(t, this.form.formData, i), i
      },
      clearValidate: function() {
        this.errMsg = ""
      },
      _isRequired: function() {
        return this.form ? this.required || this.form._isRequiredField(this.itemRules.rules || []) : this.required
      },
      _justifyContent: function() {
        if (this.form) {
          var e = this.form.labelAlign,
            t = this.labelAlign ? this.labelAlign : e;
          if ("left" === t) return "flex-start";
          if ("center" === t) return "center";
          if ("right" === t) return "flex-end"
        }
        return "flex-start"
      },
      _labelWidthUnit: function(e) {
        return this.num2px(this.labelWidth ? this.labelWidth : e || (this.label ? 65 : "auto"))
      },
      _labelPosition: function() {
        return this.form && this.form.labelPosition || "left"
      },
      isTrigger: function(e, t, r) {
        return "submit" !== e && e ? "bind" : void 0 === e ? "bind" !== t ? t ? "submit" : "" === r ? "bind" : "submit" : "bind" : "submit"
      },
      num2px: function(e) {
        return "number" == typeof e ? "".concat(e, "px") : e
      }
    }
  };
var l = n._export_sfc(s, [
  ["render", function(e, t, r, i, s, l) {
    return n.e({
      a: r.label
    }, r.label ? n.e({
      b: s.isRequired
    }, (s.isRequired, {}), {
      c: n.t(r.label),
      d: r.label || s.isRequired ? "" : 1,
      e: s.localLabelWidth,
      f: s.localLabelAlign
    }) : {}, {
      g: n.t(l.msg),
      h: l.msg ? 1 : "",
      i: n.n("is-direction-" + s.localLabelPos),
      j: n.n(s.border ? "uni-forms-item--border" : ""),
      k: n.n(s.border && s.isFirstBorder ? "is-first-border" : "")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]
]);
wx.createComponent(l);