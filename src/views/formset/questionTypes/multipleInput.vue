<template>
  <!-- 多行文本 -->
  <div class="question-detail-container">
    <div class="question-detail-title">
      <span class="question-detail-require" v-if="detailData.isRequire">*</span>
      {{detailData.title}}
    </div>
    <ul class="question-detail-box">
      <el-input v-model="value" type="textarea"  style="width:300px" maxlenth="50" :placeholder="detailData.placeholder"></el-input>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'multipleInput',
    props: {
      currentIndex: {
        type: Number,
        value:''
      }
    },
    data() {
      return {
        detailData: {},
        value: ""
      }
    },
    created() {
      this.detailData = this.$store.getters.getCustomerFormData[this.currentIndex]
    },
    methods:{
      exportValue(){
        return {
          sort:this.currentIndex,
          value:this.value
        }
      }
    }
  }
</script>