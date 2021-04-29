<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-18 17:14:19
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-07 11:41:04
 * @FilePath: /hos-logistics-management/src/views/procurement/returnApproval/detail.vue
-->
<template>
  <ContainerGroup id="containerGroup">
    <Container>
        <el-button type="default"
          @click="_cancelHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
        采购退货审批
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo"
            ref="formInfo">
            <el-col :span="6">
              <el-form-item label="采购收货单号："
                prop="purchaseReceiptNumber"
                label-width="115px">
                <el-input v-model="formInfo.purchaseReceiptNumber"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采购退货单号："
                prop="purchaseReturnNumber"
                label-width="115px">
                <el-input v-model="formInfo.purchaseReturnNumber"
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
              <el-form-item label="仓库："
                prop="warehouseName"
                label-width="115px">
                <el-input v-model="formInfo.warehouseName"
                  disabled></el-input>
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
              <el-form-item label="录单日期："
                prop="inputDate"
                label-width="115px">
                <el-date-picker type="date"
                  disabled
                  placeholder="选择日期"
                  v-model="formInfo.inputDate"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <!-- 1->未审批 2->已批准 3->已驳回 4->已撤回 -->
              <el-form-item label="状态："
                prop="status"
                label-width="115px">
                <el-input
                  :value="formInfo.status ===1?'未审批':formInfo.status ===2?'已批准':formInfo.status ===3?'已驳回':formInfo.status ===4?'已撤回':''"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合计金额："
                label-width="115px"
                prop="amount">
                <el-input v-model="formInfo.amount"
                  disabled>
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注："
                prop="remarks"
                label-width="115px">
                <el-input type="textarea"
                  v-model="formInfo.remarks"
                  disabled></el-input>
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
          width="60px"
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
        <el-table-column label="入库数量"
          align="center"
          prop="receivedQuantity"></el-table-column>
        <el-table-column label="退库数量"
          align="center"
          prop="quantity"></el-table-column>
        <el-table-column label="单价(元)"
          align="center"
          prop="unitPrice"></el-table-column>
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
          <el-steps :active="processData.length+1"
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
import { approvalList } from './../../../apis/commonApi'
import { getReturnDetail, approvalItem, delReturnById } from './../../../apis/purchaseApproval/index'
export default {
  name: 'setting',
  data () {
    return {
      formInfo: {},
      formInline: {},
      rules: {
        approvalComments: [{ required: true, message: '请输入审批意见', trigger: 'blur' }]
      },
      currentIndex: 1,
      tableData: [],
      drawerView: false,
      processData: []
    }
  },
  created () {
    const { id } = this.$route.query
    this.mainId = id
    this._getReturnDetail()
  },
  methods: {
    _cancelHandle () {
      this.$router.push('/returnApproval')
    },
    _getReturnDetail () {
      let params = {
        purchaseReturnId: this.mainId
      }
      getReturnDetail(params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.returnMaterielList
          this.formInfo = JSON.parse(JSON.stringify(res.data.data))
          console.log(233, this.formInfo)
          delete this.formInfo.returnMaterielList
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _drawerHandleClose () {
      this.drawerView = false
    },
    _commitApproveHandle () {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          let params = {
            ...this.formInline,
            id: this.mainId,
            warehouseCode: this.formInfo.warehouseCode,
            status: 4,
          }
          approvalItem(params).then(res => {
            if (res.data.code === 200) {
              this.drawerView = false
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    _approvalHandle () {
      let params = {
        id: this.mainId,
        status: 2,
        warehouseCode: this.formInfo.warehouseCode
      }
      approvalItem(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
      })
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
    _backHandle () {
      this.drawerView = true
      
    },
    _deleteItem (row) {
      let params = {
        id: row.id
      }
      delReturnById(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this._getReturnDetail()
        } else {
          this.$message.error(res.data.message)
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
  .wrapper-top {
    text-align: right;
  }
</style>