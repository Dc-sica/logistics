
import request from './../../config/service'

// 我的维修/组长接单
export function getListPage (params) {
  return request({
    url: 'repairOrder/getMinePage',
    method: 'GET',
    params
  })
}

// 抢单/接单
export function operationOrder (params) {
  return request({
    url: `repairOrder/operationOrder`,
    method: 'GET',
    params
  })
}

// 完成维修填写
export function finishOrder (params) {
  return request({
    url: `orderDetail/repair-order-detail/addDetail`,
    method: 'POST',
    data: params
  })
}

// 转单
export function transferOrder (params) {
  return request({
    url: `repairOrder/transferOrder`,
    method: 'POST',
    data: params
  })
}