var e = require("../@babel/runtime/helpers/objectSpread2"),
  n = require("../common/vendor.js"),
  t = require("../common/app-theme.js"),
  o = {
    showToast: function(e, t) {
      var o = {
        title: e,
        icon: "none",
        duration: 1500
      };
      t && Object.assign(o, t), n.index.showToast(o)
    },
    hideToast: function() {
      n.index.hideToast()
    },
    showModal: function(o, i, s) {
      var c = {
        title: o,
        content: i,
        confirmColor: t.AppTheme.themeColor
      };
      return s && Object.assign(c, s), new Promise((function(t, o) {
        n.index.showModal(e(e({}, c), {}, {
          success: function(e) {
            e.cancel ? o(e) : t()
          },
          fail: function(e) {
            o(e)
          }
        }))
      }))
    },
    copyText: function(e) {
      n.index.setClipboardData({
        data: e,
        success: function() {
          n.index.showToast({
            icon: "success",
            title: "复制成功"
          })
        }
      })
    },
    pasteText: function() {
      return new Promise((function(e, t) {
        n.index.getClipboardData({
          success: function(n) {
            e(n.data)
          },
          fail: function(e) {
            t(e)
          }
        })
      }))
    },
    makePhoneCall: function(e) {
      n.index.makePhoneCall({
        phoneNumber: e
      })
    },
    goBackAndRefresh: function() {
      var e = getCurrentPages(),
        t = e[e.length - 2];
      n.index.navigateBack({
        success: function() {
          t && t.onLoad(t.options)
        }
      })
    },
    subscribeMessage: function(e) {
      return new Promise((function(t, o) {
        n.index.requestSubscribeMessage({
          tmplIds: e.tmplIds,
          success: function(e) {
            t(e)
          },
          fail: function(e) {
            o(e)
          }
        })
      }))
    }
  };
exports.uniUtil = o;