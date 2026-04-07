var e = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("./vendor.js"),
  o = require("../apis/shopCart.js"),
  a = require("../utils/util.js");
var t = [{
  key: "name",
  book: "bookName",
  receiver: "receiver"
}, {
  key: "phone",
  book: "bookPhone",
  receiver: "receiverPhone"
}, {
  key: "province",
  book: "bookProvince",
  receiver: "receiverProvince"
}, {
  key: "city",
  book: "bookCity",
  receiver: "receiverCity"
}, {
  key: "county",
  book: "bookCounty",
  receiver: "receiverCounty"
}, {
  key: "detailAddress",
  book: "bookAddress",
  receiver: "receiverAddress"
}];
var n = null;
exports.convertAddressBookToAddress = function(e) {
  var r = {};
  for (var o in e) {
    var a = t.find((function(e) {
      return e.book === o
    }));
    a ? r[a.key] = e[o] : r[o] = e[o]
  }
  return r
}, exports.convertAddressBookToReceiverAddress = function(e, r) {
  var o = {};
  for (var a in e) {
    var n = t.find((function(e) {
      return e[r] === a
    }));
    n ? o[n.receiver] = e[n[r]] : o[a] = e[a]
  }
  return o
}, exports.convertAddressToBookAddress = function(e) {
  var r = {};
  for (var o in e) {
    var a = t.find((function(e) {
      return e.key === o
    }));
    a ? r[a.book] = e[o] : r[o] = e[o]
  }
  return r
}, exports.debounce = function(e) {
  var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
    o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  if (null !== n && clearTimeout(n), o) {
    var a = !n;
    n = setTimeout((function() {
      n = null
    }), r), a && "function" == typeof e && e()
  } else n = setTimeout((function() {
    "function" == typeof e && e()
  }), r)
}, exports.getOrderStatusDesc = function(e) {
  var r = "";
  switch (e) {
    case 0:
    case 1:
      r = "待发货";
      break;
    case 2:
      r = "已取消";
      break;
    case 3:
      r = "待发货";
      break;
    case 4:
    case 5:
    case 6:
    case 7:
      r = "待收货";
      break;
    case 8:
      r = "交易成功";
      break;
    case 9:
      r = "交易关闭";
      break;
    case 10:
      r = "已取消"
  }
  return r
}, exports.getPayMethodDesc = function(e) {
  var r = "";
  switch (e) {
    case 1:
      r = "微信支付";
      break;
    case 2:
      r = "支付宝支付";
      break;
    case 4:
      r = "积分支付";
      break;
    case 8:
      r = "小葵花支付";
      break;
    case 16:
      r = "现金支付";
      break;
    case 32:
      r = "赊";
      break;
    case 64:
      r = "银联支付";
      break;
    case 128:
      r = "其他支付";
      break;
    case 256:
      r = "兑换码支付"
  }
  return r
}, exports.getShareParams = function() {
  var e = getApp().globalData.shopInfo,
    o = "";
  e && e.orgId && (o = "companyId=".concat(e.companyId, "&orgId=").concat(e.orgId));
  var a = r.index.getStorageSync("userInfo");
  return a && a.userId && (o && (o += "&"), o += "shareId=".concat(a.userId)), o
}, exports.getSkuData = function(r, t) {
  return new Promise((function(n, c) {
    o.apiGetProductDetail(r).then((function(r) {
      var o, c, s, i = null;
      t && (i = r.data.goodsSkuList.find((function(e) {
        return e.id == t
      })));
      var d = {
        activityFeignVo: e(e({}, r.data.activityFeignVo), a.saleTimeDataDeal(r.data.activityFeignVo)),
        goodsSubType: r.data.goodsSubType,
        productName: r.data.name,
        companyName: r.data.companyName,
        productUrl: (null == (o = r.data) ? void 0 : o.goodsFiles) && (null == (s = null == (c = r.data) ? void 0 : c.goodsFiles[0]) ? void 0 : s.filePath) || "",
        specInfos: r.data.specInfos,
        goodsSkuList: r.data.goodsSkuList,
        selectedData: i
      };
      n(d)
    }))
  }))
}, exports.goConfirmOrderPage = function(e, o) {
  var a = [{
      skuId: e.id,
      number: e.count
    }],
    t = JSON.stringify({
      orderType: 1,
      orderItems: [{
        companyId: e.companyId,
        orgId: e.orgId,
        goodsItems: a
      }]
    }),
    n = JSON.stringify({
      applyType: 1,
      buySkuInfos: [{
        companyId: e.companyId,
        orgId: e.orgId,
        skuId: e.id,
        number: e.count
      }]
    });
  r.index.navigateTo({
    url: "/pages/order/myOrder/confirm?params=".concat(t, "&paramsDetail=").concat(n)
  })
};