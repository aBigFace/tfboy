var e = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../common/vendor.js"),
  t = require("./rollingNotice.js"),
  r = {
    name: "c_rollingNotice",
    components: {},
    props: {
      formData: {
        type: Object,
        default: function() {
          return JSON.parse(JSON.stringify(t.defaultrollingNoticeData))
        }
      }
    },
    setup: function(t) {
      var r = o.toRefs(t).formData,
        n = o.reactive({
          showFlag: !0
        });
      return o.onShow((function() {
        n.showFlag = !1, setTimeout((function() {
          n.showFlag = !0
        }), 300)
      })), e({
        formData: r
      }, o.toRefs(n))
    }
  };
Array || o.resolveComponent("uni-notice-bar")();
Math;
var n = o._export_sfc(r, [
  ["render", function(e, t, r, n, a, c) {
    return o.e({
      a: e.showFlag
    }, e.showFlag ? {
      b: o.p({
        scrollable: !0,
        speed: 100,
        color: "#999999",
        backgroundColor: "#F5F5F5",
        text: n.formData.inputInfo
      })
    } : {})
  }],
  ["__scopeId", "data-v-12f7e2ea"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_rollingNotice.vue"]
]);
wx.createComponent(n);