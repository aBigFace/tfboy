# TF 商城网页流程（Vue + Express）

将此前脚本里的接口串成完整链路：**登录 → 商品列表 → 选 SKU → 地址 →算费（order-fee）→ 提交订单（placeOrder）**。

## 结构

- `server/`：Express 代理到 `https://app.tfent.cn`（解决浏览器 CORS；登录 RSA 在服务端完成）。
- `client/`：Vue 3 + Vite + Pinia + Vue Router + Axios；开发时通过 Vite 把 `/api` 代理到本机后端。

## 运行

终端 1 — 后端（默认 `3001`）：

```bash
cd tf-flash-web/server
npm install
npm start
```

终端 2 — 前端（默认 `5173`，代理 `/api` → `http://127.0.0.1:3001`）：

```bash
cd tf-flash-web/client
npm install
npm run dev
```

浏览器打开终端里提示的本地地址（一般为 `http://localhost:5173`）。

### 登录态失效自动重登（商城 Token）

在 **商城登录** 页成功登录后，会把账号密码写入 `sessionStorage`（仅本机标签页），供 Axios 拦截器在 **HTTP 401** 或接口文案含 **「账号在其他地方登录」** 等情况时，自动调用 `/api/auth/login` **重登一次并重试原请求**（仅重试 1 次）。显式 **退出** 会清除已存密码；若自动重登失败则只清 Token、保留已存密码便于再次手动登录。

## 环境变量（可选）

配置文件**只放在本仓库 `tf-flash-web` 内**（抽离后独立使用，不依赖上层目录的 `.env`）：

1. **`server/.env`**（推荐，与后端同目录）
2. 或 **`tf-flash-web/.env`**（仓库根，仅在不存在 `server/.env` 时加载）

示例键值见 **`server/.env.example`**（复制为 `server/.env` 即可）。

- **`PORT`**：后端端口（代码默认 `10094`；开发时若 Vite 代理仍指向 `3001`，请设为 `3001` 或同步修改 `client/vite.config.js`）。
- **`TF_DATA_DIR`**：抢购与持久化 JSON 目录；不设则使用 **`tf-flash-web/data/`**。多实例部署时为每进程指定不同目录与端口。
- **`TF_DEBUG_API`**：设为 `1` 或 `true` 时打印发往官方的请求（脱敏）；**默认不打印**。
- **`TF_STOCK_HIT_MAX`** / **`TF_RUSH_PLACE_FANOUT`**：抢购相关数值调优（见 `server/src/rush/rushEngine.js`），一般可省略。

## 注意

- 「提交订单」会调用真实 **`place-order/mallOrder/placeOrder`**，可能产生真实待支付单，请谨慎使用。
- **`POST /api/goods/page-list`** 与抢购里的商品列表代理：**发往官方时不带 `Authorization`**（不要求浏览器商城登录）。地址 / 算费 / 下单等仍要带登录态。SKU 详情接口商城页仍按原逻辑带 token；抢购里 **回流查库存** 的 `getShelvesSku` 也不带 token。
- 商品列表默认请求体与本地 `goods-page-list.js` 一致；需要可自行改 `server/src/apiDefaults.js` 里的 `DEFAULT_GOODS_BODY`，或后续给前端加「编辑 JSON」能力。

## 抢购任务中心（多账号）

浏览器打开 **`/rush`**（导航「抢购任务」），与「商城登录」独立：在页内添加 **多个账号**，服务端会写入 **`server/data/rush-accounts.json`**（已 `.gitignore`，勿提交仓库）：保存用户名、明文密码、`access_token` 与 `currentUser` 等；**每次增删改 token 刷新都会写盘**，进程收到 SIGINT/SIGTERM 时会再落盘一次。**任务列表**写入 **`server/data/rush-tasks.json`**（新建 / 删除 / 启停等都会 `saveTasks`），重启后端后任务配置仍在；为安全起见，启动时会把所有任务的 **`running` 置为 false**（避免孤儿定时器），需手动再点「开始」。前端会把「新建任务」表单草稿写入 **localStorage**，刷新页面后自动尝试恢复（账号 id 仍须存在）。

- **代理（抢购波次）**：每一波从取号接口拿到线路后，须带 **`httpsAgent`** 再请求官方；若本轮配置里**没有走代理（直连）**，则**整波跳过**，不发起查库存 / 算费 / 下单（避免误直连）。
- **回流**：只配置 **`pollIntervalMs`**。`setInterval` 到点即 `fireWave`，**不 await** 上一波，一波内：查库存 → 有货则算费 → 下单；多账号多任务各跑各的定时器，**彼此并发**。
- **定时**：配置 **`scheduledAt`**（开始时间，建议 **`YYYY-MM-DD HH:mm:ss.SSS`** 本地时间，含毫秒；也支持中间为 `T`）、**`pollIntervalMs`**（波次间隔，与回流相同，≥50）、**`scheduledDurationSec`**（从「开始时间」起算持续多少秒后**自动停止**）。到点后先打 **1 波**，再按间隔重复；到时满后停表。旧版仅单次波次的任务在启动时会迁默认间隔 500ms、持续 60s（并写回 `rush-tasks.json`）。若设置了 **`DM_PROXY_FETCH_URL`**，每一波会先按缓存取代理（15s 有效），过期再拉新 IP，再走官方接口。
- 日志：`GET /api/rush/tasks/:id/logs`，页面约 1.5s 轮询刷新运行中任务。
- **发往官方是否带 `Authorization`**：你要求「查询」里**只有** **`pageListForShopMall`（商品列表）** 与 **`getShelvesSku`（SKU）** 这两类转发 **不带** Bearer；抢购**每一波里查库存**也是 `getShelvesSku`，同样不带。**订单列表、地址、取消订单、算费 / 下单** 等仍用抢购账号 token。

- **提交记录**：任务每次 **`placeOrder` 真正成功** 会在该任务的 `placeRecords` 里追加一条（时间、`orderIds`、商品/SKU、数量），写入 **`rush-tasks.json`**，单任务最多约 80 条（滚动淘汰最旧）；与内存日志互补，重启后仍能看见历史成单。

风险：回流重叠波次可能在有货时 **重复下单**，请自行控制间隔与停任务时机。
