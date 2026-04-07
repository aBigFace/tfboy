var e = require("../../common/vendor.js"),
  t = {
    name: "Tabs",
    props: ["data", "margin"],
    setup: function(t, a) {
      var n = a.emit,
        o = e.toRefs(t).data,
        r = e.ref(0);
      return {
        data: o,
        getStyle: function(e) {
          var t = o.value[e];
          return {
            background: t.bgColor,
            color: r.value === e ? t.onTextColor : t.unTextColor,
            borderBottom: r.value === e ? "4px #E85252 solid" : "unset",
            fontWeight: r.value === e ? 500 : 400
          }
        },
        changeTab: function(e) {
          r.value = e, n("change", e)
        }
      }
    }
  };
var a = e._export_sfc(t, [
  ["render", function(t, a, n, o, r, c) {
    return {
      a: e.f(o.data, (function(t, a, n) {
        return {
          a: e.t(t.aname),
          b: e.o((function() {
            return o.changeTab(a)
          })),
          c: e.s(o.getStyle(a))
        }
      })),
      b: "calc(100vw - ".concat(2 * n.margin + 20, "px)"),
      c: "".concat(n.margin, "px")
    }
  }],
  ["__scopeId", "data-v-6261480f"],
  ["__file", "E:/project/TF/tf-wechat/src/components/tabs/tabs.vue"]
]);
wx.createComponent(a);