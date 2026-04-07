var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  i = require("../../../apis/user.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var a = n.defineComponent({
  name: "changeSex",
  setup: function() {
    var a = n.getCurrentInstance().proxy,
      u = n.reactive({
        currentIndex: -1,
        infoList: [{
          id: 1,
          url: a.$static + "/static/image/mine/default_male_head.png",
          text: "男生"
        }, {
          id: 2,
          url: a.$static + "/static/image/mine/default_female_head.png",
          text: "女生"
        }]
      });
    n.onLoad((function(e) {
      u.currentIndex = Number(e.sex)
    }));
    var c = function() {
      var e = t(r().mark((function e() {
        return r().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, i.apiEditUser({
                sex: u.currentIndex
              });
            case 2:
              n.index.navigateBack({
                delta: 1
              }), n.index.showToast({
                title: "修改成功!"
              });
            case 4:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    return e(e({}, n.toRefs(u)), {}, {
      changeSex: function(e) {
        u.currentIndex = e.id
      },
      handleSubmit: c
    })
  }
});
var u = n._export_sfc(a, [
  ["render", function(e, r, t, i, a, u) {
    return {
      a: n.f(e.infoList, (function(r, t, i) {
        return {
          a: r.url,
          b: n.t(r.text),
          c: r.id === e.currentIndex,
          d: r.id === e.currentIndex ? 1 : "",
          e: t,
          f: n.n({
            active: r.id === e.currentIndex
          }),
          g: n.o((function(t) {
            return e.changeSex(r)
          }))
        }
      })),
      b: e.$static + "/static/image/mine/icon_pay_corner_gou@2x.png",
      c: n.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      }))
    }
  }],
  ["__scopeId", "data-v-0e9fccba"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/user/changeSex.vue"]
]);
wx.createPage(u);