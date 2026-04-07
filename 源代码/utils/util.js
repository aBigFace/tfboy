var t = require("../@babel/runtime/helpers/objectSpread2"),
  e = require("../@babel/runtime/helpers/createForOfIteratorHelper"),
  n = require("../common/vendor.js"),
  r = require("./commonEnum.js");

function a(t) {
  return null == t || "" === t || 0 === t.length
}
exports.EncryptEmail = function(t) {
  var e = "",
    n = t.split("@");
  if (n.length > 1) {
    var r = n[0],
      a = n[1],
      i = "",
      s = r.length;
    r.length > 3 && (i = r.substr(0, 3), s = r.length - 3);
    for (var o = "", c = 0, u = s; c < u; c++) o += "*";
    e = i + o + "@" + a
  }
  return e
}, exports.EncryptName = function(t) {
  var e;
  if (t && 2 === t.length) e = t.substr(0, 1) + "*";
  else if (t && t.length > 2) {
    for (var n = "", r = 0, a = t.length - 2; r < a; r++) n += "*";
    e = t.substr(0, 1) + n + t.substr(-1, 1)
  } else e = t;
  return e
}, exports.EncryptPhone = function(t) {
  var e = "";
  if ("" != t && null != t && t.length > 7) {
    for (var n = t.substr(0, 3), r = t.substr(t.length - 4, 4), a = "", i = 0, s = t.length - 7; i < s; i++) a += "*";
    e = n + a + r
  }
  return e
}, exports.analyzeIDCardToAge = function(t) {
  var e = 0,
    n = "",
    r = "",
    a = "",
    i = t;
  if (!i) return "";
  if (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(i)) {
    if (15 == i.length) {
      var s = i.substring(6, 12);
      n = "19" + s.substring(0, 2), r = s.substring(2, 4), a = s.substring(4, 6)
    } else 18 == i.length && (n = i.substring(6, 10), r = i.substring(10, 12), a = i.substring(12, 14));
    var o = new Date,
      c = o.getMonth() + 1,
      u = o.getDate();
    e = o.getFullYear() - parseInt(n);
    return (c < parseInt(r) || c == parseInt(r) && u < parseInt(a)) && e--, e + ""
  }
  return ""
}, exports.formatRichText = function(t) {
  return t ? t = (t = t.replace(/<(img).*?(\/>|<\/img>)/g, (function(t) {
    return t.indexOf("style") < 0 ? t.replace(/<\s*img/, '<img style="max-width:100%;height:auto;display:block;"') : t.replace(/style=("|')/, "style=$1max-width:100%;height:auto;display:block;")
  }))).replace(/<(p).*?(\/>|<\/p>)/g, (function(t) {
    return t.indexOf("p style") < 0 ? t.replace(/<\s*p/, '<p style="min-height:10px;margin-bottom:5px;margin-top:5px;"') : t.replace(/style=("|')/, "style=$1min-height:10px;margin-bottom:5px;margin-top:5px;")
  })) : ""
}, exports.getDiffTime = function(t, e) {
  var r = n.dayjs(t),
    a = n.dayjs(e),
    i = r.diff(a),
    s = i % 864e5,
    o = s % 36e5,
    c = o % 6e4;
  return {
    dateDiff: i,
    day: Math.floor(i / 864e5),
    hours: Math.floor(s / 36e5),
    minutes: Math.floor(o / 6e4),
    seconds: Math.round(c / 1e3)
  }
}, exports.getQueryStringByName = function(t, e) {
  var n = t.match(new RegExp("[?&]" + e + "=([^&]+)", "i"));
  return null === n || n.length < 1 ? "" : n[1]
}, exports.getTreeValueByPath = function t(n, r, a, i) {
  var s = function(t, n, r) {
    var a, i = e(t);
    try {
      for (i.s(); !(a = i.n()).done;) {
        var s = a.value;
        if (s[n] === r) return s
      }
    } catch (t) {
      i.e(t)
    } finally {
      i.f()
    }
  }(n, a, r.shift());
  if (!(s && s.children && s.children.length)) return s ? s[i] : "";
  var o = t(s.children, r, a, i);
  return o || void 0
}, exports.idCardEncrypt = function(t) {
  return a(t) ? "" : t.replace(/^(.{3})(?:\d+)(.{3})$/, "$1*********$2")
}, exports.isAuthentication = function() {
  var t = !1,
    e = n.index.getStorageSync("userInfo");
  return 1 == e.idCardType && !a(e.idCard) || (2 == e.idCardType && !a(e.passport) || (3 == e.idCardType && !a(e.hmPasser) || t))
}, exports.isEmpty = a, exports.isNotEmpty = function(t) {
  return null != t && "" !== t && 0 !== t.length
}, exports.openArguments = function(t) {
  var e = t;
  n.index.navigateTo({
    url: "/pages/outLink/argument?img=".concat(e)
  })
}, exports.openArguments_zizhi = function(t) {
  var e = t;
  n.index.navigateTo({
    url: "/pages/outLink/argument_zizhi?img=".concat(e)
  })
}, exports.passportHmEncrypt = function(t) {
  var e = "";
  if (t) {
    e = t.substring(0, 4);
    for (var n = 4; n < t.length; n++) e += "*"
  }
  return e
}, exports.saleTimeDataDeal = function(e) {
  var a, i, s, o, c = {
    type: r.EActivityStatus.not_presale,
    timeText: "",
    deliverTime: "",
    times: {
      hours: "",
      minutes: "",
      seconds: ""
    }
  };
  if (!e) return c;
  c.deliverTime = (a = e.deliverStartTime, i = n.dayjs((new Date).getTime(), "x"), s = n.dayjs(a, ["YYYY-MM-DD HH:mm:ss", "x"]), o = "".concat(s.month() + 1, "月").concat(s.date(), "日"), i.year() !== s.year() && (o += "".concat(s.year(), "年")), "".concat(o, " 发货"));
  var u = (new Date).getTime(),
    d = 1e3 * n.dayjs(e.activityEndTime, ["YYYY-MM-DD HH:mm:ss", "x"]).unix(),
    l = 1e3 * n.dayjs(e.activityStartTime, ["YYYY-MM-DD HH:mm:ss", "x"]).unix();
  if (u > d) return c.type = r.EActivityStatus.end_presale, c;
  if (u > l) {
    c.type = r.EActivityStatus.presale;
    var g = function(t) {
      var e = n.dayjs((new Date).getTime(), "x"),
        r = n.dayjs(t, ["YYYY-MM-DD HH:mm:ss", "x"]),
        a = {
          timeText: "",
          times: {
            hours: "",
            minutes: "",
            seconds: ""
          }
        };
      if (e.year() === r.year()) {
        var i = e.add(3, "day"),
          s = "".concat(i.year(), "-").concat(i.month() + 1, "-").concat(i.date(), " 00:00:00"),
          o = n.dayjs(s, ["YYYY-MM-DD HH:mm:ss", "x"]);
        if (1e3 * r.unix() >= 1e3 * o.unix()) a.timeText = "".concat(r.month() + 1, "月").concat(r.date(), "日 ").concat(String(r.hour()).padStart(2, "0"), ":").concat(String(r.minute()).padStart(2, "0"), " 结束");
        else {
          var c = 1e3 * r.unix() - 1e3 * e.unix(),
            u = Math.floor(c / 36e5),
            d = Math.floor(c % 36e5 / 6e4),
            l = Math.floor(c % 6e4 / 1e3);
          a.times = {
            hours: u,
            minutes: d,
            seconds: l
          }
        }
      } else a.timeText = "".concat(r.year(), "年").concat(r.month() + 1, "月").concat(r.date(), "日 ").concat(String(r.hour()).padStart(2, "0"), ":").concat(String(r.minute()).padStart(2, "0"), " 结束");
      return a
    }(e.activityEndTime);
    return c = t(t({}, c), g)
  }
  return c.type = r.EActivityStatus.before_presale, c.timeText = function(t) {
    var e = n.dayjs((new Date).getTime(), "x"),
      r = n.dayjs(t, ["YYYY-MM-DD HH:mm:ss", "x"]),
      a = "";
    if (e.year() === r.year()) {
      var i = e.add(3, "day"),
        s = "".concat(i.year(), "-").concat(i.month() + 1, "-").concat(i.date(), " 00:00:00"),
        o = n.dayjs(s, ["YYYY-MM-DD HH:mm:ss", "x"]);
      if (1e3 * r.unix() >= 1e3 * o.unix()) a = "".concat(r.month() + 1, "月").concat(r.date(), "日 ").concat(r.hour(), ":").concat(String(r.minute()).padStart(2, "0"));
      else {
        var c = e.add(1, "day"),
          u = "今天";
        e.add(2, "day").date() === r.date() ? u = "后天" : c.date() === r.date() && (u = "明天"), a = "".concat(u, " ").concat(r.hour(), ":").concat(String(r.minute()).padStart(2, "0"))
      }
    } else a = "".concat(r.year(), "年").concat(r.month() + 1, "月").concat(r.date(), "日 ").concat(r.hour(), ":").concat(String(r.minute()).padStart(2, "0"));
    return "".concat(a, " 开售")
  }(e.activityStartTime), c
}, exports.slicePhone = function(t) {
  if (t && !(t.length < 3)) return "86" === t.slice(0, 2) ? t.slice(2, t.length) : "852" === t.slice(0, 3) || "853" === t.slice(0, 3) || "886" === t.slice(0, 3) ? t.slice(3, t.length) : t
}, exports.systemInfoDataObj = function() {
  var t = {
    statusBarHeight: 0,
    titleBarHeight: 0,
    windowWidth: 0,
    navBarHeight: 0,
    windowHeight: 0
  };
  return n.index.getSystemInfo({
    success: function(e) {
      t.statusBarHeight = e.statusBarHeight, t.titleBarHeight = e.screenHeight - e.windowHeight - e.statusBarHeight, t.windowWidth = e.windowWidth, t.windowHeight = e.windowHeight, n.index.getMenuButtonBoundingClientRect()
    }
  }), t
};