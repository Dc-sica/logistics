import request from './../../config/service'

// 编辑
export function updateOrderSetting (params) {
  return request({
    url: '/api/order-setting/updateOrderSetting',
    method: 'POST',
    data:params
  })
}

// 查询
export function getOrderSettingList () {
  return request({
    url: '/api/order-setting/getOrderSettingList',
    method: 'GET',
  })
}
// 编辑陪检运送功能
export function updateDeliveryOrderSetting (params) {
  return request({
    url: '/api/order-setting/updateDeliveryOrderSetting',
    method: 'post',
    data:params
  })
}
