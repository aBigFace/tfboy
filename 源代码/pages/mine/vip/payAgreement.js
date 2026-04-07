var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  n = t.defineComponent({
    name: "payAgreement",
    setup: function() {
      var n = t.reactive({
        show: !1,
        agreeInfo: "暂未确定",
        subjectId: "",
        subjectLogo: "",
        subjectName: "",
        termDay: "",
        img: ""
      });
      t.onLoad((function(e) {
        e.subjectId && (t.index.showLoading({
          title: "请稍等",
          mask: !0
        }), t.index.getImageInfo({
          src: "https://tfapk.tfent.cn/mobile/web/webImg/" + e.img,
          success: function(o) {
            n.subjectId = e.subjectId, n.subjectLogo = e.subjectLogo, n.subjectName = e.subjectName, n.termDay = e.termDay, n.img = o.path, n.show = !0, t.index.hideLoading()
          },
          fail: function(e) {
            console.log(e), t.index.showToast({
              title: "网络不佳",
              icon: "none",
              duration: 1500
            }), t.index.hideLoading()
          }
        }))
      }));
      return e(e({}, t.toRefs(n)), {}, {
        goPayVip: function() {
          t.index.redirectTo({
            url: "/pages/mine/vip/payMain?subjectId=".concat(n.subjectId, "&subjectLogo=").concat(n.subjectLogo, "&subjectName=").concat(n.subjectName, "&termDay=").concat(n.termDay)
          })
        },
        handleCancel: function() {
          t.index.navigateBack()
        }
      })
    }
  });
var o = t._export_sfc(n, [
  ["render", function(e, n, o, a, c, i) {
    return t.e({
      a: e.show
    }, e.show ? {
      b: e.img
    } : {}, {
      c: e.show
    }, e.show ? {
      d: t.o((function() {
        return e.handleCancel && e.handleCancel.apply(e, arguments)
      })),
      e: t.o((function() {
        return e.goPayVip && e.goPayVip.apply(e, arguments)
      }))
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/vip/payAgreement.vue"]
]);
wx.createPage(o);