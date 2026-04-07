var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../common/vendor.js"),
  o = require("../../../utils/util.js"),
  t = require("../../../utils/commonEnum.js"),
  r = n.defineComponent({
    name: "changePayPassword",
    components: {
      realNamePopup: function() {
        return "../../order/components/realNamePopup.js"
      }
    },
    setup: function() {
      var r = n.ref(),
        a = n.ref(),
        i = n.reactive({
          phone: "",
          email: ""
        });
      n.onShow((function() {
        i.phone = n.index.getStorageSync("userInfo").phone, i.email = n.index.getStorageSync("userInfo").email
      }));
      return e(e({}, n.toRefs(i)), {}, {
        forgotPopupRef: r,
        realNamePopupRef: a,
        checkIdentity: function(e) {
          if (!o.isAuthentication()) return a.value.handleOpen();
          n.index.navigateTo({
            url: "/pages/mine/setting/personVerify?checkMethod=".concat(e, "&validType=").concat(t.EValidType.rebind)
          })
        },
        handleRemember: function() {
          n.index.navigateTo({
            url: "/pages/mine/setting/setPayPass?checkMethod=remember&fromPage=setting"
          })
        },
        handleClose: function() {
          r.value.close()
        },
        handleNotRemember: function() {
          r.value.open()
        }
      })
    }
  });
Array || (n.resolveComponent("uni-icons") + n.resolveComponent("uni-popup") + n.resolveComponent("realNamePopup"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var a = n._export_sfc(r, [
  ["render", function(e, o, t, r, a, i) {
    return n.e({
      a: e.$static + "/static/image/mine/payPassWord@2x.png",
      b: e.phone
    }, e.phone ? {
      c: n.t(e.$filters.encryptPhone(e.phone))
    } : {
      d: n.t(e.$filters.encryptPhone(e.email))
    }, {
      e: n.o((function() {
        return e.handleNotRemember && e.handleNotRemember.apply(e, arguments)
      })),
      f: n.o((function() {
        return e.handleRemember && e.handleRemember.apply(e, arguments)
      })),
      g: n.o(e.handleClose),
      h: n.p({
        type: "closeempty",
        color: "#666"
      }),
      i: e.phone
    }, e.phone ? {
      j: n.o((function(n) {
        return e.checkIdentity("noRememberPhone")
      }))
    } : {}, {
      k: e.email
    }, e.email ? {
      l: n.o((function(n) {
        return e.checkIdentity("noRememberEmail")
      }))
    } : {}, {
      m: n.sr("forgotPopupRef", "30aa205c-0"),
      n: n.p({
        type: "bottom"
      }),
      o: n.sr("realNamePopupRef", "30aa205c-2")
    })
  }],
  ["__scopeId", "data-v-30aa205c"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/setting/changePayPassword.vue"]
]);
wx.createPage(a);