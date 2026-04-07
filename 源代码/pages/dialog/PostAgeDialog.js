var e = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  o = require("../../apis/order.js"),
  a = require("../../apis/user.js"),
  i = require("../../utils/commonEnum.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var c = t.defineComponent({
  name: "postAgeDialog",
  props: {
    type: {
      prop: Number,
      default: 0
    },
    args: {
      prop: Object,
      default: {
        oldAddress: {
          receiver: "",
          receiverAddress: "",
          receiverCity: "",
          receiverCounty: "",
          receiverPhone: "",
          receiverProvince: "",
          receiverStreet: "",
          id: 0
        },
        newAddress: {
          receiver: "",
          receiverAddress: "",
          receiverCity: "",
          receiverCounty: "",
          receiverPhone: "",
          receiverProvince: "",
          receiverStreet: "",
          id: 0
        },
        saleOrderId: 0,
        saleOrderNo: "",
        diffFee: 0,
        code: 0
      }
    }
  },
  components: {
    confirmModal: function() {
      return "../../components/modal/confirm-modal.js"
    },
    parentAuthDialog: function() {
      return "./parentAuthDialog.js"
    }
  },
  setup: function(c, s) {
    var d = t.ref(),
      u = t.ref(),
      l = t.reactive({
        isShow: !1
      }),
      f = t.ref(),
      p = function() {
        f.value.close()
      },
      g = function() {
        var e = n(r().mark((function e(n, o) {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, a.apiSendCode(n).then((function(e) {
                  200 == e.code ? setTimeout((function() {
                    t.index.navigateTo({
                      url: "/pages/mine/setting/msgCode?validType=".concat(i.EValidType.guardian, "&checkMethod=postAgeCertifyParent&postAgeParams=").concat(JSON.stringify(o))
                    })
                  }), 1e3) : t.index.showToast({
                    title: "请稍后再试",
                    icon: "none"
                  })
                })).catch((function(e) {
                  t.index.showToast({
                    title: "请稍后再试",
                    icon: "none"
                  })
                }));
              case 2:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function(r, n) {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, l), {}, {
      configInfo: [{
        title: "收货地址变更，需要补运费差价",
        cancelStr: "再想想",
        confrimStr: "确认支付"
      }, {
        title: "已存在待支付的补邮订单，是否继续支付?",
        cancelStr: "取消补邮订单",
        confrimStr: "继续支付"
      }],
      openDialog: function() {
        f.value.open("center")
      },
      closeDialog: p,
      parentAuthDialogRef: u,
      popup: f,
      cancel: function() {
        0 == c.type ? p() : d.value.confirm({
          title: "",
          message: "确定取消补邮订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "暂不取消"
        }).then((function() {
          var e = [c.args.newAddress.id];
          p(), o.apiCancelOrderByDifFee(e).then((function(e) {
            200 === e.code && t.index.showToast({
              title: "取消成功",
              icon: "none"
            })
          })).catch((function(e) {
            t.index.showToast({
              title: "取消失败,请稍后再试",
              icon: "none"
            })
          }))
        }), (function() {
          p()
        }))
      },
      confirm: function() {
        if (p(), 111 == c.args.code) {
          var e = Object.assign(c.args.newAddress);
          e.receiverStreet = "", e.saleOrderId = c.args.saleOrderId, e.saleOrderNo = c.args.saleOrderNo, e.validCode = "", e.orderSource = 3, o.apiCreatePostOrderDiff(e).then((function(r) {
            if (200 === r.code && null != r.data) {
              if (null != r.data.orderIds && null != r.data.orderIds) {
                var n = {
                  orderIds: r.data.orderIds,
                  isComeNoPay: 0
                };
                t.index.navigateTo({
                  url: "/pages/order/myOrder/pay?params=".concat(JSON.stringify(n))
                })
              }
            } else 100 === r.code && 1 === r.data && (p(), u.value.confirm({
              message: "家长验证",
              title: "为确认您的身份，请先进行安全验证",
              confirmButtonText: "家长认证",
              cancelButtonText: "取消"
            }).then((function() {
              var r = {
                type: 1,
                validType: i.EValidType.guardian,
                code: t.index.getStorageSync("userInfo").infoOther.guardianPhone
              };
              g(r, e)
            })).catch((function() {})))
          })).catch((function(r) {
            100 === r.data.code && 1 === r.data.data && (p(), u.value.confirm({
              message: "家长验证",
              title: "为确认您的身份，请先进行安全验证",
              confirmButtonText: "家长认证",
              cancelButtonText: "取消"
            }).then((function() {
              var r = {
                type: 1,
                validType: i.EValidType.guardian,
                code: t.index.getStorageSync("userInfo").infoOther.guardianPhone
              };
              g(r, e)
            })).catch((function() {})))
          }))
        } else if (110 == c.args.code) {
          var r = {
            orderIds: [c.args.newAddress.id],
            isComeNoPay: 0
          };
          t.index.navigateTo({
            url: "/pages/order/myOrder/pay?params=".concat(JSON.stringify(r))
          })
        }
      },
      confirmModalRef: d
    })
  }
});
Array || (t.resolveComponent("confirm-modal") + t.resolveComponent("uni-popup") + t.resolveComponent("parent-auth-dialog"))();
Math;
var s = t._export_sfc(c, [
  ["render", function(e, r, n, o, a, i) {
    return {
      a: e.$static + "/static/image/order/header-bg.png",
      b: t.t(e.configInfo[e.type].title),
      c: t.t(e.args.oldAddress.receiver),
      d: t.t(e.args.oldAddress.receiverPhone.replace(/(\d{3})\d*(\d{4})/, "$1****$2")),
      e: t.t("".concat(e.args.oldAddress.receiverProvince).concat(e.args.oldAddress.receiverCity).concat(e.args.oldAddress.receiverCounty).concat(e.args.oldAddress.receiverAddress)),
      f: t.t(e.args.newAddress.receiver),
      g: t.t(e.args.newAddress.receiverPhone.replace(/(\d{3})\d*(\d{4})/, "$1****$2")),
      h: t.t("".concat(e.args.newAddress.receiverProvince).concat(e.args.newAddress.receiverCity).concat(e.args.newAddress.receiverCounty).concat(e.args.newAddress.receiverAddress)),
      i: t.t(e.args.diffFee),
      j: t.t(e.configInfo[e.type].cancelStr),
      k: t.o((function() {
        return e.cancel && e.cancel.apply(e, arguments)
      })),
      l: t.t(e.configInfo[e.type].confrimStr),
      m: t.o((function() {
        return e.confirm && e.confirm.apply(e, arguments)
      })),
      n: t.sr("confirmModalRef", "15e5d844-1,15e5d844-0"),
      o: t.sr("popup", "15e5d844-0"),
      p: t.sr("parentAuthDialogRef", "15e5d844-2")
    }
  }],
  ["__scopeId", "data-v-15e5d844"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/dialog/PostAgeDialog.vue"]
]);
wx.createComponent(s);