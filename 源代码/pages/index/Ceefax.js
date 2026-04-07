var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../common/vendor.js"),
  i = require("../../apis/mall.js"),
  n = require("../../apis/goods.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var o = {
  name: "Ceefax",
  setup: function() {
    var o = t.reactive({
      contentTitle: "",
      contentText: [],
      shopDateList: [],
      shopParams: {
        pageSize: 30,
        pageNum: 1,
        applyType: 1,
        spuCodes: []
      }
    });
    t.onLoad((function(e) {
      a(e.id), s(e.id)
    }));
    var a = function(e) {
        i.apiGetContent(e).then((function(e) {
          if (null == e ? void 0 : e.data) {
            o.contentText = JSON.parse(e.data.contentText), o.contentTitle = e.data.contentTitle;
            var t = [];
            o.contentText.forEach((function(e) {
              "spuCode" == e.type && t.push(e.text)
            })), o.shopParams.spuCodes = t, r(o.shopParams)
          }
        }))
      },
      r = function(e) {
        n.apiPageListForShopMall(e).then((function(e) {
          var t;
          o.shopDateList = (null == (t = null == e ? void 0 : e.data) ? void 0 : t.records) || [], o.contentText.forEach((function(e) {
            o.shopDateList.forEach((function(t) {
              e.text == t.spuCode && (e.imgUrl = t.imgUrl, e.saleName = t.saleName, e.sellPrice = t.sellPrice, e.id = t.goodsId)
            }))
          }))
        }))
      },
      s = function(e) {
        i.apiAddViewNum(e).then((function(e) {}))
      };
    return e(e({}, t.toRefs(o)), {}, {
      getContentDetail: a,
      addViewNum: s,
      goToDetail: function(e) {
        t.index.navigateTo({
          url: "/pages/product/detail?id=" + e.id
        })
      },
      formatRichText: function(e) {
        return e && e.replace(/<img[^>]*>/gi, (function(e, t) {
          return e.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "")
        })).replace(/\<img/gi, '<img style="max-width:100%;"')
      }
    })
  }
};
var a = t._export_sfc(o, [
  ["render", function(e, i, n, o, a, r) {
    return {
      a: t.f(e.contentText, (function(e, i, n) {
        return t.e({
          a: "html" == e.type
        }, "html" == e.type ? {
          b: o.formatRichText(e.text)
        } : {}, {
          c: "spuCode" == e.type && e.id
        }, "spuCode" == e.type && e.id ? {
          d: e.imgUrl,
          e: t.t(e.saleName),
          f: t.t(e.sellPrice),
          g: t.o((function(t) {
            return o.goToDetail(e)
          })),
          h: i
        } : {}, {
          i: i
        })
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/index/Ceefax.vue"]
]);
wx.createPage(a);