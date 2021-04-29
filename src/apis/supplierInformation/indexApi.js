import request from './../../config/service'

// 修改状态
export function updateStatus (params) {
  return request({
    url: '/api/supplier/updateStatus',
    method: 'POST',
    params
  })
}
//供应商导出
export function supExport (params) {
  return request({
    url: `/api/supplier/export`,
    method: 'post',
    data:params,
    responseType: 'blob'
  })
}
// 根据厂商获取品牌
export function getBrandInfo (params) {
  return request({
    url: `/api/brand/getBrandInfo`,
    method: 'GET',
    params
  })
}
// 厂商下拉
export function getManufacturer () {
  return request({
    url: '/api/manufacturer/getManufacturer',
    method: 'GET',
  })
}
// 分页获取实体列表
export function selectSupplierPage (params) {
  return request({
    url: '/api/supplier/selectSupplierPage',
    method: 'GET',
    params
  })
}
// 新增供应商
export function addSupplier (params) {
  return request({
    url: 'api/supplier/addSupplier',
    method: 'POST',
    data: params
  })
}
// 编辑供应商
export function updateSupplier (params) {
  return request({
    url: '/api/supplier/updateSupplier',
    method: 'POST',
    data: params
  })
}
// 删除一个实体
export function delSupplier (params) {
  return request({
    url: `api/supplier/${params.id}`,
    method: 'DELETE',
    params
  })
}