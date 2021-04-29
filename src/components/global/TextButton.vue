<template>
  <span class="ck-text-button" :class="'btn-'+type">
    <slot />
  </span>
</template>
<script>
export default {
  name: 'CkTextButton',
  // eslint-disable-next-line vue/require-prop-types
  props: ['type'],
  data() {
    return {

    }
  }
}
</script>
<style scoped lang="less">
@import url('@/assets/varibles.less');
.ck-text-button{
  padding:2px 3px;
  display: inline-block;
  margin:0px 4px;
  cursor: pointer;
}
.ck-text-button:hover{
  opacity: .8;
}
.btn-primary{
  color: @primaryColor
}
.btn-info{
  color:@themColor;
}
.btn-delete{
  color: @dangerColor;
}

</style>
