import request from './../../config/service'

// 获取全部维修组
export function getGroupList (params) {
  return request({
    url: 'api/repairGroup/list',
    method: 'GET',
    params
  })
}

// 根据小组id获得小组成员信息
export function getGroupUserByGroupId (params) {
  return request({
    url: 'api/repairGroupUser/getGroupUserByGroupId',
    method: 'GET',
    params
  })
}

// 新增维修组
export function addRepairGroup (params) {
  return request({
    url: 'api/repairGroup',
    method: "POST",
    data: params
  })
}

// 编辑维修组
export function updateRepairGroup (params) {
  return request({
    url: `api/repairGroup`,
    method: 'PUT',
    data: params
  })
}

// 删除维修组
export function delRepairGroup (params) {
  return request({
    url: `api/repairGroup/${params.id}`,
    method: 'DELETE',
  })
}

// 挑选维修工
export function selectRepairUserListPage (params) {
  return request({
    url: 'api/repairGroupUser/selectRepairUserListPage',
    method: 'GET',
    params
  })
}

// 新增维修工
export function addRepairGroupUser (params) {
  return request({
    url: 'api/repairGroupUser/addRepairGroupUser',
    method: "POST",
    data: params
  })
}

// 维修工列表
export function getGroupUserList (params) {
  return request({
    url: 'api/repairGroupUser/repairGroupUserListPage',
    method: "POST",
    data: params
  })
}

// 编辑维修工
export function updateRepairGroupUser (params) {
  return request({
    url: `api/repairGroupUser/updateRepairGroupUser`,
    method: 'PUT',
    data: params
  })
}

// 移动维修工
export function moveRepairGroupUser (params) {
  return request({
    url: `api/repairGroupUser/moveRepairGroupUser`,
    method: 'PUT',
    data: params
  })
}

// 移除维修工
export function removeRepairGroupUser (params) {
  return request({
    url: `api/repairGroupUser/removeRepairGroupUser`,
    method: 'DELETE',
    data: params
  })
}

// 导出
export function exportList (params) {
  return request({
    url: 'api/repairGroupUser/exportRepairUser',
    method: 'POST',
    data: params,
    responseType: 'blob'
  })
}

// 替换组长
export function updLeaderFlag (params) {
  return request({
    url: `api/repairGroupUser/updLeaderFlag`,
    method: 'PUT',
    params
  })
}
