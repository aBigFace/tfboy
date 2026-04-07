var e = require("../../../@babel/runtime/helpers/defineProperty");
require("../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../common/vendor.js"),
  n = require("../../../apis/shopCart.js"),
  a = require("../../../common/common.js"),
  i = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../utils/util.js");
var u = {
  name: "styleThree",
  components: {
    SelectSku: function() {
      return "../../select-sku.js"
    }
  },
  props: ["formData", "totalData"],
  emits: ["validState"],
  setup: function(e, u) {
    var s = o.toRefs(e).formData,
      r = o.ref(),
      l = o.ref(),
      d = o.ref(),
      c = o.reactive({
        showFlag: !0,
        isCheckedStatus: !0,
        showCount: !0,
        loadingStatus: !1,
        shopCartId: 0,
        isEdit: !1,
        isSelect: -1,
        shopCartIdList: [],
        selectedSkuData: {},
        skuType: 4,
        count: 0,
        value: "",
        index: "",
        index2: "",
        item: {
          skuId: ""
        },
        payTypeData: []
      });
    o.onShow((function() {
      c.isSelect = -1, c.isEdit = !1, c.isCheckedStatus = !0
    }));
    var p = o.computed$1((function() {
        return e.totalData.every((function(e) {
          return 0 === e.count
        }))
      })),
      f = function() {
        d.value.close()
      },
      m = o.computed$1((function() {
        var e = 0;
        return s.value.forEach((function(t) {
          t.cartPageVoList.forEach((function(t) {
            t.isChecked && (e += t.goodsInfo.sellPrice * t.buyNumber)
          }))
        })), e.toFixed(2)
      })),
      y = o.computed$1((function() {
        return 0 !== s.value.length && s.value.every((function(e) {
          return e.cartPageVoList.every((function(e) {
            return 1 == e.isChecked
          }))
        }))
      })),
      h = function(e) {
        var t = e.buySkuInfos.map((function(e) {
          return {
            companyId: e.companyId,
            orgId: e.orgId,
            goodsItems: [{
              skuId: e.skuId,
              number: e.number
            }]
          }
        }));
        if (1 != t.length)
          for (var n = 0; n < t.length; n++)
            for (var a = n + 1; a < t.length; a++)
              if (t[n].orgId == t[a].orgId) {
                if (t[n].goodsItems = t[n].goodsItems.concat(t[a].goodsItems), t.splice(a, 1), null == t[a]) break;
                a--
              } var i = JSON.stringify({
            orderType: 1,
            orderItems: t,
            cartIds: c.shopCartIdList
          }),
          u = JSON.stringify({
            applyType: 1,
            buySkuInfos: e.buySkuInfos
          });
        o.index.navigateTo({
          url: "/pages/order/myOrder/confirm?params=".concat(i, "&paramsDetail=").concat(u)
        })
      },
      g = function(e) {
        var t = {
          buySkuInfos: [],
          chkOrder: 0,
          chkParentAuth: 1,
          applyType: 1
        };
        t.buySkuInfos = e.skuDetailVos.map((function(e) {
          return {
            skuId: e.skuId,
            number: e.buyNumber,
            companyId: e.companyId,
            orgId: e.orgId
          }
        })), h(t), f()
      },
      v = function(e, t) {
        var a = {
          buyNumber: t,
          id: e.id,
          spuId: e.spuId,
          orgId: e.orgId,
          companyId: e.companyId,
          skuCode: e.skuCode,
          skuId: e.skuId,
          spuCode: e.spuCode,
          oriSkuId: e.skuId,
          applyType: 1
        };
        if (c.loadingStatus) return null;
        c.loadingStatus = !0, n.apiUpdateCartTf(a).then((function(n) {
          o.index.showLoading({
            title: "加载中"
          }), setTimeout((function() {
            o.index.hideLoading(), e.buyNumber = t
          }), 250)
        })).catch((function(t) {
          var o = Math.min([e.numInfo.usableSkuTotalNum, 200]) || 1;
          e.buyNumber = o
        })).finally((function() {
          c.loadingStatus = !1
        }))
      };
    return t({
      EActivityStatus: i.EActivityStatus,
      inputDialog: l,
      typePopup: d,
      confirmAdd: function(e) {
        if (Number(e) > 200) return o.index.showToast({
          title: "最多购买200件哦",
          icon: "none",
          duration: 2e3
        }), void(c.value = "");
        /^[1-9]\d*$/.test(e) ? (v(c.item, Number(e)), l.value.close()) : (o.index.showToast({
          title: "请输入正确数量",
          icon: "none",
          duration: 2e3
        }), c.value = "")
      },
      handleUpdateNumber: function(e, t, o) {
        c.value = o.buyNumber, c.index = e, c.index2 = t, c.item = o, l.value.open()
      },
      handleGoDetail: function(e, t, n) {
        1 == t ? o.index.navigateTo({
          url: "/pages/product/detail?id=" + e
        }) : o.index.showToast({
          title: n,
          icon: "none"
        })
      },
      handleSettle: function() {
        var e, t, a = (e = [], t = [], s.value.forEach((function(o) {
            e = o.cartPageVoList.map((function(e) {
              return {
                isCheck: e.isChecked,
                buyNumber: e.buyNumber,
                orgId: e.orgId,
                skuId: e.skuId,
                companyId: e.companyId,
                sysCode: e.sysCode
              }
            })), t = t.concat(e)
          })), (t = t.filter((function(e) {
            return e.isCheck
          }))).map((function(e) {
            return {
              buyNumber: e.buyNumber,
              orgId: e.orgId,
              skuId: e.skuId,
              companyId: e.companyId,
              sysCode: e.sysCode
            }
          }))),
          i = {
            buySkuInfos: [],
            chkOrder: 0,
            chkParentAuth: 1,
            applyType: 1
          };
        0 == a.length ? o.index.showToast({
          title: "请勾选商品",
          icon: "none",
          duration: 1e3
        }) : n.apiGetProductPayType(a).then((function(e) {
          var t;
          if (0 === (null == (t = e.data) ? void 0 : t.length)) return o.index.showToast({
            title: "无可购买商品",
            icon: "none",
            duration: 1e3
          }), null;
          console.log(e.data);
          var n = [],
            a = function() {
              e.data.forEach((function(e) {
                var t = 0,
                  o = 0;
                e.skuPayTypeDetailVos.forEach((function(a) {
                  a.supplierName = e.supplierName;
                  var i = 0,
                    u = 0;
                  a.skuDetailVos.forEach((function(e) {
                    t += e.buyNumber, o += e.buyNumber * e.sellPrice, i += e.buyNumber, u += e.buyNumber * e.sellPrice
                  })), a.total = i, a.totalPrice = u, n.push(a)
                })), e.total = t, e.totalPrice = o
              })), c.payTypeData = n, c.payTypeData.length > 1 ? d.value.open() : 1 == c.payTypeData.length && g(c.payTypeData[0])
            };
          e.data.length > 1 ? a() : 1 == e.data[0].skuPayTypeDetailVos[0].length ? (console.log("111"), i.buySkuInfos = e.data[0].skuPayTypeDetailVos[0].skuDetailVos.map((function(e) {
            return {
              skuId: e.skuId,
              number: e.buyNumber,
              companyId: e.companyId,
              orgId: e.orgId
            }
          })), h(i)) : a()
        }))
      },
      handleConfirmSku: function(e) {
        c.selectedSkuData = e, u.emit("validState", c.isSelect, 1)
      },
      handleDel: function() {
        if (0 === c.shopCartIdList.length) return null;
        n.apiDeleteProductTf(c.shopCartIdList).then((function(e) {
          u.emit("validState", c.isSelect, 1), o.index.showToast({
            title: "删除成功",
            duration: 1e3
          })
        }))
      },
      settleItem: g,
      allSelect: y,
      moneyTotal: m,
      closePop: f,
      handleSelectSpec: function(e, t, o, n, i, u) {
        1 == i && (c.item.skuId = o, c.shopCartId = t, c.count = n, a.getSkuData(e, o).then((function(e) {
          e.selectedData.displaySpec || (e.selectedData.displaySpec = u), r.value.open(e, o)
        })))
      },
      selectSkuRef: r,
      handleSubtract: function(e, t, n) {
        c.item = n, a.debounce((function() {
          s.value[e].cartPageVoList[t].buyNumber > 1 ? v(n, s.value[e].cartPageVoList[t].buyNumber - 1) : o.index.showToast({
            title: "不能再减少了哦~",
            icon: "none",
            duration: 1e3
          })
        }))
      },
      handleAdd: function(e, t, n) {
        Number(s.value[e].cartPageVoList[t].buyNumber + 1) > 200 ? o.index.showToast({
          title: "最多购买200件哦",
          icon: "none",
          duration: 2e3
        }) : a.debounce((function() {
          null !== n.numInfo.usableSkuTotalNum && n.numInfo.usableSkuTotalNum < n.buyNumber ? o.index.showToast({
            title: "超出限购数量~",
            icon: "none",
            duration: 1e3
          }) : v(n, s.value[e].cartPageVoList[t].buyNumber + 1)
        }))
      },
      isDisabled: function(e) {
        var t;
        if (c.isEdit) return !1;
        var o = !1;
        return e.activityFeignVo && (o = (null == (t = e.activityFeignVo) ? void 0 : t.type) === i.EActivityStatus.before_presale), 0 == e.validState && c.isCheckedStatus || o
      },
      handleIsSelect: function(e) {
        c.shopCartIdList = e.detail.value.map((function(e) {
          return Number(e)
        })), 0 == c.shopCartIdList.length ? s.value.forEach((function(e) {
          e.cartPageVoList.forEach((function(e) {
            e.isChecked = !1
          }))
        })) : s.value.forEach((function(e) {
          e.cartPageVoList.forEach((function(e) {
            c.shopCartIdList.indexOf(e.skuId) >= 0 ? e.isChecked = !0 : e.isChecked = !1
          }))
        }))
      },
      handleAllSelect: function(e) {
        c.shopCartIdList = [], "allSelect" == e.detail.value ? s.value.forEach((function(e) {
          e.cartPageVoList.forEach((function(e) {
            var t, o = (null == (t = e.activityFeignVo) ? void 0 : t.type) || -1;
            (!c.isCheckedStatus || 1 == e.validState && o !== i.EActivityStatus.before_presale) && (e.isChecked = !0, c.shopCartIdList.push(e.skuId))
          }))
        })) : s.value.forEach((function(e) {
          e.cartPageVoList.forEach((function(e) {
            e.isChecked = !1
          }))
        }))
      },
      handleIsEdit: function() {
        c.isCheckedStatus = !c.isCheckedStatus, c.isEdit = !c.isEdit, c.isEdit || s.value.forEach((function(e) {
          e.cartPageVoList.forEach((function(e) {
            e.isChecked = !1
          }))
        }))
      },
      handleTrigger: function(e) {
        c.showFlag = !0, c.isSelect = e, u.emit("validState", e)
      },
      formData: s,
      allCountsZero: p
    }, o.toRefs(c))
  }
};
Array || (o.resolveComponent("uni-countdown") + o.resolveComponent("SelectSku") + o.resolveComponent("uni-popup-dialog") + o.resolveComponent("uni-popup"))();
Math || (function() {
  return "../../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js"
} + function() {
  return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
})();
var s = o._export_sfc(u, [
  ["render", function(t, n, a, i, u, s) {
    return o.e({
      a: (i.formData.length || t.showFlag) && !i.allCountsZero
    }, !i.formData.length && !t.showFlag || i.allCountsZero ? {} : {
      b: o.f(a.totalData, (function(e, n, a) {
        return {
          a: o.t(e.title),
          b: o.t(e.count),
          c: e.state,
          d: t.isSelect == e.state ? 1 : "",
          e: o.o((function() {
            return i.handleTrigger(e.state)
          }), e.state)
        }
      })),
      c: o.t(t.isEdit ? "完成" : "编辑"),
      d: t.isEdit ? 1 : "",
      e: o.o((function() {
        return i.handleIsEdit && i.handleIsEdit.apply(i, arguments)
      }))
    }, {
      f: i.formData.length
    }, i.formData.length ? {
      g: o.f(i.formData, (function(t, n, a) {
        return o.e({
          a: 0 != t.cartPageVoList.length
        }, 0 != t.cartPageVoList.length ? {
          b: o.f(t.cartPageVoList, (function(t, u, s) {
            var r, l, d, c, p, f;
            return o.e({
              a: t.isChecked,
              b: t.skuId,
              c: i.isDisabled(t),
              d: t.goodsInfo.imgUrl,
              e: 0 == t.validState || t.goodsInfo.stock <= 0
            }, (0 == t.validState || t.goodsInfo.stock <= 0 || [i.EActivityStatus.presale, i.EActivityStatus.before_presale].includes((null == (r = t.activityFeignVo) ? void 0 : r.type) || -1), {}), {
              f: [i.EActivityStatus.presale, i.EActivityStatus.before_presale].includes((null == (l = t.activityFeignVo) ? void 0 : l.type) || -1),
              g: o.t(t.goodsInfo.saleName),
              h: 1 === t.goodsInfo.specType
            }, 1 === t.goodsInfo.specType ? o.e({
              i: t.goodsInfo.skuName
            }, t.goodsInfo.skuName ? {
              j: o.t(t.goodsInfo.skuName),
              k: o.o((function() {
                return i.handleSelectSpec(t.goodsInfo.goodsId, t.id, t.skuId, t.buyNumber, t.validState, t.goodsInfo.skuName, t)
              }))
            } : {}) : {}, {
              l: t.goodsInfo.message
            }, t.goodsInfo.message ? {
              m: o.t(t.goodsInfo.message)
            } : {}, {
              n: ((null == (d = t.activityFeignVo) ? void 0 : d.type) || -1) === i.EActivityStatus.presale && 0 != t.validState
            }, ((null == (c = t.activityFeignVo) ? void 0 : c.type) || -1) === i.EActivityStatus.presale && 0 != t.validState ? o.e({
              o: t.activityFeignVo.timeText
            }, t.activityFeignVo.timeText ? {
              p: o.t(t.activityFeignVo.timeText)
            } : {
              q: "0ad86295-0-" + a + "-" + s,
              r: o.p(e(e(e(e(e(e({}, "show-day", !1), "hour", t.activityFeignVo.times.hours), "minute", t.activityFeignVo.times.minutes), "second", t.activityFeignVo.times.seconds), "font-size", 11), "color", "#fd6262"))
            }) : {}, {
              s: 1 == t.validState
            }, 1 == t.validState ? o.e({
              t: o.t(t.goodsInfo.sellPrice),
              v: ((null == (p = t.activityFeignVo) ? void 0 : p.type) || -1) === i.EActivityStatus.before_presale
            }, ((null == (f = t.activityFeignVo) ? void 0 : f.type) || -1) === i.EActivityStatus.before_presale ? {
              w: o.t(t.activityFeignVo.timeText)
            } : {
              x: o.o((function(e) {
                return i.handleSubtract(n, u, t)
              })),
              y: 1 == t.buyNumber ? 1 : "",
              z: o.t(t.buyNumber),
              A: o.o((function() {
                return i.handleUpdateNumber(n, u, t)
              })),
              B: t.numInfo.usableSkuTotalNum == t.buyNumber && t.numInfo.usableSkuTotalNum ? 1 : "",
              C: o.o((function(e) {
                return i.handleAdd(n, u, t)
              }))
            }) : {}, {
              D: t.goodsInfo.sellOut > 0 && 0 != t.validState
            }, (t.goodsInfo.sellOut > 0 && t.validState, {}), {
              E: o.o((function() {
                return i.handleGoDetail(t.goodsInfo.goodsId, t.validState, t.goodsInfo.message)
              })),
              F: t.skuId
            })
          }))
        } : {}, {
          c: t.tmpTime
        })
      })),
      h: o.o((function() {
        return i.handleIsSelect && i.handleIsSelect.apply(i, arguments)
      }))
    } : {
      i: t.$static + "/static/image/mine/shoppingCart.png"
    }, {
      j: i.formData.length
    }, i.formData.length ? o.e({
      k: i.allSelect,
      l: !t.isEdit
    }, (t.isEdit, {}), {
      m: !t.isEdit
    }, t.isEdit ? {} : {
      n: o.t(i.moneyTotal)
    }, {
      o: o.o((function() {
        return i.handleAllSelect && i.handleAllSelect.apply(i, arguments)
      })),
      p: !t.isEdit
    }, t.isEdit ? {
      r: o.o((function() {
        return i.handleDel && i.handleDel.apply(i, arguments)
      }))
    } : {
      q: o.o((function() {
        return i.handleSettle && i.handleSettle.apply(i, arguments)
      }))
    }) : {}, {
      s: o.sr("selectSkuRef", "0ad86295-1"),
      t: o.o(i.handleConfirmSku),
      v: o.p({
        skuType: t.skuType,
        shopCartId: t.shopCartId,
        showCount: t.showCount,
        count: t.count
      }),
      w: o.sr("inputClose", "0ad86295-3,0ad86295-2"),
      x: o.o(i.confirmAdd),
      y: o.p({
        mode: "input",
        title: "输入数量",
        value: t.value,
        placeholder: "请输入内容"
      }),
      z: o.sr("inputDialog", "0ad86295-2"),
      A: o.p({
        type: "dialog"
      }),
      B: o.o((function() {
        return i.closePop && i.closePop.apply(i, arguments)
      })),
      C: o.f(t.payTypeData, (function(e, n, a) {
        return o.e({
          a: 0 == n || e.supplierName != t.payTypeData[n - 1].supplierName
        }, 0 == n || e.supplierName != t.payTypeData[n - 1].supplierName ? {
          b: o.t(e.supplierName)
        } : {}, {
          c: o.f(e.skuDetailVos, (function(e, t, n) {
            return {
              a: e.imgUrl,
              b: o.t(e.sellPrice.toFixed(2)),
              c: o.t(e.buyNumber),
              d: e.skuId
            }
          })),
          d: o.t(e.total),
          e: o.t(e.totalPrice.toFixed(2)),
          f: o.o((function() {
            return i.settleItem(e)
          })),
          g: n
        })
      })),
      D: o.sr("typePopup", "0ad86295-4"),
      E: o.p({
        type: "bottom"
      })
    })
  }],
  ["__scopeId", "data-v-0ad86295"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/shoppCartItem/styleThree.vue"]
]);
wx.createComponent(s);