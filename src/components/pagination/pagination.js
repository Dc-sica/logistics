import pagination from './index.vue'
const mypagination = {
  install: function (Vue) {
    Vue.component('pagination', pagination)
  }
}
export default mypagination
