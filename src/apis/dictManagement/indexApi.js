import request from './../../config/service'

// 分页获取实体列表
export function getListPage (params) {
  return request({
    url: 'api/dictCategory/listPage',
    method: 'GET',
    params
  })
}

// 新增实体
export function addDictCategory (params) {
  return request({
    url: 'api/dictCategory/addDictCategory',
    method: 'POST',
    data: params
  })
}
// 编辑实体
export function editDictCategory (params) {
  return request({
    url: 'api/dictCategory',
    method: 'PUT',
    data: params
  })
}

// 删除一个实体
export function delDictCategory (params) {
  return request({
    url: 'api/dictCategory/deleteSelected',
    method: 'DELETE',
    data: params
  })
}

// 通过分类code获取字典详情
export function getDataList (params) {
  return request({
    url: 'api/dict/listPage',
    method: 'GET',
    params
  })
}

// 新增字典项
export function addData (params) {
  return request({
    url: 'api/dict/add',
    method: 'POST',
    data: params
  })
}

// 编辑字典项
export function editData (params) {
  return request({
    url: 'api/dict/update',
    method: 'PUT',
    data: params
  })
}

// 删除字典项
export function delData (params) {
  return request({
    url: 'api/dict/deleteSelected',
    method: 'DELETE',
    data: params
  })
}

// 批量更新字典分类状态
export function updateBatch (params) {
  return request({
    url: 'api/dictCategory/updateBatch',
    method: 'PUT',
    data: params
  })
}
// 批量更新字典项状态
export function updateDataBatch (params) {
  return request({
    url: 'api/dict/updateBatch',
    method: 'PUT',
    data: params
  })
}