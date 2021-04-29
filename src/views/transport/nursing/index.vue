<template>
  <ContainerGroup class="content" layout="row">
    <Container class="left-con">
      <div class="list">
        <div class="add-btn">
          <el-button class="addGroup" icon="el-icon-plus" @click="addGroup">添加小组</el-button>
        </div>
        <div class="li" :class="activeIndex === index ? 'active' : ''" v-for="(item, index) in groupList" :key="index" @click="liClick(item, index)">
          <i class="iconfont asg">&#xe6a5;</i>
          <span class="group-name" :title="item.nursingName">{{ item.nursingName }}({{ item.userCount }}人)</span>
          <span class="e-d">
            <i class="el-icon-edit-outline edit el-button--text" @click="editGroup(item)"></i>
            <i class="el-icon-delete del el-button--text" @click="delGroup(item)"></i>
          </span>
        </div>
      </div>
    </Container>
    <ContainerGroup class="right-con" id="rightCon">
      <Container>
        <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="70px">
          <el-form-item label="姓名：" prop="name">
            <el-input placeholder="请输入" :clearable="true" v-model="searchForm.name"></el-input>
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
          <el-form-item style="float: right">
            <el-button type="primary" @click="_searchHandle">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </Container>
      <Container>
        <OperationContainer id="nevboxs">
          <el-button class="addBtn" icon="el-icon-plus" @click="_addItemHandle">添加</el-button>
          <el-button class="moveBtn" @click="_moveItemHandle"><i class="iconfont">&#xeb12;</i>移动</el-button>
          <el-button class="delBtn" @click="_delItemHandle"><i class="iconfont">&#xe663;</i>移除</el-button>
          <el-select v-model="excelBtns" @change="selectionHandle()" placeholder="导出数据">
            <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </OperationContainer>
        <el-table :data="tableData" style="margin-top: 25px" border @selection-change="handleSelectionChange" id="tableData" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="工号" show-overflow-tooltip prop="code" width="150">
            <template slot-scope="scope">
              {{ scope.row.code
              }}<span class="warn" v-if="scope.row.leaderFlag === 1">{{
                scope.row.leaderFlag === 1 ? "组长" : ""
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="性别" prop="sex">
            <template slot-scope="scope">
              <span>{{ scope.row.sex === 0 ? "男" : "女" }}</span>
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
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="text" @click="_editItemHandle(scope.row)">
                  <i class="el-icon-edit-outline"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    <Dialog :title="title" :close-on-click-modal="false" class="dialog-wrapper" :visible.sync="visible" :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
        {
          type: 'primary',
          text: '提交',
          trigger: 'onOk',
        },
      ]" @cancel="this._itemHandleClose" @onOk="
        () => {
          this.addGroupHandle();
        }
      ">
      <div class="group p-clear">
        <span class="sp"><i style="color: red">*</i> 小组名称：</span>
        <el-input placeholder="不超过15个字" v-model="groupName" maxlength="15"></el-input>
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
    <Dialog title="移动小组" :close-on-click-modal="false" :visible.sync="moveVisible" :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
        {
          type: 'primary',
          text: '提交',
          trigger: 'onOk',
        },
      ]" @cancel="this._moveHandleClose" @onOk="
        () => {
          this.moveGroupHandle();
        }
      " class="dialog-wrapper">
      <div class="group p-clear">
        <span class="sp"> 当前小组：</span>
        <p style="line-height: 30px">{{ currentGroup }}</p>
        <!-- <el-input v-model="groupName"></el-input> -->
      </div>
      <div class="group p-clear">
        <span class="sp">移动至：</span>
        <el-select placeholder="请选择" size="small" v-model="currentNursing" style="width: 69%">
          <el-option v-for="item in currentList" :key="item.id" :label="item.nursingName" :value="item.id"></el-option>
        </el-select>
      </div>
      <!-- <div style="text-align:center; padding-top:10px;margin-top:10px;">
        <el-button round @click="_moveHandleClose" style="color:#FF8C00;border-color:#FF8C00;">取消</el-button>
        <el-button round type="primary" @click="moveGroupHandle">提交</el-button>
      </div> -->
    </Dialog>
    <!-- 侧边弹窗 -->
    <Drawer title="新增护工" :visible.sync="drawerView" @cancel="_drawerHandleClose" class="drawer-wrapper">
      <ContainerGroup>
        <Container style="width:750px;">
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
                <el-option v-for="(item, index) in deptList" :key="index" :value="item.dictId" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="就业时间：" prop="materialCategory">
              <el-date-picker size="small" style="width: 249px" v-model="formInline.sureTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="primary" @click="_drawerSearch">查询</el-button>
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
                <span>{{ scope.row.sex === 0 ? "男" : "女" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系方式" prop="phone" width="110px"></el-table-column>
            <el-table-column label="部门" prop="deptName"></el-table-column>
            <el-table-column label="入职时间" prop="time" width="100px"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <span @click="addWorker(scope.row)" style="cursor: pointer; color: rgba(24, 144, 255)">添加</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="drawerTotal" :page="drawerCurrentPage" :pageSize="drawerPageSize" @pagation="drawerPagationChange" />
        </Container>
      </ContainerGroup>
    </Drawer>
    <!-- 编辑 -->
    <Drawer :title="infoTitle" :visible.sync="editDrawerView" class="drawer-wrapper" size="500px" :footerBtns=" isEdit ?[
        { type: 'info', text: '取消', trigger: 'cancel' },
        {
          type: 'primary',
          text: '确定',
          trigger: 'onOk',
        },
      ] : [{ type: 'info', text: '取消', trigger: 'cancel' }]" @cancel="this._drawerHandleClose2" @onOk="
        () => {
          if (isEdit === true) {
            this._onSave();
          }

          if (isEdit === false) {
            this._drawerHandleClose2();
          }
        }
      ">
      <div class="group"><span class="sp">工号:</span>{{ infoDetil.code }}</div>
      <div class="group"><span class="sp">姓名:</span>{{ infoDetil.name }}</div>
      <div class="group">
        <span class="sp">性别:</span>{{ infoDetil.sex == 0 ? "男" : "女" }}
      </div>
      <div class="group">
        <span class="sp">联系方式:</span>{{ infoDetil.phone }}
      </div>
      <div class="group">
        <span class="sp">部门:</span>{{ infoDetil.deptName }}
      </div>
      <div class="group" v-if="isEdit">
        <span class="sp line40"><i style="color: red">*</i> 小组:</span>
        <el-select placeholder="请选择" size="small" v-model="infoDetil.nursingGroupId" v-if="isEdit">
          <el-option v-for="item in groupList" :key="item.id" :value="item.id" :label="item.nursingName"></el-option>
        </el-select>
      </div>
      <div class="group" v-else>
        <span class="sp">小组:</span>{{ infoDetil.nursingName }}
      </div>
      <div class="group" v-if="isEdit">
        <span class="sp line40"><i style="color: red">*</i> 职责:</span>
        <el-select placeholder="请选择" size="small" v-model="infoDetil.obligationId">
          <el-option v-for="item in duty" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
        </el-select>
      </div>
      <div class="group" v-else>
        <span class="sp">职责:</span>{{ infoDetil.obligationName }}
      </div>
      <div class="group" v-if="isEdit">
        <span class="sp">组长:</span>
        <el-radio-group v-model="infoDetil.leaderFlag">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <div class="group" v-else>
        <span class="sp">组长:</span>{{ infoDetil.leaderFlag == "1" ? "是" : "否" }}
      </div>
      <div class="group" v-if="isEdit">
        <span class="sp">状态:</span>
        <el-radio v-model="infoDetil.status" :label="1">启用</el-radio>
        <el-radio v-model="infoDetil.status" :label="0">禁用</el-radio>
      </div>
      <div class="group" v-else>
        <span class="sp">状态:</span>{{ infoDetil.status == "1" ? "启用" : "禁用" }}
      </div>
      <!-- <div class="drawer-button" v-if="isEdit">
        <el-button round @click="_drawerHandleClose2">取消</el-button>
        <el-button round type="primary" @click="_onSave">提交</el-button>
      </div> -->
    </Drawer>
      </Container>
    </ContainerGroup>
  </ContainerGroup>
</template>

<script>
  import pagination from "./../../../components/pagination/index";
  import {
    getDept
  } from "./../../../apis/userManagement/indexApi";
  import {
    getGroupList,
    nursingGroup,
    updNursingGroup,
    delNursingGroup,
    getObligation,
    getNursingGroupUserList,
    getNursingGroupUserById,
    updNursingGroupUser,
    updateStatus,
    perExport,
    deleteSelected,
    getNursingGroupNow,
    moveSelected,
    getUserListPageByNursing,
    saveBatchINursingGroupUser,
  } from "./../../../apis/nursing/indexApi";

  export default {
    name: "nursing", // 护工管理
    components: {
      pagination,
    },
    data() {
      return {
        tableheight: "0px",
        workerSelection: [],
        hasTime: false,
        tnguIds: [],
        currentNursing: "",
        currentList: [],
        currentGroup: "",
        infoDetil: {},
        initId: "",
        duty: [],
        moveVisible: false,
        multipleSelection: [],
        infoTitle: "",
        isEdit: false,
        searchForm: {
          name: "",
          Gender: "",
          duty: "",
          status: "",
        },
        personnelBtns: "",
        personnelBtnList: [{
            label: "添加全部",
            value: "1",
          },
          {
            label: "批量添加",
            value: "2",
          },
        ],
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
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        starValue: null,
        evaluate: "",
        activeIndex: 0,
        groupList: [],
        title: "新增小组",
        visible: false,
        groupName: "",
        sort: "",
        id: "",
        formInline: {},
        deptList: [],
        drawerView: false,
        workerData: [],
        drawerTotal: 0,
        drawerCurrentPage: 1,
        drawerPageSize: 20,
        editDrawerView: false,
        isGroupLeader: "2",
        status: "",
      };
    },
    mounted() {
      // this._getData()
      // this.getAutoHeight();
      const self = this;
      // window.onresize = function () {
      //   self.getAutoHeight();
      // };
    },
    created() {
      this.getDeptList();
      this.getGroup();
      getObligation().then((res) => {
        if (res.data.code === 200) {
          this.duty = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    methods: {
      getAutoHeight() {
        // 设置页面高度 防止出现滚动条
        var allheight = document.getElementById("rightCon");
        var topheight = document.getElementById("wrapperform");
        var boxheight = document.getElementById("morboxs");
        // 一定要使用 nextTick 来改变height 不然不会起作用
        this.$nextTick(() => {
          this.tableheight =
            allheight.clientHeight -
            (topheight.clientHeight + boxheight.clientHeight + 72 + 70) +
            "px";
        });
      },
      active_text(row) {
        let parms = {
          id: row.tnguId,
        };
        updateStatus(parms).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("修改成功");
            this._getData();
          } else {
            this.$message.success("操作失败");
          }
        });
      },
      selectionHandle() {
        let params = {
          userIds: [],
          groupId: this.initId,
          name: this.searchForm.name,
          obligationId: this.searchForm.duty,
          sex: this.searchForm.Gender,
          status: this.searchForm.status,
        };
        if (this.excelBtns == "1") {
          // 全部导出
          perExport(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "护工信息.xlsx";
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
            params.userIds = ids;
            perExport(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "护工信息.xlsx";
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
          groupId: this.initId,
          name: this.searchForm.name,
          obligationId: this.searchForm.duty,
          sex: this.searchForm.Gender,
          status: this.searchForm.status,
          current: this.currentPage,
          size: this.pageSize,
        };
        getNursingGroupUserList(params).then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getGroup() {
        getGroupList().then((res) => {
          if (res.data.code === 200) {
            this.groupList = res.data.data;
            if (!this.initId) {
              this.initId = this.groupList[0].id;
            }
            this.$nextTick(() => {
              this._getData();
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getDeptList() {
        getDept({
          categoryCode: "dept",
          status: 1,
        }).then((res) => {
          if (res.data.code === 200) {
            this.deptList = res.data.data.sysDictList;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      _getMemberList() {
        if (
          this.formInline.sureTime === undefined ||
          this.formInline.sureTime === null
        ) {
          this.hasTime = true;
        } else {
          this.hasTime = false;
        }
        let parms = {
          startTime: this.hasTime ? "" : this.formInline.sureTime[0],
          endTime: this.hasTime ? "" : this.formInline.sureTime[1],
          code: this.formInline.code,
          name: this.formInline.name,
          sex: this.formInline.sex,
          deptId: this.formInline.deptId,
          current: this.drawerCurrentPage,
          size: this.drawerPageSize,
        };
        getUserListPageByNursing(parms).then((res) => {
          if (res.data.code === 200) {
            this.workerData = res.data.data.list;
            this.drawerTotal = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      liClick(item, index) {
        this.activeIndex = index;
        this.initId = item.id;
        this._getData();
      },
      moveGroupHandle() {
        let params = {
          tnguIds: this.tnguIds,
          groupId: this.currentNursing,
        };
        moveSelected(params).then((res) => {
          if (res.data.code === 200) {
            this._moveHandleClose();
            this.$message.success(res.data.message);
            this.getGroup();
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      _moveHandleClose() {
        this.currentNursing = "";
        this.moveVisible = false;
      },
      addGroup() {
        this.title = "新增小组";
        this.visible = true;
      },
      editGroup(item) {
        this.title = "编辑小组";
        this.visible = true;
        this.id = item.id;
        this.groupName = item.nursingName;
        this.sort = item.sort;
      },
      delGroup(item) {
        let _this = this;
        this.$confirm(
            "删除过后小组信息及护工人员都将被清空，确定删除吗？",
            "确认要删除小组吗？", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
          .then(() => {
            delNursingGroup(item.id).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this.getGroup();
              } else {
                this.$message.error(res.data.message);
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
      addGroupHandle() {
        if (this.groupName === "") {
          this.$message.warning("请输入小组名称");
          return false;
        }
        if (!(this.sort > 0)) {
          this.$message.warning("请输入正数");
          return false;
        }
        if (this.title === "新增小组") {
          let parms = {
            nursingName: this.groupName,
            sort: this.sort,
          };
          nursingGroup(parms).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              this._itemHandleClose();
              this.getGroup();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          let parms = {
            nursingName: this.groupName,
            sort: this.sort,
            id: this.id,
          };
          updNursingGroup(parms).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              this._itemHandleClose();
              this.getGroup();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      },

      addWorker(row) {
        let params = {
          groupId: this.initId,
          userIds: [row.userId],
        };
        saveBatchINursingGroupUser(params).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this._getMemberList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      _itemHandleClose() {
        this.visible = false;
        this.groupName = "";
        this.sort = "";
      },
      _addItemHandle() {
        this.drawerView = true;
        this._getMemberList();
      },
      _moveItemHandle() {
        if (
          this.multipleSelection === undefined ||
          this.multipleSelection.length === 0
        ) {
          this.$message.warning("请选择要移动的人员");
          return false;
        }
        this.moveVisible = true;
        this.currentGroup = this.multipleSelection[0].nursingName;
        let params = this.multipleSelection[0].nursingGroupId;
        this.tnguIds = [];
        this.multipleSelection.forEach((element) => {
          this.tnguIds.push(element.tnguId);
        });
        getNursingGroupNow(params).then((res) => {
          if (res.data.code === 200) {
            this.currentList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      _delItemHandle() {
        if (
          this.multipleSelection === undefined ||
          this.multipleSelection.length === 0
        ) {
          this.$message.warning("请选择要移除的人员");
          return false;
        }
        let _this = this;
        this.$confirm(
            "删除过后护工将不在该小组内，确定移除吗？",
            "确认要移除护工吗？", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
          .then(() => {
            let ids = [];
            this.multipleSelection.forEach((element) => {
              ids.push(element.tnguId);
            });
            let params = {
              tnguIds: ids,
            };
            deleteSelected(params).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this.getGroup();
              } else {
                this.$message.error(res.data.message);
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      _toDetailHandle(row) {
        this.editDrawerView = true;
        this.infoTitle = "查看信息";
        this.isEdit = false;
        let obj = JSON.parse(JSON.stringify(row));
        this.infoDetil = obj;
        // getNursingGroupUserById(row.tnguId).then(res=> {
        //   if(res.data.code === 200) {
        //     console.log(res)
        //     this.infoDetil =
        //   } else {
        //     this.$message.error(res.data.message)
        //   }
        // })
      },
      _editItemHandle(row) {
        this.editDrawerView = true;
        this.infoTitle = "编辑信息";
        this.isEdit = true;
        let obj = JSON.parse(JSON.stringify(row));
        this.infoDetil = obj;
      },
      _searchHandle() {
        this.currentPage = 1;
        this._getData();
      },
      resetWorker() {
        this.formInline = {};
      },
      reset() {
        this.searchForm.name = "";
        this.searchForm.Gender = "";
        this.searchForm.duty = "";
        this.searchForm.status = "";
      },
      _drawerHandleClose() {
        this.drawerView = false;
        this.formInline = {};
        this.getGroup();
      },
      _drawerHandleClose2() {
        this.editDrawerView = false;
      },
      _handleWorkerSelectionChange(val) {
        this.workerSelection = val;
      },
      workerHandle() {
        let params = {
          groupId: this.initId,
          userIds: [],
        };
        if (this.personnelBtns == "1") {
          // 全部添加
          saveBatchINursingGroupUser(params).then((res) => {
            if (res.data.code === 200) {
              this._getMemberList();
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
              ids.push(element.userId);
            });
            params.userIds = ids;
            saveBatchINursingGroupUser(params).then((res) => {
              if (res.data.code === 200) {
                this._getMemberList();
              }
            });
          }
          this.personnelBtns = "";
        }
      },
      _onSave() {
        let params = {
          groupId: this.infoDetil.nursingGroupId,
          id: this.infoDetil.tnguId,
          leaderFlag: this.infoDetil.leaderFlag,
          obligationId: this.infoDetil.obligationId,
          status: this.infoDetil.status,
        };
        updNursingGroupUser(params).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this.editDrawerView = false;
            this.getGroup();
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      pagationChange(payload) {
        this.currentPage = payload.page;
        this.pageSize = payload.pageSize;
        this._getData();
      },
      _drawerSearch() {
        this._getMemberList();
      },
      drawerPagationChange(payload) {
        this.drawerCurrentPage = payload.page;
        this.drawerPageSize = payload.pageSize;
        this._getMemberList();
      },
    },
    // 销毁全局事件
    // destroyed() {
    //   window.onresize = null;
    // },
  };
</script>
<style lang="less" scoped>
  .warn {
    background: #fff1f0;
    border: 1px solid #ff5656;
    border-radius: 7px;
    padding: 0 7px;
    color: #ff5656;
    margin-left: 10px;
  }

  .content {
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .left-con {
    flex: 0 0 300px;
    background: #fff;
    // height: 0;
    // float: left;
    // width: 19%;
    // min-height: 1050px;
    // background: #fff;
    // margin-right: 1%;

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
    // float: left;
    // width: 80%;
    // overflow: hidden !important;
    flex: 1;
    margin-left: 15px;
    width: 0;
    overflow: auto;
  }

  .wrapper-form {
    background: #fff;
    padding: 10px 15px;
    margin-bottom: 15px;
    box-sizing: border-box;
    overflow: hidden;
  }


  .addBtn {
    background: #217DFA;
    color: #fff;
    height: 32px;
    float: left;
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
      line-height: 30px;
    }

    .textarea {
      float: left;
      width: 85%;
    }
  }
</style>