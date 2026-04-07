var t = require("../utils/http.js");
exports.apiPageListForShopMall = function(o) {
  return t.http({
    url: "goods/goodsSpu/pageListForShopMall",
    method: "POST",
    data: o,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};