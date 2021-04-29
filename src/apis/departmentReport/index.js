import request from './../../config/service'
// 分页获取实体列表
export function getTaskAnalysis(params) {
  return request({
    url: 'api/taskOrder/getTaskAnalysis',
    method: 'GET',
    params
  })
}
// 电子屏显示
// 获取状态统计数据
export function getTaskOrderStatistics() {
  return request({
    url: 'api/taskOrder/getTaskOrderStatistics',
    method: 'GET'
  })
}
// 获取电子屏显示数据
export function taskOrderPage(params) {
  return request({
    url: 'api/taskOrder/taskOrderPage',
    method: 'GET',
    params
  })
}

// 科室报表导出
export function exportTaskStatistic(params) {
  return request({
    url: 'api/taskOrder/exportTaskStatistic',
    method: 'post',
    data:params,
    responseType: 'blob'
  })
}