<template>
  <div class="question-detail-container">
    <div class="question-detail-title">
      <span class="question-detail-require" v-if="detailData.isRequire">*</span>
      {{detailData.title}}
    </div>
    <ul class="question-detail-box">
      <el-radio-group v-model="value">
        <li v-for="(item, index) in detailData.selectItems" :key="index" class="question-select-item">
          <el-radio :label="item.label"></el-radio>{{item.isRemark}} {{item.label}}
          <span v-if="item.label == value && item.isRemark "> 异常</span>
        </li>
      </el-radio-group>
    </ul>
  </div>
</template>
<script>
export default {
  name:'singleChoice',
  props:{
    currentIndex:{
      type:Number
    },
    defautValue:Object
  },
  data(){
    return{
      detailData:{},
      value:''
    }
  },
  created(){
    this.detailData = this.$store.getters.getCustomerFormData[this.currentIndex]
    if (this.defautValue) {
      this.value = this.defautValue.value
      this.remark = this.defautValue.remark
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