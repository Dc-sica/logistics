<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        label-width="100px"
      >
        <el-col :span="6">
          <el-form-item label="采购订单号：" class="elitem">
            <el-input
              placeholder="请输入采购订单号"
              v-model="formInline.purchaseOrderNumber"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人：" class="elitem">
            <el-input
              placeholder="请输入申请人"
              v-model="formInline.applicantName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请部门：" class="elitem">
            <el-select
              placeholder="请选择"
              clearable
              v-model="formInline.applyDepartmentCode"
            >
              <el-option
                v-for="item in deptList"
                :key="item.dictId"
                :value="item.code"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="收货仓库：" prop="warehouseCode" class="elitem">
            <el-select
              placeholder="请选择"
              clearable
              v-model="formInline.warehouseCode"
            >
              <el-option
                v-for="(item, index) in warehouseList"
                :key="index"
                :value="item.code"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="审批状态：" class="elitem">
            <!-- 1->待收货 2->已收货 3->已完成 -->
            <el-select
              placeholder="请选择"
              v-model="formInline.status"
              clearable
            >
              <el-option value="1" label="未审批"></el-option>
              <el-option value="2" label="已审批"></el-option>
              <el-option value="3" label="已驳回"></el-option>
              <el-option value="4" label="已撤回"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="录单日期：" class="elitem">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              v-model="formInline.inputDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="审批时间：" class="elitem">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              v-model="formInline.updateTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="showBtn">
          <el-form-item>
            <el-button type="primary" @click="_searchHandle">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="text" id="closeSearchBtn" @click="closeSearch">
              {{ word }}
              <i
                :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"
              ></i>
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-select
          v-model="excelBtns"
          size="large"
          @change="selectionHandle()"
          placeholder="导出数据"
        >
          <el-option
            v-for="item in excelBtnList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </OperationContainer>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="采购订单号"
          prop="purchaseOrderNumber"
        ></el-table-column>
        <el-table-column
          label="申请部门"
          prop="applyDepartmentName"
        ></el-table-column>
        <el-table-column label="申请人" prop="applicantName"></el-table-column>
        <el-table-column label="录单日期" prop="inputDate"></el-table-column>
        <el-table-column
          label="收货仓库"
          prop="warehouseName"
        ></el-table-column>
        <el-table-column label="合计金额(元)" prop="amount"></el-table-column>
        <el-table-column label="备注" prop="remarks"></el-table-column>
        <el-table-column label="审批时间" prop="updateTime">
          <template v-slot="scope">
            {{ scope.row.updateTime && scope.row.updateTime.substr(0, 10) }}
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item-button"
              effect="dark"
              content="查看"
              placement="top"
            >
              <el-button type="text" @click="_itemDetailHandle(scope.row)">
                <i class="iconfont icon-xiangqing"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item-button"
              effect="dark"
              content="审批"
              placement="top"
            >
              <el-button type="text" @click="handleApply(scope.row)">
                <i class="iconfont" style="font-size: 14px">&#xe699;</i>
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
            <!-- <el-tooltip class="item-button" v-if="scope.row.approvalStatus ===1" effect="dark" content="撤回" placement="top">
                  <el-popconfirm :title="`确定要撤回 ${scope.row.purchaseRequestNumber} 吗?`" @confirm="_backHandle(scope.row)">
                    <el-button type="text" slot="reference">
                      <i class="el-icon-document-remove"></i>
                    </el-button>
                  </el-popconfirm>
                </el-tooltip> -->
            <!-- <el-tooltip class="item-button" v-if="scope.row.approvalStatus ===1" effect="dark" content="编辑" placement="top">
                  <el-button type="text" @click="_editItem(scope.row)">
                    <i class="el-icon-edit"></i>
                  </el-button>
                </el-tooltip> -->
            <!-- scope.row.approvalStatus ===2 已收货  1 未收货 -->
            <!-- <el-tooltip class="item-button" v-if="scope.row.approvalStatus ===2&&scope.row.receivingStatus===1" effect="dark" content="收货" placement="top">
                  <el-button type="text" @click="_skipSavhHandle(scope.row)">
                    <i class="el-icon-shopping-cart-full"></i>
                  </el-button>
                </el-tooltip> -->
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
import { getInitData } from "./../../../apis/outAndIn/index";
import {
  getList,
  approvalItem,
  exportPurchaseOrder,
} from "./../../../apis/purchaseOrder/index";
export default {
  name: "purchaseOrderApproval", //采购订单审批
  components: {
    pagination,
    stream,
  },
  data() {
    return {
      excelBtnList: [
        {
          label: "全部导出",
          value: "1",
        },
        {
          label: "批量导出",
          value: "2",
        },
      ],
      excelBtns: "",
      formInline: {
        status: "",
        purchaseOrderNumber: "",
        applicantName: "",
        inputDate: "",
        updateTime: "",
        applyDepartmentCode: "",
        warehouseCode: "",
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableHeight: "0px",
      tableData: [],
      drawerView: false,
      warehouseList: [],
      treeData: [],
      dataList: [],
      deptList: [],
      loading: false,
      showAll: true,
      multipleSelection: [], //选中的table数据
    };
  },
  computed: {
    word: function () {
      if (this.showAll == false) {
        return "展开";
      } else {
        return "收起";
      }
    },
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      this.formInline.purchaseOrderNumber = id;
    }

    this._getWarehouseList();
    this._getData();
    this._getInitData();
    // let _this = this;
    // setTimeout(function () {
    //   _this.tableHeight = getTableHeight(
    //     "containerGroup",
    //     "searchBox",
    //     "pagation",
    //     "nevbox"
    //   );
    //   _this.closeSearch();
    // }, 100);
    // window.onresize = () => {
    //   this.tableHeight = getTableHeight(
    //     "containerGroup",
    //     "searchBox",
    //     "pagation",
    //     "nevbox"
    //   );
    // };
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
    closeSearch() {
      this.showAll = !this.showAll;
      var searchBoxHeght = document.getElementById("searchBox");
      if (this.showAll == false) {
        searchBoxHeght.style.height = 50 + "px";
      } else {
        searchBoxHeght.style.height = "100%";
      }
      this.tableHeight = getTableHeight(
        "containerGroup",
        "searchBox",
        "pagation",
        "nevbox"
      );
    },
    handleApply(row) {
      //审批
      this.$router.push({
        path: "/purchaseOrderApproval/approval",
        query: {
          id: row.id,
          status: row.approvalStatus,
        },
      });
    },
    _getInitData() {
      getInitData().then((res) => {
        // console.log('res',res)
        if (res.data.code === 200) {
          res.data.data.supplier.forEach((item) => {
            item.supplierId = item.supplierId + "";
          });
          res.data.data.warehouse.forEach((item) => {
            item.warehouseId = item.warehouseId + "";
          });
          res.data.data.sourceList.forEach((item) => {
            item.dictId = item.dictId + "";
          });
          res.data.data.deptList.forEach((item) => {
            item.dictId = item.dictId + "";
          });
          this.supplierList = res.data.data.supplier;
          this.deptList = res.data.data.deptList;
          this.warehouseList = res.data.data.warehouse;
          this.sourceList = res.data.data.sourceList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleSelectionChange(val) {
      //勾选复选框改变
      if (val && val.length > 0) {
        this.multipleSelection = val.map((item) => {
          return item.id;
        });
      }
    },
    selectionHandle() {
      //导出数据
      let params = {
        applicantName: this.formInline.applicantName,
        applyDepartmentCode: this.formInline.applyDepartmentCode,
        idList: this.multipleSelection,
        inputDate: this.formInline.inputDate,
        purchaseOrderNumber: this.formInline.purchaseOrderNumber,
        status: this.formInline.status,
        updateTime: this.formInline.updateTime,
        warehouseCode: this.formInline.warehouseCode,
      };
      if (this.excelBtns === "1") {
        //全部导出
        exportPurchaseOrder(params).then((res) => {
          let blob = new Blob([res.data], {
            type: res.data.type + "charset=utf-8",
          });
          let downloadLink = document.createElement("a");
          const URL = window.URL || window.webkitURL || window.moxURL;
          let downUrl = URL.createObjectURL(blob);
          downloadLink.href = downUrl;
          downloadLink.download = "订单审批.xlsx";
          downloadLink.click();
          window.URL.revokeObjectURL(downUrl);
          this.excelBtns = "";
        });
      } else {
        //批量导出

        if (this.multipleSelection.length === 0) {
          this.$message.warning("请勾选要导出的数据!");
          this.excelBtns = "";
          return false;
        } else {
          exportPurchaseOrder(params).then((res) => {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "订单审批.xlsx";
            downloadLink.click();
            window.URL.revokeObjectURL(downUrl);
            this.excelBtns = "";
          });
        }
      }
    },
    handleReset() {
      //重置
      for (let key in this.formInline) {
        this.formInline[key] = "";
      }
    },
    _getArg() {
      const {
        status,
        purchaseOrderNumber,
        applicantName,
        inputDate,
        updateTime,
        applyDepartmentCode,
        warehouseCode,
      } = this.formInline;
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
        path: "/purchaseOrderApproval/detail",
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
    // height: 45px;
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
#nevbox {
  margin-top: 15px;
  margin-bottom: 25px;

  .el-select {
    width: 130px;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0px;
    padding-left: 12px;
    height: 36px;
    color: #333;
    border-color: #cdcbcb;
  }

  .el-select .el-input .el-select__caret {
    color: #333;
    line-height: 36px;
  }

  .el-input__inner::placeholder {
    color: #333;
  }

  /* 谷歌 */
  .el-input__inner::-webkit-input-placeholder {
    color: #333;
  }

  /* 火狐 */
  .el-input__inner:-moz-placeholder {
    color: #333;
  }

  /*ie*/
  .el-input__inner:-ms-input-placeholder {
    color: #333;
  }
}
</style>