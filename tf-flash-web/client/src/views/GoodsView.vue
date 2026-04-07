<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import http from "../api/http";
import { useFlowStore } from "../stores/flow";

const router = useRouter();
const flow = useFlowStore();

const loading = ref(false);
const records = ref([]);

async function load() {
  loading.value = true;
  try {
    const { data } = await http.post("/api/goods/page-list", {});
    if (!data.ok) throw new Error(data.message || "加载失败");
    records.value = data.data?.data?.records ?? [];
  } catch (e) {
    ElMessage.error(e.response?.data?.message || e.message);
    records.value = [];
  } finally {
    loading.value = false;
  }
}

function openProduct(row) {
  flow.setGoodsPick({
    goodsId: row.goodsId,
    name: row.name || row.saleName,
    sellPrice: row.sellPrice,
  });
  router.push({ name: "product", params: { goodsId: String(row.goodsId) } });
}

onMounted(load);
</script>

<template>
  <div>
    <el-card shadow="hover" class="head-card">
      <div class="head-row">
        <span class="title">商品列表</span>
        <el-button :loading="loading" @click="load">刷新</el-button>
      </div>
    </el-card>

    <el-skeleton v-if="loading && !records.length" :rows="6" animated />

    <el-row v-else :gutter="14" class="grid">
      <el-col
        v-for="g in records"
        :key="g.goodsId"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card
          shadow="hover"
          class="item-card"
          @click="openProduct(g)"
        >
          <div class="thumb-wrap">
            <el-image
              v-if="g.imgUrl"
              :src="g.imgUrl"
              fit="cover"
              class="thumb"
              lazy
            />
          </div>
          <div class="meta">
            <div class="name">{{ g.name || g.saleName }}</div>
            <el-text type="info" size="small">
              ¥{{ g.sellPrice }} · ID {{ g.goodsId }}
            </el-text>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty
      v-if="!loading && !records.length"
      description="暂无商品，请检查接口或登录态。"
    />
  </div>
</template>

<style scoped>
.head-card {
  margin-bottom: 16px;
}
.head-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 1.1rem;
  font-weight: 600;
}
.grid {
  margin-top: 0 !important;
}
.item-card {
  margin-bottom: 14px;
  cursor: pointer;
  transition: transform 0.12s ease;
}
.item-card:hover {
  transform: translateY(-2px);
}
.thumb-wrap {
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin: -12px -12px 12px;
  background: var(--el-fill-color-darker);
}
.thumb {
  width: 100%;
  height: 140px;
  display: block;
}
.meta .name {
  font-size: 0.95rem;
  line-height: 1.35;
  margin-bottom: 6px;
}
</style>
