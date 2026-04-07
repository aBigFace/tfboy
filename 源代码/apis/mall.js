var t = require("../utils/http.js");
exports.apiAddViewNum = function(e) {
  return t.http({
    url: "social/contentApp/addViewNum?contentId=".concat(e),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiGetAdList = function(e) {
  return t.http({
    url: "mall/mobile/mall/getAdList?adType=".concat(e.adType, "&url=").concat(e.url, "&applyTo=1&urlParams=").concat(e.urlParams),
    method: "GET",
    params: e,
    header: {
      hideLoading: !0
    }
  })
}, exports.apiGetContent = function(e) {
  return t.http({
    url: "social/contentApp/getContent?id=".concat(e),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiGetOpenPage = function(e) {
  return t.http({
    url: "mall/mobile/openPage/-1/".concat(e, "/35/1"),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiReadState = function(e) {
  return t.http({
    url: "mall/mallEjectAdUser/readState?id=".concat(e),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
};