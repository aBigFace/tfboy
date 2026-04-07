var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = t.defineComponent({
    name: "messageOfficalDetail",
    setup: function() {
      var a = t.reactive({
        msgData: {
          title: "",
          createTime: "",
          content: ""
        }
      });
      t.onLoad((function(e) {
        t.index.getStorageInfoSync, a.msgData = t.index.getStorageSync("officalMsg")
      }));
      return e(e({}, t.toRefs(a)), {}, {
        formatRichText: function(e) {
          return e && e.replace(/<img[^>]*>/gi, (function(e, t) {
            return e.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "")
          })).replace(/\<img/gi, '<img style="width:100%;"')
        }
      })
    }
  });
var r = t._export_sfc(a, [
  ["render", function(e, a, r, i, c, n) {
    return {
      a: t.t(e.msgData.title),
      b: t.t(e.msgData.createTime),
      c: e.formatRichText(e.msgData.content)
    }
  }],
  ["__scopeId", "data-v-7b6bccd8"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/msg/messageOfficalDetail.vue"]
]);
wx.createPage(r);