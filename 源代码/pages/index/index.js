var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../common/vendor.js"),
  o = require("../../common/user.js"),
  i = require("../../common/common.js"),
  r = require("../../apis/mall.js"),
  c = require("../../utils/util.js"),
  s = require("../../apis/user.js");
require("../../apis/shopCart.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js"), require("../../utils/commonEnum.js");
var u = a.defineComponent({
  name: "index",
  components: {
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
    c_imgText: function() {
      return "../../components/diyView/c_imgText.js"
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
    },
    costPerPopup: function() {
      return "../../components/popupWindow/costPerPopup.js"
    },
    SelectSku: function() {
      return "../../components/select-sku.js"
    }
  },
  setup: function() {
    var u = a.reactive({
        httpSuccess: !0,
        paddingTop: 80,
        isRefresher: !1,
        updateFlag: !0,
        statusBarHeight: c.systemInfoDataObj().statusBarHeight,
        titleBarHeight: c.systemInfoDataObj().titleBarHeight,
        isLogin: o.checkLogin(),
        formData: {
          pageName: "",
          updateTime: "",
          pageConfig: {
            titleConfig: {
              key: "title",
              title: "页面名称：",
              value: "首页",
              tips: "请输入首页名称",
              max: 16
            },
            bgColor: {
              color: [{
                item: "#fff"
              }],
              default: [{
                item: "#fff"
              }],
              title: "背景颜色："
            }
          },
          value: []
        },
        pageId: -1,
        id: "",
        shopInfo: {},
        shareInfo: null,
        nowDate: -1
      }),
      p = function() {
        var e = n(t().mark((function e() {
          var n, o, i, r = arguments;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (n = r.length > 0 && void 0 !== r[0] && r[0], !(o = a.index.getStorageSync("userInfo")) || (null == o ? void 0 : o.id)) {
                  e.next = 7;
                  break
                }
                return e.next = 5, s.apiGetUserInfo();
              case 5:
                i = e.sent, a.index.setStorageSync("userInfo", i.data);
              case 7:
                m(n);
              case 8:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    a.onShareAppMessage((function() {
      var e = i.getShareParams(),
        t = "/pages/index/index";
      return e && (t += e = "?" + e), {
        title: "TF FAMILY FANCLUB",
        path: t
      }
    }));
    var m = function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        t = a.index.getStorageSync("indexDiyData");
      if (!e && t) {
        var n = JSON.parse(t);
        if (n.time + 3e5 >= (new Date).getTime()) return u.formData = {
          pageName: n.pageName,
          updateTime: n.updateTime,
          pageConfig: n.pageConfig,
          value: n.value
        }, null
      }
      r.apiGetOpenPage(2).then((function(e) {
        var t = {},
          n = [];
        try {
          t = JSON.parse(e.data.pageConfig), u.httpSuccess = !0
        } catch (e) {
          t = {
            titleConfig: {
              key: "title",
              title: "页面名称：",
              value: "首页",
              tips: "请输入首页名称",
              max: 16
            },
            bgColor: {
              color: [{
                item: "#fff"
              }],
              default: [{
                item: "#fff"
              }],
              title: "背景颜色："
            }
          }
        }
        try {
          n = JSON.parse(e.data.moduleConfigInfo), console.log(n, "value")
        } catch (e) {
          n = []
        }
        var o = [];
        n.forEach((function(e) {
          if ("c_swiper" === e.name) {
            var t = [];
            e.imgListConfig.forEach((function(n) {
              n.time && 0 !== n.time.length && (new Date(n.time[0]).getTime() > (new Date).getTime() || new Date(n.time[1]).getTime() < (new Date).getTime()) ? console.log("未生效:", e) : t.push(n)
            })), e.imgListConfig = t, t.length > 0 && o.push(e)
          } else o.push(e)
        })), u.formData = {
          pageName: e.data.pageName,
          updateTime: e.data.updateTime,
          pageConfig: t,
          value: o
        };
        var i = {
          pageName: e.data.pageName,
          updateTime: e.data.updateTime,
          pageConfig: t,
          value: o,
          time: (new Date).getTime()
        };
        u.updateFlag = !1, a.nextTick((function() {
          u.updateFlag = !0
        })), a.index.setStorageSync("indexDiyData", JSON.stringify(i))
      })).finally((function() {
        u.isRefresher = !1
      })).catch((function() {
        u.httpSuccess = !1
      }))
    };
    a.onLoad((function(e) {
      var t = function(e) {
        if (e.scene) {
          var t = decodeURIComponent(e.scene);
          return -1 === t.indexOf("?") && (t = "?" + t), {
            pageId: c.getQueryStringByName(t, "pageId"),
            id: c.getQueryStringByName(t, "id")
          }
        }
        return {
          id: "",
          pageId: ""
        }
      }(e);
      u.pageId = t.pageId || -1, u.id = t.id, o.iniAppData(e), f(), p()
    }));
    var f = function() {
      var e = n(t().mark((function e() {
        var n, o, i, r;
        return t().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, s.apiGetVersion();
            case 2:
              n = e.sent, console.log(n), o = n.data.currentTimestamp, i = new Date((new Date).getTime() + 3600 * (parseInt((new Date).getTimezoneOffset() / 60) + 8) * 1e3), r = parseInt(((o - i) / 1e3).toString()), a.index.setStorageSync("diffentTime", r.toString());
            case 8:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    var l = a.ref();
    return e(e({
      initFn: p,
      skuChange: function(e) {
        i.getSkuData(e).then((function(e) {
          l.value.open(e)
        }))
      },
      selectSkuRef: l
    }, a.toRefs(u)), {}, {
      loadMore: function() {
        u.nowDate = (new Date).getTime()
      },
      onRefresh: function() {
        u.isRefresher = !0, p(!0)
      }
    })
  }
});
Array || (a.resolveComponent("c_swiper") + a.resolveComponent("c_imgBox") + a.resolveComponent("c_imgText") + a.resolveComponent("c_goodsList") + a.resolveComponent("c_magic") + a.resolveComponent("c_rollingNotice") + a.resolveComponent("c_search") + a.resolveComponent("c_moduleSpacing") + a.resolveComponent("c_video") + a.resolveComponent("c_title") + a.resolveComponent("c_presale") + a.resolveComponent("costPerPopup") + a.resolveComponent("SelectSku"))();
var p = a._export_sfc(u, [
  ["render", function(e, t, n, o, i, r) {
    return a.e({
      a: 0 !== e.formData.value.length
    }, 0 !== e.formData.value.length ? {
      b: a.f(e.formData.value, (function(t, n, o) {
        return a.e({
          a: "c_swiper" === t.name
        }, "c_swiper" === t.name ? {
          b: "1badc801-0-" + o,
          c: a.p({
            formData: t
          })
        } : "c_imgBox" === t.name ? {
          e: "1badc801-1-" + o,
          f: a.p({
            formData: t
          })
        } : "c_imgText" === t.name && e.updateFlag ? {
          h: "1badc801-2-" + o,
          i: a.p({
            formData: t
          })
        } : "c_goodsList" === t.name ? {
          k: a.o(e.skuChange),
          l: "1badc801-3-" + o,
          m: a.p({
            formData: t,
            nowDate: e.nowDate,
            isLast: n === e.formData.value.length - 1
          })
        } : "c_magic" === t.name ? {
          o: "1badc801-4-" + o,
          p: a.p({
            formData: t
          })
        } : "c_rollingNotice" === t.name && e.updateFlag ? {
          r: "1badc801-5-" + o,
          s: a.p({
            formData: t
          })
        } : "c_search" === t.name && e.updateFlag ? {
          v: "1badc801-6-" + o,
          w: a.p({
            formData: t
          })
        } : "c_moduleSpacing" === t.name ? {
          y: "1badc801-7-" + o,
          z: a.p({
            formData: t
          })
        } : "c_video" === t.name ? {
          B: "1badc801-8-" + o,
          C: a.p({
            formData: t
          })
        } : "c_title" === t.name ? {
          E: "1badc801-9-" + o,
          F: a.p({
            formData: t
          })
        } : "c_presale" === t.name && e.updateFlag ? {
          H: "1badc801-10-" + o,
          I: a.p({
            formData: t
          })
        } : {}, {
          d: "c_imgBox" === t.name,
          g: "c_imgText" === t.name && e.updateFlag,
          j: "c_goodsList" === t.name,
          n: "c_magic" === t.name,
          q: "c_rollingNotice" === t.name && e.updateFlag,
          t: "c_search" === t.name && e.updateFlag,
          x: "c_moduleSpacing" === t.name,
          A: "c_video" === t.name,
          D: "c_title" === t.name,
          G: "c_presale" === t.name && e.updateFlag,
          J: n
        })
      }))
    } : {}, {
      c: !e.httpSuccess
    }, e.httpSuccess ? {} : {
      d: a.o((function(t) {
        return e.initFn()
      }))
    }, {
      e: a.s({
        background: "#fff"
      }),
      f: 0 === e.formData.value.length ? 1 : "",
      g: a.o((function() {
        return e.onRefresh && e.onRefresh.apply(e, arguments)
      })),
      h: a.o((function() {
        return e.loadMore && e.loadMore.apply(e, arguments)
      })),
      i: e.isRefresher,
      j: a.sr("selectSkuRef", "1badc801-12"),
      k: a.p({
        showCount: !0,
        skuType: 1
      })
    })
  }],
  ["__scopeId", "data-v-1badc801"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/index/index.vue"]
]);
u.__runtimeHooks = 2, wx.createPage(p);