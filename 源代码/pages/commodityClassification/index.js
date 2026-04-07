var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../common/vendor.js"),
  t = require("./default.js"),
  a = require("../../apis/commodityClassification.js"),
  o = require("../../common/common.js"),
  i = require("../../utils/util.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js"), require("../../apis/shopCart.js"), require("../../utils/commonEnum.js");
var s = n.defineComponent({
  name: "index",
  components: {
    One_One: function() {
      return "./classItems/one/one_one.js"
    },
    selectSku: function() {
      return "../../components/select-sku.js"
    }
  },
  setup: function() {
    var s = n.ref(null),
      l = n.reactive({
        statusBarHeight: i.systemInfoDataObj().statusBarHeight,
        searchValue: "",
        config: t.defaultProductClassificationData,
        loadingStatus: !1,
        treeClass: [],
        placeholderStyle: "font-size:14px;color:#BBBBBB"
      }),
      c = n.computed$1((function() {
        var e = l.config.hierarchyConfig,
          n = e.list[e.type].val,
          t = l.config.viewConfig;
        return t.typeValue[n][t.type].val
      }));
    n.onShow((function() {
      r()
    }));
    var r = function() {
        a.apiGetConfigDetail({
          companyId: 2,
          useType: 5,
          applyType: 1
        }).then((function(e) {
          e.data.moduleConfigInfo && (l.config = JSON.parse(e.data.moduleConfigInfo))
        })).finally((function() {
          u()
        }))
      },
      u = function() {
        a.apiGetTreeClass({
          companyId: 2,
          orgId: 35,
          applyType: 1
        }).then((function(e) {
          ! function e(n) {
            0 !== n.length && n.forEach((function(n) {
              if (1 === n.classLevel) {
                var t = l.config.hierarchyConfig.list[l.config.hierarchyConfig.type].val;
                0 === n.child.length ? n.child.push({
                  id: n.id,
                  salesClassName: "three" === t ? n.salesClassName : "全部",
                  child: [{
                    id: n.id,
                    salesClassName: "全部",
                    child: []
                  }]
                }) : ("two" === t && n.child.unshift({
                  id: n.id,
                  salesClassName: "全部",
                  child: []
                }), e(n.child))
              } else 2 === n.classLevel && n.child.unshift({
                id: n.id,
                salesClassName: "全部",
                child: []
              })
            }))
          }(e.data), l.treeClass = e.data
        })).finally((function() {
          l.loadingStatus = !0
        }))
      };
    return n.onMounted((function() {
      l.config = t.defaultProductClassificationData
    })), e({
      iconClick: function() {
        l.searchValue = ""
      },
      skuChange: function(e) {
        o.getSkuData(e).then((function(e) {
          try {
            s.value.open(e)
          } catch (e) {
            console.info("selectSkuRef.value.open========>", e)
          }
        }))
      },
      getConfig: r,
      configType: c,
      selectSkuRef: s,
      changeRoute: function() {
        n.index.navigateTo({
          url: "/pages/index/search"
        })
      }
    }, n.toRefs(l))
  }
});
Array || (n.resolveComponent("uni-easyinput") + n.resolveComponent("One_One") + n.resolveComponent("select-sku"))();
Math;
var l = n._export_sfc(s, [
  ["render", function(e, t, a, o, i, s) {
    return n.e({
      a: n.o(e.iconClick),
      b: n.o((function(n) {
        return e.searchValue = n
      })),
      c: n.p({
        placeholderStyle: e.placeholderStyle,
        prefixIcon: "search",
        placeholder: "搜索商品名称",
        styles: {
          borderColor: "#FFFFFF"
        },
        disabled: !0,
        modelValue: e.searchValue
      }),
      d: n.o((function() {
        return e.changeRoute && e.changeRoute.apply(e, arguments)
      })),
      e: 0 !== e.treeClass.length
    }, 0 !== e.treeClass.length ? {
      f: n.o(e.skuChange),
      g: n.p({
        config: e.config,
        tabsList: e.treeClass
      })
    } : {
      h: n.o((function(n) {
        return e.getConfig()
      }))
    }, {
      i: n.sr("selectSkuRef", "32da5d3c-2"),
      j: n.p({
        showCount: !0,
        skuType: 1
      }),
      k: 0 === e.treeClass.length ? 1 : "",
      l: e.loadingStatus
    })
  }],
  ["__scopeId", "data-v-32da5d3c"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/commodityClassification/index.vue"]
]);
wx.createPage(l);