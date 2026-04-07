var e = require("../../../@babel/runtime/helpers/defineProperty"),
  r = require("../../../@babel/runtime/helpers/objectSpread2"),
  a = require("../../../@babel/runtime/helpers/slicedToArray"),
  t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
  o = require("../../../@babel/runtime/helpers/asyncToGenerator"),
  n = require("../../../common/vendor.js"),
  i = require("../../../apis/address.js"),
  s = require("../../../common/app-theme.js"),
  d = require("../../../common/common.js"),
  u = require("../../../utils/uniUtil.js"),
  l = require("../../../utils/util.js");
require("../../../utils/http.js"), require("../../../config/apiPrefix.js"), require("../../../utils/common.js"), require("../../../apis/shopCart.js"), require("../../../utils/commonEnum.js");
var c = n.defineComponent({
  name: "userAddress",
  setup: function() {
    var e = 1,
      c = 2,
      p = n.reactive({
        range: [{
          value: "86",
          text: "大陆＋86"
        }, {
          value: "852",
          text: "香港+852"
        }, {
          value: "853",
          text: "澳门+853"
        }, {
          value: "886",
          text: "台湾+886"
        }],
        fromPage: "",
        addrType: 0,
        smartAddress: "",
        saveToBook: [],
        isDefaultAddress: [0],
        name: "",
        form: {
          bookType: e,
          name: "",
          phone: "",
          province: "",
          city: "",
          county: "",
          areaId: "",
          detailAddress: "",
          areaCode: "86"
        },
        regionList: [],
        formRules: {},
        showSaveToBook: !1,
        saveToBookCheckbox: [{
          value: 1,
          text: "保存到地址簿"
        }],
        defaultSendCheckbox: [{
          value: 1,
          text: "设为默认收货地址"
        }],
        placeholderStyle: "color :".concat(s.AppTheme.textGray, ";font-size:28rpx")
      });
    n.onLoad(function() {
      var e = o(t().mark((function e(r) {
        var a, o, s, d, u, m, f;
        return t().wrap((function(e) {
          for (;;) switch (e.prev = e.next) {
            case 0:
              return console.log(r), p.fromPage = r.fromPage || "", r.addrType && (p.addrType = Number(r.addrType)), "send" === p.fromPage && p.addrType === c && (p.saveToBook = n.index.getStorageSync("saveToBook") || [], p.showSaveToBook = !0), a = {
                bookType: p.addrType
              }, r.params && ((o = JSON.parse(r.params)).bookType = p.addrType || o.bookType, Object.assign(a, o), p.isDefaultAddress = [a.bookDefaultStatus]), Object.assign(p.form, a), e.next = 9, i.apiGetRegionVersion();
            case 9:
              if (s = e.sent, d = n.index.getStorageSync("gisVersion"), u = [], d !== s.data) {
                e.next = 18;
                break
              }
              m = n.index.getStorageSync("cityAreaList"), u = JSON.parse(m), p.regionList = JSON.parse(m), e.next = 25;
              break;
            case 18:
              return n.index.setStorageSync("gisVersion", s.data), e.next = 21, i.apiGetCityAreaList();
            case 21:
              f = e.sent, p.regionList = f.data, u = u.data, n.index.setStorageSync("cityAreaList", JSON.stringify(f.data));
            case 25:
              a.id && setTimeout((function() {
                p.form.areaId = l.getTreeValueByPath(u, [a.province, a.city, a.county], "zName", "id")
              }), 500);
            case 26:
            case "end":
              return e.stop()
          }
        }), e)
      })));
      return function(r) {
        return e.apply(this, arguments)
      }
    }());
    var m = function() {
        var e = o(t().mark((function e() {
          var r, a;
          return t().wrap((function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (!p.showSaveToBook || -1 !== p.saveToBook.indexOf(1)) {
                  e.next = 4;
                  break
                }
                return f(), n.index.navigateBack(), e.abrupt("return");
              case 4:
                r = p.form.id ? i.apiEditAddress : i.apiAddAddress, (a = d.convertAddressToBookAddress(p.form)).bookDefaultStatus = p.isDefaultAddress.indexOf(1) > -1 ? 1 : 0, a.bookPhone = "86" !== a.areaCode ? "".concat(a.areaCode).concat(a.bookPhone) : a.bookPhone, r(a).then((function() {
                  n.index.navigateBack({
                    delta: 1
                  }), u.uniUtil.showToast("操作成功", {
                    icon: "success"
                  })
                }));
              case 9:
              case "end":
                return e.stop()
            }
          }), e)
        })));
        return function() {
          return e.apply(this, arguments)
        }
      }(),
      f = function() {
        getApp().globalData.tempData = {
          type: p.addrType === e ? "sender" : "receiver",
          data: p.form
        }
      },
      h = n.computed$1((function() {
        var e = p.form,
          r = e.name,
          a = e.phone,
          t = (e.city, e.detailAddress);
        return r && a && t
      }));
    return r(r({
      AppTheme: s.AppTheme
    }, n.toRefs(p)), {}, {
      handlePasteSmartAddressData: function() {
        u.uniUtil.pasteText().then((function(e) {
          e ? p.smartAddress = e : u.uniUtil.showToast("暂无粘贴地址信息")
        }))
      },
      handleChangeArea: function(e) {
        if (e.detail.value && e.detail.value.length) {
          var r = a(e.detail.value, 3),
            t = r[0],
            o = r[1],
            n = r[2];
          p.form.province = (null == t ? void 0 : t.text) || "", p.form.city = (null == o ? void 0 : o.text) || "", p.form.county = (null == n ? void 0 : n.text) || ""
        } else p.form.province = "", p.form.city = "", p.form.county = ""
      },
      handleClearAddress: function() {
        p.form.name = "", p.form.phone = "", p.form.province = "", p.form.county = "", p.form.areaId = "", p.form.detailAddress = ""
      },
      handleChangeSaveToBook: function(e) {
        e.detail.value && e.detail.value.length ? n.index.setStorageSync("saveToBook", [1]) : n.index.removeStorageSync("saveToBook")
      },
      handleSubmit: m,
      handleGetLocation: function() {
        n.index.chooseLocation({
          success: function(e) {
            "" === e.address && i.apiGetGisAddress(e).then((function(e) {
              return e.address = e.data
            })), p.smartAddress = e.address, i.apiSmartAddress(p.smartAddress).then((function(e) {
              var r = e.data.address,
                a = {
                  name: r.personName || p.form.name,
                  phone: r.phoneNumber || p.form.phone,
                  province: r.province,
                  city: r.city,
                  county: r.county,
                  areaId: l.getTreeValueByPath(p.regionList, [r.province, r.city, r.county], "zName", "id"),
                  detailAddress: "".concat(r.town || "").concat(r.detailAddress)
                };
              Object.assign(p.form, a)
            }))
          }
        })
      },
      canSubmit: h
    })
  }
});
Array || (n.resolveComponent("uni-easyinput") + n.resolveComponent("uni-forms-item") + n.resolveComponent("uni-data-select") + n.resolveComponent("uni-data-picker") + n.resolveComponent("uni-data-checkbox") + n.resolveComponent("uni-forms"))();
Math || (function() {
  return "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js"
} + function() {
  return "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js"
} + function() {
  return "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js"
} + function() {
  return "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js"
} + function() {
  return "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"
})();
var p = n._export_sfc(c, [
  ["render", function(r, a, t, o, i, s) {
    return {
      a: n.o((function(e) {
        return r.form.name = e
      })),
      b: n.p({
        type: "text",
        placeholder: "请输入姓名",
        inputBorder: !1,
        clearable: !1,
        placeholderStyle: r.placeholderStyle,
        modelValue: r.form.name
      }),
      c: n.p({
        name: "name",
        label: "收件人"
      }),
      d: r.form.name ? 1 : "",
      e: n.o((function(e) {
        return r.form.areaCode = e
      })),
      f: n.p({
        localdata: r.range,
        placeholder: "",
        clear: !1,
        modelValue: r.form.areaCode
      }),
      g: n.o((function(e) {
        return r.form.phone = e
      })),
      h: n.p({
        type: "text",
        placeholder: "请输入手机号码",
        clearable: !1,
        placeholderStyle: r.placeholderStyle,
        inputBorder: !1,
        modelValue: r.form.phone
      }),
      i: n.p({
        name: "areaCode",
        label: "联系电话"
      }),
      j: n.o(r.handleChangeArea),
      k: n.o((function(e) {
        return r.form.areaId = e
      })),
      l: n.p(e(e(e({
        placeholder: "请选择省市区",
        localdata: r.regionList,
        placeholderStyle: "font-size: 28rpx",
        clearable: !1,
        map: {
          text: "zName",
          value: "id"
        }
      }, "popup-title", "请选择省市区"), "inputBorder", !1), "modelValue", r.form.areaId)),
      m: r.form.areaId ? 1 : "",
      n: n.p({
        name: "areaId",
        label: "选择地区"
      }),
      o: n.o((function(e) {
        return r.form.detailAddress = e
      })),
      p: n.p({
        type: "text",
        placeholder: "请输入详细地址",
        clearable: !1,
        placeholderStyle: r.placeholderStyle,
        inputBorder: !1,
        modelValue: r.form.detailAddress
      }),
      q: r.form.detailAddress && r.form.detailAddress.length ? 1 : "",
      r: n.p({
        name: "detailAddress",
        label: "详细地址"
      }),
      s: n.o((function(e) {
        return r.isDefaultAddress = e
      })),
      t: n.p({
        multiple: !0,
        localdata: r.defaultSendCheckbox,
        selectedColor: r.AppTheme.themeColor,
        selectedTextColor: r.AppTheme.textPrimary,
        modelValue: r.isDefaultAddress
      }),
      v: n.o((function() {
        return r.handleClearAddress && r.handleClearAddress.apply(r, arguments)
      })),
      w: n.p({
        name: "saveToBook",
        labelWidth: "0"
      }),
      x: n.t("send" === r.fromPage ? "确定" : "保存"),
      y: n.o((function() {
        return r.handleSubmit && r.handleSubmit.apply(r, arguments)
      })),
      z: !r.canSubmit,
      A: n.sr("formRef", "3e920721-0"),
      B: n.p(e(e(e(e({}, "err-show-type", "toast"), "validateTrigger", "submit"), "border", !1), "label-width", "70px"))
    }
  }],
  ["__scopeId", "data-v-3e920721"],
  ["__file", "E:/project/TF/tf-wechat/src/pages/mine/address/address.vue"]
]);
wx.createPage(p);