<script setup>
import { ref, computed, watch, nextTick } from "vue";

const props = defineProps({
  /** { kind, timeLabel, iso, text?, structured? } structured 为后端监控 JSON */
  entries: {
    type: Array,
    default: () => [],
  },
  /** 可视区域高度（px） */
  viewHeight: {
    type: Number,
    default: 280,
  },
  /** 每条日志占用高度（含 margin-bottom，用于滚动窗口计算） */
  rowStride: {
    type: Number,
    default: 108,
  },
  overscan: {
    type: Number,
    default: 6,
  },
  /**
   * true：完整展示每条正文（多行），日志框仅用 max-height + 内部滚动。
   * false：固定高度 + 虚拟列表 + 两行省略。
   */
  full: {
    type: Boolean,
    default: false,
  },
});

const scrollRoot = ref(null);
const scrollTop = ref(0);

/** 行内容区高度（stride 内扣除 margin-bottom） */
const rowInnerHeightPx = computed(() => `${Math.max(36, props.rowStride - 6)}px`);

const totalHeight = computed(() =>
  Math.max(0, props.entries.length * props.rowStride)
);

const visibleSlice = computed(() => {
  const rows = props.entries;
  const n = rows.length;
  const stride = props.rowStride;
  const vh = props.viewHeight;
  const st = scrollTop.value;
  const os = props.overscan;
  if (n === 0) {
    return { topPad: 0, bottomPad: 0, list: [], start: 0 };
  }
  let start = Math.floor(st / stride) - os;
  if (start < 0) start = 0;
  let end = Math.ceil((st + vh) / stride) + os;
  if (end > n) end = n;
  return {
    topPad: start * stride,
    bottomPad: (n - end) * stride,
    list: rows.slice(start, end),
    start,
  };
});

function onScroll(e) {
  scrollTop.value = e.target.scrollTop;
}

function onScrollMaybeVirtual(e) {
  if (props.full) return;
  onScroll(e);
}

const EVENT_TITLE = {
  sku_missing: "规格未找到",
  place_intent: "提交订单",
  stock_available: "监测到有货",
  place_ok: "下单成功",
  place_fail: "下单失败",
  proxy_fetch_fail: "取线路失败",
  proxy_retry: "换线重试",
  direct_skip: "跳过（未走代理）",
  wave_fail: "本波失败",
  shared_monitor: "共用轮询",
  account_missing: "账号缺失",
  skip_inactive: "已跳过",
  no_address: "无收货地址",
  shelf_incomplete: "货架数据不完整",
  bad_price: "价格无效",
  task_reflow_start: "回流启动",
  task_scheduled_wait: "定时等待",
  task_scheduled_begin: "定时开始",
  task_scheduled_end: "定时结束",
  task_stop: "已停止",
  text: "备注",
  unknown: "日志",
};

function monitorCardTitle(ev) {
  if (!ev || !ev.event) return "日志";
  return EVENT_TITLE[ev.event] || ev.event;
}

function proxyChip(ev) {
  if (ev.proxyUsed === false) return "直连官方";
  if (ev.proxyHost != null && ev.proxyPort != null)
    return `${ev.proxyHost}:${ev.proxyPort}`;
  return ev.proxyUsed ? "代理" : "直连官方";
}

/** 虚拟列表非 full 模式下的单行摘要 */
function rowVirtualPreview(row) {
  if (!row.structured) return row.text || "";
  const e = row.structured;
  if (e.event === "shelf_poll") {
    const parts = (e.watched || []).map(
      (w) => `SKU${w.skuId} 现货${w.stock ?? "—"} 要买${w.need}`
    );
    return `G${e.goodsId} · ${e.skuCount}规格 ${parts.join(" · ")}`;
  }
  if (e.event === "stock_available") {
    const t = e.goodsTitle ? String(e.goodsTitle) : "";
    return `G${e.goodsId} 有货 ${e.hitCount ?? 0} 路${t ? ` · ${t}` : ""}`;
  }
  return `${monitorCardTitle(e)}${e.taskLabel ? ` · ${e.taskLabel}` : ""}`;
}

/** 新日志从顶部插入、且滚动条贴近顶部时，保持日志框内贴顶（仅 nextTick，不用 async/多等一帧） */
watch(
  () => props.entries.length,
  (len, prev) => {
    if (len <= prev) return;
    nextTick(() => {
      const el = scrollRoot.value;
      if (!el) return;
      if (props.full) {
        if (el.scrollTop < 24) el.scrollTop = 0;
        return;
      }
      if (scrollTop.value < props.rowStride * 2) el.scrollTop = 0;
    });
  }
);
</script>

<template>
  <div
    ref="scrollRoot"
    class="log-scroll"
    :class="full ? 'log-scroll-full' : 'log-scroll-virtual'"
    :style="
      full ? { maxHeight: `${viewHeight}px` } : { height: `${viewHeight}px` }
    "
    @scroll="onScrollMaybeVirtual"
  >
    <template v-if="entries.length">
      <template v-if="full">
        <div
          v-for="(row, i) in entries"
          :key="`${row.timeLabel}\0${row.text}\0${row.structured?.at}\0${row.structured?.event}\0${i}`"
          class="log-row log-row-full"
          :class="row.kind ? 'log-row-' + row.kind : ''"
        >
          <div
            class="log-row-head"
            :class="{
              'log-row-head-split': row.structured?.durationMs != null,
            }"
          >
            <time
              class="log-time"
              :title="row.iso || row.timeLabel"
              :datetime="row.iso || undefined"
              >{{ row.timeLabel }}</time
            >
            <span
              v-if="row.structured?.durationMs != null"
              class="log-latency mono"
              :class="{
                'log-latency-slow':
                  Number(row.structured.durationMs) > 1000,
              }"
              >{{ row.structured.durationMs }} ms</span
            >
          </div>
          <div class="log-row-body">
            <template v-if="row.structured">
              <div class="monitor-card">
                <div
                  v-if="row.structured.event !== 'shelf_poll'"
                  class="monitor-card-top"
                >
                  <span class="monitor-pill">{{
                    monitorCardTitle(row.structured)
                  }}</span>
                  <template v-if="row.structured.taskLabel">
                    <span class="monitor-task">{{
                      row.structured.taskLabel
                    }}</span>
                  </template>
                  <span
                    v-else-if="row.structured.taskIdShort"
                    class="monitor-task mono"
                    >任务 {{ row.structured.taskIdShort }}</span
                  >
                </div>

                <template v-if="row.structured.event === 'shelf_poll'">
                  <div class="monitor-shelf-head">
                    <span class="mono shelf-gid"
                      >G {{ row.structured.goodsId }}</span
                    >
                    <span class="monitor-shelf-meta">
                      {{ row.structured.skuCount }} 规格 ·
                      <span class="mono">{{
                        proxyChip(row.structured)
                      }}</span>
                    </span>
                  </div>
                  <div
                    v-if="row.structured.watched?.length"
                    class="monitor-sku-table"
                  >
                    <div
                      v-for="(w, wi) in row.structured.watched"
                      :key="wi"
                      class="monitor-sku-line"
                    >
                      <span class="mono col-sku">SKU {{ w.skuId }}</span>
                      <span class="col-stock"
                        >现货 <em>{{ w.stock ?? "—" }}</em></span
                      >
                      <span class="col-need"
                        >要买 <em>{{ w.need }}</em></span
                      >
                    </div>
                  </div>
                </template>

                <template v-if="row.structured.event === 'sku_missing'">
                  <div class="monitor-meta">
                    <span class="mono">SKU {{ row.structured.skuId }}</span>
                    <span>接口共 {{ row.structured.skuCount }} 规格</span>
                    <span class="mono">{{ proxyChip(row.structured) }}</span>
                  </div>
                </template>

                <template v-if="row.structured.event === 'stock_available'">
                  <div class="monitor-meta">
                    <span class="mono">G {{ row.structured.goodsId }}</span>
                    <span v-if="row.structured.goodsTitle">{{
                      row.structured.goodsTitle
                    }}</span>
                    <span>{{ row.structured.hitCount }} 路库存达标</span>
                    <span
                      v-if="row.structured.shelfFetchMs != null"
                      class="monitor-note"
                      >拉架 {{ row.structured.shelfFetchMs }} ms</span
                    >
                  </div>
                  <ul
                    v-if="row.structured.hits?.length"
                    class="stock-hits-list"
                  >
                    <li
                      v-for="(h, i) in row.structured.hits"
                      :key="i"
                      class="stock-hit-li"
                    >
                      <span>{{ h.taskLabel }}</span>
                      <span class="mono"
                        >SKU {{ h.skuId }} 现货 {{ h.stock }} / 要买
                        {{ h.need }}</span
                      >
                      <span v-if="h.skuName" class="monitor-note">{{
                        h.skuName
                      }}</span>
                    </li>
                  </ul>
                </template>

                <template
                  v-if="
                    ['place_intent', 'place_ok', 'skip_inactive'].includes(
                      row.structured.event
                    )
                  "
                >
                  <div class="monitor-meta">
                    <span v-if="row.structured.skuId != null" class="mono"
                      >SKU {{ row.structured.skuId }}</span
                    >
                    <span
                      v-if="
                        row.structured.stock != null &&
                        row.structured.event !== 'place_ok'
                      "
                      >现货 {{ row.structured.stock }}</span
                    >
                    <span v-if="row.structured.need != null"
                      >要买 {{ row.structured.need }}</span
                    >
                    <span
                      v-if="
                        row.structured.event === 'place_intent' &&
                        row.structured.placeFanout > 1
                      "
                      class="monitor-note"
                      >并发 {{ row.structured.placeFanout }} 次</span
                    >
                    <span
                      v-if="row.structured.addressFrom"
                      class="monitor-note"
                      >地址：{{
                        row.structured.addressFrom === "task_snapshot"
                          ? "任务快照"
                          : "地址簿"
                      }}</span
                    >
                    <span
                      v-if="row.structured.proxyUsed != null"
                      class="mono"
                      >{{ proxyChip(row.structured) }}</span
                    >
                  </div>
                </template>

                <template v-if="row.structured.event === 'place_ok'">
                  <pre
                    v-if="row.structured.snippet"
                    class="monitor-snippet"
                    >{{ row.structured.snippet }}</pre
                  >
                </template>

                <template v-if="row.structured.event === 'place_fail'">
                  <div class="monitor-meta">
                    <span v-if="row.structured.timeoutHint" class="monitor-note"
                      >疑似代理/超时</span
                    >
                  </div>
                  <pre
                    v-if="row.structured.body"
                    class="monitor-snippet"
                    >{{ row.structured.body }}</pre
                  >
                </template>

                <template
                  v-if="
                    ['wave_fail', 'proxy_fetch_fail', 'proxy_retry'].includes(
                      row.structured.event
                    )
                  "
                >
                  <div class="monitor-meta">
                    <span v-if="row.structured.attempt != null"
                      >{{ row.structured.attempt }}/{{
                        row.structured.maxAttempts
                      }}</span
                    >
                  </div>
                  <pre
                    v-if="row.structured.message"
                    class="monitor-snippet"
                    >{{ row.structured.message }}</pre
                  >
                  <pre
                    v-else-if="row.structured.body"
                    class="monitor-snippet"
                    >{{ row.structured.body }}</pre
                  >
                </template>

                <template
                  v-if="
                    [
                      'task_reflow_start',
                      'task_scheduled_wait',
                      'task_scheduled_begin',
                      'task_scheduled_end',
                      'task_stop',
                      'shared_monitor',
                      'direct_skip',
                      'no_address',
                      'shelf_incomplete',
                      'bad_price',
                      'account_missing',
                    ].includes(row.structured.event)
                  "
                >
                  <div class="monitor-meta monitor-meta-wrap">
                    <span v-if="row.structured.goodsId != null" class="mono"
                      >G {{ row.structured.goodsId }}</span
                    >
                    <span v-if="row.structured.goodsTitle">{{
                      row.structured.goodsTitle
                    }}</span>
                    <span v-if="row.structured.intervalMs != null"
                      >间隔 {{ row.structured.intervalMs }} ms</span
                    >
                    <span v-if="row.structured.durationSec != null"
                      >持续 {{ row.structured.durationSec }} s</span
                    >
                    <span v-if="row.structured.scheduledAt" class="mono">{{
                      row.structured.scheduledAt
                    }}</span>
                    <span v-if="row.structured.delaySec != null"
                      >约 {{ row.structured.delaySec }} s 后启动</span
                    >
                    <span v-if="row.structured.missing" class="monitor-note">{{
                      row.structured.missing
                    }}</span>
                  </div>
                </template>
              </div>
            </template>
            <span v-else class="log-text log-text-full">{{ row.text }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="log-virtual-sizer" :style="{ height: `${totalHeight}px` }">
          <div
            class="log-virtual-window"
            :style="{
              paddingTop: `${visibleSlice.topPad}px`,
              paddingBottom: `${visibleSlice.bottomPad}px`,
            }"
          >
            <div
              v-for="(row, i) in visibleSlice.list"
              :key="visibleSlice.start + i"
              class="log-row log-row-virtual"
              :class="row.kind ? 'log-row-' + row.kind : ''"
            >
              <div
                class="log-row-head log-row-head-compact"
                :class="{
                  'log-row-head-split': row.structured?.durationMs != null,
                }"
              >
                <time
                  class="log-time"
                  :title="row.iso || row.timeLabel"
                  :datetime="row.iso || undefined"
                  >{{ row.timeLabel }}</time
                >
                <span
                  v-if="row.structured?.durationMs != null"
                  class="log-latency mono"
                  :class="{
                    'log-latency-slow':
                      Number(row.structured.durationMs) > 1000,
                  }"
                  >{{ row.structured.durationMs }} ms</span
                >
              </div>
              <div class="log-row-body">
                <span
                  class="log-text log-text-virtual"
                  :title="rowVirtualPreview(row)"
                  >{{ rowVirtualPreview(row) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <el-text v-else type="info" size="small">暂无日志</el-text>
  </div>
</template>

<style scoped>
.log-scroll-virtual {
  overflow-y: auto;
  overflow-x: hidden;
}
.log-scroll-full {
  overflow-x: hidden;
  overflow-y: auto;
}
.log-scroll-virtual,
.log-scroll-full {
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  padding: 8px;
  background: var(--el-fill-color-blank);
  box-sizing: border-box;
}
.log-virtual-sizer {
  position: relative;
  width: 100%;
}
.log-virtual-window {
  position: relative;
  left: 0;
  right: 0;
}
.log-row {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--el-fill-color-light);
  border-left: 3px solid var(--el-border-color);
  box-sizing: border-box;
}
.log-row-head {
  flex-shrink: 0;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.log-row-head-split {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}
.log-row-head-split .log-time {
  min-width: 0;
}
.log-latency {
  flex-shrink: 0;
  font-size: 0.72rem;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
}
.log-latency-slow {
  color: var(--el-color-danger);
  font-weight: 600;
}
.log-row-head-compact {
  padding-bottom: 4px;
  margin-bottom: 4px;
}
.log-row-body {
  min-width: 0;
  flex: 1;
  min-height: 0;
}
.log-row-virtual {
  height: v-bind(rowInnerHeightPx);
  margin-bottom: 6px;
}
.log-row-full {
  margin-bottom: 8px;
  content-visibility: auto;
  contain-intrinsic-size: 64px;
}
.log-row-ok {
  border-left-color: var(--el-color-success);
}
.log-row-stock {
  border-left-color: var(--el-color-success);
  background: var(--el-color-success-light-9);
}
.log-row-err {
  border-left-color: var(--el-color-danger);
}
.log-row-warn {
  border-left-color: var(--el-color-warning);
}
.log-row-info {
  border-left-color: var(--el-color-primary);
}
.log-time {
  display: block;
  font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  font-size: 0.75rem;
  color: var(--el-text-color-secondary);
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.log-text {
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--el-text-color-primary);
  word-break: break-word;
  overflow-wrap: anywhere;
}
.log-text-virtual {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.log-text-full {
  white-space: pre-wrap;
  word-break: break-word;
}
.mono {
  font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  font-size: 0.78rem;
}
.monitor-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.monitor-card-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 10px;
}
.monitor-pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  border: 1px solid var(--el-color-primary-light-5);
}
.monitor-title {
  font-weight: 600;
  color: var(--el-text-color-regular);
}
.monitor-gtitle {
  flex: 1 1 12rem;
  min-width: 0;
  font-size: 0.78rem;
  color: var(--el-text-color-primary);
  line-height: 1.35;
}
.monitor-task {
  font-size: 0.78rem;
  color: var(--el-text-color-regular);
}
.monitor-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  font-size: 0.75rem;
  color: var(--el-text-color-secondary);
  align-items: center;
}
.monitor-meta-wrap {
  line-height: 1.45;
}
.monitor-note {
  color: var(--el-text-color-secondary);
  font-style: italic;
}
.monitor-shelf-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.shelf-gid {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--el-text-color-primary);
}
.monitor-shelf-meta {
  font-size: 0.72rem;
  color: var(--el-text-color-secondary);
  line-height: 1.45;
}
.monitor-sku-table {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 2px;
  padding-top: 8px;
  border-top: 1px solid var(--el-border-color-lighter);
}
.monitor-sku-line {
  display: grid;
  grid-template-columns: minmax(7rem, 1.2fr) auto auto;
  align-items: baseline;
  gap: 8px 14px;
  font-size: 0.78rem;
  color: var(--el-text-color-primary);
}
.col-sku {
  font-weight: 500;
}
.col-stock em,
.col-need em {
  font-style: normal;
  font-weight: 600;
  color: var(--el-color-primary);
}
.monitor-snippet {
  margin: 0;
  padding: 8px 10px;
  max-height: 7rem;
  overflow: auto;
  font-size: 0.72rem;
  line-height: 1.4;
  border-radius: 6px;
  background: var(--el-fill-color-dark);
  color: var(--el-text-color-primary);
  white-space: pre-wrap;
  word-break: break-word;
}
.stock-hits-list {
  margin: 6px 0 0;
  padding-left: 1.15rem;
  list-style: disc;
  font-size: 0.74rem;
  line-height: 1.45;
}
.stock-hit-li {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  align-items: baseline;
  margin-bottom: 4px;
}
</style>
