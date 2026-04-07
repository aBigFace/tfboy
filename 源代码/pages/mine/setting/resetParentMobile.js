var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("../../../common/vendor.js"),
  o = require("../../../apis/user.js"),
  a = require("../../../utils/validate.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var u = i.defineComponent({
  name: "resetMobile",
  setup: function() {
    var e = i.reactive({
        formData: {
          mobile: "",
          codeNum: ""
        },
        validType: 0,
        rules: {
          mobile: {
            rules: [{
              validateFunction: function(r, n, t, i) {
                return a.validatePhone(n) ? e.phone === n && i("新手机号与原手机号不能一致") : i("手机号不符合规范"), !0
              }
            }]
          }
        },
        times: 0,
        phone: ""
      }),
      u = i.ref(),
      s = i.ref();
    i.onLoad((function(r) {
      e.validType = Number(r.validType)
    }));
    var m = function() {
        var r = t(n().mark((function r() {
          var t, a;
          return n().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                if (e.formData.mobile || i.index.showToast({
                    title: "请先输入手机号码",
                    icon: "error"
                  }), !(e.times > 0)) {
                  r.next = 3;
                  break
                }
                return r.abrupt("return");
              case 3:
                return r.next = 5, u.value.validate("mobile");
              case 5:
                if (!r.sent.mobile) {
                  r.next = 13;
                  break
                }
                return i.index.showToast({
                  title: "发送验证码成功"
                }), e.times = 60, t = setInterval((function() {
                  e.times--, e.times <= 0 && clearInterval(t)
                }), 1e3), a = {
                  type: 1,
                  validType: e.validType,
                  code: e.formData.mobile
                }, r.next = 13, o.apiSendMsg(a);
              case 13:
              case "end":
                return r.stop()
            }
          }), r)
        })));
        return function() {
          return r.apply(this, arguments)
        }
      }(),
      l = i.computed$1((function() {
        var r = e.formData,
          n = r.mobile,
          t = r.codeNum;
        return n && t
      })),
      f = function() {
        var r = t(n().mark((function r() {
          var t;
          return n().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                t = {
                  guardianPhone: e.formData.mobile,
                  guardianUser: i.index.getStorageSync("userInfo").infoOther.guardianUser,
                  guardianIdCard: i.index.getStorageSync("userInfo").infoOther.guardianIdCard,
                  validCode: e.formData.codeNum
                }, o.apiCertifyParent(t).then((function(r) {
                  if (200 === r.code) {
                    var n = i.index.getStorageSync("userInfo");
                    n.infoOther.guardianPhone = e.formData.mobile, i.index.setStorageSync("userInfo", n), i.index.switchTab({
                      url: "/pages/mine/mine"
                    }), i.index.showToast({
                      title: "操作成功"
                    })
                  }
                }));
              case 2:
              case "end":
                return r.stop()
            }
          }), r)
        })));
        return function() {
          return r.apply(this, arguments)
        }
      }();
    return r(r({}, i.toRefs(e)), {}, {
      handleSubmit: f,
      sendCode: m,
      mobile: s,
      formRef: u,
      canSubmit: l
    })
  }
});
Array || (i.resolveComponent("uni-easyinput") + i.resolveComponent("uni-forms-item") + i.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var s = i._export_sfc(u, [
  ["render", function(r, n, t, o, a, u) {
    return {
      a: i.sr("mobile", "4312ffa4-2,4312ffa4-1"),
      b: i.o((function(e) {
        return r.formData.mobile = e
      })),
      c: i.p({
        inputBorder: !0,
        clearable: !1,
        type: "text",
        placeholderStyle: "font-size :28rpx",
        placeholder: "请填写家长手机号码",
        maxlength: "11",
        modelValue: r.formData.mobile
      }),
      d: i.p({
        label: "设置新的手机号",
        name: "mobile",
        labelWidth: "200px"
      }),
      e: r.formData.codeNum,
      f: i.o((function(e) {
        return r.formData.codeNum = e.detail.value
      })),
      g: i.t(0 === r.times ? "发送验证码" : "".concat(r.times, "s后发送")),
      h: 0 !== r.times ? 1 : "",
      i: i.o((function() {
        return r.sendCode && r.sendCode.apply(r, arguments)
      })),
      j: i.p({
        label: "验证码",
        labelWidth: "200px"
      }),
      k: i.sr("formRef", "4312ffa4-0"),
      l: i.p(e({
        modelValue: r.formData,
        validateTrigger: "blur",
        rules: r.rules
      }, "label-position", "top")),
      m: !r.canSubmit,
      n: i.o((function() {
        return r.handleSubmit && r.handleSubmit.apply(r, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-4312ffa4"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/resetParentMobile.vue"]
]);
wx.createPage(s);