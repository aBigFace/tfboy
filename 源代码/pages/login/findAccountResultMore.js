var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  a = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../common/vendor.js"),
  o = require("../../utils/util.js"),
  n = require("../../common/constant.js"),
  u = require("../../apis/user.js");
require("../../utils/commonEnum.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../common/app-theme.js");
var i = r.defineComponent({
  name: "findAccountResultMore",
  methods: {},
  components: {
    noData: function() {
      return "../../components/no-data.js"
    }
  },
  setup: function() {
    var i = r.reactive({
      realName: "",
      idCardType: 0,
      idCard: "",
      pageNum: 1,
      pageSize: 20,
      dataList: [],
      pullRefresh: !1,
      loadMoreStatus: n.LoadMoreStatus.noMore
    });
    r.onLoad((function(e) {
      i.realName = e.realName, i.idCardType = e.idCardType, i.idCard = e.idCard, s()
    })), r.onPullDownRefresh((function() {
      i.pageNum = 1, i.pullRefresh = !0, s()
    })), r.onReachBottom((function() {
      console.log("底部了"), i.loadMoreStatus === n.LoadMoreStatus.more && (i.pageNum++, s())
    }));
    var s = function() {
      var e = a(t().mark((function e() {
        var a, s, d, l;
        return t().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return a = {
                realName: i.realName,
                idCardType: i.idCardType,
                idCard: i.idCard,
                pageSize: i.pageSize,
                pageNum: i.pageNum
              }, e.next = 3, u.apiFindByIdV3(a).catch((function() {
                i.loadMoreStatus = n.LoadMoreStatus.noMore
              })).finally((function() {
                i.pullRefresh && r.index.stopPullDownRefresh()
              }));
            case 3:
              for (s = e.sent, d = s.data.records, l = 0; l < d.length; l++) d[l].phone = o.EncryptPhone(d[l].phone), d[l].email = o.EncryptEmail(d[l].email);
              i.dataList = 1 === i.pageNum ? d : i.dataList.concat(d), i.loadMoreStatus = d.length < i.pageSize ? n.LoadMoreStatus.noMore : n.LoadMoreStatus.more;
            case 8:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function() {
        return e.apply(this, arguments)
      }
    }();
    return e(e({}, r.toRefs(i)), {}, {
      LoadMoreStatus: n.LoadMoreStatus,
      getDataList: s
    })
  }
});
Array || (r.resolveComponent("no-data") + r.resolveComponent("uni-load-more"))();
Math;
var s = r._export_sfc(i, [
  ["render", function(e, t, a, o, n, u) {
    return r.e({
      a: r.f(e.dataList, (function(e, t, a) {
        return {
          a: r.t(e.phone),
          b: r.t(e.email)
        }
      })),
      b: e.loadMoreStatus === e.LoadMoreStatus.noMore && 0 === e.dataList.length
    }, e.loadMoreStatus === e.LoadMoreStatus.noMore && 0 === e.dataList.length ? {
      c: r.p({
        styles: {
          "padding-top": "10vh"
        }
      })
    } : {
      d: r.p({
        status: e.loadMoreStatus
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/login/findAccountResultMore.vue"]
]);
wx.createPage(s);