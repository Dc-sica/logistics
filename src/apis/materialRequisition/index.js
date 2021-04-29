
import request from './../../config/service'

// /materialCollection/materialListPage 物资领用 / 退库 / 审批列表 物资申请类别(0领用,1退库)
export function materialListPage (params) {
  return request({
    url: 'materialCollection/materialListPage',
    method: "GET",
    params
  })
}
// /materialCollection/materialCollectionInfo 查看详情
export function materialCollectionInfo (params) {
  return request({
    url: 'materialCollection/materialCollectionInfo',
    method: "GET",
    params
  })
}
// /materialCollection/downloadPDF 生成pdf文件
export function downloadPDF (params) {
  return request({
    url: 'materialCollection/downloadPDF',
    method: "GET",
    params
  })
}
// /materialCollection/updateApplicationStatus 过账/确认
export function updateApplicationStatus (params) {
  return request({
    url: `materialCollection/updateApplicationStatus?id=${params.id}`,
    method: "PUT",
  })
}
// /materialCollection/approvalMaterialCollection 审批
export function approvalMaterialCollection (params) {
  return request({
    url: 'materialCollection/approvalMaterialCollection',
    method: "POST",
    data: params
  })
}


// 物资领用导出:批量导出/全部导出
export function exportMaterialCollection (params) {
  return request({
    url: 'materialCollection/exportMaterialCollection',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 撤回
export function updateApprovalStatus (params) {
  return request({
    url: `materialCollection/updateApprovalStatus?id=${params.id}`,
    method: "PUT",
  })
}

// PC 端 物资领用/PC 端 退库申请  applicationCategory 0领用,1退库
export function materialRequisitionPC (params) {
  return request({
    url: 'materialCollection/materialRequisitionPC',
    method: "POST",
    data: params
  })
}

// 物资领用审批导出:批量导出/全部导出
export function exportMaterialCollectionApprove (params) {
  return request({
    url: 'materialCollection/exportMaterialCollectionApprove',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 根据物资领用/退库的id获取审批详情
export function materialCollectionApproveDetail (params) {
  return request({
    url: 'materialCollection/materialCollectionApproveDetail',
    method: "GET",
    params
  })
}