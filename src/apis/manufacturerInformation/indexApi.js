import request from './../../config/service'

// 添加厂商信息
export function addManufacturer (params) {
  return request({
    url: '/api/manufacturer/addManufacturer',
    method: 'POST',
    data:params
  })
}
// 编辑厂商信息
export function updateManufacturer (params) {
  return request({
    url: 'api/manufacturer/updateManufacturer',
    method: 'POST',
    data:params
  })
}

//厂商导出
export function mExport (params) {
  return request({
    url: `/api/manufacturer/export`,
    method: 'post',
    data:params,
    responseType: 'blob'
  })
}
// 查看品牌信息
export function getBrandInfo (params) {
  return request({
    url: 'api/brand/getBrandInfo',
    method: 'GET',
    params
  })
}
// 删除品牌信息
export function delBrand (id) {
  return request({
    url: `/api/brand/delBrand/${id}`,
    method: 'DELETE',
  })
}
// 添加品牌信息
export function addBrand (params) {
  return request({
    url: 'api/brand/addBrand',
    method: 'POST',
    data: params
  })
}
// 获取供应商下拉
export function getSupplier (params) {
  return request({
    url: '/api/supplier/getSupplier',
    method: 'GET',
    params
  })
}
// 查看厂商信息
export function selectManufacturerById (params) {
  return request({
    url: `api/manufacturer/selectManufacturerById`,
    method: 'GET',
    params
  })
}
// 修改状态
export function updateStatus (params) {
  return request({
    url: `api/manufacturer/updateStatus`,
    method: 'POST',
    params
  })
}
// 分页获取厂商信息列表
export function getManufacturerListPage (params) {
  return request({
    url: 'api/manufacturer/getManufacturerListPage',
    method: 'GET',
    params
  })
}