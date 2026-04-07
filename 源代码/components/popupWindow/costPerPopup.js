var e = require("../../@babel/runtime/helpers/defineProperty"),
  t = require("../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  i = require("../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../common/vendor.js"),
  o = require("../../apis/mall.js"),
  r = require("../../common/user.js"),
  p = require("../diyView/utils.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js"), require("../../apis/user.js");
var s = {
    adContent: {
      cpmTent: {
        imgUrl: ""
      }
    },
    name: "c_costPerPopup",
    cnName: "弹窗广告",
    cpmTitle: {
      cnName: "弹窗名称：",
      costPerPopupValue: ""
    },
    cpmTent: {
      cnName: "弹窗内容：",
      imgUrl: "",
      imgOptionsList: ""
    },
    assertDate: {
      cnName: "生效时间：",
      type: 0,
      startDate: "",
      endDate: "",
      list: [{
        isShowAssertDate: !1,
        text: "不限制时间",
        val: 1
      }, {
        isShowAssertDate: !0,
        text: "自定时间",
        val: 2
      }]
    },
    link: {
      cnName: "链接：",
      value: ""
    },
    closeType: {
      cnName: "关闭方式：",
      type: 0,
      closeDate: 10,
      list: [{
        isShowDateIpunt: !1,
        text: "用户手动关闭",
        val: 1
      }, {
        isShowDateIpunt: !0,
        text: "设置时间关闭",
        val: 2
      }]
    },
    frequency: {
      frequencyCont: 1,
      cnName: "推荐频次：",
      showTipFlag: "",
      type: 0,
      list: [{
        text: "仅推荐一次",
        val: 1,
        isShowTip: "one"
      }, {
        text: "每天推荐一次",
        val: 2,
        isShowTip: "two"
      }, {
        text: "每次启动推送",
        val: 3,
        isShowTip: "three"
      }],
      tipDataList: [{
        tip: "用户浏览过一次后，不再向该用户推送",
        isShowTip: "one"
      }, {
        tip: "用户每次进入该页面仅推送一次",
        isShowTip: "two"
      }, {
        tip: "用户每次进入该页面都推送",
        isShowTip: "three"
      }]
    },
    triggerPage: {
      cnName: "触发页面：",
      triggerWay: "",
      triggerWayList: [{
        label: "",
        value: ""
      }]
    }
  },
  l = {
    name: "popup",
    props: {
      operationObj: {
        type: Object,
        default: function() {
          return {
            closeId: "",
            type: "",
            spuCode: ""
          }
        }
      }
    },
    setup: function(e) {
      var l = getCurrentPages(),
        u = l[l.length - 1].route,
        c = n.ref(),
        d = n.reactive({
          timer: 0,
          formData: s,
          viewData: {},
          popupListLength: 0,
          idList: [],
          operationObj: {
            closeId: "",
            type: "",
            spuCode: ""
          }
        }),
        m = function() {
          var t = i(a().mark((function t(i) {
            var n, r, p;
            return a().wrap((function(t) {
              for (;;) switch (t.prev = t.next) {
                case 0:
                  return d.operationObj = JSON.parse(JSON.stringify(e.operationObj)), n = {
                    adType: 1,
                    url: u,
                    urlParams: i.spuCode
                  }, ("auto" == d.operationObj.type && d.operationObj.closeId || !i.spuCode) && (n.urlParams = ""), t.prev = 3, t.next = 6, o.apiGetAdList(n);
                case 6:
                  r = t.sent, (p = r.data).forEach((function(e) {
                    var t = JSON.parse(e.adContent);
                    e.adContent = t, e.validEndTime = new Date(e.validEndTime).getTime(), e.validStartTime = new Date(e.validStartTime).getTime()
                  })), p = p.filter((function(e) {
                    return e.validStartTime && e.validEndTime ? (new Date).getTime() > e.validStartTime && (new Date).getTime() < e.validEndTime : e.validStartTime || e.validEndTime ? e.validStartTime && !e.validEndTime ? (new Date).getTime() > e.validStartTime : !e.validStartTime && e.validEndTime ? (new Date).getTime() < e.validEndTime : void 0 : !e.validStartTime && !e.validEndTime
                  })), d.idList.push(i.closeId), i.closeId && (p = p.filter((function(e) {
                    return d.idList.every((function(t) {
                      return e.id != t
                    }))
                  }))), d.popupListLength = p.length, d.popupListLength && v(p), t.next = 19;
                  break;
                case 16:
                  throw t.prev = 16, t.t0 = t.catch(3), new Error("error:" + t.t0);
                case 19:
                case "end":
                  return t.stop()
              }
            }), t, null, [
              [3, 16]
            ])
          })));
          return function(e) {
            return t.apply(this, arguments)
          }
        }(),
        v = function(e) {
          d.formData = e, d.viewData = e[0], c.value.open("center"), d.viewData.adContent.closeType.closeDate && (d.timer = setInterval((function() {
            d.viewData.adContent.closeType.closeDate -= 1, d.viewData.adContent.closeType.closeDate < 1 && (clearInterval(d.timer), c.value.close(), T(d.viewData.id), d.operationObj = {
              closeId: d.viewData.id,
              type: "auto"
            }, m(d.operationObj))
          }), 1e3))
        },
        T = function(e) {
          o.apiReadState(e).then((function(e) {}))
        };
      return n.onLoad((function(t) {
        r.checkLogin() && n.nextTick((function() {
          d.idList = [], m(e.operationObj)
        }))
      })), n.onShow((function() {})), n.onUnload((function() {
        c.value.close(), clearInterval(d.timer)
      })), t(t({
        popupRef: c,
        goLink: p.goLink,
        closePopup: function() {
          c.value.close(), d.operationObj = {
            closeId: d.viewData.id,
            type: "auto"
          }, T(d.viewData.id), m(d.operationObj), clearInterval(d.timer)
        },
        updateReadState: T,
        initPopupData: m
      }, n.toRefs(d)), {}, {
        setData: v
      })
    }
  };
Array || n.resolveComponent("uni-popup")();
Math;
var u = n._export_sfc(l, [
  ["render", function(t, a, i, o, r, p) {
    return n.e({
      a: t.popupListLength
    }, t.popupListLength ? n.e({
      b: n.o((function() {
        return o.goLink(t.viewData.adContent.link)
      })),
      c: t.viewData.adContent.cpmTent.imgUrl,
      d: n.o((function() {
        return o.closePopup && o.closePopup.apply(o, arguments)
      })),
      e: t.viewData.adContent.closeType.closeDate
    }, t.viewData.adContent.closeType.closeDate ? {
      f: n.t(t.viewData.adContent.closeType.closeDate)
    } : {}) : {}, {
      g: n.sr("popupRef", "2e004f02-0"),
      h: n.p(e(e({}, "mask-click", !1), "is-mask-click", !1))
    })
  }],
  ["__scopeId", "data-v-2e004f02"],
  ["__file", "E:/project/TF/tf-wechat/src/components/popupWindow/costPerPopup.vue"]
]);
wx.createComponent(u);