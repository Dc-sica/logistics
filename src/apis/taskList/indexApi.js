import request from './../../config/service'

// 运送物品
export function exportGoods(params) {
    return request({
        url: '/api/taskOrder/exportGoods',
        method: 'POST',
        data: params,
        responseType: 'blob'
    })
}
// 运送标本
export function exportSample(params) {
    return request({
        url: '/api/taskOrder/exportSample',
        method: 'POST',
        data: params,
        responseType: 'blob'
    })
}

// 陪检导出
export function exportTaskKeep(params) {
    return request({
        url: '/api/taskOrder/exportTaskKeep',
        method: 'POST',
        data: params,
        responseType: 'blob'
    })
}

// 导出
export function exportTask(params) {
    return request({
        url: '/api/taskOrder/exportTask',
        method: 'POST',
        data: params,
        responseType: 'blob'
    })
}

// 全部列表
export function taskOrderPage(params) {
  return request({
    url: `/api/taskOrder/taskOrderPage`,
    method: 'get',
    params
  })
}

// 初始化
export function mapInit() {
  return request({
    url: `/api/taskOrder/mapInit`,
    method: 'get',
  })
}


// 获取单个实体详情
export function selectTaskOrderByTaskTypes(params) {
  return request({
    url: `/api/taskOrder/getTaskOrderInfo`,
    method: 'get',
    params
  })
}