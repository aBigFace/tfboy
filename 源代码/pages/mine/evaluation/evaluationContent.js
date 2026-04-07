var t = require("../../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  i = require("../../../common/vendor.js"),
  a = require("../../../utils/uniUtil.js"),
  o = require("../../../apis/user.js"),
  r = require("../../../apis/evaluation.js");
require("../../../common/app-theme.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var s = i.defineComponent({
  name: "evaluationContent",
  setup: function() {
    var s = i.getCurrentInstance().proxy,
      u = i.reactive({
        goodsInfo: {
          imageUrl: "",
          spuName: "",
          skuName: "",
          num: 1,
          originalPrice: ""
        },
        multiShow: !0,
        stars: [{
          id: 0,
          status: !0
        }, {
          id: 1,
          status: !0
        }, {
          id: 2,
          status: !0
        }, {
          id: 3,
          status: !0
        }, {
          id: 4,
          status: !0
        }],
        score: 4,
        scoreText: ["非常差", "差", "一般", "好", "非常好"],
        remnant: 0,
        content: "",
        fileList: [],
        id: ""
      }),
      c = i.computed$1((function() {
        return Boolean(u.content)
      }));
    i.onLoad((function(t) {
      var e = getApp();
      u.goodsInfo = e.globalData.evaluationGoodsInfo, t.id && (u.id = t.id)
    }));
    var l = i.toRefs(u),
      f = function() {
        var t = n(e().mark((function t() {
          return e().wrap((function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                i.index.chooseMedia({
                  count: 1,
                  mediaType: ["image", "video"],
                  sourceType: ["album", "camera"],
                  maxDuration: 10,
                  camera: "back",
                  success: function(t) {
                    if ("video" == t.type) {
                      if (1 == u.fileList.filter((function(t) {
                          return 1 == t.type
                        })).length) return void a.uniUtil.showToast("最多可上传一个视频")
                    } else if (6 == u.fileList.filter((function(t) {
                        return 0 == t.type
                      })).length) return void a.uniUtil.showToast("最多可上传6张照片");
                    o.apiUploadFile({
                      filePath: t.tempFiles[0].tempFilePath
                    }).then((function(e) {
                      u.fileList.push({
                        filePath: e.data,
                        type: "image" == t.type ? 0 : 1
                      })
                    }))
                  }
                });
              case 1:
              case "end":
                return t.stop()
            }
          }), t)
        })));
        return function() {
          return t.apply(this, arguments)
        }
      }();
    return t(t({}, l), {}, {
      showButton: c,
      selectRight: function(t) {
        if (0 != t && (u.stars[t].status = !u.stars[t].status), u.stars[t].status)
          for (var e = 0; e < t; e++) u.stars[e].status = !0;
        else
          for (var n = t; n < u.stars.length; n++) u.stars[n].status = !1;
        for (var i = 0; i < u.stars.length; i++) u.stars[i].status && (u.score = i)
      },
      descInput: function(t) {
        console.log(t.detail.value);
        var e = t.detail.value.length;
        u.remnant = 200 - e
      },
      ifShowArea: function(t) {
        var e = "yes" == t.currentTarget.dataset.show;
        u.multiShow = e || e
      },
      getCurrentGoods: function() {
        r.apiGetEvaluationDetail(u.id).then((function(t) {
          u.goodsInfo = t.data
        })).catch((function() {})).finally((function() {}))
      },
      uploadImg: f,
      deleteImage: function(t) {
        u.fileList.splice(t, 1)
      },
      playVideo: function(t) {
        i.index.navigateTo({
          url: "/pages/videoPlay/videoPlay?src=".concat(t)
        })
      },
      handleConfirm: function() {
        var t = JSON.parse(JSON.stringify(u.fileList));
        u.fileList.forEach((function(e) {
          1 == e.type && t.push({
            filePath: s.$videoBg,
            type: 0,
            subType: 1
          })
        }));
        var e = {
          content: u.content,
          fileList: t,
          id: u.id,
          score: u.score + 1
        };
        r.apiSaveEvaluation(e).then((function(t) {
          200 == t.code && i.index.redirectTo({
            url: "/pages/mine/evaluation/evaluationSuccess"
          })
        }))
      }
    })
  }
});
var u = i._export_sfc(s, [
  ["render", function(t, e, n, a, o, r) {
    return i.e({
      a: t.goodsInfo.imageUrl,
      b: i.t(t.goodsInfo.saleName),
      c: i.t(t.goodsInfo.num),
      d: i.t(t.goodsInfo.skuName),
      e: i.t(t.goodsInfo.originalPrice),
      f: i.f(t.stars, (function(e, n, a) {
        return {
          a: e.status ? t.$static + "/static/image/mine/star_red@2x.png" : t.$static + "/static/image/mine/star_gray@2x.png",
          b: i.o((function(e) {
            return t.selectRight(n)
          }))
        }
      })),
      g: i.t(t.scoreText[t.score]),
      h: !t.multiShow
    }, t.multiShow ? {} : {
      i: i.o([function(e) {
        return t.content = e.detail.value
      }, function() {
        return t.descInput && t.descInput.apply(t, arguments)
      }]),
      j: i.o((function() {
        return t.ifShowArea && t.ifShowArea.apply(t, arguments)
      })),
      k: t.content
    }, {
      l: t.multiShow
    }, t.multiShow ? {
      m: i.t(t.content),
      n: i.t(t.multiShow && !t.content.length ? "描述下您对此商品的感受吧～" : ""),
      o: i.o((function() {
        return t.ifShowArea && t.ifShowArea.apply(t, arguments)
      }))
    } : {}, {
      p: i.t(t.remnant),
      q: i.f(t.fileList, (function(e, n, a) {
        return i.e({
          a: 0 == e.type
        }, 0 == e.type ? {
          b: e.filePath,
          c: i.o((function(e) {
            return t.deleteImage(n)
          })),
          d: t.$static + "/static/image/afterSale/delete.png"
        } : {}, {
          e: 1 == e.type
        }, 1 == e.type ? {
          f: i.o((function(n) {
            return t.playVideo(e.filePath)
          })),
          g: t.$static + "/static/image/mine/icon_play@2x.png",
          h: i.o((function(e) {
            return t.deleteImage(n)
          })),
          i: t.$static + "/static/image/afterSale/delete.png"
        } : {}, {
          j: n
        })
      })),
      r: t.fileList.length < 7
    }, t.fileList.length < 7 ? {
      s: t.$static + "/static/image/mine/icon_upload2x.png",
      t: i.o((function(e) {
        return t.uploadImg()
      }))
    } : {}, {
      v: t.showButton || "#FFC6C6" ? 1 : "",
      w: !t.showButton,
      x: i.o((function() {
        return t.handleConfirm && t.handleConfirm.apply(t, arguments)
      }))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/evaluation/evaluationContent.vue"]
]);
wx.createPage(u);