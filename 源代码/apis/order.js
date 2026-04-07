var e = require("../utils/http.js");
exports.apiApplyAfter = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/applyAfter",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiCancelAfterOrder = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/afterOrder/cancel?id=".concat(r.id),
    method: "POST",
    data: r
  })
}, exports.apiCancelListOrder = function(r) {
  return e.http({
    url: "place-order/mallOrder/cancelOrder",
    method: "POST",
    data: r,
    header: {
      loading: !0
    }
  })
}, exports.apiCancelListOrderWithReason = function(r) {
  return e.http({
    url: "place-order/mallOrder/cancelOrderWithReason",
    method: "POST",
    data: r,
    header: {
      loading: !0
    }
  })
}, exports.apiCancelOrder = function(r) {
  return e.http({
    url: "sale-order/saleOrderManager/mobile/order/mobileCancel",
    method: "POST",
    data: r,
    header: {
      loading: !0
    }
  })
}, exports.apiCancelOrderByDifFee = function(r) {
  return e.http({
    url: "place-order/mallOrder/cancelOrder",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiCancelOrderDelete = function(r) {
  return e.http({
    url: "sale-order/saleOrderManager/mobile/order/delete",
    method: "POST",
    data: r,
    header: {
      loading: !0
    }
  })
}, exports.apiConfirmReceiveOrder = function(r) {
  return e.http({
    url: "sale-order/saleOrderManager/confirm/Receipt",
    method: "POST",
    data: r,
    header: {
      loading: !0
    }
  })
}, exports.apiCreatePostOrderDiff = function(r) {
  return e.http({
    url: "sale-order/repairMail/createMailOrder",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiCreateTicket = function(r) {
  return e.http({
    url: "sale-order/saleTicketManager/createTicket",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiDefaultHeader = function() {
  return e.http({
    url: "sale-order/saleInvoiceManager/defaultHeader",
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiDeleteAfterOrder = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/afterOrder/delete",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiDeleteOrder = function(r) {
  return e.http({
    url: "sale-order/saleOrderManager/order/c/delete",
    method: "POST",
    data: r,
    header: {
      loading: !0
    }
  })
}, exports.apiDictAfterReasonList = function(r) {
  return e.http({
    url: "dict/dict/dictList/".concat(r.dictCode),
    method: "GET",
    header: {
      hideLoading: !0
    }
  })
}, exports.apiExpressDetail = function(r) {
  return e.http({
    url: "waybill/waybillManage/getRouting?waybillNo=".concat(r),
    method: "GET",
    header: {}
  })
}, exports.apiGetAfterOrderDetail = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/saleAfterOrderDetail",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetAfterOrderList = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/pageQuery",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetAfterSaleGoods = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/product/afterSupport?id=".concat(r.id),
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetAfterSaleIntersection = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/check/intersection",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetConfig = function() {
  return e.http({
    url: "mall/mallServiceConfig/detailInfo",
    method: "GET",
    header: {
      loading: !1,
      hideLoading: !1
    }
  })
}, exports.apiGetConfirmOrder = function(r) {
  return e.http({
    url: "fee/compute/order-fee",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetOrderDetail = function(r) {
  return e.http({
    url: "sale-order/saleOrderManager/saleOrderDetail",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetOrderList = function(r) {
  return e.http({
    url: "sale-order/saleOrderManager/mobile/pageQueryV2",
    method: "POST",
    data: r
  })
}, exports.apiGetOrderPayDetail = function(r) {
  return e.http({
    url: "sale-order/orderPayManager/orderPrePay",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiGetTmp = function(r) {
  return e.http({
    url: "message/eoMessage/listWxSubscribeTemplate",
    method: "POST",
    data: r,
    header: {
      loading: !1,
      hideLoading: !1
    }
  })
}, exports.apiHasPayUpdateAddress = function(r) {
  return e.http({
    url: "sale-order/repairMail/doMail",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiHasPostOrder = function(r) {
  return e.http({
    url: "sale-order/repairMail/loadMailOrder?saleOrderId=".concat(r),
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiNoPayUpdateAddress = function(r) {
  return e.http({
    url: "sale-order/repairMail/updateAddress",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiOrderPay = function(r) {
  return e.http({
    url: "sale-order/orderPayManager/orderPay",
    method: "POST",
    data: r,
    header: {
      loading: !1,
      hideLoading: !1
    }
  })
}, exports.apiPayOrder = function(r) {
  return e.http({
    url: "order/orderManager/orderPay?orderId=".concat(r),
    method: "GET",
    header: {
      loading: !0
    }
  })
}, exports.apiQueryOneByParams = function(r) {
  return e.http({
    url: "sale-order/saleTicketManager/queryOneByParams",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiQueryPayState = function(r) {
  return e.http({
    url: "sale-order/orderPayManager/queryPayState",
    method: "POST",
    data: r
  })
}, exports.apiQueryStockBySkuId = function(r) {
  return e.http({
    url: "goods/shelves/queryStockBySkuId?skuId=".concat(r),
    method: "GET",
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiSearchHeader = function(r) {
  return e.http({
    url: "sale-order/saleInvoiceManager/searchHeader?header=".concat(r),
    method: "GET",
    header: {
      loading: !1,
      hideLoading: !0
    }
  })
}, exports.apiSendWayBillNo = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/mobile/write/WaybillNo",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.apiSubmitOrder = function(r) {
  return e.http({
    url: "place-order/mallOrder/placeOrder",
    method: "POST",
    data: r,
    header: {
      loading: !1,
      hideLoading: !1
    }
  })
}, exports.apiVerifyOrder = function(r) {
  return e.http({
    url: "mall/mallOrder/verification",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
}, exports.getAfterSalePrice = function(r) {
  return e.http({
    url: "sale-order/saleAfterManager/saleOrderProductList",
    method: "POST",
    data: r,
    header: {
      loading: !0,
      hideLoading: !0
    }
  })
};