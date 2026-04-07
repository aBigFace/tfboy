var e = require("../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../common/vendor.js"),
  o = require("../../utils/util.js");
require("../../utils/commonEnum.js");
var n = i.defineComponent({
  name: "findAccountResult",
  methods: {},
  setup: function() {
    var n = i.reactive({
      phone: "",
      email: "",
      bindMsg: "未找到绑定的账号",
      msg: "建议您重新注册账号并完成实名认证",
      isReg: !0
    });
    i.onLoad((function(e) {
      n.phone = e.phone + "", n.email = e.email + "", o.isNotEmpty(n.phone) && o.isNotEmpty(n.email) ? (n.msg = "该账号已绑定手机和邮箱，建议您使用手机或邮箱登录", n.isReg = !1) : o.isNotEmpty(n.phone) ? (n.msg = "该账号已绑定手机，建议您使用手机号登陆", n.isReg = !1) : o.isNotEmpty(n.email) ? (n.msg = "该账号已绑定邮箱，建议您使用邮箱登陆", n.isReg = !1) : (n.msg = "建议您重新注册账号并完成实名认证", n.isReg = !0), console.info(n)
    }));
    return e(e({}, i.toRefs(n)), {}, {
      goReg: function() {
        i.index.redirectTo({
          url: "/pages/login/logon"
        })
      },
      goLogin: function() {
        i.index.redirectTo({
          url: "/pages/login/accountLogin"
        })
      }
    })
  }
});
var t = i._export_sfc(n, [
  ["render", function(e, o, n, t, s, g) {
    return i.e({
      a: i.t(e.msg),
      b: "" != e.phone
    }, "" != e.phone ? {
      c: i.t(e.phone)
    } : {}, {
      d: "" != e.email
    }, "" != e.email ? {
      e: i.t(e.email)
    } : {}, {
      f: e.isReg
    }, e.isReg ? {
      g: i.t(e.bindMsg)
    } : {}, {
      h: e.isReg
    }, e.isReg ? {
      i: i.o((function() {
        return e.goReg && e.goReg.apply(e, arguments)
      }))
    } : {}, {
      j: !e.isReg
    }, e.isReg ? {} : {
      k: i.o((function() {
        return e.goLogin && e.goLogin.apply(e, arguments)
      }))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/findAccountResult.vue"]
]);
wx.createPage(t);