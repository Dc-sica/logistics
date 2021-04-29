<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-12 11:45:48
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 14:13:58
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseReturns/add.vue
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
        采购退货
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" ref="formInfo" :rules="rules">
            <el-col :span="6">
              <el-form-item label="采购收货单号：" prop="purchaseReceiptNumber" label-width="110px">
                <el-input v-model="formInfo.purchaseReceiptNumber" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="仓库：" prop="warehouseCode" label-width="110px">
                <el-select v-model="formInfo.warehouseCode" placeholder="请选择" disabled>
                  <el-option v-for="item in warehouseList" :key="item.warehouseId" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请部门：" prop="applyDepartmentCode" label-width="110px">
                <el-input v-model="formInfo.applyDepartmentCode" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录单日期：" prop="inputDate" label-width="110px">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInfo.inputDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人：" prop="applicantName" label-width="110px">
                <el-input v-model="formInfo.applicantName" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额：" prop="amount" label-width="110px">
                <el-input v-model="formInfo.amount" :min="0" type="number" placeholder="请输入金额">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" label-width="110px" prop="remarks">
                <el-input type="textarea" placeholder="请输入" :maxlength="200" show-word-limit v-model="formInfo.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">
        <el-button-group>
          <el-button :type="currentIndex===1?'primary':'default'" @click="_detailHandle">物资明细</el-button>
          <el-button :type="currentIndex===2?'primary':'default'" @click='_processHandle'>业务流程</el-button>
        </el-button-group>
      </p>
      <el-table :data="tableData" v-if="currentIndex===1" border show-summary :header-cell-style="{background:'#E8EAED'}" 
      :summary-method="getSummaries" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="序号" align="center" type="index"></el-table-column>
        <el-table-column label="名称" align="center" prop="materialName"></el-table-column>
        <el-table-column label="物料号" align="center" prop="materialCode"></el-table-column>
        <el-table-column label="单位" align="center" prop="materialUnit"></el-table-column>
        <el-table-column label="收货数量" align="center" prop="storageQuantity"></el-table-column>
        <el-table-column label="采购数量" align="center" prop="orderQuantity"></el-table-column>
        <el-table-column label="退货数量" align="center" width="180px" prop="quantity">
          <template slot-scope="scope">
            <el-form :model="scope.row" :rules='rules'>
              <el-form-item prop="quantity" class="form-time">
                <el-input v-model="scope.row.quantity" :min="0" type="number" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="单价(元)" align="center" width="180px" prop="unitPrice">
          <template slot-scope="scope">
            <el-form :model="scope.row" :rules='rules'>
              <el-form-item prop="unitPrice" class="form-time">
                <el-input v-model="scope.row.unitPrice" :min="0" type="number" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="金额(元)" align="center" prop="amount"></el-table-column>
        <el-table-column label="供应商" align="center" prop="supplierName"></el-table-column>
        <el-table-column label="交货日期" align="center" prop="deliveryDate"></el-table-column>
        <el-table-column label="资金来源" align="center" prop="source"></el-table-column>
        <el-table-column label="删除" align="center" prop="">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="text" @click="_delItem(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="currentIndex ===2">
        <div>
          <el-steps :active="2" simple>
            <el-step title="采购申请" @click="_processItemHandle(1)"></el-step>
            <el-step title="采购申请审批" @click="_processItemHandle(2)"></el-step>
            <el-step title="采购订单审批" @click="_processItemHandle(3)"></el-step>
          </el-steps>
        </div>
        <div class="">
          <div style="padding: 10px 30px;margin-bottom:10px">
            <el-col :span="12">
              <span>审批人：</span>
              <span>是是非得失</span>
            </el-col>
            <el-col :span="12">
              <span>审批人：</span>
              <span>是是非得失</span>
            </el-col>
          </div>
          <div style="padding: 10px 30px;margin-bottom:10px">
            <el-col :span="12">
              <span>审批人：</span>
              <span>是是非得失</span>
            </el-col>
            <el-col :span="12">
              <span>审批人：</span>
              <span>是是非得失</span>
            </el-col>
          </div>

        </div>
      </div>
    </Container>
  </ContainerGroup>
  
</template>
<script>
  import {
    getWarehouseList
  } from './../../../apis/commonApi'
  import {
    getReceiptDetail,
    addReturnItem
  } from './../../../apis/purchaseReturns'
  export default {
    name: 'return',
    data() {
      return {
        formInfo: {},
        rules: {
          inputDate: [{
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          }],
          quantity: [{
              required: true,
              message: '请输入数量',
            },
            {
              pattern: /^\+?[0-9]\d*$/,
              message: '请输入整数',
              tirgger: "blur"
            }
          ],
          unitPrice: [{
              required: true,
              message: '请输入金额',
            },
            {
              pattern: /^(\d+(.\d{1,2})?)$/,
              message: '请输入整数,最多两位小数点',
              tirgger: "blur"
            }
          ],
        },
        currentIndex: 1,
        tableData: [],
        mainId: '',
        purchaseOrderNumber: '', //采购单号
        warehouseList: [],
      }
    },
    created() {
      const {
        id,
        purchaseOrderNumber
      } = this.$route.query
      this.mainId = id
      this.purchaseOrderNumber = purchaseOrderNumber
      this._getWarehouseList()
      this._getInfo()
    },
    methods: {
      _backHandle() {
        this.$router.push('/purchaseReceipt')
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
          purchaseReceiptId: this.mainId
        }
        getReceiptDetail(params).then(res => {
          if (res.data.code === 200) {
            res.data.data.receiptMaterielList.forEach(item => {
              item.quantity = 0
              item.unitPrice = 0
            })
            this.tableData = res.data.data.receiptMaterielList
            this.formInfo = JSON.parse(JSON.stringify(res.data.data))
            this.formInfo.inputDate = this.$moment(new Date()).format('YYYY-MM-DD')
            delete this.formInfo.receiptMaterielList
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _saveHandle() {
        this.$refs.formInfo.validate(valid => {
          if (valid) {
            let flag = this.tableData.filter(item => {
              if (item.quantity === '' || item.quantity < 0) {
                this.$message.warning('请输入大于0的数量')
                return item
              }
              if (item.unitPrice === '' || item.unitPrice < 0) {
                this.$message.warning('请输入大于0的单价')
                return item
              }
              /*    if (item.supplierCode === '' || item.unitPrice === undefined || item.unitPrice === null) {
                   this.$message.warning('请选择供应商')
                   return item
                 } */
            })
            if (flag.length > 0) {
              return false
            }
            let tempArry = JSON.parse(JSON.stringify(this.tableData))
            tempArry.forEach(item => {
              item.receivedQuantity = item.storageQuantity
              delete item.id
            })
            let params = {
              ...this.formInfo,
              inputDate: this.$moment(this.formInfo.inputDate).format('YYYY-MM-DD'),
              returnMaterielList: tempArry,
              status: 1
            }
            delete params.id
            delete params.createTime
            delete params.updateTime
            addReturnItem(params).then(res => {
              if (res.data.code === 200) {
                this.$router.push('/purchaseReceipt')
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
      _detailHandle() {
        this.currentIndex = 1
      },
      _processHandle() {
        this.currentIndex = 2
      },
      _processItemHandle(type) {

      },
      _quanlityOrPriceChange(row, index) {
        let tempArr = JSON.parse(JSON.stringify(this.tableData))
        tempArr[index]['amount'] = (row.quantity * row.unitPrice).toFixed(2)
        this.tableData = JSON.parse(JSON.stringify(tempArr))
      },

      _delItem(row) {
        let arr = this.tableData.filter(item => {
          console.log('item.id', item.id)
          if (item.id != row.id) {
            return item
          }
        })
        this.tableData = JSON.parse(JSON.stringify(arr))
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
          if (index === 8) {
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr).toFixed(2);
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
  
</style>