var e = require("../../../@babel/runtime/helpers/defineProperty");
require("../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../common/vendor.js"),
  o = require("../../../common/user.js"),
  n = require("../../../utils/uniUtil.js"),
  a = require("../../../apis/order.js"),
  i = require("../../../common/constant.js");
require("../../../apis/user.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var u = r.defineComponent({
  name: "orderSearch",
  components: {
    noData: function() {
      return "../../../components/no-data.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    afterOrderProductItem: function() {
      return "../../../components/after-order-product-item.js"
    }
  },
  setup: function() {
    var e = r.ref(null),
      u = r.reactive({
        isLogin: o.checkLogin(),
        pullRefresh: !1,
        loadMoreStatus: i.LoadMoreStatus.noMore,
        timer: null,
        orderList: [],
        autoBackRemind: "",
        searchParam: {
          pageNum: 1,
          pageSize: 10,
          timeValue: "-1",
          sortFiled: 2,
          sortType: 2
        }
      });
    r.onLoad((function(e) {
      u.timer = setInterval((function() {
        for (var e = 0; e < u.orderList.length; e++) {
          if ("" == u.orderList[e].autoAuditStopTime || null == u.orderList[e].autoAuditStopTime) return;
          u.orderList[e].autoJudgeRemind = c(e, u.orderList[e].autoAuditStopTime, u.orderList[e].afterOrderState)
        }
      }), 3e3)
    })), r.onShow((function() {
      d()
    })), r.onUnload((function() {
      clearInterval(u.timer)
    })), r.onPullDownRefresh((function() {
      u.searchParam.pageNum = 1, u.pullRefresh = !0, s()
    })), r.onReachBottom((function() {
      u.loadMoreStatus === i.LoadMoreStatus.more && (u.searchParam.pageNum++, s())
    }));
    var d = function() {
        u.searchParam.pageNum = 1, u.orderList = [], s()
      },
      s = function() {
        if (u.isLogin && u.loadMoreStatus !== i.LoadMoreStatus.loading) {
          u.loadMoreStatus = i.LoadMoreStatus.loading;
          var e = JSON.parse(JSON.stringify(u.searchParam));
          e.timeValue = "-1" !== e.timeValue ? e.timeValue : "", a.apiGetAfterOrderList(e).then((function(e) {
            for (var t = e.data.records, r = 0; r < (null == t ? void 0 : t.length); r++) 9 == t[r].afterOrderState && (t[r].afterOrderState = 11, t[r].afterOrderStateDesc = "待审核");
            u.orderList = 1 === u.searchParam.pageNum ? t : u.orderList.concat(t), u.loadMoreStatus = t.length < u.searchParam.pageSize ? i.LoadMoreStatus.noMore : i.LoadMoreStatus.more
          })).catch((function() {
            u.loadMoreStatus = i.LoadMoreStatus.noMore
          })).finally((function() {
            u.pullRefresh && r.index.stopPullDownRefresh()
          }))
        }
      },
      c = function(e, t, o) {
        if ("" == t || null == t) return "";
        var n, a = l(t),
          i = 1e3 * parseInt(String((new Date).getTime() / 1e3)) + 1e3 * (null == (n = r.index.getStorageSync("diffentTime")) || "" == n ? 0 : parseInt(n));
        if (a - i > 3e5) {
          var d = (a - i) / 1e3,
            s = parseInt((d / 86400).toString()),
            c = d % 86400,
            f = parseInt((c / 3600).toString()),
            m = parseInt(((c - 60 * f * 60) / 60).toString());
          return 10 == o ? (u.orderList[e].autoJudgeRemind = "", "人工介入处理中") : (u.orderList[e].autoJudgeRemind = "还剩" + s + "天" + f + "时" + m + "分自动退款", "还剩" + s + "天" + f + "时" + m + "分自动退款")
        }
        return u.orderList[e].autoJudgeRemind = "系统处理中", "系统处理中"
      },
      l = function(e) {
        var t = e;
        return t = (t = t.substring(0, 19)).replace(/-/g, "/"), new Date(t).getTime()
      };
    return t(t({
      LoadMoreStatus: i.LoadMoreStatus,
      confirmModalRef: e
    }, r.toRefs(u)), {}, {
      getDictList: function() {
        a.apiDictAfterReasonList({
          dictCode: "afterReasonChange"
        })
      },
      handleGoLogin: function() {
        r.index.navigateTo({
          url: "/pages/login/login"
        })
      },
      handleSearchOrder: d,
      handleToDetail: function(e) {
        null != e.saleAfterOrderProductInfos ? r.index.navigateTo({
          url: "/pages/order/afterOrder/detail?afterOrderNo=".concat(e.afterOrderNo, "&afterOrderId=").concat(e.afterOrderId)
        }) : n.uniUtil.showToast("此单为仅退运费售后单", {
          icon: "success"
        })
      },
      handleConfirmReceive: function(t) {
        e.value.confirm({
          title: "提示",
          message: "确认已经收到货了吗？",
          confirmButtonText: "是",
          cancelButtonText: "否"
        }).then((function() {
          a.apiDeleteOrder({
            id: t
          }).then((function() {
            n.uniUtil.showToast("操作成功", {
              icon: "success"
            }), setTimeout((function() {
              d()
            }), 1e3)
          }))
        }))
      },
      handleReApply: function(e) {
        r.index.navigateTo({
          url: "/pages/order/myOrder/detail?id=".concat(e.saleOrderNo)
        })
      },
      handleDelete: function(t) {
        e.value.confirm({
          title: "提示",
          message: "确定要删除该笔售后订单吗？",
          confirmButtonText: "是",
          cancelButtonText: "否"
        }).then((function() {
          a.apiDeleteAfterOrder([t.id]).then((function() {
            n.uniUtil.showToast("删除成功", {
              icon: "success"
            }), setTimeout((function() {
              d()
            }), 1e3)
          }))
        }))
      },
      handleDischargePetition: function(t) {
        e.value.confirm({
          title: "提示",
          message: "撤销申请后您可再次发起售后申请，确定要撤销本次申请吗？",
          confirmButtonText: "是",
          cancelButtonText: "否"
        }).then((function() {
          a.apiCancelAfterOrder({
            id: t.id
          }).then((function() {
            n.uniUtil.showToast("撤销申请成功", {
              icon: "success"
            }), setTimeout((function() {
              d()
            }), 1e3)
          }))
        }))
      },
      getTimeByStr: l,
      getAutoJudgeRemind: c
    })
  }
});
Array || (r.resolveComponent("after-order-product-item") + r.resolveComponent("no-data") + r.resolveComponent("uni-load-more") + r.resolveComponent("confirm-modal"))();
Math;
var d = r._export_sfc(u, [
  ["render", function(t, o, n, a, i, u) {
    return r.e({
      a: r.f(t.orderList, (function(e, o, n) {
        return r.e({
          a: r.t(e.afterOrderNo),
          b: r.t(e.afterOrderTypeDesc),
          c: r.f(e.saleAfterOrderProductInfos, (function(e, t, o) {
            return {
              a: "155f718b-0-" + n + "-" + o,
              b: r.p({
                product: e
              }),
              c: t
            }
          })),
          d: null == e.saleAfterOrderProductInfos
        }, (e.saleAfterOrderProductInfos, {}), {
          e: r.o((function(r) {
            return t.handleToDetail(e)
          })),
          f: r.t("审核失败" == e.afterOrderStateDesc ? "人工介入处理中" : e.afterOrderStateDesc),
          g: 11 == e.afterOrderState
        }, 11 == e.afterOrderState || 13 == e.afterOrderState ? {} : 12 == e.afterOrderState ? {
          j: r.t(e.afterAuditRemark)
        } : 14 == e.afterOrderState ? r.e({
          l: 4 == e.payMethod
        }, (e.payMethod, {})) : (e.afterOrderState, {}), {
          h: 13 == e.afterOrderState,
          i: 12 == e.afterOrderState,
          k: 14 == e.afterOrderState,
          m: 15 == e.afterOrderState,
          n: "" != t.getAutoJudgeRemind(o, e.autoAuditStopTime, e.afterOrderState)
        }, "" != t.getAutoJudgeRemind(o, e.autoAuditStopTime, e.afterOrderState) ? {
          o: r.t(e.autoJudgeRemind)
        } : {}, {
          p: null != e.saleAfterOrderProductInfos
        }, null != e.saleAfterOrderProductInfos ? r.e({
          q: [2, 5].includes(e.afterOrderState % 10)
        }, [2, 5].includes(e.afterOrderState % 10) ? {
          r: r.o((function(r) {
            return t.handleReApply(e)
          }))
        } : {}, {
          s: [2, 4, 5, 10].includes(e.afterOrderState % 10)
        }, [2, 4, 5, 10].includes(e.afterOrderState % 10) ? {
          t: r.o((function(r) {
            return t.handleDelete(e)
          }))
        } : {}, {
          v: [10, 11].includes(e.afterOrderState) || [3].includes(e.afterOrderState % 10)
        }, [10, 11].includes(e.afterOrderState) || [3].includes(e.afterOrderState % 10) ? {
          w: r.o((function(r) {
            return t.handleDischargePetition(e)
          }))
        } : {}, {
          x: r.o((function(r) {
            return t.handleToDetail(e)
          }))
        }) : {}, {
          y: o
        })
      })),
      b: t.$static + "/static/icon/afterMoney.png",
      c: t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === t.orderList.length
    }, t.loadMoreStatus === t.LoadMoreStatus.noMore && 0 === t.orderList.length ? {
      d: r.p(e(e({
        icon: t.$static + "/static/image/no-data/no_order.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      e: r.p({
        status: t.loadMoreStatus
      })
    }, {
      f: !t.isLogin
    }, t.isLogin ? {} : {
      g: r.o((function() {
        return t.handleGoLogin && t.handleGoLogin.apply(t, arguments)
      }))
    }, {
      h: r.sr("confirmModalRef", "155f718b-3")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterOrder/list.vue"]
]);
wx.createPage(d);