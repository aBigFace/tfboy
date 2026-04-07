var t = require("../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../common/vendor.js"),
  e = require("../../common/user.js"),
  i = require("../../apis/shopCart.js"),
  o = require("../../components/diyView/shoppCart.js"),
  n = require("../../utils/util.js"),
  r = require("../../utils/common.js");
require("../../apis/user.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/commonEnum.js"), require("../../common/app-theme.js");
var s = {
  name: "shopCart",
  components: {
    c_shoppCart: function() {
      return "../../components/diyView/c_shoppCart.js"
    },
    noData: function() {
      return "../../components/no-data.js"
    },
    costPerPopup: function() {
      return "../../components/popupWindow/costPerPopup.js"
    }
  },
  setup: function() {
    var s = a.reactive({
      isLogin: e.checkLogin(),
      status: -1,
      locationStatus: 1,
      loadingStatus: !1,
      formData: [JSON.parse(JSON.stringify(o.defaultShoppCartData))],
      tmpTime: String((new Date).getTime()),
      viewData: [],
      allData: [],
      userLogin: !0,
      totalData: [{
        title: "全部",
        state: -1,
        count: 0
      }, {
        title: "有货",
        state: 1,
        count: 0
      }, {
        title: "失效",
        state: 0,
        count: 0
      }]
    });
    a.onShow((function() {
      if (!e.checkLogin()) return r.showGoLogin();
      s.status = -1, s.userLogin = e.checkLogin(), s.userLogin && u()
    }));
    var u = function() {
        i.apiGetCartGroupList({
          companyId: 2,
          validState: -1,
          styleType: 0,
          applyType: 1
        }).then((function(t) {
          if (Array.isArray(t.data) && t.data.length > 0) try {
            t.data = [t.data[0]];
            var a = 0,
              e = 0,
              i = 0;
            t.data.forEach((function(t) {
              t.tmpTime = Math.floor(1e5 * Math.random()), t.cartPageVoList.forEach((function(t, o) {
                var r, s;
                i += 1, 1 == t.validState ? a += 1 : e += 1, t.numInfo.usableSkuTotalNum && (t.buyNumber = Math.min(Number(t.buyNumber), Number(t.numInfo.usableSkuTotalNum))), t.isChecked = !1, (null == (r = null == t ? void 0 : t.goodsInfo) ? void 0 : r.activityStartTime) && (null == (s = null == t ? void 0 : t.goodsInfo) ? void 0 : s.activityEndTime) ? t.activityFeignVo = n.saleTimeDataDeal({
                  activityEndTime: t.goodsInfo.activityEndTime,
                  activityStartTime: t.goodsInfo.activityStartTime,
                  deliverStartTime: t.goodsInfo.deliverStartTime
                }) : t.activityFeignVo = null
              }))
            })), s.allData = t.data, s.tmpTime = String((new Date).getTime()), s.totalData.forEach((function(t) {
              -1 == t.state && (t.count = i), 0 == t.state && (t.count = e), 1 == t.state && (t.count = a)
            }))
          } catch (t) {
            console.info("e========>", t)
          } else s.allData = [], s.totalData.forEach((function(t) {
            t.count = 0
          }));
          c()
        })).finally((function() {
          s.loadingStatus = !0
        }))
      },
      c = function() {
        if (null != s.allData && s.allData.length > 0) {
          if (s.viewData = JSON.parse(JSON.stringify(s.allData)), s.status > -1) {
            var t = [];
            s.viewData.forEach((function(a, e) {
              var i = [];
              a.cartPageVoList.forEach((function(t, a) {
                t.validState != s.status && i.push(a)
              }));
              for (var o = i.length - 1; o >= 0; o--) a.cartPageVoList.splice(i[o], 1);
              null != a.cartPageVoList && 0 != a.cartPageVoList.length || t.push(e)
            }));
            for (var a = t.length - 1; a >= 0; a--) s.viewData.splice(t[a], 1)
          }
        } else s.viewData = []
      };
    return t({
      validState: function(t, a) {
        s.status = t, 1 == a ? u() : c()
      },
      handleGoLogin: function() {
        a.index.navigateTo({
          url: "/pages/login/login"
        })
      },
      checkLogin: e.checkLogin
    }, a.toRefs(s))
  }
};
Array || a.resolveComponent("c_shoppCart")();
var u = a._export_sfc(s, [
  ["render", function(t, e, i, o, n, r) {
    return a.e({
      a: t.userLogin
    }, t.userLogin ? a.e({
      b: t.loadingStatus
    }, t.loadingStatus ? {
      c: a.o(o.validState),
      d: a.p({
        formData: t.formData,
        totalData: t.totalData,
        viewData: t.viewData,
        tmpData: t.tmpTime
      })
    } : {}) : {}, {
      e: !t.userLogin || !o.checkLogin()
    }, t.userLogin && o.checkLogin() ? {} : {
      f: t.$static + "/static/image/mine/shoppingCart.png"
    })
  }],
  ["__scopeId", "data-v-2205172d"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/shop/tfShopCart.vue"]
]);
wx.createPage(u);