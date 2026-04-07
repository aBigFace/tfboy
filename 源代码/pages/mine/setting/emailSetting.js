var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../common/vendor.js"),
  a = require("../../../common/common.js"),
  i = require("../../../apis/user.js"),
  l = require("../../../utils/commonEnum.js");
require("../../../apis/shopCart.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../utils/util.js");
var u = r.defineComponent({
  name: "resetMobile",
  setup: function() {
    var e = r.ref(60),
      u = r.reactive({
        formData: {
          mobile: "",
          codeNum: ""
        },
        logicLock: !1,
        setInterval: null,
        checkMethod: "changeRememberEmail",
        times: 0,
        phone: "",
        validType: l.EValidType.changeMemberBind
      }),
      m = r.computed$1((function() {
        var e = u.formData,
          n = e.mobile,
          o = e.codeNum;
        return n && o
      }));
    r.watch(e, (function(e, n) {
      0 === e && (u.logicLock = !1, clearInterval(u.setInterval), u.setInterval = null)
    })), r.onBeforeUnmount((function() {
      u.setInterval && (clearInterval(u.setInterval), u.setInterval = null)
    }));
    var c = r.ref(),
      d = r.ref();
    r.onLoad((function(e) {
      e.validType && (u.validType = Number(e.validType), u.checkMethod = e.checkMethod, r.index.setNavigationBarTitle({
        title: u.validType == l.EValidType.changeMemberBind ? "绑定邮箱" : "修改邮箱"
      }))
    }));
    var s = function() {
        var e = t(o().mark((function e() {
          return o().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return u.formData.mobile || r.index.showToast({
                  title: "请先输入邮箱号",
                  icon: "error"
                }), e.next = 3, c.value.validate("mobile");
              case 3:
                e.sent.mobile && a.debounce((function() {
                  var e = {
                    type: 2,
                    validType: u.validType,
                    code: u.formData.mobile
                  };
                  i.apiSendCode(e).then((function(e) {
                    200 === e.code && (r.index.showToast({
                      title: "发送验证码成功"
                    }), u.logicLock = !0, p())
                  }))
                }), 1e3);
              case 5:
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
        e.value = 60, u.setInterval = setInterval((function() {
          e.value -= 1
        }), 1e3)
      },
      f = function() {
        var e = t(o().mark((function e() {
          var n, t, a, m, d, s, p, f;
          return o().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, c.value.validate("mobile");
              case 2:
                if (!e.sent.mobile) {
                  e.next = 10;
                  break
                }
                return n = {
                  bindType: 2,
                  bindCode: u.formData.mobile
                }, u.validType === l.EValidType.changeMemberBind ? (n.checkType = 3, n.validCodeDTONew = {
                  code: u.formData.mobile,
                  type: 2,
                  validCode: u.formData.codeNum,
                  validType: l.EValidType.changeMemberBind
                }) : (t = getCurrentPages(), a = t[t.length - 1].options, m = a.name, d = a.type, s = a.codeNum, p = a.validCode, "changeRememberEmail" === u.checkMethod ? (n.checkType = 1, n.validCodeDTONew = {
                  code: u.formData.mobile,
                  type: 2,
                  validCode: u.formData.codeNum,
                  validType: l.EValidType.changeTelEmail
                }, f = r.index.getStorageSync("userInfo"), n.validCodeDTOOld = {
                  code: (null == f ? void 0 : f.email) || "",
                  type: 2,
                  validCode: p,
                  validType: l.EValidType.beforeChangeTelEmail
                }) : (n.checkType = 2, n.validCodeDTONew = {
                  code: u.formData.mobile,
                  type: 2,
                  validCode: u.formData.codeNum,
                  validType: l.EValidType.changeTelEmail
                }, n.identityDTO = {
                  cardCode: s,
                  idCardType: d,
                  realName: decodeURIComponent(m)
                })), e.next = 8, i.apiResetMobile(n);
              case 8:
                200 === e.sent.code && (u.formData = {
                  mobile: "",
                  codeNum: ""
                }, r.index.switchTab({
                  url: "/pages/mine/mine"
                }), r.index.showToast({
                  title: "操作成功"
                }));
              case 10:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return n(n({}, r.toRefs(u)), {}, {
      countdownNumber: e,
      handleSubmit: f,
      sendCode: s,
      changeCountdownNumber: p,
      mobile: d,
      formRef: c,
      canSubmit: m
    })
  }
});
Array || (r.resolveComponent("uni-easyinput") + r.resolveComponent("uni-forms-item") + r.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var m = r._export_sfc(u, [
  ["render", function(n, o, t, a, i, l) {
    return r.e({
      a: r.sr("mobile", "5773ef5b-2,5773ef5b-1"),
      b: r.o((function(e) {
        return n.formData.mobile = e
      })),
      c: r.p({
        inputBorder: !0,
        clearable: !1,
        placeholderStyle: "font-size :28rpx",
        placeholder: "请输入电子邮箱账号",
        maxlength: "30",
        modelValue: n.formData.mobile
      }),
      d: r.p({
        label: "",
        name: "mobile",
        labelWidth: "200px"
      }),
      e: !n.logicLock
    }, n.logicLock ? {
      g: r.t(n.countdownNumber)
    } : {
      f: r.o((function() {
        return n.sendCode && n.sendCode.apply(n, arguments)
      }))
    }, {
      h: r.o((function(e) {
        return n.formData.codeNum = e
      })),
      i: r.p({
        type: "text",
        trim: "all",
        placeholder: "请输入验证码",
        clearable: !1,
        maxlength: "6",
        modelValue: n.formData.codeNum
      }),
      j: r.p({
        label: "",
        labelWidth: "200px"
      }),
      k: r.sr("formRef", "5773ef5b-0"),
      l: r.p(e({
        modelValue: n.formData,
        validateTrigger: "blur"
      }, "label-position", "top")),
      m: !n.canSubmit,
      n: r.o((function() {
        return n.handleSubmit && n.handleSubmit.apply(n, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-5773ef5b"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/emailSetting.vue"]
]);
wx.createPage(m);