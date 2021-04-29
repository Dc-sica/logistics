<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm">
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
        <el-col :span="5">
          <el-form-item label="仓库：">
            <el-select placeholder="请选择" v-model="searchForm.warehouseId">
              <el-option
                v-for="item in warehouseList"
                :key="item.warehouseId"
                :label="item.name"
                :value="item.warehouseId"
              ></el-option>
            </el-select>
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
        isFillHeight
        height="0"
        size="mini"
        stripe
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <template v-for="(item, index) in rowsData">
          <el-table-column
            :prop="item.name"
            :label="item.tableName"
            :key="index"
          >
          </el-table-column>
        </template>
      </el-table>
    </Container>
  </ContainerGroup>
</template>

<script>
import { buildInit } from "./../../../apis/allocate/indexApi";
import {
  getCheckAnalysis,
  exportCheckAnalysis,
} from "./../../../apis/allocate/warehouseCheckApi";

export default {
  name: "analysisReport",
  data() {
    return {
      searchForm: {
        inTime: "",
        warehouseId: "",
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
      tableData: [],
      rowsData: [],
      multVal: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
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
          this.warehouseList = res.data.data.warehouseList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getData() {
      let parms = {
        startDate: this.searchForm.inTime ? this.searchForm.inTime[0] : "",
        endDate: this.searchForm.inTime ? this.searchForm.inTime[1] : "",
        warehouseId: this.searchForm.warehouseId,
      };
      getCheckAnalysis(parms).then((res) => {
        if (res.data.code === 200) {
          this.rowsData = res.data.data.checkAnalysisList;
          this.tableData = res.data.data.dataList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleSelectionChange(val) {
      this.multVal = val;
    },
    _searchHandle() {
      this.currentPage = 1;
      this._getData();
    },
    reset() {
      this.searchForm.inTime = "";
      this.searchForm.warehouseId = "";
    },
    selectionHandle() {
      let params = {
        startDate: this.searchForm.inTime ? this.searchForm.inTime[0] : "",
        endDate: this.searchForm.inTime ? this.searchForm.inTime[1] : "",
        warehouseId: this.searchForm.warehouseId,
        dataMapList: [],
      };
      if (this.excelBtns === "1") {
        exportCheckAnalysis(params).then((res) => {
          if (res.status === 201) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "物资消耗分析报表.xlsx";
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
          exportCheckAnalysis({ dataMapList: this.multVal }).then((res) => {
            if (res.status === 201) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "物资消耗分析报表.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
              this.excelBtns = "";
            }
          });
        }
      }
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
</style>