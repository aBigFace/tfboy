var e = require("../../@babel/runtime/helpers/defineProperty"),
  a = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../common/vendor.js"),
  o = require("../../common/constant.js"),
  n = require("../../apis/evaluation.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var r = t.defineComponent({
  name: "evaluationDetail",
  components: {
    noData: function() {
      return "../../components/no-data.js"
    }
  },
  setup: function() {
    var e = t.reactive({
      userInfo: {
        headPortrait: "",
        nickName: "",
        phone: ""
      },
      searchParam: {
        spuCode: "",
        soCompanyId: "",
        status: 1,
        pageNum: 1,
        pageSize: 10,
        sysCode: "tf"
      },
      pullRefresh: !1,
      loadMoreStatus: o.LoadMoreStatus.noMore,
      evaluationDetailList: [],
      spuCode: "",
      companyId: ""
    });
    t.onLoad((function(a) {
      a.spuCode && (e.spuCode = a.spuCode, e.companyId = a.companyId, e.userInfo = t.index.getStorageSync("userInfo"), r())
    })), t.onPullDownRefresh((function() {
      e.searchParam.pageNum = 1, e.pullRefresh = !0, r()
    })), t.onReachBottom((function() {
      e.loadMoreStatus === o.LoadMoreStatus.more && (e.searchParam.pageNum++, r())
    }));
    var r = function() {
      e.searchParam = {
        spuCode: e.spuCode,
        soCompanyId: e.companyId,
        status: 1,
        pageNum: e.searchParam.pageNum,
        pageSize: 10,
        sysCode: "tf"
      }, e.loadMoreStatus = o.LoadMoreStatus.loading, n.apiGetGoodsEvaluationList(e.searchParam).then((function(a) {
        var t = a.data.records;
        e.evaluationDetailList = 1 === e.searchParam.pageNum ? t : e.evaluationDetailList.concat(t), e.loadMoreStatus = t.length < e.searchParam.pageSize ? o.LoadMoreStatus.noMore : o.LoadMoreStatus.more
      })).catch((function() {
        e.loadMoreStatus = o.LoadMoreStatus.noMore
      })).finally((function() {
        e.pullRefresh && t.index.stopPullDownRefresh()
      }))
    };
    return a({
      LoadMoreStatus: o.LoadMoreStatus,
      getCurrentEvaluationDetail: r,
      watchImg: function(e) {
        t.index.previewImage({
          current: 0,
          urls: [e]
        })
      },
      playVideo: function(e) {
        t.index.navigateTo({
          url: "/pages/videoPlay/videoPlay?src=".concat(e)
        })
      }
    }, t.toRefs(e))
  }
});
Array || (t.resolveComponent("no-data") + t.resolveComponent("uni-load-more"))();
Math;
var i = t._export_sfc(r, [
  ["render", function(a, o, n, r, i, u) {
    return t.e({
      a: a.evaluationDetailList.length
    }, a.evaluationDetailList.length ? {
      b: t.f(a.evaluationDetailList, (function(e, o, n) {
        return t.e({
          a: e.headPortrait,
          b: t.t(e.nickName),
          c: t.t(e.evaluateTime),
          d: t.f(e.score, (function(e, a, t) {
            return {
              a: a
            }
          })),
          e: t.t(e.content),
          f: t.f(e.fileList, (function(e, o, n) {
            return t.e({
              a: 0 == e.type && 0 == e.subType
            }, 0 == e.type && 0 == e.subType ? {
              b: e.filePath,
              c: t.o((function(t) {
                return a.watchImg(e.filePath)
              }))
            } : {}, {
              d: 1 == e.type
            }, 1 == e.type ? {
              e: t.o((function(t) {
                return a.playVideo(e.filePath)
              })),
              f: a.$static + "/static/image/mine/icon_play@2x.png"
            } : {}, {
              g: o
            })
          })),
          g: e.replyContent
        }, e.replyContent ? {
          h: t.t(e.replyContent)
        } : {}, {
          i: e.skuName
        }, e.skuName ? {
          j: t.t(e.saleName + "-" + e.skuName)
        } : {}, {
          k: o
        })
      })),
      c: a.$static + "/static/image/mine/xing@2x.png"
    } : {}, {
      d: a.loadMoreStatus === a.LoadMoreStatus.noMore && 0 === a.evaluationDetailList.length
    }, a.loadMoreStatus === a.LoadMoreStatus.noMore && 0 === a.evaluationDetailList.length ? {
      e: t.p(e(e({
        icon: a.$static + "/static/image/no-data/no-evaluation.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      f: t.p({
        status: a.loadMoreStatus
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/product/evaluationProduct.vue"]
]);
wx.createPage(i);