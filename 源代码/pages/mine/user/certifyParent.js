var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../../common/vendor.js"),
  t = require("../../../apis/user.js"),
  i = require("../../../utils/util.js"),
  o = require("../../../common/common.js"),
  u = require("../../../utils/uniUtil.js"),
  d = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js");
var s = r.defineComponent({
  methods: {
    openArguments: i.openArguments
  },
  setup: function() {
    var s = r.reactive({
        agree: !1,
        formData: {
          guardianUser: "",
          guardianPhone: "",
          guardianIdCard: "",
          validCode: ""
        },
        isSend: !1,
        count: 60,
        isOnlyName: ""
      }),
      c = 0,
      m = {
        memberId: "",
        realName: "",
        certificateType: 0,
        certificateCode: "",
        phone: ""
      };
    r.onLoad((function(e) {
      m.realName = e.name, m.certificateCode = e.code, m.certificateType = parseInt(e.type), m.phone = e.phone, s.isOnlyName = e.isOnlyName || ""
    }));
    var l = r.computed$1((function() {
        return s.agree && !i.isEmpty(s.formData.guardianIdCard) && !i.isEmpty(s.formData.guardianPhone) && !i.isEmpty(s.formData.guardianUser) && !i.isEmpty(s.formData.validCode)
      })),
      f = r.computed$1((function() {
        return s.isSend ? "".concat(s.count, "s重新获取") : "获取验证码"
      }));
    return e(e({}, r.toRefs(s)), {}, {
      handleAgree: function() {
        s.agree = !s.agree
      },
      canCommit: l,
      handleSubmit: function() {
        var e, o, d, c = r.index.getStorageSync("userInfo"),
          l = s.formData.guardianIdCard;
        if (!i.isEmpty(l) && parseInt(i.analyzeIDCardToAge(l)) - parseInt(i.analyzeIDCardToAge(m.certificateCode)) < 20) r.index.showToast({
          title: "家长证件号认证条件必须大于20岁",
          duration: 500,
          icon: "none"
        });
        else if (parseInt(i.analyzeIDCardToAge(l)) >= 150) r.index.showToast({
          title: "请输入正确的证件号",
          icon: "none",
          duration: 500
        });
        else {
          var f = s.formData,
            p = f.guardianUser,
            g = f.guardianPhone,
            h = f.guardianIdCard;
          console.log(s.formData), console.log(null == c ? void 0 : c.infoOther), m.realName ? t.apiCertifyParent(s.formData).then((function(e) {
            if (s.isOnlyName) {
              r.index.setStorageSync("chkParentAuth ", 1);
              var i = r.index.getStorageSync("userInfo");
              i.infoOther = s.formData, i.auth = 1, i.isAbnormal = 0, r.index.setStorageSync("userInfo", i), r.index.showToast({
                title: "认证成功",
                icon: "success",
                duration: 800
              }), setTimeout((function() {
                r.index.navigateBack()
              }), 1e3)
            } else t.apiRealName(m).then(function() {
              var e = a(n().mark((function e(a) {
                var i, o;
                return n().wrap((function(e) {
                  for (;;) switch (e.prev = e.next) {
                    case 0:
                      if (200 != a.code) {
                        e.next = 24;
                        break
                      }(i = r.index.getStorageSync("userInfo")).idCardType = m.certificateType, i.realName = m.realName, e.t0 = m.certificateType, e.next = 1 === e.t0 ? 7 : 2 === e.t0 ? 9 : 3 === e.t0 ? 11 : 13;
                      break;
                    case 7:
                      return i.idCard = m.certificateCode, e.abrupt("break", 13);
                    case 9:
                      return i.passport = m.certificateCode, e.abrupt("break", 13);
                    case 11:
                      return i.hmPasser = m.certificateCode, e.abrupt("break", 13);
                    case 13:
                      return i.infoOther = s.formData, i.auth = 1, e.next = 17, t.apiGetUserInfo();
                    case 17:
                      o = e.sent, i.isAbnormal = o.data.isAbnormal, i.abnormalMsgV3 = o.data.abnormalMsgV3, r.index.setStorageSync("userInfo", i), r.index.setStorageSync("chkParentAuth ", 1), r.index.showToast({
                        title: "认证成功",
                        icon: "success",
                        duration: 800
                      }), setTimeout((function() {
                        r.index.navigateBack()
                      }), 1e3);
                    case 24:
                    case "end":
                      return e.stop()
                  }
                }), e)
              })));
              return function(n) {
                return e.apply(this, arguments)
              }
            }())
          })) : p === (null == (e = null == c ? void 0 : c.infoOther) ? void 0 : e.guardianUser) && h === (null == (o = null == c ? void 0 : c.infoOther) ? void 0 : o.guardianIdCard) && g === (null == (d = null == c ? void 0 : c.infoOther) ? void 0 : d.guardianPhone) ? (r.index.setStorageSync("parentAuthByBuy", s.formData.validCode), setTimeout((function() {
            r.index.navigateBack()
          }), 1e3)) : u.uniUtil.showToast("信息填写错误")
        }
      },
      openArguments: i.openArguments,
      sendCode: function() {
        o.debounce((function() {
          if ("" !== s.formData.guardianPhone)
            if (s.formData.guardianPhone != m.phone) {
              if (!s.isSend) {
                c && clearInterval(c);
                var e = {
                  code: s.formData.guardianPhone,
                  type: 1,
                  validType: d.EValidType.guardian
                };
                t.apiSendMsg(e).then((function(e) {
                  200 == e.code && (s.isSend = !0, c = setInterval((function() {
                    s.count = s.count - 1, 0 == s.count && (s.count = 60, s.isSend = !1, clearInterval(c))
                  }), 1e3))
                }))
              }
            } else r.index.showToast({
              title: "家长手机号不能与您的手机号一致哦",
              duration: 500,
              icon: "none"
            });
          else r.index.showToast({
            icon: "none",
            title: "请输入手机号码",
            duration: 500
          })
        }))
      },
      sendTip: f
    })
  }
});
var c = r._export_sfc(s, [
  ["render", function(e, n, a, t, i, o) {
    return {
      a: e.formData.guardianUser,
      b: r.o(r.m((function(n) {
        return e.formData.guardianUser = n.detail.value
      }), {
        trim: !0
      })),
      c: e.formData.guardianIdCard,
      d: r.o(r.m((function(n) {
        return e.formData.guardianIdCard = n.detail.value
      }), {
        trim: !0
      })),
      e: e.formData.guardianPhone,
      f: r.o(r.m((function(n) {
        return e.formData.guardianPhone = n.detail.value
      }), {
        trim: !0
      })),
      g: e.formData.validCode,
      h: r.o(r.m((function(n) {
        return e.formData.validCode = n.detail.value
      }), {
        trim: !0
      })),
      i: r.t(e.sendTip),
      j: r.n(e.isSend ? "certify-code-send" : "certify-code-no-send"),
      k: r.o((function() {
        return e.sendCode && e.sendCode.apply(e, arguments)
      })),
      l: r.o((function(n) {
        return e.openArguments("shiming.png")
      })),
      m: e.agree,
      n: r.o((function() {
        return e.handleAgree && e.handleAgree.apply(e, arguments)
      })),
      o: r.n(e.canCommit ? "can-commit" : "no-can-commit"),
      p: !e.canCommit,
      q: r.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-36222b46"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/user/certifyParent.vue"]
]);
wx.createPage(c);