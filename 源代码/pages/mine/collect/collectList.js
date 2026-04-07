var e = require("../../../@babel/runtime/helpers/defineProperty"),
  o = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  n = require("../../../common/constant.js"),
  a = require("../../../utils/uniUtil.js"),
  i = require("../../../apis/collect.js"),
  r = require("../../../apis/product.js");
require("../../../common/app-theme.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js");
var s = t.defineComponent({
  name: "collectList",
  components: {
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    noData: function() {
      return "../../../components/no-data.js"
    }
  },
  setup: function() {
    var e = t.ref(),
      s = t.reactive({
        pullRefresh: !1,
        loadMoreStatus: n.LoadMoreStatus.noMore,
        goodsInfo: [],
        searchParam: {
          applyType: 1,
          contentMethod: 4,
          pageNum: 1,
          pageSize: 10,
          status: 1,
          id: ""
        },
        activeIndex: 0,
        startX: 0
      });
    t.onLoad((function() {
      t.index.setNavigationBarTitle({
        title: "我的收藏"
      });
      var e = t.index.getStorageSync("userInfo");
      s.searchParam.id = e.id, u()
    })), t.onPullDownRefresh((function() {
      s.searchParam.pageNum = 1, s.pullRefresh = !0, u()
    })), t.onReachBottom((function() {
      s.loadMoreStatus === n.LoadMoreStatus.more && (s.searchParam.pageNum++, u())
    }));
    var u = function() {
      var e = JSON.parse(JSON.stringify(s.searchParam));
      i.apiGetCollectListRecord(e).then((function(e) {
        var o = e.data.records;
        s.goodsInfo = 1 === s.searchParam.pageNum ? o : s.goodsInfo.concat(o), s.loadMoreStatus = o.length < s.searchParam.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more
      })).catch((function() {
        s.loadMoreStatus = n.LoadMoreStatus.noMore
      })).finally((function() {
        s.pullRefresh && t.index.stopPullDownRefresh()
      }))
    };
    return o(o({}, t.toRefs(s)), {}, {
      LoadMoreStatus: n.LoadMoreStatus,
      confirmModalRef: e,
      itemTouchStart: function(e, o) {
        s.activeIndex = o, s.startX = e.changedTouches[0].pageX
      },
      itemTouchMove: function(e) {},
      itemTouchEnd: function(e) {
        var o = e.changedTouches[0].pageX - s.startX;
        o < -82 ? s.goodsInfo[s.activeIndex].itemTransLateX = -165 : o > 82 && (s.goodsInfo[s.activeIndex].itemTransLateX = 0)
      },
      itemCancelClick: function(o) {
        var n = {
          collectType: 2,
          itemId: o.goodsSkuDetailFeginVo.goodsId,
          contentMethod: 4,
          status: 1 == o.status ? 0 : 1,
          skuCode: o.goodsSkuDetailFeginVo.skuCode,
          id: t.index.getStorageSync("userInfo").id,
          phone: o.phone,
          email: o.email
        };
        e.value.confirm({
          title: "提示",
          message: "请确认是否取消？",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then((function() {
          r.apiCollect(n).then((function() {
            a.uniUtil.showToast("取消成功"), u()
          }))
        }))
      },
      getCollectList: u,
      goGoodsDetail: function(e) {
        0 != e.putStatus ? e.name && e.stock <= 0 ? t.index.showToast({
          title: "商品已售罄",
          icon: "none"
        }) : t.index.navigateTo({
          url: "/pages/product/detail?spuCode=".concat(e.spuCode)
        }) : t.index.showToast({
          title: "商品已下架",
          icon: "none"
        })
      }
    })
  }
});
Array || (t.resolveComponent("no-data") + t.resolveComponent("uni-load-more") + t.resolveComponent("confirm-modal"))();
Math;
var u = t._export_sfc(s, [
  ["render", function(o, n, a, i, r, s) {
    return t.e({
      a: t.f(o.goodsInfo, (function(e, n, a) {
        return t.e({
          a: e.goodsSkuDetailFeginVo.imgUrl,
          b: t.t(e.goodsSkuDetailFeginVo.saleName ? e.goodsSkuDetailFeginVo.saleName : e.goodsSkuDetailFeginVo.spuName),
          c: t.t(e.collectNum),
          d: t.t(e.goodsSkuDetailFeginVo.sellPrice),
          e: t.o((function(t) {
            return o.goGoodsDetail(e.goodsSkuDetailFeginVo)
          })),
          f: t.o((function(t) {
            return o.itemCancelClick(e)
          })),
          g: 0 == e.goodsSkuDetailFeginVo.putStatus
        }, (0 == e.goodsSkuDetailFeginVo.putStatus || e.goodsSkuDetailFeginVo.name && e.goodsSkuDetailFeginVo.stock, {}), {
          h: e.goodsSkuDetailFeginVo.name && e.goodsSkuDetailFeginVo.stock <= 0,
          i: n,
          j: t.o((function(e) {
            return o.itemTouchStart(e, n)
          })),
          k: o.activeIndex === n ? "translateX( " + e.itemTransLateX + "rpx)" : 0
        })
      })),
      b: t.o((function() {})),
      c: t.o((function(e) {
        return o.itemTouchEnd(e)
      })),
      d: o.loadMoreStatus === o.LoadMoreStatus.noMore && 0 === o.goodsInfo.length
    }, o.loadMoreStatus === o.LoadMoreStatus.noMore && 0 === o.goodsInfo.length ? {
      e: t.p(e(e({
        icon: o.$static + "/static/image/no-data/no-collect.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "10vh"
      }))
    } : {
      f: t.p({
        status: o.loadMoreStatus
      })
    }, {
      g: t.sr("confirmModalRef", "6d2de546-2")
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/collect/collectList.vue"]
]);
wx.createPage(u);