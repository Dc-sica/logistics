<template>
  <ContainerGroup>
    <div class="content">
      <Container class="left-con">
        <div class="list">
          <div class="add-btn">
            <el-button class="addGroup" icon="el-icon-plus" @click="addGroup">添加小组</el-button>
          </div>
          <div class="li" :class="activeIndex === index ? 'active' : ''" v-for="(item,index) in groupList" :key="index" @click="liClick(item,index)">
            <i class="iconfont asg">&#xe6a5;</i>
            <span class="group-name" :title="item.groupName">{{item.groupName}}({{item.userCount?item.userCount:0}}人)</span>
            <span class="e-d">
              <i class="el-icon-edit-outline edit el-button--text" @click="editGroup(item)"></i>
              <i class="el-icon-delete del el-button--text" @click="delGroup(item)"></i>
            </span>
          </div>
        </div>
      </Container>
      <ContainerGroup class="right-con">
        <Container>
          <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="82px">
            <el-form-item label="姓名：">
              <el-input placeholder="请输入" clearable v-model="searchForm.repairUserName"></el-input>
            </el-form-item>
            <el-form-item label="工号：">
              <el-input placeholder="请输入" clearable v-model="searchForm.repairCode"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input placeholder="请输入" clearable v-model="searchForm.repairPhone"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select placeholder="请选择" v-model="searchForm.status">
                <el-option :value="0" label="禁用"></el-option>
                <el-option :value="1" label="启用"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工种分类：">
              <el-select placeholder="请选择" v-model="searchForm.workTypeId" multiple>
                <el-option v-for="item in workTypeList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float:right;">
              <el-button type="primary" @click="_searchHandle">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </Container>
        <Container>
          <OperationContainer id="nevboxs">
            <el-button type="primary" icon="el-icon-plus" @click="_addItemHandle">添加</el-button>
            <el-button @click="_moveItemHandle" class="moveBtn"><i class="iconfont">&#xeb12;</i>移动</el-button>
            <el-button @click="_delItemHandle" class="delBtn"><i class="iconfont">&#xe663;</i>移除</el-button>
            <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
              <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </OperationContainer>
          <el-table :data="tableData" border :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" @selection-change="handleSelectionChange" v-loading="loading">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="工号" min-width="120">
              <template slot-scope="scope">
                <span>{{scope.row.code}}</span>
                <span class="isLeader" v-if="scope.row.leaderFlag === 1">组长</span>
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="sex">
              <template slot-scope="scope">
                {{scope.row.sex === 0?'男':'女'}}
              </template>
            </el-table-column>
            <el-table-column label="联系方式" prop="phone" show-overflow-tooltip></el-table-column>
            <el-table-column label="工种分类" prop="workTypeName" show-overflow-tooltip>
              <template slot-scope="scope">
                <span class="workType" v-for="(item,index) in scope.row.workTypeList" :key="index">
                  {{item}}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="部门" prop="deptName"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.status" @click.stop.native @change="active_text(scope.row)" active-color="#217DFA" inactive-color="#E5E5E5" :active-value="1" :inactive-value="0"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看" placement="top">
                  <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button type="text" @click="_editItemHandle(scope.row)">
                    <i class="el-icon-edit-outline"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
        </Container>
      </ContainerGroup>
      <!-- 添加编辑小组 -->
      <Dialog :visible.sync="visible" class="dialog-wrapper" :title='title' :close-on-click-modal="false" :footerBtns="[
        {type:'info',text:'取消',trigger:'cancel'},{
          type:'primary',text:'提交',trigger:'onOk'
        }]" @cancel="_itemHandleClose" @onOk="addGroupHandle">
        <div class="group p-clear">
          <span class="sp"><i style='color:red;'>*</i> 小组名称：</span>
          <el-input placeholder="请输入维修组名称" v-model="groupName" maxlength="15"></el-input>
        </div>
        <div class="group p-clear">
          <span class="sp">排序：</span>
          <el-input type="number" v-model="sort"></el-input>
        </div>
        <!-- <div style="text-align:center; padding-top:10px;margin-top:10px;">
          <el-button round @click="_itemHandleClose" style="color:#FF8C00;border-color:#FF8C00;">取消</el-button>
          <el-button round type="primary" @click="addGroupHandle">提交</el-button>
        </div> -->
      </Dialog>
      <!-- 移动人员至小组 -->
      <Dialog :visible.sync="moveVisible" class="dialog-wrapper" title='移动小组' :close-on-click-modal="false" :footerBtns=" [
        {type:'info',text:'取消',trigger:'cancel'},{
          type:'primary',text:'提交',trigger:'onOk'
        }]" @cancel="_moveHandleClose" @onOk="moveGroupHandle">
        <div class="group p-clear">
          <span class="sp"> 当前小组：</span>
          <el-input v-model="moveGroupName" disabled></el-input>
        </div>
        <div class="group p-clear">
          <span class="sp"><i style='color:red;'>* </i>移动至：</span>
          <el-select placeholder="请选择" size="small" style="width:69%" clearable v-model="toGroupName">
            <el-option v-for="(item,index) in groupList" :key="index" :value="item.id" :label="item.groupName"></el-option>
          </el-select>
        </div>
        <!-- <div style="text-align:center; padding-top:10px;margin-top:10px;">
          <el-button round @click="_moveHandleClose" style="color:#FF8C00;border-color:#FF8C00;">取消</el-button>
          <el-button round type="primary" @click="moveGroupHandle">提交</el-button>
        </div> -->
      </Dialog>
      <!-- 侧边弹窗 -->
      <Drawer title="新增维修工" :visible.sync="drawerView" size="60%" @cancel="_drawerHandleClose">
        <ContainerGroup>
          <Container style="width:650px;">
            <el-form :inline="true" ref="formInline" :model="formInline">
              <el-form-item label="姓名：">
                <el-input placeholder="请输入" v-model="formInline.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="工号：">
                <el-input placeholder="请输入" v-model="formInline.code" clearable></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-select placeholder="请选择" v-model="formInline.sex" clearable>
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门：">
                <el-select placeholder="请选择" v-model="formInline.deptId" clearable>
                  <el-option v-for="(item,index) in deptList" :key="index" :value="item.dictId" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就业时间：" prop="materialCategory">
                <el-date-picker v-model="formInline.sureTime" size="small" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item style="float: right;">
                <el-button type='primary' @click="_drawerSearch">查询</el-button>
                <el-button @click="_drawerReset">重置</el-button>
              </el-form-item>
            </el-form>
          </Container>
          <Container>
            <OperationContainer id="nevboxs">
              <el-select v-model="drawerBtns" size="large" @change="_drawerSelectionHandle()" placeholder="批量操作">
                <el-option v-for="item in addBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </OperationContainer>
            <el-table :data="workerData" ref="multipleTable" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" @selection-change="_handleWorkerSelectionChange" border>
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="工号" prop="code" show-overflow-tooltip></el-table-column>
              <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
              <el-table-column label="性别" prop="sex">
                <template slot-scope="scope">
                  <span>{{scope.row.sex === 0 ? '男' : '女'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系方式" prop="phone" show-overflow-tooltip></el-table-column>
              <el-table-column label="部门" prop="deptName" show-overflow-tooltip></el-table-column>
              <el-table-column label="入职时间" prop="time" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span class="pointer" @click="addWorker(scope.row)">添加</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="drawerTotal" :page="drawerCurrentPage" :pageSize="drawerPageSize" @pagation="drawerPagationChange" />
          </Container>
        </ContainerGroup>
      </Drawer>
      <!-- 编辑信息 -->
      <Drawer :title="editDrawerTitle" :visible.sync="editDrawerView" class="drawer-wrapper" @onOk="_onSave" @cancel="_drawerHandleClose2" :footerBtns=" isEdit ?[{ type: 'info', text: '取消', trigger: 'cancel' }] :[
        { type: 'info', text: '取消', trigger: 'cancel' },
         { type: 'primary', text: '保存', trigger: 'onOk' }
      ]">
        <div class="group"><span class="sp">工号:</span>{{workerDetail.code}}</div>
        <div class="group"><span class="sp">姓名:</span>{{workerDetail.name}}</div>
        <div class="group"><span class="sp">性别:</span>{{workerDetail.sex === 0 ? '男': '女'}}</div>
        <div class="group"><span class="sp">联系方式:</span>{{workerDetail.phone}}</div>
        <div class="group"><span class="sp">部门:</span>{{workerDetail.deptName}}</div>
        <div class="group" v-if="isEdit">
          <span class="sp">维修组:</span>{{workerDetail.groupName}}
        </div>
        <div class="group" v-else>
          <span class="sp line40"><i style='color:red;'>*</i> 维修组:</span>
          <el-select placeholder="请选择" size="small" v-model="workerDetail.groupId" clearable>
            <el-option v-for="(item,index) in groupList" :key="index" :value="item.id" :label="item.groupName"></el-option>
          </el-select>
        </div>
        <div class="group" v-if="isEdit">
          <span class="sp">工种分类:</span>{{workerDetail.workTypeName}}
        </div>
        <div class="group" v-else>
          <span class="sp line40"><i style='color:red;'>*</i> 工种分类:</span>
          <el-select placeholder="请选择" size="small" v-model="workerDetail.workTypeId" multiple>
            <el-option v-for="item in workTypeList" :key="item.dictId" :value="item.dictId" :label="item.name"></el-option>
          </el-select>
        </div>
        <div class="group" v-if="isEdit">
          <span class="sp">维修组长:</span>{{workerDetail.leaderFlag === 1 ? '是' : '否'}}
        </div>
        <div class="group" v-else>
          <span class="sp"><i style='color:red;'>*</i> 维修组长:</span>
          <el-radio v-model="workerDetail.leaderFlag" label="1">是</el-radio>
          <el-radio v-model="workerDetail.leaderFlag" label="0">否</el-radio>
        </div>
        <div class="group" v-if="isEdit">
          <span class="sp">状态:</span>{{workerDetail.status === 1 ? '启用' : '禁用'}}
        </div>
        <div class="group" v-else>
          <span class="sp"><i style='color:red;'>*</i> 状态:</span>
          <el-radio v-model="workerDetail.status" label="1">启用</el-radio>
          <el-radio v-model="workerDetail.status" label="0">禁用</el-radio>
        </div>
      </Drawer>
    </div>
  </ContainerGroup>
</template>

<script>
  import pagination from './../../../components/pagination/index'
  import {
    getDept
  } from './../../../apis/userManagement/indexApi'
  import {
    getGroupList,
    addRepairGroup,
    updateRepairGroup,
    addRepairGroupUser,
    selectRepairUserListPage,
    getGroupUserList,
    delRepairGroup,
    updateRepairGroupUser,
    exportList,
    removeRepairGroupUser,
    moveRepairGroupUser,
    updLeaderFlag
  } from './../../../apis/workerManage/indexApi'

  export default {
    name: 'workerManage',
    components: {
      pagination
    },
    data() {
      return {
        searchForm: {
          repairUserName: '',
          repairCode: '',
          repairPhone: '',
          status: '',
          workTypeId: []
        },
        workTypeList: [],
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
        drawerBtns: '',
        addBtnList: [{
            label: "添加全部",
            value: "1",
          },
          {
            label: "批量添加",
            value: "2",
          },
        ],
        multVal: [],
        drawerMultVal: [],
        tableData: [],
        loading: false,
        currentPage: 1,
        total: 0,
        pageSize: 20,
        starValue: null,
        evaluate: '',
        activeIndex: 0,
        groupList: [],
        groupId: '',
        title: '新增小组',
        visible: false,
        groupName: '',
        sort: '',
        id: '',
        formInline: {
          name: '',
          sex: '',
          code: '',
          deptId: '',
          sureTime: ''
        },
        deptList: [],
        drawerView: false,
        workerDetail: {},
        workerData: [],
        drawerTotal: 0,
        drawerCurrentPage: 1,
        drawerPageSize: 20,
        editDrawerView: false,
        editDrawerTitle: '',
        isGroupLeader: '',
        status: '',
        moveVisible: false,
        moveGroupName: '',
        toGroupName: '',
        isEdit: false
      }
    },
    mounted() {
      this.getWorkTypeList()
      this.getDeptList()
      this.getGroup()
    },
    methods: {
      getWorkTypeList() {
        getDept({
          categoryCode: 'workType',
          status: 1
        }).then(res => {
          if (res.data.code === 200) {
            this.workTypeList = res.data.data.sysDictList
            this.workTypeList.forEach(element => {
              element.dictId = element.dictId.toString()
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getData() {
        let parms = {
          groupId: this.groupId,
          repairUserName: this.searchForm.repairUserName,
          repairCode: this.searchForm.repairCode,
          repairPhone: this.searchForm.repairPhone,
          status: this.searchForm.status,
          workTypeIds: this.searchForm.workTypeId,
          current: this.currentPage,
          size: this.pageSize
        }
        this.loading = true
        getGroupUserList(parms).then(res => {
          if (res.data.code === 200) {
            this.loading = false
            this.tableData = res.data.data.list
            this.tableData.forEach(element => {
              if (element.status === 1) {
                element.statusName = true
              } else {
                element.statusName = false
              }
              if (element.workTypeName) {
                element.workTypeList = element.workTypeName.split(',')
              } else {
                element.workTypeList = []
              }
            })
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      // 获取维修小组
      getGroup() {
        getGroupList().then(res => {
          if (res.data.code === 200) {
            this.groupList = res.data.data
            this.groupList.forEach(element => {
              element.id = element.id.toString()
            })
            if (this.groupList.length > 0) {
              this.groupId = this.groupList[0].id
              this.groupName = this.groupList[0].groupName
              this.moveGroupName = this.groupList[0].groupName
            } else {
              this.groupId = ''
            }
            this._getData()
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getDeptList() {
        getDept({
          categoryCode: 'dept',
          status: 1
        }).then(res => {
          if (res.data.code === 200) {
            this.deptList = res.data.data.sysDictList
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getMemberList() {
        let parms = {
          groupId: this.groupId,
          code: this.formInline.code,
          name: this.formInline.name,
          sex: this.formInline.sex,
          deptId: this.formInline.deptId,
          startTime: this.formInline.sureTime ? this.formInline.sureTime[0] : '',
          endTime: this.formInline.sureTime ? this.formInline.sureTime[1] : '',
          current: this.drawerCurrentPage,
          size: this.drawerPageSize,
          deleteFlag: 0
        }
        selectRepairUserListPage(parms).then(res => {
          if (res.data.code === 200) {
            this.workerData = res.data.data.list
            this.drawerTotal = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      liClick(item, index) {
        this.activeIndex = index
        this.groupId = item.id
        this.moveGroupName = item.groupName
        this._getData()
      },
      addGroup() {
        this.title = '新增小组'
        this.visible = true
        this.groupName = ''
        this.sort = ''
      },
      editGroup(item) {
        this.title = '编辑小组'
        this.visible = true
        this.id = item.id
        this.groupName = item.groupName
        this.sort = item.sort
      },
      delGroup(row) {
        let _this = this
        this.$confirm('删除过后小组信息及维修工人员都将被清空，确定删除吗？', '确认要删除小组吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parms = {
            id: row.id
          }
          delRepairGroup(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              _this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      addGroupHandle() {
        if (this.groupName === '') {
          this.$message.warning('请输入小组名称')
          return false
        }
        if (this.title === '新增小组') {
          let parms = {
            groupName: this.groupName,
            sort: this.sort
          }
          addRepairGroup(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.visible = false
              this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          let parms = {
            groupName: this.groupName,
            sort: this.sort,
            id: this.id
          }
          updateRepairGroup(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.visible = false
              this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      },
      addWorker(row) {
        let parms = {
          groupId: this.groupId,
          userId: row.userId
        }
        if (this.groupId === '') {
          this.$message.warning('请选择要添加的小组')
          return false
        }
        addRepairGroupUser(parms).then(res => {
          if (res.data.code === 200) {
            this.drawerView = false
            this.getGroup()
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _itemHandleClose() {
        this.visible = false
      },
      _addItemHandle() {
        this.drawerView = true
        this.drawerBtns = ''
        this.drawerMultVal = []
        this._getMemberList()
      },
      _moveItemHandle() {
        if (this.multVal.length === 0) {
          this.$message.warning('请选择要移动的人员')
          return false
        } else {
          this.moveVisible = true
        }
      },
      _delItemHandle() {
        let _this = this
        if (this.multVal.length === 0) {
          this.$message.warning('请选择要移除的人员')
          return false
        }
        this.$confirm('删除过后维修工将不在该小组内，确定移动吗？', '确认要移除维修工吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          _this.multVal.forEach(element => {
            ids.push(element.id)
          })
          let parms = {
            groupId: this.groupId,
            ids: ids
          }
          removeRepairGroupUser(parms).then(res => {
            if (res.data.code === 200) {
              _this.$message.success(res.data.message)
              _this.getGroup()
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
      handleSelectionChange(val) {
        this.multVal = val
      },
      selectionHandle() {
        let params = {
          groupId: this.groupId,
          repairUserName: this.searchForm.repairUserName,
          repairCode: this.searchForm.repairCode,
          repairPhone: this.searchForm.repairPhone,
          status: this.searchForm.status,
          workTypeIds: this.searchForm.workTypeId,
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
              downloadLink.download = "维修工.xlsx"
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
                downloadLink.download = "维修工.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }
      },
      active_text(row) {
        let parms = {
          "groupId": Number(row.groupId),
          "id": Number(row.id),
          "status": Number(row.status),
        }
        updateRepairGroupUser(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this._getData()
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _toDetailHandle(row) {
        this.editDrawerView = true
        this.editDrawerTitle = '详情'
        this.isEdit = true
        this.$nextTick(() => {
          this.workerDetail = JSON.parse(JSON.stringify(row))
        })
      },
      _editItemHandle(row) {
        this.editDrawerView = true
        this.editDrawerTitle = '编辑信息'
        this.isEdit = false
        this.$nextTick(() => {
          this.workerDetail = JSON.parse(JSON.stringify(row))
          this.workerDetail.status = this.workerDetail.status.toString()
          this.workerDetail.leaderFlag = this.workerDetail.leaderFlag ? this.workerDetail.leaderFlag.toString() : '0'
          let arr = []
          if (this.workerDetail.workTypeId) {
            arr = this.workerDetail.workTypeId.split(';')
            arr.forEach(element => {
              element = element.toString()
            })
            this.workerDetail.workTypeId = arr
          }
        })
      },
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.repairUserName = ''
        this.searchForm.repairCode = ''
        this.searchForm.repairPhone = ''
        this.searchForm.status = ''
        this.searchForm.workTypeId = []
      },
      _drawerHandleClose() {
        this.drawerView = false
      },
      _drawerHandleClose2() {
        this.editDrawerView = false
      },
      _moveHandleClose() {
        this.moveVisible = false
      },
      moveGroupHandle() {
        let _this = this
        this.$confirm('移动过后维修工将改变小组信息，确定移动吗？', '确认要移动维修工吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          _this.multVal.forEach(element => {
            ids.push(element.id)
          })
          let parms = {
            groupId: _this.toGroupName,
            ids: ids
          }
          moveRepairGroupUser(parms).then(res => {
            if (res.data.code === 200) {
              _this.$message.success(res.data.message)
              _this.moveVisible = false
              _this.getGroup()
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
      _onSave() {
        if (this.workerDetail.groupId === '') {
          this.$message.warning('请选择维修组')
          return false
        }
        if (!this.workerDetail.workTypeId || this.workerDetail.workTypeId == '') {
          this.$message.warning('请选择工种分类')
          return false
        }
        let parms = {
          "groupId": Number(this.workerDetail.groupId),
          "id": Number(this.workerDetail.id),
          "leaderFlag": Number(this.workerDetail.leaderFlag),
          "repairCode": this.workerDetail.repairCode,
          "repairPhone": this.workerDetail.repairPhone,
          "repairUserName": this.workerDetail.repairUserName,
          "status": Number(this.workerDetail.status),
          "workTypeIds": this.workerDetail.workTypeId,
        }
        updateRepairGroupUser(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.editDrawerView = false
            this._getData()
          } else {
            if (res.data.message === '当前已有组长') {
              let _this = this
              this.$confirm('确认要重新设置组长吗？', '该组已有组长', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                let parms = {
                  groupUserId: _this.workerDetail.id
                }
                updLeaderFlag(parms).then(res => {
                  if (res.data.code === 200) {
                    _this.$message.success(res.data.message)
                    this.editDrawerView = false
                    this._getData()
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
            } else {
              this.$message.error(res.data.message)
            }
          }
        })
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      },
      _drawerSelectionHandle() {
        // 1全部  2 批量
        if (this.drawerBtns === '1') {
          let parms = {
            groupId: this.groupId,
            addAll: 1
          }
          addRepairGroupUser(parms).then(res => {
            if (res.data.code === 200) {
              this.drawerView = false
              this.drawerBtns = ''
              this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          let ids = []
          if (this.drawerMultVal.length === 0) {
            this.$message.warning('请选择要添加的人员')
            return false
          }
          this.drawerMultVal.forEach(element => {
            ids.push(element.userId)
          })
          let parms = {
            groupId: this.groupId,
            ids: ids,
            addAll: 0
          }
          addRepairGroupUser(parms).then(res => {
            if (res.data.code === 200) {
              this.drawerView = false
              this.drawerBtns = ''
              this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      },
      _handleWorkerSelectionChange(val) {
        this.drawerMultVal = val
      },
      _drawerSearch() {
        this.drawerCurrentPage = 1
        this._getMemberList()
      },
      _drawerReset() {
        this.formInline.name = ''
        this.formInline.code = ''
        this.formInline.sex = ''
        this.formInline.deptId = ''
        this.formInline.sureTime = ''
      },
      drawerPagationChange(payload) {
        this.drawerCurrentPage = payload.page
        this.drawerPageSize = payload.pageSize
        this._getMemberList()
      }
    }
  }
</script>
<style lang="less" scoped>
  .content {
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .left-con {
    width: 300px;
    // flex: 0 0 300px;
    margin-right: 10px;
    background: #fff;

    .list {
      overflow-y: auto;
      height: 750px;
      margin: 20px;
      border: 1px solid #e8eaed;

      .add-btn {
        padding: 12px 10px;
        text-align: center;
        background: #f7f7f7;
        border-bottom: 1px solid #e8eaed;

        .addGroup {
          padding: 8px 32px;
          background: #217DFA;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
        }
      }

      .li {
        min-width: 200px;
        height: 44px;
        line-height: 26px;
        padding: 10px;
        box-sizing: border-box;
        border-top: 1px solid #e8eaed;
        position: relative;
        cursor: pointer;

        &:last-child {
          border-bottom: 1px solid #e8eaed;
        }

        .asg {
          margin-right: 12px;
          float: left;
        }

        .group-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: inline-block;
          width: 50%;
        }

        .e-d {
          float: right;

          i {
            cursor: pointer;
          }

          .edit {
            margin-right: 20px;
          }
        }
      }

      div.li.active::before {
        background: #217DFA;
        display: block;
        width: 5px;
        height: 44px;
        left: 0px;
        top: 0px;
        // background: #AE3036;
        position: absolute;
        content: "";
      }
    }
  }

  .right-con {
    flex: 1;
    overflow: auto;
  }


  .addBtn {
    background: #1D93A8;
    color: #fff;
    height: 32px;
    float: left;
    margin-right: 20px;
    padding: 10px 28px;
  }

  .moveBtn {
    border-color: #FF8C00;
    color: #FF8C00;
    height: 32px;
    line-height: 0;

    i {
      position: relative;
      left: -4px;
      top: 1px;
    }
  }

  .delBtn {
    height: 32px;
    line-height: 0;
    color: #FF5656;
    border-color: #FF5656;

    i {
      position: relative;
      left: -4px;
      top: 1px;
    }
  }

  .isLeader {
    background: #fff1f0;
    border: 1px solid #ff5656;
    border-radius: 7px;
    padding: 0 7px;
    color: #FF5656;
    margin-left: 10px;
  }

  .workType {
    display: block;
    float: left;
    margin-right: 5px;
    padding: 5px 10px;
    background: #fafafa;
    border: 1px solid #e8eaed;
    border-radius: 6px;
  }

  .pointer {
    cursor: pointer;
  }

  .dialog-wrapper {
    .group {
      margin-bottom: 20px;

      .sp {
        float: left;
        width: 80px;
        line-height: 30px;
        text-align: right;
      }

      .el-input {
        float: left;
        width: 69%;
      }
    }
  }

  .drawer-wrapper {
    .group {
      margin: 30px 0;
      line-height: 20px;
      padding-left: 18px;
      height: 20px;

      .sp {
        float: left;
        width: 80px;
        text-align: right;
        margin-right: 10px;
      }

      .line40 {
        line-height: 30px;
      }

      .textarea {
        float: left;
        width: 85%;
      }
    }
  }
</style>