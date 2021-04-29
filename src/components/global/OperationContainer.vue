<template>
  <div
    class="operation-list-container"
    :style="'justify-content:' + (btnPosition[align] || 'left')"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'OperationContainer',
  // eslint-disable-next-line vue/require-prop-types
  props: ['align'],
  data() {
    return {
      btnPosition: {
        left: 'flex-start',
        right: 'flex-end',
        center: 'center'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.operation-list-container {
  display: flex;
  border-radius: 3px;
  margin-bottom: 10px;
  > * {
    margin: 0px 4px;
  }
}
</style>
