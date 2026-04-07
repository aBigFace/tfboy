var t = require("../utils/http.js");
exports.apiAddSubscribe = function(o) {
  return t.http({
    url: "goods/goodsSubscribe/addSubscribe",
    method: "POST",
    data: o
  })
}, exports.apiCollect = function(o) {
  return t.http({
    url: "social/comment/collect",
    method: "POST",
    data: o
  })
}, exports.apiGetCountForGoods = function(o) {
  return t.http({
    url: "goods/evaluationProduct/countForGoods",
    method: "POST",
    data: o
  })
}, exports.apiGetOkCollect = function(o) {
  return t.http({
    url: "social/comment/getOkCollect",
    method: "POST",
    data: o
  })
}, exports.apiGetProductDetail = function(o) {
  return t.http({
    url: "goods/shelves/getShelvesSku/".concat(o, "?applyType=1"),
    method: "GET"
  })
}, exports.apiGetProductDetailBySpuCode = function(o) {
  return t.http({
    url: "goods/shelves/getShelvesBySpuCode",
    method: "POST",
    data: o
  })
}, exports.apiGetSubscribeTotal = function(o) {
  return t.http({
    url: "goods/goodsSubscribe/getSubscribeTotal",
    method: "POST",
    data: o
  })
};