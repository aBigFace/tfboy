require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  a = require("../../../apis/user.js"),
  i = require("../../../apis/order.js"),
  r = require("../../../utils/uniUtil.js"),
  c = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var l = t.defineComponent({
  name: "msgCode",
  setup: function() {
    var l = t.ref(),
      d = t.ref(),
      s = t.reactive({
        length: 6,
        code_val: "",
        is_focus: !0,
        times: 60,
        phone: "",
        email: "",
        timer: 0,
        validType: 0,
        checkMethod: "",
        routeType: "",
        codeType: 1,
        formPage: "",
        postAgeParams: {
          receiver: "",
          receiverAddress: "",
          receiverCity: "",
          receiverCounty: "",
          receiverPhone: "",
          receiverProvince: "",
          receiverStreet: "",
          id: 0,
          orderSource: 3,
          validCode: ""
        }
      });
    t.onLoad((function(e) {
      s.validType = Number(e.validType), s.checkMethod = e.checkMethod, s.routeType = e.route, s.codeType = e.codeType, s.phone = t.index.getStorageSync("userInfo").phone, s.email = t.index.getStorageSync("userInfo").email, "postAgeCertifyParent" === e.checkMethod && (s.postAgeParams = JSON.parse(e.postAgeParams)), e.fromPage && (s.formPage = e.fromPage), s.validType === c.EValidType.guardian ? (s.phone = t.index.getStorageSync("userInfo").infoOther.guardianPhone, s.times = 0, h()) : p()
    })), t.onShow((function() {
      t.index.setNavigationBarTitle({
        title: 2 == s.codeType ? "输入邮箱验证码" : "输入短信验证码"
      })
    })), t.onUnload((function() {
      clearInterval(s.timer)
    }));
    var u = function() {
        var e = o(n().mark((function e() {
          var o, l, d, u, p, h, m, g, f, v, y, b, T, k, P, x, C;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (!(s.code_val.length >= 6)) {
                  e.next = 44;
                  break
                }
                if ("checkParentPhone" !== s.checkMethod) {
                  e.next = 6;
                  break
                }
                t.index.setStorageSync("parentAuthByBuy", s.code_val), setTimeout((function() {
                  t.index.navigateBack()
                }), 1e3), e.next = 44;
                break;
              case 6:
                if ("postAgeCertifyParent" !== s.checkMethod) {
                  e.next = 11;
                  break
                }
                s.postAgeParams.validCode = s.code_val, i.apiCreatePostOrderDiff(s.postAgeParams).then((function(e) {
                  if (200 === e.code) {
                    var n = {
                      orderIds: e.data.orderIds,
                      isComeNoPay: 0
                    };
                    t.index.redirectTo({
                      url: "/pages/order/myOrder/pay?params=".concat(JSON.stringify(n))
                    })
                  } else t.index.showToast({
                    title: "请稍后再试",
                    icon: "none"
                  })
                })).catch((function(e) {
                  t.index.showToast({
                    title: "请稍后再试",
                    icon: "none"
                  })
                })), e.next = 44;
                break;
              case 11:
                if (o = getCurrentPages(), l = o[o.length - 1].options, d = l.name, u = void 0 === d ? "" : d, p = l.type, h = void 0 === p ? "" : p, m = l.codeNum, g = void 0 === m ? "" : m, f = l.codeType, v = void 0 === f ? "" : f, y = l.tel, b = void 0 === y ? "" : y, s.validType !== c.EValidType.rebind) {
                  e.next = 18;
                  break
                }
                "noRememberPhone" == s.checkMethod || "noRememberEmail" == s.checkMethod ? t.index.redirectTo({
                  url: "/pages/mine/setting/setPayPass?pageTip=notCheck&checkMethod=".concat(s.checkMethod, "&fromPage=setting&changeTipe=true&validCode=").concat(s.code_val, "&name=").concat(u, "&type=").concat(h, "&codeNum=").concat(g)
                }) : (r.uniUtil.showToast("修改成功", {
                  icon: "success"
                }), t.index.redirectTo({
                  url: "/pages/mine/setting/setPayPass?pageTip=notCheck&checkMethod=".concat(s.checkMethod, "&fromPage=setting&validCode=").concat(s.code_val, "&name=").concat(u, "&type=").concat(h, "&codeNum=").concat(g)
                })), e.next = 44;
                break;
              case 18:
                if (s.validType !== c.EValidType.cancel) {
                  e.next = 26;
                  break
                }
                return T = {
                  validCode: s.code_val,
                  type: v,
                  code: b
                }, e.next = 22, a.apiUserCancel(T);
              case 22:
                200 === (k = e.sent).code ? (r.uniUtil.showToast("注销成功"), t.index.removeStorageSync("token"), t.index.removeStorageSync("userInfo"), t.index.switchTab({
                  url: "/pages/mine/mine"
                })) : r.uniUtil.showToast(k.message), e.next = 44;
                break;
              case 26:
                if (s.validType !== c.EValidType.beforeChangeTelEmail) {
                  e.next = 30;
                  break
                }
                "changeRememberPhone" == s.checkMethod ? (P = {
                  type: 1,
                  code: s.phone,
                  validType: c.EValidType.beforeChangeTelEmail,
                  validCode: s.code_val
                }, a.apiBeforeBind(P).then((function(e) {
                  e.data && t.index.redirectTo({
                    url: "/pages/mine/setting/resetMobile?validType=".concat(c.EValidType.changeTelEmail, "&validCode=").concat(s.code_val, "&tel=").concat(b)
                  })
                }))) : "changeRememberEmail" == s.checkMethod && (x = {
                  type: 2,
                  code: s.email,
                  validType: c.EValidType.beforeChangeTelEmail,
                  validCode: s.code_val
                }, a.apiBeforeBind(x).then((function(e) {
                  e.data && t.index.redirectTo({
                    url: "/pages/mine/setting/emailSetting?validType=".concat(c.EValidType.changeTelEmail, "&validCode=").concat(s.code_val, "&checkMethod=").concat(s.checkMethod)
                  })
                }))), e.next = 44;
                break;
              case 30:
                return C = {
                  type: ["noRememberPhone", "changeRememberPhone", "loginAccount"].includes(s.checkMethod) ? 1 : 2,
                  validType: s.validType,
                  validCode: s.code_val,
                  code: ["noRememberPhone", "changeRememberPhone", "loginAccount"].includes(s.checkMethod) ? s.phone : s.email
                }, e.next = 33, a.apiAuthValid(C);
              case 33:
                if (200 !== e.sent.code) {
                  e.next = 44;
                  break
                }
                if (s.validType !== c.EValidType.guardian) {
                  e.next = 41;
                  break
                }
                if ("changeRememberPhone" != s.checkMethod && "noRememberPhone" != s.checkMethod) {
                  e.next = 39;
                  break
                }
                return t.index.redirectTo({
                  url: "/pages/mine/setting/resetParentMobile?validType=".concat(s.validType)
                }), e.abrupt("return", null);
              case 39:
                e.next = 44;
                break;
              case 41:
                if ("noRememberEmail" != s.checkMethod) {
                  e.next = 44;
                  break
                }
                return t.index.redirectTo({
                  url: "/pages/mine/setting/emailSetting?validType=".concat(c.EValidType.changeTelEmail)
                }), e.abrupt("return");
              case 44:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      p = function() {
        s.times = 59, s.timer = setInterval((function() {
          s.times--, s.times <= 0 && clearInterval(s.timer)
        }), 1e3)
      },
      h = function() {
        var e = o(n().mark((function e() {
          var o;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (0 !== s.times) {
                  e.next = 6;
                  break
                }
                return o = {
                  type: ["noRememberPhone", "changeRememberPhone", "loginAccount", "postAgeCertifyParent", "checkParentPhone"].includes(s.checkMethod) ? 1 : 2,
                  validType: s.validType,
                  code: ["noRememberPhone", "changeRememberPhone", "loginAccount", "postAgeCertifyParent", "checkParentPhone"].includes(s.checkMethod) ? s.phone : s.email
                }, e.next = 4, a.apiSendCode(o);
              case 4:
                t.index.showToast({
                  title: "验证码发送成功"
                }), p();
              case 6:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      m = t.computed$1((function() {
        return 6 == s.code_val.length
      }));
    return e(e({}, t.toRefs(s)), {}, {
      popupRef: l,
      failPopupRef: d,
      handleConfirm: u,
      getValue: function(e) {
        s.code_val = e.detail.value
      },
      delValue: function(e) {
        s.is_focus = !1
      },
      onCode: function(e) {
        s.is_focus = !0
      },
      sendCode: h,
      countDown: p,
      canSubmit: m,
      handleClose: function() {
        l.value.close()
      },
      backLogin: function() {
        l.value.close(), t.index.navigateTo({
          url: "/pages/login/login"
        })
      },
      handleFileClose: function() {
        d.value.close()
      },
      logoutAccount: function() {
        a.apiLogoutAccount().then((function(e) {
          200 == e.code ? (l.value.open(), r.uniUtil.showToast("注销成功"), t.index.removeStorageSync("token"), t.index.removeStorageSync("userInfo")) : d.value.open()
        }))
      }
    })
  }
});
Array || (t.resolveComponent("uni-icons") + t.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var d = t._export_sfc(l, [
  ["render", function(e, n, o, a, i, r) {
    return t.e({
      a: ["noRememberPhone", "changeRememberPhone", "postAgeCertifyParent", "checkParentPhone"].includes(e.checkMethod)
    }, ["noRememberPhone", "changeRememberPhone", "postAgeCertifyParent", "checkParentPhone"].includes(e.checkMethod) ? {
      b: t.t(e.$filters.encryptPhone(e.phone))
    } : {}, {
      c: ["noRememberEmail", "changeRememberEmail"].includes(e.checkMethod)
    }, ["noRememberEmail", "changeRememberEmail"].includes(e.checkMethod) ? {
      d: t.t(e.$filters.encryptEmail(e.email))
    } : {}, {
      e: t.f(e.length, (function(n, o, a) {
        return {
          a: o,
          b: e.code_val.length >= o + 1 ? e.code_val[o] : "",
          c: t.n({
            active: e.code_val.length === o
          })
        }
      })),
      f: t.o((function() {
        return e.onCode && e.onCode.apply(e, arguments)
      })),
      g: t.t(0 === e.times ? "发送验证码" : "".concat(e.times, "s后发送")),
      h: t.o((function() {
        return e.sendCode && e.sendCode.apply(e, arguments)
      })),
      i: t.o([function(n) {
        return e.code_val = n.detail.value
      }, function() {
        return e.getValue && e.getValue.apply(e, arguments)
      }]),
      j: t.o((function() {
        return e.delValue && e.delValue.apply(e, arguments)
      })),
      k: e.length,
      l: e.is_focus,
      m: e.code_val,
      n: t.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      })),
      o: e.$static + "/static/image/mine/logout-success.png",
      p: t.o(e.handleClose),
      q: t.p({
        type: "closeempty",
        color: "#666"
      }),
      r: t.o((function() {
        return e.backLogin && e.backLogin.apply(e, arguments)
      })),
      s: t.sr("popupRef", "02f13797-0"),
      t: t.p({
        type: "center"
      }),
      v: e.$static + "/static/image/mine/logout-fail.png",
      w: t.o((function() {
        return e.handleFileClose && e.handleFileClose.apply(e, arguments)
      })),
      x: t.sr("failPopupRef", "02f13797-2"),
      y: t.p({
        type: "center"
      })
    })
  }],
  ["__scopeId", "data-v-02f13797"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/msgCode.vue"]
]);
wx.createPage(d);