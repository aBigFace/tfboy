var e = require("../@babel/runtime/helpers/defineProperty"),
  t = require("../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../@babel/runtime/helpers/objectSpread2"),
  o = require("../@babel/runtime/helpers/asyncToGenerator"),
  u = require("../common/vendor.js"),
  a = require("../utils/uniUtil.js"),
  s = require("../apis/shopCart.js"),
  r = require("../apis/order.js"),
  c = require("../common/common.js"),
  i = require("../utils/commonEnum.js"),
  l = require("../utils/common.js");
require("../common/app-theme.js"), require("../utils/http.js"), require("../config/apiPrefix.js"), require("../utils/util.js");
var p = {
    sku: 1,
    buy: 2,
    cart: 3,
    updateSku: 4,
    selectSku: 5
  },
  d = u.defineComponent({
    name: "selectSku",
    emits: ["on-success"],
    components: {
      price: function() {
        return "./price.js"
      },
      realNamePopup: function() {
        return "../pages/order/components/realNamePopup.js"
      },
      parentDialog: function() {
        return "../pages/dialog/parentAuthDialog.js"
      }
    },
    props: {
      skuType: {
        type: Number,
        default: p.sku
      },
      showProductName: {
        type: Boolean,
        default: !1
      },
      showPrice: {
        type: Boolean,
        default: !0
      },
      showCount: {
        type: Boolean,
        default: !0
      },
      shopCartId: {
        type: Number
      },
      count: {
        type: Number
      }
    },
    setup: function(d, f) {
      var m = u.ref(null),
        h = u.ref(),
        y = u.ref(),
        S = u.toRefs(d),
        k = S.shopCartId,
        g = (S.count, u.reactive({
          SkuType: p,
          oriSkuId: "",
          goodsSkuList: [],
          specInfos: [],
          selectedData: {
            imgUrl: "",
            displaySpec: "",
            stock: 0,
            sellOut: 0,
            count: 1,
            skuSpecValues: {}
          },
          productName: "",
          companyName: "",
          productUrl: "",
          goodsSubType: 0,
          activityFeignVo: {}
        })),
        v = u.computed$1((function() {
          var e = g.selectedData.stock;
          return e ? e > 200 ? 200 : e : 1
        })),
        b = function() {
          c.debounce((function() {
            g.selectedData.count = 1, m.value.close()
          }), 200)
        },
        C = function(e) {
          return new Promise((function(t, n) {
            var o = {
              buySkuInfos: [{
                skuId: e.id,
                number: e.count,
                companyId: e.companyId,
                orgId: e.orgId
              }],
              chkOrder: 0,
              chkParentAuth: 1,
              applyType: 1
            };
            f.emit("on-success", e), c.goConfirmOrderPage(e), b(), t(o)
          }))
        },
        D = function(e) {
          return new Promise((function(t, n) {
            var o = {
              skuId: e.id,
              buyNumber: e.count,
              companyId: e.companyId,
              companyName: g.companyName,
              orgId: e.orgId,
              skuCode: e.skuCode,
              spuCode: e.spuCode,
              spuId: e.goodsId,
              applyType: 1
            };
            s.apiAddToCartTf(o).then((function(n) {
              a.uniUtil.showToast("添加成功", {
                icon: "success"
              }), f.emit("on-success", e), b(), t(o)
            })).catch((function(e) {
              100 == e.data.code && (0 === e.data.data ? h.value.handleOpen() : 1 === e.data.data && y.value.confirm({
                message: "抱歉，您未达到指定年龄",
                title: "需要进行家长信息认证",
                confirmButtonText: "家长认证",
                cancelButtonText: "返回我的"
              }).then((function() {
                u.index.navigateTo({
                  url: "/pages/mine/user/certifyInfo"
                })
              })))
            }))
          }))
        },
        I = function(e) {
          return new Promise((function(t, n) {
            var o = {
              skuId: e.id,
              buyNumber: e.count,
              companyId: e.companyId,
              orgId: e.orgId,
              id: k.value,
              skuCode: e.skuCode,
              spuCode: e.spuCode,
              spuId: e.goodsId,
              oriSkuId: g.oriSkuId,
              applyType: 1
            };
            s.apiUpdateCartTf(o).then((function(n) {
              a.uniUtil.showToast("修改成功", {
                icon: "success"
              }), f.emit("on-success", e), b(), t(o)
            })).catch((function(e) {
              n(e)
            }))
          }))
        },
        N = function() {
          var e = o(t().mark((function e(u, a, s) {
            return t().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (console.log(s.disabled), !s.disabled) {
                    e.next = 4;
                    break
                  }
                  return console.log("该规格已经售罄了。"), e.abrupt("return");
                case 4:
                  c.debounce(o(t().mark((function e() {
                    var o, s, c, i, l, p;
                    return t().wrap((function(e) {
                      for (;;) switch (e.prev = e.next) {
                        case 0:
                          return (o = n({}, g.selectedData.skuSpecValues))[u] = a, s = q(o), c = JSON.parse(JSON.stringify(g.selectedData)), i = s.id, e.next = 7, r.apiQueryStockBySkuId(i);
                        case 7:
                          l = e.sent, p = l.data || 0, g.selectedData = n(n(n({}, c), s), {}, {
                            displaySpec: x((null == s ? void 0 : s.skuSpecValues) || {}),
                            count: 1,
                            stock: p
                          }), P();
                        case 11:
                        case "end":
                          return e.stop()
                      }
                    }), e)
                  }))));
                case 5:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function(t, n, o) {
            return e.apply(this, arguments)
          }
        }(),
        T = function() {
          var e = g.goodsSkuList.find((function(e) {
            return e.stock > 0
          }));
          return e ? g.goodsSkuList.forEach((function(t) {
            t.stock > 0 && t.sellPrice < e.sellPrice && (e = t)
          })) : e = g.goodsSkuList[0], n(n({}, e), {}, {
            count: 1,
            displaySpec: x((null == e ? void 0 : e.skuSpecValues) || {})
          })
        },
        w = function() {
          g.goodsSkuList.forEach((function(e) {
            if (e.hotSell > 0) {
              var t = e.skuName.split(";"),
                n = "";
              if (t.length > 0) {
                var o = t[0].split(":");
                o.length > 1 && (n = o[1])
              }
              "" != n && g.specInfos.forEach((function(t) {
                for (var o = t.valueList, u = 0; u < o.length; u++) o[u].name == n && e.hotSell > o[u].hotSell && (o[u].hotSell = e.hotSell)
              }))
            }
          }))
        },
        P = function() {
          g.specInfos.length > 0 && g.specInfos.forEach((function(t, n) {
            t.valueList.forEach((function(n, o) {
              n.disabled = j(e({}, t.specificationName, n.name))
            }))
          }))
        },
        j = function(e) {
          var t = n(n({}, g.selectedData.skuSpecValues), e),
            o = q(t);
          return o && o.stock <= 0
        },
        x = function(e) {
          var t = [];
          for (var n in e) t.push("".concat(n, ":").concat(e[n]));
          return t.join(",")
        },
        q = function(e) {
          return g.goodsSkuList.find((function(t) {
            var n = !0;
            for (var o in t.skuSpecValues)
              if (t.skuSpecValues[o] !== e[o]) {
                n = !1;
                break
              } return n
          }))
        };
      return n(n({
        changeCount: function(e) {
          isNaN(e) ? g.selectedData.count = 1 : g.selectedData.count = e
        }
      }, u.toRefs(g)), {}, {
        open: function(e, t) {
          var n;
          g.oriSkuId = t;
          var o = [];
          ((null == (n = e.goodsSkuList) ? void 0 : n.length) || 0) > 0 && (o = e.goodsSkuList.filter((function(e) {
            return 0 !== e.appletPutStatus
          }))), g.goodsSkuList = JSON.parse(JSON.stringify(o));
          var u = JSON.parse(JSON.stringify(e.specInfos || []));
          u.length && u.forEach((function(e) {
            e.valueList = e.valueList.map((function(e) {
              return {
                name: e,
                disabled: !1,
                hotSell: 0
              }
            }))
          })), g.specInfos = u, e.selectedData && e.selectedData.id ? g.selectedData = JSON.parse(JSON.stringify(e.selectedData)) : g.selectedData = T(), g.goodsSubType = e.goodsSubType, g.productUrl = e.productUrl, g.productName = e.productName, g.companyName = e.companyName, g.activityFeignVo = e.activityFeignVo, P(), w(), m.value.open()
        },
        EActivityStatus: i.EActivityStatus,
        maxCount: v,
        popupRef: m,
        realNamePopupRef: h,
        parentDialogRef: y,
        getActive: function(e, t) {
          return g.selectedData.skuSpecValues[e] == t
        },
        handleConfirm: function(e) {
          c.debounce((function() {
            if (!u.index.getStorageSync("token")) return l.showGoLogin(), null;
            if (g.selectedData.stock <= 0) a.uniUtil.showToast("该规格库存不足");
            else if (e === p.cart) {
              if (3 === g.goodsSubType) return a.uniUtil.showToast("该商品不支持加入购物车，请直接购买"), null;
              D(g.selectedData)
            } else e === p.buy ? C(g.selectedData) : e === p.updateSku ? (console.log(e, "skuType"), I(g.selectedData)) : f.emit("on-success", g.selectedData)
          }))
        },
        handleClose: b,
        handleChangeSpec: N,
        handleAddToCart: D,
        handleConfirmBuy: C,
        handleBlur: function(e) {
          isNaN(e.target.value) || Number(e.target.value) > v.value && a.uniUtil.showToast("最多购买".concat(v.value, "件哦"))
        },
        setHotSellData: w
      })
    }
  });
Array || (u.resolveComponent("uni-icons") + u.resolveComponent("price") + u.resolveComponent("uni-number-box") + u.resolveComponent("real-name-popup") + u.resolveComponent("parentDialog") + u.resolveComponent("uni-popup"))();
Math || (function() {
  return "../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js"
} + function() {
  return "../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var f = u._export_sfc(d, [
  ["render", function(t, n, o, a, s, r) {
    return u.e({
      a: u.o(t.handleClose),
      b: u.p({
        type: "closeempty",
        color: "#666"
      }),
      c: t.$filters.formatImage(t.selectedData.imgUrl || t.productUrl),
      d: 0 !== t.selectedData.appletPutStatus
    }, 0 !== t.selectedData.appletPutStatus ? {
      e: u.p({
        type: "detail",
        className: "product-detail-main-price",
        price: t.selectedData.sellPrice
      })
    } : {}, {
      f: t.showProductName
    }, t.showProductName ? {
      g: u.t(t.productName)
    } : {}, {
      h: t.specInfos && t.specInfos.length
    }, t.specInfos && t.specInfos.length ? {
      i: u.t(t.selectedData.displaySpec)
    } : {}, {
      j: u.f(t.specInfos, (function(e, n, o) {
        return {
          a: u.t(e.specificationName),
          b: u.f(e.valueList, (function(n, o, a) {
            return u.e({
              a: 1 === n.hotSell
            }, (n.hotSell, {}), {
              b: 2 === n.hotSell
            }, (n.hotSell, {}), {
              c: 3 === n.hotSell
            }, (n.hotSell, {}), {
              d: 4 === n.hotSell
            }, (n.hotSell, {}), {
              e: u.t(n.name),
              f: n.disabled
            }, (n.disabled, {}), {
              g: t.getActive(e.specificationName, n.name) ? 1 : "",
              h: n.disabled ? 1 : "",
              i: o,
              j: u.o((function(o) {
                return t.handleChangeSpec(e.specificationName, n.name, n)
              }))
            })
          })),
          c: n
        }
      })),
      k: t.showCount
    }, t.showCount ? u.e({
      l: u.o(t.changeCount),
      m: u.o(t.handleBlur),
      n: u.o((function(e) {
        return t.selectedData.count = e
      })),
      o: u.p({
        min: 1,
        max: t.maxCount,
        modelValue: t.selectedData.count
      }),
      p: 1 == t.selectedData.sellOut
    }, (t.selectedData.sellOut, {})) : {}, {
      q: 0 !== t.selectedData.appletPutStatus
    }, 0 !== t.selectedData.appletPutStatus ? u.e({
      r: t.selectedData.stock > 0
    }, t.selectedData.stock > 0 ? u.e({
      s: t.skuType === t.SkuType.sku
    }, t.skuType === t.SkuType.sku ? {
      t: u.o((function(e) {
        return t.handleConfirm(t.SkuType.cart)
      })),
      v: u.o((function(e) {
        return t.handleConfirm(t.SkuType.buy)
      })),
      w: t.activityFeignVo.type === t.EActivityStatus.before_presale,
      x: t.activityFeignVo.type === t.EActivityStatus.before_presale ? 1 : ""
    } : t.skuType === t.SkuType.buy ? {
      z: u.o((function(e) {
        return t.handleConfirm(t.SkuType.buy)
      }))
    } : {
      A: u.o((function(e) {
        return t.handleConfirm(t.skuType)
      }))
    }, {
      y: t.skuType === t.SkuType.buy
    }) : {}) : {}, {
      B: u.sr("realNamePopupRef", "deeac3fe-4,deeac3fe-0"),
      C: u.sr("parentDialogRef", "deeac3fe-5,deeac3fe-0"),
      D: u.sr("popupRef", "deeac3fe-0"),
      E: u.p(e({
        type: "bottom"
      }, "safe-area", !1))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/components/select-sku.vue"]
]);
wx.createComponent(f);