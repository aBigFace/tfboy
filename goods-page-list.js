/**
 * 商城 SPU 分页列表（与小程序 goods/goodsSpu/pageListForShopMall 一致）
 *
 * Token：读取与脚本同目录的 account-login.json（可先运行 account-login.js）
 *
 *   node goods-page-list.js
 *
 * 指定登录快照文件：
 *   TF_LOGIN_JSON=D:\\path\\to\\account-login.json node goods-page-list.js
 *
 * 结果落盘：与脚本同名 json（goods-page-list.js → goods-page-list.json），
 * 内容为接口完整响应。
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

/** 与提供 curl 的 -d 一致 */
const REQUEST_BODY = {
  companyId: 2,
  goodsIds: [
    1601, 1591, 1592, 1590, 1587, 1588, 1545, 1357, 1356, 1539, 1540, 1541, 1526,
    1497, 1498, 1499, 1500, 1501, 1502, 1495, 1496, 1504, 1503, 1361, 1279, 1280,
    1145, 284, 1191,
  ],
  pageNum: 1,
  pageSize: 29,
  sortFieldType: 0,
  sortType: 0,
  applyType: 1,
};

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf254162e) XWEB/18163";

function loadAccessToken() {
  if (!fs.existsSync(LOGIN_JSON_PATH)) {
    throw new Error(
      `找不到登录文件: ${LOGIN_JSON_PATH}\n请先运行 node account-login.js 生成 account-login.json`
    );
  }
  const login = JSON.parse(fs.readFileSync(LOGIN_JSON_PATH, "utf8"));
  const token = login.access_token;
  if (!token) throw new Error(`${LOGIN_JSON_PATH} 中缺少 access_token`);
  return token;
}

async function fetchPageList(accessToken) {
  const url = `${BASE}/goods/goodsSpu/pageListForShopMall`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      sysCode: "tf",
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(REQUEST_BODY),
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
    const ret = await fetchPageList(token);
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
