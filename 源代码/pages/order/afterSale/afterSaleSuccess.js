var e = require("../../../common/vendor.js"),
  r = require("../../../common/app-theme.js"),
  t = {
    name: "afterSaleSuccess",
    setup: function() {
      var t = e.reactive({
        afterOrderNo: ""
      });
      e.onLoad((function(e) {
        e.afterOrderNo && (t.afterOrderNo = e.afterOrderNo)
      }));
      return {
        AppTheme: r.AppTheme,
        goDetail: function() {
          e.index.navigateTo({
            url: "/pages/order/afterOrder/detail?afterOrderNo=".concat(t.afterOrderNo)
          })
        },
        goBackOrder: function() {
          for (var r = getCurrentPages(), t = [], a = r.length - 1; a >= 0; a--) t.push("/" + r[a].route);
          if (t.every((function(e) {
              if ("/pages/order/myOrder/list" != e) return !0
            }))) e.index.navigateTo({
            url: "/pages/order/myOrder/list"
          });
          else
            for (var o = r.length - 1; o >= 0; o--)
              if ("/" + r[o].route == "/pages/order/myOrder/list") return void e.index.navigateBack({
                delta: r.length - o - 1
              })
        }
      }
    }
  };
var a = e._export_sfc(t, [
  ["render", function(r, t, a, o, n, c) {
    return {
      a: r.$static + "/static/image/afterSale/success.png",
      b: e.o((function() {
        return o.goBackOrder && o.goBackOrder.apply(o, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterSale/afterSaleSuccess.vue"]
]);
wx.createPage(a);