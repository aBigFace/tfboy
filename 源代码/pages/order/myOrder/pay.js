var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  o = require("../../../apis/order.js"),
  i = require("../../../utils/util.js"),
  s = require("../../../common/app-theme.js"),
  u = require("../../../utils/uniUtil.js"),
  d = require("../../../utils/rsa.js"),
  c = require("../../../common/common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../utils/commonEnum.js"), require("../../../apis/user.js"), require("../../../apis/shopCart.js");
var p = t.defineComponent({
  name: "orderPay",
  components: {
    price: function() {
      return "../../../components/price.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    payPassInput: function() {
      return "../components/payPassInput.js"
    }
  },
  setup: function(e, p) {
    var l = t.ref(null),
      m = t.ref(null),
      f = t.ref(),
      y = t.reactive({
        fromPage: "",
        orderIds: [],
        surplus: 0,
        surplusPay: 0,
        orderResultMessage: "",
        payPopupShowFlag: !1,
        totalFee: 0,
        payMethod: 1,
        paramsObj: {},
        payMethodList: [{
          id: 64,
          name: "微信",
          payType: 1,
          checked: !0
        }],
        countDounTimeup: !1,
        countDounObj: {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        confirmDialogOpened: !1
      }),
      h = "1",
      g = !1;
    t.onLoad((function(e) {
      var r = JSON.parse(e.params);
      null != e.fromPage && (y.fromPage = e.fromPage), y.orderIds = r.orderIds, null != r.isComeNoPay && null != r.isComeNoPay && (h = r.isComeNoPay), P(r), t.index.enableAlertBeforeUnload({
        message: "确定要取消当前支付吗？",
        success: function(e) {},
        fail: function(e) {},
        complete: function() {}
      })
    })), t.onUnload((function() {
      var e = !g;
      8 == y.payMethod && (e = null != m.value && !m.value.getHasPay()), "1" == h && e && t.index.navigateTo({
        url: "/pages/order/myOrder/list?orderType=4"
      })
    }));
    var P = function(e) {
        o.apiGetOrderPayDetail(e.orderIds).then((function(e) {
          y.surplus = e.data.surplus, y.surplusPay = e.data.surplusPay;
          var r, n = t.dayjs(e.data.orderCreateTime).add(600 + (null == (r = t.index.getStorageSync("diffentTime")) || "" == r ? 0 : parseInt(r)), "seconds"),
            a = t.dayjs(),
            o = i.getDiffTime(n, a);
          y.countDounObj = o, y.countDounTimeup = o.dateDiff < 0;
          var s = e.data.payTypes.map((function(e) {
            return {
              checked: !1,
              id: e.payType,
              name: e.payTypeDesc
            }
          }));
          s.forEach((function(e, r) {
            2 != e.id && "支付宝支付" != e.name || s.splice(r, 1), 8 != e.id && "余额支付" != e.name || (e.name = "小葵花")
          })), s.length && (y.payMethod = s[0].id, s[0].checked = !0), y.payMethodList = s, y.totalFee = e.data.totalFee
        }))
      },
      b = function() {
        c.debounce(x(), 200)
      },
      x = function() {
        var e = a(r().mark((function e() {
          var i, s;
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (y.payMethod) {
                  e.next = 2;
                  break
                }
                return e.abrupt("return", u.uniUtil.showToast("请选择支付方式"));
              case 2:
                if (t.index.getStorageSync("userInfo").passwordSet || 8 != y.payMethod) {
                  e.next = 6;
                  break
                }
                return f.value.confirm({
                  title: "请设置小葵花支付密码",
                  message: "",
                  confirmButtonText: "去设置",
                  cancelButtonText: "暂不设置"
                }).then((function() {
                  t.index.navigateTo({
                    url: "/pages/mine/setting/setPayPass?fromPage=pay"
                  })
                })), e.abrupt("return");
              case 6:
                if (!(y.surplusPay > y.surplus && 8 == y.payMethod)) {
                  e.next = 8;
                  break
                }
                return e.abrupt("return", u.uniUtil.showToast("小葵花数量不足"));
              case 8:
                return i = y.payMethodList.filter((function(e) {
                  return e.checked
                })).map((function(e) {
                  return e.id
                })), e.next = 11, d.getRsaCode(t.index.getStorageSync("appletOpenId"));
              case 11:
                if (s = e.sent, 1 == y.payMethod ? y.paramsObj = {
                    orderIds: y.orderIds,
                    payMethods: i,
                    appletOpenId: s,
                    requestType: "WX_APPLET_PRE_ORDER"
                  } : y.paramsObj = {
                    orderIds: y.orderIds,
                    payMethods: i,
                    requestType: "OWN_CURRENCY_PAY",
                    paymentPassword: "",
                    totalFee: y.surplusPay
                  }, 8 != y.payMethod) {
                  e.next = 17;
                  break
                }
                return y.payPopupShowFlag = !0, m.value.handleOpen(), e.abrupt("return");
              case 17:
                t.index.showLoading({
                  title: "请稍等",
                  mask: !0
                }), o.apiOrderPay(y.paramsObj).then(function() {
                  var e = a(r().mark((function e(a) {
                    var i, s;
                    return r().wrap((function(e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          if (g = !0, 1 != y.payMethod) {
                            e.next = 7;
                            break
                          }
                          return e.next = 4, o.apiGetTmp([1, 2]);
                        case 4:
                          i = e.sent, s = i.data.map((function(e) {
                            return e.priTmplId
                          })), t.index.requestPayment(n(n({}, a.data), {}, {
                            success: function(e) {
                              t.index.hideLoading(), y.orderResultMessage = "订单支付成功", u.uniUtil.subscribeMessage({
                                tmplIds: s
                              }).then((function(e) {
                                t.index.redirectTo({
                                  url: "/pages/order/myOrder/payResult?fromPage=".concat(y.fromPage, "&orderIds=").concat(y.orderIds[0])
                                })
                              })).catch((function(e) {
                                t.index.redirectTo({
                                  url: "/pages/order/myOrder/payResult?fromPage=".concat(y.fromPage, "&orderIds=").concat(y.orderIds[0])
                                })
                              }))
                            },
                            fail: function(e) {
                              t.index.hideLoading(), y.orderResultMessage = e.message, t.index.redirectTo({
                                url: "/pages/order/myOrder/payResultFail?fromPage=".concat(y.fromPage, "&orderIds=").concat(y.orderIds[0])
                              })
                            }
                          }));
                        case 7:
                        case "end":
                          return e.stop()
                      }
                    }), e)
                  })));
                  return function(r) {
                    return e.apply(this, arguments)
                  }
                }()).catch((function(e) {
                  t.index.hideLoading(), g = !0, y.orderResultMessage = e.message, t.index.redirectTo({
                    url: "/pages/order/myOrder/payResultFail?&orderIds=".concat(y.orderIds[0])
                  })
                }));
              case 19:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return n(n({}, t.toRefs(y)), {}, {
      confirmModalRef: l,
      payPopupRef: m,
      confirmRef: f,
      handleChangePayMethod: function(e) {
        var r;
        null == (r = null == m ? void 0 : m.value) || r.handleClose(), y.payMethod = e.id, y.payMethodList.forEach((function(r) {
          r.checked = r.id === e.id
        }))
      },
      handleTimeup: function() {
        y.countDounTimeup = !0
      },
      handlePay: x,
      debouncePay: b,
      changePayPopupShowFlag: function(e) {
        y.payPopupShowFlag = e
      },
      handleGoOrderDetail: function() {
        t.index.redirectTo({
          url: "/pages/order/myOrder/detail?id=".concat(y.orderIds[0])
        })
      },
      handleGoMyOrderList: function() {
        t.index.navigateTo({
          url: "/pages/order/myOrder/list"
        })
      },
      handleAlertPay: function(e) {
        y.confirmDialogOpened = 2 === e, l.value.confirm({
          title: "确定要放弃支付吗？",
          message: "",
          confirmButtonText: "继续支付",
          confirmButtonColor: s.AppTheme.themeColor,
          cancelButtonText: "放弃"
        }).then((function() {
          b()
        })).catch((function() {
          1 === e ? t.index.switchTab({
            url: "/pages/index/index"
          }) : t.index.navigateTo({
            url: "/pages/order/myOrder/list?orderType=0"
          })
        }))
      }
    })
  }
});
Array || (t.resolveComponent("price") + t.resolveComponent("uni-countdown") + t.resolveComponent("pay-pass-input") + t.resolveComponent("confirm-modal"))();
Math;
var l = t._export_sfc(p, [
  ["render", function(r, n, a, o, i, s) {
    return t.e({
      a: 1 == r.payMethod || 2 == r.payMethod
    }, 1 == r.payMethod || 2 == r.payMethod ? {
      b: t.p({
        type: "order",
        className: "order-pay-price red",
        price: r.totalFee
      })
    } : {}, {
      c: 8 == r.payMethod
    }, 8 == r.payMethod ? {
      d: t.p({
        type: "order",
        className: "order-pay-price",
        price: r.surplusPay,
        hideTip: !1
      })
    } : {}, {
      e: t.o(r.handleTimeup),
      f: t.p(e(e(e(e({
        color: "#999999"
      }, "show-day", !1), "hour", r.countDounObj.hours), "minute", r.countDounObj.minutes), "second", r.countDounObj.seconds)),
      g: t.f(r.payMethodList, (function(e, n, a) {
        return t.e({
          a: 1 == e.id
        }, 1 == e.id ? {
          b: r.$static + "/static/image/mine/weixin@2x.png",
          c: t.t(e.name)
        } : {}, {
          d: 8 == e.id
        }, 8 == e.id ? {
          e: r.$static + "/static/image/mine/intergral@2x.png",
          f: t.t(e.name),
          g: t.t(r.surplus)
        } : {}, {
          h: e.checked
        }, e.checked ? {
          i: r.$static + "/static/image/myOrder/icon_pay_checked.png"
        } : {}, {
          j: n,
          k: e.checked ? 1 : "",
          l: t.o((function(n) {
            return r.handleChangePayMethod(e)
          }))
        })
      })),
      h: t.o((function() {
        return r.debouncePay && r.debouncePay.apply(r, arguments)
      })),
      i: r.countDounTimeup,
      j: t.sr("payPopupRef", "0b2d942a-3"),
      k: t.o(r.changePayPopupShowFlag),
      l: t.p({
        paramsObj: r.paramsObj
      }),
      m: r.payPopupShowFlag,
      n: t.sr("confirmModalRef", "0b2d942a-4"),
      o: t.sr("confirmRef", "0b2d942a-5")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/pay.vue"]
]);
wx.createPage(l);