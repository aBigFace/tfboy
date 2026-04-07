<script setup>
import { ref, reactive, watch, computed, onMounted, onUnmounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import http from "../api/http";
import { io } from "socket.io-client";
import RushLogVirtualList from "../components/RushLogVirtualList.vue";
import previewMp3Url from "../assets/preview.mp3";

const LS_TASK_DRAFT = "tf_rush_task_draft_v1";
const LS_LAST_USER = "tf_rush_last_username";

/** 有货：后端为「有货（现货」；兼容半角括号；排除「没有货」「无货…」误匹配 */
const RUSH_LOG_STOCK_RE =
  /(?<![没无])有货(?:\uFF08|\()现货|有货，接着/;

/** 小程序 orderList：待付款订单 createTime + 600s + diffentTime 后视为超时；Web 端无 diffentTime 缓存时用 600s */
const ORDER_UNPAID_CANCEL_SEC = 600;

/** 与 orderList handleChangeTabbar 一致：切 tab 时统一 state=-1（首屏初始为 0，与点「全部」tab 的 -1 略有不同，此处按 tab 行为） */
const ORDER_LIST_TABS = [
  { id: "all", label: "全部", body: { state: -1, tabType: 0 } },
  { id: "unpaid", label: "待付款", body: { state: -1, tabType: 4 } },
  { id: "ship", label: "待发货", body: { state: -1, tabType: 1 } },
  { id: "recv", label: "待收货", body: { state: -1, tabType: 2 } },
  { id: "done", label: "已完成", body: { state: -1, tabType: 3 } },
];

/** 本地时间 `YYYY-MM-DD HH:mm:ss.SSS`（空格 + 精确到毫秒），作定时开始时间默认 */
function formatLocalDatetime(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const padMs = (n) => String(n).padStart(3, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${padMs(d.getMilliseconds())}`;
}

const accounts = ref([]);
const tasks = ref([]);
/** 任务列表多选（一键启动） */
const taskTableRef = ref(null);
const selectedTasks = ref([]);
/** 与后端一致最多保留条数（仅内存）；展示用解析结果增量更新，避免每条推送全量 parse */
const MAX_TASK_LOG_LINES = 400;
/** 与 rushEngine MAX_PLACE_RECORDS 一致；Socket 合并 placeRecords 时淘汰最旧 */
const MAX_TASK_PLACE_RECORDS = 80;
/** 全局监控日志：解析结果 ref，新行仅 prepend 一条解析 */
const monitorLogParsed = ref([]);
const err = ref("");
const ok = ref("");

const goodsRecords = ref([]);
const skuRecords = ref([]);
const addressRecords = ref([]);
const shelfDetail = ref(null);
const pickLoading = ref({ goods: false, sku: false, addr: false });

/** 修改任务弹窗（独立表单与下拉数据，避免与「新建任务」互相覆盖） */
const editModalOpen = ref(false);
const editTaskId = ref(null);
const editRestorePaused = ref(false);
const editForm = ref({
  name: "",
  accountId: "",
  goodsId: "",
  skuId: "",
  quantity: 1,
  addressBookId: "",
  mode: "reflow",
  pollIntervalMs: 500,
  scheduledAt: formatLocalDatetime(),
  scheduledDurationSec: 60,
});
const editGoodsRecords = ref([]);
const editSkuRecords = ref([]);
const editAddressRecords = ref([]);
const editPickLoading = ref({ goods: false, sku: false, addr: false });
const editSaving = ref(false);

/** 查询订单弹窗（pageQueryV2 带抢购账号 token；取消订单同上） */
const ORDER_LIST_PAGE_SIZE = 20;

const orderListModal = ref({
  open: false,
  accountId: "",
  username: "",
  filterId: "all",
  pageNum: 1,
  pageSize: ORDER_LIST_PAGE_SIZE,
  loading: false,
  err: "",
  records: [],
  total: null,
});

/** 弹窗内倒计时用「当前时刻」，每秒更新以驱动待付款剩余时间 */
const orderListNow = ref(Date.now());
let orderListTick = null;
/** 正在取消的订单 id（列表行 row.id），用于按钮防重复 */
const orderCancelSubmittingId = ref(null);
/** 从 localStorage 恢复草稿时跳过级联 watch，避免误清空 */
const restorePaused = ref(false);

/** Socket.IO 客户端，命名空间 /rush-monitor，path=/socket.io */
let monitorSocket = null;
let draftSaveTimer = null;

const accForm = ref({ username: "", password: "", remark: "" });
const taskForm = ref({
  name: "",
  accountId: "",
  goodsId: "",
  skuId: "",
  quantity: 1,
  addressBookId: "",
  mode: "reflow",
  pollIntervalMs: 500,
  scheduledAt: formatLocalDatetime(),
  /** 定时模式：从开始执行算起，持续多少秒后自动停 */
  scheduledDurationSec: 60,
});

async function loadRushGoods() {
  const id = taskForm.value.accountId;
  if (!id) {
    goodsRecords.value = [];
    return;
  }
  pickLoading.value.goods = true;
  try {
    const { data } = await http.post(`/api/rush/accounts/${id}/goods-page-list`, {});
    if (!data.ok) throw new Error(data.message || "商品列表失败");
    goodsRecords.value = data.data?.data?.records ?? [];
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    goodsRecords.value = [];
  } finally {
    pickLoading.value.goods = false;
  }
}

async function loadRushSku() {
  const acc = taskForm.value.accountId;
  const gid = taskForm.value.goodsId;
  if (!acc || gid === "" || gid == null) {
    skuRecords.value = [];
    shelfDetail.value = null;
    return;
  }
  pickLoading.value.sku = true;
  try {
    const { data } = await http.get(`/api/rush/accounts/${acc}/sku/${gid}`);
    if (!data.ok) throw new Error(data.message || "SKU 失败");
    const detail = data.data?.data ?? data.data;
    shelfDetail.value = detail;
    skuRecords.value = detail?.goodsSkuList ?? [];
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    skuRecords.value = [];
    shelfDetail.value = null;
  } finally {
    pickLoading.value.sku = false;
  }
}

async function loadRushAddresses() {
  const id = taskForm.value.accountId;
  if (!id) {
    addressRecords.value = [];
    return;
  }
  pickLoading.value.addr = true;
  try {
    const { data } = await http.post(`/api/rush/accounts/${id}/address-list`, {});
    if (!data.ok) throw new Error(data.message || "地址列表失败");
    addressRecords.value = data.data?.data?.records ?? [];
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    addressRecords.value = [];
  } finally {
    pickLoading.value.addr = false;
  }
}

/** 当前 taskForm 已选好账号时：并行拉商品 + 地址（联动核心，多处复用） */
async function loadGoodsAndAddressesForAccount() {
  const id = taskForm.value.accountId;
  if (!id) return;
  await Promise.all([loadRushGoods(), loadRushAddresses()]);
}

function clearTaskCascadeFields() {
  taskForm.value.goodsId = "";
  taskForm.value.skuId = "";
  taskForm.value.addressBookId = "";
  skuRecords.value = [];
  shelfDetail.value = null;
  goodsRecords.value = [];
  addressRecords.value = [];
}

watch(
  () => taskForm.value.accountId,
  async (newId) => {
    if (restorePaused.value) return;
    clearTaskCascadeFields();
    err.value = "";
    if (!newId) return;
    await loadGoodsAndAddressesForAccount();
  }
);

watch(
  () => taskForm.value.goodsId,
  async () => {
    if (restorePaused.value) return;
    taskForm.value.skuId = "";
    err.value = "";
    await loadRushSku();
  }
);

function scheduleSaveTaskDraft() {
  if (restorePaused.value) return;
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(() => {
    try {
      const t = taskForm.value;
      localStorage.setItem(
        LS_TASK_DRAFT,
        JSON.stringify({
          accountId: t.accountId,
          name: t.name,
          goodsId: t.goodsId,
          skuId: t.skuId,
          quantity: t.quantity,
          addressBookId: t.addressBookId,
          mode: t.mode,
          pollIntervalMs: t.pollIntervalMs,
          scheduledDurationSec: t.scheduledDurationSec,
        })
      );
    } catch {
      /* quota / private mode */
    }
  }, 400);
}

watch(taskForm, scheduleSaveTaskDraft, { deep: true });

watch(
  () => taskForm.value.mode,
  (m) => {
    if (m !== "scheduled") return;
    /** 定时模式开始时间默认始终为「当前这一刻」（含毫秒），避免草稿里冻住旧时间 */
    taskForm.value.scheduledAt = formatLocalDatetime();
    if (!Number(taskForm.value.pollIntervalMs) || Number(taskForm.value.pollIntervalMs) < 50) {
      taskForm.value.pollIntervalMs = 500;
    }
  }
);

function clearEditCascadeFields() {
  editForm.value.goodsId = "";
  editForm.value.skuId = "";
  editForm.value.addressBookId = "";
  editSkuRecords.value = [];
  editGoodsRecords.value = [];
  editAddressRecords.value = [];
}

async function loadEditGoods() {
  const id = editForm.value.accountId;
  if (!id) {
    editGoodsRecords.value = [];
    return;
  }
  editPickLoading.value.goods = true;
  try {
    const { data } = await http.post(`/api/rush/accounts/${id}/goods-page-list`, {});
    if (!data.ok) throw new Error(data.message || "商品列表失败");
    editGoodsRecords.value = data.data?.data?.records ?? [];
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    editGoodsRecords.value = [];
  } finally {
    editPickLoading.value.goods = false;
  }
}

async function loadEditSku() {
  const acc = editForm.value.accountId;
  const gid = editForm.value.goodsId;
  if (!acc || gid === "" || gid == null) {
    editSkuRecords.value = [];
    return;
  }
  editPickLoading.value.sku = true;
  try {
    const { data } = await http.get(`/api/rush/accounts/${acc}/sku/${gid}`);
    if (!data.ok) throw new Error(data.message || "SKU 失败");
    const detail = data.data?.data ?? data.data;
    editSkuRecords.value = detail?.goodsSkuList ?? [];
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    editSkuRecords.value = [];
  } finally {
    editPickLoading.value.sku = false;
  }
}

async function loadEditAddresses() {
  const id = editForm.value.accountId;
  if (!id) {
    editAddressRecords.value = [];
    return;
  }
  editPickLoading.value.addr = true;
  try {
    const { data } = await http.post(`/api/rush/accounts/${id}/address-list`, {});
    if (!data.ok) throw new Error(data.message || "地址列表失败");
    editAddressRecords.value = data.data?.data?.records ?? [];
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    editAddressRecords.value = [];
  } finally {
    editPickLoading.value.addr = false;
  }
}

async function loadEditGoodsAndAddresses() {
  const id = editForm.value.accountId;
  if (!id) return;
  await Promise.all([loadEditGoods(), loadEditAddresses()]);
}

watch(
  () => editForm.value.accountId,
  async (newId) => {
    if (!editModalOpen.value || editRestorePaused.value) return;
    clearEditCascadeFields();
    err.value = "";
    if (!newId) return;
    await loadEditGoodsAndAddresses();
  }
);

watch(
  () => editForm.value.goodsId,
  async () => {
    if (!editModalOpen.value || editRestorePaused.value) return;
    editForm.value.skuId = "";
    err.value = "";
    await loadEditSku();
  }
);

watch(
  () => editForm.value.mode,
  (m) => {
    if (!editModalOpen.value || editRestorePaused.value) return;
    if (m !== "scheduled") return;
    editForm.value.scheduledAt = formatLocalDatetime();
    if (!Number(editForm.value.pollIntervalMs) || Number(editForm.value.pollIntervalMs) < 50) {
      editForm.value.pollIntervalMs = 500;
    }
  }
);

async function openEditTask(t) {
  if (t.running) {
    err.value = "运行中无法修改，请先停止";
    return;
  }
  err.value = "";
  editRestorePaused.value = true;
  editModalOpen.value = true;
  editTaskId.value = t.id;
  editForm.value = {
    name: t.name ?? "",
    accountId: t.accountId,
    goodsId: t.goodsId === "" || t.goodsId == null ? "" : t.goodsId,
    skuId: t.skuId === "" || t.skuId == null ? "" : t.skuId,
    quantity: Number(t.quantity) > 0 ? Number(t.quantity) : 1,
    addressBookId:
      t.addressBookId != null && t.addressBookId !== ""
        ? String(t.addressBookId)
        : "",
    mode: t.mode === "scheduled" ? "scheduled" : "reflow",
    pollIntervalMs: Number(t.pollIntervalMs) >= 50 ? Number(t.pollIntervalMs) : 500,
    scheduledAt:
      t.scheduledAt && String(t.scheduledAt).trim()
        ? String(t.scheduledAt)
        : formatLocalDatetime(),
    scheduledDurationSec:
      Number(t.scheduledDurationSec) >= 1 ? Number(t.scheduledDurationSec) : 60,
  };
  editGoodsRecords.value = [];
  editSkuRecords.value = [];
  editAddressRecords.value = [];
  if (!editForm.value.accountId || !accounts.value.some((a) => a.id === editForm.value.accountId)) {
    editRestorePaused.value = false;
    err.value = "任务关联账号已不存在";
    return;
  }
  await loadEditGoodsAndAddresses();
  if (editForm.value.goodsId !== "" && editForm.value.goodsId != null) {
    const gid = Number(editForm.value.goodsId);
    if (!editGoodsRecords.value.some((g) => g.goodsId === gid)) {
      editForm.value.goodsId = "";
      editForm.value.skuId = "";
    }
  }
  if (editForm.value.goodsId !== "" && editForm.value.goodsId != null) {
    await loadEditSku();
  }
  if (
    editForm.value.skuId !== "" &&
    editForm.value.skuId != null &&
    !editSkuRecords.value.some((s) => s.id === Number(editForm.value.skuId))
  ) {
    editForm.value.skuId = "";
  }
  editRestorePaused.value = false;
}

function closeEditTaskModal() {
  editModalOpen.value = false;
}

function onEditDialogClosed() {
  editTaskId.value = null;
  editSaving.value = false;
}

async function saveEditTask() {
  const id = editTaskId.value;
  if (!id) return;
  err.value = "";
  ok.value = "";
  if (!editForm.value.accountId) {
    err.value = "请选择账号";
    return;
  }
  if (editForm.value.goodsId === "" || editForm.value.goodsId == null) {
    err.value = "请选择商品";
    return;
  }
  if (editForm.value.skuId === "" || editForm.value.skuId == null) {
    err.value = "请选择规格 SKU";
    return;
  }
  if (editForm.value.mode === "scheduled") {
    if (!String(editForm.value.scheduledAt || "").trim()) {
      err.value = "定时模式请填写开始时间 scheduledAt";
      return;
    }
    if (
      !Number(editForm.value.scheduledDurationSec) ||
      Number(editForm.value.scheduledDurationSec) < 1
    ) {
      err.value = "定时模式持续秒数须 ≥ 1";
      return;
    }
  }
  if (editForm.value.mode === "reflow" || editForm.value.mode === "scheduled") {
    if (
      !Number(editForm.value.pollIntervalMs) ||
      Number(editForm.value.pollIntervalMs) < 50
    ) {
      err.value =
        editForm.value.mode === "scheduled"
          ? "定时模式波次间隔须 ≥ 50ms"
          : "回流模式轮询间隔须 ≥ 50ms";
      return;
    }
  }
  const gid = Number(editForm.value.goodsId);
  const sid = Number(editForm.value.skuId);
  const g = editGoodsRecords.value.find((x) => x.goodsId === gid);
  const s = editSkuRecords.value.find((x) => x.id === sid);
  const goodsName =
    g && (g.name || g.saleName) ? String(g.name || g.saleName).trim() : "";
  let skuName = "";
  if (s) {
    const parts = [s.skuName != null ? String(s.skuName).trim() : ""];
    if (s.sellPrice != null && s.sellPrice !== "") parts.push(`¥${s.sellPrice}`);
    skuName = parts.filter(Boolean).join(" · ");
  }

  const body = {
    name: editForm.value.name,
    accountId: editForm.value.accountId,
    goodsId: gid,
    skuId: sid,
    goodsName: goodsName || undefined,
    skuName: skuName || undefined,
    quantity: editForm.value.quantity,
    mode: editForm.value.mode,
    pollIntervalMs:
      editForm.value.mode === "reflow" || editForm.value.mode === "scheduled"
        ? Math.max(50, Math.floor(Number(editForm.value.pollIntervalMs)))
        : undefined,
    scheduledAt:
      editForm.value.mode === "scheduled" ? editForm.value.scheduledAt : undefined,
    scheduledDurationSec:
      editForm.value.mode === "scheduled"
        ? editForm.value.scheduledDurationSec
        : undefined,
  };
  if (
    editForm.value.addressBookId !== "" &&
    editForm.value.addressBookId != null
  )
    body.addressBookId = Number(editForm.value.addressBookId);
  body.addressBookSnapshot =
    buildAddressBookSnapshot(
      editAddressRecords.value,
      editForm.value.addressBookId
    ) ?? null;

  editSaving.value = true;
  try {
    await http.put(`/api/rush/tasks/${encodeURIComponent(String(id))}`, body);
    ok.value = "任务已更新";
    closeEditTaskModal();
    await loadTasks();
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
  } finally {
    editSaving.value = false;
  }
}

async function applyTaskDraftFromStorage() {
  let raw;
  try {
    raw = localStorage.getItem(LS_TASK_DRAFT);
  } catch {
    return;
  }
  if (!raw) return;
  let draft;
  try {
    draft = JSON.parse(raw);
  } catch {
    return;
  }
  if (!draft || typeof draft !== "object") return;

  restorePaused.value = true;
  clearTaskCascadeFields();
  taskForm.value.accountId = draft.accountId || "";
  taskForm.value.name = draft.name ?? "";
  taskForm.value.goodsId =
    draft.goodsId === "" || draft.goodsId == null ? "" : draft.goodsId;
  taskForm.value.skuId =
    draft.skuId === "" || draft.skuId == null ? "" : draft.skuId;
  taskForm.value.quantity =
    Number(draft.quantity) > 0 ? Number(draft.quantity) : 1;
  taskForm.value.addressBookId =
    draft.addressBookId !== undefined &&
    draft.addressBookId !== null &&
    draft.addressBookId !== ""
      ? String(draft.addressBookId)
      : "";
  taskForm.value.mode = draft.mode === "scheduled" ? "scheduled" : "reflow";
  taskForm.value.pollIntervalMs =
    Number(draft.pollIntervalMs) >= 50 ? Number(draft.pollIntervalMs) : 500;
  if (taskForm.value.mode === "scheduled") {
    taskForm.value.scheduledAt = formatLocalDatetime();
  }
  const dur = Number(draft.scheduledDurationSec);
  taskForm.value.scheduledDurationSec =
    Number.isFinite(dur) && dur >= 1 ? Math.floor(dur) : 60;
  restorePaused.value = false;

  if (!taskForm.value.accountId) return;
  if (!accounts.value.some((a) => a.id === taskForm.value.accountId)) {
    taskForm.value.accountId = "";
    clearTaskCascadeFields();
    return;
  }
  await loadGoodsAndAddressesForAccount();
  if (taskForm.value.goodsId !== "" && taskForm.value.goodsId != null) {
    const gid = Number(taskForm.value.goodsId);
    if (!goodsRecords.value.some((g) => g.goodsId === gid)) {
      taskForm.value.goodsId = "";
      taskForm.value.skuId = "";
    }
  }
  if (taskForm.value.goodsId !== "" && taskForm.value.goodsId != null) {
    await loadRushSku();
  }
  if (
    taskForm.value.skuId !== "" &&
    taskForm.value.skuId != null &&
    !skuRecords.value.some((s) => s.id === Number(taskForm.value.skuId))
  ) {
    taskForm.value.skuId = "";
  }
}

async function loadAccounts() {
  const { data } = await http.get("/api/rush/accounts");
  if (!data.ok) throw new Error(data.message);
  accounts.value = data.data;
}

async function loadTasks() {
  const { data } = await http.get("/api/rush/tasks");
  if (!data.ok) throw new Error(data.message);
  tasks.value = data.data;
}

async function refreshAll() {
  err.value = "";
  try {
    await loadAccounts();
    await loadTasks();
    const sel = taskForm.value.accountId;
    if (sel) {
      const still = accounts.value.some((a) => a.id === sel);
      if (still) {
        await loadGoodsAndAddressesForAccount();
      } else {
        taskForm.value.accountId = "";
      }
    }
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
  }
}

async function addAccount() {
  err.value = "";
  ok.value = "";
  try {
    const username = String(accForm.value.username || "").trim();
    await http.post("/api/rush/accounts", {
      username,
      password: accForm.value.password,
      remark: String(accForm.value.remark || "").trim(),
    });
    accForm.value.password = "";
    accForm.value.remark = "";
    ok.value = "账号已保存并登录（服务端文件持久化）";
    try {
      if (username) localStorage.setItem(LS_LAST_USER, username);
    } catch {
      /* ignore */
    }
    await loadAccounts();
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
  }
}

async function removeAccount(id) {
  try {
    await ElMessageBox.confirm("删除账号及其任务？", "确认删除", {
      type: "warning",
      confirmButtonText: "删除",
      cancelButtonText: "取消",
    });
  } catch {
    return;
  }
  await http.delete(`/api/rush/accounts/${id}`);
  await refreshAll();
}

async function onAccountRemarkBlur(a) {
  err.value = "";
  try {
    const { data } = await http.patch(`/api/rush/accounts/${a.id}`, {
      remark: a.remark != null ? String(a.remark) : "",
    });
    if (data.ok && data.data?.remark != null) {
      const i = accounts.value.findIndex((x) => x.id === a.id);
      if (i >= 0) accounts.value[i].remark = data.data.remark;
    }
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    await loadAccounts();
  }
}

async function refreshToken(id) {
  err.value = "";
  await http.post(`/api/rush/accounts/${id}/refresh`);
  ok.value = "Token 已刷新";
  await loadAccounts();
  if (taskForm.value.accountId === id) {
    await loadGoodsAndAddressesForAccount();
  }
}

/** 与小程序 orderList.js + common.getOrderStatusDesc 一致 */
function orderListStatusDesc(row) {
  if (row.payState === 1 && row.orderState === 0) return "待付款";
  const o = row.orderState;
  switch (o) {
    case 0:
    case 1:
    case 3:
      return "待发货";
    case 2:
    case 10:
      return "已取消";
    case 4:
    case 5:
    case 6:
    case 7:
      return "待收货";
    case 8:
      return "交易成功";
    case 9:
      return "交易关闭";
    default:
      return o != null ? `状态码 ${o}` : "—";
  }
}

function orderListGoodsSummary(row) {
  const list = row.saleOrderProductInfos;
  if (!Array.isArray(list) || !list.length) return "—";
  const first = list[0];
  const name = first?.productName ?? first?.spuName ?? first?.goodsName ?? "";
  const extra = list.length > 1 ? ` 等${list.length}件` : "";
  return `${String(name).trim() || "商品"}${extra}`;
}

function buildOrderListBody() {
  const m = orderListModal.value;
  const tab = ORDER_LIST_TABS.find((x) => x.id === m.filterId);
  const filter = tab?.body ?? ORDER_LIST_TABS[0].body;
  return {
    searchName: "",
    timeValue: 1,
    sortFiled: 3,
    sortType: 2,
    pageNum: Math.max(1, Number(m.pageNum) || 1),
    pageSize: Math.max(1, Number(m.pageSize) || ORDER_LIST_PAGE_SIZE),
    ...filter,
  };
}

function orderListTotalPages() {
  const m = orderListModal.value;
  const t = m.total;
  const ps = m.pageSize || ORDER_LIST_PAGE_SIZE;
  if (t == null || !Number.isFinite(Number(t))) return 1;
  return Math.max(1, Math.ceil(Number(t) / ps));
}

function goOrderListPage(delta) {
  const max = orderListTotalPages();
  let p = orderListModal.value.pageNum + delta;
  if (p < 1) p = 1;
  if (p > max) p = max;
  if (p === orderListModal.value.pageNum) return;
  orderListModal.value.pageNum = p;
  fetchOrderListForModal();
}

/** 待付款：距自动取消剩余时间（与小程序 600s 窗口一致，未做 diffentTime 时钟校正） */
function orderPayCancelRemainingLabel(row) {
  if (row.payState !== 1 || row.orderState !== 0) return "—";
  const t = row.createTime;
  if (t == null || String(t).trim() === "") return "—";
  const created = new Date(t).getTime();
  if (Number.isNaN(created)) return "—";
  const deadline = created + ORDER_UNPAID_CANCEL_SEC * 1000;
  const ms = deadline - orderListNow.value;
  if (ms <= 0) return "已到支付时限";
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `剩余 ${pad(h)}:${pad(m)}:${pad(s)}`;
}

async function fetchOrderListForModal() {
  const id = orderListModal.value.accountId;
  if (!id) return;
  orderListModal.value.loading = true;
  orderListModal.value.err = "";
  try {
    const { data } = await http.post(
      `/api/rush/accounts/${id}/order-list`,
      buildOrderListBody()
    );
    if (!data.ok) throw new Error(data.message || "订单列表失败");
    const inner = data.data?.data ?? data.data;
    orderListModal.value.records = inner?.records ?? [];
    orderListModal.value.total =
      inner?.total != null ? inner.total : inner?.totalCount ?? null;
  } catch (e) {
    orderListModal.value.err =
      e.response?.data?.message || e.message || "请求失败";
    orderListModal.value.records = [];
    orderListModal.value.total = null;
  } finally {
    orderListModal.value.loading = false;
  }
}

function setOrderListFilterAndFetch(id) {
  orderListModal.value.filterId = id;
  orderListModal.value.pageNum = 1;
  fetchOrderListForModal();
}

async function openOrderListModal(acc) {
  const id = acc?.id;
  if (!id) return;
  orderListModal.value.open = true;
  orderListModal.value.accountId = id;
  orderListModal.value.username = acc.username || "";
  orderListModal.value.filterId = "all";
  orderListModal.value.pageNum = 1;
  orderListModal.value.pageSize = ORDER_LIST_PAGE_SIZE;
  orderListModal.value.err = "";
  orderListModal.value.records = [];
  orderListModal.value.total = null;
  await fetchOrderListForModal();
}

function closeOrderListModal() {
  orderListModal.value.open = false;
}

/** 与小程序一致：待付款可取消；TF- 开头订单需走 PC/公众号 */
function canCancelUnpaidOrder(row) {
  if (row.payState !== 1 || row.orderState !== 0) return false;
  if (row.id == null || row.id === "") return false;
  const no = row.saleOrderNo != null ? String(row.saleOrderNo) : "";
  if (no.startsWith("TF-")) return false;
  return true;
}

async function cancelUnpaidOrder(row) {
  if (!canCancelUnpaidOrder(row)) return;
  const accId = orderListModal.value.accountId;
  if (!accId) return;
  try {
    await ElMessageBox.confirm(
      `确定取消订单「${row.saleOrderNo || row.id}」？`,
      "取消订单",
      { type: "warning", confirmButtonText: "确定取消", cancelButtonText: "返回" }
    );
  } catch {
    return;
  }
  orderCancelSubmittingId.value = row.id;
  orderListModal.value.err = "";
  ok.value = "";
  try {
    const { data } = await http.post(`/api/rush/accounts/${accId}/cancel-order`, {
      orderId: row.id,
    });
    if (!data.ok) throw new Error(data.message || "取消失败");
    ok.value = "订单已取消";
    await fetchOrderListForModal();
  } catch (e) {
    orderListModal.value.err =
      e.response?.data?.message || e.message || "取消失败";
  } finally {
    orderCancelSubmittingId.value = null;
  }
}

/** 与后端 sanitize 字段一致；保存任务时写入，抢购时不再请求地址簿 */
function buildAddressBookSnapshot(records, addressBookId) {
  if (!Array.isArray(records) || !records.length) return null;
  let rec = null;
  if (addressBookId !== "" && addressBookId != null) {
    rec = records.find((r) => String(r.id) === String(addressBookId));
  }
  if (!rec) {
    rec =
      records.find((r) => r.bookDefaultStatus === 1) || records[0];
  }
  if (!rec) return null;
  return {
    id: rec.id,
    bookName: rec.bookName,
    bookPhone: rec.bookPhone,
    bookProvince: rec.bookProvince,
    bookCity: rec.bookCity,
    bookCounty: rec.bookCounty,
    bookAddress: rec.bookAddress,
    bookDefaultStatus: rec.bookDefaultStatus,
    bookType: rec.bookType,
  };
}

async function addTask() {
  err.value = "";
  ok.value = "";
  if (!taskForm.value.accountId) {
    err.value = "请选择账号";
    return;
  }
  if (taskForm.value.goodsId === "" || taskForm.value.goodsId == null) {
    err.value = "请选择商品";
    return;
  }
  if (taskForm.value.skuId === "" || taskForm.value.skuId == null) {
    err.value = "请选择规格 SKU";
    return;
  }
  if (taskForm.value.mode === "scheduled") {
    if (!String(taskForm.value.scheduledAt || "").trim()) {
      err.value = "定时模式请填写开始时间 scheduledAt";
      return;
    }
    if (
      !Number(taskForm.value.scheduledDurationSec) ||
      Number(taskForm.value.scheduledDurationSec) < 1
    ) {
      err.value = "定时模式持续秒数须 ≥ 1";
      return;
    }
  }
  if (taskForm.value.mode === "reflow" || taskForm.value.mode === "scheduled") {
    if (
      !Number(taskForm.value.pollIntervalMs) ||
      Number(taskForm.value.pollIntervalMs) < 50
    ) {
      err.value =
        taskForm.value.mode === "scheduled"
          ? "定时模式波次间隔须 ≥ 50ms"
          : "回流模式轮询间隔须 ≥ 50ms";
      return;
    }
  }
  const gid = Number(taskForm.value.goodsId);
  const sid = Number(taskForm.value.skuId);
  const g = goodsRecords.value.find((x) => x.goodsId === gid);
  const s = skuRecords.value.find((x) => x.id === sid);
  const goodsName = (g && (g.name || g.saleName)) ? String(g.name || g.saleName).trim() : "";
  let skuName = "";
  if (s) {
    const parts = [s.skuName != null ? String(s.skuName).trim() : ""];
    if (s.sellPrice != null && s.sellPrice !== "")
      parts.push(`¥${s.sellPrice}`);
    skuName = parts.filter(Boolean).join(" · ");
  }

  const body = {
    name: taskForm.value.name,
    accountId: taskForm.value.accountId,
    goodsId: gid,
    skuId: sid,
    goodsName: goodsName || undefined,
    skuName: skuName || undefined,
    quantity: taskForm.value.quantity,
    mode: taskForm.value.mode,
    pollIntervalMs:
      taskForm.value.mode === "reflow" || taskForm.value.mode === "scheduled"
        ? Math.max(50, Math.floor(Number(taskForm.value.pollIntervalMs)))
        : undefined,
    scheduledAt:
      taskForm.value.mode === "scheduled"
        ? taskForm.value.scheduledAt
        : undefined,
    scheduledDurationSec:
      taskForm.value.mode === "scheduled"
        ? taskForm.value.scheduledDurationSec
        : undefined,
  };
  if (taskForm.value.addressBookId !== "" && taskForm.value.addressBookId != null)
    body.addressBookId = Number(taskForm.value.addressBookId);
  body.addressBookSnapshot =
    buildAddressBookSnapshot(
      addressRecords.value,
      taskForm.value.addressBookId
    ) ?? null;
  try {
    await http.post("/api/rush/tasks", body);
    ok.value = "任务已创建";
    await loadTasks();
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
  }
}

async function removeTask(id) {
  try {
    await ElMessageBox.confirm("删除任务？", "确认删除", {
      type: "warning",
      confirmButtonText: "删除",
      cancelButtonText: "取消",
    });
  } catch {
    return;
  }
  await http.delete(`/api/rush/tasks/${id}`);
  await loadTasks();
}

async function startTask(id) {
  warmRushAudioForGesture();
  err.value = "";
  ok.value = "";
  try {
    await http.post(`/api/rush/tasks/${id}/start`);
    ok.value = "任务已启动";
    await loadTasks();
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    await loadTasks();
  }
}

async function stopTask(id) {
  await http.post(`/api/rush/tasks/${id}/stop`);
  await loadTasks();
}

function onTaskSelectionChange(rows) {
  selectedTasks.value = rows || [];
}

/** 勾选所有「已停止」任务，便于一键启动 */
function selectAllStoppedTasks() {
  const table = taskTableRef.value;
  if (!table) return;
  table.clearSelection();
  for (const t of tasks.value) {
    if (!t.running) table.toggleRowSelection(t, true);
  }
}

/** 批量启动已勾选且未在运行中的任务 */
async function startSelectedTasks() {
  const pending = selectedTasks.value.filter((t) => !t.running);
  if (!pending.length) {
    ElMessage.warning("请勾选至少一个「已停止」的任务");
    return;
  }
  warmRushAudioForGesture();
  err.value = "";
  ok.value = "";
  try {
    for (const t of pending) {
      await http.post(`/api/rush/tasks/${encodeURIComponent(String(t.id))}/start`);
    }
    ok.value = `已启动 ${pending.length} 个任务`;
    await loadTasks();
    taskTableRef.value?.clearSelection();
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
    await loadTasks();
  }
}

function prependMonitorLine(line) {
  const s = String(line);
  if (RUSH_LOG_STOCK_RE.test(s)) playRushStockSound();
  if (/下单成功/.test(s)) playRushSuccessSound();
  const entry = parseOneRushLogLine(s);
  const next = [entry, ...monitorLogParsed.value];
  if (next.length > MAX_TASK_LOG_LINES) next.length = MAX_TASK_LOG_LINES;
  monitorLogParsed.value = next;
}

function formatMonitorTimeLabel(ts) {
  const s = String(ts ?? "").trim();
  const m = s.match(
    /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})\.(\d{1,3})/
  );
  if (!m) return s || "—";
  const ms = String(m[7]).padStart(3, "0");
  return `${m[2]}-${m[3]} ${m[4]}:${m[5]}:${m[6]}.${ms}`;
}

function monitorBorderKindFromEvent(e) {
  if (!e || typeof e !== "object") return "";
  if (e.event === "text") {
    const k = rushLogRowKind(e.message || "");
    return k || "info";
  }
  switch (e.event) {
    case "place_ok":
      return "ok";
    case "place_intent":
    case "stock_available":
      return "stock";
    case "sku_missing":
    case "skip_inactive":
    case "no_address":
    case "shelf_incomplete":
    case "bad_price":
      return "warn";
    case "place_fail":
    case "wave_fail":
    case "proxy_fetch_fail":
    case "account_missing":
      return "err";
    default:
      return "info";
  }
}

/** Socket / getMonitorLogs：结构化 { event, ts, at, ... } → 列表行 */
function normalizeMonitorEntry(raw) {
  if (raw == null)
    return {
      kind: "",
      timeLabel: "—",
      iso: null,
      text: "",
      structured: null,
    };
  if (typeof raw === "string") return parseOneRushLogLine(raw);
  const ts = raw.ts ?? "";
  const timeLabel = formatMonitorTimeLabel(ts);
  const kind = monitorBorderKindFromEvent(raw);
  if (raw.event === "text") {
    return {
      kind,
      timeLabel,
      iso: ts,
      text: raw.message || "",
      structured: null,
    };
  }
  return { kind, timeLabel, iso: ts, text: "", structured: raw };
}

function parseMonitorSnapshot(entries) {
  if (!Array.isArray(entries) || !entries.length) return [];
  return entries.map(normalizeMonitorEntry);
}

function prependMonitorEntry(entry) {
  if (entry && typeof entry === "object") {
    if (entry.event === "place_ok") applyPlaceOkFromMonitor(entry);
    if (entry.event === "place_intent" || entry.event === "stock_available")
      playRushStockSound();
    if (entry.event === "place_ok") playRushSuccessSound();
    if (entry.event === "text") {
      const s = String(entry.message || "");
      if (RUSH_LOG_STOCK_RE.test(s)) playRushStockSound();
      if (/下单成功/.test(s)) playRushSuccessSound();
    }
  }
  const norm = normalizeMonitorEntry(entry);
  const next = [norm, ...monitorLogParsed.value];
  if (next.length > MAX_TASK_LOG_LINES) next.length = MAX_TASK_LOG_LINES;
  monitorLogParsed.value = next;
}

function maybePlayRushSoundsFromSnapshotEntries(entries) {
  if (!Array.isArray(entries) || !entries.length) return;
  const head = entries.slice(0, 12);
  let hitOk = false;
  let hitStock = false;
  for (const e of head) {
    if (!e || typeof e !== "object") continue;
    if (e.event === "place_ok") hitOk = true;
    if (e.event === "place_intent" || e.event === "stock_available")
      hitStock = true;
    if (e.event === "text") {
      const s = String(e.message || "");
      if (/下单成功/.test(s)) hitOk = true;
      if (RUSH_LOG_STOCK_RE.test(s)) hitStock = true;
    }
  }
  if (hitStock) playRushStockSound();
  if (hitOk) playRushSuccessSound();
}

function openMonitorLogStream() {
  if (monitorSocket?.connected) return;
  if (monitorSocket) {
    monitorSocket.removeAllListeners();
    monitorSocket.close();
    monitorSocket = null;
  }
  const socket = io("/rush-monitor", {
    path: "/socket.io",
    transports: ["websocket", "polling"],
  });
  monitorSocket = socket;
  socket.on("snapshot", (d) => {
    try {
      if (d && Array.isArray(d.entries)) {
        const arr =
          d.entries.length > MAX_TASK_LOG_LINES
            ? d.entries.slice(0, MAX_TASK_LOG_LINES)
            : d.entries;
        monitorLogParsed.value = parseMonitorSnapshot(arr);
        maybePlayRushSoundsFromSnapshotEntries(arr);
      } else if (d && Array.isArray(d.lines)) {
        const arr = d.lines.map((x) => String(x));
        if (arr.length > MAX_TASK_LOG_LINES) arr.length = MAX_TASK_LOG_LINES;
        monitorLogParsed.value = parseRushLogLines(arr);
        maybePlayRushSoundsFromSnapshotLines(arr);
      }
    } catch {
      /* ignore */
    }
  });
  socket.on("log", (d) => {
    try {
      if (d && d.entry != null) prependMonitorEntry(d.entry);
      else if (d && d.line != null) prependMonitorLine(d.line);
    } catch {
      /* ignore */
    }
  });
}

function closeMonitorLogStream() {
  if (monitorSocket) {
    monitorSocket.removeAllListeners();
    monitorSocket.close();
    monitorSocket = null;
  }
}

/** 与后端 rush 文案一致；Socket.IO 事件 `log` + 首包 `snapshot` */
let rushSuccessAudio = null;
let rushStockAudio = null;

/** 须在同一次用户点击栈内同步调用，减轻「await 后再 play」被浏览器策略拦截 */
function warmRushAudioForGesture() {
  try {
    if (!rushSuccessAudio) rushSuccessAudio = new Audio(previewMp3Url);
    if (!rushStockAudio) rushStockAudio = new Audio(previewMp3Url);
    rushSuccessAudio.muted = true;
    rushStockAudio.muted = true;
    void rushSuccessAudio
      .play()
      .then(() => {
        rushSuccessAudio.pause();
        rushSuccessAudio.currentTime = 0;
        rushSuccessAudio.muted = false;
      })
      .catch(() => {
        rushSuccessAudio.muted = false;
      });
    void rushStockAudio
      .play()
      .then(() => {
        rushStockAudio.pause();
        rushStockAudio.currentTime = 0;
        rushStockAudio.muted = false;
      })
      .catch(() => {
        rushStockAudio.muted = false;
      });
  } catch {
    /* ignore */
  }
}

function playRushSuccessSound() {
  try {
    if (!rushSuccessAudio) rushSuccessAudio = new Audio(previewMp3Url);
    rushSuccessAudio.muted = false;
    rushSuccessAudio.currentTime = 0;
    void rushSuccessAudio.play().catch(() => {});
  } catch {
    /* 无音频或策略限制 */
  }
}
/** 对应日志「有货（现货 …」等，独立 Audio 可与成功提示先后播放 */
function playRushStockSound() {
  try {
    if (!rushStockAudio) rushStockAudio = new Audio(previewMp3Url);
    rushStockAudio.muted = false;
    rushStockAudio.currentTime = 0;
    void rushStockAudio.play().catch(() => {});
  } catch {
    /* ignore */
  }
}

/** snapshot 仅扫最新一小段，避免重连时整页历史反复叮 */
function maybePlayRushSoundsFromSnapshotLines(lines) {
  if (!Array.isArray(lines) || !lines.length) return;
  const head = lines.slice(0, 12);
  let hitOk = false;
  let hitStock = false;
  for (const raw of head) {
    const s = String(raw);
    if (/下单成功/.test(s)) hitOk = true;
    if (RUSH_LOG_STOCK_RE.test(s)) hitStock = true;
  }
  if (hitStock) playRushStockSound();
  if (hitOk) playRushSuccessSound();
}

/** 抢购日志高亮类型（与后端中文文案匹配） */
function rushLogRowKind(text) {
  if (/下单成功/.test(text)) return "ok";
  if (/换线重试|代理\/线路异常/.test(text)) return "info";
  if (/这一波失败|取线路失败|失败：|跳过：/.test(text)) return "err";
  if (
    /库存不够|没找到你选的规格|没有可用收货|不完整|orderFee|缺公司/.test(text)
  )
    return "warn";
  if (RUSH_LOG_STOCK_RE.test(text)) return "stock";
  return "";
}

/**
 * 后端行格式 `[时间] 正文` → 解析为上行时间标签、下行正文（监控列表里上下排布）
 */
function parseOneRushLogLine(line) {
  const s = String(line);
  const pad2 = (n) => String(n).padStart(2, "0");
  const pad3 = (n) => String(n).padStart(3, "0");
  const m = s.match(/^\[([^\]]+)\]\s*(.*)$/s);
  if (!m) {
    return {
      iso: null,
      timeLabel: "—",
      text: s,
      kind: rushLogRowKind(s),
      structured: null,
    };
  }
  const iso = m[1];
  const text = m[2].trim();
  const d = new Date(iso);
  let timeLabel = iso;
  if (!Number.isNaN(d.getTime())) {
    timeLabel = `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${pad3(d.getMilliseconds())}`;
  }
  return {
    iso,
    timeLabel,
    text,
    kind: rushLogRowKind(text),
    structured: null,
  };
}

function parseRushLogLines(rawLines) {
  if (!Array.isArray(rawLines) || !rawLines.length) return [];
  return rawLines.map(parseOneRushLogLine);
}

function accountLabel(id) {
  const a = accounts.value.find((x) => x.id === id);
  if (!a) return id;
  const phone = (a.phone || "").trim();
  const u = (a.username || "").trim();
  if (phone && u === phone) return phone;
  if (phone) return `${u} · ${phone}`;
  return u || id;
}

/** 表格「任务名」列：空名称占位，避免列被压成一字宽 */
function taskDisplayName(t) {
  const n = t?.name != null ? String(t.name).trim() : "";
  return n || "（未命名）";
}

/** 运行中任务按 goodsId 汇总（同一商品只一行）；SKU 为 skuId×数量，重复组合只出现一次 */
/** 勾选任务中「未运行」的数量，用于一键启动按钮 */
const selectedPendingStartCount = computed(
  () => selectedTasks.value.filter((t) => !t.running).length
);

const runningMonitorGoods = computed(() => {
  const running = tasks.value.filter((t) => t.running);
  const byG = new Map();
  for (const t of running) {
    const gid = Number(t.goodsId);
    if (!byG.has(gid)) {
      byG.set(gid, {
        goodsId: gid,
        goodsName: (t.goodsName && String(t.goodsName).trim()) || "",
        tasks: [],
        skuKeys: [],
        seenSku: new Set(),
      });
    }
    const g = byG.get(gid);
    if (!g.goodsName && t.goodsName) g.goodsName = String(t.goodsName).trim();
    g.tasks.push(t);
    const need = Number(t.quantity) || 1;
    const sk = `${t.skuId}×${need}`;
    if (!g.seenSku.has(sk)) {
      g.seenSku.add(sk);
      const skuPart = t.skuName ? `${sk}（${String(t.skuName).trim()}）` : sk;
      g.skuKeys.push(skuPart);
    }
  }
  return [...byG.values()].map((x) => ({
    goodsId: x.goodsId,
    goodsName: x.goodsName || `商品 ${x.goodsId}`,
    taskCount: x.tasks.length,
    skuParts: x.skuKeys,
    taskLabels: x.tasks.map((t) => taskDisplayName(t)).join("、"),
  }));
});

/** 任务上持久化的成功下单记录，新→旧 */
function placeRecordsNewestFirst(t) {
  const arr = Array.isArray(t.placeRecords) ? t.placeRecords : [];
  return [...arr].reverse();
}

function placeRecordDedupeKey(rec) {
  const ids = Array.isArray(rec.orderIds) ? rec.orderIds.join(",") : "";
  return `${rec.at}:${ids}`;
}

/** 监控 WebSocket `place_ok`（含 taskId/orderIds/at）即时并入 tasks，与后端写盘对齐 */
function applyPlaceOkFromMonitor(entry) {
  if (!entry || entry.event !== "place_ok" || entry.taskId == null) return;
  const tid = String(entry.taskId);
  const orderIds = Array.isArray(entry.orderIds)
    ? entry.orderIds.map((x) => Number(x)).filter((x) => Number.isFinite(x))
    : [];
  const rec = {
    at: Number(entry.at) || Date.now(),
    wave: entry.wave != null ? String(entry.wave) : "",
    orderIds,
    goodsId: entry.goodsId,
    skuId: entry.skuId,
    quantity: Number(entry.quantity ?? entry.need) || 1,
  };
  const idx = tasks.value.findIndex((t) => String(t.id) === tid);
  if (idx < 0) {
    void loadTasks();
    return;
  }
  const t = tasks.value[idx];
  const prev = Array.isArray(t.placeRecords) ? t.placeRecords : [];
  const key = placeRecordDedupeKey(rec);
  if (prev.some((r) => placeRecordDedupeKey(r) === key)) return;
  const nextRecords = [...prev, rec];
  while (nextRecords.length > MAX_TASK_PLACE_RECORDS) nextRecords.shift();
  const nextTasks = [...tasks.value];
  nextTasks[idx] = { ...t, placeRecords: nextRecords };
  tasks.value = nextTasks;
}

/** 全任务成单汇总，新→旧，供总表展示（依赖 tasks + Socket 实时 patch） */
const rushPlaceSuccessFeed = computed(() => {
  const rows = [];
  for (const t of tasks.value) {
    const pr = Array.isArray(t.placeRecords) ? t.placeRecords : [];
    for (const rec of pr) {
      rows.push({
        ...rec,
        taskId: t.id,
        taskName: taskDisplayName(t),
        accountLabel: accountLabel(t.accountId),
        goodsName: t.goodsName || "—",
        skuName: t.skuName || "",
      });
    }
  }
  rows.sort((a, b) => Number(b.at) - Number(a.at));
  return rows;
});

async function removePlaceSuccessRow(row) {
  if (!row?.taskId) return;
  try {
    await ElMessageBox.confirm(
      "仅从本地列表与 rush-tasks.json 移除该条记录，不会在官方取消订单。",
      "删除这条成单记录？",
      { type: "warning", confirmButtonText: "删除", cancelButtonText: "取消" }
    );
  } catch {
    return;
  }
  err.value = "";
  try {
    await http.delete(`/api/rush/tasks/${encodeURIComponent(String(row.taskId))}/place-records`, {
      data: {
        at: row.at,
        orderIds: Array.isArray(row.orderIds) ? row.orderIds : [],
      },
    });
    ok.value = "已删除该条记录";
    await loadTasks();
  } catch (e) {
    err.value = e.response?.data?.message || e.message;
  }
}

function formatPlaceRecordAt(at) {
  if (at == null) return "—";
  const d = new Date(Number(at));
  if (Number.isNaN(d.getTime())) return String(at);
  const pad = (n) => String(n).padStart(2, "0");
  const p3 = (n) => String(n).padStart(3, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${p3(d.getMilliseconds())}`;
}

/** 列表里展示开始时间：YYYY-MM-DD HH:mm:ss.SSS（含毫秒；无时补 .000） */
function formatScheduledDisplay(iso) {
  if (iso == null || String(iso).trim() === "") return "—";
  const s = String(iso).trim();
  const m = s.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{1,2}):(\d{2}):(\d{2})(?:\.(\d{1,6}))?/
  );
  if (m) {
    const pad2 = (n) => String(n).padStart(2, "0");
    const msRaw = m[7] != null ? m[7] : "";
    const ms = (msRaw + "000").slice(0, 3);
    return `${m[1]}-${m[2]}-${m[3]} ${pad2(m[4])}:${m[5]}:${m[6]}.${ms}`;
  }
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    const pad2 = (n) => String(n).padStart(2, "0");
    const padMs = (n) => String(n).padStart(3, "0");
    return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${padMs(d.getMilliseconds())}`;
  }
  return s;
}

watch(
  () => orderListModal.value.open,
  (open) => {
    if (orderListTick) {
      clearInterval(orderListTick);
      orderListTick = null;
    }
    if (open) {
      orderListNow.value = Date.now();
      orderListTick = setInterval(() => {
        orderListNow.value = Date.now();
      }, 1000);
    }
  }
);

onMounted(async () => {
  try {
    const last = localStorage.getItem(LS_LAST_USER);
    if (last) accForm.value.username = last;
  } catch {
    /* ignore */
  }
  await refreshAll();
  await applyTaskDraftFromStorage();
  if (taskForm.value.mode === "scheduled") {
    taskForm.value.scheduledAt = formatLocalDatetime();
  }
  openMonitorLogStream();
});

onUnmounted(() => {
  closeMonitorLogStream();
  if (orderListTick) clearInterval(orderListTick);
  clearTimeout(draftSaveTimer);
  if (rushSuccessAudio) {
    rushSuccessAudio.pause();
    rushSuccessAudio = null;
  }
  if (rushStockAudio) {
    rushStockAudio.pause();
    rushStockAudio = null;
  }
});
</script>

<template>
  <div class="rush-page">
    <h2 class="page-title">抢购任务中心</h2>
    <el-text type="info" class="page-intro" size="small">
      多账号、每账号独立任务。<strong>回流</strong>：仅使用你设置的间隔（毫秒），到点即发起新一波，<strong>不等待</strong>上一波结束；多账号任务彼此<strong>并发</strong>。<strong>定时</strong>：到指定时间<strong>开始</strong>按间隔重复抓库存/下单，持续满你设置的<strong>秒数</strong>后自动停止。
    </el-text>
    <el-alert v-if="ok" type="success" :title="ok" show-icon closable class="stack-alert" @close="ok = ''" />
    <el-alert v-if="err" type="error" :title="err" show-icon closable class="stack-alert" @close="err = ''" />
    <el-card shadow="hover" class="section-card">
      <template #header>
        <span>账号（服务端持久化）</span>
      </template>
      <el-text type="info" size="small" class="hint-block">
        添加成功后写入 <code>server/data/rush-accounts.json</code>（目录已在
        <code>.gitignore</code>
        ），含用户名、明文密码与 token，<strong>重启后端仍在</strong>。本页「新建任务」表单会额外记在浏览器 localStorage，刷新不丢。
        仅<strong>商品列表</strong>与<strong>SKU</strong>两路转发官方<strong>不带</strong> Authorization；<strong>订单、地址、取消订单、抢购下单</strong>使用抢购账号 token。
      </el-text>
      <div class="acc-toolbar">
        <el-input v-model="accForm.username" placeholder="手机号/邮箱" clearable style="max-width: 200px" />
        <el-input v-model="accForm.password" type="password" placeholder="密码" show-password clearable style="max-width: 200px" />
        <el-input v-model="accForm.remark" placeholder="备注（可选）" clearable maxlength="512" style="max-width: 180px" />
        <el-button type="primary" @click="addAccount">添加并登录</el-button>
        <el-button @click="refreshAll">刷新列表</el-button>
      </div>
      <el-table :data="accounts" stripe size="small" class="acc-table">
        <el-table-column prop="username" label="用户" min-width="120" />
        <el-table-column label="手机" min-width="120">
          <template #default="{ row: a }">{{ a.phone || "—" }}</template>
        </el-table-column>
        <el-table-column label="会员" min-width="200" show-overflow-tooltip>
          <template #default="{ row: a }">{{ a.memberSummary ?? "—" }}</template>
        </el-table-column>
        <el-table-column label="备注" min-width="168">
          <template #default="{ row: a }">
            <el-input
              v-model="a.remark"
              size="small"
              placeholder="用途说明"
              maxlength="512"
              clearable
              @blur="onAccountRemarkBlur(a)"
            />
          </template>
        </el-table-column>
        <el-table-column label="Token" width="80">
          <template #default="{ row: a }">{{ a.hasToken ? "有" : "无" }}</template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row: a }">
            <el-button size="small" :disabled="!a.hasToken" @click="openOrderListModal(a)">查询订单</el-button>
            <el-button size="small" @click="refreshToken(a.id)">刷新 Token</el-button>
            <el-button size="small" type="danger" plain @click="removeAccount(a.id)">删</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="orderListModal.open"
      destroy-on-close
      width="920px"
      top="5vh"
    >
      <template #header>
        <span>
          订单列表
          <el-text v-if="orderListModal.username" type="info" size="small">
            · {{ orderListModal.username }}
          </el-text>
        </span>
      </template>
      <el-radio-group
        v-model="orderListModal.filterId"
        size="small"
        class="order-tabs"
        @change="setOrderListFilterAndFetch(orderListModal.filterId)"
      >
        <el-radio-button
          v-for="tab in ORDER_LIST_TABS"
          :key="tab.id"
          :value="tab.id"
          :disabled="orderListModal.loading"
        >
          {{ tab.label }}
        </el-radio-button>
      </el-radio-group>
      <el-text type="info" size="small" class="hint-block">
        待付款订单按官方小程序规则：<strong>下单时间 + 10 分钟</strong>内需支付，超时将关闭；本页为本地时钟估算。
      </el-text>
      <el-skeleton v-if="orderListModal.loading" :rows="4" animated />
      <template v-else>
        <el-alert
          v-if="orderListModal.err"
          type="error"
          :title="orderListModal.err"
          show-icon
          :closable="false"
          class="stack-alert"
        />
        <el-text v-if="orderListModal.total != null && !orderListModal.err" type="info" size="small" class="hint-block">
          共 {{ orderListModal.total }} 条 · 每页 {{ orderListModal.pageSize }} 条 · 第
          {{ orderListModal.pageNum }} / {{ orderListTotalPages() }} 页（本页
          {{ orderListModal.records.length }} 条）
        </el-text>
        <el-table
          v-if="orderListModal.records.length"
          :data="orderListModal.records"
          stripe
          size="small"
          max-height="420"
        >
          <el-table-column label="订单号" min-width="130" show-overflow-tooltip>
            <template #default="{ row }">
              <span class="mono">{{ row.saleOrderNo || "—" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品摘要" min-width="140" show-overflow-tooltip>
            <template #default="{ row }">{{ orderListGoodsSummary(row) }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">{{ orderListStatusDesc(row) }}</template>
          </el-table-column>
          <el-table-column label="支付剩余" width="120">
            <template #default="{ row }">
              <span class="mono">{{ orderPayCancelRemainingLabel(row) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单时间" width="160" show-overflow-tooltip>
            <template #default="{ row }">
              <span class="mono">{{ row.createTime || "—" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" width="100" fixed="right">
            <template #default="{ row }">
              <el-button
                v-if="canCancelUnpaidOrder(row)"
                type="danger"
                link
                size="small"
                :loading="orderCancelSubmittingId === row.id"
                :disabled="orderCancelSubmittingId != null && orderCancelSubmittingId !== row.id"
                @click="cancelUnpaidOrder(row)"
              >
                取消订单
              </el-button>
              <el-text v-else type="info" size="small">—</el-text>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-else-if="!orderListModal.err" description="暂无订单记录" />
        <div v-if="orderListModal.total != null && orderListTotalPages() > 1" class="pager-bar">
          <el-button
            size="small"
            :disabled="orderListModal.pageNum <= 1 || orderListModal.loading"
            @click="goOrderListPage(-1)"
          >
            上一页
          </el-button>
          <el-text size="small">{{ orderListModal.pageNum }} / {{ orderListTotalPages() }}</el-text>
          <el-button
            size="small"
            :disabled="orderListModal.pageNum >= orderListTotalPages() || orderListModal.loading"
            @click="goOrderListPage(1)"
          >
            下一页
          </el-button>
        </div>
      </template>
      <template #footer>
        <el-button @click="fetchOrderListForModal" :disabled="!orderListModal.accountId">刷新</el-button>
        <el-button type="primary" @click="closeOrderListModal">关闭</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="editModalOpen"
      title="修改任务"
      width="720px"
      destroy-on-close
      class="edit-task-dialog"
      @closed="onEditDialogClosed"
    >
      <el-text type="info" size="small" class="hint-block">
        与新建任务相同字段；保存后写入 <code>rush-tasks.json</code>，<strong>提交记录保留</strong>。运行中不可改，请先停止。
      </el-text>
      <el-form label-position="top" class="task-form">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="名称">
              <el-input v-model="editForm.name" placeholder="可选" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="账号">
              <el-select v-model="editForm.accountId" filterable clearable placeholder="选择" style="width: 100%">
                <el-option v-for="a in accounts" :key="a.id" :label="a.username" :value="a.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="商品">
              <el-select
                v-model="editForm.goodsId"
                filterable
                clearable
                :disabled="!editForm.accountId || editPickLoading.goods"
                :loading="editPickLoading.goods"
                placeholder="选择商品"
                style="width: 100%"
              >
                <el-option
                  v-for="g in editGoodsRecords"
                  :key="g.goodsId"
                  :label="`${g.name || g.saleName}（${g.goodsId}）`"
                  :value="g.goodsId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="规格 SKU">
              <el-select
                v-model="editForm.skuId"
                filterable
                clearable
                :disabled="!editForm.goodsId || editPickLoading.sku"
                :loading="editPickLoading.sku"
                placeholder="选择规格"
                style="width: 100%"
              >
                <el-option
                  v-for="s in editSkuRecords"
                  :key="s.id"
                  :label="`${s.skuName} · ¥${s.sellPrice} · 库存 ${s.stock}（${s.id}）`"
                  :value="s.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="数量">
              <el-input-number v-model="editForm.quantity" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="地址 addressBookId">
              <el-select
                v-model="editForm.addressBookId"
                filterable
                clearable
                :disabled="!editForm.accountId || editPickLoading.addr"
                :loading="editPickLoading.addr"
                placeholder="默认（接口返回）"
                style="width: 100%"
              >
                <el-option
                  v-for="r in editAddressRecords"
                  :key="r.id"
                  :value="String(r.id)"
                  :label="`${r.bookName} ${r.bookPhone} · ${r.bookProvince}${r.bookCity}${r.bookCounty}（${r.id}）${r.bookDefaultStatus === 1 ? ' · 默认' : ''}`"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="模式">
              <el-radio-group v-model="editForm.mode">
                <el-radio value="reflow">回流（轮询库存）</el-radio>
                <el-radio value="scheduled">定时（到点启动 + 间隔 + 限时）</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="editForm.mode === 'reflow'" :span="24">
            <el-form-item label="轮询间隔 ms（≥50）">
              <el-input-number v-model="editForm.pollIntervalMs" :min="50" style="width: 200px" />
            </el-form-item>
          </el-col>
          <template v-if="editForm.mode === 'scheduled'">
            <el-col :span="24">
              <el-form-item label="开始时间（YYYY-MM-DD HH:mm:ss.SSS）">
                <el-input v-model="editForm.scheduledAt" placeholder="例如 2026-04-02 22:39:34.127" clearable />
                <el-text type="info" size="small" class="subhint-inline">
                  切换到「定时」时会自动填入当前时刻；请按需改成开抢时间。
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="波次间隔 ms（≥50）">
                <el-input-number v-model="editForm.pollIntervalMs" :min="50" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="持续秒数（≥1）">
                <el-input-number v-model="editForm.scheduledDurationSec" :min="1" style="width: 100%" />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="closeEditTaskModal">取消</el-button>
        <el-button type="primary" :loading="editSaving" @click="saveEditTask">保存</el-button>
      </template>
    </el-dialog>

    <el-card shadow="hover" class="section-card">
      <template #header>
        <span>新建任务</span>
      </template>
      <el-text type="info" size="small" class="hint-block">
        选好<strong>账号</strong>后会自动拉取<strong>商品列表</strong>与<strong>地址簿</strong>；换账号会清空商品/规格/地址等下级选项。选商品后再加载规格；算费/下单时的 companyId、orgId 由后端按当前商品接口自动取值。
      </el-text>
      <el-form label-position="top" class="task-form">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="名称">
              <el-input v-model="taskForm.name" placeholder="可选" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="账号">
              <el-select v-model="taskForm.accountId" filterable clearable placeholder="选择" style="width: 100%">
                <el-option v-for="a in accounts" :key="a.id" :label="a.username" :value="a.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="商品">
              <el-select
                v-model="taskForm.goodsId"
                filterable
                clearable
                :disabled="!taskForm.accountId || pickLoading.goods"
                :loading="pickLoading.goods"
                placeholder="选择商品"
                style="width: 100%"
              >
                <el-option
                  v-for="g in goodsRecords"
                  :key="g.goodsId"
                  :label="`${g.name || g.saleName}（${g.goodsId}）`"
                  :value="g.goodsId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="规格 SKU">
              <el-select
                v-model="taskForm.skuId"
                filterable
                clearable
                :disabled="!taskForm.goodsId || pickLoading.sku"
                :loading="pickLoading.sku"
                placeholder="选择规格"
                style="width: 100%"
              >
                <el-option
                  v-for="s in skuRecords"
                  :key="s.id"
                  :label="`${s.skuName} · ¥${s.sellPrice} · 库存 ${s.stock}（${s.id}）`"
                  :value="s.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="数量">
              <el-input-number v-model="taskForm.quantity" :min="1" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="地址 addressBookId">
              <el-select
                v-model="taskForm.addressBookId"
                filterable
                clearable
                :disabled="!taskForm.accountId || pickLoading.addr"
                :loading="pickLoading.addr"
                placeholder="默认（接口返回）"
                style="width: 100%"
              >
                <el-option
                  v-for="r in addressRecords"
                  :key="r.id"
                  :value="String(r.id)"
                  :label="`${r.bookName} ${r.bookPhone} · ${r.bookProvince}${r.bookCity}${r.bookCounty}（${r.id}）${r.bookDefaultStatus === 1 ? ' · 默认' : ''}`"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="模式">
              <el-radio-group v-model="taskForm.mode">
                <el-radio value="reflow">回流（轮询库存）</el-radio>
                <el-radio value="scheduled">定时（到点启动 + 间隔 + 限时）</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="taskForm.mode === 'reflow'" :span="24">
            <el-form-item label="轮询间隔 ms（≥50）">
              <el-input-number v-model="taskForm.pollIntervalMs" :min="50" style="width: 200px" />
            </el-form-item>
          </el-col>
          <template v-if="taskForm.mode === 'scheduled'">
            <el-col :span="24">
              <el-form-item label="开始时间（YYYY-MM-DD HH:mm:ss.SSS）">
                <el-input v-model="taskForm.scheduledAt" placeholder="例如 2026-04-02 22:39:34.127" clearable />
                <el-text type="info" size="small" class="subhint-inline">
                  选「定时」、刷新页面时会自动填入<strong>当前这一刻</strong>（含毫秒）；再按需改成开抢时间。
                </el-text>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="波次间隔 ms（≥50）">
                <el-input-number v-model="taskForm.pollIntervalMs" :min="50" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12">
              <el-form-item label="持续秒数（≥1）">
                <el-input-number v-model="taskForm.scheduledDurationSec" :min="1" style="width: 100%" />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-button type="primary" @click="addTask">保存任务</el-button>
      </el-form>
    </el-card>

    <el-card shadow="hover" class="section-card">
      <template #header>
        <span>抢购成功（Socket 实时）</span>
      </template>
      <el-text type="info" size="small" class="hint-block">
        与<strong>全局监控</strong>同源推送：<code>place_ok</code> 到达后<strong>立即</strong>写入下表与对应任务的「提交记录」，并持久化到
        <code>rush-tasks.json</code>；无需手动刷新页面。行末<strong>删除</strong>仅从本地移除展示，不会在官方取消订单。
      </el-text>
      <el-table
        v-if="rushPlaceSuccessFeed.length"
        :data="rushPlaceSuccessFeed"
        stripe
        border
        size="small"
        class="rush-success-table"
        max-height="360"
        empty-text="暂无成单"
      >
        <el-table-column label="时间" width="198">
          <template #default="{ row }">
            <span class="mono">{{ formatPlaceRecordAt(row.at) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="官方订单 id" min-width="140" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="mono">{{
              row.orderIds && row.orderIds.length ? row.orderIds.join("、") : "（无）"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="64" align="center">
          <template #default="{ row }">{{ row.quantity ?? "—" }}</template>
        </el-table-column>
        <el-table-column label="商品" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.goodsName }}</template>
        </el-table-column>
        <el-table-column label="规格" min-width="100" show-overflow-tooltip>
          <template #default="{ row }">{{ row.skuName || "—" }}</template>
        </el-table-column>
        <el-table-column label="goods / sku" width="120">
          <template #default="{ row }">
            <span class="mono">{{ row.goodsId }} / {{ row.skuId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务" min-width="88" show-overflow-tooltip>
          <template #default="{ row }">{{ row.taskName }}</template>
        </el-table-column>
        <el-table-column label="账号" min-width="120" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="mono">{{ row.accountLabel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="72" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="danger" plain @click="removePlaceSuccessRow(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else description="暂无成单记录" :image-size="56" />
    </el-card>

    <!-- 不用 el-card：其根节点常带 overflow:hidden，长表格+展开行时底部易被裁切 -->
    <section class="task-list-panel">
      <header class="task-list-panel-header">
        <span class="task-list-panel-title">任务列表</span>
        <div class="task-list-toolbar">
          <el-button
            type="primary"
            size="small"
            :disabled="selectedPendingStartCount === 0"
            @click="startSelectedTasks"
          >
            一键启动已选
          </el-button>
          <el-button size="small" :disabled="!tasks.length" @click="selectAllStoppedTasks">
            全选未运行
          </el-button>
        </div>
      </header>
      <el-text type="info" size="small" class="hint-block task-list-hint">
        表格左侧可<strong>勾选</strong>多个任务，点「一键启动已选」批量开始（仅对「已停止」生效）；「全选未运行」可快速勾选。已保存的任务在服务端 <code>server/data/rush-tasks.json</code>。<strong>重启后端</strong>后「运行中」会清空，请再点「开始」。右侧<strong>全局监控日志</strong>经 <strong>Socket.IO</strong>（命名空间 <code>/rush-monitor</code>，开发时 Vite 会转发明文 <code>/socket.io</code>），内存展示、刷新页面即清空。同一 <code>goodsId</code> 只打一路货架请求；监控间隔为各运行任务 <code>pollIntervalMs</code> 的<strong>最大值</strong>。<strong>下单成功</strong>见上方「抢购成功」总表及各任务展开「提交记录」。
      </el-text>
      <div class="task-list-split">
        <div class="task-table-box">
          <el-table
            ref="taskTableRef"
            :data="tasks"
            row-key="id"
            stripe
            border
            size="small"
            @selection-change="onTaskSelectionChange"
          >
            <el-table-column type="selection" width="48" fixed />
          <el-table-column type="expand">
            <template #default="{ row: t }">
              <div class="task-expand-inner">
                <template v-if="placeRecordsNewestFirst(t).length">
                  <el-text type="info" size="small" class="expand-title expand-title-records">
                    提交记录（{{ (t.placeRecords || []).length }} 条，已写入 rush-tasks）
                  </el-text>
                  <el-table :data="placeRecordsNewestFirst(t)" size="small" border class="nested-table">
                    <el-table-column label="时间" width="200">
                      <template #default="{ row: rec }">
                        <span class="mono">{{ formatPlaceRecordAt(rec.at) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="官方订单 id" min-width="160" show-overflow-tooltip>
                      <template #default="{ row: rec }">
                        <span class="mono">{{
                          rec.orderIds && rec.orderIds.length ? rec.orderIds.join("、") : "（无）"
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="数量" width="72">
                      <template #default="{ row: rec }">{{ rec.quantity ?? "—" }}</template>
                    </el-table-column>
                    <el-table-column label="goods / sku" width="140">
                      <template #default="{ row: rec }">{{ rec.goodsId }} / {{ rec.skuId }}</template>
                    </el-table-column>
                  </el-table>
                </template>
                <el-text v-else type="info" size="small" class="expand-empty-records">暂无成功下单记录</el-text>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="任务名" min-width="100" show-overflow-tooltip>
            <template #default="{ row: t }">{{ taskDisplayName(t) }}</template>
          </el-table-column>
          <el-table-column label="抢购账号" min-width="130" show-overflow-tooltip>
            <template #default="{ row: t }">
              <span class="mono">{{ accountLabel(t.accountId) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品与规格" min-width="200">
            <template #default="{ row: t }">
              <div class="goods-title">{{ t.goodsName || "—" }}</div>
              <el-text v-if="t.skuName" type="info" size="small">{{ t.skuName }}</el-text>
              <div class="goods-meta mono">G {{ t.goodsId }} · SKU {{ t.skuId }} · ×{{ t.quantity }}</div>
            </template>
          </el-table-column>
          <el-table-column label="运行方式" min-width="150">
            <template #default="{ row: t }">
              <template v-if="t.mode === 'reflow'">
                <div>回流轮询</div>
                <el-text type="info" size="small">{{ t.pollIntervalMs }} ms/次</el-text>
              </template>
              <template v-else>
                <div>定时</div>
                <el-text size="small" class="mono mono-block">{{ formatScheduledDisplay(t.scheduledAt) }}</el-text>
                <el-text type="info" size="small">
                  {{ t.pollIntervalMs }} ms/次 · 持续 {{ t.scheduledDurationSec ?? "—" }}s
                </el-text>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100" align="center">
            <template #default="{ row: t }">
              <el-tag :type="t.running ? 'success' : 'info'" size="small">
                {{ t.running ? "运行中" : "已停止" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="288" fixed="right" align="right">
            <template #default="{ row: t }">
              <el-button size="small" type="primary" :disabled="t.running" @click="startTask(t.id)">开始</el-button>
              <el-button size="small" :disabled="!t.running" @click="stopTask(t.id)">停止</el-button>
              <el-button size="small" :disabled="t.running" @click="openEditTask(t)">修改</el-button>
              <el-button size="small" type="danger" plain @click="removeTask(t.id)">删</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
        <aside class="rush-monitor-aside" aria-label="全局监控">
          <div class="monitor-aside-block">
            <div class="monitor-aside-title">运行中监控商品</div>
            <el-text v-if="!runningMonitorGoods.length" type="info" size="small">
              暂无运行中任务
            </el-text>
            <ul v-else class="monitor-goods-ul">
              <li v-for="row in runningMonitorGoods" :key="row.goodsId" class="monitor-goods-li">
                <div class="monitor-goods-name">{{ row.goodsName }}</div>
                <div class="mono monitor-goods-id">G {{ row.goodsId }}</div>
                <div class="monitor-goods-meta">
                  {{ row.taskCount }} 个任务 ·
                  <span class="mono">{{ row.skuParts.join("；") }}</span>
                </div>
                <div class="monitor-goods-tasks">任务：{{ row.taskLabels }}</div>
              </li>
            </ul>
          </div>
          <div class="monitor-aside-block monitor-aside-log">
            <div class="monitor-aside-title">监控日志</div>
            <RushLogVirtualList
              :entries="monitorLogParsed"
              :view-height="440"
              :row-stride="108"
              full
            />
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
.rush-page {
  max-width: 100%;
}
.page-title {
  margin: 0 0 12px;
  font-size: 1.35rem;
}
.page-intro {
  display: block;
  line-height: 1.6;
  margin-bottom: 16px;
}
.stack-alert {
  margin-bottom: 12px;
}
.section-card {
  margin-bottom: 16px;
}
.task-list-panel {
  margin-bottom: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  overflow: visible;
}
.task-list-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 10px 16px;
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
}
.task-list-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.task-list-panel-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}
.task-list-hint {
  display: block;
  padding: 12px 16px 0;
  margin-bottom: 14px;
  box-sizing: border-box;
}
.task-list-split {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 0 16px 16px;
  box-sizing: border-box;
}
.task-list-split .task-table-box {
  flex: 1;
  min-width: 0;
  padding: 0;
  margin-bottom: 0;
}
.rush-monitor-aside {
  flex: 0 0 620px;
  width: 620px;
  max-width: 38%;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  background: var(--el-fill-color-blank);
  padding: 12px;
  box-sizing: border-box;
}
.monitor-aside-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
  color: var(--el-text-color-primary);
}
.monitor-aside-block + .monitor-aside-block {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--el-border-color-lighter);
}
.monitor-goods-ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.monitor-goods-li {
  margin-bottom: 10px;
  padding: 8px 10px;
  background: var(--el-fill-color-light);
  border-radius: 6px;
}
.monitor-goods-li:last-child {
  margin-bottom: 0;
}
.monitor-goods-name {
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 4px;
  line-height: 1.35;
}
.monitor-goods-id {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 4px;
}
.monitor-goods-meta {
  font-size: 12px;
  line-height: 1.45;
}
.monitor-goods-tasks {
  font-size: 11px;
  color: var(--el-text-color-secondary);
  margin-top: 6px;
  word-break: break-word;
}
.hint-block {
  display: block;
  line-height: 1.55;
  margin-bottom: 14px;
}
.acc-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 14px;
}
.acc-table {
  width: 100%;
}
.order-tabs {
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.pager-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 12px 0;
}
.task-form {
  margin-bottom: 4px;
}
.subhint-inline {
  display: block;
  margin-top: 6px;
  line-height: 1.45;
}
.task-table-box {
  width: 100%;
  margin-bottom: 8px;
}
/* 任务表未设 max-height 时，避免 body 区域隐式 max-height/overflow 裁掉最后一行 */
.task-table-box :deep(.el-table__body-wrapper) {
  max-height: none !important;
  overflow-y: visible !important;
}
.task-table-box :deep(.el-table__inner-wrapper) {
  max-height: none !important;
}
.task-table-box :deep(.el-table__expanded-cell) {
  padding: 12px 16px;
  overflow: visible;
}
.section-card :deep(.el-card__body) {
  overflow: visible;
}
.task-expand-inner {
  padding: 4px 8px 12px 12px;
  max-width: 100%;
}
.expand-title {
  display: block;
  margin-bottom: 8px;
}
.expand-title-records {
  margin-top: 18px;
}
.expand-empty-records {
  display: block;
  margin-top: 8px;
}
.nested-table {
  width: 100%;
}
.goods-title {
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 4px;
}
.goods-meta {
  margin-top: 6px;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--muted);
}
.mono {
  font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  font-size: 0.88em;
}
.mono-block {
  display: block;
  margin: 4px 0;
  word-break: break-all;
}
h2 {
  margin-top: 0;
}
</style>
