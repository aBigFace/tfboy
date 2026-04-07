var t = require("../../@babel/runtime/helpers/defineProperty");
require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../common/vendor.js"),
  a = require("../../utils/commonEnum.js"),
  i = e.defineComponent({
    name: "ProduceItem",
    props: ["config", "defaultData"],
    setup: function(t, i) {
      var o = i.emit,
        n = e.toRefs(t).defaultData;
      return {
        imgUrl: e.computed$1((function() {
          return n.value.goodsFiles.filter((function(t) {
            return 0 === t.type
          }))[0].filePath
        })),
        defaultData: n,
        EActivityStatus: a.EActivityStatus,
        goDetail: function() {
          e.index.navigateTo({
            url: "/pages/product/detail?spuCode=".concat(n.value.spuCode, "&companyId=2")
          })
        },
        handleUpdateSku: function() {
          o("skuChange", n.value.goodsId)
        }
      }
    }
  });
Array || e.resolveComponent("uni-countdown")();
Math;
var o = e._export_sfc(i, [
  ["render", function(a, i, o, n, u, r) {
    return e.e({
      a: 0 == a.defaultData.startSelling
    }, (0 == a.defaultData.startSelling || a.defaultData.hotSell, {}), {
      b: 1 == a.defaultData.hotSell,
      c: a.imgUrl,
      d: [a.EActivityStatus.before_presale, a.EActivityStatus.presale].includes(a.defaultData.activityFeignVo.type)
    }, ([a.EActivityStatus.before_presale, a.EActivityStatus.presale].includes(a.defaultData.activityFeignVo.type), {}), {
      e: e.t(a.defaultData.saleName),
      f: a.defaultData.activityFeignVo.type === a.EActivityStatus.before_presale
    }, a.defaultData.activityFeignVo.type === a.EActivityStatus.before_presale ? {
      g: e.t(a.defaultData.activityFeignVo.timeText)
    } : a.defaultData.activityFeignVo.type === a.EActivityStatus.presale ? e.e({
      i: a.defaultData.activityFeignVo.timeText
    }, a.defaultData.activityFeignVo.timeText ? {
      j: e.t(a.defaultData.activityFeignVo.timeText)
    } : {
      k: e.p(t(t(t(t(t(t(t({
        splitorColor: "#E85252"
      }, "font-size", 11), "show-day", !1), "hour", a.defaultData.activityFeignVo.times.hours), "minute", a.defaultData.activityFeignVo.times.minutes), "second", a.defaultData.activityFeignVo.times.seconds), "color", "#E85252"), "background-color", "#FFFFFF"))
    }) : {}, {
      h: a.defaultData.activityFeignVo.type === a.EActivityStatus.presale,
      l: e.t(a.defaultData.sellPrice),
      m: !0 === a.defaultData.morePriceFlag
    }, (a.defaultData.morePriceFlag, {}), {
      n: a.config.infoConfig.type.includes("price") && a.defaultData.marketPrice
    }, a.config.infoConfig.type.includes("price") && a.defaultData.marketPrice ? {
      o: e.t(a.defaultData.marketPrice)
    } : {}, {
      p: a.config.infoConfig.type.includes("cart")
    }, a.config.infoConfig.type.includes("cart") ? {
      q: a.$static + "/static/image/product/icon_shop_cart_new.png"
    } : {}, {
      r: e.o((function() {
        return a.handleUpdateSku && a.handleUpdateSku.apply(a, arguments)
      })),
      s: e.o((function() {
        return a.goDetail && a.goDetail.apply(a, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-3932d332"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/commodityClassification/productItem.vue"]
]);
wx.createComponent(o);