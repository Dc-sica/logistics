import request from './../../config/service'

// 分页获取实体列表
export function getListPage (params) {
  return request({
    url: 'opinion/queryListPage',
    method: 'POST',
    data: params
  })
}

// 详情
export function getDetail (params) {
  return request({
    url: `opinion/detail/${params}`,
    method: 'GET'
  })
}

// 回复
export function getReply (params) {
  return request({
    url: 'opinion/reply',
    method: 'POST',
    data: params
  })
}

// 部门
export function getDeptList (params) {
  return request({
    url: 'api/dict/getDeptList',
    method: 'GET'
  })
}

// 全部导出
export function exportAll (params) {
  return request({
    url: 'opinion/export',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}