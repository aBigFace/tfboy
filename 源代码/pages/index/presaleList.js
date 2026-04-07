var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = require("../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../common/vendor.js"),
  o = require("../../apis/coupon.js"),
  n = require("../../utils/commonEnum.js"),
  a = require("../../utils/util.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var r = i.defineComponent({
  name: "presaleList",
  setup: function() {
    var e = i.reactive({
        presaleList: [],
        isShowCountdownFlag: !0
      }),
      r = function(i) {
        o.apiListGoodsInfoByActivityIds({
          ids: i,
          applyType: 1
        }).then((function(i) {
          e.presaleList = null == i ? void 0 : i.data, e.presaleList = e.presaleList.filter((function(e) {
            return 1 == e.putStatus && 1 == e.validState
          })), e.presaleList.forEach((function(e) {
            e.activityFeignVo = {
              activityStartTime: e.activityStartTime,
              activityEndTime: e.activityEndTime
            }, e.activityFeignVo = t(t({}, e.activityFeignVo), a.saleTimeDataDeal(e.activityFeignVo))
          }))
        }))
      };
    return i.onLoad((function(e) {
      var t = JSON.parse(e.ids || []);
      r(t)
    })), t(t({}, i.toRefs(e)), {}, {
      EActivityStatus: n.EActivityStatus,
      timeup: function() {
        e.isShowCountdownFlag = !1
      },
      goToDetail: function(e) {
        i.index.navigateTo({
          url: "/pages/product/detail?spuCode=".concat(e.spuCode)
        })
      },
      getPresaleList: r
    })
  }
});
Array || i.resolveComponent("uni-countdown")();
Math;
var s = i._export_sfc(r, [
  ["render", function(t, o, n, a, r, s) {
    return {
      a: i.f(t.presaleList, (function(o, n, a) {
        var r, s, u, c, l, v, p, d, m, y, g;
        return i.e({
          a: o.imgUrl,
          b: i.t(o.spuName),
          c: (null == (r = o.activityFeignVo) ? void 0 : r.type) === t.EActivityStatus.before_presale
        }, (null == (s = o.activityFeignVo) ? void 0 : s.type) === t.EActivityStatus.before_presale ? {
          d: i.t(null == (u = o.activityFeignVo) ? void 0 : u.timeText)
        } : (null == (c = o.activityFeignVo) ? void 0 : c.type) === t.EActivityStatus.presale ? i.e({
          f: null == (l = o.activityFeignVo) ? void 0 : l.timeText
        }, (null == (v = o.activityFeignVo) ? void 0 : v.timeText) ? {
          g: i.t(null == (p = o.activityFeignVo) ? void 0 : p.timeText)
        } : i.e({
          h: t.isShowCountdownFlag
        }, t.isShowCountdownFlag ? {
          i: i.o(t.timeup),
          j: "3bc08017-0-" + a,
          k: i.p(e(e(e(e(e(e(e({}, "font-size", 12), "show-day", !1), "hour", null == (d = o.activityFeignVo) ? void 0 : d.times.hours), "minute", null == (m = o.activityFeignVo) ? void 0 : m.times.minutes), "second", null == (y = o.activityFeignVo) ? void 0 : y.times.seconds), "color", "#E85252"), "background-color", "#FFFFFF"))
        } : {})) : {}, {
          e: (null == (g = o.activityFeignVo) ? void 0 : g.type) === t.EActivityStatus.presale,
          l: i.t(o.sellPrice),
          m: !0 === o.morePriceFlag
        }, (o.morePriceFlag, {}), {
          n: i.t(o.marketPrice),
          o: n,
          p: i.o((function(e) {
            return t.goToDetail(o)
          }))
        })
      }))
    }
  }],
  ["__scopeId", "data-v-3bc08017"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/index/presaleList.vue"]
]);
wx.createPage(s);