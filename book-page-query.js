/**
 * 收货地址分页查询 gis/book/pageQuery（与小程序 apiGetAddressList 一致）
 *
 *   node book-page-query.js
 *
 * 可选环境变量（默认与抓包一致）：
 *   BOOK_TYPE=1  SEARCH_NAME=  PAGE_NUM=1  BOOK_DEFAULT_STATUS=0  PAGE_SIZE=10
 *
 * Token：account-login.json（或 TF_LOGIN_JSON）
 * 结果：book-page-query.js → book-page-query.json
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

const REQUEST_BODY = {
  bookType: Number(process.env.BOOK_TYPE ?? 1),
  searchName: process.env.SEARCH_NAME ?? "",
  pageNum: Number(process.env.PAGE_NUM ?? 1),
  bookDefaultStatus: Number(process.env.BOOK_DEFAULT_STATUS ?? 0),
  pageSize: Number(process.env.PAGE_SIZE ?? 10),
};

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

async function fetchBookPageQuery(accessToken) {
  const url = `${BASE}/gis/book/pageQuery`;
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
    const ret = await fetchBookPageQuery(token);
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
