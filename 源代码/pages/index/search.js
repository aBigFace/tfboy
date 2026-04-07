var e = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../common/vendor.js"),
  n = require("../../apis/searchHotWords.js"),
  c = require("../../apis/shopCart.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var a = {
  name: "search",
  components: {
    SearchNavBar: function() {
      return "../../components/searchNavbar.js"
    },
    c_searchHotWord: function() {
      return "../../components/diyView/c_searchHotWords.js"
    },
    c_magic: function() {
      return "../../components/diyView/c_magic.js"
    },
    c_imgBox: function() {
      return "../../components/diyView/c_imgBox.js"
    },
    c_swiper: function() {
      return "../../components/diyView/c_swiper.js"
    },
    c_goodsList: function() {
      return "../../components/diyView/c_goodsList.js"
    },
    c_rollingNotice: function() {
      return "../../components/diyView/c_rollingNotice.js"
    },
    c_moduleSpacing: function() {
      return "../../components/diyView/c_moduleSpacing.js"
    },
    c_search: function() {
      return "../../components/diyView/c_search.js"
    },
    c_title: function() {
      return "../../components/diyView/c_title.js"
    },
    c_video: function() {
      return "../../components/diyView/c_video.js"
    },
    c_presale: function() {
      return "../../components/diyView/c_presale.js"
    }
  },
  setup: function() {
    var a = getApp(),
      t = o.reactive({
        value: "",
        formData: [],
        paddingTop: ""
      });
    return o.onLoad((function(e) {
      t.value = e.value || "",
        function() {
          t.paddingTop = a.globalData.navBarInfo.paddingTop;
          c.apiGetCurrentInfo({
            useType: 3,
            companyId: 0,
            applyTo: 1
          }).then((function(e) {
            t.formData = JSON.parse(e.data.moduleConfigInfo)
          }))
        }()
    })), e({
      goSearchContent: function(e) {
        o.index.navigateTo({
          url: "/pages/index/searchContent?value=" + e
        })
      },
      handleDelect: function() {
        o.index.showModal({
          title: "提示",
          content: "确定要删除搜索记录吗？",
          success: function(e) {
            e.confirm ? n.apiRemoveProductSearchList({}).then((function(e) {
              t.list = []
            })) : e.cancel && console.log("用户点击取消")
          }
        })
      }
    }, o.toRefs(t))
  }
};
Array || (o.resolveComponent("SearchNavBar") + o.resolveComponent("c_swiper") + o.resolveComponent("c_imgBox") + o.resolveComponent("c_goodsList") + o.resolveComponent("c_magic") + o.resolveComponent("c_rollingNotice") + o.resolveComponent("c_search") + o.resolveComponent("c_moduleSpacing") + o.resolveComponent("c_video") + o.resolveComponent("c_title") + o.resolveComponent("c_searchHotWord") + o.resolveComponent("c_presale"))();
var t = o._export_sfc(a, [
  ["render", function(e, n, c, a, t, r) {
    return {
      a: o.p({
        searchContent: e.value
      }),
      b: o.f(e.formData, (function(n, c, a) {
        return o.e({
          a: "c_swiper" === n.name
        }, "c_swiper" === n.name ? {
          b: "05ca1189-1-" + a,
          c: o.p({
            formData: n
          })
        } : "c_imgBox" === n.name ? {
          e: "05ca1189-2-" + a,
          f: o.p({
            formData: n
          })
        } : "c_goodsList" === n.name ? {
          h: "05ca1189-3-" + a,
          i: o.p({
            formData: n,
            isLast: c === e.formData.length - 1
          })
        } : "c_magic" === n.name ? {
          k: "05ca1189-4-" + a,
          l: o.p({
            formData: n
          })
        } : "c_rollingNotice" === n.name ? {
          n: "05ca1189-5-" + a,
          o: o.p({
            formData: n
          })
        } : "c_search" === n.name ? {
          q: "05ca1189-6-" + a,
          r: o.p({
            formData: n
          })
        } : "c_moduleSpacing" === n.name ? {
          t: "05ca1189-7-" + a,
          v: o.p({
            formData: n
          })
        } : "c_rollingNotice" === n.name ? {
          x: "05ca1189-8-" + a,
          y: o.p({
            formData: n
          })
        } : "c_video" === n.name ? {
          A: "05ca1189-9-" + a,
          B: o.p({
            formData: n
          })
        } : "c_title" === n.name ? {
          D: "05ca1189-10-" + a,
          E: o.p({
            formData: n
          })
        } : "c_searchHotWord" === n.name ? {
          G: "05ca1189-11-" + a,
          H: o.p({
            formData: n
          })
        } : "c_presale" === n.name ? {
          J: "05ca1189-12-" + a,
          K: o.p({
            formData: n
          })
        } : {}, {
          d: "c_imgBox" === n.name,
          g: "c_goodsList" === n.name,
          j: "c_magic" === n.name,
          m: "c_rollingNotice" === n.name,
          p: "c_search" === n.name,
          s: "c_moduleSpacing" === n.name,
          w: "c_rollingNotice" === n.name,
          z: "c_video" === n.name,
          C: "c_title" === n.name,
          F: "c_searchHotWord" === n.name,
          I: "c_presale" === n.name,
          L: c
        })
      }))
    }
  }],
  ["__scopeId", "data-v-05ca1189"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/index/search.vue"]
]);
wx.createPage(t);