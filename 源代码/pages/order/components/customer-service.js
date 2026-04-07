var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  n = r.defineComponent({
    name: "customerService",
    setup: function() {
      var n = r.reactive({});
      return e(e({}, r.toRefs(n)), {}, {
        goLinkService: function() {
          var e = r.index.getStorageSync("userInfo");
          (null == e ? void 0 : e.id) && r.index.navigateTo({
            url: "/pages/mine/service/service"
          })
        }
      })
    }
  });
var i = r._export_sfc(n, [
  ["render", function(e, n, i, t, o, c) {
    return {
      a: e.$static + "/static/image/mine/customer_service.png",
      b: r.o((function() {
        return e.goLinkService && e.goLinkService.apply(e, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/components/customer-service.vue"]
]);
wx.createComponent(i);