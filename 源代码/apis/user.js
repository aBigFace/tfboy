var e = require("../utils/http.js");
exports.apiAuthReadAllMessage = function() {
  return e.http({
    url: "message/authorityMessage/readAllMessage?sendType=1",
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiAuthValid = function(t) {
  return e.http({
    url: "member-v2/login/authValid",
    method: "POST",
    data: t
  })
}, exports.apiAuthViewMsgValid = function(t) {
  return e.http({
    url: "member-v2/my/authViewMsgValid",
    method: "POST",
    data: t
  })
}, exports.apiBeforeBind = function(t) {
  return e.http({
    url: "member-v2/my/beforeBind",
    method: "post",
    data: t
  })
}, exports.apiBeforeForgetPassword = function(t) {
  return e.http({
    url: "member-v2/my/beforeForgetPassword",
    method: "post",
    data: t
  })
}, exports.apiCertifyParent = function(t) {
  return e.http({
    url: "member-v2/my/msgValid",
    method: "POST",
    data: t
  })
}, exports.apiCheckCodeRepetitive = function(t) {
  return e.http({
    url: "member-v2/my/checkCodeRepetitive",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiDoChangeSubject = function() {
  return e.http({
    url: "member-v2/interact/changeMemberSubject",
    method: "post",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiEditUser = function(t) {
  return e.http({
    url: "member-v2/my/edit",
    method: "POST",
    data: t
  })
}, exports.apiFindByIdV3 = function(t) {
  return e.http({
    url: "member-v2/my/findByIdV3",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiForgetPassword = function(t) {
  return e.http({
    url: "user/user/forgetPassword",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetAppletBind = function(t, r, o) {
  return e.http({
    url: "member-v2/login/appletBind?openId=".concat(t, "&unionId=").concat(r, "&wxNickName=").concat(o),
    method: "get",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetAppletUnBind = function() {
  return e.http({
    url: "member-v2/login/appletUnBind",
    method: "get",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetPublicKey = function() {
  return e.http({
    url: "out-api/auth/login/getPublicKey",
    method: "GET"
  })
}, exports.apiGetSubjectPayDisabled = function() {
  return e.http({
    url: "points/subjectPayDisabled/getSubjectPayDisabled",
    method: "get",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetSurplus = function() {
  return e.http({
    url: "member-v2/surplus/getSurplus",
    method: "GET"
  })
}, exports.apiGetSurplusRecord = function(t) {
  return e.http({
    url: "member-v2/surplus/getSurplusRecord",
    method: "POST",
    data: t
  })
}, exports.apiGetUserInfo = function() {
  return e.http({
    url: "member-v2/my/personal",
    method: "POST"
  })
}, exports.apiGetVersion = function() {
  return e.http({
    url: "file/appVersion/getNewVersion?oldVersion=9.9.9&platform=1",
    method: "get",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetVipChangeSetting = function() {
  return e.http({
    url: "dict/dict/dictList/vipChangeSetting",
    method: "get",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetVipListApi = function() {
  return e.http({
    url: "member-v2/subject/getSubjectNameList",
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetVipOpenApi = function(t) {
  return e.http({
    url: "member-v2/query/getMemberSubjectActual?id=".concat(t),
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetVipPayApi = function(t) {
  return e.http({
    url: "goods/shelves/getMemberSkuByProject/".concat(t, "?applyType=1"),
    method: "GET"
  })
}, exports.apiGiveSurplus = function(t) {
  return e.http({
    url: "member-v2/surplus/giveSurplus",
    method: "POST",
    data: t
  })
}, exports.apiGiveSurplusRecord = function(t) {
  return e.http({
    url: "member-v2/surplus/giveSurplusRecord",
    method: "POST",
    data: t
  })
}, exports.apiIsAllowedAuth = function() {
  return e.http({
    url: "member-v2/my/isAllowedAuthV3",
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiLogoutAccount = function() {
  return e.http({
    url: "user/user/userCancel",
    method: "post"
  })
}, exports.apiMemberReadAllMessage = function() {
  return e.http({
    url: "message/memberMessage/readAllMessage",
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiModifyPassword = function(t) {
  return e.http({
    url: "user/user/modifyPassword",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiModifyloginPassword = function(t) {
  return e.http({
    url: "user/user/matchPwd?password=".concat(t.password),
    method: "get"
  })
}, exports.apiOrderReadAllMessage = function() {
  return e.http({
    url: "message/orderMessage/readAllMessage",
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiPayPwdSet = function(t) {
  return e.http({
    url: "member-v2/my/payPwdSet",
    method: "POST",
    data: t
  })
}, exports.apiRealName = function(t) {
  return e.http({
    url: "member-v2/my/authV3",
    method: "POST",
    data: t
  })
}, exports.apiResetMobile = function(t) {
  return e.http({
    url: "member-v2/my/bind",
    method: "post",
    data: t
  })
}, exports.apiSendCode = function(t) {
  return e.http({
    url: "message/validCode/msgSend",
    method: "POST",
    data: t
  })
}, exports.apiSendMsg = function(t) {
  return e.http({
    url: "message/validCode/send",
    method: "POST",
    data: t
  })
}, exports.apiUploadFile = function(t) {
  return e.http({
    url: "file/fileManager/getImportFileUrl",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0,
      uploadFile: !0
    }
  })
}, exports.apiUserAccountLogin = function(t) {
  return e.http({
    url: "out-api/auth/oauth/token?grant_type=".concat(t.grant_type, "&username=").concat(t.username, "&client_id=tf&client_secret=123&password=").concat(t.password, "&loginPlatform=2"),
    method: "post",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiUserCancel = function(t) {
  return e.http({
    url: "member-v2/my/cancel",
    method: "POST",
    data: t,
    header: {
      hideLoading: !0
    }
  })
}, exports.apiUserLogin = function(t) {
  return e.http({
    url: "out-api/auth/oauth/token?grant_type=wx_open_id&code=".concat(t.code, "&unionId=").concat(t.unionId, "&openId=").concat(t.openId, "&client_id=tf&client_secret=123&type=1&loginPlatform=2"),
    method: "post",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiUserRegister = function(t) {
  return e.http({
    url: "member-v2/login/register",
    method: "post",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiValidPayPwd = function(t) {
  return e.http({
    url: "member-v2/my/validPayPwd",
    method: "POST",
    data: t
  })
}, exports.apiVipcodeExchange = function(t) {
  return e.http({
    url: "place-order/mallOrder/placeOrder",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiWxLoginByCode = function(t) {
  return e.http({
    url: "member-v2/login/wxLogin?code=".concat(t, "&type=1"),
    method: "get",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};