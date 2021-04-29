
import request from './../../config/service'

// /purchase/return/page
export function getList (params) {
  return request({
    url: 'purchase/return/page',
    method: "GET",
    params
  })
}

// /purchase/return/detail
export function getInfo (params) {
  return request({
    url: `purchase/return/detail`,
    method: "GET",
    params
  })
}

// /purchase/receipt/detail  获取采购收货订单详情
export function getReceiptDetail (params) {
  return request({
    url: `purchase/receipt/detail`,
    method: "GET",
    params
  })
}

// /purchase/order/add 新增
export function addItem (params) {
  return request({
    url: `purchase/order/add`,
    method: "POST",
    data: params
  })
}
// /purchase/return/add 新增采购退货申请
export function addReturnItem (params) {
  return request({
    url: `purchase/return/add`,
    method: "POST",
    data: params
  })
}

// /purchase/return/approval   撤回
export function approvalItem (params) {
  return request({
    url: `purchase/return/approval`,
    method: "PUT",
    data: params
  })
}