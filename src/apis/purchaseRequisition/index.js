
import request from './../../config/service'

// /purchase/request/page 分页获取实体列表

export function getListPage (params) {
  return request({
    url: 'purchase/request/page',
    method: "GET",
    params
  })
}

// /purchase/request/detail 详情
export function getItemDetail (params) {
  return request({
    url: `purchase/request/detail`,
    method: "GET",
    params
  })
}

// /purchase/request/add 新增采购申请
export function getItemAdd (params) {
  return request({
    url: `purchase/request/add`,
    method: "POST",
    data: params
  })
}

// /purchase/request-materiel/{id} 删除 物资明细
export function delMaterielById (params) {
  return request({
    url: `purchase/request-materiel/${params.id}`,
    method: "DELETE",
    data: params
  })
}
// /purchase/request/add 新增

export function addItem (params) {
  return request({
    url: `purchase/request/add`,
    method: "POST",
    data: params
  })
}

// /purchase/request 撤回

export function backItem (params) {
  return request({
    url: `purchase/request`,
    method: "PUT",
    data: params
  })
}