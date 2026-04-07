const crypto = require("crypto");

const Ca =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function raFromHex(hex) {
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

module.exports = { derBase64ToPemPublicKey, getRsaCode };
