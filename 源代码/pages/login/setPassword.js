var e = require("../../@babel/runtime/helpers/defineProperty"),
  r = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator"),
  s = require("../../common/vendor.js"),
  o = require("../../utils/uniUtil.js"),
  a = require("../../utils/rsa.js"),
  i = require("../../apis/user.js");
require("../../common/app-theme.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js");
var u = {
  name: "logon",
  setup: function() {
    var e = s.reactive({
      formData: {
        f_password: "",
        s_password: ""
      }
    });
    return r({
      confirm: function() {
        var r = t(n().mark((function r() {
          var u, p, m, c, f, l, d;
          return n().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                if (e.formData.f_password === e.formData.s_password) {
                  r.next = 2;
                  break
                }
                return r.abrupt("return", o.uniUtil.showToast("密码不一致"));
              case 2:
                return u = getCurrentPages(), p = u[u.length - 1].options, m = p.type, c = p.code, f = p.validCode, r.next = 7, a.getRsaCode(e.formData.f_password);
              case 7:
                l = r.sent, d = {
                  registerType: m
                }, 1 == m ? d.phoneRegister = {
                  password: l,
                  phone: c,
                  sysCode: "tf",
                  validCode: f
                } : 2 == m && (d.emailRegister = {
                  password: l,
                  email: c,
                  sysCode: "tf",
                  validCode: f
                }), i.apiUserRegister(d).then(t(n().mark((function r() {
                  var t, u;
                  return n().wrap((function(r) {
                    for (;;) switch (r.prev = r.next) {
                      case 0:
                        return o.uniUtil.showToast("注册成功"), r.next = 3, a.getRsaCode(e.formData.f_password);
                      case 3:
                        t = r.sent, u = {
                          client_id: "tf",
                          client_secret: "123",
                          grant_type: "password",
                          username: c,
                          password: encodeURIComponent(t),
                          platform: 2
                        }, i.apiUserAccountLogin(u).then((function(e) {
                          if (s.index.setStorageSync("token", e.access_token), s.index.setStorageSync("userInfo", e.currentUser), 2 == m) s.index.navigateTo({
                            url: "/pages/mine/setting/resetMobileForEmail"
                          });
                          else {
                            var r = s.index.getStorageSync("fromType");
                            1 === Number(r) ? (s.index.setStorageSync("fromType", ""), s.index.navigateTo({
                              url: "/pages/order/myOrder/list"
                            })) : s.index.switchTab({
                              url: "/pages/mine/mine"
                            })
                          }
                        })).catch((function(e) {
                          s.index.navigateTo({
                            url: "/pages/login/accountLogin"
                          })
                        }));
                      case 6:
                      case "end":
                        return r.stop()
                    }
                  }), r)
                }))));
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
    }, s.toRefs(e))
  }
};
Array || (s.resolveComponent("uni-easyinput") + s.resolveComponent("uni-forms-item") + s.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var p = s._export_sfc(u, [
  ["render", function(r, n, t, o, a, i) {
    return {
      a: s.o((function(e) {
        return r.formData.f_password = e
      })),
      b: s.p({
        type: "password",
        trim: "all",
        placeholder: "由10-16位大小字母和数字的组合",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.f_password
      }),
      c: s.p({
        label: "",
        name: "f_password"
      }),
      d: s.o((function(e) {
        return r.formData.s_password = e
      })),
      e: s.p({
        type: "password",
        trim: "all",
        placeholder: "请重复您的密码",
        clearable: !1,
        maxlength: "16",
        modelValue: r.formData.s_password
      }),
      f: s.p({
        label: "",
        name: "s_password"
      }),
      g: s.sr("formRef", "d23473ba-0"),
      h: s.p(e({
        modelValue: r.formData
      }, "label-position", "top")),
      i: r.formData.f_password && r.formData.s_password ? "" : 1,
      j: !(r.formData.f_password && r.formData.s_password),
      k: s.o((function() {
        return o.confirm && o.confirm.apply(o, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-d23473ba"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/setPassword.vue"]
]);
wx.createPage(p);