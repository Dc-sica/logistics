<template>
  <div class="question-detail-container">
    <div class="question-detail-title">
      <span class="question-detail-require" v-if="detailData.isRequire">*</span>
      {{detailData.title}}
    </div>
    <el-checkbox-group v-model="value">
      <li v-for="(item, index) in detailData.selectItems" :key="index" class="question-select-item">
        <el-checkbox :label="item.label"></el-checkbox>
      </li> 
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name:'multipleChoice',
  props:{
    currentIndex:{
      type:Number
    }
  },
  data(){
    return{
      detailData:{},
      value:[]
    }
  },
  created(){
    this.detailData = this.$store.getters.getCustomerFormData[this.currentIndex]
  },
  methods:{
    exportValue(){
      return {
        sort:this.currentIndex,
        value:this.value.length>0?this.value:''
      }
    }
  }
}
</script>