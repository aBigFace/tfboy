var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  o = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  i = require("../../../apis/coupon.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../common/app-theme.js");
var r = n.defineComponent({
  name: "couponItem",
  components: {
    detailItem: function() {
      return "./detailItem.js"
    }
  },
  props: {
    item: {
      type: Object,
      default: {}
    },
    url: {
      type: String
    },
    isActive: {
      type: Number,
      default: 1
    }
  },
  setup: function(r, s) {
    var a = n.reactive({
        goodsDetailList: [],
        showGoodsInfo: !1,
        goodsName: ""
      }),
      u = getApp().globalData.shopInfo.companyId,
      p = function() {
        var e = t(o().mark((function e(t) {
          var n, r;
          return o().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (t.showVisible = !t.showVisible, t.upOrDown = "bottom" === t.upOrDown ? "top" : "bottom", n = {
                    companyId: u,
                    spuCode: t.skuBeanList[0].spu
                  }, !(a.goodsDetailList.length > 0)) {
                  e.next = 5;
                  break
                }
                return e.abrupt("return");
              case 5:
                return e.next = 7, i.apiGetShelvesBySpuCode(n);
              case 7:
                200 === (r = e.sent).code && (a.showGoodsInfo = !0, a.goodsDetailList = r.data.goodsFiles.filter((function(e) {
                  return 0 === e.type
                })), a.goodsName = r.data.name);
              case 9:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function(o) {
          return e.apply(this, arguments)
        }
      }();
    return e(e({}, n.toRefs(a)), {}, {
      showGoods: p,
      handleCopyNum: function(e) {
        n.index.setClipboardData({
          data: e,
          success: function() {
            n.index.showToast({
              title: "复制成功"
            })
          }
        })
      }
    })
  }
});
Array || (n.resolveComponent("uni-icons") + n.resolveComponent("detailItem"))();
Math;
var s = n._export_sfc(r, [
  ["render", function(e, o, t, i, r, s) {
    return n.e({
      a: e.url,
      b: n.t(e.item.voucherName),
      c: n.t(e.item.valEndTime),
      d: n.o((function(o) {
        return e.showGoods(e.item)
      })),
      e: n.p({
        type: e.item.upOrDown,
        color: "#888888",
        size: "12"
      }),
      f: n.o((function(o) {
        return e.showGoods(e.item)
      })),
      g: 0 !== e.item.adapterConditionType
    }, 0 !== e.item.adapterConditionType ? n.e({
      h: 0 === e.item.conditionType
    }, 0 === e.item.conditionType ? {
      i: n.t(e.item.conditionValue)
    } : {}, {
      j: 1 === e.item.conditionType
    }, 1 === e.item.conditionType ? {
      k: n.t(e.item.conditionValue)
    } : {}) : {}, {
      l: n.t(e.item.voucherDetailNo),
      m: n.o((function(o) {
        return e.handleCopyNum(e.item.voucherDetailNo)
      })),
      n: e.showGoodsInfo
    }, e.showGoodsInfo ? {
      o: n.f(e.goodsDetailList, (function(o, t, i) {
        return {
          a: t,
          b: "0b67115e-1-" + i,
          c: n.p({
            val: o,
            name: e.goodsName,
            isGrey: 0 === e.isActive
          })
        }
      }))
    } : {}, {
      p: e.item.showVisible
    })
  }],
  ["__scopeId", "data-v-0b67115e"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/myCoupon/couponItem.vue"]
]);
wx.createComponent(s);