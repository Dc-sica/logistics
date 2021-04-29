import request from './../../config/service'

// 添加人员
export function saveBatchINursingGroupUser(params) {
    return request({
        url: 'api/nursingGroupUser/saveBatchINursingGroupUser',
        method: 'POST',
        data: params
    })
}
// 人员列表
export function getUserListPageByNursing(params) {
    return request({
        url: `api/nursingGroupUser/getUserListPageByNursing`,
        method: 'GET',
        params
    })
}
// 移动护工
export function moveSelected(params) {
    return request({
        url: 'api/nursingGroupUser/moveSelected',
        method: 'POST',
        data: params
    })
}

// 获取可移动小组
export function getNursingGroupNow(id) {
    return request({
        url: `api/nursingGroup/getNursingGroupNow?id=${id}`,
        method: 'GET',
    })
}

// 批量移除
export function deleteSelected(params) {
    return request({
        url: '/api/nursingGroupUser/deleteSelected',
        method: 'DELETE',
        data: params
    })
}

// 导出
export function perExport(params) {
    return request({
        url: `api/nursingGroupUser/export`,
        method: 'post',
        data: params,
        responseType: 'blob'
    })
}
// 修改状态
export function updateStatus(params) {
    return request({
        url: 'api/nursingGroupUser/updateStatus',
        method: 'POST',
        params
    })
}
// 编辑护工
export function updNursingGroupUser(params) {
    return request({
        url: 'api/nursingGroupUser/updNursingGroupUser',
        method: 'POST',
        data: params
    })
}

// 查看护工
export function getNursingGroupUserById(id) {
    return request({
        url: `api/nursingGroupUser/getNursingGroupUserById?id=${id}`,
        method: 'GET',
    })
}
// 护工列表
export function getNursingGroupUserList(params) {
    return request({
        url: 'api/nursingGroupUser/getNursingGroupUserList',
        method: 'GET',
        params
    })
}

// 获取职责下拉
export function getObligation(params) {
    return request({
        url: 'api/dict/getObligation',
        method: 'GET',
        params
    })
}
// 删除小组
export function delNursingGroup(id) {
    return request({
        url: `api/nursingGroup/delNursingGroup/${id}`,
        method: 'DELETE',
    })
}
// 编辑小组
export function updNursingGroup(params) {
    return request({
        url: 'api/nursingGroup/updNursingGroup',
        method: 'POST',
        data: params
    })
}
// 新增小组
export function nursingGroup(params) {
    return request({
        url: 'api/nursingGroup',
        method: 'POST',
        data: params
    })
}
// 获取全部小组
export function getGroupList(params) {
    return request({
        url: 'api/nursingGroup/getNursingGroup',
        method: 'GET',
        params
    })
}