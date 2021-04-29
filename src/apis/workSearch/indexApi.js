import request from './../../config/service'

// 导出
export function exportSynthesis(params) {
    return request({
        url: '/repairOrder/exportSynthesis',
        method: 'POST',
        data: params,
        responseType: 'blob'
    })
}
// 列表
export function getSynthesisPage(params) {
    return request({
        url: `/repairOrder/getSynthesisPage`,
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