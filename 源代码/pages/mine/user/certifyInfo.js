var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../@babel/runtime/helpers/slicedToArray"),
  a = require("../../../common/vendor.js"),
  t = require("../../../utils/util.js"),
  s = require("../../../utils/commonEnum.js"),
  u = require("../../../apis/user.js"),
  d = require("../../../common/common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js");
var l = a.defineComponent({
  name: "certifyInfo",
  methods: {
    openArguments: t.openArguments
  },
  setup: function() {
    var e = a.reactive({
      canCommit: !0,
      idNum: "",
      certifyType: 1,
      vipId: "",
      realName: "",
      certifyTypeList: [{
        label: "中国居民身份证",
        type: 1
      }, {
        label: "护照号",
        type: 2
      }, {
        label: "港澳台&外国人-通行证/居住证/居留证",
        type: 3
      }],
      agree: !1,
      idCardType: "",
      isPick: !1,
      tipStr: "请填写您的身份证号码",
      userInfo: {
        realName: "",
        nickName: "",
        idCard: "",
        headPortrait: "",
        idCardType: 0,
        hmPasser: "",
        phone: "",
        passport: "",
        infoOther: {
          guardianIdCard: "",
          guardianUser: "",
          guardianPhone: ""
        },
        auth: 0,
        isAbnormal: 0,
        authMsg: "",
        abnormalMsgV3: "",
        email: ""
      },
      backChangePayPassword: !1,
      setInterval: null,
      logicLock: !1,
      isAllowed: !1,
      allowedMsg: "",
      isDoModify: !1,
      viewPhone: "",
      codeNum: "",
      viewLogicLock: !1,
      isSendMsg: !1,
      realNameStr: "",
      guardianUserStr: "",
      guardianIdCardStr: "",
      guardianPhoneStr: "",
      idCardStr: "",
      isViewAll: !1,
      age: 16,
      repeatMsg: "",
      modifyPhone: "",
      modifyLogicLock: !1,
      codeNumModify: "",
      isModifySendMsg: !1,
      modifyTitle: "手机号",
      viewEmail: ""
    });
    a.watch((function() {
      return [e.realName, e.idNum, e.agree]
    }), (function(n) {
      var i = r(n, 3),
        o = i[0],
        a = i[1],
        t = i[2];
      console.log(o, a, t), e.canCommit = !(o && a && t)
    }));
    var l = a.ref();
    a.onLoad((function(n) {
      n.backChangePayPassword && (e.backChangePayPassword = n.backChangePayPassword)
    }));
    var c = a.computed$1((function() {
        var n = "";
        return e.certifyTypeList.forEach((function(i) {
          i.type === e.userInfo.idCardType && (n = i.label)
        })), n
      })),
      f = function() {
        var n = "",
          i = e.userInfo.idCardType;
        return 1 === i ? n = t.idCardEncrypt(e.userInfo.idCard) : 2 === i ? n = t.passportHmEncrypt(e.userInfo.passport) : 3 === i && (n = t.passportHmEncrypt(e.userInfo.hmPasser)), n
      },
      p = function() {
        var n = "",
          i = e.userInfo.idCardType;
        return 1 === i ? n = e.userInfo.idCard : 2 === i ? n = e.userInfo.passport : 3 === i && (n = e.userInfo.hmPasser), n
      },
      m = a.computed$1((function() {
        return function(e) {
          return t.EncryptName(e)
        }
      })),
      y = a.computed$1((function() {
        var n = "";
        return e.certifyTypeList.forEach((function(i) {
          i.type === e.certifyType && (n = i.label)
        })), n
      }));
    a.onShow((function() {
      h(), w()
    }));
    var h = function() {
        var n, i, o, r, s, u, d, l = a.index.getStorageSync("userInfo");
        e.userInfo = l, e.viewPhone = t.EncryptPhone(e.userInfo.phone), e.viewEmail = t.EncryptEmail(e.userInfo.email), e.realNameStr = t.EncryptName((null == (n = e.userInfo) ? void 0 : n.realName) || ""), e.guardianUserStr = t.EncryptName((null == (o = null == (i = e.userInfo) ? void 0 : i.infoOther) ? void 0 : o.guardianUser) || ""), e.guardianIdCardStr = t.idCardEncrypt(null == (s = null == (r = e.userInfo) ? void 0 : r.infoOther) ? void 0 : s.guardianIdCard), e.guardianPhoneStr = t.EncryptPhone(null == (d = null == (u = e.userInfo) ? void 0 : u.infoOther) ? void 0 : d.guardianPhone), e.idCardStr = f(), 1 == e.userInfo.idCardType ? e.age = parseInt(t.analyzeIDCardToAge(e.userInfo.idCard || "")) : e.age = 0
      },
      g = function() {
        if (E(), t.isEmpty(e.realName) || t.isEmpty(e.idNum) || t.isEmpty(e.agree)) a.index.showToast({
          title: "请输入正确信息",
          icon: "error",
          duration: 500
        });
        else {
          var n = e.certifyType,
            r = {
              memberId: "",
              realName: e.realName,
              certificateType: n,
              certificateCode: e.idNum
            };
          1 == e.certifyType && 11 < parseInt(t.analyzeIDCardToAge(e.idNum)) && parseInt(t.analyzeIDCardToAge(e.idNum)) < 16 ? a.index.redirectTo({
            url: "/pages/mine/user/certifyParent?name=".concat(e.realName, "&type=").concat(n, "&code=").concat(e.idNum, "&phone=").concat(e.userInfo.phone)
          }) : u.apiRealName(r).then((function(r) {
            var s;
            200 == r.code && r.data && (w(), a.index.showToast({
              title: "认证成功",
              success: (s = o(i().mark((function o() {
                var r, s, d, l, c, p, m, y, h;
                return i().wrap((function(i) {
                  for (;;) switch (i.prev = i.next) {
                    case 0:
                      (y = e.userInfo).idCardType = n, y.realName = e.realName, i.t0 = n, i.next = 1 === i.t0 ? 6 : 2 === i.t0 ? 8 : 3 === i.t0 ? 10 : 12;
                      break;
                    case 6:
                      return y.idCard = e.idNum, i.abrupt("break", 12);
                    case 8:
                      return y.passport = e.idNum, i.abrupt("break", 12);
                    case 10:
                      return y.hmPasser = e.idNum, i.abrupt("break", 12);
                    case 12:
                      return y.idCardType = n, i.next = 15, u.apiGetUserInfo();
                    case 15:
                      h = i.sent, y.isAbnormal = h.data.isAbnormal, y.abnormalMsgV3 = h.data.abnormalMsgV3, y.auth = 1, a.index.setStorageSync("userInfo", y), a.index.setStorageSync("chkParentAuth ", 1), e.isDoModify = !1, e.isViewAll = !1, e.viewPhone = t.EncryptPhone(e.userInfo.phone), e.viewEmail = t.EncryptEmail(e.userInfo.email), e.realNameStr = t.EncryptName((null == (r = e.userInfo) ? void 0 : r.realName) || ""), e.guardianUserStr = t.EncryptName((null == (d = null == (s = e.userInfo) ? void 0 : s.infoOther) ? void 0 : d.guardianUser) || ""), e.guardianIdCardStr = t.idCardEncrypt(null == (c = null == (l = e.userInfo) ? void 0 : l.infoOther) ? void 0 : c.guardianIdCard), e.guardianPhoneStr = t.EncryptPhone(null == (m = null == (p = e.userInfo) ? void 0 : p.infoOther) ? void 0 : m.guardianPhone), e.idCardStr = f(), 1 == y.idCardType ? e.age = parseInt(t.analyzeIDCardToAge(y.idCard || "")) : e.age = 0, e.backChangePayPassword && a.index.navigateBack();
                    case 32:
                    case "end":
                      return i.stop()
                  }
                }), o)
              }))), function() {
                return s.apply(this, arguments)
              }),
              icon: "success",
              duration: 800
            }))
          }))
        }
      },
      v = a.ref(),
      I = function() {
        v.value.close()
      },
      C = a.ref(5);
    a.watch(C, (function(n, i) {
      0 === n && (e.logicLock = !0, clearInterval(e.setInterval), e.setInterval = null)
    })), a.onBeforeUnmount((function() {
      e.setInterval && (clearInterval(e.setInterval), e.setInterval = null)
    }));
    var M = function() {
        C.value = 5, e.setInterval = setInterval((function() {
          C.value -= 1
        }), 1e3)
      },
      w = function() {
        u.apiIsAllowedAuth().then((function(n) {
          200 == n.code && (e.isAllowed = n.data.allowed, e.allowedMsg = n.data.msg)
        }))
      },
      b = a.ref(),
      S = function() {
        b.value.open()
      },
      P = a.ref(60);
    a.watch(P, (function(n, i) {
      0 === n && (e.viewLogicLock = !1, clearInterval(e.setInterval), e.setInterval = null)
    }));
    var N = function() {
        var n = o(i().mark((function n() {
          return i().wrap((function(n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                d.debounce((function() {
                  var n = {
                    type: 1,
                    validType: 13,
                    code: e.userInfo.phone
                  };
                  u.apiSendCode(n).then((function(n) {
                    200 === n.code && (a.index.showToast({
                      title: "发送验证码成功"
                    }), e.viewLogicLock = !0, P.value = 60, e.setInterval = setInterval((function() {
                      P.value -= 1
                    }), 1e3))
                  }))
                }), 1e3);
              case 1:
              case "end":
                return n.stop()
            }
          }), n)
        })));
        return function() {
          return n.apply(this, arguments)
        }
      }(),
      k = a.ref(60);
    a.watch(k, (function(n, i) {
      0 === n && (e.modifyLogicLock = !1, clearInterval(e.setInterval), e.setInterval = null)
    }));
    var T = function() {
        var n = o(i().mark((function n() {
          return i().wrap((function(n) {
            for (;;) switch (n.prev = n.next) {
              case 0:
                d.debounce((function() {
                  var n = 1,
                    i = "";
                  if (t.isEmpty(e.userInfo.phone)) {
                    if (t.isEmpty(e.userInfo.email)) return a.index.showToast({
                      title: "请输入正确的电话号码或者邮箱"
                    }), !1;
                    n = 2, i = e.userInfo.email
                  } else n = 1, i = e.userInfo.phone;
                  var o = {
                    type: n,
                    validType: 14,
                    code: i
                  };
                  u.apiSendCode(o).then((function(n) {
                    200 === n.code && (a.index.showToast({
                      title: "发送验证码成功"
                    }), e.modifyLogicLock = !0, k.value = 60, e.setInterval = setInterval((function() {
                      k.value -= 1
                    }), 1e3))
                  }))
                }), 1e3);
              case 1:
              case "end":
                return n.stop()
            }
          }), n)
        })));
        return function() {
          return n.apply(this, arguments)
        }
      }(),
      A = a.ref(),
      x = function() {
        A.value.open()
      },
      E = function() {
        A.value.close()
      };
    return n(n({}, a.toRefs(e)), {}, {
      changeCertifyType: function(n) {
        e.certifyType = parseInt(n.detail.value)
      },
      handleAgree: function() {
        e.agree = !e.agree
      },
      handleSubmit: g,
      goToCertifyParent: function() {
        a.index.navigateTo({
          url: "/pages/mine/setting/changeMobile?checkMethod=changeRememberPhone&validType=".concat(s.EValidType.guardian)
        })
      },
      isAuthentication: t.isAuthentication,
      showDialog: function() {
        l.value.open("bottom")
      },
      idCardTypeStr: c,
      certifyText: y,
      closePopup: function() {
        l.value.close()
      },
      realNameEncrypt: m,
      popup: l,
      handlePick: function() {
        e.isPick = !e.isPick
      },
      handlePickerType: function(n) {
        switch (e.certifyType = n, n) {
          case 1:
            e.tipStr = "请填写您的身份证号码";
            break;
          case 2:
            e.tipStr = "请填写您的护照号码";
            break;
          case 3:
            e.tipStr = "请填写您的港澳台&外国人-通行证/居住证/居留证号码";
            break;
          default:
            e.tipStr = "请填写您的身份证号码"
        }
      },
      realConfirmDialogRef: v,
      realConfirmDialogOpen: function() {
        t.isEmpty(e.realName) || t.isEmpty(e.idNum) || t.isEmpty(e.agree) ? a.index.showToast({
          title: "请输入正确信息",
          icon: "error",
          duration: 500
        }) : (v.value.open(), e.logicLock = !1, M())
      },
      realConfirmDialogClose: I,
      countdownNumber: C,
      getIsAllowedAuth: w,
      noHasPhoneRef: b,
      noHasPhoneRefOpen: S,
      noHasPhoneRefClose: function() {
        b.value.close()
      },
      doViewAll: function() {
        "" == e.userInfo.phone || null == e.userInfo.phone || null == e.userInfo.phone ? S() : (e.isSendMsg = !0, e.codeNum = "")
      },
      countdownNumberView: P,
      sendCode: N,
      doAuthViewMsg: function() {
        e.codeNum || a.index.showToast({
          title: "请输入验证码。",
          icon: "error"
        });
        var n = {
          phone: e.userInfo.phone,
          validCode: e.codeNum
        };
        u.apiAuthViewMsgValid(n).then((function(n) {
          var i, o, r, t, s, u, d;
          200 === n.code && n.data && (a.index.showToast({
            title: "验证成功。"
          }), e.isSendMsg = !1, e.isViewAll = !0, e.realNameStr = (null == (i = e.userInfo) ? void 0 : i.realName) || "", e.idCardStr = p(), e.guardianUserStr = (null == (r = null == (o = e.userInfo) ? void 0 : o.infoOther) ? void 0 : r.guardianUser) || "", e.guardianIdCardStr = null == (s = null == (t = e.userInfo) ? void 0 : t.infoOther) ? void 0 : s.guardianIdCard, e.guardianPhoneStr = null == (d = null == (u = e.userInfo) ? void 0 : u.infoOther) ? void 0 : d.guardianPhone)
        }))
      },
      getIdCardStr: f,
      getIdCardStrViewAll: p,
      doCheckCodeRepetitive: function() {
        var n = {
          certificateType: e.certifyType,
          certificateCode: e.idNum
        };
        u.apiCheckCodeRepetitive(n).then((function(n) {
          200 === n.code && (n.data.repetitive ? (e.repeatMsg = n.data.msg, I(), x()) : (I(), g()))
        }))
      },
      repeatRef: A,
      repeatRefClose: E,
      repeatRefOpen: x,
      sendCodeModify: T,
      countdownNumberModify: k,
      showModifyCode: function() {
        if (t.isEmpty(e.viewPhone)) {
          if (t.isEmpty(e.viewEmail)) return a.index.showToast({
            title: "尚未绑定手机号或邮箱。"
          }), !1;
          e.modifyTitle = "邮箱", e.modifyPhone = e.viewEmail
        } else e.modifyTitle = "手机号", e.modifyPhone = e.viewPhone;
        e.isModifySendMsg = !0, e.codeNumModify = ""
      },
      doAuthModifyMsg: function() {
        e.codeNumModify || a.index.showToast({
          title: "请输入验证码。",
          icon: "error"
        });
        var n = "",
          i = 1;
        if (t.isEmpty(e.viewPhone)) {
          if (t.isEmpty(e.viewEmail)) return a.index.showToast({
            title: "尚未绑定手机号或邮箱。"
          }), !1;
          i = 2, n = e.userInfo.email
        } else i = 1, n = e.userInfo.phone;
        var o = {
          code: n,
          validCode: e.codeNumModify,
          type: i,
          validType: 14
        };
        u.apiAuthValid(o).then((function(n) {
          200 === n.code && n.data && (a.index.showToast({
            title: "验证成功。"
          }), e.isModifySendMsg = !1, e.codeNumModify = "", e.isDoModify = !0, e.certifyType = 1, e.idNum = "", e.realName = "", e.agree = !1)
        }))
      }
    })
  }
});
Array || (a.resolveComponent("uni-easyinput") + a.resolveComponent("uni-forms-item") + a.resolveComponent("uni-forms") + a.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var c = a._export_sfc(l, [
  ["render", function(n, i, o, r, t, s) {
    var u, d, l, c, f, p;
    return a.e({
      a: n.userInfo.headPortrait
    }, n.userInfo.headPortrait ? {
      b: n.userInfo.headPortrait
    } : {
      c: n.$static + "/static/image/mine/pic_people_mine_60@2x.png"
    }, {
      d: a.t(n.userInfo.nickName),
      e: "" == n.userInfo.idCard && "" == n.userInfo.hmPasser && "" == n.userInfo.passport || n.isDoModify
    }, "" == n.userInfo.idCard && "" == n.userInfo.hmPasser && "" == n.userInfo.passport || n.isDoModify ? {
      f: n.$static + "/static/image/mine/no-certify.png"
    } : {
      g: n.$static + "/static/image/mine/has-certify.png"
    }, {
      h: !n.isAuthentication() || n.isDoModify
    }, !n.isAuthentication() || n.isDoModify ? {
      i: n.realName,
      j: a.o((function(e) {
        return n.realName = e.detail.value
      })),
      k: a.t(n.certifyText),
      l: a.n(n.isPick ? "picker-show-cur" : "picker-hidden-cur"),
      m: a.f(n.certifyTypeList, (function(e, i, o) {
        return {
          a: a.t(e.label),
          b: e,
          c: a.o((function(i) {
            return n.handlePickerType(e.type)
          }))
        }
      })),
      n: n.isPick,
      o: a.n(n.isPick ? "picker-show" : ""),
      p: a.o((function() {
        return n.handlePick && n.handlePick.apply(n, arguments)
      })),
      q: n.tipStr,
      r: n.idNum,
      s: a.o((function(e) {
        return n.idNum = e.detail.value
      })),
      t: a.o((function(e) {
        return n.openArguments("shiming.png")
      })),
      v: n.agree,
      w: a.o((function() {
        return n.handleAgree && n.handleAgree.apply(n, arguments)
      })),
      x: a.n(n.canCommit ? "no-can-commit" : "can-commit"),
      y: n.canCommit,
      z: a.o((function() {
        return n.realConfirmDialogOpen && n.realConfirmDialogOpen.apply(n, arguments)
      }))
    } : {}, {
      A: 1 == n.userInfo.isAbnormal && n.isAuthentication() && !n.isDoModify && !n.isSendMsg && !n.isModifySendMsg
    }, 1 != n.userInfo.isAbnormal || !n.isAuthentication() || n.isDoModify || n.isSendMsg || n.isModifySendMsg ? {} : {
      B: n.$static + "/static/image/mine/icon_warning_black.png",
      C: a.t(n.userInfo.abnormalMsgV3)
    }, {
      D: n.isAuthentication() && !n.isDoModify && !n.isSendMsg && !n.isModifySendMsg
    }, !n.isAuthentication() || n.isDoModify || n.isSendMsg || n.isModifySendMsg ? {} : {
      E: a.t(n.realNameStr),
      F: a.t(n.idCardTypeStr),
      G: a.t(n.idCardStr)
    }, {
      H: !n.isDoModify && n.isAuthentication() && !n.isSendMsg && !n.isModifySendMsg
    }, n.isDoModify || !n.isAuthentication() || n.isSendMsg || n.isModifySendMsg ? {} : a.e({
      I: !n.isViewAll
    }, n.isViewAll ? {} : {
      J: a.o((function() {
        return n.doViewAll && n.doViewAll.apply(n, arguments)
      }))
    }, {
      K: (null == (u = n.userInfo) ? void 0 : u.idCard) && (null == (l = null == (d = n.userInfo) ? void 0 : d.infoOther) ? void 0 : l.guardianIdCard) && n.age > 11 && n.age < 16
    }, (null == (c = n.userInfo) ? void 0 : c.idCard) && (null == (p = null == (f = n.userInfo) ? void 0 : f.infoOther) ? void 0 : p.guardianIdCard) && n.age > 11 && n.age < 16 ? {
      L: a.o((function() {
        return n.showDialog && n.showDialog.apply(n, arguments)
      }))
    } : {}), {
      M: !n.isDoModify && !n.isSendMsg && n.isAuthentication() && !n.isModifySendMsg
    }, n.isDoModify || n.isSendMsg || !n.isAuthentication() || n.isModifySendMsg ? {} : {
      N: a.t(n.allowedMsg),
      O: a.n(n.isAllowed ? "can-commit" : "no-can-modify"),
      P: !n.isAllowed,
      Q: a.o((function() {
        return n.showModifyCode && n.showModifyCode.apply(n, arguments)
      }))
    }, {
      R: n.isModifySendMsg && !n.isSendMsg
    }, n.isModifySendMsg && !n.isSendMsg ? a.e({
      S: a.t(n.modifyTitle),
      T: a.o((function(e) {
        return n.modifyPhone = e
      })),
      U: a.p({
        type: "text",
        trim: "all",
        inputBorder: !0,
        disabled: "true",
        clearable: !1,
        maxlength: "50",
        modelValue: n.modifyPhone
      }),
      V: a.p({
        label: "",
        name: "mobile",
        labelWidth: "200px"
      }),
      W: !n.modifyLogicLock
    }, n.modifyLogicLock ? {
      Y: a.t(n.countdownNumberModify)
    } : {
      X: a.o((function() {
        return n.sendCodeModify && n.sendCodeModify.apply(n, arguments)
      }))
    }, {
      Z: a.o((function(e) {
        return n.codeNumModify = e
      })),
      aa: a.p({
        type: "text",
        trim: "all",
        placeholder: "请输入验证码",
        clearable: !1,
        maxlength: "6",
        modelValue: n.codeNumModify
      }),
      ab: a.p({
        label: "",
        labelWidth: "200px"
      }),
      ac: a.sr("formRef", "923b98a2-0"),
      ad: a.p(e({}, "label-position", "top")),
      ae: a.o((function() {
        return n.doAuthModifyMsg && n.doAuthModifyMsg.apply(n, arguments)
      }))
    }) : {}, {
      af: n.isSendMsg && !n.isModifySendMsg
    }, n.isSendMsg && !n.isModifySendMsg ? a.e({
      ag: a.sr("mobile", "923b98a2-7,923b98a2-6"),
      ah: a.o((function(e) {
        return n.viewPhone = e
      })),
      ai: a.p({
        inputBorder: !0,
        clearable: !1,
        type: "text",
        placeholderStyle: "font-size :28rpx",
        disabled: "true",
        maxlength: "11",
        modelValue: n.viewPhone
      }),
      aj: a.p({
        label: "",
        name: "mobile",
        labelWidth: "200px"
      }),
      ak: !n.viewLogicLock
    }, n.viewLogicLock ? {
      am: a.t(n.countdownNumberView)
    } : {
      al: a.o((function() {
        return n.sendCode && n.sendCode.apply(n, arguments)
      }))
    }, {
      an: a.o((function(e) {
        return n.codeNum = e
      })),
      ao: a.p({
        type: "text",
        trim: "all",
        placeholder: "请输入验证码",
        clearable: !1,
        maxlength: "6",
        modelValue: n.codeNum
      }),
      ap: a.p({
        label: "",
        labelWidth: "200px"
      }),
      aq: a.sr("formRef", "923b98a2-5"),
      ar: a.p(e({}, "label-position", "top")),
      as: a.o((function() {
        return n.doAuthViewMsg && n.doAuthViewMsg.apply(n, arguments)
      }))
    }) : {}, {
      at: a.o((function() {
        return n.closePopup && n.closePopup.apply(n, arguments)
      })),
      av: a.t(n.guardianUserStr),
      aw: a.t(n.guardianIdCardStr),
      ax: a.t(n.guardianPhoneStr),
      ay: a.o((function() {
        return n.goToCertifyParent && n.goToCertifyParent.apply(n, arguments)
      })),
      az: a.sr("popup", "923b98a2-10"),
      aA: a.p(e(e({}, "backgroud-color", "#fff"), "mask-click", !1)),
      aB: a.t(n.realName),
      aC: a.t(n.certifyText),
      aD: a.t(n.idNum),
      aE: a.o((function() {
        return n.realConfirmDialogClose && n.realConfirmDialogClose.apply(n, arguments)
      })),
      aF: !n.logicLock
    }, n.logicLock ? {
      aH: a.o((function() {
        return n.doCheckCodeRepetitive && n.doCheckCodeRepetitive.apply(n, arguments)
      }))
    } : {
      aG: a.t(n.countdownNumber)
    }, {
      aI: a.sr("realConfirmDialogRef", "923b98a2-11"),
      aJ: a.p(e({}, "mask-click", !1)),
      aK: a.o((function(e) {
        return n.noHasPhoneRefClose()
      })),
      aL: a.sr("noHasPhoneRef", "923b98a2-12"),
      aM: a.p(e({}, "mask-click", !1)),
      aN: a.t(n.repeatMsg),
      aO: a.o((function() {
        return n.repeatRefClose && n.repeatRefClose.apply(n, arguments)
      })),
      aP: a.o((function(e) {
        return n.handleSubmit()
      })),
      aQ: a.sr("repeatRef", "923b98a2-13"),
      aR: a.p(e({}, "mask-click", !1))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/user/certifyInfo.vue"]
]);
wx.createPage(c);