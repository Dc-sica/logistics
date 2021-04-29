<template>

  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true"
        ref="searchForm">
        <el-form-item label="名称："
          prop="name">
          <el-input v-model="name" clearable placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandle">查询</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-button icon="el-icon-plus"
          type="primary"
          @click="_addItemHandle">新增</el-button>
      </OperationContainer>
      <el-table :data="tableData" border
      :header-cell-style="{background:'#E8EAED'}"  stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="名称"
          prop="name"></el-table-column>
        <el-table-column label="编号"
          prop="code"></el-table-column>
        <el-table-column label="备注"
          prop="remark"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '启用': '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          prop="">
          <template slot-scope="scope">
            <el-tooltip class="item"
              effect="dark"
              content="编辑"
              placement="top">
              <el-button type="text"
                @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              v-if="scope.row.status === 1"
              effect="dark"
              content="禁用"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe72e;'"
                @click="_disableItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              v-else
              effect="dark"
              content="启用"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe6b4;'"
                @click="_disableItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange" />
    <Drawer
        :title="title"
        :visible="itemVisible"
        @cancel="_itemHandleClose"
        @confirm="_itemSaveHandle"
        width="40%"
        :footerBtns="[
          {
            text: '保存',
            type: 'primary',
            trigger: 'confirm',
          },
          {
            text: '取消',
            type: 'info',
            trigger: 'cancel',
          },
        ]"
      >
      <el-form :inline='false' style="width: 80%;"
        :rules="rules"
        :model="itemForm"
        ref="itemForm">
        <el-form-item label="编号："
          prop="code"
          label-width="100px">
          <el-input placeholder="编号"
            v-model="itemForm.code"
            disabled></el-input>
        </el-form-item>
        <el-form-item label="名称："
          prop="name"
          label-width="100px">
          <el-input placeholder="请输入名称"
            v-model="itemForm.name"></el-input>
        </el-form-item>
        <el-form-item label="备注："
          label-width="100px"
          prop="remark">
          <el-input type="textarea"
            placeholder="请输入备注" maxlength="200"
            v-model="itemForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态："
          label-width="100px"
          prop="status">
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
import pagination from './../../../components/pagination/index'
import {
  getListPage, addMaterialCategory, updateMaterialCategory, getCode
} from './../../../apis/materialClassification/indexApi'
export default {
  name: 'materialClassification', //物料分类
  components: {
    pagination
  },
  data () {
    return {
      name: '',
      classify: '',
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      itemVisible: false,
      direction: 'rtl',
      attrVisible: false,
      itemForm: {
        code: '',
        name: '',
        remark: '',
        status: 1
      },
      title: '',
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      storeList: [],
      isEdit: false,
      materialCategoryId: ''
    }
  },
  mounted () {
    this._getData()
  },
  methods: {
    _getData () {
      getListPage({
        name: this.name,
        current: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getCodeInit () {
      getCode().then(res => {
        if (res.data.code === 200) {
          this.itemForm.code = res.data.data.code
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    searchHandle () {
      this.currentPage = 1
      this._getData()
    },
    _addItemHandle () {
      this.title = '新增分类'
      this.itemVisible = true
      this.isEdit = false
      this.itemForm.name = ''
      this.itemForm.remark = ''
      this.$nextTick(() => {
        this.getCodeInit()
      })
    },
    _editItemHandle (row) {
      this.title = '编辑分类'
      this.itemVisible = true
      this.isEdit = true
      this.materialCategoryId = row.materialCategoryId
      let obj = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.itemForm = obj
      })
    },
    _disableItemHandle (row) {
      let status = ''
      if (row.status === 1) {
        status = 0
      } else {
        status = 1
      }
      let parms = {
        materialCategoryId: row.materialCategoryId,
        code: row.code,
        name: row.name,
        remark: row.remark,
        status: status
      }
      updateMaterialCategory(parms).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
          this._getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _itemHandleClose () {
      this.itemVisible = false
      this.title = ''
    },
    _itemSaveHandle () {
      if (this.isEdit) {
        this.updateHandle('itemForm')
      } else {
        this.addHandle('itemForm')
      }
    },
    addHandle (itemForm) {
      let parms = {
        code: this.itemForm.code,
        name: this.itemForm.name,
        remark: this.itemForm.remark,
        status: this.itemForm.status
      }
      this.$refs[itemForm].validate((valid) => {
        if (valid) {
          addMaterialCategory(parms).then(res => {
            if (res.data.code === 200) {
              this.itemVisible = false
              this._getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateHandle (itemForm) {
      let parms = {
        materialCategoryId: this.materialCategoryId,
        code: this.itemForm.code,
        name: this.itemForm.name,
        remark: this.itemForm.remark,
        status: this.itemForm.status
      }
      this.$refs[itemForm].validate((valid) => {
        if (valid) {
          updateMaterialCategory(parms).then(res => {
            if (res.data.code === 200) {
              this.itemVisible = false
              this._getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    pagationChange (payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getData()
    }
  }
}
</script>
<style lang="less">
.el-drawer.rtl {
  width: 35% !important;
  overflow-y: scroll;
  .closeTitle {
    height: 50px;
    line-height: 50px;
    padding-top: 0;
    padding-left: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #e8eaed;
  }
  .close-icon {
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }
}
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