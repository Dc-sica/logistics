import request from './../../config/service'

// 列表上方
export function getRepairStatistics() {
  return request({
      url: `/repairOrder/getRepairStatistics`,
      method: 'get',
  })
}
// 列表
export function getListPage(params) {
    return request({
        url: `repairOrder/pageList`,
        method: 'POST',
        data: params
    })
}