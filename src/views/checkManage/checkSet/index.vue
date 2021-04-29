<template>
  <ContainerGroup class="content">
    <Container>
      <el-form ref="searchForm" :inline="true" :model="searchForm">
        <el-form-item label="分类：">
          <el-select placeholder="请选择" v-model="searchForm.Gender" clearable>
            <el-option :value="0" label="男"></el-option>
            <el-option :value="1" label="女"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备/空间名称：" prop="name">
          <el-input placeholder="请输入" :clearable="true" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <ContainerGroup layout="row">
      <Container class="left-con">
        <div class="list">
          <div class="add-btn">
            添加分类
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
      <Container class="right-con" id="rightCon">
        <OperationContainer id="nevboxs">
          <el-button class="addBtn" icon="el-icon-plus" @click="_addItemHandle">添加</el-button>
          <el-button class="moveBtn" @click="_moveItemHandle"><i class="iconfont">&#xeb12;</i>批量设置表单</el-button>
          <el-select v-model="excelBtns" @change="selectionHandle()" placeholder="二维码操作">
            <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </OperationContainer>
        <el-table :data="tableData" style="margin-top: 25px" border @selection-change="handleSelectionChange" id="tableData" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="设备/空间名称" show-overflow-tooltip prop="code" width="150"></el-table-column>
          <el-table-column label="所在位置" prop="name"></el-table-column>
          <el-table-column label="二维码" prop="sex"></el-table-column>
          <el-table-column label="条形码" prop="phone" show-overflow-tooltip></el-table-column>
          <el-table-column label="执行类型" prop="obligationName"></el-table-column>
          <el-table-column label="表单名称" prop="deptName"></el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" @click.stop.native @change="active_text(scope.row)" active-color="#217DFA" inactive-color="#E5E5E5" :active-value="1" :inactive-value="0"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
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
            <span class="sp"><i style="color: red">*</i> 分类名称：</span>
            <el-input placeholder="不超过15个字" v-model="groupName" maxlength="15"></el-input>
          </div>
          <div class="group p-clear">
            <span class="sp">排序：</span>
            <el-input type="number" v-model="sort"></el-input>
          </div>
        </Dialog>
    
        <!-- 添加设备/空间 -->
        <Drawer title="添加设备/空间" :visible.sync="drawerView"
          :footerBtns="[
            { type: 'info', text: '取消', trigger: 'cancel' },
            { type: 'primary', text: '提交', trigger: 'onOk' },
          ]"
          @cancel="_drawerDeviceClose"
          @onOk="_onSave"
          :before-close="_drawerDeviceClose" 
          class="drawer-wrapper">
          <el-form ref="formDevice" :model="formDevice">
            <el-form-item label="设备/空间名称：" label-width="110px">
              <el-input
                placeholder="不超过20个字"
                v-model="formDevice.deviceName"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在位置：" label-width="110px">
              <el-input
                placeholder="不超过50个字"
                type="textarea"
                maxlength="50"
                v-model="formDevice.location"
              ></el-input>
            </el-form-item>
            <el-form-item label="执行类型：" label-width="110px">
              <el-radio v-model="formDevice.type" label="0">按钮</el-radio>
              <el-radio v-model="formDevice.type" label="1">NFC</el-radio>
              <el-radio v-model="formDevice.type" label="2">二维码</el-radio>
            </el-form-item>
            <el-form-item label="表单名称：" label-width="110px">
              <el-select
                placeholder="请选择"
                v-model="formDevice.formName"
                clearable
              >
                <el-option :value="0" label="男"></el-option>
                <el-option :value="1" label="女"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：" label-width="110px">
              <el-radio v-model="formDevice.status" label="0">启用</el-radio>
              <el-radio v-model="formDevice.status" label="1">禁用</el-radio>
            </el-form-item>
          </el-form>
        </Drawer>
      </Container>
    </ContainerGroup>
  </ContainerGroup>
</template>

<script>
  import pagination from "./../../../components/pagination/index"

  export default {
    name: "checkSet",
    components: {
      pagination,
    },
    data() {
      return {
        tnguIds: [],
        currentNursing: "",
        currentGroup: "",
        infoDetil: {},
        initId: "",
        duty: [],
        moveVisible: false,
        multipleSelection: [],
        infoTitle: "",
        isEdit: false,
        searchForm: {
         
        },
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
        activeIndex: 0,
        groupList: [],
        title: "新增分类",
        visible: false,
        groupName: "",
        sort: "",
        id: "",
        deptList: [],
        drawerView: false,
        status: "",
        formDevice: {
          deviceName: '',
          location: '',
          type: '',
          formName: '',
          status: ''
        },
      }
    },
    mounted() {
    },
    created() {
    },
    methods: {
      active_text(row) {
      },
      selectionHandle() {
      },
      _getData() {
        
      },
      getGroup() {
      },
      liClick(item, index) {
        this.activeIndex = index;
        this.initId = item.id;
        this._getData();
      },
      addGroup() {
        this.title = "新增分类"
        this.visible = true
      },
      editGroup(item) {
        this.title = "编辑"
        this.visible = true
      },
      delGroup(item) {
      
      },
      addGroupHandle() {
        if (this.groupName === "") {
          this.$message.warning("请输入分类名称")
          return false
        }
        if (!(this.sort > 0)) {
          this.$message.warning("请输入正数")
          return false
        }
        if (this.title === "新增分类") {
          console.log(11)
        } else {
          console.log(11)
        }
      },
      _itemHandleClose() {
        this.visible = false
        this.groupName = ""
        this.sort = ""
      },
      _addItemHandle() {
        this.drawerView = true
      },
      _moveItemHandle() {
        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      _editItemHandle(row) {
        this.editDrawerView = true
        this.infoTitle = "编辑信息"
        this.isEdit = true
        let obj = JSON.parse(JSON.stringify(row))
        this.infoDetil = obj
      },
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.name = "";
        this.searchForm.Gender = ""
        this.searchForm.duty = ""
        this.searchForm.status = ""
      },
      // 添加设备/空间弹窗关闭
      _drawerDeviceClose() {
        this.drawerView = false
      },
      _onSave () {},
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      },
    }
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
      margin: 15px;

      .add-btn {
        text-align: center;
        background: #217dfa;
        border: 1px solid #e7ecf8;
        border-radius: 6px;
        color: #fff;
        padding: 14px 0;
        cursor: pointer;
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