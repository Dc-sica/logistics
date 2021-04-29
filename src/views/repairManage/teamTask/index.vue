<template>
  <ContainerGroup>
    <Container>
      <!-- <el-row> -->
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="auto">
        <el-form-item label="报修单号：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="报修人：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairUserName"></el-input>
        </el-form-item>
        <el-form-item label="维修人：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairman"></el-input>
        </el-form-item>
        <el-form-item label="报修部门：">
          <el-select placeholder="请选择" v-model="searchForm.deptId" clearable>
            <el-option v-for="item in deptList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.maintenanceStatus" clearable>
            <el-option v-for="item in maintenanceStatus" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.source" clearable>
            <el-option :value="1" label="公众号 "></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.urgentLevel" clearable>
            <el-option v-for="item in urgentLevel" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修电话：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairPhone"></el-input>
        </el-form-item>
        <el-form-item label="报修设备/设施：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.equipmentName"></el-input>
        </el-form-item>
        <el-form-item label="报修时间：" v-if="showAll">
          <el-date-picker v-model="searchForm.inTime" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="派工时间：" prop="warehouse" v-if="showAll">
          <el-date-picker v-model="searchForm.sureTime" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间：" prop="warehouse" v-if="showAll">
          <el-date-picker v-model="searchForm.finishTime" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{word}}
            <i :class="showAll ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
          </el-button>
        </el-form-item>
      </el-form>
      <!-- </el-row> -->
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <h3 style="display:inline-block;padding-left:20px;line-height:31px;">当前：{{group}}</h3>
      </OperationContainer>
      <!-- <div style="margin-bottom:15px;">
        <h3>当前：{{group}}</h3>
      </div> -->
      <el-table :data="tableData" border :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="报修单号" width="200px">
          <template slot-scope="scope">
            {{scope.row.repairOrderNumber}}<span class="warn" v-if="scope.row.urgentFlag">{{scope.row.urgentFlag ? '紧急' : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报修部门" prop="deptName"></el-table-column>
        <el-table-column label="报修人" prop="repairUserName"></el-table-column>
        <el-table-column label="报修电话" show-overflow-tooltip prop="repairPhone"></el-table-column>
        <el-table-column label="设备位置" prop="location"></el-table-column>
        <el-table-column label="报修设备/设施" prop="equipmentName" width="120px"></el-table-column>
        <el-table-column label="报修描述" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="报修时间" show-overflow-tooltip prop="createTime"></el-table-column>
        <el-table-column label="维修状态" prop="repairStatusName">
          <template slot-scope="scope">
            <span class="urgent" v-if="scope.row.repairStatusName == '待维修'">{{scope.row.repairStatusName}}</span>
            <span v-else>
              {{scope.row.repairStatusName}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="派工时间" show-overflow-tooltip prop="dispatchTime"></el-table-column>
        <el-table-column label="维修人" prop="repairOrderUser"></el-table-column>
        <el-table-column label="完成时间" show-overflow-tooltip prop="finishTime"></el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName"></el-table-column>
        <!-- <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <!-- <el-tooltip class="item" effect="dark" v-if="scope.row.handlerStatus === 1" content="审核" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe630;'" @click="_editItemHandle(scope.row)">
              </el-button>
            </el-tooltip> -->
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
    pageListInit
  } from './../../../apis/repairManage/indexApi'
  import {
    getMinePage,
    exportMine,
    getInfo
  } from './../../../apis/teamTask/indexApi'

  export default {
    name: 'teamTask',
    components: {
      pagination
    },
    data() {
      return {
        groupId: '',
        showAll: true,
        handlerStatus: [],
        group: '',
        searchForm: {
          repairman: '',
          maintenanceStatus: '',
          repairOrderNumber: '',
          repairUserName: '',
          deptId: '',
          source: '',
          urgentLevel: '',
          equipmentName: '',
          repairPhone: '',
          inTime: '',
          sureTime: '',
          finishTime: ''
        },
        deptList: [],
        maintenanceStatus: [],
        urgentLevel: [],
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
        tableData: [],
        multVal: [],
        currentPage: 1,
        total: 0,
        pageSize: 20
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
    mounted() {
      this.init()
      // this._getData()
      this.$nextTick(function() {
        this.closeSearch()
      })
    },
    methods: {
      closeSearch() {
        this.showAll = !this.showAll
      },
      init() {
        pageListInit().then(res => {
          if (res.data.code === 200) {
            this.maintenanceStatus = res.data.data.repairStatus
            this.deptList = res.data.data.dept
            this.urgentLevel = res.data.data.urgentLevel
            // this.handlerStatus = res.data.data.handlerStatus
          } else {
            this.$message.error(res.data.message)
          }
        })
        // 获取当前组
        getInfo().then(res => {
          if (res.data.code === 200) {
            // console.log(res)
            this.groupId = res.data.data.userInfo.groupId
            this.group = res.data.data.userInfo.groupName
            this.$nextTick(function() {
              this._getData()
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getData() {
        let parms = {
          groupId: this.groupId,
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairUserName: this.searchForm.repairUserName,
          repairOrderUser: this.searchForm.repairman,
          deptId: this.searchForm.deptId,
          repairStatus: this.searchForm.maintenanceStatus,
          source: this.searchForm.source,
          urgentLevel: this.searchForm.urgentLevel,
          equipmentName: this.searchForm.equipmentName,
          repairPhone: this.searchForm.repairPhone,
          startTime: this.searchForm.inTime == null ? '' : this.searchForm.inTime[0],
          endTime: this.searchForm.inTime == null ? '' : this.searchForm.inTime[1],
          dispatchStartTime: this.searchForm.sureTime == null ? '' : this.searchForm.sureTime[0],
          dispatchEndTime: this.searchForm.sureTime == null ? '' : this.searchForm.sureTime[1],
          startFinishTime: this.searchForm.finishTime == null ? '' : this.searchForm.finishTime[0],
          endFinishTime: this.searchForm.finishTime == null ? '' : this.searchForm.finishTime[1],
          current: this.currentPage,
          pageSize: this.pageSize
        }
        getMinePage(parms).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.tableData.forEach(ele => {
              if (ele.urgentLevel === 79) {
                ele.urgentFlag = true
              } else {
                ele.urgentFlag = false
              }
            })
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleSelectionChange(val) {
        this.multVal = val
      },
      selectionHandle() {
        let params = {
          groupId: this.groupId,
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairUserName: this.searchForm.repairUserName,
          repairOrderUser: this.searchForm.repairman,
          deptId: this.searchForm.deptId,
          repairStatus: this.searchForm.maintenanceStatus,
          source: this.searchForm.source,
          urgentLevel: this.searchForm.urgentLevel,
          equipmentName: this.searchForm.equipmentName,
          repairPhone: this.searchForm.repairPhone,
          startTime: this.searchForm.inTime == null ? '' : this.searchForm.inTime[0],
          endTime: this.searchForm.inTime == null ? '' : this.searchForm.inTime[1],
          dispatchStartTime: this.searchForm.sureTime == null ? '' : this.searchForm.sureTime[0],
          dispatchEndTime: this.searchForm.sureTime == null ? '' : this.searchForm.sureTime[1],
          startFinishTime: this.searchForm.finishTime == null ? '' : this.searchForm.finishTime[0],
          endFinishTime: this.searchForm.finishTime == null ? '' : this.searchForm.finishTime[1],
          // repairIds:[]
          // current: this.currentPage,
          // pageSize: this.pageSize
        }
        if (this.excelBtns === '1') {
          exportMine(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "班组任务表.xlsx"
              downloadLink.click()
              window.URL.revokeObjectURL(downUrl)
            }
            this.excelBtns = ""
          })
        } else {
          if (this.multVal === undefined || this.multVal.length === 0) {
            this.$message.warning("请选择要导出的数据")
            this.excelBtns = ""
            return false
          } else {
            let repairIds = []
            this.multVal.forEach(element => {
              repairIds.push(element.id)
            })
            params.repairIds = repairIds
            exportMine(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                })
                let downloadLink = document.createElement("a")
                const URL = window.URL || window.webkitURL || window.moxURL
                let downUrl = URL.createObjectURL(blob)
                downloadLink.href = downUrl
                downloadLink.download = "班组任务表.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
              }
            })
          }
          this.excelBtns = ""
        }
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: '/teamTask/detail',
          query: {
            id: row.id
          }
        })
      },
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.maintenanceStatus = ''
        this.searchForm.repairman = ''
        this.searchForm.repairOrderNumber = ''
        this.searchForm.repairUserName = ''
        this.searchForm.deptId = ''
        // this.searchForm.handlerStatus = ''
        this.searchForm.source = ''
        this.searchForm.urgentLevel = ''
        this.searchForm.equipmentName = ''
        this.searchForm.repairPhone = ''
        this.searchForm.inTime = ''
        this.searchForm.sureTime = ''
        this.searchForm.finishTime = ''
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      }
    },

  }
</script>
<style lang="less" scoped>
  // ::v-deep .el-col-25 {
  //   width: 20%;
  // }

  .urgent {
    color: red;
  }

  .warn {
    background: #FF5656;
    border-radius: 7px;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
  }
</style>