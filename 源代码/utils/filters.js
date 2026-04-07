var e = {
  showStock: function(e) {
    return e > 1e4 ? "" : e > 1e3 && e <= 1e4 ? "库存".concat(1e3 * parseInt(e / 1e3), "+") : e > 100 && e <= 1e3 ? "库存".concat(100 * parseInt(e / 100), "+") : e > 20 && e <= 100 ? "库存不足100" : e > 10 && e <= 20 ? "库存不足20" : e > 5 && e <= 10 ? "库存不足10" : e > 0 && e <= 5 ? "库存不足5" : e > 0 && e <= 5 ? "缺货" : ""
  },
  tfShowStock: function(e) {
    return e <= 0 ? "缺货" : e <= 100 ? "即将售罄" : ""
  },
  formatPrice: function(e) {
    return (e = e || 0) <= 0 ? Math.round(e) : e = Math.round(e * Math.pow(10, 8)) / Math.pow(10, 8)
  },
  formatPriceOne: function(e) {
    return (e = e || 0).toFixed(1)
  },
  encryptPhone: function(e) {
    if (!e) return "";
    if (e.length >= 11) {
      var t = /(\d{3})\d{4}(\d{4})/;
      return e.replace(t, "$1****$2")
    }
    return t = /(\d{2})\d{2}(\d{2})/, e.replace(t, "$1****$2")
  },
  encryptEmail: function(e) {
    var t = "",
      n = e.split("@");
    if (n.length > 1) {
      var a = n[0],
        r = n[1],
        o = "",
        s = a.length;
      a.length > 3 && (o = a.substr(0, 3), s = a.length - 3);
      for (var u = "", l = 0, c = s; l < c; l++) u += "*";
      t = o + u + "@" + r
    }
    return t
  },
  showDate: function(e) {
    if (e) return e.split(" ")[0]
  },
  formatUserName: function(e) {
    return !e || e.length < 5 ? e : e.substring(0, 4) + "..."
  },
  formatImage: function(e) {
    return e ? 0 === e.indexOf("http") ? e : "".concat({}.VUE_APP_PHOTO_PATH).concat(e) : e
  },
  thousandsBeautyMoney: function(e) {
    return (e = e || 0).toLocaleString()
  },
  filtersSaleTime: function(e, t) {
    var n = new Date(e).getTime();
    (new Date).getTime();
    var a = "".concat((new Date).getFullYear(), "-").concat((new Date).getMonth() + 1, "-").concat((new Date).getDate()),
      r = new Date(n),
      o = r.getFullYear(),
      s = r.getMonth() + 1,
      u = r.getDate(),
      l = r.getHours() < 10 ? "0" + r.getHours() : r.getHours(),
      c = r.getMinutes() < 10 ? "0" + r.getMinutes() : r.getMinutes();
    if ((new Date).getFullYear() !== new Date(e).getFullYear()) return console.log("".concat(o, "年-").concat(s, "月-").concat(u, "日  ").concat(l, "时").concat(c, "分  开售")), console.log({
      saleYear: o,
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c
    }, "00"), {
      saleYear: o,
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c,
      dayTypeOne: ""
    };
    var i = "".concat(s, "-").concat(u),
      g = "".concat((new Date).getMonth(), "-").concat((new Date).getDate()),
      D = new Date(a).setHours(0, 0, 0),
      f = new Date(a).setHours(23, 59, 59),
      M = new Date((new Date).getTime() - 1728e5).setHours(0, 0, 0),
      h = new Date((new Date).getTime() + 1728e5).setHours(23, 59, 59),
      w = new Date((new Date).getTime() + 864e5).setHours(23, 59, 59);
    return (n <= M || n >= h) && i !== g ? (console.log({
      saleYear: o,
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c
    }, "11"), {
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c,
      dayTypeOne: ""
    }) : n >= D && n <= h ? n >= D && n <= f ? {
      saleYear: o,
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c,
      dayTypeOne: "今天"
    } : n >= f && n <= w ? {
      saleYear: o,
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c,
      dayTypeOne: "明天"
    } : {
      saleYear: o,
      saleMonth: s,
      saleDate: u,
      saleHour: l,
      saleMinu: c,
      dayTypeOne: "后天"
    } : void 0
  },
  transformTime: function(e) {
    var t = new Date(e);
    return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ") + ((t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":") + ((t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":") + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds())
  },
  formatAfterSaleType: function(e) {
    var t = e.split(","),
      n = ["退款", "退货", "换货", "补寄"],
      a = [];
    return t.forEach((function(e) {
      a[Number(e) - 1] = n[Number(e) - 1]
    })), a
  }
};
exports.filters = e;