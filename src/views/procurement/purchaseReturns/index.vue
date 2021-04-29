<template>
  <ContainerGroup id="containerGroup">
    <Container>
        <el-form :inline="true"
          :model="formInline"
          ref="formInline">
          <el-form-item label="采购退货单号："
            prop="purchaseReturnNumber">
            <el-input placeholder="请输入采购退货单号"
              v-model="formInline.purchaseReturnNumber"
              clearable></el-input>
          </el-form-item>
          <el-form-item label="录单日期：">
            <el-form-item prop="startTime"  >
              <el-date-picker type="date"
                placeholder="选择日期"
                v-model="formInline.startDate"></el-date-picker>
            </el-form-item>
            <el-form-item prop="endtTime"  >
              <el-date-picker placeholder="选择日期"
                v-model="formInline.endDate"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="仓库："
            prop="warehouseCode">
            <el-select placeholder="请选择"
              v-model="formInline.warehouseCode"
              clearable>
              <el-option v-for="item in warehouseList"
                :key="item.warehouseId"
                :value="item.code"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态："
            prop="status">
            <!-- 1->未审批 2->已批准 3->已驳回 4->已撤回 -->
            <el-select placeholder="请选择"
              clearable
              v-model="formInline.status">
              <el-option value="1"
                label="未审批"></el-option>
              <el-option value="2"
                label="已批准"> </el-option>
              <el-option value="3"
                label="已驳回"> </el-option>
              <el-option value="4"
                label="已撤回"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
              @click="_searchHandle">查询</el-button>
          </el-form-item>
        </el-form>
    </Container>
    <Container>
        <el-table :data="tableData"
          v-loading="loading"
          border
          height="0"
          stripe
          isFillHeight
          :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
          size="mini"
          >
          <el-table-column label="采购收货单号"
            
            prop="purchaseReceiptNumber"></el-table-column>
          <el-table-column label="采购退货单号"
            prop="purchaseReturnNumber"></el-table-column>
          <el-table-column label="申请部门"
            
            prop="applyDepartmentName"></el-table-column>
          <el-table-column label="仓库"
            
            prop="warehouseName"></el-table-column>
          <el-table-column label="录单日期"
            
            prop="inputDate"></el-table-column>
          <el-table-column label="申请人"
            
            prop="applicantName"></el-table-column>
          <el-table-column label="状态"
            
            prop="status">
            <!-- 1->未审批 2->已批准 3->已驳回 4->已撤回 -->
            <template slot-scope="scope">
              {{scope.row.status ===1 ?'未审批':scope.row.status ===2 ?'已批准':scope.row.status ===3 ?'已驳回':scope.row.status ===4 ?'已撤回':''}}
            </template>
          </el-table-column>
          <!-- 1->未审批 2->已批准 3->已驳回 4->已撤回 -->
          <el-table-column label="操作"
            >
            <template slot-scope="scope">
                <el-tooltip class="item-button"
                  effect="dark"
                  content="详情"
                  placement="top">
                  <el-button type="text"
                    @click="_itemDetailHandle(scope.row)">
                    <i class="el-icon-tickets"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item-button"
                  v-if="scope.row.status ===1||scope.row.status ===3"
                  effect="dark"
                  content="编辑"
                  placement="top">
                  <el-button type="text"
                    @click="_editItem(scope.row)">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item-button"
                  v-if="scope.row.status ===1"
                  effect="dark"
                  content="撤回"
                  placement="top">
                  <el-popconfirm :title="`确定要撤回 ${scope.row.purchaseReceiptNumber} 吗?`"
                    @confirm="_backHandle(scope.row)">
                    <el-button type="text"
                      slot="reference">
                      <i class="el-icon-document-remove"></i>
                    </el-button>
                  </el-popconfirm>
                </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
            :page="currentPage"
            :pageSize="pageSize"
            @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
import pagination from './../../../components/pagination/index'
import { getWarehouseList } from '../../../apis/commonApi'
import { getList, approvalItem } from './../../../apis/purchaseReturns'
export default {
  name: 'purchaseReturns', //采购退货
  components: {
    pagination
  },
  data () {
    return {
      formInline: {
        startDate: null,
        endDate: null,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableHeight: '0px',
      tableData: [],
      warehouseList: [],
      loading: false,
    }
  },
  mounted () {
    const { id } = this.$route.query
    if (id) {
      this.formInline.purchaseReturnNumber = id
    }
    this._getWarehouseList()
    this._getData()
  },
  methods: {
    _getArg () {
      const { startDate, endDate } = this.formInline
      if (!startDate) {
        this.formInline.startDate = ''
      } else {
        this.formInline.startDate = this.$moment(startDate).format('YYYY-MM-DD')
      }
      if (!endDate) {
        this.formInline.endDate = ''
      } else {
        this.formInline.endDate = this.$moment(endDate).format('YYYY-MM-DD')
      }
      return this.formInline
    },
    _getWarehouseList () {
      let params = {
        status: 1
      }
      getWarehouseList(params).then(res => {
        if (res.data.code === 200) {
          this.warehouseList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _searchHandle () {
      this.currentPage = 1
      this.pageSize = 10
      this._getData()
    },
    _getData () {
      let arg = this._getArg()
      let params = {
        ...arg,
        size: this.pageSize,
        current: this.currentPage
      }
      this.loading = true
      getList(params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          this.currentPage = res.data.data.current
          this.pageSize = res.data.data.size
        } else {
          this.$message.error(res.data.message)
        }
        this.loading = false
      })
    },
    _itemDetailHandle (row) {
      this.$router.push({
        path: '/purchaseReturns/detail',
        query: {
          id: row.id,
        }
      })
    },
    _editItem (row) {
      this.$router.push({
        path: '/purchaseReturns/edit',
        query: {
          id: row.id,
          type: 'edit'
        }
      })
    },
    _backHandle (row) {
      const { id } = row
      let params = {
        id: id,
        status: 4 // 已撤回
      }
      approvalItem(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this._getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    pagationChange (payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getData()
    }
  }
}
</script>
<style lang="less" scoped>
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
    padding: 15px;
  }
  .item-button {
    margin: 0 1px;
  }
}
</style>
<style lang="less">
.date-form {
  width: 28%;
  .el-form-item__content {
    width: 77%;
  }
}
</style>