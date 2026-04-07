var e = require("../../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../../@babel/runtime/helpers/defineProperty"),
  a = require("./validate.js"),
  n = require("./utils.js"),
  i = require("../../../../common/vendor.js"),
  u = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: !0
    },
    props: {
      value: {
        type: Object,
        default: function() {
          return null
        }
      },
      modelValue: {
        type: Object,
        default: function() {
          return null
        }
      },
      model: {
        type: Object,
        default: function() {
          return null
        }
      },
      rules: {
        type: Object,
        default: function() {
          return {}
        }
      },
      errShowType: {
        type: String,
        default: "undertext"
      },
      validateTrigger: {
        type: String,
        default: "submit"
      },
      labelPosition: {
        type: String,
        default: "left"
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: !1
      }
    },
    provide: function() {
      return {
        uniForm: this
      }
    },
    data: function() {
      return {
        formData: {},
        formRules: {}
      }
    },
    computed: {
      localData: function() {
        var e = this.model || this.modelValue || this.value;
        return e ? n.deepCopy(e) : {}
      }
    },
    watch: {
      rules: {
        handler: function(e, t) {
          this.setRules(e)
        },
        deep: !0,
        immediate: !0
      }
    },
    created: function() {
      getApp().$vm.$.appContext.config.globalProperties.binddata || (getApp().$vm.$.appContext.config.globalProperties.binddata = function(e, t, r) {
        if (r) this.$refs[r].setValue(e, t);
        else {
          var a;
          for (var n in this.$refs) {
            var i = this.$refs[n];
            if (i && i.$options && "uniForms" === i.$options.name) {
              a = i;
              break
            }
          }
          if (!a) return console.error("当前 uni-froms 组件缺少 ref 属性");
          a.setValue(e, t)
        }
      }), this.childrens = [], this.inputChildrens = [], this.setRules(this.rules)
    },
    methods: {
      setRules: function(e) {
        this.formRules = Object.assign({}, this.formRules, e), this.validator = new a.SchemaValidator(e)
      },
      setValue: function(e, t) {
        var r = this.childrens.find((function(t) {
          return t.name === e
        }));
        return r ? (this.formData[e] = n.getValue(e, t, this.formRules[e] && this.formRules[e].rules || []), r.onFieldChange(this.formData[e])) : null
      },
      validate: function(e, t) {
        return this.checkAll(this.formData, e, t)
      },
      validateField: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          a = arguments.length > 1 ? arguments[1] : void 0;
        t = [].concat(t);
        var i = {};
        return this.childrens.forEach((function(a) {
          var u = n.realName(a.name); - 1 !== t.indexOf(u) && (i = Object.assign({}, i, r({}, u, e.formData[u])))
        })), this.checkAll(i, [], a)
      },
      clearValidate: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        e = [].concat(e), this.childrens.forEach((function(t) {
          if (0 === e.length) t.errMsg = "";
          else {
            var r = n.realName(t.name); - 1 !== e.indexOf(r) && (t.errMsg = "")
          }
        }))
      },
      submit: function(e, t, r) {
        var a = this,
          n = function(e) {
            a.childrens.find((function(t) {
              return t.name === e
            })) && void 0 === a.formData[e] && (a.formData[e] = a._getValue(e, a.dataValue[e]))
          };
        for (var i in this.dataValue) n(i);
        return r || console.warn("submit 方法即将废弃，请使用validate方法代替！"), this.checkAll(this.formData, e, t, "submit")
      },
      checkAll: function(r, a, i, u) {
        var s = this;
        return t(e().mark((function t() {
          var l, o, c, f, d, m, h, p, v, b, g;
          return e().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (s.validator) {
                  t.next = 2;
                  break
                }
                return t.abrupt("return");
              case 2:
                l = [], o = e().mark((function t(r) {
                  var a;
                  return e().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        (a = s.childrens.find((function(e) {
                          return n.realName(e.name) === r
                        }))) && l.push(a);
                      case 2:
                      case "end":
                        return e.stop()
                    }
                  }), t)
                })), t.t0 = e().keys(r);
              case 5:
                if ((t.t1 = t.t0()).done) {
                  t.next = 10;
                  break
                }
                return c = t.t1.value, t.delegateYield(o(c), "t2", 8);
              case 8:
                t.next = 5;
                break;
              case 10:
                i || "function" != typeof a || (i = a), !i && "function" != typeof i && Promise && (f = new Promise((function(e, t) {
                  i = function(r, a) {
                    r ? t(r) : e(a)
                  }
                }))), d = [], m = JSON.parse(JSON.stringify(r)), t.t3 = e().keys(l);
              case 15:
                if ((t.t4 = t.t3()).done) {
                  t.next = 28;
                  break
                }
                return h = t.t4.value, p = l[h], v = n.realName(p.name), t.next = 21, p.onFieldChange(m[v]);
              case 21:
                if (!(b = t.sent)) {
                  t.next = 26;
                  break
                }
                if (d.push(b), "toast" !== s.errShowType && "modal" !== s.errShowType) {
                  t.next = 26;
                  break
                }
                return t.abrupt("break", 28);
              case 26:
                t.next = 15;
                break;
              case 28:
                if (Array.isArray(d) && 0 === d.length && (d = null), Array.isArray(a) && a.forEach((function(e) {
                    var t = n.realName(e),
                      r = n.getDataValue(e, s.localData);
                    void 0 !== r && (m[t] = r)
                  })), "submit" === u ? s.$emit("submit", {
                    detail: {
                      value: m,
                      errors: d
                    }
                  }) : s.$emit("validate", d), {}, g = n.rawData(m, s.name), i && "function" == typeof i && i(d, g), !f || !i) {
                  t.next = 38;
                  break
                }
                return t.abrupt("return", f);
              case 38:
                return t.abrupt("return", null);
              case 39:
              case "end":
                return t.stop()
            }
          }), t)
        })))()
      },
      validateCheck: function(e) {
        this.$emit("validate", e)
      },
      _getValue: n.getValue,
      _isRequiredField: n.isRequiredField,
      _setDataValue: n.setDataValue,
      _getDataValue: n.getDataValue,
      _realName: n.realName,
      _isRealName: n.isRealName,
      _isEqual: n.isEqual
    }
  };
var s = i._export_sfc(u, [
  ["render", function(e, t, r, a, n, i) {
    return {}
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]
]);
wx.createComponent(s);