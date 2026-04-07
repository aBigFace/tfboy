var e = require("../../../../@babel/runtime/helpers/toConsumableArray"),
  t = require("./uni-data-picker.js"),
  a = require("../../../../common/vendor.js"),
  i = {
    name: "UniDataPickerView",
    emits: ["nodeclick", "change", "datachange", "update:modelValue"],
    mixins: [t.dataPicker],
    props: {
      managedMode: {
        type: Boolean,
        default: !1
      },
      ellipsis: {
        type: Boolean,
        default: !0
      }
    },
    data: function() {
      return {}
    },
    created: function() {
      var e = this;
      this.managedMode || this.$nextTick((function() {
        e.load()
      }))
    },
    methods: {
      onPropsChange: function() {
        this._treeData = [], this.selectedIndex = 0, this.load()
      },
      load: function() {
        var e = this;
        this.isLocaldata ? this.loadData() : this.dataValue.length && this.getTreePath((function(t) {
          e.loadData()
        }))
      },
      handleSelect: function(e) {
        this.selectedIndex = e
      },
      handleNodeClick: function(t, a, i) {
        var n = this;
        if (!t.disable) {
          var s = this.dataList[a][i],
            d = s[this.map.text],
            l = s[this.map.value];
          if (a < this.selected.length - 1 ? (this.selected.splice(a, this.selected.length - a), this.selected.push({
              text: d,
              value: l
            })) : a === this.selected.length - 1 && this.selected.splice(a, 1, {
              text: d,
              value: l
            }), s.isleaf) this.onSelectedChange(s, s.isleaf);
          else {
            var c = this._updateBindData(),
              o = c.isleaf,
              h = c.hasNodes;
            (this._isTreeView() || h) && (!this.isLocaldata || h && !o) ? o || h ? this.onSelectedChange(s, !1) : this._loadNodeData((function(t) {
              var a;
              t.length ? ((a = n._treeData).push.apply(a, e(t)), n._updateBindData(s)) : s.isleaf = !0;
              n.onSelectedChange(s, s.isleaf)
            }), this._nodeWhere()): this.onSelectedChange(s, !0)
          }
        }
      },
      updateData: function(e) {
        this._treeData = e.treeData, this.selected = e.selected, this._treeData.length ? this._updateBindData() : this.loadData()
      },
      onDataChange: function() {
        this.$emit("datachange")
      },
      onSelectedChange: function(e, t) {
        t && this._dispatchEvent(), e && this.$emit("nodeclick", e)
      },
      _dispatchEvent: function() {
        this.$emit("change", this.selected.slice(0))
      }
    }
  };
Array || a.resolveComponent("uni-load-more")();
Math;
var n = a._export_sfc(i, [
  ["render", function(e, t, i, n, s, d) {
    return a.e({
      a: a.f(e.selected, (function(t, n, s) {
        return a.e({
          a: t.text
        }, t.text ? {
          b: a.t(t.text),
          c: n == e.selectedIndex ? 1 : "",
          d: i.ellipsis ? 1 : "",
          e: a.o((function(e) {
            return d.handleSelect(n)
          }))
        } : {})
      })),
      b: a.f(e.dataList, (function(t, i, n) {
        return a.e({
          a: i == e.selectedIndex
        }, i == e.selectedIndex ? {
          b: a.f(t, (function(t, n, s) {
            return a.e({
              a: a.t(t[e.map.text]),
              b: e.selected.length > i && t[e.map.value] == e.selected[i].value
            }, (e.selected.length > i && (t[e.map.value], e.selected[i].value), {}), {
              c: t.disable ? 1 : "",
              d: a.o((function(e) {
                return d.handleNodeClick(t, i, n)
              }))
            })
          })),
          c: i
        } : {})
      })),
      c: e.loading
    }, e.loading ? {
      d: a.p({
        contentText: e.loadMore,
        status: "loading"
      })
    } : {}, {
      e: e.errorMessage
    }, e.errorMessage ? {
      f: a.t(e.errorMessage)
    } : {})
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-pickerview.vue"]
]);
wx.createComponent(n);