var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  s = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../common/vendor.js"),
  t = require("../../../utils/uniUtil.js"),
  n = require("../../../utils/rsa.js"),
  i = require("../../../apis/user.js");
require("../../../common/app-theme.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var u = {
  name: "changeLoginPassword",
  setup: function() {
    var e = o.reactive({
      formData: {
        password: "",
        askPassword: "",
        oldPassword: ""
      },
      setPasswordType: ""
    });
    return o.onLoad((function(r) {
      r.type && (e.setPasswordType = r.type, o.index.setNavigationBarTitle({
        title: "设置登录密码"
      })), r.oldPassword && (e.formData.oldPassword = decodeURIComponent(r.oldPassword))
    })), r({
      confirm: function() {
        var r = a(s().mark((function r() {
          var a, u, m, d;
          return s().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                if (e.formData.password === e.formData.askPassword) {
                  r.next = 2;
                  break
                }
                return r.abrupt("return", t.uniUtil.showToast("密码不一致"));
              case 2:
                return r.next = 4, n.getRsaCode(e.formData.password);
              case 4:
                return a = r.sent, r.next = 7, n.getRsaCode(e.formData.askPassword);
              case 7:
                u = r.sent, m = o.index.getStorageSync("userInfo"), d = {
                  code: m.phone || m.email,
                  password: a,
                  askPassword: u,
                  oldPassword: e.formData.oldPassword,
                  sysCode: "tf"
                }, i.apiModifyPassword(d).then((function() {
                  t.uniUtil.showToast("设置成功"), o.index.switchTab({
                    url: "/pages/mine/mine"
                  })
                }));
              case 11:
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
  ["render", function(r, s, a, t, n, i) {
    return {
      a: r.$static + "/static/image/mine/login_password.png",
      b: o.o((function(e) {
        return r.formData.password = e
      })),
      c: o.p({
        type: "password",
        trim: "all",
        placeholder: "由10-16位大小字母和数字的组合",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.password
      }),
      d: o.p({
        label: "",
        name: "password"
      }),
      e: o.o((function(e) {
        return r.formData.askPassword = e
      })),
      f: o.p({
        type: "password",
        trim: "all",
        placeholder: "请重复您的密码",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.askPassword
      }),
      g: o.p({
        label: "",
        name: "askPassword"
      }),
      h: o.sr("formRef", "569cd15d-0"),
      i: o.p(e({
        modelValue: r.formData
      }, "label-position", "top")),
      j: r.formData.password && r.formData.askPassword ? "" : 1,
      k: !(r.formData.password && r.formData.askPassword),
      l: o.o((function() {
        return t.confirm && t.confirm.apply(t, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-569cd15d"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/changeLoginPassword.vue"]
]);
wx.createPage(m);