<template>
  <div class="question-detail-container">
    <div class="question-detail-title">
      <span class="question-detail-require" v-if="detailData.isRequire">*</span>
      {{detailData.title}}
    </div>
    <el-select v-model="value" :placeholder="detailData.placeholder">
      <el-option :value="-1" label="全部"></el-option>
      <el-option v-for="(item, index) in detailData.selectItems" :key="index" :label="item.label" :value="index"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name:'multipleChoice',
  props:{
    currentIndex:{
      type:Number
    },
    defaultValue:Object
  },
  data(){
    return{
      detailData:{},
      value:'',
      remark:''
    }
  },
  created(){
    this.detailData = this.$store.getters.getCustomerFormData[this.currentIndex]
    if (this.defaultValue) {
      this.value = this.defaultValue.value
      this.remark = this.defaultValue.remark
    }
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