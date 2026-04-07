var e = require("../common/vendor.js"),
  r = e.defineComponent({
    name: "searchBar",
    props: {
      value: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    emits: ["update:modelValue", "search"],
    setup: function(r, a) {
      var t = e.ref(r.value);
      e.watch(t, (function(e, r) {
        a.emit("update:modelValue", e)
      }));
      return {
        searchValue: t,
        handleSearch: function() {
          a.emit("search", t.value)
        }
      }
    }
  });
Array || e.resolveComponent("uni-icons")();
Math;
var a = e._export_sfc(r, [
  ["render", function(r, a, t, n, c, o) {
    return e.e({
      a: e.p({
        type: "search",
        color: "#999999",
        size: 20
      }),
      b: r.placeholder,
      c: e.o((function() {
        return r.handleSearch && r.handleSearch.apply(r, arguments)
      })),
      d: r.searchValue,
      e: e.o((function(e) {
        return r.searchValue = e.detail.value
      })),
      f: r.searchValue
    }, r.searchValue ? {
      g: e.o((function(e) {
        return r.searchValue = ""
      })),
      h: e.p({
        type: "clear",
        color: "#999999",
        size: 20
      })
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/search-bar.vue"]
]);
wx.createComponent(a);