var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../apis/mall.js"),
  a = require("../../common/vendor.js");
require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var i = {
  name: "list",
  components: {
    c_goodsList: function() {
      return "../../components/diyView/c_goodsList.js"
    }
  },
  setup: function() {
    var i = a.reactive({
      formData: {
        pageName: "",
        updateTime: "",
        pageConfig: {
          titleConfig: {
            key: "title",
            title: "页面名称：",
            value: "首页",
            tips: "请输入首页名称",
            max: 16
          },
          bgColor: {
            color: [{
              item: "#fff"
            }],
            default: [{
              item: "#fff"
            }],
            title: "背景颜色："
          }
        },
        value: []
      }
    });
    return a.onMounted((function() {
      t.apiGetOpenPage(2).then((function(e) {
        var t = {},
          a = [];
        try {
          t = JSON.parse(e.data.pageConfig)
        } catch (e) {
          t = {
            titleConfig: {
              key: "title",
              title: "页面名称：",
              value: "首页",
              tips: "请输入首页名称",
              max: 16
            },
            bgColor: {
              color: [{
                item: "#fff"
              }],
              default: [{
                item: "#fff"
              }],
              title: "背景颜色："
            }
          }
        }
        try {
          a = JSON.parse(e.data.moduleConfigInfo)
        } catch (e) {
          a = []
        }
        var o = [];
        a.forEach((function(e) {
          var t;
          if ("c_swiper" === e.name) {
            var a = [];
            null == (t = e.imgListConfig) || t.list.forEach((function(t) {
              t.info[2].value && 0 !== t.info[2].value.length && (new Date(t.info[2].value[0]).getTime() > (new Date).getTime() || new Date(t.info[2].value[1]).getTime() < (new Date).getTime()) ? console.log("未生效:", e) : a.push(t)
            })), e.imgListConfig.list = a, a.length > 0 && o.push(e)
          } else o.push(e)
        })), i.formData = {
          pageName: e.data.pageName,
          updateTime: e.data.updateTime,
          pageConfig: t,
          value: o
        }
      }))
    })), e({}, a.toRefs(i))
  }
};
Array || a.resolveComponent("c_goodsList")();
var o = a._export_sfc(i, [
  ["render", function(e, t, i, o, r, n) {
    return {
      a: a.f(e.formData.value, (function(e, t, i) {
        return {
          a: "e4304386-0-" + i,
          b: a.p({
            formData: e
          }),
          c: t
        }
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/product/list.vue"]
]);
wx.createPage(o);