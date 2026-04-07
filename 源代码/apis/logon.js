var e = require("../utils/http.js");
exports.apiGetValidCode = function(t) {
  return e.http({
    url: "message/validCode/send",
    method: "POST",
    data: t,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};