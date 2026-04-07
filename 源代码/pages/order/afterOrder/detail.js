require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  t = require("../../../apis/order.js"),
  a = require("../../../common/app-theme.js"),
  d = require("../../../utils/uniUtil.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var o = r.defineComponent({
  name: "orderDetail",
  components: {
    orderProductItem: function() {
      return "../../../components/order-product-item.js"
    },
    price: function() {
      return "../../../components/price.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    customerService: function() {
      return "../components/customer-service.js"
    }
  },
  setup: function() {
    var o = r.ref(null),
      n = r.reactive({
        afterOrderNo: "",
        order: {},
        timer: null,
        afterSaleAddress: {
          afterLinker: "",
          afterLinkerPhone: "",
          afterLinkerAddressDetail: ""
        },
        days: "",
        myData: {
          saleAfterWaybillInfos: [],
          saleAfterOrderVO: {
            afterOrderType: null,
            afterOrderState: 0
          }
        },
        pictureUrlList: [],
        videoUrl: "",
        afterOrderId: -1
      }),
      f = r.computed$1((function() {
        return (2 == n.myData.saleAfterOrderVO.afterOrderType || 3 == n.myData.saleAfterOrderVO.afterOrderType) && 0 == n.myData.saleAfterWaybillInfos.length && n.myData.saleAfterOrderVO.afterOrderState % 10 == 3
      }));
    r.onLoad((function(e) {
      e.afterOrderNo && (n.afterOrderNo = e.afterOrderNo, n.afterOrderId = e.afterOrderId), n.timer = setInterval((function() {
        "" != n.order.autoAuditStopTime && null != n.order.autoAuditStopTime && (n.order.autoJudgeRemind = l(n.order.autoAuditStopTime, n.order.afterOrderState))
      }), 3e3)
    })), r.onShow((function() {
      i(n.afterOrderNo, Number(n.afterOrderId))
    })), r.onUnload((function() {
      clearInterval(n.timer)
    }));
    var i = function(e, r) {
        console.log(e), t.apiGetAfterOrderDetail({
          afterOrderNo: e
        }).then((function(e) {
          var r = e.data.saleAfterOrderVO;
          if (9 == r.afterOrderState && (r.afterOrderState = 11, r.afterOrderStateDesc = "待审核"), n.myData = e.data, r.examineTime) {
            var t = (new Date).getTime(),
              a = new Date(r.examineTime.replace(/-/g, "/")).getTime() + 6048e5;
            n.days = Number((a - t) / 864e5).toFixed(0)
          }(2 == r.afterOrderType && r.afterOrderState % 10 == 3 || 3 == r.afterOrderType && r.afterOrderState % 10 == 3) && (n.afterSaleAddress = {
            afterLinker: r.afterLinker,
            afterLinkerPhone: r.afterLinkerPhone,
            afterLinkerAddressDetail: r.afterLinkerAddressDetail
          }), n.videoUrl = r.videoUrl, n.pictureUrlList = r.pictureUrlList, n.order = r
        }))
      },
      l = function(e, t) {
        if ("" == e || null == e) return "";
        var a, d = s(e),
          o = 1e3 * parseInt(String((new Date).getTime() / 1e3)) + 1e3 * (a = r.index.getStorageSync("diffentTime"), console.log("diffentTime:" + a), null == a || "" == a ? 0 : parseInt(a));
        if (d - o > 3e5) {
          var f = (d - o) / 1e3,
            i = parseInt((f / 86400).toString()),
            l = f % 86400,
            O = parseInt((l / 3600).toString()),
            u = parseInt(((l - 60 * O * 60) / 60).toString());
          return 10 == t ? (n.order.autoJudgeRemind = "", "人工介入处理中") : (n.order.autoJudgeRemind = "还剩" + i + "天" + O + "时" + u + "分自动退款", "还剩" + i + "天" + O + "时" + u + "分自动退款")
        }
        return n.order.autoJudgeRemind = "系统处理中", "系统处理中"
      },
      s = function(e) {
        var r = e;
        return r = (r = r.substring(0, 19)).replace(/-/g, "/"), new Date(r).getTime()
      };
    return e(e({
      AppTheme: a.AppTheme,
      confirmModalRef: o
    }, r.toRefs(n)), {}, {
      getDetail: i,
      handleCall: function(e) {
        d.uniUtil.makePhoneCall(e)
      },
      handlePay: function() {
        t.apiPayOrder(n.order.id).then((function(t) {
          r.index.requestPayment(e(e({}, t.data), {}, {
            success: function() {
              r.index.hideLoading(), i(n.order.id, n.afterOrderId)
            },
            fail: function(e) {
              d.uniUtil.showToast("支付失败")
            }
          }))
        }))
      },
      handleConfirmCancelOrder: function(e) {
        var r = {
          ids: [n.order.id],
          afterReason: e.reason
        };
        t.apiCancelOrder(r).then((function() {
          d.uniUtil.showToast("取消成功", {
            icon: "success"
          }), i(n.order.id, n.afterOrderId)
        }))
      },
      jumpBuyerRemark: function() {
        null != n.order.additionalRemarks && "" != n.order.additionalRemarks ? (getApp().globalData.afterSaleUpload = {
          videoUrl: n.videoUrl,
          pictureUrlList: n.pictureUrlList
        }, r.index.navigateTo({
          url: "/pages/order/afterSale/problemDescription?buyerRemark=".concat(n.order.additionalRemarks, "&videoSenderEmail=").concat(n.order.videoSenderEmail)
        })) : d.uniUtil.showToast("暂无描述")
      },
      handleOrderAgain: function() {
        r.index.navigateTo({
          url: "/pages/send/send"
        })
      },
      handleCopy: function(e) {
        d.uniUtil.copyText(e)
      },
      handleReApply: function(e) {
        r.index.navigateTo({
          url: "/pages/order/myOrder/detail?id=".concat(e.saleOrderNo)
        })
      },
      handleDelete: function(e) {
        o.value.confirm({
          title: "提示",
          message: "确定要删除该笔售后订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then((function() {
          t.apiDeleteAfterOrder([e.id]).then((function() {
            d.uniUtil.showToast("删除成功", {
              icon: "success"
            }), r.index.navigateBack({
              delta: 1
            })
          }))
        }))
      },
      editAddress: function() {
        r.index.navigateTo({
          url: "/pages/mine/address/address-list?fromPage=saleDetail&saleAfterId=".concat(n.myData.saleAfterOrderVO.id)
        })
      },
      handleDischargePetition: function(e) {
        o.value.confirm({
          title: "提示",
          message: "撤销申请后您可再次发起售后申请，确定要撤销本次申请吗？",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }).then((function() {
          t.apiCancelAfterOrder({
            id: e.id
          }).then((function() {
            d.uniUtil.showToast("撤销申请成功", {
              icon: "success"
            }), setTimeout((function() {
              r.index.navigateBack()
            }), 1e3)
          }))
        }))
      },
      handleToApplicationHistory: function() {
        r.index.navigateTo({
          url: "/pages/order/afterOrder/applicationHistory?afterOrderNo=" + n.order.afterOrderNo
        })
      },
      handleWaybill: function() {
        r.index.navigateTo({
          url: "/pages/order/afterOrder/wayBill?afterOrderId=".concat(n.order.id)
        })
      },
      isShowPostInput: f,
      giveMallMailInfo: function() {
        for (var e, r = 0; r < n.myData.saleAfterWaybillInfos.length; r++)
          if (0 == n.myData.saleAfterWaybillInfos[r].waybillType) {
            e = n.myData.saleAfterWaybillInfos[r];
            break
          } return e
      },
      getAutoJudgeRemind: l,
      giveMeMailInfo: function() {
        for (var e, r = 0; r < n.myData.saleAfterWaybillInfos.length; r++)
          if (1 == n.myData.saleAfterWaybillInfos[r].waybillType) {
            e = n.myData.saleAfterWaybillInfos[r];
            break
          } return e
      }
    })
  }
});
Array || (r.resolveComponent("uni-icons") + r.resolveComponent("price") + r.resolveComponent("order-product-item") + r.resolveComponent("confirm-modal") + r.resolveComponent("customer-service"))();
Math;
var n = r._export_sfc(o, [
  ["render", function(e, t, a, d, o, n) {
    return r.e({
      a: 1 == e.order.afterOrderType
    }, 1 == e.order.afterOrderType ? r.e({
      b: 11 == e.order.afterOrderState
    }, (e.order.afterOrderState, {}), {
      c: 13 == e.order.afterOrderState
    }, (e.order.afterOrderState, {}), {
      d: 14 == e.order.afterOrderState
    }, (e.order.afterOrderState, {}), {
      e: 15 == e.order.afterOrderState
    }, (e.order.afterOrderState, {}), {
      f: 12 == e.order.afterOrderState
    }, (e.order.afterOrderState, {}), {
      g: 10 == e.order.afterOrderState
    }, (e.order.afterOrderState, {}), {
      h: "" != e.getAutoJudgeRemind(e.order.autoAuditStopTime, e.order.afterOrderState)
    }, "" != e.getAutoJudgeRemind(e.order.autoAuditStopTime, e.order.afterOrderState) ? {
      i: r.t(e.order.autoJudgeRemind)
    } : 11 == e.order.afterOrderState || 13 == e.order.afterOrderState || 10 == e.order.afterOrderState ? {} : 12 == e.order.afterOrderState ? {
      n: r.t(e.order.afterAuditRemark)
    } : 14 == e.order.afterOrderState ? r.e({
      p: 4 == e.order.payMethod
    }, (e.order.payMethod, {})) : (e.order.afterOrderState, {}), {
      j: 11 == e.order.afterOrderState,
      k: 13 == e.order.afterOrderState,
      l: 10 == e.order.afterOrderState,
      m: 12 == e.order.afterOrderState,
      o: 14 == e.order.afterOrderState,
      q: 15 == e.order.afterOrderState
    }) : 2 == e.order.afterOrderType ? r.e({
      s: e.order.afterOrderState % 10 == 1
    }, (e.order.afterOrderState, {}), {
      t: e.order.afterOrderState % 10 == 3
    }, (e.order.afterOrderState, {}), {
      v: e.order.afterOrderState % 10 == 4
    }, (e.order.afterOrderState, {}), {
      w: e.order.afterOrderState % 10 == 5
    }, (e.order.afterOrderState, {}), {
      x: e.order.afterOrderState % 10 == 2
    }, (e.order.afterOrderState, {}), {
      y: e.order.afterOrderState % 10 == 1
    }, e.order.afterOrderState % 10 == 1 || e.order.afterOrderState % 10 == 3 ? {} : e.order.afterOrderState % 10 == 2 ? {
      B: r.t(e.order.afterAuditRemark)
    } : e.order.afterOrderState % 10 == 4 ? r.e({
      D: 4 == e.order.payMethod
    }, (e.order.payMethod, {})) : (e.order.afterOrderState, {}), {
      z: e.order.afterOrderState % 10 == 3,
      A: e.order.afterOrderState % 10 == 2,
      C: e.order.afterOrderState % 10 == 4,
      E: e.order.afterOrderState % 10 == 5
    }) : 3 == e.order.afterOrderType ? r.e({
      G: e.order.afterOrderState % 10 == 1
    }, (e.order.afterOrderState, {}), {
      H: e.order.afterOrderState % 10 == 3
    }, (e.order.afterOrderState, {}), {
      I: e.order.afterOrderState % 10 == 4
    }, (e.order.afterOrderState, {}), {
      J: e.order.afterOrderState % 10 == 5
    }, (e.order.afterOrderState, {}), {
      K: e.order.afterOrderState % 10 == 2
    }, (e.order.afterOrderState, {}), {
      L: e.order.afterOrderState % 10 == 1
    }, e.order.afterOrderState % 10 == 1 || e.order.afterOrderState % 10 == 3 ? {} : e.order.afterOrderState % 10 == 2 ? {
      O: r.t(e.order.afterAuditRemark)
    } : (e.order.afterOrderState % 10 == 4 || e.order.afterOrderState, {}), {
      M: e.order.afterOrderState % 10 == 3,
      N: e.order.afterOrderState % 10 == 2,
      P: e.order.afterOrderState % 10 == 4,
      Q: e.order.afterOrderState % 10 == 5
    }) : 4 == e.order.afterOrderType ? r.e({
      S: e.order.afterOrderState % 10 == 1
    }, (e.order.afterOrderState, {}), {
      T: e.order.afterOrderState % 10 == 3
    }, (e.order.afterOrderState, {}), {
      U: e.order.afterOrderState % 10 == 4
    }, (e.order.afterOrderState, {}), {
      V: e.order.afterOrderState % 10 == 5
    }, (e.order.afterOrderState, {}), {
      W: e.order.afterOrderState % 10 == 2
    }, (e.order.afterOrderState, {}), {
      X: e.order.afterOrderState % 10 == 1
    }, e.order.afterOrderState % 10 == 1 || e.order.afterOrderState % 10 == 3 ? {} : e.order.afterOrderState % 10 == 2 ? {
      aa: r.t(e.order.afterAuditRemark)
    } : (e.order.afterOrderState % 10 == 4 || e.order.afterOrderState, {}), {
      Y: e.order.afterOrderState % 10 == 3,
      Z: e.order.afterOrderState % 10 == 2,
      ab: e.order.afterOrderState % 10 == 4,
      ac: e.order.afterOrderState % 10 == 5
    }) : {}, {
      r: 2 == e.order.afterOrderType,
      F: 3 == e.order.afterOrderType,
      R: 4 == e.order.afterOrderType,
      ad: r.t(e.order.afterOrderStateAppDesc),
      ae: r.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      }),
      af: r.o((function(r) {
        return e.handleToApplicationHistory()
      })),
      ag: r.t(null != e.order.additionalRemarks ? e.order.additionalRemarks : "暂无"),
      ah: r.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      }),
      ai: r.o((function() {
        return e.jumpBuyerRemark && e.jumpBuyerRemark.apply(e, arguments)
      })),
      aj: e.order.afterOrderType > 2 && null != e.giveMeMailInfo()
    }, e.order.afterOrderType > 2 && null != e.giveMeMailInfo() ? {
      ak: r.t("  " + (3 == e.order.afterOrderType ? "换货商品快递信息" : "补寄商品快递信息") + "  "),
      al: r.t(e.giveMeMailInfo().saleAfterExpressDelivery),
      am: r.o((function() {
        return e.jumpBuyerRemark && e.jumpBuyerRemark.apply(e, arguments)
      })),
      an: r.t(e.giveMeMailInfo().waybillNo),
      ao: r.o((function() {
        return e.jumpBuyerRemark && e.jumpBuyerRemark.apply(e, arguments)
      }))
    } : {}, {
      ap: 1 == e.order.afterOrderType || 2 == e.order.afterOrderType
    }, 1 == e.order.afterOrderType || 2 == e.order.afterOrderType ? r.e({
      aq: 4 == e.order.payMethod
    }, (4 == e.order.payMethod || e.order.payMethod, {}), {
      ar: 8 == e.order.payMethod,
      as: r.p({
        hideTip: 1 == e.order.payMethod || 2 == e.order.payMethod,
        price: e.myData.saleAfterOrderVO.afterTotalFee
      }),
      at: r.o((function(r) {
        return e.handleToApplicationHistory()
      }))
    }) : {}, {
      av: r.f(e.order.saleAfterOrderProductInfos, (function(e, t, a) {
        return {
          a: "26b7c67e-3-" + a,
          b: r.p({
            product: e,
            pageType: "detail"
          }),
          c: t
        }
      })),
      aw: 1 == e.order.afterOrderType || 2 == e.order.afterOrderType || 3 == e.order.afterOrderType || 4 == e.order.afterOrderType
    }, 1 == e.order.afterOrderType || 2 == e.order.afterOrderType || 3 == e.order.afterOrderType || 4 == e.order.afterOrderType ? r.e({
      ax: 1 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      ay: 2 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      az: 3 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      aA: 4 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      aB: r.t(e.order.afterReason)
    }) : {}, {
      aC: 2 == e.order.afterOrderType || 3 == e.order.afterOrderType || 4 == e.order.afterOrderType
    }, 2 == e.order.afterOrderType || 3 == e.order.afterOrderType || 4 == e.order.afterOrderType ? r.e({
      aD: 2 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      aE: 3 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      aF: 4 == e.order.afterOrderType
    }, (e.order.afterOrderType, {}), {
      aG: r.t(e.order.productNum)
    }) : {}, {
      aH: r.t(e.order.createTime),
      aI: r.t(e.order.saleOrderNo),
      aJ: r.t(e.order.afterOrderNo),
      aK: e.isShowPostInput
    }, e.isShowPostInput ? {
      aL: r.t(e.afterSaleAddress.afterLinker),
      aM: r.t(e.afterSaleAddress.afterLinkerPhone),
      aN: r.t(e.afterSaleAddress.afterLinkerAddressDetail)
    } : {}, {
      aO: (2 == e.myData.saleAfterOrderVO.afterOrderType || 3 == e.myData.saleAfterOrderVO.afterOrderType) && null != e.myData.saleAfterWaybillInfos && e.myData.saleAfterWaybillInfos.length > 0 && null != e.giveMallMailInfo()
    }, (2 == e.myData.saleAfterOrderVO.afterOrderType || 3 == e.myData.saleAfterOrderVO.afterOrderType) && null != e.myData.saleAfterWaybillInfos && e.myData.saleAfterWaybillInfos.length > 0 && null != e.giveMallMailInfo() ? {
      aP: r.t(e.myData.saleAfterWaybillInfos[0].saleAfterExpressDelivery),
      aQ: r.t(e.myData.saleAfterWaybillInfos[0].waybillNo)
    } : {}, {
      aR: 3 == e.order.afterOrderType || 4 == e.order.afterOrderType
    }, 3 == e.order.afterOrderType || 4 == e.order.afterOrderType ? {
      aS: r.t(e.order.receiver),
      aT: r.t(e.order.receiverPhone),
      aU: r.t(e.order.receiverDetailAddress)
    } : {}, {
      aV: [2, 5].includes(e.order.afterOrderState % 10)
    }, [2, 5].includes(e.order.afterOrderState % 10) ? {
      aW: r.o((function(r) {
        return e.handleReApply(e.order)
      }))
    } : {}, {
      aX: [2, 4, 5, 10].includes(e.order.afterOrderState % 10)
    }, [2, 4, 5, 10].includes(e.order.afterOrderState % 10) ? {
      aY: r.o((function(r) {
        return e.handleDelete(e.order)
      }))
    } : {}, {
      aZ: [10, 11].includes(e.order.afterOrderState) || [3].includes(e.order.afterOrderState % 10)
    }, [10, 11].includes(e.order.afterOrderState) || [3].includes(e.order.afterOrderState % 10) ? {
      ba: r.o((function(r) {
        return e.handleDischargePetition(e.order)
      }))
    } : {}, {
      bb: e.isShowPostInput
    }, e.isShowPostInput ? {
      bc: r.o((function(r) {
        return e.handleWaybill(e.order)
      }))
    } : {}, {
      bd: r.sr("confirmModalRef", "26b7c67e-4")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterOrder/detail.vue"]
]);
wx.createPage(n);