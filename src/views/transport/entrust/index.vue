<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="嘱托名称：" prop="name">
          <el-input
            v-model="name"
            placeholder="请输入名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="病区名称：" prop="areaValue">
          <el-select v-model="areaValue" placeholder="请选择" clearable>
            <el-option
              v-for="item in areaOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select placeholder="请选择" v-model="status" clearable>
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button type="primary" icon="el-icon-plus" style="" @click="_addItemHandle"
          >新增</el-button
        >
        <!-- <span style="float:right;"> -->
        <el-select
          v-model="excelBtns"
          size="large"
          @change="selectionHandle()"
          placeholder="导出数据"
        >
          <el-option
            v-for="item in excelBtnList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- </span> -->
      </OperationContainer>
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        v-loading="tableLoading"
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="嘱托名称" prop="name"></el-table-column>
        <el-table-column label="病区名称" prop="areaName" width="500">
          <template slot-scope="scope">
            <el-tag
              :key="tag.tpaId"
              v-for="tag in scope.row.areaVoList"
              type="info"
              :disable-transitions="false"
            >
              {{ tag.tpaName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @click.stop.native
              @change="active_text(scope.row)"
              active-color="#FF8901"
              inactive-color="#E5E5E5"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        :total="total"
        :page="currentPage"
        :pageSize="pageSize"
        @pagation="pagationChange"
      />
    </Container>
    <!-- 新增弹出框 -->
    <Dialog
      :title="titleText"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
        {
          type: 'primary',
          text: '确定',
          trigger: 'onOk',
        },
      ]"
      @cancel="closebtn"
      @onOk="
        () => {
          if (titleText === '新增嘱托') {
            submitForm('ruleForm', '0');
          }

          if (titleText === '编辑嘱托') {
            submitForm('ruleForm', '1');
          }
        }
      "
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="padding: 20px 40px 0 0"
      >
        <el-form-item label="嘱托名称" prop="name">
          <el-input
            v-model.trim="ruleForm.name"
            placeholder="请输入嘱托名称，不超过15字"
            maxlength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="病区名称" prop="areaValue">
          <el-select
            style="width: 100%"
            v-model="ruleForm.areaValue"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input
            v-model.trim="ruleForm.sort"
            oninput="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio v-model="ruleForm.status" :label="1">启用</el-radio>
          <el-radio v-model="ruleForm.status" :label="0">禁用</el-radio>
        </el-form-item>
        <!-- <el-form-item style="text-align:center;">
          <el-button round @click="handleClose" style="color:#FF8C00;border-color:#FF8C00;">取消</el-button>
          <el-button round v-if="titleText === '新增嘱托'" type="primary" @click="submitForm('ruleForm', '0')">确定</el-button>
          <el-button round v-if="titleText === '编辑嘱托'" type="primary" @click="submitForm('ruleForm', '1')">确定</el-button>
        </el-form-item> -->
      </el-form>
    </Dialog>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index";
import {
  accExport,
  saveTaskEntrust,
  updTaskEntrust,
  getPatientArea,
  updStatus,
  getTaskEntrustPageList,
} from "./../../../apis/entrust/indexApi";
export default {
  name: "entrust", // 陪检嘱托
  components: {
    pagination,
  },
  data() {
    return {
      tableLoading: false,
      excelBtns: "",
      excelBtnList: [
        {
          label: "全部导出",
          value: "1",
        },
        {
          label: "批量导出",
          value: "2",
        },
      ],
      areaValue: "",
      areaOptions: [
        {
          areaId: 1,
          name: "全部",
        },
        {
          areaId: 2,
          name: "湖北地区",
        },
      ],
      name: "",
      status: "",
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      currentObj: null,
      storeList: [],
      nevbox: [],
      statusBtns: "",
      statusBtnList: [
        {
          label: "停用",
          value: "1",
        },
        {
          label: "启用",
          value: "2",
        },
      ],
      titleText: "",
      dialogVisible: false,
      ruleForm: {
        areaValue: "",
        name: "",
        sort: "",
        status: 1,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入嘱托名称",
            trigger: "blur",
          },
        ],
        areaValue: [
          {
            required: true,
            message: "请选择病区名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this._getData();
    getPatientArea().then((res) => {
      if (res.data.code === 200) {
        this.areaOptions = res.data.data;
      } else {
        this.$message.error(res.data.message);
      }
      this.tableLoading = false;
    });
  },
  methods: {
    closebtn() {
      this.dialogVisible = false;
    },
    // 导出
    selectionHandle() {
      let params = {
        area: this.areaValue,
        name: this.name,
        status: this.status,
        ids: [],
      };
      if (this.excelBtns == "1") {
        // 全部导出
        accExport(params).then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            });
            let downloadLink = document.createElement("a");
            const URL = window.URL || window.webkitURL || window.moxURL;
            let downUrl = URL.createObjectURL(blob);
            downloadLink.href = downUrl;
            downloadLink.download = "陪检嘱托.xlsx";
            downloadLink.click();
            window.URL.revokeObjectURL(downUrl);
          }
        });
        this.excelBtns = "";
      } else if (this.excelBtns == "2") {
        // 批量导出
        if (this.nevbox === undefined || this.nevbox.length === 0) {
          this.$message.warning("请选择要导出的数据");

          this.excelBtns = "";
          return false;
        } else {
          let ids = [];
          this.nevbox.forEach((element) => {
            ids.push(element.id);
          });
          params.ids = ids;
          accExport(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "陪检嘱托.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
            }
          });
        }
        this.excelBtns = "";
      }
    },
    _getData() {
      let parms = {
        name: this.name,
        status: this.status,
        size: this.pageSize,
        current: this.currentPage,
        area: this.areaValue,
      };
      this.tableLoading = true;
      getTaskEntrustPageList(parms).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
        this.tableLoading = false;
      });
    },
    searchHandle() {
      this.currentPage = 1;
      this._getData();
    },
    reset() {
      this.name = "";
      this.status = "";
      this.areaValue = "";
    },
    _addItemHandle() {
      this.titleText = "新增嘱托";
      this.dialogVisible = true;
    },
    _editItemHandle(row) {
      this.titleText = "编辑嘱托";
      this.dialogVisible = true;
      let obj = JSON.parse(JSON.stringify(row));
      this.$nextTick(() => {
        this.ruleForm.id = obj.id;
        this.ruleForm.name = obj.name;
        this.ruleForm.sort = obj.sort;
        this.ruleForm.areaValue = obj.areaIdList;
        this.ruleForm.status = obj.status;
      });
    },
    handleSelectionChange(val) {
      this.nevbox = val;
    },
    handleClose() {
      this.$refs["ruleForm"].resetFields();
      this.dialogVisible = false;
    },
    active_text(row) {
      // let status = ''
      // if (row.status) {
      //   status = '0'
      // } else {
      //   status = '1'
      // }
      updStatus(row.id).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改成功");
          this._getData();
        } else {
          this.$message.success("操作失败");
        }
      });
    },
    submitForm(formName, isEdit) {
      if (isEdit === "0") {
        this.addHandle(formName);
      } else {
        this.editHandle(formName);
      }
    },
    addHandle(formName) {
      let parms = {
        name: this.ruleForm.name,
        sort: this.ruleForm.sort,
        areaList: this.ruleForm.areaValue,
        status: this.ruleForm.status,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveTaskEntrust(parms).then((res) => {
            if (res.data.code === 200) {
              this.handleClose();
              this._getData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editHandle(formName) {
      let parms = {
        name: this.ruleForm.name,
        sort: this.ruleForm.sort,
        areaList: this.ruleForm.areaValue,
        status: this.ruleForm.status,
        id: this.ruleForm.id,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updTaskEntrust(parms).then((res) => {
            if (res.data.code === 200) {
              this.handleClose();
              this._getData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    pagationChange(payload) {
      this.currentPage = payload.page;
      this.pageSize = payload.pageSize;
      this._getData();
    },
  },
};
</script>
<style lang="less">
.el-dialog__header {
  background: #1d93a8;

  .el-dialog__title {
    color: #fff;
  }

  .el-dialog__close {
    color: #fff;
  }
}
</style>
<style lang="less" scoped>
.el-tag {
  color: #606266;
  // background-color: #f4f4f5;
  // border-color: #e9e9eb;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.wrapper {
  .wrapper-form {
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .warpper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;

    .table-btn {
      margin-bottom: 10px;
    }
  }
}
</style>