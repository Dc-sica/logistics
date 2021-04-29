<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="采购申请单号：" prop="purchaseRequestNumber">
          <el-input
            placeholder="请输入订单编号"
            v-model="searchForm.purchaseRequestNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="录单日期：" prop="type">
            <el-form-item prop="startDate">
              <el-date-picker
                type="date"
                v-model="searchForm.startDate"
                placeholder="选择日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="endDate">
              <el-date-picker
                placeholder="选择时间"
                v-model="searchForm.endDate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
        </el-form-item>
        <!-- 1->未审批 2->已批准 3->已驳回 4->已撤回 -->
        <el-form-item label="状态：" prop="status">
          <el-select placeholder="请选择" v-model="searchForm.status">
            <el-option value="" label="所有状态"></el-option>
            <el-option value="1" label="未审批"></el-option>
            <el-option value="2" label="已批准"> </el-option>
            <el-option value="3" label="已驳回"> </el-option>
            <el-option value="4" label="已撤回"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_search">查询</el-button>
          <el-button
            icon="el-icon-plus"
            type="primary"
            @click="_addItemHandle"
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
      >
        <el-table-column
          label="采购申请单号"
          show-overflow-tooltip
          prop="purchaseRequestNumber"
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
                  : "已撤回"
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
              <el-button type="text" @click="_detailItemHandle(scope.row)">
                <i class="el-icon-tickets"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item-button"
              v-if="scope.row.status === 1 || scope.row.status === 3"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item-button"
              v-if="scope.row.status === 1"
              effect="dark"
              content="撤回"
              placement="top"
            >
              <el-popconfirm
                :title="`确定要撤回 ${scope.row.purchaseRequestNumber} 吗?`"
                @confirm="_backItemHandle(scope.row)"
              >
                <el-button type="text" slot="reference">
                  <i class="el-icon-document-remove"></i>
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
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
import {
  getListPage,
  backItem,
} from "./../../../apis/purchaseRequisition/index";
export default {
  name: "purchaseRequisition", //采购申请
  components: {
    pagination,
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
      tableData: [],
      attrVisible: false,
      flag: true,
      currentObj: null,
      storeList: [],
      userInfo: null,
      loading: false,
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.searchForm.purchaseRequestNumber = id;
    }
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
    this._getData();
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
      this.loading = true;
      getListPage(params).then((res) => {
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
    _addItemHandle() {
      this.$router.push({
        path: "purchaseRequisition/add",
        isEdit: false,
      });
    },
    _detailItemHandle(row) {
      this.$router.push({
        path: "purchaseRequisition/detail",
        query: {
          id: row.id,
          status: row.status,
        },
      });
    },
    _editItemHandle(row) {
      this.$router.push({
        path: "purchaseRequisition/edit",
        query: {
          id: row.id,
          status: row.status,
          isEdit: true,
        },
      });
    },
    _backItemHandle(row) {
      const { userId, name, deptId, deptName } = this.userInfo;
      let params = {
        applicantId: userId,
        applicantName: name,
        departmentCode: deptId,
        departmentName: deptName,
        ...row,
        status: 4,
      };
      backItem(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this._getData();
        } else {
          this.$message.error(res.data.message);
        }
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
<style lang="less">
.dialog-wrapper {
  .el-dialog__header {
    background: #1d93a8 !important;
    .el-dialog__title {
      color: #fff !important;
    }
    .el-dialog__close {
      color: #fff !important;
    }
  }
  .checkbox-wrapper {
    padding: 10px;
    border: 1px solid #e5e5e5;
    margin-bottom: 10px;
    .el-checkbox {
      display: inline-block;
      width: 40%;
      line-height: 30px;
    }
  }
}
</style>