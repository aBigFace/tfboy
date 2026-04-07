var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  i = r.defineComponent({
    name: "problemDescription",
    setup: function() {
      var i = r.reactive({
        pictureUrlList: [],
        videoUrl: "",
        videoSenderEmail: "",
        buyerRemark: "",
        videoBgUrl: ""
      });
      r.onLoad((function(e) {
        console.log(e), e.buyerRemark && (i.buyerRemark = e.buyerRemark, i.videoSenderEmail = e.videoSenderEmail);
        var r = getApp().globalData.afterSaleUpload,
          l = r.videoUrl,
          t = r.pictureUrlList;
        console.log(t), l && (i.videoUrl = l, null != t && t.length > 0 && (i.videoBgUrl = t[0], t.splice(0, 1))), i.pictureUrlList = t
      }));
      return e(e({}, r.toRefs(i)), {}, {
        playVideo: function(e) {
          r.index.navigateTo({
            url: "/pages/videoPlay/videoPlay?src=".concat(e)
          })
        },
        watchImg: function() {
          r.index.previewImage({
            current: 0,
            urls: i.pictureUrlList
          })
        }
      })
    }
  });
var l = r._export_sfc(i, [
  ["render", function(e, i, l, t, n, o) {
    return r.e({
      a: r.t(e.buyerRemark),
      b: null != e.pictureUrlList && "" != e.pictureUrlList && null != e.pictureUrlList && e.pictureUrlList.length > 0
    }, null != e.pictureUrlList && "" != e.pictureUrlList && null != e.pictureUrlList && e.pictureUrlList.length > 0 ? r.e({
      c: r.f(e.pictureUrlList, (function(e, r, i) {
        return {
          a: e,
          b: r
        }
      })),
      d: r.o((function() {
        return e.watchImg && e.watchImg.apply(e, arguments)
      })),
      e: e.videoUrl
    }, e.videoUrl ? {
      f: r.o((function(r) {
        return e.playVideo(e.videoUrl)
      })),
      g: e.$static + "/static/image/mine/icon_play@2x.png",
      h: "url(" + e.videoBgUrl + ") no-repeat"
    } : {}) : {}, {
      i: null != e.videoSenderEmail && "null" != e.videoSenderEmail && "" != e.videoSenderEmail
    }, null != e.videoSenderEmail && "null" != e.videoSenderEmail && "" != e.videoSenderEmail ? {
      j: r.t("视频发送邮箱: " + e.videoSenderEmail)
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterSale/problemDescription.vue"]
]);
wx.createPage(l);