require("../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = require("../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../common/vendor.js"),
  i = require("../../common/user.js"),
  n = require("../../common/common.js"),
  u = require("../../common/app-theme.js"),
  r = require("../../utils/uniUtil.js"),
  c = require("../../utils/util.js"),
  a = require("../../apis/product.js"),
  s = require("../../utils/commonEnum.js"),
  p = require("../../utils/common.js");
require("../../apis/user.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../apis/shopCart.js");
var d = {
    sku: 1,
    buy: 2,
    cart: 3
  },
  l = o.defineComponent({
    name: "productDetail",
    components: {
      price: function() {
        return "../../components/price.js"
      },
      selectSku: function() {
        return "../../components/select-sku.js"
      },
      costPerPopup: function() {
        return "../../components/popupWindow/costPerPopup.js"
      },
      realNamePopup: function() {
        return "../order/components/realNamePopup.js"
      }
    },
    setup: function() {
      var e = o.ref(),
        l = o.ref(null),
        y = o.ref(null),
        v = o.reactive({
          isHttpSuccess: !1,
          styleClass: {
            top: "32px",
            padding: "0px"
          },
          SkuType: d,
          isLogin: i.checkLogin(),
          isDistributor: !1,
          optionsObj: {},
          product: {
            companyName: "",
            activityFeignVo: {},
            name: "",
            goodsDescribe: "",
            videos: [],
            goodsFiles: [],
            sellPrice: 0,
            marketPrice: 0,
            stock: 0,
            detail: "",
            specInfos: [],
            goodsSkuList: [],
            distributeMoney: 0,
            saleName: "",
            putStatus: 0,
            sellStartTime: "",
            serverSystemTime: "",
            startSelling: 0,
            goodsId: 0,
            hiddenDetail: 0
          },
          selectedSkuData: {
            id: "",
            count: 1,
            specObj: {}
          },
          skuType: d.sku,
          userSelectedSku: !1,
          subscribeTotal: 0,
          isSubscribe: 0,
          doubleEleven: 0,
          appraiseNumber: 0,
          collectStatus: !1,
          user: {
            distributor: !1
          },
          productInfo: {
            spuCode: "",
            companyId: ""
          },
          isShare: !1,
          intervalId: 0,
          countDownMinute: 15,
          countDownSecond: 0,
          countDownStart: !1
        });
      o.onShow((function() {
        var e = getApp().globalData.navBarInfo;
        v.styleClass = {
          top: e.top + "px",
          padding: (e.height - 20) / 2 + "px"
        }
      })), o.onLoad((function(e) {
        g(e)
      })), o.onShareAppMessage((function(e) {
        var t = n.getShareParams();
        return t && (t += "&"), (t += "id=".concat(v.product.goodsId)) && (t = "?" + t), {
          title: v.product.saleName,
          imageUrl: v.product.goodsFiles[0],
          path: "/pages/product/detail".concat(t, "&isShare=true")
        }
      }));
      var g = function(e) {
          i.iniAppData(e), e.id ? h(e.id) : (v.productInfo.spuCode = e.spuCode ? e.spuCode : "", v.productInfo.companyId = e.companyId ? e.companyId : "", S(e.spuCode)), v.optionsObj = JSON.parse(JSON.stringify(e)), e.isShare && (v.isShare = !0), v.countDownStart = !1, v.countDownMinute = 15, v.countDownSecond = 0, v.doubleEleven = 0
        },
        f = function(e) {
          var t = [];
          for (var o in e) t.push("".concat(o, ":").concat(e[o]));
          return t.join(",")
        },
        m = function() {
          var e = {
            itemId: v.product.goodsId,
            collectType: 2,
            contentMethod: 4,
            status: 1
          };
          a.apiGetOkCollect(e).then((function(e) {
            v.collectStatus = e.data
          }))
        },
        b = function() {
          var e = getApp(),
            t = {
              spuCode: v.product.spuCode,
              sysCode: e.globalData.sysCode,
              soCompanyId: e.globalData.companyId
            };
          a.apiGetCountForGoods(t).then((function(e) {
            v.appraiseNumber = e.data || 0
          }))
        },
        S = function(e) {
          var o = getApp().globalData.companyId;
          a.apiGetProductDetailBySpuCode({
            spuCode: e,
            companyId: o,
            applyType: 1
          }).then((function(e) {
            F(e.data), e.data.activityFeignVo = t(t({}, e.data.activityFeignVo), c.saleTimeDataDeal(e.data.activityFeignVo)), v.isHttpSuccess = !0, v.product = e.data, b(), m(), T(), k()
          }))
        },
        h = function(e) {
          a.apiGetProductDetail(e).then((function(e) {
            F(e.data), e.data.activityFeignVo = t(t({}, e.data.activityFeignVo), c.saleTimeDataDeal(e.data.activityFeignVo)), v.isHttpSuccess = !0, v.product = e.data, b(), m(), T(), k()
          }))
        },
        F = function(e) {
          var i, n, u = o.index.getStorageSync("userInfo");
          u && u.distributor && (v.user = u, v.isDistributor = !0);
          var r = e.goodsSkuList || [],
            a = r.find((function(e) {
              return e.stock > 0
            })),
            s = 0;
          a || (a = r[0] || {}), r.forEach((function(e) {
            0 === e.sellTipType ? e.distributeMoney = e.sellTip : 1 === e.sellTipType && (e.distributeMoney = e.sellPrice * e.sellTip / 100), e.stock > 0 && e.sellPrice < a.sellPrice && (a = e), s += e.stock
          })), e.stock = s, e.sellPrice = a.sellPrice, e.marketPrice = a.marketPrice, e.distributeMoney = a.distributeMoney, e.videos = null == (i = e.goodsFiles) ? void 0 : i.filter((function(e) {
            return 1 === e.type
          })), e.goodsFiles = null == (n = e.goodsFiles) ? void 0 : n.filter((function(e) {
            return 0 === e.type
          })).map((function(e) {
            return e.filePath
          })), e.detail = c.formatRichText(e.detail), v.selectedSkuData = t(t({}, a), {}, {
            count: 1,
            displaySpec: f(a.skuSpecValues)
          })
        },
        k = function() {
          var e = {
            goodsId: v.product.goodsId
          };
          a.apiGetSubscribeTotal(e).then((function(e) {
            e && (v.isSubscribe = e.data.isSubscribe, v.subscribeTotal = e.data.subscribeTotal)
          }))
        },
        T = function() {
          if (0 == v.product.startSelling) {
            var e = v.product.sellStartTime.replace(/-/g, "/"),
              t = new Date(e),
              o = v.product.serverSystemTime.replace(/-/g, "/"),
              i = new Date(o),
              n = t.getTime() - i.getTime(),
              u = n - 9e5;
            if (n > 9e5) v.doubleEleven = 1, setTimeout((function() {
              D()
            }), u);
            else {
              var r = Math.floor(n / 1e3),
                c = Math.floor(r / 60),
                a = r % 60;
              v.countDownMinute = c, v.countDownSecond = a, v.countDownStart = !0, v.doubleEleven = 2
            }
          }
        },
        D = function() {
          v.countDownMinute = 15, v.countDownSecond = 0, v.countDownStart = !0, v.doubleEleven = 2
        };
      return t(t({
        EActivityStatus: s.EActivityStatus,
        eventDetails: function() {
          y.value.open()
        },
        goBack: function() {
          o.index.navigateBack()
        },
        goHome: function() {
          o.index.switchTab({
            url: "/pages/index/index"
          })
        },
        goAppraise: function() {
          var e = v.productInfo,
            t = e.spuCode,
            i = e.companyId;
          (t || (t = v.product.spuCode), i) || (i = getApp().globalData.shopInfo.companyId);
          o.index.navigateTo({
            url: "/pages/product/evaluationProduct?spuCode=".concat(t, "&companyId=").concat(i)
          })
        },
        AppTheme: u.AppTheme,
        selectSkuRef: l,
        popupRef: y,
        realNamePopupRef: e
      }, o.toRefs(v)), {}, {
        videoErrorCallback: function(e) {
          console.info("err========>", e)
        },
        getStyle: function(e) {
          if ([s.EActivityStatus.before_presale, s.EActivityStatus.presale].includes(v.product.activityFeignVo.type)) {
            return {
              height: "calc(100vw - 30px)"
            }
          }
          return {}
        },
        handleGoLogin: function() {
          o.index.navigateTo({
            url: "/pages/login/login"
          })
        },
        handleConfirmSku: function(e) {
          v.userSelectedSku = !0, v.selectedSkuData = e
        },
        collect: function() {
          if (0 === v.product.putStatus) return r.uniUtil.showToast("已下架商品不可收藏");
          var e = {
            collectType: 2,
            itemId: v.product.goodsId,
            contentMethod: 4,
            status: Number(!v.collectStatus),
            skuCode: v.selectedSkuData.skuCode,
            id: o.index.getStorageSync("userInfo").id
          };
          a.apiCollect(e).then((function(e) {
            v.collectStatus = !v.collectStatus
          }))
        },
        handleBuy: function(t) {
          n.debounce((function() {
            var i = o.index.getStorageSync("userInfo");
            if (null == i ? void 0 : i.id) {
              if (0 == v.product.startSelling && 3 != v.doubleEleven) return void r.uniUtil.showToast("未到开售时间");
              if (3 === v.product.goodsSubType && t == v.SkuType.cart) return void r.uniUtil.showToast("该商品不支持加入购物车，请直接购买");
              if (0 === v.product.putStatus) return void r.uniUtil.showToast("该商品已下架");
              if (!v.product.stock) return void r.uniUtil.showToast("该商品已售罄");
              if (t === d.buy && [s.EActivityStatus.before_presale].includes(v.product.activityFeignVo.type)) return void r.uniUtil.showToast("商品暂不支持购买");
              if (!c.isAuthentication()) return e.value.handleOpen();
              v.skuType = t;
              var n = v.product.goodsSkuList.filter((function(e) {
                return 1 === e.appletPutStatus
              }));
              l.value.open({
                companyName: v.product.companyName,
                activityFeignVo: v.product.activityFeignVo,
                productName: v.product.name,
                productUrl: v.product.goodsFiles[0],
                specInfos: v.product.specInfos,
                goodsSkuList: n,
                selectedData: v.selectedSkuData
              })
            } else p.showGoLogin()
          }))
        },
        goHx: function() {
          var e = o.index.getStorageSync("userInfo");
          (null == e ? void 0 : e.id) ? o.index.navigateTo({
            url: "/pages/mine/service/service"
          }): p.showGoLogin()
        },
        handlePreviewImage: function(e) {
          o.index.previewImage({
            urls: v.product.goodsFiles,
            current: e
          })
        },
        getSubscribeTotal: k,
        addSubscribe: function() {
          var e = {
            goodsId: v.product.goodsId
          };
          a.apiAddSubscribe(e).then((function(e) {
            e && (v.isSubscribe = 1, v.subscribeTotal = e.data.subscribeTotal)
          }))
        },
        doDoubleElevenCheck: T,
        startCountdown: D,
        doubleElevenTimeUp: function() {
          v.doubleEleven = 3
        },
        init: g
      })
    }
  });
Array || (o.resolveComponent("uni-countdown") + o.resolveComponent("uni-icons") + o.resolveComponent("price") + o.resolveComponent("uni-popup") + o.resolveComponent("select-sku") + o.resolveComponent("costPerPopup") + o.resolveComponent("realNamePopup"))();
Math || (function() {
  return "../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js"
} + function() {
  return "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var y = o._export_sfc(l, [
  ["render", function(t, i, n, u, r, c) {
    var a, s, p, d;
    return o.e({
      a: 0 !== ((null == (a = t.product.videos) ? void 0 : a.length) || -1)
    }, 0 !== ((null == (s = t.product.videos) ? void 0 : s.length) || -1) ? {
      b: o.f(t.product.videos, (function(e, i, n) {
        return {
          a: "productVideo".concat(i),
          b: e.filePath,
          c: o.s(t.getStyle(e)),
          d: i
        }
      })),
      c: o.o((function() {
        return t.videoErrorCallback && t.videoErrorCallback.apply(t, arguments)
      }))
    } : {}, {
      d: 0 !== ((null == (p = t.product.goodsFiles) ? void 0 : p.length) || -1)
    }, 0 !== ((null == (d = t.product.goodsFiles) ? void 0 : d.length) || -1) ? {
      e: o.f(t.product.goodsFiles, (function(e, i, n) {
        return {
          a: e,
          b: o.o((function(e) {
            return t.handlePreviewImage(i)
          })),
          c: i
        }
      }))
    } : {}, {
      f: t.AppTheme.placeholder,
      g: t.AppTheme.textLight,
      h: 0 === t.product.putStatus && 1 == t.isHttpSuccess
    }, (0 === t.product.putStatus && 1 == t.isHttpSuccess || t.product.name && t.product.stock, {}), {
      i: t.product.name && t.product.stock <= 0,
      j: t.product.activityFeignVo.type === t.EActivityStatus.before_presale
    }, t.product.activityFeignVo.type === t.EActivityStatus.before_presale ? {
      k: o.t(t.product.activityFeignVo.timeText)
    } : t.product.activityFeignVo.type === t.EActivityStatus.presale ? o.e({
      m: t.product.activityFeignVo.timeText
    }, t.product.activityFeignVo.timeText ? {
      n: o.t(t.product.activityFeignVo.timeText)
    } : {
      o: o.p(e(e(e(e(e(e(e({
        splitorColor: "#FFFFFF"
      }, "font-size", 13), "show-day", !1), "hour", t.product.activityFeignVo.times.hours), "minute", t.product.activityFeignVo.times.minutes), "second", t.product.activityFeignVo.times.seconds), "color", "#FF7272"), "background-color", "#FFFFFF"))
    }) : {}, {
      l: t.product.activityFeignVo.type === t.EActivityStatus.presale,
      p: 1 === t.doubleEleven
    }, 1 === t.doubleEleven ? {
      q: o.t(t.product.sellStartTime),
      r: o.t(t.subscribeTotal)
    } : {}, {
      s: 2 === t.doubleEleven
    }, 2 === t.doubleEleven ? {
      t: o.t(t.subscribeTotal),
      v: o.o(t.doubleElevenTimeUp),
      w: o.p(e(e(e(e(e(e(e(e(e({
        splitorColor: "#FFFFFF"
      }, "font-size", 16), "format", "mm分ss秒"), "show-day", !1), "show-hour", !1), "show-colon", !1), "start", t.countDownStart), "minute", t.countDownMinute), "second", t.countDownSecond), "color", "#FFFFFF"))
    } : {}, {
      x: 3 === t.doubleEleven
    }, 3 === t.doubleEleven ? {
      y: o.t(t.subscribeTotal)
    } : {}, {
      z: !t.isShare
    }, t.isShare ? {
      D: o.p({
        type: "home",
        size: "20"
      }),
      E: o.s(t.styleClass),
      F: o.o((function() {
        return t.goHome && t.goHome.apply(t, arguments)
      }))
    } : {
      A: o.p({
        type: "back",
        size: "20"
      }),
      B: o.s(t.styleClass),
      C: o.o((function() {
        return t.goBack && t.goBack.apply(t, arguments)
      }))
    }, {
      G: 0 !== t.product.putStatus
    }, 0 !== t.product.putStatus ? o.e({
      H: o.p({
        type: "detail",
        className: "product-detail-main-price",
        price: t.product.sellPrice
      }),
      I: t.product.marketPrice
    }, (t.product.marketPrice, {}), {
      J: t.product.marketPrice
    }, t.product.marketPrice ? {
      K: o.p({
        className: "product-detail-origin-price use-less",
        price: t.product.marketPrice
      })
    } : {}, {
      L: t.product.distributeMoney > 0 && t.user.distributor
    }, t.product.distributeMoney > 0 && t.user.distributor ? {
      M: o.t(t.product.distributeMoney)
    } : {}) : {}, {
      N: [t.EActivityStatus.before_presale, t.EActivityStatus.presale].includes(t.product.activityFeignVo.type)
    }, ([t.EActivityStatus.before_presale, t.EActivityStatus.presale].includes(t.product.activityFeignVo.type), {}), {
      O: o.t(t.product.saleName),
      P: t.product.goodsDescribe
    }, t.product.goodsDescribe ? {
      Q: o.t(t.product.goodsDescribe)
    } : {}, {
      R: 1 === t.product.specType && 1 != t.doubleEleven
    }, 1 === t.product.specType && 1 != t.doubleEleven ? o.e({
      S: t.selectedSkuData.displaySpec
    }, t.selectedSkuData.displaySpec ? {
      T: o.t(t.selectedSkuData.displaySpec)
    } : {}, {
      U: o.p({
        type: "forward",
        size: 16,
        color: t.AppTheme.textGray
      }),
      V: o.o((function(e) {
        return t.handleBuy(t.SkuType.sku)
      }))
    }) : {}, {
      W: t.product.activityFeignVo.type !== t.EActivityStatus.not_presale
    }, t.product.activityFeignVo.type !== t.EActivityStatus.not_presale ? o.e({
      X: o.t(t.product.activityFeignVo.deliverTime),
      Y: t.product.activityFeignVo.activityDesc
    }, t.product.activityFeignVo.activityDesc ? {
      Z: o.t(t.product.activityFeignVo.activityDesc),
      aa: o.p({
        type: "forward",
        size: 16,
        color: t.AppTheme.textGray
      }),
      ab: o.o((function() {
        return t.eventDetails && t.eventDetails.apply(t, arguments)
      }))
    } : {}) : {}, {
      ac: o.t(t.appraiseNumber ? "(".concat(t.appraiseNumber, ")") : ""),
      ad: o.p({
        type: "forward",
        size: 16,
        color: t.AppTheme.textGray
      }),
      ae: o.o((function() {
        return t.goAppraise && t.goAppraise.apply(t, arguments)
      })),
      af: 1 == t.product.hiddenDetail
    }, 1 == t.product.hiddenDetail ? {
      ag: t.$static + "/static/icon/detailCover.png"
    } : {
      ah: t.product.detail
    }, {
      ai: t.$static + "/static/icon/productDetail/share.png",
      aj: t.collectStatus
    }, t.collectStatus ? {
      ak: t.$static + "/static/icon/productDetail/collect-active.png"
    } : {
      al: t.$static + "/static/icon/productDetail/collect.png"
    }, {
      am: o.o((function() {
        return t.collect && t.collect.apply(t, arguments)
      })),
      an: t.$static + "/static/icon/productDetail/customer-service.png",
      ao: o.o((function() {
        return t.goHx && t.goHx.apply(t, arguments)
      })),
      ap: 1 != t.doubleEleven
    }, 1 != t.doubleEleven ? {
      aq: t.product.stock <= 0 || 3 === t.product.goodsSubType ? 1 : "",
      ar: o.o((function(e) {
        return t.handleBuy(t.SkuType.cart)
      })),
      as: t.product.stock <= 0,
      at: o.o((function(e) {
        return t.handleBuy(t.SkuType.buy)
      })),
      av: t.product.stock <= 0 || t.EActivityStatus.before_presale === t.product.activityFeignVo.type ? 1 : "",
      aw: t.product.stock <= 0 || t.EActivityStatus.before_presale === t.product.activityFeignVo.type
    } : {}, {
      ax: 1 === t.doubleEleven
    }, 1 === t.doubleEleven ? o.e({
      ay: 0 == t.isSubscribe
    }, 0 == t.isSubscribe ? {
      az: o.o((function(e) {
        return t.addSubscribe()
      })),
      aA: 1 == t.isSubscribe
    } : {}) : {}, {
      aB: o.t(t.product.activityFeignVo.activityDesc),
      aC: o.sr("popupRef", "4f1d9475-9"),
      aD: o.p({
        type: "bottom"
      }),
      aE: o.sr("selectSkuRef", "4f1d9475-10"),
      aF: o.o(t.handleConfirmSku),
      aG: o.p({
        skuType: t.skuType
      }),
      aH: o.p({
        operationObj: t.optionsObj
      }),
      aI: o.sr("realNamePopupRef", "4f1d9475-12")
    })
  }],
  ["__scopeId", "data-v-4f1d9475"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/product/detail.vue"]
]);
l.__runtimeHooks = 2, wx.createPage(y);