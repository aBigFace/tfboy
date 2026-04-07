var e = require("../../../../@babel/runtime/helpers/toConsumableArray"),
  o = require("../../../../@babel/runtime/helpers/objectSpread2"),
  i = require("../../../../common/vendor.js"),
  t = require("../../../../apis/commodityClassification.js"),
  n = require("../../../../components/diyView/utils.js"),
  a = require("../../../../utils/util.js");
require("../../../../utils/http.js"), require("../../../../config/apiPrefix.js"), require("../../../../utils/common.js"), require("../../../../common/app-theme.js"), require("../../../../utils/commonEnum.js");
var s = i.defineComponent({
  name: "index",
  components: {
    newTabsVertical: function() {
      return "../../../../components/newTabs/newTabsVertical.js"
    },
    ProductItem: function() {
      return "../../productItem.js"
    }
  },
  props: ["tabsList", "config"],
  setup: function(s, r) {
    var l = r.emit,
      d = i.reactive({
        oneTab: 0,
        pageNum: 1,
        goodsList: [],
        total: -1,
        salesClassId: 0,
        loading: !1
      }),
      u = i.toRefs(s),
      c = u.config,
      g = u.tabsList;
    i.watch(c, (function(e, o) {
      JSON.stringify(e) !== JSON.stringify(o) && (d.oneTab = 0, d.pageNum = 1, d.total = -1, d.salesClassId = g.value[0].child[0].id, f(d.salesClassId))
    })), i.watch(g, (function(e, o) {
      JSON.stringify(e) !== JSON.stringify(o) && (d.oneTab = 0, d.pageNum = 1, d.total = -1, d.salesClassId = g.value[0].child[0].id, f(d.salesClassId))
    }));
    var f = function(i) {
      var n = c.value.shortConfig.list[c.value.shortConfig.type].val;
      null == n && (n = "");
      var s = c.value.shortConfig.shortTypeList[c.value.shortConfig.shortType].val;
      d.loading = !0, t.apiRelationGoodsList({
        companyId: 2,
        orgId: 35,
        salesClassId: i,
        sortFieldType: n,
        sortType: s,
        pageNum: d.pageNum,
        pageSize: 10,
        applyType: 1
      }).then((function(i) {
        var t, n, s, r;
        if (((null == (n = null == (t = null == i ? void 0 : i.data) ? void 0 : t.records) ? void 0 : n.length) || -1) > 0) {
          var l;
          if (i.data.records.forEach((function(e) {
              e.activityFeignVo = o(o({}, e.activityFeignVo), a.saleTimeDataDeal(e.activityFeignVo))
            })), 1 === d.pageNum) d.goodsList = (null == (s = i.data) ? void 0 : s.records) || [];
          else d.goodsList = (l = d.goodsList).concat.apply(l, e(i.data.records));
          d.total = (null == (r = i.data) ? void 0 : r.total) || -1
        } else d.goodsList = []
      })).finally((function() {
        d.loading = !1
      }))
    };
    i.onMounted((function() {
      d.salesClassId = g.value[0].id, f(d.salesClassId)
    }));
    return o({
      changeOneTab: function(e) {
        d.oneTab = e.index, d.salesClassId = e.id, d.total = -1, d.pageNum = 1, d.goodsList = [], f(e.id)
      },
      skuChange: function(e) {
        l("skuChange", e)
      },
      loadMore: function() {
        10 * d.pageNum < d.total && (d.pageNum += 1, f(d.salesClassId))
      },
      config: c,
      goLink: n.goLink
    }, i.toRefs(d))
  }
});
Array || (i.resolveComponent("newTabsVertical") + i.resolveComponent("ProductItem"))();
var r = i._export_sfc(s, [
  ["render", function(e, o, t, n, a, s) {
    return i.e({
      a: i.o(e.changeOneTab),
      b: i.p({
        type: e.tabsList,
        value: e.oneTab,
        heightNumber: 37
      }),
      c: e.config.advertisementConfig.showList[e.config.advertisementConfig.type].val && e.config.advertisementConfig.detail.img
    }, e.config.advertisementConfig.showList[e.config.advertisementConfig.type].val && e.config.advertisementConfig.detail.img ? {
      d: e.config.advertisementConfig.detail.img,
      e: i.o((function() {
        return e.goLink(e.config.advertisementConfig.detail.link)
      }))
    } : {}, {
      f: e.goodsList.length > 0
    }, e.goodsList.length > 0 ? {
      g: i.f(e.goodsList, (function(o, t, n) {
        return {
          a: o.goodsId,
          b: i.o(e.skuChange, o.goodsId),
          c: "625e17c6-1-" + n,
          d: i.p({
            config: e.config,
            defaultData: o
          })
        }
      }))
    } : i.e({
      h: e.loading
    }, (e.loading, {})), {
      i: i.o((function() {
        return e.loadMore && e.loadMore.apply(e, arguments)
      }))
    })
  }],
  ["__scopeId", "data-v-625e17c6"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/commodityClassification/classItems/one/one_one.vue"]
]);
wx.createComponent(r);