var e = require("../@babel/runtime/helpers/objectSpread2"),
  n = require("../common/vendor.js"),
  a = {
    name: "searchNavbar",
    emits: ["searchValue"],
    props: ["searchContent", "backType"],
    setup: function(a, r) {
      n.watch((function() {
        return a.searchContent
      }), (function(e, n) {
        o.value = a.searchContent
      }));
      var t = getCurrentPages(),
        c = t[t.length - 1].route,
        o = n.reactive({
          value: ""
        });
      return e(e({
        handleSearch: function() {
          n.index.redirectTo({
            url: "/pages/index/search"
          })
        },
        goToBackPage: function() {
          if (a.backType) return null;
          "pages/index/searchContent" == c && n.index.redirectTo({
            url: "/pages/index/search?value=" + o.value
          })
        },
        handleCancel: function() {
          n.index.navigateBack()
        },
        handleBackward: function() {
          n.index.navigateBack()
        }
      }, n.toRefs(o)), {}, {
        confirmResult: function() {
          if (a.backType) return r.emit("search", o.value), null;
          n.index.navigateTo({
            url: "/pages/index/searchContent?value=" + o.value
          })
        }
      })
    }
  };
Array || n.resolveComponent("uni-search-bar")();
Math;
var r = n._export_sfc(a, [
  ["render", function(e, a, r, t, c, o) {
    return {
      a: n.o(t.goToBackPage),
      b: n.o(t.confirmResult),
      c: n.o((function(n) {
        return e.value = n
      })),
      d: n.p({
        radius: "36",
        clearButton: "auto",
        placeholder: "",
        cancelButton: "none",
        modelValue: e.value
      }),
      e: n.o((function() {
        return t.handleCancel && t.handleCancel.apply(t, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-039d9830"],
  ["__file", "E:/project/TF/tf-wechat/src/components/searchNavbar.vue"]
]);
wx.createComponent(r);