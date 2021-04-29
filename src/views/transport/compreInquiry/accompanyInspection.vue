<template>
  <ContainerGroup>
    <Container>
      <el-form :model="formInline" :inline="true" ref="formInline" label-width="90px">
        <el-form-item label="任务编号：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="住院号：">
          <el-input placeholder="请输入" v-model="formInline.inpatientNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="病人姓名：">
          <el-input placeholder="请输入" v-model="formInline.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请病区：">
          <el-select placeholder="请选择" clearable v-model="formInline.applicationWard" style="width:100%;">
            <el-option v-for="(item,index) in applicationWard" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.stateList" style="width:100%;">
            <el-option v-for="(item,index) in stateList" :key="index" :value="item.code" :label="item.message"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.urgentList" style="width:100%;">
            <el-option :value="0" label="不紧急 "></el-option>
            <el-option :value="1" label="紧急"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病床号：" v-show="showAll">
          <el-input placeholder="请输入" v-model="formInline.sickbed" clearable></el-input>
        </el-form-item>
        <el-form-item label="接单类型：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.orderList" style="width:100%;">
            <el-option v-for="(item,index) in orderList" :key="index" :value="item.code" :label="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-show="showAll">
          <el-select placeholder="请选择" v-model="formInline.sourceList" clearable style="width:100%;">
            <el-option :value="1" label="公众号 "></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="护工人员：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.nurse" style="width:100%;">
            <el-option v-for="(item,index) in nurse" :key="index" :value="item.userId" :label="item.userName"></el-option>
          </el-select>
          <!-- <el-input placeholder="请输入" v-model="formInline.nurse" clearable></el-input> -->
        </el-form-item>
        <el-form-item label="检查类型：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.examType" style="width:100%;">
            <el-option v-for="(item,index) in examType" :key="index" :value="item.dictId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目的地：" v-show="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.destination" style="width:100%;">
            <el-option v-for="(item,index) in destination" :key="index" :value="item.dictId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间：" v-show="showAll">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formInline.finishDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="陪检时间：" v-show="showAll">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formInline.submitDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请人：" v-show="showAll">
          <el-input placeholder="请输入" v-model="formInline.applicant" clearable></el-input>
        </el-form-item>
        <el-form-item label-width="0px" style="float:right;">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{word}}
            <i :class="showAll ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
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
      <el-table isFillHeight :data="tableData" stripe size="mini" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" :height="tableHeight" border v-loading="loading" @selection-change="handleSelectionChange" :cell-style="cellStyle">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="任务编号" width="150" prop="taskOrderNumber"></el-table-column>
        <el-table-column label="申请病区" prop="areaName"></el-table-column>
        <el-table-column label="申请人" prop="applicantUserName"></el-table-column>
        <el-table-column label="联系电话" show-overflow-tooltip prop="applicationPhone"></el-table-column>
        <el-table-column label="住院号" show-overflow-tooltip prop="hospitalNo"></el-table-column>
        <el-table-column label="病床号" show-overflow-tooltip prop="bedNo"></el-table-column>
        <el-table-column label="病人姓名" show-overflow-tooltip prop="patientName"></el-table-column>
        <el-table-column label="检查类型" prop="checkName" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item,index ) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{item.checkName}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="目的地" prop="destinationName" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item,index ) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{item.destinationName}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="陪检时间" show-overflow-tooltip prop="keepTime" width="150" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item,index ) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{item.keepTime}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="紧急程度" prop="urgentFlag" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item,index ) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{item.urgentFlag == '0' ? '不紧急' : '紧急'}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="完成时间" show-overflow-tooltip prop="finishTime" class-name="column">
          <template slot-scope="scope">
            <div v-for="(item,index ) in scope.row.checkList" :key="index" class="multiTd">
              <div>
                {{item.finishTime}}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" show-overflow-tooltip prop="createTime"></el-table-column>
        <el-table-column label="任务状态" prop="orderStatusName" show-overflow-tooltip></el-table-column>
        <el-table-column label="派工时间" show-overflow-tooltip prop="dispatchTime"></el-table-column>
        <el-table-column label="护工人员" prop="nursingUserNameList" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.nursingUserNameList !== null ? scope.row.nursingUserNameList.join('，') :''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName"></el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
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
  import pagination from './../../../components/pagination/index'
  import {
    taskOrderPage,
    exportTaskKeep
  } from './../../../apis/taskList/indexApi'
  export default {
    name: 'accompanyInspection',
    components: {
      pagination
    },
    props: {
      initInfo: Object
    },
    data() {
      return {
        showAll: false,
        tableHeight: '0px',
        tableData: [],
        loading: false,
        excelBtns: '',
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
          finishDate: '',
          submitDate: ''
        },
        applicationWard: [],
        destination: [],
        sourceList: [],
        // formDate: [],
        stateList: [],
        urgentList: [],
        orderList: [],
        examType: [],
        nurse: []
      }
    },
    computed: {
      word: function() {
        if (this.showAll == false) {
          return "展开";
        } else {
          return "收起";
        }
      }
    },
    created() {
      this._getData()
    },
    mounted() {
      this.init()
      // this.$nextTick(function() {
      //   this.closeSearch()
      // })
      // window.onresize = () => {
      //   this.handleControlChange()
      // }
      // const {
      //   userId,
      //   deptId
      // } = JSON.parse(localStorage.getItem('userInfo'))
      // this.userId = userId
      // this.deptId = deptId
      // this.init()
    },
    methods: {
      // 单元格的 style 的回调方法
      cellStyle({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 8) {
          return `padding: 0px !important;`;
        } else {
          return ''
        }
      },
      // 下拉
      init() {
        this.applicationWard = this.initInfo.patientArea
        // this.taskList = this.initInfo.taskType
        this.stateList = this.initInfo.taskStatus
        this.urgentList = this.initInfo.urgentLevel
        this.orderList = this.initInfo.orderModel
        this.nurse = this.initInfo.nursingUser
        this.examType = this.initInfo.checkType
        this.destination = this.initInfo.destination
      },
      // 展开收起搜索项
      closeSearch() {
        this.showAll = !this.showAll
        // this.handleControlChange()
      },
      handleControlChange() {
        this.$nextTick(() => {
          var searchBoxHeght = document.getElementById("searchBox").clientHeight
          var morboxsBoxHeght = document.getElementById("morboxs").clientHeight
          var wrapHeight = document.getElementById('wrapper').clientHeight
          var nevboxHeght = document.getElementById("nevboxs").clientHeight
          this.tableHeight = wrapHeight - morboxsBoxHeght - searchBoxHeght - nevboxHeght + 'px'
        })
      },
      _getData() {
        this.loading = true
        let parms = {
          taskType: 98,
          taskOrderNumber: this.formInline.keyWord,
          areaId: this.formInline.applicationWard,
          orderStatus: this.formInline.stateList,
          urgentFlag: this.formInline.urgentList,
          orderType: this.formInline.orderList,
          source: this.formInline.sourceList,
          nursingUserId: this.formInline.nurse,
          startTaskFinishTime: this.formInline.finishDate[0] || '',
          endTaskFinishTime: this.formInline.finishDate[1] || '',
          startKeepTime: this.formInline.submitDate[0] || '',
          endKeepTime: this.formInline.submitDate[1] || '',
          applicantUser: this.formInline.applicant,
          current: this.currentPage,
          size: this.pageSize,
          patientName: this.formInline.name,
          hospitalNo: this.formInline.inpatientNumber,
          destinationId: this.formInline.destination,
          bedNo: this.formInline.sickbed,
          checkId: this.formInline.examType,
        }
        console.log(parms)
        taskOrderPage(parms).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            this.loading = false
          } else {
            this.$message.error(res.data.message)
            this.loading = false
          }
        })
      },
      _toDetailHandle(row) {
        console.log('row', row)
        this.$router.push({
          path: '/transportGoodsDetail',
          query: {
            id: row.id,
            projectType: row.taskType
          }
        })
      },
      selectionHandle() {
        let params = {
          // groupId: this.initInfo.groupId,
          taskType: 98,
          taskOrderNumber: this.formInline.keyWord,
          areaId: this.formInline.applicationWard,
          orderStatus: this.formInline.stateList,
          urgentFlag: this.formInline.urgentList,
          orderType: this.formInline.orderList,
          source: this.formInline.sourceList,
          nursingUserId: this.formInline.nurse,
          startTaskFinishTime: this.formInline.finishDate[0],
          endTaskFinishTime: this.formInline.finishDate[1],
          startKeepTime: this.formInline.submitDate[0],
          endKeepTime: this.formInline.submitDate[1],
          applicantUser: this.formInline.applicant,
          current: this.currentPage,
          size: this.pageSize,
          patientName: this.formInline.name,
          hospitalNo: this.formInline.inpatientNumber,
          destinationId: this.formInline.destination,
          bedNo: this.formInline.sickbed,
          checkId: this.formInline.examType,
        };
        if (this.excelBtns == "1") {
          // 全部导出
          exportTaskKeep(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "综合查询.xls";
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
            params.idList = ids
            exportTaskKeep(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "综合查询.xls";
                downloadLink.click();
                window.URL.revokeObjectURL(downUrl);
              }
            });
          }
          this.excelBtns = "";
        }

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleReset() {
        this.formInline = {
          finishDate: '',
          submitDate: ''
        }

      },
      handleSearch() {
        this._getData()
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      }
    },
    // destroyed() {
    //   window.onresize = null
    // }
  }
</script>
<style lang="less" scoped>
  #wrapper {
    height: 100%;

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
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>