var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../../common/vendor.js"),
  r = {
    name: "typeOne",
    components: {},
    props: ["selected", "viewData"],
    setup: function(r) {
      var a = t.toRefs(r).viewData,
        o = t.reactive({
          searchValue: "",
          timer: null,
          listIndex: 0,
          placeholderStr: "",
          placeholderStrList: []
        }),
        n = function() {
          r.viewData.imgListConfig.forEach((function(e) {
            o.placeholderStrList.push(e)
          })), o.placeholderStrList.some((function(e) {
            return e.value
          })) && (o.timer = setInterval((function() {
            o.listIndex++, o.listIndex == o.placeholderStrList.length && (o.listIndex = 0, o.placeholderStr = o.placeholderStrList[o.listIndex].value), o.placeholderStr = o.placeholderStrList[o.listIndex].value
          }), 8e3))
        };
      return t.onBeforeUnmount((function() {
        clearInterval(o.timer)
      })), t.onMounted((function() {
        n()
      })), e({
        viewData: a,
        goToSearchPage: function() {
          t.index.navigateTo({
            url: "/pages/index/search"
          })
        },
        changeTips: n
      }, t.toRefs(o))
    }
  };
var a = t._export_sfc(r, [
  ["render", function(e, r, a, o, n, i) {
    return {
      a: e.$static + "/static/image/home/searchIcon.png",
      b: o.viewData.borderColor,
      c: "fillet" === o.viewData.imgConfig ? "34rpx" : 0,
      d: "60rpx",
      e: o.viewData.textColor,
      f: t.o((function() {
        return o.goToSearchPage && o.goToSearchPage.apply(o, arguments)
      })),
      g: e.searchValue,
      h: t.o((function(t) {
        return e.searchValue = t.detail.value
      })),
      i: t.o((function() {
        return o.goToSearchPage && o.goToSearchPage.apply(o, arguments)
      })),
      j: o.viewData.bgColor
    }
  }],
  ["__scopeId", "data-v-ea7c61c4"],
  ["__file", "E:/project/TF/tf-wechat/src/components/diyView/searchItem/typeOne.vue"]
]);
wx.createComponent(a);