import request from './../../config/service'

// 获取设备分类
export function getAllPersonlist(params) {
  return request({
    url: 'api/user/list',
    method: 'get',
    params
  })
}

/*********设备分类***********************************************************************/
// 获取设备分类
export function getEquipmentTypePage(params) {
  return request({
    url: 'equipment/equipment-type/getEquipmentTypePage',
    method: 'get',
    params
  })
}
// 获取设备分类-子类
export function getEquipmentChildrenList(params) {
  return request({
    url: `equipment/equipment-type/getChildrenList`,
    method: 'get',
    params
  })
}
// 添加
export function addEquipmentType(params) {
  return request({
    url: `equipment/equipment-type/addEquipmentType`,
    method: 'post',
    data: params
  })
}
// 获取上级分类
export function buildInit(params) {
  return request({
    url: `equipment/equipment-type/buildInit`,
    method: 'get'
  })
}
// 查看
export function lookById(params) {
  return request({
    url: `equipment/equipment-type/lookById`,
    method: 'get',
    params
  })
}
// 编辑
export function updateEquipmentType(params) {
  return request({
    url: `equipment/equipment-type/updateEquipmentType`,
    method: 'put',
    data: params
  })
}

// 删除
export function deleteEquipmentType(params) {
  return request({
    url: `equipment/equipment-type/deleteEquipmentType`,
    method: 'delete',
    params
  })
}
/*********设备档案**************************************************************/

// 获取设备档案
export function getEquipmentPage(params) {
  return request({
    url: 'equipment/equipment/getEquipmentPage',
    method: 'get',
    params
  })
}
// 
export function getBuildInit(params) {
  return request({
    url: 'equipment/equipment/buildInit',
    method: 'get',
    params
  })
}
//设备新增
export function addEquipmentData(params) {
  return request({
    url: 'equipment/equipment/addEquipment',
    method: 'post',
    data: params
  })
}
//查看
export function lookRecordById(params) {
  return request({
    url: 'equipment/equipment/lookById',
    method: 'get',
    params
  })
}
//修改
export function updateEquipment(params) {
  return request({
    url: 'equipment/equipment/updateEquipment',
    method: 'put',
    data: params
  })
}
//获取二维码
export function getQRCode(params) {
  return request({
    url: 'equipment/equipment/getQRCode',
    method: 'get',
    params
  })
}

//导出数据
export function exportEquipment(params) {
  return request({
    url: 'equipment/equipment/exportEquipment',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

//删除参数信息
export function deleteParamRelation(params) {
  return request({
    url: 'equipment/equipment/deleteParamRelation',
    method: 'delete',
    params
  })
}


/*********设备参数**************************************************************/

// 获取设备参数
export function getParambuildInit(params) {
  return request({
    url: 'equipmentparam/equipment-param/buildInit',
    method: 'get'
  })
}
// 获取设备参数(无分页)
export function getParamList(params) {
  return request({
    url: 'equipmentparam/equipment-param/getParamList',
    method: 'get',
    params
  })
}
// 获取设备参数列表
export function getParamPage(params) {
  return request({
    url: 'equipmentparam/equipment-param/getParamPage',
    method: 'get',
    params
  })
}
// 获取设备参数列表
export function deleteParam(params) {
  return request({
    url: 'equipmentparam/equipment-param/deleteParam',
    method: 'delete',
    params
  })
}
// 添加设备参数
export function addParam(params) {
  return request({
    url: 'equipmentparam/equipment-param/addParam',
    method: 'post',
    data: params
  })
}
// 查看
export function lookParamById(params) {
  return request({
    url: 'equipmentparam/equipment-param/lookById',
    method: 'get',
    params
  })
}

// 编辑
export function updateParam(params) {
  return request({
    url: 'equipmentparam/equipment-param/updateParam',
    method: 'put',
    data: params
  })
}

// 获取设备分类
export function getParamChildrenList(params) {
  return request({
    url: 'equipmentparam/equipment-param/getChildrenList',
    method: 'get',
    params
  })
}

// 获取设备维修记录
export function getEquipmentRepairInfo(params) {
  return request({
    url: 'equipment/equipment/getEquipmentRepairInfo',
    method: 'get',
    params
  })
}


