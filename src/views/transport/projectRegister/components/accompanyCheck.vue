<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="auto">
        <el-form-item label="任务编号：">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.taskOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="申请病区：">
          <el-select placeholder="请选择" v-model="searchForm.areaId">
            <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人：">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.applicantUser"></el-input>
        </el-form-item>
        <el-form-item label="住院号：">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.hospitalNo"></el-input>
        </el-form-item>
        <el-form-item label="病床号：" v-if="showAll">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.bedNo"></el-input>
        </el-form-item>
        <el-form-item label="病人姓名：" v-if="showAll">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="检查项目：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.checkId">
            <el-option v-for="item in checkTypeList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.orderStatus">
            <el-option v-for="item in taskStatus" :key="item.code" :label="item.message" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.source">
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否紧急：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.urgentLevel">
            <el-option v-for="item in urgentLevel" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="陪检时间：" v-if="showAll">
          <el-date-picker style="width: 100%" v-model="searchForm.checkTime" type="datetimerange" value-format="yyyy-MM-dd HH:mm" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{ word }}
            <i :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container >
      <OperationContainer id="nevboxs">
        <el-button icon="el-icon-plus" type="primary" @click="_addItemHandle">新增</el-button>
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table
        :data="tableData"
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
        <el-table-column label="任务编号" width="150px">
          <template slot-scope="scope">
            {{ scope.row.taskOrderNumber }}
          </template>
        </el-table-column>
        <el-table-column label="申请病区" prop="areaName"></el-table-column>
        <el-table-column label="申请人" prop="applicantUserName"></el-table-column>
        <el-table-column label="联系电话" show-overflow-tooltip prop="applicationPhone"></el-table-column>
        <el-table-column label="住院号" prop="hospitalNo"></el-table-column>
        <el-table-column label="病床号" prop="bedNo"></el-table-column>
        <el-table-column label="病人姓名" prop="patientName"></el-table-column>
        <el-table-column label="检查项目" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{ item.checkName }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="目的地" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{ item.destinationName }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="陪检时间" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{ item.keepTime }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="紧急程度" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item, index) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{ item.urgentFlag == "0" ? "不紧急" : "紧急" }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="任务状态" prop="orderStatusName">
        </el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{ scope.row.source === 1 ? "公众号" : "电脑端" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.orderStatus === 1" content="编辑" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.orderStatus === 1" content="取消申请" placement="top">
              <el-button type="text" class="iconfont" style="font-size: 12px" v-html="'&#xe65f;'" @click="_cancelApplyHandle(scope.row)">
              </el-button>>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
      </div>
    </Container>
  </ContainerGroup>
</template>

<script>
  import pagination from "../../../../components/pagination/index";
  import {
    pageListInit,
    getListPage,
    exportTaskOrderKeepExcel,
    taskOrderCancel,
  } from "../../../../apis/projectRegister/indexApi";

  export default {
    name: "accompanyCheck",
    components: {
      pagination,
    },
    data() {
      return {
        userId: "",
        deptId: "",
        deptList: [],
        areaList: [],
        taskStatus: [],
        urgentLevel: [],
        searchForm: {
          taskOrderNumber: "",
          areaId: "",
          applicantUser: "",
          hospitalNo: "",
          bedNo: "",
          patientName: "",
          checkId: "",
          orderStatus: "",
          source: "",
          urgentLevel: "",
          checkTime: "",
        },
        excelBtns: "",
        excelBtnList: [{
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
        evaluate: "",
        showAll: true,
        taskType: "",
        checkTypeList: [],
      };
    },
    computed: {
      word: function() {
        if (this.showAll == false) {
          return "展开";
        } else {
          return "收起";
        }
      },
    },
    mounted() {
      const {
        userId,
        deptId
      } = JSON.parse(localStorage.getItem("userInfo"));
      this.userId = userId;
      this.deptId = deptId;
      this.init();
      this.$nextTick(function() {
        this.closeSearch();
      });
    },
    methods: {
      closeSearch() {
        this.showAll = !this.showAll;
      },
      init() {
        pageListInit().then((res) => {
          if (res.data.code === 200) {
            this.areaList = res.data.data.patientArea;
            this.taskTypeList = res.data.data.taskType;
            this.urgentLevel = res.data.data.urgentLevel;
            this.taskStatus = res.data.data.taskStatus;
            this.checkTypeList = res.data.data.checkType;
            this.taskTypeList.forEach((element) => {
              if (element.name === "陪检") {
                this.taskType = element.dictId.toString();
                this._getData();
              }
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      _getData() {
        let parms = {
          taskType: this.taskType,
          taskOrderNumber: this.searchForm.taskOrderNumber,
          areaId: this.searchForm.areaId,
          applicantUser: this.searchForm.applicantUser,
          hospitalNo: this.searchForm.hospitalNo,
          bedNo: this.searchForm.bedNo,
          patientName: this.searchForm.patientName,
          checkId: this.searchForm.checkId,
          orderStatus: this.searchForm.orderStatus,
          source: this.searchForm.source,
          urgentLevel: this.searchForm.urgentLevel,
          startKeepTime: this.searchForm.checkTime ?
            this.searchForm.checkTime[0] :
            "",
          endKeepTime: this.searchForm.checkTime ?
            this.searchForm.checkTime[1] :
            "",
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
      _addItemHandle() {
        this.$router.push({
          path: "/projectRegister/addCheck",
          query: {
            type: "陪检",
          },
        });
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: "/projectRegister/detail",
          query: {
            id: row.id,
            type: row.taskTypeName,
          },
        });
      },
      _editItemHandle(row) {
        this.$router.push({
          path: "/projectRegister/edit",
          query: {
            id: row.id,
            type: "陪检",
          },
        });
      },
      _cancelApplyHandle(row) {
        let _this = this;
        this.$confirm(
            "确定后将取消陪检运送任务，不可撤回。",
            "确认要取消陪检运送任务吗？", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
          .then(() => {
            let parms = {
              id: row.id,
            };
            taskOrderCancel(parms).then((res) => {
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
        this.searchForm.taskOrderNumber = "";
        this.searchForm.areaId = "";
        this.searchForm.applicantUser = "";
        this.searchForm.hospitalNo = "";
        this.searchForm.bedNo = "";
        this.searchForm.patientName = "";
        this.searchForm.checkId = "";
        this.searchForm.orderStatus = "";
        this.searchForm.source = "";
        this.searchForm.urgentLevel = "";
        this.searchForm.checkTime = "";
      },
      handleSelectionChange(val) {
        this.multVal = val;
      },
      selectionHandle() {
        let params = {
          taskType: this.taskType,
          taskOrderNumber: this.searchForm.taskOrderNumber,
          areaId: this.searchForm.areaId,
          applicantUser: this.searchForm.applicantUser,
          hospitalNo: this.searchForm.hospitalNo,
          bedNo: this.searchForm.bedNo,
          patientName: this.searchForm.patientName,
          checkId: this.searchForm.checkId,
          orderStatus: this.searchForm.orderStatus,
          source: this.searchForm.source,
          urgentLevel: this.searchForm.urgentLevel,
          startKeepTime: this.searchForm.checkTime ?
            this.searchForm.checkTime[0] :
            "",
          endKeepTime: this.searchForm.checkTime ?
            this.searchForm.checkTime[1] :
            "",
        };
        if (this.excelBtns === "1") {
          exportTaskOrderKeepExcel(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "陪检列表.xlsx";
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
            exportTaskOrderKeepExcel({
              idList: idList
            }).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "陪检列表.xlsx";
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
      background:#217DFA;
      color:#fff;
      height: 32px;
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
}
</style>
