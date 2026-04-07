var r = require("../../../../@babel/runtime/helpers/typeof"),
  e = function(r) {
    var e = r.replace("_formdata_#", "");
    return e = e.split("#").map((function(r) {
      return o(r) ? Number(r) : r
    }))
  },
  t = function(e, t, u) {
    return "object" !== r(e) || n(t).reduce((function(r, e, t, n) {
      return t === n.length - 1 ? (r[e] = u, null) : (e in r || (r[e] = /^[0-9]{1,}$/.test(n[t + 1]) ? [] : {}), r[e])
    }), e), e
  };

function n(r) {
  return Array.isArray(r) ? r : r.replace(/\[/g, ".").replace(/\]/g, "").split(".")
}
var u = function(r, e) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "undefined",
      u = n(e),
      o = u.reduce((function(r, e) {
        return (r || {})[e]
      }), r);
    return o && void 0 === o ? t : o
  },
  o = function(r) {
    return !isNaN(Number(r))
  },
  a = function(r) {
    return "boolean" == typeof r
  };
exports.deepCopy = function(r) {
  return JSON.parse(JSON.stringify(r))
}, exports.getDataValue = function(r, e) {
  return u(e, r)
}, exports.getValue = function(r, e, t) {
  var n = t.find((function(r) {
      return r.format && ("int" === (e = r.format) || "double" === e || "number" === e || "timestamp" === e);
      var e
    })),
    u = t.find((function(r) {
      return r.format && "boolean" === r.format || "bool" === r.format
    }));
  return n && (e = e || 0 === e ? o(Number(e)) ? Number(e) : e : null), u && (e = !!a(e) && e), e
}, exports.isEqual = function(r, e) {
  if (r === e) return 0 !== r || 1 / r == 1 / e;
  if (null == r || null == e) return r === e;
  var t = toString.call(r);
  if (t !== toString.call(e)) return !1;
  switch (t) {
    case "[object RegExp]":
    case "[object String]":
      return "" + r == "" + e;
    case "[object Number]":
      return +r != +r ? +e != +e : 0 == +r ? 1 / +r == 1 / e : +r == +e;
    case "[object Date]":
    case "[object Boolean]":
      return +r == +e
  }
  if ("[object Object]" == t) {
    var n = Object.getOwnPropertyNames(r),
      u = Object.getOwnPropertyNames(e);
    if (n.length != u.length) return !1;
    for (var o = 0; o < n.length; o++) {
      var a = n[o];
      if (r[a] !== e[a]) return !1
    }
    return !0
  }
  return "[object Array]" == t ? r.toString() == e.toString() : void 0
}, exports.isRealName = function(r) {
  return /^_formdata_#*/.test(r)
}, exports.isRequiredField = function(r) {
  for (var e = !1, t = 0; t < r.length; t++) {
    if (r[t].required) {
      e = !0;
      break
    }
  }
  return e
}, exports.rawData = function() {
  var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    n = JSON.parse(JSON.stringify(r)),
    u = {};
  for (var o in n) {
    var a = e(o);
    t(u, a, n[o])
  }
  return u
}, exports.realName = function(e) {
  var t = n(e);
  if ("object" === r(t) && Array.isArray(t) && t.length > 1) {
    var u = t.reduce((function(r, e) {
      return r + "#".concat(e)
    }), "_formdata_");
    return u
  }
  return t[0] || e
}, exports.setDataValue = function(r, e, t) {
  return e[r] = t, t || ""
};