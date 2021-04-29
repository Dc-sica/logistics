<template>
  <ContainerGroup>
    <Container>
      <el-form ref="searchForm" :inline="true" :model="searchForm">
        <el-form-item label="姓名：" prop="name">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select placeholder="请选择" v-model="searchForm.Gender" clearable>
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"> </el-option>
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
    <ContainerGroup layout="row">
      <Container class="left">
        <div class="list">
        <div class="add-btn" @click="addCompanyBtn">
          添加公司
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
      <Container class="right">
        <OperationContainer id="nevboxs">
          <el-button class="addBtn" icon="el-icon-plus" @click="_addItemHandle">添加</el-button>
          <el-button class="moveBtn" @click="_moveItemHandle"><i class="iconfont">&#xeb12;</i>移动</el-button>
          <el-button class="delBtn" @click="_delItemHandle"><i class="iconfont">&#xe663;</i>移除</el-button>
          <el-select v-model="excelBtns" @change="selectionHandle()" placeholder="导出数据">
            <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </OperationContainer>
        <el-table :data="tableData" style="margin-top: 25px" border @selection-change="handleSelectionChange" 
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight>
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
          <el-table-column label="小组" prop="time"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" @click.stop.native @change="active_text(scope.row)" 
              active-color="#217DFA" inactive-color="#E5E5E5" :active-value="1" :inactive-value="0"></el-switch>
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
        <!-- 添加公司 -->
        <Dialog :title="title" :close-on-click-modal="false" class="dialog-wrapper" :visible.sync="visible" :footerBtns="[
            { type: 'info', text: '取消', trigger: 'cancel' },
            {
              type: 'primary',
              text: '提交',
              trigger: 'onOk',
            },
          ]" @cancel="this._itemHandleClose" @onOk="
            () => {
              this.addCompanyHandle();
            }
          ">
          <div class="group p-clear">
            <span class="sp"><i style="color: red">*</i> 公司名称：</span>
            <el-input placeholder="不超过15个字" v-model="companyName" maxlength="15"></el-input>
          </div>
          <div class="group p-clear">
            <span class="sp">排序：</span>
            <el-input type="number" v-model="sort"></el-input>
          </div>
          <div class="group p-clear">
            <span class="sp">总负责人：</span>
            <el-input type="number" v-model="person"></el-input>
          </div>
        </Dialog>
        <!-- 新增工作人员 -->
        <Drawer title="新增工作人员" :visible.sync="drawerWorkerView" @cancel="_drawerHandleClose">
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
        <Drawer :title="editDrawerTitle" :visible.sync="editDrawerView" class="drawer-wrapper" 
          @onOk="_onSave" @cancel="_drawerHandleClose2" 
          :footerBtns="[
            { type: 'info', text: '取消', trigger: 'cancel' },
            { type: 'primary', text: '保存', trigger: 'onOk' }
          ]">
          <div class="group"><span class="sp">工号:</span>{{workerDetail.code}}</div>
          <div class="group"><span class="sp">姓名:</span>{{workerDetail.name}}</div>
          <div class="group"><span class="sp">性别:</span>{{workerDetail.sex === 0 ? '男': '女'}}</div>
          <div class="group"><span class="sp">联系方式:</span>{{workerDetail.phone}}</div>
          <div class="group"><span class="sp">部门:</span>{{workerDetail.deptName}}</div>
          <div class="group">
            <span class="sp line40"><i style='color:red;'>*</i> 分组:</span>
            <el-select placeholder="请选择" size="small" v-model="workerDetail.groupId" clearable>
              <el-option v-for="(item,index) in groupList" :key="index" :value="item.id" :label="item.groupName"></el-option>
            </el-select>
          </div>
          <div class="group">
            <span class="sp"><i style='color:red;'>*</i> 组长:</span>
            <el-radio v-model="workerDetail.leaderFlag" label="1">是</el-radio>
            <el-radio v-model="workerDetail.leaderFlag" label="0">否</el-radio>
          </div>
          <div class="group">
            <span class="sp"><i style='color:red;'>*</i> 状态:</span>
            <el-radio v-model="workerDetail.status" label="1">启用</el-radio>
            <el-radio v-model="workerDetail.status" label="0">禁用</el-radio>
          </div>
        </Drawer>
      </Container>
    </ContainerGroup>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index"
import {selectRepairUserListPage} from './../../../apis/workerManage/indexApi'

export default {
    name: "worker",
    components: {
      pagination,
    },
    data() {
      return {
        searchForm: {},
        groupList: [],
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
        visible: false,
        title: '新增公司',
        companyName: '',
        sort: '',
        person: '',
        drawerWorkerView: false,
        deptList: [],
        formInline: {},
        workerData: [],
        drawerTotal: 0,
        drawerCurrentPage: 1,
        drawerPageSize: 20,
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
        drawerMultVal: [],
        editDrawerView: false,
        editDrawerTitle: '',
        workerDetail: {},
        isGroupLeader: '',
      }
    },
    methods: {
      addGroup () {},
      editGroup () {},
      delGroup () {},
      _getData() {},
      _searchHandle () {},
      reset () {},
      _addItemHandle() {
        this.drawerWorkerView = true
        this.drawerBtns = ''
        this.drawerMultVal = []
        this._getMemberList()
      },
      _moveItemHandle() {},
      _delItemHandle () {},
      selectionHandle () {},
      handleSelectionChange () {},
      addCompanyBtn () {
        this.visible = true
      },
      addCompanyHandle () {},
      _itemHandleClose () {
        this.visible = false
      },
      _onSave () {},
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
      addWorker(row) {
      },
      active_text(row) {},
      _toDetailHandle () {},
      _editItemHandle () {},
      _handleWorkerSelectionChange(val) {
        this.drawerMultVal = val
      },
      _drawerSearch() {
        this.drawerCurrentPage = 1
        this._getMemberList()
      },
      drawerPagationChange(payload) {
        this.drawerCurrentPage = payload.page
        this.drawerPageSize = payload.pageSize
        this._getMemberList()
      },
      _drawerReset() {
        this.formInline.name = ''
        this.formInline.code = ''
        this.formInline.sex = ''
        this.formInline.deptId = ''
        this.formInline.sureTime = ''
      },
      // 新增工作人员弹窗关闭
      _drawerHandleClose () {
        this.drawerWorkerView = false
      },
      // 编辑信息弹窗关闭
      _drawerHandleClose2 () {},
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      },
    }
}
</script>

<style lang="less" scoped>
.left {
  flex: 0 0 300px;
  .list {
    overflow-y: auto;
    margin: 15px;
    .add-btn {
      text-align: center;
      background: #217dfa;
      border: 1px solid #e7ecf8;
      border-radius: 6px;
      color: #fff;
      padding: 14px 0;
      cursor: pointer;
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

.right {
  flex: 1;
  margin-left: 15px;
  width: 0;
  overflow: auto;
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
}
.dialog-wrapper {
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
    .el-input {
      float: left;
      width: 69%;
    }
  }
}
</style>
