import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openSider: true,
    currentFormIndex: -1,
    customerFormData: [], // 自定义表单数据
    projectData: [],//活动管理-新建-项目设置
  },
  mutations: {
    setOpenSider(state, newVal) {
      state.openSider = newVal
    },
    setCustomerFormData(state, newVal) {
      state.customerFormData = newVal
    },
    setCurrentFormIndex(state, newVal) {
      state.currentFormIndex = newVal
    },
    setProjectData(state, newVal) {
      state.projectData = newVal
    }
  },
  actions: {
    setProjectData({ commit }, payload) {
      commit('setProjectData',payload)
    }
  },
  getters: {
    getOpenSider(state) {
      return state.openSider
    },
    getCustomerFormData(state) {
      return state.customerFormData
    },
    getCurrentFormIndex(state) {
      return state.currentFormIndex
    }
  }
})

export default store