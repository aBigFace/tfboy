var e = require("../utils/http.js");
exports.apiGetConfigDetail = function(t) {
  return e.http({
    url: "mall/mobile/onePageByUseType/".concat(t.companyId, "/").concat(t.useType, "/1"),
    method: "get",
    header: {
      loading: !1,
      hideLoading: !0
    }
  })
}, exports.apiGetTreeClass = function(t) {
  return e.http({
    url: "goods/salesClassInfo/appTreeClass",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiRelationGoodsList = function(t) {
  return e.http({
    url: "goods/salesClassInfo/appRelationGoodsList",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};