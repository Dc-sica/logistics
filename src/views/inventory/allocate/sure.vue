<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="调拨单号：" class="statussel">
            <el-input
              placeholder="请输入"
              :clearable="true"
              v-model="searchForm.materialTransferNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="申请人：" class="statussel" label-width="82px">
            <el-input
              placeholder="请输入"
              :clearable="true"
              v-model="searchForm.createdBy"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="申请部门：" class="statussel">
            <el-select placeholder="请选择" v-model="searchForm.deptId">
              <el-option
                v-for="item in deptList"
                :key="item.dictId"
                :label="item.name"
                :value="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="状态：" class="statussel">
            <el-select placeholder="请选择" v-model="searchForm.approveStatus">
              <el-option
                v-for="item in approveStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="收货仓库：" class="statussel">
            <el-select placeholder="请选择" v-model="searchForm.transferTo">
              <el-option
                v-for="item in warehouseList"
                :key="item.warehouseId"
                :label="item.name"
                :value="item.warehouseId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发货仓库：" class="statussel">
            <el-select placeholder="请选择" v-model="searchForm.transferFrom">
              <el-option
                v-for="item in warehouseList"
                :key="item.warehouseId"
                :label="item.name"
                :value="item.warehouseId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="录单日期：">
            <el-date-picker
              v-model="searchForm.inTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="确认日期：">
            <el-date-picker
              v-model="searchForm.sureTime"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
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
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        stripe
        size="mini"
        highlight-current-row
        height="0"
        isFillHeight
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="调拨单号"
          show-overflow-tooltip
          prop="materialTransferNumber"
        ></el-table-column>
        <el-table-column label="申请部门" prop="deptName"></el-table-column>
        <el-table-column label="录单日期" prop="transferDate"></el-table-column>
        <el-table-column label="申请人" prop="createBy"></el-table-column>
        <el-table-column
          label="发货仓库"
          prop="transferFromName"
        ></el-table-column>
        <el-table-column
          label="收货仓库"
          prop="transferToName"
        ></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="状态" prop="statusName"> </el-table-column>
        <el-table-column label="确认日期" prop="approveTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe67e;'"
                @click="_toDetailHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              v-if="scope.row.approveStatus === 1"
              content="确认"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe690;'"
                @click="_sureItemHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              v-if="scope.row.approveStatus === 1"
              content="驳回"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe633;'"
                style="font-size: 12px"
                @click="_backItemHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
      :total="total"
      :page="currentPage"
      :pageSize="pageSize"
      @pagation="pagationChange"
    />
    </Container>
  </ContainerGroup>
</template>

<script>
import pagination from "./../../../components/pagination/index";
import {
  buildInit,
  getTransferPage,
  exportTransfer,
  updateStatus,
  updateTransfer,
} from "./../../../apis/allocate/indexApi";

export default {
  name: "allocate",
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        number: "",
        applyName: "",
        dept: "",
        status: "",
        inTime: "",
        sureTime: "",
      },
      deptList: [],
      warehouseList: [],
      approveStatusList: [
        {
          name: "未确认",
          id: 1,
        },
        {
          name: "已确认",
          id: 2,
        },
        {
          name: "已驳回",
          id: 3,
        },
        {
          name: "已撤回",
          id: 4,
        },
      ],
      excelBtns: "",
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
      multVal: [],
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 20,
    };
  },
  created() {
    this.init();
    this._getData();
  },
  methods: {
    init() {
      buildInit().then((res) => {
        if (res.data.code === 200) {
          this.deptList = res.data.data.deptList;
          this.warehouseList = res.data.data.warehouseList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getData() {
      let parms = {
        materialTransferNumber: this.searchForm.materialTransferNumber,
        createdBy: this.searchForm.createdBy,
        deptId: this.searchForm.deptId,
        approveStatus: this.searchForm.approveStatus,
        transferTo: this.searchForm.transferTo,
        transferFrom: this.searchForm.transferFrom,
        transferStartTime: this.searchForm.inTime
          ? this.searchForm.inTime[0]
          : "",
        transferEndTime: this.searchForm.inTime
          ? this.searchForm.inTime[1]
          : "",
        approveStartTime: this.searchForm.sureTime
          ? this.searchForm.sureTime[0]
          : "",
        approveEndTime: this.searchForm.sureTime
          ? this.searchForm.sureTime[1]
          : "",
        current: this.currentPage,
        size: this.pageSize,
      };
      getTransferPage(parms).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    selectionHandle() {
      let params = {
        materialTransferNumber: this.searchForm.materialTransferNumber,
        createdBy: this.searchForm.createdBy,
        deptId: this.searchForm.deptId,
        approveStatus: this.searchForm.approveStatus,
        transferTo: this.searchForm.transferTo,
        transferFrom: this.searchForm.transferFrom,
        transferStartTime: this.searchForm.inTime[0],
        transferEndTime: this.searchForm.inTime[1],
        approveStartTime: this.searchForm.sureTime[0],
        approveEndTime: this.searchForm.sureTime[1],
        idList: [],
      };
      if (this.excelBtns === "1") {
        exportTransfer(params).then((res) => {
          if (res.status === 201) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "库存调拨确认.xlsx";
            downloadLink.click();
            window.URL.revokeObjectURL(downUrl);
            this.excelBtns = "";
          }
        });
      } else {
        if (this.multVal === undefined || this.multVal.length === 0) {
          this.$message.warning("请选择要导出的数据");
          this.excelBtns = "";
          return false;
        } else {
          let idList = [];
          this.multVal.forEach((element) => {
            idList.push(element.id);
          });
          exportTransfer({ idList: idList }).then((res) => {
            if (res.status === 201) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "库存调拨确认.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
              this.excelBtns = "";
            }
          });
        }
      }
    },
    handleSelectionChange(val) {
      this.multVal = val;
    },
    _toDetailHandle(row) {
      this.$router.push({
        path: "/allocatesure/detail",
        query: {
          id: row.id,
        },
      });
    },
    _sureItemHandle(row) {
      let params = {
        id: row.id,
        status: 2,
      };
      updateStatus(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this._getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _backItemHandle(row) {
      let _this = this;
      this.$confirm("确定后将不可撤销。", "确认要驳回吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.approveStatus = 3;
          updateTransfer(row).then((res) => {
            if (res.data.code === 200) {
              _this._getData();
            } else {
              _this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    _searchHandle() {
      this.currentPage = 1;
      this._getData();
    },
    reset() {
      this.searchForm.materialTransferNumber = "";
      this.searchForm.createdBy = "";
      this.searchForm.deptId = "";
      this.searchForm.approveStatus = "";
      this.searchForm.transferTo = "";
      this.searchForm.transferFrom = "";
      this.searchForm.inTime = "";
      this.searchForm.sureTime = "";
    },
    pagationChange(payload) {
      this.currentPage = payload.page;
      this.pageSize = payload.pageSize;
      this._getData();
    },
  },
};
</script>
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
.statussel {
  .el-form-item__content {
    width: 69%;
  }
}
</style>
<style lang="less" scoped>
.wrapper {
  .wrapper-form {
    background: #fff;
    padding: 10px 15px;
    margin-bottom: 15px;
  }
  .warpper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
    .addBtn {
      background: #1d93a8;
      color: #fff;
      height: 36px;
      float: left;
      margin-right: 20px;
      padding: 10px 20px;
    }
  }
}
</style>