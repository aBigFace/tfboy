<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "../api/http";
import { useFlowStore } from "../stores/flow";

const route = useRoute();
const router = useRouter();
const flow = useFlowStore();

const loading = ref(false);
const detail = ref(null);
const selectedSkuId = ref(null);
const qty = ref(1);

const skuList = computed(() => detail.value?.goodsSkuList ?? []);

const selectedSku = computed(() =>
  skuList.value.find((s) => s.id === selectedSkuId.value)
);

async function load() {
  loading.value = true;
  detail.value = null;
  try {
    const goodsId = route.params.goodsId;
    const { data } = await http.get(`/api/goods/sku/${goodsId}`);
    if (!data.ok) throw new Error(data.message || "加载失败");
    detail.value = data.data?.data ?? data.data;
    const list = detail.value?.goodsSkuList ?? [];
    selectedSkuId.value = list[0]?.id ?? null;
  } catch (e) {
    ElMessage.error(e.response?.data?.message || e.message);
  } finally {
    loading.value = false;
  }
}

function next() {
  if (!selectedSku.value) {
    ElMessage.warning("请选择规格");
    return;
  }
  flow.setGoodsDetail(detail.value);
  flow.setSku(selectedSku.value, Math.max(1, Number(qty.value) || 1));
  router.push({ name: "checkout" });
}

watch(
  () => route.params.goodsId,
  () => load(),
  { immediate: true }
);
</script>

<template>
  <el-skeleton v-if="loading" :rows="8" animated />

  <div v-else-if="detail">
    <el-card shadow="hover" class="mb">
      <h2 class="h2">{{ detail.name }}</h2>
      <el-text type="info" size="small">
        goodsId {{ detail.goodsId }} · {{ detail.orgId }} / {{ detail.companyId }}
      </el-text>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span>选择规格</span>
      </template>
      <el-text type="info" size="small" class="hint">
        无库存规格也可选（后续算费/下单以接口为准）。
      </el-text>

      <el-radio-group v-model="selectedSkuId" class="sku-group">
        <div
          v-for="s in skuList"
          :key="s.id"
          class="sku-row"
        >
          <el-radio :value="s.id" border class="sku-radio">
            <div class="sku-body">
              <span class="sku-name">{{ s.skuName }}</span>
              <el-text type="info" size="small" class="sku-meta">
                ¥{{ s.sellPrice }} · 库存 {{ s.stock }}
                <el-tag v-if="s.stock <= 0" type="warning" size="small" class="zero-tag">
                  无库存
                </el-tag>
              </el-text>
            </div>
          </el-radio>
        </div>
      </el-radio-group>

      <el-form-item label="数量" class="q">
        <el-input-number v-model="qty" :min="1" />
      </el-form-item>

      <div class="actions">
        <el-button type="primary" @click="next">去结算 · 算费下单</el-button>
        <el-button @click="router.back()">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.mb {
  margin-bottom: 16px;
}
.h2 {
  margin: 0 0 8px;
  font-size: 1.25rem;
}
.hint {
  display: block;
  margin-bottom: 12px;
}
.sku-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}
.sku-row {
  margin-bottom: 10px;
}
.sku-radio {
  width: 100%;
  height: auto;
  margin-right: 0;
  align-items: flex-start;
  padding: 10px 12px;
}
.sku-radio :deep(.el-radio__label) {
  width: 100%;
}
.sku-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.sku-name {
  font-size: 0.95rem;
}
.zero-tag {
  margin-left: 8px;
  vertical-align: middle;
}
.q {
  margin-top: 16px;
  max-width: 200px;
}
.actions {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
