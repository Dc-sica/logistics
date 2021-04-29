<template>
  <div class="question-conf">
    <template v-for="(item,index) in confList">
      <div :key="index">
        <component :is="item.type" :currentIndex="index" v-show="index===currentIndex"></component>
      </div>
    </template>
  </div>
</template>
<script>
import singleChoice from './singleChoice.vue'
import multipleChoice from './multipleChoice.vue'
import dropDown from './dropDown.vue'
import multipleInput from './multipleInput'
import singleInput from './singleInput'
export default {
  name:"questionConf",
  components:{
    singleChoice,
    multipleChoice,
    dropDown,
    multipleInput,
    singleInput
  },
  props:{
    currentIndex:{
      type:Number,
      value:-1
    }
  },
  data () {
    return {
      componentsType:'',
      confList:[]
    }
  },
  created(){
    this.confList = this.$store.getters.getCustomerFormData 
  },
  watch:{
    "$store.getters.getCustomerFormData":function(val){
      this.confList = val
    }
  }
}
</script>