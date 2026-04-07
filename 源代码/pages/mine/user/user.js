var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  a = require("../../../common/vendor.js"),
  t = require("../../../apis/user.js"),
  i = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../utils/commonEnum.js");
var o = a.defineComponent({
  name: "user",
  setup: function() {
    var o = a.reactive({
      userInfo: {
        headPortrait: "",
        nickName: "",
        sex: 0,
        phone: "",
        isCertify: !1,
        age: "",
        id: "",
        idCard: "",
        realName: "",
        serialNo: "",
        idCardType: -1,
        isAbnormal: 0,
        auth: 0
      },
      vipId: ""
    });
    a.onShow((function() {
      s()
    }));
    var s = function() {
        var e = n(r().mark((function e() {
          var n, a, s;
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, t.apiGetUserInfo();
              case 2:
                n = e.sent, a = n.data, (s = a).sexDesc = u(s.sex || 0), o.userInfo = s, "" === o.userInfo.nickName && (o.vipId = "用户:".concat(s.serialNo)), o.userInfo.isCertify = i.isNotEmpty(s.idCardType), o.userInfo.isCertify && (o.userInfo.age = 1 == parseInt(s.idCardType) ? i.analyzeIDCardToAge(s.idCard) : "18");
              case 10:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      u = function(e) {
        var r = "";
        switch (e) {
          case 0:
            r = "请选择";
            break;
          case 1:
            r = "男";
            break;
          case 2:
            r = "女";
            break;
          default:
            r = ""
        }
        return r
      },
      c = function() {
        var e = n(r().mark((function e(n) {
          var i;
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, t.apiUploadFile({
                  filePath: n.target.avatarUrl
                });
              case 2:
                return i = e.sent, o.userInfo.headPortrait = i.data, e.next = 6, t.apiEditUser({
                  headPortrait: o.userInfo.headPortrait
                });
              case 6:
                a.index.showToast({
                  title: "头像修改成功!"
                });
              case 7:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function(r) {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, a.toRefs(o)), {}, {
      goPageChangeNickname: function() {
        a.index.navigateTo({
          url: "/pages/mine/user/changeNickName?name=".concat(o.userInfo.nickName)
        })
      },
      goPageChangeSex: function() {
        a.index.navigateTo({
          url: "/pages/mine/user/changeSex?sex=".concat(o.userInfo.sex)
        })
      },
      onChooseAvatar: c,
      handleCopyId: function() {
        a.index.setClipboardData({
          data: String(o.userInfo.serialNo),
          success: function() {
            a.index.showToast({
              title: "已复制",
              icon: "none"
            })
          }
        })
      },
      goPageCertify: function() {
        a.index.navigateTo({
          url: "/pages/mine/user/certifyInfo"
        })
      }
    })
  }
});
Array || a.resolveComponent("uni-icons")();
Math;
var s = a._export_sfc(o, [
  ["render", function(e, r, n, t, i, o) {
    return a.e({
      a: e.userInfo.headPortrait
    }, e.userInfo.headPortrait ? {
      b: a.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      }),
      c: e.userInfo.headPortrait
    } : {
      d: a.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      }),
      e: e.$static + "/static/image/mine/pic_people_mine_60@2x.png"
    }, {
      f: a.o((function() {
        return e.onChooseAvatar && e.onChooseAvatar.apply(e, arguments)
      })),
      g: a.t(e.userInfo.nickName ? e.userInfo.nickName : e.vipId),
      h: a.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      }),
      i: a.o((function() {
        return e.goPageChangeNickname && e.goPageChangeNickname.apply(e, arguments)
      })),
      j: a.t(e.userInfo.sexDesc),
      k: a.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      }),
      l: a.o((function() {
        return e.goPageChangeSex && e.goPageChangeSex.apply(e, arguments)
      })),
      m: a.t(e.userInfo.serialNo),
      n: e.$static + "/static/image/mine/copy.png",
      o: a.o((function() {
        return e.handleCopyId && e.handleCopyId.apply(e, arguments)
      })),
      p: a.t(e.userInfo.age),
      q: 1 == e.userInfo.isAbnormal && e.userInfo.isCertify
    }, 1 == e.userInfo.isAbnormal && e.userInfo.isCertify ? {
      r: e.$static + "/static/image/mine/icon_warning_black.png"
    } : {}, {
      s: 0 == e.userInfo.isAbnormal && !e.userInfo.isCertify
    }, 0 != e.userInfo.isAbnormal || e.userInfo.isCertify ? {} : {
      t: e.$static + "/static/image/mine/icon_red_16.png"
    }, {
      v: e.userInfo.isCertify
    }, e.userInfo.isCertify ? {} : {
      w: a.p({
        type: "forward",
        size: 16,
        color: "#CECECE"
      })
    }, {
      x: a.o((function() {
        return e.goPageCertify && e.goPageCertify.apply(e, arguments)
      }))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/user/user.vue"]
]);
wx.createPage(s);