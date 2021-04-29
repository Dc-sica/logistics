<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-11 15:07:59
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-07 09:18:15
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseRequisition/add.vue
-->

<template>
  
  <ContainerGroup id="containerGroup">
    <Container>
      <el-button type="primary"
        @click="addAndSave">保存</el-button>
      <el-button type="default"
        @click="_goBack">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">
        采购申请
      </p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo"
            :rules="rules"
            ref="formInfo">
            <el-col :span="12"
              v-if="isEdit">
              <el-form-item label="采购申请单号："
                label-width="120px"
                prop="purchaseRequestNumber">
                <el-input v-model="formInfo.purchaseRequestNumber"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请部门："
                label-width="120px"
                prop="departmentName">
                <el-input v-model="formInfo.departmentName"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="录单日期："
                label-width="120px"
                prop="inputDate">
                <el-date-picker type="date"
                  placeholder="选择日期"
                  v-model="formInfo.inputDate"
                  :picker-options="pickerOptions0"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请人："
                prop="applicantName"
                label-width="120px">
                <el-input v-model="formInfo.applicantName"
                  disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注："
                label-width="120px"
                prop="remarks">
                <el-input type="textarea"
                  :maxlength="200"
                  :show-word-limit='true'
                  v-model="formInfo.remarks"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="采购物资："
                required
                label-width="120px">
                <el-button type="primary"
                  @click="_chooseItem">选择物资</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">
        物资明细
      </p>
        <el-table :data="tableData"
          border
          :header-cell-style="{background:'#E8EAED'}"
          stripe size="mini" highlight-current-row isFillHeight
          height="0"
          >
          <el-table-column label="序号"
            align="center"
            type="index"></el-table-column>
          <el-table-column label="名称"
            align="center"
            prop="materialName"></el-table-column>
          <el-table-column label="物料号"
            align="center"
            prop="materialCode"></el-table-column>
          <el-table-column label="单位"
            align="center"
            prop="materialUnitName"></el-table-column>
          <el-table-column label="数量"
            align="center"
            prop="quantity">
            <template slot-scope="scope">
              <el-form :model="scope.row"
                :rules='rules'>
                <el-form-item prop="quantity" style="margin-bottom: 0px !important;">
                  <el-input type="number"
                    v-show="true"
                    :min="0"
                    v-model="scope.row.quantity"
                    placeholder="请输入" />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="操作"
            align="center">
            <template slot-scope="scope">
              <el-tooltip class="item"
                effect="dark"
                content="删除"
                placement="top">
                <el-popconfirm :title="`确定要删除 ${scope.row.materialName} 吗?`"
                  @confirm="_detailItemHandle(scope.row,scope.$index)">
                  <el-button type="text"
                    slot="reference">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-popconfirm>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
    </Container>
    <!-- 侧边弹窗 -->
    <Drawer
      title="选择物资"
      :visible.sync="drawerView"
      @onOk="_onSave"
      @cancel="_drawerHandleClose"
      :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
         { type: 'primary', text: '保存', trigger: 'onOk' }
      ]"
    >
      <OperationContainer>
        <el-form :inline="true" ref="formInline" :model="formInline">
          <el-form-item label="名称：" prop="name" label-width="60px">
            <el-input
              placeholder="请输入"
              v-model="formInline.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类：" prop="code" label-width="60px">
            <el-select
              placeholder="请选择"
              v-model="formInline.materialCategory"
              clearable
            >
              <el-option v-for="item in materialList"
                :key="item.code"
                :value="item.materialCategoryId"
                :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_materialSearch"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </OperationContainer>
      <div class="drawer-table-box">
        <el-table
            :data="typesData"
            ref="multipleTable"
            @selection-change="_handleSelectionChange"
            border
            stripe
            size="mini"
            highlight-current-row
            :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="名称"
              prop="name"></el-table-column>
            <el-table-column label="物料号"
              prop="code"></el-table-column>
            <el-table-column label="单位"
              prop="materialUnitName" width="80"></el-table-column>
            <el-table-column label="分类"
              prop="categoryName"></el-table-column>
            <el-table-column label="库存"
              prop="allowCapacity" width="80"></el-table-column>
          </el-table>
      </div>
    </Drawer>
  </ContainerGroup>
</template>
<script>
import {
  getMaterialList, getMaterialCategory
} from './../../../apis/commonApi'
import {
  addItem,
  getItemDetail,
} from './../../../apis/purchaseRequisition/index'
export default {
  name: 'add',
  data () {
    return {
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      drawerView: false,
      status: '',
      mainId: '',
      formInfo: {
        departmentCode: '',
        applicantId: "",
        inputDate: this.$moment(new Date()).format('YYYY-MM-DD')
      },
      formInline: {},
      rules: {
        inputDate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        quantity: [
          { required: true, message: '请输入数量', tirgger: "blur" },
          { pattern: /^\+?[1-9]\d*$/, message: '请输入正整数' },
        ],
      },
      tableData: [],
      typesData: [],
      materialList: [],
      selectMaterial: [],
      isEdit: false
    }
  },

  created () {
    const { id, status, isEdit } = this.$route.query
    this.isEdit = isEdit
    if (id) {
      this.mainId = id
      this.status = status
      this._getData()
    } else {
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const { userId, name, deptId, deptName } = userInfo
        this.formInfo.departmentCode = deptId
        this.formInfo.departmentName = deptName
        this.formInfo.applicantId = userId
        this.formInfo.applicantName = name
        this.formInfo.remark = ''
      }
    }
  },
  methods: {
    // 编辑回显
    _getData () {
      let params = {
        purchaseRequestId: this.mainId
      }
      getItemDetail(params).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.materielList
          this.formInfo = JSON.parse(JSON.stringify(res.data.data))
          delete this.formInfo.materielList
        } else {
          this.$message.error(res.data.message)
        }
      })
    },

    // 保存
    addAndSave () {
      const { inputDate } = this.formInfo
      if (inputDate === '' || inputDate === null || inputDate === undefined) {
        this.$message.warning('请选择录单日期')
        return false
      } else {
        this.formInfo.inputDate = this.$moment(inputDate).format('YYYY-MM-DD')
      }
      if (this.tableData.length === 0) {
        this.$message.warning('请选择采购物资')
        return false
      }
      let flag = this.tableData.filter(item => {
        return item.quantity === '' || item.quantity <= 0
      })
      if (flag.length !== 0) {
        this.$message.warning('请输入大于0的数字')
        return false
      }
      let params = {
        ...this.formInfo,
        materielList: this.tableData
      }
      if (this.mainId !== '') { // 编辑更新
        params.id = this.mainId
      } else {  //新增
        delete params.id
      }
      addItem(params).then(res => {
        if (res.data.code === 200) {
          this.$message.success('添加成功')
          this.$router.push('/purchaseRequisition')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 查询
    _materialSearch () {
      this._getMaterialList()
    },
    // 分类
    _getMaterialCategory () {
      getMaterialCategory().then(res => {
        if (res.data.code === 200) {
          this.materialList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _detailItemHandle (row, index) {
      this.tableData.splice(index, 1)
    },
    // 物资列表
    _getMaterialList () {
      const { materialCategory } = this.formInline
      if (materialCategory === '') {
        delete this.formInline.materialCategory
      }
      let params = {
        ...this.formInline
      }
      getMaterialList(params).then(res => {
        if (res.data.code === 200) {
          res.data.data.forEach(item => {
            item.quantity = 1
          })
          this.typesData = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _chooseItem () {
      this._getMaterialList()
      this._getMaterialCategory()
      this.drawerView = true
    },
    _drawerHandleClose () {
      this.$refs['formInline'].resetFields();
      this.drawerView = false
      this.selectMaterial = []
    },
    _onSave () {
      console.log('this.selectMaterial', this.selectMaterial)
      if (this.selectMaterial.length !== 0) {
        this.selectMaterial.forEach(item => {
          item.materialName = item.name
          item.materialCode = item.code
        })
        if (this.tableData.length <= 0) {
          this.tableData = this.selectMaterial
        } else {
          let temp = this.tableData.filter(item => {
            let objTemp = this.selectMaterial.filter(ele => item.materialCode === ele.code)
            if (objTemp.length > 0) {
              return objTemp
            }
          })
          if (temp.length > 0) {
            this.$message.warning(`物资 ${temp[0].materialName} 已经添加,请重新选择`)
            this.selectMaterial = []
            return false
          } else {
            this.tableData = this.tableData.concat(this.selectMaterial)
          }
        }
      }
      this._drawerHandleClose()
    },
    _handleSelectionChange (val) {
      this.selectMaterial = val
    },
    _goBack () {
      this.$router.push('/purchaseRequisition')
    }
  }
}
</script>
<style lang="less" scoped>
  
  .form-title {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
