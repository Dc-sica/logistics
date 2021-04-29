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
      <div class="wrapper-top">
        <el-button type="default"
        @click="_backHandle">返回</el-button>
        <el-button type="default"
          @click="_saveHandle">提交</el-button> 
      </div>
      
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
                <el-select placeholder="请选择" clearable v-model="formInfo.purchaseOrderNumber" @change="handleChange" style="width:100%;">
                  <el-option v-for="(item,index) in orderNumberList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
                <!-- <el-input v-model="formInfo.purchaseOrderNumber"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="采购收货单号：" label-width="120px">
                <el-select placeholder="请选择" clearable v-model="formInfo.purchaseReceiptNumber" style="width:100%;">
                  <el-option v-for="(item,index) in purchaseReceiptNumberList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
                <!-- <el-input v-model="formInfo.purchaseReceiptNumber"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="供应商：" label-width="120px">
                <el-select placeholder="请选择" clearable v-model="formInfoObj" value-key="code" style="width:100%;">
                  <el-option v-for="(item,index) in supplierList" :key="index" :value="item" :label="item.name"></el-option>
                </el-select>
                <!-- <el-input v-model="formInfo.supplierName"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="收货日期：" label-width="120px">
                <el-date-picker v-model="formInfo.receivingDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:100%;">
                </el-date-picker>
                <!-- <el-input v-model="formInfo.receivingDate"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="发票号：" required label-width="120px">
                <!-- <p v-for="(item,index) in ticketsList " :key="index" style="margin-bottom: 10px;">
                  <el-input v-model="ticketsList[index]" style="width:92%"></el-input>
                  <el-button type="text" @click="_addTicket" v-if="index===0" style="margin-left:10px"><i class="el-icon-circle-plus-outline"></i>
                  </el-button>
                  <el-button type="text" v-if="index!==0" @click="_removeTicket(index)" style="margin-left:10px"> <i class="el-icon-remove-outline"></i>
                  </el-button>
                </p> -->
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                  <el-form-item prop="invoiceNumber" style="position:relative;margin-bottom:10px;">
                    <el-input v-model="dynamicValidateForm.invoiceNumber"></el-input><span @click="addDomain" class="el-icon-circle-plus-outline"></span>
                  </el-form-item>
                  <el-form-item style="position:relative;margin-bottom:10px;" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" :prop="'domains.' + index + '.invoiceNumber'">
                    <el-input v-model="domain.invoiceNumber" style="position:relative;"></el-input><span @click.prevent="removeDomain(domain)" class="el-icon-remove-outline"></span>
                  </el-form-item>
                </el-form>
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
    upload,
    geSupplierList
  } from './../../../apis/commonApi'
  import {
    getDetailById,
    insertInvoice,
    OrderNumberList,
    receiptListByOrderNum
  } from './../../../apis/purchaseInvoice'
  export default {
    name: 'setting',
    data() {
      return {
        formInfo: {},
        formInfoObj: {},
        ticketsList: [],
        fileList: [],
        dynamicValidateForm: {
          domains: [],
          invoiceNumber: ''
        },
        supplierList: [],
        orderNumberList: [],
        purchaseReceiptNumberList: []
      }
    },
    created() {
      const {
        id
      } = this.$route.query
      this.mainId = id
      // this._getInfo()
      this.getOrderNumberList()
      this.geSupplierListData()
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
      getOrderNumberList() { //获取全部采购订单号
        OrderNumberList().then(res => {
          if (res.data.code === 200) {
            this.orderNumberList = res.data.data
          }
        })
      },
      geSupplierListData() {
        geSupplierList().then(res => {
          console.log('res', res)
          if (res.data.code === 200) {
            this.supplierList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          invoiceNumber: '',
          key: Date.now()
        });
      },
      _backHandle() {
        this.$router.push('/purchaseInvoice')
      },
      _getInfo() {
        let params = {
          id: this.mainId
        }
        getDetailById(params).then(res => {
          if (res.data.code === 200) {
            this.formInfo = res.data.data
            let enclosureNameList = this.formInfo.enclosureName.split(';')
            let enclosurePathList = this.formInfo.enclosurePath.split(';')
            enclosureNameList.forEach((item, index) => {
              this.fileList.push({
                name: item,
                url: enclosurePathList[index]
              })
            })
            this.ticketsList = this.formInfo.invoiceNumber.split(';')
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _saveHandle() {
        if (!this.dynamicValidateForm.invoiceNumber && this.dynamicValidateForm.domains.length === 0) {
          this.$message.warning('请填写发票号')
          return false
        }
        let enclosureName = []
        let enclosurePath = []
        this.fileList.forEach(item => {
          enclosureName.push(item.name)
          enclosurePath.push(item.url)
        })
        let invoiceNumberArr = this.dynamicValidateForm.invoiceNumber || ''
        if (this.dynamicValidateForm.domains.length > 0) {
          invoiceNumberArr = this.dynamicValidateForm.domains.map(item => {
            return item.invoiceNumber
          }).join(';') + ';' + invoiceNumberArr

        }
        // console.log('this.formInfo', this.formInfo)
        // if (this.formInfo.supplierCode) {
        //   this.supplierList.forEach(item => {
        //     if (this.formInfo.supplierCode === item.code) {
        //       this.formInfo.supplierName = item.name
        //     }
        //   })
        // } else {
        //   this.formInfo.supplierName = ''
        // }

        this.formInfo.supplierCode = this.formInfoObj && this.formInfoObj.name || ''
        this.formInfo.supplierName = this.formInfoObj && this.formInfoObj.name || ''
        let params = {
          ...this.formInfo,
          id: 0,
          enclosureName: enclosureName.join(";"),
          enclosurePath: enclosurePath.join(";"),
          // invoiceNumber: this.ticketsList.join(";")
          invoiceNumber: invoiceNumberArr
        }
        insertInvoice(params).then(res => {
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
  .wrapper-top {
    text-align: right;
  }
</style>