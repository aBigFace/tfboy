var e = require("../../../@babel/runtime/helpers/defineProperty"),
  a = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../common/vendor.js"),
  i = require("../../../utils/uniUtil.js"),
  o = require("../../../utils/commonEnum.js");
require("../../../common/app-theme.js");
var c = r.defineComponent({
  name: "personVerify",
  setup: function() {
    var e = r.reactive({
        nameLabel: "您的姓名",
        idCardLabel: "您的证件号",
        namePlaceholder: "请填写您的真实姓名",
        idPlaceholder: "请填写您的证件号",
        isPick: !1,
        certifyType: 1,
        certifyTypeList: [{
          label: "中国居民身份证",
          type: 1
        }, {
          label: "护照号",
          type: 2
        }, {
          label: "港澳台&外国人-通行证/居住证/居留证",
          type: 3
        }],
        tipStr: "请填写您的身份证号码",
        formData: {
          name: "",
          type: 1,
          codeNum: ""
        },
        validType: 0,
        checkMethod: "",
        times: 0,
        phone: ""
      }),
      c = r.ref();
    r.onLoad((function(a) {
      e.validType = Number(a.validType), e.checkMethod = a.checkMethod, e.validType === o.EValidType.guardian && (e.nameLabel = "家长姓名", e.idCardLabel = "家长证件号", e.namePlaceholder = "请填写家长真实姓名", e.idPlaceholder = "请填写家长身份证号码")
    }));
    var l = r.computed$1((function() {
        var a = e.formData,
          t = a.name,
          n = a.codeNum;
        return t && n
      })),
      u = function() {
        var a = n(t().mark((function a() {
          var n, c, l, u;
          return t().wrap((function(a) {
            for (;;) switch (a.prev = a.next) {
              case 0:
                n = e.formData, c = n.codeNum, l = n.name, u = r.index.getStorageSync("userInfo"), "changeRememberPhone" === e.checkMethod || "changeRememberEmail" === e.checkMethod ? e.validType === o.EValidType.guardian ? l === u.infoOther.guardianUser && c === u.infoOther.guardianIdCard ? r.index.navigateTo({
                  url: "/pages/mine/setting/resetParentMobile?validType=".concat(e.validType)
                }) : i.uniUtil.showToast("信息填写错误") : l !== u.realName || c !== u.idCard && c !== u.hmPasser && c !== u.passport ? i.uniUtil.showToast("信息填写错误") : "changeRememberEmail" === e.checkMethod ? r.index.redirectTo({
                  url: "/pages/mine/setting/emailSetting?validType=".concat(o.EValidType.changeTelEmail, "&name=").concat(e.formData.name, "&type=").concat(e.certifyType, "&codeNum=").concat(e.formData.codeNum)
                }) : r.index.redirectTo({
                  url: "/pages/mine/setting/resetMobile?validType=".concat(o.EValidType.changeTelEmail, "&name=").concat(e.formData.name, "&type=").concat(e.certifyType, "&codeNum=").concat(e.formData.codeNum)
                }) : "noRememberPhone" !== e.checkMethod && "noRememberEmail" !== e.checkMethod || (l !== u.realName || c !== u.idCard && c !== u.hmPasser && c !== u.passport ? i.uniUtil.showToast("信息填写错误") : r.index.redirectTo({
                  url: "/pages/mine/setting/changeMobile?checkMethod=".concat(e.checkMethod, "&validType=").concat(o.EValidType.rebind, "&name=").concat(e.formData.name, "&type=").concat(e.certifyType, "&codeNum=").concat(e.formData.codeNum)
                }));
              case 3:
              case "end":
                return a.stop()
            }
          }), a)
        })));
        return function() {
          return a.apply(this, arguments)
        }
      }(),
      d = r.computed$1((function() {
        var a = "";
        return e.certifyTypeList.forEach((function(t) {
          t.type === e.certifyType && (a = t.label)
        })), a
      }));
    return a(a({}, r.toRefs(e)), {}, {
      handlePick: function() {
        e.isPick = !e.isPick
      },
      EValidType: o.EValidType,
      handleSubmit: u,
      certifyText: d,
      handlePickerType: function(a) {
        switch (e.certifyType = a, a) {
          case 1:
            e.tipStr = "请填写您的身份证号码";
            break;
          case 2:
            e.tipStr = "请填写您的护照号码";
            break;
          case 3:
            e.tipStr = "请填写您的港澳台&外国人-通行证/居住证/居留证号码";
            break;
          default:
            e.tipStr = "请填写您的身份证号码"
        }
      },
      formRef: c,
      canSubmit: l,
      validIsCard: function(a, t) {
        var n = e.formData,
          o = n.codeNum,
          c = n.name,
          l = r.index.getStorageSync("userInfo");
        switch (e.certifyType) {
          case 1:
            c === l.realName && o === l.idCard ? r.index.navigateTo({
              url: "".concat(a, "?validType=").concat(t)
            }) : i.uniUtil.showToast("信息填写错误");
            break;
          case 2:
            c === l.realName && o === l.passport ? r.index.navigateTo({
              url: "".concat(a, "?validType=").concat(t)
            }) : i.uniUtil.showToast("信息填写错误");
            break;
          case 3:
            c === l.realName && o === l.hmPasser ? r.index.navigateTo({
              url: "".concat(a, "?validType=").concat(t)
            }) : i.uniUtil.showToast("信息填写错误")
        }
      }
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
var l = r._export_sfc(c, [
  ["render", function(a, t, n, i, o, c) {
    return r.e({
      a: r.sr("mobile", "792dfb75-2,792dfb75-1"),
      b: r.o((function(e) {
        return a.formData.name = e
      })),
      c: r.p({
        inputBorder: !0,
        clearable: !1,
        type: "text",
        placeholderStyle: "font-size :28rpx",
        placeholder: a.namePlaceholder,
        modelValue: a.formData.name
      }),
      d: r.p({
        label: a.nameLabel,
        labelWidth: "200px"
      }),
      e: a.validType !== a.EValidType.guardian
    }, a.validType !== a.EValidType.guardian ? {
      f: r.t(a.certifyText),
      g: r.n(a.isPick ? "picker-show-cur" : "picker-hidden-cur"),
      h: r.f(a.certifyTypeList, (function(e, t, n) {
        return {
          a: r.t(e.label),
          b: t,
          c: r.o((function(t) {
            return a.handlePickerType(e.type)
          }))
        }
      })),
      i: a.isPick,
      j: r.n(a.isPick ? "picker-show" : ""),
      k: r.o((function() {
        return a.handlePick && a.handlePick.apply(a, arguments)
      }))
    } : {}, {
      l: a.tipStr,
      m: a.formData.codeNum,
      n: r.o((function(e) {
        return a.formData.codeNum = e.detail.value
      })),
      o: r.p({
        label: a.idCardLabel,
        labelWidth: "200px"
      }),
      p: r.sr("formRef", "792dfb75-0"),
      q: r.p(e({
        modelValue: a.formData,
        validateTrigger: "blur"
      }, "label-position", "top")),
      r: !a.canSubmit,
      s: r.o((function() {
        return a.handleSubmit && a.handleSubmit.apply(a, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-792dfb75"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/personVerify.vue"]
]);
wx.createPage(l);