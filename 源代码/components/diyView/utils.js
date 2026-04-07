require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../common/vendor.js");
exports.goLink = function(n) {
  console.log(n, "goLink");
  var a = getApp().globalData.shopInfo.companyId;
  if (n.value) switch (n.type) {
    case 7:
      e.index.navigateTo({
        url: "/pages/outLink/outLink?outLinkSrc=".concat(encodeURIComponent(n.value))
      });
      break;
    case 4:
      e.index.navigateTo({
        url: "/pages/index/Ceefax?id=".concat(encodeURIComponent(n.value))
      });
      break;
    case 0:
      if (["pages/index/index", "pages/mine/mine", "pages/shop/tfShopCart"].includes(n.value)) e.index.switchTab({
        url: "/" + n.value
      });
      else if ("pages/mine/vip/openVip" === n.value) {
        var i = e.index.getStorageSync("userInfo");
        (null == i ? void 0 : i.id) ? e.index.navigateTo({
          url: "/".concat(n.value, "?id=").concat(i.id)
        }): e.index.showToast({
          title: "请先登陆后再尝试",
          icon: "none"
        })
      } else if ("pageService" === n.value) {
        var o = e.index.getStorageSync("userInfo");
        (null == o ? void 0 : o.id) ? e.index.navigateTo({
          url: "/pages/mine/service/service"
        }): e.index.showToast({
          title: "请先登陆后再尝试",
          icon: "none"
        })
      } else e.index.navigateTo({
        url: "/" + n.value
      });
      break;
    case 1:
      e.index.navigateTo({
        url: "/pages/product/detail?spuCode=".concat(n.value, "&companyId=").concat(a)
      })
  }
};