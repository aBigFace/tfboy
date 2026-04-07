var e = require("../utils/http.js");
exports.apiGetMsgCount = function(t) {
  return e.http({
    url: "message/memberMessage/queryOrderMemberMessageCount/1",
    method: "GET",
    data: t
  })
}, exports.apiGetPostMsg = function(t) {
  return e.http({
    url: "message/orderMessage/queryPage",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiMembertMsg = function(t) {
  return e.http({
    url: "message/memberMessage/queryPage",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiOfficaltMsg = function(t) {
  return e.http({
    url: "message/authorityMessage/queryPage",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiReadPostOneMsg = function(t) {
  return e.http({
    url: "message/orderMessage/updateReasState",
    method: "POST",
    data: t
  })
}, exports.apireadOneOfficalMsg = function(t) {
  return e.http({
    url: "message/authorityMessage/updateReadState",
    method: "POST",
    data: t
  })
}, exports.apireadOneVipMsg = function(t) {
  return e.http({
    url: "message/memberMessage/updateReasState",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};