var e = require("../../../@babel/runtime/helpers/defineProperty"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../common/vendor.js"),
  a = require("../../../apis/user.js"),
  i = require("../../../utils/validate.js"),
  l = require("../../../common/common.js"),
  u = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js");
var c = r.defineComponent({
  name: "resetMobile",
  setup: function() {
    var e = r.ref(60),
      c = r.reactive({
        formData: {
          mobile: "",
          codeNum: ""
        },
        logicLock: !1,
        setInterval: null,
        rules: {
          mobile: {
            rules: [{
              validateFunction: function(e, o, n, t) {
                return i.validatePhone(o) ? c.phone === o && t("新手机号与原手机号不能一致") : t("手机号不符合规范"), !0
              }
            }]
          }
        },
        times: 0,
        phone: "",
        validType: 0,
        checkMethod: ""
      }),
      m = r.computed$1((function() {
        var e = c.formData,
          o = e.mobile,
          n = e.codeNum;
        return o && n
      }));
    r.watch(e, (function(e, o) {
      0 === e && (c.logicLock = !1, clearInterval(c.setInterval), c.setInterval = null)
    })), r.onBeforeUnmount((function() {
      c.setInterval && (clearInterval(c.setInterval), c.setInterval = null)
    }));
    var d = r.ref(),
      s = r.ref();
    r.onLoad((function(e) {
      console.log("%E7%8E%8B%E5%A4%A7%E9%B9%85===>", decodeURIComponent("%E7%8E%8B%E5%A4%A7%E9%B9%85")), c.validType = Number(e.validType), c.checkMethod = e.checkMethod || "", r.index.setNavigationBarTitle({
        title: c.validType === u.EValidType.changeTelEmail ? "绑定手机号" : "修改手机号"
      })
    }));
    var p = function() {
        var e = t(n().mark((function e() {
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return c.formData.mobile || r.index.showToast({
                  title: "请先输入手机号码",
                  icon: "error"
                }), e.next = 3, d.value.validate("mobile");
              case 3:
                e.sent.mobile && l.debounce((function() {
                  var e = {
                    type: 1,
                    validType: c.validType,
                    code: c.formData.mobile
                  };
                  a.apiSendMsg(e).then((function(e) {
                    200 === e.code && (r.index.showToast({
                      title: "发送验证码成功"
                    }), c.logicLock = !0, f())
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
      f = function() {
        e.value = 60, c.setInterval = setInterval((function() {
          e.value -= 1
        }), 1e3)
      },
      v = function() {
        var e = t(n().mark((function e() {
          var o, t, i, l, m, s, p, f, v;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, d.value.validate("mobile");
              case 2:
                if (!e.sent.mobile) {
                  e.next = 13;
                  break
                }
                return o = {
                  bindType: 1,
                  checkType: 1,
                  bindCode: c.formData.mobile
                }, t = getCurrentPages(), i = t[t.length - 1].options, l = i.validCode, m = i.validType, s = i.codeNum, p = i.type, f = i.name, m == u.EValidType.changeMemberBind ? (o.checkType = 3, o.validCodeDTONew = {
                  code: c.formData.mobile,
                  type: 1,
                  validCode: c.formData.codeNum,
                  validType: u.EValidType.changeMemberBind
                }) : l ? (o.validCodeDTONew = {
                  code: c.formData.mobile,
                  type: 1,
                  validCode: c.formData.codeNum,
                  validType: u.EValidType.changeTelEmail
                }, v = r.index.getStorageSync("userInfo"), o.validCodeDTOOld = {
                  code: (null == v ? void 0 : v.phone) || "",
                  type: 1,
                  validCode: l,
                  validType: u.EValidType.beforeChangeTelEmail
                }) : (o.checkType = 2, o.validCodeDTONew = {
                  code: c.formData.mobile,
                  type: 1,
                  validCode: c.formData.codeNum,
                  validType: u.EValidType.changeTelEmail
                }, o.identityDTO = {
                  cardCode: s,
                  idCardType: p,
                  realName: decodeURIComponent(f)
                }), e.next = 11, a.apiResetMobile(o);
              case 11:
                200 === e.sent.code && (c.formData = {
                  mobile: "",
                  codeNum: ""
                }, r.index.switchTab({
                  url: "/pages/mine/mine"
                }), r.index.showToast({
                  title: "操作成功"
                }));
              case 13:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return o(o({}, r.toRefs(c)), {}, {
      handleSubmit: v,
      sendCode: p,
      countdownNumber: e,
      mobile: s,
      formRef: d,
      canSubmit: m,
      changeCountdownNumber: f
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
var m = r._export_sfc(c, [
  ["render", function(o, n, t, a, i, l) {
    return r.e({
      a: r.sr("mobile", "2ff8814c-2,2ff8814c-1"),
      b: r.o((function(e) {
        return o.formData.mobile = e
      })),
      c: r.p({
        inputBorder: !0,
        clearable: !1,
        type: "text",
        placeholderStyle: "font-size :28rpx",
        placeholder: "请输入手机号码",
        maxlength: "11",
        modelValue: o.formData.mobile
      }),
      d: r.p({
        label: "",
        name: "mobile",
        labelWidth: "200px"
      }),
      e: !o.logicLock
    }, o.logicLock ? {
      g: r.t(o.countdownNumber)
    } : {
      f: r.o((function() {
        return o.sendCode && o.sendCode.apply(o, arguments)
      }))
    }, {
      h: r.o((function(e) {
        return o.formData.codeNum = e
      })),
      i: r.p({
        type: "text",
        trim: "all",
        placeholder: "请输入验证码",
        clearable: !1,
        maxlength: "6",
        modelValue: o.formData.codeNum
      }),
      j: r.p({
        label: "",
        labelWidth: "200px"
      }),
      k: r.sr("formRef", "2ff8814c-0"),
      l: r.p(e({
        modelValue: o.formData,
        validateTrigger: "blur",
        rules: o.rules
      }, "label-position", "top")),
      m: !o.canSubmit,
      n: r.o((function() {
        return o.handleSubmit && o.handleSubmit.apply(o, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-2ff8814c"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/resetMobile.vue"]
]);
wx.createPage(m);