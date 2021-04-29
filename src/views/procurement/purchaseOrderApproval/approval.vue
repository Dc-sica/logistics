<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-button type="primary"
        @click="handleApproval">确定</el-button>
      <el-button type="default"
        @click="_backHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
        审批信息
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" ref="formInfo" :rules="rules">
            <el-col :span="6">
              <el-form-item label="审批人：" prop="applicantName" label-width="115px">
                <el-input v-model="formInfo.applicantName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批意见：" prop="approvalComments" label-width="115px">
                <el-input type="textarea" v-model="formInfo.approvalComments" placeholder="请输入审批意见,不超过300字" maxlength="300"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">
        采购订单
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" ref="formInfo" :rules="rules">
            <el-col :span="6">
              <el-form-item label="采购申请单号：" prop="purchaseRequestNumber" label-width="115px">
                <el-input v-model="formInfo.purchaseRequestNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采购订单号：" prop="purchaseOrderNumber" label-width="115px">
                <el-input v-model="formInfo.purchaseOrderNumber" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请部门：" prop="applyDepartmentName" label-width="115px">
                <el-input v-model="formInfo.applyDepartmentName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录单日期：" prop="inputDate" label-width="115px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInfo.inputDate" disabled style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人：" prop="applicantName" label-width="115px">
                <el-input v-model="formInfo.applicantName" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货仓库：" prop="warehouseCode" label-width="115px">
                <el-select v-model="formInfo.warehouseCode" disabled>
                  <el-option v-for="item in warehouseList" :key="item.id" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额：" prop="amount" label-width="115px">
                <el-input v-model="formInfo.amount" disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单状态：" prop="amount" label-width="115px">
                <el-input :value="status==='1'?'未审批':status==='2'?'已审批':status==='3'?'已驳回':status==='4'?'已撤回':''" disabled>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" prop="remarks" label-width="115px">
                <el-input type="textarea" v-model="formInfo.remarks" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">
        物资明细
      </p>
      <el-table :data="tableData" v-if="currentIndex===1" border show-summary :header-cell-style="{background:'#E8EAED'}" 
      :summary-method="getSummaries" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
        <el-table-column label="名称" align="center" prop="materialName"></el-table-column>
        <el-table-column label="物料号" align="center" prop="materialCode" width="180"></el-table-column>
        <el-table-column label="包装" align="center" prop="packetName"></el-table-column>
        <el-table-column label="规格" align="center">
          <template v-slot="scope">
            {{scope.row.materialSpecs}}{{scope.row.materialUnit}}
          </template>
        </el-table-column>
        <el-table-column label="申请(包装)数量" align="center" prop="requestQuantity"></el-table-column>
        <el-table-column label="申请总数" align="center">
          <template v-slot="scope">
            {{scope.row.requestQuantity?Number(scope.row.requestQuantity)*Number(scope.row.materialSpecs):''}}
          </template>
        </el-table-column>
        <el-table-column label="采购(包装)数量" align="center" prop="orderQuantity"></el-table-column>
        <el-table-column label="采购总数" align="center">
          <template v-slot="scope">
            {{scope.row.orderQuantity?Number(scope.row.orderQuantity)*Number(scope.row.materialSpecs):''}}
          </template>
        </el-table-column>
        <el-table-column label="单价(元)" align="center" prop="unitPrice"></el-table-column>
        <el-table-column label="金额(元)" align="center" prop="amount">
        </el-table-column>
        <el-table-column label="供应商" align="center" prop="supplierName"></el-table-column>
        <el-table-column label="资金来源" align="center" prop="source"></el-table-column>
      </el-table>
      <div v-if="currentIndex ===2">
        <div>
          <el-steps :active="processData.length+1" simple>
            <el-step title="采购申请"></el-step>
            <el-step title="采购申请审批"></el-step>
            <el-step title="采购订单审批"></el-step>
          </el-steps>
        </div>
        <div class="">
          <div style="padding: 10px 30px;height:35px;margin-bottom:10px;border-bottom:1px solid #e5e5e5;" v-for="(item,index) in processData" :key="index">
            <el-col :span="12">
              <span>{{index === 0?'申请人：':'审批人：'}}</span>
              <span>{{index===0?item.applicantName:item.approvalName}}</span>
            </el-col>
            <el-col :span="12">
              <span>{{index === 0?'申请日期：':'审批日期：'}}</span>
              <span>{{index === 0?item.applicantDate:item.approvalDate}}</span>
            </el-col>
            <el-col :span="12" v-if="index!==0">
              <span>审批意见：</span>
              <span>{{item.comments}}</span>
            </el-col>
            <el-col :span="12" v-if="index!==0">
              <span>审批结果：</span>
              <span>{{item.status===1?'审批中':item.status===2?'审批通过':item.status===3?'审批不通过':''}}</span>
            </el-col>
          </div>
        </div>
      </div>
    </Container>
    
    <!-- 驳回 -->
    <Dialog
      title="采购退货审批驳回"
      :visible="backVisible"
      @cancel="_itemHandleClose"
      @save="save"
      :footerBtns="[
        {
          text: '保存',
          type: 'primary',
          trigger: 'save',
        },

        {
          text: '取消',
          type: 'primary',
          trigger: 'cancel',
        }
      ]"
    >
    <div>
      <p><span style='color:red;'>*</span> 审批意见：</p>
      <el-input type="textarea"
        placeholder="请输入最多200个字符"
        :maxlength="200"></el-input>
    </div>
    </Dialog>
  </ContainerGroup>
</template>
<script>
  import {
    getWarehouseList,
    geSupplierList,
    approvalList
  } from './../../../apis/commonApi'
  import {
    getInfoById,
    approvalItem
  } from './../../../apis/purchaseOrder/index'
  export default {
    name: 'detail',
    data() {
      return {
        formInfo: {
          inputDate: null,
          applicantName: '',
          approvalComments: ''
        },
        rules: {
          inputDate: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          warehouseCode: [{
            required: true,
            message: '请选择仓库',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: '请选择金额',
            trigger: 'blur'
          }],
          applicantName: [{
            required: true,
            message: '请输入审批人',
            trigger: 'blur'
          }],
          approvalComments: [{
            required: true,
            message: '请输入审批意见',
            trigger: 'blur'
          }],
        },
        currentIndex: 1,
        backVisible: false,
        tableData: [{
          order1: '1',
        }, ],
        mainId: '',
        warehouseList: [],
        supplierList: [],
        status: '',
        processData: []
      }
    },
    created() {
      const {
        id,
        status
      } = this.$route.query
      this.mainId = id
      this.status = status
      this._getInfo()
      this._getWarehouseList()
      this._geSupplierList()
    },
    methods: {
      handleApproval() {
        if (!this.formInfo.applicantName) {
          this.$message.warning('审批人不能为空')
          return false
        }
        if (!this.formInfo.approvalComments) {
          this.$message.warning('请填写审批意见')
          return false
        }
        let params = {
          id: this.$route.query.id,
          approvalStatus: 2,
          approvalComments:this.formInfo.approvalComments
        }
        approvalItem(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.$router.push('/purchaseOrderApproval')
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _geSupplierList() {
        geSupplierList().then(res => {
          if (res.data.code === 200) {
            this.supplierList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getWarehouseList() {
        getWarehouseList().then(res => {
          if (res.data.code === 200) {
            this.warehouseList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getInfo() {
        let params = {
          purchaseOrderId: this.mainId
        }
        getInfoById(params).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.orderMaterielList
            this.formInfo = JSON.parse(JSON.stringify(res.data.data))
            delete this.formInfo.orderMaterielList
          }
        })
      },
      _backHandle() {
        this.$router.push('/purchaseOrderApproval')
      },
      _quanlityOrPriceChange(row, index) {
        let tempArr = JSON.parse(JSON.stringify(this.tableData))
        tempArr[index]['amount'] = row.orderQuantity * row.unitPrice
        this.tableData = JSON.parse(JSON.stringify(tempArr))
      },

      _itemHandleClose() {
        this.backVisible = false
      },
      _detailHandle() {
        this.currentIndex = 1
      },
      _processHandle() {
        this.currentIndex = 2
        this._getApprovalList()

      },
      _getApprovalList() {
        let params = {
          orderId: this.formInfo.purchaseOrderNumber
        }
        approvalList(params).then(res => {
          if (res.data.code === 200) {
            this.processData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
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
</style>
