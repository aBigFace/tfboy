var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  r = require("../../../apis/order.js"),
  i = require("../../../apis/user.js"),
  o = require("../../../common/common.js"),
  c = require("../../../utils/rsa.js"),
  u = require("../../../utils/uniUtil.js"),
  s = require("../../../utils/commonEnum.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js");
var d = a.defineComponent({
  name: "payMain",
  components: {
    parentAuthDialog: function() {
      return "../../dialog/parentAuthDialog.js"
    }
  },
  setup: function() {
    var d = a.ref(),
      p = a.reactive({
        chkParentAuth: 0,
        agreeInfo: "协议内容",
        subjectId: "",
        subjectLogo: "",
        subjectName: "",
        termDay: 0,
        termDayMsg: "",
        payMethod: 1,
        payMethodList: [],
        orderResultMessage: "",
        orderId: "",
        skuId: "",
        saleName: "",
        sellPrice: "",
        goodsSkuList: [],
        viewChange: 0,
        changeContent: ""
      });
    a.onLoad((function(e) {
      e.subjectId && (p.subjectId = e.subjectId, p.subjectLogo = e.subjectLogo || "", p.subjectName = e.subjectName || "", p.termDay = Number(e.termDay || 0), p.termDayMsg = "剩余" + e.termDay + "天到期"), h(e.subjectId)
    })), a.onHide((function() {
      a.index.setStorageSync("chkParentAuth", 0)
    }));
    var h = function() {
      var e = n(t().mark((function e(n) {
        var a, r;
        return t().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return e.next = 2, i.apiGetVipPayApi(n);
            case 2:
              return a = e.sent, p.goodsSkuList = a.data.goodsSkuList, p.skuId = p.goodsSkuList && p.goodsSkuList[0].id || "", p.saleName = a.data.saleName, p.sellPrice = p.goodsSkuList && p.goodsSkuList[0].sellPrice || 0, (r = a.data.onlinePayTypeVos.map((function(e) {
                return {
                  checked: !1,
                  id: e.payType,
                  name: e.payTypeDesc
                }
              }))).forEach((function(e, t) {
                2 != e.id && "支付宝支付" != e.name || r.splice(t, 1)
              })), r.push({
                checked: !1,
                id: 99,
                name: "高会兑换码"
              }), e.next = 12, m();
            case 12:
              1 == p.viewChange && r.push({
                checked: !1,
                id: 98,
                name: "会员转换"
              }), p.payMethod = r[0].id, r[0].checked = !0, p.payMethodList = r;
            case 16:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function(t) {
        return e.apply(this, arguments)
      }
    }();
    a.onShow((function() {
      a.index.getStorageSync("parentAuthByBuy") && g()
    }));
    var g = function() {
        var i = n(t().mark((function i() {
          return t().wrap((function(i) {
            for (;;) switch (i.prev = i.next) {
              case 0:
                o.debounce(n(t().mark((function n() {
                  var i, o, h, g, m, l;
                  return t().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (p.skuId) {
                          t.next = 2;
                          break
                        }
                        return t.abrupt("return", u.uniUtil.showToast("请选择开通的会员类型"));
                      case 2:
                        if (99 != p.payMethod) {
                          t.next = 4;
                          break
                        }
                        return t.abrupt("return", a.index.navigateTo({
                          url: "/pages/mine/vipCode/vipCode"
                        }));
                      case 4:
                        if (98 != p.payMethod) {
                          t.next = 6;
                          break
                        }
                        return t.abrupt("return", a.index.navigateTo({
                          url: "/pages/mine/vip/vipChange?changeContent=" + p.changeContent
                        }));
                      case 6:
                        return i = getApp(), o = i.globalData.shopInfo.orgId, h = i.globalData.companyId, g = {
                          buyItemInfos: [{
                            companyId: h,
                            orgId: o,
                            productList: [{
                              num: 1,
                              skuId: p.skuId
                            }]
                          }],
                          chkParentAuth: p.chkParentAuth,
                          orderType: 3,
                          orderSource: 3,
                          payMethods: [p.payMethod],
                          receiverInfo: {},
                          applyType: 1,
                          validCode: ""
                        }, a.index.getStorageSync("chkParentAuth") && JSON.parse(a.index.getStorageSync("chkParentAuth")) && (g.chkParentAuth = 1), a.index.setStorageSync("chkParentAuth", 0), null != (m = a.index.getStorageSync("parentAuthByBuy")) && "" != m && (g.validCode = m), a.index.removeStorageSync("parentAuthByBuy"), t.next = 17, c.getRsaCode(a.index.getStorageSync("appletOpenId"));
                      case 17:
                        return l = t.sent, a.index.showLoading({
                          title: "请稍等",
                          mask: !0
                        }), t.next = 21, r.apiSubmitOrder(g).then((function(t) {
                          p.orderId = t.data.orderIds[0];
                          var n = p.payMethodList.filter((function(e) {
                              return e.checked
                            })).map((function(e) {
                              return e.id
                            })),
                            i = {
                              orderIds: [p.orderId],
                              payMethods: n,
                              appletOpenId: l,
                              requestType: "WX_APPLET_PRE_ORDER"
                            };
                          r.apiOrderPay(i).then((function(t) {
                            a.index.requestPayment(e(e({}, t.data), {}, {
                              success: function(e) {
                                a.index.hideLoading(), p.orderResultMessage = "订单支付成功", a.index.navigateBack()
                              },
                              fail: function(e) {
                                setTimeout((function() {
                                  a.index.hideLoading()
                                }), 700), p.orderResultMessage = e.message
                              }
                            }))
                          })).catch((function(e) {
                            setTimeout((function() {
                              a.index.hideLoading()
                            }), 700), p.orderResultMessage = e.message
                          }))
                        })).catch((function(e) {
                          var t, n;
                          setTimeout((function() {
                            a.index.hideLoading()
                          }), 700), 100 == (null == (t = null == e ? void 0 : e.data) ? void 0 : t.code) && 1 == (null == (n = null == e ? void 0 : e.data) ? void 0 : n.data) && d.value.confirm({
                            message: "抱歉，您未达到指定年龄",
                            title: "需要进行家长信息认证",
                            confirmButtonText: "家长认证",
                            cancelButtonText: "返回我的"
                          }).then((function() {
                            var e = a.index.getStorageSync("userInfo"),
                              t = e.idCard;
                            2 == e.idCardType ? t = e.passport : 3 == e.idCardType && (t = e.hmPasser);
                            var n = "";
                            n = e.infoOther && e.infoOther.guardianPhone ? "/pages/mine/setting/msgCode?validType=".concat(s.EValidType.guardian, "&checkMethod=checkParentPhone") : "/pages/mine/user/certifyParent?name=".concat(e.realName, "&type=").concat(e.idCardType, "&code=").concat(t, "&phone=").concat(e.phone, "&isOnlyName=1"), a.index.navigateTo({
                              url: n
                            })
                          })).catch((function() {
                            a.index.switchTab({
                              url: "/pages/mine/mine"
                            })
                          }))
                        }));
                      case 21:
                      case "end":
                        return t.stop()
                    }
                  }), n)
                }))));
              case 1:
              case "end":
                return i.stop()
            }
          }), i)
        })));
        return function() {
          return i.apply(this, arguments)
        }
      }(),
      m = function() {
        var e = n(t().mark((function e() {
          var n, r, o, c;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, i.apiGetVipChangeSetting();
              case 2:
                if (!(200 == (n = e.sent).code && null != n.data && n.data.length > 0)) {
                  e.next = 17;
                  break
                }
                if (1 != (r = JSON.parse(n.data[0].dictValue)).status || r.newSubjectId != parseInt(p.subjectId)) {
                  e.next = 17;
                  break
                }
                if (!(null != (o = a.index.getStorageSync("userInfo").memberSubjectVOS) && "" != o && o.length > 0)) {
                  e.next = 17;
                  break
                }
                c = 0;
              case 9:
                if (!(c < o.length)) {
                  e.next = 17;
                  break
                }
                if (o[c].subjectId != r.oldSubjectId) {
                  e.next = 14;
                  break
                }
                return p.changeContent = r.content, p.viewChange = 1, e.abrupt("break", 17);
              case 14:
                c++, e.next = 9;
                break;
              case 17:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, a.toRefs(p)), {}, {
      parentAuthDialogRef: d,
      handleChangePayMethod: function(e) {
        o.debounce((function() {
          p.payMethod = e.id, p.payMethodList.forEach((function(t) {
            t.checked = t.id === e.id
          }))
        }))
      },
      handlePay: g,
      getVipChangeSetting: m
    })
  }
});
Array || a.resolveComponent("parent-auth-dialog")();
var p = a._export_sfc(d, [
  ["render", function(e, t, n, r, i, o) {
    return a.e({
      a: e.subjectLogo,
      b: a.t(e.subjectName),
      c: !e.termDay
    }, (e.termDay, {}), {
      d: e.termDay
    }, e.termDay ? {
      e: a.t(e.termDayMsg)
    } : {}, {
      f: e.termDay ? 1 : "",
      g: e.termDay ? "" : 1,
      h: e.goodsSkuList
    }, e.goodsSkuList ? {
      i: e.$static + "/static/image/mine/icon-vip.png",
      j: a.t(e.saleName),
      k: a.t(e.sellPrice),
      l: e.skuId ? 1 : ""
    } : {}, {
      m: a.f(e.payMethodList, (function(t, n, r) {
        return a.e({
          a: 1 == t.id
        }, 1 == t.id ? {
          b: e.$static + "/static/image/mine/weixin@2x.png",
          c: a.t(t.name)
        } : {}, {
          d: 99 == t.id
        }, 99 == t.id ? {
          e: e.$static + "/static/image/mine/gaoHuiExchange@2x.png",
          f: a.t(t.name)
        } : {}, {
          g: 98 == t.id && 1 == e.viewChange
        }, 98 == t.id && 1 == e.viewChange ? {
          h: e.$static + "/static/image/mine/icon_convert_membership.jpg",
          i: a.t(t.name)
        } : {}, {
          j: t.checked
        }, t.checked ? {
          k: e.$static + "/static/image/myOrder/icon_pay_checked.png"
        } : {}, {
          l: n,
          m: t.checked ? 1 : "",
          n: a.o((function(n) {
            return e.handleChangePayMethod(t)
          }))
        })
      })),
      n: a.o((function() {
        return e.handlePay && e.handlePay.apply(e, arguments)
      })),
      o: a.sr("parentAuthDialogRef", "0f125952-0")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/vip/payMain.vue"]
]);
wx.createPage(p);