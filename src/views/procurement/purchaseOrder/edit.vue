<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-18 16:28:12
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 10:55:08
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseOrder/edit.vue
-->

<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-button type="primary"
        @click="_saveHandle">保存</el-button>
      <el-button type="default"
        @click="_backHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
        采购订单
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo"
            ref="formInfo"
            :rules="rules">
            <el-col :span="6">
              <el-form-item label="采购申请单号："
                prop="purchaseRequestNumber"
                label-width="115px">
                <el-input v-model="formInfo.purchaseRequestNumber"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采购订单号："
                prop="purchaseOrderNumber"
                label-width="115px">
                <el-input v-model="formInfo.purchaseOrderNumber"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请部门："
                prop="applyDepartmentName"
                label-width="115px">
                <el-input v-model="formInfo.applyDepartmentName"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录单日期："
                prop="inputDate"
                label-width="115px">
                <el-date-picker type="date"
                  placeholder="选择日期"
                  v-model="formInfo.inputDate"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人："
                prop="applicantName"
                label-width="115px">
                <el-input v-model="formInfo.applicantName"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收货仓库："
                prop="warehouseCode"
                label-width="115px">
                <el-select v-model="formInfo.warehouseCode"
                  clearable>
                  <el-option v-for="item in warehouseList"
                    :key="item.id"
                    :value="item.code"
                    :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额："
                prop="amount"
                label-width="115px">
                <el-input v-model="formInfo.amount"
                  type="number"
                  :min="1">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注："
                prop="remarks"
                label-width="115px">
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
        <el-table-column label="申请数量"
          align="center"
          prop="requestQuantity"></el-table-column>
        <el-table-column label="采购数量"
          align="center"
          prop="orderQuantity">
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="orderQuantity">
                <el-input v-model="scope.row.orderQuantity"
                  type="number"
                  :min="0"
                  @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="已采购数量"
          align="center"
          prop="storedQuantity"></el-table-column>
        <el-table-column label="单价(元)"
          align="center"
          prop="unitPrice">
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="unitPrice">
                <el-input v-model="scope.row.unitPrice"
                  type="number"
                  :min="0"
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
          prop="supplierCode">
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="supplierCode">
                <el-select v-model="scope.row.supplierCode">
                  <el-option v-for="item in supplierList"
                    :key="item.code"
                    :value="item.code"
                    :label="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="资金来源"
          align="center"
          prop="source">
          <template slot-scope="scope">
            <el-form :model="scope.row"
              :rules='rules'>
              <el-form-item prop="source">
                <!-- <el-input v-model="scope.row.source"></el-input> -->
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
          prop="order1">
          <template slot-scope="scope">
            <el-tooltip class="item"
              effect="dark"
              content="删除"
              placement="top">
              <el-popconfirm :title="`确定要删除 ${scope.row.materialName} 吗?`"
                @confirm="_delHandle(scope.row,scope.$index)">
                <el-button type="text"
                  slot="reference">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="currentIndex ===2">
        <div>
          <el-steps :active="2"
            simple>
            <el-step title="采购申请"
              @click="_processItemHandle(1)"></el-step>
            <el-step title="采购申请审批"
              @click="_processItemHandle(2)"></el-step>
            <el-step title="采购订单审批"
              @click="_processItemHandle(3)"></el-step>
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
import { getWarehouseList, geSupplierList, dictByCategoryId } from './../../../apis/commonApi'

import { getInfoById, addItem } from './../../../apis/purchaseOrder/index'
export default {
  name: 'setting',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('请输入大于0，且最多两位小数的数字'))
      } else {
        callback()
      }
    }
    return {
      formInfo: {
        inputDate: null
      },
      rules: {
        inputDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        warehouseCode: [{ required: true, message: '请选择仓库', trigger: 'change' }],
        amount: [
          { required: true, message: '请选择金额', trigger: 'blur' },
          { pattern: /^((?!0)\d+(.\d{1,2})?)$/, message: '请输入正数,且最多保留两位小数点' }
        ],
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
      currentIndex: 1,
      backVisible: false,
      tableData: [
        {
          order1: '1',
        },
      ],
      mainId: '',
      warehouseList: [],
      supplierList: [],
      sourceList: []
    }
  },
  created () {
    const { id } = this.$route.query
    this.mainId = id
    this._getInfo()
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
          this.warehouseList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _getInfo () {
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
    _saveHandle () {
      let params = {
        ...this.formInfo,
        materielList: this.tableData
      }
      addItem(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this.$router.push('/purchaseOrder')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _backHandle () {
      this.$router.push('/purchaseOrder')
    },
    _quanlityOrPriceChange (row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData))
      tempArr[index]['amount'] = row.orderQuantity * row.unitPrice
      this.tableData = JSON.parse(JSON.stringify(tempArr))
    },

    _itemHandleClose () {
      this.backVisible = false
    },
    _detailHandle () {
      this.currentIndex = 1
    },
    _processHandle () {
      this.currentIndex = 2
    },
    _processItemHandle (type) {

    },
    _sourceChange (row, index) {
      const { supplierCode } = row
      this.sourceList.forEach(item => {
        if (item.code === supplierCode) {
          this.tableData[index]['supplierName'] = item.name
        }
      })
    },
    _delHandle (row, index) {
      this.tableData.splice(index, 1)
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
  .wrapper-top {
    text-align: right;
  }
</style>
