import request from './../../config/service'

// 列表
export function getMaterialCheckPage (params) {
  return request({
    url: 'materialcheck/material-check/getMaterialCheckPage',
    method: 'GET',
    params
  })
}

// 导出
export function exportMaterialCheck (params) {
  return request({
    url: 'materialcheck/material-check/exportMaterialCheck',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 新增
export function addMaterialCheck (params) {
  return request({
    url: `materialcheck/material-check/addMaterialCheck`,
    method: "POST",
    data: params
  })
}

// 盘点
export function updateCheck (params) {
  return request({
    url: 'materialcheck/material-check/updateCheck',
    method: "PUT",
    data: params
  })
}

// 查看
export function getCheckInfo (params) {
  return request({
    url: 'materialcheck/material-check/getCheckInfo',
    method: 'GET',
    params
  })
}

// 根据仓库名称获取所有物资分类
export function getMaterialCategory (params) {
  return request({
    url: 'api/materialCategory/getCategories',
    method: 'GET',
    params
  })
}

// 库存查询
export function queryStock (params) {
  return request({
    url: `stock/getStockList`,
    method: "GET",
    params
  })
}

// 盘点新增库存查询
export function getStockQueryList (params) {
  return request({
    url: `stock/getStockQueryList`,
    method: "GET",
    params
  })
}

// 物资盘点分析
export function getCheckAnalysis (params) {
  return request({
    url: 'materialcheck/material-check/getCheckAnalysis',
    method: 'GET',
    params
  })
}

// 物资消耗分析全部导出/批量导出
export function exportCheckAnalysis (params) {
  return request({
    url: 'materialcheck/material-check/exportCheckAnalysis',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}