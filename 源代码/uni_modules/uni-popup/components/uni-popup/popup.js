var t = {
  data: function() {
    return {}
  },
  created: function() {
    this.popup = this.getParent()
  },
  methods: {
    getParent: function() {
      for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "uniPopup", n = this.$parent, e = n.$options.name; e !== t;) {
        if (!(n = n.$parent)) return !1;
        e = n.$options.name
      }
      return n
    }
  }
};
exports.popup = t;