import request from './../../config/service'

// 添加护工
export function saveBatchPatientAreaUser(params) {
    return request({
        url: '/api/patient-area-user/saveBatchPatientAreaUser',
        method: 'POST',
        data: params
    })
}
// 人员列表
// export function getUserListPageByNursing(params) {
//     return request({
//         url: `api/nursingGroupUser/getUserListPageByNursing`,
//         method: 'GET',
//         params
//     })
// }
export function getUserListPageByNursing(params) {
    return request({
        url: `/api/patient-area-user/getUserListPageByNursing`,
        method: 'GET',
        params
    })
}
// 修改状态
export function updateStatus(params) {
    return request({
        url: '/api/patient-area-user/updateStatus',
        method: 'POST',
        params
    })
}

// 批量移除
export function deleteSelected(params) {
    return request({
        url: '/api/patient-area-user/deleteSelected',
        method: 'DELETE',
        data: params
    })
}
// 导出
export function paExport (params) {
    return request({
      url: `/api/patient-area-user/export`,
      method: 'post',
      data:params,
      responseType: 'blob'
    })
  }
// 护工列表
export function getPatientAreaUserList(params) {
    return request({
        url: `/api/patient-area-user/getPatientAreaUserList`,
        method: 'GET',
        params
    })
}

// 编辑病区
export function updPatientArea(params) {
    return request({
        url: '/api/patient-area/updPatientArea',
        method: 'POST',
        data: params
    })
}

// 删除病区
export function delPatientArea(id) {
    return request({
        url: `/api/patient-area/delPatientArea/${id}`,
        method: 'delete',
    })
}

// 编辑病区
export function getPatientAreaById(id) {
    return request({
        url: `/api/patient-area/getPatientAreaById?tpaId=${id}`,
        method: 'GET',
    })
}
// 添加病区
export function addPatientArea(params) {
    return request({
        url: '/api/patient-area/addPatientArea',
        method: 'POST',
        data: params
    })
}
// 检查类型
export function getCheckType() {
    return request({
        url: `/api/patient-area/getCheckType`,
        method: 'GET',
    })
}
// 任务类型
export function getTaskType() {
    return request({
        url: `/api/dict/getTaskType`,
        method: 'GET',
    })
}
// 病区列表
export function getPatientArea() {
    return request({
        url: `/api/patient-area/getPatientArea`,
        method: 'GET',
    })
}