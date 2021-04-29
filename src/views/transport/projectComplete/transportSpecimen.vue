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
        <el-form-item label="运送样本：" >
          <el-select
            placeholder="请选择"
            style="width: 100%"
            v-model="searchForm.sampleIdList"
          >
            <el-option
              v-for="item in sampleList"
              :key="item.dictId"
              :label="item.name"
              :value="item.name"
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
        <el-form-item label="运送时间：" v-if="showAll">
          <el-date-picker
            style="width: 100%"
            v-model="searchForm.transportTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="护工人员：" v-if="showAll">
          <el-select
            placeholder="请选择"
            clearable
            v-model="searchForm.nursingUserId"
          >
            <el-option
              v-for="(item, index) in nurseList"
              :key="index"
              :value="item.userId"
              :label="item.userName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单类型：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.orderType">
            <el-option
              v-for="item in orderModel"
              :key="item.code"
              :label="item.value"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间：" v-if="showAll">
          <el-date-picker
            style="width: 100%"
            v-model="searchForm.finishTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="派工时间：" v-if="showAll">
          <el-date-picker
            style="width: 100%"
            v-model="searchForm.dispatchTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.source">
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
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
        border
        @selection-change="handleSelectionChange"
        v-loading="loading"
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
        <el-table-column
          label="申请人"
          prop="applicantUserName"
        ></el-table-column>
        <el-table-column
          label="联系电话"
          prop="applicationPhone"
        ></el-table-column>
        <el-table-column label="运送标本" min-width="200">
          <template slot-scope="scope">
            <el-tag
              :key="tag.index"
              v-for="tag in scope.row.isSelectedSampleList"
              type="info"
              :disable-transitions="false"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="紧急程度"
          prop="urgentLevelName"
        ></el-table-column>
        <el-table-column
          label="运送时间"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>
        <el-table-column label="任务状态" prop="orderStatusName">
        </el-table-column>
        <el-table-column label="派工时间" prop="dispatchTime">
        </el-table-column>
        <el-table-column label="护工人员">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.nursingUserNameList"
              :key="index"
              >{{ item }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="完成时间" prop="finishTime"> </el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName">
        </el-table-column>
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
  exportSample,
} from "./../../../apis/projectRegister/indexApi";

export default {
  name: "specimen",
  components: {
    pagination,
  },
  data() {
    return {
      userId: "",
      deptId: "",
      taskType: "",
      deptList: [],
      orderModel: [],
      sampleList: [],
      taskStatus: [],
      areaList: [],
      urgentLevel: [],
      nurseList: [],
      searchForm: {
        taskOrderNumber: "",
        areaId: "",
        applicantUser: "",
        orderStatus: "",
        urgentLevel: "",
        sampleIdList: "",
        source: "",
        nursingUserId: "",
        orderType: "",
        dispatchTime: "",
        finishTime: "",
        transportTime: "",
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
          this.taskTypeList = res.data.data.taskType;
          this.urgentLevel = res.data.data.urgentLevel;
          this.taskStatus = res.data.data.taskStatus;
          this.orderModel = res.data.data.orderModel;
          this.nurseList = res.data.data.nursingUser;
          this.sampleList = res.data.data.sample;
          this.taskTypeList.forEach((element) => {
            if (element.name === "标本") {
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
        orderStatus: 7,
        urgentLevel: this.searchForm.urgentLevel,
        sampleName: this.searchForm.sampleIdList,
        source: this.searchForm.source,
        nursingUserId: this.searchForm.nursingUserId,
        orderType: this.searchForm.orderType,
        startTransportTime: this.searchForm.transportTime
          ? this.searchForm.transportTime[0]
          : "",
        endTransportTime: this.searchForm.transportTime
          ? this.searchForm.transportTime[1]
          : "",
        startDispatchTime: this.searchForm.dispatchTime
          ? this.searchForm.dispatchTime[0]
          : "",
        endDispatchTime: this.searchForm.dispatchTime
          ? this.searchForm.dispatchTime[1]
          : "",
        startFinishTime: this.searchForm.finishTime
          ? this.searchForm.finishTime[0]
          : "",
        endFinishTime: this.searchForm.finishTime
          ? this.searchForm.finishTime[1]
          : "",
        current: this.currentPage,
        size: this.pageSize,
      };
      getListPage(parms).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.tableData.forEach((element) => {
            element.commonSampleList = JSON.parse(element.commonSampleList);
            element.urgentSampleList = JSON.parse(element.urgentSampleList);
            // 筛选选中的运送标本
            element.isSelectedSampleList = [];
            if (element.commonSampleList) {
              element.commonSampleList.forEach((ele) => {
                if (ele.isSelected === "true") {
                  element.isSelectedSampleList.push(ele.sampleName);
                }
              });
              element.urgentSampleList.forEach((ele) => {
                if (ele.isSelected === "true") {
                  element.isSelectedSampleList.push(ele.sampleName);
                }
              });
            }
          });
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _toDetailHandle(row) {
      this.$router.push({
        path: "/projectComplete/detail",
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus,
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
      this.searchForm.orderStatus = "";
      this.searchForm.source = "";
      this.searchForm.sampleIdList = "";
      this.searchForm.urgentLevel = "";
      this.searchForm.nursingUserId = "";
      this.searchForm.orderType = "";
      this.searchForm.dispatchTime = "";
      this.searchForm.finishTime = "";
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
        orderStatus: 7,
        urgentLevel: this.searchForm.urgentLevel,
        sampleName: this.searchForm.sampleIdList,
        source: this.searchForm.source,
        nursingUserId: this.searchForm.nursingUserId,
        orderType: this.searchForm.orderType,
        startTransportTime: this.searchForm.transportTime
          ? this.searchForm.transportTime[0]
          : "",
        endTransportTime: this.searchForm.transportTime
          ? this.searchForm.transportTime[1]
          : "",
        startDispatchTime: this.searchForm.dispatchTime
          ? this.searchForm.dispatchTime[0]
          : "",
        endDispatchTime: this.searchForm.dispatchTime
          ? this.searchForm.dispatchTime[1]
          : "",
        startFinishTime: this.searchForm.finishTime
          ? this.searchForm.finishTime[0]
          : "",
        endFinishTime: this.searchForm.finishTime
          ? this.searchForm.finishTime[1]
          : "",
      };
      if (this.excelBtns === "1") {
        exportSample(params).then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "任务完工运送标本列表.xlsx";
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
          exportSample({ idList: idList }).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "任务完工运送标本列表.xlsx";
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
    .span {
      float: left;
      margin-right: 5px;
      margin-bottom: 5px;
      background: #ff8901;
      color: #fff;
      padding: 5px 10px;
      text-align: center;
      border-radius: 5px;
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
.el-tag--info {
  color: #FFF;
  background-color: #217DFA;
  border-color: #217DFA;
  min-width: 50px;
}

.el-tag {
  margin: 0 10px 10px 0;
}
</style>