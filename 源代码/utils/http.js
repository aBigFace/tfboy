var e = require("../common/vendor.js"),
  o = require("../config/apiPrefix.js"),
  a = require("./common.js");
exports.http = function(n) {
  return n.header || (n.header = {}), n.header["content-type"] || (n.header["content-type"] = "application/json"), n.header.loading && e.index.showLoading({
    title: "请稍等",
    mask: !0
  }), new Promise((function(i, t) {
    var d = "".concat(o.apiPrefix.ip).concat(o.apiPrefix.port ? ":" + o.apiPrefix.port : "", "/").concat(n.url);
    console.log("接口请求url:", d);
    var r = getApp(),
      s = Object.assign({
        sysCode: r.globalData.sysCode
      }, n.header),
      l = e.index.getStorageSync("token");
    if (l && (s.Authorization = "Bearer " + l, s.sysCode = r.globalData.sysCode), s.uploadFile) return s["content-type"] = "multipart/form-data", void e.index.uploadFile({
      url: d,
      method: "POST",
      filePath: n.data.filePath,
      name: "file",
      header: s,
      data: n.data || {},
      success: function(o) {
        if (200 === o.statusCode)
          if (o.data = JSON.parse(o.data), 200 === o.data.code) n.header.hideLoading && e.index.hideLoading(), i(o.data);
          else {
            if (401 === o.data.code) return e.index.hideLoading(), getApp().globalData.hasLogin = !1, e.index.removeStorageSync("token"), e.index.removeStorageSync("userInfo"), d.indexOf("goods/evaluationProduct/countForGoods") <= -1 && d.indexOf("social/comment/getOkCollect") <= -1 && d.indexOf("market/marketBookingActivity/mobile/listGoodsInfoByActivityIds") <= -1 && a.showGoLogin(), void t(new Error(o.data));
            console.info("========>", 1), e.index.showToast({
              icon: "none",
              title: o.data.message
            }), console.info("========>", 2), t(new Error(o.data))
          }
        else t(new Error("网络拥堵，请稍后再试")), console.info("========>", 3), e.index.showToast({
          icon: "none",
          title: "网络拥堵，请稍后再试"
        }), console.info("========>", 4)
      },
      fail: function(o) {
        console.log(o), t(new Error("网络拥堵，请稍后再试")), e.index.showToast({
          icon: "none",
          title: "网络拥堵，请稍后再试"
        })
      }
    });
    e.index.request({
      url: d,
      method: n.method || "GET",
      header: s,
      data: n.data,
      success: function(o) {
        if (console.log("接口".concat(n.url, "响应："), o.data), 200 === o.statusCode) 500 === o.data.code ? null != o.data.message && String(o.data.message).indexOf("分钟后尝试") > -1 ? e.index.showToast({
          icon: "none",
          title: o.data.message
        }) : d.indexOf("waybillManage/getRouting") < 0 ? (t(new Error(o.data)), e.index.showToast({
          icon: "none",
          title: o.data.message
        })) : console.log("无提示") : 100 === o.data.code ? (n.header.hideLoading && e.index.hideLoading(), t(o)) : 200 === o.data.code ? (n.header.hideLoading && e.index.hideLoading(), i(o.data)) : 429 === o.data.code ? (n.header.hideLoading && e.index.hideLoading(), i(o.data), e.index.showToast({
          icon: "none",
          title: "网络拥堵，请稍后再试！"
        })) : (s.hideGlobalError ? e.index.hideLoading() : e.index.showToast({
          icon: "none",
          title: o.data.message
        }), t(new Error(o.data.message)));
        else {
          if (401 === o.statusCode) return "invalid_grant" === o.data.error || "unauthorized" === o.data.error ? (e.index.hideLoading(), void t(o)) : (e.index.hideLoading(), getApp().globalData.hasLogin = !1, e.index.removeStorageSync("token"), e.index.removeStorageSync("userInfo"), d.indexOf("goods/evaluationProduct/countForGoods") <= -1 && d.indexOf("social/comment/getOkCollect") <= -1 && d.indexOf("market/marketBookingActivity/mobile/listGoodsInfoByActivityIds") <= -1 && a.showGoLogin(), void t(new Error(o.data)));
          if (400 === o.statusCode) {
            if ("invalid_grant" === o.data.error || "unauthorized" === o.data.error) return e.index.hideLoading(), void t(o);
            t(new Error(o.data.error_description)), e.index.showToast({
              icon: "none",
              title: o.data.error_description
            })
          } else 429 === o.statusCode ? (t(new Error(o)), e.index.hideLoading(), e.index.showModal({
            title: "提示",
            content: "网络拥堵，请稍后再试！",
            showCancel: !1
          })) : (t(new Error("网络拥堵，请稍后再试")), e.index.showToast({
            icon: "none",
            title: "网络拥堵，请稍后再试"
          }))
        }
      },
      fail: function(o) {
        console.log(o), t(new Error("网络拥堵，请稍后再试")), e.index.showToast({
          icon: "none",
          title: "网络拥堵，请稍后再试"
        })
      }
    })
  }))
};