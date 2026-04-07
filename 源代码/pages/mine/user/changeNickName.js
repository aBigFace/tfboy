var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  t = require("../../../apis/user.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var i = a.defineComponent({
  name: "changeNickName",
  setup: function() {
    var i = a.reactive({
      changeName: ""
    });
    a.onLoad((function(e) {
      i.changeName = e.name
    }));
    var u = a.computed$1((function() {
        return i.changeName
      })),
      c = function() {
        var e = r(n().mark((function e() {
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (/^[\u4e00-\u9fa5a-zA-Z0-9\_\@\#\&\——\-]{1,15}$/.test(i.changeName)) {
                  e.next = 4;
                  break
                }
                return a.index.showModal({
                  title: "温馨提示",
                  content: '昵称仅支持输入中英文、正整数,仅可输入"_、@、#、&、-"特殊符号'
                }), e.abrupt("return");
              case 4:
                return e.next = 6, t.apiEditUser({
                  nickName: i.changeName
                });
              case 6:
                a.index.navigateBack({
                  delta: 1
                }), a.index.showToast({
                  title: "修改昵称成功!"
                });
              case 8:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, a.toRefs(i)), {}, {
      canSubmit: u,
      handleSubmit: c
    })
  }
});
var u = a._export_sfc(i, [
  ["render", function(e, n, r, t, i, u) {
    return {
      a: e.changeName,
      b: a.o((function(n) {
        return e.changeName = n.detail.value
      })),
      c: a.n(e.canSubmit ? "can-submit" : "no-can-submit"),
      d: !e.canSubmit,
      e: a.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-776e262c"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/user/changeNickName.vue"]
]);
wx.createPage(u);