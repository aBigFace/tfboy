var e = require("../../@babel/runtime/helpers/objectSpread2"),
  t = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  n = require("../../@babel/runtime/helpers/asyncToGenerator"),
  r = require("../../common/vendor.js"),
  a = r.defineComponent({
    name: "customPassInput",
    props: {
      canRepeat: {
        type: Boolean,
        default: !1
      }
    },
    setup: function(a, o) {
      var u = o.emit,
        c = r.reactive({
          length: 6,
          code_val: "",
          is_focus: !0,
          times: 60,
          phone: "",
          timer: 0
        }),
        s = function() {
          var e = n(t().mark((function e(n) {
            return t().wrap((function(e) {
              for (;;) switch (e.prev = e.next) {
                case 0:
                  if (c.code_val = n.detail.value, 6 != c.code_val.length) {
                    e.next = 7;
                    break
                  }
                  if (!a.passwordSet) {
                    e.next = 4;
                    break
                  }
                  return e.abrupt("return", u("checkingPassWord", n.detail.value));
                case 4:
                  if (!a.canRepeat) {
                    e.next = 6;
                    break
                  }
                  return e.abrupt("return", u("setPassWordConfirm", n.detail.value));
                case 6:
                  u("setPassWord", n.detail.value);
                case 7:
                case "end":
                  return e.stop()
              }
            }), e)
          })));
          return function(t) {
            return e.apply(this, arguments)
          }
        }();
      return r.onLoad((function(e) {})), e(e({}, r.toRefs(c)), {}, {
        getPassWordValue: s,
        onCode: function(e) {
          c.is_focus = !0
        },
        delValue: function(e) {
          c.is_focus = !1
        }
      })
    }
  });
var o = r._export_sfc(a, [
  ["render", function(e, t, n, a, o, u) {
    return {
      a: r.f(e.code_val.length, (function(e, t, n) {
        return {
          a: e
        }
      })),
      b: r.f(e.length, (function(t, n, a) {
        return {
          a: n,
          b: e.code_val.length >= n + 1 ? e.code_val[n] : "",
          c: r.n({
            active: e.code_val.length === n
          })
        }
      })),
      c: r.o((function() {
        return e.onCode && e.onCode.apply(e, arguments)
      })),
      d: r.o([function(t) {
        return e.code_val = t.detail.value
      }, function() {
        return e.getPassWordValue && e.getPassWordValue.apply(e, arguments)
      }]),
      e: r.o((function() {
        return e.delValue && e.delValue.apply(e, arguments)
      })),
      f: e.length,
      g: e.is_focus,
      h: e.code_val
    }
  }],
  ["__scopeId", "data-v-74e6edbe"],
  ["__file", "E:/project/TF/tf-wechat/src/components/customPassInput/customPassInput.vue"]
]);
wx.createComponent(o);