<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-06 16:05:56
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 14:55:12
 * @FilePath: /hos-logistics-management/src/views/inventory/warehouse/index.vue
-->
<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm">
        <el-form-item label="名称：" prop="name">
          <el-input
            placeholder="请输入名称"
            :clearable="true"
            v-model="searchForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select
            placeholder="请选择"
            :clearable="true"
            v-model="searchForm.status"
          >
            <el-option :value="0" label="禁用"></el-option>
            <el-option :value="1" label="启用"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button icon="el-icon-plus" type="success" @click="_addItemHandle"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </Container>
    <!-- display:flexY 属性，Container 子元素纵向flex 布局 -->
    <Container>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column
          label="编号"
          type="index"
          width="55"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="地址"
          prop="address"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            {{
              scope.row.status === 0
                ? "禁用"
                : scope.row.status === 1
                ? "启用"
                : ""
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :content="
                scope.row.status === 0
                  ? '禁用'
                  : scope.row.status === 1
                  ? '启用'
                  : ''
              "
              placement="top"
            >
              <el-popconfirm
                :title="`确定要${scope.row.status === 0 ? '启用' : '禁用'} ${
                  scope.row.name
                } 吗?`"
                @confirm="_disableItemHandle(scope.row)"
              >
                <el-button type="text" slot="reference">
                  <i v-if="scope.row.status === 0" class="el-icon-turn-off"></i>
                  <i v-if="scope.row.status === 1" class="el-icon-open"></i>
                </el-button>
              </el-popconfirm>
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
      <!-- 侧边弹窗 -->
      <Drawer
        :title="title"
        :visible.sync="drawerView"
        @cancel="_drawerHandleClose"
        @onOk="_commitApproveHandle"
        :footerBtns="[
          { type: 'info', text: '取消', trigger: 'cancel' },
          { type: 'primary', text: '保存', trigger: 'onOk' },
        ]"
      >
        <el-form
          :inline="false"
          ref="itemForm"
          :rules="rules"
          :model="itemForm"
        >
          <el-form-item
            label="编号："
            v-if="flag === true"
            prop="warehouseId"
            label-width="70px"
          >
            <el-input
              placeholder="编号"
              v-model="itemForm.warehouseId"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="名称：" prop="name" label-width="70px">
            <el-input
              placeholder="请输入名称"
              :maxlength="20"
              v-model.trim="itemForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address" label-width="70px">
            <el-input
              placeholder="请输入名称"
              :maxlength="40"
              v-model.trim="itemForm.address"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：" label-width="70px" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注"
              :maxlength="200"
              v-model="itemForm.remark"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态：" label-width="70px" prop="status">
            <el-radio-group v-model="itemForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </Drawer>
    </Container>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index";

import {
  getListPage,
  isDisable,
  addItem,
  updateItem,
} from "./../../../apis/warehouse/indexApi";
export default {
  name: "warehouseManagement", //仓库管理
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        name: "",
        status: "",
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      drawerView: false,
      flag: true,
      itemForm: {
        code: "",
        name: "",
        remark: "",
        status: 1,
      },
      title: "",
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      currentObj: null,
      storeList: [],
      loading: false,
    };
  },
  mounted() {
    this._getData();
  },
  methods: {
    _getArg() {
      return this.searchForm;
    },
    _searchHandle() {
      this.pageSize = 10;
      this.currentPage = 1;
      this._getData();
    },
    _getData() {
      let arg = this._getArg();
      let params = {
        ...arg,
        size: this.pageSize,
        current: this.currentPage,
      };

      try {
        this.loading = true;
        getListPage(params).then((res) => {
          if (res.data.code === 200) {
            this.tableData = [
              ...res.data.data.list
            ];
            this.total = res.data.data.total;
            this.pageSize = res.data.data.size;
            this.currentPage = res.data.data.current;
          } else {
            this.$message.error(res.data.message);
          }
          this.loading = false;
        });
      } catch (error) {
        this.$message.error(JSON.stringify(error));
      }
    },
    _addItemHandle() {
      this.title = "新增仓库";
      this.drawerView = true;
      this.flag = false;
    },
    _editItemHandle(row) {
      this.currentObj = row;
      this.title = "编辑仓库";
      this.flag = true;
      this.drawerView = true;
      this.$nextTick(() => {
        this.itemForm = JSON.parse(JSON.stringify(row));
      });
    },
    _disableItemHandle(row) {
      try {
        isDisable({ id: row.warehouseId }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message);
            this._getData();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } catch (error) {
        this.$message.error(JSON.stringify(error));
      }
    },
    _drawerHandleClose() {
      this.$refs.itemForm.resetFields();
      this.drawerView = false;
      this.title = "";
      this.currentObj = null;
      this.flag = true;
    },
    _commitApproveHandle() {
      this.$refs["itemForm"].validate((valid) => {
        if (valid) {
          let params = this.itemForm;
          if (this.currentObj === null) {
            // 新增
            addItem(params).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this._getData();
                this._drawerHandleClose();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            // 编辑
            const { warehouseId } = this.currentObj;
            params = {
              ...this.itemForm,
              warehouseId: warehouseId,
            };
            updateItem(params).then((res) => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message);
                this._getData();
                this._drawerHandleClose();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          console.log(2, valid);
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
<style lang="less" scoped>
.wrapper {
  // .wrapper-form {
  //   background: #fff;
  //   height: 45px;
  //   padding: 10px 15px;
  //   margin-bottom: 15px;
  // }
  .warpper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>
<style lang="less">
.dialog-wrapper {
  .el-dialog__header {
    .el-dialog__title {
      color: #fff !important;
    }
    .el-dialog__close {
      color: #fff !important;
    }
  }
  .checkbox-wrapper {
    padding: 10px;
    border: 1px solid #e5e5e5;
    margin-bottom: 10px;
    .el-checkbox {
      display: inline-block;
      width: 40%;
      line-height: 30px;
    }
  }
}
.drawer-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  margin-top: 5px;
}
</style>