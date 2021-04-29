<template>
  <div class="ck-filter-form" :style="{ height: containerHeight }">
    <div ref="input-container" class="form-item-container">
      <template v-for="(item, index) in elements">
        <div
          :key="index"
          class="form-item"
          :style="'width:' + (item.width || 200) + 'px'"
        >
          <div v-if="item.label" class="form-item-label">
            {{ item.label }}：
          </div>
          <component :is="item.type" v-model="item.value" :placeholder="item.label" :options="item.options || []" :field="item.key" :mode="item.mode" @change="handlerChange" @input="handlerChange" />
        </div>
      </template>
    </div>
    <div class="right-btn-container">
      <div
        v-for="(item, index) in buttonList"
        :key="index + '_'"
        class="form-item-btn"
      >
        <Button
          :type="item.type"
          :icon="item.icon"
          @click="buttonClick(item.handlerClick)"
        >{{ item.label }}</Button>
      </div>
      <span v-show="showCloseAndOpen" class="more-text" @click="openAndCloseFilterForm">{{ openOrCloseText }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CkForm',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    elements: Array,
    // eslint-disable-next-line vue/require-default-prop
    buttonList: Array
  },
  data() {
    return {
      tagElements: ['Input', 'Select', 'DatePicker', 'DateTimePicker'],
      params: {},
      containerHeight: '35px',
      showCloseAndOpen: false,
      openOrCloseText: '展开'
    }
  },
  mounted() {
    this.initShowCloseOrOpen()
    window.addEventListener('resize', this.initShowCloseOrOpen)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initShowCloseOrOpen)
  },
  methods: {
    initShowCloseOrOpen() {
      this.showCloseAndOpen = this.$refs['input-container'].scrollHeight > 35
    },
    handlerChange(value) {
      if (value[0]) {
        this.params[value[0]] = value[1]
        if (value[1] === '') {
          delete this.params[value[0]]
        }
      }
    },
    reset() {
      this.elements.forEach((item) => {
        item.value = ''
      })
    },
    buttonClick(handler) {
      handler && handler(this.params)
    },
    openAndCloseFilterForm() {
      this.containerHeight = this.openOrCloseText === '展开' ? 'auto' : '35px'
      this.openOrCloseText = this.openOrCloseText === '展开' ? '收起' : '展开'
    }
  }
}
</script>
<style lang="less" scoped>
@import url("@/assets/varibles.less");
.ck-filter-form {
  display: flex;
  align-items: top;
  overflow: hidden;
  .form-item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .form-item {
      display: flex;
      align-items: center;
      margin: 3px;
      margin-right: 15px;
      .form-item-label {
        color: #909399;
        text-align: right;
        white-space: nowrap;
      }
    }
  }
  .right-btn-container {
    text-align: center;
    display: flex;
    padding-top: 5px;
    .form-item-btn {
      margin: 0px 3px;
    }
    .more-text {
      display: block;
      width: 50px;
      margin-top: 6px;
      color:@themColor;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
