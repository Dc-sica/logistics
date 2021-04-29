<template>
  <transition name="fade">
    <div v-show="visible" class="ck-drawer">
      <div class="left-container" @click="$emit('cancel')" />
      <div
        ref="rightbox"
        class="right-container animate"
        :style="
          'min-width:' + (width || '500px') + ';margin-right:' + marginRight + 'px'
        "
      >
        <div v-if="!hideHeader" class="drawer-header">
          <span>{{ title || "请设置标题" }}</span>
          <i
            class="el-icon-circle-close"
            style="cursor: pointer"
            @click="$emit('cancel')"
          />
        </div>
        <div class="drawer-body">
          <slot />
        </div>
        <div v-if="!hideFooter" class="drawer-footer">
          <template v-for="(item, index) in footerBtns">
            <el-button
              :key="index"
              :type="item.type"
              @click="$emit(item.trigger)"
            >{{ item.text }}</el-button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CkDrawer',
  // eslint-disable-next-line vue/require-prop-types
  props: ['visible', 'width', 'title', 'hideHeader', 'hideFooter', 'footerBtns'],
  data() {
    return {
      marginRight: this.setInitWidth(this.width)
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          const timeout = setTimeout(() => {
            this.marginRight = 0
            window.clearTimeout(timeout)
          }, 10)
        } else {
          const timeout = setTimeout(() => {
            this.marginRight = -this.$refs.rightbox.offsetWidth
            window.clearTimeout(timeout)
          }, 10)
        }
      }
    }
  },
  methods: {
    setInitWidth(iniwidth) {
      if (isNaN(Number(iniwidth))) {
        return -1920
      } else {
        return Number(iniwidth)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ck-drawer {
  position: fixed;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: flex;
  .right-container {
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .left-container {
    flex-grow: 1;
    height: 100%;
  }
  .drawer-header {
    border-bottom: 1px solid #dcdfe6;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .drawer-body {
    flex-grow: 1;
    overflow-y: auto;
    padding:15px 10px;
  }
  .drawer-footer {
    border-top: 1px solid #dcdfe6;
    padding: 10px;
    overflow: hidden;
    Button {
      float: right;
      margin: 0px 10px;
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

