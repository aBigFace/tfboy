var t = require("../../../../common/vendor.js"),
  e = require("./i18n/index.js"),
  o = t.initVueI18n(e.messages).t,
  n = {
    name: "UniCountdown",
    emits: ["timeup"],
    props: {
      showDay: {
        type: Boolean,
        default: !0
      },
      showHour: {
        type: Boolean,
        default: !0
      },
      showMinute: {
        type: Boolean,
        default: !0
      },
      showColon: {
        type: Boolean,
        default: !0
      },
      start: {
        type: Boolean,
        default: !0
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333"
      },
      fontSize: {
        type: Number,
        default: 14
      },
      splitorColor: {
        type: String,
        default: "#333"
      },
      day: {
        type: Number,
        default: 0
      },
      hour: {
        type: Number,
        default: 0
      },
      minute: {
        type: Number,
        default: 0
      },
      second: {
        type: Number,
        default: 0
      },
      timestamp: {
        type: Number,
        default: 0
      },
      filterShow: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data: function() {
      return {
        timer: null,
        syncFlag: !1,
        d: "00",
        h: "00",
        i: "00",
        s: "00",
        leftTime: 0,
        seconds: 0
      }
    },
    computed: {
      dayText: function() {
        return o("uni-countdown.day")
      },
      hourText: function(t) {
        return o("uni-countdown.h")
      },
      minuteText: function(t) {
        return o("uni-countdown.m")
      },
      secondText: function(t) {
        return o("uni-countdown.s")
      },
      timeStyle: function() {
        var t = this.color,
          e = this.backgroundColor,
          o = this.fontSize;
        return {
          color: t,
          backgroundColor: e,
          fontSize: "".concat(o, "px"),
          width: "".concat(22 * o / 14, "px"),
          lineHeight: "".concat(20 * o / 14, "px"),
          borderRadius: "".concat(3 * o / 14, "px")
        }
      },
      splitorStyle: function() {
        var t = this.splitorColor,
          e = this.fontSize,
          o = this.backgroundColor;
        return {
          color: t,
          fontSize: "".concat(12 * e / 14, "px"),
          margin: o ? "".concat(4 * e / 14, "px") : ""
        }
      }
    },
    watch: {
      day: function(t) {
        this.changeFlag()
      },
      hour: function(t) {
        this.changeFlag()
      },
      minute: function(t) {
        this.changeFlag()
      },
      second: function(t) {
        this.changeFlag()
      },
      start: {
        immediate: !0,
        handler: function(t, e) {
          if (t) this.startData();
          else {
            if (!e) return;
            clearInterval(this.timer)
          }
        }
      }
    },
    created: function(t) {
      this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second), this.countDown()
    },
    unmounted: function() {
      clearInterval(this.timer)
    },
    methods: {
      toSeconds: function(t, e, o, n, i) {
        return t ? t - parseInt((new Date).getTime() / 1e3, 10) : 60 * e * 60 * 24 + 60 * o * 60 + 60 * n + i
      },
      timeUp: function() {
        clearInterval(this.timer), this.$emit("timeup")
      },
      countDown: function() {
        var t = this.seconds,
          e = 0,
          o = 0,
          n = 0,
          i = 0;
        t > 0 ? (e = Math.floor(t / 86400), o = Math.floor(t / 3600) - 24 * e, n = Math.floor(t / 60) - 24 * e * 60 - 60 * o, i = Math.floor(t) - 24 * e * 60 * 60 - 60 * o * 60 - 60 * n) : this.timeUp(), this.d = String(e).padStart(this.validFilterShow(this.filterShow.d), "0"), this.h = String(o).padStart(this.validFilterShow(this.filterShow.h), "0"), this.i = String(n).padStart(this.validFilterShow(this.filterShow.m), "0"), this.s = String(i).padStart(this.validFilterShow(this.filterShow.s), "0")
      },
      validFilterShow: function(t) {
        return t && t > 0 ? t : 2
      },
      startData: function() {
        var t = this;
        if (this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second), this.seconds <= 0) return this.seconds = this.toSeconds(0, 0, 0, 0, 0), void this.countDown();
        clearInterval(this.timer), this.countDown(), this.timer = setInterval((function() {
          t.seconds--, t.seconds < 0 ? t.timeUp() : t.countDown()
        }), 1e3)
      },
      update: function() {
        this.startData()
      },
      changeFlag: function() {
        this.syncFlag || (this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second), this.startData(), this.syncFlag = !0)
      }
    }
  };
var i = t._export_sfc(n, [
  ["render", function(e, o, n, i, s, r) {
    return t.e({
      a: n.showDay
    }, n.showDay ? {
      b: t.t(s.d),
      c: t.s(r.timeStyle)
    } : {}, {
      d: n.showDay
    }, n.showDay ? {
      e: t.t(r.dayText),
      f: t.s(r.splitorStyle)
    } : {}, {
      g: n.showHour
    }, n.showHour ? {
      h: t.t(s.h),
      i: t.s(r.timeStyle)
    } : {}, {
      j: n.showHour
    }, n.showHour ? {
      k: t.t(n.showColon ? ":" : r.hourText),
      l: t.s(r.splitorStyle)
    } : {}, {
      m: n.showMinute
    }, n.showMinute ? {
      n: t.t(s.i),
      o: t.s(r.timeStyle)
    } : {}, {
      p: n.showMinute
    }, n.showMinute ? {
      q: t.t(n.showColon ? ":" : r.minuteText),
      r: t.s(r.splitorStyle)
    } : {}, {
      s: t.t(s.s),
      t: t.s(r.timeStyle),
      v: !n.showColon
    }, n.showColon ? {} : {
      w: t.t(r.secondText),
      x: t.s(r.splitorStyle)
    })
  }],
  ["__scopeId", "data-v-d8982dea"],
  ["__file", "E:/project/TF/tf-wechat/src/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue"]
]);
wx.createComponent(i);