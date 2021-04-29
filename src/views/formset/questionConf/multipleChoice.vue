<template>
  <div class="question-conf-container">
    <div class="base-conf">
      <div class="base-conf-item">
        <p class="base-conf-title">标题</p>
        <el-input v-model="detailData.title" size="mini" maxlength="30" placeholder="请输入标题"></el-input>
        <p style="color: #999; padding: 3px 0px">不超过30个字</p>
      </div>
      <div class="base-conf-item">
        <p class="base-conf-title">是否必填</p>
        <el-switch v-model="detailData.isRequire" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </div>
      <div class="base-conf-item">
        <p class="base-conf-title">设置选项</p>
        <ul class="question-conf-box">
          <li v-for="(item, index) in detailData.selectItems" :key="index" class="select-items">
            <el-input v-model="item.label" size="mini" placeholder="请输入选项值" style="width: 200px; margin-right: 10px"></el-input>
            <el-checkbox v-model="item.isRemark">异常</el-checkbox>
            <span style="padding-left: 10px"><i @click="deleteSelectItem(index)" class="iconfont" style="color:red;">&#xe663;</i></span>
          </li>
        </ul>
        <div class="add-select-item" @click="addSelectItem">新增选项</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "singleChoice",
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
      addSelectItem() {
        if(this.detailData.selectItems.length > 0) {
          let lastItem = this.detailData.selectItems[this.detailData.selectItems.length - 1]
          if (lastItem.label === '') {
            this.$message.error("第" + this.detailData.selectItems.length + "项不能为空")
            return
          }
          let isExit = this.detailData.selectItems.filter(item => item.label === lastItem.label)
          if (isExit.length > 1) {
            this.$message.error("第" + this.detailData.selectItems.length + "内容存在重复")
            return
          }
        }
        this.detailData.selectItems.push({
          label: "",
          isRemark: "",
          remark: "",
        });
      },
      deleteSelectItem(index) {
        this.detailData.selectItems.splice(index, 1);
      },
    },
  };
</script>
<style lang="less">
  @import url("../css/style.less");
</style>