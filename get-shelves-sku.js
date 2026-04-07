/**
 * 货架 SKU 明细 GET goods/shelves/getShelvesSku/:goodsId?applyType=1
 *
 * goodsId：默认从同级 goods-page-list.json 的 data.records 里交互选择；
 * 也可非交互：GOODS_ID=1541 node get-shelves-sku.js
 *
 * Token：account-login.json（或 TF_LOGIN_JSON）
 * 结果：get-shelves-sku.json（与脚本同名）
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const BASE = "https://app.tfent.cn";

const LOGIN_JSON_PATH =
  process.env.TF_LOGIN_JSON ||
  path.join(__dirname, "account-login.json");

const GOODS_LIST_JSON_PATH =
  process.env.TF_GOODS_LIST_JSON ||
  path.join(__dirname, "goods-page-list.json");

const OUTPUT_JSON_PATH = path.join(
  __dirname,
  path.basename(__filename, path.extname(__filename)) + ".json"
);

const APPLY_TYPE = process.env.APPLY_TYPE || "1";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf254162e) XWEB/18163";

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

function loadGoodsRecords() {
  if (!fs.existsSync(GOODS_LIST_JSON_PATH)) {
    throw new Error(
      `找不到商品列表: ${GOODS_LIST_JSON_PATH}\n请先运行 node goods-page-list.js`
    );
  }
  const j = JSON.parse(fs.readFileSync(GOODS_LIST_JSON_PATH, "utf8"));
  const records = j?.data?.records;
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error(
      `${GOODS_LIST_JSON_PATH} 中无 data.records，请先拉取商城列表`
    );
  }
  return records;
}

function pickGoodsId(records, line) {
  const t = line.trim();
  if (!t) throw new Error("输入为空");
  const num = parseInt(t, 10);
  if (Number.isNaN(num)) throw new Error("请输入数字：序号或 goodsId");

  const n = records.length;
  if (num >= 1 && num <= n) {
    return records[num - 1].goodsId;
  }
  const byId = records.find((r) => r.goodsId === num);
  if (byId) return num;
  throw new Error(`未找到 goodsId ${num}，请输入 1～${n} 的序号或有效 goodsId`);
}

function askLine(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(prompt, (ans) => {
      rl.close();
      resolve(ans);
    });
  });
}

async function chooseGoodsId(records) {
  const envId = process.env.GOODS_ID;
  if (envId !== undefined && String(envId).trim() !== "") {
    return pickGoodsId(records, String(envId));
  }

  const w = String(records.length).length;
  console.log(
    `从 goods-page-list.json 读取到以下商品（输入序号 1～${records.length}，或直接输入 goodsId 回车）：\n`
  );
  records.forEach((r, i) => {
    const name = (r.name || r.saleName || "").replace(/\s+/g, " ");
    const short = name.length > 50 ? name.slice(0, 47) + "..." : name;
    const idx = String(i + 1).padStart(w, " ");
    console.log(`  [${idx}] goodsId=${r.goodsId}  ${short}`);
  });
  console.log("");
  const ans = await askLine(`请选择 [1-${records.length}] 或 goodsId: `);
  return pickGoodsId(records, ans);
}

async function fetchShelvesSku(accessToken, goodsId) {
  const url = `${BASE}/goods/shelves/getShelvesSku/${goodsId}?applyType=${encodeURIComponent(APPLY_TYPE)}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      sysCode: "tf",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": USER_AGENT,
    },
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
    const records = loadGoodsRecords();
    const goodsId = await chooseGoodsId(records);
    console.log("请求 goodsId:", goodsId, "applyType:", APPLY_TYPE);

    const ret = await fetchShelvesSku(token, goodsId);
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
