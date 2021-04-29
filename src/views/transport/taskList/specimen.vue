<template>
  <ContainerGroup>
    <Container>
      <el-form :model="formInline" :inline="true" ref="formInline" label-width="90px">
        <el-form-item label="任务编号：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请病区：">
          <el-select placeholder="请选择" clearable v-model="formInline.applicationWard" style="width: 100%">
            <el-option v-for="(item, index) in applicationWard" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态：">
          <el-select placeholder="请选择" clearable v-model="formInline.stateList" style="width: 100%">
            <el-option v-for="(item, index) in stateList" :key="index" :value="item.code" :label="item.message"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运送时间：">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formInline.transportDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="紧急程度：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.urgentList" style="width: 100%">
            <el-option v-for="(item, index) in urgentList" :key="index" :value="item.dictId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单类型：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.orderList" style="width: 100%">
            <el-option v-for="(item, index) in orderList" :key="index" :value="item.code" :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-show="showAll">
          <el-select placeholder="请选择" v-model="formInline.sourceList" clearable style="width: 100%">
            <el-option :value="1" label="公众号 "></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派工时间：" v-show="showAll">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formInline.submitDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="护工人员：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.nurse" style="width: 100%">
            <el-option v-for="(item, index) in nurse" :key="index" :value="item.userId" :label="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人：" v-show="showAll">
          <el-input placeholder="请输入" v-model="formInline.applicant" clearable></el-input>
        </el-form-item>
        <el-form-item label="运送样本：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.examType" style="width: 100%">
            <el-option v-for="(item, index) in examType" :key="index" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间：" v-show="showAll">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formInline.finishDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label-width="0px" style="float:right;">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{ word }}
            <i :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table height="0" @selection-change="handleSelectionChange" :data="tableData" border v-loading="tableLoading" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="任务编号" width="150" prop="taskOrderNumber"></el-table-column>
        <el-table-column label="申请病区" prop="areaName"></el-table-column>
        <el-table-column label="申请人" prop="applicantUserName"></el-table-column>
        <el-table-column label="联系电话" show-overflow-tooltip prop="applicationPhone"></el-table-column>
        <el-table-column label="运送标本" min-width="200">
          <template slot-scope="scope">
            <el-tag :key="tag.index" v-for="tag in scope.row.sampleList" type="info" :disable-transitions="false">
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="运送时间" show-overflow-tooltip prop="sampleTransportTime"></el-table-column>
        <el-table-column label="紧急程度" prop="urgentLevelName"></el-table-column>
        <el-table-column label="任务状态" prop="orderStatusName" width="100"></el-table-column>
        <el-table-column label="派工时间" show-overflow-tooltip prop="dispatchTime"></el-table-column>
        <el-table-column label="护工人员" prop="nursingUserNameList">
          <template slot-scope="scope">
            <span>{{
              scope.row.nursingUserNameList !== null
                ? scope.row.nursingUserNameList.join("，")
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成时间" show-overflow-tooltip prop="finishTime"></el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName"></el-table-column>
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
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from "./../../../components/pagination/index";
  import {
    taskOrderPage,
    exportSample
  } from "./../../../apis/taskList/indexApi";
  export default {
    name: "specimen",
    components: {
      pagination,
    },
    props: {
      initInfo: Object,
    },
    data() {
      return {
        tableLoading: false,
        tableHeight: "0px",
        showAll: false,
        tableData: [],
        loading: false,
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
        total: 0,
        pageSize: 20,
        currentPage: 1,
        multipleSelection: [],
        formInline: {
          finishDate: "",
          submitDate: "",
          transportDate: "",
        },
        applicationWard: [],
        // destination: [],
        sourceList: [],
        // formDate: [],
        stateList: [],
        urgentList: [],
        orderList: [],
        examType: [],
        nurse: [],
      };
    },
    created() {
      this._getData();
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
      this.init();
      // this.$nextTick(function () {
      //   this.closeSearch();
      // });
      // window.onresize = () => {
      //   this.handleControlChange();
      // };
      // const {
      //   userId,
      //   deptId
      // } = JSON.parse(localStorage.getItem('userInfo'))
      // this.userId = userId
      // this.deptId = deptId
      // this.init()
    },
    methods: {
      // 下拉
      init() {
        this.applicationWard = this.initInfo.patientArea;
        // this.taskList = this.initInfo.taskType
        this.stateList = this.initInfo.taskStatus;
        this.urgentList = this.initInfo.urgentLevel;
        this.orderList = this.initInfo.orderModel;
        this.nurse = this.initInfo.nursingUser;
        this.examType = this.initInfo.sample;
        // this.destination = this.initInfo.destination
      },
      // 展开收起搜索项
      closeSearch() {
        this.showAll = !this.showAll;
        // this.handleControlChange();
      },
      handleControlChange() {
        this.$nextTick(() => {
          var searchBoxHeght = document.getElementById("searchBox").clientHeight;
          var morboxsBoxHeght = document.getElementById("morboxs").clientHeight;
          var wrapHeight = document.getElementById("wrapper").clientHeight;
          var nevboxHeght = document.getElementById("nevboxs").clientHeight;
          this.tableHeight =
            wrapHeight - morboxsBoxHeght - searchBoxHeght - nevboxHeght + "px";
        });
      },
      _getData() {
        this.loading = true;
        let parms = {
          // groupId: this.initInfo.groupId,
          taskType: 99,
          taskOrderNumber: this.formInline.keyWord,
          areaId: this.formInline.applicationWard,
          orderStatus: this.formInline.stateList,
          urgentLevel: this.formInline.urgentList,
          orderType: this.formInline.orderList,
          source: this.formInline.sourceList,
          nursingUserId: this.formInline.nurse,
          startFinishTime: this.formInline.finishDate[0],
          endFinishTime: this.formInline.finishDate[1],
          startDispatchTime: this.formInline.submitDate[0],
          endDispatchTime: this.formInline.submitDate[1],
          applicantUser: this.formInline.applicant,
          current: this.currentPage,
          size: this.pageSize,
          patientName: this.formInline.name,
          hospitalNo: this.formInline.inpatientNumber,
          destinationId: this.formInline.destination,
          bedNo: this.formInline.sickbed,
          startTransportTime: this.formInline.transportDate[0],
          endTransportTime: this.formInline.transportDate[1],
          sampleName: this.formInline.examType,
        };
        taskOrderPage(parms).then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            this.loading = false;
          } else {
            this.$message.error(res.data.message);
            this.loading = false;
          }
        });
      },
      _toDetailHandle(row) {
        // console.log(row)
        this.$router.push({
          path: "/transportGoodsDetail",
          query: {
            id: row.id,
            projectType: row.taskType,
          },
        });
      },
      selectionHandle() {
        let params = {
          // groupId: this.initInfo.groupId,
          taskType: 99,
          taskOrderNumber: this.formInline.keyWord,
          areaId: this.formInline.applicationWard,
          orderStatus: this.formInline.stateList,
          urgentLevel: this.formInline.urgentList,
          orderType: this.formInline.orderList,
          source: this.formInline.sourceList,
          nursingUserId: this.formInline.nurse,
          startFinishTime: this.formInline.finishDate[0],
          endFinishTime: this.formInline.finishDate[1],
          startDispatchTime: this.formInline.submitDate[0],
          endDispatchTime: this.formInline.submitDate[1],
          applicantUser: this.formInline.applicant,
          current: this.currentPage,
          size: this.pageSize,
          patientName: this.formInline.name,
          hospitalNo: this.formInline.inpatientNumber,
          destinationId: this.formInline.destination,
          bedNo: this.formInline.sickbed,
          startTransportTime: this.formInline.transportDate[0],
          endTransportTime: this.formInline.transportDate[1],
          sampleName: this.formInline.examType,
        };
        if (this.excelBtns == "1") {
          // 全部导出
          exportSample(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "班组任务表.xls";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
            }
          });
          this.excelBtns = "";
        } else if (this.excelBtns == "2") {
          // 批量导出
          if (
            this.multipleSelection === undefined ||
            this.multipleSelection.length === 0
          ) {
            this.$message.warning("请选择要导出的数据");

            this.excelBtns = "";
            return false;
          } else {
            let ids = [];
            this.multipleSelection.forEach((element) => {
              ids.push(element.id);
            });
            params.idList = ids;
            exportSample(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "班组任务表.xls";
                downloadLink.click();
                window.URL.revokeObjectURL(downUrl);
              }
            });
          }
          this.excelBtns = "";
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleReset() {
        this.formInline = {
          finishDate: "",
          submitDate: "",
          transportDate: "",
        };
      },
      handleSearch() {
        this._getData();
      },
      pagationChange(payload) {
        this.currentPage = payload.page;
        this.pageSize = payload.pageSize;
        this._getData();
      },
    },
    // destroyed() {
    //   window.onresize = null;
    // },
  };
</script>
<style lang="less" scoped>
  .el-tag--info {
    color: #fff;
    background-color: #217DFA;
    border-color: #217DFA;
    min-width: 50px;
  }

  .el-tag {
    margin-left: 2px;
    margin-bottom: 5px;
  }

  #wrapper {
    height: 100%;
    overflow: hidden;

    #searchBox {
      box-sizing: border-box;
    }
  }

  ::v-deep .el-col-25 {
    width: 20%;
  }

  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }

  .table-btn {
    margin-bottom: 15px;
  }
</style>