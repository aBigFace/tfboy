import { defineStore } from "pinia";

export const useFlowStore = defineStore("flow", {
  state: () => ({
    /** 列表页点击携带的简要信息 */
    goodsPick: null,
    /** GET sku 接口返回的 data */
    goodsDetail: null,
    /** goodsSkuList 中的一项 */
    sku: null,
    quantity: 1,
    /** gis book 一条 */
    addressBook: null,
    /** order-fee 完整响应 */
    feeResult: null,
  }),
  actions: {
    setGoodsPick(row) {
      this.goodsPick = row;
    },
    setGoodsDetail(d) {
      this.goodsDetail = d;
    },
    setSku(sku, qty) {
      this.sku = sku;
      this.quantity = qty;
    },
    setAddressBook(row) {
      this.addressBook = row;
    },
    setFeeResult(res) {
      this.feeResult = res;
    },
    resetAfterLogin() {
      this.goodsPick = null;
      this.goodsDetail = null;
      this.sku = null;
      this.quantity = 1;
      this.addressBook = null;
      this.feeResult = null;
    },
  },
});
