<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="auto">
        <el-form-item label="任务编号：" >
          <el-input
            placeholder="请输入"
            :clearable="true"
            v-model="searchForm.taskOrderNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请病区：" >
          <el-select placeholder="请选择" v-model="searchForm.areaId">
            <el-option
              v-for="item in areaList"
              :key="item.dictId"
              :label="item.name"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人：" >
          <el-input
            placeholder="请输入"
            :clearable="true"
            v-model="searchForm.applicantUser"
          ></el-input>
        </el-form-item>
        <el-form-item label="任务类型：" >
          <el-select
            placeholder="请选择"
            style="width: 100%"
            v-model="searchForm.taskType"
          >
            <el-option
              v-for="item in taskTypeList"
              :key="item.dictId"
              :label="item.name"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.urgentLevel">
            <el-option
              v-for="item in urgentLevel"
              :key="item.dictId"
              :label="item.name"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受理状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.handlerStatus">
            <el-option
              v-for="item in handlerStatus"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.source">
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间：" v-if="showAll">
          <el-date-picker
            style="width: 100%"
            v-model="searchForm.createTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受理时间：" v-if="showAll">
          <el-date-picker
            style="width: 100%"
            v-model="searchForm.handleTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{ word }}
            <i
              :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"
            ></i>
          </el-button>
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
        v-loading="loading"
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="任务编号" width="200px">
          <template slot-scope="scope">
            {{ scope.row.taskOrderNumber }}
          </template>
        </el-table-column>
        <el-table-column label="申请病区" prop="areaName"></el-table-column>
        <el-table-column
          label="申请人"
          prop="applicantUserName"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          prop="applicationPhone"
        ></el-table-column>
        <el-table-column label="任务类型" prop="taskTypeName"></el-table-column>
        <el-table-column
          label="紧急程度"
          prop="urgentLevelName"
        ></el-table-column>
        <el-table-column
          label="提交时间"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>
        <el-table-column label="受理状态">
          <template slot-scope="scope">
            <span>{{
              scope.row.handlerStatus === 1
                ? "未受理"
                : scope.row.handlerStatus === 2
                ? "已受理"
                : "已驳回"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="受理时间"
          show-overflow-tooltip
          prop="handlerTime"
        ></el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{ scope.row.source === 1 ? "公众号" : "电脑端" }}</span>
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
              v-if="scope.row.handlerStatus === 1"
              content="审核"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe666;'"
                @click="_editItemHandle(scope.row)"
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
import pagination from "../../../components/pagination/index";
import {
  pageListInit,
  getListPage,
  exportTaskOrderHandleExcel,
} from "./../../../apis/projectRegister/indexApi";

export default {
  name: "allPart",
  components: {
    pagination,
  },
  data() {
    return {
      userId: "",
      deptId: "",
      areaList: [],
      taskStatus: [],
      handlerStatus: [
        {
          code: 1,
          value: "未受理",
        },
        {
          code: 2,
          value: "已受理",
        },
        {
          code: 3,
          value: "已驳回",
        },
      ],
      taskTypeList: [],
      urgentLevel: [],
      searchForm: {
        taskOrderNumber: "",
        areaId: "",
        applicantUser: "",
        taskType: "",
        source: "",
        urgentLevel: "",
        handlerStatus: "",
        createTime: "",
        handleTime: "",
      },
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
      loading: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 20,
      evaluate: "",
      showAll: true,
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
    const { userId, deptId } = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = userId;
    this.deptId = deptId;
    this.init();
    this._getData();
    this.$nextTick(function () {
      this.closeSearch();
    });
  },
  methods: {
    closeSearch () {
      this.showAll = !this.showAll
    },
    init() {
      pageListInit().then((res) => {
        if (res.data.code === 200) {
          this.areaList = res.data.data.patientArea;
          this.taskStatus = res.data.data.taskStatus;
          this.urgentLevel = res.data.data.urgentLevel;
          this.taskTypeList = res.data.data.taskType;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getData() {
      let parms = {
        taskOrderNumber: this.searchForm.taskOrderNumber,
        areaId: this.searchForm.areaId,
        applicantUser: this.searchForm.applicantUser,
        taskType: this.searchForm.taskType,
        source: this.searchForm.source,
        urgentLevel: this.searchForm.urgentLevel,
        handlerStatus: this.searchForm.handlerStatus,
        startCreateTime: this.searchForm.createTime
          ? this.searchForm.createTime[0]
          : "",
        endCreateTime: this.searchForm.createTime
          ? this.searchForm.createTime[1]
          : "",
        startHandleTime: this.searchForm.handleTime
          ? this.searchForm.handleTime[0]
          : "",
        endHandleTime: this.searchForm.handleTime
          ? this.searchForm.handleTime[1]
          : "",
        current: this.currentPage,
        size: this.pageSize,
      };
      getListPage(parms).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _toDetailHandle(row) {
      this.$router.push({
        path: "/projectAccept/detail",
        query: {
          id: row.id,
          type: row.taskTypeName,
        },
      });
    },
    _editItemHandle(row) {
      this.$router.push({
        path: "/projectAccept/accept",
        query: {
          id: row.id,
          type: row.taskTypeName,
        },
      });
    },
    _searchHandle() {
      this.currentPage = 1;
      this._getData();
    },
    reset() {
      this.searchForm.taskOrderNumber = "";
      this.searchForm.areaId = "";
      this.searchForm.applicantUser = "";
      this.searchForm.taskType = "";
      this.searchForm.source = "";
      this.searchForm.urgentLevel = "";
      this.searchForm.handlerStatus = "";
      this.searchForm.createTime = "";
      this.searchForm.handleTime = "";
    },
    handleSelectionChange(val) {
      this.multVal = val;
    },
    selectionHandle() {
      let params = {
        taskOrderNumber: this.searchForm.taskOrderNumber,
        areaId: this.searchForm.areaId,
        applicantUser: this.searchForm.applicantUser,
        taskType: this.searchForm.taskType,
        source: this.searchForm.source,
        urgentLevel: this.searchForm.urgentLevel,
        handlerStatus: this.searchForm.handlerStatus,
        startCreateTime: this.searchForm.createTime
          ? this.searchForm.createTime[0]
          : "",
        endCreateTime: this.searchForm.createTime
          ? this.searchForm.createTime[1]
          : "",
        startHandleTime: this.searchForm.handleTime
          ? this.searchForm.handleTime[0]
          : "",
        endHandleTime: this.searchForm.handleTime
          ? this.searchForm.handleTime[1]
          : "",
      };
      if (this.excelBtns === "1") {
        exportTaskOrderHandleExcel(params).then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "任务受理列表.xlsx";
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
          exportTaskOrderHandleExcel({ idList: idList }).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "任务受理列表.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
              this.excelBtns = "";
            }
          });
        }
      }
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
#navbox {
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
.statussel51 {
  width: 100%;
  .el-form-item__content {
    width: 51%;
  }
}
.statussel79 {
  .el-form-item__content {
    width: 79%;
  }
}
</style>
<style lang="less" scoped>
.wrapper {
  .wrapper-form {
    background: #fff;
    padding: 10px 15px;
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
  .warn {
    background: #ff5656;
    border-radius: 7px;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
  }
}
.drawer-wrapper {
  /deep/ .el-drawer__body {
    padding: 5px 10px;
  }
  /deep/ .el-drawer__header {
    border-bottom: 1px solid #e5e5e5;
    background: #1d93a8;
    color: #fff;
    padding: 10px 20px;
    margin-bottom: 15px;
    span:focus {
      outline: none;
    }
  }
  .group {
    margin: 30px 0 50px;
    padding-left: 18px;
    .sp {
      float: left;
      width: 60px;
    }
    .textarea {
      float: left;
      width: 85%;
    }
  }
  .drawer-button {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #e8eaed;
    width: 100%;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>