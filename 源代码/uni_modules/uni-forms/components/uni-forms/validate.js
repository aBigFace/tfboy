var e = require("../../../../@babel/runtime/helpers/possibleConstructorReturn"),
  r = require("../../../../@babel/runtime/helpers/getPrototypeOf"),
  t = require("../../../../@babel/runtime/helpers/inherits"),
  n = require("../../../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../../../@babel/runtime/helpers/asyncToGenerator"),
  u = require("../../../../@babel/runtime/helpers/classCallCheck"),
  i = require("../../../../@babel/runtime/helpers/createClass"),
  s = require("../../../../@babel/runtime/helpers/typeof");
var l = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i")
  },
  c = {
    int: "integer",
    bool: "boolean",
    double: "number",
    long: "number",
    password: "string"
  };

function o(e) {
  var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
    t = ["label"];
  t.forEach((function(r) {
    void 0 === e[r] && (e[r] = "")
  }));
  var n = r;
  for (var a in e) {
    var u = new RegExp("{" + a + "}");
    n = n.replace(u, e[a])
  }
  return n
}
var f = {
    integer: function(e) {
      return f.number(e) && parseInt(e, 10) === e
    },
    string: function(e) {
      return "string" == typeof e
    },
    number: function(e) {
      return !isNaN(e) && "number" == typeof e
    },
    boolean: function(e) {
      return "boolean" == typeof e
    },
    float: function(e) {
      return f.number(e) && !f.integer(e)
    },
    array: function(e) {
      return Array.isArray(e)
    },
    object: function(e) {
      return "object" === s(e) && !f.array(e)
    },
    date: function(e) {
      return e instanceof Date
    },
    timestamp: function(e) {
      return !(!this.integer(e) || Math.abs(e).toString().length > 16)
    },
    file: function(e) {
      return "string" == typeof e.url
    },
    email: function(e) {
      return "string" == typeof e && !!e.match(l.email) && e.length < 255
    },
    url: function(e) {
      return "string" == typeof e && !!e.match(l.url)
    },
    pattern: function(e, r) {
      try {
        return new RegExp(e).test(r)
      } catch (e) {
        return !1
      }
    },
    method: function(e) {
      return "function" == typeof e
    },
    idcard: function(e) {
      return "string" == typeof e && !!e.match(l.idcard)
    },
    "url-https": function(e) {
      return this.url(e) && e.startsWith("https://")
    },
    "url-scheme": function(e) {
      return e.startsWith("://")
    },
    "url-web": function(e) {
      return !1
    }
  },
  m = function() {
    return i((function e(r) {
      u(this, e), this._message = r
    }), [{
      key: "validateRule",
      value: (r = a(n().mark((function e(r, t, a, u, i) {
        var s, l, c, o, f, m, p;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (s = null, !((l = t.rules).findIndex((function(e) {
                  return e.required
                })) < 0)) {
                e.next = 8;
                break
              }
              if (null != a) {
                e.next = 6;
                break
              }
              return e.abrupt("return", s);
            case 6:
              if ("string" != typeof a || a.length) {
                e.next = 8;
                break
              }
              return e.abrupt("return", s);
            case 8:
              if (c = this._message, void 0 !== l) {
                e.next = 11;
                break
              }
              return e.abrupt("return", c.default);
            case 11:
              o = 0;
            case 12:
              if (!(o < l.length)) {
                e.next = 35;
                break
              }
              if (f = l[o], m = this._getValidateType(f), Object.assign(f, {
                  label: t.label || '["'.concat(r, '"]')
                }), !h[m]) {
                e.next = 20;
                break
              }
              if (null == (s = h[m](f, a, c))) {
                e.next = 20;
                break
              }
              return e.abrupt("break", 35);
            case 20:
              if (!f.validateExpr) {
                e.next = 26;
                break
              }
              if (p = Date.now(), !1 !== f.validateExpr(a, i, p)) {
                e.next = 26;
                break
              }
              return s = this._getMessage(f, f.errorMessage || this._message.default), e.abrupt("break", 35);
            case 26:
              if (!f.validateFunction) {
                e.next = 32;
                break
              }
              return e.next = 29, this.validateFunction(f, a, u, i, m);
            case 29:
              if (null === (s = e.sent)) {
                e.next = 32;
                break
              }
              return e.abrupt("break", 35);
            case 32:
              o++, e.next = 12;
              break;
            case 35:
              return null !== s && (s = c.TAG + s), e.abrupt("return", s);
            case 37:
            case "end":
              return e.stop()
          }
        }), e, this)
      }))), function(e, t, n, a, u) {
        return r.apply(this, arguments)
      })
    }, {
      key: "validateFunction",
      value: (e = a(n().mark((function e(r, t, a, u, i) {
        var s, l, c;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return s = null, e.prev = 1, l = null, e.next = 5, r.validateFunction(r, t, u || a, (function(e) {
                l = e
              }));
            case 5:
              c = e.sent, (l || "string" == typeof c && c || !1 === c) && (s = this._getMessage(r, l || c, i)), e.next = 12;
              break;
            case 9:
              e.prev = 9, e.t0 = e.catch(1), s = this._getMessage(r, e.t0.message, i);
            case 12:
              return e.abrupt("return", s);
            case 13:
            case "end":
              return e.stop()
          }
        }), e, this, [
          [1, 9]
        ])
      }))), function(r, t, n, a, u) {
        return e.apply(this, arguments)
      })
    }, {
      key: "_getMessage",
      value: function(e, r, t) {
        return o(e, r || e.errorMessage || this._message[t] || r.default)
      }
    }, {
      key: "_getValidateType",
      value: function(e) {
        var r = "";
        return e.required ? r = "required" : e.format ? r = "format" : e.arrayType ? r = "arrayTypeFormat" : e.range ? r = "range" : void 0 !== e.maximum || void 0 !== e.minimum ? r = "rangeNumber" : void 0 !== e.maxLength || void 0 !== e.minLength ? r = "rangeLength" : e.pattern ? r = "pattern" : e.validateFunction && (r = "validateFunction"), r
      }
    }]);
    var e, r
  }(),
  h = {
    required: function(e, r, t) {
      return e.required && function(e, r) {
        return null == e || ("string" == typeof e && !e || (!(!Array.isArray(e) || e.length) || "object" === r && !Object.keys(e).length))
      }(r, e.format || s(r)) ? o(e, e.errorMessage || t.required) : null
    },
    range: function(e, r, t) {
      for (var n = e.range, a = e.errorMessage, u = new Array(n.length), i = 0; i < n.length; i++) {
        var s = n[i];
        f.object(s) && void 0 !== s.value ? u[i] = s.value : u[i] = s
      }
      var l = !1;
      return Array.isArray(r) ? l = new Set(r.concat(u)).size === u.length : u.indexOf(r) > -1 && (l = !0), l ? null : o(e, a || t.enum)
    },
    rangeNumber: function(e, r, t) {
      if (!f.number(r)) return o(e, e.errorMessage || t.pattern.mismatch);
      var n = e.minimum,
        a = e.maximum,
        u = e.exclusiveMinimum,
        i = e.exclusiveMaximum,
        s = u ? r <= n : r < n,
        l = i ? r >= a : r > a;
      return void 0 !== n && s ? o(e, e.errorMessage || t.number[u ? "exclusiveMinimum" : "minimum"]) : void 0 !== a && l ? o(e, e.errorMessage || t.number[i ? "exclusiveMaximum" : "maximum"]) : void 0 !== n && void 0 !== a && (s || l) ? o(e, e.errorMessage || t.number.range) : null
    },
    rangeLength: function(e, r, t) {
      if (!f.string(r) && !f.array(r)) return o(e, e.errorMessage || t.pattern.mismatch);
      var n = e.minLength,
        a = e.maxLength,
        u = r.length;
      return void 0 !== n && u < n ? o(e, e.errorMessage || t.length.minLength) : void 0 !== a && u > a ? o(e, e.errorMessage || t.length.maxLength) : void 0 !== n && void 0 !== a && (u < n || u > a) ? o(e, e.errorMessage || t.length.range) : null
    },
    pattern: function(e, r, t) {
      return f.pattern(e.pattern, r) ? null : o(e, e.errorMessage || t.pattern.mismatch)
    },
    format: function(e, r, t) {
      var n = Object.keys(f),
        a = c[e.format] ? c[e.format] : e.format || e.arrayType;
      return n.indexOf(a) > -1 && !f[a](r) ? o(e, e.errorMessage || t.typeError) : null
    },
    arrayTypeFormat: function(e, r, t) {
      if (!Array.isArray(r)) return o(e, e.errorMessage || t.typeError);
      for (var n = 0; n < r.length; n++) {
        var a = r[n],
          u = this.format(e, a, t);
        if (null !== u) return u
      }
      return null
    }
  },
  p = function(s) {
    function l(t, n) {
      var a, i, s, c;
      return u(this, l), i = this, s = l, c = [l.message], s = r(s), (a = e(i, function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
        } catch (e) {
          return !1
        }
      }() ? Reflect.construct(s, c || [], r(i).constructor) : s.apply(i, c)))._schema = t, a._options = n || null, a
    }
    return t(l, m), i(l, [{
      key: "updateSchema",
      value: function(e) {
        this._schema = e
      }
    }, {
      key: "validate",
      value: (b = a(n().mark((function e(r, t) {
        var a;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (a = this._checkFieldInSchema(r)) {
                e.next = 5;
                break
              }
              return e.next = 4, this.invokeValidate(r, !1, t);
            case 4:
              a = e.sent;
            case 5:
              return e.abrupt("return", a.length ? a[0] : null);
            case 6:
            case "end":
              return e.stop()
          }
        }), e, this)
      }))), function(e, r) {
        return b.apply(this, arguments)
      })
    }, {
      key: "validateAll",
      value: (p = a(n().mark((function e(r, t) {
        var a;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (a = this._checkFieldInSchema(r)) {
                e.next = 5;
                break
              }
              return e.next = 4, this.invokeValidate(r, !0, t);
            case 4:
              a = e.sent;
            case 5:
              return e.abrupt("return", a);
            case 6:
            case "end":
              return e.stop()
          }
        }), e, this)
      }))), function(e, r) {
        return p.apply(this, arguments)
      })
    }, {
      key: "validateUpdate",
      value: (h = a(n().mark((function e(r, t) {
        var a;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (a = this._checkFieldInSchema(r)) {
                e.next = 5;
                break
              }
              return e.next = 4, this.invokeValidateUpdate(r, !1, t);
            case 4:
              a = e.sent;
            case 5:
              return e.abrupt("return", a.length ? a[0] : null);
            case 6:
            case "end":
              return e.stop()
          }
        }), e, this)
      }))), function(e, r) {
        return h.apply(this, arguments)
      })
    }, {
      key: "invokeValidate",
      value: (f = a(n().mark((function e(r, t, a) {
        var u, i, s, l, c;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              u = [], i = this._schema, e.t0 = n().keys(i);
            case 3:
              if ((e.t1 = e.t0()).done) {
                e.next = 15;
                break
              }
              return s = e.t1.value, l = i[s], e.next = 8, this.validateRule(s, l, r[s], r, a);
            case 8:
              if (null == (c = e.sent)) {
                e.next = 13;
                break
              }
              if (u.push({
                  key: s,
                  errorMessage: c
                }), t) {
                e.next = 13;
                break
              }
              return e.abrupt("break", 15);
            case 13:
              e.next = 3;
              break;
            case 15:
              return e.abrupt("return", u);
            case 16:
            case "end":
              return e.stop()
          }
        }), e, this)
      }))), function(e, r, t) {
        return f.apply(this, arguments)
      })
    }, {
      key: "invokeValidateUpdate",
      value: (c = a(n().mark((function e(r, t, a) {
        var u, i, s;
        return n().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              u = [], e.t0 = n().keys(r);
            case 2:
              if ((e.t1 = e.t0()).done) {
                e.next = 13;
                break
              }
              return i = e.t1.value, e.next = 6, this.validateRule(i, this._schema[i], r[i], r, a);
            case 6:
              if (null == (s = e.sent)) {
                e.next = 11;
                break
              }
              if (u.push({
                  key: i,
                  errorMessage: s
                }), t) {
                e.next = 11;
                break
              }
              return e.abrupt("break", 13);
            case 11:
              e.next = 2;
              break;
            case 13:
              return e.abrupt("return", u);
            case 14:
            case "end":
              return e.stop()
          }
        }), e, this)
      }))), function(e, r, t) {
        return c.apply(this, arguments)
      })
    }, {
      key: "_checkFieldInSchema",
      value: function(e) {
        var r = Object.keys(e),
          t = Object.keys(this._schema);
        if (new Set(r.concat(t)).size === t.length) return "";
        var n = r.filter((function(e) {
          return t.indexOf(e) < 0
        }));
        return [{
          key: "invalid",
          errorMessage: o({
            field: JSON.stringify(n)
          }, l.message.TAG + l.message.defaultInvalid)
        }]
      }
    }]);
    var c, f, h, p, b
  }();
p.message = new function() {
  return {
    TAG: "",
    default: "验证错误",
    defaultInvalid: "提交的字段{field}在数据库中并不存在",
    validateFunction: "验证无效",
    required: "{label}必填",
    enum: "{label}超出范围",
    timestamp: "{label}格式无效",
    whitespace: "{label}不能为空",
    typeError: "{label}类型无效",
    date: {
      format: "{label}日期{value}格式无效",
      parse: "{label}日期无法解析,{value}无效",
      invalid: "{label}日期{value}无效"
    },
    length: {
      minLength: "{label}长度不能少于{minLength}",
      maxLength: "{label}长度不能超过{maxLength}",
      range: "{label}必须介于{minLength}和{maxLength}之间"
    },
    number: {
      minimum: "{label}不能小于{minimum}",
      maximum: "{label}不能大于{maximum}",
      exclusiveMinimum: "{label}不能小于等于{minimum}",
      exclusiveMaximum: "{label}不能大于等于{maximum}",
      range: "{label}必须介于{minimum}and{maximum}之间"
    },
    pattern: {
      mismatch: "{label}格式不匹配"
    }
  }
}, exports.SchemaValidator = p;