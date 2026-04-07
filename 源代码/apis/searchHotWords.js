var t = require("../utils/http.js");
exports.apiGetProductList = function(e) {
  return t.http({
    header: {
      loading: !0,
      hideLoading: !0
    },
    url: "goods/salesClassInfo/appSelectGoodsList",
    method: "POST",
    data: e
  })
}, exports.apiGetProductTreeClass = function(e) {
  return t.http({
    url: "goods/salesClassInfo/appTreeClass",
    method: "POST",
    data: e
  })
}, exports.apiRemoveProductSearchList = function(e) {
  return t.http({
    url: "goods/proSearchRecords/remove",
    method: "post",
    data: e,
    header: {
      hideLoading: !0
    }
  })
};