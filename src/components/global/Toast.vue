<template>
  <div
    v-if="renderView"
    class="toast-mask animate"
    :style="'height:' + endHeight"
  >
    <transition name="fade">
      <div
        v-show="showToast"
        class="toask-message"
        :class="'msg-' + $options.type"
      >
        {{ $options.message }}
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  data() {
    return {
      renderView: true,
      showToast: false,
      endHeight: '20vh'
    }
  },
  mounted() {
    this.showToast = true
    const timeout = setTimeout(() => {
      this.endHeight = '30vh'
    }, 0)
    const timeout1 = setTimeout(() => {
      this.endHeight = '20vh'
      this.showToast = false
      const timeout2 = setTimeout(() => {
        this.renderView = false

        window.clearTimeout(timeout1)
        window.clearTimeout(timeout2)
        window.clearTimeout(timeout)
      }, 200)
    }, 3000)
  }
}
</script>
<style scoped>
.toast-mask {
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 99999;
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
}
.toask-message {
  border-radius: 5px;
  padding: 10px;
  min-width: 250px;
}
.msg-success {
  background: #eff7eb;
  border: 1px solid #d8fcc6;
  color: #7bee42;
}
.msg-error {
  background: #ffaeae;
  border: 1px solid #f17c7c;
  color: #cf3434;
}
.msg-warning {
  background: #fdf6ec;
  border: 1px solid #faecd8;
  color: #e6a23c;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
</style>
