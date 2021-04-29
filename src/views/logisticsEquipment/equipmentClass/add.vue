<template>
  <el-drawer title="分类" :wrapperClosable="false" class="drawer-wrapper" :visible.sync="drawer" direction="rtl" node-key="id" :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入分类名称，不超15字" maxlength="15" :disabled="iscan"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：" prop="parentId">
        <el-select v-model="ruleForm.parentId" placeholder="请选择上级分类" style="width:100%" :disabled="iscan">
          <el-option label="一级" value="0"></el-option>
          <el-option v-for="(item,index) in parentList" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类编号：">
        <el-input v-model="ruleForm.code" placeholder="请输入分类编号" :disabled="iscan"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="typeOrder">
        <el-input v-model.number="ruleForm.typeOrder" placeholder="请输入排序" :disabled="iscan"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注信息，不超过300字" maxlength="300" rows="4" :disabled="iscan"></el-input>
      </el-form-item>
    </el-form>
    <div class="wrapper-top">
      <div class="btn" @click="handleClose">取消</div>
      <div class="btn apbtn" @click="handleSubmit('ruleForm')">提交</div>
    </div>
  </el-drawer>
</template>

<script>
  import {
    getEquipmentTypePage,
    getEquipmentChildrenList,
    addEquipmentType,
    buildInit,
    lookById,
    updateEquipmentType
  } from './../../../apis/logisticsEquipment/index'
  export default {
    name: 'stream', //单据流，
    props: ['drawer', 'dataList', 'btnType', 'rowId'],
    data() {
      return {
        parentList: [],
        iscan: false,
        ruleForm: {
          name: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }, ],
          parentId: [{
            required: true,
            message: '请选择上级分类',
            trigger: 'blur'
          }],
          typeOrder: [{
            type: 'number',
            message: '排序必须为数字值',
          }]

        }
      }
    },
    created() {
      if (this.btnType == 1) { //新增
      } else if (this.btnType == 2) { //编辑
        this.getlookById()
      } else {
        this.iscan = true
        this.getlookById()
      }
      this.getbuildInit()
    },
    methods: {
      getlookById() {
        let param = {
          id: this.rowId
        }
        lookById(param).then(res => {
          if (res.data.code == 200) {
            this.ruleForm = res.data.data || {}
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getbuildInit() { //获取上级分类
        buildInit().then(res => {
          if (res.data.code == 200) {
            this.parentList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleSubmit(formName) {
        let param = {
          ...this.ruleForm,
          id: 0
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.btnType == 1) { //新增
              addEquipmentType(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this.handleClose()
                  this.$emit('handleFresh')

                } else {
                  this.$message.error(res.data.message)
                }
              })
            } else if (this.btnType == 2) { //编辑
              param.id = this.rowId
              updateEquipmentType(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this.handleClose()
                  this.$emit('handleFresh')
                } else {
                  this.$message.error(res.data.message)
                }
              })
            } //编辑

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose() {
        this.$emit('closeHandle')
      }
    }
  }
</script>
<style lang="less" scoped>
  .demo-ruleForm {
    margin-top: 30px;
    padding-right: 20px;
    padding-left: 15px;
  }

  .wrapper-top {
    position: absolute;
    text-align: center;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .btn {
    float: right;
    width: 92px;
    line-height: 35px;
    height: 35px;
    opacity: 1;
    background: #ffffff;
    border: 2px solid #ff8c00;
    text-align: center;
    border-radius: 22px;
    cursor: pointer;
  }

  .apbtn {
    margin-left: 25px;
    background: #ff8c00;
    color: #ffffff;
  }

  .drawer-wrapper {
    /deep/ .el-drawer__header {
      background: #1c93a7;
      color: #fff;
      margin-bottom: 0;
      padding-bottom: 5px;
    }
  }
</style>