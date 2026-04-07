var n = require("./icons.js"),
  e = require("../../../../common/vendor.js"),
  t = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        icons: n.icons.glyphs
      }
    },
    computed: {
      unicode: function() {
        var n = this,
          e = this.icons.find((function(e) {
            return e.font_class === n.type
          }));
        return e ? unescape("%u".concat(e.unicode)) : ""
      },
      iconSize: function() {
        return "number" == typeof(n = this.size) || /^[0-9]*$/g.test(n) ? n + "px" : n;
        var n
      }
    },
    methods: {
      _onClick: function() {
        this.$emit("click")
      }
    }
  };
var i = e._export_sfc(t, [
  ["render", function(n, t, i, o, c, r) {
    return {
      a: i.color,
      b: r.iconSize,
      c: e.n("uniui-" + i.type),
      d: e.n(i.customPrefix),
      e: e.n(i.customPrefix ? i.type : ""),
      f: e.o((function() {
        return r._onClick && r._onClick.apply(r, arguments)
      }))
    }
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]
]);
wx.createComponent(i);