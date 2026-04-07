require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../common/vendor.js"),
  t = require("../../../apis/order.js"),
  a = require("../../../common/app-theme.js"),
  d = require("../../../common/common.js"),
  n = require("../../../utils/uniUtil.js"),
  i = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../apis/shopCart.js"), require("../../../utils/commonEnum.js");
var s = o.defineComponent({
  name: "orderDetail",
  components: {
    cancelOrderConfirm: function() {
      return "../components/cancel-order-confirm.js"
    },
    orderProductItem: function() {
      return "../../../components/order-product-item-detail.js"
    },
    price: function() {
      return "../../../components/price.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    customerService: function() {
      return "../components/customer-service.js"
    },
    postAgeDialog: function() {
      return "../../dialog/PostAgeDialog.js"
    },
    confirmModalReason: function() {
      return "../../../components/modal/confirm-modal-reason.js"
    }
  },
  setup: function() {
    var e = o.ref(null),
      s = o.ref(null),
      l = o.ref(null),
      c = o.ref(),
      u = o.reactive({
        fromPage: "",
        hiddenStatus: !1,
        id: 0,
        orderType: 2,
        packageActive: 0,
        waybillNoRemark: "",
        detailParams: {},
        surplusPay: 0,
        shopTotalPrice: 0,
        backPageTip: "",
        orderStateDesc: "",
        order: {
          id: "",
          state: "",
          statusDesc: "",
          orderDesc: "",
          statusIcon: "",
          bgStatusIcon: "",
          goodsList: [],
          orderType: "",
          saleOrderSplitInfos: [],
          saleOrderNo: ""
        },
        timeValue: 1,
        postArgs: {
          oldAddress: {
            receiver: "",
            receiverAddress: "",
            receiverCity: "",
            receiverCounty: "",
            receiverPhone: "",
            receiverProvince: "",
            receiverStreet: ""
          },
          newAddress: {
            receiver: "",
            receiverAddress: "",
            receiverCity: "",
            receiverCounty: "",
            receiverPhone: "",
            receiverProvince: "",
            receiverStreet: ""
          },
          saleOrderId: 0,
          saleOrderNo: "",
          diffFee: 0,
          code: 0,
          type: 0
        },
        invoiceOpen: 0
      });
    o.onShow((function() {
      m(u.id, u.timeValue)
    })), o.onLoad((function(e) {
      o.index.$on("updateAddressPost", (function(e) {
        if (111 == e.code) {
          if (null == e.data.updateAddress || null == e.data.address || null == e.data.diffFee) return void o.index.showToast({
            title: "稍后再试",
            icon: "none",
            success: function() {}
          });
          u.postArgs = {
            oldAddress: e.data.address,
            newAddress: e.data.updateAddress,
            saleOrderId: Number(u.order.id),
            saleOrderNo: u.order.saleOrderNo,
            diffFee: e.data.diffFee,
            code: e.code,
            type: 0
          }, setTimeout((function() {
            c.value.openDialog()
          }), 300)
        } else if (110 == e.code) {
          if (null == e.data.saleOrderReceiverVO || null == e.data.saleMailOrderReceiverVO || null == e.data.saleMailOrderReceiverVO.orderPrice) return void o.index.showToast({
            title: "稍后再试",
            icon: "none",
            success: function() {}
          });
          u.postArgs = {
            oldAddress: e.data.saleOrderReceiverVO,
            newAddress: e.data.saleMailOrderReceiverVO,
            saleOrderId: Number(u.order.id),
            saleOrderNo: u.order.saleOrderNo,
            diffFee: e.data.saleMailOrderReceiverVO.orderPrice,
            code: e.code,
            type: 1
          }, setTimeout((function() {
            c.value.openDialog()
          }), 300)
        }
      })), u.backPageTip = e.backPageTip || "", u.fromPage = e.fromPage || "", e.id && (u.orderType = Number(e.orderType), u.id = Number(e.id) || e.id, e.timeValue && (u.timeValue = Number(e.timeValue)), e.invoiceOpen ? u.invoiceOpen = Number(e.invoiceOpen) : u.invoiceOpen = 0)
    })), o.onUnload((function() {
      o.index.$off("updateAddressPost", (function() {})), u.backPageTip && o.index.switchTab({
        url: "/pages/mine/mine"
      })
    }));
    var f = function() {
        var e = 0;
        if (null == u.order.saleOrderProductInfos) return "0";
        for (var r = 0; r < u.order.saleOrderProductInfos.length; r++) e += 100 * u.order.saleOrderProductInfos[r].actualAmount;
        return "" + (e /= 100)
      },
      p = function() {
        var e, r, o = 0;
        if (1 == u.order.payMethod || 2 == u.order.payMethod) {
          for (var t = 0; t < u.order.saleOrderProductInfos.length; t++) o += 100 * (null != (e = u.order.saleOrderProductInfos[t].actualAmount) ? e : 0);
          o /= 100
        } else if (4 == u.order.payMethod) {
          for (t = 0; t < u.order.saleOrderProductInfos.length; t++) o += 100 * u.order.saleOrderProductInfos[t].payPoint;
          o /= 100
        } else if (8 == u.order.payMethod) {
          for (t = 0; t < u.order.saleOrderProductInfos.length; t++) null != u.order.saleOrderProductInfos[t].payBalance && (o += 100 * u.order.saleOrderProductInfos[t].payBalance);
          o /= 100
        } else if (256 == u.order.payMethod) o = 0;
        else {
          for (t = 0; t < u.order.saleOrderProductInfos.length; t++) o += 100 * (null != (r = u.order.saleOrderProductInfos[t].originalPrice) ? r : 0) * u.order.saleOrderProductInfos[t].num;
          o /= 100
        }
        return o.toFixed(2)
      },
      y = function(e) {
        var r, o;
        return 10 != e.orderState && (3 != e.orderType && (e.orderState <= 3 && 1 == e.saleAfterState && ((null == (r = e.afterSaleOrderInfo) ? void 0 : r.afterOrderState) || 0) % 10 == 4 || !(![4, 5, 6, 7, 8].includes(e.orderState) || 0 != e.saleAfterState && ((null == (o = e.afterSaleOrderInfo) ? void 0 : o.afterOrderState) || 0) % 10 != 4)))
      },
      m = function(e, a) {
        (u.fromPage ? t.apiGetOrderDetail({
          saleOrderId: e,
          dataRange: a
        }) : t.apiGetOrderDetail({
          saleOrderNo: e,
          dataRange: a
        })).then((function(e) {
          var t, a;
          console.log(e.data);
          var n = e.data.saleOrderInfo;
          256 == n.payMethod && (n.saleOrderProductInfos = n.giftsInfos, n.payMethodDesc = n.payMethodDesc.replace("券码", "兑换码")), n.packageInfos = e.data.packageInfos, n.statusDesc = 1 == n.payState && 0 == n.orderState ? "待付款" : d.getOrderStatusDesc(n.orderState);
          var s = v(n.orderState);
          n.statusIcon = "/static/image/order/".concat(s, ".png"), n.bgStatusIcon = "/static/image/order/".concat(s, ".png"), n.orderPrice = n.orderPrice || 0, n.waybillFee = n.waybillFee || 0, n.actualPrice = n.actualPrice || 0;
          var l, c = o.dayjs(n.createTime).add(600 + (null == (l = o.index.getStorageSync("diffentTime")) || "" == l ? 0 : parseInt(l)), "seconds"),
            f = o.dayjs(),
            p = i.getDiffTime(c, f);
          n.countDounObj = p, n.countDounTimeup = p.dateDiff < 0;
          var y = o.dayjs(n.deliveryTime).add(15, "day"),
            m = o.dayjs(),
            S = i.getDiffTime(y, m);
          n.deliveryCountDounObj = S, n.deliveryCountDounTimeup = S.dateDiff < 0;
          var g = 0;
          n.saleOrderProductInfos = !n.saleOrderProductInfos || n.saleOrderProductInfos.map((function(e) {
            return g += e.weight, r(r({}, e), n.afterSaleOrderInfo)
          })), h(n), console.log(n, "orderorder"), n.saleOrderSplitInfos = e.data.saleOrderSplitInfos, n.weight = g, (null == (a = null == (t = e.data) ? void 0 : t.packageInfos) ? void 0 : a.length) && O(e.data.packageInfos[0].waybillNo), u.order = n;
          var P = getApp(),
            T = n.receiver,
            A = n.receiverAddress,
            I = n.receiverCity,
            b = n.receiverCounty,
            w = n.receiverPhone,
            D = n.receiverProvince,
            N = n.receiverStreet,
            C = n.receiverDetailAddress;
          n.receiverPhone = i.slicePhone(n.receiverPhone), P.globalData.afterSaleAddress = {
            receiver: T,
            receiverAddress: A,
            receiverCity: I,
            receiverCounty: b,
            receiverPhone: w,
            receiverProvince: D,
            receiverStreet: N,
            receiverDetailAddress: C
          };
          var M = u.order.saleOrderProductInfos.map((function(e) {
              return {
                number: e.num,
                skuId: e.skuId
              }
            })),
            R = u.order.saleOrderProductInfos.map((function(e) {
              return {
                companyId: e.soCompanyId,
                orgId: e.soOrgId,
                goodsItems: M
              }
            }));
          u.detailParams = {
            orderType: u.order.orderType,
            orderItems: [R[0]],
            useTicket: 1
          }
        }))
      },
      h = function(e) {
        if (u.shopTotalPrice = 0, 1 == e.payMethod || 2 == e.payMethod) e.saleOrderProductInfos.forEach((function(e) {
          u.shopTotalPrice += e.actualAmount
        })), e.actualPrice = (u.shopTotalPrice + ((null == e ? void 0 : e.waybillFee) || 0)).toFixed(2);
        else if (4 == e.payMethod) e.saleOrderProductInfos.forEach((function(e) {
          u.shopTotalPrice += e.payPoint
        })), e.actualPrice = u.shopTotalPrice;
        else if (8 == e.payMethod) e.saleOrderProductInfos.forEach((function(e) {
          u.shopTotalPrice += e.payBalance
        })), u.surplusPay = Number((u.shopTotalPrice + ((null == e ? void 0 : e.waybillBalanceFee) || 0)).toFixed(2)), e.actualPrice = 0;
        else {
          if (256 != e.payMethod) return e.saleOrderProductInfos.forEach((function(e) {
            u.shopTotalPrice += e.actualAmount
          })), void(e.actualPrice = (u.shopTotalPrice + ((null == e ? void 0 : e.waybillFee) || 0)).toFixed(2));
          e.actualPrice = 0
        }
      },
      v = function(e) {
        var r = "";
        switch (e) {
          case 0:
          case 3:
            r = "wait_receive";
            break;
          case 4:
          case 5:
          case 6:
          case 7:
            r = "wait_send";
            break;
          case 8:
          case 9:
            r = "complete"
        }
        return r
      },
      S = function() {
        s.value.confirm({
          title: "",
          message: "抱歉，历史订单请在PC端或公众号查看订单后联系客服处理",
          cancelButtonText: "知道了"
        })
      },
      O = function(e) {
        u.waybillNoRemark = "", e && t.apiExpressDetail(e).then((function(e) {
          var r, o;
          u.waybillNoRemark = null == (r = null == e ? void 0 : e.data[e.data.length - 1]) ? void 0 : r.remark, u.orderStateDesc = e.data.length ? null == (o = null == e ? void 0 : e.data[e.data.length - 1]) ? void 0 : o.stateDesc : "运输中"
        }))
      };
    return r(r({
      AppTheme: a.AppTheme,
      cancelConfirmRef: e,
      confirmModalRef: s,
      confirmModalReasonRef: l,
      postAgePopRef: c
    }, o.toRefs(u)), {}, {
      canShowSaleAfterApplyBtn: y,
      canShowSaleAfterDetailyBtn: function(e) {
        var r, o, t;
        return 10 == e.orderState && 0 != e.saleAfterState && ((null == (r = e.afterSaleOrderInfo) ? void 0 : r.afterOrderState) || 0) % 10 != 4 || (e.orderState <= 3 && 1 == e.saleAfterState && ((null == (o = e.afterSaleOrderInfo) ? void 0 : o.afterOrderState) || 0) % 10 != 4 || !(![4, 5, 6, 7, 8].includes(e.orderState) || 0 == e.saleAfterState || ((null == (t = e.afterSaleOrderInfo) ? void 0 : t.afterOrderState) || 0) % 10 == 4))
      },
      updateAddressBtn: function(e) {
        return 10 !== e.orderState && e.orderState <= 3 && 1 !== e.saleAfterState
      },
      handleCall: function(e) {
        n.uniUtil.makePhoneCall(e)
      },
      handleCancelOrder: function(e) {
        e.saleOrderNo.startsWith("TF-") ? S() : (u.hiddenStatus = !0, s.value.confirm({
          title: "",
          message: "确定取消订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "暂不取消"
        }).then((function() {
          t.apiCancelListOrder([e.id]).then((function() {
            n.uniUtil.showToast("取消订单成功", {
              icon: "success"
            }), m(u.id, u.timeValue)
          }))
        })))
      },
      handlePay: function(e) {
        if (e.saleOrderNo.startsWith("TF-")) S();
        else {
          var r = {
            orderIds: [e.id],
            isComeNoPay: 0
          };
          o.index.navigateTo({
            url: "/pages/order/myOrder/pay?params=".concat(JSON.stringify(r))
          })
        }
      },
      handleConfirmCancelOrder: function(e) {
        u.hiddenStatus = !1;
        var r = {
          ids: [u.order.id],
          afterReason: e.reason
        };
        t.apiCancelOrder(r).then((function() {
          n.uniUtil.showToast("取消订单成功", {
            icon: "success"
          }), setTimeout((function() {
            m(u.id, u.timeValue)
          }), 500)
        }))
      },
      handleAfterSales: function(e) {
        e.saleOrderNo.startsWith("TF-") ? S() : o.index.navigateTo({
          url: "/pages/order/afterSale/afterSaleGoods?id=".concat(e.id, "&orderState=").concat(e.orderState, "&payMethod=").concat(e.payMethod)
        })
      },
      handleModifyAddress: function(e) {
        var r = {
          recevier: e.receiver,
          phone: e.receiverPhone,
          address: e.receiverDetailAddress
        };
        e.saleOrderNo.startsWith("TF-") ? S() : 1 == e.payState ? o.index.navigateTo({
          url: "/pages/mine/address/address-list?fromPage=orderDetail&id=".concat(e.id, "&waybillFee=").concat(u.order.waybillFee, "&urlParams=").concat(JSON.stringify(u.detailParams), "&isNoPay=").concat(1 == e.payState && [0].includes(e.orderState) ? 1 : 0, "&address=").concat(JSON.stringify(r))
        }) : t.apiHasPostOrder(e.id).then((function(t) {
          if (200 == t.code && null != t.data)
            if (220 === t.data.code) o.index.navigateTo({
              url: "/pages/mine/address/address-list?fromPage=orderDetail&id=".concat(e.id, "&waybillFee=").concat(u.order.waybillFee, "&urlParams=").concat(JSON.stringify(u.detailParams), "&isNoPay=").concat(1 == e.payState && [0].includes(e.orderState) ? 1 : 0, "&address=").concat(JSON.stringify(r))
            });
            else if (110 === t.data.code) {
            if (null == t.data.data.saleOrderReceiverVO || null == t.data.data.saleMailOrderReceiverVO || null == t.data.data.saleMailOrderReceiverVO.orderPrice) return void o.index.showToast({
              title: "稍后再试",
              icon: "none",
              success: function() {}
            });
            u.postArgs = {
              oldAddress: t.data.data.saleOrderReceiverVO,
              newAddress: t.data.data.saleMailOrderReceiverVO,
              saleOrderId: Number(u.order.id),
              saleOrderNo: u.order.saleOrderNo,
              diffFee: t.data.data.saleMailOrderReceiverVO.orderPrice,
              code: t.data.code,
              type: 1
            }, c.value.openDialog()
          }
        })).catch((function(e) {}))
      },
      handleSendOutGood: function() {
        s.value.confirm({
          title: "",
          message: "已成功提醒商家发货啦~",
          confirmButtonText: "",
          cancelButtonText: "知道了"
        })
      },
      cancelConfirm: function() {
        u.hiddenStatus = !1
      },
      handleOrderAgain: function() {
        o.index.navigateTo({
          url: "/pages/send/send"
        })
      },
      handleCopy: function(e) {
        n.uniUtil.copyText(e)
      },
      handleProductTab: function(e, r) {
        u.packageActive = r, O(e.waybillNo)
      },
      handleTimeUp: function() {
        u.order.orderState = 10, u.order.statusDesc = "已取消"
      },
      handleDeleteOrder: function(e) {
        e.saleOrderNo.startsWith("TF-") ? S() : s.value.confirm({
          title: "",
          message: "确认删除订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "返回"
        }).then((function() {
          t.apiCancelOrderDelete([e.id]).then((function() {
            n.uniUtil.showToast("删除成功", {
              icon: "success"
            }), o.index.navigateBack()
          }))
        }))
      },
      handleConfirmReceive: function(e) {
        var r;
        e.saleOrderNo.startsWith("TF-") ? S() : null == (r = null == s ? void 0 : s.value) || r.confirm({
          title: "提示",
          message: "确认已经收到货了吗？",
          confirmButtonText: "确认",
          cancelButtonText: "返回"
        }).then((function() {
          t.apiConfirmReceiveOrder([e.id]).then((function() {
            n.uniUtil.showToast("确认收货成功", {
              icon: "success"
            }), m(u.id, u.timeValue)
          }))
        }))
      },
      handleToLogisticsDetails: function(e, r) {
        r.saleOrderNo.startsWith("TF-") ? S() : o.index.navigateTo({
          url: "/pages/order/myOrder/logisticsDetails?waybillNo=" + e.waybillNo + "&waybillNolist=" + u.order.saleOrderSplitInfos.map((function(e) {
            return e.waybillNo
          })).join(",")
        })
      },
      handleExpressDetail: O,
      handleToAfterDetail: function(e) {
        y(u.order) || e.afterOrderState && o.index.navigateTo({
          url: "/pages/order/afterOrder/detail?afterOrderNo=".concat(e.afterOrderNo, "&afterOrderId=").concat(e.afterOrderId)
        })
      },
      handleApplyInvoice: function(e) {
        o.index.navigateTo({
          url: "/pages/bill/notInvoiced?saleOrderNo=".concat(e.saleOrderNo, "&saleOrderId=").concat(e.id, "&payTotalAmount=").concat(e.payTotalAmount)
        })
      },
      goodAllPrice: function() {
        return 8 == u.order.payMethod || null == u.order.payMethod || 256 == u.order.payMethod || u.order.payMethod <= 2 ? "¥" + f() : p() + "积分"
      },
      handleReasonResult: function(e) {
        console.log(e);
        var r = e.reasonDesc,
          o = "";
        null != r && null != r && (o = r);
        var a = {
          orderId: u.order.id,
          reason: o
        };
        t.apiCancelListOrderWithReason(a).then((function(e) {
          500 == e.data.code && e.data.message ? n.uniUtil.showToast(e.data.message) : (n.uniUtil.showToast("取消订单成功", {
            icon: "success"
          }), m(u.id, u.timeValue))
        }))
      },
      cancelReason: function() {},
      handleCancelOrderReason: function(e) {
        e.saleOrderNo.startsWith("TF-") ? S() : l.value.open({
          title: "",
          message: "确定取消订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "暂不取消"
        })
      }
    })
  }
});
Array || (o.resolveComponent("uni-countdown") + o.resolveComponent("order-product-item") + o.resolveComponent("price") + o.resolveComponent("cancel-order-confirm") + o.resolveComponent("confirm-modal") + o.resolveComponent("confirm-modal-reason") + o.resolveComponent("customer-service") + o.resolveComponent("post-age-dialog"))();
Math;
var l = o._export_sfc(s, [
  ["render", function(r, t, a, d, n, i) {
    return o.e({
      a: o.t(r.order.statusDesc),
      b: 1 == r.order.payState && [0].includes(r.order.orderState)
    }, 1 == r.order.payState && [0].includes(r.order.orderState) ? o.e({
      c: !r.order.countDounTimeup
    }, r.order.countDounTimeup ? {} : {
      d: o.p(e(e(e(e(e({
        color: "#E85252"
      }, "font-size", 13), "show-day", !1), "hour", r.order.countDounObj.hours), "minute", r.order.countDounObj.minutes), "second", r.order.countDounObj.seconds))
    }) : 1 != r.order.payState && [0, 1, 2, 3].includes(r.order.orderState) || [9].includes(r.order.orderState) || [6, 7, 8].includes(r.order.orderState) || [4].includes(r.order.orderState) ? {} : [5].includes(r.order.orderState) ? o.e({
      j: "已签收" == r.order.orderStateDesc
    }, (r.order.orderStateDesc, {})) : [10].includes(r.order.orderState) ? o.e({
      l: 0 == r.order.payState
    }, (r.order.payState, {})) : [2].includes(r.order.orderState) ? {
      n: o.t(r.order.auditRemark || "订单已经取消")
    } : {}, {
      e: 1 != r.order.payState && [0, 1, 2, 3].includes(r.order.orderState),
      f: [9].includes(r.order.orderState),
      g: [6, 7, 8].includes(r.order.orderState),
      h: [4].includes(r.order.orderState),
      i: [5].includes(r.order.orderState),
      k: [10].includes(r.order.orderState),
      m: [2].includes(r.order.orderState),
      o: [0, 1, 2, 3, 9, 10].includes(r.order.orderState)
    }, [0, 1, 2, 3, 9, 10].includes(r.order.orderState) ? {
      p: o.t(r.order.receiver),
      q: o.t(r.$filters.encryptPhone(r.order.receiverPhone)),
      r: o.t(r.order.receiverDetailAddress)
    } : [4, 5, 6, 7, 8].includes(r.order.orderState) ? o.e({
      t: r.order.packageInfos.length > 1
    }, r.order.packageInfos.length > 1 ? {
      v: o.f(r.order.packageInfos, (function(e, t, a) {
        return {
          a: o.t(t + 1),
          b: o.n(r.packageActive == t ? "package-group active" : "package-group"),
          c: o.o((function(o) {
            return r.handleProductTab(e, t)
          })),
          d: t
        }
      }))
    } : {}, {
      w: o.f(r.order.packageInfos, (function(e, t, a) {
        return o.e({
          a: r.packageActive == t
        }, r.packageActive == t ? o.e({
          b: e.waybillNo
        }, e.waybillNo ? {
          c: o.t(e.waybillNo),
          d: o.o((function(o) {
            return r.handleCopy(e.waybillNo)
          }))
        } : {}, {
          e: o.t(r.orderStateDesc),
          f: o.t(r.waybillNoRemark || "包裹运输中"),
          g: o.o((function(o) {
            return r.handleToLogisticsDetails(e, r.order)
          }))
        }) : {}, {
          h: t
        })
      }))
    }) : {}, {
      s: [4, 5, 6, 7, 8].includes(r.order.orderState),
      x: o.f(r.order.saleOrderProductInfos, (function(e, t, a) {
        return {
          a: "3a666044-1-" + a,
          b: o.p({
            product: e,
            showSaleAfter: !1,
            pageType: "detail",
            orderType: r.order.orderType
          }),
          c: t
        }
      })),
      y: o.t(r.goodAllPrice()),
      z: 3 != r.order.orderType
    }, 3 != r.order.orderType ? o.e({
      A: !r.order.waybillFee && 8 == r.order.payMethod || 0 == r.order.waybillFee
    }, !r.order.waybillFee && 8 == r.order.payMethod || 0 == r.order.waybillFee ? {} : {
      B: o.p({
        price: r.order.waybillFee
      })
    }) : {}, {
      C: 8 == r.order.payMethod
    }, 8 == r.order.payMethod ? {
      D: o.t(r.surplusPay)
    } : {}, {
      E: o.p({
        type: "order",
        hideTip: 4 != r.order.payMethod,
        price: r.order.actualPrice || 0,
        className: 8 == r.order.payMethod ? "actual-price" : "light-actual-price",
        payState: r.order.payState
      }),
      F: 4 == r.order.payMethod
    }, (r.order.payMethod, {}), {
      G: o.t(r.order.saleOrderNo),
      H: o.o((function(e) {
        return r.handleCopy(r.order.saleOrderNo)
      })),
      I: o.t(r.order.createTime),
      J: 2 == r.order.payState
    }, 2 == r.order.payState ? {
      K: o.t(r.order.payTime)
    } : {}, {
      L: 2 == r.order.payState
    }, 2 == r.order.payState ? {
      M: o.t(r.order.payMethodDesc)
    } : {}, {
      N: [4, 5, 6, 7, 8].includes(r.order.orderState) && 3 != r.order.orderType
    }, [4, 5, 6, 7, 8].includes(r.order.orderState) && 3 != r.order.orderType ? {
      O: o.t(r.order.receiver),
      P: o.t(r.$filters.encryptPhone(r.order.receiverPhone)),
      Q: o.t(r.order.receiverDetailAddress)
    } : {}, {
      R: r.order.buyerRemark
    }, r.order.buyerRemark ? {
      S: o.t(r.order.buyerRemark)
    } : {}, {
      T: r.canShowSaleAfterApplyBtn(r.order)
    }, r.canShowSaleAfterApplyBtn(r.order) ? {
      U: o.o((function(e) {
        return r.handleAfterSales(r.order)
      }))
    } : {}, {
      V: r.canShowSaleAfterDetailyBtn(r.order)
    }, r.canShowSaleAfterDetailyBtn(r.order) ? {
      W: o.o((function(e) {
        return r.handleToAfterDetail(r.order.saleOrderProductInfos[0])
      }))
    } : {}, {
      X: r.order.payMethod && 8 !== r.order.payMethod && [8].includes(r.order.orderState) && 3 !== r.order.saleOrderProductInfos[0].goodsType
    }, r.order.payMethod && 8 !== r.order.payMethod && [8].includes(r.order.orderState) && 3 !== r.order.saleOrderProductInfos[0].goodsType ? {
      Y: o.t(1 == r.invoiceOpen ? "发票详情" : "申请发票"),
      Z: o.o((function(e) {
        return r.handleApplyInvoice(r.order)
      }))
    } : {}, {
      aa: 1 == r.order.payState && [10, 2].includes(r.order.orderState) || 1 != r.order.payState && [10].includes(r.order.orderState)
    }, 1 == r.order.payState && [10, 2].includes(r.order.orderState) || 1 != r.order.payState && [10].includes(r.order.orderState) ? {
      ab: o.o((function(e) {
        return r.handleDeleteOrder(r.order)
      }))
    } : {}, {
      ac: [0, 1].includes(r.order.orderState) && 0 == r.order.saleAfterState
    }, [0, 1].includes(r.order.orderState) && 0 == r.order.saleAfterState ? {
      ad: o.o((function(e) {
        return r.handleCancelOrder(r.order)
      }))
    } : {}, {
      ae: 3 == r.order.orderState && 0 == r.order.saleAfterState
    }, 3 == r.order.orderState && 0 == r.order.saleAfterState ? {
      af: o.o((function(e) {
        return r.handleCancelOrderReason(r.order)
      }))
    } : {}, {
      ag: 1 !== r.order.payState && [0, 3].includes(r.order.orderState) && 0 == r.order.saleAfterState
    }, 1 !== r.order.payState && [0, 3].includes(r.order.orderState) && 0 == r.order.saleAfterState ? {
      ah: o.o((function(e) {
        return r.handleSendOutGood(r.order)
      }))
    } : {}, {
      ai: r.updateAddressBtn(r.order)
    }, r.updateAddressBtn(r.order) ? {
      aj: o.o((function(e) {
        return r.handleModifyAddress(r.order)
      }))
    } : {}, {
      ak: [4, 5, 6, 7, 8].includes(r.order.orderState) && 3 !== r.order.saleOrderProductInfos[0].goodsType && 3 != r.order.orderType
    }, [4, 5, 6, 7, 8].includes(r.order.orderState) && 3 !== r.order.saleOrderProductInfos[0].goodsType && 3 != r.order.orderType ? {
      al: o.o((function(e) {
        return r.handleToLogisticsDetails(r.order.saleOrderSplitInfos[0], r.order)
      }))
    } : {}, {
      am: [4, 5, 6, 7].includes(r.order.orderState)
    }, [4, 5, 6, 7].includes(r.order.orderState) ? {
      an: o.o((function(e) {
        return r.handleConfirmReceive(r.order)
      }))
    } : {}, {
      ao: 1 == r.order.payState && [0].includes(r.order.orderState)
    }, 1 == r.order.payState && [0].includes(r.order.orderState) ? {
      ap: o.o((function(e) {
        return r.handlePay(r.order)
      })),
      aq: r.order.countDounTimeup
    } : {}, {
      ar: o.sr("cancelConfirmRef", "3a666044-4"),
      as: o.o(r.handleConfirmCancelOrder),
      at: o.o(r.cancelConfirm),
      av: o.sr("confirmModalRef", "3a666044-5"),
      aw: o.sr("confirmModalReasonRef", "3a666044-6"),
      ax: o.o(r.handleReasonResult),
      ay: o.o(r.cancelReason),
      az: o.sr("postAgePopRef", "3a666044-8"),
      aA: o.p({
        args: r.postArgs,
        type: r.postArgs.type
      }),
      aB: r.hiddenStatus ? "hidden" : "unset",
      aC: r.hiddenStatus ? "100vh" : "unset"
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/detail.vue"]
]);
wx.createPage(l);