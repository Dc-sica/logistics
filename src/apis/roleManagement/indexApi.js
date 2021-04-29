import request from './../../config/service'

// 分页获取实体列表
export function getAllRoles (params) {
  return request({
    url: 'api/role/listPage',
    method: 'GET',
    params
  })
}

export function insertRole (params) {
  return request({
    url: 'api/role',
    method: 'POST',
    data: params
  })
}

export function updateRole (params) {
  return request({
    url: 'api/role',
    method: 'PUT',
    data: params
  })
}

// 删除一个实体
export function deleteRole (params) {
  return request({
    url: `api/role/${params.roleId}`,
    method: 'DELETE'
  })
}

export function getAllMenu(params) {
  return request({
    url: 'api/menu/tree',
    method: 'get'
  })
}

export function getRoleMenu(params) {
  return request({
    url: `api/menu/listByRoleId/${params}`,
    method: 'get'
  })
}
// pc端选中菜单
export function watchOutRoleMenu(params) {
  return request({
    url: 'api/role-permission-relation/treeInit',
    method: 'get',
    params
  })
}
// 移动端选中菜单
export function watchOutMobileRoleMenu(params) {
  return request({
    url: 'api/role-permission-relation/mobileMenuTree',
    method: 'get',
    params
  })
}

//保存权限
export function RoleGiveMenuPermission(params) {
  return request({
    url: 'api/role-permission-relation/roleGiveMenuPermission',
    method: 'post',
    data:params
  })
}

// 获取移动端列表
export function getMobileMenu(params) {
  return request({
    url: 'api/menu/mobileMenuList',
    method: 'get'
  })
}