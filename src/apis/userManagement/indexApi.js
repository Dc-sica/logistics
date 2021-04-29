import request from './../../config/service'

// 分页获取实体列表
export function getListPage (params) {
  return request({
    url: 'api/user/userListPage',
    method: 'GET',
    params
  })
}
// 获取角色列表
export function getRole (params) {
  return request({
    url: 'api/role/list',
    method: 'GET',
    params
  })
}

// 通过分类code获取字典详情
export function getDept (params) {
  return request({
    url: 'api/dictCategory/dictByCategoryId',
    method: 'GET',
    params
  })
}

// 新增用户
export function addUser (params) {
  return request({
    url: 'api/user/addUser',
    method: 'POST',
    data: params
  })
}

// 编辑实体
export function updateUser (params) {
  return request({
    url: 'api/user/updateUser',
    method: 'PUT',
    data: params
  })
}

// 删除一个实体
export function delUser (params) {
  return request({
    url: `api/user/${params.id}`,
    method: 'DELETE',
  })
}

// 获取单个实体
export function getOne (params) {
  return request({
    url: `api/user/one/${params.id}`,
    method: 'GET',
    params
  })
}

// 重置密码
export function resetPassword (params) {
  return request({
    url: 'api/user/resetPassword',
    method: 'PUT',
    data: params
  })
}