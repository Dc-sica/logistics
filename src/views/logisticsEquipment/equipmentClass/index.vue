<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" size="small" :model="formInline" ref="formInline" label-width="100px">
        <el-form-item label="分类名称：">
          <el-input placeholder="请输入分类名称" v-model.trim="formInline.name" clearable></el-input>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button  @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-button type="primary" @click="handleAdd" size="mini"><span class="el-icon-plus" style="margin-right:5px;"></span>添加</el-button>
      </OperationContainer>
      <el-table isFillHeight height="0" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" :key="ggggg" @expand-change="handleExpand" ref="table" lazy row-key="id" :load="loadEquipmentChild" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :data="tableData" v-loading="loading" border>
        <el-table-column label="分类名称" prop="name"></el-table-column>
        <el-table-column label="分类编号" prop="code"></el-table-column>
        <el-table-column label="排序" prop="typeOrder"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-tooltip class="item-button" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="handleDetails(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item-button" effect="dark" content="编辑" placement="top">
              <el-button type="text" @click="handleEdit(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item-button" effect="dark" content="删除" placement="top">
              <el-button type="text" @click="handleRemove(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
      <!-- 侧边弹窗 -->
      <Drawer :title="title" :visible.sync="drawerView" @cancel="_drawerHandleClose" @onOk="_commitApproveHandle" :footerBtns="iscan?[
          {type:'info',text:'取消', trigger:'cancel'}
        ]:[
          {type:'info',text:'取消', trigger:'cancel'},
          {type:'primary',text:'保存', trigger: 'onOk'},
        ]">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入分类名称，不超15字" maxlength="15" :disabled="iscan"></el-input>
          </el-form-item>
          <el-form-item label="上级分类：" prop="parentId">
            <el-select v-model="ruleForm.parentId" placeholder="请选择上级分类" style="width:100%" :disabled="iscan">
              <el-option label="一级" value="0"></el-option>
              <el-option v-for="(item,index) in parentList" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类编号：">
            <el-input v-model="ruleForm.code" placeholder="请输入分类编号" :disabled="iscan"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="typeOrder">
            <el-input v-model.number="ruleForm.typeOrder" placeholder="请输入排序" :disabled="iscan"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注信息，不超过300字" maxlength="300" rows="4" :disabled="iscan"></el-input>
          </el-form-item>
        </el-form>
      </Drawer>
      <!-- <add :rowId='rowId' @handleFresh="handleFresh" :btnType='btnType' v-if="drawerView" :drawer='drawerView' @closeHandle='_closeDrawerHandle' :dataList='dataList' /> -->
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    getEquipmentTypePage,
    getEquipmentChildrenList,
    deleteEquipmentType,
    addEquipmentType,
    buildInit,
    lookById,
    updateEquipmentType
  } from './../../../apis/logisticsEquipment/index'
  import pagination from './../../../components/pagination/index'
  // import add from './add'
  export default {
    name: 'equipmentClass',
    components: {
      // add,
      pagination
    },
    data() {
      return {
        rowId: '',
        btnType: 1, //2-编辑 3-查看
        formInline: {},
        tableData: [],
        total: 0,
        pageSize: 20,
        currentPage: 1,
        loading: false,
        drawerView: false,
        dataList: [],
        ggggg: '',
        ruleForm: {
          name: '',
        },
        title: "",
        rules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }, ],
          parentId: [{
            required: true,
            message: '请选择上级分类',
            trigger: 'blur'
          }],
          typeOrder: [{
            type: 'number',
            message: '排序必须为数字值',
          }]

        },
        parentList: [],
        iscan: false
      }
    },
    created() {
      this.getData()
      this.getbuildInit()
    },
    methods: {
      getbuildInit() { //获取上级分类
        buildInit().then(res => {
          if (res.data.code == 200) {
            this.parentList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getlookById() {
        let param = {
          id: this.rowId
        }
        lookById(param).then(res => {
          if (res.data.code == 200) {
            this.ruleForm = res.data.data || {}
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _drawerHandleClose() { //关闭遮罩层
        this.$refs.ruleForm.resetFields();
        for (let key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
        this.drawerView = false
      },
      _commitApproveHandle() { //遮罩层的提交
        let param = {
          ...this.ruleForm,
          id: 0
        }
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.btnType == 1) { //新增
              addEquipmentType(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this.getData()
                  this._drawerHandleClose()
                } else {
                  this.$message.error(res.data.message)
                }
              })
            } else if (this.btnType == 2) { //编辑
              param.id = this.rowId
              updateEquipmentType(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this.getData()
                  this._drawerHandleClose()
                } else {
                  this.$message.error(res.data.message)
                }
              })
            } //编辑

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleExpand(row, expanded) {
        // console.log(row)
        // console.log(expanded)
      },
      loadEquipmentChild(tree, treeNode, resolve) {
        let param = {
          parentId: tree.id
        }
        getEquipmentChildrenList(param).then(res => {
          if (res.data.code === 200) {
            let result = res.data.data || []
            resolve(result)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getData(type) {
        let param = {
          current: this.currentPage,
          name: this.formInline.name,
          size: this.pageSize,
        }
        this.loading = true
        if (type === 'fresh') {
          this.tableData = []
        }

        getEquipmentTypePage(param).then(res => {
          if (res.data.code === 200) {
            let arr = res.data.data.list || []
            arr.forEach(item => {
              item.hasChildren = true
            })
            this.tableData = arr
            this.total = res.data.data.total
            this.loading = false
          } else {
            this.$message.error(res.data.message)
            this.loading = false
          }
        })
      },
      handleFresh() { //刷新
        this.getData('fresh')
      },
      _closeDrawerHandle() {
        this.drawerView = false
      },
      handleAdd() { //添加
        this.title = "添加分类"
        this.btnType = 1
        this.drawerView = true
        this.iscan = false
      },
      handleDetails(row, type) { //查看详情
        this.title = "查看分类"
        this.drawerView = true
        this.rowId = row.id
        this.btnType = 3
        this.iscan = true
        this.getlookById()
      },
      handleEdit(row, type) { //编辑
        this.title = "编辑分类"
        this.drawerView = true
        this.rowId = row.id
        this.btnType = 2
        this.iscan = false
        this.getlookById()
      },
      handleRemove(row, type) { //删除
        let param = {
          id: row.id
        }
        deleteEquipmentType(param).then(res => {
          if (res.data.code == 200) {
            this.$message.success(res.data.message)
            // this.ggggg = Math.random()
            this.getData('fresh')
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleSearch() { //查询
        this.currentPage = 1
        this.pageSize = 10
        this.getData()
      },
      handleReset() { //重置
        for (let key in this.formInline) {
          this.formInline[key] = ''
        }
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this.getData()
      }
    }
  }
</script>
<style lang="less" scoped>
</style>