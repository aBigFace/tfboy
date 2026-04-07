/** 地址簿记录 → 下单 receiverInfo（与小程序字段对齐） */
export function bookToReceiverInfo(book) {
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

export function concatReceiverAddress(book) {
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
