import request from './../../config/service'

// 分页获取实体列表
export function getListPage (params) {
  return request({
    url: 'api/material/materialListPage',
    method: 'GET',
    params
  })
}

// 新增实体
export function addMaterial (params) {
  return request({
    url: 'api/material/addMaterial',
    method: 'POST',
    data: params
  })
}
// 编辑
export function editMaterial (params) {
  return request({
    url: 'api/material',
    method: 'PUT',
    data: params
  })
}

// 获取所有分类
export function getCategoryList (params) {
  return request({
    url: 'api/materialCategory/list',
    method: 'GET',
    params
  })
}

// 获取供应商
export function getSupplierList (params) {
  return request({
    url: 'api/supplier/list',
    method: 'GET',
    params
  })
}
// 获取单位
export function getUnitList (params) {
  return request({
    url: 'api/dictCategory/dictByCategoryId',
    method: 'GET',
    params
  })
}

// 获取库存信息
export function getInventoryDetail (params) {
  return request({
    url: `api/inventory/one/${params.id}`,
    method: "GET"
  })
}

// 新增库存
export function addInventory (params) {
  return request({
    url: 'api/inventory',
    method: 'POST',
    data: params
  })
}
// 编辑库存
export function updateInventory (params) {
  return request({
    url: 'api/inventory',
    method: 'PUT',
    data: params
  })
}