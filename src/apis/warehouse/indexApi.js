/*
 * @Author: Jason_Ma
 * @Date: 2021-01-11 16:26:43
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-22 15:52:32
 * @FilePath: /hos-logistics-management/src/apis/warehouse/indexApi.js
 */

import request from './../../config/service'


// /warehouse/listPage 分页获取实体列表

export function getListPage (params) {
  return request({
    url: 'warehouse/listPage',
    method: 'GET',
    params
  })
}

// /warehouse/updateStatus/{id} 启用禁用
export function isDisable (params) {
  return request({
    url: `warehouse/updateStatus/${params.id}`,
    method: 'GET'
  })
}

// /warehouse 

export function addItem (params) {
  return request({
    url: `warehouse`,
    method: 'POST',
    data: params
  })
}

export function updateItem (params) {
  return request({
    url: `warehouse`,
    method: 'PUT',
    data: params
  })
}