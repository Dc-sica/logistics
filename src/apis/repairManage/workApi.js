import request from './../../config/service'

// 工单受理列表
export function getListPage (params) {
  return request({
    url: `repairOrder/handlerPageList`,
    method: 'POST',
    data: params
  })
}

// 工单受理列表导出
export function exportList (params) {
  return request({
    url: 'repairOrder/handler/export',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 审核
export function repairOrderHandler (params) {
  return request({
    url: `repairOrder/handler`,
    method: 'POST',
    data: params
  })
}

// 新增任务派发
export function addDispatchRepair (params) {
  return request({
    url: `repairOrder/addDispatchRepair`,
    method: 'POST',
    data: params
  })
}

// 修改任务派发
export function updateDispatchRepair (params) {
  return request({
    url: `repairOrder/updateDispatchRepair`,
    method: "PUT",
    data: params
  })
}

// 工单派发列表
export function getDispatchListPage (params) {
  return request({
    url: `repairOrder/dispatch/pageList`,
    method: 'POST',
    data: params
  })
}

// 工单派发导出
export function exportDispatchList (params) {
  return request({
    url: 'repairOrder/dispatch/export',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 派工
export function dispatch (params) {
  return request({
    url: 'repairOrder/dispatch',
    method: 'POST',
    data: params
  })
}

// 取消派工
export function cancelDispatch (params) {
  return request({
    url: `repairOrder/cancelDispatch`,
    method: "PUT",
    data: params
  })
}