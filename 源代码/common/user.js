var e = require("../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../@babel/runtime/helpers/objectSpread2"),
  r = require("../@babel/runtime/helpers/asyncToGenerator"),
  o = require("./vendor.js"),
  t = require("../apis/user.js");

function a() {
  return (a = r(e().mark((function n(r) {
    var o, t;
    return e().wrap((function(e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          if ((o = getApp()) && o.globalData) {
            e.next = 3;
            break
          }
          return e.abrupt("return");
        case 3:
          r.orgId && ((t = o.globalData.shopInfo).orgId ? t !== r.orgId && (o.globalData.shopInfo = {
            orgId: r.orgId,
            companyId: r.companyId
          }) : (o.globalData.shopInfo.orgId = r.orgId, o.globalData.shopInfo.companyId = r.companyId)), r.shareId && (o.globalData.shareInfo = {
            shareId: r.shareId
          });
        case 5:
        case "end":
          return e.stop()
      }
    }), n)
  })))).apply(this, arguments)
}
exports.checkLogin = function() {
  var e = o.index.getStorageSync("token"),
    n = o.index.getStorageSync("userInfo");
  return !(!e || !n)
}, exports.iniAppData = function(e) {
  return a.apply(this, arguments)
}, exports.loginByWeixin = function(a) {
  return new Promise(function() {
    var i = r(e().mark((function r(i, s) {
      var c, u, p;
      return e().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (a.userExist) {
              e.next = 8;
              break
            }
            return c = getApp(), u = {
              orgId: c.globalData.shopInfo.orgId || null,
              companyId: c.globalData.shopInfo.companyId || null,
              shareId: c.globalData.shareInfo.shareId || null
            }, e.next = 5, t.apiUserRegister({
              registerType: 3,
              weChatRegister: n(n({}, a), u)
            });
          case 5:
            if (e.sent) {
              e.next = 8;
              break
            }
            return e.abrupt("return");
          case 8:
            return e.next = 10, t.apiUserLogin({
              grant_type: "wx_open_id",
              openId: a.openId,
              unionId: a.unionId,
              code: a.code,
              client_id: "tf",
              client_secret: "123",
              type: 1,
              platform: 2
            });
          case 10:
            p = e.sent, o.index.setStorageSync("token", p.access_token), o.index.setStorageSync("userInfo", p.currentUser), i();
          case 14:
          case "end":
            return e.stop()
        }
      }), r)
    })));
    return function(e, n) {
      return i.apply(this, arguments)
    }
  }())
}, exports.wxLogin = function() {
  return new Promise((function(e, n) {
    o.index.login({
      success: function(r) {
        o.index.getUserInfo({
          provider: "weixin",
          success: function(e) {
            console.log("uni.login", r), console.log("uni.getUserInfo", e)
          },
          fail: function(e) {
            o.index.showToast({
              title: "微信登录失败",
              icon: "none"
            })
          }
        }), r.code ? e(r) : n(r)
      },
      fail: function(e) {
        n(e)
      }
    })
  }))
};