

import request from './../config/service'

//  /api/material/materialAllList 物资明细

export function getMaterialList (params) {
  params.status = 1
  return request({
    url: 'api/material/materialAllList',
    method: "GET",
    params
  })
}
// /api/materialCategory/list  物质 分类
export function getMaterialCategory (params) {
  return request({
    url: 'api/materialCategory/list',
    method: "GET",
    params
  })
}

// /warehouse/list 仓库
export function getWarehouseList (params) {
  return request({
    url: 'warehouse/list',
    method: "GET",
    params
  })
}

// /api/supplier/list  供应商
export function geSupplierList (params) {
  return request({
    url: 'api/supplier/list',
    method: "GET",
    params
  })
}

// /api/dictCategory/dictByCategoryId 通过分类code获取字典详情
export function dictByCategoryId (params) {
  return request({
    url: 'api/dictCategory/dictByCategoryId',
    method: "GET",
    params
  })
}


// /api/materialCategory/list 物质分类获取全部实体
export function categoryList (params) {
  return request({
    url: 'api/materialCategory/list',
    method: "GET",
    params
  })
}

// /minio/upload 上传
export function upload (params) {
  return request({
    url: 'minio/upload',
    method: "POST",
    data: params
  })
}

// 上传视频，语音，加loading
export function uploadVideo (params) {
  return request({
    url: 'minio/upload',
    method: "POST",
    data: params,
    headers: {
      showLoading: true
    }
  })
}

// /api/user/updatePassword 修改密码

export function updatePassword (params) {
  return request({
    url: 'api/user/updatePassword',
    method: "PUT",
    data: params
  })
}
// /purchase/process/receiptList  单据流
export function getOrderTree (params) {
  return request({
    url: 'purchase/process/receiptList',
    method: "GET",
    params
  })
}

// /purchase/process/approvalList 流程
export function approvalList (params) {
  return request({
    url: 'purchase/process/approvalList',
    method: "GET",
    params
  })
}