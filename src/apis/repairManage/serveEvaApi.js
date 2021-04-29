import request from './../../config/service'

// 服务评价列表
export function getListPage (params) {
  return request({
    url: `repairOrder/commentPageList`,
    method: 'POST',
    data: params
  })
}

// 服务评价列表导出
export function exportList (params) {
  return request({
    url: 'repairOrder/comment/export',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}