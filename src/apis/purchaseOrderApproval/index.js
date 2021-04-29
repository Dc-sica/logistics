
import request from './../../config/service'


export function getList (params) {
  return request({
    url: 'purchase/order/page',
    method: "GET",
    params
  })
}