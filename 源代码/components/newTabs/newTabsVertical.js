var t = require("../../common/vendor.js"),
  e = {
    name: "NewTabsVertical",
    props: {
      value: [Number, String],
      type: {
        type: Array,
        default: function() {
          return []
        }
      },
      heightNumber: Number,
      lineColor: String,
      lineAnimated: {
        type: Boolean,
        default: !0
      }
    },
    data: function() {
      return {
        currentIndex: 0,
        lineStyle: {
          height: ""
        },
        scrollTop: 0,
        tabsScrollLeft: 0,
        duration: .3
      }
    },
    watch: {
      type: function() {
        this.setTabList()
      },
      value: function() {
        this.currentIndex = this.value, this.setTabList()
      }
    },
    mounted: function() {
      this.currentIndex = this.value, this.setTabList(), this.lineAnimated || (this.duration = 0)
    },
    methods: {
      select: function(t, e) {
        e !== this.currentIndex && (this.$emit("change", {
          index: e,
          id: t.id
        }), this.currentIndex = e, this.setTabList())
      },
      setTabList: function() {
        var t = this;
        this.$nextTick((function() {
          t.type.length > 0 && (t.setLine(), t.scrollIntoView())
        }))
      },
      setLine: function() {
        var t = 0,
          e = 0,
          n = this;
        this.getElementData("#tab_item", (function(i) {
          var r = i[n.currentIndex];
          t = r.height / 2, e = r.height / 2 - i[0].top + r.top + 8, n.lineStyle = {
            height: "".concat(t, "px"),
            transform: "translateY(".concat(e, "px) translateY(-50%)"),
            transitionDuration: "".concat(n.duration, "s")
          }
        }))
      },
      scrollIntoView: function() {
        var t = this,
          e = 0;
        this.getElementData("#tab_list", (function(n) {
          var i = n[0];
          t.getElementData("#tab_item", (function(n) {
            var r = n[t.currentIndex];
            e = r.height / 2 - i.top + r.top - i.height / 2 - t.scrollTop, t.tabsScrollLeft = t.scrollTop + e
          }))
        }))
      },
      getElementData: function(e, n) {
        t.index.createSelectorQuery().in(this).selectAll(e).boundingClientRect().exec((function(t) {
          n(t[0])
        }))
      },
      scroll: function(t) {
        this.scrollTop = t.detail.scrollTop
      }
    }
  };
var n = t._export_sfc(e, [
  ["render", function(e, n, i, r, a, o) {
    return t.e({
      a: i.type.length > 0
    }, i.type.length > 0 ? {
      b: a.lineStyle.height,
      c: a.lineStyle.transform,
      d: a.lineStyle.transitionDuration,
      e: t.f(i.type, (function(e, n, i) {
        return {
          a: t.t(e.salesClassName),
          b: n,
          c: t.n({
            "tab__item--active": a.currentIndex === n
          }),
          d: t.o((function(t) {
            return o.select(e, n)
          }))
        }
      })),
      f: "calc(100vh - ".concat(i.heightNumber, "px)"),
      g: a.tabsScrollLeft,
      h: t.o((function() {
        return o.scroll && o.scroll.apply(o, arguments)
      }))
    } : {})
  }],
  ["__scopeId", "data-v-d1921eba"],
  ["__file", "E:/project/TF/tf-wechat/src/components/newTabs/newTabsVertical.vue"]
]);
wx.createComponent(n);