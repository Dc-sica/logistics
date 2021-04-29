<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-12 09:51:45
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-07 17:07:52
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseReceipt/detail.vue
-->
<template>
  <ContainerGroup id="containerGroup">
    <Container>
        <el-button
          @click="_backHandle">返回</el-button>
        <el-button type="primary"
          @click="_printTicket">单据打印</el-button>
    </Container>
    <Container>
      <p class="form-title">
        采购信息
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" :rules="rules" ref="formInfo">
            <el-col :span="6">
              <el-form-item label="采购订单号：" prop="purchaseOrderNumber" label-width="120px">
                <el-input v-model="formInfo.purchaseOrderNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采购收货单号：" prop="purchaseReceiptNumber" label-width="120px">
                <el-input v-model="formInfo.purchaseReceiptNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请部门：" prop="applyDepartmentName" label-width="120px">
                <el-input v-model="formInfo.applyDepartmentName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人：" prop="applicantName" label-width="120px">
                <el-input v-model="formInfo.applicantName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录单日期：" prop="recordDate" label-width="120px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInfo.recordDate" disabled style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货仓库：" prop="warehouseName" label-width="120px">
                <el-input v-model="formInfo.warehouseName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货人：" prop="consigneeName" label-width="120px">
                <el-input v-model="formInfo.consigneeName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货时间：" prop="receivingDate" label-width="120px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInfo.receivingDate" disabled style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额：" prop="amountTotal" label-width="120px">
                <el-input v-model="formInfo.amountTotal" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 1 未过账 2已过账 -->
              <el-form-item label="状态：" prop="status" label-width="120px">
                <el-input :value="formInfo.status===1?'未过账':formInfo.status===2?'已过账':''" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="备注：" prop="remarks" label-width="120px">
                <el-input type="textarea" v-model="formInfo.remarks" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title fp-title">
        发票维护
        <span v-if="ticketsList.length>0" class="fp" @click="handleToFp">修改发票信息<i class="el-icon-arrow-right"></i></span>
      </p>
      <div class="form-row">
        <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="120px" style="position:relative;">
          <el-row>
            <el-col :span="6">
              <el-form-item label="供应商：">
                <span>{{formInfo.supplierName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="position:absolute;top:0px;left:25%;">
              <el-form-item label="附件上传：" prop="purchaseReceiptNumber">
                <div class="fileBox">
                  <div v-for="(item,index) in formInfo.fileUploadDTO" :key="index">
                    <a class="a-class" href="javascript:void(0)" @click="handleUploadeFile(item)">{{item.fileName}}</a>
                    <!-- <i class="el-icon-circle-close closeFile" @click="handleDeleteFile(item)"></i> -->
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="发票号：">
                <div>
                  <div v-for="(item,index) in ticketsList" :key="index">{{item}}</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </Container>
    <Container>
      <p class="form-title">
        物资明细
      </p>
      <el-table :data="tableData" border show-summary :header-cell-style="{background:'#E8EAED'}" :summary-method="getSummaries"
      stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
        <el-table-column label="名称" align="center" prop="materialName"></el-table-column>
        <el-table-column label="物料号" align="center" prop="materialCode" width="180"></el-table-column>
        <el-table-column label="包装" align="center" prop="packetName"></el-table-column>
        <el-table-column label="规格" align="center" prop="materialSpecs">
          <!-- <template v-slot="scope">
            {{scope.row.materialSpecs}}{{scope.row.materialUnit}}
          </template> -->
        </el-table-column>
        <el-table-column label="采购(包装)数量" align="center" prop="orderQuantity"></el-table-column>
        <el-table-column label="采购总数" align="center">
          <template v-slot="scope">
            {{scope.row.orderQuantity?Number(scope.row.orderQuantity)*Number(scope.row.materialSpecs):''}}
          </template>
        </el-table-column>
        <el-table-column label="已入库(包装)数量" align="center" prop="requestQuantity"></el-table-column>
        <el-table-column label="入库总数" align="center">
          <template v-slot="scope">
            {{scope.row.requestQuantity?Number(scope.row.requestQuantity)*Number(scope.row.materialSpecs):''}}
          </template>
        </el-table-column>

        <el-table-column label="单价(元)" align="center" prop="unitPrice"></el-table-column>
        <el-table-column label="金额(元)" align="center" prop="amount">
        </el-table-column>
        <el-table-column label="供应商" align="center" prop="supplierName"></el-table-column>
        <el-table-column label="资金来源" align="center" prop="source"></el-table-column>
      </el-table>
    </Container>
  </ContainerGroup>
</template>
<script>
  import baseInfo from './../../../config/config'
  import {
    getDetail,
    updateItem,
    downloadPDF
  } from './../../../apis/purchaseReceipt'
  import {
    detailByPurchaseOrderNumber
  } from './../../../apis/purchaseInvoice'
  export default {
    name: 'setting',
    data() {
      return {
        ticketsList: [],
        order1: '',
        currentIndex: 1,
        formInfo: {
          postDate: null,
        },
        rules: {
          postDate: [{
            required: true,
            message: '请选择日期',
            tirgger: 'blur'
          }]
        },
        tableData: [],
        mainId: '',
        status: ''
      }
    },
    created() {
      const {
        id,
        status
      } = this.$route.query
      this.mainId = id
      this.status = status
      this._getDetail()

    },
    mounted() {
      this.getInvoiceInfo(this.$route.query.orderNum)
    },
    methods: {
      // this.ticketsList = this.formInfo.invoiceNumber.split(';')
      //       let enclosureNameList = this.formInfo.enclosureName.split(';')
      //       let enclosurePathList = this.formInfo.enclosurePath.split(';')
      //       enclosureNameList.forEach((item, index) => {
      //         this.fileList.push({
      //           name: item,
      //           url: enclosurePathList[index]
      //         })
      //       })
      getInvoiceInfo(id) { //根据订单号获取发票信息
        detailByPurchaseOrderNumber(id).then(res => {
          if (res.data.code === 200) {
            let result = res.data.data
            let uploadUrlArr = result.enclosurePath && result.enclosurePath.split(';')
            let uploadUrlArrnew = []
            uploadUrlArr.forEach(ele => {
              if (ele) {
                uploadUrlArrnew.push({
                  fileUrl: ele,
                  fileName: ele.substr(ele.lastIndexOf('/') + 1)
                })
              }

            })
            this.ticketsList = result.invoiceNumber && result.invoiceNumber.split(';')
            setTimeout(() => {
              this.formInfo.supplierName = result.supplierName
              this.formInfo.fileUploadDTO = uploadUrlArrnew
            }, 10)

          }
        })
      },
      handleToFp() { //跳转到采购发票维护页面
        this.$router.push({
          path: '/purchaseInvoice/setting',
          query: {
            id: this.mainId,
            orderNum: this.$route.query.orderNum
          }
        })
      },
      // handleDeleteFile(value) { //删除文件
      //   let index = this.ruleForm.fileUploadDTO.indexOf(value)
      //   if (index !== -1) {
      //     this.ruleForm.fileUploadDTO.splice(index, 1)
      //   }
      // },
      handleUploadeFile(value) {
        // DownLoadFile(value.fileUrl).then(res => {
        //   if (res.status === 200) {
        //     let result = res.config
        //     window.location.href = result.baseURL + result.url
        //   }
        // })
      },
      _getDetail() {
        let params = {
          purchaseReceiptId: this.mainId
        }
        getDetail(params).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.receiptMaterielList
            this.formInfo = JSON.parse(JSON.stringify(res.data.data))
            delete this.formInfo.receiptMaterielList
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _printTicket() {
        let params = {
          purchaseReceiptId: this.mainId
        }
        downloadPDF(params).then(res => {
          if (res.data.code === 200) {
            if (res.data.data) {
              var pdf_src = baseInfo.DOWNLOAD_URL + res.data.data
              window.open(`${baseInfo.PREVIEW_URL}?url=` + encodeURIComponent(pdf_src));
            } else {
              this.$message.warning('data 返回空数据')
            }
          }
        })
      },
      _saveHandle() {
        this.$refs.formInfo.validate(valid => {
          if (valid) {
            const {
              postDate,
              id
            } = this.formInfo
            let params = {
              postDate: this.$moment(postDate).format('YYYY-MM-DD'),
              id: id,
              status: 2
            }
            updateItem(params).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message)
                this.$router.push('/purchaseReceipt')
              } else {
                this.$message.error(res.data.message)
              }
            })

          } else {
            // this.$message.error(JSON.stringify(valid))
          }
        })
      },
      _backHandle() {
        this.$router.push('/purchaseReceipt')
      },

      // 合计总价
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index === 10) {
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
          }
        });

        return sums;
      },
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

  .fp-title {
    .fp {
      float: right;
      color: rgb(29, 147, 168);
      margin-right: 20px;
      cursor: pointer;
    }
  }

  .a-class {
    color: rgb(29, 147, 168);
  }

  .fileBox:hover .closeFile {
    display: inline-block;
    cursor: pointer;

  }

  .closeFile {
    position: relative;
    left: 10px;
    top: 2px;
    display: none;
  }

  .fileBox:hover .closeFile {
    display: inline-block;
    cursor: pointer;

  }

  .wrapper {
    .wrapper-form {
      background: #fff;
      height: 45px;
      padding: 10px 15px;
      margin-bottom: 15px;
    }

    .wrapper-table {
      background: #fff;
      box-sizing: border-box;
      height: calc(100vh - 230px);
      overflow-y: auto;
      padding: 10px 15px;

      .wrapper-top {
        height: 45px;
        padding: 10px 15px;
        margin-bottom: 15px;
        line-height: 45px;
        text-align: right;
        display: flex;
        justify-content: space-between;
      }

      .form-box {
        border: 1px solid #e5e5e5;

        .form-title {
          border-bottom: 1px solid #e5e5e5;
          line-height: 60px;
          padding-left: 30px;
          font-family: Source Han Sans CN Regular,
            Source Han Sans CN Regular-Regular;
          font-weight: bold;
          text-align: left;
          color: #333333;
        }

        .form-row {
          padding: 15px 30px;
        }
      }

      .table-box {
        border-bottom: 1px solid #e5e5e5;
        border-top: none;
      }

      .table-content {
        padding: 10px 20px;
        // height: 35vh;
        overflow: scroll;
      }
    }
  }
</style>