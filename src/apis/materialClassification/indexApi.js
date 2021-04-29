import request from './../../config/service'

// 分页获取实体列表
export function getListPage (params) {
  return request({
    url: '/api/materialCategory/listPage',
    method: 'GET',
    params
  })
}

// 新增实体
export function addMaterialCategory (params) {
  return request({
    url: '/api/materialCategory/addMaterialCategory',
    method: 'POST',
    data: params
  })
}

// 更新实体
export function updateMaterialCategory (params) {
  return request({
    url: '/api/materialCategory',
    method: 'PUT',
    data: params
  })
}
// 获取code
export function getCode (params) {
  return request({
    url: 'api/materialCategory/addMaterialCategoryInit',
    method: 'GET',
    params
  })
}