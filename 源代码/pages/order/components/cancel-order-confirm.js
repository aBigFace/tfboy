var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../common/vendor.js"),
  r = require("../../../utils/uniUtil.js"),
  s = require("../../../common/app-theme.js"),
  i = o.defineComponent({
    name: "cancelOrderConfirm",
    components: {},
    emits: ["confirm", "cancel"],
    setup: function(e, i) {
      var t = o.ref(null),
        a = o.reactive({
          reasonDesc: "",
          showOtherReason: !1,
          params: {},
          reasonList: [{
            id: "1",
            label: "不想买了"
          }, {
            id: "2",
            label: "拍错商品"
          }, {
            id: "3",
            label: "商品描述不符"
          }, {
            id: "4",
            label: "商品质量问题"
          }, {
            id: "5",
            label: "包装破损"
          }, {
            id: "6",
            label: "未按约定时间发货"
          }, {
            id: "7",
            label: "其他"
          }]
        }),
        c = function() {
          a.reasonDesc = "", a.reasonList.forEach((function(e) {
            e.checked = !1
          })), t.value.close(), i.emit("cancel")
        };
      return n(n({
        AppTheme: s.AppTheme
      }, o.toRefs(a)), {}, {
        open: function(e) {
          a.params = e, t.value.open()
        },
        popupRef: t,
        handleSubmit: function() {
          var e = a.reasonList.find((function(e) {
            return e.checked
          }));
          if (e)
            if (!a.showOtherReason || a.reasonDesc) {
              var o = {
                code: e.id,
                reason: e.label
              };
              a.showOtherReason && (o.reason = a.reasonDesc), i.emit("confirm", n(n({}, a.params), o)), e.checked = !1, a.reasonDesc = "", c()
            } else r.uniUtil.showToast("请输入取消原因");
          else r.uniUtil.showToast("请选择取消原因")
        },
        handleClose: c,
        handleChangeReason: function(e) {
          var n = a.reasonList.find((function(e) {
            return e.checked
          }));
          n && (n.checked = !1), e.checked = !0, a.showOtherReason = "10000" === e.id
        }
      })
    }
  });
Array || (o.resolveComponent("uni-icons") + o.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var t = o._export_sfc(i, [
  ["render", function(n, r, s, i, t, a) {
    return o.e({
      a: o.o(n.handleClose),
      b: o.p({
        type: "closeempty",
        color: "#666"
      }),
      c: o.f(n.reasonList, (function(e, r, s) {
        return o.e({
          a: o.t(e.label),
          b: e.checked
        }, e.checked ? {
          c: "61050057-2-" + s + ",61050057-0",
          d: o.p({
            type: "checkbox-filled",
            size: 24,
            color: n.AppTheme.themeColor
          })
        } : {
          e: "61050057-3-" + s + ",61050057-0",
          f: o.p({
            type: "circle",
            size: 24,
            color: "#CACACA"
          })
        }, {
          g: r,
          h: o.o((function(o) {
            return n.handleChangeReason(e)
          }))
        })
      })),
      d: n.showOtherReason
    }, n.showOtherReason ? {
      e: n.reasonDesc,
      f: o.o((function(e) {
        return n.reasonDesc = e.detail.value
      }))
    } : {}, {
      g: o.o((function() {
        return n.handleSubmit && n.handleSubmit.apply(n, arguments)
      })),
      h: o.sr("popupRef", "61050057-0"),
      i: o.p(e({
        type: "bottom"
      }, "safe-area", !1))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/cancel-order-confirm.vue"]
]);
wx.createComponent(t);