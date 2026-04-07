var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  t = require("../../../apis/order.js"),
  o = require("../../../utils/rsa.js"),
  i = require("../../../utils/uniUtil.js"),
  c = require("../../../common/common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/user.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js"), require("../../../utils/commonEnum.js");
var u = {
  name: "payPassInput",
  props: {
    paramsObj: {
      type: Object,
      default: {}
    }
  },
  components: {
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    }
  },
  setup: function(u, s) {
    var l = s.emit,
      d = a.ref(),
      p = a.reactive({
        orderIds: "",
        length: 6,
        code_val: "",
        is_focus: !0,
        timer: "",
        disabledFlag: !0,
        popupPayFlag: !1
      }),
      m = !1;
    a.onLoad((function(e) {
      p.orderIds = JSON.parse(e.params).orderIds
    }));
    var f = function() {
        var e = n(r().mark((function e(n) {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                console.log(n.detail.value), p.code_val = n.detail.value, 6 == p.code_val.length && (p.disabledFlag = !1, a.index.hideKeyboard());
              case 3:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function(r) {
          return e.apply(this, arguments)
        }
      }(),
      v = function() {
        p.popupPayFlag = !1, l("changePayPopupShowFlag", !1)
      },
      g = function() {
        var e = n(r().mark((function e() {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, o.getRsaCode(p.code_val);
              case 2:
                u.paramsObj.paymentPassword = e.sent, a.index.showLoading({
                  title: "请稍等",
                  mask: !0
                }), t.apiOrderPay(u.paramsObj).then((function(e) {
                  if (200 == e.code) {
                    m = !0;
                    var o = 0;
                    p.timer = setInterval(n(r().mark((function e() {
                      var n, c;
                      return r().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return e.next = 2, t.apiQueryPayState(u.paramsObj);
                          case 2:
                            if (n = e.sent, c = n.data, o += 1, 2 != c) {
                              e.next = 14;
                              break
                            }
                            return a.index.hideLoading(), clearInterval(p.timer), p.timer = null, v(), e.next = 12, i.uniUtil.subscribeMessage({
                              tmplIds: ["TqQnBBDcyJv_u1jtiqehMap3FIy9P86iZcl4MFJd0nA", "5_FvSfmlkEi5aJu-POgq6W81ZweLAAy8h2BcY556cHk"]
                            }).then((function() {
                              a.index.redirectTo({
                                url: "/pages/order/myOrder/payResult?&orderIds=".concat(p.orderIds)
                              })
                            })).catch((function() {
                              a.index.redirectTo({
                                url: "/pages/order/myOrder/payResult?&orderIds=".concat(p.orderIds)
                              })
                            }));
                          case 12:
                            e.next = 15;
                            break;
                          case 14:
                            o > 10 && (a.index.hideLoading(), d.value.confirm({
                              title: "",
                              message: "支付查询超时，请到个人中心查看",
                              confirmButtonText: "确定",
                              cancelButtonText: ""
                            }), a.index.redirectTo({
                              url: "/pages/order/myOrder/payResultFail?orderIds=".concat(p.orderIds)
                            }), clearInterval(p.timer), p.timer = null, o = 0);
                          case 15:
                          case "end":
                            return e.stop()
                        }
                      }), e)
                    }))), 1e3)
                  } else a.index.hideLoading();
                  500 == e.data.code && e.data.message.includes("密码已输入错误6次") && d.value.confirm({
                    title: "",
                    message: e.data.message,
                    confirmButtonText: "忘记密码",
                    cancelButtonText: "取消"
                  })
                })).catch((function() {
                  setTimeout((function() {
                    a.index.hideLoading()
                  }), 500)
                }));
              case 5:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return a.onUnload((function() {
      clearInterval(p.timer)
    })), a.onHide((function() {
      clearInterval(p.timer), p.timer = null
    })), e(e({}, a.toRefs(p)), {}, {
      confirmModalRef: d,
      handleOpen: function() {
        p.popupPayFlag = !0, p.code_val = ""
      },
      handleClose: v,
      handleToPay: g,
      debouncePay: function() {
        c.debounce(g(), 200)
      },
      getPassWordValue: f,
      onCode: function(e) {
        p.is_focus = !0
      },
      delValue: function(e) {
        p.is_focus = !1
      },
      getHasPay: function() {
        return m
      }
    })
  }
};
Array || (a.resolveComponent("uni-icons") + a.resolveComponent("confirm-modal"))();
Math;
var s = a._export_sfc(u, [
  ["render", function(e, r, n, t, o, i) {
    return a.e({
      a: e.popupPayFlag
    }, e.popupPayFlag ? {
      b: a.o(t.handleClose),
      c: a.p({
        type: "closeempty",
        color: "#666"
      }),
      d: a.t(n.paramsObj.totalFee),
      e: a.f(e.code_val.length, (function(e, r, n) {
        return {
          a: e
        }
      })),
      f: a.f(e.length, (function(r, n, t) {
        return {
          a: n,
          b: e.code_val.length >= n + 1 ? e.code_val[n] : "",
          c: a.n({
            active: e.code_val.length === n
          })
        }
      })),
      g: a.o((function() {
        return t.onCode && t.onCode.apply(t, arguments)
      })),
      h: a.o([function(r) {
        return e.code_val = r.detail.value
      }, function() {
        return t.getPassWordValue && t.getPassWordValue.apply(t, arguments)
      }]),
      i: a.o((function() {
        return t.delValue && t.delValue.apply(t, arguments)
      })),
      j: e.length,
      k: e.is_focus,
      l: e.code_val,
      m: e.disabledFlag,
      n: a.o((function() {
        return t.debouncePay && t.debouncePay.apply(t, arguments)
      })),
      o: a.sr("confirmModalRef", "05cfccb5-1")
    } : {})
  }],
  ["__scopeId", "data-v-05cfccb5"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/payPassInput.vue"]
]);
wx.createComponent(s);