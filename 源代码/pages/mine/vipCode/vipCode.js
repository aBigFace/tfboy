var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  i = require("../../../apis/user.js"),
  a = require("../../../utils/uniUtil.js"),
  u = require("../../../utils/validate.js"),
  m = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../utils/commonEnum.js");
var s = t.defineComponent({
  name: "myBalance",
  components: {
    confirmModal: function() {
      return "./modal/confirm-modal.js"
    }
  },
  setup: function() {
    var e = t.ref(null),
      s = t.reactive({
        formData: {
          code: "",
          phone: "",
          codeNum: ""
        },
        times: 0,
        timer: null,
        isAbnormal: 0
      }),
      c = t.computed$1((function() {
        if (s.formData.codeNum) return !(!s.formData.phone && 11 != s.formData.phone.length)
      })),
      l = t.computed$1((function() {
        return s.formData.code
      })),
      f = function() {
        return !(!u.validatePhone(s.formData.phone) || !u.validateEmail(s.formData.phone)) || (a.uniUtil.showToast("请输入正确的电话号码或者邮箱"), !1)
      },
      d = function() {
        var r = o(n().mark((function r(o) {
          var a, u, c;
          return n().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                return r.next = 2, i.apiVipcodeExchange(o);
              case 2:
                200 === r.sent.code && (a = "恭喜您已成功兑换", u = "返回我的", c = t.index.getStorageSync("userInfo").isAbnormal, m.isAuthentication() || (a = "您的账号暂未实名认证，建议您尽快完成认证。", u = "去认证", s.isAbnormal = 1), null != c && null != c && "" != c && 1 == c && (a = "您的认证信息存在异常，建议您尽快完成修改。", u = "去认证", s.isAbnormal = 1), e.value.confirm({
                  title: a,
                  message: "兑换成功",
                  confirmButtonText: u,
                  cancelButtonText: "继续兑换"
                }).then((function() {
                  1 === s.isAbnormal ? t.index.redirectTo({
                    url: "/pages/mine/user/certifyInfo"
                  }) : t.index.switchTab({
                    url: "/pages/mine/mine"
                  })
                })).catch((function() {
                  s.formData.code = ""
                })));
              case 4:
              case "end":
                return r.stop()
            }
          }), r)
        })));
        return function(e) {
          return r.apply(this, arguments)
        }
      }();
    return t.onBeforeUnmount((function() {
      clearInterval(s.timer)
    })), r(r({}, t.toRefs(s)), {}, {
      confirmModalRef: e,
      showNext: c,
      canSubmit: l,
      sendCode: function() {
        s.formData.phone ? (f(), s.times > 0 || (s.times = 60, clearTimeout(s.timer), s.timer = setInterval((function() {
          s.times > 0 && s.times--
        }), 1e3))) : t.index.showToast({
          title: "请先输入手机号码",
          icon: "error"
        })
      },
      checkFormValid: f,
      handleConfirm: function() {
        var e = {
          orderSource: 3,
          orderType: 3,
          payMethods: [256],
          chkParentAuth: 1,
          buyItemInfos: [{
            orgId: 35,
            companyId: 2,
            voucherList: [{
              sysVoucherNo: s.formData.code,
              voucherDetailNo: s.formData.code
            }]
          }],
          applyType: 1
        };
        d(e)
      }
    })
  }
});
Array || (t.resolveComponent("uni-forms-item") + t.resolveComponent("uni-forms") + t.resolveComponent("confirm-modal"))();
Math || (function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var c = t._export_sfc(s, [
  ["render", function(r, n, o, i, a, u) {
    return {
      a: r.formData.code,
      b: t.o((function(e) {
        return r.formData.code = e.detail.value
      })),
      c: t.p({
        label: "兑换码核销",
        name: "code",
        labelWidth: "200px"
      }),
      d: !r.canSubmit,
      e: t.o((function() {
        return r.handleConfirm && r.handleConfirm.apply(r, arguments)
      })),
      f: t.sr("formRef", "4f38a6f0-0"),
      g: t.p(e({
        modelValue: r.formData,
        validateTrigger: "blur"
      }, "label-position", "top")),
      h: t.sr("confirmModalRef", "4f38a6f0-2")
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/vipCode/vipCode.vue"]
]);
wx.createPage(c);