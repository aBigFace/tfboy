var e = require("../../@babel/runtime/helpers/defineProperty"),
  r = require("../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  s = require("../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../common/vendor.js"),
  t = require("../../utils/uniUtil.js"),
  n = require("../../utils/rsa.js"),
  i = require("../../apis/user.js");
require("../../common/app-theme.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js");
var u = {
  name: "editPassword",
  setup: function() {
    var e = o.reactive({
      formData: {
        password: "",
        askPassword: ""
      }
    });
    return r({
      confirm: function() {
        var r = s(a().mark((function r() {
          var s, u, p, m, d, f, l, c, w, g, h, b;
          return a().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                if ((s = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{10,16}$/).test(e.formData.password) || s.test(e.formData.askPassword)) {
                  r.next = 3;
                  break
                }
                return r.abrupt("return", t.uniUtil.showToast("密码只能为大写字母+小写字母+数字的10至16位字符组合"));
              case 3:
                if (e.formData.password === e.formData.askPassword) {
                  r.next = 5;
                  break
                }
                return r.abrupt("return", t.uniUtil.showToast("密码不一致"));
              case 5:
                return u = getCurrentPages(), p = u[u.length - 1].options, m = p.code, d = p.mode, f = void 0 === d ? "modify" : d, l = p.validCode, c = p.type, r.next = 10, n.getRsaCode(e.formData.password);
              case 10:
                return w = r.sent, r.next = 13, n.getRsaCode(e.formData.askPassword);
              case 13:
                g = r.sent, "forget" === f ? (h = {
                  code: m,
                  password: w,
                  askPassword: g,
                  sysCode: "tf",
                  validCode: l,
                  type: c
                }, i.apiForgetPassword(h).then((function() {
                  t.uniUtil.showToast("设置成功"), o.index.navigateTo({
                    url: "/pages/login/accountLogin"
                  })
                }))) : (b = {
                  code: m,
                  password: w,
                  askPassword: g,
                  sysCode: "tf"
                }, i.apiModifyPassword(b).then((function() {
                  t.uniUtil.showToast("设置成功"), o.index.navigateTo({
                    url: "/pages/login/accountLogin"
                  })
                })));
              case 15:
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
  return "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var p = o._export_sfc(u, [
  ["render", function(r, a, s, t, n, i) {
    return {
      a: o.o((function(e) {
        return r.formData.password = e
      })),
      b: o.p({
        type: "password",
        trim: "all",
        placeholder: "由10-16位大小字母和数字的组合",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.password
      }),
      c: o.p({
        label: "",
        name: "password"
      }),
      d: o.o((function(e) {
        return r.formData.askPassword = e
      })),
      e: o.p({
        type: "password",
        trim: "all",
        placeholder: "请重复您的密码",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.askPassword
      }),
      f: o.p({
        label: "",
        name: "askPassword"
      }),
      g: o.sr("formRef", "49f990a2-0"),
      h: o.p(e({
        modelValue: r.formData
      }, "label-position", "top")),
      i: r.formData.password && r.formData.askPassword ? "" : 1,
      j: !(r.formData.password && r.formData.askPassword),
      k: o.o((function() {
        return t.confirm && t.confirm.apply(t, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-49f990a2"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/editPassword.vue"]
]);
wx.createPage(p);