/*
 * @Author: Jason_Ma
 * @Date: 2021-01-06 10:59:46
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-02 09:02:37
 * @FilePath: /hos-logistics-management/src/router.js
 */

import Vue from 'vue'
import Router from 'vue-router'
import routeList from './routeList'
import baseInfo from './config/config'


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routeList
})

let treeToArray = (array, tree) => {
  tree.forEach(item => {
    if (item.path !== '/404' && item.path !== '/' && item.path !== '/login') {
      array.push(item.path)
    }
    if (item.childNodes && item.childNodes.length > 0) {
      treeToArray(array, item.childNodes)
    }
  })
  return array
}
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  let subPath = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
  document.title = baseInfo.BASE_TITLE + '-' + to.meta.text
  if (localStorage.tokenInfo && localStorage.menuTree && localStorage.userInfo) {
    let rightList = treeToArray([], JSON.parse(localStorage.menuTree))
    // let rightList = treeToArray([], menuTree)
    if (to.path === '/404' || to.path === '/' || to.path === '/login') {
      next()
    } else {
      let index = routeList[1].children.findIndex(item => item.path === to.path)
      // console.log(to.path)
      // next()
      if (index === -1) {
        next('/404')
      } else {
        let index = subPath.findIndex(item => item.path === to.path)
        if (index === -1) {
          subPath.push({
            path: to.path,
            text: to.meta.text,
            query: to.query,
            params: to.params,
            fullPath: to.fullPath
          })
        }
        localStorage.setItem('subPath', JSON.stringify(subPath))
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      localStorage.removeItem('tokenInfo')
      localStorage.removeItem('menuTree')
      localStorage.removeItem('userInfo')
      next('/login')
    }
  }
})

export default router



