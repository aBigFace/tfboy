var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  a = require("../utils.js"),
  r = {
    name: "typeTwo",
    components: {},
    props: ["selected", "viewData"],
    setup: function(r) {
      var i = t.reactive({
          searchValue: "",
          timer: null,
          listIndex: 0,
          placeholderStr: "",
          placeholderStrList: []
        }),
        n = t.toRefs(r).viewData,
        o = function() {
          r.viewData.imgListConfig.list.forEach((function(e) {
            i.placeholderStrList.push(e.info[0])
          })), i.placeholderStrList.some((function(e) {
            return e.value
          })) && (i.timer = setInterval((function() {
            i.listIndex++, i.listIndex == i.placeholderStrList.length && (i.listIndex = 0, i.placeholderStr = i.placeholderStrList[i.listIndex].value), i.placeholderStr = i.placeholderStrList[i.listIndex].value
          }), 8e3))
        };
      return t.onBeforeUnmount((function() {
        clearInterval(i.timer)
      })), t.onMounted((function() {
        o()
      })), e({
        goLink: a.goLink,
        viewData: n,
        changeTips: o,
        goToSearchPage: function() {
          t.index.navigateTo({
            url: "/pages/index/search"
          })
        }
      }, t.toRefs(i))
    }
  };
var i = t._export_sfc(r, [
  ["render", function(e, a, r, i, n, o) {
    return t.e({
      a: e.$static + "/static/image/home/searchIcon.png",
      b: i.viewData.borderColor.color[0].item,
      c: 1 === i.viewData.imgConfig.type ? "34rpx" : 0,
      d: "60rpx",
      e: t.o((function() {
        return i.goToSearchPage && i.goToSearchPage.apply(i, arguments)
      })),
      f: e.placeholderStr,
      g: e.searchValue,
      h: t.o((function(t) {
        return e.searchValue = t.detail.value
      })),
      i: i.viewData.imgLink
    }, i.viewData.imgLink ? {
      j: t.o((function() {
        return i.goLink(i.viewData.selectLink)
      })),
      k: i.viewData.imgLink
    } : {
      l: e.$static + "/static/image/home/searchImg.png"
    }, {
      m: i.viewData.bgColor
    })
  }],
  ["__scopeId", "data-v-b9acfff8"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/searchItem/typeTwo.vue"]
]);
wx.createComponent(i);