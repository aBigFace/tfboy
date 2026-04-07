var t = require("../utils/http.js");
exports.apiGetCollectListRecord = function(e) {
  return t.http({
    url: "social/socialCollect/pageQuery",
    method: "post",
    data: e,
    header: {
      hideGlobalError: !0
    }
  })
};