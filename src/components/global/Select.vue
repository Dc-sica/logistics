<template>
  <el-select
    v-model="defaultValue"
    size="mini"
    :placeholder="inputPlacehoder"
    clearable
    @change="returnChange"
  >
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script>
export default {
  name: 'CkInput',
  // eslint-disable-next-line vue/require-prop-types
  props: ['placeholder', 'value', 'options', 'field'],
  data() {
    return {
      isFocus: false,
      defaultValue: ''
    }
  },
  computed: {
    inputPlacehoder: function() {
      return '请选择' + this.placeholder
    }
  },
  created() {
    this.defaultValue = this.value
  },
  methods: {
    returnChange() {
      this.$emit('change', [this.field, this.defaultValue])
    }
  }
}
</script>
<style lang="less" scoped>
</style>
