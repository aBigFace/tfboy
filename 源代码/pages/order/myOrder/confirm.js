var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/defineProperty"),
  o = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../../common/vendor.js"),
  a = require("../../../apis/order.js"),
  i = require("../../../common/common.js"),
  s = require("../../../apis/address.js"),
  c = require("../../../utils/util.js"),
  d = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js");
var u = t.defineComponent({
  name: "orderConfirm",
  components: {
    orderProductItem: function() {
      return "../../../components/order-product-item.js"
    },
    priceLabel: function() {
      return "../../../components/price.js"
    },
    selectSku: function() {
      return "../components/select-sku.js"
    },
    realNamePopup: function() {
      return "../components/realNamePopup.js"
    },
    parentAuthDialog: function() {
      return "../../dialog/parentAuthDialog.js"
    }
  },
  setup: function() {
    var u = t.ref(null),
      p = t.ref(),
      h = t.ref(),
      l = t.reactive({
        canPassFlag: !0,
        orderType: 0,
        chkParentAuth: 0,
        order: {
          shopList: [],
          undoShopList: [],
          remark: "",
          orderFee: 0
        },
        receiverInfo: {
          receiver: "",
          receiverPhone: "",
          receiverProvince: "",
          receiverCity: "",
          receiverCounty: "",
          receiverStreet: "",
          receiverAddress: ""
        },
        skuList: [],
        originPageParams: {}
      }),
      f = {
        shopIndex: 0,
        voucherIndex: 0,
        productIndex: 0
      },
      m = t.computed$1((function() {
        var e = 0;
        return l.order.shopList.forEach((function(r) {
          e += r.goods.length
        })), e
      }));
    t.onHide((function() {
      t.index.setStorageSync("chkParentAuth", 0)
    })), t.onLoad(function() {
      var e = n(o().mark((function e(r) {
        var t, d;
        return o().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              if (t = r.params, d = JSON.parse(r.paramsDetail), !(t = JSON.parse(t))) {
                e.next = 8;
                break
              }
              return t.orderItems.forEach((function(e) {
                e.useTicket = 1
              })), l.originPageParams = JSON.parse(JSON.stringify(t)), e.next = 8, a.apiVerifyOrder(d).then(function() {
                var e = n(o().mark((function e(r) {
                  var n;
                  return o().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return l.order.undoShopList = null == r ? void 0 : r.data.filter((function(e, r) {
                          return 0 == e.checkFlag
                        })), l.order.undoShopList.forEach((function(e) {
                          e.errorMessage = e.message
                        })), l.order.undoShopList.forEach((function(e) {
                          d.buySkuInfos.forEach((function(r) {
                            e.skuId == r.skuId && (e.number = r.number)
                          }))
                        })), n = null == r ? void 0 : r.data.filter((function(e) {
                          return 1 == e.checkFlag
                        })), e.next = 6, s.apiGetDefaultAddress().then((function(e) {
                          e.data && (l.receiverInfo = i.convertAddressBookToReceiverAddress(e.data, "book"), l.receiverInfo.receiverPhone = c.slicePhone(l.receiverInfo.receiverPhone))
                        }));
                      case 6:
                        return t.orderItems[0].goodsItems = [], d.buySkuInfos.forEach((function(e) {
                          n.forEach((function(r) {
                            e.skuId == r.skuId && t.orderItems[0].goodsItems.push({
                              skuId: e.skuId,
                              number: e.number
                            })
                          }))
                        })), e.next = 10, v(t);
                      case 10:
                      case "end":
                        return e.stop()
                    }
                  }), e)
                })));
                return function(r) {
                  return e.apply(this, arguments)
                }
              }()).catch((function(e) {
                var r, o;
                l.canPassFlag = !1, 100 == (null == (r = null == e ? void 0 : e.data) ? void 0 : r.code) && 0 == (null == (o = null == e ? void 0 : e.data) ? void 0 : o.data) && h.value.handleOpen()
              }));
            case 8:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function(r) {
        return e.apply(this, arguments)
      }
    }());
    var v = function(e) {
      if (e.receiverAddress = "", l.receiverInfo.receiverAddress) {
        var r = l.receiverInfo,
          o = r.receiverProvince,
          n = r.receiverCity,
          t = r.receiverCounty,
          i = r.receiverStreet,
          s = r.receiverAddress;
        e.receiverAddress = "".concat(o).concat(n).concat(t).concat(i || "").concat(s)
      }
      e.landVerify = 1, e.ticketItems = e.ticketItems || [], a.apiGetConfirmOrder(e).then((function(e) {
        var r = [],
          o = [],
          n = {
            orderFee: e.data.orderFee
          };
        e.data.companies.forEach((function(e) {
          e.shops.forEach((function(n) {
            if (n.doGoods && n.doGoods.length) {
              var t = {
                companyId: e.companyId,
                orgId: n.orgId,
                orgName: n.orgName,
                shopFreightFee: n.shopFreightFee || 0,
                shopGoodsFee: n.shopGoodsFee,
                shopOrderFee: n.shopOrderFee,
                goods: n.doGoods,
                availableVoucherCount: n.availableVoucherCount
              };
              r.push(t)
            }
            n.undoGoods && n.undoGoods.length && (n.undoGoods.forEach((function(e) {
              e.errorMessage = "该商品暂不支持送至当前收货地址"
            })), o = o.concat(n.undoGoods))
          }))
        })), console.log(r, "shopList"), n.shopList = r, n.undoShopList = l.order.undoShopList.concat(o), Object.assign(l.order, n)
      }))
    };
    t.onShow((function() {
      var e = getApp().globalData.tempData;
      if (e && "receiver" === e.type) {
        l.receiverInfo = i.convertAddressBookToReceiverAddress(e.data, "key");
        var r = l.originPageParams.orderItems;
        v({
          orderItems: r
        }), getApp().globalData.tempData = null
      }
      t.index.getStorageSync("parentAuthByBuy") && g()
    }));
    var g = function() {
      var e = n(o().mark((function e() {
        return o().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              i.debounce((function() {
                var e = [];
                l.order.shopList.forEach((function(r) {
                  var o = {
                    companyId: r.companyId,
                    orgId: r.orgId,
                    remark: l.order.remark,
                    productList: []
                  };
                  r.goods.forEach((function(e) {
                    o.productList.push({
                      skuId: e.skuId,
                      num: e.number,
                      pullerId: null,
                      expectedDeliveryTime: null
                    })
                  })), e.push(o)
                }));
                var o = r(r(r(r(r(r(r({
                    payMethod: null,
                    chkParentAuth: l.chkParentAuth,
                    orderPrice: l.order.orderFee,
                    buyItemInfos: e,
                    receiverInfo: l.receiverInfo,
                    remark: l.order.remark
                  }, "orderPrice", l.order.orderFee), "orderSource", 3), "validCode", ""), "orderType", 1), "deliveryMethod", 2), "cartIds", l.originPageParams.cartIds || []), "applyType", 1),
                  n = t.index.getStorageSync("parentAuthByBuy");
                null != n && "" != n && (o.validCode = n), t.index.removeStorageSync("parentAuthByBuy"), t.index.getStorageSync("chkParentAuth") && JSON.parse(t.index.getStorageSync("chkParentAuth")) && (o.chkParentAuth = 1), t.index.setStorageSync("chkParentAuth", 0), t.index.showLoading({
                  title: "请稍等",
                  mask: !0
                }), a.apiSubmitOrder(o).then((function(e) {
                  t.index.hideLoading();
                  var r = {
                    orderIds: e.data.orderIds
                  };
                  t.index.redirectTo({
                    url: "/pages/order/myOrder/pay?fromPage=orderConfirm&params=".concat(JSON.stringify(r))
                  })
                })).catch((function(e) {
                  var r, o;
                  100 == (null == (r = null == e ? void 0 : e.data) ? void 0 : r.code) && 1 == (null == (o = null == e ? void 0 : e.data) ? void 0 : o.data) ? (t.index.hideLoading(), p.value.confirm({
                    message: "抱歉，您未达到指定年龄",
                    title: "需要进行家长信息认证",
                    confirmButtonText: "家长认证",
                    cancelButtonText: "返回我的"
                  }).then((function() {
                    var e = t.index.getStorageSync("userInfo"),
                      r = e.idCard;
                    2 == e.idCardType ? r = e.passport : 3 == e.idCardType && (r = e.hmPasser);
                    var o = "";
                    o = e.infoOther && e.infoOther.guardianPhone ? "/pages/mine/setting/msgCode?validType=".concat(d.EValidType.guardian, "&checkMethod=checkParentPhone") : "/pages/mine/user/certifyParent?name=".concat(e.realName, "&type=").concat(e.idCardType, "&code=").concat(r, "&phone=").concat(e.phone, "&isOnlyName=1"), t.index.navigateTo({
                      url: o
                    })
                  })).catch((function() {
                    t.index.switchTab({
                      url: "/pages/mine/mine"
                    })
                  }))) : setTimeout((function() {
                    t.index.hideLoading()
                  }), 700)
                }))
              }));
            case 1:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    return e(e({}, t.toRefs(l)), {}, {
      selectSkuRef: u,
      productCount: m,
      realNamePopupRef: h,
      parentAuthDialogRef: p,
      handleSubmit: g,
      handleChangeAddress: function() {
        i.debounce((function() {
          t.index.navigateTo({
            url: "/pages/mine/address/address-list?fromPage=order"
          })
        }))
      },
      handleUpdateSku: function(e, r, o, n) {
        f = {
          shopIndex: e,
          voucherIndex: r,
          productIndex: o
        };
        var t = l.order.shopList[e].voucherItems[r];
        l.skuList = t.goodsItems, u.value.open({
          skuId: n
        })
      },
      handleConfirmSku: function(e) {
        var r = f,
          o = r.shopIndex,
          n = r.voucherIndex,
          t = l.order.shopList[o].voucherItems[n],
          a = t.goodsItems.find((function(r) {
            return r.skuId === e
          }));
        t.slectedGoods = [a], console.log("handle-update-sku", e)
      },
      handleOpenVoucherPage: function(e) {
        var r = l.order.shopList[e],
          o = r.goods.map((function(e) {
            return {
              sku: e.skuCode,
              skuNum: e.number,
              skuFee: e.totalPrice
            }
          })),
          n = r.voucherItems.map((function(e) {
            return e.voucherDetailNo
          })),
          a = {
            checkedInfoList: [{
              orgId: r.orgId,
              checkedSkuList: o
            }],
            voucherIds: n
          };
        t.index.navigateTo({
          url: "/pages/mine/myCoupon/myCoupon?params=".concat(JSON.stringify(a))
        })
      }
    })
  }
});
Array || (t.resolveComponent("uni-icons") + t.resolveComponent("order-product-item") + t.resolveComponent("priceLabel") + t.resolveComponent("select-sku") + t.resolveComponent("real-name-popup") + t.resolveComponent("parentAuthDialog"))();
Math;
var p = t._export_sfc(u, [
  ["render", function(e, r, o, n, a, i) {
    return t.e({
      a: e.receiverInfo.receiverAddress
    }, e.receiverInfo.receiverAddress ? t.e({
      b: 1 === e.receiverInfo.bookDefaultStatus
    }, (e.receiverInfo.bookDefaultStatus, {}), {
      c: t.t(e.receiverInfo.receiverProvince),
      d: t.t(e.receiverInfo.receiverCity),
      e: t.t(e.receiverInfo.receiverCounty),
      f: t.t(e.receiverInfo.receiverAddress),
      g: t.t(e.$filters.formatUserName(e.receiverInfo.receiver)),
      h: t.t(e.$filters.encryptPhone(e.receiverInfo.receiverPhone))
    }) : {}, {
      i: t.p({
        type: "forward",
        size: 16,
        color: "#999"
      }),
      j: t.o((function() {
        return e.handleChangeAddress && e.handleChangeAddress.apply(e, arguments)
      })),
      k: t.f(e.order.shopList, (function(e, r, o) {
        return {
          a: t.f(e.goods, (function(e, r, n) {
            return {
              a: "08265283-1-" + o + "-" + n,
              b: t.p({
                pageFlag: !0,
                product: e
              }),
              c: r
            }
          })),
          b: "08265283-2-" + o,
          c: t.p({
            price: e.shopGoodsFee
          }),
          d: "08265283-3-" + o,
          e: t.p({
            price: e.shopFreightFee
          }),
          f: "08265283-4-" + o,
          g: t.p({
            className: "price-total-num",
            type: "order",
            price: e.shopOrderFee
          }),
          h: r
        }
      })),
      l: e.order.shopList.length
    }, e.order.shopList.length ? {
      m: e.order.remark,
      n: t.o((function(r) {
        return e.order.remark = r.detail.value
      }))
    } : {}, {
      o: e.order.undoShopList.length > 0
    }, e.order.undoShopList.length > 0 ? {
      p: t.f(e.order.undoShopList, (function(e, r, o) {
        return {
          a: "08265283-5-" + o,
          b: t.p({
            product: e,
            supportUpdateSku: !1,
            invalid: !0
          }),
          c: r
        }
      }))
    } : {}, {
      q: t.t(e.productCount),
      r: t.p({
        type: "detail",
        className: "product-detail-main-price",
        price: e.order.orderFee || 0
      }),
      s: t.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      })),
      t: 0 !== e.order.shopList.length && e.receiverInfo.receiver && e.canPassFlag ? "" : 1,
      v: 0 === e.order.shopList.length || !e.receiverInfo.receiver || !e.canPassFlag,
      w: t.sr("selectSkuRef", "08265283-7"),
      x: t.o(e.handleConfirmSku),
      y: t.p({
        showCount: !1,
        list: e.skuList,
        skuType: 5
      }),
      z: t.sr("realNamePopupRef", "08265283-8"),
      A: t.sr("parentAuthDialogRef", "08265283-9")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/myOrder/confirm.vue"]
]);
wx.createPage(p);