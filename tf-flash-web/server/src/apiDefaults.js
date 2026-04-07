/** 与本地 goods-page-list.js 默认一致，可在请求体里覆盖 */
const DEFAULT_GOODS_BODY = {
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

const DEFAULT_ADDRESS_BODY = {
  bookType: 1,
  searchName: "",
  pageNum: 1,
  bookDefaultStatus: 0,
  pageSize: 50,
};

/** 订单列表默认：与 orderList 点选「全部」tab 一致（handleChangeTabbar → state=-1, tabType=0） */
const DEFAULT_ORDER_LIST_BODY = {
  searchName: "",
  state: -1,
  tabType: 0,
  pageNum: 1,
  pageSize: 20,
  timeValue: 1,
  sortFiled: 3,
  sortType: 2,
};

module.exports = {
  DEFAULT_GOODS_BODY,
  DEFAULT_ADDRESS_BODY,
  DEFAULT_ORDER_LIST_BODY,
};
