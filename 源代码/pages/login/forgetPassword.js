var e = require("../../@babel/runtime/helpers/defineProperty"),
  o = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../common/vendor.js"),
  a = require("../../utils/uniUtil.js"),
  r = require("../../apis/logon.js"),
  n = require("../../utils/validate.js"),
  i = require("../../common/common.js"),
  l = require("../../utils/commonEnum.js"),
  u = require("../../apis/user.js");
require("../../common/app-theme.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../apis/shopCart.js"), require("../../utils/util.js");
var s = {
  name: "forgetPassword",
  setup: function() {
    var e = t.ref(60),
      s = t.reactive({
        formData: {
          code: "",
          type: 1,
          validCode: "",
          validType: l.EValidType.forget
        },
        setInterval: null,
        logicLock: !1
      });
    t.watch(e, (function(e, o) {
      0 === e && (s.logicLock = !1, clearInterval(s.setInterval), s.setInterval = null)
    }));
    t.onBeforeUnmount((function() {
      s.setInterval && (clearInterval(s.setInterval), s.setInterval = null)
    }));
    return o({
      getCode: function() {
        var o = 1;
        if (n.validatePhone(s.formData.code)) o = 1;
        else {
          if (!n.validateEmail(s.formData.code)) return a.uniUtil.showToast("请输入正确的电话号码或者邮箱"), !1;
          o = 2
        }
        i.debounce((function() {
          var a = {
            type: o,
            validType: l.EValidType.forget,
            code: s.formData.code
          };
          r.apiGetValidCode(a).then((function(o) {
            200 === o.code && (t.index.showToast({
              title: "发送验证码成功"
            }), s.logicLock = !0, e.value = 60, s.setInterval = setInterval((function() {
              e.value -= 1
            }), 1e3))
          }))
        }), 1e3)
      },
      next: function() {
        var e = 1;
        if (n.validatePhone(s.formData.code)) e = 1;
        else {
          if (!n.validateEmail(s.formData.code)) return a.uniUtil.showToast("请输入正确的电话号码或者邮箱"), !1;
          e = 2
        }
        var o = {
          type: e,
          code: s.formData.code,
          validType: l.EValidType.forget,
          validCode: s.formData.validCode
        };
        u.apiBeforeForgetPassword(o).then((function(o) {
          if (!o.data) return a.uniUtil.showToast("验证码不正确。"), !1;
          t.index.navigateTo({
            url: "/pages/login/editPassword?type=".concat(e, "&code=").concat(s.formData.code, "&validCode=").concat(s.formData.validCode, "&mode=forget")
          })
        }))
      },
      countdownNumber: e
    }, t.toRefs(s))
  }
};
Array || (t.resolveComponent("uni-easyinput") + t.resolveComponent("uni-forms-item") + t.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var c = t._export_sfc(s, [
  ["render", function(o, a, r, n, i, l) {
    return t.e({
      a: t.o((function(e) {
        return o.formData.code = e
      })),
      b: t.p({
        type: "text",
        trim: "all",
        placeholder: "请输入手机号码/邮箱账号",
        clearable: !1,
        maxlength: "50",
        modelValue: o.formData.code
      }),
      c: t.p({
        name: "code"
      }),
      d: !o.logicLock
    }, o.logicLock ? {
      f: t.t(n.countdownNumber)
    } : {
      e: t.o((function() {
        return n.getCode && n.getCode.apply(n, arguments)
      }))
    }, {
      g: t.o((function(e) {
        return o.formData.validCode = e
      })),
      h: t.p({
        type: "text",
        trim: "all",
        placeholder: "请输入登录密码",
        clearable: !1,
        maxlength: "16",
        modelValue: o.formData.validCode
      }),
      i: t.p({
        name: "validCode"
      }),
      j: t.sr("formRef", "92c3fadc-0"),
      k: t.p(e({
        modelValue: o.form
      }, "label-position", "top")),
      l: o.formData.code && o.formData.validCode ? "" : 1,
      m: !(o.formData.code && o.formData.validCode),
      n: t.o((function() {
        return n.next && n.next.apply(n, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-92c3fadc"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/forgetPassword.vue"]
]);
wx.createPage(c);