<template>
  <el-input size="mini" :value="value" :placeholder="inputPlacehoder" @input="returnChange" />
</template>
<script>
export default {
  name: 'CkInput',
  // eslint-disable-next-line vue/require-prop-types
  props: ['placeholder', 'value', 'field'],
  data() {
    return {
      isFocus: false
    }
  },
  computed: {
    inputPlacehoder: function() {
      return '请输入' + (this.placeholder || '')
    }
  },
  methods: {
    returnChange(event) {
      this.$emit('change', [this.field, event])
    }
  }
}
</script>
<style lang="less" scoped>
</style>
