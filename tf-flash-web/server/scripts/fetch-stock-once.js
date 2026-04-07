/**
 * 独立脚本：直连 GET 一次货架 SKU（无 token，与抢购波次内查库存一致，不经代理）
 *
 * 用法（在 server 目录下）：
 *   node scripts/fetch-stock-once.js 1541
 *   npm run fetch-stock -- 1541
 */

const { getShelvesSku } = require("../src/tfApi");

const TIMEOUT_MS = 25_000;

async function main() {
  const goodsId = Number(
    process.argv[2] || process.env.GOODS_ID || ""
  );
  if (!Number.isFinite(goodsId) || goodsId < 1) {
    console.error("请提供 goodsId，例如: node scripts/fetch-stock-once.js 1541");
    process.exit(1);
  }

  console.log("getShelvesSku（直连官方，无代理）…");
  const t0 = Date.now();
  const res = await getShelvesSku(null, Math.floor(goodsId), 1, {
    timeout: TIMEOUT_MS,
  });
  console.log(`   耗时 ${Date.now() - t0}ms`);

  const inner = res && res.data !== undefined ? res.data : res;
  const list = inner?.goodsSkuList || [];
  console.log(`goodsSkuList 共 ${list.length} 条`);
  for (const s of list) {
    console.log(
      `   - id=${s.id} stock=${s.stock} name=${s.skuName || s.skuTitle || ""}`
    );
  }
  console.log("\n原始 data（截断）:");
  console.log(JSON.stringify(inner ?? res, null, 2).slice(0, 4000));
}

main().catch((e) => {
  console.error("失败:", e.message);
  if (e.response) {
    console.error(
      "HTTP",
      e.response.status,
      String(e.response.data).slice(0, 500)
    );
  }
  process.exit(1);
});
