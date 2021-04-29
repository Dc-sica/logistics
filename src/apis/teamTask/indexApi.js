import request from './../../config/service'

// /api/user/info 获取当前登录用户信息
export function getInfo(params) {
    return request({
        url: 'api/user/info',
        method: 'GET',
        params
    })
}
// 导出
export function exportMine(params) {
    return request({
        url: '/repairOrder/exportMine',
        method: 'POST',
        data: params,
        responseType: 'blob'
    })
}
// 详情
export function detail(id) {
    return request({
        url: `/repairOrder/detail/${id}`,
        method: 'get',
    })
}
// 获取任务表列表
export function getMinePage(params) {
    return request({
        url: `/repairOrder/getMinePage`,
        method: 'get',
        params
    })
}

export function getListPage(params) {
    return request({
        url: `repairOrder/pageList`,
        method: 'POST',
        data: params
    })
}
