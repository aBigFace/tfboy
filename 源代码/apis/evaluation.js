var t = require("../utils/http.js");
exports.apiGetEvaluationDetail = function(o) {
  return t.http({
    url: "goods/evaluationRecord/findDetailById/".concat(o),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiGetEvaluationList = function(o) {
  return t.http({
    url: "goods/evaluationProduct/findPage",
    method: "post",
    data: o,
    header: {
      hideGlobalError: !0
    }
  })
}, exports.apiGetEvaluationRecord = function(o) {
  return t.http({
    url: "goods/evaluationRecord/countForUser?status=".concat(o),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiGetGoodsEvaluationList = function(o) {
  return t.http({
    url: "goods/evaluationRecord/findPage",
    method: "post",
    data: o,
    header: {
      hideLoading: !0
    }
  })
}, exports.apiSaveEvaluation = function(o) {
  return t.http({
    url: "goods/evaluationRecord/save",
    method: "post",
    data: o,
    header: {
      hideGlobalError: !0
    }
  })
};