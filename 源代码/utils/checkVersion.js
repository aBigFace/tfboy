var e = require("../common/vendor.js");
exports.checkVersion = function() {
  if (e.index.canIUse("getUpdateManager")) {
    if (!e.index.getUpdateManager) return;
    var n = e.index.getUpdateManager();
    n.onCheckForUpdate((function(t) {
      t.hasUpdate && (n.onUpdateReady((function() {
        e.index.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function(e) {
            e.confirm && n.applyUpdate()
          }
        })
      })), n.onUpdateFailed((function() {
        e.index.showModal({
          title: "已经有新版本了哟~",
          content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
        })
      })))
    }))
  } else e.index.showModal({
    title: "提示",
    content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
  })
};