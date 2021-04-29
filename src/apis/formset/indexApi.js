import request from './../../config/service'

// 初始化
export function mapInit() {
  return request({
    url: '/api/tableSetting/mapInit',
    method: 'GET',
  })
}

// 修改状态
export function updateStatus(id) {
  return request({
    url: `/api/tableSetting/updateStatus?id=${id}`,
    method: 'POST',
  })
}

// 查询表单模板列表
export function getTableSettingInfo(params) {
  return request({
    url: '/api/tableSetting/getTableSettingInfo',
    method: 'GET',
    params
  })
}
// 修改状态
export function updStatus(id) {
  return request({
    url: `/api/task-entrust/updStatus?id=${id}`,
    method: 'GET',
  })
}

// 列表
export function getTaskEntrustPageList(params) {
  return request({
    url: '/api/task-entrust/getTaskEntrustPageList',
    method: 'GET',
    params
  })
}