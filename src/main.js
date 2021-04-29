/*
 * @Author: Jason_Ma
 * @Date: 2021-01-06 10:50:50
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-19 10:35:47
 * @FilePath: /hos-logistics-management/src/main.js
 */

import Vue from 'vue'
import App from './App.vue'

import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CkElementUI from '@/components/global/index.js'

import baseInfo from './config/config'

import './assets/css/public.css'
import './assets/style/theme/index.css'
import store from '../src/store/index.js'



import moment from 'moment'
// Vue.use(moment)
Vue.prototype.$moment = moment

Vue.prototype.$baseInfo = baseInfo
Vue.prototype.$tableDefaultAttr = `border
:header-cell-style="{ background: '#FAFAFA', height: '42px' }"
stripe
size="mini"
highlight-current-row
isFillHeight
height="0"`

Vue.use(ElementUI)
Vue.use(CkElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
