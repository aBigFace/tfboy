var e = require("../../../@babel/runtime/helpers/objectSpread2"),
  r = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  a = require("../../../utils/uniUtil.js"),
  o = require("../../../common/app-theme.js"),
  i = require("../../../common/common.js"),
  u = require("../../../apis/order.js"),
  d = require("../../../apis/user.js"),
  c = require("../../../utils/validate.js"),
  s = require("../../../utils/util.js");
require("../../../apis/shopCart.js"), require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../utils/commonEnum.js");
var l = n.defineComponent({
  name: "afterSaletype",
  components: {
    UniEasyinput: function() {
      return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
    },
    refundReason: function() {
      return "../components/refundReason.js"
    }
  },
  setup: function() {
    var l = n.ref(null),
      f = n.getCurrentInstance().proxy,
      p = n.reactive({
        actualPrice: "",
        mostPrice: 0,
        additionalRemarks: "",
        multiShow: !0,
        remnant: 0,
        uploadPic: [],
        videoList: [],
        goodsInfo: [],
        canUploadVideo: !0,
        canNotUploadVideoTxt: "",
        myEmail: "",
        refundTitle: ["申请退款", "申请退货退款", "申请换货", "申请补寄"],
        refundInfo: {
          reasonlabel: "",
          type: "",
          refundAllNum: "",
          payMethod: 0,
          saleOrderId: ""
        },
        afterSaleAddress: {
          receiver: "",
          receiverAddress: "",
          receiverCity: "",
          receiverCounty: "",
          receiverPhone: "",
          receiverProvince: "",
          receiverStreet: "",
          receiverDetailAddress: ""
        }
      });
    n.onShow((function() {
      var e = getApp();
      if (console.log(e.globalData.tempData), e.globalData.tempData) {
        var r = e.globalData.tempData.data,
          t = r.name,
          n = r.phone,
          a = r.province,
          o = r.city,
          i = r.county,
          u = r.detailAddress;
        p.afterSaleAddress.receiver = t, p.afterSaleAddress.receiverPhone = n, p.afterSaleAddress.receiverProvince = a, p.afterSaleAddress.receiverCity = o, p.afterSaleAddress.receiverCounty = i, p.afterSaleAddress.receiverAddress = u, p.afterSaleAddress.receiverDetailAddress = a + o + i + u
      }
    })), n.onLoad((function(e) {
      if (console.log(decodeURI(e.type)), e.type && (p.refundInfo.reasonlabel = decodeURI(e.reasonlabel), p.refundInfo.type = decodeURI(e.type), p.refundInfo.payMethod = Number(e.payMethod), p.refundInfo.saleOrderId = e.id, h(), n.index.setNavigationBarTitle({
          title: p.refundTitle[Number(e.type) - 1]
        }), "3" == e.type || "4" == e.type)) {
        var r = getApp().globalData.afterSaleAddress,
          t = r.receiver,
          a = r.receiverAddress,
          o = r.receiverCity,
          i = r.receiverCounty,
          u = r.receiverPhone,
          d = r.receiverProvince,
          c = r.receiverStreet,
          s = r.receiverDetailAddress;
        p.afterSaleAddress = {
          receiver: t,
          receiverAddress: a,
          receiverCity: o,
          receiverCounty: i,
          receiverPhone: u,
          receiverProvince: d,
          receiverStreet: c,
          receiverDetailAddress: s
        }
      }
      S(), y()
    }));
    var m = function(e) {
        l.value.reasonList = [], "1" != e && "2" != e || I("afterReasonReturn", Number(e)), "3" != e && "4" != e || I("afterReasonChange", Number(e))
      },
      h = function() {
        p.goodsInfo = n.index.getStorageSync("afterSaleGoods"), p.goodsInfo.forEach((function(e) {
          e.actualNum = e.num, p.refundInfo.refundAllNum += e.num
        }))
      },
      y = function() {
        for (var e = [], r = 0; r < p.goodsInfo.length; r++) e.push(p.goodsInfo[r].id);
        u.getAfterSalePrice({
          saleOrderId: p.refundInfo.saleOrderId,
          saleOrderProductIds: e
        }).then((function(e) {
          var r = 0,
            t = p.refundInfo.payMethod;
          1 == t || 2 == t ? (r = 100 * e.data.surplusAmount, r += 100 * e.data.surplusWaybillFee, r /= 100) : 8 == t ? (r = 100 * e.data.surplusBalance, r += 100 * e.data.surplusWaybillFee, r /= 100) : 4 == t && (r = e.data.surplusPoint), p.mostPrice = r
        }))
      },
      v = function() {
        var e = t(r().mark((function e() {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                n.index.chooseImage({
                  count: 1,
                  sizeType: ["compressed"],
                  sourceType: ["album", "camera"],
                  success: function(e) {
                    console.log(e), 3 != p.uploadPic.length ? d.apiUploadFile({
                      filePath: e.tempFilePaths[0]
                    }).then((function(e) {
                      p.uploadPic.push({
                        type: "image",
                        src: e.data
                      })
                    })) : a.uniUtil.showToast("最多可上传3张照片")
                  }
                });
              case 1:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      g = function() {
        var e = t(r().mark((function e() {
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                n.index.chooseVideo({
                  sourceType: ["camera", "album"],
                  maxDuration: 10,
                  success: function(e) {
                    console.log(e), 1 != p.videoList.length ? d.apiUploadFile({
                      filePath: e.tempFilePath
                    }).then((function(e) {
                      p.videoList.push({
                        type: "video",
                        src: e.data
                      })
                    })) : a.uniUtil.showToast("最多可上传一个视频")
                  }
                });
              case 1:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      I = function(e, r) {
        u.apiDictAfterReasonList({
          dictCode: e
        }).then((function(e) {
          var t = e.data;
          if (1 == r || 2 == r) l.value.reasonList = t;
          else if (3 == r)
            for (var n = 0; n < t.length; n++) "换货原因" == t[n].dictDesc && l.value.reasonList.push(t[n]);
          else if (4 == r)
            for (var a = 0; a < t.length; a++) "补寄原因" == t[a].dictDesc && l.value.reasonList.push(t[a])
        }))
      },
      S = function() {
        var e = t(r().mark((function e() {
          var t;
          return r().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.next = 2, u.apiGetConfig();
              case 2:
                t = e.sent, console.log(t), 0 == t.data.afterOrderVideoState && (p.canUploadVideo = !1, p.canNotUploadVideoTxt = t.data.afterOrderVideoMessage);
              case 5:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      b = function() {
        var o = t(r().mark((function t() {
          var o, i, d, s, l, m, h, y, v, g, I, S, b, P, A, x, T, w, U, N;
          return r().wrap((function(r) {
            for (;;) switch (r.prev = r.next) {
              case 0:
                if (o = p.additionalRemarks, i = p.actualPrice, o) {
                  r.next = 4;
                  break
                }
                return n.index.showToast({
                  title: "补充说明不能为空~",
                  icon: "none",
                  duration: 1e3
                }), r.abrupt("return");
              case 4:
                if (d = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, s = Number(p.refundInfo.type), l = p.refundInfo.payMethod, m = 0, h = 0, y = 0, !(s <= 2)) {
                  r.next = 20;
                  break
                }
                if (d.test(i)) {
                  r.next = 14;
                  break
                }
                return n.index.showToast({
                  title: "请输入正确的金额~",
                  icon: "none",
                  duration: 1e3
                }), r.abrupt("return");
              case 14:
                if (!(Number(i) <= 0)) {
                  r.next = 17;
                  break
                }
                return n.index.showToast({
                  title: "请输入正确的金额~",
                  icon: "none",
                  duration: 1e3
                }), r.abrupt("return");
              case 17:
                1 == l || 2 == l ? m = Number(i) : 4 == l ? h = Number(i) : 8 == l && (y = Number(i)), r.next = 21;
                break;
              case 20:
                1 == l || 2 == l ? m = 0 : 4 == l ? h = 0 : 8 == l && (y = 0);
              case 21:
                if (v = p.afterSaleAddress, g = v.receiver, I = v.receiverAddress, S = v.receiverCity, b = v.receiverCounty, P = v.receiverPhone, A = v.receiverProvince, x = v.receiverStreet, console.log(p.afterSaleAddress), T = {
                    additionalRemarks: o,
                    afterOrderBalance: y,
                    afterOrderIntegral: h,
                    afterOrderPrice: m,
                    afterOrderType: p.refundInfo.type,
                    afterReason: p.refundInfo.reasonlabel,
                    pictureUrl: [],
                    receiver: g,
                    receiverAddress: I,
                    receiverCity: S,
                    receiverCounty: b,
                    receiverPhone: P,
                    receiverProvince: A,
                    receiverStreet: x,
                    saleAfterOrderProductDTOS: [],
                    saleOrderId: p.refundInfo.saleOrderId,
                    videoUrl: "",
                    videoSenderEmail: p.myEmail
                  }, p.uploadPic.length) {
                  r.next = 27;
                  break
                }
                return a.uniUtil.showToast("请上传图片"), r.abrupt("return");
              case 27:
                if (2 != s && 3 != s && 4 != s) {
                  r.next = 34;
                  break
                }
                if (p.videoList.length || 1 != p.canUploadVideo) {
                  r.next = 31;
                  break
                }
                return a.uniUtil.showToast("请上传视频"), r.abrupt("return");
              case 31:
                if (0 != p.canUploadVideo || "" != p.myEmail) {
                  r.next = 34;
                  break
                }
                return a.uniUtil.showToast("请输入发送视频的邮箱"), r.abrupt("return");
              case 34:
                if (0 != p.canUploadVideo || c.validateEmail(p.myEmail)) {
                  r.next = 37;
                  break
                }
                return a.uniUtil.showToast("请输入正确的邮箱格式"), r.abrupt("return");
              case 37:
                return p.uploadPic.forEach((function(e, r) {
                  T.pictureUrl[r] = e.src
                })), T.videoUrl = p.videoList.length ? p.videoList[0].src : "", p.videoList.length && T.pictureUrl.unshift(f.$videoBg), p.goodsInfo.forEach((function(r) {
                  var t = r.id,
                    n = -1;
                  "1" == p.refundInfo.type ? n = 2 : "2" == p.refundInfo.type || "3" == p.refundInfo.type ? n = 0 : "4" == p.refundInfo.type && (n = 1), T.saleAfterOrderProductDTOS.push(e(e({
                    orderProductId: t,
                    orderProductType: n
                  }, r), {}, {
                    num: r.actualNum
                  }))
                })), r.next = 43, u.apiApplyAfter(JSON.stringify(T));
              case 43:
                return w = r.sent, r.next = 46, u.apiGetTmp([3]);
              case 46:
                U = r.sent, N = U.data.map((function(e) {
                  return e.priTmplId
                })), 200 === w.code && a.uniUtil.subscribeMessage({
                  tmplIds: N
                }).then((function() {
                  n.index.redirectTo({
                    url: "/pages/order/afterSale/afterSaleSuccess?afterOrderNo=".concat(w.data)
                  })
                })).catch((function(e) {
                  n.index.redirectTo({
                    url: "/pages/order/afterSale/afterSaleSuccess?afterOrderNo=".concat(w.data)
                  })
                }));
              case 49:
              case "end":
                return r.stop()
            }
          }), t)
        })));
        return function() {
          return o.apply(this, arguments)
        }
      }(),
      P = function(e, r) {
        var t = 0,
          n = e.toString(),
          a = r.toString();
        try {
          t += n.split(".")[1].length
        } catch (e) {}
        try {
          t += a.split(".")[1].length
        } catch (e) {}
        return Number(n.replace(".", "")) * Number(a.replace(".", "")) / Math.pow(10, t)
      };
    return e(e({
      popupRef: l,
      reasonList: m,
      handSelect: function() {
        m(p.refundInfo.type), l.value.openReason()
      },
      handleClose: function() {
        l.value.close()
      }
    }, n.toRefs(p)), {}, {
      getAfterSaleGoodsList: h,
      reasonData: function(e) {
        p.refundInfo.reasonlabel = e.dictValue
      },
      AppTheme: o.AppTheme,
      handleAdd: function(e, r) {
        i.debounce((function() {
          e == p.goodsInfo[r].actualNum ? n.index.showToast({
            title: "超出最大数量~",
            icon: "none",
            duration: 1e3
          }) : p.goodsInfo[r].actualNum++
        }))
      },
      handleSubtract: function(e, r) {
        i.debounce((function() {
          e > 1 ? p.goodsInfo[r].actualNum-- : n.index.showToast({
            title: "不能再减少了哦~",
            icon: "none",
            duration: 1e3
          })
        }))
      },
      handleUpdateNumber: function() {
        p.actualPrice = 0, p.goodsInfo.forEach((function(e) {
          p.actualPrice = p.actualPrice + e.actualAmount * e.actualNum
        })), console.log(P(p.actualPrice, 2))
      },
      goGoodsDetail: function(e) {
        n.index.navigateTo({
          url: "/pages/product/detail?spuCode=".concat(e)
        })
      },
      descInput: function() {
        var e = p.additionalRemarks.length;
        p.remnant = 400 - e
      },
      ifShowArea: function(e) {
        var r = "yes" == e.currentTarget.dataset.show;
        p.multiShow = r
      },
      uploadImg: v,
      uploadVideo: g,
      deleteImage: function(e) {
        p.uploadPic.splice(e, 1)
      },
      deleteVideo: function(e) {
        p.videoList.splice(e, 1)
      },
      playVideo: function(e) {
        n.index.navigateTo({
          url: "/pages/videoPlay/videoPlay?src=".concat(e)
        })
      },
      changeAddress: function() {
        n.index.navigateTo({
          url: "/pages/mine/address/address-list?fromPage=afterSale"
        })
      },
      getRefundReason: I,
      jumpStatement: function() {
        s.openArguments("tuihuanhuo.png")
      },
      handleSubmit: b,
      regYuanToFen: P
    })
  }
});
Array || (n.resolveComponent("uni-icons") + n.resolveComponent("uni-easyinput") + n.resolveComponent("refundReason"))();
Math || (function() {
  return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
} + function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
})();
var f = n._export_sfc(l, [
  ["render", function(e, r, t, a, o, i) {
    return n.e({
      a: n.f(e.goodsInfo, (function(r, t, a) {
        return n.e({
          a: r.imageUrl,
          b: n.t(r.productName),
          c: n.t(r.num),
          d: n.t(r.skuName),
          e: n.t(r.originalPrice),
          f: r.num > 1 && "1" != e.refundInfo.type ? "420rpx" : "560upx",
          g: r.num > 1 && "1" != e.refundInfo.type
        }, r.num > 1 && "1" != e.refundInfo.type ? {
          h: n.o((function(n) {
            return e.handleSubtract(r.actualNum, t)
          })),
          i: 1 == r.num ? 1 : "",
          j: n.t(r.actualNum),
          k: n.o((function() {
            return e.handleUpdateNumber(r)
          })),
          l: r.actualNum == r.num ? 1 : "",
          m: n.o((function(n) {
            return e.handleAdd(r.num, t)
          }))
        } : {}, {
          n: t
        })
      })),
      b: "1" == e.refundInfo.type || "2" == e.refundInfo.type
    }, ("1" == e.refundInfo.type || e.refundInfo.type, {}), {
      c: "3" == e.refundInfo.type
    }, (e.refundInfo.type, {}), {
      d: "4" == e.refundInfo.type
    }, (e.refundInfo.type, {}), {
      e: n.t(e.refundInfo.reasonlabel),
      f: n.p({
        type: "forward",
        size: 16,
        color: e.AppTheme.textGray
      }),
      g: n.o((function() {
        return e.handSelect && e.handSelect.apply(e, arguments)
      })),
      h: "1" == e.refundInfo.type || "2" == e.refundInfo.type
    }, "1" == e.refundInfo.type || "2" == e.refundInfo.type ? n.e({
      i: n.t(4 == e.refundInfo.payMethod ? "退款积分" : "退款金额"),
      j: 1 == e.refundInfo.payMethod || 2 == e.refundInfo.payMethod
    }, (1 == e.refundInfo.payMethod || e.refundInfo.payMethod, {}), {
      k: 1 == e.refundInfo.payMethod || 2 == e.refundInfo.payMethod
    }, 1 == e.refundInfo.payMethod || 2 == e.refundInfo.payMethod ? {
      l: "可修改，最多可退¥" + e.mostPrice + "元",
      m: e.actualPrice,
      n: n.o((function(r) {
        return e.actualPrice = r.detail.value
      }))
    } : {}, {
      o: 8 == e.refundInfo.payMethod
    }, 8 == e.refundInfo.payMethod ? {
      p: "可修改，最多可退" + e.mostPrice + "小葵花",
      q: e.actualPrice,
      r: n.o((function(r) {
        return e.actualPrice = r.detail.value
      }))
    } : {}, {
      s: 4 == e.refundInfo.payMethod
    }, 4 == e.refundInfo.payMethod ? {
      t: "可修改，最多可退" + e.mostPrice + "积分",
      v: e.actualPrice,
      w: n.o((function(r) {
        return e.actualPrice = r.detail.value
      }))
    } : {}) : {}, {
      x: !e.multiShow
    }, e.multiShow ? {} : {
      y: n.o([function(r) {
        return e.additionalRemarks = r.detail.value
      }, function() {
        return e.descInput && e.descInput.apply(e, arguments)
      }]),
      z: n.o((function() {
        return e.ifShowArea && e.ifShowArea.apply(e, arguments)
      })),
      A: e.additionalRemarks
    }, {
      B: e.multiShow
    }, e.multiShow ? {
      C: n.t(e.additionalRemarks),
      D: n.t(e.multiShow && !e.additionalRemarks.length ? "补充您的描述，便于更好通过申诉" : ""),
      E: n.o((function() {
        return e.ifShowArea && e.ifShowArea.apply(e, arguments)
      }))
    } : {}, {
      F: n.t(e.remnant),
      G: "1" != e.refundInfo.type
    }, (e.refundInfo.type, {}), {
      H: "1" != e.refundInfo.type && 0 == e.canUploadVideo
    }, "1" != e.refundInfo.type && 0 == e.canUploadVideo ? {
      I: n.t(e.canNotUploadVideoTxt),
      J: n.o((function(r) {
        return e.myEmail = r
      })),
      K: n.p({
        type: "text",
        placeholder: "请输入发送视频的邮箱",
        modelValue: e.myEmail
      })
    } : {}, {
      L: "1" != e.refundInfo.type && 1 == e.canUploadVideo
    }, "1" != e.refundInfo.type && 1 == e.canUploadVideo ? n.e({
      M: e.videoList.length
    }, e.videoList.length ? {
      N: n.o((function(r) {
        return e.playVideo(e.videoList[0].src)
      })),
      O: e.$static + "/static/image/mine/icon_play@2x.png",
      P: n.o((function(r) {
        return e.deleteVideo(0)
      })),
      Q: e.$static + "/static/image/afterSale/delete.png"
    } : {}, {
      R: e.videoList.length < 1
    }, e.videoList.length < 1 ? {
      S: e.$static + "/static/image/afterSale/upload.png",
      T: n.o((function(r) {
        return e.uploadVideo()
      }))
    } : {}) : {}, {
      U: n.f(e.uploadPic, (function(r, t, a) {
        return n.e({
          a: "image" == r.type
        }, "image" == r.type ? {
          b: r.src,
          c: n.o((function(r) {
            return e.deleteImage(t)
          })),
          d: e.$static + "/static/image/afterSale/delete.png"
        } : {}, {
          e: t
        })
      })),
      V: e.uploadPic.length < 4
    }, e.uploadPic.length < 4 ? {
      W: e.$static + "/static/image/afterSale/upload.png",
      X: n.o((function(r) {
        return e.uploadImg()
      }))
    } : {}, {
      Y: "3" == e.refundInfo.type || "4" == e.refundInfo.type
    }, "3" == e.refundInfo.type || "4" == e.refundInfo.type ? {
      Z: e.$static + "/static/image/afterSale/change.png",
      aa: n.o((function() {
        return e.changeAddress && e.changeAddress.apply(e, arguments)
      })),
      ab: n.t(e.afterSaleAddress.receiver),
      ac: n.t(e.afterSaleAddress.receiverPhone),
      ad: n.t(e.afterSaleAddress.receiverDetailAddress)
    } : {}, {
      ae: n.o((function() {
        return e.jumpStatement && e.jumpStatement.apply(e, arguments)
      })),
      af: n.o((function() {
        return e.handleSubmit && e.handleSubmit.apply(e, arguments)
      })),
      ag: n.sr("popupRef", "47402a21-2"),
      ah: n.o(e.reasonData),
      ai: n.p({
        title: "选择原因"
      })
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/pages/order/afterSale/applyAfterSale.vue"]
]);
wx.createPage(f);