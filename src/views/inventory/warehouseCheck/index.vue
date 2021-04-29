<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="盘点单号：">
            <el-input
              placeholder="请输入"
              :clearable="true"
              v-model="searchForm.materialCheckNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="盘点仓库：">
            <el-select
              placeholder="请选择"
              v-model="searchForm.checkWarehouseId"
            >
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
          <el-form-item label="盘点人：" label-width="82px">
            <el-input
              placeholder="请输入"
              :clearable="true"
              v-model="searchForm.createBy"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="盘点部门：" prop="dept">
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
          <el-form-item label="状态：" class="statussel" prop="status">
            <el-select placeholder="请选择" v-model="searchForm.checkStatus">
              <el-option
                v-for="item in statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="单据来源：">
            <el-select placeholder="请选择" v-model="searchForm.source">
              <el-option :value="1" label="公众号"></el-option>
              <el-option :value="2" label="电脑端"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="盘点日期：">
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
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button icon="el-icon-plus" type="primary" @click="_addItemHandle"
          >新增</el-button
        >
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
        @selection-change="handleSelectionChange"
        isFillHeight
        height="0"
        size="mini"
        stripe
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          label="盘点单号"
          show-overflow-tooltip
          prop="materialCheckNumber"
        ></el-table-column>
        <el-table-column
          label="盘点仓库"
          prop="checkWarehouseName"
        ></el-table-column>
        <el-table-column label="盘点日期" prop="checkDate"></el-table-column>
        <el-table-column label="盘点人" prop="createBy"></el-table-column>
        <el-table-column label="盘点部门" prop="deptName"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="状态" prop="checkStatusName"> </el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column>
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
              content="盘点"
              v-if="scope.row.checkStatus === 1"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe67f;'"
                @click="_checkHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="关闭"
              v-if="scope.row.checkStatus === 1"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe647;'"
                @click="_cancelHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="完成盘点"
              v-if="scope.row.checkStatus === 1"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe645;'"
                @click="_finishHandle(scope.row)"
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
import { buildInit } from "./../../../apis/allocate/indexApi";
import {
  getMaterialCheckPage,
  exportMaterialCheck,
  updateCheck,
} from "./../../../apis/allocate/warehouseCheckApi";

export default {
  name: "warehouseCheck",
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        number: "",
        applyName: "",
        dept: "",
        checkStatus: "",
        inTime: "",
        sureTime: "",
      },
      statusList: [
        {
          id: 1,
          name: "盘点中",
        },
        {
          id: 2,
          name: "盘点完成",
        },
        {
          id: 3,
          name: "已关闭",
        },
      ],
      deptList: [],
      warehouseList: [],
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
      let params = {
        materialCheckNumber: this.searchForm.materialCheckNumber,
        createBy: this.searchForm.createBy,
        deptId: this.searchForm.deptId,
        checkStatus: this.searchForm.checkStatus,
        source: this.searchForm.source,
        checkWarehouseId: this.searchForm.checkWarehouseId,
        checkStartDate: this.searchForm.inTime ? this.searchForm.inTime[0] : "",
        checkEndDate: this.searchForm.inTime ? this.searchForm.inTime[1] : "",
        current: this.currentPage,
        size: this.pageSize,
      };
      getMaterialCheckPage(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _addItemHandle() {
      this.$router.push("/warehouseCheck/add");
    },
    _toDetailHandle(row) {
      this.$router.push({
        path: "/warehouseCheck/detail",
        query: {
          id: row.id,
        },
      });
    },
    _checkHandle(row) {
      this.$router.push({
        path: "/warehouseCheck/edit",
        query: {
          id: row.id,
        },
      });
    },
    _cancelHandle(row) {
      let _this = this;
      this.$confirm("关闭后将不可撤销。", "确认要关闭吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.checkStatus = 3;
          updateCheck(row).then((res) => {
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
    _finishHandle(row) {
      let _this = this;
      this.$confirm("完成后将不可撤销。", "确认完成吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          row.checkStatus = 2;
          updateCheck(row).then((res) => {
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
    handleSelectionChange(val) {
      this.multVal = val;
    },
    selectionHandle() {
      let params = {
        materialCheckNumber: this.searchForm.materialCheckNumber,
        createBy: this.searchForm.createBy,
        deptId: this.searchForm.deptId,
        checkStatus: this.searchForm.checkStatus,
        source: this.searchForm.source,
        checkWarehouseId: this.searchForm.checkWarehouseId,
        checkStartDate: this.searchForm.inTime ? this.searchForm.inTime[0] : "",
        checkEndDate: this.searchForm.inTime ? this.searchForm.inTime[1] : "",
        idList: [],
      };
      if (this.excelBtns === "1") {
        exportMaterialCheck(params).then((res) => {
          if (res.status === 201) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "库存盘点.xlsx";
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
          exportMaterialCheck({ idList: idList }).then((res) => {
            if (res.status === 201) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "库存盘点.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
              this.excelBtns = "";
            }
          });
        }
      }
    },
    _searchHandle() {
      this.currentPage = 1;
      this._getData();
    },
    reset() {
      this.searchForm.materialCheckNumber = "";
      this.searchForm.createBy = "";
      this.searchForm.deptId = "";
      this.searchForm.checkStatus = "";
      this.searchForm.source = "";
      this.searchForm.checkWarehouseId = "";
      this.searchForm.inTime = "";
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