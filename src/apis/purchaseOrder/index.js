/*
 * @Author: Jason_Ma
 * @Date: 2021-01-26 10:12:27
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-18 14:03:21
 * @FilePath: /hos-logistics-management/src/apis/purchaseOrder/index.js
 */

import request from './../../config/service'


// /purchase/order/listPage 列表

export function getList(params) {
  return request({
    url: 'purchase/order/page',
    method: "GET",
    params
  })
}
// /purchase/order/approval  更新 撤回
export function approvalItem(params) {
  return request({
    url: 'purchase/order/approval',
    method: "PUT",
    data: params
  })
}

// /purchase/order/add 
export function addItem(params) {
  return request({
    url: 'purchase/order/add ',
    method: "POST",
    data: params
  })
}
// /purchase/order/detail  详情
export function getInfoById(params) {
  return request({
    url: `purchase/order/detail`,
    method: "GET",
    params
  })
}
//导出订单审批数据
export function exportPurchaseOrder(params) {
  return request({
    url: `purchase/order/exportPurchaseOrder`,
    method: "POST",
    data: params,
    responseType: 'blob'
  })
}

//根据采购定单号获取采购收货订单详情
export function detailByPurchaseOrderId(params) {
  return request({
    url: `purchase/receipt/detailByPurchaseOrderId`,
    method: "GET",
    params
  })
}
