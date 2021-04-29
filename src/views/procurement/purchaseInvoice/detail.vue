<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-08 09:25:38
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-28 11:23:32
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseInvoice/detail.vue
-->
<template>
  <ContainerGroup id="containerGroup">
    <Container>
        <el-button type="default"
          @click="_backHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
        采购发票
      </p>
      <div class="form-row">
        <el-row :gutter="40">
          <el-form :model="formInfo" ref="formInfo">
            <el-col :span="10">
              <el-form-item label="采购单号：" label-width="100px">
                <el-input v-model="formInfo.purchaseOrderNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="供应商：" label-width="100px">
                <el-input v-model="formInfo.supplierName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="收货日期：" label-width="100px">
                <el-input v-model="formInfo.receivingDate" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="附件上传：" label-width="100px">
                <p style="cursor:pointer;" v-for="(item,index) in fileList" :key="index" @click='_downLoad(item)'>
                  <span style="margin-right:10px;">{{item.name}}</span>
                  <span style="color:#1C93A6;">立即下载</span>
                </p>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="发票号：" label-width="100px">
                <p v-for="item in ticketsList" :key="item" style="margin-bottom: 10px;">
                  <el-input :value="item" disabled></el-input>
                </p>
              </el-form-item>
            </el-col>
          </el-form>

        </el-row>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    getDetailById
  } from './../../../apis/purchaseInvoice'
  export default {
    name: 'detail',
    data() {
      return {
        formInfo: {},
        tickets: [],
        fileList: [],
        ticketsList: []
      }
    },
    created() {
      const {
        id
      } = this.$route.query

      this.mainId = id
      this._getInfo()
    },
    methods: {
      _getInfo() {
        let params = {
          id: this.mainId
        }
        getDetailById(params).then(res => {
          if (res.data.code === 200) {
            this.formInfo = res.data.data
            // this.fileList = this.formInfo.enclosureName.split(';')
            this.ticketsList = this.formInfo.invoiceNumber.split(';')
            let enclosureNameList = this.formInfo.enclosureName.split(';')
            let enclosurePathList = this.formInfo.enclosurePath.split(';')
            enclosureNameList.forEach((item, index) => {
              this.fileList.push({
                name: item,
                url: enclosurePathList[index]
              })
            })

          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _backHandle() {
        this.$router.push('/purchaseInvoice')
      },
      _downLoad(obj, index) {
        window.open(obj.url)
      }
    }
  }
</script>
<style lang="less" scoped>
  .form-title {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>