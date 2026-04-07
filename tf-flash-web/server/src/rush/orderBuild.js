function bookToReceiverInfo(book) {
  if (!book) return null;
  return {
    id: book.id,
    receiver: book.bookName,
    receiverPhone: book.bookPhone,
    receiverProvince: book.bookProvince,
    receiverCity: book.bookCity,
    receiverCounty: book.bookCounty,
    receiverAddress: book.bookAddress,
    bookDefaultStatus: book.bookDefaultStatus ?? 0,
    bookType: book.bookType ?? 1,
  };
}

function concatReceiverAddress(book) {
  if (!book) return "";
  return [
    book.bookProvince,
    book.bookCity,
    book.bookCounty,
    book.bookAddress,
  ]
    .filter(Boolean)
    .join("");
}

function buildFeeBody({ companyId, orgId, skuId, quantity, book }) {
  return {
    orderItems: [
      {
        companyId,
        orgId,
        goodsItems: [{ skuId, number: quantity }],
        useTicket: 1,
      },
    ],
    receiverAddress: concatReceiverAddress(book),
    landVerify: 1,
    ticketItems: [],
  };
}

function buildPlaceBody({
  companyId,
  orgId,
  skuId,
  quantity,
  orderPrice,
  book,
}) {
  return {
    payMethod: null,
    chkParentAuth: 0,
    orderPrice,
    buyItemInfos: [
      {
        companyId,
        orgId,
        remark: "",
        productList: [
          {
            skuId,
            num: quantity,
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
}

module.exports = {
  bookToReceiverInfo,
  concatReceiverAddress,
  buildFeeBody,
  buildPlaceBody,
};
