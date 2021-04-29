<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-12 09:51:45
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-07 13:49:47
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseReceipt/add.vue
-->
<template>
  
  <ContainerGroup id="containerGroup">
    <Container>
      <el-button
        @click="_backHandle">取消</el-button>
      <el-button type="primary"
        @click="_saveHandle">提交</el-button>
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
            <!-- <el-col :span="6">
              <el-form-item label="采购收货单号：" prop="purchaseReceiptNumber" label-width="120px">
                <el-input v-model="formInfo.purchaseReceiptNumber" disabled></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="申请部门：" prop="applyDepartmentCode" label-width="120px">
                <el-select placeholder="请选择" clearable v-model="formInfo.applyDepartmentCode" disabled>
                  <el-option v-for="(item,index) in deptList" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人：" prop="applicantName" label-width="120px">
                <el-input v-model="formInfo.applicantName" disabled></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="录单日期：" prop="receivingDate" label-width="120px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInfo.receivingDate" disabled style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="收货仓库：" prop="warehouseCode" label-width="120px">
                <el-select placeholder="请选择" v-model="formInfo.warehouseCode" clearable disabled>
                  <el-option v-for="item in warehouseList" :key="item.warehouseId" :value="item.code" :label="item.name"></el-option>
                </el-select>
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
            <!-- <el-col :span="6">
              <el-form-item label="状态：" prop="status" label-width="120px">
                <el-input :value="formInfo.status===1?'未过账':formInfo.status===2?'已过账':''" disabled></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item label="备注：" prop="remarks" label-width="120px">
                <el-input type="textarea" v-model="formInfo.remarks" maxlength="300" placeholder="请输入描述，不超过300字"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container  v-if="toggleFp==1">
      <p class="form-title fp-title">
          发票维护
      </p>
      <div class="form-row">
        <el-form :model="formInfo" :rules="rules" ref="formInfo" label-width="120px" style="position:relative;">
          <el-row>
            <el-col :span="6">
              <el-form-item label="供应商：" prop="supplierName">
                <el-select placeholder="请选择供应商" clearable v-model="formInfo.supplierCode">
                  <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="发票号：" prop="purchaseOrderNumber">
                <el-checkbox v-model="isInvoiceDo">已维护发票</el-checkbox>
                <el-form v-if="!isInvoiceDo" :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                  <el-form-item prop="invoiceNumber" style="position:relative;margin-bottom:10px;">
                    <el-input v-model="dynamicValidateForm.invoiceNumber"></el-input><span @click="addDomain" class="el-icon-circle-plus-outline"></span>
                  </el-form-item>
                  <el-form-item style="position:relative;margin-bottom:10px;" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key" :prop="'domains.' + index + '.invoiceNumber'">
                    <el-input v-model="domain.invoiceNumber" style="position:relative;"></el-input><span @click.prevent="removeDomain(domain)" class="el-icon-remove-outline"></span>
                  </el-form-item>
                </el-form>
                <el-select v-else placeholder="请选择发票" v-model="formInfo.fph">
                  <el-option v-for="(item,index) in ticketsList" :key="index" :value="item" :label="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="附件上传：" prop="purchaseReceiptNumber" style="position:absolute;top:0px;left:30%;">
            <!-- <el-upload style="display:inline-block;" :file-list="formInfo.fileUploadDTO" :show-file-list="false" :on-change="handlechange" class="upload-demo uploadFileOther" action ref="upload" :auto-upload="false">
                  <el-button style="margin-left: 10px;" size="small" icon="el-icon-upload2" type="success">上传</el-button>
                </el-upload>
                <div class="fileBox">
                  <div v-for="item in formInfo.fileUploadDTO" :key="item.fileUrl">
                    <a class="a-class" href="javascript:void(0)" @click="handleUploadeFile(item)">{{item.fileName}}</a>
                    <i class="el-icon-circle-close closeFile" @click="handleDeleteFile(item)"></i>
                  </div>
                </div>
                <div style="color: #88888888;">文件格式支持：jpg,png,pdf,gif,tif,bmp</div> -->
            <el-upload class="upload-demo" action="/" :on-remove="handleRemove" :before-remove="beforeRemove" :multiple='false' :http-request='uploadFile' :file-list="fileList">
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </Container>
    <Container>
      <p class="form-title">
          物资明细
      </p>
      <!-- 收货 -->
      <template v-if="toggleFp==1">
        <el-table :data="tableData" border show-summary :header-cell-style="{background:'#E8EAED'}" 
        :summary-method="getSummaries" stripe size="mini" highlight-current-row isFillHeight height="0">
          <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column label="名称" align="center" prop="materialName"></el-table-column>
          <el-table-column label="物料号" align="center" prop="materialCode" width="180"></el-table-column>
          <el-table-column label="包装" align="center" prop="packet"></el-table-column>
          <el-table-column label="规格" align="center" prop="materialSpecs">
            <!-- <template v-slot="scope">
              {{scope.row.materialSpecs}}{{scope.row.materialUnit}}
            </template> -->
          </el-table-column>
          <el-table-column label="采购(包装)数量" align="center" prop="orderQuantity" ></el-table-column>
          <el-table-column label="采购总数" align="center">
            <template v-slot="scope">
              {{scope.row.orderQuantity?Number(scope.row.orderQuantity)*Number(scope.row.materialSpecs):''}}
            </template>
          </el-table-column>
          <el-table-column label="已入库(包装)数量" align="center" prop="storageQuantity"></el-table-column>
          <el-table-column label="入库(包装)数量" align="center" prop="quantity">
            <template slot-scope="scope">
              <el-form :model="scope.row" :rules='rules'>
                <el-form-item prop="quantity" class="form-time">
                  <el-input v-model.trim="scope.row.quantity" type="number" :min="0" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" align="center">
            <template slot-scope="scope">
              <el-form :model="scope.row" :rules='rules'>
                <el-form-item class="form-time">
                  <el-input v-model="scope.row.unitPrice" type="number" :min="0" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="金额(元)" align="center" prop="amount">
          </el-table-column>
          <el-table-column label="供应商" align="center" prop="supplierName"></el-table-column>
          <el-table-column label="资金来源" align="center" prop="source"></el-table-column>
        </el-table>
      </template>
      <!-- 退货 -->
      <template v-else>
        <el-table :data="tableData" border show-summary :header-cell-style="{background:'#E8EAED'}" 
        :summary-method="getSummaries" stripe size="mini" highlight-current-row isFillHeight height="0">
          <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
          <el-table-column label="名称" align="center" prop="materialName"></el-table-column>
          <el-table-column label="物料号" align="center" prop="materialCode" width="180"></el-table-column>
          <el-table-column label="包装" align="center" prop="packetName"></el-table-column>
          <el-table-column label="规格" align="center" prop="materialSpecs">
            <!-- <template v-slot="scope">
              {{scope.row.materialSpecs}}{{scope.row.materialUnit}}
            </template> -->
          </el-table-column>
          <el-table-column label="收货(包装)数量" align="center" prop="requestQuantity"></el-table-column>
          <el-table-column label="收货总数" align="center">
            <template v-slot="scope">
              {{scope.row.requestQuantity?Number(scope.row.requestQuantity)*Number(scope.row.materialSpecs):''}}
            </template>
          </el-table-column>
          <el-table-column label="退货个数" align="center" prop="orderQuantity">
            <template slot-scope="scope">
              <el-form :model="scope.row" :rules='rules'>
                <el-form-item prop="quantity" class="form-time">
                  <el-input v-model.trim="scope.row.quantity" type="number" :min="1" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" align="center" prop="unitPrice">
            <template slot-scope="scope">
              <el-form :model="scope.row" :rules='rules'>
                <el-form-item prop="price" class="form-time">
                  <el-input v-model="scope.row.price" type="number" :min="1" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="金额(元)" align="center" prop="amount">
          </el-table-column>
          <el-table-column label="交货日期" align="center" prop="amount">
          </el-table-column>
          <el-table-column label="供应商" align="center" prop="supplierName"></el-table-column>
          <el-table-column label="资金来源" align="center" prop="source"></el-table-column>
        </el-table>
      </template>
    </Container>
    
  </ContainerGroup>
</template>
<script>
  import {
    getOrderDetail,
    addReceiptItem,
    getDetail
  } from './../../../apis/purchaseReceipt'
  import {
    upload,
    geSupplierList
  } from './../../../apis/commonApi'
  import {
    detailByPurchaseOrderNumber,
    insertInvoice,
    addorupdateBatch
  } from './../../../apis/purchaseInvoice'
  import {
    updateInitById,
    getInitData
  } from './../../../apis/outAndIn/index'
  import {
    detailByPurchaseOrderId
  } from './../../../apis/purchaseOrder/index'
  export default {
    name: 'setting',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value < 0) {
          callback(new Error('请输入大于0，且最多两位小数的数字'))
        } else {
          callback()
        }
      }
      return {
        deptList: [],
        warehouseList: [],
        supplierList: [],
        ticketsList: [], //发票列表
        fileList: [],
        isInvoiceDo: false,
        dynamicValidateForm: {
          domains: [],
          invoiceNumber: ''
        },
        currentIndex: 1,
        formInfo: {
          receivingDate: null,
        },
        rules: {
          receivingDate: [{
            required: true,
            message: '请选择日期',
            tirgger: 'chang'
          }],
          supplierId: [{
            required: true,
            message: '请选择供应商',
            tirgger: "change"
          }],
          warehouseId: [{
            required: true,
            message: '请选择仓库',
            tirgger: "change"
          }],
          deptId: [{
            required: true,
            message: '请选择部门',
            tirgger: "change"
          }],
          applyTime: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          receiptNo: [{
              required: true,
              message: '请输入发票号',
              tirgger: "blur"
            },
            {
              pattern: /^[0-9]{1,10}$/,
              message: '最多输入十位数字'
            }
          ],
          totalPrice: [{
              required: true,
              message: '请输入合计金额',
              tirgger: "blur"
            },
            {
              pattern: /^(\d+(.\d{1,2})?)$/,
              message: '最多保留两位小数点'
            }
          ],
          quantity: [{
              required: true,
              message: '请输入数量',
              tirgger: "blur"
            },
            {
              validator: validatePass,
              trigger: 'blur'
            },
            {
              pattern: /^((?!0)\d+(.\d{1,2})?)$/,
              message: '请输入正数,最多两位小数点'
            }
          ],
          price: [{
              required: true,
              message: '请输入金额',
              tirgger: "blur"
            },
            {
              validator: validatePass,
              trigger: 'blur'
            },
            {
              pattern: /^((?!0)\d+(.\d{1,2})?)$/,
              message: '请输入正数,最多两位小数点'
            }
          ],
          source: [{
            required: true,
            message: '请选择资金来源',
            tirgger: "change"
          }]
        },
        tableData: [],
        mainId: '',
        status: '',
        toggleFp: 1 //收货 2-退货
      }
    },
    created() {
      const {
        id,
        status,
        type
      } = this.$route.query
      this.mainId = id
      this.status = status
      this.toggleFp = type
      // this._getOrderDetail()
      this.getInvoiceInfo(this.mainId)
      this.getWarehouseList()
      this.geSupplierListData()
      this.getOrderDetail()
    },
    watch: {
      isInvoiceDo(value) {
        if (value) {
          console.log('value', value)
        }
      }
    },
    methods: {
      getWarehouseList() {
        getInitData().then(res => {
          if (res.data.code === 200) {
            this.deptList = res.data.data.deptList
            this.warehouseList = res.data.data.warehouse
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      geSupplierListData() {
        geSupplierList().then(res => {
          if (res.data.code === 200) {

            this.supplierList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getOrderDetail() {
        let params = {
          purchaseOrderNumber: this.mainId
        }
        detailByPurchaseOrderId(params).then(res => {
          if (res.data.code === 200) {
            res.data.data.receiptMaterielList.forEach(item => {
              item.quantity = 0
            })
            this.tableData = res.data.data.receiptMaterielList
            this.formInfo = JSON.parse(JSON.stringify(res.data.data))
            console.log('this.tableData', this.tableData)
            let userInfo = localStorage.getItem('userInfo')
            if (userInfo) {
              const {
                userId,
                name
              } = JSON.parse(localStorage.getItem('userInfo'))
              this.formInfo.consigneeName = name
              this.formInfo.consigneeId = userId
            }
            this.$nextTick(() => {
              this.formInfo.receivingDate = this.$moment().format('YYYY-MM-DD')
            })

            delete this.formInfo.orderMaterielList
          }
        })
      },
      // _getInitData() {
      //   let params = {
      //     id: this.mainId
      //   }
      //   updateInitById(params).then(res => {
      //     if (res.data.code === 200) {
      //       this.supplierList = res.data.data.supplier
      //     } else {
      //       this.$message.error(res.data.message)
      //     }
      //   })
      // },
      // _getDetail() {
      //   let params = {
      //     purchaseReceiptId: this.mainId
      //   }
      //   getDetail(params).then(res => {
      //     if (res.data.code === 200) {
      //       res.data.data.receiptMaterielList.forEach(item => {
      //         item.quantity = 0
      //       })
      //       this.tableData = res.data.data.receiptMaterielList
      //       this.formInfo = JSON.parse(JSON.stringify(res.data.data))
      //       delete this.formInfo.receiptMaterielList
      //     } else {
      //       this.$message.error(res.data.message)
      //     }
      //   })
      // },
      getInvoiceInfo(id) { //根据订单号获取发票信息
        detailByPurchaseOrderNumber(id).then(res => {
          console.log('res', res)
          if (res.data.code === 200) {
            let arr = res.data.data || {}
            this.ticketsList = arr.invoiceNumber.split(";")
          }
        })
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
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
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
      handleDeleteFile(value) { //删除文件
        let index = this.ruleForm.fileUploadDTO.indexOf(value)
        if (index !== -1) {
          this.ruleForm.fileUploadDTO.splice(index, 1)
        }
      },
      handleUploadeFile(value) {
        // DownLoadFile(value.fileUrl).then(res => {
        //   if (res.status === 200) {
        //     let result = res.config
        //     window.location.href = result.baseURL + result.url
        //   }
        // })
      },
      handlechange(file, fileList) {
        let files = file.raw
        let formData = new FormData();
        formData.append("file", files);
        // GetBaseDictById(20).then(res => { //获取文件类型
        //   if (res.data.code === 200) {
        //     let result = res.data.data
        //     let purposeCode = ''
        //     for (let i = 0; i < result.length; i++) {
        //       if (result[i].code === 'ACTIVITY_ATTACHMENT') {
        //         purposeCode = result[i].code
        //       }
        //     }
        //     UploaderFile(formData, purposeCode).then((res) => {
        //       if (res.data.code === 200) {
        //         GetFileMangeById(res.data.data[0]).then(res => {
        //           if (res.data.code === 200) {
        //             let result = res.data.data
        //             let obj = {
        //               fileName: result.fileName,
        //               fileUrl: result.fileUrl,
        //               id: result.id
        //             }
        //             this.ruleForm.fileUploadDTO.push(obj)
        //             this.$message.success('上传成功');
        //           } else {
        //             this.$message.error('获取文件失败');
        //           }
        //         })

        //       } else {
        //         this.$message.error(res.data.message);
        //       }
        //     });
        //   } else {
        //     this.$message.error('获取文件类型失败')
        //   }
        // })

      },
      // _getOrderDetail() {
      //   let params = {
      //     purchaseOrderId: this.mainId
      //   }
      //   getOrderDetail(params).then(res => {
      //     if (res.data.code === 200) {
      //       this.tableData = res.data.data.orderMaterielList
      //       this.formInfo = JSON.parse(JSON.stringify(res.data.data))
      //       this.formInfo.consigneeName = this.formInfo.applicantName
      //       this.formInfo.consigneeId = this.formInfo.applicantId
      //       delete this.formInfo.orderMaterielList
      //     } else {
      //       this.$message.error(res.data.message)
      //     }
      //   })
      //   let userInfo = localStorage.getItem('userInfo')
      //   if (userInfo) {
      //     const {
      //       userId,
      //       name
      //     } = JSON.parse(localStorage.getItem('userInfo'))
      //     this.formInfo.consigneeName = name
      //     this.formInfo.consigneeId = userId
      //   }
      //   this.$nextTick(() => {
      //     this.formInfo.receivingDate = this.$moment().format('YYYY-MM-DD')
      //   })
      // },
      _saveHandle() {
        const {
          receivingDate
        } = this.formInfo
        if (!receivingDate) {
          this.formInfo.receivingDate = ''
        } else {
          this.formInfo.receivingDate = this.$moment(receivingDate).format('YYYY-MM-DD')
        }
        this.$refs.formInfo.validate(valid => {
          if (valid) {
            const {
              receivingDate,
              id
            } = this.formInfo
            if (!receivingDate) {
              this.formInfo.receivingDate = ''
            } else {
              this.formInfo.receivingDate = this.$moment(receivingDate).format('YYYY-MM-DD')
            }
            this.tableData.forEach(item => {
              item.storageQuantity = Number(item.quantity)
            })
            this.formInfo.receiptMaterielList = this.tableData
            //整理发票信息start
            let supName = '';
            if (this.formInfo.supplierCode) {
              this.supplierList.forEach(item => {
                if (item.code == this.formInfo.supplierCode) {
                  supName = item.name
                }
              })
            }
            let param = [{
              enclosureName: "",
              enclosurePath: "",
              id: 0,
              invoiceNumber: this.isInvoiceDo ? (this.formInfo.fph || '') : '',
              purchaseOrderNumber: this.formInfo.purchaseOrderNumber,
              purchaseReceiptNumber: this.formInfo.purchaseReceiptNumber,
              supplierCode: this.formInfo.supplierCode,
              supplierName: supName
            }]
            // console.log('this.fileList', this.fileList)
            if (this.fileList.length > 0) {
              param[0]['enclosureName'] = this.fileList.map(item => {
                return item.name
              }).join(';') || ''
              param[0]['enclosurePath'] = this.fileList.map(item => {
                return item.url
              }).join(';') || ''
            }
            let invoiceNumberArr = this.dynamicValidateForm.invoiceNumber || ''
            if (this.dynamicValidateForm.domains.length > 0) {
              invoiceNumberArr = this.dynamicValidateForm.domains.map(item => {
                return item.invoiceNumber
              }).join(';') + ';' + invoiceNumberArr

            }
            param[0]['invoiceNumber'] = invoiceNumberArr
            //整理发票信息end
            let params = {
              ...this.formInfo,
              purchaseInvoiceList: param
            }
            // console.log('this.formInfo', this.formInfo)
            addReceiptItem(params).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message)
                this.$router.push('/purchaseReceipt')
              } else {
                this.$message.error(res.data.message)
              }
            })
            // let supName = '';
            // if (this.formInfo.supplierCode) {
            //   this.supplierList.forEach(item => {
            //     if (item.code == this.formInfo.supplierCode) {
            //       supName = item.name
            //     }
            //   })
            // }
            // if (this.formInfo.supplierCode || this.fileList.length != 0 || (this.dynamicValidateForm.invoiceNumber || this.dynamicValidateForm.domains.length != 0) || this.formInfo.fph) {
            //   let param = [{
            //     enclosureName: "",
            //     enclosurePath: "",
            //     id: 0,
            //     invoiceNumber: this.isInvoiceDo ? (this.formInfo.fph || '') : '',
            //     purchaseOrderNumber: this.formInfo.purchaseOrderNumber,
            //     purchaseReceiptNumber: this.formInfo.purchaseReceiptNumber,
            //     supplierCode: this.formInfo.supplierCode,
            //     supplierName: supName
            //   }]
            //   if (this.fileList.length > 0) {
            //     param[0]['enclosureName'] = this.fileList.map(item => {
            //       return item.name
            //     }).join(',') || ''
            //     param[0]['enclosurePath'] = this.fileList.map(item => {
            //       return item.url
            //     }).join(',') || ''
            //   }
            //   let invoiceNumberArr = this.dynamicValidateForm.invoiceNumber || ''
            //   if (this.dynamicValidateForm.domains.length > 0) {
            //     invoiceNumberArr = this.dynamicValidateForm.domains.map(item => {
            //       return item.invoiceNumber
            //     }).join(',') + ',' + invoiceNumberArr

            //   }
            //   param[0]['invoiceNumber'] = invoiceNumberArr
            //   console.log('param', param)
            //   addorupdateBatch(param).then(res => { //新增发票
            //     if (res.data.code === 200) {
            //       this.$message.success(res.data.message)
            //     } else {
            //       this.$message.error(res.data.message)
            //     }
            //   })
            // }


          } else {
            this.$message.error(JSON.stringify(valid))
          }
        })
      },
      _backHandle() {
        this.$router.push('/purchaseOrder')
      },
      _quanlityOrPriceChange(row, index) {
        // console.log('row', row)
        let tempArr = JSON.parse(JSON.stringify(this.tableData))
        tempArr[index]['amount'] = Number(row.quantity) * Number(row.unitPrice)
        this.tableData = JSON.parse(JSON.stringify(tempArr))
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
  .form-time{
    margin-bottom: 0px !important;
  }
  .el-icon-circle-plus-outline{
    position: relative;
    right: 20px;
  }
</style>
