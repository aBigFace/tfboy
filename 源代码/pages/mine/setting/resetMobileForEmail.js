var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  o = require("../../../common/vendor.js"),
  i = require("../../../apis/user.js"),
  a = require("../../../utils/validate.js"),
  u = require("../../../common/common.js"),
  l = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js");
var m = o.defineComponent({
  name: "resetMobileForEmail",
  setup: function() {
    var e = o.ref(60),
      m = o.reactive({
        formData: {
          mobile: "",
          codeNum: ""
        },
        logicLock: !1,
        setInterval: null,
        rules: {
          mobile: {
            rules: [{
              validateFunction: function(e, n, r, t) {
                return a.validatePhone(n) ? m.phone === n && t("新手机号与原手机号不能一致") : t("手机号不符合规范"), !0
              }
            }]
          }
        },
        times: 0,
        phone: "",
        validType: l.EValidType.changeMemberBind,
        checkMethod: "bindMobilePhone"
      }),
      s = o.computed$1((function() {
        var e = m.formData,
          n = e.mobile,
          r = e.codeNum;
        return n && r
      }));
    o.watch(e, (function(e, n) {
      0 === e && (m.logicLock = !1, clearInterval(m.setInterval), m.setInterval = null)
    })), o.onBeforeUnmount((function() {
      m.setInterval && (clearInterval(m.setInterval), m.setInterval = null)
    }));
    var c = o.ref(),
      p = o.ref();
    o.onLoad((function(e) {}));
    var d = function() {
        var e = t(r().mark((function e() {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return m.formData.mobile || o.index.showToast({
                  title: "请先输入手机号码",
                  icon: "error"
                }), e.next = 3, c.value.validate("mobile");
              case 3:
                e.sent.mobile && u.debounce((function() {
                  var e = {
                    type: 1,
                    validType: m.validType,
                    code: m.formData.mobile
                  };
                  i.apiSendMsg(e).then((function(e) {
                    200 === e.code && (o.index.showToast({
                      title: "发送验证码成功"
                    }), m.logicLock = !0, f())
                  }))
                }), 1e3);
              case 5:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      f = function() {
        e.value = 60, m.setInterval = setInterval((function() {
          e.value -= 1
        }), 1e3)
      },
      b = function() {
        var e = t(r().mark((function e() {
          var n, t;
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, c.value.validate("mobile");
              case 2:
                if (!e.sent.mobile) {
                  e.next = 9;
                  break
                }
                return n = {
                  bindType: 1,
                  checkType: 3,
                  bindCode: m.formData.mobile,
                  validCodeDTONew: {
                    code: m.formData.mobile,
                    type: 1,
                    validCode: m.formData.codeNum,
                    validType: l.EValidType.changeMemberBind
                  }
                }, e.next = 7, i.apiResetMobile(n);
              case 7:
                200 === e.sent.code && (m.formData = {
                  mobile: "",
                  codeNum: ""
                }, t = o.index.getStorageSync("fromType"), 1 === Number(t) ? (o.index.setStorageSync("fromType", ""), o.index.navigateTo({
                  url: "/pages/order/myOrder/list"
                })) : o.index.switchTab({
                  url: "/pages/mine/mine"
                }));
              case 9:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return n(n({}, o.toRefs(m)), {}, {
      handleSubmit: b,
      sendCode: d,
      countdownNumber: e,
      mobile: p,
      formRef: c,
      canSubmit: s,
      changeCountdownNumber: f,
      skip: function() {
        var e = o.index.getStorageSync("fromType");
        1 === Number(e) ? (o.index.setStorageSync("fromType", ""), o.index.navigateTo({
          url: "/pages/order/myOrder/list"
        })) : o.index.switchTab({
          url: "/pages/mine/mine"
        })
      }
    })
  }
});
Array || (o.resolveComponent("uni-forms-item") + o.resolveComponent("uni-easyinput") + o.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var s = o._export_sfc(m, [
  ["render", function(n, r, t, i, a, u) {
    return o.e({
      a: o.o((function() {
        return n.skip && n.skip.apply(n, arguments)
      })),
      b: o.p({
        label: "",
        name: "",
        labelWidth: "200px"
      }),
      c: o.sr("mobile", "b79b9766-3,b79b9766-2"),
      d: o.o((function(e) {
        return n.formData.mobile = e
      })),
      e: o.p({
        inputBorder: !0,
        clearable: !1,
        type: "text",
        placeholderStyle: "font-size :28rpx",
        placeholder: "请输入手机号码",
        maxlength: "11",
        modelValue: n.formData.mobile
      }),
      f: o.p({
        label: "",
        name: "mobile",
        labelWidth: "200px"
      }),
      g: !n.logicLock
    }, n.logicLock ? {
      i: o.t(n.countdownNumber)
    } : {
      h: o.o((function() {
        return n.sendCode && n.sendCode.apply(n, arguments)
      }))
    }, {
      j: o.o((function(e) {
        return n.formData.codeNum = e
      })),
      k: o.p({
        type: "text",
        trim: "all",
        placeholder: "请输入验证码",
        clearable: !1,
        maxlength: "6",
        modelValue: n.formData.codeNum
      }),
      l: o.p({
        label: "",
        labelWidth: "200px"
      }),
      m: o.sr("formRef", "b79b9766-0"),
      n: o.p(e({
        modelValue: n.formData,
        validateTrigger: "blur",
        rules: n.rules
      }, "label-position", "top")),
      o: !n.canSubmit,
      p: o.o((function() {
        return n.handleSubmit && n.handleSubmit.apply(n, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-b79b9766"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/resetMobileForEmail.vue"]
]);
wx.createPage(s);