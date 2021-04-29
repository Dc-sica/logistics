import request from './../../config/service'

// 获取全部实体
export function getListPage (params) {
  return request({
    url: 'api/approve/list',
    method: 'GET',
    params
  })
}

// 挑选审核人信息
export function getUserListPage (params) {
  return request({
    url: 'api/approve/approveUserListPage',
    method: 'GET',
    params
  })
}

// 新增实体
export function addApprove (params) {
  return request({
    url: 'api/approve',
    method: 'POST',
    data: params
  })
}
// 编辑
export function updateApprove (params) {
  return request({
    url: 'api/approve',
    method: 'PUT',
    data: params
  })
}