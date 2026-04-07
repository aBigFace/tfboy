require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  i = require("../../../apis/user.js"),
  c = require("../../../utils/uniUtil.js"),
  a = require("../../../utils/util.js"),
  r = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var h = t.defineComponent({
  name: "changeMobile",
  setup: function() {
    var h = t.reactive({
      phone: "",
      email: "",
      auth: !1,
      validType: 0,
      checkMethod: "",
      pageTip: "",
      disabled: !1,
      parentInfo: {
        guardianPhone: ""
      },
      checkType: ""
    });
    t.onLoad((function(e) {
      h.checkMethod = e.checkMethod || "", h.pageTip = e.pageTip, h.validType = Number(e.validType), Number(e.validType) === r.EValidType.guardian && (h.parentInfo.guardianPhone = t.index.getStorageSync("userInfo").infoOther.guardianPhone)
    })), t.onShow((function() {
      switch (h.phone = t.index.getStorageSync("userInfo").phone, h.email = t.index.getStorageSync("userInfo").email, h.parentInfo.guardianPhone && (h.phone = h.parentInfo.guardianPhone), h.checkMethod) {
        case "loginAccount":
          t.index.setNavigationBarTitle({
            title: "注销账号"
          });
          break;
        case "changeRememberPhone":
          t.index.setNavigationBarTitle({
            title: "更改绑定手机"
          });
          break;
        case "noRememberEmail":
          t.index.setNavigationBarTitle({
            title: "邮箱验证"
          });
          break;
        case "noRememberPhone":
          t.index.setNavigationBarTitle({
            title: "手机验证"
          });
          break;
        case "changeRememberEmail":
          t.index.setNavigationBarTitle({
            title: "修改邮箱"
          })
      }
    }));
    var d = function() {
        var e = getCurrentPages(),
          n = e[e.length - 1].options,
          o = n.name,
          i = void 0 === o ? "" : o,
          c = n.type,
          a = void 0 === c ? "" : c,
          r = n.codeNum,
          d = void 0 === r ? "" : r,
          m = {
            type: ["noRememberPhone", "changeRememberPhone"].includes(h.checkMethod) ? 1 : 2,
            code: ["noRememberPhone", "changeRememberPhone"].includes(h.checkMethod) ? h.phone : h.email
          };
        "loginAccount" === h.checkMethod && (m.type = h.phone ? 1 : 2, m.code = h.phone || h.email), t.index.redirectTo({
          url: "/pages/mine/setting/msgCode?validType=".concat(h.validType, "&checkMethod=").concat(h.checkMethod, "&name=").concat(i, "&type=").concat(a, "&codeNum=").concat(d, "&codeType=").concat(m.type, "&tel=").concat(m.code)
        })
      },
      m = function() {
        var e = o(n().mark((function e() {
          var o;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return h.disabled = !0, o = {
                  type: ["noRememberPhone", "changeRememberPhone"].includes(h.checkMethod) ? 1 : 2,
                  validType: h.validType,
                  code: ["noRememberPhone", "changeRememberPhone"].includes(h.checkMethod) ? h.phone : h.email
                }, "loginAccount" === h.checkMethod && (o.type = h.phone ? 1 : 2, o.code = h.phone || h.email), e.next = 5, i.apiSendCode(o).then((function(e) {
                  200 == e.code ? (t.index.showToast({
                    title: "验证码已发送"
                  }), setTimeout((function() {
                    d()
                  }), 1e3)) : h.disabled = !1
                })).catch((function(e) {
                  h.disabled = !1
                }));
              case 5:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, t.toRefs(h)), {}, {
      handleGoPage: d,
      getCodeNum: m,
      goPersonVerify: function() {
        var e = t.index.getStorageSync("userInfo");
        1 == e.idCardType ? a.isEmpty(e.idCard) || (h.auth = !0) : 2 == e.idCardType ? a.isEmpty(e.passport) || (h.auth = !0) : 3 == e.idCardType && (a.isEmpty(e.hmPasser) || (h.auth = !0)), h.auth ? t.index.navigateTo({
          url: "/pages/mine/setting/personVerify?validType=".concat(h.validType, "&checkMethod=").concat(h.checkMethod)
        }) : c.uniUtil.showToast("未实名认证，请先去认证")
      },
      EValidType: r.EValidType
    })
  }
});
var d = t._export_sfc(h, [
  ["render", function(e, n, o, i, c, a) {
    return t.e({
      a: "loginAccount" == e.checkMethod && (e.phone || e.pageTip) || ["noRememberPhone", "changeRememberPhone"].includes(e.checkMethod)
    }, "loginAccount" == e.checkMethod && (e.phone || e.pageTip) || ["noRememberPhone", "changeRememberPhone"].includes(e.checkMethod) ? {
      b: e.$static + "/static/image/mine/changePhone@2x.png"
    } : {
      c: e.$static + "/static/image/mine/changeEmail@2x.png"
    }, {
      d: e.validType !== e.EValidType.guardian
    }, (e.validType, e.EValidType.guardian, {}), {
      e: "loginAccount" == e.checkMethod && (e.phone || e.pageTip) || ["noRememberPhone", "changeRememberPhone"].includes(e.checkMethod)
    }, "loginAccount" == e.checkMethod && (e.phone || e.pageTip) || ["noRememberPhone", "changeRememberPhone"].includes(e.checkMethod) ? {
      f: t.t(e.$filters.encryptPhone(e.phone))
    } : {
      g: t.t(e.$filters.encryptEmail(e.email))
    }, {
      h: t.t(e.phone && "loginAccount" == e.checkMethod || e.pageTip || ["noRememberPhone", "changeRememberPhone"].includes(e.checkMethod) ? "短信验证" : "邮箱验证"),
      i: e.disabled ? 1 : "",
      j: e.disabled,
      k: t.o((function() {
        return e.getCodeNum && e.getCodeNum.apply(e, arguments)
      })),
      l: "changeRememberPhone" == e.checkMethod || "changeRememberEmail" == e.checkMethod
    }, "changeRememberPhone" == e.checkMethod || "changeRememberEmail" == e.checkMethod ? t.e({
      m: "changeRememberPhone" == e.checkMethod
    }, (e.checkMethod, {}), {
      n: "changeRememberEmail" == e.checkMethod
    }, (e.checkMethod, {}), {
      o: t.o((function() {
        return e.goPersonVerify && e.goPersonVerify.apply(e, arguments)
      }))
    }) : {})
  }],
  ["__scopeId", "data-v-a0c26c8e"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/changeMobile.vue"]
]);
wx.createPage(d);