var t = require("../utils/http.js");
exports.apiGetCouponList = function(e) {
  return t.http({
    url: "market/marketVoucher/voucherAvailableList",
    method: "POST",
    data: e
  })
}, exports.apiGetOrderCount = function() {
  return t.http({
    url: "sale-order/saleAfterManager/userOrderCount",
    method: "post"
  })
}, exports.apiGetSelectGoods = function(e) {
  return t.http({
    url: "goods/goodsSpu/pageListForShopMall",
    method: "post",
    data: e
  })
}, exports.apiGetShelvesBySpuCode = function(e) {
  return t.http({
    url: "goods/shelves/getShelvesBySpuCode",
    method: "post",
    data: e,
    header: {
      hideGlobalError: !0
    }
  })
}, exports.apiListGoodsInfoByActivityIds = function(e) {
  return t.http({
    url: "market/marketBookingActivity/mobile/listGoodsInfoByActivityIds",
    method: "POST",
    data: e,
    header: {
      hideLoading: !0
    }
  })
};