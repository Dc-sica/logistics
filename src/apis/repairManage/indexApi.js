import request from './../../config/service'

// 新增初始化
export function getAddInit (params) {
  return request({
    url: 'repairOrder/addInit',
    method: 'GET',
    params
  })
}

// 设备列表
export function getEquipmentList (params) {
  return request({
    url: 'repairOrder/equipmentList',
    method: 'GET',
    params
  })
}

// 报修人列表
export function getRepairUserList (params) {
  return request({
    url: 'repairOrder/repairUserList',
    method: 'GET',
    params
  })
}

// 新增实体
export function addRepairOrder (params) {
  return request({
    url: `repairOrder/addRepair`,
    method: "POST",
    data: params
  })
}

// 编辑
export function editRepairOrder (params) {
  return request({
    url: `repairOrder/add-or-update`,
    method: "POST",
    data: params
  })
}

// 报修列表初始化
export function pageListInit (params) {
  return request({
    url: 'repairOrder/pageList/init',
    method: 'GET',
    params
  })
}

// 报修列表
export function getListPage (params) {
  return request({
    url: `repairOrder/pageList`,
    method: 'POST',
    data: params
  })
}

// 取消报修
export function cancelRepairOrderById (params) {
  return request({
    url: `repairOrder/cancel/${params.id}`,
    method: "GET"
  })
}

// 报修列表导出
export function exportList (params) {
  return request({
    url: 'repairOrder/export',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 报修详情
export function repairOrderDetail (params) {
  return request({
    url: `repairOrder/detail/${params.id}`,
    method: "GET"
  })
}

// 新增评价
export function addComment (params) {
  return request({
    url: `repair/comment/addComment`,
    method: 'POST',
    data: params
  })
}