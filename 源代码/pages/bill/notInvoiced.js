var a = require("../../@babel/runtime/helpers/objectSpread2"),
  e = require("../../common/vendor.js"),
  t = require("../../utils/validate.js"),
  r = require("../../utils/uniUtil.js"),
  i = require("../../apis/order.js"),
  l = require("../../common/common.js");
require("../../common/app-theme.js"), require("../../utils/http.js"), require("../../config/apiPrefix.js"), require("../../utils/common.js"), require("../../apis/shopCart.js"), require("../../utils/util.js"), require("../../utils/commonEnum.js");
var n = {
  name: "notInvoiced",
  components: {},
  setup: function() {
    var n = e.reactive({
      isDisabled: !0,
      isShowMoreFlag: !1,
      changeShowMoreFlag: !1,
      changeBillPageFlag: 0,
      formData: {
        headerType: 2,
        header: "",
        header_person: "",
        header_company: "",
        receiverTelephone: "",
        dutyParagraph: "",
        receiverEmail: "",
        saleOrderId: "",
        ticketAmount: 0,
        ticketMark: 1,
        ticketState: 0,
        imgUrls: "",
        pdfUrl: "",
        invoiceRemark: 0
      },
      orderRemarkFlag: 0,
      memberRemarkFlag: 0,
      detailData: {},
      headerTypeList: [{
        text: "个人",
        value: 2
      }, {
        text: "企业",
        value: 1
      }],
      headerOptions: []
    });
    e.onLoad((function(a) {
      n.formData.saleOrderId = a.saleOrderId || "", n.formData.ticketAmount = a.payTotalAmount ? JSON.parse(a.payTotalAmount) : 0, o(a.saleOrderNo), d(), m()
    }));
    var o = function(e) {
        i.apiQueryOneByParams({
          saleOrderNo: e
        }).then((function(e) {
          if (e.data) {
            if (n.changeBillPageFlag = 2, n.detailData = a({}, e.data), null != n.detailData.invoiceRemark && "" != n.detailData.invoiceRemark && null != n.detailData.invoiceRemark) {
              var t = n.detailData.invoiceRemark.split(" ");
              1 == t.length && (n.detailData.remark01 = t[0]), 2 == t.length && (n.detailData.remark01 = t[0], n.detailData.remark02 = t[1])
            }
          } else n.changeBillPageFlag = 1
        }))
      },
      d = function() {
        i.apiDefaultHeader().then((function(a) {
          a.data && (n.formData.header = a.data.header, n.formData.headerType = a.data.headerType, n.formData.dutyParagraph = a.data.dutyParagraph, n.formData.receiverEmail = a.data.receiverEmail, n.formData.receiverTelephone = a.data.receiverTelephone, n.formData.invoiceRemark = a.data.invoiceRemark, n.orderRemarkFlag = 0, n.memberRemarkFlag = 0, 9 == a.data.invoiceRemark ? (n.orderRemarkFlag = 1, n.memberRemarkFlag = 1) : 1 == a.data.invoiceRemark ? n.orderRemarkFlag = 1 : 2 == a.data.invoiceRemark && (n.memberRemarkFlag = 1), 2 == a.data.headerType ? n.formData.header_person = a.data.header : 1 == a.data.headerType && (n.formData.header_company = a.data.header), m())
        }))
      },
      m = function() {
        n.isDisabled = !0, (n.formData.header_person && n.formData.receiverEmail && 2 == n.formData.headerType || n.formData.header_company && n.formData.receiverEmail && n.formData.dutyParagraph && 1 == n.formData.headerType) && (n.isDisabled = !1)
      },
      c = function(a) {
        n.headerOptions = [], null != a && null != a && "" != a && i.apiSearchHeader(a).then((function(a) {
          if (a.data)
            for (var e = 0; e < a.data.length; e++) {
              var t = {
                header: "",
                dutyParagraph: ""
              };
              t.header = a.data[e].header, t.dutyParagraph = a.data[e].dutyParagraph, n.headerOptions.push(t)
            }
        }))
      };
    return a(a({}, e.toRefs(n)), {}, {
      handleFill: m,
      handleSubmit: function() {
        l.debounce((function() {
          (function() {
            if (1 == n.formData.headerType) {
              var a = n.formData.header_company.trim();
              if (!a) return r.uniUtil.showToast("请填写发票抬头"), !1;
              if (a.length < 2) return r.uniUtil.showToast("发票抬头过短，请重新输入"), !1;
              if (a.length > 50) return r.uniUtil.showToast("发票抬头过长，请重新输入"), !1;
              if (!n.formData.dutyParagraph) return r.uniUtil.showToast("单位税号必填"), !1;
              if (n.formData.dutyParagraph.length < 10) return r.uniUtil.showToast("单位税号为10到20位数字字母组合，请检查"), !1;
              n.formData.header = a
            } else if (2 == n.formData.headerType) {
              var e = n.formData.header_person.trim();
              if (!e) return r.uniUtil.showToast("请填写发票抬头"), !1;
              if (e.length < 2) return r.uniUtil.showToast("发票抬头过短，请重新输入"), !1;
              n.formData.header = e
            }
            return "" == n.formData.receiverTelephone || null == n.formData.receiverTelephone || null == n.formData.receiverTelephone || t.validateChinaPhone(n.formData.receiverTelephone) ? n.formData.receiverEmail ? !!t.validateEmail(n.formData.receiverEmail) || (r.uniUtil.showToast("请输入正确的电子邮箱"), !1) : (r.uniUtil.showToast("请输入电子邮箱"), !1) : (r.uniUtil.showToast("请输入正确的手机号码"), !1)
          })() && (1 == n.memberRemarkFlag && 1 == n.orderRemarkFlag ? n.formData.invoiceRemark = 9 : 0 == n.memberRemarkFlag && 1 == n.orderRemarkFlag ? n.formData.invoiceRemark = 1 : 1 == n.memberRemarkFlag && 0 == n.orderRemarkFlag ? n.formData.invoiceRemark = 2 : n.formData.invoiceRemark = 0, i.apiCreateTicket(n.formData).then((function(a) {
            200 == a.code ? (r.uniUtil.showToast("操作成功", {
              icon: "success"
            }), n.isDisabled = !0, setTimeout((function() {
              e.index.navigateBack()
            }), 2e3)) : n.isDisabled = !1
          })))
        }))
      },
      changeHeaderType: function(a) {
        var e = a.detail;
        n.formData.headerType = e.value, m()
      },
      handlePackUpOrOpen: function() {
        l.debounce((function() {
          n.isShowMoreFlag = !n.isShowMoreFlag, n.changeShowMoreFlag = !n.changeShowMoreFlag
        }))
      },
      changeMemberRemark: function() {
        n.memberRemarkFlag = 0 == n.memberRemarkFlag ? 1 : 0
      },
      changeOrderRemark: function() {
        n.orderRemarkFlag = 0 == n.orderRemarkFlag ? 1 : 0
      },
      getDefaultHeader: d,
      getSearchHeader: c,
      headerOnInput: function(a) {
        null != a && "" != a && null != a ? c(a) : n.headerOptions = []
      },
      personHandleFill: function() {
        n.formData.header = n.formData.header_person, m()
      },
      companyHandleFill: function(a) {
        null != a && "" != a && null != a && (n.formData.header = n.formData.header_company, n.formData.dutyParagraph = a), m()
      },
      handleCopy: function(a) {
        r.uniUtil.copyText(a)
      },
      toInvoiceImg: function() {
        null != n.detailData.pdfUrl && null != n.detailData.pdfUrl && "" != n.detailData.pdfUrl ? wx.downloadFile({
          url: n.detailData.pdfUrl,
          success: function(a) {
            var e = a.tempFilePath;
            wx.openDocument({
              filePath: e,
              showMenu: !0,
              success: function(a) {
                console.log("打开文档成功")
              }
            })
          },
          fail: function(a) {
            r.uniUtil.copyText(n.detailData.pdfUrl), wx.showToast({
              title: "下载失败，已复制，请到浏览器下载",
              icon: "none"
            })
          }
        }) : r.uniUtil.showToast("未找到可下载的发票PDF文件。")
      }
    })
  }
};
Array || (e.resolveComponent("uni-data-checkbox") + e.resolveComponent("uni-combox"))();
Math || (function() {
  return "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js"
} + function() {
  return "../../uni_modules/uni-combox/components/uni-combox/uni-combox.js"
})();
var o = e._export_sfc(n, [
  ["render", function(a, t, r, i, l, n) {
    return e.e({
      a: 1 == a.changeBillPageFlag
    }, 1 == a.changeBillPageFlag ? e.e({
      b: a.$static + "/static/image/mine/billOne@2x.png",
      c: e.t(a.formData.ticketAmount),
      d: e.o(i.changeHeaderType),
      e: e.o((function(e) {
        return a.formData.headerType = e
      })),
      f: e.p({
        selectedColor: "#FF7272",
        localdata: a.headerTypeList,
        modelValue: a.formData.headerType
      }),
      g: 2 === a.formData.headerType
    }, 2 === a.formData.headerType ? {
      h: e.o([function(e) {
        return a.formData.header_person = e.detail.value
      }, function() {
        return i.personHandleFill && i.personHandleFill.apply(i, arguments)
      }]),
      i: a.formData.header_person
    } : {}, {
      j: 1 === a.formData.headerType
    }, 1 === a.formData.headerType ? {
      k: e.o(i.headerOnInput),
      l: e.o(i.companyHandleFill),
      m: e.o((function(e) {
        return a.formData.header_company = e
      })),
      n: e.p({
        placeholder: "请填写抬头名称",
        candidates: a.headerOptions,
        labelKey: "header",
        valueKey: "dutyParagraph",
        emptyTips: "",
        modelValue: a.formData.header_company
      })
    } : {}, {
      o: 1 === a.formData.headerType
    }, 1 === a.formData.headerType ? {
      p: e.o([function(e) {
        return a.formData.dutyParagraph = e.detail.value
      }, function() {
        return i.handleFill && i.handleFill.apply(i, arguments)
      }]),
      q: a.formData.dutyParagraph
    } : {}, {
      r: 2 === a.formData.headerType
    }, 2 === a.formData.headerType ? {
      s: e.o([function(e) {
        return a.formData.receiverTelephone = e.detail.value
      }, function() {
        return i.handleFill && i.handleFill.apply(i, arguments)
      }]),
      t: a.formData.receiverTelephone
    } : {}, {
      v: e.o([function(e) {
        return a.formData.receiverEmail = e.detail.value
      }, function() {
        return i.handleFill && i.handleFill.apply(i, arguments)
      }]),
      w: a.formData.receiverEmail,
      x: e.n(0 == a.orderRemarkFlag ? "remark-no-selected" : "remark-selected"),
      y: e.o((function() {
        return i.changeOrderRemark && i.changeOrderRemark.apply(i, arguments)
      })),
      z: e.n(0 == a.memberRemarkFlag ? "remark-no-selected" : "remark-selected"),
      A: e.o((function() {
        return i.changeMemberRemark && i.changeMemberRemark.apply(i, arguments)
      })),
      B: a.isDisabled ? "#ffc6c6" : "#FF7272",
      C: a.isDisabled,
      D: e.o((function() {
        return i.handleSubmit && i.handleSubmit.apply(i, arguments)
      }))
    }) : {}, {
      E: 2 == a.changeBillPageFlag
    }, 2 == a.changeBillPageFlag ? e.e({
      F: 0 == a.detailData.ticketState || 2 == a.detailData.ticketState || 5 == a.detailData.ticketState
    }, 0 == a.detailData.ticketState || 2 == a.detailData.ticketState || 5 == a.detailData.ticketState ? {
      G: a.$static + "/static/image/mine/billTwo@2x.png"
    } : {}, {
      H: 1 == a.detailData.ticketState
    }, 1 == a.detailData.ticketState ? {
      I: a.$static + "/static/image/mine/billThree@2x.png"
    } : {}, {
      J: 3 == a.detailData.ticketState || 6 == a.detailData.ticketState
    }, 3 == a.detailData.ticketState || 6 == a.detailData.ticketState ? {
      K: a.$static + "/static/image/mine/billTwo@2x.png"
    } : {}, {
      L: 4 == a.detailData.ticketState
    }, 4 == a.detailData.ticketState ? {
      M: a.$static + "/static/image/mine/billFour@2x.png"
    } : {}, {
      N: e.t(a.detailData.ticketAmount),
      O: 1 == a.detailData.ticketState
    }, (a.detailData.ticketState, {}), {
      P: e.t(1 == a.detailData.headerType ? "企业" : "个人"),
      Q: e.t(a.detailData.header),
      R: a.detailData.dutyParagraph
    }, a.detailData.dutyParagraph ? {
      S: e.t(a.detailData.dutyParagraph)
    } : {}, {
      T: a.detailData.receiverTelephone && 2 === a.detailData.headerType
    }, a.detailData.receiverTelephone && 2 === a.detailData.headerType ? {
      U: e.t(a.detailData.receiverTelephone)
    } : {}, {
      V: a.detailData.receiverEmail
    }, a.detailData.receiverEmail ? {
      W: e.t(a.detailData.receiverEmail)
    } : {}, {
      X: a.detailData.createTime
    }, a.detailData.createTime ? {
      Y: e.t(a.detailData.createTime)
    } : {}, {
      Z: a.detailData.invoiceTime && 1 == a.detailData.ticketState
    }, a.detailData.invoiceTime && 1 == a.detailData.ticketState ? {
      aa: e.t(a.detailData.invoiceTime)
    } : {}, {
      ab: a.detailData.invoiceRemark && (0 == a.detailData.ticketState || 1 == a.detailData.ticketState || 2 == a.detailData.ticketState)
    }, !a.detailData.invoiceRemark || 0 != a.detailData.ticketState && 1 != a.detailData.ticketState && 2 != a.detailData.ticketState ? {} : e.e({
      ac: a.detailData.remark01
    }, a.detailData.remark01 ? {
      ad: e.t(a.detailData.remark01)
    } : {}, {
      ae: a.detailData.remark02
    }, a.detailData.remark02 ? {
      af: e.t(a.detailData.remark02)
    } : {}), {
      ag: a.detailData.imgUrl && 1 == a.detailData.ticketState
    }, a.detailData.imgUrl && 1 == a.detailData.ticketState ? e.e({
      ah: e.o((function() {
        return i.toInvoiceImg && i.toInvoiceImg.apply(i, arguments)
      })),
      ai: a.detailData.imgUrl,
      aj: a.detailData.pdfUrl
    }, a.detailData.pdfUrl ? {
      ak: e.o((function(e) {
        return i.handleCopy(a.detailData.pdfUrl)
      }))
    } : {}) : {}) : {})
  }],
  ["__scopeId", "data-v-4f96c446"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/bill/notInvoiced.vue"]
]);
wx.createPage(o);