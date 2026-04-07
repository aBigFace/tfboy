var e = function(e) {
    return e[e.not_presale = 0] = "not_presale", e[e.before_presale = 1] = "before_presale", e[e.presale = 2] = "presale", e[e.end_presale = 3] = "end_presale", e
  }(e || {}),
  r = function(e) {
    return e[e.register = 1] = "register", e[e.login = 2] = "login", e[e.editPassword = 3] = "editPassword", e[e.guardian = 4] = "guardian", e[e.forget = 5] = "forget", e[e.sunflowerGift = 6] = "sunflowerGift", e[e.changeMemberBind = 7] = "changeMemberBind", e[e.cancel = 8] = "cancel", e[e.rebind = 9] = "rebind", e[e.beforeChangeTelEmail = 10] = "beforeChangeTelEmail", e[e.changeTelEmail = 11] = "changeTelEmail", e
  }(r || {});
exports.EActivityStatus = e, exports.EValidType = r;