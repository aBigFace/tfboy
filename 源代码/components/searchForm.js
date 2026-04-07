var e = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("../common/vendor.js"),
  o = require("../apis/searchHotWords.js");
require("../utils/http.js"), require("../config/apiPrefix.js"), require("../utils/common.js"), require("../common/app-theme.js");
var t = r.defineComponent({
  name: "searchForm",
  emits: ["close"],
  setup: function(t, n) {
    var c = r.reactive({
        priceSection: 0,
        classList: [],
        formData: {
          sellPriceFloor: "",
          sellPriceTop: "",
          salesClassId: -1
        }
      }),
      a = function() {
        n.emit("close", "12313")
      };
    return r.onMounted((function() {
      o.apiGetProductTreeClass({
        companyId: 355,
        orgId: 395,
        queryRootLevel: 1
      }).then((function(e) {
        c.classList = e.data
      }))
    })), e({
      handleInput: function(e) {
        console.log(e.target.value), c.formData.sellPriceFloor = e.target.value.replace(/\D/g, "").replace(/^0{1,}/g, "")
      },
      close: a,
      reset: function() {
        c.priceSection = 0, c.formData = {}
      },
      confirm: function() {
        n.emit("on-success", c.formData), a()
      },
      handlePriceSection: function(e) {
        c.priceSection = e
      },
      handleClass: function(e) {
        c.formData.salesClassId = e
      }
    }, r.toRefs(c))
  }
});
var n = r._export_sfc(t, [
  ["render", function(e, o, t, n, c, a) {
    return r.e({
      a: e.$static + "/static/image/search/icon_tan_close@3x.png",
      b: r.o((function() {
        return e.close && e.close.apply(e, arguments)
      })),
      c: 1 != e.priceSection && "" == e.formData.sellPriceFloor
    }, 1 != e.priceSection && "" == e.formData.sellPriceFloor ? {
      d: 1 == e.priceSection ? 1 : "",
      e: 1 == e.priceSection ? 1 : "",
      f: r.o((function(r) {
        return e.handlePriceSection(1)
      }))
    } : {
      g: r.o([r.m((function(r) {
        return e.formData.sellPriceFloor = r.detail.value
      }), {
        number: !0
      }), function() {
        return e.handleInput && e.handleInput.apply(e, arguments)
      }]),
      h: e.formData.sellPriceFloor
    }, {
      i: 2 != e.priceSection && "" == e.formData.sellPriceTop
    }, 2 != e.priceSection && "" == e.formData.sellPriceTop ? {
      j: 2 == e.priceSection ? 1 : "",
      k: 2 == e.priceSection ? 1 : "",
      l: r.o((function(r) {
        return e.handlePriceSection(2)
      }))
    } : {
      m: e.formData.sellPriceTop,
      n: r.o(r.m((function(r) {
        return e.formData.sellPriceTop = r.detail.value
      }), {
        number: !0
      }))
    }, {
      o: r.f(e.classList, (function(o, t, n) {
        return {
          a: r.t(o.salesClassName),
          b: e.formData.salesClassId == o.id ? 1 : "",
          c: t.id,
          d: e.formData.salesClassId == o.id ? 1 : "",
          e: r.o((function(r) {
            return e.handleClass(o.id)
          }), t.id)
        }
      })),
      p: r.o((function() {
        return e.reset && e.reset.apply(e, arguments)
      })),
      q: r.o((function() {
        return e.confirm && e.confirm.apply(e, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-e4ae0ac8"],
  ["__file", "E:/project/TF/tf-wechat/src/components/searchForm.vue"]
]);
wx.createComponent(n);