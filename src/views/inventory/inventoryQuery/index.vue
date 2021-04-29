<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-06 16:09:37
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 14:52:24
 * @FilePath: /hos-logistics-management/src/views/inventory/inventoryQuery/index.vue
-->
<template>
  <ContainerGroup>
    <Container class="wrapper-form">
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="订单编号：" prop="orderId">
          <el-input
            placeholder="请输入采购单号"
            v-model="formInline.orderId"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="业务类型：" prop="businessType">
          <el-select
            placeholder="请选择"
            v-model="formInline.businessType"
            clearable
          >
            <el-option
              v-for="item in businessType"
              :key="item.code"
              :value="item.code"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领用日期：" prop="type">
          <el-form-item prop="startTime"  >
            <el-date-picker
              type="date"
              class="start-item-picker"
              placeholder="开始时间"
              v-model="formInline.startTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="endTime"  >
            <el-date-picker
              type="date"
              class="end-item-picker"
              placeholder="结束时间"
              v-model="formInline.endTime"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="仓库：" prop="warehouseId">
          <el-input
            placeholder="请输入仓库"
            v-model="formInline.warehouseId"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="出入类型：" prop="type">
          <el-select
            placeholder="请选择出入类型"
            v-model="formInline.type"
            clearable
          >
            <el-option
              v-for="item in typeList"
              :key="item.code"
              :value="item.code"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container class="wrapper-table">
      <el-table
        :data="tableData"
        v-loading="loading"
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        stripe
        size="mini"
        highlight-current-row
        height="0"
        isFillHeight
        border
      >
        <el-table-column label="订单单号" prop="orderId" show-overflow-tooltip></el-table-column>
        <el-table-column label="出入类型" prop="typeName" show-overflow-tooltip> </el-table-column>
        <el-table-column
          label="出库仓库"
          prop="outWarehouseName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="入库仓库"
          show-overflow-tooltip
          prop="inWarehouseName"
        ></el-table-column>
        <el-table-column label="科室" prop="deptName" show-overflow-tooltip></el-table-column>
        <el-table-column label="申请日期" prop="applyTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="审核日期" prop="approvalTime" show-overflow-tooltip></el-table-column>
        <el-table-column label="制单人" prop="" show-overflow-tooltip></el-table-column>
        <el-table-column label="审批人" prop="" show-overflow-tooltip></el-table-column>
        <el-table-column label="供应商" prop="supplierName" show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="top"
            >
              <el-button type="text" @click="_itemDetailHandle(scope.row)">
                <i class="el-icon-tickets"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination
          :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange"
        />
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index";
import {
  queryStockDetail,
  queryStockInit,
} from "./../../../apis/inventoryQuery/index";

export default {
  name: "inventoryQuery", // 库存明细帐查询
  components: {
    pagination,
  },
  data() {
    return {
      formInline: {},
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      typeList: [],
      businessType: [],
      loading: false,
    };
  },
  mounted() {
    this._queryStockInit();
    this._getData();
  },
  methods: {
    _queryStockInit() {
      queryStockInit().then((res) => {
        if (res.data.code === 200) {
          this.businessType = res.data.data.businessType;
          this.typeList = res.data.data.type;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getArg() {
      const { startTime, endtime } = this.formInline;
      if (!startTime) {
        this.formInline.startTime = "";
      } else {
        this.formInline.startTime = this.$monent(startTime).format(
          "YYYY-MM-DD"
        );
      }
      if (!endtime) {
        this.formInline.endtime = "";
      } else {
        this.formInline.endtime = this.$monent(endtime).format("YYYY-MM-DD");
      }
      return this.formInline;
    },
    _searchHandle() {
      this.pageSize = 20;
      this.currentPage1;
      this._getData();
    },
    _getData() {
      let arg = this._getArg();
      console.log(this.pageSize)
      let params = {
        ...arg,
        pageSize: this.pageSize,
        current: this.currentPage,
      };
      this.loading = true;
      queryStockDetail(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.currentPage = res.data.data.current;
          this.pageSize = res.data.data.size;
          // this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false;
      });
    },
    _itemDetailHandle(row) {
      const { id, businessType } = row;
      switch (businessType) {
        case "LY": //领用
          this.$router.push({
            path: "/materialRequisition/detail-yes",
            query: {
              id: id,
              status: 0,
            },
          });
          break;
        case "TK": //退库
          this.$router.push({
            path: "/materialWithdrawal/detail-yes",
            query: {
              id: id,
              status: 1,
            },
          });
          break;
        case "PI": //采购申请
          this.$router.push({
            path: "/purchaseRequisition/detail",
            query: {
              id: id,
              status: 4,
            },
          });
          break;
        case "PR": //采购订单申请
          this.$router.push({
            path: "/purchaseOrder/detail",
            query: {
              id: id,
              status: 4,
            },
          });
          break;
        case "AP": //直进直出
          this.$router.push({
            path: "/outAndIn/detail-no",
            query: {
              id: id,
              status: 1,
            },
          });
          break;
        case "RO": //收货订单
          this.$router.push({
            path: "/purchaseReceipt/detail",
            query: {
              id: id,
              status: 2,
            },
          });
          break;
        default:
          break;
      }
    },

    pagationChange(payload) {
      this.currentPage = payload.page;
      this.pageSize = payload.pageSize;
      this._getData();
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  .wrapper-form {
  }
  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>
<style lang="less">
.form-time {
  width: 30%;
  .el-form-item__content {
    width: 78% !important;
  }
  .start-item {
    .el-form-item__content {
      width: 100% !important;
    }
  }
  .end-item {
    .el-form-item__content {
      width: 100% !important;
    }
  }
}
</style>