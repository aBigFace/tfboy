var o = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../common/vendor.js"),
  e = {
    name: "c_goodsList",
    components: {
      Tabs: function() {
        return "../tabs/tabs.js"
      },
      BigList: function() {
        return "./goodsListItem/bigList.js"
      },
      LittleList: function() {
        return "./goodsListItem/littleList.js"
      },
      OneLineThree: function() {
        return "./goodsListItem/oneLineThree.js"
      },
      MoreImgRoll: function() {
        return "./goodsListItem/moreImgRoll.js"
      },
      oneLineTwo: function() {
        return "./goodsListItem/oneLineTwo.js"
      },
      SelectSku: function() {
        return "../select-sku.js"
      }
    },
    props: ["formData", "isLast", "companyId", "nowDate"],
    setup: function(e, a) {
      var n = a.emit,
        s = t.toRefs(e),
        i = s.formData,
        r = s.isLast,
        m = s.companyId,
        c = s.nowDate,
        f = t.ref(),
        L = t.reactive({
          currentAnchor: 0
        }),
        d = t.computed$1((function() {
          return 1 === i.value.goodsAnchor.type ? i.value.goodsAnchor.anchor[L.currentAnchor].showGoods : i.value.showGoods
        }));
      return o({
        skuChange: function(o) {
          n("skuChange", o)
        },
        selectSkuRef: f,
        companyId: m,
        formData: i,
        idList: d,
        isLast: r,
        nowDate: c,
        changeIndex: function(o) {
          L.currentAnchor = o
        }
      }, t.toRefs(L))
    }
  };
Array || (t.resolveComponent("Tabs") + t.resolveComponent("BigList") + t.resolveComponent("LittleList") + t.resolveComponent("oneLineTwo") + t.resolveComponent("OneLineThree") + t.resolveComponent("MoreImgRoll"))();
var a = t._export_sfc(e, [
  ["render", function(o, e, a, n, s, i) {
    return t.e({
      a: 1 === n.formData.goodsAnchor.type
    }, 1 === n.formData.goodsAnchor.type ? {
      b: t.o(n.changeIndex),
      c: t.p({
        data: n.formData.goodsAnchor.anchor,
        margin: n.formData.pageMargin
      })
    } : {}, {
      d: "bigList" === n.formData.tsConfig
    }, "bigList" === n.formData.tsConfig ? {
      e: t.o(n.skuChange),
      f: t.p({
        idList: n.idList,
        isLast: n.isLast,
        allData: n.formData,
        companyId: n.companyId
      })
    } : {}, {
      g: "littleList" === n.formData.tsConfig
    }, "littleList" === n.formData.tsConfig ? {
      h: t.o(n.skuChange),
      i: t.p({
        idList: n.idList,
        nowDate: n.nowDate,
        isLast: n.isLast,
        allData: n.formData,
        companyId: n.companyId
      })
    } : {}, {
      j: "oneLineTwo" === n.formData.tsConfig
    }, "oneLineTwo" === n.formData.tsConfig ? {
      k: t.o(n.skuChange),
      l: t.p({
        idList: n.idList,
        isLast: n.isLast,
        nowDate: n.nowDate,
        allData: n.formData,
        companyId: n.companyId
      })
    } : {}, {
      m: "oneLineThree" === n.formData.tsConfig
    }, "oneLineThree" === n.formData.tsConfig ? {
      n: t.o(n.skuChange),
      o: t.p({
        idList: n.idList,
        isLast: n.isLast,
        allData: n.formData,
        companyId: n.companyId
      })
    } : {}, {
      p: "moreImgRoll" === n.formData.tsConfig
    }, "moreImgRoll" === n.formData.tsConfig ? {
      q: t.o(n.skuChange),
      r: t.p({
        idList: n.idList,
        isLast: n.isLast,
        allData: n.formData,
        companyId: n.companyId
      })
    } : {}, {
      s: n.formData.pageMargin + "px",
      t: n.formData.pageMargin + "px"
    })
  }],
  ["__scopeId", "data-v-59b8dcbc"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/c_goodsList.vue"]
]);
wx.createComponent(a);