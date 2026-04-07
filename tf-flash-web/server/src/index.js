const fs = require("fs");
const path = require("path");

/** 仅加载本仓库（tf-flash-web）内 .env，不读外层目录（如 时代峰峻/.env） */
(function loadLocalEnv() {
  const serverDir = path.join(__dirname, "..");
  const pkgRoot = path.join(serverDir, "..");
  const serverEnv = path.join(serverDir, ".env");
  const pkgEnv = path.join(pkgRoot, ".env");
  if (fs.existsSync(serverEnv)) {
    require("dotenv").config({ path: serverEnv });
  } else if (fs.existsSync(pkgEnv)) {
    require("dotenv").config({ path: pkgEnv });
  }
})();

const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const { attachRushMonitor } = require("./socketMonitor");
const rushRouter = require("./routes/rush");
const rushEngine = require("./rush/rushEngine");
const {
  loginPassword,
  goodsPageList,
  getShelvesSku,
  personal,
  bookPageQuery,
  orderFee,
  placeOrder,
} = require("./tfApi");
const { DEFAULT_GOODS_BODY, DEFAULT_ADDRESS_BODY } = require("./apiDefaults");
const { DATA_DIR } = require("./store/persist");
const proxyCache = require("./proxyCache");

const PORT = Number(process.env.PORT || 10094);

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

function requireToken(req, res, next) {
  const h = req.headers.authorization || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return res.status(401).json({ ok: false, message: "需要 Authorization: Bearer" });
  }
  req.accessToken = m[1].trim();
  next();
}

function sendErr(res, e, status = 400) {
  const body = e.response?.data ?? e.message;
  res.status(status).json({
    ok: false,
    message: e.message || "请求失败",
    detail: body,
  });
}

app.get("/api/health", (_, res) => {
  res.json({ ok: true, service: "tf-flash-server" });
});

app.use("/api/rush", rushRouter);

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ ok: false, message: "需要 username、password" });
    }
    const data = await loginPassword(String(username), String(password));
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e, e.response?.status >= 400 ? e.response.status : 400);
  }
});

app.post("/api/goods/page-list", async (req, res) => {
  try {
    const body = req.body && Object.keys(req.body).length ? req.body : DEFAULT_GOODS_BODY;
    const data = await goodsPageList(null, body);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

app.get("/api/goods/sku/:goodsId", requireToken, async (req, res) => {
  try {
    const applyType = req.query.applyType ?? 1;
    const data = await getShelvesSku(req.accessToken, req.params.goodsId, applyType);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

app.post("/api/user/personal", requireToken, async (req, res) => {
  try {
    const data = await personal(req.accessToken);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

app.post("/api/address/list", requireToken, async (req, res) => {
  try {
    const body =
      req.body && Object.keys(req.body).length ? req.body : DEFAULT_ADDRESS_BODY;
    const data = await bookPageQuery(req.accessToken, body);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

app.post("/api/order/fee", requireToken, async (req, res) => {
  try {
    const data = await orderFee(req.accessToken, req.body);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

app.post("/api/order/place", requireToken, async (req, res) => {
  try {
    const data = await placeOrder(req.accessToken, req.body);
    res.json({ ok: true, data });
  } catch (e) {
    sendErr(res, e);
  }
});

function shutdown() {
  try {
    rushEngine.persistSnapshot();
  } catch (_) {
    /* ignore */
  }
  process.exit(0);
}
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

const server = http.createServer(app);
const io = new Server(server, {
  path: "/socket.io",
  cors: { origin: true, credentials: true },
});
attachRushMonitor(io);

server.listen(PORT, () => {
  proxyCache.startProxyPoolMaintenance();
  console.log(`tf-flash-server http://localhost:${PORT} DATA_DIR=${DATA_DIR}`);
  console.log(`socket.io path=/socket.io ns=/rush-monitor`);
});
