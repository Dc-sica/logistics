/*
 * @Author: Jason_Ma
 * @Date: 2021-01-18 13:54:33
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-22 10:32:02
 * @FilePath: /hos-logistics-management/src/apis/loginApi.js
 */
import request from './../config/service'


// api/user/login 登录以后返回token
export function sysLogin (params) {
  return request({
    url: 'api/user/login',
    method: 'POST',
    data: params
  })
}

// /api/user/info 获取当前登录用户信息
export function getInfo (params) {
  return request({
    url: 'api/user/info',
    method: 'GET',
    params
  })
}
