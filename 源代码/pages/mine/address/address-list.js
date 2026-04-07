var e = require("../../../@babel/runtime/helpers/defineProperty"),
  o = require("../../../@babel/runtime/helpers/objectSpread2");
require("../../../@babel/runtime/helpers/Arrayincludes");
var a = require("../../../common/vendor.js"),
  r = require("../../../common/app-theme.js"),
  t = require("../../../common/constant.js"),
  n = require("../../../utils/uniUtil.js"),
  s = require("../../../apis/address.js"),
  i = require("../../../apis/order.js"),
  d = require("../../../common/common.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../apis/shopCart.js"), require("../../../utils/util.js"), require("../../../utils/commonEnum.js");
var c = a.defineComponent({
  name: "addressList",
  components: {
    noData: function() {
      return "../../../components/no-data.js"
    },
    searchBar: function() {
      return "../../../components/search-bar.js"
    },
    confirmModal: function() {
      return "../../../components/modal/confirm-modal.js"
    },
    confirmDialog: function() {
      return "../../dialog/conformDialog.js"
    }
  },
  setup: function() {
    var e = a.ref(),
      c = a.ref(),
      u = 1,
      l = a.reactive({
        showTabbar: !1,
        fromPage: "",
        fromAddrType: "",
        orderId: 0,
        edit: !1,
        waybillFee: 0,
        pullRefresh: !1,
        addressParams: "",
        searchParam: {
          bookType: 1,
          searchName: "",
          pageNum: 1,
          bookDefaultStatus: 0,
          pageSize: 10
        },
        addressList: [],
        loadMoreStatus: t.LoadMoreStatus.loading,
        saleAfterId: "",
        tabbarList: [{
          name: "全部",
          value: 0
        }, {
          name: "寄件",
          value: 1
        }, {
          name: "收件",
          value: 2
        }],
        isNoPay: !1
      }),
      f = {
        recevier: "",
        phone: "",
        address: ""
      };
    a.onLoad((function(e) {
      l.fromPage = e.fromPage || "", l.saleAfterId = e.saleAfterId || "", l.orderId = Number(e.id), l.waybillFee = Number(e.waybillFee || 0), e.urlParams && (l.addressParams = JSON.parse(e.urlParams || "")), e.isNoPay && (l.isNoPay = "1" === e.isNoPay), e.address && (f = JSON.parse(e.address)), l.fromAddrType = Number(e.addrType || 2)
    })), a.onShow((function() {
      m()
    })), a.onPullDownRefresh((function() {
      l.searchParam.pageNum = 1, l.pullRefresh = !0, m()
    })), a.onReachBottom((function() {
      l.loadMoreStatus === t.LoadMoreStatus.more && (l.searchParam.pageNum++, m())
    }));
    var h = function(e) {
        var o = {
          saleOrderId: l.orderId,
          receiver: e.bookName,
          receiverCity: e.bookCity,
          receiverCounty: e.bookCounty,
          receiverPhone: e.bookPhone,
          receiverAddress: e.bookAddress,
          receiverProvince: e.bookProvince,
          receiverStreet: ""
        };
        l.isNoPay ? i.apiNoPayUpdateAddress(o).then((function(e) {
          200 === e.code && (1 != e.data && null != e.data || a.index.showToast({
            title: "修改成功",
            icon: "none",
            success: function() {
              a.index.navigateBack()
            }
          }))
        })).catch((function(e) {
          a.index.showToast({
            title: "请稍后再试",
            icon: "none",
            success: function() {
              a.index.navigateBack()
            }
          })
        })) : i.apiHasPayUpdateAddress(o).then((function(e) {
          200 === e.code && ("操作成功" == e.data.message ? a.index.showToast({
            title: "修改成功",
            icon: "none",
            success: function() {
              a.index.navigateBack()
            }
          }) : 111 === e.data.code || 110 === e.data.code ? (a.index.navigateBack(), "orderDetail" == l.fromPage ? a.index.$emit("updateAddressPost", e.data) : a.index.$emit("updateAddressPostList", e.data)) : a.index.showToast({
            title: "稍后再试",
            icon: "none",
            success: function() {}
          }))
        })).catch((function(e) {}))
      },
      m = function() {
        l.loadMoreStatus = t.LoadMoreStatus.loading, s.apiGetAddressList(l.searchParam).then((function(e) {
          var o = e.data.records;
          for (var a in o) "86" == o[a].bookPhone.slice(0, 2) && (o[a].bookPhone = o[a].bookPhone.slice(2, o[a].bookPhone.length), o[a].areaCode = "86"), "852" == o[a].bookPhone.slice(0, 3) && (o[a].bookPhone = o[a].bookPhone.slice(3, o[a].bookPhone.length), o[a].areaCode = "852"), "853" == o[a].bookPhone.slice(0, 3) && (o[a].bookPhone = o[a].bookPhone.slice(3, o[a].bookPhone.length), o[a].areaCode = "853"), "886" == o[a].bookPhone.slice(0, 3) && (o[a].bookPhone = o[a].bookPhone.slice(3, o[a].bookPhone.length), o[a].areaCode = "886");
          l.addressList = 1 === l.searchParam.pageNum ? o : l.addressList.concat(o), l.loadMoreStatus = o.length < l.searchParam.pageSize ? t.LoadMoreStatus.noMore : t.LoadMoreStatus.more
        })).finally((function() {
          l.pullRefresh && a.index.stopPullDownRefresh()
        }))
      },
      p = function() {
        l.searchParam.pageNum = 1, l.addressList = [], m()
      },
      b = a.toRefs(l);
    return o(o({
      confirmModalRef: e,
      confirmDialogRef: c,
      AppTheme: r.AppTheme,
      pageType: 0,
      LoadMoreStatus: t.LoadMoreStatus
    }, b), {}, {
      handleSelectAddress: function(e) {
        console.log(e);
        var o = getApp(),
          r = d.convertAddressBookToAddress(e),
          t = r.province,
          n = r.city,
          i = r.county,
          c = r.detailAddress;
        if (r.name != f.recevier || r.phone != f.phone || "".concat(t).concat(n).concat(i).concat(c) != f.address) {
          if (console.log(r), o.globalData.tempData = {
              type: l.fromAddrType === u ? "sender" : "receiver",
              data: r,
              fromPage: l.fromPage
            }, ["afterSale", "order"].includes(l.fromPage) && a.index.navigateBack(), "orderDetail" == l.fromPage) {
            var m = e.bookProvince + e.bookCity + e.bookCounty + e.bookAddress;
            l.addressParams.landVerify = 1, l.addressParams.receiverAddress = m, l.addressParams.ticketItems = [], h(e)
          }
          if ("orderList" == l.fromPage && h(e), "saleDetail" == l.fromPage) {
            var p = e.bookName,
              b = e.bookAddress,
              k = e.bookCity,
              P = e.bookCounty,
              v = e.bookPhone,
              g = e.bookProvince,
              y = {
                id: l.saleAfterId,
                receiver: p,
                receiverAddress: b,
                receiverCity: k,
                receiverCounty: P,
                receiverPhone: v,
                receiverProvince: g,
                receiverStreet: ""
              };
            s.apiEditSaleAfterReceiver(y).then((function(e) {
              200 == e.code && a.index.navigateBack()
            }))
          }
        } else a.index.showToast({
          title: "新旧地址一致, 无需修改",
          icon: "none"
        })
      },
      handleChangeTabbar: function(e) {
        l.searchParam.bookType = e, p()
      },
      handleSearchAddress: p,
      handleEdit: function(e) {
        var o = d.convertAddressBookToAddress(e);
        a.index.navigateTo({
          url: "/pages/mine/address/address?params=".concat(JSON.stringify(o))
        })
      },
      handleDelete: function(o) {
        var a = o ? [o] : l.addressList.filter((function(e) {
          return e.checked
        })).map((function(e) {
          return e.id
        }));
        a && a.length ? e.value.confirm({
          title: "删除提示",
          message: "请确认是否删除？",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then((function() {
          s.apiDelAddress(a).then((function() {
            n.uniUtil.showToast("删除成功", {
              icon: "success"
            }), p()
          }))
        })) : n.uniUtil.showToast("请选择要删除的地址")
      },
      handleAdd: function() {
        var e = {
          bookType: l.searchParam.bookType
        };
        a.index.navigateTo({
          url: "/pages/mine/address/address?params=".concat(JSON.stringify(e))
        })
      },
      handleChangeDefaultAddress: function(e) {
        var o = JSON.parse(JSON.stringify(e));
        o.areaCode && (o.bookPhone = o.areaCode + o.bookPhone), o.bookDefaultStatus = 1 === o.bookDefaultStatus ? 0 : 1, s.apiEditAddress(o).then((function() {
          n.uniUtil.showToast("操作成功", {
            icon: "success"
          });
          var a = l.addressList.find((function(e) {
            return 1 === e.bookDefaultStatus
          }));
          a && (a.bookDefaultStatus = 0), e.bookDefaultStatus = o.bookDefaultStatus
        }))
      }
    })
  }
});
Array || (a.resolveComponent("search-bar") + a.resolveComponent("uni-icons") + a.resolveComponent("no-data") + a.resolveComponent("uni-load-more") + a.resolveComponent("confirm-modal") + a.resolveComponent("confirm-dialog"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"
})();
var u = a._export_sfc(c, [
  ["render", function(o, r, t, n, s, i) {
    return a.e({
      a: o.showTabbar
    }, o.showTabbar ? {
      b: a.f(o.tabbarList, (function(e, r, t) {
        return {
          a: a.t(e.name),
          b: a.n(e.value === o.searchParam.bookType ? "active" : ""),
          c: r,
          d: a.o((function(a) {
            return o.handleChangeTabbar(e.value)
          }))
        }
      }))
    } : {}, {
      c: a.o(o.handleSearchAddress),
      d: a.o((function(e) {
        return o.searchParam.searchName = e
      })),
      e: a.p({
        placeholder: "请输入姓名、地址进行搜索",
        modelValue: o.searchParam.searchName
      }),
      f: a.f(o.addressList, (function(e, r, t) {
        return a.e(o.edit ? a.e({
          a: e.checked
        }, e.checked ? {
          b: a.o((function(o) {
            return e.checked = !e.checked
          })),
          c: "9649b942-1-" + t,
          d: a.p({
            type: "checkbox-filled",
            size: 22,
            color: o.AppTheme.themeColor
          })
        } : {
          e: a.o((function(o) {
            return e.checked = !e.checked
          })),
          f: "9649b942-2-" + t,
          g: a.p({
            type: "circle",
            size: 22,
            color: "#CACACA"
          })
        }) : {}, {
          h: a.t(o.$filters.formatUserName(e.bookName)),
          i: a.t(o.$filters.encryptPhone(e.bookPhone)),
          j: 1 === e.bookDefaultStatus
        }, (e.bookDefaultStatus, {}), {
          k: a.t(e.bookProvince),
          l: a.t(e.bookCity),
          m: a.t(e.bookCounty),
          n: a.t(e.bookAddress),
          o: 1 === e.bookDefaultStatus
        }, 1 === e.bookDefaultStatus ? {
          p: "9649b942-3-" + t,
          q: a.p({
            type: "checkbox-filled",
            size: 22,
            color: o.AppTheme.themeColor
          })
        } : {
          r: "9649b942-4-" + t,
          s: a.p({
            type: "circle",
            size: 22,
            color: "#CACACA"
          })
        }, {
          t: a.o((function(a) {
            return o.handleChangeDefaultAddress(e)
          })),
          v: "9649b942-5-" + t,
          w: a.o((function(a) {
            return o.handleEdit(e)
          })),
          x: "9649b942-6-" + t,
          y: a.o((function(a) {
            return o.handleDelete(e.id)
          })),
          z: a.o((function(a) {
            return o.handleSelectAddress(e)
          })),
          A: r
        })
      })),
      g: o.edit,
      h: a.p({
        color: o.AppTheme.textLight,
        type: "compose"
      }),
      i: a.p({
        color: o.AppTheme.textLight,
        type: "trash"
      }),
      j: a.o((function() {})),
      k: a.n(o.edit ? "edit" : ""),
      l: o.loadMoreStatus === o.LoadMoreStatus.noMore && 0 === o.addressList.length
    }, o.loadMoreStatus === o.LoadMoreStatus.noMore && 0 === o.addressList.length ? {
      m: a.p(e(e({
        icon: o.$static + "/static/image/no-data/pic_tips_no_add%402x.png"
      }, "icon-type", "image"), "styles", {
        "padding-top": "20vh"
      }))
    } : {
      n: a.p({
        status: o.loadMoreStatus
      })
    }, {
      o: o.edit
    }, o.edit ? {
      p: a.o((function(e) {
        return o.edit = !1
      })),
      q: a.o((function(e) {
        return o.handleDelete()
      }))
    } : {
      r: a.o((function() {
        return o.handleAdd && o.handleAdd.apply(o, arguments)
      }))
    }, {
      s: a.sr("confirmModalRef", "9649b942-9"),
      t: a.sr("confirmDialogRef", "9649b942-10"),
      v: o.showTabbar ? 1 : "",
      w: 0 === o.addressList.length ? "#fff" : ""
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/address/address-list.vue"]
]);
wx.createPage(u);