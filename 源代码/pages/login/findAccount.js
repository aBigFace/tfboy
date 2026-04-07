var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/slicedToArray"),
  r = require("../../common/vendor.js"),
  i = require("../../utils/util.js"),
  t = require("../../apis/user.js");
require("../../utils/commonEnum.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var a = r.defineComponent({
  name: "findAccount",
  methods: {
    openArguments: i.openArguments
  },
  setup: function() {
    var a = r.reactive({
      canCommit: !0,
      idNum: "",
      certifyType: 1,
      realName: "",
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
      agree: !1,
      idCardType: "",
      isPick: !1,
      tipStr: "请填写您的身份证号码"
    });
    r.watch((function() {
      return [a.realName, a.idNum, a.agree]
    }), (function(e) {
      var r = n(e, 3),
        i = r[0],
        t = r[1],
        c = r[2];
      console.log(i, t, c), a.canCommit = !(i && t && c)
    })), r.onLoad((function(e) {}));
    var c = r.computed$1((function() {
      var e = "";
      return a.certifyTypeList.forEach((function(n) {
        n.type === a.certifyType && (e = n.label)
      })), e
    }));
    return e(e({}, r.toRefs(a)), {}, {
      changeCertifyType: function(e) {
        a.certifyType = parseInt(e.detail.value)
      },
      handleAgree: function() {
        a.agree = !a.agree
      },
      handleSubmit: function() {
        if (i.isEmpty(a.realName) || i.isEmpty(a.idNum) || i.isEmpty(a.agree)) r.index.showToast({
          title: "请输入正确信息",
          icon: "error",
          duration: 500
        });
        else {
          var e = a.certifyType,
            n = {
              realName: a.realName,
              idCardType: e,
              idCard: a.idNum
            };
          console.info(n), t.apiFindByIdV3(n).then((function(e) {
            if (200 == e.code)
              if (null == e.data.records || 0 == e.data.records.length || 1 == e.data.records.length) {
                var n = "",
                  t = "";
                1 == e.data.records.length && (n = i.EncryptPhone(e.data.records[0].phone), t = i.EncryptEmail(e.data.records[0].email)), r.index.navigateTo({
                  url: "/pages/login/findAccountResult?email=".concat(t, "&phone=").concat(n)
                })
              } else r.index.navigateTo({
                url: "/pages/login/findAccountResultMore?realName=".concat(a.realName, "&idCardType=").concat(a.certifyType, "&idCard=").concat(a.idNum)
              })
          }))
        }
      },
      certifyText: c,
      handlePick: function() {
        a.isPick = !a.isPick
      },
      handlePickerType: function(e) {
        switch (a.certifyType = e, e) {
          case 1:
            a.tipStr = "请填写您的身份证号码";
            break;
          case 2:
            a.tipStr = "请填写您的护照号码";
            break;
          case 3:
            a.tipStr = "请填写您的港澳台&外国人-通行证/居住证/居留证号码";
            break;
          default:
            a.tipStr = "请填写您的身份证号码"
        }
      },
      openRule: function() {
        i.openArguments("yinsi.png")
      },
      openService: function() {
        i.openArguments("xieyi.png")
      }
    })
  }
});
var c = r._export_sfc(a, [
  ["render", function(e, n, i, t, a, c) {
    return {
      a: e.realName,
      b: r.o((function(n) {
        return e.realName = n.detail.value
      })),
      c: r.t(e.certifyText),
      d: r.n(e.isPick ? "picker-show-cur" : "picker-hidden-cur"),
      e: r.f(e.certifyTypeList, (function(n, i, t) {
        return {
          a: r.t(n.label),
          b: n,
          c: r.o((function(r) {
            return e.handlePickerType(n.type)
          }))
        }
      })),
      f: e.isPick,
      g: r.n(e.isPick ? "picker-show" : ""),
      h: r.o((function() {
        return e.handlePick && e.handlePick.apply(e, arguments)
      })),
      i: e.tipStr,
      j: e.idNum,
      k: r.o((function(n) {
        return e.idNum = n.detail.value
      })),
      l: r.o((function() {
        return e.openService && e.openService.apply(e, arguments)
      })),
      m: r.o((function() {
        return e.openRule && e.openRule.apply(e, arguments)
      })),
      n: r.o((function(n) {
        return e.openArguments("shiming.png")
      })),
      o: e.agree,
      p: r.o((function() {
        return e.handleAgree && e.handleAgree.apply(e, arguments)
      })),
      q: r.n(e.canCommit ? "no-can-commit" : "can-commit"),
      r: e.canCommit,
      s: r.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/findAccount.vue"]
]);
wx.createPage(c);