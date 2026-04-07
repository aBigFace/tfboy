/**
 * 计算订单费用 fee/compute/order-fee（与小程序 apiGetConfirmOrder 一致）
 *
 *   node order-fee.js
 *
 * 默认请求体与抓包一致；整单 JSON 覆盖：
 *   ORDER_FEE_BODY='{"orderItems":[...],"receiverAddress":"...","landVerify":1,"ticketItems":[]}' node order-fee.js
 *
 * 或从文件读请求体（UTF-8 JSON）：
 *   ORDER_FEE_REQUEST_JSON=./my-request.json node order-fee.js
 *
 * Token：account-login.json（或 TF_LOGIN_JSON）
 * 结果：order-fee.json
 */

const fs = require("fs");
const path = require("path");

const BASE = "https://app.tfent.cn";

const LOGIN_JSON_PATH =
  process.env.TF_LOGIN_JSON ||
  path.join(__dirname, "account-login.json");

const OUTPUT_JSON_PATH = path.join(
  __dirname,
  path.basename(__filename, path.extname(__filename)) + ".json"
);

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf254162e) XWEB/18163";

/** 与提供 curl 的 -d 一致 */
const DEFAULT_BODY = {
  orderItems: [
    {
      companyId: 2,
      orgId: 35,
      goodsItems: [{ skuId: 2937, number: 1 }],
      useTicket: 1,
    },
  ],
  receiverAddress: "四川省巴中市巴州区王爷庙1号",
  landVerify: 1,
  ticketItems: [],
};

function resolveRequestBody() {
  const filePath = process.env.ORDER_FEE_REQUEST_JSON;
  if (filePath) {
    const abs = path.isAbsolute(filePath)
      ? filePath
      : path.join(__dirname, filePath);
    return JSON.parse(fs.readFileSync(abs, "utf8"));
  }
  const raw = process.env.ORDER_FEE_BODY;
  if (raw && String(raw).trim()) {
    return JSON.parse(raw);
  }
  return DEFAULT_BODY;
}

function loadAccessToken() {
  if (!fs.existsSync(LOGIN_JSON_PATH)) {
    throw new Error(
      `找不到登录文件: ${LOGIN_JSON_PATH}\n请先运行 node account-login.js`
    );
  }
  const login = JSON.parse(fs.readFileSync(LOGIN_JSON_PATH, "utf8"));
  const token = login.access_token;
  if (!token) throw new Error(`${LOGIN_JSON_PATH} 中缺少 access_token`);
  return token;
}

async function fetchOrderFee(accessToken, body) {
  const url = `${BASE}/fee/compute/order-fee`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sysCode: "tf",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${JSON.stringify(data)}`);
    err.response = { status: res.status, body: data };
    throw err;
  }
  if (data.code !== undefined && data.code !== 200) {
    const err = new Error(data.message || JSON.stringify(data));
    err.body = data;
    throw err;
  }
  return data;
}

async function main() {
  try {
    const token = loadAccessToken();
    const body = resolveRequestBody();
    const ret = await fetchOrderFee(token, body);
    fs.writeFileSync(
      OUTPUT_JSON_PATH,
      JSON.stringify(ret, null, 2),
      "utf8"
    );
    console.log("已写入:", OUTPUT_JSON_PATH);
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}

main();
