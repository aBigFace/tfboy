var e = require("../../../common/vendor.js"),
  o = {
    name: "realNameAbnormalPopup",
    props: {
      paramsObj: {
        type: Object,
        default: {}
      }
    },
    setup: function() {
      var o = e.reactive({
          item: {
            subjectId: "",
            subjectLogo: "",
            subjectName: "",
            termDay: 0
          },
          img: ""
        }),
        n = e.ref(),
        t = function() {
          n.value.close()
        };
      return {
        realNamePopupRef: n,
        handleToRealName: function() {
          e.index.navigateTo({
            url: "/pages/mine/user/certifyInfo?backChangePayPassword=true"
          }), t()
        },
        handleOpen: function(e, t) {
          o.item = {
            subjectId: "",
            subjectLogo: "",
            subjectName: "",
            termDay: 0
          }, o.img = "", o.item = e, o.img = t, n.value.open()
        },
        handleClose: t,
        goPay: function() {
          e.index.navigateTo({
            url: "/pages/mine/vip/payAgreement?subjectId=".concat(o.item.subjectId, "&subjectLogo=").concat(o.item.subjectLogo, "&subjectName=").concat(o.item.subjectName, "&termDay=").concat(o.item.termDay, "&img=").concat(o.img)
          }), t()
        }
      }
    }
  };
Array || (e.resolveComponent("uni-icons") + e.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var n = e._export_sfc(o, [
  ["render", function(o, n, t, a, u, c) {
    return {
      a: e.o(a.handleClose),
      b: e.p({
        type: "closeempty",
        color: "#666"
      }),
      c: e.o((function() {
        return a.handleToRealName && a.handleToRealName.apply(a, arguments)
      })),
      d: e.o((function() {
        return a.goPay && a.goPay.apply(a, arguments)
      })),
      e: e.sr("realNamePopupRef", "da246632-0"),
      f: e.p({
        type: "bottom"
      })
    }
  }],
  ["__scopeId", "data-v-da246632"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/realNameAbnormalPopup.vue"]
]);
wx.createComponent(n);