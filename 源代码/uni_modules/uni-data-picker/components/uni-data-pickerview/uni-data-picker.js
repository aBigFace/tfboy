var t = require("../../../../@babel/runtime/helpers/typeof"),
  e = require("../../../../common/vendor.js"),
  a = {
    props: {
      localdata: {
        type: [Array, Object],
        default: function() {
          return []
        }
      },
      spaceInfo: {
        type: Object,
        default: function() {
          return {}
        }
      },
      collection: {
        type: String,
        default: ""
      },
      action: {
        type: String,
        default: ""
      },
      field: {
        type: String,
        default: ""
      },
      orderby: {
        type: String,
        default: ""
      },
      where: {
        type: [String, Object],
        default: ""
      },
      pageData: {
        type: String,
        default: "add"
      },
      pageCurrent: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 20
      },
      getcount: {
        type: [Boolean, String],
        default: !1
      },
      getone: {
        type: [Boolean, String],
        default: !1
      },
      gettree: {
        type: [Boolean, String],
        default: !1
      },
      manual: {
        type: Boolean,
        default: !1
      },
      value: {
        type: [Array, String, Number],
        default: function() {
          return []
        }
      },
      modelValue: {
        type: [Array, String, Number],
        default: function() {
          return []
        }
      },
      preload: {
        type: Boolean,
        default: !1
      },
      stepSearh: {
        type: Boolean,
        default: !0
      },
      selfField: {
        type: String,
        default: ""
      },
      parentField: {
        type: String,
        default: ""
      },
      multiple: {
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
    data: function() {
      return {
        loading: !1,
        errorMessage: "",
        loadMore: {
          contentdown: "",
          contentrefresh: "",
          contentnomore: ""
        },
        dataList: [],
        selected: [],
        selectedIndex: 0,
        page: {
          current: this.pageCurrent,
          size: this.pageSize,
          count: 0
        }
      }
    },
    computed: {
      isLocaldata: function() {
        return !this.collection.length
      },
      postField: function() {
        var t = [this.field];
        return this.parentField && t.push("".concat(this.parentField, " as parent_value")), t.join(",")
      },
      dataValue: function() {
        return (Array.isArray(this.modelValue) ? this.modelValue.length > 0 : null !== this.modelValue || void 0 !== this.modelValue) ? this.modelValue : this.value
      },
      hasValue: function() {
        return "number" == typeof this.dataValue || null != this.dataValue && this.dataValue.length > 0
      }
    },
    created: function() {
      var t = this;
      this.$watch((function() {
        var e = [];
        return ["pageCurrent", "pageSize", "spaceInfo", "value", "modelValue", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree"].forEach((function(a) {
          e.push(t[a])
        })), e
      }), (function(e, a) {
        for (var n = 2; n < e.length && e[n] == a[n]; n++);
        e[0] != a[0] && (t.page.current = t.pageCurrent), t.page.size = t.pageSize, t.onPropsChange()
      })), this._treeData = []
    },
    methods: {
      onPropsChange: function() {
        this._treeData = []
      },
      getCommand: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          a = e.St.database(this.spaceInfo),
          n = t.action || this.action;
        n && (a = a.action(n));
        var i = t.collection || this.collection;
        a = a.collection(i);
        var r = t.where || this.where;
        r && Object.keys(r).length && (a = a.where(r));
        var l = t.field || this.field;
        l && (a = a.field(l));
        var o = t.orderby || this.orderby;
        o && (a = a.orderBy(o));
        var h = void 0 !== t.pageCurrent ? t.pageCurrent : this.page.current,
          s = void 0 !== t.pageSize ? t.pageSize : this.page.size,
          u = void 0 !== t.getcount ? t.getcount : this.getcount,
          d = void 0 !== t.gettree ? t.gettree : this.gettree,
          c = {
            getCount: u,
            getTree: d
          };
        return t.getTreePath && (c.getTreePath = t.getTreePath), a = a.skip(s * (h - 1)).limit(s).get(c)
      },
      getNodeData: function(t) {
        var e = this;
        this.loading || (this.loading = !0, this.getCommand({
          field: this.postField,
          where: this._pathWhere()
        }).then((function(a) {
          e.loading = !1, e.selected = a.result.data, t && t()
        })).catch((function(t) {
          e.loading = !1, e.errorMessage = t
        })))
      },
      getTreePath: function(t) {
        var e = this;
        this.loading || (this.loading = !0, this.getCommand({
          field: this.postField,
          getTreePath: {
            startWith: "".concat(this.selfField, "=='").concat(this.dataValue, "'")
          }
        }).then((function(a) {
          e.loading = !1;
          var n = [];
          e._extractTreePath(a.result.data, n), e.selected = n, t && t()
        })).catch((function(t) {
          e.loading = !1, e.errorMessage = t
        })))
      },
      loadData: function() {
        var t = this;
        this.isLocaldata ? this._processLocalData() : null == this.dataValue ? this.stepSearh ? this._loadNodeData((function(e) {
          t._treeData = e, t._updateBindData()
        })) : this._loadAllData((function(e) {
          t._treeData = [], t._extractTree(e, t._treeData, null), t._updateBindData()
        })) : this._loadNodeData((function(e) {
          t._treeData = e, t._updateBindData(), t._updateSelected()
        }))
      },
      _loadAllData: function(t) {
        var e = this;
        this.loading || (this.loading = !0, this.getCommand({
          field: this.postField,
          gettree: !0,
          startwith: "".concat(this.selfField, "=='").concat(this.dataValue, "'")
        }).then((function(a) {
          e.loading = !1, t(a.result.data), e.onDataChange()
        })).catch((function(t) {
          e.loading = !1, e.errorMessage = t
        })))
      },
      _loadNodeData: function(t, e) {
        var a = this;
        this.loading || (this.loading = !0, this.getCommand({
          field: this.postField,
          where: e || this._postWhere(),
          pageSize: 500
        }).then((function(e) {
          a.loading = !1, t(e.result.data), a.onDataChange()
        })).catch((function(t) {
          a.loading = !1, a.errorMessage = t
        })))
      },
      _pathWhere: function() {
        var t = [],
          e = this._getParentNameByField();
        return e && t.push("".concat(e, " == '").concat(this.dataValue, "'")), this.where ? "(".concat(this.where, ") && (").concat(t.join(" || "), ")") : t.join(" || ")
      },
      _postWhere: function() {
        var t = [],
          e = this.selected,
          a = this.parentField;
        if (a && t.push("".concat(a, " == null || ").concat(a, ' == ""')), e.length)
          for (var n = 0; n < e.length - 1; n++) t.push("".concat(a, " == '").concat(e[n].value, "'"));
        var i = [];
        return this.where && i.push("(".concat(this.where, ")")), t.length && i.push("(".concat(t.join(" || "), ")")), i.join(" && ")
      },
      _nodeWhere: function() {
        var t = [],
          e = this.selected;
        return e.length && t.push("".concat(this.parentField, " == '").concat(e[e.length - 1].value, "'")), this.where ? "(".concat(this.where, ") && (").concat(t.join(" || "), ")") : t.join(" || ")
      },
      _getParentNameByField: function() {
        for (var t = this.field.split(","), e = null, a = 0; a < t.length; a++) {
          var n = t[a].split("as");
          if (!(n.length < 2) && "value" === n[1].trim()) {
            e = n[0].trim();
            break
          }
        }
        return e
      },
      _isTreeView: function() {
        return this.parentField && this.selfField
      },
      _updateSelected: function() {
        for (var t = this.dataList, e = this.selected, a = this.map.text, n = this.map.value, i = 0; i < e.length; i++)
          for (var r = e[i].value, l = t[i], o = 0; o < l.length; o++) {
            var h = l[o];
            if (h[n] === r) {
              e[i].text = h[a];
              break
            }
          }
      },
      _updateBindData: function(t) {
        var e = this._filterData(this._treeData, this.selected),
          a = e.dataList,
          n = e.hasNodes,
          i = !1 === this._stepSearh && !n;
        return t && (t.isleaf = i), this.dataList = a, this.selectedIndex = a.length - 1, !i && this.selected.length < a.length && this.selected.push({
          value: null,
          text: "请选择"
        }), {
          isleaf: i,
          hasNodes: n
        }
      },
      _filterData: function(t, e) {
        var a = [],
          n = !0;
        a.push(t.filter((function(t) {
          return null === t.parent_value || void 0 === t.parent_value || "" === t.parent_value
        })));
        for (var i = 0; i < e.length; i++) {
          var r = e[i].value,
            l = t.filter((function(t) {
              return t.parent_value === r
            }));
          l.length ? a.push(l) : n = !1
        }
        return {
          dataList: a,
          hasNodes: n
        }
      },
      _extractTree: function(t, e, a) {
        for (var n = this.map.value, i = 0; i < t.length; i++) {
          var r = t[i],
            l = {};
          for (var o in r) "children" !== o && (l[o] = r[o]);
          null != a && "" !== a && (l.parent_value = a), e.push(l);
          var h = r.children;
          h && this._extractTree(h, e, r[n])
        }
      },
      _extractTreePath: function(t, e) {
        for (var a = 0; a < t.length; a++) {
          var n = t[a],
            i = {};
          for (var r in n) "children" !== r && (i[r] = n[r]);
          e.push(i);
          var l = n.children;
          l && this._extractTreePath(l, e)
        }
      },
      _findNodePath: function(t, e) {
        for (var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], n = this.map.text, i = this.map.value, r = 0; r < e.length; r++) {
          var l = e[r],
            o = l.children,
            h = l[n],
            s = l[i];
          if (a.push({
              value: s,
              text: h
            }), s === t) return a;
          if (o) {
            var u = this._findNodePath(t, o, a);
            if (u.length) return u
          }
          a.pop()
        }
        return []
      },
      _processLocalData: function() {
        this._treeData = [], this._extractTree(this.localdata, this._treeData);
        var e = this.dataValue;
        void 0 !== e && (Array.isArray(e) && (e = e[e.length - 1], "object" === t(e) && e[this.map.value] && (e = e[this.map.value])), this.selected = this._findNodePath(e, this.localdata))
      }
    }
  };
exports.dataPicker = a;