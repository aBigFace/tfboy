var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../common/vendor.js"),
  t = require("../../../apis/user.js"),
  i = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../utils/commonEnum.js");
var r = n.defineComponent({
  name: "vipChange",
  components: {},
  setup: function() {
    var r = n.reactive({
      changeContent: "",
      isRead: !1
    });
    n.onLoad((function(e) {
      i.isNotEmpty(e.changeContent) && (r.changeContent = e.changeContent + "")
    }));
    return e(e({}, n.toRefs(r)), {}, {
      handleDoChange: function() {
        t.apiDoChangeSubject().then((function(e) {
          200 === e.code && (n.index.showToast({
            title: "会员转换成功"
          }), setTimeout((function() {
            n.index.switchTab({
              url: "/pages/mine/mine"
            })
          }), 2e3))
        }))
      }
    })
  }
});
var o = n._export_sfc(r, [
  ["render", function(e, t, i, r, o, a) {
    return {
      a: e.changeContent,
      b: n.o((function(n) {
        return e.isRead = !e.isRead
      })),
      c: e.isRead,
      d: e.isRead ? "" : 1,
      e: !e.isRead,
      f: n.o((function() {
        return e.handleDoChange && e.handleDoChange.apply(e, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/vip/vipChange.vue"]
]);
wx.createPage(o);