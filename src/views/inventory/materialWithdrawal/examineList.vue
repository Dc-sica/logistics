
<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="退库单号：">
          <el-input
            v-model="formInline.orderId"
            placeholder="请输入退库单号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="领用人：">
          <el-input
            v-model="formInline.applicantName"
            placeholder="请输入领用单号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="退库科室：">
          <el-select placeholder="请选择" clearable v-model="formInline.deptId">
            <el-option
              v-for="item in deptList"
              :key="item.code"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审批人：">
          <el-input
            v-model="formInline.approvalUserName"
            placeholder="请输入领用单号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="审批状态：">
          <el-select
            placeholder="请选择"
            clearable
            v-model="formInline.approvalStatus"
          >
            <el-option value="" label="全部"></el-option>
            <el-option value="0" label="未过账"> </el-option>
            <el-option value="1" label="已过账"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录单日期：">
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formInline.applyStartTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker
                placeholder="选择日期"
                v-model="formInline.applyEndTime"
                clearable
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="仓库：" prop="warehouseId">
          <el-select
            placeholder="请选择"
            v-model="formInline.warehouseId"
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
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
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
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="退库单号" prop="orderId"></el-table-column>
        <el-table-column label="退库科室" prop="deptName"></el-table-column>
        <el-table-column label="仓库" prop="name"></el-table-column>
        <el-table-column
          label="录入日期"
          prop="applicationTime"
        ></el-table-column>
        <el-table-column label="申请人" prop="userName"></el-table-column>
        <el-table-column label="审批日期" prop="approvalTime"></el-table-column>
        <el-table-column label="过账日期" prop="postTime"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="审批状态" prop="approvalStatus">
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
              content="审批"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe666;'"
                @click="_examineItemHandle(scope.row)"
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
import { dictByCategoryId, getWarehouseList } from "./../../../apis/commonApi";
import {
  materialListPage,
  exportMaterialCollection,
} from "./../../../apis/materialRequisition/index";
export default {
  name: "examineList", //物资领用
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
      total: 0,
      pageSize: 20,
      currentPage: 1,
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
      tableData: [],
      deptList: [],
      warehouseList: [],
      loading: false,
      multVal: [],
    };
  },
  mounted() {
    this._dictByCategoryId();
    this._getWarehouseList();
    this._getData();
  },
  methods: {
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
      const { startTime, endTime } = this.formInline;
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
    _getData() {
      let arg = this._getArg();
      let params = {
        ...arg,
        applicationCategory: 1,
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
        path: "/materialWithdrawal/examineDetail",
        query: {
          id: row.id,
          status: row.applicationStatus, // 0 未过账 1 已过账
        },
      });
    },
    _examineItemHandle(row) {
      this.$router.push({
        path: "/materialWithdrawal/examine",
        query: {
          id: row.id,
        },
      });
    },
    handleSelectionChange(val) {
      this.multVal = val;
    },
    selectionHandle() {
      let arg = this._getArg();
      let params = {
        ...arg,
        applicationCategory: 1,
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
            downloadLink.download = "物资退库审批.xlsx";
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
              downloadLink.download = "物资退库审批.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
              this.excelBtns = "";
            }
          });
        }
      }
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
    padding: 10px 15px;
    margin-bottom: 15px;
  }
  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
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