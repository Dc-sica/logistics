/*
 * @Author: Jason_Ma
 * @Date: 2021-01-25 16:33:01
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-26 09:28:40
 * @FilePath: /hos-logistics-management/src/apis/purchaseInvoice/index.js
 */

import request from './../../config/service'

// /purchase/invoice/page 分页获取实体列表

export function getData(params) {
  return request({
    url: "purchase/invoice/page",
    method: "GET",
    params
  })
}
// /purchase/invoice/one/{id} 详情
export function getDetailById(params) {
  return request({
    url: `purchase/invoice/one/${params.id}`,
    method: "GET",
  })
}
// /purchase/invoice 更新
export function updateInvoice(params) {
  return request({
    url: `purchase/invoice`,
    method: "PUT",
    data: params
  })
}

// 根据采购订单号获取采购发票
export function detailByPurchaseOrderNumber(params) {
  return request({
    url: `purchase/invoice/detailByPurchaseOrderNumber/${params}`,
    method: "get"
  })
}
// 新增发票
export function insertInvoice(params) {
  return request({
    url: `purchase/invoice`,
    method: "post",
    data: params
  })
}
// 批量新增或修改对象
export function addorupdateBatch(params) {
  return request({
    url: `purchase/invoice/add-or-updateBatch`,
    method: "put",
    data: params
  })
}

// 获取全部采购订单好
export function OrderNumberList() {
  return request({
    url: `purchase/invoice/OrderNumberList`,
    method: "get"
  })
}
// 根据订单号获取收货单号
export function receiptListByOrderNum(param) {
  return request({
    url: `purchase/invoice/receiptListByOrderNum`,
    method: "get",
    param
  })
}