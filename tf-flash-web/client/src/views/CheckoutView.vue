<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import http from "../api/http";
import { useFlowStore } from "../stores/flow";
import { bookToReceiverInfo, concatReceiverAddress } from "../utils/address";

const router = useRouter();
const flow = useFlowStore();

const addrLoading = ref(false);
const addresses = ref([]);

const feeLoading = ref(false);
const placeLoading = ref(false);
const stepErr = ref("");

const detail = computed(() => flow.goodsDetail);
const sku = computed(() => flow.sku);
const qty = computed(() => flow.quantity);

const canCheckout = computed(
  () => detail.value && sku.value && flow.addressBook
);

const orderFee = computed(() => flow.feeResult?.data?.orderFee);

async function loadAddresses() {
  addrLoading.value = true;
  try {
    const { data } = await http.post("/api/address/list", {});
    if (!data.ok) throw new Error(data.message || "地址失败");
    const rec = data.data?.data?.records ?? [];
    addresses.value = rec;
    if (!flow.addressBook && rec.length) {
      const def = rec.find((a) => a.bookDefaultStatus === 1) || rec[0];
      flow.setAddressBook(def);
    }
  } catch (e) {
    ElMessage.error(e.response?.data?.message || e.message);
  } finally {
    addrLoading.value = false;
  }
}

function selectAddr(a) {
  flow.setAddressBook(a);
  flow.setFeeResult(null);
}

async function computeFee() {
  stepErr.value = "";
  if (!canCheckout.value) {
    stepErr.value = "请先完成：选规格、选收货地址";
    ElMessage.warning(stepErr.value);
    return;
  }
  feeLoading.value = true;
  try {
    const d = detail.value;
    const s = sku.value;
    const book = flow.addressBook;
    const body = {
      orderItems: [
        {
          companyId: d.companyId,
          orgId: d.orgId,
          goodsItems: [{ skuId: s.id, number: qty.value }],
          useTicket: 1,
        },
      ],
      receiverAddress: concatReceiverAddress(book),
      landVerify: 1,
      ticketItems: [],
    };
    const { data } = await http.post("/api/order/fee", body);
    if (!data.ok) throw new Error(data.message || "算费失败");
    flow.setFeeResult(data.data);
    ElMessage.success("已算出金额");
  } catch (e) {
    stepErr.value =
      e.response?.data?.detail?.message ||
      e.response?.data?.message ||
      e.message;
    ElMessage.error(stepErr.value);
  } finally {
    feeLoading.value = false;
  }
}

async function place() {
  stepErr.value = "";
  if (!flow.feeResult || orderFee.value == null) {
    stepErr.value = "请先计算订单金额";
    ElMessage.warning(stepErr.value);
    return;
  }
  const d = detail.value;
  const s = sku.value;
  const book = flow.addressBook;
  placeLoading.value = true;
  try {
    const body = {
      payMethod: null,
      chkParentAuth: 0,
      orderPrice: orderFee.value,
      buyItemInfos: [
        {
          companyId: d.companyId,
          orgId: d.orgId,
          remark: "",
          productList: [
            {
              skuId: s.id,
              num: qty.value,
              pullerId: null,
              expectedDeliveryTime: null,
            },
          ],
        },
      ],
      receiverInfo: bookToReceiverInfo(book),
      remark: "",
      orderSource: 3,
      validCode: "",
      orderType: 1,
      deliveryMethod: 2,
      cartIds: [],
      applyType: 1,
    };
    const { data } = await http.post("/api/order/place", body);
    if (!data.ok) throw new Error(data.message || "下单失败");
    const msg = JSON.stringify(data.data?.data ?? data.data, null, 2);
    await ElMessageBox.alert(
      "请到「我的订单」或支付页核实。\n\n" + msg,
      "下单接口已返回",
      { confirmButtonText: "知道了", type: "success" }
    );
  } catch (e) {
    stepErr.value =
      e.response?.data?.detail?.message ||
      e.response?.data?.message ||
      e.message;
    ElMessage.error(stepErr.value);
  } finally {
    placeLoading.value = false;
  }
}

watch([detail, sku], () => flow.setFeeResult(null));

onMounted(() => {
  if (!detail.value || !sku.value) {
    router.replace({ name: "goods" });
    return;
  }
  loadAddresses();
});
</script>

<template>
  <div v-if="!detail || !sku">
    <el-card>
      <el-text>请先从商品页选择规格。</el-text>
      <div class="mt">
        <el-button type="primary" @click="router.push({ name: 'goods' })">
          去选商品
        </el-button>
      </div>
    </el-card>
  </div>
  <div v-else>
    <el-card shadow="hover" class="mb">
      <template #header>
        <span>结算</span>
      </template>
      <div class="sum">
        <div class="goods-line">{{ detail.name }}</div>
        <el-text type="info">{{ sku.skuName }} × {{ qty }}</el-text>
      </div>
    </el-card>

    <el-card shadow="hover" class="mb">
      <div class="addr-head">
        <span class="card-title">收货地址</span>
        <el-button size="small" :loading="addrLoading" @click="loadAddresses">
          刷新
        </el-button>
      </div>
      <div class="addr-list">
        <el-card
          v-for="a in addresses"
          :key="a.id"
          shadow="never"
          class="addr-card"
          :class="{ 'is-active': flow.addressBook?.id === a.id }"
          @click="selectAddr(a)"
        >
          <div>
            <span class="strong">{{ a.bookName }} {{ a.bookPhone }}</span>
            <el-tag v-if="a.bookDefaultStatus === 1" size="small" class="tag">
              默认
            </el-tag>
          </div>
          <el-text type="info" size="small" class="addr-line">
            {{ a.bookProvince }}{{ a.bookCity }}{{ a.bookCounty
            }}{{ a.bookAddress }}
          </el-text>
        </el-card>
      </div>
    </el-card>

    <el-card shadow="hover">
      <template #header>
        <span>费用与下单</span>
      </template>
      <el-alert
        v-if="stepErr"
        type="error"
        :title="stepErr"
        show-icon
        :closable="false"
        class="mb-alert"
      />
      <el-text v-if="orderFee != null" type="success" class="fee-big">
        应付合计（含运费等）：¥{{ orderFee }}
      </el-text>
      <div class="row-btns">
        <el-button
          type="primary"
          :disabled="!canCheckout || feeLoading"
          :loading="feeLoading"
          @click="computeFee"
        >
          {{ feeLoading ? "算费中…" : "计算运费与金额" }}
        </el-button>
        <el-button
          type="danger"
          :disabled="orderFee == null || placeLoading"
          :loading="placeLoading"
          @click="place"
        >
          {{ placeLoading ? "提交中…" : "提交订单（真实下单）" }}
        </el-button>
      </div>
      <el-text type="info" size="small" class="warn">
        「提交订单」将调用官方下单接口，可能产生待支付订单，请谨慎操作。
      </el-text>
    </el-card>
  </div>
</template>

<style scoped>
.mb {
  margin-bottom: 16px;
}
.mb-alert {
  margin-bottom: 12px;
}
.mt {
  margin-top: 12px;
}
.sum .goods-line {
  font-weight: 600;
  margin-bottom: 6px;
}
.addr-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.card-title {
  font-weight: 600;
}
.addr-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.addr-card {
  cursor: pointer;
  transition: border-color 0.15s;
}
.addr-card.is-active {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}
.strong {
  font-weight: 600;
}
.tag {
  margin-left: 8px;
  vertical-align: middle;
}
.addr-line {
  display: block;
  margin-top: 4px;
}
.fee-big {
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  margin: 12px 0;
}
.row-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}
.warn {
  display: block;
  margin-top: 16px;
  line-height: 1.55;
}
</style>
