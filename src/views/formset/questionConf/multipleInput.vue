<template>
  <!-- 单行文本 -->
  <div class="question-conf-container">
    <div class="base-conf">
      <div class="base-conf-item">
        <p class="base-conf-title">标题</p>
        <el-input v-model="detailData.title" size="mini" maxlength="30" placeholder="请输入标题"></el-input>
        <p style="color: #999; padding: 3px 0px">不超过30个字</p>
      </div>
      <div class="base-conf-item">
        <p class="base-conf-title">站位符</p>
        <el-input v-model="detailData.placeholder" size="mini" :placeholder="detailData.placeholder"></el-input>
      </div>
      <div class="base-conf-item">
        <p class="base-conf-title">是否必填</p>
        <el-switch v-model="detailData.isRequire" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "multipleInput",
    props: {
      currentIndex: {
        type: Number
      }
    },
    data() {
      return {
        detailData: {},
      };
    },
    created() {
      this.detailData = this.$store.getters.getCustomerFormData[this.currentIndex]
    },
    methods: {

    }
  };
</script>
<style lang="less">
  @import url("../css/style.less");
</style>