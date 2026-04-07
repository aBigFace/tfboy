var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  s = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../common/vendor.js"),
  t = require("../../../utils/uniUtil.js"),
  a = require("../../../utils/rsa.js"),
  i = require("../../../apis/user.js");
require("../../../common/app-theme.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var u = {
  name: "loginPassword",
  setup: function() {
    var e = o.reactive({
      formData: {
        askPassword: ""
      }
    });
    return r({
      confirm: function() {
        var r = s(n().mark((function r() {
          var s, u, m;
          return n().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                return r.next = 2, a.getRsaCode(e.formData.askPassword);
              case 2:
                return s = r.sent, u = {
                  password: encodeURIComponent(s)
                }, r.next = 6, i.apiModifyloginPassword(u);
              case 6:
                200 == (m = r.sent).code ? o.index.navigateTo({
                  url: "/pages/mine/setting/changeLoginPassword?oldPassword=".concat(encodeURIComponent(s))
                }) : t.uniUtil.showToast(m.message);
              case 8:
              case "end":
                return r.stop()
            }
          }), r)
        })));
        return function() {
          return r.apply(this, arguments)
        }
      }()
    }, o.toRefs(e))
  }
};
Array || (o.resolveComponent("uni-easyinput") + o.resolveComponent("uni-forms-item") + o.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var m = o._export_sfc(u, [
  ["render", function(r, n, s, t, a, i) {
    return {
      a: r.$static + "/static/image/mine/login_password.png",
      b: o.o((function(e) {
        return r.formData.askPassword = e
      })),
      c: o.p({
        type: "password",
        trim: "all",
        placeholder: "请填写您的旧密码",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.askPassword
      }),
      d: o.p({
        label: "",
        name: "askPassword"
      }),
      e: o.sr("formRef", "e6c81026-0"),
      f: o.p(e({
        modelValue: r.formData
      }, "label-position", "top")),
      g: r.formData.askPassword ? "" : 1,
      h: !r.formData.askPassword,
      i: o.o((function() {
        return t.confirm && t.confirm.apply(t, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-e6c81026"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/loginPassword.vue"]
]);
wx.createPage(m);