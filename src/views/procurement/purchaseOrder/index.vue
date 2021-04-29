<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <div class="wrapper-form" id="searchBox">
        <el-form :inline="true" :model="formInline" ref="formInline">
          <el-form-item label="采购订单号：" prop="name">
            <el-input
              placeholder="请输入采购订单号"
              v-model="formInline.purchaseRequestNumber"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="录单日期：">
            <el-form-item prop="startDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formInline.startDate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="endDate">
              <el-date-picker
                placeholder="选择时间"
                v-model="formInline.endDate"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="收货仓库：" prop="warehouseCode">
            <el-select
              placeholder="请选择"
              clearable
              v-model="formInline.warehouseCode"
            >
              <el-option
                v-for="item in warehouseList"
                :key="item.id"
                :value="item.code"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <!-- 1->待收货 2->已收货 3->已完成 -->
            <el-select
              placeholder="请选择"
              v-model="formInline.status"
              clearable
            >
              <el-option value="1" label="待收货"></el-option>
              <el-option value="2" label="已收货"></el-option>
              <el-option value="3" label="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_searchHandle">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Container>
    <Container>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column
          label="采购订单号"
          show-overflow-tooltip
          prop="purchaseOrderNumber"
        ></el-table-column>
        <el-table-column
          label="申请部门"
          show-overflow-tooltip
          prop="applyDepartmentName"
        ></el-table-column>
        <el-table-column
          label="收货仓库"
          show-overflow-tooltip
          prop="warehouseName"
        ></el-table-column>
        <el-table-column label="录单日期" prop="inputDate"></el-table-column>
        <el-table-column
          label="申请人"
          show-overflow-tooltip
          prop="applicantName"
        ></el-table-column>
        <el-table-column label="合计金额" prop="amount"></el-table-column>
        <el-table-column
          label="备注"
          show-overflow-tooltip
          prop="remarks"
        ></el-table-column>
        <el-table-column
          label="收货状态"
          show-overflow-tooltip
          prop="receivingStatus"
        >
          <!-- 1-待收货 2-已收货 3 已完成 -->
          <template slot-scope="scope">
            {{
              scope.row.receivingStatus === 1
                ? "待收货"
                : scope.row.receivingStatus === 2
                ? "已收货"
                : scope.row.receivingStatus === 3
                ? "已完成"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column label="审批状态" prop="approvalStatus">
          <!-- 1-未审批 2-已审批 3 已驳回  4 已撤回-->
          <template slot-scope="scope">
            {{
              scope.row.approvalStatus === 1
                ? "未审批"
                : scope.row.approvalStatus === 2
                ? "已审批"
                : scope.row.approvalStatus === 3
                ? "已驳回"
                : scope.row.approvalStatus === 4
                ? "已撤回"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
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
              effect="dark"
              content="单据流"
              placement="top"
            >
              <el-button type="text" @click="_ticketStream(scope.row)">
                <i class="el-icon-receiving"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item-button"
              v-if="scope.row.approvalStatus === 1"
              effect="dark"
              content="撤回"
              placement="top"
            >
              <el-popconfirm
                :title="`确定要撤回 ${scope.row.purchaseRequestNumber} 吗?`"
                @confirm="_backHandle(scope.row)"
              >
                <el-button type="text" slot="reference">
                  <i class="el-icon-document-remove"></i>
                </el-button>
              </el-popconfirm>
            </el-tooltip>
            <el-tooltip
              class="item-button"
              v-if="scope.row.approvalStatus === 1"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="text" @click="_editItem(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <!-- scope.row.approvalStatus ===2 已收货  1 未收货 -->
            <el-tooltip
              class="item-button"
              v-if="
                scope.row.approvalStatus === 2 &&
                scope.row.receivingStatus === 1
              "
              effect="dark"
              content="收货"
              placement="top"
            >
              <el-button type="text" @click="_skipSavhHandle(scope.row)">
                <i class="el-icon-shopping-cart-full"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <stream
        :drawer="drawerView"
        @closeHandle="_closeDrawerHandle"
        :dataList="dataList"
      />
      <div id="pagation">
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
import { getTableHeight } from "../../../utils/publicFun";
import stream from "./stream";
import { getWarehouseList, getOrderTree } from "./../../../apis/commonApi";
import { getList, approvalItem } from "./../../../apis/purchaseOrder/index";
export default {
  name: "purchaseApproval", //采购审批
  components: {
    pagination,
    stream,
  },
  data() {
    return {
      formInline: {
        purchaseOrderNumber: "",
        startDate: null,
        endDate: null,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      drawerView: false,
      warehouseList: [],
      tableHeight: "0px",
      treeData: [],
      dataList: [],
      loading: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.formInline.purchaseOrderNumber = id;
    }
    this._getWarehouseList();
    this._getData();
    let _this = this;
    setTimeout(function () {
      _this.tableHeight = getTableHeight(
        "containerGroup",
        "searchBox",
        "pagation"
      );
    }, 100);
    window.onresize = () => {
      this.tableHeight = getTableHeight(
        "containerGroup",
        "searchBox",
        "pagation"
      );
    };
  },
  destroyed() {
    window.onresize = null;
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        const { id } = val.query;
        if (id) {
          this.formInline.purchaseOrderNumber = id;
          this._getData();
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    _getArg() {
      const { startDate, endDate } = this.formInline;
      if (!startDate) {
        this.formInline.startDate = "";
      } else {
        this.formInline.startDate = this.$moment(startDate).format(
          "YYYY-MM-DD"
        );
      }
      if (!endDate) {
        this.formInline.endDate = "";
      } else {
        this.formInline.endDate = this.$moment(endDate).format("YYYY-MM-DD");
      }
      return this.formInline;
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
    _searchHandle() {
      this.currentPage = 1;
      this.pageSize = 10;
      this._getData();
    },
    _getData() {
      let arg = this._getArg();
      let params = {
        ...arg,
        size: this.pageSize,
        current: this.currentPage,
      };
      this.loading = true;
      getList(params).then((res) => {
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
    // 撤回
    _backHandle(row) {
      let params = {
        id: row.id,
        approvalStatus: 4, // 4 已撤回
      };
      approvalItem(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this._getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 详情
    _itemDetailHandle(row) {
      this.$router.push({
        path: "/purchaseOrder/detail",
        query: {
          id: row.id,
          status: row.approvalStatus,
        },
      });
    },
    // 单据流
    _ticketStream(row) {
      if (!row.purchaseRequestNumber) {
        this.$message.error("采购订单号错误，请重试");
        return false;
      }
      let params = {
        orderId: row.purchaseRequestNumber,
      };
      getOrderTree(params).then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            if (item.type === "PI") {
              item.label = "采购申请单号 " + item.orderId;
              item.id = item.orderId;
              if (item.children) {
                item.children = this.mofifyData(item.children);
              }
            }
          });
          this.dataList = res.data.data;
          this.drawerView = true;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    mofifyData(data) {
      data.forEach((item) => {
        if (item.type === "PR") {
          item.label = "采购订单号 " + item.orderId;
          item.id = item.orderId;
          if (item.children) {
            item.children.forEach((ele) => {
              if (ele.type === "RO") {
                ele.label = "采购收货单号 " + ele.orderId;
                ele.id = ele.orderId;
                if (ele.children) {
                  ele.children.forEach((keys) => {
                    if (keys.type === "RTO") {
                      keys.label = "采购退货单号 " + keys.orderId;
                      keys.id = keys.orderId;
                      keys.children = [];
                    }
                  });
                }
              }
            });
          }
        }
      });
      return data;
    },
    // 收货
    _skipSavhHandle(row) {
      this.$router.push({
        path: "purchaseReceipt/add",
        query: {
          id: row.id,
        },
      });
    },
    // 编辑
    _editItem(row) {
      this.$router.push({
        path: "/purchaseOrder/edit",
        query: {
          id: row.id,
        },
      });
    },
    _closeDrawerHandle() {
      this.drawerView = false;
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
  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
  }
  .item-button {
    margin: 0 1px;
  }
  .drawer-wrapper {
    /deep/.el-drawer__header {
      span:focus {
        outline: none;
      }
    }
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