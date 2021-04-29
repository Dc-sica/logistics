<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-18 15:54:10
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-05 16:13:36
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseApproval/add.vue
-->
<template>
  
  <ContainerGroup id="containerGroup">
    <Container>
      <el-button type="primary"
        @click="_addOrderHandle">生成采购订单</el-button>
      <el-button type="default"
        @click="_backHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
          采购申请审批
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo"
            :rules="rules"
            ref="formInfo">
            <el-col :span="6">
              <el-form-item label="采购申请单号："
                label-width="120px">
                <el-input v-model="formInfo.purchaseRequestNumber"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录单日期："
                label-width="120px"
                prop="inputDate">
                <el-date-picker type="date"
                  placeholder="选择日期"
                  v-model="formInfo.inputDate"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请部门："
                label-width="120px">
                <el-input v-model="formInfo.applyDepartmentName"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额："
                prop="amount"
                label-width="120px">
                <el-input v-model="formInfo.amount"
                  @input="_amountChange($event)"
                  :min="1"
                  type="number">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人："
                label-width="120px">
                <el-input v-model="formInfo.applicantName"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货仓库："
                label-width="120px"
                prop="warehouseCode">
                <el-select v-model="formInfo.warehouseCode"
                  clearable
                  @change="_storeSelect">
                  <el-option v-for="item in storeList"
                    :key="item.warehouseId"
                    :value="item.code"
                    :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注："
                label-width="120px">
                <el-input type="textarea"
                  v-model="formInfo.remarks"></el-input>
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
      <el-table :data="tableData"
        border
        show-summary
        :summary-method="getSummaries"
        :header-cell-style="{background:'#E8EAED'}"
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
        <el-table-column label="已采购数量"
          align="center"
          prop="purchasedQuantity"></el-table-column>
        <el-table-column label="申请数量"
          align="center"
          prop="requestQuantity"></el-table-column>
        <el-table-column label="采购数量"
          align="center"
          width="150px"
          prop=""
          >
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="orderQuantity" class="form-time">
                <el-input v-model.trim="scope.row.orderQuantity"
                  type="number"
                  :min="1"
                  @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="单价(元)"
          align="center"
          prop="unitPrice"
          width="190px"
          >
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="unitPrice" class="form-time">
                <el-input v-model="scope.row.unitPrice"
                  type="number"
                  :min="1"
                  @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="金额(元)"
          align="center"
          prop="amount">
        </el-table-column>
        <el-table-column label="供应商"
          align="center"
          prop="supplierCode"
          width="160px">
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="supplierCode" class="form-time">
                <el-select v-model="scope.row.supplierCode"
                  clearable
                  @change="_supplierChange(scope.row,scope.$index)">
                  <el-option v-for="item in supplierList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-form>

          </template>
        </el-table-column>
        <el-table-column label="资金来源"
          align="center"
          prop="source"
          width="150px">
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="source" class="form-time">
                <el-select v-model="scope.row.source"
                  clearable
                  @change="_sourceChange(scope.row,scope.$index)">
                  <el-option v-for="(item,index) in sourceList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          align="center"
          prop=""
          width="80">
          <template slot-scope="scope">
            <el-tooltip class="item"
              effect="dark"
              content="删除"
              placement="top">
              <el-popconfirm :title="`确定要删除 ${scope.row.materialName} 吗?`"
                @confirm="_delItemHandle(scope.row,scope.$index)">
                <el-button type="text"
                  slot="reference">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </Container>
  </ContainerGroup>
</template>
<script>
import { getWarehouseList, geSupplierList, dictByCategoryId } from './../../../apis/commonApi'
import {
  getItemDetail,
  addOrderItem,
} from './../../../apis/purchaseApproval/index'
export default {
  name: 'add',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('请输入大于0，且最多两位小数的数字'))
      } else {
        callback()
      }
    }
    return {
      mainId: '',
      formInline: {},
      formInfo: {
        amount: 0,
        inputDate: null,
      },
      rules: {
        inputDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        warehouseCode: [{ required: true, message: '请输入仓库', trigger: 'change' }],
        orderQuantity: [
          { required: true, message: '请输入数量', tirgger: "blur" },
          { pattern: /^\+?[1-9]\d*$/, message: '请输入正整数' }
        ],
        unitPrice: [
          { required: true, message: '请输入金额', tirgger: "blur" },
          { validator: validatePass, trigger: 'blur' },
          { pattern: /^((?!0)\d+(.\d{1,2})?)$/, message: '请输入正数,最多两位小数点' }
        ],
        supplierCode: [{ required: true, message: '请选择供应商', tirgger: "change" }],
        source: [{ required: true, message: '请选择资金来源', tirgger: "change" }]
      },
      tableData: [],
      storeList: [],
      supplierList: [],
      sourceList: []
    }
  },
  created () {
    const { id, status } = this.$route.query
    this.mainId = id
    this.status = status
    this._getData()
    this._getWarehouseList()
    this._geSupplierList()
    this._dictByCategoryId()
  },
  methods: {
    _dictByCategoryId () {
      let params = {
        categoryCode: 'source',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.sourceList = res.data.data && res.data.data.sysDictList
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _geSupplierList () {
      geSupplierList().then(res => {
        if (res.data.code === 200) {
          this.supplierList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _getWarehouseList () {
      getWarehouseList().then(res => {
        if (res.data.code === 200) {
          this.storeList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _backHandle () {
      this.$router.push('/purchaseApproval')
    },
    _addOrderHandle () {
      const { inputDate } = this.formInfo
      if (inputDate === '' || inputDate === null || inputDate === undefined) {
        this.$message.warning('请选择录单日期')
        return false
      } else {
        this.formInfo.inputDate = this.$moment(inputDate).format('YYYY-MM-DD')
      }
      this.$refs.formInfo.validate(valid => {
        if (valid) {

          let flag = this.tableData.filter(item => {
            if (item.orderQuantity === '' || item.orderQuantity <= 0) {
              this.$message.warning('请输入大于0的数量')
              return item
            }
            if (item.unitPrice === '' || item.unitPrice <= 0) {
              this.$message.warning('请输入大于0的单价')
              return item
            }
            if (item.supplierCode === '' || item.unitPrice === undefined || item.unitPrice === null) {
              this.$message.warning('请选择供应商')
              return item
            }
          })
          if (flag.length > 0) {
            return false
          }
          let tempArry = JSON.parse(JSON.stringify(this.tableData))
          tempArry.forEach(item => {
            delete item.id
          })
          let params = {
            ...this.formInfo,
            materielList: tempArry
          }
          delete params.id
          addOrderItem(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.$router.push('/purchaseApproval')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    // 合计金额
    _amountChange (e) {
      this.$forceUpdate()
    },
    _getData () {
      let params = {
        purchaseRequestId: this.mainId
      }
      getItemDetail(params).then(res => {
        if (res.data.code === 200) {
          res.data.data.materielList.forEach(item => {
            item.requestQuantity = item.quantity
            item.orderQuantity = 1
            item.unitPrice = item.price
            item.amount = item.price * item.orderQuantity
            item.supplierCode = ''
            item.deliveryDate = ''
          })
          this.tableData = res.data.data.materielList
          res.data.data.applyDepartmentName = res.data.data.departmentName
          res.data.data.applyDepartmentCode = res.data.data.departmentCode
          this.$nextTick(() => {
            this.formInfo = JSON.parse(JSON.stringify(res.data.data))
            this.formInfo.amount = 0
            delete this.formInfo.materielList
          })
        }
      })
    },
    _storeSelect (val) {
      this.storeList.forEach(item => {
        if (item.code === val) {
          this.formInfo.warehouseName = item.name
        }
      })
    },
    _quanlityOrPriceChange (row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData))
      tempArr[index]['amount'] = (row.orderQuantity * row.unitPrice).toFixed(2)
      this.tableData = JSON.parse(JSON.stringify(tempArr))
    },
    _supplierChange (row, index) {
      const { supplierCode } = row
      this.supplierList.forEach(item => {
        if (item.code === supplierCode) {
          this.tableData[index]['supplierName'] = item.name
        }
      })
    },
    _delItemHandle (row, index) {
      this.tableData.splice(index, 1)
    },
    _sourceChange (row, index) {
      const { supplierCode } = row
      this.sourceList.forEach(item => {
        if (item.code === supplierCode) {
          this.tableData[index]['supplierName'] = item.name
        }
      })
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
        if (index === 8) {
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
</style>