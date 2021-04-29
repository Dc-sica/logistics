/*
 * @Author: Jason_Ma
 * @Date: 2021-01-21 14:37:21
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-28 13:40:28
 * @FilePath: /hos-logistics-management/src/apis/purchaseApproval/index.js
 */


import request from './../../config/service'

// /purchase/request/page 分页获取实体列表

export function getListPage (params) {
  return request({
    url: 'purchase/request/page',
    method: "GET",
    params
  })
}

// /purchase/request/detail 详情
export function getItemDetail (params) {
  return request({
    url: `purchase/request/detail`,
    method: "GET",
    params
  })
}

// /purchase/order/add 新增
export function addOrderItem (params) {
  return request({
    url: `purchase/order/add`,
    method: "POST",
    data: params
  })
}

// /purchase/request 更新
export function updateItem (params) {
  return request({
    url: `purchase/request`,
    method: "PUT",
    data: params
  })
}

//purchase/request/approval  采购订单审批
export function approvalItem (params) {
  return request({
    url: `purchase/request/approval`,
    method: "PUT",
    data: params
  })
}

// /purchase/request-materiel/{id} 删除
export function delMaterielById (params) {
  return request({
    url: `purchase/request-materiel/${params.id}`,
    method: "DELETE",
  })
}

// /purchase/return/{id}
export function delReturnById (params) {
  return request({
    url: `purchase/return/${params.id}`,
    method: "DELETE",
  })
}

// /purchase/return/detail
export function getReturnDetail (params) {
  return request({
    url: `purchase/return/detail`,
    method: "GET",
    params
  })
}