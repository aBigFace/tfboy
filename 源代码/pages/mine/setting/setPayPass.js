var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  s = require("../../../apis/user.js"),
  t = require("../../../utils/uniUtil.js"),
  o = require("../../../utils/rsa.js"),
  c = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var i = n.defineComponent({
  components: {
    customPassInput: function() {
      return "../../../components/customPassInput/customPassInput.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    }
  },
  name: "resetMobile",
  setup: function() {
    var i = n.ref(),
      d = n.reactive({
        payPassword: "",
        ackPayPassword: "",
        oldPayPassword: "",
        canRepeat: !1,
        changePasswordFlag: !1,
        changeTipe: !1,
        passwordSet: "",
        checkMethod: "",
        fromPage: ""
      });
    n.onLoad((function(e) {
      d.passwordSet = n.index.getStorageSync("userInfo").passwordSet, d.checkMethod = e.checkMethod || "", d.fromPage = e.fromPage || "", d.changeTipe = e.changeTipe || !1, n.index.enableAlertBeforeUnload({
        message: "您要放弃修改支付密吗？",
        success: function(e) {},
        fail: function(e) {},
        complete: function() {}
      })
    }));
    var u = function() {
        var e = r(a().mark((function e() {
          var r, n, c;
          return a().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, o.getRsaCode(d.payPassword);
              case 2:
                return r = e.sent, e.t0 = r, e.next = 6, o.getRsaCode(d.ackPayPassword);
              case 6:
                return e.t1 = e.sent, n = {
                  payPassword: e.t0,
                  ackPayPassword: e.t1
                }, e.next = 10, s.apiValidPayPwd(n);
              case 10:
                c = e.sent, c.data ? (d.oldPayPassword = r, d.changePasswordFlag = !0) : t.uniUtil.showToast("密码验证失败");
              case 13:
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
        var e = r(a().mark((function e() {
          var u, p, m, l, f, P, h, g, w, y, k, v, b, R, x, C;
          return a().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (d.payPassword === d.ackPayPassword) {
                  e.next = 2;
                  break
                }
                return e.abrupt("return", i.value.confirm({
                  title: "两次输入密码不一致",
                  message: "请重新设置",
                  confirmButtonText: "",
                  cancelButtonText: "确认"
                }));
              case 2:
                return e.next = 4, o.getRsaCode(d.payPassword);
              case 4:
                return u = e.sent, e.next = 7, o.getRsaCode(d.ackPayPassword);
              case 7:
                p = e.sent, m = {}, "remember" === d.checkMethod ? m = {
                  checkType: 1,
                  ackPayPassword: p,
                  payPassword: u,
                  oldPayPassword: d.oldPayPassword
                } : d.checkMethod ? (l = getCurrentPages(), f = l[l.length - 1].options, P = f.name, h = void 0 === P ? "" : P, g = f.type, w = void 0 === g ? "" : g, y = f.codeNum, k = void 0 === y ? "" : y, v = f.validCode, b = void 0 === v ? "" : v, R = "noRememberPhone" === d.checkMethod ? 1 : 2, x = n.index.getStorageSync("userInfo"), C = 1 === R ? x.phone : x.email, m = {
                  checkType: 2,
                  ackPayPassword: p,
                  payPassword: u,
                  identityDTO: {
                    cardCode: k,
                    idCardType: w,
                    realName: decodeURIComponent(h)
                  },
                  validCodeDTO: {
                    code: C,
                    type: R,
                    validCode: b,
                    validType: c.EValidType.rebind
                  }
                }) : m = {
                  checkType: 3,
                  ackPayPassword: p,
                  payPassword: u
                }, s.apiPayPwdSet(m).then(function() {
                  var e = r(a().mark((function e(r) {
                    var o, c;
                    return a().wrap((function(e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          if (500 != r.data.code) {
                            e.next = 3;
                            break
                          }
                          return t.uniUtil.showToast(null == (o = r.data) ? void 0 : o.message), e.abrupt("return");
                        case 3:
                          return t.uniUtil.showToast("修改成功", {
                            icon: "success"
                          }), e.next = 6, s.apiGetUserInfo();
                        case 6:
                          c = e.sent, n.index.setStorageSync("userInfo", c.data), n.index.disableAlertBeforeUnload(), "pay" == d.fromPage ? n.index.navigateBack() : "setting" == d.fromPage && n.index.switchTab({
                            url: "/pages/mine/mine"
                          });
                        case 10:
                        case "end":
                          return e.stop()
                      }
                    }), e)
                  })));
                  return function(a) {
                    return e.apply(this, arguments)
                  }
                }());
              case 11:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, n.toRefs(d)), {}, {
      confirmModalRef: i,
      setPassWordValue: function(e) {
        d.payPassword = e, d.canRepeat = !0, d.changePasswordFlag = !0
      },
      checkingConfirm: u,
      setPassWordValueConfirm: function(e) {
        d.ackPayPassword = e
      },
      checkingPassWordValue: function(e) {
        d.payPassword = e
      },
      handleConfirm: p
    })
  }
});
Array || (n.resolveComponent("custom-pass-input") + n.resolveComponent("confirm-modal"))();
var d = n._export_sfc(i, [
  ["render", function(e, a, r, s, t, o) {
    return n.e({
      a: n.t(!e.changePasswordFlag && e.passwordSet && "remember" == e.checkMethod ? "验证支付密码" : e.canRepeat ? "重复支付密码" : "".concat(e.changePasswordFlag || e.changeTipe ? "修改支付密码" : "设置支付密码")),
      b: n.t(e.changePasswordFlag || !e.passwordSet || e.changeTipe ? "请设置小葵花支付密码，用于支付验证" : "请输入当前小葵花支付密码，验证身份"),
      c: !e.changePasswordFlag && e.passwordSet && "remember" == e.checkMethod
    }, !e.changePasswordFlag && e.passwordSet && "remember" == e.checkMethod ? {
      d: n.sr("customPassInputRef", "650b009e-0"),
      e: n.o(e.checkingPassWordValue),
      f: n.p({
        passwordSet: e.passwordSet
      }),
      g: n.o((function() {
        return e.checkingConfirm && e.checkingConfirm.apply(e, arguments)
      }))
    } : n.e({
      h: !e.canRepeat
    }, e.canRepeat ? {} : {
      i: n.sr("customPassInputRef", "650b009e-1"),
      j: n.o(e.setPassWordValue),
      k: n.p({
        canRepeat: e.canRepeat
      })
    }, {
      l: e.canRepeat
    }, e.canRepeat ? {
      m: n.sr("customPassInputRef", "650b009e-2"),
      n: n.o(e.setPassWordValueConfirm),
      o: n.p({
        canRepeat: e.canRepeat
      })
    } : {}, {
      p: e.canRepeat
    }, e.canRepeat ? {
      q: n.o((function() {
        return e.handleConfirm && e.handleConfirm.apply(e, arguments)
      }))
    } : {}), {
      r: n.sr("confirmModalRef", "650b009e-3")
    })
  }],
  ["__scopeId", "data-v-650b009e"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/setPayPass.vue"]
]);
wx.createPage(d);