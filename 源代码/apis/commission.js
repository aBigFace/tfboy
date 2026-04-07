var t = require("../utils/http.js");
exports.apiGetDealersDetail = function() {
  return t.http({
    url: "distribution/puller/detail",
    method: "post"
  })
};