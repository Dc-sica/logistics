<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        label-width="120px"
      >
        <el-col :span="6">
          <el-form-item label="采购订单号：">
            <el-input
              placeholder="请输入采购订单号"
              v-model="formInline.purchaseOrderNumber"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人/收货人：">
            <el-input
              placeholder="请输入申请人"
              v-model="formInline.applicantName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请部门：">
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
          <el-form-item label="录单日期：">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="formInline.inputDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="收货日期：">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="formInline.receivingDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="收货仓库：">
            <el-select
              placeholder="请选择"
              v-model="formInline.warehouseCode"
              clearable
            >
              <el-option
                v-for="item in warehouseList"
                :key="item.warehouseId"
                :value="item.code"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="采购收货单号：" prop="purchaseReceiptNumber">
            <el-input
              placeholder="请输入采购收货单号"
              v-model="formInline.purchaseReceiptNumber"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="订单状态：">
            <el-select
              placeholder="请选择"
              clearable
              v-model="formInline.purchaseOrderStatus"
            >
              <el-option value="1" label="未收货"></el-option>
              <el-option value="2" label="收货中"></el-option>
              <el-option value="3" label="已完成"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-show="showAll">
          <el-form-item label="过账状态：">
            <el-select
              placeholder="请选择"
              clearable
              v-model="formInline.status"
            >
              <el-option value="1" label="未过账"></el-option>
              <el-option value="2" label="已过账"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="showBtn">
          <el-form-item style="margin-left: 10%">
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
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        row-key="id"
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        stripe
        size="mini"
        highlight-current-row
        height="0"
        isFillHeight
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-child">
              <el-table
                :data="props.row.value"
                :show-header="false"
                :row-key="props.row.purchaseOrderNumber"
                style="width: 100%"
              >
                <el-table-column width="258">
                  <template v-slot="scope">
                    采购收货单号:{{ scope.row.purchaseReceiptNumber }}
                  </template>
                </el-table-column>
                <el-table-column width="290">
                  <template v-slot="scope">
                    收货人:{{ scope.row.consigneeName }}
                  </template>
                </el-table-column>
                <el-table-column width="500" style="position: relative">
                  <template v-slot="scope">
                    收货日期:{{ scope.row.receivingDate }}
                    <span
                      style="margin-left: 30%; position: absolute; right: 20%"
                      >过账状态:{{
                        scope.row.status === 1 ? "未过账" : "已过账"
                      }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-tooltip
                      class="item-button"
                      effect="dark"
                      content="查看"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        @click="_itemDetailHandle(scope.row, 'child')"
                      >
                        <i class="el-icon-tickets"></i>
                      </el-button>
                    </el-tooltip>
                    <el-tooltip
                      class="item-button"
                      v-if="scope.row.status === 1"
                      effect="dark"
                      content="过账"
                      placement="top"
                    >
                      <el-button
                        type="text"
                        @click="_itemPostHandle(scope.row)"
                      >
                        <i class="el-icon-collection"></i>
                      </el-button>
                    </el-tooltip>
                    <!-- v-if="scope.row.status === 1" -->
                    <el-tooltip
                      class="item-button"
                      effect="dark"
                      content="生成采购退货单"
                      placement="top"
                    >
                      <el-button type="text" @click="_createReturn(scope.row)">
                        <i class="iconfont" style="font-size: 12px">&#xe642;</i>
                      </el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="采购订单号"
          prop="purchaseOrderNumber"
          width="160"
        ></el-table-column>
        <el-table-column
          label="申请部门"
          prop="applyDepartmentName"
          width="100"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="userName"
          width="110"
        ></el-table-column>
        <el-table-column
          label="录单日期"
          prop="inputDate"
          width="180"
        ></el-table-column>
        <el-table-column
          label="收货仓库"
          prop="warehouseName"
          width="180"
        ></el-table-column>
        <el-table-column label="备注" prop="remarks"></el-table-column>
        <el-table-column
          label="订单状态"
          prop="purchaseOrderStatus"
          width="100"
        >
          <template slot-scope="scope">
            {{
              scope.row.purchaseOrderStatus === 1
                ? "未收货"
                : scope.row.purchaseOrderStatus === 2
                ? "收货中"
                : "已完成"
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-tooltip
              class="item-button"
              effect="dark"
              content="查看"
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
              v-if="scope.row.status !== 3"
              effect="dark"
              content="收货"
              placement="top"
            >
              <el-button type="text" @click="handleReceiving(scope.row)">
                <i class="iconfont" style="font-size: 13px">&#xe684;</i>
              </el-button>
            </el-tooltip>
            <!-- <el-tooltip class="item-button" v-if="scope.row.status === 1" effect="dark" content="过账" placement="top">
                  <el-button type="text" @click="_itemPostHandle(scope.row)">
                    <i class="iconfont" style="font-size:16px;">&#xe62e;</i>
                  </el-button>
                </el-tooltip> -->
            <el-tooltip
              class="item-button"
              v-if="scope.row.status === 2"
              effect="dark"
              content="生成采购退货单"
              placement="top"
            >
              <el-button type="text" @click="_createReturn(scope.row)">
                <i class="iconfont" style="font-size: 12px">&#xe642;</i>
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
import stream from "./stream";
import { getInitData } from "./../../../apis/outAndIn/index";
import { getWarehouseList, getOrderTree } from "./../../../apis/commonApi";
import {
  getList,
  updateByPurchaseReceiptOrderNum,
} from "./../../../apis/purchaseReceipt";
export default {
  name: "purchaseReceipt", //采购收货
  components: {
    pagination,
    stream,
  },
  data() {
    return {
      deptList: [],
      formInline: {
        startDate: null,
        endDate: null,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      warehouseList: [],
      tableHeight: "0px",
      tableData: [],
      drawerView: false,
      dataList: [],
      loading: false,
      showAll: false,
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
    this._getWarehouseList();
    this._getData();
    this._getInitData();
  },
  methods: {
    closeSearch() {
      this.showAll = !this.showAll;
    },
    _itemPostHandle(row) {
      //过账
      let param = {
        purchaseReceiptNumber: row.purchaseReceiptNumber,
        status: 2,
      };
      updateByPurchaseReceiptOrderNum(param).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this._getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },

    handleReceiving(row) {
      //收货
      this.$router.push({
        path: "/purchaseReceipt/add",
        query: {
          id: row.purchaseOrderNumber,
          // purchaseOrderNumber: row.purchaseOrderNumber,
          type: 1,
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
    handleReset() {
      //重置
      for (let key in this.formInline) {
        this.formInline[key] = "";
      }
    },
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
        ...this.formInline,
        current: this.currentPage,
        size: this.pageSize,
      };
      this.loading = true;
      getList(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.pageSize = res.data.data.size;
          this.currentPage = res.data.data.current;
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false;
      });
    },
    _itemDetailHandle(row, type) {
      //查看详情
      if (type === "child") {
        this.$router.push({
          path: "/purchaseReceipt/detail",
          query: {
            id: row.id,
            status: row.status,
            orderNum: row.purchaseOrderNumber,
          },
        });
      } else {
        this.$router.push({
          path: "/purchaseOrder/detail",
          query: {
            id: row.purchaseOrderNumber,
            status: row.status,
            toType: 1,
          },
        });
      }
    },
    _ticketStream(row) {
      if (!row.purchaseRequestNumber) {
        this.$message.error("采购订单号不存在，请重试");
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
    // 退货单
    _createReturn(row) {
      this.$router.push({
        path: "purchaseReceipt/return",
        query: {
          id: row.id,
          purchaseOrderNumber: row.purchaseOrderNumber,
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
.table-child/deep/.el-table--border td,
.el-table--border th,
.el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
  border-right: 1px solid white;
}

.wrapper {
  .wrapper-form {
    background: #fff;
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

/deep/.el-table__expanded-cell {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
}
</style>
<style lang="less">
.date-form {
  width: 28%;

  .el-form-item__content {
    width: 77%;
  }

  .el-drawer__header {
    span:focus {
      outline: none;
    }
  }
}
</style>