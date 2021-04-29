/*
 * @Author: Jason_Ma
 * @Date: 2021-01-25 16:23:12
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-02 17:30:26
 * @FilePath: /hos-logistics-management/src/apis/purchaseReceipt/index.js
 */

import request from './../../config/service'
// /purchase/receipt/page 列表
export function getList (params) {
  return request({
    url: 'purchase/receipt/page',
    method: "GET",
    params
  })
}
// /purchase/receipt/detail 收货单详情
export function getDetail (params) {
  return request({
    url: 'purchase/receipt/detail',
    method: "GET",
    params
  })
}

//   /purchase/order/detail 订单详情
export function getOrderDetail (params) {
  return request({
    url: 'purchase/order/detail',
    method: "GET",
    params
  })
}


// /purchase/receipt   //过账
export function updateItem (params) {
  return request({
    url: 'purchase/receipt',
    method: "PUT",
    data: params
  })
}

// /purchase/receipt/add   新增采购收货
export function addReceiptItem (params) {
  return request({
    url: 'purchase/receipt/add',
    method: "POST",
    data: params
  })
}



// /purchase/receipt/downloadPDF  打印
export function downloadPDF (params) {
  return request({
    url: `purchase/receipt/downloadPDF?purchaseReceiptId=${params.purchaseReceiptId}`,
    method: "GET",
  })
}
// 更新过账状态
export function updateByPurchaseReceiptOrderNum (params) {
  return request({
    url: `purchase/receipt/updateByPurchaseReceiptOrderNum`,
    method: "put",
    data:params
  })
}

