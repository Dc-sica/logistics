/*
 * @Author: Jason_Ma
 * @Date: 2021-01-12 17:03:58
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-27 14:27:44
 * @FilePath: /hos-logistics-management/src/config/service.js
 */

import axios from 'axios'
import { Loading } from 'element-ui'
import config from './config'
import { getTokenInfo } from '../utils/publicFun'
let loadingRequestCount = 0
// 创建axios实例
let baseUrl = config.BASE_URL
const service = axios.create({
  baseURL: baseUrl,
  timeout: 150000, // 请求超时时间

})
// request拦截器
service.interceptors.request.use(
  config => {
    // if (config.url !== 'api/user/login') {
    //   config.headers.Authorization = (() => {
    //     if (getTokenInfo()) {
    //       return getTokenInfo()
    //     } else {
    //       location.href = '/login'
    //       localStorage.removeItem('userInfo')
    //     }
    //   })()
    // }
    if (config.headers.showLoading) {
      showLoading()
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    setTimeout(() => {
      hideLoading()
    }, 200)
    return res
  },
  // 请求失败情况
  error => {
    setTimeout(() => {
      hideLoading()
    }, 200)
    const { response } = error
    if (response) {
      // 若状态码为 510 或者 401， 跳转至登录界面
      if (response.code === 510 || response.code === 401 || response.code === 512) {
        localStorage.userInfo = ''
        localStorage.tokenInfo = ''
        location.href = '/login'
      }
      return Promise.reject(response)
    } else {
      if (error.message) {
        console.log(error.message)
      } else {
        console.log('服务故障，请检查！')
      }
      return Promise.resolve()
    }
  })
let loadingInstance = ''
const showLoading = () => {
  if (loadingRequestCount === 0) {
    loadingInstance = Loading.service({
      target: '.loading-area'
    })
  }
  loadingRequestCount++
}
const hideLoading = () => {
  if (loadingRequestCount <= 0) return
  loadingRequestCount--
  if (loadingRequestCount === 0) {
    loadingInstance.close()
  }
}
export default service
