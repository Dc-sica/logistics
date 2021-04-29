<template>
    <ContainerGroup id="containerGroup">
      <Container>
        <el-button type="default" @click="_goBack">返回</el-button>
      </Container>
      <Container>
          <p class="form-title">
            采购申请
          </p>
          <div class="form-row">
            <el-row>
              <el-form :model="formInfo" :rules="rules">
                <el-col :span="6">
                  <el-form-item label="采购申请单号：" prop="purchaseRequestNumber" label-width="120px">
                    <el-input v-model="formInfo.purchaseRequestNumber" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="录单日期：" prop="inputDate" label-width="120px">
                    <el-date-picker type="date" disabled placeholder="选择日期" v-model="formInfo.inputDate" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="申请部门：" prop="departmentName" label-width="120px">
                    <el-input v-model="formInfo.departmentName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <!-- 状态1->未批准 2->已批准 3->已驳回 4->已撤回  5 已完成-->
                  <el-form-item label="状态：" prop="status" label-width="120px">
                    <template slot-scope="{}">
                        <!-- 3233 -->
                      <el-input :value="formInfo.status===1?'未批准':formInfo.status===2?'已批准':formInfo.status===3?'已驳回':'已撤回'" disabled></el-input>
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="申请人：" prop="applicantName" label-width="120px">
                    <el-input v-model="formInfo.applicantName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注：" label-width="120px" prop="remarks">
                    <el-input type="textarea" disabled v-model="formInfo.remarks"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6" v-if="status ==='3'">
                  <el-form-item label="审批意见：" label-width="120px">
                    <el-input type="textarea" disabled v-model="formInfo.approvalComments"></el-input>
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
        <el-table :data="tableData" border :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="0">
          <el-table-column label="序号" align="center" type="index"></el-table-column>
          <el-table-column label="名称" prop="materialName" align="center"></el-table-column>
          <el-table-column label="物料号" align="center" prop="materialCode"></el-table-column>
          <el-table-column label="单位" align="center" prop="materialUnit"></el-table-column>
          <el-table-column label="数量" align="center" prop="quantity">
            <template slot-scope="scope">
              <el-form :model="formInput" :rules="rules">
                <el-form-item style="margin-bottom: 0px !important;">
                  <el-input type="number" disabled v-model="scope.row.quantity" placeholder="请输入" />
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </Container>
    </ContainerGroup>
</template>
<script>
    import {
        getMaterialList,
        getMaterialCategory
    } from './../../../apis/commonApi'

    import {
        getItemAdd,
        addItem,
        getItemDetail,
        delMaterielById
    } from './../../../apis/purchaseRequisition/index'
    export default {
        name: 'add',
        data() {
            return {
                mainId: '',
                drawerView: false,
                formInfo: {
                    departmentCode: '',
                    applicantId: "",
                    inputDate: null
                },
                formInline: {},
                formInput: {
                    quantity: ''
                },
                rules: {
                    inputDate: [{
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    quantity: [{
                        required: true,
                        message: '请输入',
                        trigger: 'blur'
                    }]
                },
                tableData: [],
                typesData: [],
                materialList: [],
                selectMaterial: []
            }
        },
        created() {
            const {
                id,
                status
            } = this.$route.query
            this.mainId = id
            this.status = status
            this._getData()
        },
        methods: {
            _getData() {
                let params = {
                    purchaseRequestId: this.mainId
                }
                getItemDetail(params).then(res => {
                    if (res.data.code === 200) {
                        this.tableData = res.data.data.materielList
                        this.formInfo = JSON.parse(JSON.stringify(res.data.data))
                        delete this.formInfo.materielList
                    }
                })
            },
            // 保存
            addAndSave() {
                const {
                    inputDate
                } = this.formInfo
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
                    return item.quantity === ''
                })
                if (flag.length !== 0) {
                    this.$message.warning('请输入数量')
                    return false
                }
                let params = {
                    ...this.formInfo,
                    materielList: this.tableData
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
            _detailItemHandle(row) {
                let params = {
                    id: row.id
                }
                delMaterielById(params).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success('删除成功')
                        this._getData()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            // 查询
            _materialSearch() {
                this._getMaterialList()
            },
            // 分类
            _getMaterialCategory() {
                getMaterialCategory().then(res => {
                    if (res.data.code === 200) {
                        this.materialList = res.data.data
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            // 物资列表
            _getMaterialList() {
                const {
                    materialCategory
                } = this.formInline
                if (materialCategory === '') {
                    delete this.formInline.materialCategory
                }
                let params = {
                    ...this.formInline
                }
                getMaterialList(params).then(res => {
                    if (res.data.code === 200) {
                        res.data.data.forEach(item => {
                            item.quantity = 0
                        })
                        this.typesData = res.data.data
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
            },
            _chooseItem() {
                this._getMaterialList()
                this._getMaterialCategory()
                this.drawerView = true
            },
            _drawerHandleClose() {
                this.$refs['formInline'].resetFields();
                this.drawerView = false
                this.selectMaterial = []
            },
            _onSave() {
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
                    // this.tableData = this.tableData.concat(this.selectMaterial)
                }
                this._drawerHandleClose()
            },
            _handleSelectionChange(val) {
                this.selectMaterial = val
            },
            _goBack() {
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