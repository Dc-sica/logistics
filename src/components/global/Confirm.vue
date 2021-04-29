<template>
  <transition v-if="renderMask" name="fade">
    <div v-show="showMask" class="confirm-mask">
      <div
        ref="moveTop"
        class="confirm-content animate"
        style="margin-top: -60vh"
      >
        <div class="confirm-header">
          <span style="font-weight: bold; font-size: 15px">{{
            $options.title || "确认"
          }}</span>
          <i class="el-icon-close" @click="cancleConfirm" />
        </div>
        <div class="confirm-body">
          {{ $options.content }}
        </div>
        <div class="confirm-footer">
          <Button type="info" @click="cancleConfirm">{{
            $options.cancelText
          }}</Button>
          <Button style="margin-left: 10px" @click="onConfirm">{{
            $options.okText
          }}</Button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Confirm',
  data() {
    return {
      renderMask: true,
      showMask: false
    }
  },
  mounted() {
    this.showMask = true
    const timeout = setTimeout(() => {
      this.$refs.moveTop.style.marginTop = '-30vh'
      window.clearTimeout(timeout)
    }, 0)
  },
  methods: {
    cancleConfirm() {
      this.$options.cancelFn('cc')
      this.closeModal()
    },
    onConfirm() {
      this.$options.okFn('cc')
      this.closeModal()
    },
    closeModal() {
      this.$refs.moveTop.style.marginTop = '-60vh'
      const timeout = setTimeout(() => {
        this.showMask = false
        const timeout2 = setTimeout(() => {
          this.renderMask = false
          window.clearTimeout(timeout)
          window.clearTimeout(timeout2)
        }, 300)
      }, 200)
    }
  }
}
</script>
<style scoped>
.confirm-mask {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.el-icon-close {
  cursor: pointer;
}
.confirm-content {
  min-width: 400px;
  min-height: 120px;
  border-radius: 3px;
  background: #fff;
  padding: 10px;
  margin-top: -40vh;
  display: flex;
  flex-direction: column;
}
.confirm-header {
  display: flex;
  justify-content: space-between;
  height: 25px;
  align-items: center;
}
.confirm-body {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 10px;
}
.confirm-footer {
  display: flex;
  justify-content: flex-end;
  height: 30px;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
