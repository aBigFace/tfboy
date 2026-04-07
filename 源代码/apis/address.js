var e = require("../utils/http.js");
exports.apiAddAddress = function(t) {
  return e.http({
    url: "gis/book/add",
    method: "POST",
    data: t,
    header: {
      loading: !0
    }
  })
}, exports.apiDelAddress = function(t) {
  return e.http({
    url: "gis/book/del?id=".concat(t),
    method: "POST",
    header: {
      loading: !0
    }
  })
}, exports.apiEditAddress = function(t) {
  return e.http({
    url: "gis/book/edit",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiEditSaleAfterReceiver = function(t) {
  return e.http({
    url: "sale-order/saleAfterManager/edit/receiver",
    method: "POST",
    data: t
  })
}, exports.apiGetAddressList = function(t) {
  return e.http({
    url: "gis/book/pageQuery",
    method: "POST",
    data: t
  })
}, exports.apiGetCityAreaList = function() {
  return e.http({
    url: "gis/region/getRegionInfo?type=1",
    method: "get"
  })
}, exports.apiGetDefaultAddress = function() {
  return e.http({
    url: "gis/book/getDefault",
    method: "POST"
  })
}, exports.apiGetGisAddress = function(t) {
  return e.http({
    url: "gis/gis/getAddress",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetRegionVersion = function() {
  return e.http({
    url: "gis/region/getRegionVersion",
    method: "get"
  })
}, exports.apiSmartAddress = function(t) {
  return e.http({
    url: "gis/region/personInfoAndAddress?srcStr=".concat(t),
    method: "POST",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};