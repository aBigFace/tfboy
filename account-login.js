/**
 * 时代峰峻小程序账号密码登录（Node.js）
 * 与源代码中 accountLogin + rsa.js + apiUserAccountLogin 行为对齐。
 *
 * 用法:
 *   在同目录 .env 中配置 TF_USERNAME、TF_PASSWORD，然后:
 *   node account-login.js
 *   未设置的键也可在 shell 中覆盖: TF_USERNAME=xxx TF_PASSWORD=yyy node account-login.js
 *
 * 勿将 .env、account-login.json（含 token）提交到 Git。
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const BASE = "https://app.tfent.cn";

/** 与当前脚本同名：`account-login.js` → `account-login.json` */
const LOGIN_JSON_PATH = path.join(
  __dirname,
  path.basename(__filename, path.extname(__filename)) + ".json"
);

/** 从脚本所在目录读取 .env（不覆盖已有 process.env） */
function loadEnvFile() {
  const filePath = path.join(__dirname, ".env");
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadEnvFile();

const USERNAME = process.env.TF_USERNAME || "";
const PASSWORD = process.env.TF_PASSWORD || "";

/** JSEncrypt/vendor.js 中的 Ra：把十六进制串编码成其使用的 Base64 字母表（非标准 hex→bytes→b64） */
function raFromHex(hex) {
  const Ca =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let r = "";
  let t;
  let n;
  for (t = 0; t + 3 <= hex.length; t += 3) {
    n = parseInt(hex.slice(t, t + 3), 16);
    r += Ca.charAt(n >> 6) + Ca.charAt(63 & n);
  }
  if (t + 1 === hex.length) {
    n = parseInt(hex.slice(t, t + 1), 16);
    r += Ca.charAt(n << 2);
  } else if (t + 2 === hex.length) {
    n = parseInt(hex.slice(t, t + 2), 16);
    r += Ca.charAt(n >> 2) + Ca.charAt((3 & n) << 4);
  }
  while ((3 & r.length) > 0) r += "=";
  return r;
}

/** 与 vendor.js setSplitChn 一致：按 UTF-16 码元估算字节宽度后切分 */
function setSplitChn(str, maxBytes, acc = []) {
  let byteSum = 0;
  for (let o = 0; o < str.length; o++) {
    const s = str.charCodeAt(o);
    const add = s <= 127 ? 1 : s <= 2047 ? 2 : s <= 65535 ? 3 : 4;
    if (byteSum + add > maxBytes) {
      acc.push(str.slice(0, o));
      return setSplitChn(str.slice(o), maxBytes, acc);
    }
    byteSum += add;
  }
  acc.push(str);
  return acc;
}

function derBase64ToPemPublicKey(b64) {
  const body = b64.replace(/\s/g, "");
  const lines = body.match(/.{1,64}/g) || [body];
  return `-----BEGIN PUBLIC KEY-----\n${lines.join("\n")}\n-----END PUBLIC KEY-----`;
}

async function fetchPublicKeyB64() {
  const url = `${BASE}/out-api/auth/login/getPublicKey`;
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      sysCode: "tf",
    },
  });
  const json = await res.json();
  if (json.code !== 200 || !json.data?.publicKey) {
    throw new Error(`getPublicKey 异常: ${JSON.stringify(json)}`);
  }
  return json.data.publicKey;
}

/**
 * 与 utils/rsa.js getRsaCode：JSEncrypt.encryptLong + Ra 输出一致
 */
function getRsaCode(passwordPlain, publicKeyPem) {
  const key = crypto.createPublicKey(publicKeyPem);
  const modLen = key.asymmetricKeyDetails?.modulusLength;
  if (!modLen) throw new Error("无法读取 RSA 模数位长度");
  const t = modLen / 8;
  const maxChunk = t - 11;
  const chunks = setSplitChn(passwordPlain, maxChunk);
  let hexConcat = "";
  for (const chunk of chunks) {
    const buf = crypto.publicEncrypt(
      {
        key: publicKeyPem,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(chunk, "utf8")
    );
    let h = buf.toString("hex");
    while (h.length < 2 * t) h = "0" + h;
    hexConcat += h;
  }
  return raFromHex(hexConcat);
}

async function accountLogin(username, passwordPlain) {
  const pubKeyB64 = await fetchPublicKeyB64();
  const pem = derBase64ToPemPublicKey(pubKeyB64);
  const enc = getRsaCode(passwordPlain, pem);
  const passwordParam = encodeURIComponent(enc);

  const tokenUrl =
    `${BASE}/out-api/auth/oauth/token` +
    `?grant_type=password` +
    `&username=${encodeURIComponent(username)}` +
    `&client_id=tf&client_secret=123` +
    `&password=${passwordParam}` +
    `&loginPlatform=2`;

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      sysCode: "tf",
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(
      `HTTP ${res.status} ${JSON.stringify(data)}`
    );
    err.response = { status: res.status, body: data };
    throw err;
  }
  if (data.code !== undefined && data.code !== 200) {
    throw new Error(`业务错误: ${JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  if (!USERNAME || !PASSWORD) {
    console.error(
      "请配置账号密码：在同级目录 .env 中写入\n" +
        "  TF_USERNAME=手机号或邮箱\n" +
        "  TF_PASSWORD=登录密码\n" +
        "或在命令行前设置同名环境变量。"
    );
    process.exitCode = 1;
    return;
  }
  console.log("登录账号:", USERNAME);
  try {
    const ret = await accountLogin(USERNAME, PASSWORD);
    const outText = JSON.stringify(ret, null, 2);
    fs.writeFileSync(LOGIN_JSON_PATH, outText, "utf8");
    console.log("已写入:", LOGIN_JSON_PATH);
    console.log("登录成功，完整响应 JSON：");
    console.log(outText);
  } catch (e) {
    console.error(e.message);
    if (e.response?.body !== undefined) {
      console.error("完整错误响应 JSON：");
      console.error(JSON.stringify(e.response.body, null, 2));
    }
    if (e.response?.body?.error === "invalid_grant") {
      console.error("OAuth: 账号或密码错误（或服务端拒绝）");
    }
    process.exitCode = 1;
  }
}

main();
