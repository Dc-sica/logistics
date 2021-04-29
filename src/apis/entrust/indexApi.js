import request from './../../config/service'

// 导出
export function accExport(params) {
  return request({
      url: `/api/task-entrust/export`,
      method: 'post',
      data: params,
      responseType: 'blob'
  })
}

// 新增
export function saveTaskEntrust(params) {
  return request({
    url: '/api/task-entrust/saveTaskEntrust',
    method: 'POST',
    data: params
  })
}

// 编辑
export function updTaskEntrust(params) {
  return request({
    url: '/api/task-entrust/updTaskEntrust',
    method: 'POST',
    data: params
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
// 病区列表
export function getPatientArea() {
  return request({
    url: '/api/patient-area/getPatientArea',
    method: 'GET',
  })
}

export function getListPage(params) {
  return request({
    url: 'api/dictCategory/listPage',
    method: 'GET',
    params
  })
}