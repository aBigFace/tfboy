var e = require("../../../@babel/runtime/helpers/defineProperty"),
  n = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  a = require("../../../utils/uniUtil.js"),
  i = require("../../../utils/validate.js"),
  u = require("../../../apis/user.js"),
  l = require("../../../common/common.js"),
  m = require("../../../utils/commonEnum.js");
require("../../../common/app-theme.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js");
var c = t.defineComponent({
  name: "myBalance",
  components: {
    confirmModal: function() {
      return "./modal/confirm-modal.js"
    }
  },
  setup: function() {
    var e = t.ref(),
      c = t.ref(null),
      s = t.ref(60),
      f = t.reactive({
        formData: {
          memberId: "",
          give: "",
          phone: "",
          codeNum: ""
        },
        surplus: 0,
        enable: !1,
        timer: null,
        logicLock: !1,
        rules: {
          codeNum: {
            rules: [{
              required: !0,
              errorMessage: "请填写转赠数值"
            }, {
              validateFunction: function(e, n, r, o) {
                /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(n) || o("最多两位小数，请重新填写")
              }
            }]
          }
        }
      }),
      p = t.computed$1((function() {
        if (f.formData.codeNum) return !(!f.formData.phone && 11 != f.formData.phone.length)
      }));
    t.watch(s, (function(e, n) {
      0 === e && (f.logicLock = !1, clearInterval(f.timer), f.timer = null)
    }));
    var d = t.computed$1((function() {
      var e = f.formData,
        n = e.memberId,
        r = e.give,
        o = e.phone,
        t = e.codeNum;
      return n && r && o && t
    }));
    t.onLoad((function(e) {
      g()
    }));
    var h = function() {
        var e = o(r().mark((function e() {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (f.formData.phone) {
                  e.next = 3;
                  break
                }
                return t.index.showToast({
                  title: "请先输入手机号码或者邮箱",
                  icon: "error"
                }), e.abrupt("return");
              case 3:
                b(), l.debounce((function() {
                  var e = {
                    type: f.formData.phone.indexOf("@") > -1 ? 2 : 1,
                    validType: m.EValidType.sunflowerGift,
                    code: f.formData.phone
                  };
                  u.apiSendCode(e).then((function(e) {
                    200 === e.code && (t.index.showToast({
                      title: "发送验证码成功"
                    }), f.logicLock = !0, v())
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
      v = function() {
        s.value = 60, f.timer = setInterval((function() {
          s.value -= 1
        }), 1e3)
      },
      b = function() {
        if (f.formData.phone.indexOf("@") > -1) {
          if (!i.validateEmail(f.formData.phone)) return a.uniUtil.showToast("请输入正确邮箱"), !1
        } else if (!i.validatePhone(f.formData.phone)) return a.uniUtil.showToast("请输入正确的电话号码"), !1;
        return !!/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(f.formData.give) || (a.uniUtil.showToast("最多两位小数，请重新填写"), !1)
      },
      g = function() {
        u.apiGetSurplus().then((function(e) {
          f.surplus = e.data.surplus, f.enable = e.data.enable
        }))
      };
    return t.onBeforeUnmount((function() {
      f.timer && (clearInterval(f.timer), f.timer = null)
    })), n(n({
      formRef: e
    }, t.toRefs(f)), {}, {
      confirmModalRef: c,
      countdownNumber: s,
      showNext: p,
      canSubmit: d,
      sendCode: h,
      checkFormValid: b,
      handleConfirm: function() {
        if (f.enable) {
          if (!b()) return !1;
          var e = f.formData,
            n = e.memberId,
            r = e.give,
            o = e.phone,
            i = {
              surplusCent: r,
              memberIdOrName: n,
              validCode: e.codeNum
            };
          f.formData.phone.indexOf("@") > -1 ? i.mail = o : i.phone = o, u.apiGiveSurplus(JSON.stringify(i)).then((function(e) {
            200 == e.code ? (g(), f.formData = {
              memberId: "",
              give: "",
              phone: "",
              codeNum: ""
            }, c.value.confirm({
              title: "您转赠的小葵花已送至TA的账户",
              message: "转赠成功",
              confirmButtonText: "继续转赠",
              cancelButtonText: "返回我的"
            }).then((function() {})).catch((function() {
              t.index.navigateBack({})
            }))) : a.uniUtil.showToast(e.message, {
              icon: "none"
            })
          }))
        } else c.value.confirm({
          title: "暂无法转赠",
          message: "抱歉，小葵花转增功能未开启",
          cancelButtonText: "返回我的"
        }).then((function() {
          t.index.navigateBack({})
        }))
      },
      getSurplus: g,
      accessAndUse: function() {
        t.index.navigateTo({
          url: "/pages/mine/myBalance/balanceDetail"
        })
      },
      ruleSpecification: function() {
        t.index.navigateTo({
          url: "/pages/mine/myBalance/ruleSpecification"
        })
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
var s = t._export_sfc(c, [
  ["render", function(n, r, o, a, i, u) {
    return t.e({
      a: t.t(n.surplus),
      b: t.o((function() {
        return n.accessAndUse && n.accessAndUse.apply(n, arguments)
      })),
      c: n.formData.memberId,
      d: t.o((function(e) {
        return n.formData.memberId = e.detail.value
      })),
      e: t.p({
        label: "转赠给TA",
        name: "memberId",
        labelWidth: "200px"
      }),
      f: n.formData.give,
      g: t.o((function(e) {
        return n.formData.give = e.detail.value
      })),
      h: t.p({
        label: "赠送值",
        name: "give",
        labelWidth: "200px"
      }),
      i: n.formData.phone,
      j: t.o((function(e) {
        return n.formData.phone = e.detail.value
      })),
      k: t.p({
        label: "您的手机号/邮箱",
        name: "phone",
        labelWidth: "200px"
      }),
      l: n.formData.codeNum,
      m: t.o((function(e) {
        return n.formData.codeNum = e.detail.value
      })),
      n: !n.logicLock
    }, n.logicLock ? {
      p: t.t(n.countdownNumber)
    } : {
      o: t.o((function() {
        return n.sendCode && n.sendCode.apply(n, arguments)
      }))
    }, {
      q: t.p({
        label: "验证码",
        name: "codeNum",
        labelWidth: "200px"
      }),
      r: !n.canSubmit,
      s: t.o((function() {
        return n.handleConfirm && n.handleConfirm.apply(n, arguments)
      })),
      t: t.o((function() {
        return n.ruleSpecification && n.ruleSpecification.apply(n, arguments)
      })),
      v: t.sr("formRef", "a3c322d8-0"),
      w: t.p(e({
        modelValue: n.formData,
        validateTrigger: "blur",
        rules: n.rules
      }, "label-position", "top")),
      x: t.sr("confirmModalRef", "a3c322d8-5")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myBalance/myBalance.vue"]
]);
wx.createPage(s);