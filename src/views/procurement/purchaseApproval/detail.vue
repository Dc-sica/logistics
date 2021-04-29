<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-18 15:56:49
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-05 10:12:08
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseApproval/detail.vue
-->
<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <template v-if='type==2'>
        <el-button type="primary"
          @click="_backHandle">驳回</el-button>
        <el-button type="primary"
          @click="_agreeHandle">同意</el-button>
      </template>
      <el-button type="default" @click="_goBackHandle">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
          采购申请审批
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo">
              <el-col :span="6">
                <el-form-item label="采购申请单号："
                  prop="purchaseRequestNumber"
                  label-width="120px">
                  <el-input v-model="formInfo.purchaseRequestNumber"
                    disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="录单日期："
                  prop="inputDate"
                  label-width="120px">
                  <el-date-picker type="date"
                    placeholder="选择日期"
                    v-model="formInfo.inputDate"
                    disabled
                    style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请部门："
                  prop="departmentName"
                  label-width="120px">
                  <el-input v-model="formInfo.departmentName"
                    disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- 状态1->未批准 2->已批准 3->已驳回 4->已撤回  5 已完成-->
                <el-form-item label="状态："
                  prop="status"
                  label-width="120px">
                  <template slot-scope="{}">
                    <!-- 3233 -->
                    <el-input
                      :value="formInfo.status===1?'未批准':formInfo.status===2?'已批准':formInfo.status===3?'已驳回':'已撤回'"
                      disabled></el-input>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请人："
                  prop="applicantName"
                  label-width="120px">
                  <el-input v-model="formInfo.applicantName"
                    disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注："
                  label-width="120px"
                  prop="remarks">
                  <el-input type="textarea"
                    v-model="formInfo.remarks"
                    disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"
                v-if="status ==='3'">
                <el-form-item label="审批意见："
                  label-width="120px">
                  <el-input type="textarea"
                    disabled
                    v-model="formInfo.approvalComments"></el-input>
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
        :header-cell-style="{background:'#E8EAED'}"
        stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="序号"
          align="center"
          type="index"></el-table-column>
        <el-table-column label="名称"
          prop="materialName"
          align="center"></el-table-column>
        <el-table-column label="物料号"
          align="center"
          prop="materialCode"></el-table-column>
        <el-table-column label="单位"
          align="center"
          prop="materialUnit"></el-table-column>

        <el-table-column label="数量"
          align="center"
          prop="quantity"></el-table-column>
      </el-table>
    </Container>
    <!-- 侧边弹窗 -->
    <Drawer
      title="采购申请审批"
      :visible.sync="drawerView"
      @onOk="_commitApproveHandle"
      @cancel="_drawerHandleClose"
      :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
         { type: 'primary', text: '保存', trigger: 'onOk' }
      ]"
    >
      <OperationContainer>
        <el-form :inline="false"
            :model="formInline"
            ref="formInline"
            :rules="rules"
            style="width:100%">
            <el-form-item label="审批意见："
              label-width="100px"
              prop="approvalComments">
              <el-input placeholder="请输入审批意见"
                :maxlength="200"
                type="textarea"
                show-word-limit
                :rows="6"
                v-model="formInline.approvalComments"></el-input>
            </el-form-item>
          </el-form>
      </OperationContainer>
    </Drawer>
  </ContainerGroup>
</template>
<script>
import {
  getItemDetail,
  updateItem,
  approvalItem
} from './../../../apis/purchaseApproval/index'

export default {
  name: 'add',
  data () {
    return {
      order1: '',
      drawerView: false,
      formInline: {
        approvalComments: ''
      },
      formInfo: {
        departmentCode: '',
        applicantId: "",
        inputDate: null
      },
      rules: {
        approvalComments: [{ required: true, message: '请输入审批意见', trigger: 'blur' }]
      },
      tableData: [],
      typesData: []
    }
  },
  created () {
    const { id, status, type } = this.$route.query
    this.mainId = id
    this.status = status
    this.type = type  //1 详情 2 审批
    this._getData()
  },
  methods: {
    _backHandle () {
      this.drawerView = true
    },
    _agreeHandle () {
      let params = {
        id: this.mainId,
        purchaseRequestNumber: this.formInfo.purchaseRequestNumber,
        status: 2
      }
      approvalItem(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this.$router.push('/purchaseApproval')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _goBackHandle () {
      this.$router.push("/purchaseApproval")
    },
    _getData () {
      let params = {
        purchaseRequestId: this.mainId
      }
      getItemDetail(params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.materielList
          this.formInfo = JSON.parse(JSON.stringify(res.data.data))
          delete this.formInfo.materielList
        }
      })
    },
    _chooseItem () {
      this.drawerView = true
    },
    _drawerHandleClose () {
      this.$refs.formInline.resetFields()
      this.drawerView = false
    },
    _commitApproveHandle () {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          let params = {
            ...this.formInline,
            id: this.mainId,
            purchaseRequestNumber: this.formInfo.purchaseRequestNumber,
            status: 3
          }
          approvalItem(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.$router.push('/purchaseApproval')
            } else {
              this.$message.error(res.data.message)
            }
          })

        } else {
          this.$message.warning(JSON.stringify(valid))
        }
      })
    },
    _handleSelectionChange () {

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