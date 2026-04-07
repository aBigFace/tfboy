var e = require("../../@babel/runtime/helpers/defineProperty"),
  n = require("../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  i = require("../../utils/uniUtil.js"),
  a = require("../../utils/rsa.js"),
  u = require("../../apis/user.js"),
  s = require("../../utils/util.js");
require("../../common/app-theme.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../utils/commonEnum.js");
var c = {
  name: "accountLogin",
  setup: function() {
    var e = t.ref(),
      c = t.reactive({
        formData: {
          username: "",
          password: ""
        },
        isRead: !1,
        verCode: "",
        inputVerCode: "",
        isFocus: !1
      }),
      l = function(e, n) {
        return parseInt(Math.random() * (e - n)) + n
      },
      p = function(e, n) {
        return "rgb(" + l(e, n) + "," + l(e, n) + "," + l(e, n) + ")"
      },
      f = function() {
        var e = t.index.createCanvasContext("canvasW");
        e.setFillStyle("white"), e.setLineWidth(10), e.fillRect(0, 0, 140, 35);
        for (var n = [], r = 48; r < 58; r++) n.push(String.fromCharCode(r));
        for (var o = 65; o < 91; o++) n.push(String.fromCharCode(o));
        for (var i = 97; i < 123; i++) n.push(String.fromCharCode(i));
        for (var a = n, u = "", s = 0; s < 4; s++) {
          var f = a[l(0, a.length - 1)],
            m = l(-30, 30);
          e.setFontSize(18), e.setTextBaseline("top"), e.setFillStyle(p(80, 150)), e.save(), e.translate(30 * s + 15, parseInt(35 / 1.5)), e.rotate(m * Math.PI / 180), e.fillText(f, -10, -15), e.restore(), u += f
        }
        c.verCode = u;
        for (var d = 0; d < 40; d++) e.beginPath(), e.arc(l(0, 140), l(0, 35), 1, 0, 2 * Math.PI), e.closePath(), e.setFillStyle(p(150, 200)), e.fill();
        e.draw()
      };
    t.onShow((function() {
      f()
    }));
    var m = function() {
      var e = o(r().mark((function e() {
        var n, o;
        return r().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (c.inputVerCode.toLowerCase() === c.verCode.toLowerCase()) {
                e.next = 3;
                break
              }
              return i.uniUtil.showToast("验证码错误"), e.abrupt("return", !1);
            case 3:
              return e.next = 5, a.getRsaCode(c.formData.password);
            case 5:
              n = e.sent, o = {
                client_id: "tf",
                client_secret: "123",
                grant_type: "password",
                username: c.formData.username,
                password: encodeURIComponent(n),
                platform: 2
              }, u.apiUserAccountLogin(o).then((function(e) {
                t.index.setStorageSync("token", e.access_token), t.index.setStorageSync("userInfo", e.currentUser), i.uniUtil.showToast("登录成功"), t.index.switchTab({
                  url: "/pages/mine/mine"
                })
              })).catch((function(e) {
                "invalid_grant" !== e.data.error && "unauthorized" !== e.data.error || i.uniUtil.showToast("账号密码不存在，请重新输入")
              }));
            case 8:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    return n({
      forgetPsw: function() {
        t.index.navigateTo({
          url: "/pages/login/forgetPassword"
        })
      },
      logon: function() {
        t.index.redirectTo({
          url: "/pages/login/logon"
        })
      },
      accountLogin: function() {
        if (!c.isRead) return i.uniUtil.showToast("请阅读并同意对应协议"), !1;
        e.value.open()
      },
      verCodeDialogRef: e,
      closeDialog: function() {
        e.value.close(), c.inputVerCode = ""
      },
      focusFn: function() {
        c.isFocus = !0
      },
      blurFn: function() {
        c.isFocus = !1
      },
      openArguments: s.openArguments,
      login: m,
      init: f,
      findAccount: function() {
        t.index.redirectTo({
          url: "/pages/login/findAccount"
        })
      }
    }, t.toRefs(c))
  }
};
Array || (t.resolveComponent("uni-easyinput") + t.resolveComponent("uni-forms-item") + t.resolveComponent("uni-forms") + t.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
} + function() {
  return "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var l = t._export_sfc(c, [
  ["render", function(n, r, o, i, a, u) {
    return {
      a: t.o((function(e) {
        return n.formData.username = e
      })),
      b: t.p({
        type: "text",
        trim: "all",
        placeholder: "请输入手机号码/邮箱账号",
        clearable: !1,
        maxlength: "50",
        modelValue: n.formData.username
      }),
      c: t.p({
        label: "",
        name: "username"
      }),
      d: t.o((function(e) {
        return n.formData.password = e
      })),
      e: t.p({
        type: "password",
        trim: "all",
        placeholder: "请输入登录密码",
        clearable: !1,
        maxlength: "16",
        modelValue: n.formData.password
      }),
      f: t.p({
        label: "",
        name: "password"
      }),
      g: t.sr("formRef", "1c3b0aa6-0"),
      h: t.p(e({
        modelValue: n.formData
      }, "label-position", "top")),
      i: t.o((function(e) {
        return n.isRead = !n.isRead
      })),
      j: n.isRead,
      k: t.o((function(e) {
        return i.openArguments("xieyi.png")
      })),
      l: t.o((function(e) {
        return i.openArguments("yinsi.png")
      })),
      m: t.o((function(e) {
        return i.openArguments("weichengnian.png")
      })),
      n: n.formData.username && n.formData.password ? "" : 1,
      o: !(n.formData.username && n.formData.password),
      p: t.o((function() {
        return i.accountLogin && i.accountLogin.apply(i, arguments)
      })),
      q: t.o((function() {
        return i.forgetPsw && i.forgetPsw.apply(i, arguments)
      })),
      r: t.o((function() {
        return i.findAccount && i.findAccount.apply(i, arguments)
      })),
      s: t.o((function() {
        return i.logon && i.logon.apply(i, arguments)
      })),
      t: t.o((function() {
        return i.focusFn && i.focusFn.apply(i, arguments)
      })),
      v: n.inputVerCode,
      w: t.o((function(e) {
        return n.inputVerCode = e.detail.value
      })),
      x: t.o((function() {
        return i.init && i.init.apply(i, arguments)
      })),
      y: t.o((function() {
        return i.closeDialog && i.closeDialog.apply(i, arguments)
      })),
      z: t.o((function() {
        return i.login && i.login.apply(i, arguments)
      })),
      A: n.isFocus ? "100px" : "0",
      B: t.sr("verCodeDialogRef", "1c3b0aa6-5"),
      C: t.p(e({
        type: "center"
      }, "mask-click", !1))
    }
  }],
  ["__scopeId", "data-v-1c3b0aa6"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/accountLogin.vue"]
]);
wx.createPage(l);