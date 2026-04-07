var e = require("../../../../@babel/runtime/helpers/defineProperty"),
  t = require("../../../../@babel/runtime/helpers/typeof"),
  n = require("../uni-data-pickerview/uni-data-picker.js"),
  i = require("../../../../common/vendor.js"),
  a = {
    name: "UniDataPicker",
    emits: ["popupopened", "popupclosed", "nodeclick", "input", "change", "update:modelValue"],
    mixins: [n.dataPicker],
    components: {
      DataPickerView: function() {
        return "../uni-data-pickerview/uni-data-pickerview.js"
      }
    },
    props: {
      options: {
        type: [Object, Array],
        default: function() {
          return {}
        }
      },
      popupTitle: {
        type: String,
        default: "请选择"
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      heightMobile: {
        type: String,
        default: ""
      },
      readonly: {
        type: Boolean,
        default: !1
      },
      clearIcon: {
        type: Boolean,
        default: !0
      },
      border: {
        type: Boolean,
        default: !0
      },
      split: {
        type: String,
        default: "/"
      },
      ellipsis: {
        type: Boolean,
        default: !0
      }
    },
    data: function() {
      return {
        isOpened: !1,
        inputSelected: []
      }
    },
    created: function() {
      var e = this;
      this.form = this.getForm("uniForms"), this.formItem = this.getForm("uniFormsItem"), this.formItem && this.formItem.name && (this.rename = this.formItem.name, this.form.inputChildrens.push(this)), this.$nextTick((function() {
        e.load()
      }))
    },
    methods: {
      clear: function() {
        this.inputSelected.splice(0), this._dispatchEvent([])
      },
      onPropsChange: function() {
        this._treeData = [], this.selectedIndex = 0, this.load()
      },
      load: function() {
        var e = this;
        this.readonly ? this._processReadonly(this.localdata, this.dataValue) : this.isLocaldata ? (this.loadData(), this.inputSelected = this.selected.slice(0)) : this.parentField || this.selfField || !this.hasValue ? this.hasValue && this.getTreePath((function() {
          e.inputSelected = e.selected.slice(0)
        })) : this.getNodeData((function() {
          e.inputSelected = e.selected.slice(0)
        }))
      },
      getForm: function() {
        for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "uniForms", t = this.$parent, n = t.$options.name; n !== e;) {
          if (!(t = t.$parent)) return !1;
          n = t.$options.name
        }
        return t
      },
      show: function() {
        var e = this;
        this.isOpened = !0, setTimeout((function() {
          e.$refs.pickerView.updateData({
            treeData: e._treeData,
            selected: e.selected,
            selectedIndex: e.selectedIndex
          })
        }), 200), this.$emit("popupopened")
      },
      hide: function() {
        this.isOpened = !1, this.$emit("popupclosed")
      },
      handleInput: function() {
        this.readonly || this.show()
      },
      handleClose: function(e) {
        this.hide()
      },
      onnodeclick: function(e) {
        this.$emit("nodeclick", e)
      },
      ondatachange: function(e) {
        this._treeData = this.$refs.pickerView._treeData
      },
      onchange: function(e) {
        var t = this;
        this.hide(), this.$nextTick((function() {
          t.inputSelected = e
        })), this._dispatchEvent(e)
      },
      _processReadonly: function(e, n) {
        var i;
        if (e.findIndex((function(e) {
            return e.children
          })) > -1) return Array.isArray(n) ? (i = n[n.length - 1], "object" === t(i) && i.value && (i = i.value)) : i = n, void(this.inputSelected = this._findNodePath(i, this.localdata));
        if (this.hasValue) {
          for (var a = [], o = 0; o < n.length; o++) {
            var r = n[o],
              l = e.find((function(e) {
                return e.value == r
              }));
            l && a.push(l)
          }
          a.length && (this.inputSelected = a)
        } else this.inputSelected = []
      },
      _filterForArray: function(e, t) {
        for (var n = [], i = 0; i < t.length; i++) {
          var a = t[i],
            o = e.find((function(e) {
              return e.value == a
            }));
          o && n.push(o)
        }
        return n
      },
      _dispatchEvent: function(e) {
        var t = {};
        if (e.length) {
          for (var n = new Array(e.length), i = 0; i < e.length; i++) n[i] = e[i].value;
          t = e[e.length - 1]
        } else t.value = "";
        this.formItem && this.formItem.setValue(t.value), this.$emit("input", t.value), this.$emit("update:modelValue", t.value), this.$emit("change", {
          detail: {
            value: e
          }
        })
      }
    }
  };
Array || (i.resolveComponent("uni-load-more") + i.resolveComponent("uni-icons") + i.resolveComponent("data-picker-view"))();
Math || (function() {
  return "../../../uni-load-more/components/uni-load-more/uni-load-more.js"
} + function() {
  return "../../../uni-icons/components/uni-icons/uni-icons.js"
})();
var o = i._export_sfc(a, [
  ["render", function(t, n, a, o, r, l) {
    return i.e({
      a: t.errorMessage
    }, t.errorMessage ? {
      b: i.t(t.errorMessage)
    } : t.loading && !r.isOpened ? {
      d: i.p({
        contentText: t.loadMore,
        status: "loading"
      })
    } : r.inputSelected.length ? {
      f: i.f(r.inputSelected, (function(e, t, n) {
        return i.e({
          a: i.t(e.text),
          b: t < r.inputSelected.length - 1
        }, t < r.inputSelected.length - 1 ? {
          c: i.t(a.split)
        } : {}, {
          d: t
        })
      }))
    } : {
      g: i.t(a.placeholder)
    }, {
      c: t.loading && !r.isOpened,
      e: r.inputSelected.length,
      h: a.clearIcon && !a.readonly && r.inputSelected.length
    }, a.clearIcon && !a.readonly && r.inputSelected.length ? {
      i: i.p({
        type: "clear",
        color: "#e1e1e1",
        size: "14"
      }),
      j: i.o((function() {
        return l.clear && l.clear.apply(l, arguments)
      }))
    } : {}, {
      k: !(a.clearIcon && r.inputSelected.length || a.readonly)
    }, (a.clearIcon && r.inputSelected.length || a.readonly, {}), {
      l: a.border ? 1 : "",
      m: i.r("d", {
        options: a.options,
        data: r.inputSelected,
        error: t.errorMessage
      }),
      n: i.o((function() {
        return l.handleInput && l.handleInput.apply(l, arguments)
      })),
      o: r.isOpened
    }, r.isOpened ? {
      p: i.o((function() {
        return l.handleClose && l.handleClose.apply(l, arguments)
      }))
    } : {}, {
      q: r.isOpened
    }, r.isOpened ? {
      r: i.t(a.popupTitle),
      s: i.o((function() {
        return l.handleClose && l.handleClose.apply(l, arguments)
      })),
      t: i.sr("pickerView", "7be4ff66-2"),
      v: i.o(l.onchange),
      w: i.o(l.ondatachange),
      x: i.o(l.onnodeclick),
      y: i.o((function(e) {
        return t.dataValue = e
      })),
      z: i.p(e(e(e(e(e(e(e({
        localdata: t.localdata,
        preload: t.preload,
        collection: t.collection,
        field: t.field,
        orderby: t.orderby,
        where: t.where
      }, "step-searh", t.stepSearh), "self-field", t.selfField), "parent-field", t.parentField), "managed-mode", !0), "map", t.map), "ellipsis", a.ellipsis), "modelValue", t.dataValue))
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.vue"]
]);
wx.createComponent(o);