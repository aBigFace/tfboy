var e = require("../../../../@babel/runtime/helpers/defineProperty");
require("../../../../@babel/runtime/helpers/Arrayincludes");
var t = require("../../../../common/vendor.js"),
  a = {
    name: "uniDataChecklist",
    mixins: [t.St.mixinDatacom || {}],
    emits: ["input", "update:modelValue", "change"],
    props: {
      mode: {
        type: String,
        default: "default"
      },
      multiple: {
        type: Boolean,
        default: !1
      },
      value: {
        type: [Array, String, Number],
        default: function() {
          return ""
        }
      },
      modelValue: {
        type: [Array, String, Number],
        default: function() {
          return ""
        }
      },
      localdata: {
        type: Array,
        default: function() {
          return []
        }
      },
      min: {
        type: [Number, String],
        default: ""
      },
      max: {
        type: [Number, String],
        default: ""
      },
      wrap: {
        type: Boolean,
        default: !1
      },
      icon: {
        type: String,
        default: "left"
      },
      selectedColor: {
        type: String,
        default: ""
      },
      selectedTextColor: {
        type: String,
        default: ""
      },
      emptyText: {
        type: String,
        default: "暂无数据"
      },
      disabled: {
        type: Boolean,
        default: !1
      },
      map: {
        type: Object,
        default: function() {
          return {
            text: "text",
            value: "value"
          }
        }
      }
    },
    watch: {
      localdata: {
        handler: function(e) {
          this.range = e, this.dataList = this.getDataList(this.getSelectedValue(e))
        },
        deep: !0
      },
      mixinDatacomResData: function(e) {
        this.range = e, this.dataList = this.getDataList(this.getSelectedValue(e))
      },
      value: function(e) {
        this.dataList = this.getDataList(e)
      },
      modelValue: function(e) {
        this.dataList = this.getDataList(e)
      }
    },
    data: function() {
      return {
        dataList: [],
        range: [],
        contentText: {
          contentdown: "查看更多",
          contentrefresh: "加载中",
          contentnomore: "没有更多"
        },
        isLocal: !0,
        styles: {
          selectedColor: "#2979ff",
          selectedTextColor: "#666"
        },
        isTop: 0
      }
    },
    computed: {
      dataValue: function() {
        return "" === this.value ? this.modelValue : (this.modelValue, this.value)
      }
    },
    created: function() {
      this.localdata && 0 !== this.localdata.length ? (this.isLocal = !0, this.range = this.localdata, this.dataList = this.getDataList(this.getSelectedValue(this.range))) : this.collection && (this.isLocal = !1, this.loadData())
    },
    methods: {
      loadData: function() {
        var e = this;
        this.mixinDatacomGet().then((function(t) {
          e.mixinDatacomResData = t.result.data, 0 === e.mixinDatacomResData.length ? (e.isLocal = !1, e.mixinDatacomErrorMessage = e.emptyText) : e.isLocal = !0
        })).catch((function(t) {
          e.mixinDatacomErrorMessage = t.message
        }))
      },
      getForm: function() {
        for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "uniForms", t = this.$parent, a = t.$options.name; a !== e;) {
          if (!(t = t.$parent)) return !1;
          a = t.$options.name
        }
        return t
      },
      chagne: function(e) {
        var t = this,
          a = e.detail.value,
          i = {
            value: [],
            data: []
          };
        if (this.multiple) this.range.forEach((function(e) {
          a.includes(e[t.map.value] + "") && (i.value.push(e[t.map.value]), i.data.push(e))
        }));
        else {
          var s = this.range.find((function(e) {
            return e[t.map.value] + "" === a
          }));
          s && (i = {
            value: s[this.map.value],
            data: s
          })
        }
        this.$emit("input", i.value), this.$emit("update:modelValue", i.value), this.$emit("change", {
          detail: i
        }), this.multiple ? this.dataList = this.getDataList(i.value, !0) : this.dataList = this.getDataList(i.value)
      },
      getDataList: function(e) {
        var t = this,
          a = JSON.parse(JSON.stringify(this.range)),
          i = [];
        return this.multiple && (Array.isArray(e) || (e = [])), a.forEach((function(a, s) {
          if (a.disabled = a.disable || a.disabled || !1, t.multiple)
            if (e.length > 0) {
              var l = e.find((function(e) {
                return e === a[t.map.value]
              }));
              a.selected = void 0 !== l
            } else a.selected = !1;
          else a.selected = e === a[t.map.value];
          i.push(a)
        })), this.setRange(i)
      },
      setRange: function(e) {
        var t = this,
          a = e.filter((function(e) {
            return e.selected
          })),
          i = Number(this.min) || 0,
          s = Number(this.max) || "";
        return e.forEach((function(l, o) {
          if (t.multiple) {
            if (a.length <= i) void 0 !== a.find((function(e) {
              return e[t.map.value] === l[t.map.value]
            })) && (l.disabled = !0);
            if (a.length >= s && "" !== s) void 0 === a.find((function(e) {
              return e[t.map.value] === l[t.map.value]
            })) && (l.disabled = !0)
          }
          t.setStyles(l, o), e[o] = l
        })), e
      },
      setStyles: function(e, t) {
        e.styleBackgroud = this.setStyleBackgroud(e), e.styleIcon = this.setStyleIcon(e), e.styleIconText = this.setStyleIconText(e), e.styleRightIcon = this.setStyleRightIcon(e)
      },
      getSelectedValue: function(e) {
        var t = this;
        if (!this.multiple) return this.dataValue;
        var a = [];
        return e.forEach((function(e) {
          e.selected && a.push(e[t.map.value])
        })), this.dataValue.length > 0 ? this.dataValue : a
      },
      setStyleBackgroud: function(e) {
        var t = {},
          a = this.selectedColor ? this.selectedColor : "#2979ff";
        "list" !== this.mode && (t["border-color"] = e.selected ? a : "#DCDFE6"), "tag" === this.mode && (t["background-color"] = e.selected ? a : "#f5f5f5");
        var i = "";
        for (var s in t) i += "".concat(s, ":").concat(t[s], ";");
        return i
      },
      setStyleIcon: function(e) {
        var t = {},
          a = "",
          i = this.selectedColor ? this.selectedColor : "#2979ff";
        for (var s in t["background-color"] = e.selected ? i : "#fff", t["border-color"] = e.selected ? i : "#DCDFE6", !e.selected && e.disabled && (t["background-color"] = "#F2F6FC", t["border-color"] = e.selected ? i : "#DCDFE6"), t) a += "".concat(s, ":").concat(t[s], ";");
        return a
      },
      setStyleIconText: function(e) {
        var t = {},
          a = "",
          i = this.selectedColor ? this.selectedColor : "#2979ff";
        for (var s in "tag" === this.mode ? t.color = e.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666" : t.color = e.selected ? this.selectedTextColor ? this.selectedTextColor : i : "#666", !e.selected && e.disabled && (t.color = "#999"), t) a += "".concat(s, ":").concat(t[s], ";");
        return a
      },
      setStyleRightIcon: function(e) {
        var t = {},
          a = "";
        for (var i in "list" === this.mode && (t["border-color"] = e.selected ? this.styles.selectedColor : "#DCDFE6"), t) a += "".concat(i, ":").concat(t[i], ";");
        return a
      }
    }
  };
Array || t.resolveComponent("uni-load-more")();
Math;
var i = t._export_sfc(a, [
  ["render", function(a, i, s, l, o, n) {
    return t.e({
      a: !o.isLocal
    }, o.isLocal ? t.e({
      e: s.multiple
    }, s.multiple ? {
      f: t.f(o.dataList, (function(e, a, i) {
        return t.e({
          a: s.disabled || !!e.disabled,
          b: e[s.map.value] + "",
          c: e.selected
        }, "tag" !== s.mode && "list" !== s.mode || "list" === s.mode && "left" === s.icon ? {
          d: t.s(e.styleIcon)
        } : {}, {
          e: t.t(e[s.map.text]),
          f: t.s(e.styleIconText)
        }, "list" === s.mode && "right" === s.icon ? {
          g: t.s(e.styleBackgroud)
        } : {}, {
          h: t.n(e.selected ? "is-checked" : ""),
          i: t.n(s.disabled || e.disabled ? "is-disable" : ""),
          j: t.n(0 !== a && "list" === s.mode ? "is-list-border" : ""),
          k: t.s(e.styleBackgroud),
          l: a
        })
      })),
      g: "tag" !== s.mode && "list" !== s.mode || "list" === s.mode && "left" === s.icon,
      h: "list" === s.mode && "right" === s.icon,
      i: "list" === s.mode && "left" === s.icon ? 1 : "",
      j: t.n("is--" + s.mode),
      k: "list" === s.mode || s.wrap ? 1 : "",
      l: t.o((function() {
        return n.chagne && n.chagne.apply(n, arguments)
      }))
    } : {
      m: t.f(o.dataList, (function(e, a, i) {
        return t.e({
          a: s.disabled || e.disabled,
          b: e[s.map.value] + "",
          c: e.selected
        }, "tag" !== s.mode && "list" !== s.mode || "list" === s.mode && "left" === s.icon ? {
          d: t.s(e.styleIcon),
          e: t.s(e.styleBackgroud)
        } : {}, {
          f: t.t(e[s.map.text]),
          g: t.s(e.styleIconText)
        }, "list" === s.mode && "right" === s.icon ? {
          h: t.s(e.styleRightIcon)
        } : {}, {
          i: t.n(e.selected ? "is-checked" : ""),
          j: t.n(s.disabled || e.disabled ? "is-disable" : ""),
          k: t.n(0 !== a && "list" === s.mode ? "is-list-border" : ""),
          l: t.s(e.styleBackgroud),
          m: a
        })
      })),
      n: "tag" !== s.mode && "list" !== s.mode || "list" === s.mode && "left" === s.icon,
      o: "list" === s.mode && "right" === s.icon,
      p: "list" === s.mode && "left" === s.icon ? 1 : "",
      q: t.n("is--" + s.mode),
      r: "list" === s.mode ? 1 : "",
      s: s.wrap ? 1 : "",
      t: t.o((function() {
        return n.chagne && n.chagne.apply(n, arguments)
      }))
    }) : t.e({
      b: !a.mixinDatacomErrorMessage
    }, a.mixinDatacomErrorMessage ? {
      d: t.t(a.mixinDatacomErrorMessage)
    } : {
      c: t.p(e({
        status: "loading",
        iconType: "snow",
        iconSize: 18
      }, "content-text", o.contentText))
    }), {
      v: o.isTop + "px"
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue"]
]);
wx.createComponent(i);