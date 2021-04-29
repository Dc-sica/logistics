<template>
  <transition name="fade">
    <div
      v-show="visible"
      ref="dialogView"
      class="ck-dialog"
      @click="closeDialog"
    >
      <div ref="moveTop" class="ck-dialog-container animate">
        <div v-if="!hideHeader" class="ck-dialog-header">
          <span>{{ title || "请设置对话框标题" }}</span>
          <i
            class="el-icon-circle-close"
            style="cursor: pointer"
            @click="$emit('cancel')"
          />
        </div>
        <div class="ck-dialog-body">
          <slot />
        </div>
        <div v-if="!hideFooter" class="ck-dialog-footer">
          <template v-for="(item, index) in footerBtns">
            <el-button :key="index" :type="item.type" @click="$emit(item.trigger)">{{ item.text }}</el-button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CkDialog',
  // eslint-disable-next-line vue/require-prop-types
  props: ['title', 'visible', 'hideFooter', 'hideHeader', 'footerBtns'],
  data() {
    return {}
  },
  watch: {
    visible(val) {
      if (val) {
        const timeout = setTimeout(() => {
          this.$refs.moveTop.style.top = '-20vh'
          window.clearTimeout(timeout)
        }, 0)
      } else {
        this.$refs.moveTop.style.top = '-30vh'
      }
    }
  },
  methods: {
    closeDialog(event) {
      if (event.target === this.$refs.dialogView) {
        this.$emit('cancel')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ck-dialog {
  position: fixed;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  .ck-dialog-container {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    top: 0vh !important;
    display: flex;
    flex-direction: column;
    .ck-dialog-header {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dcdfe6;
      span {
        font-size: 15px !important;
      }
    }
    .ck-dialog-body {
      max-height: 80vh;
      max-width: 1200px;
      min-width: 280px;
      min-height: 200px;
      margin: 0px 10px;
      overflow: auto;
      padding:15px 20px;
    }
    .ck-dialog-footer {
      border-top: 1px solid #dcdfe6;
      padding: 10px;
      overflow: hidden;
      Button {
        float: right;
        margin: 0px 10px;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
</style>
