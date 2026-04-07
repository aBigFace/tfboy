var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../@babel/runtime/helpers/asyncToGenerator");
require("../@babel/runtime/helpers/Arrayincludes");
var n, r = require("../@babel/runtime/helpers/objectSpread2"),
  i = require("../@babel/runtime/helpers/assertThisInitialized"),
  o = require("../@babel/runtime/helpers/possibleConstructorReturn"),
  s = require("../@babel/runtime/helpers/getPrototypeOf"),
  a = require("../@babel/runtime/helpers/inherits"),
  u = require("../@babel/runtime/helpers/wrapNativeSuper"),
  c = require("../@babel/runtime/helpers/classCallCheck"),
  f = require("../@babel/runtime/helpers/createClass"),
  h = require("../@babel/runtime/helpers/typeof"),
  l = require("../@babel/runtime/helpers/defineProperty"),
  p = require("../@babel/runtime/helpers/toConsumableArray"),
  d = require("../@babel/runtime/helpers/slicedToArray"),
  v = require("../@babel/runtime/helpers/createForOfIteratorHelper");

function g(e, t, n) {
  return t = s(t), o(e, function() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {})))
    } catch (e) {
      return !1
    }
  }() ? Reflect.construct(t, n || [], s(e).constructor) : t.apply(e, n))
}

function m(e, t) {
  for (var n = Object.create(null), r = e.split(","), i = 0; i < r.length; i++) n[r[i]] = !0;
  return t ? function(e) {
    return !!n[e.toLowerCase()]
  } : function(e) {
    return !!n[e]
  }
}
var y = /;(?![^(]*\))/g,
  b = /:(.+)/;

function w(e) {
  var t = {};
  return e.split(y).forEach((function(e) {
    if (e) {
      var n = e.split(b);
      n.length > 1 && (t[n[0].trim()] = n[1].trim())
    }
  })), t
}
var _ = function e(t, n) {
    return n && n.__v_isRef ? e(t, n.value) : $(n) ? l({}, "Map(".concat(n.size, ")"), p(n.entries()).reduce((function(e, t) {
      var n = d(t, 2),
        r = n[0],
        i = n[1];
      return e["".concat(r, " =>")] = i, e
    }), {})) : j(n) ? l({}, "Set(".concat(n.size, ")"), p(n.values())) : !L(n) || R(n) || H(n) ? n : String(n)
  },
  k = Object.freeze({}),
  S = Object.freeze([]),
  x = function() {},
  T = function() {
    return !1
  },
  E = /^on[^a-z]/,
  O = function(e) {
    return E.test(e)
  },
  A = function(e) {
    return e.startsWith("onUpdate:")
  },
  P = Object.assign,
  I = function(e, t) {
    var n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
  },
  D = Object.prototype.hasOwnProperty,
  C = function(e, t) {
    return D.call(e, t)
  },
  R = Array.isArray,
  $ = function(e) {
    return "[object Map]" === V(e)
  },
  j = function(e) {
    return "[object Set]" === V(e)
  },
  M = function(e) {
    return "function" == typeof e
  },
  N = function(e) {
    return "string" == typeof e
  },
  U = function(e) {
    return "symbol" === h(e)
  },
  L = function(e) {
    return null !== e && "object" === h(e)
  },
  B = function(e) {
    return L(e) && M(e.then) && M(e.catch)
  },
  q = Object.prototype.toString,
  V = function(e) {
    return q.call(e)
  },
  F = function(e) {
    return V(e).slice(8, -1)
  },
  H = function(e) {
    return "[object Object]" === V(e)
  },
  K = function(e) {
    return N(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e
  },
  z = m(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
  W = m("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),
  G = function(e) {
    var t = Object.create(null);
    return function(n) {
      return t[n] || (t[n] = e(n))
    }
  },
  J = /-(\w)/g,
  Y = G((function(e) {
    return e.replace(J, (function(e, t) {
      return t ? t.toUpperCase() : ""
    }))
  })),
  Z = /\B([A-Z])/g,
  X = G((function(e) {
    return e.replace(Z, "-$1").toLowerCase()
  })),
  Q = G((function(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
  })),
  ee = G((function(e) {
    return e ? "on".concat(Q(e)) : ""
  })),
  te = function(e, t) {
    return !Object.is(e, t)
  },
  ne = function(e, t) {
    for (var n = 0; n < e.length; n++) e[n](t)
  },
  re = function(e) {
    var t = parseFloat(e);
    return isNaN(t) ? e : t
  },
  ie = /:/g;

function oe(e) {
  return Y(e.replace(ie, "-"))
}

function se(e) {
  var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
  return function() {
    if (e) {
      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
      t = e.apply(n, i), e = null
    }
    return t
  }
}
var ae = encodeURIComponent;

function ue(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ae,
    n = e ? Object.keys(e).map((function(n) {
      var r = e[n];
      return void 0 === h(r) || null === r ? r = "" : H(r) && (r = JSON.stringify(r)), t(n) + "=" + t(r)
    })).filter((function(e) {
      return e.length > 0
    })).join("&") : null;
  return n ? "?".concat(n) : ""
}
var ce = ["onInit", "onLoad", "onShow", "onHide", "onUnload", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onShareAppMessage", "onAddToFavorites", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"];

function fe(e) {
  return ce.indexOf(e) > -1
}
var he, le = ["onShow", "onHide", "onLaunch", "onError", "onThemeChange", "onPageNotFound", "onUnhandledRejection", "onInit", "onLoad", "onReady", "onUnload", "onResize", "onBackPress", "onPageScroll", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onShareTimeline", "onAddToFavorites", "onShareAppMessage", "onSaveExitState", "onNavigationBarButtonTap", "onNavigationBarSearchInputClicked", "onNavigationBarSearchInputChanged", "onNavigationBarSearchInputConfirmed", "onNavigationBarSearchInputFocusChanged"],
  pe = function() {
    return {
      onPageScroll: 1,
      onShareAppMessage: 2,
      onShareTimeline: 4
    }
  }(),
  de = [];
var ve = function() {};
ve.prototype = {
  on: function(e, t, n) {
    var r = this.e || (this.e = {});
    return (r[e] || (r[e] = [])).push({
      fn: t,
      ctx: n
    }), this
  },
  once: function(e, t, n) {
    var r = this;

    function i() {
      r.off(e, i), t.apply(n, arguments)
    }
    return i._ = t, this.on(e, i, n)
  },
  emit: function(e) {
    for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), r = 0, i = n.length; r < i; r++) n[r].fn.apply(n[r].ctx, t);
    return this
  },
  off: function(e, t) {
    var n = this.e || (this.e = {}),
      r = n[e],
      i = [];
    if (r && t)
      for (var o = 0, s = r.length; o < s; o++) r[o].fn !== t && r[o].fn._ !== t && i.push(r[o]);
    return i.length ? n[e] = i : delete n[e], this
  }
};
var ge = ve;

function me(e, t) {
  console.warn("".concat(e, ": ").concat(t))
}

function ye(e, t, n, r) {
  for (var i in r || (r = me), n) {
    var o = be(i, t[i], n[i], !C(t, i));
    N(o) && r(e, o)
  }
}

function be(e, t, n, r) {
  H(n) || (n = {
    type: n
  });
  var i = n,
    o = i.type,
    s = i.required,
    a = i.validator;
  if (s && r) return 'Missing required args: "' + e + '"';
  if (null != t || s) {
    if (null != o) {
      for (var u = !1, c = R(o) ? o : [o], f = [], h = 0; h < c.length && !u; h++) {
        var l = _e(t, c[h]),
          p = l.valid,
          d = l.expectedType;
        f.push(d || ""), u = p
      }
      if (!u) return function(e, t, n) {
        var r = 'Invalid args: type check failed for args "'.concat(e, '". Expected ').concat(n.map(Q).join(", ")),
          i = n[0],
          o = F(t),
          s = ke(t, i),
          a = ke(t, o);
        1 === n.length && Se(i) && ! function() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          return t.some((function(e) {
            return "boolean" === e.toLowerCase()
          }))
        }(i, o) && (r += " with value ".concat(s));
        r += ", got ".concat(o, " "), Se(o) && (r += "with value ".concat(a, "."));
        return r
      }(e, t, f)
    }
    return a ? a(t) : void 0
  }
}
var we = m("String,Number,Boolean,Function,Symbol");

function _e(e, t) {
  var n, r, i, o = (i = (r = t) && r.toString().match(/^\s*function (\w+)/)) ? i[1] : "";
  if (we(o)) {
    var s = h(e);
    (n = s === o.toLowerCase()) || "object" !== s || (n = e instanceof t)
  } else n = "Object" === o ? L(e) : "Array" === o ? R(e) : e instanceof t;
  return {
    valid: n,
    expectedType: o
  }
}

function ke(e, t) {
  return "String" === t ? '"'.concat(e, '"') : "".concat("Number" === t ? Number(e) : e)
}

function Se(e) {
  return ["string", "number", "boolean"].some((function(t) {
    return e.toLowerCase() === t
  }))
}

function xe(e) {
  return function() {
    try {
      return e.apply(e, arguments)
    } catch (e) {
      console.error(e)
    }
  }
}
var Te = "success",
  Ee = "fail",
  Oe = "complete",
  Ae = {},
  Pe = {};

function Ie(e) {
  return function(t) {
    return e(t) || t
  }
}

function De(e, t) {
  for (var n = !1, r = 0; r < e.length; r++) {
    var i = e[r];
    if (n) n = Promise.resolve(Ie(i));
    else {
      var o = i(t);
      if (B(o) && (n = Promise.resolve(o)), !1 === o) return {
        then: function() {},
        catch: function() {}
      }
    }
  }
  return n || {
    then: function(e) {
      return e(t)
    },
    catch: function() {}
  }
}

function Ce(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return [Te, Ee, Oe].forEach((function(n) {
    var r = e[n];
    if (R(r)) {
      var i = t[n];
      t[n] = function(e) {
        De(r, e).then((function(e) {
          return M(i) && i(e) || e
        }))
      }
    }
  })), t
}

function Re(e, t) {
  var n = [];
  R(Ae.returnValue) && n.push.apply(n, p(Ae.returnValue));
  var r = Pe[e];
  return r && R(r.returnValue) && n.push.apply(n, p(r.returnValue)), n.forEach((function(e) {
    t = e(t) || t
  })), t
}

function $e(e, t, n, r) {
  var i = function(e) {
    var t = Object.create(null);
    Object.keys(Ae).forEach((function(e) {
      "returnValue" !== e && (t[e] = Ae[e].slice())
    }));
    var n = Pe[e];
    return n && Object.keys(n).forEach((function(e) {
      "returnValue" !== e && (t[e] = (t[e] || []).concat(n[e]))
    })), t
  }(e);
  return i && Object.keys(i).length ? R(i.invoke) ? De(i.invoke, n).then((function(e) {
    return t.apply(void 0, [Ce(i, e)].concat(p(r)))
  })) : t.apply(void 0, [Ce(i, n)].concat(p(r))) : t.apply(void 0, [n].concat(p(r)))
}

function je(e, t, n, r) {
  if (function(e, t, n, r) {
      if (n) {
        if (!R(n)) return ye(e, t[0] || Object.create(null), n, r);
        for (var i = n.length, o = t.length, s = 0; s < i; s++) {
          var a = n[s],
            u = Object.create(null);
          o > s && (u[a.name] = t[s]), ye(e, u, l({}, a.name, a), r)
        }
      }
    }(e, t, n), r && r.beforeInvoke) {
    var i = r.beforeInvoke(t);
    if (N(i)) return i
  }
  var o = function(e, t) {
    var n = e[0];
    if (t && (H(t.formatArgs) || !H(n)))
      for (var r = t.formatArgs, i = Object.keys(r), o = 0; o < i.length; o++) {
        var s = i[o],
          a = r[s];
        if (M(a)) {
          var u = a(e[0][s], n);
          if (N(u)) return u
        } else C(n, s) || (n[s] = a)
      }
  }(t, r);
  if (o) return o
}

function Me(e, t, n, r) {
  return function(e, t, n, r) {
    return function() {
      for (var i = arguments.length, o = new Array(i), s = 0; s < i; s++) o[s] = arguments[s];
      var a = je(e, o, n, r);
      if (a) throw new Error(a);
      return t.apply(null, o)
    }
  }(e, t, n, r)
}
var Ne = !1,
  Ue = 0,
  Le = 0;

function Be() {
  var e = wx.getSystemInfoSync(),
    t = e.platform,
    n = e.pixelRatio,
    r = e.windowWidth;
  Ue = r, Le = n, Ne = "ios" === t
}
var qe = Me("upx2px", (function(e, t) {
    if (0 === Ue && Be(), 0 === (e = Number(e))) return 0;
    var n = e / 750 * (t || Ue);
    return n < 0 && (n = -n), 0 === (n = Math.floor(n + 1e-4)) && (n = 1 !== Le && Ne ? .5 : 1), e < 0 ? -n : n
  }), [{
    name: "upx",
    type: [Number, String],
    required: !0
  }]),
  Ve = [{
    name: "method",
    type: [String, Object],
    required: !0
  }],
  Fe = Ve;

function He(e, t) {
  Object.keys(t).forEach((function(n) {
    var r, i, o;
    M(t[n]) && (e[n] = (r = e[n], i = t[n], (o = i ? r ? r.concat(i) : R(i) ? i : [i] : r) ? function(e) {
      for (var t = [], n = 0; n < e.length; n++) - 1 === t.indexOf(e[n]) && t.push(e[n]);
      return t
    }(o) : o))
  }))
}

function Ke(e, t) {
  e && t && Object.keys(t).forEach((function(n) {
    var r = e[n],
      i = t[n];
    R(r) && M(i) && I(r, i)
  }))
}
var ze, We, Ge = Me("addInterceptor", (function(e, t) {
    "string" == typeof e && H(t) ? He(Pe[e] || (Pe[e] = {}), t) : H(e) && He(Ae, e)
  }), Ve),
  Je = Me("removeInterceptor", (function(e, t) {
    "string" == typeof e ? H(t) ? Ke(Pe[e], t) : delete Pe[e] : H(e) && Ke(Ae, e)
  }), Fe),
  Ye = [{
    name: "event",
    type: String,
    required: !0
  }, {
    name: "callback",
    type: Function,
    required: !0
  }],
  Ze = Ye,
  Xe = [{
    name: "event",
    type: [String, Array]
  }, {
    name: "callback",
    type: Function
  }],
  Qe = [{
    name: "event",
    type: String,
    required: !0
  }],
  et = new ge,
  tt = Me("$on", (function(e, t) {
    return et.on(e, t),
      function() {
        return et.off(e, t)
      }
  }), Ye),
  nt = Me("$once", (function(e, t) {
    return et.once(e, t),
      function() {
        return et.off(e, t)
      }
  }), Ze),
  rt = Me("$off", (function(e, t) {
    e ? (Array.isArray(e) || (e = [e]), e.forEach((function(e) {
      return et.off(e, t)
    }))) : et.e = {}
  }), Xe),
  it = Me("$emit", (function(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
    et.emit.apply(et, [e].concat(n))
  }), Qe);

function ot(e) {
  try {
    return JSON.parse(e)
  } catch (e) {}
  return e
}
var st = [];

function at(e, t) {
  st.forEach((function(n) {
    n(e, t)
  })), st.length = 0
}
var ut = [],
  ct = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/,
  ft = /^create|Manager$/,
  ht = ["createBLEConnection"],
  lt = ["createBLEConnection"],
  pt = /^on|^off/;

function dt(e) {
  return ft.test(e) && -1 === ht.indexOf(e)
}

function vt(e) {
  return ct.test(e) && -1 === lt.indexOf(e)
}

function gt(e) {
  return !(dt(e) || vt(e) || function(e) {
    return pt.test(e) && "onPush" !== e
  }(e))
}

function mt(e, t) {
  return gt(e) && M(t) ? function() {
    for (var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
    return M(n.success) || M(n.fail) || M(n.complete) ? Re(e, $e(e, t, n, i)) : Re(e, new Promise((function(r, o) {
      $e(e, t, P({}, n, {
        success: r,
        fail: o
      }), i)
    })))
  } : t
}
Promise.prototype.finally || (Promise.prototype.finally = function(e) {
  var t = this.constructor;
  return this.then((function(n) {
    return t.resolve(e && e()).then((function() {
      return n
    }))
  }), (function(n) {
    return t.resolve(e && e()).then((function() {
      throw n
    }))
  }))
});
var yt = ["success", "fail", "cancel", "complete"];
var bt = function() {
    var e = getApp({
      allowDefault: !0
    });
    return e && e.$vm ? e.$vm.$locale : wx.getSystemInfoSync().language || "zh-Hans"
  },
  wt = [];
"undefined" != typeof global && (global.getLocale = bt);
var _t = {
  $on: tt,
  $off: rt,
  $once: nt,
  $emit: it,
  upx2px: qe,
  interceptors: {},
  addInterceptor: Ge,
  removeInterceptor: Je,
  onCreateVueApp: function(e) {
    if (he) return e(he);
    de.push(e)
  },
  invokeCreateVueAppHook: function(e) {
    he = e, de.forEach((function(t) {
      return t(e)
    }))
  },
  getLocale: bt,
  setLocale: function(e) {
    var t = getApp();
    return !!t && (t.$vm.$locale !== e && (t.$vm.$locale = e, wt.forEach((function(t) {
      return t({
        locale: e
      })
    })), !0))
  },
  onLocaleChange: function(e) {
    -1 === wt.indexOf(e) && wt.push(e)
  },
  getPushCid: function(e) {
    H(e) || (e = {});
    var t = function(e) {
        var t = {};
        for (var n in e) {
          var r = e[n];
          M(r) && (t[n] = xe(r), delete e[n])
        }
        return t
      }(e),
      n = t.success,
      r = t.fail,
      i = t.complete,
      o = M(n),
      s = M(r),
      a = M(i);
    st.push((function(e, t) {
      var u;
      e ? (u = {
        errMsg: "getPushCid:ok",
        cid: e
      }, o && n(u)) : (u = {
        errMsg: "getPushCid:fail" + (t ? " " + t : "")
      }, s && r(u)), a && i(u)
    })), void 0 !== ze && Promise.resolve().then((function() {
      return at(ze, We)
    }))
  },
  onPushMessage: function(e) {
    -1 === ut.indexOf(e) && ut.push(e)
  },
  offPushMessage: function(e) {
    if (e) {
      var t = ut.indexOf(e);
      t > -1 && ut.splice(t, 1)
    } else ut.length = 0
  },
  invokePushCallback: function(e) {
    "clientId" === e.type ? (ze = e.cid, We = e.errMsg, at(ze, e.errMsg)) : "pushMsg" === e.type ? ut.forEach((function(t) {
      t({
        type: "receive",
        data: ot(e.message)
      })
    })) : "click" === e.type && ut.forEach((function(t) {
      t({
        type: "click",
        data: ot(e.message)
      })
    }))
  }
};
var kt, St = "__DC_STAT_UUID";
var xt, Tt = {
    returnValue: function(e, t) {
      ! function(e, t) {
        if (e.safeArea) {
          var n = e.safeArea;
          t.safeAreaInsets = {
            top: n.top,
            left: n.left,
            right: e.windowWidth - n.right,
            bottom: e.windowHeight - n.bottom
          }
        }
      }(e, t),
      function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : wx;
        return function(t, n) {
          (kt = kt || e.getStorageSync(St)) || (kt = Date.now() + "" + Math.floor(1e7 * Math.random()), wx.setStorage({
            key: St,
            data: kt
          })), n.deviceId = kt
        }
      }()(e, t)
    }
  },
  Et = Tt,
  Ot = {
    args: function(e, t) {
      var n = parseInt(e.current);
      if (!isNaN(n)) {
        var r = e.urls;
        if (R(r)) {
          var i = r.length;
          if (i) return n < 0 ? n = 0 : n >= i && (n = i - 1), n > 0 ? (t.current = r[n], t.urls = r.filter((function(e, t) {
            return !(t < n) || e !== r[n]
          }))) : t.current = r[0], {
            indicator: !1,
            loop: !1
          }
        }
      }
    }
  },
  At = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"],
  Pt = (xt = {
    oauth: ["weixin"],
    share: ["weixin"],
    payment: ["wxpay"],
    push: ["weixin"]
  }, function(e) {
    var t, n = e.service,
      r = e.success,
      i = e.fail,
      o = e.complete;
    xt[n] ? (t = {
      errMsg: "getProvider:ok",
      service: n,
      provider: xt[n]
    }, M(r) && r(t)) : (t = {
      errMsg: "getProvider:fail:服务[" + n + "]不存在"
    }, M(i) && i(t)), M(o) && o(t)
  });
var It, Dt, Ct, Rt = (It = Object.freeze({
  __proto__: null,
  getProvider: Pt,
  createSelectorQuery: function() {
    var e = wx.createSelectorQuery(),
      t = e.in;
    return e.in = function(e) {
      return t.call(this, function(e) {
        var t = Object.create(null);
        return At.forEach((function(n) {
          t[n] = e[n]
        })), t
      }(e))
    }, e
  }
}), Dt = function(e) {
  function t(e, t, n) {
    return function(i) {
      return t(r(e, i, n))
    }
  }

  function n(e, n) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
      o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
    if (H(n)) {
      var s = !0 === o ? n : {};
      for (var a in M(r) && (r = r(n, s) || {}), n)
        if (C(r, a)) {
          var u = r[a];
          M(u) && (u = u(n[a], n, s)), u ? N(u) ? s[u] = n[a] : H(u) && (s[u.name ? u.name : a] = u.value) : console.warn("微信小程序 ".concat(e, " 暂不支持 ").concat(a))
        } else if (-1 !== yt.indexOf(a)) {
        var c = n[a];
        M(c) && (s[a] = t(e, c, i))
      } else o || C(s, a) || (s[a] = n[a]);
      return s
    }
    return M(n) && (n = t(e, n, i)), n
  }

  function r(t, r, i) {
    var o = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
    return M(e.returnValue) && (r = e.returnValue(t, r)), n(t, r, i, {}, o)
  }
  return function(t, i) {
    if (!C(e, t)) return i;
    var o = e[t];
    return o ? function(e, i) {
      var s = o;
      M(o) && (s = o(e));
      var a = [e = n(t, e, s.args, s.returnValue)];
      void 0 !== i && a.push(i);
      var u = wx[s.name || t].apply(wx, a);
      return vt(t) ? r(t, u, s.returnValue, dt(t)) : u
    } : function() {
      console.error("微信小程序 暂不支持".concat(t))
    }
  }
}(Object.freeze({
  __proto__: null,
  redirectTo: {},
  previewImage: Ot,
  getSystemInfo: Tt,
  getSystemInfoSync: Et,
  showActionSheet: {
    args: function(e, t) {
      t.alertText = e.title
    }
  }
})), new Proxy({}, {
  get: function(e, t) {
    return C(e, t) ? e[t] : C(It, t) ? mt(t, It[t]) : C(_t, t) ? mt(t, _t[t]) : mt(t, Dt(t, wx[t]))
  }
}));

function $t(e) {
  for (var t, n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
  (t = console).warn.apply(t, ["[Vue warn] ".concat(e)].concat(r))
}
var jt = function() {
  return f((function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    c(this, e), this.active = !0, this.effects = [], this.cleanups = [], !t && Ct && (this.parent = Ct, this.index = (Ct.scopes || (Ct.scopes = [])).push(this) - 1)
  }), [{
    key: "run",
    value: function(e) {
      if (this.active) {
        var t = Ct;
        try {
          return Ct = this, e()
        } finally {
          Ct = t
        }
      } else $t("cannot run an inactive effect scope.")
    }
  }, {
    key: "on",
    value: function() {
      Ct = this
    }
  }, {
    key: "off",
    value: function() {
      Ct = this.parent
    }
  }, {
    key: "stop",
    value: function(e) {
      if (this.active) {
        var t, n;
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
        for (t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
        if (this.scopes)
          for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
        if (this.parent && !e) {
          var r = this.parent.scopes.pop();
          r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index)
        }
        this.active = !1
      }
    }
  }])
}();

function Mt(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ct;
  t && t.active && t.effects.push(e)
}
var Nt, Ut = function(e) {
    var t = new Set(e);
    return t.w = 0, t.n = 0, t
  },
  Lt = function(e) {
    return (e.w & Ft) > 0
  },
  Bt = function(e) {
    return (e.n & Ft) > 0
  },
  qt = new WeakMap,
  Vt = 0,
  Ft = 1,
  Ht = Symbol("iterate"),
  Kt = Symbol("Map key iterate"),
  zt = function() {
    return f((function e(t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
        r = arguments.length > 2 ? arguments[2] : void 0;
      c(this, e), this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Mt(this, r)
    }), [{
      key: "run",
      value: function() {
        if (!this.active) return this.fn();
        for (var e = Nt, t = Gt; e;) {
          if (e === this) return;
          e = e.parent
        }
        try {
          return this.parent = Nt, Nt = this, Gt = !0, Ft = 1 << ++Vt, Vt <= 30 ? function(e) {
            var t = e.deps;
            if (t.length)
              for (var n = 0; n < t.length; n++) t[n].w |= Ft
          }(this) : Wt(this), this.fn()
        } finally {
          Vt <= 30 && function(e) {
            var t = e.deps;
            if (t.length) {
              for (var n = 0, r = 0; r < t.length; r++) {
                var i = t[r];
                Lt(i) && !Bt(i) ? i.delete(e) : t[n++] = i, i.w &= ~Ft, i.n &= ~Ft
              }
              t.length = n
            }
          }(this), Ft = 1 << --Vt, Nt = this.parent, Gt = t, this.parent = void 0, this.deferStop && this.stop()
        }
      }
    }, {
      key: "stop",
      value: function() {
        Nt === this ? this.deferStop = !0 : this.active && (Wt(this), this.onStop && this.onStop(), this.active = !1)
      }
    }])
  }();

function Wt(e) {
  var t = e.deps;
  if (t.length) {
    for (var n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0
  }
}
var Gt = !0,
  Jt = [];

function Yt() {
  Jt.push(Gt), Gt = !1
}

function Zt() {
  var e = Jt.pop();
  Gt = void 0 === e || e
}

function Xt(e, t, n) {
  if (Gt && Nt) {
    var r = qt.get(e);
    r || qt.set(e, r = new Map);
    var i = r.get(n);
    i || r.set(n, i = Ut()), Qt(i, {
      effect: Nt,
      target: e,
      type: t,
      key: n
    })
  }
}

function Qt(e, t) {
  var n = !1;
  Vt <= 30 ? Bt(e) || (e.n |= Ft, n = !Lt(e)) : n = !e.has(Nt), n && (e.add(Nt), Nt.deps.push(e), Nt.onTrack && Nt.onTrack(Object.assign({
    effect: Nt
  }, t)))
}

function en(e, t, n, r, i, o) {
  var s = qt.get(e);
  if (s) {
    var a = [];
    if ("clear" === t) a = p(s.values());
    else if ("length" === n && R(e)) s.forEach((function(e, t) {
      ("length" === t || t >= r) && a.push(e)
    }));
    else switch (void 0 !== n && a.push(s.get(n)), t) {
      case "add":
        R(e) ? K(n) && a.push(s.get("length")) : (a.push(s.get(Ht)), $(e) && a.push(s.get(Kt)));
        break;
      case "delete":
        R(e) || (a.push(s.get(Ht)), $(e) && a.push(s.get(Kt)));
        break;
      case "set":
        $(e) && a.push(s.get(Ht))
    }
    var u = {
      target: e,
      type: t,
      key: n,
      newValue: r,
      oldValue: i,
      oldTarget: o
    };
    if (1 === a.length) a[0] && tn(a[0], u);
    else {
      var c, f = [],
        h = v(a);
      try {
        for (h.s(); !(c = h.n()).done;) {
          var l = c.value;
          l && f.push.apply(f, p(l))
        }
      } catch (e) {
        h.e(e)
      } finally {
        h.f()
      }
      tn(Ut(f), u)
    }
  }
}

function tn(e, t) {
  var n, r = v(R(e) ? e : p(e));
  try {
    for (r.s(); !(n = r.n()).done;) {
      var i = n.value;
      (i !== Nt || i.allowRecurse) && (i.onTrigger && i.onTrigger(P({
        effect: i
      }, t)), i.scheduler ? i.scheduler() : i.run())
    }
  } catch (e) {
    r.e(e)
  } finally {
    r.f()
  }
}
var nn = m("__proto__,__v_isRef,__isVue"),
  rn = new Set(Object.getOwnPropertyNames(Symbol).map((function(e) {
    return Symbol[e]
  })).filter(U)),
  on = hn(),
  sn = hn(!1, !0),
  an = hn(!0),
  un = hn(!0, !0),
  cn = fn();

function fn() {
  var e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((function(t) {
    e[t] = function() {
      for (var e = er(this), n = 0, r = this.length; n < r; n++) Xt(e, "get", n + "");
      for (var i = arguments.length, o = new Array(i), s = 0; s < i; s++) o[s] = arguments[s];
      var a = e[t].apply(e, o);
      return -1 === a || !1 === a ? e[t].apply(e, p(o.map(er))) : a
    }
  })), ["push", "pop", "shift", "unshift", "splice"].forEach((function(t) {
    e[t] = function() {
      Yt();
      for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
      var i = er(this)[t].apply(this, n);
      return Zt(), i
    }
  })), e
}

function hn() {
  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
    t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return function(n, r, i) {
    if ("__v_isReactive" === r) return !e;
    if ("__v_isReadonly" === r) return e;
    if ("__v_isShallow" === r) return t;
    if ("__v_raw" === r && i === (e ? t ? Hn : Fn : t ? Vn : qn).get(n)) return n;
    var o = R(n);
    if (!e && o && C(cn, r)) return Reflect.get(cn, r, i);
    var s = Reflect.get(n, r, i);
    return (U(r) ? rn.has(r) : nn(r)) ? s : (e || Xt(n, "get", r), t ? s : sr(s) ? !o || !K(r) ? s.value : s : L(s) ? e ? Wn(s) : Kn(s) : s)
  }
}

function ln() {
  var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
  return function(t, n, r, i) {
    var o = t[n];
    if (Zn(o) && sr(o) && !sr(r)) return !1;
    if (!e && !Zn(r) && (Xn(r) || (r = er(r), o = er(o)), !R(t) && sr(o) && !sr(r))) return o.value = r, !0;
    var s = R(t) && K(n) ? Number(n) < t.length : C(t, n),
      a = Reflect.set(t, n, r, i);
    return t === er(i) && (s ? te(r, o) && en(t, "set", n, r, o) : en(t, "add", n, r)), a
  }
}
var pn = {
    get: on,
    set: ln(),
    deleteProperty: function(e, t) {
      var n = C(e, t),
        r = e[t],
        i = Reflect.deleteProperty(e, t);
      return i && n && en(e, "delete", t, void 0, r), i
    },
    has: function(e, t) {
      var n = Reflect.has(e, t);
      return U(t) && rn.has(t) || Xt(e, "has", t), n
    },
    ownKeys: function(e) {
      return Xt(e, "iterate", R(e) ? "length" : Ht), Reflect.ownKeys(e)
    }
  },
  dn = {
    get: an,
    set: function(e, t) {
      return $t('Set operation on key "'.concat(String(t), '" failed: target is readonly.'), e), !0
    },
    deleteProperty: function(e, t) {
      return $t('Delete operation on key "'.concat(String(t), '" failed: target is readonly.'), e), !0
    }
  },
  vn = P({}, pn, {
    get: sn,
    set: ln(!0)
  }),
  gn = P({}, dn, {
    get: un
  }),
  mn = function(e) {
    return e
  },
  yn = function(e) {
    return Reflect.getPrototypeOf(e)
  };

function bn(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
    i = er(e = e.__v_raw),
    o = er(t);
  t !== o && !n && Xt(i, "get", t), !n && Xt(i, "get", o);
  var s = yn(i),
    a = s.has,
    u = r ? mn : n ? rr : nr;
  return a.call(i, t) ? u(e.get(t)) : a.call(i, o) ? u(e.get(o)) : void(e !== i && e.get(t))
}

function wn(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    n = this.__v_raw,
    r = er(n),
    i = er(e);
  return e !== i && !t && Xt(r, "has", e), !t && Xt(r, "has", i), e === i ? n.has(e) : n.has(e) || n.has(i)
}

function _n(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return e = e.__v_raw, !t && Xt(er(e), "iterate", Ht), Reflect.get(e, "size", e)
}

function kn(e) {
  e = er(e);
  var t = er(this);
  return yn(t).has.call(t, e) || (t.add(e), en(t, "add", e, e)), this
}

function Sn(e, t) {
  t = er(t);
  var n = er(this),
    r = yn(n),
    i = r.has,
    o = r.get,
    s = i.call(n, e);
  s ? Bn(n, i, e) : (e = er(e), s = i.call(n, e));
  var a = o.call(n, e);
  return n.set(e, t), s ? te(t, a) && en(n, "set", e, t, a) : en(n, "add", e, t), this
}

function xn(e) {
  var t = er(this),
    n = yn(t),
    r = n.has,
    i = n.get,
    o = r.call(t, e);
  o ? Bn(t, r, e) : (e = er(e), o = r.call(t, e));
  var s = i ? i.call(t, e) : void 0,
    a = t.delete(e);
  return o && en(t, "delete", e, void 0, s), a
}

function Tn() {
  var e = er(this),
    t = 0 !== e.size,
    n = $(e) ? new Map(e) : new Set(e),
    r = e.clear();
  return t && en(e, "clear", void 0, void 0, n), r
}

function En(e, t) {
  return function(n, r) {
    var i = this,
      o = i.__v_raw,
      s = er(o),
      a = t ? mn : e ? rr : nr;
    return !e && Xt(s, "iterate", Ht), o.forEach((function(e, t) {
      return n.call(r, a(e), a(t), i)
    }))
  }
}

function On(e, t, n) {
  return function() {
    var r = this.__v_raw,
      i = er(r),
      o = $(i),
      s = "entries" === e || e === Symbol.iterator && o,
      a = "keys" === e && o,
      u = r[e].apply(r, arguments),
      c = n ? mn : t ? rr : nr;
    return !t && Xt(i, "iterate", a ? Kt : Ht), l({
      next: function() {
        var e = u.next(),
          t = e.value,
          n = e.done;
        return n ? {
          value: t,
          done: n
        } : {
          value: s ? [c(t[0]), c(t[1])] : c(t),
          done: n
        }
      }
    }, Symbol.iterator, (function() {
      return this
    }))
  }
}

function An(e) {
  return function() {
    var t = (arguments.length <= 0 ? void 0 : arguments[0]) ? 'on key "'.concat(arguments.length <= 0 ? void 0 : arguments[0], '" ') : "";
    return console.warn("".concat(Q(e), " operation ").concat(t, "failed: target is readonly."), er(this)), "delete" !== e && this
  }
}

function Pn() {
  var e = {
      get: function(e) {
        return bn(this, e)
      },
      get size() {
        return _n(this)
      },
      has: wn,
      add: kn,
      set: Sn,
      delete: xn,
      clear: Tn,
      forEach: En(!1, !1)
    },
    t = {
      get: function(e) {
        return bn(this, e, !1, !0)
      },
      get size() {
        return _n(this)
      },
      has: wn,
      add: kn,
      set: Sn,
      delete: xn,
      clear: Tn,
      forEach: En(!1, !0)
    },
    n = {
      get: function(e) {
        return bn(this, e, !0)
      },
      get size() {
        return _n(this, !0)
      },
      has: function(e) {
        return wn.call(this, e, !0)
      },
      add: An("add"),
      set: An("set"),
      delete: An("delete"),
      clear: An("clear"),
      forEach: En(!0, !1)
    },
    r = {
      get: function(e) {
        return bn(this, e, !0, !0)
      },
      get size() {
        return _n(this, !0)
      },
      has: function(e) {
        return wn.call(this, e, !0)
      },
      add: An("add"),
      set: An("set"),
      delete: An("delete"),
      clear: An("clear"),
      forEach: En(!0, !0)
    };
  return ["keys", "values", "entries", Symbol.iterator].forEach((function(i) {
    e[i] = On(i, !1, !1), n[i] = On(i, !0, !1), t[i] = On(i, !1, !0), r[i] = On(i, !0, !0)
  })), [e, n, t, r]
}
var In = d(Pn(), 4),
  Dn = In[0],
  Cn = In[1],
  Rn = In[2],
  $n = In[3];

function jn(e, t) {
  var n = t ? e ? $n : Rn : e ? Cn : Dn;
  return function(t, r, i) {
    return "__v_isReactive" === r ? !e : "__v_isReadonly" === r ? e : "__v_raw" === r ? t : Reflect.get(C(n, r) && r in t ? n : t, r, i)
  }
}
var Mn = {
    get: jn(!1, !1)
  },
  Nn = {
    get: jn(!1, !0)
  },
  Un = {
    get: jn(!0, !1)
  },
  Ln = {
    get: jn(!0, !0)
  };

function Bn(e, t, n) {
  var r = er(n);
  if (r !== n && t.call(e, r)) {
    var i = F(e);
    console.warn("Reactive ".concat(i, " contains both the raw and reactive versions of the same object").concat("Map" === i ? " as keys" : "", ", which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible."))
  }
}
var qn = new WeakMap,
  Vn = new WeakMap,
  Fn = new WeakMap,
  Hn = new WeakMap;

function Kn(e) {
  return Zn(e) ? e : Jn(e, !1, pn, Mn, qn)
}

function zn(e) {
  return Jn(e, !1, vn, Nn, Vn)
}

function Wn(e) {
  return Jn(e, !0, dn, Un, Fn)
}

function Gn(e) {
  return Jn(e, !0, gn, Ln, Hn)
}

function Jn(e, t, n, r, i) {
  if (!L(e)) return console.warn("value cannot be made reactive: ".concat(String(e))), e;
  if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
  var o = i.get(e);
  if (o) return o;
  var s, a = (s = e).__v_skip || !Object.isExtensible(s) ? 0 : function(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0
    }
  }(F(s));
  if (0 === a) return e;
  var u = new Proxy(e, 2 === a ? r : n);
  return i.set(e, u), u
}

function Yn(e) {
  return Zn(e) ? Yn(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function Zn(e) {
  return !(!e || !e.__v_isReadonly)
}

function Xn(e) {
  return !(!e || !e.__v_isShallow)
}

function Qn(e) {
  return Yn(e) || Zn(e)
}

function er(e) {
  var t = e && e.__v_raw;
  return t ? er(t) : e
}

function tr(e) {
  return function(e, t, n) {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n
    })
  }(e, "__v_skip", !0), e
}
var nr = function(e) {
    return L(e) ? Kn(e) : e
  },
  rr = function(e) {
    return L(e) ? Wn(e) : e
  };

function ir(e) {
  Gt && Nt && Qt((e = er(e)).dep || (e.dep = Ut()), {
    target: e,
    type: "get",
    key: "value"
  })
}

function or(e, t) {
  (e = er(e)).dep && tn(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  })
}

function sr(e) {
  return !(!e || !0 !== e.__v_isRef)
}

function ar(e) {
  return function(e, t) {
    if (sr(e)) return e;
    return new ur(e, t)
  }(e, !1)
}
var ur = function() {
  return f((function e(t, n) {
    c(this, e), this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : er(t), this._value = n ? t : nr(t)
  }), [{
    key: "value",
    get: function() {
      return ir(this), this._value
    },
    set: function(e) {
      e = this.__v_isShallow ? e : er(e), te(e, this._rawValue) && (this._rawValue = e, this._value = this.__v_isShallow ? e : nr(e), or(this, e))
    }
  }])
}();

function cr(e) {
  return sr(e) ? e.value : e
}
var fr = {
  get: function(e, t, n) {
    return cr(Reflect.get(e, t, n))
  },
  set: function(e, t, n, r) {
    var i = e[t];
    return sr(i) && !sr(n) ? (i.value = n, !0) : Reflect.set(e, t, n, r)
  }
};

function hr(e) {
  return Yn(e) ? e : new Proxy(e, fr)
}
var lr = function() {
  return f((function e(t, n, r) {
    c(this, e), this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0
  }), [{
    key: "value",
    get: function() {
      var e = this._object[this._key];
      return void 0 === e ? this._defaultValue : e
    },
    set: function(e) {
      this._object[this._key] = e
    }
  }])
}();

function pr(e, t, n) {
  var r = e[t];
  return sr(r) ? r : new lr(e, t, n)
}
var dr = function() {
  return f((function e(t, n, r, i) {
    var o = this;
    c(this, e), this._setter = n, this.dep = void 0, this.__v_isRef = !0, this._dirty = !0, this.effect = new zt(t, (function() {
      o._dirty || (o._dirty = !0, or(o))
    })), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = r
  }), [{
    key: "value",
    get: function() {
      var e = er(this);
      return ir(e), !e._dirty && e._cacheable || (e._dirty = !1, e._value = e.effect.run()), e._value
    },
    set: function(e) {
      this._setter(e)
    }
  }])
}();
var vr = [];

function gr(e) {
  vr.push(e)
}

function mr() {
  vr.pop()
}

function yr(e) {
  Yt();
  for (var t = vr.length ? vr[vr.length - 1].component : null, n = t && t.appContext.config.warnHandler, r = br(), i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) o[s - 1] = arguments[s];
  if (n) kr(n, t, 11, [e + o.join(""), t && t.proxy, r.map((function(e) {
    var n = e.vnode;
    return "at <".concat(So(t, n.type), ">")
  })).join("\n"), r]);
  else {
    var a, u = ["[Vue warn]: ".concat(e)].concat(o);
    r.length && u.push.apply(u, ["\n"].concat(p(wr(r)))), (a = console).warn.apply(a, p(u))
  }
  Zt()
}

function br() {
  var e = vr[vr.length - 1];
  if (!e) return [];
  for (var t = []; e;) {
    var n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    var r = e.component && e.component.parent;
    e = r && r.vnode
  }
  return t
}

function wr(e) {
  var t = [];
  return e.forEach((function(e, n) {
    var r, i, o, s, a, u, c, f, h, l;
    t.push.apply(t, p(0 === n ? [] : ["\n"]).concat(p((a = (s = e).vnode, u = s.recurseCount, c = u > 0 ? "... (".concat(u, " recursive calls)") : "", f = !!a.component && null == a.component.parent, h = " at <".concat(So(a.component, a.type, f)), l = ">" + c, a.props ? [h].concat(p((r = a.props, i = [], (o = Object.keys(r)).slice(0, 3).forEach((function(e) {
      i.push.apply(i, p(function e(t, n, r) {
        return N(n) ? (n = JSON.stringify(n), r ? n : ["".concat(t, "=").concat(n)]) : "number" == typeof n || "boolean" == typeof n || null == n ? r ? n : ["".concat(t, "=").concat(n)] : sr(n) ? (n = e(t, er(n.value), !0), r ? n : ["".concat(t, "=Ref<"), n, ">"]) : M(n) ? ["".concat(t, "=fn").concat(n.name ? "<".concat(n.name, ">") : "")] : (n = er(n), r ? n : ["".concat(t, "="), n])
      }(e, r[e])))
    })), o.length > 3 && i.push(" ..."), i)), [l]) : [h + l]))))
  })), t
}
var _r = (l(l(l(l(l(l(l(l(l(l(n = {}, "sp", "serverPrefetch hook"), "bc", "beforeCreate hook"), "c", "created hook"), "bm", "beforeMount hook"), "m", "mounted hook"), "bu", "beforeUpdate hook"), "u", "updated"), "bum", "beforeUnmount hook"), "um", "unmounted hook"), "a", "activated hook"), l(l(l(l(l(l(l(l(l(l(n, "da", "deactivated hook"), "ec", "errorCaptured hook"), "rtc", "renderTracked hook"), "rtg", "renderTriggered hook"), 0, "setup function"), 1, "render function"), 2, "watcher getter"), 3, "watcher callback"), 4, "watcher cleanup function"), 5, "native event handler"), l(l(l(l(l(l(l(l(l(n, 6, "component event handler"), 7, "vnode hook"), 8, "directive hook"), 9, "transition hook"), 10, "app errorHandler"), 11, "app warnHandler"), 12, "ref function"), 13, "async component loader"), 14, "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"));

function kr(e, t, n, r) {
  var i;
  try {
    i = r ? e.apply(void 0, p(r)) : e()
  } catch (e) {
    xr(e, t, n)
  }
  return i
}

function Sr(e, t, n, r) {
  if (M(e)) {
    var i = kr(e, t, n, r);
    return i && B(i) && i.catch((function(e) {
      xr(e, t, n)
    })), i
  }
  for (var o = [], s = 0; s < e.length; s++) o.push(Sr(e[s], t, n, r));
  return o
}

function xr(e, t, n) {
  var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
    i = t ? t.vnode : null;
  if (t) {
    for (var o = t.parent, s = t.proxy, a = _r[n] || n; o;) {
      var u = o.ec;
      if (u)
        for (var c = 0; c < u.length; c++)
          if (!1 === u[c](e, s, a)) return;
      o = o.parent
    }
    var f = t.appContext.config.errorHandler;
    if (f) return void kr(f, null, 10, [e, s, a])
  }
  Tr(e, n, i, r)
}

function Tr(e, t, n) {
  var r = _r[t] || t;
  n && gr(n), yr("Unhandled error".concat(r ? " during execution of ".concat(r) : "")), n && mr(), console.error(e)
}
var Er = !1,
  Or = !1,
  Ar = [],
  Pr = 0,
  Ir = [],
  Dr = null,
  Cr = 0,
  Rr = [],
  $r = null,
  jr = 0,
  Mr = Promise.resolve(),
  Nr = null,
  Ur = null;

function Lr(e) {
  var t = Nr || Mr;
  return e ? t.then(this ? e.bind(this) : e) : t
}

function Br(e) {
  Ar.length && Ar.includes(e, Er && e.allowRecurse ? Pr + 1 : Pr) || e === Ur || (null == e.id ? Ar.push(e) : Ar.splice(function(e) {
    for (var t = Pr + 1, n = Ar.length; t < n;) {
      var r = t + n >>> 1;
      zr(Ar[r]) < e ? t = r + 1 : n = r
    }
    return t
  }(e.id), 0, e), qr())
}

function qr() {
  Er || Or || (Or = !0, Nr = Mr.then(Wr))
}

function Vr(e, t, n, r) {
  R(e) ? n.push.apply(n, p(e)) : t && t.includes(e, e.allowRecurse ? r + 1 : r) || n.push(e), qr()
}

function Fr(e) {
  Vr(e, Dr, Ir, Cr)
}

function Hr(e) {
  Vr(e, $r, Rr, jr)
}

function Kr(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
  if (Ir.length) {
    for (Ur = t, Dr = p(new Set(Ir)), Ir.length = 0, e = e || new Map, Cr = 0; Cr < Dr.length; Cr++) Gr(e, Dr[Cr]) || Dr[Cr]();
    Dr = null, Cr = 0, Ur = null, Kr(e, t)
  }
}
var zr = function(e) {
  return null == e.id ? 1 / 0 : e.id
};

function Wr(e) {
  Or = !1, Er = !0, Kr(e = e || new Map), Ar.sort((function(e, t) {
    return zr(e) - zr(t)
  }));
  var t = function(t) {
    return Gr(e, t)
  };
  try {
    for (Pr = 0; Pr < Ar.length; Pr++) {
      var n = Ar[Pr];
      if (n && !1 !== n.active) {
        if (t(n)) continue;
        kr(n, null, 14)
      }
    }
  } finally {
    Pr = 0, Ar.length = 0,
      function(e) {
        if (Rr.length) {
          var t, n = p(new Set(Rr));
          if (Rr.length = 0, $r) return void(t = $r).push.apply(t, p(n));
          for ($r = n, e = e || new Map, $r.sort((function(e, t) {
              return zr(e) - zr(t)
            })), jr = 0; jr < $r.length; jr++) Gr(e, $r[jr]) || $r[jr]();
          $r = null, jr = 0
        }
      }(e), Er = !1, Nr = null, (Ar.length || Ir.length || Rr.length) && Wr(e)
  }
}

function Gr(e, t) {
  if (e.has(t)) {
    var n = e.get(t);
    if (n > 100) {
      var r = t.ownerInstance,
        i = r && ko(r.type);
      return yr("Maximum recursive updates exceeded".concat(i ? " in component <".concat(i, ">") : "", ". This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.")), !0
    }
    e.set(t, n + 1)
  } else e.set(t, 1)
}

function Jr(e, t, n) {
  e.appContext.app
}

function Yr(e, t) {
  if (!e.isUnmounted) {
    for (var n = e.vnode.props || k, r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) i[o - 2] = arguments[o];
    var s = e.emitsOptions,
      a = d(e.propsOptions, 1),
      u = a[0];
    if (s)
      if (t in s) {
        var c = s[t];
        if (M(c)) {
          var f = c.apply(void 0, i);
          f || yr('Invalid event arguments: event validation failed for event "'.concat(t, '".'))
        }
      } else u && ee(t) in u || yr('Component emitted event "'.concat(t, '" but it is neither declared in the emits option nor as an "').concat(ee(t), '" prop.'));
    var h = i,
      l = t.startsWith("update:"),
      p = l && t.slice(7);
    if (p && p in n) {
      var v = "".concat("modelValue" === p ? "model" : p, "Modifiers"),
        g = n[v] || k,
        m = g.number,
        y = g.trim;
      y ? h = i.map((function(e) {
        return e.trim()
      })) : m && (h = i.map(re))
    }
    Jr(e);
    var b, w = t.toLowerCase();
    w !== t && n[ee(w)] && yr('Event "'.concat(w, '" is emitted in component ').concat(So(e, e.type), ' but the handler is registered for "').concat(t, '". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "').concat(X(t), '" instead of "').concat(t, '".'));
    var _ = n[b = ee(t)] || n[b = ee(Y(t))];
    !_ && l && (_ = n[b = ee(X(t))]), _ && Sr(_, e, 6, h);
    var S = n[b + "Once"];
    if (S) {
      if (e.emitted) {
        if (e.emitted[b]) return
      } else e.emitted = {};
      e.emitted[b] = !0, Sr(S, e, 6, h)
    }
  }
}

function Zr(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    r = t.emitsCache,
    i = r.get(e);
  if (void 0 !== i) return i;
  var o = e.emits,
    s = {},
    a = !1;
  if (!M(e)) {
    var u = function(e) {
      var n = Zr(e, t, !0);
      n && (a = !0, P(s, n))
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u)
  }
  return o || a ? (R(o) ? o.forEach((function(e) {
    return s[e] = null
  })) : P(s, o), r.set(e, s), s) : (r.set(e, null), null)
}

function Xr(e, t) {
  return !(!e || !O(t)) && (t = t.slice(2).replace(/Once$/, ""), C(e, t[0].toLowerCase() + t.slice(1)) || C(e, X(t)) || C(e, t))
}
var Qr = null;

function ei(e) {
  var t = Qr;
  return Qr = e, e && e.type.__scopeId, t
}

function ti(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    r = ao || Qr;
  if (r) {
    var i = null == r.parent ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (i && e in i) return i[e];
    if (arguments.length > 1) return n && M(t) ? t.call(r.proxy) : t;
    yr('injection "'.concat(String(e), '" not found.'))
  } else yr("inject() can only be used inside setup() or functional components.")
}
var ni = {};

function ri(e, t, n) {
  return M(t) || yr("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), ii(e, t, n)
}

function ii(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : k,
    r = n.immediate,
    i = n.deep,
    o = n.flush,
    s = n.onTrack,
    a = n.onTrigger;
  t || (void 0 !== r && yr('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), void 0 !== i && yr('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  var u, c, f = function(e) {
      yr("Invalid watch source: ", e, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.")
    },
    h = ao,
    l = !1,
    p = !1;
  if (sr(e) ? (u = function() {
      return e.value
    }, l = Xn(e)) : Yn(e) ? (u = function() {
      return e
    }, i = !0) : R(e) ? (p = !0, l = e.some(Yn), u = function() {
      return e.map((function(e) {
        return sr(e) ? e.value : Yn(e) ? ai(e) : M(e) ? kr(e, h, 2) : void f(e)
      }))
    }) : M(e) ? u = t ? function() {
      return kr(e, h, 2)
    } : function() {
      if (!h || !h.isUnmounted) return c && c(), Sr(e, h, 3, [v])
    } : (u = x, f(e)), t && i) {
    var d = u;
    u = function() {
      return ai(d())
    }
  }
  var v = function(e) {
      c = y.onStop = function() {
        kr(e, h, 4)
      }
    },
    g = p ? [] : ni,
    m = function() {
      if (y.active)
        if (t) {
          var e = y.run();
          (i || l || (p ? e.some((function(e, t) {
            return te(e, g[t])
          })) : te(e, g))) && (c && c(), Sr(t, h, 3, [e, g === ni ? void 0 : g, v]), g = e)
        } else y.run()
    };
  m.allowRecurse = !!t;
  var y = new zt(u, "sync" === o ? m : "post" === o ? function() {
    return Qi(m, h && h.suspense)
  } : function() {
    !h || h.isMounted ? Fr(m) : m()
  });
  return y.onTrack = s, y.onTrigger = a, t ? r ? m() : g = y.run() : "post" === o ? Qi(y.run.bind(y), h && h.suspense) : y.run(),
    function() {
      y.stop(), h && h.scope && I(h.scope.effects, y)
    }
}

function oi(e, t, n) {
  var r, i = this.proxy,
    o = N(e) ? e.includes(".") ? si(i, e) : function() {
      return i[e]
    } : e.bind(i, i);
  M(t) ? r = t : (r = t.handler, n = t);
  var s = ao;
  co(this);
  var a = ii(o, r.bind(i), n);
  return s ? co(s) : fo(), a
}

function si(e, t) {
  var n = t.split(".");
  return function() {
    for (var t = e, r = 0; r < n.length && t; r++) t = t[n[r]];
    return t
  }
}

function ai(e, t) {
  if (!L(e) || e.__v_skip) return e;
  if ((t = t || new Set).has(e)) return e;
  if (t.add(e), sr(e)) ai(e.value, t);
  else if (R(e))
    for (var n = 0; n < e.length; n++) ai(e[n], t);
  else if (j(e) || $(e)) e.forEach((function(e) {
    ai(e, t)
  }));
  else if (H(e))
    for (var r in e) ai(e[r], t);
  return e
}
var ui = function(e) {
  return e.type.__isKeepAlive
};

function ci(e, t) {
  hi(e, "a", t)
}

function fi(e, t) {
  hi(e, "da", t)
}

function hi(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ao,
    r = e.__wdc || (e.__wdc = function() {
      for (var t = n; t;) {
        if (t.isDeactivated) return;
        t = t.parent
      }
      return e()
    });
  if (pi(t, r, n), n)
    for (var i = n.parent; i && i.parent;) ui(i.parent.vnode) && li(r, t, n, i), i = i.parent
}

function li(e, t, n, r) {
  var i = pi(t, e, r, !0);
  wi((function() {
    I(r[t], i)
  }), n)
}

function pi(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ao,
    r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  if (n) {
    fe(e) && (n = n.root);
    var i = n[e] || (n[e] = []),
      o = t.__weh || (t.__weh = function() {
        if (!n.isUnmounted) {
          Yt(), co(n);
          for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
          var s = Sr(t, n, e, i);
          return fo(), Zt(), s
        }
      });
    return r ? i.unshift(o) : i.push(o), o
  }
  var s = ee((_r[e] || e.replace(/^on/, "")).replace(/ hook$/, ""));
  yr("".concat(s, " is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup()."))
}
var di = function(e) {
    return function(t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ao;
      return (!vo || "sp" === e) && pi(e, t, n)
    }
  },
  vi = di("bm"),
  gi = di("m"),
  mi = di("bu"),
  yi = di("u"),
  bi = di("bum"),
  wi = di("um"),
  _i = di("sp"),
  ki = di("rtg"),
  Si = di("rtc");

function xi(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ao;
  pi("ec", e, t)
}
var Ti = !0;

function Ei(e) {
  var t = Pi(e),
    n = e.proxy,
    r = e.ctx;
  Ti = !1, t.beforeCreate && Oi(t.beforeCreate, e, "bc");
  var i, o = t.data,
    s = t.computed,
    a = t.methods,
    u = t.watch,
    c = t.provide,
    f = t.inject,
    l = t.created,
    p = t.beforeMount,
    v = t.mounted,
    g = t.beforeUpdate,
    m = t.updated,
    y = t.activated,
    b = t.deactivated,
    w = (t.beforeDestroy, t.beforeUnmount),
    _ = (t.destroyed, t.unmounted),
    k = t.render,
    S = t.renderTracked,
    T = t.renderTriggered,
    E = t.errorCaptured,
    O = t.serverPrefetch,
    A = t.expose,
    P = t.inheritAttrs,
    I = t.components,
    D = t.directives,
    C = (t.filters, i = Object.create(null), function(e, t) {
      i[t] ? yr("".concat(e, ' property "').concat(t, '" is already defined in ').concat(i[t], ".")) : i[t] = e
    }),
    $ = d(e.propsOptions, 1)[0];
  if ($)
    for (var j in $) C("Props", j);
  if (f && function(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : x,
        r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
      R(e) && (e = Ri(e));
      var i = function() {
        var i, s = e[o];
        sr(i = L(s) ? "default" in s ? ti(s.from || o, s.default, !0) : ti(s.from || o) : ti(s)) ? r ? Object.defineProperty(t, o, {
          enumerable: !0,
          configurable: !0,
          get: function() {
            return i.value
          },
          set: function(e) {
            return i.value = e
          }
        }) : (yr('injected property "'.concat(o, '" is a ref and will be auto-unwrapped and no longer needs `.value` in the next minor release. To opt-in to the new behavior now, set `app.config.unwrapInjectedRef = true` (this config is temporary and will not be needed in the future.)')), t[o] = i) : t[o] = i, n("Inject", o)
      };
      for (var o in e) i()
    }(f, r, C, e.appContext.config.unwrapInjectedRef), a)
    for (var N in a) {
      var U = a[N];
      M(U) ? (Object.defineProperty(r, N, {
        value: U.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }), C("Methods", N)) : yr('Method "'.concat(N, '" has type "').concat(h(U), '" in the component definition. Did you reference the function correctly?'))
    }
  if (o) {
    M(o) || yr("The data option must be a function. Plain object usage is no longer supported.");
    var q = o.call(n, n);
    if (B(q) && yr("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), L(q)) {
      e.data = Kn(q);
      var V = function(e) {
        C("Data", e), "$" !== e[0] && "_" !== e[0] && Object.defineProperty(r, e, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return q[e]
          },
          set: x
        })
      };
      for (var F in q) V(F)
    } else yr("data() should return an object.")
  }
  if (Ti = !0, s) {
    var H = function(e) {
      var t = s[e],
        i = M(t) ? t.bind(n, n) : M(t.get) ? t.get.bind(n, n) : x;
      i === x && yr('Computed property "'.concat(e, '" has no getter.'));
      var o = !M(t) && M(t.set) ? t.set.bind(n) : function() {
          yr('Write operation failed: computed property "'.concat(e, '" is readonly.'))
        },
        a = xo({
          get: i,
          set: o
        });
      Object.defineProperty(r, e, {
        enumerable: !0,
        configurable: !0,
        get: function() {
          return a.value
        },
        set: function(e) {
          return a.value = e
        }
      }), C("Computed", e)
    };
    for (var K in s) H(K)
  }
  if (u)
    for (var z in u) Ai(u[z], r, n, z);
  if (c) {
    var W = M(c) ? c.call(n) : c;
    Reflect.ownKeys(W).forEach((function(e) {
      ! function(e, t) {
        if (ao) {
          var n = ao.provides,
            r = ao.parent && ao.parent.provides;
          r === n && (n = ao.provides = Object.create(r)), n[e] = t, "app" === ao.type.mpType && ao.appContext.app.provide(e, t)
        } else yr("provide() can only be used inside setup().")
      }(e, W[e])
    }))
  }

  function G(e, t) {
    R(t) ? t.forEach((function(t) {
      return e(t.bind(n))
    })) : t && e(t.bind(n))
  }
  if (l && Oi(l, e, "c"), G(vi, p), G(gi, v), G(mi, g), G(yi, m), G(ci, y), G(fi, b), G(xi, E), G(Si, S), G(ki, T), G(bi, w), G(wi, _), G(_i, O), R(A))
    if (A.length) {
      var J = e.exposed || (e.exposed = {});
      A.forEach((function(e) {
        Object.defineProperty(J, e, {
          get: function() {
            return n[e]
          },
          set: function(t) {
            return n[e] = t
          }
        })
      }))
    } else e.exposed || (e.exposed = {});
  k && e.render === x && (e.render = k), null != P && (e.inheritAttrs = P), I && (e.components = I), D && (e.directives = D), e.ctx.$onApplyOptions && e.ctx.$onApplyOptions(t, e, n)
}

function Oi(e, t, n) {
  Sr(R(e) ? e.map((function(e) {
    return e.bind(t.proxy)
  })) : e.bind(t.proxy), t, n)
}

function Ai(e, t, n, r) {
  var i = r.includes(".") ? si(n, r) : function() {
    return n[r]
  };
  if (N(e)) {
    var o = t[e];
    M(o) ? ri(i, o) : yr('Invalid watch handler specified by key "'.concat(e, '"'), o)
  } else if (M(e)) ri(i, e.bind(n));
  else if (L(e))
    if (R(e)) e.forEach((function(e) {
      return Ai(e, t, n, r)
    }));
    else {
      var s = M(e.handler) ? e.handler.bind(n) : t[e.handler];
      M(s) ? ri(i, s, e) : yr('Invalid watch handler specified by key "'.concat(e.handler, '"'), s)
    }
  else yr('Invalid watch option: "'.concat(r, '"'), e)
}

function Pi(e) {
  var t, n = e.type,
    r = n.mixins,
    i = n.extends,
    o = e.appContext,
    s = o.mixins,
    a = o.optionsCache,
    u = o.config.optionMergeStrategies,
    c = a.get(n);
  return c ? t = c : s.length || r || i ? (t = {}, s.length && s.forEach((function(e) {
    return Ii(t, e, u, !0)
  })), Ii(t, n, u)) : t = n, a.set(n, t), t
}

function Ii(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
    i = t.mixins,
    o = t.extends;
  for (var s in o && Ii(e, o, n, !0), i && i.forEach((function(t) {
      return Ii(e, t, n, !0)
    })), t)
    if (r && "expose" === s) yr('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      var a = Di[s] || n && n[s];
      e[s] = a ? a(e[s], t[s]) : t[s]
    } return e
}
var Di = {
  data: Ci,
  props: ji,
  emits: ji,
  methods: ji,
  computed: ji,
  beforeCreate: $i,
  created: $i,
  beforeMount: $i,
  mounted: $i,
  beforeUpdate: $i,
  updated: $i,
  beforeDestroy: $i,
  beforeUnmount: $i,
  destroyed: $i,
  unmounted: $i,
  activated: $i,
  deactivated: $i,
  errorCaptured: $i,
  serverPrefetch: $i,
  components: ji,
  directives: ji,
  watch: function(e, t) {
    if (!e) return t;
    if (!t) return e;
    var n = P(Object.create(null), e);
    for (var r in t) n[r] = $i(e[r], t[r]);
    return n
  },
  provide: Ci,
  inject: function(e, t) {
    return ji(Ri(e), Ri(t))
  }
};

function Ci(e, t) {
  return t ? e ? function() {
    return P(M(e) ? e.call(this, this) : e, M(t) ? t.call(this, this) : t)
  } : t : e
}

function Ri(e) {
  if (R(e)) {
    for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t
  }
  return e
}

function $i(e, t) {
  return e ? p(new Set([].concat(e, t))) : t
}

function ji(e, t) {
  return e ? P(P(Object.create(null), e), t) : t
}

function Mi(e, t, n) {
  var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
    i = {},
    o = {};
  for (var s in e.propsDefaults = Object.create(null), Ni(e, t, i, o), e.propsOptions[0]) s in i || (i[s] = void 0);
  Hi(t || {}, i, e), n ? e.props = r ? i : zn(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o
}

function Ni(e, t, n, r) {
  var i, o = d(e.propsOptions, 2),
    s = o[0],
    a = o[1],
    u = !1;
  if (t)
    for (var c in t)
      if (!z(c)) {
        var f = t[c],
          h = void 0;
        s && C(s, h = Y(c)) ? a && a.includes(h) ? (i || (i = {}))[h] = f : n[h] = f : Xr(e.emitsOptions, c) || c in r && f === r[c] || (r[c] = f, u = !0)
      } if (a)
    for (var l = er(n), p = i || k, v = 0; v < a.length; v++) {
      var g = a[v];
      n[g] = Ui(s, l, g, p[g], e, !C(p, g))
    }
  return u
}

function Ui(e, t, n, r, i, o) {
  var s = e[n];
  if (null != s) {
    var a = C(s, "default");
    if (a && void 0 === r) {
      var u = s.default;
      if (s.type !== Function && M(u)) {
        var c = i.propsDefaults;
        n in c ? r = c[n] : (co(i), r = c[n] = u.call(null, t), fo())
      } else r = u
    }
    s[0] && (o && !a ? r = !1 : !s[1] || "" !== r && r !== X(n) || (r = !0))
  }
  return r
}

function Li(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    r = t.propsCache,
    i = r.get(e);
  if (i) return i;
  var o = e.props,
    s = {},
    a = [],
    u = !1;
  if (!M(e)) {
    var c = function(e) {
      u = !0;
      var n = Li(e, t, !0),
        r = d(n, 2),
        i = r[0],
        o = r[1];
      P(s, i), o && a.push.apply(a, p(o))
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c)
  }
  if (!o && !u) return r.set(e, S), S;
  if (R(o))
    for (var f = 0; f < o.length; f++) {
      N(o[f]) || yr("props must be strings when using array syntax.", o[f]);
      var h = Y(o[f]);
      Bi(h) && (s[h] = k)
    } else if (o)
      for (var l in L(o) || yr("invalid props options", o), o) {
        var v = Y(l);
        if (Bi(v)) {
          var g = o[l],
            m = s[v] = R(g) || M(g) ? {
              type: g
            } : g;
          if (m) {
            var y = Fi(Boolean, m.type),
              b = Fi(String, m.type);
            m[0] = y > -1, m[1] = b < 0 || y < b, (y > -1 || C(m, "default")) && a.push(v)
          }
        }
      }
  var w = [s, a];
  return r.set(e, w), w
}

function Bi(e) {
  return "$" !== e[0] || (yr('Invalid prop name: "'.concat(e, '" is a reserved property.')), !1)
}

function qi(e) {
  var t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : null === e ? "null" : ""
}

function Vi(e, t) {
  return qi(e) === qi(t)
}

function Fi(e, t) {
  return R(t) ? t.findIndex((function(t) {
    return Vi(t, e)
  })) : M(t) && Vi(t, e) ? 0 : -1
}

function Hi(e, t, n) {
  var r = er(t),
    i = n.propsOptions[0];
  for (var o in i) {
    var s = i[o];
    null != s && Ki(o, r[o], s, !C(e, o) && !C(e, X(o)))
  }
}

function Ki(e, t, n, r) {
  var i = n.type,
    o = n.required,
    s = n.validator;
  if (o && r) yr('Missing required prop: "' + e + '"');
  else if (null != t || n.required) {
    if (null != i && !0 !== i) {
      for (var a = !1, u = R(i) ? i : [i], c = [], f = 0; f < u.length && !a; f++) {
        var h = Wi(t, u[f]),
          l = h.valid,
          p = h.expectedType;
        c.push(p || ""), a = l
      }
      if (!a) return void yr(function(e, t, n) {
        var r = 'Invalid prop: type check failed for prop "'.concat(e, '". Expected ').concat(n.map(Q).join(" | ")),
          i = n[0],
          o = F(t),
          s = Gi(t, i),
          a = Gi(t, o);
        1 === n.length && Ji(i) && ! function() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
          return t.some((function(e) {
            return "boolean" === e.toLowerCase()
          }))
        }(i, o) && (r += " with value ".concat(s));
        r += ", got ".concat(o, " "), Ji(o) && (r += "with value ".concat(a, "."));
        return r
      }(e, t, c))
    }
    s && !s(t) && yr('Invalid prop: custom validator check failed for prop "' + e + '".')
  }
}
var zi = m("String,Number,Boolean,Function,Symbol,BigInt");

function Wi(e, t) {
  var n, r = qi(t);
  if (zi(r)) {
    var i = h(e);
    (n = i === r.toLowerCase()) || "object" !== i || (n = e instanceof t)
  } else n = "Object" === r ? L(e) : "Array" === r ? R(e) : "null" === r ? null === e : e instanceof t;
  return {
    valid: n,
    expectedType: r
  }
}

function Gi(e, t) {
  return "String" === t ? '"'.concat(e, '"') : "".concat("Number" === t ? Number(e) : e)
}

function Ji(e) {
  return ["string", "number", "boolean"].some((function(t) {
    return e.toLowerCase() === t
  }))
}

function Yi(e) {
  W(e) && yr("Do not use built-in directive ids as custom directive id: " + e)
}

function Zi() {
  return {
    app: null,
    config: {
      isNativeTag: T,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  }
}
var Xi = 0;
var Qi = Hr;

function eo(e, t) {
  return e && (e[t] || e[Y(t)] || e[Q(Y(t))])
}
var to = function e(t) {
    return t ? po(t) ? bo(t) || t.proxy : e(t.parent) : null
  },
  no = P(Object.create(null), {
    $: function(e) {
      return e
    },
    $el: function(e) {
      return e.__$el || (e.__$el = {})
    },
    $data: function(e) {
      return e.data
    },
    $props: function(e) {
      return Gn(e.props)
    },
    $attrs: function(e) {
      return Gn(e.attrs)
    },
    $slots: function(e) {
      return Gn(e.slots)
    },
    $refs: function(e) {
      return Gn(e.refs)
    },
    $parent: function(e) {
      return to(e.parent)
    },
    $root: function(e) {
      return to(e.root)
    },
    $emit: function(e) {
      return e.emit
    },
    $options: function(e) {
      return Pi(e)
    },
    $forceUpdate: function(e) {
      return function() {
        return Br(e.update)
      }
    },
    $watch: function(e) {
      return oi.bind(e)
    }
  }),
  ro = {
    get: function(e, t) {
      var n, r = e._,
        i = r.ctx,
        o = r.setupState,
        s = r.data,
        a = r.props,
        u = r.accessCache,
        c = r.type,
        f = r.appContext;
      if ("__isVue" === t) return !0;
      if (o !== k && o.__isScriptSetup && C(o, t)) return o[t];
      if ("$" !== t[0]) {
        var h = u[t];
        if (void 0 !== h) switch (h) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return i[t];
          case 3:
            return a[t]
        } else {
          if (o !== k && C(o, t)) return u[t] = 1, o[t];
          if (s !== k && C(s, t)) return u[t] = 2, s[t];
          if ((n = r.propsOptions[0]) && C(n, t)) return u[t] = 3, a[t];
          if (i !== k && C(i, t)) return u[t] = 4, i[t];
          Ti && (u[t] = 0)
        }
      }
      var l, p, d = no[t];
      return d ? ("$attrs" === t && Xt(r, "get", t), d(r)) : (l = c.__cssModules) && (l = l[t]) ? l : i !== k && C(i, t) ? (u[t] = 4, i[t]) : (p = f.config.globalProperties, C(p, t) ? p[t] : void(!Qr || N(t) && 0 === t.indexOf("__v") || (s === k || "$" !== t[0] && "_" !== t[0] || !C(s, t) ? r === Qr && yr("Property ".concat(JSON.stringify(t), " was accessed during render but is not defined on instance.")) : yr("Property ".concat(JSON.stringify(t), ' must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.')))))
    },
    set: function(e, t, n) {
      var r = e._,
        i = r.data,
        o = r.setupState,
        s = r.ctx;
      return o !== k && C(o, t) ? (o[t] = n, !0) : i !== k && C(i, t) ? (i[t] = n, !0) : C(r.props, t) ? (yr('Attempting to mutate prop "'.concat(t, '". Props are readonly.'), r), !1) : "$" === t[0] && t.slice(1) in r ? (yr('Attempting to mutate public property "'.concat(t, '". Properties starting with $ are reserved and readonly.'), r), !1) : (t in r.appContext.config.globalProperties ? Object.defineProperty(s, t, {
        enumerable: !0,
        configurable: !0,
        value: n
      }) : s[t] = n, !0)
    },
    has: function(e, t) {
      var n, r = e._,
        i = r.data,
        o = r.setupState,
        s = r.accessCache,
        a = r.ctx,
        u = r.appContext,
        c = r.propsOptions;
      return !!s[t] || i !== k && C(i, t) || o !== k && C(o, t) || (n = c[0]) && C(n, t) || C(a, t) || C(no, t) || C(u.config.globalProperties, t)
    },
    defineProperty: function(e, t, n) {
      return null != n.get ? e._.accessCache[t] = 0 : C(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
    }
  };
ro.ownKeys = function(e) {
  return yr("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)
};
var io = Zi(),
  oo = 0;

function so(e, t, n) {
  var r = e.type,
    i = (t ? t.appContext : e.appContext) || io,
    o = {
      uid: oo++,
      vnode: e,
      type: r,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new jt(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Li(r, i),
      emitsOptions: Zr(r, i),
      emit: null,
      emitted: null,
      propsDefaults: k,
      inheritAttrs: r.inheritAttrs,
      ctx: k,
      data: k,
      props: k,
      attrs: k,
      slots: k,
      refs: k,
      setupState: k,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return o.ctx = function(e) {
    var t = {};
    return Object.defineProperty(t, "_", {
      configurable: !0,
      enumerable: !1,
      get: function() {
        return e
      }
    }), Object.keys(no).forEach((function(n) {
      Object.defineProperty(t, n, {
        configurable: !0,
        enumerable: !1,
        get: function() {
          return no[n](e)
        },
        set: x
      })
    })), t
  }(o), o.root = t ? t.root : o, o.emit = Yr.bind(null, o), e.ce && e.ce(o), o
}
var ao = null,
  uo = function() {
    return ao || Qr
  },
  co = function(e) {
    ao = e, e.scope.on()
  },
  fo = function() {
    ao && ao.scope.off(), ao = null
  },
  ho = m("slot,component");

function lo(e, t) {
  var n = t.isNativeTag || T;
  (ho(e) || n(e)) && yr("Do not use built-in or reserved HTML elements as component id: " + e)
}

function po(e) {
  return 4 & e.vnode.shapeFlag
}
var vo = !1;

function go(e, t) {
  var n = e.type;
  if (n.name && lo(n.name, e.appContext.config), n.components)
    for (var r = Object.keys(n.components), i = 0; i < r.length; i++) lo(r[i], e.appContext.config);
  if (n.directives)
    for (var o = Object.keys(n.directives), s = 0; s < o.length; s++) Yi(o[s]);
  n.compilerOptions && mo() && yr('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'), e.accessCache = Object.create(null), e.proxy = tr(new Proxy(e.ctx, ro)),
    function(e) {
      var t = e.ctx,
        n = d(e.propsOptions, 1)[0];
      n && Object.keys(n).forEach((function(n) {
        Object.defineProperty(t, n, {
          enumerable: !0,
          configurable: !0,
          get: function() {
            return e.props[n]
          },
          set: x
        })
      }))
    }(e);
  var a = n.setup;
  if (a) {
    var u = e.setupContext = a.length > 1 ? function(e) {
      var t;
      return Object.freeze({
        get attrs() {
          return t || (t = function(e) {
            return new Proxy(e.attrs, {
              get: function(t, n) {
                return Xt(e, "get", "$attrs"), t[n]
              },
              set: function() {
                return yr("setupContext.attrs is readonly."), !1
              },
              deleteProperty: function() {
                return yr("setupContext.attrs is readonly."), !1
              }
            })
          }(e))
        },
        get slots() {
          return Gn(e.slots)
        },
        get emit() {
          return function(t) {
            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
            return e.emit.apply(e, [t].concat(r))
          }
        },
        expose: function(t) {
          e.exposed && yr("expose() should be called only once per setup()."), e.exposed = t || {}
        }
      })
    }(e) : null;
    co(e), Yt();
    var c = kr(a, e, 0, [Gn(e.props), u]);
    Zt(), fo(), B(c) ? (c.then(fo, fo), yr("setup() returned a Promise, but the version of Vue you are using does not support it yet.")) : function(e, t, n) {
      M(t) ? e.render = t : L(t) ? ((r = t) && !0 === r.__v_isVNode && yr("setup() should not return VNodes directly - return a render function instead."), e.devtoolsRawSetupState = t, e.setupState = hr(t), function(e) {
        var t = e.ctx,
          n = e.setupState;
        Object.keys(er(n)).forEach((function(e) {
          if (!n.__isScriptSetup) {
            if ("$" === e[0] || "_" === e[0]) return void yr("setup() return property ".concat(JSON.stringify(e), ' should not start with "$" or "_" which are reserved prefixes for Vue internals.'));
            Object.defineProperty(t, e, {
              enumerable: !0,
              configurable: !0,
              get: function() {
                return n[e]
              },
              set: x
            })
          }
        }))
      }(e)) : void 0 !== t && yr("setup() should return an object. Received: ".concat(null === t ? "null" : h(t)));
      var r;
      yo(e, n)
    }(e, c, t)
  } else yo(e, t)
}
var mo = function() {
  return !0
};

function yo(e, t, n) {
  var r = e.type;
  e.render || (e.render = r.render || x), co(e), Yt(), Ei(e), Zt(), fo(), r.render || e.render !== x || t || (r.template ? yr('Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".') : yr("Component is missing template or render function."))
}

function bo(e) {
  if (e.exposed) return e.exposeProxy || (e.exposeProxy = new Proxy(hr(tr(e.exposed)), {
    get: function(t, n) {
      return n in t ? t[n] : e.proxy[n]
    }
  }))
}
var wo = /(?:^|[-_])(\w)/g,
  _o = function(e) {
    return e.replace(wo, (function(e) {
      return e.toUpperCase()
    })).replace(/[-_]/g, "")
  };

function ko(e) {
  return M(e) && e.displayName || e.name
}

function So(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    r = ko(t);
  if (!r && t.__file) {
    var i = t.__file.match(/([^/\\]+)\.\w+$/);
    i && (r = i[1])
  }
  if (!r && e && e.parent) {
    var o = function(e) {
      for (var n in e)
        if (e[n] === t) return n
    };
    r = o(e.components || e.parent.type.components) || o(e.appContext.components)
  }
  return r ? _o(r) : n ? "App" : "Anonymous"
}
var xo = function(e, t) {
    return function(e, t) {
      var n, r, i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        o = M(e);
      o ? (n = e, r = function() {
        console.warn("Write operation failed: computed value is readonly")
      }) : (n = e.get, r = e.set);
      var s = new dr(n, r, o || !r, i);
      return t && !i && (s.effect.onTrack = t.onTrack, s.effect.onTrigger = t.onTrigger), s
    }(e, t, vo)
  },
  To = "3.2.33";

function Eo(e) {
  return cr(e)
}
var Oo, Ao, Po = "[object Array]",
  Io = "[object Object]";

function Do(e, t) {
  var n = {};
  return function e(t, n) {
      if ((t = Eo(t)) === n) return;
      var r = V(t),
        i = V(n);
      if (r == Io && i == Io)
        for (var o in n) {
          var s = t[o];
          void 0 === s ? t[o] = null : e(s, n[o])
        } else r == Po && i == Po && t.length >= n.length && n.forEach((function(n, r) {
          e(t[r], n)
        }))
    }(e, t),
    function e(t, n, r, i) {
      if ((t = Eo(t)) === n) return;
      var o = V(t),
        s = V(n);
      if (o == Io)
        if (s != Io || Object.keys(t).length < Object.keys(n).length) Co(i, r, t);
        else {
          var a = function(o) {
            var s = Eo(t[o]),
              a = n[o],
              u = V(s),
              c = V(a);
            if (u != Po && u != Io) s != a && Co(i, ("" == r ? "" : r + ".") + o, s);
            else if (u == Po) c != Po || s.length < a.length ? Co(i, ("" == r ? "" : r + ".") + o, s) : s.forEach((function(t, n) {
              e(t, a[n], ("" == r ? "" : r + ".") + o + "[" + n + "]", i)
            }));
            else if (u == Io)
              if (c != Io || Object.keys(s).length < Object.keys(a).length) Co(i, ("" == r ? "" : r + ".") + o, s);
              else
                for (var f in s) e(s[f], a[f], ("" == r ? "" : r + ".") + o + "." + f, i)
          };
          for (var u in t) a(u)
        }
      else o == Po ? s != Po || t.length < n.length ? Co(i, r, t) : t.forEach((function(t, o) {
        e(t, n[o], r + "[" + o + "]", i)
      })) : Co(i, r, t)
    }(e, t, "", n), n
}

function Co(e, t, n) {
  e[t] = n
}

function Ro(e) {
  var t = e.ctx,
    n = t.__next_tick_callbacks;
  if (n && n.length) {
    if ({}.VUE_APP_DEBUG) {
      var r = t.$scope;
      console.log("[" + +new Date + "][" + (r.is || r.route) + "][" + e.uid + "]:flushCallbacks[" + n.length + "]")
    }
    var i = n.slice(0);
    n.length = 0;
    for (var o = 0; o < i.length; o++) i[o]()
  }
}

function $o(e, t) {
  var n, r = e.ctx;
  if (!r.__next_tick_pending && ! function(e) {
      return Ar.includes(e.update)
    }(e)) {
    if ({}.VUE_APP_DEBUG) {
      var i = r.$scope;
      console.log("[" + +new Date + "][" + (i.is || i.route) + "][" + e.uid + "]:nextVueTick")
    }
    return Lr(t && t.bind(e.proxy))
  }
  if ({}.VUE_APP_DEBUG) {
    var o = r.$scope;
    console.log("[" + +new Date + "][" + (o.is || o.route) + "][" + e.uid + "]:nextMPTick")
  }
  return r.__next_tick_callbacks || (r.__next_tick_callbacks = []), r.__next_tick_callbacks.push((function() {
    t ? kr(t.bind(e.proxy), e, 14) : n && n(e.proxy)
  })), new Promise((function(e) {
    n = e
  }))
}

function jo(e) {
  return function e(t, n) {
    t = Eo(t);
    var r = h(t);
    if ("object" === r && null !== t) {
      var i = n.get(t);
      if (void 0 !== i) return i;
      if (R(t)) {
        var o = t.length;
        i = new Array(o), n.set(t, i);
        for (var s = 0; s < o; s++) i[s] = e(t[s], n)
      } else
        for (var a in i = {}, n.set(t, i), t) C(t, a) && (i[a] = e(t[a], n));
      return i
    }
    if ("symbol" !== r) return t
  }(e, "undefined" != typeof WeakMap ? new WeakMap : new Map)
}

function Mo(e, t, n) {
  if (t) {
    t = jo(t);
    var r = e.ctx,
      i = r.mpType;
    if ("page" === i || "component" === i) {
      t.r0 = 1;
      var o = r.$scope,
        s = Object.keys(t),
        a = Do(t, n || function(e, t) {
          var n = e.data,
            r = Object.create(null);
          return t.forEach((function(e) {
            r[e] = n[e]
          })), r
        }(o, s));
      Object.keys(a).length ? (r.__next_tick_pending = !0, o.setData(a, (function() {
        r.__next_tick_pending = !1, Ro(e)
      })), Kr(void 0, e.update)) : Ro(e)
    }
  }
}

function No(e) {
  e.globalProperties.$nextTick = function(e) {
    return $o(this.$, e)
  }
}

function Uo(e, t, n) {
  t.appContext.config.globalProperties.$applyOptions(e, t, n);
  var r = e.computed;
  if (r) {
    var i = Object.keys(r);
    if (i.length) {
      var o, s = t.ctx;
      s.$computedKeys || (s.$computedKeys = []), (o = s.$computedKeys).push.apply(o, i)
    }
  }
  delete t.ctx.$onApplyOptions
}

function Lo(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    n = e.setupState,
    r = e.$templateRefs,
    i = e.ctx,
    o = i.$scope,
    s = i.$mpPlatform;
  if ("mp-alipay" !== s && r && o) {
    if (t) return r.forEach((function(e) {
      return qo(e, null, n)
    }));
    var a = function() {
      var e = o.selectAllComponents(".r").concat(o.selectAllComponents(".r-i-f"));
      r.forEach((function(t) {
        return qo(t, Bo(e, t.i), n)
      }))
    };
    o._$setRef ? o._$setRef(a) : $o(e, a)
  }
}

function Bo(e, t) {
  var n = e.find((function(e) {
    return e && (e.properties || e.props).uI === t
  }));
  if (n) {
    var r = n.$vm;
    return bo(r.$) || r
  }
  return null
}

function qo(e, t, n) {
  var r = e.r,
    i = e.f;
  if (M(r)) r(t, {});
  else {
    var o = N(r),
      s = sr(r);
    if (o || s)
      if (i) {
        if (!s) return;
        R(r.value) || (r.value = []);
        var a = r.value;
        if (-1 === a.indexOf(t)) {
          if (a.push(t), !t) return;
          bi((function() {
            return I(a, t)
          }), t.$)
        }
      } else o ? C(n, r) && (n[r] = t) : sr(r) ? r.value = t : Vo(r);
    else Vo(r)
  }
}

function Vo(e) {
  yr("Invalid template ref type:", e, "(".concat(h(e), ")"))
}(Ao = Oo || (Oo = {})).APP = "app", Ao.PAGE = "page", Ao.COMPONENT = "component";
var Fo = Hr;

function Ho(e, t) {
  var n = e.component = so(e, t.parentComponent, null);
  return n.ctx.$onApplyOptions = Uo, n.ctx.$children = [], "app" === t.mpType && (n.render = x), t.onBeforeSetup && t.onBeforeSetup(n, t), gr(e),
    function(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      vo = t;
      var n = e.vnode.props,
        r = po(e);
      Mi(e, n, r, t);
      var i = r ? go(e, t) : void 0;
      vo = !1
    }(n), t.parentComponent && n.proxy && t.parentComponent.ctx.$children.push(bo(n) || n.proxy),
    function(e) {
      var t = Wo.bind(e);
      e.$updateScopedSlots = function() {
        return Lr((function() {
          return Br(t)
        }))
      };
      var n = e.effect = new zt((function() {
          if (e.isMounted) {
            var t = e.bu,
              n = e.u;
            Go(e, !1),
              function(e) {
                Yt(), Kr(void 0, e.update), Zt()
              }(e), t && ne(t), Go(e, !0), Mo(e, Ko(e)), n && Fo(n)
          } else bi((function() {
            Lo(e, !0)
          }), e), Mo(e, Ko(e))
        }), (function() {
          return Br(e.update)
        }), e.scope),
        r = e.update = n.run.bind(n);
      r.id = e.uid, Go(e, !0), n.onTrack = e.rtc ? function(t) {
        return ne(e.rtc, t)
      } : void 0, n.onTrigger = e.rtg ? function(t) {
        return ne(e.rtg, t)
      } : void 0, r.ownerInstance = e, r()
    }(n), mr(), n.proxy
}

function Ko(e) {
  var t, n = e.type,
    r = e.vnode,
    i = e.proxy,
    o = e.withProxy,
    s = e.props,
    a = d(e.propsOptions, 1)[0],
    u = e.slots,
    c = e.attrs,
    f = e.emit,
    h = e.render,
    l = e.renderCache,
    p = e.data,
    v = e.setupState,
    g = e.ctx,
    m = e.uid,
    y = e.appContext.app.config.globalProperties.pruneComponentPropsCache,
    b = e.inheritAttrs;
  e.$templateRefs = [], e.$ei = 0, y(m), e.__counter = 0 === e.__counter ? 1 : 0;
  var w = ei(e);
  try {
    if (4 & r.shapeFlag) {
      zo(b, s, a, c);
      var _ = o || i;
      t = h.call(_, _, l, s, v, p, g)
    } else {
      zo(b, s, a, n.props ? c : function(e) {
        var t;
        for (var n in e)("class" === n || "style" === n || O(n)) && ((t || (t = {}))[n] = e[n]);
        return t
      }(c));
      var k = n;
      t = k.length > 1 ? k(s, {
        attrs: c,
        slots: u,
        emit: f
      }) : k(s, null)
    }
  } catch (n) {
    xr(n, e, 1), t = !1
  }
  return Lo(e), ei(w), t
}

function zo(e, t, n, r) {
  if (t && r && !1 !== e) {
    var i = Object.keys(r).filter((function(e) {
      return "class" !== e && "style" !== e
    }));
    if (!i.length) return;
    n && i.some(A) ? i.forEach((function(e) {
      A(e) && e.slice(9) in n || (t[e] = r[e])
    })) : i.forEach((function(e) {
      return t[e] = r[e]
    }))
  }
}

function Wo() {
  var e = this.$scopedSlotsData;
  if (e && 0 !== e.length) {
    var t = this.ctx.$scope,
      n = t.data,
      r = Object.create(null);
    e.forEach((function(e) {
      var t = e.path,
        i = e.index,
        o = e.data,
        s = function e(t, n) {
          if (N(n)) {
            var r = (n = n.replace(/\[(\d+)\]/g, ".$1")).split("."),
              i = r[0];
            return t || (t = {}), 1 === r.length ? t[i] : e(t[i], r.slice(1).join("."))
          }
        }(n, t),
        a = "".concat(t, "[").concat(i, "]");
      if (void 0 === s || void 0 === s[i]) r[a] = o;
      else {
        var u = Do(o, s[i]);
        Object.keys(u).forEach((function(e) {
          r[a + "." + e] = u[e]
        }))
      }
    })), e.length = 0, Object.keys(r).length && t.setData(r)
  }
}

function Go(e, t) {
  var n = e.effect,
    r = e.update;
  n.allowRecurse = r.allowRecurse = t
}

function Jo(e) {
  var t = e.bum,
    n = e.scope,
    r = e.update,
    i = e.um;
  t && ne(t), n.stop(), r && (r.active = !1), i && Fo(i), Fo((function() {
    e.isUnmounted = !0
  }))
}
var Yo, Zo = function(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
  M(e) || (e = Object.assign({}, e)), null == t || L(t) || (yr("root props passed to app.mount() must be an object."), t = null);
  var n = Zi(),
    r = new Set,
    i = n.app = {
      _uid: Xi++,
      _component: e,
      _props: t,
      _container: null,
      _context: n,
      _instance: null,
      version: To,
      get config() {
        return n.config
      },
      set config(e) {
        yr("app.config cannot be replaced. Modify individual options instead.")
      },
      use: function(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
        return r.has(e) ? yr("Plugin has already been applied to target app.") : e && M(e.install) ? (r.add(e), e.install.apply(e, [i].concat(n))) : M(e) ? (r.add(e), e.apply(void 0, [i].concat(n))) : yr('A plugin must either be a function or an object with an "install" function.'), i
      },
      mixin: function(e) {
        return n.mixins.includes(e) ? yr("Mixin has already been applied to target app" + (e.name ? ": ".concat(e.name) : "")) : n.mixins.push(e), i
      },
      component: function(e, t) {
        return lo(e, n.config), t ? (n.components[e] && yr('Component "'.concat(e, '" has already been registered in target app.')), n.components[e] = t, i) : n.components[e]
      },
      directive: function(e, t) {
        return Yi(e), t ? (n.directives[e] && yr('Directive "'.concat(e, '" has already been registered in target app.')), n.directives[e] = t, i) : n.directives[e]
      },
      mount: function() {},
      unmount: function() {},
      provide: function(e, t) {
        return e in n.provides && yr('App already provides property with key "'.concat(String(e), '". It will be overwritten with the new value.')), n.provides[e] = t, i
      }
    };
  return i
};

function Xo(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
    n = Zo(e, t),
    r = n._context;
  No(r.config);
  var i = function(e) {
      return e.appContext = r, e.shapeFlag = 6, e
    },
    o = function(e, t) {
      return Ho(i(e), t)
    },
    s = function(e) {
      return e && Jo(e.$)
    };
  return n.mount = function() {
    e.render = x;
    var t = Ho(i({
      type: e
    }), {
      mpType: Oo.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    return t.$app = n, t.$createComponent = o, t.$destroyComponent = s, r.$appInstance = t, t
  }, n.unmount = function() {
    yr("Cannot unmount an app.")
  }, n
}

function Qo(e, t, n, r) {
  M(t) && pi(e, t.bind(n), r)
}

function es(e, t, n) {
  ! function(e, t, n) {
    (e.mpType || n.$mpType) && Object.keys(e).forEach((function(r) {
      if (0 === r.indexOf("on")) {
        var i = e[r];
        R(i) ? i.forEach((function(e) {
          return Qo(r, e, n, t)
        })) : Qo(r, i, n, t)
      }
    }))
  }(e, t, n)
}

function ts(e, t, n) {
  return e[t] = n
}

function ns(e, t, n) {
  if (!t) throw e;
  var r = getApp();
  if (!r || !r.$vm) throw e;
  r.$vm.$callHook("onError", e, n)
}

function rs(e, t) {
  return e ? p(new Set([].concat(e, t))) : t
}
var is = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  os = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

function ss() {
  var e, t, n = Rt.getStorageSync("uni_id_token") || "",
    r = n.split(".");
  if (!n || 3 !== r.length) return {
    uid: null,
    role: [],
    permission: [],
    tokenExpired: 0
  };
  try {
    e = JSON.parse((t = r[1], decodeURIComponent(Yo(t).split("").map((function(e) {
      return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
    })).join(""))))
  } catch (e) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message)
  }
  return e.tokenExpired = 1e3 * e.exp, delete e.exp, delete e.iat, e
}

function as(e) {
  var t, n = e._context.config;
  M(e._component.onError) && (n.errorHandler = ns), t = n.optionMergeStrategies, le.forEach((function(e) {
    t[e] = rs
  }));
  var r = n.globalProperties;
  ! function(e) {
    e.uniIDHasRole = function(e) {
      return ss().role.indexOf(e) > -1
    }, e.uniIDHasPermission = function(e) {
      var t = ss().permission;
      return this.uniIDHasRole("admin") || t.indexOf(e) > -1
    }, e.uniIDTokenValid = function() {
      return ss().tokenExpired > Date.now()
    }
  }(r), r.$set = ts, r.$applyOptions = es, Rt.invokeCreateVueAppHook(e)
}
Yo = "function" != typeof atob ? function(e) {
  if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !os.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t;
  e += "==".slice(2 - (3 & e.length));
  for (var n, r, i = "", o = 0; o < e.length;) t = is.indexOf(e.charAt(o++)) << 18 | is.indexOf(e.charAt(o++)) << 12 | (n = is.indexOf(e.charAt(o++))) << 6 | (r = is.indexOf(e.charAt(o++))), i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === r ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
  return i
} : atob;
var us = Object.create(null);

function cs(e) {
  var t = uo(),
    n = t.uid,
    r = t.__counter;
  return n + "," + ((us[n] || (us[n] = [])).push(function(e) {
    return e ? Qn(e) || "__vInternal" in e ? P({}, e) : e : null
  }(e)) - 1) + "," + r
}

function fs(e) {
  delete us[e]
}

function hs(e) {
  if (e) {
    var t = e.split(","),
      n = d(t, 2),
      r = n[0],
      i = n[1];
    if (us[r]) return us[r][parseInt(i)]
  }
}
var ls = {
  install: function(e) {
    as(e), e.config.globalProperties.pruneComponentPropsCache = fs;
    var t = e.mount;
    e.mount = function(n) {
      var r = t.call(e, n),
        i = function() {
          var e = {}.UNI_MP_PLUGIN ? "createPluginApp" : {}.UNI_SUBPACKAGE ? "createSubpackageApp" : "createApp";
          if ("undefined" != typeof global) return global[e];
          if ("undefined" != typeof my) return my[e]
        }();
      return i ? i(r) : "undefined" != typeof createMiniProgramApp && createMiniProgramApp(r), r
    }
  }
};

function ps(e, t) {
  var n = uo(),
    r = n.ctx,
    i = void 0 === t || "mp-weixin" !== r.$mpPlatform && "mp-qq" !== r.$mpPlatform || !N(t) && "number" != typeof t ? "" : "_" + t,
    o = "e" + n.$ei++ + i,
    s = r.$scope;
  if (!e) return delete s[o], o;
  var a = s[o];
  return a ? a.value = e : s[o] = function(e, t) {
    var n = function e(n) {
      var r;
      (r = n).type && r.target && (r.preventDefault = x, r.stopPropagation = x, r.stopImmediatePropagation = x, C(r, "detail") || (r.detail = {}), C(r, "markerId") && (r.detail = "object" === h(r.detail) ? r.detail : {}, r.detail.markerId = r.markerId), H(r.detail) && C(r.detail, "checked") && !C(r.detail, "value") && (r.detail.value = r.detail.checked), H(r.detail) && (r.target = P({}, r.target, r.detail)));
      var i = [n];
      n.detail && n.detail.__args__ && (i = n.detail.__args__);
      var o = e.value,
        s = function() {
          return Sr(function(e, t) {
            if (R(t)) {
              var n = e.stopImmediatePropagation;
              return e.stopImmediatePropagation = function() {
                n && n.call(e), e._stopped = !0
              }, t.map((function(e) {
                return function(t) {
                  return !t._stopped && e(t)
                }
              }))
            }
            return t
          }(n, o), t, 5, i)
        },
        a = n.target,
        u = !!a && (!!a.dataset && "true" === a.dataset.eventsync);
      if (!ds.includes(n.type) || u) {
        var c = s();
        if ("input" === n.type && (R(c) || B(c))) return;
        return c
      }
      setTimeout(s)
    };
    return n.value = e, n
  }(e, n), o
}
var ds = ["tap", "longpress", "longtap", "transitionend", "animationstart", "animationiteration", "animationend", "touchforcechange"];

function vs(e, t) {
  for (var n = t.parent; n;) {
    var r = n.$ssi;
    if (r && r[e]) return r[e];
    n = n.parent
  }
}

function gs(e) {
  return N(e) ? e : function(e) {
    var t = "";
    if (!e || N(e)) return t;
    for (var n in e) t += "".concat(n.startsWith("--") ? n : X(n), ":").concat(e[n], ";");
    return t
  }(function e(t) {
    if (R(t)) {
      for (var n = {}, r = 0; r < t.length; r++) {
        var i = t[r],
          o = N(i) ? w(i) : e(i);
        if (o)
          for (var s in o) n[s] = o[s]
      }
      return n
    }
    return N(t) || L(t) ? t : void 0
  }(e))
}

function ms(e, t) {
  var n = t.number,
    r = t.trim,
    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  return i ? function() {
    for (var t = arguments.length, i = new Array(t), o = 0; o < t; o++) i[o] = arguments[o];
    return r ? i = i.map((function(e) {
      return e.trim()
    })) : n && (i = i.map(re)), e.apply(void 0, p(i))
  } : function(t) {
    var i = t.detail.value;
    return r ? t.detail.value = i.trim() : n && (t.detail.value = re(i)), e(t)
  }
}
var ys = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    return e && (e.mpType = "app"), Xo(e, t).use(ls)
  },
  bs = {},
  ws = [];
var _s = ["createSelectorQuery", "createIntersectionObserver", "selectAllComponents", "selectComponent"];

function ks(e, t) {
  var n = e.ctx;
  n.mpType = t.mpType, n.$mpType = t.mpType, n.$mpPlatform = "mp-weixin", n.$scope = t.mpInstance, n.$mp = {}, n._self = {}, e.slots = {}, R(t.slots) && t.slots.length && (t.slots.forEach((function(t) {
    e.slots[t] = !0
  })), e.slots.d && (e.slots.default = !0)), n.getOpenerEventChannel = function() {
    return t.mpInstance.getOpenerEventChannel()
  }, n.$hasHook = Ss, n.$callHook = xs, e.emit = function(e, t) {
    return function(n) {
      for (var r = t.$scope, i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) o[s - 1] = arguments[s];
      if (r && n) {
        var a = {
          __args__: o
        };
        r.triggerEvent(n, a)
      }
      return e.apply(this, [n].concat(o))
    }
  }(e.emit, n)
}

function Ss(e) {
  var t = this.$[e];
  return !(!t || !t.length)
}

function xs(e, t) {
  "mounted" === e ? (xs.call(this, "bm"), this.$.isMounted = !0, e = "m") : "onLoad" === e && t && t.__id__ && (this.__eventChannel__ = function(e) {
    if (e) {
      var t = bs[e];
      return delete bs[e], t
    }
    return ws.shift()
  }(t.__id__), delete t.__id__);
  var n = this.$[e];
  return n && function(e, t) {
    for (var n, r = 0; r < e.length; r++) n = e[r](t);
    return n
  }(n, t)
}
var Ts = ["onLoad", "onShow", "onHide", "onUnload", "onResize", "onTabItemTap", "onReachBottom", "onPullDownRefresh", "onAddToFavorites"];

function Es(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Set;
  if (e) {
    Object.keys(e).forEach((function(n) {
      0 === n.indexOf("on") && M(e[n]) && t.add(n)
    }));
    var n = e.extends,
      r = e.mixins;
    r && r.forEach((function(e) {
      return Es(e, t)
    })), n && Es(n, t)
  }
  return t
}

function Os(e, t, n) {
  -1 !== n.indexOf(t) || C(e, t) || (e[t] = function(e) {
    return this.$vm && this.$vm.$callHook(t, e)
  })
}
var As = ["onReady"];

function Ps(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : As;
  t.forEach((function(t) {
    return Os(e, t, n)
  }))
}

function Is(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : As;
  Es(t).forEach((function(t) {
    return Os(e, t, n)
  }))
}
var Ds = se((function() {
  var e = [],
    t = getApp({
      allowDefault: !0
    });
  if (t && t.$vm && t.$vm.$) {
    var n = t.$vm.$.appContext.mixins;
    if (R(n)) {
      var r = Object.keys(pe);
      n.forEach((function(t) {
        r.forEach((function(n) {
          C(t, n) && !e.includes(n) && e.push(n)
        }))
      }))
    }
  }
  return e
}));
var Cs = ["onShow", "onHide", "onError", "onThemeChange", "onPageNotFound", "onUnhandledRejection"];

function Rs(e, t) {
  var n, r, i = e.$,
    o = {
      globalData: e.$options && e.$options.globalData || {},
      $vm: e,
      onLaunch: function(t) {
        this.$vm = e;
        var n = i.ctx;
        this.$vm && n.$scope || (ks(i, {
          mpType: "app",
          mpInstance: this,
          slots: []
        }), n.globalData = this.globalData, e.$callHook("onLaunch", t))
      }
    };
  n = e, r = ar(wx.getSystemInfoSync().language || "zh-Hans"), Object.defineProperty(n, "$locale", {
    get: function() {
      return r.value
    },
    set: function(e) {
      r.value = e
    }
  });
  var s = e.$.type;
  Ps(o, Cs), Is(o, s);
  var a = s.methods;
  return a && P(o, a), t && t.parse(o), o
}

function $s(e, t) {
  if (M(e.onLaunch)) {
    var n = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    e.onLaunch(n)
  }
  M(e.onShow) && wx.onAppShow && wx.onAppShow((function(e) {
    t.$callHook("onShow", e)
  })), M(e.onHide) && wx.onAppHide && wx.onAppHide((function(e) {
    t.$callHook("onHide", e)
  }))
}
var js = ["externalClasses"];
var Ms = ["eO", "uR", "uRIF", "uI", "uT", "uP", "uS"];

function Ns(e) {
  e.properties || (e.properties = {}), P(e.properties, function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
      t = {};
    return e || (Ms.forEach((function(e) {
      t[e] = {
        type: null,
        value: ""
      }
    })), t.uS = {
      type: null,
      value: [],
      observer: function(e) {
        var t = Object.create(null);
        e && e.forEach((function(e) {
          t[e] = !0
        })), this.setData({
          $slots: t
        })
      }
    }), t
  }())
}
var Us, Ls, Bs = [String, Number, Boolean, Object, Array, null];

function qs(e, t) {
  var n = function(e, t) {
    return R(e) && 1 === e.length ? e[0] : e
  }(e);
  return -1 !== Bs.indexOf(n) ? n : null
}

function Vs(e, t) {
  return (t ? function(e) {
    var t = {};
    H(e) && Object.keys(e).forEach((function(n) {
      -1 === Ms.indexOf(n) && (t[n] = e[n])
    }));
    return t
  }(e) : hs(e.uP)) || {}
}

function Fs(e) {
  e.observers || (e.observers = {}), e.observers.uP = function() {
    var e = this.properties.uP;
    e && (this.$vm ? function(e, t) {
      var n = er(t.props),
        r = hs(e) || {};
      Hs(n, r) && (! function(e, t, n, r) {
        var i = e.props,
          o = e.attrs,
          s = e.vnode.patchFlag,
          a = er(i),
          u = d(e.propsOptions, 1)[0],
          c = !1;
        if (e.type.__hmrId || e.parent && e.parent.type.__hmrId || !(r || s > 0) || 16 & s) {
          var f;
          for (var h in Ni(e, t, i, o) && (c = !0), a) t && (C(t, h) || (f = X(h)) !== h && C(t, f)) || (u ? !n || void 0 === n[h] && void 0 === n[f] || (i[h] = Ui(u, a, h, void 0, e, !0)) : delete i[h]);
          if (o !== a)
            for (var l in o) t && C(t, l) || (delete o[l], c = !0)
        } else if (8 & s)
          for (var p = e.vnode.dynamicProps, v = 0; v < p.length; v++) {
            var g = p[v];
            if (!Xr(e.emitsOptions, g)) {
              var m = t[g];
              if (u)
                if (C(o, g)) m !== o[g] && (o[g] = m, c = !0);
                else {
                  var y = Y(g);
                  i[y] = Ui(u, a, y, m, e, !1)
                }
              else m !== o[g] && (o[g] = m, c = !0)
            }
          }
        c && en(e, "set", "$attrs"), Hi(t || {}, i, e)
      }(t, r, n, !1), i = t.update, (o = Ar.indexOf(i)) > Pr && Ar.splice(o, 1), t.update());
      var i, o
    }(e, this.$vm.$) : "m" === this.properties.uT && function(e, t) {
      var n = t.properties,
        r = hs(e) || {};
      Hs(n, r, !1) && t.setData(r)
    }(e, this))
  }
}

function Hs(e, t) {
  var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
    r = Object.keys(t);
  if (n && r.length !== Object.keys(e).length) return !0;
  for (var i = 0; i < r.length; i++) {
    var o = r[i];
    if (t[o] !== e[o]) return !0
  }
  return !1
}

function Ks(e, t) {
  e.data = {}, e.behaviors = function(e) {
    var t = e.behaviors,
      n = e.props;
    n || (e.props = n = []);
    var r = [];
    return R(t) && t.forEach((function(e) {
      r.push(e.replace("uni://", "wx://")), "uni://form-field" === e && (R(n) ? (n.push("name"), n.push("value")) : (n.name = {
        type: String,
        default: ""
      }, n.value = {
        type: [String, Number, Boolean, Array, Object, Date],
        default: ""
      }))
    })), r
  }(t)
}

function zs(e, t) {
  var n = t.parse,
    r = t.mocks,
    i = t.isPage,
    o = t.initRelation,
    s = t.handleLink,
    a = t.initLifetimes,
    u = {
      multipleSlots: !0,
      addGlobalClass: !0,
      pureDataPattern: /^uP$/
    };
  (e = e.default || e).options && P(u, e.options);
  var c, f, h = {
    options: u,
    lifetimes: a({
      mocks: r,
      isPage: i,
      initRelation: o,
      vueOptions: e
    }),
    pageLifetimes: {
      show: function() {
        this.$vm && this.$vm.$callHook("onPageShow")
      },
      hide: function() {
        this.$vm && this.$vm.$callHook("onPageHide")
      },
      resize: function(e) {
        this.$vm && this.$vm.$callHook("onPageResize", e)
      }
    },
    methods: {
      __l: s
    }
  };
  return Ks(h, e), Ns(h), Fs(h),
    function(e, t) {
      js.forEach((function(n) {
        C(t, n) && (e[n] = t[n])
      }))
    }(h, e), c = h.methods, f = e.wxsCallMethods, R(f) && f.forEach((function(e) {
      c[e] = function(t) {
        return this.$vm[e](t)
      }
    })), n && n(h, {
      handleLink: s
    }), h
}

function Ws(e, t) {
  Us || (Us = ({}.UNI_MP_PLUGIN ? wx.$vm : {}.UNI_SUBPACKAGE ? wx.$subpackages[{}.UNI_SUBPACKAGE].$vm : getApp().$vm).$createComponent);
  var n = Us(e, t);
  return bo(n.$) || n
}

function Gs(e, t) {
  var n, r, i, o = t.parse,
    s = t.mocks,
    a = t.isPage,
    u = t.initRelation,
    c = t.handleLink,
    f = zs(e, {
      mocks: s,
      isPage: a,
      initRelation: u,
      handleLink: c,
      initLifetimes: t.initLifetimes
    });
  n = f, r = (e.default || e).props, i = n.properties, R(r) ? r.forEach((function(e) {
    i[e] = {
      type: String,
      value: ""
    }
  })) : H(r) && Object.keys(r).forEach((function(e) {
    var t = r[e];
    if (H(t)) {
      var n = t.default;
      M(n) && (n = n());
      var o = t.type;
      t.type = qs(o), i[e] = {
        type: t.type,
        value: n
      }
    } else i[e] = {
      type: qs(t)
    }
  }));
  var h, l, p = f.methods;
  return p.onLoad = function(e) {
      var t;
      return this.options = e, this.$page = {
        fullPath: (t = this.route + ue(e), function(e) {
          return 0 === e.indexOf("/")
        }(t) ? t : "/" + t)
      }, this.$vm && this.$vm.$callHook("onLoad", e)
    }, Ps(p, Ts), Is(p, e), h = p, (l = e.__runtimeHooks) && Object.keys(pe).forEach((function(e) {
      l & pe[e] && Os(h, e, [])
    })),
    function(e) {
      Ps(e, Ds())
    }(p), o && o(f, {
      handleLink: c
    }), f
}
var Js = Page,
  Ys = Component;

function Zs(e) {
  var t = e.triggerEvent;
  e.triggerEvent = function(n) {
    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
    return t.apply(e, [oe(n)].concat(i))
  }
}

function Xs(e, t, n) {
  var r = t[e];
  t[e] = r ? function() {
    Zs(this);
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return r.apply(this, t)
  } : function() {
    Zs(this)
  }
}
Page = function(e) {
  return Xs("onLoad", e), Js(e)
}, Component = function(e) {
  return Xs("created", e), e.properties && e.properties.uP || (Ns(e), Fs(e)), Ys(e)
};
var Qs, ea, ta = Object.freeze({
    __proto__: null,
    mocks: ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"],
    isPage: function(e) {
      return !!e.route
    },
    initRelation: function(e, t) {
      e.triggerEvent("__l", t)
    },
    handleLink: function(e) {
      var t, n = e.detail || e.value,
        r = n.vuePid;
      r && (t = function e(t, n) {
        for (var r, i = t.$children, o = i.length - 1; o >= 0; o--) {
          var s = i[o];
          if (s.$scope._$vueId === n) return s
        }
        for (var a = i.length - 1; a >= 0; a--)
          if (r = e(i[a], n)) return r
      }(this.$vm, r)), t || (t = this.$vm), n.parent = t
    },
    initLifetimes: function(e) {
      var t = e.mocks,
        n = e.isPage,
        r = e.initRelation,
        i = e.vueOptions;
      return {
        attached: function() {
          var e = this.properties;
          ! function(e, t) {
            if (e) {
              var n = e.split(","),
                r = n.length;
              1 === r ? t._$vueId = n[0] : 2 === r && (t._$vueId = n[0], t._$vuePid = n[1])
            }
          }(e.uI, this);
          var o = {
            vuePid: this._$vuePid
          };
          r(this, o);
          var s = this,
            a = n(s),
            u = e;
          this.$vm = Ws({
            type: i,
            props: Vs(u, a)
          }, {
            mpType: a ? "page" : "component",
            mpInstance: s,
            slots: e.uS || {},
            parentComponent: o.parent && o.parent.$,
            onBeforeSetup: function(e, n) {
              ! function(e, t) {
                Object.defineProperty(e, "refs", {
                  get: function() {
                    var e = {};
                    return function(e, t, n) {
                      e.selectAllComponents(t).forEach((function(e) {
                        var t = e.properties.uR;
                        n[t] = e.$vm || e
                      }))
                    }(t, ".r", e), t.selectAllComponents(".r-i-f").forEach((function(t) {
                      var n = t.properties.uR;
                      n && (e[n] || (e[n] = []), e[n].push(t.$vm || t))
                    })), e
                  }
                })
              }(e, s),
              function(e, t, n) {
                var r = e.ctx;
                n.forEach((function(n) {
                  C(t, n) && (e[n] = r[n] = t[n])
                }))
              }(e, s, t),
              function(e, t) {
                ks(e, t);
                var n = e.ctx;
                _s.forEach((function(e) {
                  n[e] = function() {
                    var t = n.$scope;
                    if (t && t[e]) {
                      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
                      return t[e].apply(t, i)
                    }
                  }
                }))
              }(e, n)
            }
          })
        },
        ready: function() {
          this.$vm && (this.$vm.$callHook("mounted"), this.$vm.$callHook("onReady"))
        },
        detached: function() {
          var e;
          this.$vm && (fs(this.$vm.$.uid), e = this.$vm, Ls || (Ls = getApp().$vm.$destroyComponent), Ls(e))
        }
      }
    }
  }),
  na = function(e) {
    return App(Rs(e, Qs))
  },
  ra = (ea = ta, function(e) {
    return Component(Gs(e, ea))
  }),
  ia = function(e) {
    return function(t) {
      return Component(zs(t, e))
    }
  }(ta),
  oa = function(e) {
    return function(t) {
      $s(Rs(t, e), t), {}.UNI_MP_PLUGIN && (wx.$vm = t)
    }
  }(),
  sa = function(e) {
    return function(t) {
      var n = Rs(t, e),
        r = getApp({
          allowDefault: !0
        });
      t.$.ctx.$scope = r;
      var i = r.globalData;
      i && Object.keys(n.globalData).forEach((function(e) {
        C(i, e) || (i[e] = n.globalData[e])
      })), Object.keys(n).forEach((function(e) {
        C(r, e) || (r[e] = n[e])
      })), $s(n, t), {}.UNI_SUBPACKAGE && ((wx.$subpackages || (wx.$subpackages = {}))[{}.UNI_SUBPACKAGE] = {
        $vm: t
      })
    }
  }();
wx.createApp = global.createApp = na, wx.createPage = ra, wx.createComponent = ia, wx.createPluginApp = global.createPluginApp = oa, wx.createSubpackageApp = global.createSubpackageApp = sa;
var aa, ua, ca, fa, ha, la, pa = function(e) {
    return function(t) {
      var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : uo();
      !vo && pi(e, t, n)
    }
  },
  da = pa("onShow"),
  va = pa("onHide"),
  ga = pa("onLoad"),
  ma = pa("onUnload"),
  ya = pa("onReachBottom"),
  ba = pa("onPullDownRefresh"),
  wa = pa("onShareAppMessage"),
  _a = ("undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self, {
    exports: {}
  }),
  ka = _a.exports = function() {
    var e = "millisecond",
      t = "second",
      n = "minute",
      r = "hour",
      i = "day",
      o = "week",
      s = "month",
      a = "quarter",
      u = "year",
      c = "date",
      f = "Invalid Date",
      l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      p = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      d = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(e) {
          var t = ["th", "st", "nd", "rd"],
            n = e % 100;
          return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]"
        }
      },
      v = function(e, t, n) {
        var r = String(e);
        return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e
      },
      g = {
        s: v,
        z: function(e) {
          var t = -e.utcOffset(),
            n = Math.abs(t),
            r = Math.floor(n / 60),
            i = n % 60;
          return (t <= 0 ? "+" : "-") + v(r, 2, "0") + ":" + v(i, 2, "0")
        },
        m: function e(t, n) {
          if (t.date() < n.date()) return -e(n, t);
          var r = 12 * (n.year() - t.year()) + (n.month() - t.month()),
            i = t.clone().add(r, s),
            o = n - i < 0,
            a = t.clone().add(r + (o ? -1 : 1), s);
          return +(-(r + (n - i) / (o ? i - a : a - i)) || 0)
        },
        a: function(e) {
          return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
        },
        p: function(f) {
          return {
            M: s,
            y: u,
            w: o,
            d: i,
            D: c,
            h: r,
            m: n,
            s: t,
            ms: e,
            Q: a
          } [f] || String(f || "").toLowerCase().replace(/s$/, "")
        },
        u: function(e) {
          return void 0 === e
        }
      },
      m = "en",
      y = {};
    y[m] = d;
    var b = "$isDayjsObject",
      w = function(e) {
        return e instanceof x || !(!e || !e[b])
      },
      _ = function e(t, n, r) {
        var i;
        if (!t) return m;
        if ("string" == typeof t) {
          var o = t.toLowerCase();
          y[o] && (i = o), n && (y[o] = n, i = o);
          var s = t.split("-");
          if (!i && s.length > 1) return e(s[0])
        } else {
          var a = t.name;
          y[a] = t, i = a
        }
        return !r && i && (m = i), i || !r && m
      },
      k = function(e, t) {
        if (w(e)) return e.clone();
        var n = "object" == h(t) ? t : {};
        return n.date = e, n.args = arguments, new x(n)
      },
      S = g;
    S.l = _, S.i = w, S.w = function(e, t) {
      return k(e, {
        locale: t.$L,
        utc: t.$u,
        x: t.$x,
        $offset: t.$offset
      })
    };
    var x = function() {
        function h(e) {
          this.$L = _(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[b] = !0
        }
        var d = h.prototype;
        return d.parse = function(e) {
          this.$d = function(e) {
            var t = e.date,
              n = e.utc;
            if (null === t) return new Date(NaN);
            if (S.u(t)) return new Date;
            if (t instanceof Date) return new Date(t);
            if ("string" == typeof t && !/Z$/i.test(t)) {
              var r = t.match(l);
              if (r) {
                var i = r[2] - 1 || 0,
                  o = (r[7] || "0").substring(0, 3);
                return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, o)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, o)
              }
            }
            return new Date(t)
          }(e), this.init()
        }, d.init = function() {
          var e = this.$d;
          this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds()
        }, d.$utils = function() {
          return S
        }, d.isValid = function() {
          return !(this.$d.toString() === f)
        }, d.isSame = function(e, t) {
          var n = k(e);
          return this.startOf(t) <= n && n <= this.endOf(t)
        }, d.isAfter = function(e, t) {
          return k(e) < this.startOf(t)
        }, d.isBefore = function(e, t) {
          return this.endOf(t) < k(e)
        }, d.$g = function(e, t, n) {
          return S.u(e) ? this[t] : this.set(n, e)
        }, d.unix = function() {
          return Math.floor(this.valueOf() / 1e3)
        }, d.valueOf = function() {
          return this.$d.getTime()
        }, d.startOf = function(e, a) {
          var f = this,
            h = !!S.u(a) || a,
            l = S.p(e),
            p = function(e, t) {
              var n = S.w(f.$u ? Date.UTC(f.$y, t, e) : new Date(f.$y, t, e), f);
              return h ? n : n.endOf(i)
            },
            d = function(e, t) {
              return S.w(f.toDate()[e].apply(f.toDate("s"), (h ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), f)
            },
            v = this.$W,
            g = this.$M,
            m = this.$D,
            y = "set" + (this.$u ? "UTC" : "");
          switch (l) {
            case u:
              return h ? p(1, 0) : p(31, 11);
            case s:
              return h ? p(1, g) : p(0, g + 1);
            case o:
              var b = this.$locale().weekStart || 0,
                w = (v < b ? v + 7 : v) - b;
              return p(h ? m - w : m + (6 - w), g);
            case i:
            case c:
              return d(y + "Hours", 0);
            case r:
              return d(y + "Minutes", 1);
            case n:
              return d(y + "Seconds", 2);
            case t:
              return d(y + "Milliseconds", 3);
            default:
              return this.clone()
          }
        }, d.endOf = function(e) {
          return this.startOf(e, !1)
        }, d.$set = function(o, a) {
          var f, h = S.p(o),
            l = "set" + (this.$u ? "UTC" : ""),
            p = (f = {}, f[i] = l + "Date", f[c] = l + "Date", f[s] = l + "Month", f[u] = l + "FullYear", f[r] = l + "Hours", f[n] = l + "Minutes", f[t] = l + "Seconds", f[e] = l + "Milliseconds", f)[h],
            d = h === i ? this.$D + (a - this.$W) : a;
          if (h === s || h === u) {
            var v = this.clone().set(c, 1);
            v.$d[p](d), v.init(), this.$d = v.set(c, Math.min(this.$D, v.daysInMonth())).$d
          } else p && this.$d[p](d);
          return this.init(), this
        }, d.set = function(e, t) {
          return this.clone().$set(e, t)
        }, d.get = function(e) {
          return this[S.p(e)]()
        }, d.add = function(e, a) {
          var c, f = this;
          e = Number(e);
          var h = S.p(a),
            l = function(t) {
              var n = k(f);
              return S.w(n.date(n.date() + Math.round(t * e)), f)
            };
          if (h === s) return this.set(s, this.$M + e);
          if (h === u) return this.set(u, this.$y + e);
          if (h === i) return l(1);
          if (h === o) return l(7);
          var p = (c = {}, c[n] = 6e4, c[r] = 36e5, c[t] = 1e3, c)[h] || 1,
            d = this.$d.getTime() + e * p;
          return S.w(d, this)
        }, d.subtract = function(e, t) {
          return this.add(-1 * e, t)
        }, d.format = function(e) {
          var t = this,
            n = this.$locale();
          if (!this.isValid()) return n.invalidDate || f;
          var r = e || "YYYY-MM-DDTHH:mm:ssZ",
            i = S.z(this),
            o = this.$H,
            s = this.$m,
            a = this.$M,
            u = n.weekdays,
            c = n.months,
            h = n.meridiem,
            l = function(e, n, i, o) {
              return e && (e[n] || e(t, r)) || i[n].slice(0, o)
            },
            d = function(e) {
              return S.s(o % 12 || 12, e, "0")
            },
            v = h || function(e, t, n) {
              var r = e < 12 ? "AM" : "PM";
              return n ? r.toLowerCase() : r
            };
          return r.replace(p, (function(e, r) {
            return r || function(e) {
              switch (e) {
                case "YY":
                  return String(t.$y).slice(-2);
                case "YYYY":
                  return S.s(t.$y, 4, "0");
                case "M":
                  return a + 1;
                case "MM":
                  return S.s(a + 1, 2, "0");
                case "MMM":
                  return l(n.monthsShort, a, c, 3);
                case "MMMM":
                  return l(c, a);
                case "D":
                  return t.$D;
                case "DD":
                  return S.s(t.$D, 2, "0");
                case "d":
                  return String(t.$W);
                case "dd":
                  return l(n.weekdaysMin, t.$W, u, 2);
                case "ddd":
                  return l(n.weekdaysShort, t.$W, u, 3);
                case "dddd":
                  return u[t.$W];
                case "H":
                  return String(o);
                case "HH":
                  return S.s(o, 2, "0");
                case "h":
                  return d(1);
                case "hh":
                  return d(2);
                case "a":
                  return v(o, s, !0);
                case "A":
                  return v(o, s, !1);
                case "m":
                  return String(s);
                case "mm":
                  return S.s(s, 2, "0");
                case "s":
                  return String(t.$s);
                case "ss":
                  return S.s(t.$s, 2, "0");
                case "SSS":
                  return S.s(t.$ms, 3, "0");
                case "Z":
                  return i
              }
              return null
            }(e) || i.replace(":", "")
          }))
        }, d.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }, d.diff = function(e, c, f) {
          var h, l = this,
            p = S.p(c),
            d = k(e),
            v = 6e4 * (d.utcOffset() - this.utcOffset()),
            g = this - d,
            m = function() {
              return S.m(l, d)
            };
          switch (p) {
            case u:
              h = m() / 12;
              break;
            case s:
              h = m();
              break;
            case a:
              h = m() / 3;
              break;
            case o:
              h = (g - v) / 6048e5;
              break;
            case i:
              h = (g - v) / 864e5;
              break;
            case r:
              h = g / 36e5;
              break;
            case n:
              h = g / 6e4;
              break;
            case t:
              h = g / 1e3;
              break;
            default:
              h = g
          }
          return f ? h : S.a(h)
        }, d.daysInMonth = function() {
          return this.endOf(s).$D
        }, d.$locale = function() {
          return y[this.$L]
        }, d.locale = function(e, t) {
          if (!e) return this.$L;
          var n = this.clone(),
            r = _(e, t, !0);
          return r && (n.$L = r), n
        }, d.clone = function() {
          return S.w(this.$d, this)
        }, d.toDate = function() {
          return new Date(this.valueOf())
        }, d.toJSON = function() {
          return this.isValid() ? this.toISOString() : null
        }, d.toISOString = function() {
          return this.$d.toISOString()
        }, d.toString = function() {
          return this.$d.toUTCString()
        }, h
      }(),
      T = x.prototype;
    return k.prototype = T, [
      ["$ms", e],
      ["$s", t],
      ["$m", n],
      ["$H", r],
      ["$W", i],
      ["$M", s],
      ["$y", u],
      ["$D", c]
    ].forEach((function(e) {
      T[e[1]] = function(t) {
        return this.$g(t, e[0], e[1])
      }
    })), k.extend = function(e, t) {
      return e.$i || (e(t, x, k), e.$i = !0), k
    }, k.locale = _, k.isDayjs = w, k.unix = function(e) {
      return k(1e3 * e)
    }, k.en = y[m], k.Ls = y, k.p = {}, k
  }();
(ua = aa || (aa = {})).pop = "pop", ua.push = "push", (fa = ca || (ca = {})).back = "back", fa.forward = "forward", fa.unknown = "", (la = ha || (ha = {}))[la.aborted = 4] = "aborted", la[la.cancelled = 8] = "cancelled", la[la.duplicated = 16] = "duplicated";
var Sa = Symbol("route location");

function xa(e) {
  return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(e)
}

function Ta(e, t) {
  return e & t
}

function Ea(e, t) {
  return e | t
}

function Oa(e, t) {
  return e ^ t
}

function Aa(e, t) {
  return e & ~t
}

function Pa(e) {
  if (0 == e) return -1;
  var t = 0;
  return 0 == (65535 & e) && (e >>= 16, t += 16), 0 == (255 & e) && (e >>= 8, t += 8), 0 == (15 & e) && (e >>= 4, t += 4), 0 == (3 & e) && (e >>= 2, t += 2), 0 == (1 & e) && ++t, t
}

function Ia(e) {
  for (var t = 0; 0 != e;) e &= e - 1, ++t;
  return t
}
var Da, Ca = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function Ra(e) {
  var t, n, r = "";
  for (t = 0; t + 3 <= e.length; t += 3) n = parseInt(e.substring(t, t + 3), 16), r += Ca.charAt(n >> 6) + Ca.charAt(63 & n);
  for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16), r += Ca.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16), r += Ca.charAt(n >> 2) + Ca.charAt((3 & n) << 4));
    (3 & r.length) > 0;) r += "=";
  return r
}

function $a(e) {
  var t, n = "",
    r = 0,
    i = 0;
  for (t = 0; t < e.length && "=" != e.charAt(t); ++t) {
    var o = Ca.indexOf(e.charAt(t));
    o < 0 || (0 == r ? (n += xa(o >> 2), i = 3 & o, r = 1) : 1 == r ? (n += xa(i << 2 | o >> 4), i = 15 & o, r = 2) : 2 == r ? (n += xa(i), n += xa(o >> 2), i = 3 & o, r = 3) : (n += xa(i << 2 | o >> 4), n += xa(15 & o), r = 0))
  }
  return 1 == r && (n += xa(i << 2)), n
}
var ja, Ma = function(e) {
    var t;
    if (void 0 === Da) {
      var n = "0123456789ABCDEF";
      for (Da = {}, t = 0; t < 16; ++t) Da[n.charAt(t)] = t;
      for (n = n.toLowerCase(), t = 10; t < 16; ++t) Da[n.charAt(t)] = t;
      for (t = 0; t < " \f\n\r\t \u2028\u2029".length; ++t) Da[" \f\n\r\t \u2028\u2029".charAt(t)] = -1
    }
    var r = [],
      i = 0,
      o = 0;
    for (t = 0; t < e.length; ++t) {
      var s = e.charAt(t);
      if ("=" == s) break;
      if (-1 != (s = Da[s])) {
        if (void 0 === s) throw new Error("Illegal character at offset " + t);
        i |= s, ++o >= 2 ? (r[r.length] = i, i = 0, o = 0) : i <<= 4
      }
    }
    if (o) throw new Error("Hex encoding incomplete: 4 bits missing");
    return r
  },
  Na = {
    decode: function(e) {
      var t;
      if (void 0 === ja) {
        for (ja = Object.create(null), t = 0; t < 64; ++t) ja["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t)] = t;
        for (ja["-"] = 62, ja._ = 63, t = 0; t < "= \f\n\r\t \u2028\u2029".length; ++t) ja["= \f\n\r\t \u2028\u2029".charAt(t)] = -1
      }
      var n = [],
        r = 0,
        i = 0;
      for (t = 0; t < e.length; ++t) {
        var o = e.charAt(t);
        if ("=" == o) break;
        if (-1 != (o = ja[o])) {
          if (void 0 === o) throw new Error("Illegal character at offset " + t);
          r |= o, ++i >= 4 ? (n[n.length] = r >> 16, n[n.length] = r >> 8 & 255, n[n.length] = 255 & r, r = 0, i = 0) : r <<= 6
        }
      }
      switch (i) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          n[n.length] = r >> 10;
          break;
        case 3:
          n[n.length] = r >> 16, n[n.length] = r >> 8 & 255
      }
      return n
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(e) {
      var t = Na.re.exec(e);
      if (t)
        if (t[1]) e = t[1];
        else {
          if (!t[2]) throw new Error("RegExp out of sync");
          e = t[2]
        } return Na.decode(e)
    }
  },
  Ua = 1e13,
  La = function() {
    function e(e) {
      this.buf = [+e || 0]
    }
    return e.prototype.mulAdd = function(e, t) {
      var n, r, i = this.buf,
        o = i.length;
      for (n = 0; n < o; ++n)(r = i[n] * e + t) < Ua ? t = 0 : r -= (t = 0 | r / Ua) * Ua, i[n] = r;
      t > 0 && (i[n] = t)
    }, e.prototype.sub = function(e) {
      var t, n, r = this.buf,
        i = r.length;
      for (t = 0; t < i; ++t)(n = r[t] - e) < 0 ? (n += Ua, e = 1) : e = 0, r[t] = n;
      for (; 0 === r[r.length - 1];) r.pop()
    }, e.prototype.toString = function(e) {
      if (10 != (e || 10)) throw new Error("only base 10 is supported");
      for (var t = this.buf, n = t[t.length - 1].toString(), r = t.length - 2; r >= 0; --r) n += (Ua + t[r]).toString().substring(1);
      return n
    }, e.prototype.valueOf = function() {
      for (var e = this.buf, t = 0, n = e.length - 1; n >= 0; --n) t = t * Ua + e[n];
      return t
    }, e.prototype.simplify = function() {
      var e = this.buf;
      return 1 == e.length ? e[0] : this
    }, e
  }(),
  Ba = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
  qa = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

function Va(e, t) {
  return e.length > t && (e = e.substring(0, t) + "…"), e
}
var Fa, Ha = function() {
    function e(t, n) {
      this.hexDigits = "0123456789ABCDEF", t instanceof e ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = n)
    }
    return e.prototype.get = function(e) {
      if (void 0 === e && (e = this.pos++), e >= this.enc.length) throw new Error("Requesting byte offset " + e + " on a stream of length " + this.enc.length);
      return "string" == typeof this.enc ? this.enc.charCodeAt(e) : this.enc[e]
    }, e.prototype.hexByte = function(e) {
      return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
    }, e.prototype.hexDump = function(e, t, n) {
      for (var r = "", i = e; i < t; ++i)
        if (r += this.hexByte(this.get(i)), !0 !== n) switch (15 & i) {
          case 7:
            r += "  ";
            break;
          case 15:
            r += "\n";
            break;
          default:
            r += " "
        }
      return r
    }, e.prototype.isASCII = function(e, t) {
      for (var n = e; n < t; ++n) {
        var r = this.get(n);
        if (r < 32 || r > 176) return !1
      }
      return !0
    }, e.prototype.parseStringISO = function(e, t) {
      for (var n = "", r = e; r < t; ++r) n += String.fromCharCode(this.get(r));
      return n
    }, e.prototype.parseStringUTF = function(e, t) {
      for (var n = "", r = e; r < t;) {
        var i = this.get(r++);
        n += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
      }
      return n
    }, e.prototype.parseStringBMP = function(e, t) {
      for (var n, r, i = "", o = e; o < t;) n = this.get(o++), r = this.get(o++), i += String.fromCharCode(n << 8 | r);
      return i
    }, e.prototype.parseTime = function(e, t, n) {
      var r = this.parseStringISO(e, t),
        i = (n ? Ba : qa).exec(r);
      return i ? (n && (i[1] = +i[1], i[1] += +i[1] < 70 ? 2e3 : 1900), r = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4], i[5] && (r += ":" + i[5], i[6] && (r += ":" + i[6], i[7] && (r += "." + i[7]))), i[8] && (r += " UTC", "Z" != i[8] && (r += i[8], i[9] && (r += ":" + i[9]))), r) : "Unrecognized time: " + r
    }, e.prototype.parseInteger = function(e, t) {
      for (var n, r = this.get(e), i = r > 127, o = i ? 255 : 0, s = ""; r == o && ++e < t;) r = this.get(e);
      if (0 === (n = t - e)) return i ? -1 : 0;
      if (n > 4) {
        for (s = r, n <<= 3; 0 == (128 & (+s ^ o));) s = +s << 1, --n;
        s = "(" + n + " bit)\n"
      }
      i && (r -= 256);
      for (var a = new La(r), u = e + 1; u < t; ++u) a.mulAdd(256, this.get(u));
      return s + a.toString()
    }, e.prototype.parseBitString = function(e, t, n) {
      for (var r = this.get(e), i = "(" + ((t - e - 1 << 3) - r) + " bit)\n", o = "", s = e + 1; s < t; ++s) {
        for (var a = this.get(s), u = s == t - 1 ? r : 0, c = 7; c >= u; --c) o += a >> c & 1 ? "1" : "0";
        if (o.length > n) return i + Va(o, n)
      }
      return i + o
    }, e.prototype.parseOctetString = function(e, t, n) {
      if (this.isASCII(e, t)) return Va(this.parseStringISO(e, t), n);
      var r = t - e,
        i = "(" + r + " byte)\n";
      r > (n /= 2) && (t = e + n);
      for (var o = e; o < t; ++o) i += this.hexByte(this.get(o));
      return r > n && (i += "…"), i
    }, e.prototype.parseOID = function(e, t, n) {
      for (var r = "", i = new La, o = 0, s = e; s < t; ++s) {
        var a = this.get(s);
        if (i.mulAdd(128, 127 & a), o += 7, !(128 & a)) {
          if ("" === r)
            if ((i = i.simplify()) instanceof La) i.sub(80), r = "2." + i.toString();
            else {
              var u = i < 80 ? i < 40 ? 0 : 1 : 2;
              r = u + "." + (i - 40 * u)
            }
          else r += "." + i.toString();
          if (r.length > n) return Va(r, n);
          i = new La, o = 0
        }
      }
      return o > 0 && (r += ".incomplete"), r
    }, e
  }(),
  Ka = function() {
    function e(e, t, n, r, i) {
      if (!(r instanceof za)) throw new Error("Invalid tag value.");
      this.stream = e, this.header = t, this.length = n, this.tag = r, this.sub = i
    }
    return e.prototype.typeName = function() {
      switch (this.tag.tagClass) {
        case 0:
          switch (this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            case 20:
              return "TeletexString";
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString"
          }
          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        case 3:
          return "Private_" + this.tag.tagNumber.toString()
      }
    }, e.prototype.content = function(e) {
      if (void 0 === this.tag) return null;
      void 0 === e && (e = 1 / 0);
      var t = this.posContent(),
        n = Math.abs(this.length);
      if (!this.tag.isUniversal()) return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + n, e);
      switch (this.tag.tagNumber) {
        case 1:
          return 0 === this.stream.get(t) ? "false" : "true";
        case 2:
          return this.stream.parseInteger(t, t + n);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(t, t + n, e);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + n, e);
        case 6:
          return this.stream.parseOID(t, t + n, e);
        case 16:
        case 17:
          return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
          return Va(this.stream.parseStringUTF(t, t + n), e);
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 26:
          return Va(this.stream.parseStringISO(t, t + n), e);
        case 30:
          return Va(this.stream.parseStringBMP(t, t + n), e);
        case 23:
        case 24:
          return this.stream.parseTime(t, t + n, 23 == this.tag.tagNumber)
      }
      return null
    }, e.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
    }, e.prototype.toPrettyString = function(e) {
      void 0 === e && (e = "");
      var t = e + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0 && (t += "+"), t += this.length, this.tag.tagConstructed ? t += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (t += " (encapsulates)"), t += "\n", null !== this.sub) {
        e += "  ";
        for (var n = 0, r = this.sub.length; n < r; ++n) t += this.sub[n].toPrettyString(e)
      }
      return t
    }, e.prototype.posStart = function() {
      return this.stream.pos
    }, e.prototype.posContent = function() {
      return this.stream.pos + this.header
    }, e.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length)
    }, e.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
    }, e.decodeLength = function(e) {
      var t = e.get(),
        n = 127 & t;
      if (n == t) return n;
      if (n > 6) throw new Error("Length over 48 bits not supported at position " + (e.pos - 1));
      if (0 === n) return null;
      t = 0;
      for (var r = 0; r < n; ++r) t = 256 * t + e.get();
      return t
    }, e.prototype.getHexStringValue = function() {
      var e = this.toHexString(),
        t = 2 * this.header,
        n = 2 * this.length;
      return e.substr(t, n)
    }, e.decode = function(t) {
      var n;
      n = t instanceof Ha ? t : new Ha(t, 0);
      var r = new Ha(n),
        i = new za(n),
        o = e.decodeLength(n),
        s = n.pos,
        a = s - r.pos,
        u = null,
        c = function() {
          var t = [];
          if (null !== o) {
            for (var r = s + o; n.pos < r;) t[t.length] = e.decode(n);
            if (n.pos != r) throw new Error("Content size is not correct for container starting at offset " + s)
          } else try {
            for (;;) {
              var i = e.decode(n);
              if (i.tag.isEOC()) break;
              t[t.length] = i
            }
            o = s - n.pos
          } catch (e) {
            throw new Error("Exception while decoding undefined length content: " + e)
          }
          return t
        };
      if (i.tagConstructed) u = c();
      else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber)) try {
        if (3 == i.tagNumber && 0 != n.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
        u = c();
        for (var f = 0; f < u.length; ++f)
          if (u[f].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.")
      } catch (e) {
        u = null
      }
      if (null === u) {
        if (null === o) throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
        n.pos = s + Math.abs(o)
      }
      return new e(r, a, o, i, u)
    }, e
  }(),
  za = function() {
    function e(e) {
      var t = e.get();
      if (this.tagClass = t >> 6, this.tagConstructed = 0 != (32 & t), this.tagNumber = 31 & t, 31 == this.tagNumber) {
        var n = new La;
        do {
          t = e.get(), n.mulAdd(128, 127 & t)
        } while (128 & t);
        this.tagNumber = n.simplify()
      }
    }
    return e.prototype.isUniversal = function() {
      return 0 === this.tagClass
    }, e.prototype.isEOC = function() {
      return 0 === this.tagClass && 0 === this.tagNumber
    }, e
  }(),
  Wa = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
  Ga = (1 << 26) / Wa[Wa.length - 1],
  Ja = function() {
    function e(e, t, n) {
      null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
    }
    return e.prototype.toString = function(e) {
      if (this.s < 0) return "-" + this.negate().toString(e);
      var t;
      if (16 == e) t = 4;
      else if (8 == e) t = 3;
      else if (2 == e) t = 1;
      else if (32 == e) t = 5;
      else {
        if (4 != e) return this.toRadix(e);
        t = 2
      }
      var n, r = (1 << t) - 1,
        i = !1,
        o = "",
        s = this.t,
        a = this.DB - s * this.DB % t;
      if (s-- > 0)
        for (a < this.DB && (n = this[s] >> a) > 0 && (i = !0, o = xa(n)); s >= 0;) a < t ? (n = (this[s] & (1 << a) - 1) << t - a, n |= this[--s] >> (a += this.DB - t)) : (n = this[s] >> (a -= t) & r, a <= 0 && (a += this.DB, --s)), n > 0 && (i = !0), i && (o += xa(n));
      return i ? o : "0"
    }, e.prototype.negate = function() {
      var t = eu();
      return e.ZERO.subTo(this, t), t
    }, e.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this
    }, e.prototype.compareTo = function(e) {
      var t = this.s - e.s;
      if (0 != t) return t;
      var n = this.t;
      if (0 != (t = n - e.t)) return this.s < 0 ? -t : t;
      for (; --n >= 0;)
        if (0 != (t = this[n] - e[n])) return t;
      return 0
    }, e.prototype.bitLength = function() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + uu(this[this.t - 1] ^ this.s & this.DM)
    }, e.prototype.mod = function(t) {
      var n = eu();
      return this.abs().divRemTo(t, null, n), this.s < 0 && n.compareTo(e.ZERO) > 0 && t.subTo(n, n), n
    }, e.prototype.modPowInt = function(e, t) {
      var n;
      return n = e < 256 || t.isEven() ? new Za(t) : new Xa(t), this.exp(e, n)
    }, e.prototype.clone = function() {
      var e = eu();
      return this.copyTo(e), e
    }, e.prototype.intValue = function() {
      if (this.s < 0) {
        if (1 == this.t) return this[0] - this.DV;
        if (0 == this.t) return -1
      } else {
        if (1 == this.t) return this[0];
        if (0 == this.t) return 0
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
    }, e.prototype.byteValue = function() {
      return 0 == this.t ? this.s : this[0] << 24 >> 24
    }, e.prototype.shortValue = function() {
      return 0 == this.t ? this.s : this[0] << 16 >> 16
    }, e.prototype.signum = function() {
      return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
    }, e.prototype.toByteArray = function() {
      var e = this.t,
        t = [];
      t[0] = this.s;
      var n, r = this.DB - e * this.DB % 8,
        i = 0;
      if (e-- > 0)
        for (r < this.DB && (n = this[e] >> r) != (this.s & this.DM) >> r && (t[i++] = n | this.s << this.DB - r); e >= 0;) r < 8 ? (n = (this[e] & (1 << r) - 1) << 8 - r, n |= this[--e] >> (r += this.DB - 8)) : (n = this[e] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --e)), 0 != (128 & n) && (n |= -256), 0 == i && (128 & this.s) != (128 & n) && ++i, (i > 0 || n != this.s) && (t[i++] = n);
      return t
    }, e.prototype.equals = function(e) {
      return 0 == this.compareTo(e)
    }, e.prototype.min = function(e) {
      return this.compareTo(e) < 0 ? this : e
    }, e.prototype.max = function(e) {
      return this.compareTo(e) > 0 ? this : e
    }, e.prototype.and = function(e) {
      var t = eu();
      return this.bitwiseTo(e, Ta, t), t
    }, e.prototype.or = function(e) {
      var t = eu();
      return this.bitwiseTo(e, Ea, t), t
    }, e.prototype.xor = function(e) {
      var t = eu();
      return this.bitwiseTo(e, Oa, t), t
    }, e.prototype.andNot = function(e) {
      var t = eu();
      return this.bitwiseTo(e, Aa, t), t
    }, e.prototype.not = function() {
      for (var e = eu(), t = 0; t < this.t; ++t) e[t] = this.DM & ~this[t];
      return e.t = this.t, e.s = ~this.s, e
    }, e.prototype.shiftLeft = function(e) {
      var t = eu();
      return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
    }, e.prototype.shiftRight = function(e) {
      var t = eu();
      return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
    }, e.prototype.getLowestSetBit = function() {
      for (var e = 0; e < this.t; ++e)
        if (0 != this[e]) return e * this.DB + Pa(this[e]);
      return this.s < 0 ? this.t * this.DB : -1
    }, e.prototype.bitCount = function() {
      for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n) e += Ia(this[n] ^ t);
      return e
    }, e.prototype.testBit = function(e) {
      var t = Math.floor(e / this.DB);
      return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
    }, e.prototype.setBit = function(e) {
      return this.changeBit(e, Ea)
    }, e.prototype.clearBit = function(e) {
      return this.changeBit(e, Aa)
    }, e.prototype.flipBit = function(e) {
      return this.changeBit(e, Oa)
    }, e.prototype.add = function(e) {
      var t = eu();
      return this.addTo(e, t), t
    }, e.prototype.subtract = function(e) {
      var t = eu();
      return this.subTo(e, t), t
    }, e.prototype.multiply = function(e) {
      var t = eu();
      return this.multiplyTo(e, t), t
    }, e.prototype.divide = function(e) {
      var t = eu();
      return this.divRemTo(e, t, null), t
    }, e.prototype.remainder = function(e) {
      var t = eu();
      return this.divRemTo(e, null, t), t
    }, e.prototype.divideAndRemainder = function(e) {
      var t = eu(),
        n = eu();
      return this.divRemTo(e, t, n), [t, n]
    }, e.prototype.modPow = function(e, t) {
      var n, r, i = e.bitLength(),
        o = au(1);
      if (i <= 0) return o;
      n = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6, r = i < 8 ? new Za(t) : t.isEven() ? new Qa(t) : new Xa(t);
      var s = [],
        a = 3,
        u = n - 1,
        c = (1 << n) - 1;
      if (s[1] = r.convert(this), n > 1) {
        var f = eu();
        for (r.sqrTo(s[1], f); a <= c;) s[a] = eu(), r.mulTo(f, s[a - 2], s[a]), a += 2
      }
      var h, l, p = e.t - 1,
        d = !0,
        v = eu();
      for (i = uu(e[p]) - 1; p >= 0;) {
        for (i >= u ? h = e[p] >> i - u & c : (h = (e[p] & (1 << i + 1) - 1) << u - i, p > 0 && (h |= e[p - 1] >> this.DB + i - u)), a = n; 0 == (1 & h);) h >>= 1, --a;
        if ((i -= a) < 0 && (i += this.DB, --p), d) s[h].copyTo(o), d = !1;
        else {
          for (; a > 1;) r.sqrTo(o, v), r.sqrTo(v, o), a -= 2;
          a > 0 ? r.sqrTo(o, v) : (l = o, o = v, v = l), r.mulTo(v, s[h], o)
        }
        for (; p >= 0 && 0 == (e[p] & 1 << i);) r.sqrTo(o, v), l = o, o = v, v = l, --i < 0 && (i = this.DB - 1, --p)
      }
      return r.revert(o)
    }, e.prototype.modInverse = function(t) {
      var n = t.isEven();
      if (this.isEven() && n || 0 == t.signum()) return e.ZERO;
      for (var r = t.clone(), i = this.clone(), o = au(1), s = au(0), a = au(0), u = au(1); 0 != r.signum();) {
        for (; r.isEven();) r.rShiftTo(1, r), n ? (o.isEven() && s.isEven() || (o.addTo(this, o), s.subTo(t, s)), o.rShiftTo(1, o)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);
        for (; i.isEven();) i.rShiftTo(1, i), n ? (a.isEven() && u.isEven() || (a.addTo(this, a), u.subTo(t, u)), a.rShiftTo(1, a)) : u.isEven() || u.subTo(t, u), u.rShiftTo(1, u);
        r.compareTo(i) >= 0 ? (r.subTo(i, r), n && o.subTo(a, o), s.subTo(u, s)) : (i.subTo(r, i), n && a.subTo(o, a), u.subTo(s, u))
      }
      return 0 != i.compareTo(e.ONE) ? e.ZERO : u.compareTo(t) >= 0 ? u.subtract(t) : u.signum() < 0 ? (u.addTo(t, u), u.signum() < 0 ? u.add(t) : u) : u
    }, e.prototype.pow = function(e) {
      return this.exp(e, new Ya)
    }, e.prototype.gcd = function(e) {
      var t = this.s < 0 ? this.negate() : this.clone(),
        n = e.s < 0 ? e.negate() : e.clone();
      if (t.compareTo(n) < 0) {
        var r = t;
        t = n, n = r
      }
      var i = t.getLowestSetBit(),
        o = n.getLowestSetBit();
      if (o < 0) return t;
      for (i < o && (o = i), o > 0 && (t.rShiftTo(o, t), n.rShiftTo(o, n)); t.signum() > 0;)(i = t.getLowestSetBit()) > 0 && t.rShiftTo(i, t), (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n), t.compareTo(n) >= 0 ? (t.subTo(n, t), t.rShiftTo(1, t)) : (n.subTo(t, n), n.rShiftTo(1, n));
      return o > 0 && n.lShiftTo(o, n), n
    }, e.prototype.isProbablePrime = function(e) {
      var t, n = this.abs();
      if (1 == n.t && n[0] <= Wa[Wa.length - 1]) {
        for (t = 0; t < Wa.length; ++t)
          if (n[0] == Wa[t]) return !0;
        return !1
      }
      if (n.isEven()) return !1;
      for (t = 1; t < Wa.length;) {
        for (var r = Wa[t], i = t + 1; i < Wa.length && r < Ga;) r *= Wa[i++];
        for (r = n.modInt(r); t < i;)
          if (r % Wa[t++] == 0) return !1
      }
      return n.millerRabin(e)
    }, e.prototype.copyTo = function(e) {
      for (var t = this.t - 1; t >= 0; --t) e[t] = this[t];
      e.t = this.t, e.s = this.s
    }, e.prototype.fromInt = function(e) {
      this.t = 1, this.s = e < 0 ? -1 : 0, e > 0 ? this[0] = e : e < -1 ? this[0] = e + this.DV : this.t = 0
    }, e.prototype.fromString = function(t, n) {
      var r;
      if (16 == n) r = 4;
      else if (8 == n) r = 3;
      else if (256 == n) r = 8;
      else if (2 == n) r = 1;
      else if (32 == n) r = 5;
      else {
        if (4 != n) return void this.fromRadix(t, n);
        r = 2
      }
      this.t = 0, this.s = 0;
      for (var i = t.length, o = !1, s = 0; --i >= 0;) {
        var a = 8 == r ? 255 & +t[i] : su(t, i);
        a < 0 ? "-" == t.charAt(i) && (o = !0) : (o = !1, 0 == s ? this[this.t++] = a : s + r > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s, this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s, (s += r) >= this.DB && (s -= this.DB))
      }
      8 == r && 0 != (128 & +t[0]) && (this.s = -1, s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), o && e.ZERO.subTo(this, this)
    }, e.prototype.clamp = function() {
      for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e;) --this.t
    }, e.prototype.dlShiftTo = function(e, t) {
      var n;
      for (n = this.t - 1; n >= 0; --n) t[n + e] = this[n];
      for (n = e - 1; n >= 0; --n) t[n] = 0;
      t.t = this.t + e, t.s = this.s
    }, e.prototype.drShiftTo = function(e, t) {
      for (var n = e; n < this.t; ++n) t[n - e] = this[n];
      t.t = Math.max(this.t - e, 0), t.s = this.s
    }, e.prototype.lShiftTo = function(e, t) {
      for (var n = e % this.DB, r = this.DB - n, i = (1 << r) - 1, o = Math.floor(e / this.DB), s = this.s << n & this.DM, a = this.t - 1; a >= 0; --a) t[a + o + 1] = this[a] >> r | s, s = (this[a] & i) << n;
      for (a = o - 1; a >= 0; --a) t[a] = 0;
      t[o] = s, t.t = this.t + o + 1, t.s = this.s, t.clamp()
    }, e.prototype.rShiftTo = function(e, t) {
      t.s = this.s;
      var n = Math.floor(e / this.DB);
      if (n >= this.t) t.t = 0;
      else {
        var r = e % this.DB,
          i = this.DB - r,
          o = (1 << r) - 1;
        t[0] = this[n] >> r;
        for (var s = n + 1; s < this.t; ++s) t[s - n - 1] |= (this[s] & o) << i, t[s - n] = this[s] >> r;
        r > 0 && (t[this.t - n - 1] |= (this.s & o) << i), t.t = this.t - n, t.clamp()
      }
    }, e.prototype.subTo = function(e, t) {
      for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i;) r += this[n] - e[n], t[n++] = r & this.DM, r >>= this.DB;
      if (e.t < this.t) {
        for (r -= e.s; n < this.t;) r += this[n], t[n++] = r & this.DM, r >>= this.DB;
        r += this.s
      } else {
        for (r += this.s; n < e.t;) r -= e[n], t[n++] = r & this.DM, r >>= this.DB;
        r -= e.s
      }
      t.s = r < 0 ? -1 : 0, r < -1 ? t[n++] = this.DV + r : r > 0 && (t[n++] = r), t.t = n, t.clamp()
    }, e.prototype.multiplyTo = function(t, n) {
      var r = this.abs(),
        i = t.abs(),
        o = r.t;
      for (n.t = o + i.t; --o >= 0;) n[o] = 0;
      for (o = 0; o < i.t; ++o) n[o + r.t] = r.am(0, i[o], n, o, 0, r.t);
      n.s = 0, n.clamp(), this.s != t.s && e.ZERO.subTo(n, n)
    }, e.prototype.squareTo = function(e) {
      for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0;) e[n] = 0;
      for (n = 0; n < t.t - 1; ++n) {
        var r = t.am(n, t[n], e, 2 * n, 0, 1);
        (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, r, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV, e[n + t.t + 1] = 1)
      }
      e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)), e.s = 0, e.clamp()
    }, e.prototype.divRemTo = function(t, n, r) {
      var i = t.abs();
      if (!(i.t <= 0)) {
        var o = this.abs();
        if (o.t < i.t) return null != n && n.fromInt(0), void(null != r && this.copyTo(r));
        null == r && (r = eu());
        var s = eu(),
          a = this.s,
          u = t.s,
          c = this.DB - uu(i[i.t - 1]);
        c > 0 ? (i.lShiftTo(c, s), o.lShiftTo(c, r)) : (i.copyTo(s), o.copyTo(r));
        var f = s.t,
          h = s[f - 1];
        if (0 != h) {
          var l = h * (1 << this.F1) + (f > 1 ? s[f - 2] >> this.F2 : 0),
            p = this.FV / l,
            d = (1 << this.F1) / l,
            v = 1 << this.F2,
            g = r.t,
            m = g - f,
            y = null == n ? eu() : n;
          for (s.dlShiftTo(m, y), r.compareTo(y) >= 0 && (r[r.t++] = 1, r.subTo(y, r)), e.ONE.dlShiftTo(f, y), y.subTo(s, s); s.t < f;) s[s.t++] = 0;
          for (; --m >= 0;) {
            var b = r[--g] == h ? this.DM : Math.floor(r[g] * p + (r[g - 1] + v) * d);
            if ((r[g] += s.am(0, b, r, m, 0, f)) < b)
              for (s.dlShiftTo(m, y), r.subTo(y, r); r[g] < --b;) r.subTo(y, r)
          }
          null != n && (r.drShiftTo(f, n), a != u && e.ZERO.subTo(n, n)), r.t = f, r.clamp(), c > 0 && r.rShiftTo(c, r), a < 0 && e.ZERO.subTo(r, r)
        }
      }
    }, e.prototype.invDigit = function() {
      if (this.t < 1) return 0;
      var e = this[0];
      if (0 == (1 & e)) return 0;
      var t = 3 & e;
      return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
    }, e.prototype.isEven = function() {
      return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }, e.prototype.exp = function(t, n) {
      if (t > 4294967295 || t < 1) return e.ONE;
      var r = eu(),
        i = eu(),
        o = n.convert(this),
        s = uu(t) - 1;
      for (o.copyTo(r); --s >= 0;)
        if (n.sqrTo(r, i), (t & 1 << s) > 0) n.mulTo(i, o, r);
        else {
          var a = r;
          r = i, i = a
        } return n.revert(r)
    }, e.prototype.chunkSize = function(e) {
      return Math.floor(Math.LN2 * this.DB / Math.log(e))
    }, e.prototype.toRadix = function(e) {
      if (null == e && (e = 10), 0 == this.signum() || e < 2 || e > 36) return "0";
      var t = this.chunkSize(e),
        n = Math.pow(e, t),
        r = au(n),
        i = eu(),
        o = eu(),
        s = "";
      for (this.divRemTo(r, i, o); i.signum() > 0;) s = (n + o.intValue()).toString(e).substr(1) + s, i.divRemTo(r, i, o);
      return o.intValue().toString(e) + s
    }, e.prototype.fromRadix = function(t, n) {
      this.fromInt(0), null == n && (n = 10);
      for (var r = this.chunkSize(n), i = Math.pow(n, r), o = !1, s = 0, a = 0, u = 0; u < t.length; ++u) {
        var c = su(t, u);
        c < 0 ? "-" == t.charAt(u) && 0 == this.signum() && (o = !0) : (a = n * a + c, ++s >= r && (this.dMultiply(i), this.dAddOffset(a, 0), s = 0, a = 0))
      }
      s > 0 && (this.dMultiply(Math.pow(n, s)), this.dAddOffset(a, 0)), o && e.ZERO.subTo(this, this)
    }, e.prototype.fromNumber = function(t, n, r) {
      if ("number" == typeof n)
        if (t < 2) this.fromInt(1);
        else
          for (this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), Ea, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(e.ONE.shiftLeft(t - 1), this);
      else {
        var i = [],
          o = 7 & t;
        i.length = 1 + (t >> 3), n.nextBytes(i), o > 0 ? i[0] &= (1 << o) - 1 : i[0] = 0, this.fromString(i, 256)
      }
    }, e.prototype.bitwiseTo = function(e, t, n) {
      var r, i, o = Math.min(e.t, this.t);
      for (r = 0; r < o; ++r) n[r] = t(this[r], e[r]);
      if (e.t < this.t) {
        for (i = e.s & this.DM, r = o; r < this.t; ++r) n[r] = t(this[r], i);
        n.t = this.t
      } else {
        for (i = this.s & this.DM, r = o; r < e.t; ++r) n[r] = t(i, e[r]);
        n.t = e.t
      }
      n.s = t(this.s, e.s), n.clamp()
    }, e.prototype.changeBit = function(t, n) {
      var r = e.ONE.shiftLeft(t);
      return this.bitwiseTo(r, n, r), r
    }, e.prototype.addTo = function(e, t) {
      for (var n = 0, r = 0, i = Math.min(e.t, this.t); n < i;) r += this[n] + e[n], t[n++] = r & this.DM, r >>= this.DB;
      if (e.t < this.t) {
        for (r += e.s; n < this.t;) r += this[n], t[n++] = r & this.DM, r >>= this.DB;
        r += this.s
      } else {
        for (r += this.s; n < e.t;) r += e[n], t[n++] = r & this.DM, r >>= this.DB;
        r += e.s
      }
      t.s = r < 0 ? -1 : 0, r > 0 ? t[n++] = r : r < -1 && (t[n++] = this.DV + r), t.t = n, t.clamp()
    }, e.prototype.dMultiply = function(e) {
      this[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
    }, e.prototype.dAddOffset = function(e, t) {
      if (0 != e) {
        for (; this.t <= t;) this[this.t++] = 0;
        for (this[t] += e; this[t] >= this.DV;) this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t]
      }
    }, e.prototype.multiplyLowerTo = function(e, t, n) {
      var r = Math.min(this.t + e.t, t);
      for (n.s = 0, n.t = r; r > 0;) n[--r] = 0;
      for (var i = n.t - this.t; r < i; ++r) n[r + this.t] = this.am(0, e[r], n, r, 0, this.t);
      for (i = Math.min(e.t, t); r < i; ++r) this.am(0, e[r], n, r, 0, t - r);
      n.clamp()
    }, e.prototype.multiplyUpperTo = function(e, t, n) {
      --t;
      var r = n.t = this.t + e.t - t;
      for (n.s = 0; --r >= 0;) n[r] = 0;
      for (r = Math.max(t - this.t, 0); r < e.t; ++r) n[this.t + r - t] = this.am(t - r, e[r], n, 0, 0, this.t + r - t);
      n.clamp(), n.drShiftTo(1, n)
    }, e.prototype.modInt = function(e) {
      if (e <= 0) return 0;
      var t = this.DV % e,
        n = this.s < 0 ? e - 1 : 0;
      if (this.t > 0)
        if (0 == t) n = this[0] % e;
        else
          for (var r = this.t - 1; r >= 0; --r) n = (t * n + this[r]) % e;
      return n
    }, e.prototype.millerRabin = function(t) {
      var n = this.subtract(e.ONE),
        r = n.getLowestSetBit();
      if (r <= 0) return !1;
      var i = n.shiftRight(r);
      (t = t + 1 >> 1) > Wa.length && (t = Wa.length);
      for (var o = eu(), s = 0; s < t; ++s) {
        o.fromInt(Wa[Math.floor(Math.random() * Wa.length)]);
        var a = o.modPow(i, this);
        if (0 != a.compareTo(e.ONE) && 0 != a.compareTo(n)) {
          for (var u = 1; u++ < r && 0 != a.compareTo(n);)
            if (0 == (a = a.modPowInt(2, this)).compareTo(e.ONE)) return !1;
          if (0 != a.compareTo(n)) return !1
        }
      }
      return !0
    }, e.prototype.square = function() {
      var e = eu();
      return this.squareTo(e), e
    }, e.prototype.gcda = function(e, t) {
      var n = this.s < 0 ? this.negate() : this.clone(),
        r = e.s < 0 ? e.negate() : e.clone();
      if (n.compareTo(r) < 0) {
        var i = n;
        n = r, r = i
      }
      var o = n.getLowestSetBit(),
        s = r.getLowestSetBit();
      if (s < 0) t(n);
      else {
        o < s && (s = o), s > 0 && (n.rShiftTo(s, n), r.rShiftTo(s, r));
        setTimeout((function e() {
          (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n), (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r), n.compareTo(r) >= 0 ? (n.subTo(r, n), n.rShiftTo(1, n)) : (r.subTo(n, r), r.rShiftTo(1, r)), n.signum() > 0 ? setTimeout(e, 0) : (s > 0 && r.lShiftTo(s, r), setTimeout((function() {
            t(r)
          }), 0))
        }), 10)
      }
    }, e.prototype.fromNumberAsync = function(t, n, r, i) {
      if ("number" == typeof n)
        if (t < 2) this.fromInt(1);
        else {
          this.fromNumber(t, r), this.testBit(t - 1) || this.bitwiseTo(e.ONE.shiftLeft(t - 1), Ea, this), this.isEven() && this.dAddOffset(1, 0);
          var o = this;
          setTimeout((function r() {
            o.dAddOffset(2, 0), o.bitLength() > t && o.subTo(e.ONE.shiftLeft(t - 1), o), o.isProbablePrime(n) ? setTimeout((function() {
              i()
            }), 0) : setTimeout(r, 0)
          }), 0)
        }
      else {
        var s = [],
          a = 7 & t;
        s.length = 1 + (t >> 3), n.nextBytes(s), a > 0 ? s[0] &= (1 << a) - 1 : s[0] = 0, this.fromString(s, 256)
      }
    }, e
  }(),
  Ya = function() {
    function e() {}
    return e.prototype.convert = function(e) {
      return e
    }, e.prototype.revert = function(e) {
      return e
    }, e.prototype.mulTo = function(e, t, n) {
      e.multiplyTo(t, n)
    }, e.prototype.sqrTo = function(e, t) {
      e.squareTo(t)
    }, e
  }(),
  Za = function() {
    function e(e) {
      this.m = e
    }
    return e.prototype.convert = function(e) {
      return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
    }, e.prototype.revert = function(e) {
      return e
    }, e.prototype.reduce = function(e) {
      e.divRemTo(this.m, null, e)
    }, e.prototype.mulTo = function(e, t, n) {
      e.multiplyTo(t, n), this.reduce(n)
    }, e.prototype.sqrTo = function(e, t) {
      e.squareTo(t), this.reduce(t)
    }, e
  }(),
  Xa = function() {
    function e(e) {
      this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
    }
    return e.prototype.convert = function(e) {
      var t = eu();
      return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(Ja.ZERO) > 0 && this.m.subTo(t, t), t
    }, e.prototype.revert = function(e) {
      var t = eu();
      return e.copyTo(t), this.reduce(t), t
    }, e.prototype.reduce = function(e) {
      for (; e.t <= this.mt2;) e[e.t++] = 0;
      for (var t = 0; t < this.m.t; ++t) {
        var n = 32767 & e[t],
          r = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
        for (e[n = t + this.m.t] += this.m.am(0, r, e, t, 0, this.m.t); e[n] >= e.DV;) e[n] -= e.DV, e[++n]++
      }
      e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
    }, e.prototype.mulTo = function(e, t, n) {
      e.multiplyTo(t, n), this.reduce(n)
    }, e.prototype.sqrTo = function(e, t) {
      e.squareTo(t), this.reduce(t)
    }, e
  }(),
  Qa = function() {
    function e(e) {
      this.m = e, this.r2 = eu(), this.q3 = eu(), Ja.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e)
    }
    return e.prototype.convert = function(e) {
      if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
      if (e.compareTo(this.m) < 0) return e;
      var t = eu();
      return e.copyTo(t), this.reduce(t), t
    }, e.prototype.revert = function(e) {
      return e
    }, e.prototype.reduce = function(e) {
      for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;) e.dAddOffset(1, this.m.t + 1);
      for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;) e.subTo(this.m, e)
    }, e.prototype.mulTo = function(e, t, n) {
      e.multiplyTo(t, n), this.reduce(n)
    }, e.prototype.sqrTo = function(e, t) {
      e.squareTo(t), this.reduce(t)
    }, e
  }();

function eu() {
  return new Ja(null)
}

function tu(e, t) {
  return new Ja(e, t)
}
var nu = "undefined" != typeof navigator;
nu && "Microsoft Internet Explorer" == navigator.appName ? (Ja.prototype.am = function(e, t, n, r, i, o) {
  for (var s = 32767 & t, a = t >> 15; --o >= 0;) {
    var u = 32767 & this[e],
      c = this[e++] >> 15,
      f = a * u + c * s;
    i = ((u = s * u + ((32767 & f) << 15) + n[r] + (1073741823 & i)) >>> 30) + (f >>> 15) + a * c + (i >>> 30), n[r++] = 1073741823 & u
  }
  return i
}, Fa = 30) : nu && "Netscape" != navigator.appName ? (Ja.prototype.am = function(e, t, n, r, i, o) {
  for (; --o >= 0;) {
    var s = t * this[e++] + n[r] + i;
    i = Math.floor(s / 67108864), n[r++] = 67108863 & s
  }
  return i
}, Fa = 26) : (Ja.prototype.am = function(e, t, n, r, i, o) {
  for (var s = 16383 & t, a = t >> 14; --o >= 0;) {
    var u = 16383 & this[e],
      c = this[e++] >> 14,
      f = a * u + c * s;
    i = ((u = s * u + ((16383 & f) << 14) + n[r] + i) >> 28) + (f >> 14) + a * c, n[r++] = 268435455 & u
  }
  return i
}, Fa = 28), Ja.prototype.DB = Fa, Ja.prototype.DM = (1 << Fa) - 1, Ja.prototype.DV = 1 << Fa;
Ja.prototype.FV = Math.pow(2, 52), Ja.prototype.F1 = 52 - Fa, Ja.prototype.F2 = 2 * Fa - 52;
var ru, iu, ou = [];
for (ru = "0".charCodeAt(0), iu = 0; iu <= 9; ++iu) ou[ru++] = iu;
for (ru = "a".charCodeAt(0), iu = 10; iu < 36; ++iu) ou[ru++] = iu;
for (ru = "A".charCodeAt(0), iu = 10; iu < 36; ++iu) ou[ru++] = iu;

function su(e, t) {
  var n = ou[e.charCodeAt(t)];
  return null == n ? -1 : n
}

function au(e) {
  var t = eu();
  return t.fromInt(e), t
}

function uu(e) {
  var t, n = 1;
  return 0 != (t = e >>> 16) && (e = t, n += 16), 0 != (t = e >> 8) && (e = t, n += 8), 0 != (t = e >> 4) && (e = t, n += 4), 0 != (t = e >> 2) && (e = t, n += 2), 0 != (t = e >> 1) && (e = t, n += 1), n
}
Ja.ZERO = au(0), Ja.ONE = au(1);
var cu = function() {
  function e() {
    this.i = 0, this.j = 0, this.S = []
  }
  return e.prototype.init = function(e) {
    var t, n, r;
    for (t = 0; t < 256; ++t) this.S[t] = t;
    for (n = 0, t = 0; t < 256; ++t) n = n + this.S[t] + e[t % e.length] & 255, r = this.S[t], this.S[t] = this.S[n], this.S[n] = r;
    this.i = 0, this.j = 0
  }, e.prototype.next = function() {
    var e;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, e = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = e, this.S[e + this.S[this.i] & 255]
  }, e
}();
var fu, hu, lu = null;

function pu() {
  if (null == fu) {
    for (fu = new cu; hu < 256;) {
      var e = Math.floor(65536 * Math.random());
      lu[hu++] = 255 & e
    }
    for (fu.init(lu), hu = 0; hu < lu.length; ++hu) lu[hu] = 0;
    hu = 0
  }
  return fu.next()
}
null == lu && (lu = [], hu = 0);
var du = function() {
  function e() {}
  return e.prototype.nextBytes = function(e) {
    for (var t = 0; t < e.length; ++t) e[t] = pu()
  }, e
}();
var vu = function() {
  function e() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
  }
  return e.prototype.doPublic = function(e) {
    return e.modPowInt(this.e, this.n)
  }, e.prototype.doPrivate = function(e) {
    if (null == this.p || null == this.q) return e.modPow(this.d, this.n);
    for (var t = e.mod(this.p).modPow(this.dmp1, this.p), n = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(n) < 0;) t = t.add(this.p);
    return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
  }, e.prototype.setPublic = function(e, t) {
    null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = tu(e, 16), this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
  }, e.prototype.encrypt = function(e) {
    var t = this.n.bitLength() + 7 >> 3,
      n = function(e, t) {
        if (t < e.length + 11) return console.error("Message too long for RSA"), null;
        for (var n = [], r = e.length - 1; r >= 0 && t > 0;) {
          var i = e.charCodeAt(r--);
          i < 128 ? n[--t] = i : i > 127 && i < 2048 ? (n[--t] = 63 & i | 128, n[--t] = i >> 6 | 192) : (n[--t] = 63 & i | 128, n[--t] = i >> 6 & 63 | 128, n[--t] = i >> 12 | 224)
        }
        n[--t] = 0;
        for (var o = new du, s = []; t > 2;) {
          for (s[0] = 0; 0 == s[0];) o.nextBytes(s);
          n[--t] = s[0]
        }
        return n[--t] = 2, n[--t] = 0, new Ja(n)
      }(e, t);
    if (null == n) return null;
    var r = this.doPublic(n);
    if (null == r) return null;
    for (var i = r.toString(16), o = i.length, s = 0; s < 2 * t - o; s++) i = "0" + i;
    return i
  }, e.prototype.setPrivate = function(e, t, n) {
    null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = tu(e, 16), this.e = parseInt(t, 16), this.d = tu(n, 16)) : console.error("Invalid RSA private key")
  }, e.prototype.setPrivateEx = function(e, t, n, r, i, o, s, a) {
    null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = tu(e, 16), this.e = parseInt(t, 16), this.d = tu(n, 16), this.p = tu(r, 16), this.q = tu(i, 16), this.dmp1 = tu(o, 16), this.dmq1 = tu(s, 16), this.coeff = tu(a, 16)) : console.error("Invalid RSA private key")
  }, e.prototype.generate = function(e, t) {
    var n = new du,
      r = e >> 1;
    this.e = parseInt(t, 16);
    for (var i = new Ja(t, 16);;) {
      for (; this.p = new Ja(e - r, 1, n), 0 != this.p.subtract(Ja.ONE).gcd(i).compareTo(Ja.ONE) || !this.p.isProbablePrime(10););
      for (; this.q = new Ja(r, 1, n), 0 != this.q.subtract(Ja.ONE).gcd(i).compareTo(Ja.ONE) || !this.q.isProbablePrime(10););
      if (this.p.compareTo(this.q) <= 0) {
        var o = this.p;
        this.p = this.q, this.q = o
      }
      var s = this.p.subtract(Ja.ONE),
        a = this.q.subtract(Ja.ONE),
        u = s.multiply(a);
      if (0 == u.gcd(i).compareTo(Ja.ONE)) {
        this.n = this.p.multiply(this.q), this.d = i.modInverse(u), this.dmp1 = this.d.mod(s), this.dmq1 = this.d.mod(a), this.coeff = this.q.modInverse(this.p);
        break
      }
    }
  }, e.prototype.decrypt = function(e) {
    var t = tu(e, 16),
      n = this.doPrivate(t);
    return null == n ? null : function(e, t) {
      var n = e.toByteArray(),
        r = 0;
      for (; r < n.length && 0 == n[r];) ++r;
      if (n.length - r != t - 1 || 2 != n[r]) return null;
      ++r;
      for (; 0 != n[r];)
        if (++r >= n.length) return null;
      var i = "";
      for (; ++r < n.length;) {
        var o = 255 & n[r];
        o < 128 ? i += String.fromCharCode(o) : o > 191 && o < 224 ? (i += String.fromCharCode((31 & o) << 6 | 63 & n[r + 1]), ++r) : (i += String.fromCharCode((15 & o) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]), r += 2)
      }
      return i
    }(n, this.n.bitLength() + 7 >> 3)
  }, e.prototype.generateAsync = function(e, t, n) {
    var r = new du,
      i = e >> 1;
    this.e = parseInt(t, 16);
    var o = new Ja(t, 16),
      s = this;
    setTimeout((function t() {
      var a = function() {
          if (s.p.compareTo(s.q) <= 0) {
            var e = s.p;
            s.p = s.q, s.q = e
          }
          var r = s.p.subtract(Ja.ONE),
            i = s.q.subtract(Ja.ONE),
            a = r.multiply(i);
          0 == a.gcd(o).compareTo(Ja.ONE) ? (s.n = s.p.multiply(s.q), s.d = o.modInverse(a), s.dmp1 = s.d.mod(r), s.dmq1 = s.d.mod(i), s.coeff = s.q.modInverse(s.p), setTimeout((function() {
            n()
          }), 0)) : setTimeout(t, 0)
        },
        u = function e() {
          s.q = eu(), s.q.fromNumberAsync(i, 1, r, (function() {
            s.q.subtract(Ja.ONE).gcda(o, (function(t) {
              0 == t.compareTo(Ja.ONE) && s.q.isProbablePrime(10) ? setTimeout(a, 0) : setTimeout(e, 0)
            }))
          }))
        };
      setTimeout((function t() {
        s.p = eu(), s.p.fromNumberAsync(e - i, 1, r, (function() {
          s.p.subtract(Ja.ONE).gcda(o, (function(e) {
            0 == e.compareTo(Ja.ONE) && s.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(t, 0)
          }))
        }))
      }), 0)
    }), 0)
  }, e.prototype.sign = function(e, t, n) {
    var r = function(e, t) {
      if (t < e.length + 22) return console.error("Message too long for RSA"), null;
      for (var n = t - e.length - 6, r = "", i = 0; i < n; i += 2) r += "ff";
      return tu("0001" + r + "00" + e, 16)
    }((gu[n] || "") + t(e).toString(), this.n.bitLength() / 4);
    if (null == r) return null;
    var i = this.doPrivate(r);
    if (null == i) return null;
    var o = i.toString(16);
    return 0 == (1 & o.length) ? o : "0" + o
  }, e.prototype.verify = function(e, t, n) {
    var r = tu(t, 16),
      i = this.doPublic(r);
    return null == i ? null : function(e) {
      for (var t in gu)
        if (gu.hasOwnProperty(t)) {
          var n = gu[t],
            r = n.length;
          if (e.substr(0, r) == n) return e.substr(r)
        } return e
    }
    /*!
    Copyright (c) 2011, Yahoo! Inc. All rights reserved.
    Code licensed under the BSD License:
    http://developer.yahoo.com/yui/license.html
    version: 2.9.0
    */
    (i.toString(16).replace(/^1f+00/, "")) == n(e).toString()
  }, e.prototype.encryptLong = function(e) {
    var t = this,
      n = "",
      r = (this.n.bitLength() + 7 >> 3) - 11;
    return this.setSplitChn(e, r).forEach((function(e) {
      n += t.encrypt(e)
    })), n
  }, e.prototype.decryptLong = function(e) {
    var t = "",
      n = this.n.bitLength() + 7 >> 3,
      r = 2 * n;
    if (e.length > r) {
      for (var i = e.match(new RegExp(".{1," + r + "}", "g")) || [], o = [], s = 0; s < i.length; s++) {
        var a = tu(i[s], 16),
          u = this.doPrivate(a);
        if (null == u) return null;
        o.push(u)
      }
      t = function(e, t) {
        for (var n = [], r = 0; r < e.length; r++) {
          for (var i = e[r].toByteArray(), o = 0; o < i.length && 0 == i[o];) ++o;
          if (i.length - o != t - 1 || 2 != i[o]) return null;
          for (++o; 0 != i[o];)
            if (++o >= i.length) return null;
          n = n.concat(i.slice(o + 1))
        }
        var s = n,
          a = -1,
          u = "";
        for (; ++a < s.length;) {
          var c = 255 & s[a];
          c < 128 ? u += String.fromCharCode(c) : c > 191 && c < 224 ? (u += String.fromCharCode((31 & c) << 6 | 63 & s[a + 1]), ++a) : (u += String.fromCharCode((15 & c) << 12 | (63 & s[a + 1]) << 6 | 63 & s[a + 2]), a += 2)
        }
        return u
      }(o, n)
    } else t = this.decrypt(e);
    return t
  }, e.prototype.setSplitChn = function(e, t, n) {
    void 0 === n && (n = []);
    for (var r = e.split(""), i = 0, o = 0; o < r.length; o++) {
      var s = r[o].charCodeAt(0);
      if ((i += s <= 127 ? 1 : s <= 2047 ? 2 : s <= 65535 ? 3 : 4) > t) {
        var a = e.substring(0, o);
        return n.push(a), this.setSplitChn(e.substring(o), t, n)
      }
    }
    return n.push(e), n
  }, e
}();
var gu = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
var mu = {};
mu.lang = {
  extend: function(e, t, n) {
    if (!t || !e) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    var r = function() {};
    if (r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e, e.superclass = t.prototype, t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t), n) {
      var i;
      for (i in n) e.prototype[i] = n[i];
      var o = function() {},
        s = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) && (o = function(e, t) {
          for (i = 0; i < s.length; i += 1) {
            var n = s[i],
              r = t[n];
            "function" == typeof r && r != Object.prototype[n] && (e[n] = r)
          }
        })
      } catch (e) {}
      o(e.prototype, n)
    }
  }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var yu = {};
void 0 !== yu.asn1 && yu.asn1 || (yu.asn1 = {}), yu.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(e) {
    var t = e.toString(16);
    return t.length % 2 == 1 && (t = "0" + t), t
  }, this.bigIntToMinTwosComplementsHex = function(e) {
    var t = e.toString(16);
    if ("-" != t.substr(0, 1)) t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
    else {
      var n = t.substr(1).length;
      n % 2 == 1 ? n += 1 : t.match(/^[0-7]/) || (n += 2);
      for (var r = "", i = 0; i < n; i++) r += "f";
      t = new Ja(r, 16).xor(e).add(Ja.ONE).toString(16).replace(/^-/, "")
    }
    return t
  }, this.getPEMStringFromHex = function(e, t) {
    return hextopem(e, t)
  }, this.newObject = function(e) {
    var t = yu.asn1,
      n = t.DERBoolean,
      r = t.DERInteger,
      i = t.DERBitString,
      o = t.DEROctetString,
      s = t.DERNull,
      a = t.DERObjectIdentifier,
      u = t.DEREnumerated,
      c = t.DERUTF8String,
      f = t.DERNumericString,
      h = t.DERPrintableString,
      l = t.DERTeletexString,
      p = t.DERIA5String,
      d = t.DERUTCTime,
      v = t.DERGeneralizedTime,
      g = t.DERSequence,
      m = t.DERSet,
      y = t.DERTaggedObject,
      b = t.ASN1Util.newObject,
      w = Object.keys(e);
    if (1 != w.length) throw "key of param shall be only one.";
    var _ = w[0];
    if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + _ + ":")) throw "undefined key: " + _;
    if ("bool" == _) return new n(e[_]);
    if ("int" == _) return new r(e[_]);
    if ("bitstr" == _) return new i(e[_]);
    if ("octstr" == _) return new o(e[_]);
    if ("null" == _) return new s(e[_]);
    if ("oid" == _) return new a(e[_]);
    if ("enum" == _) return new u(e[_]);
    if ("utf8str" == _) return new c(e[_]);
    if ("numstr" == _) return new f(e[_]);
    if ("prnstr" == _) return new h(e[_]);
    if ("telstr" == _) return new l(e[_]);
    if ("ia5str" == _) return new p(e[_]);
    if ("utctime" == _) return new d(e[_]);
    if ("gentime" == _) return new v(e[_]);
    if ("seq" == _) {
      for (var k = e[_], S = [], x = 0; x < k.length; x++) {
        var T = b(k[x]);
        S.push(T)
      }
      return new g({
        array: S
      })
    }
    if ("set" == _) {
      for (k = e[_], S = [], x = 0; x < k.length; x++) {
        T = b(k[x]);
        S.push(T)
      }
      return new m({
        array: S
      })
    }
    if ("tag" == _) {
      var E = e[_];
      if ("[object Array]" === Object.prototype.toString.call(E) && 3 == E.length) {
        var O = b(E[2]);
        return new y({
          tag: E[0],
          explicit: E[1],
          obj: O
        })
      }
      var A = {};
      if (void 0 !== E.explicit && (A.explicit = E.explicit), void 0 !== E.tag && (A.tag = E.tag), void 0 === E.obj) throw "obj shall be specified for 'tag'.";
      return A.obj = b(E.obj), new y(A)
    }
  }, this.jsonToASN1HEX = function(e) {
    return this.newObject(e).getEncodedHex()
  }
}, yu.asn1.ASN1Util.oidHexToInt = function(e) {
  for (var t = "", n = parseInt(e.substr(0, 2), 16), r = (t = Math.floor(n / 40) + "." + n % 40, ""), i = 2; i < e.length; i += 2) {
    var o = ("00000000" + parseInt(e.substr(i, 2), 16).toString(2)).slice(-8);
    if (r += o.substr(1, 7), "0" == o.substr(0, 1)) t = t + "." + new Ja(r, 2).toString(10), r = ""
  }
  return t
}, yu.asn1.ASN1Util.oidIntToHex = function(e) {
  var t = function(e) {
      var t = e.toString(16);
      return 1 == t.length && (t = "0" + t), t
    },
    n = function(e) {
      var n = "",
        r = new Ja(e, 10).toString(2),
        i = 7 - r.length % 7;
      7 == i && (i = 0);
      for (var o = "", s = 0; s < i; s++) o += "0";
      r = o + r;
      for (s = 0; s < r.length - 1; s += 7) {
        var a = r.substr(s, 7);
        s != r.length - 7 && (a = "1" + a), n += t(parseInt(a, 2))
      }
      return n
    };
  if (!e.match(/^[0-9.]+$/)) throw "malformed oid string: " + e;
  var r = "",
    i = e.split("."),
    o = 40 * parseInt(i[0]) + parseInt(i[1]);
  r += t(o), i.splice(0, 2);
  for (var s = 0; s < i.length; s++) r += n(i[s]);
  return r
}, yu.asn1.ASN1Object = function() {
  this.getLengthHexFromValue = function() {
    if (void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
    var e = this.hV.length / 2,
      t = e.toString(16);
    if (t.length % 2 == 1 && (t = "0" + t), e < 128) return t;
    var n = t.length / 2;
    if (n > 15) throw "ASN.1 length too long to represent by 8x: n = " + e.toString(16);
    return (128 + n).toString(16) + t
  }, this.getEncodedHex = function() {
    return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
  }, this.getValueHex = function() {
    return this.getEncodedHex(), this.hV
  }, this.getFreshValueHex = function() {
    return ""
  }
}, yu.asn1.DERAbstractString = function(e) {
  yu.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s
  }, this.setString = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = e, this.hV = stohex(this.s)
  }, this.setStringHex = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e
  }, this.getFreshValueHex = function() {
    return this.hV
  }, void 0 !== e && ("string" == typeof e ? this.setString(e) : void 0 !== e.str ? this.setString(e.str) : void 0 !== e.hex && this.setStringHex(e.hex))
}, mu.lang.extend(yu.asn1.DERAbstractString, yu.asn1.ASN1Object), yu.asn1.DERAbstractTime = function(e) {
  yu.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(e) {
    return utc = e.getTime() + 6e4 * e.getTimezoneOffset(), new Date(utc)
  }, this.formatDate = function(e, t, n) {
    var r = this.zeroPadding,
      i = this.localDateToUTC(e),
      o = String(i.getFullYear());
    "utc" == t && (o = o.substr(2, 2));
    var s = o + r(String(i.getMonth() + 1), 2) + r(String(i.getDate()), 2) + r(String(i.getHours()), 2) + r(String(i.getMinutes()), 2) + r(String(i.getSeconds()), 2);
    if (!0 === n) {
      var a = i.getMilliseconds();
      if (0 != a) {
        var u = r(String(a), 3);
        s = s + "." + (u = u.replace(/[0]+$/, ""))
      }
    }
    return s + "Z"
  }, this.zeroPadding = function(e, t) {
    return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
  }, this.getString = function() {
    return this.s
  }, this.setString = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = e, this.hV = stohex(e)
  }, this.setByDateValue = function(e, t, n, r, i, o) {
    var s = new Date(Date.UTC(e, t - 1, n, r, i, o, 0));
    this.setByDate(s)
  }, this.getFreshValueHex = function() {
    return this.hV
  }
}, mu.lang.extend(yu.asn1.DERAbstractTime, yu.asn1.ASN1Object), yu.asn1.DERAbstractStructured = function(e) {
  yu.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(e) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = e
  }, this.appendASN1Object = function(e) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(e)
  }, this.asn1Array = new Array, void 0 !== e && void 0 !== e.array && (this.asn1Array = e.array)
}, mu.lang.extend(yu.asn1.DERAbstractStructured, yu.asn1.ASN1Object), yu.asn1.DERBoolean = function() {
  yu.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
}, mu.lang.extend(yu.asn1.DERBoolean, yu.asn1.ASN1Object), yu.asn1.DERInteger = function(e) {
  yu.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(e) {
    this.hTLV = null, this.isModified = !0, this.hV = yu.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
  }, this.setByInteger = function(e) {
    var t = new Ja(String(e), 10);
    this.setByBigInteger(t)
  }, this.setValueHex = function(e) {
    this.hV = e
  }, this.getFreshValueHex = function() {
    return this.hV
  }, void 0 !== e && (void 0 !== e.bigint ? this.setByBigInteger(e.bigint) : void 0 !== e.int ? this.setByInteger(e.int) : "number" == typeof e ? this.setByInteger(e) : void 0 !== e.hex && this.setValueHex(e.hex))
}, mu.lang.extend(yu.asn1.DERInteger, yu.asn1.ASN1Object), yu.asn1.DERBitString = function(e) {
  if (void 0 !== e && void 0 !== e.obj) {
    var t = yu.asn1.ASN1Util.newObject(e.obj);
    e.hex = "00" + t.getEncodedHex()
  }
  yu.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(e) {
    this.hTLV = null, this.isModified = !0, this.hV = e
  }, this.setUnusedBitsAndHexValue = function(e, t) {
    if (e < 0 || 7 < e) throw "unused bits shall be from 0 to 7: u = " + e;
    var n = "0" + e;
    this.hTLV = null, this.isModified = !0, this.hV = n + t
  }, this.setByBinaryString = function(e) {
    var t = 8 - (e = e.replace(/0+$/, "")).length % 8;
    8 == t && (t = 0);
    for (var n = 0; n <= t; n++) e += "0";
    var r = "";
    for (n = 0; n < e.length - 1; n += 8) {
      var i = e.substr(n, 8),
        o = parseInt(i, 2).toString(16);
      1 == o.length && (o = "0" + o), r += o
    }
    this.hTLV = null, this.isModified = !0, this.hV = "0" + t + r
  }, this.setByBooleanArray = function(e) {
    for (var t = "", n = 0; n < e.length; n++) 1 == e[n] ? t += "1" : t += "0";
    this.setByBinaryString(t)
  }, this.newFalseArray = function(e) {
    for (var t = new Array(e), n = 0; n < e; n++) t[n] = !1;
    return t
  }, this.getFreshValueHex = function() {
    return this.hV
  }, void 0 !== e && ("string" == typeof e && e.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(e) : void 0 !== e.hex ? this.setHexValueIncludingUnusedBits(e.hex) : void 0 !== e.bin ? this.setByBinaryString(e.bin) : void 0 !== e.array && this.setByBooleanArray(e.array))
}, mu.lang.extend(yu.asn1.DERBitString, yu.asn1.ASN1Object), yu.asn1.DEROctetString = function(e) {
  if (void 0 !== e && void 0 !== e.obj) {
    var t = yu.asn1.ASN1Util.newObject(e.obj);
    e.hex = t.getEncodedHex()
  }
  yu.asn1.DEROctetString.superclass.constructor.call(this, e), this.hT = "04"
}, mu.lang.extend(yu.asn1.DEROctetString, yu.asn1.DERAbstractString), yu.asn1.DERNull = function() {
  yu.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
}, mu.lang.extend(yu.asn1.DERNull, yu.asn1.ASN1Object), yu.asn1.DERObjectIdentifier = function(e) {
  var t = function(e) {
      var t = e.toString(16);
      return 1 == t.length && (t = "0" + t), t
    },
    n = function(e) {
      var n = "",
        r = new Ja(e, 10).toString(2),
        i = 7 - r.length % 7;
      7 == i && (i = 0);
      for (var o = "", s = 0; s < i; s++) o += "0";
      r = o + r;
      for (s = 0; s < r.length - 1; s += 7) {
        var a = r.substr(s, 7);
        s != r.length - 7 && (a = "1" + a), n += t(parseInt(a, 2))
      }
      return n
    };
  yu.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e
  }, this.setValueOidString = function(e) {
    if (!e.match(/^[0-9.]+$/)) throw "malformed oid string: " + e;
    var r = "",
      i = e.split("."),
      o = 40 * parseInt(i[0]) + parseInt(i[1]);
    r += t(o), i.splice(0, 2);
    for (var s = 0; s < i.length; s++) r += n(i[s]);
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = r
  }, this.setValueName = function(e) {
    var t = yu.asn1.x509.OID.name2oid(e);
    if ("" === t) throw "DERObjectIdentifier oidName undefined: " + e;
    this.setValueOidString(t)
  }, this.getFreshValueHex = function() {
    return this.hV
  }, void 0 !== e && ("string" == typeof e ? e.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(e) : this.setValueName(e) : void 0 !== e.oid ? this.setValueOidString(e.oid) : void 0 !== e.hex ? this.setValueHex(e.hex) : void 0 !== e.name && this.setValueName(e.name))
}, mu.lang.extend(yu.asn1.DERObjectIdentifier, yu.asn1.ASN1Object), yu.asn1.DEREnumerated = function(e) {
  yu.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(e) {
    this.hTLV = null, this.isModified = !0, this.hV = yu.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
  }, this.setByInteger = function(e) {
    var t = new Ja(String(e), 10);
    this.setByBigInteger(t)
  }, this.setValueHex = function(e) {
    this.hV = e
  }, this.getFreshValueHex = function() {
    return this.hV
  }, void 0 !== e && (void 0 !== e.int ? this.setByInteger(e.int) : "number" == typeof e ? this.setByInteger(e) : void 0 !== e.hex && this.setValueHex(e.hex))
}, mu.lang.extend(yu.asn1.DEREnumerated, yu.asn1.ASN1Object), yu.asn1.DERUTF8String = function(e) {
  yu.asn1.DERUTF8String.superclass.constructor.call(this, e), this.hT = "0c"
}, mu.lang.extend(yu.asn1.DERUTF8String, yu.asn1.DERAbstractString), yu.asn1.DERNumericString = function(e) {
  yu.asn1.DERNumericString.superclass.constructor.call(this, e), this.hT = "12"
}, mu.lang.extend(yu.asn1.DERNumericString, yu.asn1.DERAbstractString), yu.asn1.DERPrintableString = function(e) {
  yu.asn1.DERPrintableString.superclass.constructor.call(this, e), this.hT = "13"
}, mu.lang.extend(yu.asn1.DERPrintableString, yu.asn1.DERAbstractString), yu.asn1.DERTeletexString = function(e) {
  yu.asn1.DERTeletexString.superclass.constructor.call(this, e), this.hT = "14"
}, mu.lang.extend(yu.asn1.DERTeletexString, yu.asn1.DERAbstractString), yu.asn1.DERIA5String = function(e) {
  yu.asn1.DERIA5String.superclass.constructor.call(this, e), this.hT = "16"
}, mu.lang.extend(yu.asn1.DERIA5String, yu.asn1.DERAbstractString), yu.asn1.DERUTCTime = function(e) {
  yu.asn1.DERUTCTime.superclass.constructor.call(this, e), this.hT = "17", this.setByDate = function(e) {
    this.hTLV = null, this.isModified = !0, this.date = e, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
  }, this.getFreshValueHex = function() {
    return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV
  }, void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : "string" == typeof e && e.match(/^[0-9]{12}Z$/) ? this.setString(e) : void 0 !== e.hex ? this.setStringHex(e.hex) : void 0 !== e.date && this.setByDate(e.date))
}, mu.lang.extend(yu.asn1.DERUTCTime, yu.asn1.DERAbstractTime), yu.asn1.DERGeneralizedTime = function(e) {
  yu.asn1.DERGeneralizedTime.superclass.constructor.call(this, e), this.hT = "18", this.withMillis = !1, this.setByDate = function(e) {
    this.hTLV = null, this.isModified = !0, this.date = e, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)
  }, this.getFreshValueHex = function() {
    return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV
  }, void 0 !== e && (void 0 !== e.str ? this.setString(e.str) : "string" == typeof e && e.match(/^[0-9]{14}Z$/) ? this.setString(e) : void 0 !== e.hex ? this.setStringHex(e.hex) : void 0 !== e.date && this.setByDate(e.date), !0 === e.millis && (this.withMillis = !0))
}, mu.lang.extend(yu.asn1.DERGeneralizedTime, yu.asn1.DERAbstractTime), yu.asn1.DERSequence = function(e) {
  yu.asn1.DERSequence.superclass.constructor.call(this, e), this.hT = "30", this.getFreshValueHex = function() {
    for (var e = "", t = 0; t < this.asn1Array.length; t++) {
      e += this.asn1Array[t].getEncodedHex()
    }
    return this.hV = e, this.hV
  }
}, mu.lang.extend(yu.asn1.DERSequence, yu.asn1.DERAbstractStructured), yu.asn1.DERSet = function(e) {
  yu.asn1.DERSet.superclass.constructor.call(this, e), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var e = new Array, t = 0; t < this.asn1Array.length; t++) {
      var n = this.asn1Array[t];
      e.push(n.getEncodedHex())
    }
    return 1 == this.sortFlag && e.sort(), this.hV = e.join(""), this.hV
  }, void 0 !== e && void 0 !== e.sortflag && 0 == e.sortflag && (this.sortFlag = !1)
}, mu.lang.extend(yu.asn1.DERSet, yu.asn1.DERAbstractStructured), yu.asn1.DERTaggedObject = function(e) {
  yu.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(e, t, n) {
    this.hT = t, this.isExplicit = e, this.asn1Object = n, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = n.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, t), this.isModified = !1)
  }, this.getFreshValueHex = function() {
    return this.hV
  }, void 0 !== e && (void 0 !== e.tag && (this.hT = e.tag), void 0 !== e.explicit && (this.isExplicit = e.explicit), void 0 !== e.obj && (this.asn1Object = e.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
}, mu.lang.extend(yu.asn1.DERTaggedObject, yu.asn1.ASN1Object);
var bu, wu = globalThis && globalThis.__extends || (bu = function(e, t) {
    return (bu = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function(e, t) {
        e.__proto__ = t
      } || function(e, t) {
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
      })(e, t)
  }, function(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

    function n() {
      this.constructor = e
    }
    bu(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
  }),
  _u = function(e) {
    function t(n) {
      var r = e.call(this) || this;
      return n && ("string" == typeof n ? r.parseKey(n) : (t.hasPrivateKeyProperty(n) || t.hasPublicKeyProperty(n)) && r.parsePropertiesFrom(n)), r
    }
    return wu(t, e), t.prototype.parseKey = function(e) {
      try {
        var t = 0,
          n = 0,
          r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(e) ? Ma(e) : Na.unarmor(e),
          i = Ka.decode(r);
        if (3 === i.sub.length && (i = i.sub[2].sub[0]), 9 === i.sub.length) {
          t = i.sub[1].getHexStringValue(), this.n = tu(t, 16), n = i.sub[2].getHexStringValue(), this.e = parseInt(n, 16);
          var o = i.sub[3].getHexStringValue();
          this.d = tu(o, 16);
          var s = i.sub[4].getHexStringValue();
          this.p = tu(s, 16);
          var a = i.sub[5].getHexStringValue();
          this.q = tu(a, 16);
          var u = i.sub[6].getHexStringValue();
          this.dmp1 = tu(u, 16);
          var c = i.sub[7].getHexStringValue();
          this.dmq1 = tu(c, 16);
          var f = i.sub[8].getHexStringValue();
          this.coeff = tu(f, 16)
        } else {
          if (2 !== i.sub.length) return !1;
          var h = i.sub[1].sub[0];
          t = h.sub[0].getHexStringValue(), this.n = tu(t, 16), n = h.sub[1].getHexStringValue(), this.e = parseInt(n, 16)
        }
        return !0
      } catch (e) {
        return !1
      }
    }, t.prototype.getPrivateBaseKey = function() {
      var e = {
        array: [new yu.asn1.DERInteger({
          int: 0
        }), new yu.asn1.DERInteger({
          bigint: this.n
        }), new yu.asn1.DERInteger({
          int: this.e
        }), new yu.asn1.DERInteger({
          bigint: this.d
        }), new yu.asn1.DERInteger({
          bigint: this.p
        }), new yu.asn1.DERInteger({
          bigint: this.q
        }), new yu.asn1.DERInteger({
          bigint: this.dmp1
        }), new yu.asn1.DERInteger({
          bigint: this.dmq1
        }), new yu.asn1.DERInteger({
          bigint: this.coeff
        })]
      };
      return new yu.asn1.DERSequence(e).getEncodedHex()
    }, t.prototype.getPrivateBaseKeyB64 = function() {
      return Ra(this.getPrivateBaseKey())
    }, t.prototype.getPublicBaseKey = function() {
      var e = new yu.asn1.DERSequence({
          array: [new yu.asn1.DERObjectIdentifier({
            oid: "1.2.840.113549.1.1.1"
          }), new yu.asn1.DERNull]
        }),
        t = new yu.asn1.DERSequence({
          array: [new yu.asn1.DERInteger({
            bigint: this.n
          }), new yu.asn1.DERInteger({
            int: this.e
          })]
        }),
        n = new yu.asn1.DERBitString({
          hex: "00" + t.getEncodedHex()
        });
      return new yu.asn1.DERSequence({
        array: [e, n]
      }).getEncodedHex()
    }, t.prototype.getPublicBaseKeyB64 = function() {
      return Ra(this.getPublicBaseKey())
    }, t.wordwrap = function(e, t) {
      if (!e) return e;
      var n = "(.{1," + (t = t || 64) + "})( +|$\n?)|(.{1," + t + "})";
      return e.match(RegExp(n, "g")).join("\n")
    }, t.prototype.getPrivateKey = function() {
      var e = "-----BEGIN RSA PRIVATE KEY-----\n";
      return e += t.wordwrap(this.getPrivateBaseKeyB64()) + "\n", e += "-----END RSA PRIVATE KEY-----"
    }, t.prototype.getPublicKey = function() {
      var e = "-----BEGIN PUBLIC KEY-----\n";
      return e += t.wordwrap(this.getPublicBaseKeyB64()) + "\n", e += "-----END PUBLIC KEY-----"
    }, t.hasPublicKeyProperty = function(e) {
      return (e = e || {}).hasOwnProperty("n") && e.hasOwnProperty("e")
    }, t.hasPrivateKeyProperty = function(e) {
      return (e = e || {}).hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
    }, t.prototype.parsePropertiesFrom = function(e) {
      this.n = e.n, this.e = e.e, e.hasOwnProperty("d") && (this.d = e.d, this.p = e.p, this.q = e.q, this.dmp1 = e.dmp1, this.dmq1 = e.dmq1, this.coeff = e.coeff)
    }, t
  }(vu),
  ku = "3.2.1",
  Su = function() {
    function e(e) {
      void 0 === e && (e = {}), e = e || {}, this.default_key_size = e.default_key_size ? parseInt(e.default_key_size, 10) : 1024, this.default_public_exponent = e.default_public_exponent || "010001", this.log = e.log || !1, this.key = null
    }
    return e.prototype.setKey = function(e) {
      this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new _u(e)
    }, e.prototype.setPrivateKey = function(e) {
      this.setKey(e)
    }, e.prototype.setPublicKey = function(e) {
      this.setKey(e)
    }, e.prototype.decrypt = function(e) {
      try {
        return this.getKey().decrypt($a(e))
      } catch (e) {
        return !1
      }
    }, e.prototype.encrypt = function(e) {
      try {
        return Ra(this.getKey().encrypt(e))
      } catch (e) {
        return !1
      }
    }, e.prototype.encryptLong = function(e) {
      try {
        return Ra(this.getKey().encryptLong(e))
      } catch (e) {
        return !1
      }
    }, e.prototype.decryptLong = function(e) {
      try {
        return this.getKey().decryptLong($a(e))
      } catch (e) {
        return !1
      }
    }, e.prototype.sign = function(e, t, n) {
      try {
        return Ra(this.getKey().sign(e, t, n))
      } catch (e) {
        return !1
      }
    }, e.prototype.verify = function(e, t, n) {
      try {
        return this.getKey().verify(e, $a(t), n)
      } catch (e) {
        return !1
      }
    }, e.prototype.getKey = function(e) {
      if (!this.key) {
        if (this.key = new _u, e && "[object Function]" === {}.toString.call(e)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
        this.key.generate(this.default_key_size, this.default_public_exponent)
      }
      return this.key
    }, e.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey()
    }, e.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64()
    }, e.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey()
    }, e.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64()
    }, e.version = ku, e
  }(),
  xu = Array.isArray,
  Tu = ["{", "}"],
  Eu = function() {
    return f((function e() {
      c(this, e), this._caches = Object.create(null)
    }), [{
      key: "interpolate",
      value: function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Tu;
        if (!t) return [e];
        var r = this._caches[e];
        return r || (r = Pu(e, n), this._caches[e] = r), Iu(r, t)
      }
    }])
  }(),
  Ou = /^(?:\d)+/,
  Au = /^(?:\w)+/;

function Pu(e, t) {
  for (var n = d(t, 2), r = n[0], i = n[1], o = [], s = 0, a = ""; s < e.length;) {
    var u = e[s++];
    if (u === r) {
      a && o.push({
        type: "text",
        value: a
      }), a = "";
      var c = "";
      for (u = e[s++]; void 0 !== u && u !== i;) c += u, u = e[s++];
      var f = u === i,
        h = Ou.test(c) ? "list" : f && Au.test(c) ? "named" : "unknown";
      o.push({
        value: c,
        type: h
      })
    } else a += u
  }
  return a && o.push({
    type: "text",
    value: a
  }), o
}

function Iu(e, t) {
  var n, r = [],
    i = 0,
    o = xu(t) ? "list" : null !== (n = t) && "object" === h(n) ? "named" : "unknown";
  if ("unknown" === o) return r;
  for (; i < e.length;) {
    var s = e[i];
    switch (s.type) {
      case "text":
        r.push(s.value);
        break;
      case "list":
        r.push(t[parseInt(s.value, 10)]);
        break;
      case "named":
        "named" === o ? r.push(t[s.value]) : console.warn("Type of token '".concat(s.type, "' and format of value '").concat(o, "' don't match!"));
        break;
      case "unknown":
        console.warn("Detect 'unknown' type of token!")
    }
    i++
  }
  return r
}
var Du = Object.prototype.hasOwnProperty,
  Cu = function(e, t) {
    return Du.call(e, t)
  },
  Ru = new Eu;

function $u(e, t) {
  if (e) {
    if (e = e.trim().replace(/_/g, "-"), t && t[e]) return e;
    if ("chinese" === (e = e.toLowerCase())) return "zh-Hans";
    if (0 === e.indexOf("zh")) return e.indexOf("-hans") > -1 ? "zh-Hans" : e.indexOf("-hant") > -1 ? "zh-Hant" : (n = e, ["-tw", "-hk", "-mo", "-cht"].find((function(e) {
      return -1 !== n.indexOf(e)
    })) ? "zh-Hant" : "zh-Hans");
    var n, r = function(e, t) {
      return t.find((function(t) {
        return 0 === e.indexOf(t)
      }))
    }(e, ["en", "fr", "es"]);
    return r || void 0
  }
}
var ju = function() {
  return f((function e(t) {
    var n = t.locale,
      r = t.fallbackLocale,
      i = t.messages,
      o = t.watcher,
      s = t.formater;
    c(this, e), this.locale = "en", this.fallbackLocale = "en", this.message = {}, this.messages = {}, this.watchers = [], r && (this.fallbackLocale = r), this.formater = s || Ru, this.messages = i || {}, this.setLocale(n || "en"), o && this.watchLocale(o)
  }), [{
    key: "setLocale",
    value: function(e) {
      var t = this,
        n = this.locale;
      this.locale = $u(e, this.messages) || this.fallbackLocale, this.messages[this.locale] || (this.messages[this.locale] = {}), this.message = this.messages[this.locale], n !== this.locale && this.watchers.forEach((function(e) {
        e(t.locale, n)
      }))
    }
  }, {
    key: "getLocale",
    value: function() {
      return this.locale
    }
  }, {
    key: "watchLocale",
    value: function(e) {
      var t = this,
        n = this.watchers.push(e) - 1;
      return function() {
        t.watchers.splice(n, 1)
      }
    }
  }, {
    key: "add",
    value: function(e, t) {
      var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
        r = this.messages[e];
      r ? n ? Object.assign(r, t) : Object.keys(t).forEach((function(e) {
        Cu(r, e) || (r[e] = t[e])
      })) : this.messages[e] = t
    }
  }, {
    key: "f",
    value: function(e, t, n) {
      return this.formater.interpolate(e, t, n).join("")
    }
  }, {
    key: "t",
    value: function(e, t, n) {
      var r = this.message;
      return "string" == typeof t ? (t = $u(t, this.messages)) && (r = this.messages[t]) : n = t, Cu(r, e) ? this.formater.interpolate(r[e], n).join("") : (console.warn("Cannot translate the value of keypath ".concat(e, ". Use the value of keypath as default.")), e)
    }
  }])
}();

function Mu(e, t) {
  e.$watchLocale ? e.$watchLocale((function(e) {
    t.setLocale(e)
  })) : e.$watch((function() {
    return e.$locale
  }), (function(e) {
    t.setLocale(e)
  }))
}

function Nu() {
  return void 0 !== Rt && Rt.getLocale ? Rt.getLocale() : "undefined" != typeof global && global.getLocale ? global.getLocale() : "en"
}

function Uu(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = arguments.length > 2 ? arguments[2] : void 0,
    r = arguments.length > 3 ? arguments[3] : void 0;
  if ("string" != typeof e) {
    var i = [t, e];
    e = i[0], t = i[1]
  }
  "string" != typeof e && (e = Nu()), "string" != typeof n && (n = "undefined" != typeof __uniConfig && __uniConfig.fallbackLocale || "en");
  var o = new ju({
      locale: e,
      fallbackLocale: n,
      messages: t,
      watcher: r
    }),
    s = function(e, t) {
      if ("function" != typeof getApp) s = function(e, t) {
        return o.t(e, t)
      };
      else {
        var n = !1;
        s = function(e, t) {
          var r = getApp().$vm;
          return r && (r.$locale, n || (n = !0, Mu(r, o))), o.t(e, t)
        }
      }
      return s(e, t)
    };
  return {
    i18n: o,
    f: function(e, t, n) {
      return o.f(e, t, n)
    },
    t: function(e, t) {
      return s(e, t)
    },
    add: function(e, t) {
      var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
      return o.add(e, t, n)
    },
    watch: function(e) {
      return o.watchLocale(e)
    },
    getLocale: function() {
      return o.getLocale()
    },
    setLocale: function(e) {
      return o.setLocale(e)
    }
  }
}

function Lu(e, t, n) {
  return e(n = {
    path: t,
    exports: {},
    require: function(e, t) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
      }(null == t && n.path)
    }
  }, n.exports), n.exports
}
var Bu = Lu((function(e, t) {
    var n;
    e.exports = n = n || function(e, t) {
      var n = Object.create || function() {
          function e() {}
          return function(t) {
            var n;
            return e.prototype = t, n = new e, e.prototype = null, n
          }
        }(),
        r = {},
        i = r.lib = {},
        o = i.Base = {
          extend: function(e) {
            var t = n(this);
            return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
              t.$super.init.apply(this, arguments)
            }), t.init.prototype = t, t.$super = this, t
          },
          create: function() {
            var e = this.extend();
            return e.init.apply(e, arguments), e
          },
          init: function() {},
          mixIn: function(e) {
            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
            e.hasOwnProperty("toString") && (this.toString = e.toString)
          },
          clone: function() {
            return this.init.prototype.extend(this)
          }
        },
        s = i.WordArray = o.extend({
          init: function(e, t) {
            e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
          },
          toString: function(e) {
            return (e || u).stringify(this)
          },
          concat: function(e) {
            var t = this.words,
              n = e.words,
              r = this.sigBytes,
              i = e.sigBytes;
            if (this.clamp(), r % 4)
              for (var o = 0; o < i; o++) {
                var s = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                t[r + o >>> 2] |= s << 24 - (r + o) % 4 * 8
              } else
                for (o = 0; o < i; o += 4) t[r + o >>> 2] = n[o >>> 2];
            return this.sigBytes += i, this
          },
          clamp: function() {
            var t = this.words,
              n = this.sigBytes;
            t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
          },
          clone: function() {
            var e = o.clone.call(this);
            return e.words = this.words.slice(0), e
          },
          random: function(t) {
            for (var n, r = [], i = function(t) {
                t = t;
                var n = 987654321,
                  r = 4294967295;
                return function() {
                  var i = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
                  return i /= 4294967296, (i += .5) * (e.random() > .5 ? 1 : -1)
                }
              }, o = 0; o < t; o += 4) {
              var a = i(4294967296 * (n || e.random()));
              n = 987654071 * a(), r.push(4294967296 * a() | 0)
            }
            return new s.init(r, t)
          }
        }),
        a = r.enc = {},
        u = a.Hex = {
          stringify: function(e) {
            for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
              var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              r.push((o >>> 4).toString(16)), r.push((15 & o).toString(16))
            }
            return r.join("")
          },
          parse: function(e) {
            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
            return new s.init(n, t / 2)
          }
        },
        c = a.Latin1 = {
          stringify: function(e) {
            for (var t = e.words, n = e.sigBytes, r = [], i = 0; i < n; i++) {
              var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              r.push(String.fromCharCode(o))
            }
            return r.join("")
          },
          parse: function(e) {
            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
            return new s.init(n, t)
          }
        },
        f = a.Utf8 = {
          stringify: function(e) {
            try {
              return decodeURIComponent(escape(c.stringify(e)))
            } catch (e) {
              throw new Error("Malformed UTF-8 data")
            }
          },
          parse: function(e) {
            return c.parse(unescape(encodeURIComponent(e)))
          }
        },
        h = i.BufferedBlockAlgorithm = o.extend({
          reset: function() {
            this._data = new s.init, this._nDataBytes = 0
          },
          _append: function(e) {
            "string" == typeof e && (e = f.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
          },
          _process: function(t) {
            var n = this._data,
              r = n.words,
              i = n.sigBytes,
              o = this.blockSize,
              a = i / (4 * o),
              u = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,
              c = e.min(4 * u, i);
            if (u) {
              for (var f = 0; f < u; f += o) this._doProcessBlock(r, f);
              var h = r.splice(0, u);
              n.sigBytes -= c
            }
            return new s.init(h, c)
          },
          clone: function() {
            var e = o.clone.call(this);
            return e._data = this._data.clone(), e
          },
          _minBufferSize: 0
        });
      i.Hasher = h.extend({
        cfg: o.extend(),
        init: function(e) {
          this.cfg = this.cfg.extend(e), this.reset()
        },
        reset: function() {
          h.reset.call(this), this._doReset()
        },
        update: function(e) {
          return this._append(e), this._process(), this
        },
        finalize: function(e) {
          return e && this._append(e), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(e) {
          return function(t, n) {
            return new e.init(n).finalize(t)
          }
        },
        _createHmacHelper: function(e) {
          return function(t, n) {
            return new l.HMAC.init(e, n).finalize(t)
          }
        }
      });
      var l = r.algo = {};
      return r
    }(Math)
  })),
  qu = (Lu((function(e, t) {
    var n;
    e.exports = (n = Bu, function(e) {
      var t = n,
        r = t.lib,
        i = r.WordArray,
        o = r.Hasher,
        s = t.algo,
        a = [];
      ! function() {
        for (var t = 0; t < 64; t++) a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0
      }();
      var u = s.MD5 = o.extend({
        _doReset: function() {
          this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(e, t) {
          for (var n = 0; n < 16; n++) {
            var r = t + n,
              i = e[r];
            e[r] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
          }
          var o = this._hash.words,
            s = e[t + 0],
            u = e[t + 1],
            p = e[t + 2],
            d = e[t + 3],
            v = e[t + 4],
            g = e[t + 5],
            m = e[t + 6],
            y = e[t + 7],
            b = e[t + 8],
            w = e[t + 9],
            _ = e[t + 10],
            k = e[t + 11],
            S = e[t + 12],
            x = e[t + 13],
            T = e[t + 14],
            E = e[t + 15],
            O = o[0],
            A = o[1],
            P = o[2],
            I = o[3];
          O = c(O, A, P, I, s, 7, a[0]), I = c(I, O, A, P, u, 12, a[1]), P = c(P, I, O, A, p, 17, a[2]), A = c(A, P, I, O, d, 22, a[3]), O = c(O, A, P, I, v, 7, a[4]), I = c(I, O, A, P, g, 12, a[5]), P = c(P, I, O, A, m, 17, a[6]), A = c(A, P, I, O, y, 22, a[7]), O = c(O, A, P, I, b, 7, a[8]), I = c(I, O, A, P, w, 12, a[9]), P = c(P, I, O, A, _, 17, a[10]), A = c(A, P, I, O, k, 22, a[11]), O = c(O, A, P, I, S, 7, a[12]), I = c(I, O, A, P, x, 12, a[13]), P = c(P, I, O, A, T, 17, a[14]), O = f(O, A = c(A, P, I, O, E, 22, a[15]), P, I, u, 5, a[16]), I = f(I, O, A, P, m, 9, a[17]), P = f(P, I, O, A, k, 14, a[18]), A = f(A, P, I, O, s, 20, a[19]), O = f(O, A, P, I, g, 5, a[20]), I = f(I, O, A, P, _, 9, a[21]), P = f(P, I, O, A, E, 14, a[22]), A = f(A, P, I, O, v, 20, a[23]), O = f(O, A, P, I, w, 5, a[24]), I = f(I, O, A, P, T, 9, a[25]), P = f(P, I, O, A, d, 14, a[26]), A = f(A, P, I, O, b, 20, a[27]), O = f(O, A, P, I, x, 5, a[28]), I = f(I, O, A, P, p, 9, a[29]), P = f(P, I, O, A, y, 14, a[30]), O = h(O, A = f(A, P, I, O, S, 20, a[31]), P, I, g, 4, a[32]), I = h(I, O, A, P, b, 11, a[33]), P = h(P, I, O, A, k, 16, a[34]), A = h(A, P, I, O, T, 23, a[35]), O = h(O, A, P, I, u, 4, a[36]), I = h(I, O, A, P, v, 11, a[37]), P = h(P, I, O, A, y, 16, a[38]), A = h(A, P, I, O, _, 23, a[39]), O = h(O, A, P, I, x, 4, a[40]), I = h(I, O, A, P, s, 11, a[41]), P = h(P, I, O, A, d, 16, a[42]), A = h(A, P, I, O, m, 23, a[43]), O = h(O, A, P, I, w, 4, a[44]), I = h(I, O, A, P, S, 11, a[45]), P = h(P, I, O, A, E, 16, a[46]), O = l(O, A = h(A, P, I, O, p, 23, a[47]), P, I, s, 6, a[48]), I = l(I, O, A, P, y, 10, a[49]), P = l(P, I, O, A, T, 15, a[50]), A = l(A, P, I, O, g, 21, a[51]), O = l(O, A, P, I, S, 6, a[52]), I = l(I, O, A, P, d, 10, a[53]), P = l(P, I, O, A, _, 15, a[54]), A = l(A, P, I, O, u, 21, a[55]), O = l(O, A, P, I, b, 6, a[56]), I = l(I, O, A, P, E, 10, a[57]), P = l(P, I, O, A, m, 15, a[58]), A = l(A, P, I, O, x, 21, a[59]), O = l(O, A, P, I, v, 6, a[60]), I = l(I, O, A, P, k, 10, a[61]), P = l(P, I, O, A, p, 15, a[62]), A = l(A, P, I, O, w, 21, a[63]), o[0] = o[0] + O | 0, o[1] = o[1] + A | 0, o[2] = o[2] + P | 0, o[3] = o[3] + I | 0
        },
        _doFinalize: function() {
          var t = this._data,
            n = t.words,
            r = 8 * this._nDataBytes,
            i = 8 * t.sigBytes;
          n[i >>> 5] |= 128 << 24 - i % 32;
          var o = e.floor(r / 4294967296),
            s = r;
          n[15 + (i + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (i + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();
          for (var a = this._hash, u = a.words, c = 0; c < 4; c++) {
            var f = u[c];
            u[c] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8)
          }
          return a
        },
        clone: function() {
          var e = o.clone.call(this);
          return e._hash = this._hash.clone(), e
        }
      });

      function c(e, t, n, r, i, o, s) {
        var a = e + (t & n | ~t & r) + i + s;
        return (a << o | a >>> 32 - o) + t
      }

      function f(e, t, n, r, i, o, s) {
        var a = e + (t & r | n & ~r) + i + s;
        return (a << o | a >>> 32 - o) + t
      }

      function h(e, t, n, r, i, o, s) {
        var a = e + (t ^ n ^ r) + i + s;
        return (a << o | a >>> 32 - o) + t
      }

      function l(e, t, n, r, i, o, s) {
        var a = e + (n ^ (t | ~r)) + i + s;
        return (a << o | a >>> 32 - o) + t
      }
      t.MD5 = o._createHelper(u), t.HmacMD5 = o._createHmacHelper(u)
    }(Math), n.MD5)
  })), Lu((function(e, t) {
    var n, r, i;
    e.exports = (r = (n = Bu).lib.Base, i = n.enc.Utf8, void(n.algo.HMAC = r.extend({
      init: function(e, t) {
        e = this._hasher = new e.init, "string" == typeof t && (t = i.parse(t));
        var n = e.blockSize,
          r = 4 * n;
        t.sigBytes > r && (t = e.finalize(t)), t.clamp();
        for (var o = this._oKey = t.clone(), s = this._iKey = t.clone(), a = o.words, u = s.words, c = 0; c < n; c++) a[c] ^= 1549556828, u[c] ^= 909522486;
        o.sigBytes = s.sigBytes = r, this.reset()
      },
      reset: function() {
        var e = this._hasher;
        e.reset(), e.update(this._iKey)
      },
      update: function(e) {
        return this._hasher.update(e), this
      },
      finalize: function(e) {
        var t = this._hasher,
          n = t.finalize(e);
        return t.reset(), t.finalize(this._oKey.clone().concat(n))
      }
    })))
  })), Lu((function(e, t) {
    e.exports = Bu.HmacMD5
  }))),
  Vu = "FUNCTION",
  Fu = "OBJECT";

function Hu(e) {
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase()
}

function Ku(e) {
  return "object" === Hu(e)
}

function zu(e) {
  return e && "string" == typeof e ? JSON.parse(e) : e
}
var Wu = "mp-weixin",
  Gu = zu({}.UNICLOUD_DEBUG),
  Ju = zu("[]"),
  Yu = "";
try {
  Yu = "wxe080fea87f9b2b4b"
} catch (fc) {}
var Zu = {};

function Xu(e) {
  var t, n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return t = Zu, n = e, Object.prototype.hasOwnProperty.call(t, n) || (Zu[e] = r), Zu[e]
}
var Qu = ["invoke", "success", "fail", "complete"],
  ec = Xu("_globalUniCloudInterceptor");

function tc(e, t) {
  ec[e] || (ec[e] = {}), Ku(t) && Object.keys(t).forEach((function(n) {
    var r, i, o, s;
    Qu.indexOf(n) > -1 && (r = e, i = n, o = t[n], (s = ec[r][i]) || (s = ec[r][i] = []), -1 === s.indexOf(o) && "function" == typeof o && s.push(o))
  }))
}

function nc(e, t) {
  ec[e] || (ec[e] = {}), Ku(t) ? Object.keys(t).forEach((function(n) {
    Qu.indexOf(n) > -1 && function(e, t, n) {
      var r = ec[e][t];
      if (r) {
        var i = r.indexOf(n);
        i > -1 && r.splice(i, 1)
      }
    }(e, n, t[n])
  })) : delete ec[e]
}

function rc(e, t) {
  return e && 0 !== e.length ? e.reduce((function(e, n) {
    return e.then((function() {
      return n(t)
    }))
  }), Promise.resolve()) : Promise.resolve()
}

function ic(e, t) {
  return ec[e] && ec[e][t] || []
}

function oc(e, t) {
  return t ? function(n) {
    var r, i = this,
      o = !1;
    if ("callFunction" === t) {
      var s = n && n.type || Vu;
      o = s !== Vu
    }
    r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};
    var a = r.then((function() {
      return o ? Promise.resolve() : rc(ic(t, "invoke"), n)
    })).then((function() {
      return e.call(i, n)
    })).then((function(e) {
      return o ? Promise.resolve(e) : rc(ic(t, "success"), e).then((function() {
        return rc(ic(t, "complete"), e)
      })).then((function() {
        return Promise.resolve(e)
      }))
    }), (function(e) {
      return o ? Promise.reject(e) : rc(ic(t, "fail"), e).then((function() {
        return rc(ic(t, "complete"), e)
      })).then((function() {
        return Promise.reject(e)
      }))
    }));
    if (!(n.success || n.fail || n.complete)) return a;
    a.then((function(e) {
      n.success && n.success(e), n.complete && n.complete(e)
    }), (function(e) {
      n.fail && n.fail(e), n.complete && n.complete(e)
    }))
  } : function(t) {
    if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);
    e.call(this, t).then((function(e) {
      t.success && t.success(e), t.complete && t.complete(e)
    }), (function(e) {
      t.fail && t.fail(e), t.complete && t.complete(e)
    }))
  }
}
var sc, ac = function(e) {
  function t(e) {
    var n;
    return c(this, t), (n = g(this, t, [e.message])).errMsg = e.message || "", n.errCode = n.code = e.code, n.requestId = e.requestId, Object.defineProperties(i(n), {
      message: {
        get: function() {
          return this.errMsg
        },
        set: function(e) {
          this.errMsg = e
        }
      }
    }), n
  }
  return a(t, e), f(t)
}(u(Error));

function uc() {
  var e = Rt.getLocale && Rt.getLocale() || "en";
  if (sc) return r(r({}, sc), {}, {
    LOCALE: e
  });
  var t = Rt.getSystemInfoSync(),
    n = t.deviceId,
    i = t.platform;
  return r(r({}, sc = {
    PLATFORM: Wu,
    OS: i,
    APPID: Yu,
    DEVICEID: n,
    CLIENT_SDK_VERSION: "1.0.25"
  }), {}, {
    LOCALE: e
  })
}
var cc, fc, hc = function(e, t) {
    var n = "";
    return Object.keys(e).sort().forEach((function(t) {
      e[t] && (n = n + "&" + t + "=" + e[t])
    })), n = n.slice(1), qu(n, t).toString()
  },
  lc = function(e, t) {
    return new Promise((function(n, r) {
      t(Object.assign(e, {
        complete: function(e) {
          e || (e = {});
          var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];
          if (!e.statusCode || e.statusCode >= 400) return r(new ac({
            code: "SYS_ERR",
            message: e.errMsg || "request:fail",
            requestId: t
          }));
          var i = e.data;
          if (i.error) return r(new ac({
            code: i.error.code,
            message: i.error.message,
            requestId: t
          }));
          i.result = i.data, i.requestId = t, delete i.data, n(i)
        }
      }))
    }))
  },
  pc = {
    request: function(e) {
      return Rt.request(e)
    },
    uploadFile: function(e) {
      return Rt.uploadFile(e)
    },
    setStorageSync: function(e, t) {
      return Rt.setStorageSync(e, t)
    },
    getStorageSync: function(e) {
      return Rt.getStorageSync(e)
    },
    removeStorageSync: function(e) {
      return Rt.removeStorageSync(e)
    },
    clearStorageSync: function() {
      return Rt.clearStorageSync()
    }
  },
  dc = {
    "uniCloud.init.paramRequired": "{param} required",
    "uniCloud.uploadFile.fileError": "filePath should be instance of File"
  },
  vc = Uu({
    "zh-Hans": {
      "uniCloud.init.paramRequired": "缺少参数：{param}",
      "uniCloud.uploadFile.fileError": "filePath应为File对象"
    },
    "zh-Hant": {
      "uniCloud.init.paramRequired": "缺少参数：{param}",
      "uniCloud.uploadFile.fileError": "filePath应为File对象"
    },
    en: dc,
    fr: {
      "uniCloud.init.paramRequired": "{param} required",
      "uniCloud.uploadFile.fileError": "filePath should be instance of File"
    },
    es: {
      "uniCloud.init.paramRequired": "{param} required",
      "uniCloud.uploadFile.fileError": "filePath should be instance of File"
    },
    ja: dc
  }, "zh-Hans").t,
  gc = function() {
    return f((function e(t) {
      c(this, e), ["spaceId", "clientSecret"].forEach((function(e) {
        if (!Object.prototype.hasOwnProperty.call(t, e)) throw new Error(vc("uniCloud.init.paramRequired", {
          param: e
        }))
      })), this.config = Object.assign({}, {
        endpoint: "https://api.bspapp.com"
      }, t), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = pc, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null
    }), [{
      key: "hasAccessToken",
      get: function() {
        return !!this.accessToken
      }
    }, {
      key: "setAccessToken",
      value: function(e) {
        this.accessToken = e
      }
    }, {
      key: "requestWrapped",
      value: function(e) {
        return lc(e, this.adapter.request)
      }
    }, {
      key: "requestAuth",
      value: function(e) {
        return this.requestWrapped(e)
      }
    }, {
      key: "request",
      value: function(e, t) {
        var n = this;
        return Promise.resolve().then((function() {
          return n.hasAccessToken ? t ? n.requestWrapped(e) : n.requestWrapped(e).catch((function(t) {
            return new Promise((function(e, n) {
              !t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e()
            })).then((function() {
              return n.getAccessToken()
            })).then((function() {
              var t = n.rebuildRequest(e);
              return n.request(t, !0)
            }))
          })) : n.getAccessToken().then((function() {
            var t = n.rebuildRequest(e);
            return n.request(t, !0)
          }))
        }))
      }
    }, {
      key: "rebuildRequest",
      value: function(e) {
        var t = Object.assign({}, e);
        return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = hc(t.data, this.config.clientSecret), t
      }
    }, {
      key: "setupRequest",
      value: function(e, t) {
        var n = Object.assign({}, e, {
            spaceId: this.config.spaceId,
            timestamp: Date.now()
          }),
          r = {
            "Content-Type": "application/json"
          };
        return "auth" !== t && (n.token = this.accessToken, r["x-basement-token"] = this.accessToken), r["x-serverless-sign"] = hc(n, this.config.clientSecret), {
          url: this.config.requestUrl,
          method: "POST",
          data: n,
          dataType: "json",
          header: r
        }
      }
    }, {
      key: "getAccessToken",
      value: function() {
        var e = this;
        return "pending" === this._getAccessTokenPromiseStatus || (this._getAccessTokenPromiseStatus = "pending", this._getAccessTokenPromise = this.requestAuth(this.setupRequest({
          method: "serverless.auth.user.anonymousAuthorize",
          params: "{}"
        }, "auth")).then((function(t) {
          return new Promise((function(n, r) {
            t.result && t.result.accessToken ? (e.setAccessToken(t.result.accessToken), e._getAccessTokenPromiseStatus = "fulfilled", n(e.accessToken)) : (e._getAccessTokenPromiseStatus = "rejected", r(new ac({
              code: "AUTH_FAILED",
              message: "获取accessToken失败"
            })))
          }))
        }), (function(t) {
          return e._getAccessTokenPromiseStatus = "rejected", Promise.reject(t)
        }))), this._getAccessTokenPromise
      }
    }, {
      key: "authorize",
      value: function() {
        this.getAccessToken()
      }
    }, {
      key: "callFunction",
      value: function(e) {
        var t = {
          method: "serverless.function.runtime.invoke",
          params: JSON.stringify({
            functionTarget: e.name,
            functionArgs: e.data || {}
          })
        };
        return this.request(this.setupRequest(t))
      }
    }, {
      key: "getOSSUploadOptionsFromPath",
      value: function(e) {
        var t = {
          method: "serverless.file.resource.generateProximalSign",
          params: JSON.stringify(e)
        };
        return this.request(this.setupRequest(t))
      }
    }, {
      key: "uploadFileToOSS",
      value: function(e) {
        var t = this,
          n = e.url,
          r = e.formData,
          i = e.name,
          o = e.filePath,
          s = e.fileType,
          a = e.onUploadProgress;
        return new Promise((function(e, u) {
          var c = t.adapter.uploadFile({
            url: n,
            formData: r,
            name: i,
            filePath: o,
            fileType: s,
            header: {
              "X-OSS-server-side-encrpytion": "AES256"
            },
            success: function(t) {
              t && t.statusCode < 400 ? e(t) : u(new ac({
                code: "UPLOAD_FAILED",
                message: "文件上传失败"
              }))
            },
            fail: function(e) {
              u(new ac({
                code: e.code || "UPLOAD_FAILED",
                message: e.message || e.errMsg || "文件上传失败"
              }))
            }
          });
          "function" == typeof a && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate((function(e) {
            a({
              loaded: e.totalBytesSent,
              total: e.totalBytesExpectedToSend
            })
          }))
        }))
      }
    }, {
      key: "reportOSSUpload",
      value: function(e) {
        var t = {
          method: "serverless.file.resource.report",
          params: JSON.stringify(e)
        };
        return this.request(this.setupRequest(t))
      }
    }, {
      key: "uploadFile",
      value: function(e) {
        var t = this,
          n = e.filePath,
          r = e.cloudPath,
          i = e.fileType,
          o = void 0 === i ? "image" : i,
          s = e.onUploadProgress,
          a = e.config;
        if ("string" !== Hu(r)) throw new ac({
          code: "INVALID_PARAM",
          message: "cloudPath必须为字符串类型"
        });
        if (!(r = r.trim())) throw new ac({
          code: "CLOUDPATH_REQUIRED",
          message: "cloudPath不可为空"
        });
        if (/:\/\//.test(r)) throw new ac({
          code: "INVALID_PARAM",
          message: "cloudPath不合法"
        });
        var u, c, f = a && a.envType || this.config.envType;
        return this.getOSSUploadOptionsFromPath({
          env: f,
          filename: r
        }).then((function(e) {
          var r = e.result;
          u = r.id, c = "https://" + r.cdnDomain + "/" + r.ossPath;
          var i = {
            url: "https://" + r.host,
            formData: {
              "Cache-Control": "max-age=2592000",
              "Content-Disposition": "attachment",
              OSSAccessKeyId: r.accessKeyId,
              Signature: r.signature,
              host: r.host,
              id: u,
              key: r.ossPath,
              policy: r.policy,
              success_action_status: 200
            },
            fileName: "file",
            name: "file",
            filePath: n,
            fileType: o
          };
          return t.uploadFileToOSS(Object.assign({}, i, {
            onUploadProgress: s
          }))
        })).then((function() {
          return t.reportOSSUpload({
            id: u
          })
        })).then((function(e) {
          return new Promise((function(t, r) {
            e.success ? t({
              success: !0,
              filePath: n,
              fileID: c
            }) : r(new ac({
              code: "UPLOAD_FAILED",
              message: "文件上传失败"
            }))
          }))
        }))
      }
    }, {
      key: "deleteFile",
      value: function(e) {
        var t = e.fileList,
          n = {
            method: "serverless.file.resource.delete",
            params: JSON.stringify({
              id: t[0]
            })
          };
        return this.request(this.setupRequest(n))
      }
    }, {
      key: "getTempFileURL",
      value: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.fileList;
        return new Promise((function(e, n) {
          Array.isArray(t) && 0 !== t.length || n(new ac({
            code: "INVALID_PARAM",
            message: "fileList的元素必须是非空的字符串"
          })), e({
            fileList: t.map((function(e) {
              return {
                fileID: e,
                tempFileURL: e
              }
            }))
          })
        }))
      }
    }])
  }(),
  mc = function(e) {
    var t = new gc(e),
      n = {
        signInAnonymously: function() {
          return t.authorize()
        },
        getLoginState: function() {
          return Promise.resolve(!1)
        }
      };
    return t.auth = function() {
      return n
    }, t.customAuth = t.auth, t
  },
  yc = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
(fc = cc || (cc = {})).local = "local", fc.none = "none", fc.session = "session";
var bc, wc = function() {},
  _c = function() {
    var e;
    if (!Promise) {
      (e = function() {}).promise = {};
      var t = function() {
        throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.')
      };
      return Object.defineProperty(e.promise, "then", {
        get: t
      }), Object.defineProperty(e.promise, "catch", {
        get: t
      }), e
    }
    var n = new Promise((function(t, n) {
      e = function(e, r) {
        return e ? n(e) : t(r)
      }
    }));
    return e.promise = n, e
  };

function kc(e) {
  return void 0 === e
}

function Sc(e) {
  return "[object Null]" === Object.prototype.toString.call(e)
}! function(e) {
  e.WEB = "web", e.WX_MP = "wx_mp"
}(bc || (bc = {}));
var xc = {
    adapter: null,
    runtime: void 0
  },
  Tc = ["anonymousUuidKey"],
  Ec = function(e) {
    function t() {
      var e;
      return c(this, t), e = g(this, t), xc.adapter.root.tcbObject || (xc.adapter.root.tcbObject = {}), e
    }
    return a(t, wc), f(t, [{
      key: "setItem",
      value: function(e, t) {
        xc.adapter.root.tcbObject[e] = t
      }
    }, {
      key: "getItem",
      value: function(e) {
        return xc.adapter.root.tcbObject[e]
      }
    }, {
      key: "removeItem",
      value: function(e) {
        delete xc.adapter.root.tcbObject[e]
      }
    }, {
      key: "clear",
      value: function() {
        delete xc.adapter.root.tcbObject
      }
    }])
  }();

function Oc(e, t) {
  switch (e) {
    case "local":
      return t.localStorage || new Ec;
    case "none":
      return new Ec;
    default:
      return t.sessionStorage || new Ec
  }
}
var Ac = function() {
    return f((function e(t) {
      if (c(this, e), !this._storage) {
        this._persistence = xc.adapter.primaryStorage || t.persistence, this._storage = Oc(this._persistence, xc.adapter);
        var n = "access_token_".concat(t.env),
          r = "access_token_expire_".concat(t.env),
          i = "refresh_token_".concat(t.env),
          o = "anonymous_uuid_".concat(t.env),
          s = "login_type_".concat(t.env),
          a = "user_info_".concat(t.env);
        this.keys = {
          accessTokenKey: n,
          accessTokenExpireKey: r,
          refreshTokenKey: i,
          anonymousUuidKey: o,
          loginTypeKey: s,
          userInfoKey: a
        }
      }
    }), [{
      key: "updatePersistence",
      value: function(e) {
        if (e !== this._persistence) {
          var t = "local" === this._persistence;
          this._persistence = e;
          var n = Oc(e, xc.adapter);
          for (var r in this.keys) {
            var i = this.keys[r];
            if (!t || !Tc.includes(r)) {
              var o = this._storage.getItem(i);
              kc(o) || Sc(o) || (n.setItem(i, o), this._storage.removeItem(i))
            }
          }
          this._storage = n
        }
      }
    }, {
      key: "setStore",
      value: function(e, t, n) {
        if (this._storage) {
          var r = {
              version: n || "localCachev1",
              content: t
            },
            i = JSON.stringify(r);
          try {
            this._storage.setItem(e, i)
          } catch (e) {
            throw e
          }
        }
      }
    }, {
      key: "getStore",
      value: function(e, t) {
        try {
          if (!this._storage) return
        } catch (e) {
          return ""
        }
        t = t || "localCachev1";
        var n = this._storage.getItem(e);
        return n && n.indexOf(t) >= 0 ? JSON.parse(n).content : ""
      }
    }, {
      key: "removeStore",
      value: function(e) {
        this._storage.removeItem(e)
      }
    }])
  }(),
  Pc = {},
  Ic = {};

function Dc(e) {
  return Pc[e]
}
var Cc = f((function e(t, n) {
    c(this, e), this.data = n || null, this.name = t
  })),
  Rc = function(e) {
    function t(e, n) {
      var r;
      return c(this, t), (r = g(this, t, ["error", {
        error: e,
        data: n
      }])).error = e, r
    }
    return a(t, Cc), f(t)
  }(),
  $c = new(function() {
    return f((function e() {
      c(this, e), this._listeners = {}
    }), [{
      key: "on",
      value: function(e, t) {
        return n = e, r = t, (i = this._listeners)[n] = i[n] || [], i[n].push(r), this;
        var n, r, i
      }
    }, {
      key: "off",
      value: function(e, t) {
        return function(e, t, n) {
          if (n && n[e]) {
            var r = n[e].indexOf(t); - 1 !== r && n[e].splice(r, 1)
          }
        }(e, t, this._listeners), this
      }
    }, {
      key: "fire",
      value: function(e, t) {
        if (e instanceof Rc) return console.error(e.error), this;
        var n = "string" == typeof e ? new Cc(e, t || {}) : e,
          r = n.name;
        if (this._listens(r)) {
          n.target = this;
          var i, o = this._listeners[r] ? p(this._listeners[r]) : [],
            s = v(o);
          try {
            for (s.s(); !(i = s.n()).done;) {
              i.value.call(this, n)
            }
          } catch (e) {
            s.e(e)
          } finally {
            s.f()
          }
        }
        return this
      }
    }, {
      key: "_listens",
      value: function(e) {
        return this._listeners[e] && this._listeners[e].length > 0
      }
    }])
  }());

function jc(e, t) {
  $c.on(e, t)
}

function Mc(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  $c.fire(e, t)
}

function Nc(e, t) {
  $c.off(e, t)
}
var Uc, Lc = "loginStateChanged",
  Bc = "loginStateExpire",
  qc = "loginTypeChanged",
  Vc = "anonymousConverted",
  Fc = "refreshAccessToken";
! function(e) {
  e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL"
}(Uc || (Uc = {}));
var Hc = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],
  Kc = {
    "X-SDK-Version": "1.3.5"
  };

function zc(e, t, n) {
  var i = e[t];
  e[t] = function(t) {
    var o = {},
      s = {};
    n.forEach((function(n) {
      var r = n.call(e, t),
        i = r.data,
        a = r.headers;
      Object.assign(o, i), Object.assign(s, a)
    }));
    var a = t.data;
    return a && function() {
      var e;
      if (e = a, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = r(r({}, a), o);
      else
        for (var n in o) a.append(n, o[n])
    }(), t.headers = r(r({}, t.headers || {}), s), i.call(e, t)
  }
}

function Wc() {
  var e = Math.random().toString(16).slice(2);
  return {
    data: {
      seqId: e
    },
    headers: r(r({}, Kc), {}, {
      "x-seqid": e
    })
  }
}
var Gc = function() {
    return f((function e() {
      var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      c(this, e), this.config = n, this._reqClass = new xc.adapter.reqClass({
        timeout: this.config.timeout,
        timeoutMsg: "请求在".concat(this.config.timeout / 1e3, "s内未完成，已中断"),
        restrictedMethods: ["post"]
      }), this._cache = Dc(this.config.env), this._localCache = (t = this.config.env, Ic[t]), zc(this._reqClass, "post", [Wc]), zc(this._reqClass, "upload", [Wc]), zc(this._reqClass, "download", [Wc])
    }), [{
      key: "post",
      value: (l = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._reqClass.post(n);
            case 2:
              return e.abrupt("return", e.sent);
            case 3:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return l.apply(this, arguments)
      })
    }, {
      key: "upload",
      value: (h = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._reqClass.upload(n);
            case 2:
              return e.abrupt("return", e.sent);
            case 3:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return h.apply(this, arguments)
      })
    }, {
      key: "download",
      value: (u = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._reqClass.download(n);
            case 2:
              return e.abrupt("return", e.sent);
            case 3:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return u.apply(this, arguments)
      })
    }, {
      key: "refreshAccessToken",
      value: (a = t(e().mark((function t() {
        var n, r;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken()), e.prev = 1, e.next = 4, this._refreshAccessTokenPromise;
            case 4:
              n = e.sent, e.next = 10;
              break;
            case 7:
              e.prev = 7, e.t0 = e.catch(1), r = e.t0;
            case 10:
              if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, !r) {
                e.next = 12;
                break
              }
              throw r;
            case 12:
              return e.abrupt("return", n);
            case 13:
            case "end":
              return e.stop()
          }
        }), t, this, [
          [1, 7]
        ])
      }))), function() {
        return a.apply(this, arguments)
      })
    }, {
      key: "_refreshAccessToken",
      value: (s = t(e().mark((function t() {
        var n, r, i, o, s, a, u, c, f, h, l, p, d;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (n = this._cache.keys, r = n.accessTokenKey, i = n.accessTokenExpireKey, o = n.refreshTokenKey, s = n.loginTypeKey, a = n.anonymousUuidKey, this._cache.removeStore(r), this._cache.removeStore(i), u = this._cache.getStore(o)) {
                e.next = 5;
                break
              }
              throw new Error("未登录CloudBase");
            case 5:
              return c = {
                refresh_token: u
              }, e.next = 8, this.request("auth.fetchAccessTokenWithRefreshToken", c);
            case 8:
              if (!(f = e.sent).data.code) {
                e.next = 21;
                break
              }
              if ("SIGN_PARAM_INVALID" !== (h = f.data.code) && "REFRESH_TOKEN_EXPIRED" !== h && "INVALID_REFRESH_TOKEN" !== h) {
                e.next = 20;
                break
              }
              if (this._cache.getStore(s) !== Uc.ANONYMOUS || "INVALID_REFRESH_TOKEN" !== h) {
                e.next = 19;
                break
              }
              return l = this._cache.getStore(a), p = this._cache.getStore(o), e.next = 17, this.send("auth.signInAnonymously", {
                anonymous_uuid: l,
                refresh_token: p
              });
            case 17:
              return d = e.sent, e.abrupt("return", (this.setRefreshToken(d.refresh_token), this._refreshAccessToken()));
            case 19:
              Mc(Bc), this._cache.removeStore(o);
            case 20:
              throw new Error("刷新access token失败：".concat(f.data.code));
            case 21:
              if (!f.data.access_token) {
                e.next = 23;
                break
              }
              return e.abrupt("return", (Mc(Fc), this._cache.setStore(r, f.data.access_token), this._cache.setStore(i, f.data.access_token_expire + Date.now()), {
                accessToken: f.data.access_token,
                accessTokenExpire: f.data.access_token_expire
              }));
            case 23:
              f.data.refresh_token && (this._cache.removeStore(o), this._cache.setStore(o, f.data.refresh_token), this._refreshAccessToken());
            case 24:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return s.apply(this, arguments)
      })
    }, {
      key: "getAccessToken",
      value: (o = t(e().mark((function t() {
        var n, r, i, o, s, a, u;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (n = this._cache.keys, r = n.accessTokenKey, i = n.accessTokenExpireKey, o = n.refreshTokenKey, this._cache.getStore(o)) {
                e.next = 3;
                break
              }
              throw new Error("refresh token不存在，登录状态异常");
            case 3:
              if (s = this._cache.getStore(r), a = this._cache.getStore(i), u = !0, e.t0 = this._shouldRefreshAccessTokenHook, !e.t0) {
                e.next = 9;
                break
              }
              return e.next = 8, this._shouldRefreshAccessTokenHook(s, a);
            case 8:
              e.t0 = !e.sent;
            case 9:
              if (e.t1 = e.t0, !e.t1) {
                e.next = 12;
                break
              }
              u = !1;
            case 12:
              return e.abrupt("return", (!s || !a || a < Date.now()) && u ? this.refreshAccessToken() : {
                accessToken: s,
                accessTokenExpire: a
              });
            case 13:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return o.apply(this, arguments)
      })
    }, {
      key: "request",
      value: (i = t(e().mark((function t(n, i, o) {
        var s, a, u, c, f, h, l, p, d, v, g, m, y, b, w, _;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (s = "x-tcb-trace_".concat(this.config.env), a = "application/x-www-form-urlencoded", u = r({
                  action: n,
                  env: this.config.env,
                  dataVersion: "2019-08-16"
                }, i), -1 !== Hc.indexOf(n)) {
                e.next = 10;
                break
              }
              if (c = this._cache.keys.refreshTokenKey, e.t0 = this._cache.getStore(c), !e.t0) {
                e.next = 10;
                break
              }
              return e.next = 9, this.getAccessToken();
            case 9:
              u.access_token = e.sent.accessToken;
            case 10:
              if ("storage.uploadFile" === n) {
                for (h in f = new FormData) f.hasOwnProperty(h) && void 0 !== f[h] && f.append(h, u[h]);
                a = "multipart/form-data"
              } else
                for (l in a = "application/json", f = {}, u) void 0 !== u[l] && (f[l] = u[l]);
              return p = {
                headers: {
                  "content-type": a
                }
              }, o && o.onUploadProgress && (p.onUploadProgress = o.onUploadProgress), (d = this._localCache.getStore(s)) && (p.headers["X-TCB-Trace"] = d), v = i.parse, g = i.inQuery, m = i.search, y = {
                env: this.config.env
              }, v && (y.parse = !0), g && (y = r(r({}, g), y)), b = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                  r = /\?/.test(t),
                  i = "";
                for (var o in n) "" === i ? !r && (t += "?") : i += "&", i += "".concat(o, "=").concat(encodeURIComponent(n[o]));
                return /^http(s)?\:\/\//.test(t += i) ? t : "".concat(e).concat(t)
              }(yc, "//tcb-api.tencentcloudapi.com/web", y), m && (b += m), e.next = 22, this.post(r({
                url: b,
                data: f
              }, p));
            case 22:
              if (w = e.sent, (_ = w.header && w.header["x-tcb-trace"]) && this._localCache.setStore(s, _), (200 === Number(w.status) || 200 === Number(w.statusCode)) && w.data) {
                e.next = 26;
                break
              }
              throw new Error("network request error");
            case 26:
              return e.abrupt("return", w);
            case 27:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t, n) {
        return i.apply(this, arguments)
      })
    }, {
      key: "send",
      value: (n = t(e().mark((function t(n) {
        var r, i, o, s = arguments;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return r = s.length > 1 && void 0 !== s[1] ? s[1] : {}, e.next = 3, this.request(n, r, {
                onUploadProgress: r.onUploadProgress
              });
            case 3:
              if ("ACCESS_TOKEN_EXPIRED" !== (i = e.sent).data.code || -1 !== Hc.indexOf(n)) {
                e.next = 13;
                break
              }
              return e.next = 7, this.refreshAccessToken();
            case 7:
              return e.next = 9, this.request(n, r, {
                onUploadProgress: r.onUploadProgress
              });
            case 9:
              if (!(o = e.sent).data.code) {
                e.next = 12;
                break
              }
              throw new Error("[".concat(o.data.code, "] ").concat(o.data.message));
            case 12:
              return e.abrupt("return", o.data);
            case 13:
              if (!i.data.code) {
                e.next = 15;
                break
              }
              throw new Error("[".concat(i.data.code, "] ").concat(i.data.message));
            case 15:
              return e.abrupt("return", i.data);
            case 16:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return n.apply(this, arguments)
      })
    }, {
      key: "setRefreshToken",
      value: function(e) {
        var t = this._cache.keys,
          n = t.accessTokenKey,
          r = t.accessTokenExpireKey,
          i = t.refreshTokenKey;
        this._cache.removeStore(n), this._cache.removeStore(r), this._cache.setStore(i, e)
      }
    }]);
    var n, i, o, s, a, u, h, l
  }(),
  Jc = {};

function Yc(e) {
  return Jc[e]
}
var Zc = function() {
    return f((function e(t) {
      c(this, e), this.config = t, this._cache = Dc(t.env), this._request = Yc(t.env)
    }), [{
      key: "setRefreshToken",
      value: function(e) {
        var t = this._cache.keys,
          n = t.accessTokenKey,
          r = t.accessTokenExpireKey,
          i = t.refreshTokenKey;
        this._cache.removeStore(n), this._cache.removeStore(r), this._cache.setStore(i, e)
      }
    }, {
      key: "setAccessToken",
      value: function(e, t) {
        var n = this._cache.keys,
          r = n.accessTokenKey,
          i = n.accessTokenExpireKey;
        this._cache.setStore(r, e), this._cache.setStore(i, t)
      }
    }, {
      key: "refreshUserInfo",
      value: (n = t(e().mark((function t() {
        var n, r;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._request.send("auth.getUserInfo", {});
            case 2:
              return n = e.sent, r = n.data, e.abrupt("return", (this.setLocalUserInfo(r), r));
            case 5:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return n.apply(this, arguments)
      })
    }, {
      key: "setLocalUserInfo",
      value: function(e) {
        var t = this._cache.keys.userInfoKey;
        this._cache.setStore(t, e)
      }
    }]);
    var n
  }(),
  Xc = function() {
    return f((function e(t) {
      if (c(this, e), !t) throw new Error("envId is not defined");
      this._envId = t, this._cache = Dc(this._envId), this._request = Yc(this._envId), this.setUserInfo()
    }), [{
      key: "linkWithTicket",
      value: function(e) {
        if ("string" != typeof e) throw new Error("ticket must be string");
        return this._request.send("auth.linkWithTicket", {
          ticket: e
        })
      }
    }, {
      key: "linkWithRedirect",
      value: function(e) {
        e.signInWithRedirect()
      }
    }, {
      key: "updatePassword",
      value: function(e, t) {
        return this._request.send("auth.updatePassword", {
          oldPassword: t,
          newPassword: e
        })
      }
    }, {
      key: "updateEmail",
      value: function(e) {
        return this._request.send("auth.updateEmail", {
          newEmail: e
        })
      }
    }, {
      key: "updateUsername",
      value: function(e) {
        if ("string" != typeof e) throw new Error("username must be a string");
        return this._request.send("auth.updateUsername", {
          username: e
        })
      }
    }, {
      key: "getLinkedUidList",
      value: (i = t(e().mark((function t() {
        var n, r, i, o;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._request.send("auth.getLinkedUidList", {});
            case 2:
              return n = e.sent, r = n.data, i = !1, o = r.users, e.abrupt("return", (o.forEach((function(e) {
                e.wxOpenId && e.wxPublicId && (i = !0)
              })), {
                users: o,
                hasPrimaryUid: i
              }));
            case 7:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return i.apply(this, arguments)
      })
    }, {
      key: "setPrimaryUid",
      value: function(e) {
        return this._request.send("auth.setPrimaryUid", {
          uid: e
        })
      }
    }, {
      key: "unlink",
      value: function(e) {
        return this._request.send("auth.unlink", {
          platform: e
        })
      }
    }, {
      key: "update",
      value: (r = t(e().mark((function t(n) {
        var r, i, o, s, a, u, c, f;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return r = n.nickName, i = n.gender, o = n.avatarUrl, s = n.province, a = n.country, u = n.city, e.next = 8, this._request.send("auth.updateUserInfo", {
                nickName: r,
                gender: i,
                avatarUrl: o,
                province: s,
                country: a,
                city: u
              });
            case 8:
              c = e.sent, f = c.data, this.setLocalUserInfo(f);
            case 11:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return r.apply(this, arguments)
      })
    }, {
      key: "refresh",
      value: (n = t(e().mark((function t() {
        var n, r;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._request.send("auth.getUserInfo", {});
            case 2:
              return n = e.sent, r = n.data, e.abrupt("return", (this.setLocalUserInfo(r), r));
            case 5:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return n.apply(this, arguments)
      })
    }, {
      key: "setUserInfo",
      value: function() {
        var e = this,
          t = this._cache.keys.userInfoKey,
          n = this._cache.getStore(t);
        ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((function(t) {
          e[t] = n[t]
        })), this.location = {
          country: n.country,
          province: n.province,
          city: n.city
        }
      }
    }, {
      key: "setLocalUserInfo",
      value: function(e) {
        var t = this._cache.keys.userInfoKey;
        this._cache.setStore(t, e), this.setUserInfo()
      }
    }]);
    var n, r, i
  }(),
  Qc = function() {
    return f((function e(t) {
      if (c(this, e), !t) throw new Error("envId is not defined");
      this._cache = Dc(t);
      var n = this._cache.keys,
        r = n.refreshTokenKey,
        i = n.accessTokenKey,
        o = n.accessTokenExpireKey,
        s = this._cache.getStore(r),
        a = this._cache.getStore(i),
        u = this._cache.getStore(o);
      this.credential = {
        refreshToken: s,
        accessToken: a,
        accessTokenExpire: u
      }, this.user = new Xc(t)
    }), [{
      key: "isAnonymousAuth",
      get: function() {
        return this.loginType === Uc.ANONYMOUS
      }
    }, {
      key: "isCustomAuth",
      get: function() {
        return this.loginType === Uc.CUSTOM
      }
    }, {
      key: "isWeixinAuth",
      get: function() {
        return this.loginType === Uc.WECHAT || this.loginType === Uc.WECHAT_OPEN || this.loginType === Uc.WECHAT_PUBLIC
      }
    }, {
      key: "loginType",
      get: function() {
        return this._cache.getStore(this._cache.keys.loginTypeKey)
      }
    }])
  }(),
  ef = function(n) {
    function r() {
      return c(this, r), g(this, r, arguments)
    }
    return a(r, Zc), f(r, [{
      key: "signIn",
      value: (o = t(e().mark((function t() {
        var n, r, i, o, s, a, u;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return this._cache.updatePersistence("local"), n = this._cache.keys, r = n.anonymousUuidKey, i = n.refreshTokenKey, o = this._cache.getStore(r) || void 0, s = this._cache.getStore(i) || void 0, e.next = 8, this._request.send("auth.signInAnonymously", {
                anonymous_uuid: o,
                refresh_token: s
              });
            case 8:
              if (!(a = e.sent).uuid || !a.refresh_token) {
                e.next = 20;
                break
              }
              return this._setAnonymousUUID(a.uuid), this.setRefreshToken(a.refresh_token), e.next = 14, this._request.refreshAccessToken();
            case 14:
              return Mc(Lc), Mc(qc, {
                env: this.config.env,
                loginType: Uc.ANONYMOUS,
                persistence: "local"
              }), u = new Qc(this.config.env), e.next = 19, u.user.refresh();
            case 19:
              return e.abrupt("return", u);
            case 20:
              throw new Error("匿名登录失败");
            case 21:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return o.apply(this, arguments)
      })
    }, {
      key: "linkAndRetrieveDataWithTicket",
      value: (i = t(e().mark((function t(n) {
        var r, i, o, s, a, u;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return r = this._cache.keys, i = r.anonymousUuidKey, o = r.refreshTokenKey, s = this._cache.getStore(i), a = this._cache.getStore(o), e.next = 7, this._request.send("auth.linkAndRetrieveDataWithTicket", {
                anonymous_uuid: s,
                refresh_token: a,
                ticket: n
              });
            case 7:
              if (!(u = e.sent).refresh_token) {
                e.next = 16;
                break
              }
              return this._clearAnonymousUUID(), this.setRefreshToken(u.refresh_token), e.next = 13, this._request.refreshAccessToken();
            case 13:
              return Mc(Vc, {
                env: this.config.env
              }), Mc(qc, {
                loginType: Uc.CUSTOM,
                persistence: "local"
              }), e.abrupt("return", {
                credential: {
                  refreshToken: u.refresh_token
                }
              });
            case 16:
              throw new Error("匿名转化失败");
            case 17:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return i.apply(this, arguments)
      })
    }, {
      key: "_setAnonymousUUID",
      value: function(e) {
        var t = this._cache.keys,
          n = t.anonymousUuidKey,
          r = t.loginTypeKey;
        this._cache.removeStore(n), this._cache.setStore(n, e), this._cache.setStore(r, Uc.ANONYMOUS)
      }
    }, {
      key: "_clearAnonymousUUID",
      value: function() {
        this._cache.removeStore(this._cache.keys.anonymousUuidKey)
      }
    }]);
    var i, o
  }(),
  tf = function(n) {
    function r() {
      return c(this, r), g(this, r, arguments)
    }
    return a(r, Zc), f(r, [{
      key: "signIn",
      value: (i = t(e().mark((function t(n) {
        var r, i;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if ("string" == typeof n) {
                e.next = 2;
                break
              }
              throw new Error("ticket must be a string");
            case 2:
              return r = this._cache.keys.refreshTokenKey, e.next = 5, this._request.send("auth.signInWithTicket", {
                ticket: n,
                refresh_token: this._cache.getStore(r) || ""
              });
            case 5:
              if (!(i = e.sent).refresh_token) {
                e.next = 15;
                break
              }
              return this.setRefreshToken(i.refresh_token), e.next = 10, this._request.refreshAccessToken();
            case 10:
              return Mc(Lc), Mc(qc, {
                env: this.config.env,
                loginType: Uc.CUSTOM,
                persistence: this.config.persistence
              }), e.next = 14, this.refreshUserInfo();
            case 14:
              return e.abrupt("return", new Qc(this.config.env));
            case 15:
              throw new Error("自定义登录失败");
            case 16:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return i.apply(this, arguments)
      })
    }]);
    var i
  }(),
  nf = function(n) {
    function r() {
      return c(this, r), g(this, r, arguments)
    }
    return a(r, Zc), f(r, [{
      key: "signIn",
      value: (s = t(e().mark((function t(n, r) {
        var i, o, s, a, u;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if ("string" == typeof n) {
                e.next = 2;
                break
              }
              throw new Error("email must be a string");
            case 2:
              return i = this._cache.keys.refreshTokenKey, e.next = 5, this._request.send("auth.signIn", {
                loginType: "EMAIL",
                email: n,
                password: r,
                refresh_token: this._cache.getStore(i) || ""
              });
            case 5:
              if (o = e.sent, s = o.refresh_token, a = o.access_token, u = o.access_token_expire, !s) {
                e.next = 22;
                break
              }
              if (this.setRefreshToken(s), !a || !u) {
                e.next = 15;
                break
              }
              this.setAccessToken(a, u), e.next = 17;
              break;
            case 15:
              return e.next = 17, this._request.refreshAccessToken();
            case 17:
              return e.next = 19, this.refreshUserInfo();
            case 19:
              return Mc(Lc), Mc(qc, {
                env: this.config.env,
                loginType: Uc.EMAIL,
                persistence: this.config.persistence
              }), e.abrupt("return", new Qc(this.config.env));
            case 22:
              throw o.code ? new Error("邮箱登录失败: [".concat(o.code, "] ").concat(o.message)) : new Error("邮箱登录失败");
            case 23:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t) {
        return s.apply(this, arguments)
      })
    }, {
      key: "activate",
      value: (o = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", this._request.send("auth.activateEndUserMail", {
                token: n
              }));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return o.apply(this, arguments)
      })
    }, {
      key: "resetPasswordWithToken",
      value: (i = t(e().mark((function t(n, r) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", this._request.send("auth.resetPasswordWithToken", {
                token: n,
                newPassword: r
              }));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t) {
        return i.apply(this, arguments)
      })
    }]);
    var i, o, s
  }(),
  rf = function(n) {
    function r() {
      return c(this, r), g(this, r, arguments)
    }
    return a(r, Zc), f(r, [{
      key: "signIn",
      value: (i = t(e().mark((function t(n, r) {
        var i, o, s, a, u;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if ("string" == typeof n) {
                e.next = 2;
                break
              }
              throw new Error("username must be a string");
            case 2:
              return "string" != typeof r && (r = "", console.warn("password is empty")), i = this._cache.keys.refreshTokenKey, e.next = 6, this._request.send("auth.signIn", {
                loginType: Uc.USERNAME,
                username: n,
                password: r,
                refresh_token: this._cache.getStore(i) || ""
              });
            case 6:
              if (o = e.sent, s = o.refresh_token, a = o.access_token_expire, u = o.access_token, !s) {
                e.next = 23;
                break
              }
              if (this.setRefreshToken(s), !u || !a) {
                e.next = 16;
                break
              }
              this.setAccessToken(u, a), e.next = 18;
              break;
            case 16:
              return e.next = 18, this._request.refreshAccessToken();
            case 18:
              return e.next = 20, this.refreshUserInfo();
            case 20:
              return Mc(Lc), Mc(qc, {
                env: this.config.env,
                loginType: Uc.USERNAME,
                persistence: this.config.persistence
              }), e.abrupt("return", new Qc(this.config.env));
            case 23:
              throw o.code ? new Error("用户名密码登录失败: [".concat(o.code, "] ").concat(o.message)) : new Error("用户名密码登录失败");
            case 24:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t) {
        return i.apply(this, arguments)
      })
    }]);
    var i
  }(),
  of = function() {
    return f((function e(t) {
      c(this, e), this.config = t, this._cache = Dc(t.env), this._request = Yc(t.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), jc(qc, this._onLoginTypeChanged)
    }), [{
      key: "currentUser",
      get: function() {
        var e = this.hasLoginState();
        return e && e.user || null
      }
    }, {
      key: "loginType",
      get: function() {
        return this._cache.getStore(this._cache.keys.loginTypeKey)
      }
    }, {
      key: "anonymousAuthProvider",
      value: function() {
        return new ef(this.config)
      }
    }, {
      key: "customAuthProvider",
      value: function() {
        return new tf(this.config)
      }
    }, {
      key: "emailAuthProvider",
      value: function() {
        return new nf(this.config)
      }
    }, {
      key: "usernameAuthProvider",
      value: function() {
        return new rf(this.config)
      }
    }, {
      key: "signInAnonymously",
      value: (p = t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", new ef(this.config).signIn());
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return p.apply(this, arguments)
      })
    }, {
      key: "signInWithEmailAndPassword",
      value: (l = t(e().mark((function t(n, r) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", new nf(this.config).signIn(n, r));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t) {
        return l.apply(this, arguments)
      })
    }, {
      key: "signInWithUsernameAndPassword",
      value: function(e, t) {
        return new rf(this.config).signIn(e, t)
      }
    }, {
      key: "linkAndRetrieveDataWithTicket",
      value: (h = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return this._anonymousAuthProvider || (this._anonymousAuthProvider = new ef(this.config)), jc(Vc, this._onAnonymousConverted), e.next = 3, this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(n);
            case 3:
              return e.abrupt("return", e.sent);
            case 4:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return h.apply(this, arguments)
      })
    }, {
      key: "signOut",
      value: (u = t(e().mark((function t() {
        var n, r, i, o, s, a;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (this.loginType !== Uc.ANONYMOUS) {
                e.next = 2;
                break
              }
              throw new Error("匿名用户不支持登出操作");
            case 2:
              if (n = this._cache.keys, r = n.refreshTokenKey, i = n.accessTokenKey, o = n.accessTokenExpireKey, s = this._cache.getStore(r)) {
                e.next = 5;
                break
              }
              return e.abrupt("return");
            case 5:
              return e.next = 7, this._request.send("auth.logout", {
                refresh_token: s
              });
            case 7:
              return a = e.sent, e.abrupt("return", (this._cache.removeStore(r), this._cache.removeStore(i), this._cache.removeStore(o), Mc(Lc), Mc(qc, {
                env: this.config.env,
                loginType: Uc.NULL,
                persistence: this.config.persistence
              }), a));
            case 9:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return u.apply(this, arguments)
      })
    }, {
      key: "signUpWithEmailAndPassword",
      value: (a = t(e().mark((function t(n, r) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", {
                email: n,
                password: r
              }));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t) {
        return a.apply(this, arguments)
      })
    }, {
      key: "sendPasswordResetEmail",
      value: (s = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", this._request.send("auth.sendPasswordResetEmail", {
                email: n
              }));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return s.apply(this, arguments)
      })
    }, {
      key: "onLoginStateChanged",
      value: function(e) {
        var t = this;
        jc(Lc, (function() {
          var n = t.hasLoginState();
          e.call(t, n)
        }));
        var n = this.hasLoginState();
        e.call(this, n)
      }
    }, {
      key: "onLoginStateExpired",
      value: function(e) {
        jc(Bc, e.bind(this))
      }
    }, {
      key: "onAccessTokenRefreshed",
      value: function(e) {
        jc(Fc, e.bind(this))
      }
    }, {
      key: "onAnonymousConverted",
      value: function(e) {
        jc(Vc, e.bind(this))
      }
    }, {
      key: "onLoginTypeChanged",
      value: function(e) {
        var t = this;
        jc(qc, (function() {
          var n = t.hasLoginState();
          e.call(t, n)
        }))
      }
    }, {
      key: "getAccessToken",
      value: (o = t(e().mark((function t() {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, this._request.getAccessToken();
            case 2:
              return e.t0 = e.sent.accessToken, e.t1 = this.config.env, e.abrupt("return", {
                accessToken: e.t0,
                env: e.t1
              });
            case 5:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function() {
        return o.apply(this, arguments)
      })
    }, {
      key: "hasLoginState",
      value: function() {
        var e = this._cache.keys.refreshTokenKey;
        return this._cache.getStore(e) ? new Qc(this.config.env) : null
      }
    }, {
      key: "isUsernameRegistered",
      value: (i = t(e().mark((function t(n) {
        var r, i;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if ("string" == typeof n) {
                e.next = 2;
                break
              }
              throw new Error("username must be a string");
            case 2:
              return e.next = 4, this._request.send("auth.isUsernameRegistered", {
                username: n
              });
            case 4:
              return r = e.sent, i = r.data, e.abrupt("return", i && i.isRegistered);
            case 7:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return i.apply(this, arguments)
      })
    }, {
      key: "getLoginState",
      value: function() {
        return Promise.resolve(this.hasLoginState())
      }
    }, {
      key: "signInWithTicket",
      value: (n = t(e().mark((function t(n) {
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.abrupt("return", new tf(this.config).signIn(n));
            case 1:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e) {
        return n.apply(this, arguments)
      })
    }, {
      key: "shouldRefreshAccessToken",
      value: function(e) {
        this._request._shouldRefreshAccessTokenHook = e.bind(this)
      }
    }, {
      key: "getUserInfo",
      value: function() {
        return this._request.send("auth.getUserInfo", {}).then((function(e) {
          return e.code ? e : r(r({}, e.data), {}, {
            requestId: e.seqId
          })
        }))
      }
    }, {
      key: "getAuthHeader",
      value: function() {
        var e = this._cache.keys,
          t = e.refreshTokenKey,
          n = e.accessTokenKey,
          r = this._cache.getStore(t);
        return {
          "x-cloudbase-credentials": this._cache.getStore(n) + "/@@/" + r
        }
      }
    }, {
      key: "_onAnonymousConverted",
      value: function(e) {
        e.data.env === this.config.env && this._cache.updatePersistence(this.config.persistence)
      }
    }, {
      key: "_onLoginTypeChanged",
      value: function(e) {
        var t = e.data,
          n = t.loginType,
          r = t.persistence;
        t.env === this.config.env && (this._cache.updatePersistence(r), this._cache.setStore(this._cache.keys.loginTypeKey, n))
      }
    }]);
    var n, i, o, s, a, u, h, l, p
  }(),
  sf = function(e, t) {
    t = t || _c();
    var n = Yc(this.config.env),
      r = e.cloudPath,
      i = e.filePath,
      o = e.onUploadProgress,
      s = e.fileType,
      a = void 0 === s ? "image" : s;
    return n.send("storage.getUploadMetadata", {
      path: r
    }).then((function(e) {
      var s = e.data,
        u = s.url,
        c = s.authorization,
        f = s.token,
        h = s.fileId,
        l = s.cosFileId,
        p = e.requestId,
        d = {
          key: r,
          signature: c,
          "x-cos-meta-fileid": l,
          success_action_status: "201",
          "x-cos-security-token": f
        };
      n.upload({
        url: u,
        data: d,
        file: i,
        name: r,
        fileType: a,
        onUploadProgress: o
      }).then((function(e) {
        201 === e.statusCode ? t(null, {
          fileID: h,
          requestId: p
        }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)))
      })).catch((function(e) {
        t(e)
      }))
    })).catch((function(e) {
      t(e)
    })), t.promise
  },
  af = function(e, t) {
    t = t || _c();
    var n = Yc(this.config.env),
      r = e.cloudPath;
    return n.send("storage.getUploadMetadata", {
      path: r
    }).then((function(e) {
      t(null, e)
    })).catch((function(e) {
      t(e)
    })), t.promise
  },
  uf = function(e, t) {
    var n = e.fileList;
    if (t = t || _c(), !n || !Array.isArray(n)) return {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    };
    var r, i = v(n);
    try {
      for (i.s(); !(r = i.n()).done;) {
        var o = r.value;
        if (!o || "string" != typeof o) return {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是非空的字符串"
        }
      }
    } catch (e) {
      i.e(e)
    } finally {
      i.f()
    }
    var s = {
      fileid_list: n
    };
    return Yc(this.config.env).send("storage.batchDeleteFile", s).then((function(e) {
      e.code ? t(null, e) : t(null, {
        fileList: e.data.delete_list,
        requestId: e.requestId
      })
    })).catch((function(e) {
      t(e)
    })), t.promise
  },
  cf = function(e, t) {
    var n = e.fileList;
    t = t || _c(), n && Array.isArray(n) || t(null, {
      code: "INVALID_PARAM",
      message: "fileList必须是非空的数组"
    });
    var r, i = [],
      o = v(n);
    try {
      for (o.s(); !(r = o.n()).done;) {
        var s = r.value;
        "object" == h(s) ? (s.hasOwnProperty("fileID") && s.hasOwnProperty("maxAge") || t(null, {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是包含fileID和maxAge的对象"
        }), i.push({
          fileid: s.fileID,
          max_age: s.maxAge
        })) : "string" == typeof s ? i.push({
          fileid: s
        }) : t(null, {
          code: "INVALID_PARAM",
          message: "fileList的元素必须是字符串"
        })
      }
    } catch (e) {
      o.e(e)
    } finally {
      o.f()
    }
    var a = {
      file_list: i
    };
    return Yc(this.config.env).send("storage.batchGetDownloadUrl", a).then((function(e) {
      e.code ? t(null, e) : t(null, {
        fileList: e.data.download_list,
        requestId: e.requestId
      })
    })).catch((function(e) {
      t(e)
    })), t.promise
  },
  ff = function() {
    var n = t(e().mark((function t(n, r) {
      var i, o, s, a;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return i = n.fileID, e.next = 3, cf.call(this, {
              fileList: [{
                fileID: i,
                maxAge: 600
              }]
            });
          case 3:
            if ("SUCCESS" === (o = e.sent.fileList[0]).code) {
              e.next = 6;
              break
            }
            return e.abrupt("return", r ? r(o) : new Promise((function(e) {
              e(o)
            })));
          case 6:
            if (s = Yc(this.config.env), a = o.download_url, a = encodeURI(a), r) {
              e.next = 10;
              break
            }
            return e.abrupt("return", s.download({
              url: a
            }));
          case 10:
            return e.t0 = r, e.next = 13, s.download({
              url: a
            });
          case 13:
            e.t1 = e.sent, (0, e.t0)(e.t1);
          case 15:
          case "end":
            return e.stop()
        }
      }), t, this)
    })));
    return function(e, t) {
      return n.apply(this, arguments)
    }
  }(),
  hf = function(e, t) {
    var n, r = e.name,
      i = e.data,
      o = e.query,
      s = e.parse,
      a = e.search,
      u = t || _c();
    try {
      n = i ? JSON.stringify(i) : ""
    } catch (e) {
      return Promise.reject(e)
    }
    if (!r) return Promise.reject(new Error("函数名不能为空"));
    var c = {
      inQuery: o,
      parse: s,
      search: a,
      function_name: r,
      request_data: n
    };
    return Yc(this.config.env).send("functions.invokeFunction", c).then((function(e) {
      if (e.code) u(null, e);
      else {
        var t = e.data.response_data;
        if (s) u(null, {
          result: t,
          requestId: e.requestId
        });
        else try {
          t = JSON.parse(e.data.response_data), u(null, {
            result: t,
            requestId: e.requestId
          })
        } catch (e) {
          u(new Error("response data must be json"))
        }
      }
      return u.promise
    })).catch((function(e) {
      u(e)
    })), u.promise
  },
  lf = {
    timeout: 15e3,
    persistence: "session"
  },
  pf = {},
  df = new(function() {
    function n(e) {
      c(this, n), this.config = e || this.config, this.authObj = void 0
    }
    return f(n, [{
      key: "init",
      value: function(e) {
        switch (xc.adapter || (this.requestClient = new xc.adapter.reqClass({
            timeout: e.timeout || 5e3,
            timeoutMsg: "请求在".concat((e.timeout || 5e3) / 1e3, "s内未完成，已中断")
          })), this.config = r(r({}, lf), e), !0) {
          case this.config.timeout > 6e5:
            console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
            break;
          case this.config.timeout < 100:
            console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100
        }
        return new n(this.config)
      }
    }, {
      key: "auth",
      value: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.persistence;
        if (this.authObj) return this.authObj;
        var n, i, o, s = t || xc.adapter.primaryStorage || lf.persistence;
        return s !== this.config.persistence && (this.config.persistence = s), i = this.config, o = i.env, Pc[o] = new Ac(i), Ic[o] = new Ac(r(r({}, i), {}, {
          persistence: "local"
        })), n = this.config, Jc[n.env] = new Gc(n), this.authObj = new of(this.config), this.authObj
      }
    }, {
      key: "on",
      value: function(e, t) {
        return jc.apply(this, [e, t])
      }
    }, {
      key: "off",
      value: function(e, t) {
        return Nc.apply(this, [e, t])
      }
    }, {
      key: "callFunction",
      value: function(e, t) {
        return hf.apply(this, [e, t])
      }
    }, {
      key: "deleteFile",
      value: function(e, t) {
        return uf.apply(this, [e, t])
      }
    }, {
      key: "getTempFileURL",
      value: function(e, t) {
        return cf.apply(this, [e, t])
      }
    }, {
      key: "downloadFile",
      value: function(e, t) {
        return ff.apply(this, [e, t])
      }
    }, {
      key: "uploadFile",
      value: function(e, t) {
        return sf.apply(this, [e, t])
      }
    }, {
      key: "getUploadMetadata",
      value: function(e, t) {
        return af.apply(this, [e, t])
      }
    }, {
      key: "registerExtension",
      value: function(e) {
        pf[e.name] = e
      }
    }, {
      key: "invokeExtension",
      value: (i = t(e().mark((function t(n, r) {
        var i;
        return e().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (i = pf[n]) {
                e.next = 3;
                break
              }
              throw Error("扩展".concat(n, " 必须先注册"));
            case 3:
              return e.next = 5, i.invoke(r, this);
            case 5:
              return e.abrupt("return", e.sent);
            case 6:
            case "end":
              return e.stop()
          }
        }), t, this)
      }))), function(e, t) {
        return i.apply(this, arguments)
      })
    }, {
      key: "useAdapters",
      value: function(e) {
        var t = function(e) {
            var t, n, r = (t = e, "[object Array]" === Object.prototype.toString.call(t) ? e : [e]),
              i = v(r);
            try {
              for (i.s(); !(n = i.n()).done;) {
                var o = n.value,
                  s = o.isMatch,
                  a = o.genAdapter,
                  u = o.runtime;
                if (s()) return {
                  adapter: a(),
                  runtime: u
                }
              }
            } catch (e) {
              i.e(e)
            } finally {
              i.f()
            }
          }(e) || {},
          n = t.adapter,
          r = t.runtime;
        n && (xc.adapter = n), r && (xc.runtime = r)
      }
    }]);
    var i
  }());

function vf(e, t, n) {
  void 0 === n && (n = {});
  var r = /\?/.test(t),
    i = "";
  for (var o in n) "" === i ? !r && (t += "?") : i += "&", i += o + "=" + encodeURIComponent(n[o]);
  return /^http(s)?:\/\//.test(t += i) ? t : "" + e + t
}
var gf = function() {
    return f((function e() {
      c(this, e)
    }), [{
      key: "post",
      value: function(e) {
        var t = e.url,
          n = e.data,
          r = e.headers;
        return new Promise((function(e, i) {
          pc.request({
            url: vf("https:", t),
            data: n,
            method: "POST",
            header: r,
            success: function(t) {
              e(t)
            },
            fail: function(e) {
              i(e)
            }
          })
        }))
      }
    }, {
      key: "upload",
      value: function(e) {
        return new Promise((function(t, n) {
          var r = e.url,
            i = e.file,
            o = e.data,
            s = e.headers,
            a = e.fileType,
            u = pc.uploadFile({
              url: vf("https:", r),
              name: "file",
              formData: Object.assign({}, o),
              filePath: i,
              fileType: a,
              header: s,
              success: function(e) {
                var n = {
                  statusCode: e.statusCode,
                  data: e.data || {}
                };
                200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n)
              },
              fail: function(e) {
                n(new Error(e.errMsg || "uploadFile:fail"))
              }
            });
          "function" == typeof e.onUploadProgress && u && "function" == typeof u.onProgressUpdate && u.onProgressUpdate((function(t) {
            e.onUploadProgress({
              loaded: t.totalBytesSent,
              total: t.totalBytesExpectedToSend
            })
          }))
        }))
      }
    }])
  }(),
  mf = {
    setItem: function(e, t) {
      pc.setStorageSync(e, t)
    },
    getItem: function(e) {
      return pc.getStorageSync(e)
    },
    removeItem: function(e) {
      pc.removeStorageSync(e)
    },
    clear: function() {
      pc.clearStorageSync()
    }
  },
  yf = {
    genAdapter: function() {
      return {
        root: {},
        reqClass: gf,
        localStorage: mf,
        primaryStorage: "local"
      }
    },
    isMatch: function() {
      return !0
    },
    runtime: "uni_app"
  };
df.useAdapters(yf);
var bf = df,
  wf = bf.init;
bf.init = function(e) {
  e.env = e.spaceId;
  var t = wf.call(this, e);
  t.config.provider = "tencent", t.config.spaceId = e.spaceId;
  var n = t.auth;
  return t.auth = function(e) {
    var t = n.call(this, e);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((function(e) {
      t[e] = oc(t[e]).bind(t)
    })), t
  }, t.customAuth = t.auth, t
};
var _f = bf;

function kf() {
  return {
    token: pc.getStorageSync("uni_id_token") || pc.getStorageSync("uniIdToken"),
    tokenExpired: pc.getStorageSync("uni_id_token_expired")
  }
}
var Sf = function(e) {
    function t() {
      return c(this, t), g(this, t, arguments)
    }
    return a(t, gc), f(t, [{
      key: "getAccessToken",
      value: function() {
        var e = this;
        return new Promise((function(t, n) {
          var r = "Anonymous_Access_token";
          e.setAccessToken(r), t(r)
        }))
      }
    }, {
      key: "setupRequest",
      value: function(e, t) {
        var n = Object.assign({}, e, {
            spaceId: this.config.spaceId,
            timestamp: Date.now()
          }),
          r = {
            "Content-Type": "application/json"
          };
        "auth" !== t && (n.token = this.accessToken, r["x-basement-token"] = this.accessToken), r["x-serverless-sign"] = hc(n, this.config.clientSecret);
        var i = uc();
        r["x-client-info"] = JSON.stringify(i);
        var o = kf().token;
        return r["x-client-token"] = o, {
          url: this.config.requestUrl,
          method: "POST",
          data: n,
          dataType: "json",
          header: JSON.parse(JSON.stringify(r))
        }
      }
    }, {
      key: "uploadFileToOSS",
      value: function(e) {
        var t = this,
          n = e.url,
          r = e.formData,
          i = e.name,
          o = e.filePath,
          s = e.fileType,
          a = e.onUploadProgress;
        return new Promise((function(e, u) {
          var c = t.adapter.uploadFile({
            url: n,
            formData: r,
            name: i,
            filePath: o,
            fileType: s,
            success: function(t) {
              t && t.statusCode < 400 ? e(t) : u(new ac({
                code: "UPLOAD_FAILED",
                message: "文件上传失败"
              }))
            },
            fail: function(e) {
              u(new ac({
                code: e.code || "UPLOAD_FAILED",
                message: e.message || e.errMsg || "文件上传失败"
              }))
            }
          });
          "function" == typeof a && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate((function(e) {
            a({
              loaded: e.totalBytesSent,
              total: e.totalBytesExpectedToSend
            })
          }))
        }))
      }
    }, {
      key: "uploadFile",
      value: function(e) {
        var t, n = this,
          r = e.filePath,
          i = e.cloudPath,
          o = e.fileType,
          s = void 0 === o ? "image" : o,
          a = e.onUploadProgress;
        if (!i) throw new ac({
          code: "CLOUDPATH_REQUIRED",
          message: "cloudPath不可为空"
        });
        return this.getOSSUploadOptionsFromPath({
          cloudPath: i
        }).then((function(e) {
          var i = e.result,
            o = i.url,
            u = i.formData,
            c = i.name;
          t = e.result.fileUrl;
          var f = {
            url: o,
            formData: u,
            name: c,
            filePath: r,
            fileType: s
          };
          return n.uploadFileToOSS(Object.assign({}, f, {
            onUploadProgress: a
          }))
        })).then((function() {
          return n.reportOSSUpload({
            cloudPath: i
          })
        })).then((function(e) {
          return new Promise((function(n, i) {
            e.success ? n({
              success: !0,
              filePath: r,
              fileID: t
            }) : i(new ac({
              code: "UPLOAD_FAILED",
              message: "文件上传失败"
            }))
          }))
        }))
      }
    }, {
      key: "deleteFile",
      value: function(e) {
        var t = e.fileList,
          n = {
            method: "serverless.file.resource.delete",
            params: JSON.stringify({
              fileList: t
            })
          };
        return this.request(this.setupRequest(n))
      }
    }, {
      key: "getTempFileURL",
      value: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.fileList,
          n = {
            method: "serverless.file.resource.getTempFileURL",
            params: JSON.stringify({
              fileList: t
            })
          };
        return this.request(this.setupRequest(n))
      }
    }])
  }(),
  xf = function(e) {
    var t = new Sf(e),
      n = {
        signInAnonymously: function() {
          return t.authorize()
        },
        getLoginState: function() {
          return Promise.resolve(!1)
        }
      };
    return t.auth = function() {
      return n
    }, t.customAuth = t.auth, t
  };

function Tf(e) {
  var t, n = e.data;
  t = uc();
  var r = JSON.parse(JSON.stringify(n || {}));
  if (Object.assign(r, {
      clientInfo: t
    }), !r.uniIdToken) {
    var i = kf().token;
    i && (r.uniIdToken = i)
  }
  return r
}

function Ef(e) {
  var t = this,
    n = e.name,
    r = e.data,
    i = this.localAddress,
    o = this.localPort,
    s = {
      aliyun: "aliyun",
      tencent: "tcb"
    } [this.config.provider],
    a = this.config.spaceId,
    u = "http://".concat(i, ":").concat(o, "/system/check-function"),
    c = "http://".concat(i, ":").concat(o, "/cloudfunctions/").concat(n);
  return new Promise((function(e, t) {
    pc.request({
      method: "POST",
      url: u,
      data: {
        name: n,
        platform: Wu,
        provider: s,
        spaceId: a
      },
      timeout: 3e3,
      success: function(t) {
        e(t)
      },
      fail: function() {
        e({
          data: {
            code: "NETWORK_ERROR",
            message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。"
          }
        })
      }
    })
  })).then((function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.data,
      n = t || {},
      r = n.code,
      i = n.message;
    return {
      code: 0 === r ? 0 : r || "SYS_ERR",
      message: i || "SYS_ERR"
    }
  })).then((function(e) {
    var i = e.code,
      o = e.message;
    if (0 !== i) {
      switch (i) {
        case "MODULE_ENCRYPTED":
          console.error("此云函数（".concat(n, "）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数"));
          break;
        case "FUNCTION_ENCRYPTED":
          console.error("此云函数（".concat(n, "）已加密不可本地调试，自动切换为云端已部署的云函数"));
          break;
        case "ACTION_ENCRYPTED":
          console.error(o || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR":
          var a = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
          throw console.error(a), new Error(a);
        case "SWITCH_TO_CLOUD":
          break;
        default:
          var u = "检测本地调试服务出现错误：".concat(o, "，请检查网络环境或重启客户端再试");
          throw console.error(u), new Error(u)
      }
      return t._originCallFunction({
        name: n,
        data: r
      })
    }
    return new Promise((function(e, n) {
      var i = Tf.call(t, {
        data: r
      });
      pc.request({
        method: "POST",
        url: c,
        data: {
          provider: s,
          platform: Wu,
          param: i
        },
        success: function() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = t.statusCode,
            i = t.data;
          return !r || r >= 400 ? n(new ac({
            code: i.code || "SYS_ERR",
            message: i.message || "request:fail"
          })) : e({
            result: i
          })
        },
        fail: function(e) {
          n(new ac({
            code: e.code || e.errCode || "SYS_ERR",
            message: e.message || e.errMsg || "request:fail"
          }))
        }
      })
    }))
  }))
}
var Of = [{
    rule: /fc_function_not_found|FUNCTION_NOT_FOUND/,
    content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间",
    mode: "append"
  }],
  Af = /[\\^$.*+?()[\]{}|]/g,
  Pf = RegExp(Af.source);

function If(e, t, n) {
  return e.replace(new RegExp((r = t) && Pf.test(r) ? r.replace(Af, "\\$&") : r, "g"), n);
  var r
}

function Df(e) {
  var t = e.functionName,
    n = e.result,
    r = e.logPvd;
  if (this.config.useDebugFunction && n && n.requestId) {
    var i = JSON.stringify({
      spaceId: this.config.spaceId,
      functionName: t,
      requestId: n.requestId
    });
    console.log("[".concat(r, "-request]").concat(i, "[/").concat(r, "-request]"))
  }
}

function Cf(e) {
  var t = e.callFunction,
    n = function(n) {
      var r = this,
        i = n.name;
      n.data = Tf.call(e, {
        data: n.data
      });
      var o = {
        aliyun: "aliyun",
        tencent: "tcb"
      } [this.config.provider];
      return t.call(this, n).then((function(e) {
        return Df.call(r, {
          functionName: i,
          result: e,
          logPvd: o
        }), Promise.resolve(e)
      }), (function(e) {
        return Df.call(r, {
          functionName: i,
          result: e,
          logPvd: o
        }), e && e.message && (e.message = function() {
          for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.message, n = void 0 === t ? "" : t, r = e.extraInfo, i = void 0 === r ? {} : r, o = e.formatter, s = void 0 === o ? [] : o, a = 0; a < s.length; a++) {
            var u = s[a],
              c = u.rule,
              f = u.content,
              h = u.mode,
              l = n.match(c);
            if (l) {
              for (var p = f, d = 1; d < l.length; d++) p = If(p, "{$".concat(d, "}"), l[d]);
              for (var v in i) p = If(p, "{".concat(v, "}"), i[v]);
              return "replace" === h ? p : n + p
            }
          }
          return n
        }({
          message: "[".concat(n.name, "]: ").concat(e.message),
          formatter: Of,
          extraInfo: {
            functionName: i
          }
        })), Promise.reject(e)
      }))
    };
  e.callFunction = function(t) {
    var r;
    return e.debugInfo && !e.debugInfo.forceRemote && Ju ? (e._originCallFunction || (e._originCallFunction = n), r = Ef.call(this, t)) : r = n.call(this, t), Object.defineProperty(r, "result", {
      get: function() {
        return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}
      }
    }), r
  }
}
var Rf = Symbol("CLIENT_DB_INTERNAL");

function $f(e, t) {
  return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Rf, e.__v_raw = void 0, new Proxy(e, {
    get: function(e, n, r) {
      if ("_uniClient" === n) return null;
      if (n in e || "string" != typeof n) {
        var i = e[n];
        return "function" == typeof i ? i.bind(e) : i
      }
      return t.get(e, n, r)
    }
  })
}

function jf(e) {
  return {
    on: function(t, n) {
      e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n)
    },
    off: function(t, n) {
      e[t] = e[t] || [];
      var r = e[t].indexOf(n); - 1 !== r && e[t].splice(r, 1)
    }
  }
}
var Mf = ["db.Geo", "db.command", "command.aggregate"];

function Nf(e, t) {
  return Mf.indexOf("".concat(e, ".").concat(t)) > -1
}

function Uf(e) {
  switch (Hu(e = function e(t) {
      return t && e(t.__v_raw) || t
    }(e))) {
    case "array":
      return e.map((function(e) {
        return Uf(e)
      }));
    case "object":
      return e._internalType === Rf || Object.keys(e).forEach((function(t) {
        e[t] = Uf(e[t])
      })), e;
    case "regexp":
      return {
        $regexp: {
          source: e.source,
          flags: e.flags
        }
      };
    case "date":
      return {
        $date: e.toISOString()
      };
    default:
      return e
  }
}
var Lf = function() {
  return f((function e(t, n, r) {
    c(this, e), this.content = t, this.prevStage = n || null, this.udb = null, this._database = r
  }), [{
    key: "toJSON",
    value: function() {
      for (var e = this, t = [e.content]; e.prevStage;) e = e.prevStage, t.push(e.content);
      return {
        $db: t.reverse().map((function(e) {
          return {
            $method: e.$method,
            $param: Uf(e.$param)
          }
        }))
      }
    }
  }, {
    key: "getAction",
    value: function() {
      var e = this.toJSON().$db.find((function(e) {
        return "action" === e.$method
      }));
      return e && e.$param && e.$param[0]
    }
  }, {
    key: "getCommand",
    value: function() {
      return {
        $db: this.toJSON().$db.filter((function(e) {
          return "action" !== e.$method
        }))
      }
    }
  }, {
    key: "useAggregate",
    get: function() {
      for (var e = this, t = !1; e.prevStage;) {
        var n = (e = e.prevStage).content.$method;
        if ("aggregate" === n || "pipeline" === n) {
          t = !0;
          break
        }
      }
      return t
    }
  }, {
    key: "count",
    get: function() {
      if (!this.useAggregate) return function() {
        return this._send("count", Array.from(arguments))
      };
      var e = this;
      return function() {
        return Bf({
          $method: "count",
          $param: Uf(Array.from(arguments))
        }, e, this._database)
      }
    }
  }, {
    key: "get",
    value: function() {
      return this._send("get", Array.from(arguments))
    }
  }, {
    key: "add",
    value: function() {
      return this._send("add", Array.from(arguments))
    }
  }, {
    key: "remove",
    value: function() {
      return this._send("remove", Array.from(arguments))
    }
  }, {
    key: "update",
    value: function() {
      return this._send("update", Array.from(arguments))
    }
  }, {
    key: "end",
    value: function() {
      return this._send("end", Array.from(arguments))
    }
  }, {
    key: "set",
    value: function() {
      throw new Error("clientDB禁止使用set方法")
    }
  }, {
    key: "_send",
    value: function(e, t) {
      var n = this.getAction(),
        r = this.getCommand();
      r.$db.push({
        $method: e,
        $param: Uf(t)
      });
      var i = r.$db.find((function(e) {
          return "collection" === e.$method
        })),
        o = i && i.$param;
      return o && 1 === o.length && "string" == typeof i.$param[0] && i.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。"), this._database._callCloudFunction({
        action: n,
        command: r
      })
    }
  }])
}();

function Bf(e, t, n) {
  return $f(new Lf(e, t, n), {
    get: function(e, t) {
      var r = "db";
      return e && e.content && (r = e.content.$method), Nf(r, t) ? Bf({
        $method: t
      }, e, n) : function() {
        return Bf({
          $method: t,
          $param: Uf(Array.from(arguments))
        }, e, n)
      }
    }
  })
}

function qf(e) {
  var t = e.path,
    n = e.method;
  return function() {
    return f((function e() {
      c(this, e), this.param = Array.from(arguments)
    }), [{
      key: "toJSON",
      value: function() {
        return {
          $newDb: [].concat(p(t.map((function(e) {
            return {
              $method: e
            }
          }))), [{
            $method: n,
            $param: this.param
          }])
        }
      }
    }])
  }()
}
var Vf, Ff = function(e) {
  function t() {
    return c(this, t), g(this, t, arguments)
  }
  return a(t, e), f(t, [{
    key: "_callCloudFunction",
    value: function(e) {
      var t = this,
        n = e.action,
        r = e.command,
        i = e.multiCommand,
        o = e.queryList;

      function s(e, t) {
        if (i && o)
          for (var n = 0; n < o.length; n++) {
            var r = o[n];
            r.udb && "function" == typeof r.udb.setResult && (t ? r.udb.setResult(t) : r.udb.setResult(e.result.dataList[n]))
          }
      }
      var a = rc(ic("database", "invoke")),
        u = this._uniClient;
      return a.then((function() {
        return u.callFunction({
          name: "DCloud-clientDB",
          type: "CLIENT_DB",
          data: {
            action: n,
            command: r,
            multiCommand: i
          }
        })
      })).then((function(e) {
        var n = e.result,
          r = n.code,
          i = n.message,
          o = n.token,
          a = n.tokenExpired,
          u = n.systemInfo,
          c = void 0 === u ? [] : u;
        if (c)
          for (var f = 0; f < c.length; f++) {
            var h = c[f],
              l = h.level,
              p = h.message,
              d = h.detail,
              v = console[l] || console.log,
              g = "[System Info]" + p;
            d && (g = "".concat(g, "\n详细信息：").concat(d)), v(g)
          }
        if (r) {
          var m = new ac({
            message: i,
            code: r,
            requestId: e.requestId
          });
          return t._callback("error", [m]), Promise.reject(m)
        }
        o && a && (function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.token,
            n = e.tokenExpired;
          t && pc.setStorageSync("uni_id_token", t), n && pc.setStorageSync("uni_id_token_expired", n)
        }({
          token: o,
          tokenExpired: a
        }), t._callbackAuth("refreshToken", [{
          token: o,
          tokenExpired: a
        }]), t._callback("refreshToken", [{
          token: o,
          tokenExpired: a
        }]));
        var y = e.result.affectedDocs;
        return "number" == typeof y && Object.defineProperty(e.result, "affectedDocs", {
          get: function() {
            return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), y
          }
        }), rc(ic("database", "success"), e).then((function() {
          return rc(ic("database", "complete"), e)
        })).then((function() {
          return s(e, null), Promise.resolve(e)
        }))
      }), (function(e) {
        var n = new ac({
          code: e.code || "SYSTEM_ERROR",
          message: e.message,
          requestId: e.requestId
        });
        return t._callback("error", [n]), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), rc(ic("database", "fail"), e).then((function() {
          return rc(ic("database", "complete"), e)
        })).then((function() {
          return s(null, e), Promise.reject(e)
        }))
      }))
    }
  }])
}(function() {
  return f((function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      n = t.uniClient,
      r = void 0 === n ? {} : n;
    c(this, e), this._uniClient = r, this._authCallBacks = {}, this._dbCallBacks = {}, r.isDefault && (this._dbCallBacks = Xu("_globalUniCloudDatabaseCallback")), this.auth = jf(this._authCallBacks), Object.assign(this, jf(this._dbCallBacks)), this.env = $f({}, {
      get: function(e, t) {
        return {
          $env: t
        }
      }
    }), this.Geo = $f({}, {
      get: function(e, t) {
        return qf({
          path: ["Geo"],
          method: t
        })
      }
    }), this.serverDate = qf({
      path: [],
      method: "serverDate"
    }), this.RegExp = qf({
      path: [],
      method: "RegExp"
    })
  }), [{
    key: "getCloudEnv",
    value: function(e) {
      if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");
      return {
        $env: e.replace("$cloudEnv_", "")
      }
    }
  }, {
    key: "_callback",
    value: function(e, t) {
      var n = this._dbCallBacks;
      n[e] && n[e].forEach((function(e) {
        e.apply(void 0, p(t))
      }))
    }
  }, {
    key: "_callbackAuth",
    value: function(e, t) {
      var n = this._authCallBacks;
      n[e] && n[e].forEach((function(e) {
        e.apply(void 0, p(t))
      }))
    }
  }, {
    key: "multiSend",
    value: function() {
      var e = Array.from(arguments),
        t = e.map((function(e) {
          var t = e.getAction(),
            n = e.getCommand();
          if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");
          return {
            action: t,
            command: n
          }
        }));
      return this._callCloudFunction({
        multiCommand: t,
        queryList: e
      })
    }
  }])
}());
var Hf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  Kf = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

function zf() {
  var e, t, n = kf().token || "",
    r = n.split(".");
  if (!n || 3 !== r.length) return {
    uid: null,
    role: [],
    permission: [],
    tokenExpired: 0
  };
  try {
    e = JSON.parse((t = r[1], decodeURIComponent(Vf(t).split("").map((function(e) {
      return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
    })).join(""))))
  } catch (e) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message)
  }
  return e.tokenExpired = 1e3 * e.exp, delete e.exp, delete e.iat, e
}
Vf = "function" != typeof atob ? function(e) {
  if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !Kf.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t;
  e += "==".slice(2 - (3 & e.length));
  for (var n, r, i = "", o = 0; o < e.length;) t = Hf.indexOf(e.charAt(o++)) << 18 | Hf.indexOf(e.charAt(o++)) << 12 | (n = Hf.indexOf(e.charAt(o++))) << 6 | (r = Hf.indexOf(e.charAt(o++))), i += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === r ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);
  return i
} : atob;
var Wf = function(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}(Lu((function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = "chooseAndUploadFile:ok",
    r = "chooseAndUploadFile:fail";

  function i(e, t) {
    return e.tempFiles.forEach((function(e, n) {
      e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."))
    })), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map((function(e) {
      return e.path
    }))), e
  }

  function o(e, t, r) {
    var i = r.onChooseFile,
      o = r.onUploadProgress;
    return t.then((function(e) {
      if (i) {
        var t = i(e);
        if (void 0 !== t) return Promise.resolve(t).then((function(t) {
          return void 0 === t ? e : t
        }))
      }
      return e
    })).then((function(t) {
      return !1 === t ? {
        errMsg: n,
        tempFilePaths: [],
        tempFiles: []
      } : function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
          i = arguments.length > 3 ? arguments[3] : void 0;
        (t = Object.assign({}, t)).errMsg = n;
        var o = t.tempFiles,
          s = o.length,
          a = 0;
        return new Promise((function(n) {
          for (; a < r;) u();

          function u() {
            var r = a++;
            if (r >= s) !o.find((function(e) {
              return !e.url && !e.errMsg
            })) && n(t);
            else {
              var c = o[r];
              e.uploadFile({
                filePath: c.path,
                cloudPath: c.cloudPath,
                fileType: c.fileType,
                onUploadProgress: function(e) {
                  e.index = r, e.tempFile = c, e.tempFilePath = c.path, i && i(e)
                }
              }).then((function(e) {
                c.url = e.fileID, r < s && u()
              })).catch((function(e) {
                c.errMsg = e.errMsg || e.message, r < s && u()
              }))
            }
          }
        }))
      }(e, t, 5, o)
    }))
  }
  t.initChooseAndUploadFile = function(e) {
    return function() {
      var t, n, s, a, u, c, f = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
        type: "all"
      };
      return "image" === f.type ? o(e, (n = (t = f).count, s = t.sizeType, a = t.sourceType, u = void 0 === a ? ["album", "camera"] : a, c = t.extension, new Promise((function(e, t) {
        Rt.chooseImage({
          count: n,
          sizeType: s,
          sourceType: u,
          extension: c,
          success: function(t) {
            e(i(t, "image"))
          },
          fail: function(e) {
            t({
              errMsg: e.errMsg.replace("chooseImage:fail", r)
            })
          }
        })
      }))), f) : "video" === f.type ? o(e, function(e) {
        var t = e.camera,
          n = e.compressed,
          o = e.maxDuration,
          s = e.sourceType,
          a = void 0 === s ? ["album", "camera"] : s,
          u = e.extension;
        return new Promise((function(e, s) {
          Rt.chooseVideo({
            camera: t,
            compressed: n,
            maxDuration: o,
            sourceType: a,
            extension: u,
            success: function(t) {
              var n = t.tempFilePath,
                r = t.duration,
                o = t.size,
                s = t.height,
                a = t.width;
              e(i({
                errMsg: "chooseVideo:ok",
                tempFilePaths: [n],
                tempFiles: [{
                  name: t.tempFile && t.tempFile.name || "",
                  path: n,
                  size: o,
                  type: t.tempFile && t.tempFile.type || "",
                  width: a,
                  height: s,
                  duration: r,
                  fileType: "video",
                  cloudPath: ""
                }]
              }, "video"))
            },
            fail: function(e) {
              s({
                errMsg: e.errMsg.replace("chooseVideo:fail", r)
              })
            }
          })
        }))
      }(f), f) : o(e, function(e) {
        var t = e.count,
          n = e.extension;
        return new Promise((function(e, o) {
          var s = Rt.chooseFile;
          if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (s = wx.chooseMessageFile), "function" != typeof s) return o({
            errMsg: r + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
          });
          s({
            type: "all",
            count: t,
            extension: n,
            success: function(t) {
              e(i(t))
            },
            fail: function(e) {
              o({
                errMsg: e.errMsg.replace("chooseFile:fail", r)
              })
            }
          })
        }))
      }(f), f)
    }
  }
})));

function Gf(e) {
  return {
    props: {
      localdata: {
        type: Array,
        default: function() {
          return []
        }
      },
      options: {
        type: [Object, Array],
        default: function() {
          return {}
        }
      },
      spaceInfo: {
        type: Object,
        default: function() {
          return {}
        }
      },
      collection: {
        type: [String, Array],
        default: ""
      },
      action: {
        type: String,
        default: ""
      },
      field: {
        type: String,
        default: ""
      },
      orderby: {
        type: String,
        default: ""
      },
      where: {
        type: [String, Object],
        default: ""
      },
      pageData: {
        type: String,
        default: "add"
      },
      pageCurrent: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      getcount: {
        type: [Boolean, String],
        default: !1
      },
      gettree: {
        type: [Boolean, String],
        default: !1
      },
      gettreepath: {
        type: [Boolean, String],
        default: !1
      },
      startwith: {
        type: String,
        default: ""
      },
      limitlevel: {
        type: Number,
        default: 10
      },
      groupby: {
        type: String,
        default: ""
      },
      groupField: {
        type: String,
        default: ""
      },
      distinct: {
        type: [Boolean, String],
        default: !1
      },
      foreignKey: {
        type: String,
        default: ""
      },
      loadtime: {
        type: String,
        default: "auto"
      },
      manual: {
        type: Boolean,
        default: !1
      }
    },
    data: function() {
      return {
        mixinDatacomLoading: !1,
        mixinDatacomHasMore: !1,
        mixinDatacomResData: [],
        mixinDatacomErrorMessage: "",
        mixinDatacomPage: {}
      }
    },
    created: function() {
      var e = this;
      this.mixinDatacomPage = {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0
      }, this.$watch((function() {
        var t = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((function(n) {
          t.push(e[n])
        })), t
      }), (function(t, n) {
        if ("manual" !== e.loadtime) {
          for (var r = !1, i = [], o = 2; o < t.length; o++) t[o] !== n[o] && (i.push(t[o]), r = !0);
          t[0] !== n[0] && (e.mixinDatacomPage.current = e.pageCurrent), e.mixinDatacomPage.size = e.pageSize, e.onMixinDatacomPropsChange(r, i)
        }
      }))
    },
    methods: {
      onMixinDatacomPropsChange: function(e, t) {},
      mixinDatacomEasyGet: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = t.getone,
          r = void 0 !== n && n,
          i = t.success,
          o = t.fail;
        this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((function(t) {
          e.mixinDatacomLoading = !1;
          var n = t.result,
            o = n.data,
            s = n.count;
          e.getcount && (e.mixinDatacomPage.count = s), e.mixinDatacomHasMore = o.length < e.pageSize;
          var a = r ? o.length ? o[0] : void 0 : o;
          e.mixinDatacomResData = a, i && i(a)
        })).catch((function(t) {
          e.mixinDatacomLoading = !1, e.mixinDatacomErrorMessage = t, o && o(t)
        })))
      },
      mixinDatacomGet: function() {
        var t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          r = e.database(this.spaceInfo),
          i = n.action || this.action;
        i && (r = r.action(i));
        var o = n.collection || this.collection;
        r = Array.isArray(o) ? (t = r).collection.apply(t, p(o)) : r.collection(o);
        var s = n.where || this.where;
        s && Object.keys(s).length && (r = r.where(s));
        var a = n.field || this.field;
        a && (r = r.field(a));
        var u = n.foreignKey || this.foreignKey;
        u && (r = r.foreignKey(u));
        var c = n.groupby || this.groupby;
        c && (r = r.groupBy(c));
        var f = n.groupField || this.groupField;
        f && (r = r.groupField(f)), !0 === (void 0 !== n.distinct ? n.distinct : this.distinct) && (r = r.distinct());
        var h = n.orderby || this.orderby;
        h && (r = r.orderBy(h));
        var l = void 0 !== n.pageCurrent ? n.pageCurrent : this.mixinDatacomPage.current,
          d = void 0 !== n.pageSize ? n.pageSize : this.mixinDatacomPage.size,
          v = void 0 !== n.getcount ? n.getcount : this.getcount,
          g = void 0 !== n.gettree ? n.gettree : this.gettree,
          m = void 0 !== n.gettreepath ? n.gettreepath : this.gettreepath,
          y = {
            getCount: v
          },
          b = {
            limitLevel: void 0 !== n.limitlevel ? n.limitlevel : this.limitlevel,
            startWith: void 0 !== n.startwith ? n.startwith : this.startwith
          };
        return g && (y.getTree = b), m && (y.getTreePath = b), r = r.skip(d * (l - 1)).limit(d).get(y)
      }
    }
  }
}

function Jf(e, t) {
  return Yf.apply(this, arguments)
}

function Yf() {
  return (Yf = t(e().mark((function t(n, i) {
    var o, s, a;
    return e().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return o = "http://".concat(n, ":").concat(i, "/system/ping"), e.prev = 1, e.next = 4, a = {
            url: o,
            timeout: 500
          }, new Promise((function(e, t) {
            pc.request(r(r({}, a), {}, {
              success: function(t) {
                e(t)
              },
              fail: function(e) {
                t(e)
              }
            }))
          }));
        case 4:
          return s = e.sent, e.abrupt("return", !(!s.data || 0 !== s.data.code));
        case 8:
          return e.prev = 8, e.t0 = e.catch(1), e.abrupt("return", !1);
        case 11:
        case "end":
          return e.stop()
      }
    }), t, null, [
      [1, 8]
    ])
  })))).apply(this, arguments)
}

function Zf(n) {
  if (!n.initUniCloudStatus || "rejected" === n.initUniCloudStatus) {
    var r = Promise.resolve();
    1, r = new Promise((function(e, t) {
      setTimeout((function() {
        e()
      }), 1)
    })), n.isReady = !1, n.isDefault = !1;
    var i = n.auth();
    n.initUniCloudStatus = "pending", n.initUniCloud = r.then((function() {
      return i.getLoginState()
    })).then((function(e) {
      return e ? Promise.resolve() : i.signInAnonymously()
    })).then((function() {
      if (n.debugInfo) {
        var r = n.debugInfo,
          i = r.address,
          o = r.servePort;
        return (s = t(e().mark((function t(n, r) {
          var i, o, s;
          return e().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                o = 0;
              case 1:
                if (!(o < n.length)) {
                  e.next = 11;
                  break
                }
                return s = n[o], e.next = 5, Jf(s, r);
              case 5:
                if (!e.sent) {
                  e.next = 8;
                  break
                }
                return i = s, e.abrupt("break", 11);
              case 8:
                o++, e.next = 1;
                break;
              case 11:
                return e.abrupt("return", {
                  address: i,
                  port: r
                });
              case 12:
              case "end":
                return e.stop()
            }
          }), t)
        }))), function(e, t) {
          return s.apply(this, arguments)
        })(i, o)
      }
      var s
    })).then((function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.address,
        r = e.port;
      if (t) n.localAddress = t, n.localPort = r;
      else if (n.debugInfo) {
        var i = console.warn,
          o = "";
        "remote" === n.debugInfo.initialLaunchType ? (n.debugInfo.forceRemote = !0, o = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs") : o = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs", i(o)
      }
    })).then((function() {
      n.isReady = !0, n.initUniCloudStatus = "fulfilled"
    })).catch((function(e) {
      console.error(e), n.initUniCloudStatus = "rejected"
    }))
  }
}
var Xf = new(function() {
  return f((function e() {
    c(this, e)
  }), [{
    key: "init",
    value: function(n) {
      var r = {},
        i = !1 !== n.debugFunction && !1;
      switch (n.provider) {
        case "tencent":
          r = _f.init(Object.assign(n, {
            useDebugFunction: i
          }));
          break;
        case "aliyun":
          r = mc(Object.assign(n, {
            useDebugFunction: i
          }));
          break;
        case "private":
          r = xf(Object.assign(n, {
            useDebugFunction: i
          }));
          break;
        default:
          throw new Error("未提供正确的provider参数")
      }
      var o, s, a = Gu;
      return a && !a.code && (r.debugInfo = a), Zf(r), r.reInit = function() {
          Zf(this)
        }, Cf(r), s = (o = r).uploadFile, o.uploadFile = function(e) {
          return s.call(this, e)
        },
        function(e) {
          e.database = function(t) {
            if (t && Object.keys(t).length > 0) return e.init(t).database();
            if (this._database) return this._database;
            var n = function(e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return $f(new e(t), {
                get: function(e, t) {
                  return Nf("db", t) ? Bf({
                    $method: t
                  }, null, e) : function() {
                    return Bf({
                      $method: t,
                      $param: Uf(Array.from(arguments))
                    }, null, e)
                  }
                }
              })
            }(Ff, {
              uniClient: e
            });
            return this._database = n, n
          }
        }(r),
        function(n) {
          n.getCurrentUserInfo = zf, n.chooseAndUploadFile = Wf.initChooseAndUploadFile(n), Object.assign(n, {
            get mixinDatacom() {
              return Gf(n)
            }
          }), n.importObject = function(n) {
            return function(r) {
              var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                o = i = function(e) {
                  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                  return e.customUI = t.customUI || e.customUI, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), e
                }({
                  customUI: !1,
                  loadingOptions: {
                    text: "加载中...",
                    mask: !0
                  },
                  errorOptions: {
                    type: "modal",
                    retry: !1
                  }
                }, i),
                s = o.customUI,
                a = o.loadingOptions,
                u = o.errorOptions,
                c = !s;
              return new Proxy({}, {
                get: function(i, o) {
                  return function() {
                    var i = t(e().mark((function i() {
                      var f, h, l, p, d, v, g, m, y, b, w = arguments;
                      return e().wrap((function(i) {
                        for (;;) switch (i.prev = i.next) {
                          case 0:
                            for (c && Rt.showLoading({
                                title: a.title,
                                mask: a.mask
                              }), h = w.length, l = new Array(h), p = 0; p < h; p++) l[p] = w[p];
                            return i.prev = 2, i.next = 5, n.callFunction({
                              name: r,
                              type: Fu,
                              data: {
                                method: o,
                                params: l
                              }
                            });
                          case 5:
                            f = i.sent, i.next = 11;
                            break;
                          case 8:
                            i.prev = 8, i.t0 = i.catch(2), f = {
                              result: i.t0
                            };
                          case 11:
                            if (d = f.result || {}, v = d.errCode, g = d.errMsg, c && Rt.hideLoading(), !v) {
                              i.next = 28;
                              break
                            }
                            if (!c) {
                              i.next = 26;
                              break
                            }
                            if ("toast" !== u.type) {
                              i.next = 18;
                              break
                            }
                            Rt.showToast({
                              title: g,
                              icon: "none"
                            }), i.next = 26;
                            break;
                          case 18:
                            if ("modal" === u.type) {
                              i.next = 20;
                              break
                            }
                            throw new Error("Invalid errorOptions.type: ".concat(u.type));
                          case 20:
                            return i.next = 22, t(e().mark((function t() {
                              var n, r, i, o, s, a, u = arguments;
                              return e().wrap((function(e) {
                                for (;;) switch (e.prev = e.next) {
                                  case 0:
                                    return n = u.length > 0 && void 0 !== u[0] ? u[0] : {}, r = n.title, i = n.content, o = n.showCancel, s = n.cancelText, a = n.confirmText, e.abrupt("return", new Promise((function(e, t) {
                                      Rt.showModal({
                                        title: r,
                                        content: i,
                                        showCancel: o,
                                        cancelText: s,
                                        confirmText: a,
                                        success: function(t) {
                                          e(t)
                                        },
                                        fail: function() {
                                          e({
                                            confirm: !1,
                                            cancel: !0
                                          })
                                        }
                                      })
                                    })));
                                  case 2:
                                  case "end":
                                    return e.stop()
                                }
                              }), t)
                            })))({
                              title: "提示",
                              content: g,
                              showCancel: u.retry,
                              cancelText: "取消",
                              confirmText: u.retry ? "重试" : "确定"
                            });
                          case 22:
                            if (m = i.sent, y = m.confirm, !u.retry || !y) {
                              i.next = 26;
                              break
                            }
                            return i.abrupt("return", s.apply(void 0, l));
                          case 26:
                            throw (b = new ac({
                              code: v,
                              message: g,
                              requestId: f.requestId
                            })).detail = f.result, b;
                          case 28:
                            return i.abrupt("return", f.result);
                          case 29:
                          case "end":
                            return i.stop()
                        }
                      }), i, null, [
                        [2, 8]
                      ])
                    })));

                    function s() {
                      return i.apply(this, arguments)
                    }
                    return s
                  }()
                }
              })
            }
          }(n)
        }(r), ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((function(e) {
          if (r[e]) {
            var t = r[e];
            r[e] = function() {
              return r.reInit(), t.apply(r, Array.from(arguments))
            }, r[e] = oc(r[e], e).bind(r)
          }
        })), r.init = this.init, r
    }
  }])
}());
! function() {
  var e = Ju,
    t = {};
  if (1 === e.length) t = e[0], (Xf = Xf.init(t)).isDefault = !0;
  else {
    var n;
    n = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"].forEach((function(e) {
      Xf[e] = function() {
        return console.error(n), Promise.reject(new ac({
          code: "SYS_ERR",
          message: n
        }))
      }
    }))
  }
  Object.assign(Xf, {
    get mixinDatacom() {
      return Gf(Xf)
    }
  }), Xf.addInterceptor = tc, Xf.removeInterceptor = nc
}();
var Qf = Xf;
exports.JSEncrypt = Su, exports.St = Qf, exports._export_sfc = function(e, t) {
  var n, r = e.__vccOpts || e,
    i = v(t);
  try {
    for (i.s(); !(n = i.n()).done;) {
      var o = d(n.value, 2),
        s = o[0],
        a = o[1];
      r[s] = a
    }
  } catch (e) {
    i.e(e)
  } finally {
    i.f()
  }
  return r
}, exports.computed$1 = xo, exports.createSSRApp = ys, exports.dayjs = ka, exports.defineComponent = function(e) {
  return M(e) ? {
    setup: e,
    name: e.name
  } : e
}, exports.e = function(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return P.apply(void 0, [e].concat(n))
}, exports.f = function(e, t) {
  return function(e, t) {
    var n;
    if (R(e) || N(e)) {
      n = new Array(e.length);
      for (var r = 0, i = e.length; r < i; r++) n[r] = t(e[r], r, r)
    } else if ("number" == typeof e) {
      if (!Number.isInteger(e)) return yr("The v-for range expect an integer value but got ".concat(e, ".")), [];
      n = new Array(e);
      for (var o = 0; o < e; o++) n[o] = t(o + 1, o, o)
    } else if (L(e))
      if (e[Symbol.iterator]) n = Array.from(e, (function(e, n) {
        return t(e, n, n)
      }));
      else {
        var s = Object.keys(e);
        n = new Array(s.length);
        for (var a = 0, u = s.length; a < u; a++) {
          var c = s[a];
          n[a] = t(e[c], c, a)
        }
      }
    else n = [];
    return n
  }(e, t)
}, exports.getCurrentInstance = uo, exports.index = Rt, exports.initVueI18n = Uu, exports.m = function(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  return ms(e, t, n)
}, exports.n = function(e) {
  return function e(t) {
    var n = "";
    if (N(t)) n = t;
    else if (R(t))
      for (var r = 0; r < t.length; r++) {
        var i = e(t[r]);
        i && (n += i + " ")
      } else if (L(t))
        for (var o in t) t[o] && (n += o + " ");
    return n.trim()
  }(e)
}, exports.nextTick = Lr, exports.o = function(e, t) {
  return ps(e, t)
}, exports.onBeforeUnmount = bi, exports.onHide = va, exports.onLoad = ga, exports.onMounted = gi, exports.onPullDownRefresh = ba, exports.onReachBottom = ya, exports.onShareAppMessage = wa, exports.onShow = da, exports.onUnload = ma, exports.p = function(e) {
  return cs(e)
}, exports.r = function(e, t, n) {
  return function e(t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = arguments.length > 2 ? arguments[2] : void 0,
      i = uo(),
      o = i.parent,
      s = i.isMounted,
      a = i.ctx.$scope,
      u = (a.properties || a.props).uI;
    if (u)
      if (o || s) {
        var c = vs(u, i);
        c && c(t, n, r)
      } else gi((function() {
        e(t, n, r)
      }), i)
  }(e, t, n)
}, exports.reactive = Kn, exports.ref = ar, exports.resolveComponent = function(e, t) {
  return function(e, t) {
    var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
      r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
      i = Qr || ao;
    if (i) {
      var o = i.type;
      if ("components" === e) {
        var s = ko(o);
        if (s && (s === t || s === Y(t) || s === Q(Y(t)))) return o
      }
      var a = eo(i[e] || o[e], t) || eo(i.appContext[e], t);
      if (!a && r) return o;
      if (n && !a) {
        var u = "components" === e ? "\nIf this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement." : "";
        yr("Failed to resolve ".concat(e.slice(0, -1), ": ").concat(t).concat(u))
      }
      return a
    }
    yr("resolve".concat(Q(e.slice(0, -1)), " can only be used in render() or setup()."))
  }("components", e, !0, t) || e
}, exports.s = function(e) {
  return gs(e)
}, exports.sr = function(e, t, n) {
  return function(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      r = uo(),
      i = r.$templateRefs;
    i.push({
      i: t,
      r: e,
      k: n.k,
      f: n.f
    })
  }(e, t, n)
}, exports.t = function(e) {
  return function(e) {
    return N(e) ? e : null == e ? "" : R(e) || L(e) && (e.toString === q || !M(e.toString)) ? JSON.stringify(e, _, 2) : String(e)
  }(e)
}, exports.toRefs = function(e) {
  Qn(e) || console.warn("toRefs() expects a reactive object but received a plain one.");
  var t = R(e) ? new Array(e.length) : {};
  for (var n in e) t[n] = pr(e, n);
  return t
}, exports.useRoute = function(e) {
  return ti(Sa)
}, exports.watch = ri;