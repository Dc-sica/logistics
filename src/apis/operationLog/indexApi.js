import request from './../../config/service'

// 查询
export function selectOperateLogPage (params) {
  return request({
    url: '/api/operate-log/selectOperateLogPage',
    method: 'GET',
    params
  })
}