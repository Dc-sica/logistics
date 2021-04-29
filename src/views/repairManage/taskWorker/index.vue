<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="auto">
        <el-form-item label="报修单号：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="报修电话：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairPhone"></el-input>
        </el-form-item>
        <el-form-item label="报修人：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairUserName"></el-input>
        </el-form-item>
        <el-form-item label="报修部门：">
          <el-select placeholder="请选择" v-model="searchForm.deptId" clearable>
            <el-option v-for="item in deptList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派工状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.dispatchStatus" clearable>
            <el-option v-for="item in dispatchStatus" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修设备/设施：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.equipmentName"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.urgentLevel" clearable>
            <el-option v-for="item in urgentLevel" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修人：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairOrderUser"></el-input>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.warehouse" clearable>
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单类型：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.orderType" clearable>
            <el-option v-for="item in orderModel" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派工时间：" v-if="showAll">
          <el-date-picker size="small" v-model="searchForm.dispatchTime" type="daterange" style="width:100%" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报修时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.repairTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
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
      <el-table :data="tableData" border :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="报修单号" width="200px" prop="repairOrderNumber">
          <template slot-scope="scope">
            {{scope.row.repairOrderNumber}}<span class="warn" v-if="scope.row.urgentFlag">{{scope.row.urgentFlag ? '紧急' : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报修部门" prop="deptName"></el-table-column>
        <el-table-column label="报修人" prop="repairUserName"></el-table-column>
        <el-table-column label="报修电话" show-overflow-tooltip prop="repairPhone"></el-table-column>
        <el-table-column label="设备位置" prop="location"></el-table-column>
        <el-table-column label="报修设备/设施" show-overflow-tooltip width="120" prop="equipmentName"></el-table-column>
        <el-table-column label="报修描述" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="报修时间" show-overflow-tooltip prop="repairTime"></el-table-column>
        <el-table-column label="派工状态" prop="dispatchStatusName"></el-table-column>
        <el-table-column label="派工时间" show-overflow-tooltip prop="dispatchTime"></el-table-column>
        <el-table-column label="维修人" prop="repairOrderUser"></el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName"></el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" v-if="scope.row.dispatchStatus === 2" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="派工" v-if="scope.row.dispatchStatus === 1" placement="top">
              <el-button type="text" @click="_assignHandle(scope.row)">
                <i class="iconfont" style="font-size:14px;">&#xe785;</i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.dispatchStatus === 2 && (scope.row.orderType === 1 || scope.row.orderType === 4)" content="取消派工" placement="top">
              <el-button type="text" @click="_cancelAssignHandle(scope.row)">
                <i class="iconfont">&#xe64b;</i>
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
    pageListInit
  } from './../../../apis/repairManage/indexApi'
  import {
    getDispatchListPage,
    exportDispatchList,
    cancelDispatch
  } from './../../../apis/repairManage/workApi'

  export default {
    name: 'teskWorker',
    components: {
      pagination
    },
    data() {
      return {
        searchForm: {
          repairOrderNumber: '',
          repairUserName: '',
          repairPhone: '',
          deptId: '',
          dispatchStatus: '',
          equipmentName: '',
          urgentLevel: '',
          repairOrderUser: '',
          source: '',
          orderType: '',
          dispatchTime: '',
          repairTime: ''
        },
        deptList: [],
        urgentLevel: [],
        orderModel: [],
        dispatchStatus: [],
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
        pageSize: 20,
        drawerView: false,
        starValue: null,
        evaluate: '',
        showAll: true,
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
      this._getData()
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
            this.deptList = res.data.data.dept
            this.repairStatus = res.data.data.repairStatus
            this.urgentLevel = res.data.data.urgentLevel
            this.orderModel = res.data.data.orderModel
            this.dispatchStatus = res.data.data.dispatchStatus
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getData() {
        let params = {
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairUserName: this.searchForm.repairUserName,
          repairPhone: this.searchForm.repairPhone,
          deptId: this.searchForm.deptId,
          dispatchStatus: this.searchForm.dispatchStatus,
          equipmentName: this.searchForm.equipmentName,
          urgentLevel: this.searchForm.urgentLevel,
          repairOrderUser: this.searchForm.repairOrderUser,
          source: this.searchForm.source,
          orderType: this.searchForm.orderType,
          dispatchStartTime: this.searchForm.dispatchTime ? this.searchForm.dispatchTime[0] : '',
          dispatchEndTime: this.searchForm.dispatchTime ? this.searchForm.dispatchTime[1] : '',
          startTime: this.searchForm.repairTime ? this.searchForm.repairTime[0] : '',
          endTime: this.searchForm.repairTime ? this.searchForm.repairTime[1] : '',
          current: this.currentPage,
          pageSize: this.pageSize
        }
        getDispatchListPage(params).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
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
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairUserName: this.searchForm.repairUserName,
          repairPhone: this.searchForm.repairPhone,
          deptId: this.searchForm.deptId,
          dispatchStatus: this.searchForm.dispatchStatus,
          equipmentName: this.searchForm.equipmentName,
          urgentLevel: this.searchForm.urgentLevel,
          repairOrderUser: this.searchForm.repairOrderUser,
          source: this.searchForm.source,
          orderType: this.searchForm.orderType,
          dispatchStartTime: this.searchForm.dispatchTime ? this.searchForm.dispatchTime[0] : '',
          dispatchEndTime: this.searchForm.dispatchTime ? this.searchForm.dispatchTime[1] : '',
          startTime: this.searchForm.repairTime ? this.searchForm.repairTime[0] : '',
          endTime: this.searchForm.repairTime ? this.searchForm.repairTime[1] : '',
        }
        if (this.excelBtns === '1') {
          exportDispatchList(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "工单派工.xlsx"
              downloadLink.click()
              window.URL.revokeObjectURL(downUrl)
              this.excelBtns = ""
            }
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
            exportDispatchList({
              repairIds: repairIds
            }).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                })
                let downloadLink = document.createElement("a")
                const URL = window.URL || window.webkitURL || window.moxURL
                let downUrl = URL.createObjectURL(blob)
                downloadLink.href = downUrl
                downloadLink.download = "工单派工.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }
      },
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.repairOrderNumber = ''
        this.searchForm.repairUserName = ''
        this.searchForm.repairPhone = ''
        this.searchForm.deptId = ''
        this.searchForm.dispatchStatus = ''
        this.searchForm.equipmentName = ''
        this.searchForm.urgentLevel = ''
        this.searchForm.repairOrderUser = ''
        this.searchForm.source = ''
        this.searchForm.orderType = ''
        this.searchForm.dispatchTime = ''
        this.searchForm.repairTime = ''
      },
      _editItemHandle(row) {
        this.$router.push({
          path: '/taskWorker/edit',
          query: {
            id: row.id,
            orderType: row.orderType
          }
        })
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: '/taskWorker/detail',
          query: {
            id: row.id
          }
        })
      },
      _assignHandle(row) {
        this.$router.push({
          path: '/taskWorker/assign',
          query: {
            id: row.id,
            orderType: row.orderType
          }
        })
      },
      _cancelAssignHandle(row) {
        let _this = this
        this.$confirm('确定后将取消派工，不可撤回。', '确认要取消派工吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parms = {
            repairOrderId: row.id
          }
          cancelDispatch(parms).then(res => {
            if (res.data.code === 200) {
              _this._getData()
            } else {
              _this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      }
    }
  }
</script>
<style lang="less" scoped>
  .warn {
    background: #FF5656;
    border-radius: 7px;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
  }
</style>