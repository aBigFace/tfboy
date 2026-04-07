var e = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("../common/vendor.js"),
  i = require("../common/user.js");
require("../apis/user.js"), require("../utils/http.js"), require("../config/apiPrefix.js"), require("../utils/common.js"), require("../common/app-theme.js");
var t = r.defineComponent({
  name: "price",
  props: {
    price: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "general"
    },
    deciaml: {
      type: Number,
      default: -1
    },
    hideTip: {
      type: Boolean,
      default: !0
    },
    payState: {
      type: Number,
      default: -1
    }
  },
  setup: function(t, p) {
    var c = r.reactive({
        isLogin: i.checkLogin()
      }),
      a = r.computed$1((function() {
        var e = t.type,
          r = t.price;
        return t.price || 0 == t.price ? ("twoDecimal" === e && (r = r.toFixed(2)), r.toString().split(".")[0] || 0) : ""
      })),
      n = r.computed$1((function() {
        t.type;
        var e = t.price;
        return t.price ? (t.deciaml > -1 && (e = e.toFixed(t.deciaml)), e.toString().split(".")[1] || "") : ""
      }));
    return e({
      priceNumber: a,
      priceDecimal: n
    }, r.toRefs(c))
  }
});
var p = r._export_sfc(t, [
  ["render", function(e, i, t, p, c, a) {
    return r.e({
      a: "general" === e.type
    }, "general" === e.type ? r.e({
      b: e.hideTip
    }, (e.hideTip, {}), {
      c: r.t(e.price)
    }) : r.e({
      d: e.hideTip
    }, (e.hideTip, {}), {
      e: r.t(e.priceNumber),
      f: e.priceDecimal
    }, (e.priceDecimal, {}), {
      g: e.priceDecimal
    }, e.priceDecimal ? {
      h: r.t(e.priceDecimal)
    } : {}), {
      i: r.n(e.className)
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/price.vue"]
]);
wx.createComponent(p);