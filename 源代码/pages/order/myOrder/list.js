require("../../../@babel/runtime/helpers/Arrayincludes");
var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  o = require("../../../apis/order.js"),
  a = require("../../../common/common.js"),
  n = require("../../../common/constant.js"),
  i = require("../../../common/user.js"),
  s = require("../../../utils/uniUtil.js"),
  d = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js"), require("../../../apis/user.js"), require("../../../utils/commonEnum.js");
var c = t.defineComponent({
  name: "orderSearch",
  components: {
    searchBar: function() {
      return "../../../components/search-bar.js"
    },
    noData: function() {
      return "../../../components/no-data.js"
    },
    cancelOrderConfirm: function() {
      return "../components/cancel-order-confirm.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    confirmModalReason: function() {
      return "../../../components/modal/confirm-modal-reason.js"
    },
    searchFilter: function() {
      return "../components/search-filter.js"
    },
    orderProductItem: function() {
      return "../../../components/order-product-item.js"
    },
    price: function() {
      return "../../../components/price.js"
    },
    postAgeDialog: function() {
      return "../../dialog/PostAgeDialog.js"
    }
  },
  setup: function() {
    var e = t.ref(),
      c = t.ref(null),
      l = t.ref(null),
      u = t.ref(null),
      f = t.ref(null),
      p = t.reactive({
        hiddenStatus: !1,
        hiddenTabs: !0,
        isLogin: !1,
        isHighIndex: !1,
        pullRefresh: !1,
        loadMoreStatus: n.LoadMoreStatus.noMore,
        orderList: [],
        orderInfo: null,
        actualPrice: 0,
        searchParam: {
          searchName: "",
          state: 0,
          tabType: 0,
          pageNum: 1,
          pageSize: 10,
          timeValue: 1,
          sortFiled: 3,
          sortType: 2
        },
        tabbarList: [{
          name: "全部",
          value: 0
        }, {
          name: "待付款",
          value: 4
        }, {
          name: "待发货",
          value: 1
        }, {
          name: "待收货",
          value: 2
        }, {
          name: "已完成",
          value: 3
        }],
        orderTimeList: [{
          label: "近期",
          value: 1
        }, {
          label: "更早之前",
          value: 0
        }],
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
        curOrder: {
          id: 0,
          saleOrderNo: ""
        }
      });
    t.onShow((function() {
      p.isLogin = i.checkLogin(), m()
    })), t.onLoad((function(r) {
      if (p.isLogin = i.checkLogin(), t.index.$on("updateAddressPostList", (function(r) {
          if (111 == r.code) {
            if (null == r.data.updateAddress || null == r.data.address || null == r.data.diffFee) return void t.index.showToast({
              title: "稍后再试",
              icon: "none",
              success: function() {}
            });
            "" != p.curOrder.saleOrderNo && (p.postArgs = {
              oldAddress: r.data.address,
              newAddress: r.data.updateAddress,
              saleOrderId: Number(p.curOrder.id),
              saleOrderNo: p.curOrder.saleOrderNo,
              diffFee: r.data.diffFee,
              code: r.code,
              type: 0
            }, setTimeout((function() {
              e.value.openDialog()
            }), 300)), p.curOrder = {
              id: 0,
              saleOrderNo: ""
            }
          } else if (110 == r.code) {
            if (null == r.data.saleOrderReceiverVO || null == r.data.saleMailOrderReceiverVO || null == r.data.saleMailOrderReceiverVO.orderPrice) return void t.index.showToast({
              title: "稍后再试",
              icon: "none",
              success: function() {}
            });
            "" != p.curOrder.saleOrderNo && (p.postArgs = {
              oldAddress: r.data.saleOrderReceiverVO,
              newAddress: r.data.saleMailOrderReceiverVO,
              saleOrderId: Number(p.curOrder.id),
              saleOrderNo: p.curOrder.saleOrderNo,
              diffFee: r.data.saleMailOrderReceiverVO.orderPrice,
              code: r.code,
              type: 1
            }, setTimeout((function() {
              e.value.openDialog()
            }), 300)), p.curOrder = {
              id: 0,
              saleOrderNo: ""
            }
          }
        })), p.isLogin) {
        var o = Number(r.orderType || 0);
        p.searchParam.tabType = o
      }
    })), t.onUnload((function() {
      t.index.$off("updateAddressPostList", (function(e) {}))
    })), t.onPullDownRefresh((function() {
      p.searchParam.pageNum = 1, p.pullRefresh = !0, h()
    })), t.onReachBottom((function() {
      p.loadMoreStatus === n.LoadMoreStatus.more && (p.searchParam.pageNum++, h())
    }));
    var m = function() {
        p.searchParam.pageNum = 1, p.orderList = [], h()
      },
      h = function() {
        p.loadMoreStatus = n.LoadMoreStatus.loading;
        var e = JSON.parse(JSON.stringify(p.searchParam));
        e.dataRange = e.timeValue, e.timeValue = null, o.apiGetOrderList(e).then((function(e) {
          var r = e.data.records;
          r.forEach((function(e) {
            e.actualPrice = 0, e.statusDesc = 1 == e.payState && 0 == e.orderState ? "待付款" : a.getOrderStatusDesc(e.orderState);
            var r, o = 0,
              n = 0,
              i = t.dayjs(e.createTime).add(600 + (null == (r = t.index.getStorageSync("diffentTime")) || "" == r ? 0 : parseInt(r)), "seconds"),
              s = t.dayjs(),
              c = d.getDiffTime(i, s);
            e.countDounObj = c, e.countDounTimeup = c.dateDiff < 0, !e.saleOrderProductInfos || e.saleOrderProductInfos.forEach((function(e) {
              o += e.weight, n += e.num
            })), e.weight = o, e.orderNum = n, g(e)
          })), console.log(r), p.orderList = 1 === p.searchParam.pageNum ? r : p.orderList.concat(r), p.loadMoreStatus = r.length < p.searchParam.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more
        })).catch((function() {
          p.loadMoreStatus = n.LoadMoreStatus.noMore
        })).finally((function() {
          p.pullRefresh && t.index.stopPullDownRefresh()
        }))
      },
      g = function(e) {
        null != e.saleOrderProductInfos && (1 == e.payMethod || 2 == e.payMethod ? (e.saleOrderProductInfos.forEach((function(r) {
          e.actualPrice += r.actualAmount
        })), e.actualPrice = Number((e.actualPrice + ((null == e ? void 0 : e.waybillFee) || 0)).toFixed(2))) : 4 == e.payMethod ? (e.saleOrderProductInfos.forEach((function(r) {
          e.actualPrice = Number((e.actualPrice += r.payPoint).toFixed(2))
        })), e.actualPrice = Number((e.actualPrice + ((null == e ? void 0 : e.waybillFee) || 0)).toFixed(2))) : 8 == e.payMethod ? (e.saleOrderProductInfos.forEach((function(r) {
          e.actualPrice += r.payBalance
        })), e.actualPrice = Number((e.actualPrice + ((null == e ? void 0 : e.waybillFee) || 0)).toFixed(2))) : (e.saleOrderProductInfos.forEach((function(r) {
          e.actualPrice += r.actualAmount
        })), e.actualPrice = Number((e.actualPrice + ((null == e ? void 0 : e.waybillFee) || 0)).toFixed(2))))
      },
      O = function() {
        l.value.confirm({
          title: "",
          message: "抱歉，历史订单请在PC端或公众号查看订单后联系客服处理",
          cancelButtonText: "知道了"
        })
      };
    return r(r({
      cancelConfirm: function() {
        p.hiddenStatus = !1
      },
      handleConfirmResult: function() {
        p.hiddenStatus = !1, o.apiCancelListOrder([p.orderInfo.id]).then((function() {
          s.uniUtil.showToast("取消订单成功", {
            icon: "success"
          }), setTimeout((function() {
            t.index.hideLoading(), m()
          }), 500)
        }))
      },
      cancelOrderConfirmRef: f,
      LoadMoreStatus: n.LoadMoreStatus,
      searchFilterRef: c,
      confirmModalRef: l,
      confirmModalReasonRef: u,
      postAgePopRefList: e
    }, t.toRefs(p)), {}, {
      handleGoLogin: function() {
        t.index.navigateTo({
          url: "/pages/login/login"
        })
      },
      handleChangeTabbar: function(e) {
        p.searchParam.state = -1, p.searchParam.tabType = e, m()
      },
      handleSearchOrder: m,
      handleCancelOrder: function(e) {
        e.saleOrderNo.startsWith("TF-") ? O() : l.value.confirm({
          title: "",
          message: "确定取消订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "暂不取消"
        }).then((function() {
          o.apiCancelListOrder([e.id]).then((function(r) {
            500 == r.data.code && r.data.message ? s.uniUtil.showToast(r.data.message) : (s.uniUtil.showToast("取消订单成功", {
              icon: "success"
            }), p.orderList = p.orderList.filter((function(r) {
              return r.id !== e.id
            })), setTimeout((function() {
              t.index.hideLoading(), m()
            }), 1e3))
          }))
        }))
      },
      handleCancelOrderReason: function(e) {
        e.saleOrderNo.startsWith("TF-") ? O() : u.value.open({
          title: "",
          message: "确定取消订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "暂不取消",
          itemId: e.id
        })
      },
      handleToggleShowFilter: function() {
        p.hiddenTabs = !1, c.value.open({
          timeValue: p.searchParam.timeValue
        })
      },
      handleFilterSearch: function(e) {
        p.hiddenTabs = !0, Object.assign(p.searchParam, e), m()
      },
      handleModifyAddress: function(r) {
        r.saleOrderNo.startsWith("TF-") ? O() : (p.curOrder = r, o.apiHasPostOrder(r.id).then((function(o) {
          if (200 == o.code && null != o.data)
            if (220 == o.data.code) {
              var a = {
                recevier: r.receiver,
                phone: r.receiverPhone,
                address: "".concat(r.receiverProvince).concat(r.receiverCity).concat(r.receiverCounty).concat(r.receiverAddress)
              };
              t.index.navigateTo({
                url: "/pages/mine/address/address-list?fromPage=orderList&id=".concat(r.id, "&isNoPay=").concat(1 == r.payState && 0 == r.orderState ? 1 : 0, "&address=").concat(JSON.stringify(a))
              })
            } else if (110 === o.data.code) {
            if (null == o.data.data.saleOrderReceiverVO || null == o.data.data.saleMailOrderReceiverVO || null == o.data.data.saleMailOrderReceiverVO.orderPrice) return void t.index.showToast({
              title: "稍后再试",
              icon: "none",
              success: function() {}
            });
            p.postArgs = {
              oldAddress: o.data.data.saleOrderReceiverVO,
              newAddress: o.data.data.saleMailOrderReceiverVO,
              saleOrderId: Number(r.id),
              saleOrderNo: r.saleOrderNo,
              diffFee: o.data.data.saleMailOrderReceiverVO.orderPrice,
              code: o.data.code,
              type: 1
            }, e.value.openDialog()
          }
        })).catch((function(e) {})))
      },
      handleSendOutGood: function() {
        l.value.confirm({
          title: "",
          message: "已成功提醒商家发货啦~",
          confirmButtonText: "",
          cancelButtonText: "知道了"
        })
      },
      handleToDetail: function(e) {
        console.log(p.searchParam.timeValue), console.log(e.invoiceOpen), t.index.navigateTo({
          url: "/pages/order/myOrder/detail?id=".concat(e.saleOrderNo, "&timeValue=").concat(p.searchParam.timeValue, "&invoiceOpen=").concat(e.invoiceOpen)
        })
      },
      handleCopy: function(e) {
        s.uniUtil.copyText(e)
      },
      handlePay: function(e) {
        if (e.saleOrderNo.startsWith("TF-")) O();
        else {
          var r = {
            orderIds: [e.id],
            isComeNoPay: 0
          };
          t.index.navigateTo({
            url: "/pages/order/myOrder/pay?params=".concat(JSON.stringify(r))
          })
        }
      },
      handleConfirmReceive: function(e) {
        e.saleOrderNo.startsWith("TF-") ? O() : l.value.confirm({
          title: "提示",
          message: "确认已经收到货了吗？",
          confirmButtonText: "确认",
          cancelButtonText: "返回"
        }).then((function() {
          o.apiConfirmReceiveOrder([e.id]).then((function() {
            s.uniUtil.showToast("确认收货成功", {
              icon: "success"
            }), setTimeout((function() {
              m()
            }), 1e3)
          }))
        }))
      },
      handleDeleteOrder: function(e) {
        e.saleOrderNo.startsWith("TF-") ? O() : l.value.confirm({
          title: "",
          message: "确认删除订单吗？",
          confirmButtonText: "确认",
          cancelButtonText: "返回"
        }).then((function() {
          o.apiCancelOrderDelete([e.id]).then((function() {
            s.uniUtil.showToast("删除成功", {
              icon: "success"
            }), setTimeout((function() {
              m()
            }), 1e3)
          }))
        }))
      },
      handleToLogisticsDetails: function(e) {
        e.saleOrderNo.startsWith("TF-") ? O() : e.waybillNo ? t.index.navigateTo({
          url: "/pages/order/myOrder/logisticsDetails?waybillNo=" + e.waybillNo.split(",")[0] + "&waybillNolist=" + e.waybillNo
        }) : s.uniUtil.showToast("暂无路由信息", {
          icon: "none"
        })
      },
      showPop: function(e) {
        e.isShowPop ? e.isShowPop = !1 : (1 == e.invoiceOpen ? e.invoiceOpenSrc = "/static/ic_fapiaoDetail.png" : e.invoiceOpenSrc = "/static/ic_kaifapiao.png", e.isShowPop = !0)
      },
      handleApplyInvoice: function(e) {
        1 == e.payMethod || 2 == e.payMethod || 8 == e.payMethod || 32 == e.payMethod ? (0 == e.invoiceOpen || 1 == e.invoiceOpen) && t.index.navigateTo({
          url: "/pages/bill/notInvoiced?saleOrderNo=".concat(e.saleOrderNo, "&saleOrderId=").concat(e.id, "&payTotalAmount=").concat(e.actualPrice)
        }) : t.index.showToast({
          title: "兑换码支付或积分支付不能开具发票",
          icon: "none",
          success: function() {}
        })
      },
      isFeeGoodsJuge: function(e) {
        var r = !1;
        if (e.saleOrderProductInfos.length > 0) {
          var t = e.saleOrderProductInfos[0].goodsType;
          "" != t && null != t && 3 == t && (r = !0)
        }
        return r
      },
      handleReasonResult: function(e) {
        console.log(e);
        var r = e.reasonDesc,
          a = e.itemId,
          n = "";
        if (null != r && null != r && (n = r), null != a && null != a && "" != a) {
          var i = {
            orderId: a,
            reason: n
          };
          o.apiCancelListOrderWithReason(i).then((function(e) {
            500 == e.data.code && e.data.message ? s.uniUtil.showToast(e.data.message) : (s.uniUtil.showToast("取消订单成功", {
              icon: "success"
            }), p.orderList = p.orderList.filter((function(e) {
              return e.id !== a
            })), setTimeout((function() {
              t.index.hideLoading(), m()
            }), 1e3))
          }))
        } else s.uniUtil.showToast("未能获得有效的订单Id", {
          icon: "error"
        })
      },
      cancelReason: function() {}
    })
  }
});
Array || (t.resolveComponent("search-bar") + t.resolveComponent("order-product-item") + t.resolveComponent("price") + t.resolveComponent("uni-countdown") + t.resolveComponent("no-data") + t.resolveComponent("uni-load-more") + t.resolveComponent("search-filter") + t.resolveComponent("confirm-modal") + t.resolveComponent("confirm-modal-reason") + t.resolveComponent("cancel-order-confirm") + t.resolveComponent("post-age-dialog"))();
Math || (function() {
  return "../../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js"
} + function() {
  return "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"
})();
var l = t._export_sfc(c, [
  ["render", function(r, o, a, n, i, s) {
    return t.e({
      a: t.o(r.handleSearchOrder),
      b: t.o((function(e) {
        return r.searchParam.searchName = e
      })),
      c: t.p({
        placeholder: "搜索我的订单",
        modelValue: r.searchParam.searchName
      }),
      d: r.hiddenTabs ? "#666" : "#E85252",
      e: t.o((function() {
        return r.handleToggleShowFilter && r.handleToggleShowFilter.apply(r, arguments)
      })),
      f: "-1" !== r.searchParam.timeValue ? 1 : "",
      g: t.f(r.tabbarList, (function(e, o, a) {
        return {
          a: t.t(e.name),
          b: t.n(e.value === r.searchParam.tabType ? "active" : ""),
          c: o,
          d: t.o((function(t) {
            return r.handleChangeTabbar(e.value)
          }))
        }
      })),
      h: r.hiddenTabs,
      i: r.isHighIndex ? 1 : "",
      j: t.f(r.orderList, (function(o, a, n) {
        return t.e({
          a: t.t(o.saleOrderNo),
          b: t.t(o.soOrgName),
          c: t.t(o.statusDesc),
          d: t.f(o.saleOrderProductInfos, (function(e, r, a) {
            return {
              a: "53e752eb-1-" + n + "-" + a,
              b: t.p({
                product: e,
                pageFlag: !1,
                orderType: o.orderType,
                orderTime: o.createTime,
                payMethod: o.payMethod
              }),
              c: r
            }
          })),
          e: t.o((function(e) {
            return r.handleToDetail(o)
          })),
          f: t.t(o.orderNum),
          g: t.t(o.waybillFee > 0 ? "含运费 " : ""),
          h: t.t(o.payMethod ? "实付:" : "待付款:"),
          i: o.payState <= 1
        }, o.payState <= 1 ? {
          j: t.t(4 == o.payMethod ? "积分" : "¥")
        } : {
          k: t.t(4 == o.payMethod ? "积分" : "¥")
        }, {
          l: "53e752eb-2-" + n,
          m: t.p({
            type: "order",
            className: o.payState > 1 ? "list-item-total" : "light-list-item-total",
            price: 1 == o.payMethod || 2 == o.payMethod || 4 == o.payMethod || null === o.payMethod ? o.actualPrice : 0,
            hideTip: !1,
            payState: o.payState
          }),
          n: !o.countDounTimeup && 1 == o.payState && [0].includes(o.orderState)
        }, !o.countDounTimeup && 1 == o.payState && [0].includes(o.orderState) ? {
          o: "53e752eb-3-" + n,
          p: t.p(e(e(e(e(e({
            color: "#E85252"
          }, "font-size", 13), "show-day", !1), "hour", o.countDounObj.hours), "minute", o.countDounObj.minutes), "second", o.countDounObj.seconds))
        } : {}, {
          q: 8 == o.orderState && !r.isFeeGoodsJuge(o)
        }, 8 != o.orderState || r.isFeeGoodsJuge(o) ? {} : t.e({
          r: t.o((function(e) {
            return r.showPop(o)
          })),
          s: o.isShowPop
        }, o.isShowPop ? {
          t: t.o((function(e) {
            return r.handleApplyInvoice(o)
          })),
          v: o.invoiceOpenSrc
        } : {}), {
          w: [0, 1].includes(o.orderState) && 0 == o.saleAfterState
        }, [0, 1].includes(o.orderState) && 0 == o.saleAfterState ? {
          x: t.o((function(e) {
            return r.handleCancelOrder(o)
          }))
        } : {}, {
          y: 3 == o.orderState && 0 == o.saleAfterState
        }, 3 == o.orderState && 0 == o.saleAfterState ? {
          z: t.o((function(e) {
            return r.handleCancelOrderReason(o)
          }))
        } : {}, {
          A: 1 == o.saleAfterState
        }, 1 == o.saleAfterState ? {
          B: t.o((function(e) {
            return r.handleToDetail(o)
          }))
        } : {}, {
          C: [4, 5, 6, 7, 8].includes(o.orderState) && 3 !== o.saleOrderProductInfos[0].goodsType && 3 !== o.orderType
        }, [4, 5, 6, 7, 8].includes(o.orderState) && 3 !== o.saleOrderProductInfos[0].goodsType && 3 !== o.orderType ? {
          D: t.o((function(e) {
            return r.handleToLogisticsDetails(o)
          }))
        } : {}, {
          E: [4, 5, 6, 7].includes(o.orderState)
        }, [4, 5, 6, 7].includes(o.orderState) ? {
          F: t.o((function(e) {
            return r.handleConfirmReceive(o)
          }))
        } : {}, {
          G: 1 != o.saleAfterState && 1 !== o.payState && [0, 1, 2, 3].includes(o.orderState)
        }, 1 != o.saleAfterState && 1 !== o.payState && [0, 1, 2, 3].includes(o.orderState) ? {
          H: t.o((function(e) {
            return r.handleModifyAddress(o)
          }))
        } : {}, {
          I: 1 == o.payState && [10, 2].includes(o.orderState) || 1 != o.payState && [10].includes(o.orderState)
        }, 1 == o.payState && [10, 2].includes(o.orderState) || 1 != o.payState && [10].includes(o.orderState) ? {
          J: t.o((function(e) {
            return r.handleDeleteOrder(o)
          }))
        } : {}, {
          K: 1 == o.payState && [0].includes(o.orderState)
        }, 1 == o.payState && [0].includes(o.orderState) ? {
          L: t.o((function(e) {
            return r.handlePay(o)
          })),
          M: o.countDounTimeup
        } : {}, {
          N: 1 != o.saleAfterState && 1 !== o.payState && [0, 3].includes(o.orderState)
        }, 1 != o.saleAfterState && 1 !== o.payState && [0, 3].includes(o.orderState) ? {
          O: t.o((function(e) {
            return r.handleSendOutGood(o)
          }))
        } : {}, {
          P: a
        })
      })),
      k: r.hiddenStatus ? "hidden" : "unset",
      l: r.hiddenStatus ? "50vh" : "unset",
      m: r.loadMoreStatus === r.LoadMoreStatus.noMore && 0 === r.orderList.length
    }, r.loadMoreStatus === r.LoadMoreStatus.noMore && 0 === r.orderList.length ? {
      n: t.p(e(e({
        icon: r.$static + "/static/image/no-data/no_order.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      o: t.p({
        status: r.loadMoreStatus
      })
    }, {
      p: !r.isLogin
    }, r.isLogin ? {} : {
      q: t.o((function() {
        return r.handleGoLogin && r.handleGoLogin.apply(r, arguments)
      }))
    }, {
      r: t.sr("searchFilterRef", "53e752eb-6"),
      s: t.o(r.handleFilterSearch),
      t: t.p({
        list: r.orderTimeList
      }),
      v: t.sr("confirmModalRef", "53e752eb-7"),
      w: t.sr("confirmModalReasonRef", "53e752eb-8"),
      x: t.o(r.handleReasonResult),
      y: t.o(r.cancelReason),
      z: t.sr("cancelOrderConfirmRef", "53e752eb-9"),
      A: t.o(r.handleConfirmResult),
      B: t.o(r.cancelConfirm),
      C: t.sr("postAgePopRefList", "53e752eb-10"),
      D: t.p({
        args: r.postArgs,
        type: r.postArgs.type
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/list.vue"]
]);
wx.createPage(l);