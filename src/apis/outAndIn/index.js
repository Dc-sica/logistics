/*
 * @Author: Jason_Ma
 * @Date: 2021-01-22 16:01:29
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-02 17:27:00
 * @FilePath: /hos-logistics-management/src/apis/outAndIn/index.js
 */


import request from './../../config/service'

// /materialApply/addInit 下拉初始化
export function getInitData () {
  return request({
    url: 'materialApply/addInit',
    method: "GET",
  })
}

// /materialApply/queryListPage  //列表
export function getDataList (params) {
  return request({
    url: 'materialApply/queryListPage',
    method: "POST",
    data: params
  })
}

// /materialApply/add 新增
export function addItem (params) {
  return request({
    url: 'materialApply/add',
    method: "POST",
    data: params
  })
}

// /materialApply/updateInit/{id}  详情初始化
export function updateInitById (params) {
  return request({
    url: `materialApply/updateInit/${params.id}`,
    method: "GET",
  })
}
// /materialApply/update
export function itemUpdate (params) {
  return request({
    url: 'materialApply/update',
    method: "PUT",
    data: params
  })
}
// /materialApply/updateStatus/{id} 过账

export function updateStatus (params) {
  return request({
    url: `materialApply/updateStatus/${params.id}`,
    method: "GET",
  })
}
// /materialApply/downloadPDF  打印
export function downloadPDF (params) {
  return request({
    url: `materialApply/downloadPDF?id=${params.id}`,
    method: "GET",
  })
}