var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  t = require("../../../apis/user.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var i = r.defineComponent({
  name: "ruleSpecification",
  components: {},
  setup: function() {
    var i = r.reactive({
      remark: ""
    });
    r.onLoad((function(e) {
      n()
    }));
    var n = function() {
      t.apiGetSurplus().then((function(e) {
        i.remark = e.data.remark
      }))
    };
    return e(e({}, r.toRefs(i)), {}, {
      getSurplus: n
    })
  }
});
var n = r._export_sfc(i, [
  ["render", function(e, r, t, i, n, a) {
    return {
      a: e.remark
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myBalance/ruleSpecification.vue"]
]);
wx.createPage(n);