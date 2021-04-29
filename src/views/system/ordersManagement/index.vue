<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <div class="bot-button">
        <el-button   @click="_goback">取消</el-button>
        <el-button  type="primary" @click="_onSubmit">提交</el-button>
      </div>
    </Container>
    <Container height="fill" scrollY="true">
      <p class="form-title">
          维修业务
      </p>
      <div class="form-row">
        <el-row>接单模式:<p style="color:#333333;display:inline-block;">（接单模式更改后，功能次日生效）</p>
        </el-row>
        <el-row style="margin-top:30px;padding-left: 30px;">
          <el-radio-group v-model="receivingRadio">
            <el-radio :label="1">班组抢单</el-radio>
            <el-radio :label="2">自动接单</el-radio>
            <el-radio :label="3">手动接单</el-radio>
            <el-radio :label="4">组长接单</el-radio>
          </el-radio-group>
        </el-row>
      </div>
      <p class="form-title bt">
        陪检运送
      </p>
      <div class="form-row p-clear">
        <el-row>病员:<p style="color:#333333;display:inline-block;">（接单模式更改后，功能次日生效）</p>
        </el-row>
        <el-row style="margin: 30px 0px;padding-left: 30px;">
          <el-radio-group v-model="patientRadio">
            <el-radio :label="1">班组抢单</el-radio>
            <el-radio :label="2">自动接单</el-radio>
            <el-radio :label="3">手动接单</el-radio>
            <el-radio :label="4">组长接单</el-radio>
          </el-radio-group>
        </el-row>
        <el-row>物品:<p style="color:#333333;display:inline-block;">（接单模式更改后，功能次日生效）</p>
        </el-row>
        <el-row style="margin: 30px 0px;padding-left: 30px;">
          <el-radio-group v-model="goodsRadio">
            <el-radio :label="1">班组抢单</el-radio>
            <el-radio :label="2">自动接单</el-radio>
            <el-radio :label="3">手动接单</el-radio>
            <el-radio :label="4">组长接单</el-radio>
          </el-radio-group>
        </el-row>
        <el-row>标本:<p style="color:#333333;display:inline-block;">（接单模式更改后，功能次日生效）</p>
        </el-row>
        <el-row style="margin: 30px 0px;padding-left: 30px;">
          <el-radio-group v-model="specimenRadio">
            <el-radio :label="1">班组抢单</el-radio>
            <el-radio :label="2">自动接单</el-radio>
            <el-radio :label="3">手动接单</el-radio>
            <el-radio :label="4">组长接单</el-radio>
          </el-radio-group>
        </el-row>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    getOrderSettingList,
    updateOrderSetting
  } from './../../../apis/ordersManagement/indexApi'

  export default {
    name: 'ordersManagement',
    data() {
      return {
        receivingRadio: 1,
        patientRadio: 1,
        goodsRadio: 1,
        specimenRadio: 1,
        formInfo: {},
        formInline: {},
        formTable: {},
        tableData: [],
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      _goback() {
        // this.$router.go(-1)
        this.getDetail()
      },
      getDetail() {
        getOrderSettingList().then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data
            this.receivingRadio = this.tableData[0].modelNow
            this.patientRadio = this.tableData[1].modelNow
            this.goodsRadio = this.tableData[2].modelNow
            this.specimenRadio = this.tableData[3].modelNow
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _onSubmit() {
        let params = [{
            id: 1,
            model: this.receivingRadio,
            modelNow: this.receivingRadio
          },
          {
            id: 3,
            model: this.patientRadio,
            modelNow: this.patientRadio
          },
          {
            id: 4,
            model: this.goodsRadio,
            modelNow: this.goodsRadio
          },
          {
            id: 5,
            model: this.specimenRadio,
            modelNow: this.specimenRadio
          }
        ]
        updateOrderSetting(params).then(res => {
          if (res.data.code === 200) {
            // setTimeout(() => {
              this.$message.success(res.data.message)
              this.getDetail()
            // }, 500)
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
 
.form-title {
  border-bottom: 1px solid #e5e5e5;
  line-height: 44px;
  padding-left: 30px;
  font-family: Source Han Sans CN Regular,
    Source Han Sans CN Regular-Regular;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  color: #333333;
  background: #fcfcfc;
}

.bt {
  border-top: 1px solid #e5e5e5;
}

.form-row {
  padding: 15px 30px;
}

  
</style>