var t = require("../../@babel/runtime/helpers/defineProperty"),
  i = require("../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../common/vendor.js"),
  a = require("./presale.js"),
  o = require("../../apis/coupon.js"),
  n = require("../../utils/util.js"),
  r = require("../../utils/commonEnum.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var s = {
  name: "c_presale",
  components: {},
  props: {
    formData: {
      type: Object,
      default: function() {
        return JSON.parse(JSON.stringify(a.defaultPresaleData))
      }
    }
  },
  setup: function(t) {
    var a = e.toRefs(t).formData,
      s = e.reactive({
        viewData: a.value.activityListConfig.list,
        isShowCountdownFlag: !0,
        ids: []
      });
    return e.onMounted((function() {
      var t;
      t = a.value.activityListConfig.list, s.ids = t.map((function(t) {
        return t.info[0].value
      })), o.apiListGoodsInfoByActivityIds({
        ids: s.ids,
        applyType: 1
      }).then((function(t) {
        s.viewData = (null == t ? void 0 : t.data) || [], s.viewData.length && (s.viewData = s.viewData.filter((function(t) {
          return 1 == t.putStatus && t.stock > 0 && 1 == t.validState
        })), s.viewData.forEach((function(t) {
          t.activityFeignVo = {
            activityStartTime: t.activityStartTime,
            activityEndTime: t.activityEndTime
          }, t.activityFeignVo = i(i({}, t.activityFeignVo), n.saleTimeDataDeal(t.activityFeignVo))
        }))), console.info("viewData========>", s.viewData)
      })).catch((function(t) {
        s.viewData = []
      }))
    })), i(i({}, e.toRefs(s)), {}, {
      timeup: function() {
        s.isShowCountdownFlag = !1
      },
      goToDetail: function(t) {
        e.index.navigateTo({
          url: "/pages/product/detail?spuCode=".concat(t.spuCode)
        })
      },
      EActivityStatus: r.EActivityStatus,
      formData: a,
      goToPresaleList: function() {
        e.index.navigateTo({
          url: "/pages/index/presaleList?ids=".concat(JSON.stringify(s.ids))
        })
      },
      filters: function(t) {
        var i = "";
        if ((new Date).getTime() > t[1]) i = "【预售已经结束】";
        else if ((new Date).getTime() > t[0] && (new Date).getTime() < t[1]) i = "【预售中】";
        else if ((new Date).getTime() < t[0]) {
          var e = new Date(t[0] / 1e3),
            a = e.getFullYear(),
            o = e.getMonth() + 1,
            n = e.getDate(),
            r = (o < 10 ? "【0" + o : o) + "月-" + (n < 10 ? "0" + n : n) + "日开售】";
          i = a > (new Date).getFullYear() ? "【" + a + "年 开售】" : r
        }
        return i
      }
    })
  }
};
Array || e.resolveComponent("uni-countdown")();
Math;
var c = e._export_sfc(s, [
  ["render", function(i, a, o, n, r, s) {
    return e.e({
      a: i.viewData.length
    }, i.viewData.length ? {
      b: e.f(i.viewData, (function(a, o, r) {
        var s, c, u, l, v, f, m;
        return e.e({
          a: o < n.formData.activityListConfig.maxList && o < n.formData.activityListConfig.maxList
        }, o < n.formData.activityListConfig.maxList && o < n.formData.activityListConfig.maxList ? e.e({
          b: a.imgUrl,
          c: (null == (s = a.activityFeignVo) ? void 0 : s.type) === n.EActivityStatus.before_presale
        }, (null == (c = a.activityFeignVo) ? void 0 : c.type) === n.EActivityStatus.before_presale ? {
          d: e.t(a.activityFeignVo.timeText)
        } : (null == (u = a.activityFeignVo) ? void 0 : u.type) === n.EActivityStatus.presale ? e.e({
          f: a.activityFeignVo.timeText
        }, a.activityFeignVo.timeText ? {
          g: e.t(a.activityFeignVo.timeText)
        } : e.e({
          h: i.isShowCountdownFlag
        }, i.isShowCountdownFlag ? {
          i: e.o(n.timeup),
          j: "7c6c4478-0-" + r,
          k: e.p(t(t(t(t(t(t(t({
            splitorColor: "#FFFFFF"
          }, "font-size", 12), "show-day", !1), "hour", null == (l = a.activityFeignVo) ? void 0 : l.times.hours), "minute", null == (v = a.activityFeignVo) ? void 0 : v.times.minutes), "second", null == (f = a.activityFeignVo) ? void 0 : f.times.seconds), "color", "#E85252"), "background-color", "#FFFFFF"))
        } : {})) : {}, {
          e: (null == (m = a.activityFeignVo) ? void 0 : m.type) === n.EActivityStatus.presale,
          l: e.o((function(t) {
            return n.goToDetail(a)
          })),
          m: e.t(a.spuName)
        }) : {}, {
          n: o >= n.formData.activityListConfig.maxList && o === n.formData.activityListConfig.maxList
        }, o >= n.formData.activityListConfig.maxList && o === n.formData.activityListConfig.maxList ? {
          o: i.$static + "/static/image/index/lookMore.png",
          p: e.o((function() {
            return n.goToPresaleList && n.goToPresaleList.apply(n, arguments)
          }))
        } : {}, {
          q: o,
          r: o >= n.formData.activityListConfig.maxList && o === n.formData.activityListConfig.maxList ? 1 : "",
          s: o <= n.formData.activityListConfig.maxList ? 1 : ""
        })
      })),
      c: 1 == n.formData.bgColor.type ? n.formData.bgColor.color : ""
    } : {})
  }],
  ["__scopeId", "data-v-7c6c4478"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_presale.vue"]
]);
wx.createComponent(c);