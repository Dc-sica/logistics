<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <div class="wrapper-form" id="searchBox">
        <el-form :inline="true" ref="searchForm">
          <el-form-item label="采购申请单号：" prop="purchaseRequestNumber">
            <el-input
              placeholder="请输入采购申请单号"
              v-model="searchForm.purchaseRequestNumber"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="录单时间：">
              <el-form-item prop="startDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="searchForm.startDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item prop="endDate">
                <el-date-picker
                  placeholder="选择日期"
                  v-model="searchForm.endDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <!-- 1->未审批 2->已批准 3->已驳回 4->已撤回 -->
            <el-select
              placeholder="请选择"
              v-model="searchForm.status"
              clearable
            >
              <el-option value="1" label="未审批"></el-option>
              <el-option value="2" label="已批准"> </el-option>
              <el-option value="3" label="已驳回"> </el-option>
              <el-option value="4" label="已撤回"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Container>
    <Container>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column
          label="采购申请单号"
          prop="purchaseRequestNumber"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="申请部门"
          prop="departmentName"
        ></el-table-column>
        <el-table-column label="录单日期" prop="inputDate"></el-table-column>
        <el-table-column label="申请人" prop="applicantName"></el-table-column>
        <el-table-column
          label="备注"
          show-overflow-tooltip
          prop="remarks"
        ></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <p>
              {{
                scope.row.status === 1
                  ? "未批准"
                  : scope.row.status === 2
                  ? "已批准"
                  : scope.row.status === 3
                  ? "已驳回"
                  : scope.row.status === 4
                  ? "已撤回"
                  : scope.row.status === 4
                  ? "已完成"
                  : ""
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
              v-if="scope.row.status === 1"
              effect="dark"
              content="审批"
              placement="top"
            >
              <el-button type="text" @click="_itemCheckHandle(scope.row)">
                <i class="el-icon-s-check"></i>
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
            <!-- v-if="scope.row.status === 2" -->
            <el-tooltip
              class="item-button"
              v-if="scope.row.status === 2"
              effect="dark"
              content="生成采购订单"
              placement="top"
            >
              <el-button type="text" @click="_addItem(scope.row)">
                <i class="el-icon-s-order"></i>
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
import { getListPage } from "./../../../apis/purchaseApproval/index";
import { getOrderTree } from "./../../../apis/commonApi";
export default {
  name: "purchaseApproval", //采购审批
  components: {
    pagination,
    stream,
  },
  data() {
    return {
      searchForm: {
        purchaseRequestNumber: "",
        status: "",
        startDate: "",
        endDate: "",
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableHeight: "0px",
      tableData: [
        {
          order1: "1",
          order2: "1",
          supplier: "232",
          date: "233",
          ticket: "233",
          remark: "233",
        },
      ],
      dataList: [],
      drawerView: false,
      userInfo: null,
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
    this._getData();
    // let _this = this
    // setTimeout(function(){
    //   _this.tableHeight = getTableHeight('containerGroup','searchBox','pagation')
    // },100)
    // window.onresize = () => {
    //   this.tableHeight = getTableHeight('containerGroup','searchBox','pagation')
    // }
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    _getArg() {
      let { startDate, endDate } = this.searchForm;
      if (startDate === "" || startDate === null) {
        this.searchForm.startDate = "";
      } else {
        this.searchForm.startDate = this.$moment(startDate).format(
          "YYYY-MM-DD"
        );
      }
      if (endDate === "" || endDate === null) {
        this.searchForm.endDate = "";
      } else {
        this.searchForm.endDate = this.$moment(endDate).format("YYYY-MM-DD");
      }
      return this.searchForm;
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
        size: this.pageSize,
      };
      getListPage(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.currentPage = res.data.data.current;
          this.pageSize = res.data.data.size;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _itemDetailHandle(row) {
      this.$router.push({
        path: "/purchaseApproval/detail", ///materialRequisition/detail-no
        query: {
          id: row.id,
          type: 1, //详情
        },
      });
    },
    // 审批
    _itemCheckHandle(row) {
      this.$router.push({
        path: "/purchaseApproval/detail", ///materialRequisition/detail-no
        query: {
          id: row.id,
          type: 2, //审批
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
    // 采购订单新增
    _addItem(row) {
      this.$router.push({
        path: "/purchaseApproval/add",
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