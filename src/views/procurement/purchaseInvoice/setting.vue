<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-08 09:25:33
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-01-28 11:03:32
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseInvoice/setting.vue
-->
<template>
  <ContainerGroup id="containerGroup">
    <Container>
        <el-button type="default"
          @click="_backHandle">返回</el-button>
        <el-button type="primary"
          @click="_saveHandle">提交</el-button> 
    </Container>
    <Container>
      <p class="form-title">
        采购发票
      </p>
      <div class="form-row">
        <el-row :gutter="40">
          <el-form :model="formInfo" ref="formInfo">
            <el-col :span="10">
              <el-form-item label="采购单号：" label-width="120px">
                <el-input v-model="formInfo.purchaseOrderNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="采购收货单号：" label-width="120px">
                <!-- <el-input disabled v-model="formInfo.purchaseReceiptNumber"></el-input> -->
                <el-select placeholder="请选择" clearable v-model="formInfo.purchaseReceiptNumber" style="width:100%;">
                  <el-option v-for="(item,index) in purchaseReceiptNumberList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="供应商：" label-width="120px">
                <el-input v-model="formInfo.supplierName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="收货日期：" label-width="120px">
                <el-date-picker type="date" style="width:100%;" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formInfo.receivingDate"></el-date-picker>
                <!-- <el-input v-model="formInfo.receivingDate"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="发票号：" required label-width="120px">
                <p v-for="(item,index) in ticketsList " :key="index" style="margin-bottom: 10px;">
                  <el-input v-model="ticketsList[index]" style="width:92%"></el-input>
                  <el-button type="text" @click="_addTicket" v-if="index===0" style="margin-left:10px"><i class="el-icon-circle-plus-outline"></i>
                  </el-button>
                  <el-button type="text" v-if="index!==0" @click="_removeTicket(index)" style="margin-left:10px"> <i class="el-icon-remove-outline"></i>
                  </el-button>
                </p>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="附件上传：" label-width="120px">
                <el-upload class="upload-demo" action="/" :on-remove="handleRemove" :before-remove="beforeRemove" :multiple='false' :http-request='uploadFile' :file-list="fileList">
                  <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
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
    upload
  } from './../../../apis/commonApi'
  import {
    getDetailById,
    updateInvoice,
    detailByPurchaseOrderNumber,
    receiptListByOrderNum
  } from './../../../apis/purchaseInvoice'
  export default {
    name: 'setting',
    data() {
      return {
        formInfo: {},
        ticketsList: [],
        fileList: [],
        purchaseReceiptNumberList: []
      }
    },
    created() {
      const {
        id
      } = this.$route.query
      this.mainId = id
      if (this.$route.query.orderNum) { //从采购收货详情页面
        this.getdetailByPurchaseOrderNumber(this.$route.query.orderNum)
      } else {
        this._getInfo()
      }

    },
    methods: {
      handleChange(value) {
        console.log('value', value)
        receiptListByOrderNum(value).then(res => {
          if (res.data.code === 200) {
            this.purchaseReceiptNumberList = res.data.data
          }
        })
      },
      getdetailByPurchaseOrderNumber(value) { //根据订单号获取发票详情
        detailByPurchaseOrderNumber(value).then(res => {
          if (res.data.code === 200) {
            console.log('res', res.data.data)
            let result = res.data.data || {}
            let uploadUrlArr = result.enclosurePath && result.enclosurePath.split(';')
            let uploadUrlArrnew = []
            uploadUrlArr.forEach(ele => {
              if (ele) {
                uploadUrlArrnew.push({
                  name: ele.substr(ele.lastIndexOf('/') + 1),
                  url: ele
                })
              }

            })
            this.ticketsList = result.invoiceNumber && result.invoiceNumber.split(';')
            setTimeout(() => {
              this.formInfo.receivingDate = result.receivingDate
              this.formInfo.purchaseReceiptNumber = result.purchaseReceiptNumber
              this.formInfo.purchaseOrderNumber = result.purchaseOrderNumber
              this.formInfo.supplierName = result.supplierName
              this.fileList = uploadUrlArrnew
              this.handleChange(this.formInfo.purchaseOrderNumber) //获取采购收货单号列表
            }, 10)

          }
        })
      },
      _backHandle() {
        this.$router.push('/purchaseInvoice')
      },
      _getInfo() {
        let params = {
          id: this.mainId
        }
        getDetailById(params).then(res => {
          console.log('res', res)
          if (res.data.code === 200) {
            this.formInfo = res.data.data || {}
            let enclosureNameList = this.formInfo.enclosureName && this.formInfo.enclosureName.split(';')
            let enclosurePathList = this.formInfo.enclosurePath && this.formInfo.enclosurePath.split(';')
            enclosureNameList && enclosureNameList.forEach((item, index) => {
              this.fileList.push({
                name: item,
                url: enclosurePathList[index]
              })
            })
            console.log('this.formInfo.invoiceNumber', this.formInfo.invoiceNumber)
            this.ticketsList = this.formInfo.invoiceNumber && this.formInfo.invoiceNumber.split(';')
            setTimeout(() => {
              this.handleChange(this.formInfo.purchaseOrderNumber) //获取采购收货单号列表
            }, 100)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _saveHandle() {
        let enclosureName = []
        let enclosurePath = []
        this.fileList.forEach(item => {
          enclosureName.push(item.name)
          enclosurePath.push(item.url)
        })
        let params = {
          ...this.formInfo,
          enclosureName: enclosureName.join(";"),
          enclosurePath: enclosurePath.join(";"),
          invoiceNumber: this.ticketsList.join(";")
        }
        updateInvoice(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.$router.push('/purchaseInvoice')
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _addTicket() {
        this.ticketsList.push('')
      },
      _removeTicket(index) {
        this.ticketsList.splice(index, 1)
      },
      uploadFile(params) {
        let fd = new FormData()
        fd.append('file', params.file)
        upload(fd)
          .then(res => {
            if (res.data.code === 200) {
              this.fileList = this.fileList.concat(res.data.data)
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          })
          .catch(err => {
            console.log('error', err)
            alert('上传失败，请重新上传')
          })
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },

      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
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