<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="属性名称：" prop="name">
          <el-input v-model="name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select placeholder="请选择" v-model="status">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="_addItemHandle"
          >新增</el-button
        >
        <el-select
          v-model="statusBtns"
          size="min"
          style="width:110px"
          @change="statusChange()"
          placeholder="停用/启用"
        >
          <el-option
            v-for="item in statusBtnList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="delloe"
          style="width:110px"
          size="min"
          @change="delList()"
          placeholder="删除"
        >
          <el-option
            v-for="item in delloeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </OperationContainer>
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#E8EAED', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="属性名称" prop="name"></el-table-column>
        <el-table-column label="禁用/启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.statusVal"
              @click.stop.native
              @change="active_text(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="编码" prop="code"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
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
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button type="text" @click="_disableItemHandle(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="数据项"
              placement="top"
            >
              <el-button type="text" @click="_toDataHandle(scope.row)">
                <i class="el-icon-tickets"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <pagination
          :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange"
        />
      </div>
      <!-- 新增弹出框 -->
      <Dialog
        :title="titleText"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        :footerBtns="[
          {type:'info',text:'取消', trigger:'cancel'},
          {type:'primary',text:'确定', trigger: 'onOk'},
        ]"
        @cancel="closebtn"
        @onOk="() => {
          if (titleText === '新增属性') {
            submitForm('ruleForm', '0')
          }else{
            submitForm('ruleForm', '1')
          }
        }"
      >
                <!-- <el-form-item>
            <el-button
              v-if="titleText === '新增属性'"
              type="primary"
              @click="submitForm('ruleForm', '0')"
              >确定</el-button
            >
            <el-button
              v-if="titleText === '编辑属性'"
              type="primary"
              @click="submitForm('ruleForm', '1')"
              >确定</el-button
            >
            <el-button @click="closebtn">取消</el-button>
          </el-form-item> -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          style="min-width: 260px; padding: 20px 40px 0 0"
          class="demo-ruleForm"
        >
          <el-form-item label="属性名称:" prop="name">
            <el-input v-model.trim="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              v-model.trim="ruleForm.sort"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model.trim="ruleForm.code"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="status">
            <el-switch v-model="ruleForm.status"></el-switch>
          </el-form-item>
        </el-form>
      </Dialog>
    </Container>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index";
import {
  getListPage,
  addDictCategory,
  editDictCategory,
  delDictCategory,
  updateBatch,
} from "./../../../apis/dictManagement/indexApi";
export default {
  name: "dictManagement", //字典管理
  components: {
    pagination,
  },
  data() {
    return {
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
      delloe: "",
      delloeList: [
        {
          label: "批量删除",
          value: "1",
        },
      ],
      titleText: "",
      dialogVisible: false,
      categoryId: "",
      ruleForm: {
        name: "",
        sort: "",
        status: false,
      },
      rules: {
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
      },
    };
  },
  created() {
    this._getData();
  },
  methods: {
    _getData() {
      let parms = {
        deleteFlag: 0,
        name: this.name,
        status: this.status,
        size: this.pageSize,
        current: this.currentPage,
        ascs: "sort",
      };
      getListPage(parms).then((res) => {
        if (res.data.code === 200) {
          res.data.data.list.forEach((element) => {
            if (element.status === "1") {
              element.statusVal = true;
            } else {
              element.statusVal = false;
            }
          });
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    searchHandle() {
      this.currentPage = 1;
      this._getData();
    },
    reset() {
      this.name = "";
      this.status = "";
    },
    _addItemHandle() {
      this.titleText = "新增属性";
      this.dialogVisible = true;
      this.ruleForm = {};
    },
    _editItemHandle(row) {
      this.titleText = "编辑属性";
      this.dialogVisible = true;
      let obj = JSON.parse(JSON.stringify(row));
      this.$nextTick(() => {
        this.ruleForm = obj;
        this.ruleForm.status = row.status === "1" ? true : false;
      });
    },
    handleSelectionChange(val) {
      this.nevbox = val;
    },
    statusChange() {
      if (this.nevbox.length === 0) {
        this.$message.warning("请选择属性名称");
        this.statusBtns = "";
        return false;
      }
      if (this.statusBtns === "1") {
        this.nevbox.forEach((element) => {
          element.status = "0";
        });
      } else {
        this.nevbox.forEach((element) => {
          element.status = "1";
        });
      }
      updateBatch(this.nevbox).then((res) => {
        if (res.data.code === 200) {
          this.statusBtns = "";
          this._getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    delList() {
      let _this = this;
      if (this.nevbox.length === 0) {
        this.$message.warning("请选择属性名称");
        this.delloe = "";
        return false;
      }
      let ids = [];
      this.nevbox.forEach((element) => {
        ids.push(element.categoryId);
      });
      let parms = {
        categoryId: "",
        deleteFlag: 0,
        ids: ids.toString(),
        name: "",
        sort: "",
        status: "",
      };
      delDictCategory(parms).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          _this._getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 取消按钮
    closebtn() {
      this.dialogVisible = false;
    },
    active_text(row) {
      let status = "";
      if (row.statusVal) {
        status = "1";
      } else {
        status = "0";
      }
      let parms = {
        name: row.name,
        sort: row.sort,
        status: status,
        categoryId: row.categoryId,
      };
      editDictCategory(parms).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("修改成功");
          this._getData();
        } else {
          this.$message.success("操作失败");
        }
      });
    },
    _disableItemHandle(row) {
      let _this = this;
      this.$confirm("是否确认删除该属性？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let parms = {
            categoryId: "",
            deleteFlag: 0,
            ids: row.categoryId,
            name: "",
            sort: "",
            status: "",
          };
          delDictCategory(parms).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              _this._getData();
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
    _toDataHandle(row) {
      this.$router
        .push({
          path: "/dictManagement/data",
          query: {
            code: row.code,
            categoryId: row.categoryId,
          },
        })
        .catch((err) => {});
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
        code: this.ruleForm.code,
        status: this.ruleForm.status === true ? "1" : "0",
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addDictCategory(parms).then((res) => {
            if (res.data.code === 200) {
              this.dialogVisible = false;
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
        code: this.ruleForm.code,
        status: this.ruleForm.status === true ? "1" : "0",
        categoryId: this.ruleForm.categoryId,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editDictCategory(parms).then((res) => {
            if (res.data.code === 200) {
              this.dialogVisible = false;
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
// .el-dialog__header {
//   background: #1d93a8;
//   .el-dialog__title {
//     color: #fff;
//   }
//   .el-dialog__close {
//     color: #fff;
//   }
// }
// .statusbox {
//   display: inline-block;
//   .el-select {
//     width: 102px;
//     margin-left: 20px;
//   }
//   .el-input--suffix .el-input__inner {
//     padding-right: 0px;
//     padding-left: 12px;
//     height: 36px;
//     color: #fff;
//     border-color: #ff8901;
//     background: #ff8901;
//   }
//   .el-select .el-input .el-select__caret {
//     color: #fff;
//     line-height: 36px;
//   }
//   .el-input__inner::placeholder {
//     color: #fff;
//   }
//   /* 谷歌 */
//   .el-input__inner::-webkit-input-placeholder {
//     color: #fff;
//   }
//   /* 火狐 */
//   .el-input__inner:-moz-placeholder {
//     color: #fff;
//   }
//   /*ie*/
//   .el-input__inner:-ms-input-placeholder {
//     color: #fff;
//   }
// }
// .delbox {
//   .el-select {
//     width: 80px;
//   }
//   .el-input--suffix .el-input__inner {
//     color: #fc5454;
//     border-color: #fc5454;
//     background: #fff;
//   }
//   .el-select .el-input .el-select__caret {
//     color: #999;
//     line-height: 36px;
//   }
//   .el-input__inner::placeholder {
//     color: #fc5454;
//   }
//   /* 谷歌 */
//   .el-input__inner::-webkit-input-placeholder {
//     color: #fc5454;
//   }
//   /* 火狐 */
//   .el-input__inner:-moz-placeholder {
//     color: #fc5454;
//   }
//   /*ie*/
//   .el-input__inner:-ms-input-placeholder {
//     color: #fc5454;
//   }
// }
</style>
<style lang="less" scoped>
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