var e = require("../../../../common/vendor.js"),
  t = {
    name: "uni-stat-select",
    mixins: [e.St.mixinDatacom || {}],
    props: {
      localdata: {
        type: Array,
        default: function() {
          return []
        }
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      emptyTips: {
        type: String,
        default: "无选项"
      },
      clear: {
        type: Boolean,
        default: !0
      },
      defItem: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: !1
      },
      format: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        showSelector: !1,
        current: "",
        mixinDatacomResData: [],
        apps: [],
        channels: [],
        cacheKey: "uni-data-select-lastSelectedValue"
      }
    },
    created: function() {
      var e = this;
      this.debounceGet = this.debounce((function() {
        e.query()
      }), 300), this.collection && !this.localdata.length && this.debounceGet()
    },
    computed: {
      typePlaceholder: function() {
        var e = this.placeholder,
          t = {
            "opendb-stat-app-versions": "版本",
            "opendb-app-channels": "渠道",
            "opendb-app-list": "应用"
          } [this.collection];
        return t ? e + t : e
      },
      valueCom: function() {
        return this.modelValue
      }
    },
    watch: {
      localdata: {
        immediate: !0,
        handler: function(e, t) {
          Array.isArray(e) && t !== e && (this.mixinDatacomResData = e)
        }
      },
      valueCom: function(e, t) {
        this.initDefVal()
      },
      mixinDatacomResData: {
        immediate: !0,
        handler: function(e) {
          e.length && this.initDefVal()
        }
      }
    },
    methods: {
      debounce: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
          a = null;
        return function() {
          for (var i = this, n = arguments.length, o = new Array(n), c = 0; c < n; c++) o[c] = arguments[c];
          a && clearTimeout(a), a = setTimeout((function() {
            e.apply(i, o)
          }), t)
        }
      },
      query: function() {
        this.mixinDatacomEasyGet()
      },
      onMixinDatacomPropsChange: function() {
        this.collection && this.debounceGet()
      },
      initDefVal: function() {
        var e = "";
        if (!this.valueCom && 0 !== this.valueCom || this.isDisabled(this.valueCom)) {
          var t;
          if (this.collection && (t = this.getCache()), t || 0 === t) e = t;
          else {
            var a = "";
            this.defItem > 0 && this.defItem <= this.mixinDatacomResData.length && (a = this.mixinDatacomResData[this.defItem - 1].value), e = a
          }(e || 0 === e) && this.emit(e)
        } else e = this.valueCom;
        var i = this.mixinDatacomResData.find((function(t) {
          return t.value === e
        }));
        this.current = i ? this.formatItemName(i) : ""
      },
      isDisabled: function(e) {
        var t = !1;
        return this.mixinDatacomResData.forEach((function(a) {
          a.value === e && (t = a.disable)
        })), t
      },
      clearVal: function() {
        this.emit(""), this.collection && this.removeCache()
      },
      change: function(e) {
        e.disable || (this.showSelector = !1, this.current = this.formatItemName(e), this.emit(e.value))
      },
      emit: function(e) {
        this.$emit("change", e), this.$emit("input", e), this.$emit("update:modelValue", e), this.collection && this.setCache(e)
      },
      toggleSelector: function() {
        this.disabled || (this.showSelector = !this.showSelector)
      },
      formatItemName: function(e) {
        var t = e.text,
          a = e.value,
          i = e.channel_code;
        if (i = i ? "(".concat(i, ")") : "", this.format) {
          var n = "";
          for (var o in n = this.format, e) n = n.replace(new RegExp("{".concat(o, "}"), "g"), e[o]);
          return n
        }
        return this.collection.indexOf("app-list") > 0 ? "".concat(t, "(").concat(a, ")") : t || "未命名".concat(i)
      },
      getLoadData: function() {
        return this.mixinDatacomResData
      },
      getCurrentCacheKey: function() {
        return this.collection
      },
      getCache: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getCurrentCacheKey(),
          a = e.index.getStorageSync(this.cacheKey) || {};
        return a[t]
      },
      setCache: function(t) {
        var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getCurrentCacheKey(),
          i = e.index.getStorageSync(this.cacheKey) || {};
        i[a] = t, e.index.setStorageSync(this.cacheKey, i)
      },
      removeCache: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getCurrentCacheKey(),
          a = e.index.getStorageSync(this.cacheKey) || {};
        delete a[t], e.index.setStorageSync(this.cacheKey, a)
      }
    }
  };
Array || e.resolveComponent("uni-icons")();
Math;
var a = e._export_sfc(t, [
  ["render", function(t, a, i, n, o, c) {
    return e.e({
      a: i.label
    }, i.label ? {
      b: e.t(i.label + "：")
    } : {}, {
      c: o.current
    }, o.current ? {
      d: e.t(o.current)
    } : {
      e: e.t(c.typePlaceholder)
    }, {
      f: o.current && i.clear && !i.disabled
    }, o.current && i.clear && !i.disabled ? {
      g: e.o(c.clearVal),
      h: e.p({
        type: "clear",
        color: "#c0c4cc",
        size: "24"
      })
    } : {
      i: e.p({
        type: o.showSelector ? "top" : "bottom",
        size: "14",
        color: "#999"
      })
    }, {
      j: e.o((function() {
        return c.toggleSelector && c.toggleSelector.apply(c, arguments)
      })),
      k: o.showSelector
    }, o.showSelector ? {
      l: e.o((function() {
        return c.toggleSelector && c.toggleSelector.apply(c, arguments)
      }))
    } : {}, {
      m: o.showSelector
    }, o.showSelector ? e.e({
      n: 0 === o.mixinDatacomResData.length
    }, 0 === o.mixinDatacomResData.length ? {
      o: e.t(i.emptyTips)
    } : {
      p: e.f(o.mixinDatacomResData, (function(t, a, i) {
        return {
          a: e.t(c.formatItemName(t)),
          b: t.disable ? 1 : "",
          c: a,
          d: e.o((function(e) {
            return c.change(t)
          }))
        }
      }))
    }) : {}, {
      q: i.disabled ? 1 : "",
      r: o.current ? 1 : ""
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue"]
]);
wx.createComponent(a);