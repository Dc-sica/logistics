<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-12 11:45:48
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-07 11:45:41
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseReturns/detail.vue
-->


<template>
  <ContainerGroup id="containerGroup">
    <Container>
        <el-button type="default"
          @click="_backHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
        采购退货
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo"
            ref="formInfo"
            :rules="rules">
            <el-col :span="6">
              <el-form-item label="采购收货单号："
                prop="purchaseReceiptNumber"
                label-width="110px">
                <el-input v-model="formInfo.purchaseReceiptNumber"
                  placeholder="请输入"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="仓库："
                prop="warehouseCode"
                label-width="110px">
                <el-select v-model="formInfo.warehouseCode"
                  placeholder="请选择"
                  disabled>
                  <el-option v-for="item in warehouseList"
                    :key="item.warehouseId"
                    :value="item.code"
                    :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请部门："
                prop="applyDepartmentCode"
                label-width="110px">
                <el-input v-model="formInfo.applyDepartmentCode"
                  placeholder="请输入"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录单日期："
                prop="inputDate"
                label-width="110px">
                <el-date-picker type="date"
                  placeholder="选择日期"
                  disabled
                  v-model="formInfo.inputDate"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人："
                prop="applicantName"
                label-width="110px">
                <el-input v-model="formInfo.applicantName"
                  placeholder="请输入"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额："
                prop="amount"
                label-width="110px">
                <el-input v-model="formInfo.amount"
                  disabled
                  :min="0"
                  type="number"
                  placeholder="请输入金额">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注："
                label-width="110px"
                prop="remarks">
                <el-input type="textarea"
                  disabled
                  placeholder="请输入"
                  :maxlength="200"
                  show-word-limit
                  v-model="formInfo.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">
        <el-button-group>
          <el-button :type="currentIndex===1?'primary':'default'"
            @click="_detailHandle">物资明细</el-button>
          <el-button :type="currentIndex===2?'primary':'default'"
            @click='_processHandle'>业务流程</el-button>
        </el-button-group>
      </p>
      <el-table :data="tableData"
        v-if="currentIndex===1"
        border
        show-summary
        :header-cell-style="{background:'#E8EAED'}"
        :summary-method="getSummaries"
        stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="序号"
          align="center"
          type="index"></el-table-column>
        <el-table-column label="名称"
          align="center"
          prop="materialName"></el-table-column>
        <el-table-column label="物料号"
          align="center"
          prop="materialCode"></el-table-column>
        <el-table-column label="单位"
          align="center"
          prop="materialUnit"></el-table-column>
        <el-table-column label="收货数量"
          align="center"
          prop=""></el-table-column>
        <el-table-column label="退货数量"
          align="center"
          prop="quantity">
          <template slot-scope="scope">
            <el-input v-model="scope.row.quantity"
              type="number"
              :min='0'
              @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单价(元)"
          align="center"
          prop="unitPrice">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unitPrice"
              type="number"
              :min='0'
              @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="金额(元)"
          align="center"
          prop="amount"></el-table-column>
        <el-table-column label="供应商"
          align="center"
          prop="supplierName"></el-table-column>
        <el-table-column label="交货日期"
          align="center"
          prop="deliveryDate"></el-table-column>
        <el-table-column label="资金来源"
          align="center"
          prop="source"></el-table-column>
      </el-table>
      <div v-if="currentIndex ===2">
        <div>
          <el-steps :active="processData.lenght+1"
            simple>
            <el-step title="采购申请"></el-step>
            <el-step title="采购申请审批"></el-step>
            <el-step title="采购订单审批"></el-step>
          </el-steps>
        </div>
        <div class="">
          <div
            style="padding: 10px 30px;height:35px;margin-bottom:10px;border-bottom:1px solid #e5e5e5;"
            v-for="(item,index) in processData"
            :key="index">
            <el-col :span="12">
              <span>{{index === 0?'申请人：':'审批人：'}}</span>
              <span>{{index===0?item.applicantName:item.approvalName}}</span>
            </el-col>
            <el-col :span="12">
              <span>{{index === 0?'申请日期：':'审批日期：'}}</span>
              <span>{{index === 0?item.applicantDate:item.approvalDate}}</span>
            </el-col>
            <el-col :span="12"
              v-if="index!==0">
              <span>审批意见：</span>
              <span>{{item.comments}}</span>
            </el-col>
            <el-col :span="12"
              v-if="index!==0">
              <span>审批结果：</span>
              <span>{{item.status===1?'审批中':item.status===2?'审批通过':item.status===3?'审批不通过':''}}</span>
            </el-col>
          </div>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import { getWarehouseList, approvalList } from './../../../apis/commonApi'
import { getInfo, addReturnItem } from './../../../apis/purchaseReturns'
export default {
  name: 'setting',
  data () {
    return {
      formInfo: {
        inputDate: null
      },
      rules: {},
      currentIndex: 1,
      tableData: [],
      type: '', //edit/ add
      mainId: '',
      warehouseList: [],
      processData: []
    }
  },
  created () {
    const { type, id } = this.$route.query
    this.type = type
    this.mainId = id
    this._getWarehouseList()
    this._getInfo()
  },
  methods: {
    _getWarehouseList () {
      getWarehouseList().then(res => {
        if (res.data.code === 200) {
          this.warehouseList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _getInfo () {
      let params = {
        purchaseReturnId: this.mainId
      }
      getInfo(params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.returnMaterielList
          this.formInfo = JSON.parse(JSON.stringify(res.data.data))
          delete this.formInfo.returnMaterielList
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _saveHandle () {
      this.$refs.formInfo.validate(valid => {
        if (valid) {
          const { inputDate } = this.formInfo
          this.formInfo.inputDate = this.$moment(inputDate).format('YYYY-MM-DD')
          let params = {
            ...this.formInfo,
            id: this.mainId
          }
          addReturnItem(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          // this.$message.error(JSON.stringify(valid))
        }
      })
    },
    _backHandle () {
      this.$router.push('/purchaseReturns')
    },
    _deleteHandle (row) {

    },
    _detailHandle () {
      this.currentIndex = 1
    },
    _processHandle () {
      this.currentIndex = 2
      this._getApprovalList()
    },
    _getApprovalList () {
      let params = {
        orderId: this.formInfo.purchaseReturnNumber
      }
      approvalList(params).then(res => {
        if (res.data.code === 200) {
          this.processData = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _quanlityOrPriceChange (row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData))
      tempArr[index]['amount'] = row.quantity * row.unitPrice
      this.tableData = JSON.parse(JSON.stringify(tempArr))
    },
    // 合计总价
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (index === 7) {
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