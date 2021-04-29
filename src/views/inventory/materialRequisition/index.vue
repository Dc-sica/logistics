
<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="领用单号：" prop="orderId">
          <el-input
            v-model="formInline.orderId"
            placeholder="请输入领用单号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="申请人：" label-width="82px" prop="applicantName">
          <el-input
            v-model="formInline.applicantName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="领用部门：" prop="deptId">
          <el-select placeholder="请选择" clearable v-model="formInline.deptId">
            <el-option
              v-for="item in deptList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批人：" prop="approvalUserName">
          <el-input
            v-model="formInline.approvalUserName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="领用状态：" prop="approvalStatus">
          <el-select
            placeholder="请选择"
            clearable
            v-model="formInline.approvalStatus"
          >
            <el-option value="" label="全部"></el-option>
            <el-option value="0" label="待审批"> </el-option>
            <el-option value="1" label="已批准"> </el-option>
            <el-option value="2" label="已驳回"> </el-option>
            <el-option value="3" label="已撤回"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过账状态：" prop="applicationStatus">
          <el-select
            placeholder="请选择"
            clearable
            v-model="formInline.applicationStatus"
          >
            <el-option value="" label="全部"></el-option>
            <el-option value="0" label="未过账"> </el-option>
            <el-option value="1" label="已过账"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录单日期：">
          <el-col :span="11">
            <el-form-item prop="applyStartTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formInline.applyStartTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="applyEndTime">
              <el-date-picker
                placeholder="选择日期"
                v-model="formInline.applyEndTime"
                clearable
                value-format="yyyy-MM-dd"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="过账日期：">
          <el-col :span="11">
            <el-form-item prop="postStartDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="formInline.postStartDate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="postEndDate">
              <el-date-picker
                placeholder="选择日期"
                v-model="formInline.postEndDate"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="仓库：" label-width="82px">
          <el-select placeholder="请选择" v-model="formInline.warehouseId">
            <el-option
              v-for="item in warehouseList"
              :key="item.warehouseId"
              :label="item.name"
              :value="item.warehouseId"
            ></el-option>
          </el-select>
        </el-form-item>
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
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        stripe
        highlight-current-row
        border
        @selection-change="handleSelectionChange"
        height="0"
        isFillHeight
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="领用单号" prop="orderId"></el-table-column>
        <el-table-column label="领用部门" prop="deptName" width="100"></el-table-column>
        <el-table-column label="仓库" prop="name"></el-table-column>
        <el-table-column
          label="录用日期"
          show-overflow-tooltip
          prop="applicationTime"
        ></el-table-column>
        <el-table-column label="申请人" prop="userName" width="100"></el-table-column>
        <el-table-column
          label="审批人"
          prop="approvalUserName"
          width="100"
        ></el-table-column>
        <el-table-column
          label="审批日期"
          show-overflow-tooltip
          prop="approvalTime"
        ></el-table-column>
        <el-table-column label="过账日期" prop="postTime"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="领用状态" prop="approvalStatus" width="100">
          <template slot-scope="scope">
            {{
              scope.row.approvalStatus === 0
                ? "未审批"
                : scope.row.approvalStatus === 1
                ? "已批准"
                : scope.row.approvalStatus === 2
                ? "已驳回"
                : "已撤回"
            }}
          </template>
        </el-table-column>
        <el-table-column label="过账状态" prop="applicationStatus" width="100">
          <template slot-scope="scope">
            {{ scope.row.applicationStatus === 0 ? "未过账" : "已过账" }}
          </template>
        </el-table-column>
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
            <el-tooltip
              class="item"
              effect="dark"
              v-if="scope.row.approvalStatus === 0"
              content="撤回"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe633;'"
                @click="_backItemHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              v-if="scope.row.applicationStatus === 0"
              content="过账"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe64c;'"
                @click="_checkItemHandle(scope.row)"
              >
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
import { dictByCategoryId } from "./../../../apis/commonApi";
import { buildInit } from "./../../../apis/allocate/indexApi";
import {
  materialListPage,
  exportMaterialCollection,
  updateApprovalStatus,
  updateApplicationStatus,
} from "./../../../apis/materialRequisition/index";
export default {
  name: "materialRequisition", //物资领用
  components: {
    pagination,
  },
  data() {
    return {
      formInline: {
        orderId: "",
        startTime: null,
        endTime: null,
      },
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
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      deptList: [],
      loading: false,
    };
  },
  mounted() {
    this._dictByCategoryId();
    this.init();
    this._getData();
  },
  methods: {
    init() {
      buildInit().then((res) => {
        if (res.data.code === 200) {
          this.warehouseList = res.data.data.warehouseList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _dictByCategoryId() {
      let params = {
        categoryCode: "dept",
        status: 1,
      };
      dictByCategoryId(params).then((res) => {
        if (res.data.code === 200) {
          this.deptList = res.data.data && res.data.data.sysDictList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getArg() {
      const { startTime, endTime, applyTime, postDate } = this.formInline;
      if (!startTime) {
        this.formInline.startTime = "";
      } else {
        this.formInline.startTime = this.$moment(startTime).format(
          "YYYY-MM-DD"
        );
      }
      if (!endTime) {
        this.formInline.endTime = "";
      } else {
        this.formInline.endTime = this.$moment(endTime).format("YYYY-MM-DD");
      }
      return this.formInline;
    },
    _searchHandle() {
      this._getData();
    },
    _addItemHandle() {
      this.$router.push("/materialRequisition/add");
    },
    handleSelectionChange(val) {
      this.multVal = val;
    },
    selectionHandle() {
      let arg = this._getArg();
      let params = {
        ...arg,
        applicationCategory: 0,
        idList: [],
      };
      if (this.excelBtns === "1") {
        exportMaterialCollection(params).then((res) => {
          if (res.status === 201) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "物资领用.xlsx";
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
          exportMaterialCollection({ idList: idList }).then((res) => {
            if (res.status === 201) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "物资领用.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
              this.excelBtns = "";
            }
          });
        }
      }
    },
    _getData() {
      let arg = this._getArg();
      let params = {
        ...arg,
        applicationCategory: 0,
        size: this.pageSize,
        current: this.currentPage,
      };
      this.loading = true;
      materialListPage(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false;
      });
    },
    _itemDetailHandle(row) {
      this.$router.push({
        path: "/materialRequisition/detail-yes",
        query: {
          id: row.id,
          status: row.applicationStatus, // 0 未过账 1 已过账
        },
      });
    },
    _backItemHandle(row) {
      let _this = this;
      this.$confirm("确定后将不可撤销。", "确认要撤回吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateApprovalStatus(row).then((res) => {
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
    _checkItemHandle(row) {
      let params = {
        id: row.id,
      };
      updateApplicationStatus(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this._getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    reset() {
      this.formInline.orderId = "";
      this.formInline.applicantName = "";
      this.formInline.deptId = "";
      this.formInline.approvalUserName = "";
      this.formInline.approvalStatus = "";
      this.formInline.applicationStatus = "";
      this.formInline.applyStartTime = "";
      this.formInline.applyEndTime = "";
      this.formInline.postStartDate = "";
      this.formInline.postEndDate = "";
      this.formInline.warehouseId = "";
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
</style>
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
<style lang="less">
.date-form {
  width: 28%;
  .el-form-item__content {
    width: 77%;
  }
}
</style>