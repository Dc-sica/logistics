

import request from './../../config/service'

// /stock/queryStock 库存查询

export function queryStock (params) {
  return request({
    url: 'stock/queryStock',
    method: "POST",
    data: params
  })
}

// /stock/queryStockDetail  库存明细查询
export function queryStockDetail (params) {
  return request({
    url: 'stock/queryStockDetail',
    method: "POST",
    data: params
  })
}

// /stock/queryStockDetail/init // 初始化
export function queryStockInit (params) {
  return request({
    url: 'stock/queryStockDetail/init',
    method: "GET",
    params
  })
}