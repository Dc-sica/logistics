import request from './../../config/service'

// 分页获取实体列表

export function getListPage (params) {
  return request({
    url: 'api/taskOrder/taskOrderPage',
    method: "GET",
    params
  })
}

// 初始化
export function pageListInit (params) {
  return request({
    url: 'api/taskOrder/mapInit',
    method: "GET",
    params
  })
}

// 新增任务登记
export function addTaskOrder (params) {
  return request({
    url: `api/taskOrder/addTaskOrder`,
    method: "POST",
    data: params
  })
}

// 病区列表下拉
export function getAreaList (params) {
  return request({
    url: 'api/patient-area/list',
    method: "GET",
    params
  })
}

// 新增陪检运送标本
export function addTransportSample (params) {
  return request({
    url: `api/taskOrder/addTransportSample`,
    method: "POST",
    data: params
  })
}

// 新增陪检运送物品
export function addTransportGoods (params) {
  return request({
    url: `api/taskOrder/addTransportGoods`,
    method: "POST",
    data: params
  })
}

// 获取基本信息
export function selectTaskOrderByTaskTypes (params) {
  return request({
    url: 'api/taskOrder/selectTaskOrderByTaskTypes',
    method: "GET",
    params
  })
}

// 任务登记编辑
export function updTaskOrder (params) {
  return request({
    url: `api/taskOrder/updTaskOrder`,
    method: "POST",
    data: params
  })
}

// 物品编辑
export function updTaskTransportGoods (params) {
  return request({
    url: `api/taskOrder/updTaskTransportGoods`,
    method: "POST",
    data: params
  })
}

// 标本编辑
export function updTaskTransportSample (params) {
  return request({
    url: `api/taskOrder/updTaskTransportSample`,
    method: "POST",
    data: params
  })
}

// 取消申请
export function taskOrderCancel (params) {
  return request({
    url: `api/taskOrder/cancel/${params.id}`,
    method: "GET",
    params
  })
}

// 任务受理
export function taskOrderHandler (params) {
  return request({
    url: `api/taskOrder/handler`,
    method: "POST",
    data: params
  })
}

// 以病区查询护工信息
export function listNursingGroupUser (params) {
  return request({
    url: 'api/patient-area-user/listNursingGroupUser',
    method: "GET",
    params
  })
}

// 派工
export function dispatchOrder (params) {
  return request({
    url: `api/taskOrder/dispatch`,
    method: "POST",
    data: params
  })
}

// 取消派工
export function cancelDispatch (params) {
  return request({
    url: `api/taskOrder/cancelDispatch`,
    method: "PUT",
    data: params
  })
}

// 修改派工
export function updateDispatch (params) {
  return request({
    url: `api/taskOrder/updDispatch`,
    method: "PUT",
    data: params
  })
}

// 抢单/接单/转单
export function operationOrder (params) {
  return request({
    url: `api/taskOrder/operationOrder`,
    method: "POST",
    data: params
  })
}

// 完成任务填写
export function completeOrder (params) {
  return request({
    url: `taskdetail/task-order-detail/completeOrder`,
    method: "POST",
    data: params
  })
}

// 任务登记导出
export function exportTaskOrder (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务登记-陪检导出
export function exportTaskOrderKeepExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderKeepExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务登记-陪检标本导出
export function exportTaskOrderSampleExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderSampleExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务登记-陪检物品导出
export function exportTaskOrderGoodExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderGoodExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务受理导出
export function exportTaskOrderHandleExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderHandleExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务受理-陪检导出
export function exportTaskOrderHandleKeepExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderHandleKeepExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务受理-标本导出
export function exportTaskOrderHandleSampleExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderHandleSampleExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务受理-物品导出
export function exportTaskOrderHandleGoodExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderHandleGoodExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务派工导出
export function exportTaskOrderDispatchExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderDispatchExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务派工-陪检导出
export function exportTaskOrderDispatchKeepExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderDispatchKeepExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务派工-标本导出
export function exportTaskOrderDispatchSampleExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderDispatchSampleExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 任务派工-物品导出
export function exportTaskOrderDispatchGoodExcel (params) {
  return request({
    url: 'api/taskOrder/exportTaskOrderDispatchGoodExcel',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 我的任务/任务完工导出
export function exportTask (params) {
  return request({
    url: 'api/taskOrder/exportTask',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 我的任务/任务完工  陪检导出
export function exportTaskKeep (params) {
  return request({
    url: 'api/taskOrder/exportTaskKeep',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 我的任务/任务完工  标本导出
export function exportSample (params) {
  return request({
    url: 'api/taskOrder/exportSample',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 我的任务/任务完工  物品导出
export function exportGoods (params) {
  return request({
    url: 'api/taskOrder/exportGoods',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}