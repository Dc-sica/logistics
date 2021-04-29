<template>
  <el-drawer title="设备参数" :wrapperClosable="false" class="drawer-wrapper" :visible.sync="drawer" direction="rtl" node-key="id" :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="分类名称：" prop="lxname">
        <el-cascader placeholder="请选择" style="width:100%" :disabled="iscan" v-model="ruleForm.lxname" :options="typeNameArr" @change="handleChange"></el-cascader>
      </el-form-item>
      <el-form-item label="参数编号：">
        <el-input v-model="ruleForm.code" placeholder="请输入参数编号" :disabled="iscan"></el-input>
      </el-form-item>
      <el-form-item label="参数名称：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入参数名称" :disabled="iscan"></el-input>
      </el-form-item>
      <el-form-item label="参数单位：">
        <el-select v-model="ruleForm.unit" placeholder="请选择" :disabled="iscan">
          <el-option v-for="(item,index) in unitList" :key="index" :label="item.name" :value="item.dictId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注信息，不超过300字" maxlength="300" rows="4" :disabled="iscan"></el-input>
      </el-form-item>
    </el-form>
    <div class="wrapper-top">
      <div class="btn" @click="handleClose">取消</div>
      <div class="btn apbtn" @click="handleSubmit('ruleForm')" v-if="!iscan">提交</div>
    </div>
  </el-drawer>
</template>

<script>
  import {
    addParam,
    lookParamById,
    updateParam,
    getParamChildrenList,
    deleteParam
  } from './../../../apis/logisticsEquipment/index'
  import {
    getDept
  } from './../../../apis/userManagement/indexApi'
  export default {
    name: 'add', //
    props: ['drawer', 'btnType', 'rowId'],
    data() {
      return {
        unitList: [],
        parentList: [],
        iscan: false,
        ruleForm: {
          name: '',
          typeId: ''
        },
        typeNameArr: [],
        rules: {
          name: [{
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          }, ],
          lxname: [{
            required: true,
            message: '请选择分类',
            trigger: ['blur', 'change']
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
      this.getParambuildInitData()
      this.getunitList()
    },
    methods: {
      handleChange(value) {
        console.log('value', value);
        this.ruleForm.typeId = value[value.length - 1]
      },
      getunitList() { //获取单位
        getDept({
          categoryCode: 'equipment_unit',
          status: 1
        }).then(res => {
          if (res.data.code === 200) {
            this.unitList = res.data.data.sysDictList
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getParambuildInitData() {
        getParamChildrenList().then(res => {
          if (res.data.code == 200) {
            this.typeNameArr = res.data.data || []
            this.getdgData(this.typeNameArr)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getdgData(typeNameArr) {
        typeNameArr.forEach(item => {
          if (item.children.length == 0) {
            delete item.children
            item.value = item.id
          } else {
            item.value = item.id
            this.getdgData(item.children)
          }
        })
      },
      getlookById() {
        let param = {
          id: this.rowId
        }
        lookParamById(param).then(res => {
          if (res.data.code == 200) {
            setTimeout(() => {
              this.ruleForm = res.data.data
              this.ruleForm.lxname = res.data.data.typeIdList
            }, 100);
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
              addParam(param).then(res => {
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
              updateParam(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this.handleClose()
                  this.$emit('handleFresh')
                } else {
                  this.$message.error(res.data.message)
                }
              })
            }

          } else {
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