var e = require("../../@babel/runtime/helpers/defineProperty"),
  o = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../common/vendor.js"),
  t = require("../../utils/uniUtil.js"),
  r = require("../../utils/validate.js"),
  a = require("../../apis/logon.js"),
  i = require("../../common/common.js"),
  u = require("../../utils/commonEnum.js"),
  l = require("../../utils/util.js");
require("../../common/app-theme.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../apis/shopCart.js");
var c = {
  name: "logon",
  setup: function() {
    var e = n.ref(60),
      c = n.reactive({
        formData: {
          code: "",
          type: 1,
          validCode: "",
          validType: u.EValidType.register
        },
        setInterval: null,
        logicLock: !1,
        isRead: !1
      });
    n.watch(e, (function(e, o) {
      0 === e && (c.logicLock = !1, clearInterval(c.setInterval), c.setInterval = null)
    })), n.onBeforeUnmount((function() {
      c.setInterval && (clearInterval(c.setInterval), c.setInterval = null)
    }));
    return o({
      getCode: function() {
        i.debounce((function() {
          var o = 1;
          if (r.validatePhone(c.formData.code)) o = 1;
          else {
            if (!r.validateEmail(c.formData.code)) return t.uniUtil.showToast("请输入正确的电话号码或者邮箱"), !1;
            o = 2
          }
          var n = {
            type: o,
            validType: u.EValidType.register,
            code: c.formData.code
          };
          a.apiGetValidCode(n).then((function(o) {
            200 === o.code && (c.logicLock = !0, e.value = 60, c.setInterval = setInterval((function() {
              e.value -= 1
            }), 1e3))
          }))
        }), 200)
      },
      confirm: function() {
        if (!c.isRead) return t.uniUtil.showToast("请阅读并同意对应协议"), !1;
        var e = 1;
        if (r.validatePhone(c.formData.code)) e = 1;
        else {
          if (!r.validateEmail(c.formData.code)) return t.uniUtil.showToast("请输入正确的电话号码或者邮箱"), !1;
          e = 2
        }
        n.index.navigateTo({
          url: "/pages/login/setPassword?type=".concat(e, "&code=").concat(c.formData.code, "&validCode=").concat(c.formData.validCode)
        })
      },
      accountLogin: function() {
        n.index.redirectTo({
          url: "/pages/login/accountLogin"
        })
      },
      openArguments: l.openArguments,
      countdownNumber: e
    }, n.toRefs(c))
  }
};
Array || (n.resolveComponent("uni-easyinput") + n.resolveComponent("uni-forms-item") + n.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var s = n._export_sfc(c, [
  ["render", function(o, t, r, a, i, u) {
    return n.e({
      a: n.o((function(e) {
        return o.formData.code = e
      })),
      b: n.p({
        type: "text",
        trim: "all",
        placeholder: "请输入手机号码或邮箱账号",
        clearable: !1,
        maxlength: "50",
        modelValue: o.formData.code
      }),
      c: n.p({
        name: "code"
      }),
      d: !o.logicLock
    }, o.logicLock ? {
      f: n.t(a.countdownNumber)
    } : {
      e: n.o((function() {
        return a.getCode && a.getCode.apply(a, arguments)
      }))
    }, {
      g: n.o((function(e) {
        return o.formData.validCode = e
      })),
      h: n.p({
        type: "text",
        trim: "all",
        placeholder: "请输入验证码",
        clearable: !1,
        maxlength: "10",
        modelValue: o.formData.validCode
      }),
      i: n.p({
        name: "validCode"
      }),
      j: n.sr("formRef", "0f3996ae-0"),
      k: n.p(e({
        modelValue: o.formData
      }, "label-position", "top")),
      l: n.o((function(e) {
        return o.isRead = !o.isRead
      })),
      m: o.isRead,
      n: n.o((function(e) {
        return a.openArguments("xieyi.png")
      })),
      o: n.o((function(e) {
        return a.openArguments("yinsi.png")
      })),
      p: n.o((function(e) {
        return a.openArguments("weichengnian.png")
      })),
      q: o.formData.validCode && o.formData.code ? "" : 1,
      r: !(o.formData.validCode && o.formData.code),
      s: n.o((function() {
        return a.confirm && a.confirm.apply(a, arguments)
      })),
      t: n.o((function() {
        return a.accountLogin && a.accountLogin.apply(a, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-0f3996ae"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/logon.vue"]
]);
wx.createPage(s);