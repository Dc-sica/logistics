<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true"
        ref="searchForm">
        <el-form-item label="数据项名称：">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态："
          prop="status">
          <el-select placeholder="请选择"
            v-model="status">
            <el-option value="0"
              label="禁用"></el-option>
            <el-option value="1"
              label="启用"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button icon="el-icon-plus"
          type="primary"
          @click="_addItemHandle">新增</el-button>
        <div>
          <el-select
            v-model="statusBtns"
            size="min"
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
        </div>
        <div class="delbox">
          <el-select
            v-model="delloe"
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
        </div>
      </OperationContainer>
      <el-table :data="tableData" border @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#E8EAED'}"  stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="数据项名称"
          prop="name"></el-table-column>
        <el-table-column label="禁用/启用">
          <template slot-scope="scope">
              <el-switch
                v-model="scope.row.statusVal"
                @click.stop.native
                @change="active_text(scope.row)"
              ></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="排序"
          prop="sort"></el-table-column>
        <el-table-column label="创建时间"
          prop="createTime"></el-table-column>
        <el-table-column label="操作">
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
              effect="dark"
              content="删除"
              placement="top">
              <el-button type="text"
                @click="_disableItemHandle(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange" />
    <!-- 新增弹出框 -->
     <Dialog
      :title='titleText'
      :visible="dialogVisible"
      @cancel="closebtn"
      @save="titleText === '新增数据项' ? submitForm('ruleForm', '0') : submitForm('ruleForm', '1')"
      :footerBtns="[
        {
          text: '确定',
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
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="min-width: 260px; padding: 20px 40px 0 0"
        class="demo-ruleForm"
      >
        <el-form-item label="数据项名称:" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.trim="ruleForm.sort" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
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
import pagination from './../../../components/pagination/index'
import {
  getDataList, addData, editData, delData, updateDataBatch
} from './../../../apis/dictManagement/indexApi'
export default {
  name: 'dictManagement', //字典管理
  components: {
    pagination
  },
  data () {
    return {
      code: this.$route.query.code,
      categoryId: this.$route.query.categoryId,
      name: '',
      status: '',
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      itemVisible: false,
      attrVisible: false,
      flag: true,
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
      titleText: '',
      dialogVisible: false,
      ruleForm: {},
      rules: {
        name: [
          { required: true, message: "请输入属性名称", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
      },
    }
  },
  created () {
    this._getData()
  },
  methods: {
    _getData () {
      getDataList({
        deleteFlag: 0,
        categoryId: this.categoryId,
        name: this.name,
        status: this.status,
        current: this.currentPage,
        size: this.pageSize,
        ascs: 'sort'
      }).then(res => {
        if (res.data.code === 200) {
          res.data.data.list.forEach(element => {
            if (element.status === '1') {
              element.statusVal = true
            } else {
              element.statusVal = false
            }
          })
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      })
    },
    searchHandle () {
      this.currentPage = 1
      this._getData()
    },
    reset () {
      this.name = ''
      this.status = ''
    },
    _addItemHandle () {
      this.titleText = '新增数据项'
      this.dialogVisible = true
      this.ruleForm = {}
    },
    _editItemHandle (row) {
      this.titleText = '编辑数据项'
      this.dialogVisible = true
      let obj = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.ruleForm = obj
        this.ruleForm.status = row.status === '1' ? true: false
      })
    },
    handleSelectionChange(val) {
      this.nevbox = val
    },
    statusChange () {
      if (this.nevbox.length === 0) {
        this.$message.warning('请选择属性名称')
        this.statusBtns = ''
        return false
      }
      if (this.statusBtns === '1') {
        this.nevbox.forEach(element => {
          element.status = '0'
        })
      } else {
        this.nevbox.forEach(element => {
          element.status = '1'
        })
      }
      updateDataBatch(this.nevbox).then(res => {
        if (res.data.code === 200) {
          this.statusBtns = ''
          this._getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    delList () {
      let _this = this
      if (this.nevbox.length === 0) {
        this.$message.warning('请选择属性名称')
        this.delloe = ''
        return false
      }
      let ids = []
      this.nevbox.forEach(element => {
        ids.push(element.dictId)
      })
      let parms = {
        "categoryCode": "string",
        "categoryId": '',
        "code": "string",
        "dictId": '',
        "ids": ids.toString(),
        "name": "string",
        "sort": "string",
        "status": "string"
      }
      delData(parms).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _this._getData()
        }
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.$refs['ruleForm'].resetFields()
    },
    // 取消按钮
    closebtn() {
      this.dialogVisible = false
    },
    active_text(row) {
      let status = ''
      if (row.statusVal) {
        status = '1'
      } else {
        status = '0'
      }
      let parms = {
        name: row.name,
        sort: row.sort,
        status: status,
        dictId: row.dictId,
        categoryId: this.categoryId,
        code: this.ruleForm.code,
        categoryCode: this.code
      }
      editData(parms).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功')
          this._getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _disableItemHandle (row) {
      let _this = this
      this.$confirm('是否确认删除该数据？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let parms = {
          "categoryCode": "string",
          "categoryId": '',
          "code": "string",
          "dictId": '',
          "ids": row.dictId,
          "name": "string",
          "sort": "string",
          "status": "string"
        }
        delData(parms).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this._getData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    submitForm (formName, isEdit) {
      if (isEdit === '0') {
        this.addHandle(formName)
      } else {
        this.editHandle(formName)
      }
    },
    addHandle (formName) {
      let parms = {
        categoryId: this.categoryId,
        categoryCode: this.code,
        name: this.ruleForm.name,
        sort: this.ruleForm.sort,
        status: this.ruleForm.status === true ? '1' : '0'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addData(parms).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible = false
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
    editHandle (formName) {
      let parms = {
        name: this.ruleForm.name,
        sort: this.ruleForm.sort,
        status: this.ruleForm.status === true ? '1' : '0',
        dictId: this.ruleForm.dictId,
        categoryId: this.ruleForm.categoryId,
        code: this.ruleForm.code,
        categoryCode: this.code
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editData(parms).then(res => {
            if (res.data.code === 200) {
              this.dialogVisible = false
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
<style lang="less" scoped>
#nevboxs .delbox {
  .el-select {
    width: 100px;
  }
  .el-input--suffix .el-input__inner {
    color: #fc5454 !important;;
    border-color: #FC5454!important;
    background: #fff;
  }
  .el-select .el-input .el-select__caret {
    color: #999;
    line-height: 36px;
  }
  .el-input__inner::placeholder {
    color: #FC5454!important;
  }
  /* 谷歌 */
  .el-input__inner::-webkit-input-placeholder {
    color: #FC5454!important;
  }
  /* 火狐 */
  .el-input__inner:-moz-placeholder {
    color: #FC5454!important;
  }
  /*ie*/
  .el-input__inner:-ms-input-placeholder {
    color: #FC5454!important;
  }
}
</style>