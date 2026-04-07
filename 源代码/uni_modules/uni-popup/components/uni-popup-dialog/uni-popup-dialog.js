var e = require("../uni-popup/popup.js"),
  t = require("../../../../common/vendor.js"),
  o = require("../uni-popup/i18n/index.js"),
  i = t.initVueI18n(o.messages).t,
  n = {
    name: "uniPopupDialog",
    mixins: [e.popup],
    emits: ["confirm", "close"],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: !1
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        dialogType: "error",
        focus: !1,
        val: ""
      }
    },
    computed: {
      okText: function() {
        return this.confirmText || i("uni-popup.ok")
      },
      closeText: function() {
        return this.cancelText || i("uni-popup.cancel")
      },
      placeholderText: function() {
        return this.placeholder || i("uni-popup.placeholder")
      },
      titleText: function() {
        return this.title || i("uni-popup.title")
      }
    },
    watch: {
      type: function(e) {
        this.dialogType = e
      },
      mode: function(e) {
        "input" === e && (this.dialogType = "info")
      },
      value: function(e) {
        this.val = e
      }
    },
    created: function() {
      this.popup.disableMask(), "input" === this.mode ? (this.dialogType = "info", this.val = this.value) : this.dialogType = this.type
    },
    mounted: function() {
      this.focus = !1
    },
    methods: {
      onOk: function() {
        "input" === this.mode ? this.$emit("confirm", this.val) : this.$emit("confirm"), this.beforeClose || this.popup.close()
      },
      closeDialog: function() {
        this.$emit("close"), this.beforeClose || this.popup.close()
      },
      close: function() {
        this.popup.close()
      }
    }
  };
var p = t._export_sfc(n, [
  ["render", function(e, o, i, n, p, u) {
    return t.e({
      a: t.t(u.titleText),
      b: t.n("uni-popup__" + p.dialogType),
      c: "base" === i.mode
    }, "base" === i.mode ? {
      d: t.t(i.content)
    } : {
      e: u.placeholderText,
      f: p.focus,
      g: p.val,
      h: t.o((function(e) {
        return p.val = e.detail.value
      }))
    }, {
      i: t.t(u.closeText),
      j: t.o((function() {
        return u.closeDialog && u.closeDialog.apply(u, arguments)
      })),
      k: t.t(u.okText),
      l: t.o((function() {
        return u.onOk && u.onOk.apply(u, arguments)
      }))
    })
  }],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]
]);
wx.createComponent(p);