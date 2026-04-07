var e = require("../../../common/vendor.js"),
  n = {
    name: "realNamePopup",
    props: {
      paramsObj: {
        type: Object,
        default: {}
      }
    },
    setup: function() {
      var n = e.ref(),
        o = function() {
          n.value.close()
        };
      return {
        realNamePopupRef: n,
        handleToRealName: function() {
          e.index.navigateTo({
            url: "/pages/mine/user/certifyInfo?backChangePayPassword=true"
          }), o()
        },
        handleOpen: function() {
          n.value.open()
        },
        handleClose: o
      }
    }
  };
Array || (e.resolveComponent("uni-icons") + e.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var o = e._export_sfc(n, [
  ["render", function(n, o, a, p, r, u) {
    return {
      a: e.o(p.handleClose),
      b: e.p({
        type: "closeempty",
        color: "#666"
      }),
      c: e.o((function() {
        return p.handleToRealName && p.handleToRealName.apply(p, arguments)
      })),
      d: e.sr("realNamePopupRef", "54bb034f-0"),
      e: e.p({
        type: "bottom"
      })
    }
  }],
  ["__scopeId", "data-v-54bb034f"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/realNamePopup.vue"]
]);
wx.createComponent(o);