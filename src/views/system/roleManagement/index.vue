<template>
  <div id="roleManage">
    <div class="manage-box">
      <div class="title">
        角色管理
        <i
          class="el-icon-circle-plus-outline icon p-btn-text-prmary"
          @click="add"
        ></i>
      </div>
      <el-table
        border
        ref="singleTable"
        :data="tableData"
        v-loading="tableLoading"
        highlight-current-row
        style="width: 100%"
        height="calc(100% - 100px)"
        class="loading-area"
        @row-click="viewRow"
      >
        <el-table-column
          prop="roleName"
          :show-overflow-tooltip="true"
          label="角色名称"
        ></el-table-column>
        <el-table-column
          prop="roleDesc"
          :show-overflow-tooltip="true"
          label="备注"
        ></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                class="el-icon-edit-outline"
                size="mini"
                type="text"
                @click="edit(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                class="el-icon-delete"
                size="mini"
                type="text"
                @click.stop="del(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="pageNum"
        :limit.sync="pageSize"
        :pageSize="pageSize"
        @pagation="pagationChange" />
    </div>
    <div class="manage-box">
      <div class="title">
        权限管理
      </div>
      <div class="content">
        <ul class="tab-head">
          <li
            @click="changeTabs(index)"
            v-for="(item, index) in tabs"
            :key="index"
            :class="activeName === index ? 'active' : ''"
          >
            {{ item }}
          </li>
        </ul>
        <!-- 权限管理  PC端 -->
        <div class="detail" v-show="activeName === 0">
          <div class="list">
            <el-tree
              :data="depTree"
              ref="depTree"
              node-key="id"
              v-loading="treeLoading"
              check-strictly
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span @click="getNode(node)">
                  {{ data.name }}
                </span>
                <span style="position: absolute; right: 35px">
                  <el-checkbox
                    v-model="node.checked"
                    @change="getCharges(node, data)"
                  ></el-checkbox>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
        <!-- 权限管理 移动端 -->
        <div class="detail" v-show="activeName === 1">
          <div class="list">
            <el-tree
              :data="mobileTree"
              ref="mobileTree"
              node-key="menuId"
              check-strictly
              :props="defaultProps"
              :expand-on-click-node="true"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span @click="getNode(node)">
                  {{ data.name }}
                </span>
                <span style="position: absolute; right: 35px">
                  <el-checkbox
                    v-model="node.checked"
                    @change="getCharges(node, data)"
                  ></el-checkbox>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
        <div style="float: right; margin-top: 20px" class="p-align-center">
          <el-button size="small" @click="rest()">取消</el-button>
          <el-button type="primary" size="small" @click="save()"
            >确定</el-button
          >
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <Dialog
      :title='titlemsg'
      :visible="modalVisable"
      @cancel="closeModal"
      @save="titlemsg === '新增角色' ? submitSave('formData', 'sure') : submitSave('formData', 'edit')"
      :footerBtns="[
        {
          text: titlemsg === '新增角色' ? '确定' : '编辑',
          type: 'primary',
          trigger: 'save',
        },

        {
          text: '取消',
          type: 'primary',
          trigger: 'cancel',
        }
      ]"
    >
      <el-form
        :model="formData"
        :inline="false"
        :rules="rules"
        label-width="100px"
        ref="formData"
      >
        <el-form-item label="角色名称:" prop="roleName">
          <el-input
            v-model.trim="formData.roleName"
            placeholder="请输入角色名称"
            style="width: 60%"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="roleDesc">
          <el-input
            v-model.trim="formData.roleDesc"
            placeholder="请输入备注"
            style="width: 60%"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input
            v-model.trim="formData.sort"
            placeholder="请输入排序"
            style="width: 60%"
          ></el-input>
        </el-form-item>
      </el-form>  
    </Dialog>
  </div>
</template>
<script>
import pagination from './../../../components/pagination/index'
import {
  getAllRoles, insertRole, updateRole, deleteRole, getAllMenu, watchOutRoleMenu, RoleGiveMenuPermission, getMobileMenu, watchOutMobileRoleMenu
} from './../../../apis/roleManagement/indexApi'
export default {
  name: 'roleManagement', //角色管理
  components: {
    pagination
  },
  data() {
    return {
      modalVisable: false,
      dialogVigPerpro: false,
      userName: "",
      perproTree: [],
      tabs: ["PC端", "移动端"],
      hie: false,
      defaultProps: {
        children: "childNodes",
        label: "name",
      },
      depArry: [],
      jurisArry: [],
      activeName: 0,
      roleId: "",
      depTree: [],
      mobileTree: [],
      jurisTree: [],
      rowClass: "",
      roleName: "角色名",
      formData: {
        roleName: "",
        roleCode: "",
        sort: "",
        roleDesc: "",
        rolePerpro: "",
      },
      rolebox: [
        {
          value: "0",
          label: "个人",
        },
        {
          value: "1",
          label: "管理者",
        },
      ],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      pageNum: 1,
      pageSize: 20,
      titlemsg: "",
      total: 0,
      userId: [],
      tableData: [],
      netRoleId: "",
      tableLoading: false,
      treeLoading: false,
      isFlag: false, // false 新增 true 编辑
    };
  },
  created () {
    this.getData()
    this._getMobileMenu()
  },
  methods: {
    getData(data) {
      if (data) {
        this.pageNum = data.page
        this.pageSize = data.pageSize
      }
      let parmsd = {
        current: this.pageNum,
        size: this.pageSize,
      };
      getAllRoles(parmsd).then(async (res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          this.tableLoading = false
        }
      })

      getAllMenu().then((res) => {
        if (res.data.code === 200) {
          this.depTree = res.data.data
        }
      })
    },
    pagationChange (payload) {
      this.pageNum = payload.page
      this.pageSize = payload.pageSize
      this.getData()
    },
    viewRow(row) {
      this.roleId = row.roleId
      getAllMenu(this.roleId).then((res) => {
        if (res.data.code === 200) {
          this.depTree = res.data.data
          this.treeLoading = false
        }
      })
      let checkIds = [], mobileCheckIds = []
      watchOutRoleMenu({
        roleId: this.roleId
      }).then((res) => {
        res.data.data.forEach((item) => {
          checkIds.push(item)
        })
        // 选中pc端有权限路由
        this.$refs.depTree.setCheckedKeys(checkIds)
      })
      watchOutMobileRoleMenu({
        roleId: this.roleId
      }).then((res) => {
        res.data.data.forEach((item) => {
          mobileCheckIds.push(item)
        })
        // 选中移动端有权限路由
        this.$refs.mobileTree.setCheckedKeys(mobileCheckIds)
      })
    },
    _getMobileMenu () {
      getMobileMenu().then(res => {
        if (res.data.code === 200) {
          this.mobileTree = res.data.data
        }
      })
    },
    add() {
      this.formData.roleName = ""
      this.formData.roleDesc = ""
      this.formData.rolePerpro = ""
      this.formData.sort = ""
      this.modalVisable = true
      this.titlemsg = "新增角色"
      this.isFlag = false
    },
    // 角色编辑
    edit(row) {
      this.roleId = row.roleId
      this.formData.roleName = row.roleName
      this.formData.roleDesc = row.roleDesc
      this.formData.sort = row.sort
      this.modalVisable = true
      this.titlemsg = "编辑角色"
      this.isFlag = false
    },
    //  删除角色
    del(ret) {
      let roleId = ret.roleId
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          deleteRole({roleId}).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              let parmsd = {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
              }
              this.tableLoading = true
              getAllRoles(parmsd).then((res) => {
                if (res.data.code === 200) {
                  this.tableData = res.data.data.list
                  this.total = res.data.data.total
                  this.tableLoading = false
                }
              })
            } else {
              this.$message.error(res.data.message)
            }
          })
        })
        .catch(() => {
          return false
        })
    },
    changeTabs(index) {
      this.activeName = index
    },
    getNode() {},
    // 角色,权限关系
    getCharges(row, data) {
      this.reverseSelect(row)
      this.selecAll(row)
    },
    closeModal() {
      this.modalVisable = false
    },
    // 全选
    selecAll(row) {
      if (row.childNodes.length !== 0) {
        row.childNodes.map((item, index) => {
          item.checked = row.checked
          this.selecAll(item)
        });
      }
    },
    // 反选全选
    reverseSelect(node) {
      if (node.level !== 1) {
        let count = 0
        node.parent.childNodes.map((item, index) => {
          if (item.checked) {
            count++
          }
        });
        if (count === node.parent.childNodes.length) {
          node.parent.checked = true
        } else {
          // node.parent.checked = false;
        }
        this.reverseSelect(node.parent)
      }
    },
    submitSave(formData, etxt) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (etxt === "sure") {
            let params = {
              roleDesc: this.formData.roleDesc,
              roleName: this.formData.roleName,
              sort: this.formData.sort,
            }
            insertRole(params).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "新增成功",
                  type: "success",
                });
                this.getData()
                this.modalVisable = false
              } else {
                this.$message.error(res.data.message)
              }
            })
          } else {
            let parms = {
              roleDesc: this.formData.roleDesc,
              sort: this.formData.sort,
              roleName: this.formData.roleName,
              roleId: this.roleId,
            }
            updateRole(parms).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.getData()
                this.modalVisable = false
              } else {
                this.$message.error(res.data.message)
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    // 权限确认提交
    save() {
      let funcodes = this.$refs.depTree.getCheckedKeys()
      let mobileId = this.$refs.mobileTree.getCheckedKeys()
      let params = {
        roleUuid: this.roleId,
        permissionList: funcodes,
        type: 0
      }
      RoleGiveMenuPermission(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("角色权限添加成功")
        } else {
          this.$message.error(res.data.message)
        }
      })
      let mobileParams = {
        roleUuid: this.roleId,
        permissionList: mobileId,
        type: 1
      }
      RoleGiveMenuPermission(mobileParams).then((res) => {
        if (res.data.code === 200) {
          this.getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleClose() {
      this.dialogVigPerpro = false
    },
    rest() {},
  },
}
</script>
<style lang="less" scoped>
#roleManage {
  height: 100%;
  box-sizing: border-box;
  .manage-box {
    float: left;
    height: 100%;
    width: 49%;
    margin-left: 2%;
    background-color: #fff;
    padding: 17px 20px;
    box-sizing: border-box;
    .p-btn-text-prmary {
        color: #217DFA;
      }
  }
  .manage-box:first-child {
    margin-left: 0;
  }
  .manage-box::after {
    display: block;
    clear: both;
    content: "";
  }
  .title {
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    border: 1px rgba(232, 234, 237, 1) solid;
    text-align: center;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    position: relative;
    border-bottom: none;
  }
  .manage-box /deep/ .el-table__header th {
    background-color: #fff;
  }
  .icon {
    position: absolute;
    right: 2%;
    top: 32%;
    cursor: pointer;
  }
  .p-input-title {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .p-input {
    min-width: 180px;
    display: inline-block;
    vertical-align: middle;
  }
  .p-input-item {
    margin-bottom: 20px;
  }
  .right-btn {
    font-size: 16px;
    margin-left: 15px;
    font-weight: bold;
  }
  .p-textarea {
    display: inline-block;
    vertical-align: top;
    height: 100px;
  }
  .p-modal-table td {
    height: 50px;
  }
  .rowactive {
    background-color: #fffcfcfc;
  }
  .validate-active {
    border: 1px solid #e32020;
    display: inline-block;
  }
  .tab-head {
    padding-left: 30px;
    overflow: hidden;
    border: 1px solid rgba(232, 234, 237, 1);
    border-bottom: none;
    list-style: none;
    li {
      height: 50px;
      line-height: 50px;
      float: left;
      min-width: 80px;
      text-align: center;
      color: #333;
      cursor: pointer;
    }
    .active {
      color: #217DFA;
      border-bottom: 2px solid #217DFA;
    }
  }
  .content {
    height: 89%;
    // overflow: hidden;
  }
  .detail {
    border: 1px solid rgba(232, 234, 237, 1);
    height: 86%;
    position: relative;
    overflow: auto;
  }
  .searchBox {
    overflow: hidden;
    border-bottom: 1px solid #e8eaed;
    .p-input {
      display: block;
      float: right;
      margin: 10px;
      height: 28px;
      padding-right: 6px;
      .p-btn-text-prmary {
        font-size: 17px;
        color: #217DFA;
      }
    }
  }

  .search-input {
    border: none;
    outline: none;
    height: 26px;
  }
  .list {
    position: absolute;
    left: 0;
    right: 0;
  }
  .detail /deep/ .el-tree-node__content {
    border-bottom: 1px solid #e8eaed;
    height: 40px;
    position: relative;
  }
  .detail /deep/ .el-icon-caret-right:before {
    content: "\e6e0";
  }
}
.btn-right {
  width: 140px;
  margin: 50px auto 0;
}
</style>
<style lang="less" >
.el-dialog__header {
  background: #1D93A8;
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close {
    color: #fff;
  }
}
</style>