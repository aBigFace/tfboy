const express = require("express");
const rush = require("../rush/rushEngine");
const rushLogs = require("../rush/logs");
const appSettings = require("../rush/appSettings");
const {
  goodsPageList,
  getShelvesSku,
  bookPageQuery,
  orderPageQueryV2,
  cancelMallOrder,
} = require("../tfApi");
const {
  DEFAULT_GOODS_BODY,
  DEFAULT_ADDRESS_BODY,
  DEFAULT_ORDER_LIST_BODY,
} = require("../apiDefaults");

const router = express.Router();

function sendErr(res, e, code = 400) {
  res.status(code).json({
    ok: false,
    message: e.message || "错误",
    detail: e.response?.data ?? e.detail,
  });
}

router.get("/settings", (_, res) => {
  try {
    res.json({ ok: true, data: appSettings.get() });
  } catch (e) {
    sendErr(res, e);
  }
});

router.patch("/settings", (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const data = appSettings.patch(body);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

router.get("/accounts", (_, res) => {
  try {
    res.json({ ok: true, data: rush.listAccountsMasked() });
  } catch (e) {
    sendErr(res, e);
  }
});

router.post("/accounts", async (req, res) => {
  try {
    const row = await rush.addAccount(req.body || {});
    res.json({ ok: true, data: row });
  } catch (e) {
    sendErr(res, e);
  }
});

router.delete("/accounts/:id", (req, res) => {
  try {
    rush.deleteAccount(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    sendErr(res, e);
  }
});

router.patch("/accounts/:id", (req, res) => {
  try {
    if (!req.body || !Object.prototype.hasOwnProperty.call(req.body, "remark")) {
      return res.status(400).json({ ok: false, message: "需要 body.remark" });
    }
    const row = rush.updateAccountRemark(req.params.id, req.body.remark);
    res.json({ ok: true, data: row });
  } catch (e) {
    sendErr(res, e);
  }
});

router.post("/accounts/:id/refresh", async (req, res) => {
  try {
    const row = await rush.refreshAccountById(req.params.id);
    res.json({ ok: true, data: row });
  } catch (e) {
    sendErr(res, e);
  }
});

/**
 * 拉商品列表（`pageListForShopMall`）：转发官方 **不带** Bearer
 * 与其它接口区分：仅「商品列表 + SKU」两类查询按你的要求不带 token；订单/地址等仍带 token
 */
router.post("/accounts/:id/goods-page-list", async (req, res) => {
  try {
    if (!rush.hasAccount(req.params.id)) {
      return res.status(400).json({ ok: false, message: "账号不存在" });
    }
    const body =
      req.body && Object.keys(req.body).length ? req.body : DEFAULT_GOODS_BODY;
    const data = await goodsPageList(null, body);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

/** 查 SKU（`getShelvesSku`）：转发官方 **不带** Bearer（与商品列表一致，仅这两类不带） */
router.get("/accounts/:id/sku/:goodsId", async (req, res) => {
  try {
    if (!rush.hasAccount(req.params.id)) {
      return res.status(400).json({ ok: false, message: "账号不存在" });
    }
    const applyType = req.query.applyType ?? 1;
    const data = await getShelvesSku(null, req.params.goodsId, applyType);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

/** 查地址簿：须带抢购账号 Bearer（官方按登录用户返回地址） */
router.post("/accounts/:id/address-list", async (req, res) => {
  try {
    const body =
      req.body && Object.keys(req.body).length ? req.body : DEFAULT_ADDRESS_BODY;
    const data = await rush.withAccountApi(req.params.id, (token) =>
      bookPageQuery(token, body)
    );
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

/**
 * 订单列表（官方 pageQueryV2）：须带抢购账号 Bearer
 * 请求体字段与小程序一致；合并默认后会把 timeValue → dataRange，timeValue 置 null
 */
router.post("/accounts/:id/order-list", async (req, res) => {
  try {
    const merged = {
      ...DEFAULT_ORDER_LIST_BODY,
      ...(req.body && typeof req.body === "object" ? req.body : {}),
    };
    const payload = { ...merged };
    payload.dataRange = payload.timeValue;
    payload.timeValue = null;
    const data = await rush.withAccountApi(req.params.id, (token) =>
      orderPageQueryV2(token, payload)
    );
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

/** 取消订单：body.orderId 为 saleOrder 主键 id（与列表行 row.id 一致）；官方 cancelOrder */
router.post("/accounts/:id/cancel-order", async (req, res) => {
  try {
    const raw =
      req.body?.orderId ?? req.body?.id ?? req.body?.saleOrderId;
    if (raw === undefined || raw === null || raw === "") {
      return res.status(400).json({ ok: false, message: "缺少 orderId" });
    }
    const n = Number(raw);
    if (!Number.isFinite(n) || n <= 0) {
      return res.status(400).json({ ok: false, message: "orderId 无效" });
    }
    const data = await rush.withAccountApi(req.params.id, (token) =>
      cancelMallOrder(token, [n])
    );
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

router.get("/tasks", (_, res) => {
  try {
    res.json({ ok: true, data: rush.listTasks() });
  } catch (e) {
    sendErr(res, e);
  }
});

router.post("/tasks", (req, res) => {
  try {
    const task = rush.addTask(req.body || {});
    res.json({ ok: true, data: task });
  } catch (e) {
    sendErr(res, e);
  }
});

router.put("/tasks/:id", (req, res) => {
  try {
    const task = rush.updateTask(req.params.id, req.body || {});
    res.json({ ok: true, data: task });
  } catch (e) {
    sendErr(res, e);
  }
});

router.delete("/tasks/:id", (req, res) => {
  try {
    rush.deleteTask(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    sendErr(res, e);
  }
});

/** 从任务中删除一条「抢购成功」提交记录（body: at、orderIds，与列表行一致）；不写官方 */
router.delete("/tasks/:id/place-records", (req, res) => {
  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const task = rush.removePlaceRecord(req.params.id, body);
    res.json({ ok: true, data: task });
  } catch (e) {
    sendErr(res, e);
  }
});

router.post("/tasks/:id/start", (req, res) => {
  try {
    const r = rush.startTask(req.params.id);
    if (!r.ok) return res.status(400).json({ ok: false, message: r.message });
    res.json({ ok: true });
  } catch (e) {
    sendErr(res, e);
  }
});

router.post("/tasks/:id/stop", (req, res) => {
  try {
    rush.stopTask(req.params.id);
    res.json({ ok: true });
  } catch (e) {
    sendErr(res, e);
  }
});

router.get("/tasks/:id/logs", (req, res) => {
  try {
    res.json({ ok: true, data: rush.getLogs(req.params.id) });
  } catch (e) {
    sendErr(res, e);
  }
});

router.get("/monitor/logs", (_, res) => {
  try {
    res.json({ ok: true, data: rush.getMonitorLogs() });
  } catch (e) {
    sendErr(res, e);
  }
});

/** 监控实时日志请用 Socket.IO：命名空间 /rush-monitor（见 server socketMonitor.js） */

/** SSE：连接后先 snapshot 再实时 log；前端任务停止时请关闭 EventSource */
router.get("/tasks/:id/logs/stream", (req, res) => {
  try {
    const taskId = req.params.id;
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    if (typeof res.flushHeaders === "function") res.flushHeaders();

    const writeSse = (event, payload) => {
      if (event) res.write(`event: ${event}\n`);
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    writeSse("snapshot", { lines: rush.getLogs(taskId) });

    const onLine = (line) => writeSse("log", { line });
    const unsub = rushLogs.subscribe(taskId, onLine);

    const hb = setInterval(() => {
      res.write(": ping\n\n");
    }, 25000);

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      clearInterval(hb);
      unsub();
      try {
        res.end();
      } catch {
        /* ignore */
      }
    };

    req.on("close", cleanup);
    res.on("close", cleanup);
    res.on("error", cleanup);
  } catch (e) {
    sendErr(res, e);
  }
});

module.exports = router;
