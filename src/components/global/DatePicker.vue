<template>
  <el-date-picker
    v-model="defaultValue"
    size="mini"
    :type="mode||'date'"
    format="yyyy-MM-dd"
    value-format="yyyy-MM-dd"
    :placeholder="inputPlacehoder"
    @change="returnChange"
  />
</template>
<script>
export default {
  name: 'DatePicker',
  // eslint-disable-next-line vue/require-prop-types
  props: ['placeholder', 'value', 'field', 'mode'],
  data() {
    return {
      defaultValue: ''
    }
  },
  computed: {
    inputPlacehoder: function() {
      return '请选择' + this.placeholder
    }
  },
  mounted() {
    this.defaultValue = this.value
  },
  methods: {
    returnChange() {
      this.$emit('change', [this.field, this.defaultValue])
    }
  }
}
</script>
