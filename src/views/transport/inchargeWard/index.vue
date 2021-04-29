<template>
  <ContainerGroup class="content" layout="row">
    <Container class="left-con">
      <div class="list">
        <div class="add-btn">
          <el-button class="addGroup" icon="el-icon-plus" @click="addGroup">添加病区</el-button>
        </div>
        <div class="li" :class="activeIndex === index ? 'active' : ''" v-for="(item,index) in groupList" :key="index" @click="liClick(item,index)">
          <i class="iconfont asg">&#xe64e;</i>
          <span class="group-name" :title="item.name">{{item.name}}({{item.startTime.slice(0,5) + '~' + item.endTime.slice(0,5)}})
            <p>
              <el-tag v-for="(item1,taskType) in item.taskTypeIdAndNameList" :key="taskType" size='mini'>
                {{item1.taskTypeName}}
              </el-tag>
            </p>
          </span>
          <span class="e-d">
            <i class="el-icon-edit-outline edit el-button--text" @click="editGroup(item)"></i>
            <i class="el-icon-delete del el-button--text" @click="delGroup(item)"></i>
          </span>
        </div>
      </div>
    </Container>
    <ContainerGroup class="right-con" id="rightCon">
      <Container>
        <el-form ref="searchForm" :model="searchForm" :inline="true" label-width="70px">
          <el-form-item label="姓名：" prop="name">
            <el-input placeholder="请输入" clearable v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select placeholder="请选择" v-model="searchForm.Gender" clearable>
              <el-option :value="0" label="男"></el-option>
              <el-option :value="1" label="女"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职责：">
            <el-select placeholder="请选择" v-model="searchForm.duty" clearable>
              <el-option v-for="item in duty" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-select placeholder="请选择" v-model="searchForm.status" clearable>
              <el-option :value="0" label="禁用"></el-option>
              <el-option :value="1" label="启用"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;">
            <el-button type="primary" @click="_searchHandle">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </Container>
      <Container>
        <OperationContainer id="nevboxs">
          <el-button type="primary" icon="el-icon-plus" @click="_addItemHandle">添加</el-button>
          <el-button class="delBtn" @click="_delItemHandle"><i class="iconfont">&#xe663;</i>移除</el-button>
          <el-select size="large" v-model="excelBtns" @change="selectionHandle()" placeholder="导出数据">
            <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </OperationContainer>
        <el-table isFillHeight height="0" stripe size="mini" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="工号" show-overflow-tooltip prop="code">
            <template slot-scope="scope">
              {{scope.row.code}}
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="性别" prop="sex">
            <template slot-scope="scope">
              <span>{{scope.row.sex === 0 ? '男':'女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" prop="phone" show-overflow-tooltip></el-table-column>
          <el-table-column label="职责" prop="obligationName"></el-table-column>
          <el-table-column label="部门" prop="deptName"></el-table-column>
          <el-table-column label="状态" prop="status">
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
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    <Dialog :visible.sync="visible" class="dialog-wrapper" :title='title' :close-on-click-modal="false" :footerBtns="[
        {type:'info',text:'取消',trigger:'cancel'},{
          type:'primary',text:'提交',trigger:'onOk'
        }]" @cancel="_itemHandleClose" @onOk="addGroupHandle">
      <div class="group p-clear">
        <span class="sp"><i style='color:red;'>*</i> 病区名称：</span>
        <el-input placeholder="不超过15个字" style="width:282px;" v-model="groupName" maxlength="15"></el-input>
      </div>
      <div class="group p-clear spc">
        <span class="sp"><i style='color:red;'>*</i> 任务类型：</span>
        <el-tag :key="tag.dictId" v-for="tag in taskList" type="info" @click="selectTag(tag)" :class="tag.isActive ? 'active' : ''">
          {{tag.name}}
        </el-tag>
      </div>
      <div class="group p-clear">
        <span class="sp"> 检查类型：</span>
        <!-- <el-input placeholder="不超过15个字" v-model="groupName" maxlength="15"></el-input> -->
        <el-select placeholder="请选择" v-model="insType" size="small" multiple clearable style="width:282px;">
          <el-option v-for="item in inspectionType" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
        </el-select>
      </div>
      <div class="group p-clear">
        <span class="sp"><i style='color:red;'>*</i> 时间：</span>
        <el-time-picker style="width:282px;" value-format="HH:mm:ss" is-range v-model="timeValue" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
        <!-- <el-input type="number" v-model="sort"></el-input> -->
      </div>
      <div class="group p-clear">
        <span class="sp">排序：</span>
        <el-input type="number" style="width:282px;" v-model="sort"></el-input>
      </div>
    </Dialog>
    <!-- 侧边弹窗 -->
    <Drawer title="新增护工" :visible.sync="drawerView" @cancel="_drawerHandleClose">
      <ContainerGroup>
        <Container style="width:650px;">
          <el-form :inline="true" ref="formInline" :model="formInline" label-width="82px">
            <el-form-item label="姓名：">
              <el-input placeholder="请输入" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select placeholder="请选择" v-model="formInline.sex" clearable>
                <el-option value="0" label="男"></el-option>
                <el-option value="1" label="女"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工号：">
              <el-input placeholder="请输入" v-model="formInline.code"></el-input>
            </el-form-item>
            <el-form-item label="部门：">
              <el-select placeholder="请选择" v-model="formInline.deptId" clearable>
                <el-option v-for="(item,index) in deptList" :key="index" :value="item.dictId" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="就业时间：" prop="materialCategory">
              <el-date-picker style="width:249px" v-model="formInline.sureTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item style="float: right;">
              <el-button type='primary' @click="_drawerSearch">查询</el-button>
              <el-button @click="resetWorker">重置</el-button>
            </el-form-item>
          </el-form>
        </Container>
        <Container>
          <OperationContainer id="nevboxs">
            <el-select v-model="personnelBtns" size="large" @change="workerHandle()" placeholder="批量操作">
              <el-option v-for="item in personnelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </OperationContainer>
          <el-table :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" :data="workerData" ref="multipleTable" @selection-change="_handleWorkerSelectionChange" border>
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="工号" prop="code"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="sex">
              <template slot-scope="scope">
                <span>{{scope.row.sex === 0 ? '男': '女'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" prop="phone" width="110px"></el-table-column>
            <el-table-column label="职责" prop="obligationName"></el-table-column>
            <el-table-column label="部门" prop="deptName"></el-table-column>
            <el-table-column label="状态" prop="status">
              <template slot-scope="scope">
                {{scope.row.status === 0 ? '禁用': '启用'}}
              </template>
            </el-table-column>
            <!-- <el-table-column label="入职时间" prop="time" width="100px"></el-table-column> -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="addWorker(scope.row)" style="cursor: pointer;color:rgba(24,144,255)">添加</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="drawerTotal" :page="drawerCurrentPage" :pageSize="drawerPageSize" @pagation="drawerPagationChange" />
        </Container>
      </ContainerGroup>
    </Drawer>
    <!-- 查看 -->
    <Drawer class="drawer-wrapper" :title="infoTitle" :visible.sync="editDrawerView" @cancel="_drawerHandleClose2">
      <div class="group"><span class="sp">工号:</span>{{infoDetil.code}}</div>
      <div class="group"><span class="sp">姓名:</span>{{infoDetil.name}}</div>
      <div class="group"><span class="sp">性别:</span>{{infoDetil.sex == 0 ? '男' : '女'}}</div>
      <div class="group"><span class="sp">联系方式:</span>{{infoDetil.phone}}</div>
      <div class="group"><span class="sp">部门:</span>{{infoDetil.deptName}}</div>
      <div class="group"><span class="sp">病区:</span>{{infoDetil.tpaName}}</div>
      <div class="group"><span class="sp">职责:</span>{{infoDetil.obligationName}}</div>
      <div class="group"><span class="sp">组长:</span>{{infoDetil.leaderFlag == '1' ? '是': '否' }}</div>
      <div class="group"><span class="sp">状态:</span>{{infoDetil.status == '1' ? '启用': '禁用' }}</div>
    </Drawer>
      </Container>
    </ContainerGroup>
  </ContainerGroup>
</template>

<script>
  import pagination from './../../../components/pagination/index'
  import {
    getDept
  } from './../../../apis/userManagement/indexApi'
  import {
    getObligation,
    updNursingGroupUser,
  } from './../../../apis/nursing/indexApi'
  import {
    paExport,
    getPatientArea,
    getTaskType,
    getCheckType,
    addPatientArea,
    getPatientAreaById,
    delPatientArea,
    updPatientArea,
    getPatientAreaUserList,
    updateStatus,
    getUserListPageByNursing,
    saveBatchPatientAreaUser,
    deleteSelected,
  } from './../../../apis/inchargeWard/indexApi'

  export default {
    name: 'inchargeWard', // 负责病区
    components: {
      pagination
    },
    data() {
      return {
        tableheight: '0px',
        workerSelection: [],
        temporary: [],
        changeList: [],
        timeValue: '',
        insType: [],
        inspectionType: [],
        activeDictId: [],
        taskList: [],
        // groupListsss: [{
        //     label: "陪检",
        //     value: "1",
        //   },
        //   {
        //     label: "物品",
        //     value: "2",
        //   },
        //   {
        //     label: "标本",
        //     value: "2",
        //   },

        // ],
        tnguIds: [],
        currentNursing: '',
        currentList: [],
        currentGroup: '',
        infoDetil: {},
        initId: '',
        duty: [],
        moveVisible: false,
        multipleSelection: [],
        infoTitle: '',
        isEdit: false,
        searchForm: {
          name: '',
          Gender: '',
          duty: '',
          status: '',
        },
        personnelBtns: '',
        personnelBtnList: [{
            label: "添加全部",
            value: "1",
          },
          {
            label: "批量添加",
            value: "2",
          },
        ],
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
        currentPage: 1,
        total: 0,
        pageSize: 20,
        starValue: null,
        evaluate: '',
        activeIndex: 0,
        groupList: [],
        title: '新增病区',
        visible: false,
        groupName: '',
        sort: '',
        id: '',
        formInline: {},
        deptList: [],
        drawerView: false,
        workerData: [],
        drawerTotal: 0,
        drawerCurrentPage: 1,
        drawerPageSize: 20,
        editDrawerView: false,
        isGroupLeader: '2',
        status: ''
      }
    },
    mounted() {
      // this.getAutoHeight()
      const self = this
      // window.onresize = function() {
      //   self.getAutoHeight()
      // }
    },
    created() {
      this.getDeptList()
      this.getGroup()
      getObligation().then(res => {
        if (res.data.code === 200) {
          this.duty = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
      getTaskType().then(res => {
        if (res.data.code === 200) {
          this.taskList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    methods: {
      getAutoHeight() {
        // 设置页面高度 防止出现滚动条
        var allheight = document.getElementById("rightCon")
        var topheight = document.getElementById("wrapperform")
        var boxheight = document.getElementById("morboxs")
        // 一定要使用 nextTick 来改变height 不然不会起作用
        this.$nextTick(() => {
          this.tableheight = allheight.clientHeight - (topheight.clientHeight + boxheight.clientHeight + 72 + 70) + "px"
        })
      },
      resetWorker() {
        this.formInline = {}
      },
      _drawerHandleClose2() {
        this.editDrawerView = false
      },
      workerHandle() {
        let params = {
          patientAreaId: this.initId,
          tpaUserIds: [],
        }
        if (this.personnelBtns == "1") {
          // 全部添加
          saveBatchPatientAreaUser(params).then((res) => {
            if (res.data.code === 200) {
              this._getMemberList()
            }
          });
          this.personnelBtns = "";
        } else if (this.personnelBtns == "2") {
          // 批量操作
          if (
            this.workerSelection === undefined ||
            this.workerSelection.length === 0
          ) {
            this.$message.warning("请选择要添加的人员");
            this.personnelBtns = "";
            return false;
          } else {
            let ids = [];
            this.workerSelection.forEach((element) => {
              ids.push(element.tnguId);
            });
            params.tpaUserIds = ids
            saveBatchPatientAreaUser(params).then((res) => {
              if (res.data.code === 200) {
                this._getMemberList()
              }
            });
          }
          this.personnelBtns = "";
        }

      },
      // 任务类型多选
      selectTag(item) {
        // this.taskList.forEach((items) => {
        //   if (item.dictId == items.dictId) {
        if (item.isActive) {
          item.isActive = false
        } else {
          item.isActive = true
        }
        this.$forceUpdate()
        // }
        // })
        // this.taskList = JSON.parse(JSON.stringify(this.taskList))
      },
      active_text(row) {
        let parms = {
          id: row.tpauIds
        }
        updateStatus(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success('修改成功')
            this._getData()
          } else {
            this.$message.success('操作失败')
          }
        })
      },
      selectionHandle() {
        let params = {
          userIds: [],
          patientAreaId: this.initId,
          name: this.searchForm.name,
          obligationId: this.searchForm.duty,
          sex: this.searchForm.Gender,
          status: this.searchForm.status
        };
        if (this.excelBtns == "1") {
          // 全部导出
          paExport(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "病区护工信息.xlsx";
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
              ids.push(element.tnguId);
            });
            params.userIds = ids
            paExport(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "病区护工信息.xlsx";
                downloadLink.click();
                window.URL.revokeObjectURL(downUrl);
              }
            });
          }
          this.excelBtns = "";
        }
      },
      _getData() {
        let params = {
          patientAreaId: this.initId,
          name: this.searchForm.name,
          obligationId: this.searchForm.duty,
          sex: this.searchForm.Gender,
          status: this.searchForm.status
        }
        getPatientAreaUserList(params).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })


      },
      getGroup() {
        getPatientArea().then(res => {
          if (res.data.code === 200) {
            this.groupList = res.data.data
            if (!this.initId) {
              this.initId = this.groupList[0].id
            }
            this.$nextTick(() => {
              this._getData()
            })
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
        if (this.formInline.sureTime === undefined ||
          this.formInline.sureTime === null) {
          this.hasTime = true
        } else {
          this.hasTime = false
        }
        let parms = {
          startTime: this.hasTime ? '' : this.formInline.sureTime[0],
          endTime: this.hasTime ? '' : this.formInline.sureTime[1],
          code: this.formInline.code,
          name: this.formInline.name,
          sex: this.formInline.sex,
          deptId: this.formInline.deptId,
          current: this.drawerCurrentPage,
          size: this.drawerPageSize,
        }
        getUserListPageByNursing(parms).then(res => {
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
        this.initId = item.id
        this._getData()
      },
      addGroup() {
        this.title = '新增病区'
        this.visible = true
        // 获取检查类型下拉
        getCheckType().then(res => {
          if (res.data.code === 200) {
            this.inspectionType = res.data.data
            this.temporary = this.inspectionType
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      editGroup(item) {
        this.title = '编辑病区'
        this.visible = true
        this.id = item.id
        getPatientAreaById(item.id).then(res => {
          if (res.data.code === 200) {
            this.id = res.data.data.id
            this.groupName = res.data.data.typeName
            this.sort = res.data.data.sort
            this.timeValue = [res.data.data.startTime].concat([res.data.data.endTime]) // 时间
            this.activeDictId = res.data.data.taskTypeList
            this.inspectionType = res.data.data.dictIdAndNameVoList
            this.insType = res.data.data.checkTypeList
            // 选中任务类型
            this.activeDictId.forEach((element) => {
              this.taskList.forEach((item) => {
                if (item.dictId == element) {
                  item.isActive = true
                }
              })
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      delGroup(item) {
        let _this = this
        this.$confirm('删除过后病区信息及护工人员都将被清空，确定删除吗？', '确认要删除病区吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPatientArea(item.id).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.getGroup()
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
        // 新增病区类型选中
        this.changeList = this.taskList.map(item => {
          if (item.isActive) {
            return item.dictId
          }
        })
        this.changeList = this.changeList.filter(item => {
          return item !== undefined
        })
        if (this.groupName === '') {
          this.$message.warning('请输入病区名称')
          return false
        }
        if (this.changeList.length === 0) {
          this.$message.warning('请选择任务类型')
          return false
        }
        if (this.timeValue === '' || this.timeValue === null) {
          this.$message.warning('请选择时间')
          return false
        }
        if (!(this.sort > 0)) {
          this.$message.warning('请输入正数')
          return false
        }
        if (this.title === '新增病区') {
          let parms = {
            name: this.groupName,
            sort: this.sort,
            checkTypeList: this.insType,
            endTime: this.timeValue[1],
            startTime: this.timeValue[0],
            taskTypeList: this.changeList,
          }
          addPatientArea(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this._itemHandleClose()
              this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          let parms = {
            id: this.id,
            name: this.groupName,
            sort: this.sort,
            checkTypeList: this.insType,
            endTime: this.timeValue[1],
            startTime: this.timeValue[0],
            taskTypeList: this.changeList,
          }
          updPatientArea(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this._itemHandleClose()
              this.getGroup()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      },

      addWorker(row) {
        let params = {
          patientAreaId: this.initId,
          "tpaUserIds": [row.tnguId],
        }
        saveBatchPatientAreaUser(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this._getMemberList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _itemHandleClose() {
        this.visible = false
        this.groupName = ''
        this.sort = ''
        this.insType = []
        this.timeValue = ''
        this.changeList = []
        this.activeDictId = []
        // if (this.title === '编辑病区') {
        //   this.inspectionType = []
        //   this.inspectionType = this.inspectionType.concat(this.temporary)
        // }
        // 清除选中
        this.taskList.forEach((item) => {
          item.isActive = false
        })
      },
      _addItemHandle() {
        this.drawerView = true
        this._getMemberList()
      },
      _delItemHandle() {
        if (
          this.multipleSelection === undefined ||
          this.multipleSelection.length === 0
        ) {
          this.$message.warning("请选择要移除的人员");
          return false;
        }
        let _this = this
        this.$confirm('删除过后护工将不在该病区内，确定移除吗？', '确认要移除护工吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          this.multipleSelection.forEach((element) => {
            ids.push(element.tpauIds);
          });
          let params = {
            tpauIds: ids
          }
          deleteSelected(params).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.getGroup()
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      _toDetailHandle(row) {
        this.editDrawerView = true
        this.infoTitle = '查看信息'
        this.isEdit = false
        let obj = JSON.parse(JSON.stringify(row))
        this.infoDetil = obj
        // getNursingGroupUserById(row.tnguId).then(res=> {
        //   if(res.data.code === 200) {
        //     console.log(res)
        //     this.infoDetil =
        //   } else {
        //     this.$message.error(res.data.message)
        //   }
        // })
      },
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.name = ''
        this.searchForm.Gender = ''
        this.searchForm.duty = ''
        this.searchForm.status = ''
      },
      _drawerHandleClose() {
        this.drawerView = false
        this.formInline = {}
        this.getGroup()
      },
      _handleWorkerSelectionChange(val) {
        this.workerSelection = val
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      },
      _drawerSearch() {
        this._getMemberList()
      },
      drawerPagationChange(payload) {
        this.drawerCurrentPage = payload.page
        this.drawerPageSize = payload.pageSize
        this._getMemberList()
      }
    },
    // 销毁全局事件
    // destroyed() {
    //   window.onresize = null
    // }
  }
</script>
<style lang="less" scoped>
  .spc {
    line-height: 30px;

    .active {
      background: #217DFA;
      color: #ffffff;
    }

    .el-tag {
      cursor: pointer;
    }

    .el-tag+.el-tag {
      margin-left: 10px;
    }
  }

  .el-tag--mini {

    &:nth-child(1) {
      background: #3E9E7F;
      color: #fff;
    }

    &:nth-child(2) {
      margin: 0px 4px;
      background: #FF8E2F;
      color: #fff;
    }

    &:nth-child(3) {
      background: #1d93a8;
      color: #fff;
    }
  }

  .warn {
    background: #FF5656;
    border-radius: 7px;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
  }

  .content {
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .left-con {
    flex: 0 0 300px;
  }

  .list {
    overflow-y: auto;
    height: 750px;
    margin: 20px;
    border: 1px solid #e8eaed;

    .add-btn {
      text-align: center;
      line-height: 66px;

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
      height: 65px;
      line-height: 24px;
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
        width: 60%;
      }

      .e-d {
        float: right;
        margin-top: 6px;

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
      height: 65px;
      left: 0px;
      top: 0px;
      // background: #AE3036;
      position: absolute;
      content: "";
    }
  }

  .right-con {
    // float: left;
    // width: 80%;
    flex: 1;
    margin-left: 15px;
    width: 0;
    overflow: auto;
  }

  .delBtn {
    height: 32px;
    padding: 10px 28px;
    color: #FF5656;
    border-color: #FF5656;
    line-height: 0;

    i {
      position: relative;
      left: -4px;
      top: 1px;
    }
  }

  .dialog-wrapper {
    .group {
      margin-bottom: 20px;

      .sp {
        float: left;
        width: 100px;
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
      margin: 20px 0;
      line-height: 20px;
      padding-left: 18px;

      .sp {
        float: left;
        width: 80px;
        text-align: right;
        margin-right: 10px;
      }

      .line40 {
        line-height: 40px;
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