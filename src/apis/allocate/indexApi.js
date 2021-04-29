import request from './../../config/service'

// 初始化
export function buildInit (params) {
  return request({
    url: 'materialtransfer/material-transfer/buildInit',
    method: 'GET',
    params
  })
}

// 列表
export function getTransferPage (params) {
  return request({
    url: 'materialtransfer/material-transfer/getTransferPage',
    method: 'GET',
    params
  })
}

// 新增
export function addTransfer (params) {
  return request({
    url: `materialtransfer/material-transfer/addTransfer`,
    method: "POST",
    data: params
  })
}

// 编辑
export function updateTransfer (params) {
  return request({
    url: 'materialtransfer/material-transfer/updateTransfer',
    method: "PUT",
    data: params
  })
}

// 查看
export function getTransferInfo (params) {
  return request({
    url: 'materialtransfer/material-transfer/getTransferInfo',
    method: 'GET',
    params
  })
}

// 导出
export function exportTransfer (params) {
  return request({
    url: 'materialtransfer/material-transfer/exportTransfer',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}


// 调拨确认  驳回/同意
export function updateStatus (params) {
  return request({
    url: `materialtransfer/material-transfer/updateStatus?id=${params.id}&status=${params.status}`,
    method: "PUT"
  })
}

export function deleteTransferDetail(params) {
  return request({
      url: `materialtransfer/material-transfer/deleteTransferDetail`,
      method: 'delete',
      params
  })
}
