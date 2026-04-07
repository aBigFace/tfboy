var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = require("../../../apis/evaluation.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var i = t.defineComponent({
  name: "evaluationDetail",
  setup: function() {
    var i = t.reactive({
      userInfo: {
        headPortrait: "",
        nickName: "",
        phone: ""
      },
      evaluationDetail: {
        nickName: "",
        headPortrait: "",
        content: "",
        fileList: [],
        score: 0,
        evaluateTime: ""
      },
      id: "",
      videoBgUrl: ""
    });
    t.onLoad((function(e) {
      e.id && (i.id = e.id, i.userInfo = t.index.getStorageSync("userInfo"), n())
    }));
    var n = function() {
        a.apiGetEvaluationDetail(i.id).then((function(e) {
          i.evaluationDetail = e.data;
          for (var t = 0; t < i.evaluationDetail.fileList.length; t++) 1 == i.evaluationDetail.fileList[t].subType && (i.videoBgUrl = i.evaluationDetail.fileList[t].filePath)
        }))
      },
      o = t.toRefs(i);
    return e({
      getCurrentEvaluationDetail: n,
      goBackOrder: function() {
        t.index.navigateTo({
          url: "/pages/order/myOrder/list"
        })
      },
      playVideo: function(e) {
        t.index.navigateTo({
          url: "/pages/videoPlay/videoPlay?src=".concat(e)
        })
      },
      watchImg: function(e) {
        t.index.previewImage({
          current: 0,
          urls: [e]
        })
      }
    }, o)
  }
});
var n = t._export_sfc(i, [
  ["render", function(e, a, i, n, o, r) {
    return t.e({
      a: e.evaluationDetail.headPortrait,
      b: t.t(e.evaluationDetail.nickName),
      c: t.t(e.evaluationDetail.evaluateTime),
      d: t.f(e.evaluationDetail.score, (function(e, t, a) {
        return {
          a: t
        }
      })),
      e: e.$static + "/static/image/mine/xing@2x.png",
      f: t.t(e.evaluationDetail.content),
      g: t.f(e.evaluationDetail.fileList, (function(a, i, n) {
        return t.e({
          a: 0 == a.type && 0 == a.subType
        }, 0 == a.type && 0 == a.subType ? {
          b: a.filePath,
          c: t.o((function(t) {
            return e.watchImg(a.filePath)
          }))
        } : {}, {
          d: 1 == a.type
        }, 1 == a.type ? {
          e: t.o((function(t) {
            return e.playVideo(a.filePath)
          })),
          f: e.$static + "/static/image/mine/icon_play@2x.png",
          g: "url(" + e.videoBgUrl + ") no-repeat"
        } : {}, {
          h: i
        })
      })),
      h: e.evaluationDetail.replyContent
    }, e.evaluationDetail.replyContent ? {
      i: t.t(e.evaluationDetail.replyContent)
    } : {}, {
      j: e.evaluationDetail.skuName
    }, e.evaluationDetail.skuName ? {
      k: t.t(e.evaluationDetail.skuName)
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/evaluation/evaluationDetail.vue"]
]);
wx.createPage(n);