<template>
  <div class="container-group" id="containerGroup" :class="[layout?'row':'column']">
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'ContainerGroup',
    props: ['layout'],
    created() {
      this.$slots.default.forEach((item) => {
        if (!item.componentOptions || item.componentOptions.tag !== 'Container') {
          if (item.tag) {
            console.error(item.tag + '不是ContainerGroup合法的子元素 ')
          }
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .container-group {
    height: 100%;
    display: flex;
    // flex-direction: column;

    .container-item {
      flex-grow: 1;
    }
  }

  .row {
    flex-direction: row;
  }

  .column {
    flex-direction: column;
  }
</style>