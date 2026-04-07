var t = require("../utils/http.js");
exports.apiAddToCartTf = function(e) {
  return t.http({
    url: "mall/mallCart/addCart",
    method: "POST",
    data: e,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiDeleteProductTf = function(e) {
  return t.http({
    url: "mall/mallCart/deleteCart",
    method: "POST",
    data: e
  })
}, exports.apiGetCartGroupList = function(e) {
  return t.http({
    url: "mall/mallCart/getCartGroupList",
    method: "POST",
    data: e
  })
}, exports.apiGetCurrentInfo = function(e) {
  return t.http({
    url: "mall/mobile/onePageByUseType/".concat(e.companyId, "/").concat(e.useType, "/").concat(e.applyTo),
    method: "get"
  })
}, exports.apiGetProductDetail = function(e) {
  return t.http({
    url: "goods/shelves/getShelvesSku/".concat(e, "?applyType=1"),
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetProductPayType = function(e) {
  return t.http({
    url: "goods/shelves/getSkuListForPayType",
    method: "POST",
    data: e
  })
}, exports.apiUpdateCartTf = function(e) {
  return t.http({
    url: "mall/mallCart/updateCart",
    method: "POST",
    data: e,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};