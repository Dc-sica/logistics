import Vue from 'vue'
import Toast from './Toast.vue'

const ToastConstructor = Vue.extend(Toast)

function ToastFn() {
  this.success = (content) => {
    if (content === '' || !content) {
      console.error('Toast 不能缺少 content 值')
      return
    }
    const newToast = new ToastConstructor({
      type: 'success',
      message: content
    })
    document.body.appendChild(newToast.$mount().$el)
  }
  this.error = (content) => {
    if (content === '' || !content) {
      console.error('Toast 不能缺少 content 值')
      return
    }
    const newToast = new ToastConstructor({
      type: 'error',
      message: content
    })
    document.body.appendChild(newToast.$mount().$el)
  }
  this.warning = (content) => {
    if (content === '' || !content) {
      console.error('Toast 不能缺少 content 值')
      return
    }
    const newToast = new ToastConstructor({
      type: 'warning',
      message: content
    })
    document.body.appendChild(newToast.$mount().$el)
  }
}
const toast = new ToastFn()
export default toast
