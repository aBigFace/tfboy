var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  a = require("../../../apis/user.js"),
  i = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js"), require("../../../utils/commonEnum.js");
var u = n.defineComponent({
  name: "openVip",
  components: {
    realNamePopup: function() {
      return "../../order/components/realNamePopup.js"
    },
    realNameAbnormalPopup: function() {
      return "../../order/components/realNameAbnormalPopup.js"
    }
  },
  setup: function() {
    var u = n.ref(),
      s = n.ref(),
      o = n.reactive({
        vipList: [{
          teamName: "时代少年团",
          time: 139,
          isvip: !1,
          id: 1
        }, {
          teamName: "TF家族",
          time: 0,
          isvip: !0,
          id: 2
        }],
        times: 0,
        timer: null,
        userId: "",
        showTip: !1
      });
    n.onLoad((function(e) {
      e.id && (o.userId = e.id)
    })), n.onShow(r(t().mark((function e() {
      return t().wrap((function(e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return o.showTip = !1, e.next = 3, c();
          case 3:
            return e.next = 5, p(o.userId);
          case 5:
          case "end":
            return e.stop()
        }
      }), e)
    }))));
    var c = function() {
        var e = r(t().mark((function e() {
          var r;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, a.apiGetVipListApi();
              case 2:
                200 === (r = e.sent).code && (o.vipList = r.data);
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
      p = function() {
        var e = r(t().mark((function e(r) {
          var n, i, u;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, a.apiGetVipOpenApi(r);
              case 2:
                if ((n = e.sent).data.length)
                  for (i in n.data)
                    for (u in o.vipList) n.data[i].subjectId === o.vipList[u].subjectId && (o.vipList[u].termDay = n.data[i].termDay || 0, o.showTip = !0);
                else o.vipList.forEach((function(e) {
                  e.termDay = 0, o.showTip = !0
                }));
              case 4:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function(t) {
          return e.apply(this, arguments)
        }
      }(),
      m = function() {
        var e = r(t().mark((function e(r) {
          var o, c, p, m, f, l, b;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return o = "", "时代少年团" == r.subjectName ? o = "fufei_shida.png" : "TF家族" == r.subjectName ? o = "fufei_tfjiazu.png" : "TFBOYS" == r.subjectName ? o = "fufei_tfboys.png" : "登陆计划" == r.subjectName ? o = "fufei_dljh.png" : 5 == parseInt(r.subjectId) && (o = "fufei_3dai.png"), e.next = 4, a.apiGetSubjectPayDisabled();
              case 4:
                if (200 != (c = e.sent).code) {
                  e.next = 15;
                  break
                }
                p = c.data, m = 0;
              case 8:
                if (!(m < p.length)) {
                  e.next = 15;
                  break
                }
                if (r.subjectId != p[m].subjectId) {
                  e.next = 12;
                  break
                }
                return n.index.showToast({
                  title: p[m].message,
                  icon: "none"
                }), e.abrupt("return");
              case 12:
                m++, e.next = 8;
                break;
              case 15:
                if (i.isAuthentication()) {
                  e.next = 17;
                  break
                }
                return e.abrupt("return", u.value.handleOpen());
              case 17:
                if (null == (f = n.index.getStorageSync("userInfo").isAbnormal) || null == f || "" == f || 1 != f) {
                  e.next = 20;
                  break
                }
                return e.abrupt("return", s.value.handleOpen(r, o));
              case 20:
                if (l = n.index.getStorageSync("userInfo").roster, null != (b = n.index.getStorageSync("userInfo").blackPayMsg) && "" != b || (b = "抱歉，该账号已被限制付款。"), null == l || null == l || "" == l || 1 != l) {
                  e.next = 26;
                  break
                }
                return n.index.showToast({
                  title: b,
                  icon: "none"
                }), e.abrupt("return");
              case 26:
                n.index.navigateTo({
                  url: "/pages/mine/vip/payAgreement?subjectId=".concat(r.subjectId, "&subjectLogo=").concat(r.subjectLogo, "&subjectName=").concat(r.subjectName, "&termDay=").concat(r.termDay, "&img=").concat(o)
                });
              case 27:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function(t) {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, n.toRefs(o)), {}, {
      realNamePopupRef: u,
      realNameAbnormalPopupRef: s,
      goAgree: m
    })
  }
});
Array || (n.resolveComponent("realNamePopup") + n.resolveComponent("realNameAbnormalPopup"))();
var s = n._export_sfc(u, [
  ["render", function(e, t, r, a, i, u) {
    return {
      a: n.f(e.vipList, (function(t, r, a) {
        return n.e({
          a: t.subjectLogo,
          b: n.t(t.subjectName),
          c: t.termDay
        }, t.termDay ? {
          d: n.t(t.termDay)
        } : {}, e.showTip ? {
          e: n.t(t.termDay ? "续费" : "开通"),
          f: n.n(t.termDay ? "miss-btn-whitetext" : "miss-btn-redtext"),
          g: n.n(t.termDay ? "redbtn" : "whitebtn"),
          h: n.o((function(r) {
            return e.goAgree(t)
          }))
        } : {}, {
          i: n.s({
            opacity: "TFBOYS" == t.subjectName ? .5 : 1
          }),
          j: t.id
        })
      })),
      b: e.showTip,
      c: n.sr("realNamePopupRef", "53610744-0"),
      d: n.sr("realNameAbnormalPopupRef", "53610744-1")
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/vip/openVip.vue"]
]);
wx.createPage(s);