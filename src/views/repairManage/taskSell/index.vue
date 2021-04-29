<template>
  <ContainerGroup>
    <Container>
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="auto">
        <el-form-item label="报修单号：">
          <el-input placeholder="请输入" v-model="searchForm.repairOrderNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="报修人：">
          <el-input placeholder="请输入" v-model="searchForm.repairUserName"></el-input>
        </el-form-item>
        <el-form-item label="报修部门：">
          <el-select placeholder="请选择" v-model="searchForm.deptId">
            <el-option v-for="item in deptList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修状态：">
          <el-select placeholder="请选择" v-model="searchForm.repairStatus">
            <el-option v-for="item in repairStatus" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.urgentLevel">
            <el-option v-for="item in urgentLevel" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.source">
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修设备/设施：" v-if="showAll">
          <el-input placeholder="请输入" v-model="searchForm.equipmentName"></el-input>
        </el-form-item>
        <el-form-item label="报修电话：" v-if="showAll">
          <el-input placeholder="请输入" v-model="searchForm.repairPhone" clearable></el-input>
        </el-form-item>
        <el-form-item label="报修时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.sureTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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
        <el-button icon="el-icon-plus" type="success" @click="_addItemHandle">新增</el-button>
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
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
        <el-table-column label="报修设备/设施" show-overflow-tooltip width="120" prop="equipmentName"></el-table-column>
        <el-table-column label="报修描述" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="报修时间" show-overflow-tooltip prop="repairTime"></el-table-column>
        <el-table-column label="报修状态" prop="repairStatusName">
        </el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName">
        </el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.cancelApply && scope.row.repairStatus === 4" content="编辑" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.cancelApply" content="取消申请" placement="top">
              <el-button type="text" class="iconfont" style="font-size:12px;" v-html="'&#xe65f;'" @click="_cancelApplyHandle(scope.row)">
              </el-button>>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.evaluate && scope.row.commentStatus === 1" content="评价" placement="top">
              <el-button type="text" class="iconfont" style="font-size:12px;" v-html="'&#xe614;'" @click="_evaluateHandle(scope.row)">
              </el-button>>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
      <!-- 侧边弹窗 -->
      <Drawer title="评价" :visible.sync="drawerView" @onOk="_onSave" @cancel="_drawerHandleClose" :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
         { type: 'primary', text: '保存', trigger: 'onOk' }
      ]">
        <div class="group">
          <span class="sp">评分：</span>
          <el-rate v-model="starValue" @change="starChange"></el-rate>
        </div>
        <div class="group">
          <span class="sp">评价：</span>
          <el-input type="textarea" class="textarea" placeholder="请输入评价内容，不超过300字" show-word-limit :rows="4" v-model="evaluate" :maxlength="300"></el-input>
        </div>
      </Drawer>
    </Container>
  </ContainerGroup>
</template>

<script>
  import pagination from './../../../components/pagination/index'
  import {
    pageListInit,
    getListPage,
    cancelRepairOrderById,
    exportList,
    addComment
  } from './../../../apis/repairManage/indexApi'

  export default {
    name: 'taskSell',
    components: {
      pagination
    },
    data() {
      return {
        searchForm: {
          repairOrderNumber: '',
          repairUserName:  '',
          deptId: '',
          repairStatus: '',
          sureTime: '',
          source: '',
          urgentLevel: '',
          equipmentName: '',
          repairPhone: ''
        },
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
        deptList: [],
        repairStatus: [],
        urgentLevel: [],
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        repairOrderId: '',
        drawerView: false,
        multVal: [],
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
      const {
        userId,
        deptId
      } = JSON.parse(localStorage.getItem('userInfo'))
      this.userId = userId
      this.deptId = deptId
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
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getData() {
        let parms = {
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairUserName: this.searchForm.repairUserName,
          deptId: this.searchForm.deptId,
          repairStatus: this.searchForm.repairStatus,
          startTime: this.searchForm.sureTime ? this.searchForm.sureTime[0] : '',
          endTime: this.searchForm.sureTime ? this.searchForm.sureTime[1] : '',
          source: this.searchForm.source,
          urgentLevel: this.searchForm.urgentLevel,
          equipmentName: this.searchForm.equipmentName,
          repairPhone: this.searchForm.repairPhone,
          current: this.currentPage,
          pageSize: this.pageSize,
        }
        getListPage(parms).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.tableData.forEach(element => {
              if (element.repairStatus === 1) {
                element.repairStatusName = '未受理'
              } else if (element.repairStatus === 2) {
                element.repairStatusName = '待派工'
              } else if (element.repairStatus === 3) {
                element.repairStatusName = '已驳回'
              } else if (element.repairStatus === 4) {
                element.repairStatusName = '已派工'
                if (this.userId === element.applicantId || this.userId === element.repairUserId) {
                  element.cancelApply = true
                } else {
                  element.cancelApply = false
                }
              } else if (element.repairStatus === 5) {
                element.repairStatusName = '维修中'
              } else if (element.repairStatus === 6) {
                element.repairStatusName = '已撤回'
              } else if (element.repairStatus === 7) {
                element.repairStatusName = '已完成'
                if (this.userId === element.applicantId || this.userId === element.repairUserId || this.deptId === element.deptId) {
                  element.evaluate = true
                } else {
                  element.evaluate = false
                }
              }
            })
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _addItemHandle() {
        this.$router.push('/taskSell/add')
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: '/taskSell/detail',
          query: {
            id: row.id
          }
        })
      },
      _editItemHandle(row) {
        this.$router.push({
          path: '/taskSell/edit',
          query: {
            id: row.id
          }
        })
      },
      _cancelApplyHandle(row) {
        let _this = this
        this.$confirm('确定后将取消报修订单，不可撤回。', '确认要取消报修订单吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parms = {
            id: row.id
          }
          cancelRepairOrderById(parms).then(res => {
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
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.repairOrderNumber = ''
        this.searchForm.repairUserName = ''
        this.searchForm.deptId = ''
        this.searchForm.repairStatus = ''
        this.searchForm.sureTime = ''
        this.searchForm.source = ''
        this.searchForm.urgentLevel = ''
        this.searchForm.equipmentName = ''
        this.searchForm.repairPhone = ''
      },
      handleSelectionChange(val) {
        this.multVal = val
      },
      selectionHandle() {
        let params = {
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairUserName: this.searchForm.repairUserName,
          deptId: this.searchForm.deptId,
          repairStatus: this.searchForm.repairStatus,
          startTime: this.searchForm.sureTime[0],
          endTime: this.searchForm.sureTime[1],
          source: this.searchForm.source,
          urgentLevel: this.searchForm.urgentLevel,
          equipmentName: this.searchForm.equipmentName,
          repairPhone: this.searchForm.repairPhone,
        };
        if (this.excelBtns === '1') {
          exportList(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "任务派发.xlsx"
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
            exportList({
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
                downloadLink.download = "任务派发.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }
      },
      _evaluateHandle(row) {
        this.drawerView = true
        this.repairOrderId = row.id
      },
      starChange() {
        console.log(this.starValue)
      },
      _drawerHandleClose() {
        this.drawerView = false
      },
      _onSave() {
        if (this.starValue === '' || this.starValue === 0 || this.starValue === null) {
          this.$message.warning('请选择评分')
          return false
        }
        let parms = {
          repairOrderId: Number(this.repairOrderId),
          mark: this.starValue,
          remark: this.evaluate
        }
        addComment(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.drawerView = false
            this._getData()
          } else {
            this.$message.error(res.data.message)
          }
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
</style>