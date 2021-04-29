import Vue from 'vue'
import Confirm from './Confirm.vue'

const ConfirmConstructor = Vue.extend(Confirm)
const defaultOption = {
  title: '确认框',
  content: '这是一个确认框',
  okText: '确定',
  cancelText: '取消',
  okFn: () => {},
  cancelFn: () => {}
}
function confirm(options) {
  const newOptions = Object.assign({}, defaultOption, options)
  const newConfirm = new ConfirmConstructor(newOptions)
  document.body.appendChild(newConfirm.$mount().$el)
}
export default confirm
