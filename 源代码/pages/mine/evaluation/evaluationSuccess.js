var e = require("../../../common/vendor.js"),
  n = e.defineComponent({
    name: "evaluation",
    setup: function() {
      return {
        goBackOrder: function() {
          e.index.navigateTo({
            url: "/pages/order/myOrder/list"
          })
        },
        continueEvaluation: function() {
          e.index.navigateTo({
            url: "/pages/mine/evaluation/evaluation"
          })
        },
        evaluationBtn: function() {
          e.index.navigateTo({
            url: "/pages/mine/evaluation/evaluation"
          })
        }
      }
    }
  });
var a = e._export_sfc(n, [
  ["render", function(n, a, t, i, o, r) {
    return {
      a: n.$static + "/static/image/mine/evaluation-success@2x.png",
      b: e.o((function() {
        return n.goBackOrder && n.goBackOrder.apply(n, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/evaluation/evaluationSuccess.vue"]
]);
wx.createPage(a);