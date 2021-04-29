<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-07 17:32:03
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 14:55:44
 * @FilePath: /hos-logistics-management/src/views/inventory/outAndIn/index.vue
-->
<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="订单编号：" prop="orderId">
          <el-input
            placeholder="请输入订单编号"
            v-model="searchForm.orderId"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="日期：" prop="type">
            <el-form-item prop="startTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="searchForm.startTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="endTime">
              <el-date-picker
                placeholder="选择时间"
                v-model="searchForm.endTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="仓库：" prop="warehouseId">
          <el-select
            placeholder="请选择"
            v-model="searchForm.warehouseId"
            clearable
          >
            <el-option
              v-for="item in warehouseList"
              :key="item.warehouseId"
              :value="item.warehouseId"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_search">查询</el-button>
          <el-button
            icon="el-icon-plus"
             type="primary"
            @click="_addNewItem"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <el-table
        :data="tableData"
        v-loading="loading"
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
        border
      >
        <el-table-column prop="orderId" label="订单单号" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="deptName" label="部门" show-overflow-tooltip width="60"></el-table-column>
        <el-table-column prop="warehouseName" label="仓库" show-overflow-tooltip width="60"></el-table-column>
        <el-table-column prop="applyTime" label="录单日期" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="createByName" label="创建人" width="100"></el-table-column>
        <el-table-column prop="receiptNo" label="发票号" show-overflow-tooltip width="140"></el-table-column>
        <el-table-column prop="totalPrice" label="合计金额" show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip></el-table-column>
        <el-table-column prop="finishTime" label="过账日期" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            {{
              scope.row.status === "0"
                ? "未过账"
                : scope.row.status === "1"
                ? "已过账"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip
              class="item-button"
              effect="dark"
              content="详情"
              placement="top"
            >
              <el-button type="text" @click="_itemDetailHandle(scope.row)">
                <i class="el-icon-tickets"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item-button"
              v-if="scope.row.status === '0'"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="text" @click="_itemEditHandle(scope.row)">
                <i class="el-icon-edit"></i>
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
import { getWarehouseList } from "./../../../apis/commonApi";
import { getDataList } from "./../../../apis/outAndIn/index";
export default {
  name: "outAndIn", // 直进直出
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        startTime: null,
        endTime: null,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      warehouseList: [],
      loading: false,
    };
  },
  mounted() {
    this._getWarehouseList();
    this._getData();
  },
  methods: {
    _getArg() {
      const { orderId, startTime, endTime, warehouseId } = this.searchForm;
      if (!startTime) {
        this.searchForm.startTime = "";
      } else {
        this.searchForm.startTime = this.$moment(startTime).format(
          "YYYY-MM-DD"
        );
      }
      if (!endTime) {
        this.searchForm.endTime = "";
      } else {
        this.searchForm.endTime = this.$moment(endTime).format("YYYY-MM-DD");
      }
      return this.searchForm;
    },
    _getWarehouseList() {
      let params = {
        status: 1,
      };
      getWarehouseList(params).then((res) => {
        if (res.data.code === 200) {
          this.warehouseList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _search() {
      this.currentPage = 1;
      this.pageSize = 10;
      this._getData();
    },
    _getData() {
      let arg = this._getArg();
      let params = {
        ...arg,
        current: this.currentPage,
        pageSize: this.pageSize,
      };
      this.loading = true;
      getDataList(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.currentPage = res.data.data.current;
          this.pageSize = res.data.data.size;
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false;
      });
    },
    _addNewItem() {
      this.$router.push({
        path: "/outAndIn/add",
      });
    },
    _itemDetailHandle(row) {
      this.$router.push({
        path: "/outAndIn/detail-no",
        query: {
          id: row.id,
          status: row.status, // 是否过账
        },
      });
    },
    _itemEditHandle(row) {
      this.$router.push({
        path: "/outAndIn/edit",
        query: {
          id: row.id,
          status: row.status,
        },
      });
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
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }
  .warpper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
  }
  .item-button {
    margin: 0 1px;
  }
}
</style>