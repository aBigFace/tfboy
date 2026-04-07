var e = require("../../@babel/runtime/helpers/objectSpread2"),
  n = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  i = require("../../@babel/runtime/helpers/asyncToGenerator"),
  t = require("../../common/vendor.js"),
  a = require("../../apis/user.js"),
  o = require("../../common/user.js"),
  r = require("../../apis/commission.js"),
  s = require("../../apis/coupon.js"),
  u = require("../../apis/evaluation.js"),
  c = require("../../utils/util.js"),
  g = require("../../utils/common.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/commonEnum.js"), require("../../common/app-theme.js");
var d = t.defineComponent({
  name: "index",
  setup: function() {
    var d = t.reactive({
        userInfo: {
          headPortrait: "",
          nickName: "",
          phone: "",
          sex: 0,
          id: "",
          userId: "",
          distributor: 0,
          serialNo: ""
        },
        vipFlagList: [],
        age: "",
        isLogin: o.checkLogin(),
        vipId: "",
        quanCount: 0,
        orderCount: {
          waitPayNum: 0,
          afterSaleNum: 0,
          completedNum: 0,
          waitReceiptNum: 0,
          waitSendNum: 0
        },
        evaluationCount: 0,
        countAndSafeVisited: "2",
        isAbnormal: 0,
        isWeiXinBind: 0,
        auth: 1
      }),
      p = function() {
        var e = i(n().mark((function e() {
          var i;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, s.apiGetOrderCount();
              case 2:
                i = e.sent, d.orderCount = i.data;
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      l = function() {
        var e = i(n().mark((function e() {
          var i;
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, u.apiGetEvaluationRecord(0);
              case 2:
                i = e.sent, d.evaluationCount = i.data;
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    t.onShow(i(n().mark((function e() {
      var i, r;
      return n().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (i = o.checkLogin(), d.isLogin = i, !i) {
              e.next = 15;
              break
            }
            return e.next = 5, a.apiGetUserInfo();
          case 5:
            return r = e.sent, t.index.setStorageSync("userInfo", r.data), d.userInfo = r.data, d.vipFlagList = r.data.memberSubjectVOS, c.isEmpty(r.data.idCardType) || (d.age = 1 == r.data.idCardType ? c.analyzeIDCardToAge(r.data.idCard) : "18"), "" === d.userInfo.nickName && (d.vipId = "用户:".concat(r.data.serialNo)), e.next = 13, p();
          case 13:
            return e.next = 15, l();
          case 15:
            d.isAbnormal = t.index.getStorageSync("userInfo").isAbnormal, d.isWeiXinBind = t.index.getStorageSync("userInfo").isWeiXinBind, d.auth = t.index.getStorageSync("userInfo").auth, 0 == d.isWeiXinBind ? d.countAndSafeVisited = t.index.getStorageSync("countAndSafeVisited") : "" == d.countAndSafeVisited && (d.countAndSafeVisited = "2");
          case 19:
          case "end":
            return e.stop()
        }
      }), e)
    }))));
    var m = function() {
        t.index.navigateTo({
          url: "/pages/login/login"
        })
      },
      f = function(e) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        d.isLogin || !n ? t.index.navigateTo({
          url: e
        }) : m()
      },
      h = function() {
        var e = i(n().mark((function e() {
          return n().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, r.apiGetDealersDetail();
              case 2:
                e.sent.data.distributorBind ? f("/pages/mine/commission/commission") : f("/pages/mine/commission/bingdingDealers");
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, t.toRefs(d)), {}, {
      handleCopyId: function() {
        t.index.setClipboardData({
          data: String(d.userInfo.serialNo),
          success: function() {
            t.index.showToast({
              title: "已复制",
              icon: "none"
            })
          }
        })
      },
      handleGoMyAddressPage: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/address/address-list"
        })
      },
      handleGoLogin: m,
      handleGoMyMessage: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/msg/messageList"
        })
      },
      handleGoOrderList: function(e) {
        if (!d.isLogin) return g.showGoLogin();
        3 === e ? t.index.navigateTo({
          url: "/pages/mine/evaluation/evaluation"
        }) : t.index.navigateTo({
          url: "/pages/order/myOrder/list?orderType=".concat(e)
        })
      },
      handleGoPage: f,
      handleGoCollect: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/collect/collectList"
        })
      },
      handleGoSetting: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/setting/setting?phone=".concat(d.userInfo.phone)
        })
      },
      handleGoHX: function() {
        if (!d.isLogin) return g.showGoLogin();
        var e = t.index.getStorageSync("userInfo");
        (null == e ? void 0 : e.id) ? t.index.navigateTo({
          url: "/pages/mine/service/service"
        }): t.index.showToast({
          title: "请先登陆后再尝试",
          icon: "none"
        })
      },
      handleGoBalance: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/myBalance/myBalance"
        })
      },
      handleGoVip: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/vipCode/vipCode"
        })
      },
      handleGoCommission: function() {
        d.isLogin ? h() : m()
      },
      handleGoAfterSaleList: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/order/afterOrder/list"
        })
      },
      getCount: p,
      getEvaluationCount: l,
      goOpenVip: function() {
        if (!d.isLogin) return g.showGoLogin();
        t.index.navigateTo({
          url: "/pages/mine/vip/openVip?id=".concat(d.userInfo.id)
        })
      }
    })
  }
});
Array || t.resolveComponent("uni-icons")();
Math;
var p = t._export_sfc(d, [
  ["render", function(e, n, i, a, o, r) {
    return t.e({
      a: e.isLogin
    }, e.isLogin ? t.e({
      b: e.userInfo.headPortrait
    }, e.userInfo.headPortrait ? {
      c: e.userInfo.headPortrait
    } : {
      d: e.$static + "/static/image/mine/pic_people_mine_60@2x.png"
    }, {
      e: e.isLogin
    }, e.isLogin ? t.e({
      f: t.t(e.userInfo.nickName),
      g: 2 == e.userInfo.sex
    }, 2 == e.userInfo.sex ? {
      h: e.$static + "/static/image/mine/icon_sex_female.png"
    } : {}, {
      i: 1 == e.userInfo.sex
    }, 1 == e.userInfo.sex ? {
      j: e.$static + "/static/image/mine/icon_sex_male.png"
    } : {}, {
      k: "" !== e.age
    }, "" !== e.age ? {
      l: t.t(e.age)
    } : {}, {
      m: t.n(2 == e.userInfo.sex ? "sex-age" : ""),
      n: t.n(1 == e.userInfo.sex ? "sex-age-male" : ""),
      o: t.t(e.userInfo.serialNo),
      p: e.$static + "/static/image/mine/copy.png",
      q: t.o((function() {
        return e.handleCopyId && e.handleCopyId.apply(e, arguments)
      })),
      r: t.f(e.vipFlagList, (function(e, n, i) {
        return {
          a: t.t(e.subjectName),
          b: e.id
        }
      })),
      s: e.$static + "/static/image/mine/icon-vip.png"
    }) : {}, {
      t: t.o((function(n) {
        return e.handleGoPage("/pages/mine/user/user")
      }))
    }) : {
      v: e.$static + "/static/image/mine/pic_people_mine_60@2x.png",
      w: t.o((function() {
        return e.handleGoLogin && e.handleGoLogin.apply(e, arguments)
      }))
    }, {
      x: e.$static + "/static/image/mine/icon_vip.png",
      y: t.o((function() {
        return e.goOpenVip && e.goOpenVip.apply(e, arguments)
      })),
      z: t.p({
        type: "forward",
        size: 16,
        color: "#999"
      }),
      A: t.o((function(n) {
        return e.handleGoOrderList(0)
      })),
      B: e.$static + "/static/image/mine/awaitPay@2x.png",
      C: 0 !== e.orderCount.waitPayNum
    }, 0 !== e.orderCount.waitPayNum ? {
      D: t.t(e.orderCount.waitPayNum)
    } : {}, {
      E: t.o((function(n) {
        return e.handleGoOrderList(4)
      })),
      F: e.$static + "/static/image/mine/awaitPutGoods@2x.png",
      G: 0 !== e.orderCount.waitSendNum
    }, 0 !== e.orderCount.waitSendNum ? {
      H: t.t(e.orderCount.waitSendNum)
    } : {}, {
      I: t.o((function(n) {
        return e.handleGoOrderList(1)
      })),
      J: e.$static + "/static/image/mine/awaitTakeGoods@2x.png",
      K: 0 !== e.orderCount.waitReceiptNum
    }, 0 !== e.orderCount.waitReceiptNum ? {
      L: t.t(e.orderCount.waitReceiptNum)
    } : {}, {
      M: t.o((function(n) {
        return e.handleGoOrderList(2)
      })),
      N: e.$static + "/static/image/mine/assess@2x.png",
      O: 0 !== e.evaluationCount
    }, 0 !== e.evaluationCount ? {
      P: t.t(e.evaluationCount)
    } : {}, {
      Q: t.o((function(n) {
        return e.handleGoOrderList(3)
      })),
      R: e.$static + "/static/image/mine/afterSale@2x.png",
      S: 0 !== e.orderCount.afterSaleNum
    }, 0 !== e.orderCount.afterSaleNum ? {
      T: t.t(e.orderCount.afterSaleNum)
    } : {}, {
      U: t.o((function() {
        return e.handleGoAfterSaleList && e.handleGoAfterSaleList.apply(e, arguments)
      })),
      V: e.$static + "/static/image/mine/icon_address.png",
      W: e.$static + "/static/image/mine/icon_arrow_right.png",
      X: t.o((function() {
        return e.handleGoMyAddressPage && e.handleGoMyAddressPage.apply(e, arguments)
      })),
      Y: e.$static + "/static/image/mine/collect@2x.png",
      Z: e.$static + "/static/image/mine/icon_arrow_right.png",
      aa: t.o((function() {
        return e.handleGoCollect && e.handleGoCollect.apply(e, arguments)
      })),
      ab: e.$static + "/static/image/mine/icon_mine_vip.png",
      ac: e.$static + "/static/image/mine/icon_arrow_right.png",
      ad: t.o((function() {
        return e.handleGoVip && e.handleGoVip.apply(e, arguments)
      })),
      ae: e.$static + "/static/image/mine/mySunflowerIcon@2x.png",
      af: e.$static + "/static/image/mine/icon_arrow_right.png",
      ag: t.o((function() {
        return e.handleGoBalance && e.handleGoBalance.apply(e, arguments)
      })),
      ah: e.$static + "/static/image/mine/messageIcon@2x.png",
      ai: e.$static + "/static/image/mine/icon_arrow_right.png",
      aj: t.o((function() {
        return e.handleGoMyMessage && e.handleGoMyMessage.apply(e, arguments)
      })),
      ak: e.$static + "/static/image/mine/icon_setting.png",
      al: "" == e.countAndSafeVisited || 0 == e.auth
    }, "" == e.countAndSafeVisited || 0 == e.auth ? {
      am: e.$static + "/static/image/mine/icon_red_16.png"
    } : 1 == e.isAbnormal && 1 == e.auth ? {
      ao: e.$static + "/static/image/mine/icon_warning_black.png"
    } : {}, {
      an: 1 == e.isAbnormal && 1 == e.auth,
      ap: e.$static + "/static/image/mine/icon_arrow_right.png",
      aq: t.o((function() {
        return e.handleGoSetting && e.handleGoSetting.apply(e, arguments)
      })),
      ar: e.$static + "/static/image/mine/customerServiceIcon@2x.png",
      as: e.$static + "/static/image/mine/icon_arrow_right.png",
      at: t.o((function() {
        return e.handleGoHX && e.handleGoHX.apply(e, arguments)
      }))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/mine.vue"]
]);
wx.createPage(p);