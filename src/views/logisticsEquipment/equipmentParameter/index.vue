<template>
  <ContainerGroup layout="row">
    <Container class="content-left">
      <div class="wrapper-title">分类目录</div>
      <el-tree class="tree-panner" ref="tree" :data="treedata" node-key="id" :expand-on-click-node="false" icon-class="iconfont rightIcon" :highlight-current="true" :props="defaultProps" :default-expand-all='true' @node-click="handleNodeClick">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <span v-if="node.childNodes.length>0" class="iconfont">&#xe7aa;</span>
            <span v-if="node.childNodes.length==0" class="iconfont">&#xebab;</span>
            <span>{{ data.label }}</span>
          </span>
        </span>
      </el-tree>
    </Container>
    <Container class="content-right">
      <div class="wrapper-title">分类信息</div>
      <el-form class="wrapper-search" :inline="true" size="small" :model="formInline" ref="formInline">
        <el-form-item label="分类名称：">
          <el-cascader placeholder="请选择" style="width:100%" clearable v-model="formInline.typeId" :options="typeNameArr" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <OperationContainer>
        <el-button type="primary" class="addBtn" @click="handleAdd" size="mini"><span class="el-icon-plus" style="margin-right:5px;"></span>添加</el-button>
      </OperationContainer>
      <el-table isFillHeight stripe size="mini" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" height="0" v-loading="loading" :data="tableData" highlight-current-row border>
        <el-table-column prop="code" label="参数编码">
        </el-table-column>
        <el-table-column prop="name" label="参数名称">
        </el-table-column>
        <el-table-column prop="typeName" label="分类名称">
        </el-table-column>
        <el-table-column prop="unitName" label="参数单位">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-tooltip class="item-button" effect="dark" content="查看" placement="top">
              <el-button class="iconfont" v-html="'&#xe67e;'" type="text" @click="handleDetails(scope.row)"></el-button>
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
          <el-form-item label="分类名称：" prop="lxname">
            <el-cascader placeholder="请选择" style="width:100%" :disabled="iscan" v-model="ruleForm.lxname" :options="typeNameArr" @change="handleTcChange"></el-cascader>
          </el-form-item>
          <el-form-item label="参数编号：">
            <el-input v-model="ruleForm.code" placeholder="请输入参数编号" :disabled="iscan"></el-input>
          </el-form-item>
          <el-form-item label="参数名称：" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入参数名称" :disabled="iscan"></el-input>
          </el-form-item>
          <el-form-item label="参数单位：">
            <el-select v-model="ruleForm.unit" placeholder="请选择" :disabled="iscan">
              <el-option v-for="(item,index) in unitList" :key="index" :label="item.name" :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注信息，不超过300字" maxlength="300" rows="4" :disabled="iscan"></el-input>
          </el-form-item>
        </el-form>
      </Drawer>
    </Container>

    <!-- <add :rowId='rowId' :btnType='btnType' v-if="drawerView" :drawer='drawerView' @handleFresh="handleFresh" @closeHandle='_closeDrawerHandle' /> -->
  </ContainerGroup>
</template>
<script>
  // import add from './add'
  import {
    getParamPage,
    getParambuildInit,
    deleteParam,
    getParamChildrenList,
    addParam,
    lookParamById,
    updateParam
  } from './../../../apis/logisticsEquipment/index'
  import pagination from './../../../components/pagination/index'
  import {
    getDept
  } from './../../../apis/userManagement/indexApi'
  export default {
    name: 'equipmentClass',
    components: {
      pagination
      // add
    },
    data() {
      return {
        title: '',
        typeNameArr: [],
        loading: false,
        tableData: [],
        formInline: {},
        treedata: [],
        // data: JSON.parse(JSON.stringify(data)),
        defaultProps: {
          children: "children",
          label: "label",
        },
        total: 0,
        pageSize: 20,
        currentPage: 1,
        drawerView: false,
        btnType: 1, //2-编辑 3-查看
        rowId: '',
        mlId: '', //左侧目录id
        ruleForm: {
          name: '',
          typeId: ''
        },
        rules: {
          name: [{
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          }, ],
          lxname: [{
            required: true,
            message: '请选择分类',
            trigger: ['blur', 'change']
          }]
        },
        unitList: [],
        iscan: false,
      }
    },
    created() {
      this.getTypeMl()
      this.getunitList()
    },
    methods: {
      handleTcChange(value) {
        this.ruleForm.typeId = value[value.length - 1]
      },
      getlookById() {
        let param = {
          id: this.rowId
        }
        lookParamById(param).then(res => {
          if (res.data.code == 200) {
            setTimeout(() => {
              this.ruleForm = res.data.data
              this.ruleForm.lxname = res.data.data.typeIdList
            }, 100);
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getunitList() { //获取单位
        getDept({
          categoryCode: 'equipment_unit',
          status: 1
        }).then(res => {
          if (res.data.code === 200) {
            this.unitList = res.data.data.sysDictList
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _drawerHandleClose() { //取消遮罩层
        this.$refs['ruleForm'].resetFields();
        for (let key in this.ruleForm) {
          this.ruleForm[key] = ''
        }
        this.drawerView = false

      },
      _commitApproveHandle() { //弹窗确定
        let param = {
          ...this.ruleForm,
          id: 0
        }
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.btnType == 1) { //新增
              addParam(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this._drawerHandleClose()
                  this.handleFresh()
                } else {
                  this.$message.error(res.data.message)
                }
              })
            } else if (this.btnType == 2) { //编辑
              param.id = this.rowId
              updateParam(param).then(res => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message)
                  this._drawerHandleClose()
                  this.handleFresh()
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
      handleChange(value) {
        this.mlId = value[value.length - 1]
      },
      handleFresh() {
        this.getData(this.mlId)
      },
      getTypeMl() { //获取左边分类目录
        let param = {}
        getParamChildrenList(param).then(res => {
          if (res.data.code === 200) {
            let arr = res.data.data || []
            this.treedata = arr
            this.loading = false
            if (arr.length > 0) {
              setTimeout(() => {
                if (this.treedata[0].children > 0) {
                  this.treedata[0].children.forEach((item, index) => {
                    if (index == 0) {
                      this.$refs.tree.setCurrentKey(item.id)
                      this.getData(item.id)
                    }
                  })
                } else {
                  this.$refs.tree.setCurrentKey(this.treedata[0].id)
                  this.getData(this.treedata[0].id)
                }
              }, 100);
            }
            this.typeNameArr = res.data.data || []
            this.getdgData(this.typeNameArr)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getdgData(typeNameArr) {
        typeNameArr.forEach(item => {
          if (item.children.length == 0) {
            delete item.children
            item.value = item.id
          } else {
            item.value = item.id
            this.getdgData(item.children)
          }
        })
      },
      _closeDrawerHandle() {
        this.drawerView = false
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this.getData(this.mlId)
      },
      handleDetails(row) { //查看
        this.title = '查看设备参数'
        this.btnType = 3
        this.rowId = row.id
        this.getlookById()
        this.drawerView = true
        this.iscan = true
      },
      handleEdit(row) { //编辑
        this.title = '编辑设备参数'
        this.btnType = 2
        this.rowId = row.id
        this.getlookById()
        this.drawerView = true
        this.iscan = false
      },

      handleRemove(row) { //删除
        let params = {
          id: row.id
        }
        deleteParam(params).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.getData(this.mlId)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getData(id) {
        let param = {
          current: this.currentPage,
          size: this.pageSize,
          typeId: id ? id : ''
        }
        this.loading = true
        getParamPage(param).then(res => {
          if (res.data.code === 200) {
            let arr = res.data.data.list || []
            this.tableData = arr
            this.total = res.data.data.total
            this.loading = false
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleAdd() { //添加
        this.btnType = 1
        this.iscan = false
        this.title = '添加设备参数'
        this.drawerView = true
      },
      handleSearch() { //查询
        this.currentPage = 1
        this.pageSize = 10
        this.getData(this.mlId)
      },
      handleNodeClick(data, node, tag) {
        if (node.isLeaf) {
          this.getData(data.id)
        }
      },
      handleReset() { //重置
        this.mlId = ''
        for (let key in this.formInline) {
          this.formInline[key] = ''
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .tree-panner {
    padding-top: 15px;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .wrapper {
    background: #fff;
    overflow-x: auto;
  }

  .content-left {
    // height: calc(100vh - 120px);
    flex: 0 0 300px;
    background: #fff;
  }

  .content-right {
    background: #fff;
    flex: 1;
    margin-left: 15px;
    width: 0;
  }

  .wrapper-title {
    font-size: 16px;
    text-align: left;
    color: #333333;
    border-bottom: 1px solid #E8EAED;
    padding: 10px 15px;
  }

  .wrapper-search {
    margin: 15px 10px;
  }

  .addBtn {
    margin-bottom: 15px;
  }


  /deep/.el-tree-node__expand-icon.expanded {
    transform: none;
  }

  /deep/.el-tree-node__expand-icon.rightIcon:before {
    content: "\ea6e";
    font-size: 16px;
    color: #333333;
  }

  /deep/.el-tree-node__expand-icon.expanded.rightIcon:before {
    content: "\e638";
    font-size: 16px;
    color: #1D93A8;
  }

  /deep/.el-tree-node__expand-icon.is-leaf::before {
    display: none;
  }
</style>