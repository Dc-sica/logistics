<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_backHandle">取消</el-button>
      <el-button type="primary" @click="handleApproval(['formInfo','formInfo1'])">确定</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="form-box">
        <p class="form-title">
          基本信息
        </p>
        <div class="form-row">
          <el-form :model="formInfo" ref="formInfo" :rules="rules" label-width="110px">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="设备名称：" prop="name">
                  <el-input v-model="formInfo.name" placeholder="请输入" maxlength="30"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="设备编号：">
                  <el-input v-model="formInfo.model" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="责任人：">
                  <el-select v-model="formInfo.userId" placeholder="请选择" style="width:100%;">
                    <el-option v-for="item in personList" :key="item.userId" :value="item.userId" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备分类：" prop="typeId">
                  <el-select placeholder="请选择" clearable v-model="formInfo.typeId" style="width:100%;">
                    <el-option v-for="(item,index) in shebeiClass" :key="index" :value="item.id" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="原值：" prop="price">
                  <el-input v-model.trim="formInfo.price" placeholder="请选择">
                    <template slot="append">元</template></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号：" prop="model">
                  <el-input v-model="formInfo.model" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="条形码：">
                  <el-input v-model="formInfo.barCode" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="状态：" prop="status">
                  <el-select placeholder="请选择" v-model="formInfo.status" clearable style="width:100%;">
                    <el-option value="1" label="开启"></el-option>
                    <el-option value="0" label="关闭"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购置日期：" prop="buyDate">
                  <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formInfo.buyDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用年限：" prop="usefulYears">
                  <el-input v-model.number="formInfo.usefulYears" placeholder="请输入">
                    <template slot="append">年</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <!-- <el-col :span="8">
                <el-form-item label="已使用年限：">
                  <el-input v-model="formInfo.name" placeholder="请输入">
                    <template slot="append">月</template></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="设备位置：" prop="location">
                  <el-input v-model="formInfo.location" placeholder="请输入" maxlength="30"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任科室：">
                  <el-select placeholder="请选择" v-model="formInfo.deptId" style="width:100%;">
                    <el-option v-for="(item,index) in deptList" :key="index" :value="item.id" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报修描述标签：">
                  <el-select v-model="formInfo.labelsList" multiple collapse-tags placeholder="请选择" style="width:100%;">
                    <el-option v-for="item in tagdscList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-box table-box">
        <p class="form-title">
          参数信息
        </p>
        <div class="table-content">
          <div style="width:100%;text-align:center;margin-bottom:15px;cursor: pointer;" @click="handleChoseParamter"><span class="el-icon-plus"></span>选择参数</div>
          <el-table height="25vh" size="small" :data="tableData" border @selection-change="handleSelectionChangeArr" highlight-current-row>
            <!-- <el-table-column type="selection" width="55">
            </el-table-column> -->
            <el-table-column label="参数编码" prop="code"></el-table-column>
            <el-table-column label="参数名称" prop="name"></el-table-column>
            <el-table-column label="分类名称" prop="typeName"></el-table-column>
            <el-table-column label="参数值">
              <template slot-scope="scope">
                <el-form :model="scope.row" :rules='rules'>
                  <el-form-item>
                    <el-input v-model="scope.row.value"></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="参数单位" prop="unitName"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="text" @click="handleDeletePreteme(scope.row)" style="#FF2929">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="form-box">
        <p class="form-title">
          维保信息
        </p>
        <div class="form-row">
          <el-form :model="formInfo" ref="formInfo1" :rules="rules" label-width="110px">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="厂商：" prop="manufacturerId">
                  <el-select placeholder="请选择" style="width:100%;" @change="handleGetPhonePerson" clearable v-model="formInfo.manufacturerId">
                    <el-option v-for="(item,index) in manufacturerList" :key="index" :value="item.manufacturerId" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌：">
                  <el-select placeholder="请选择" :disabled="true" multiple collapse-tagsclearable v-model="formInfo.brand" style="width:100%;">
                    <el-option v-for="(item,index) in brandList" :key="index" :value="item.id" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="厂家联系人：">
                  <el-input v-model="formInfo.contacts" disabled placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="厂家联系方式：">
                  <el-input v-model="formInfo.phoneff" disabled placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修人：">
                  <el-input v-model="formInfo.repairUser" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修电话：" prop="repairUserPhone">
                  <el-input v-model="formInfo.repairUserPhone" placeholder="请输入" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="供应商：">
                  <el-select placeholder="请选择" :disabled="true" multiple collapse-tagsclearable clearable v-model="formInfo.supplier" style="width:100%;">
                    <el-option v-for="(item,index) in supplierList" :key="index" :value="item.supplierId" :label="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保修日期：" prop="repairEndDate">
                  <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formInfo.repairEndDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修公司：">
                  <el-input v-model="formInfo.repairCompany" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-box">
        <p class="form-title">
          附件
        </p>
        <div class="form-row">
          <el-form :model="formInfo" ref="formInfo2" :rules="rules" label-width="110px">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="保修图片：">
                  <div class="upDiv">
                    <input type="file" style="display:none" @change="fileUpload" ref="file" multiple />
                    <el-button type="default" class="uploadBtn" size="mini" @click="upLoadFile">上传图片</el-button>
                    <span class="tip"><i>*</i>最多上传9张图片</span>
                  </div>
                  <div class="tip">支持扩展名：jpg, png, pdf, gif</div>
                  <div class="fileName">
                    <div class="imgDiv" v-for="(item, index) in fileList" :key="index">
                      <img :src="item.url" alt="">
                      <i class="imgDelete" @click="deleteFile(item)">×</i>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备档案：">
                  <div class="upDiv">
                    <input type="file" style="display:none" @change="recordfileUpload" ref="recordfile" multiple />
                    <el-button type="default" class="uploadBtn" size="mini" @click="upLoadRecordFile">上传文件</el-button>
                  </div>
                  <div class="tip">支持扩展名：jpg, png, pdf, gif</div>
                  <div class="fileName">
                    <div class="a-visited" style="display:block;" v-for="(item, index) in recordfileList" :key="index">
                      <a class="a-filDel" style="margin-right:10px;">{{item.name}}</a>
                      <i class="filDel" @click="deleterecordFile(item)">×</i>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-dialog v-if="visible" :close-on-click-modal="false" :visible="visible" class="dialog-wrapper" width="800px" title='选择参数' :before-close="_itemHandleClose">
        <el-form size="small" :inline="true" :model="formInfoParam" class="demo-form-inline" style="margin-bottom:15px;">
          <el-form-item label="参数名称:">
            <el-input v-model.trim="formInfoParam.name"></el-input>
          </el-form-item>
          <el-form-item label="单位:">
            <el-select v-model="formInfoParam.unitId" placeholder="请选择">
              <el-option v-for="(item,index) in unitList" :key="index" :label="item.name" :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="lookParamter">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table height="40vh" size="small" :data="tableParamData" border @selection-change="handleSelectionChange" highlight-current-row>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="参数编码" prop="code" width="120px"></el-table-column>
          <el-table-column label="参数名称" prop="name"></el-table-column>
          <el-table-column label="分类名称" prop="typeName" width="180"></el-table-column>
          <!-- <el-table-column label="参数值" prop="unit"></el-table-column> -->
          <el-table-column label="参数单位" prop="unitName" width="120px"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
        <div slot="footer">
          <el-button @click="_itemHandleClose">取消</el-button>
          <el-button @click="handleSubmitParam" type="primary">提交</el-button>
        </div>
      </el-dialog>
    </Container>
  </ContainerGroup>
</template>

<script>
  import {
    upload
  } from './../../../apis/commonApi'
  import {
    getManufacturerListPage,
    getBrandInfo,
    getSupplier
  } from './../../../apis/manufacturerInformation/indexApi'
  import {
    getParambuildInit,
    getAllPersonlist,
    getBuildInit,
    getParamList,
    addEquipmentData
  } from './../../../apis/logisticsEquipment/index'
  import {
    getDept
  } from './../../../apis/userManagement/indexApi'
  export default {
    name: 'add',
    data() {
      // 验证手机 
      let checkPhone = (rule, value, callback) => {
        console.log('value', value)
        if (value) {
          let reg = /^1[345789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入11位手机号'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      // 验证使用年限为正整数 
      let checkUsefulYears = (rule, value, callback) => {
        if (value) {
          if (Number.isInteger(Number(value)) && Number(value) > 0) {
            callback();
          } else {
            callback(new Error("请输入正整数"));
          }
        } else {
          callback();
        }

      }

      // 验证原值为数字
      let checkNumber = (rule, value, callback) => {
        if (value && !isNaN(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }

      return {
        formInfoParam: {},
        supplierList: [], //经销商
        brandList: [], //品牌
        manufacturerList: [], //厂商
        tagdscList: [],
        personList: [],
        deptList: [],
        shebeiClass: [],
        tableData: [],
        warehouseList: [],
        visible: false,
        fileList: [],
        recordfileList: [],
        formInfo: {
          name: ''
        },
        multipleSelection: [],
        multipleParamSelection: [],
        rules: {
          name: [{
            required: true,
            message: '请输入设备名称',
            trigger: 'blur'
          }],
          typeId: [{
            required: true,
            message: '请选择设备分类',
            trigger: ['blur', 'change']
          }],
          price: [{
            required: true,
            message: '请输入数字',
            validator: checkNumber,
            trigger: 'blur'
          }],
          model: [{
            required: true,
            message: '请输入型号',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: ['blur', 'change']
          }],
          buyDate: [{
            required: true,
            message: '请选择购置日期',
            trigger: 'blur'
          }],
          manufacturerId: [{
            required: true,
            message: '请选择厂商',
            trigger: ['blur', 'change']
          }],
          repairEndDate: [{
            required: true,
            message: '请选择保修日期',
            trigger: 'blur'
          }],
          repairUserPhone: [{
            validator: checkPhone,
            trigger: 'blur'
          }],
          usefulYears: [{
            type: 'number',
            validator: checkUsefulYears,
            message: '请输入正整数',
            trigger: ['blur', 'change']
          }],
          location: [{
            required: true,
            message: '请填写设备位置',
            trigger: 'blur'
          }],

        },
        tableParamData: [],
        unitList: []
      }
    },
    created() {
      this.getSupplierList()
      this.getManufacturerListPageList()
      this.getParambuildInitList()
      this.getBrandInfoList()
      this.getAllPersonlistArr()
      this.getBuildInitlist()
      this.getParamListData()
      this.getunitList()
    },
    methods: {
      handleGetPhonePerson(value) { //选择厂商填充厂家联系人、联系方式
        this.manufacturerList.forEach(item => {
          if (value === item.manufacturerId) {
            this.formInfo.contacts = item.contacts
            this.formInfo.phoneff = item.phone

            this.formInfo.brand = item.brand && item.brand.split(',').map(item => {
              return Number(item)
            }) //品牌
            this.formInfo.supplier = item.supplier && item.supplier.split(',').map(item => {
              return Number(item)
            }) //供应商
          }
        })
      },
      handleSubmitParam() { //参数弹窗提交
        if (this.multipleParamSelection.length === 0) {
          this.$message.warning('请选择要提交的数据')
          return false
        }
        this._itemHandleClose()
        this.tableData = this.tableData.concat(this.multipleParamSelection)
      },
      getParamListData() { //获取设备参数
        let param = {
          ...this.formInfoParam
        }
        getParamList(param).then(res => {
          if (res.data.code === 200) {
            this.tableParamData = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      deleteFile(row) { //删除图片
        let index = this.fileList.indexOf(row)
        if (index > -1) {
          this.fileList.splice(index, 1)
        }
      },
      deleterecordFile(row) { //删除上传文件
        let index = this.recordfileList.indexOf(row)
        if (index > -1) {
          this.recordfileList.splice(index, 1)
        }
      },
      recordfileUpload(event) {
        let files = event.target.files
        let maxSize = 1024 * 1024 * 10
        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSize) {
            this.$message.error('上传文件不能大于10M')
            return false
          } else {
            formData.append('file', files[i])
          }
        }
        upload(formData).then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              this.recordfileList.push(element)
            })
            this.$refs.recordfile.value = ''
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      fileUpload(event) {
        let files = event.target.files
        let maxSize = 1024 * 1024 * 10
        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSize) {
            this.$message.error('上传文件不能大于10M')
            return false
          } else {
            formData.append('file', files[i])
          }
        }
        upload(formData).then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              this.fileList.push(element)
            })
            this.$refs.file.value = ''
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      upLoadRecordFile() {
        this.$refs.recordfile.click()
      },
      upLoadFile() {
        if (this.fileList.length >= 9) {
          this.$message.warning('最多上传9张图片')
          return false
        } else {
          this.$refs.file.click()
        }
      },
      getSupplierList() { //获取经销商下拉框
        getSupplier().then(res => {
          if (res.data.code === 200) {
            this.supplierList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getBrandInfoList() { //获取品牌下拉框
        getBrandInfo().then(res => {
          if (res.data.code === 200) {
            this.brandList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getManufacturerListPageList() { //厂商下拉框
        getManufacturerListPage().then(res => {
          if (res.data.code === 200) {
            this.manufacturerList = res.data.data.list
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleDeletePreteme(row) { //参数列表删除
        let index = this.tableData.indexOf(row)
        if (index > -1) {
          this.tableData.splice(index, 1)
        }
      },
      getBuildInitlist() { //获取标签描述
        getBuildInit().then(res => {
          if (res.data.code === 200) {
            this.tagdscList = res.data.data.repairDescriptionList //维修标签描述
            this.deptList = res.data.data.deptList //科室
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getAllPersonlistArr() { //获取全部责任人
        getAllPersonlist().then(res => {
          if (res.data.code === 200) {
            this.personList = res.data.data
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
      getParambuildInitList() { //获取设备分类下拉框
        getParambuildInit().then(res => {
          if (res.data.code === 200) {
            this.shebeiClass = res.data.data.equipmentTypeList
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleApproval(formName) { //确定
        let paramListnew = []
        let fileListnew = [] //图片
        let recordfileListnew = [] //备案文件
        if (this.tableData.length > 0) {
          this.tableData.forEach(item => {
            paramListnew.push({
              paramId: item.id,
              value: item.value
            })
          })
        }
        if (this.fileList.length > 0) {
          this.fileList.forEach(item => {
            fileListnew.push(item.url)
          })
        }
        if (this.recordfileList.length > 0) {
          this.recordfileList.forEach(item => {
            recordfileListnew.push(item.url)
          })
        }
        let param = {
          ...this.formInfo,
          equipmentPictureList: fileListnew, //图片
          archives: recordfileListnew, //设备档案文件
          paramList: paramListnew //参数列表
        }
        // console.log('1111111111111', formName)
        let validTrue = []
        formName.forEach(item => {
          this.$refs[item].validate((valid) => {
            if (valid) {
              validTrue.push(valid)
            }
          })
        })
        if (validTrue.length == 2) {
          addEquipmentData(param).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              this.$router.push({
                path: '/equipmentRecord'
              })
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          this.$message.warning('请检查数据填写格式')
        }
      },
      _backHandle() { //取消
        this.$router.push('/equipmentRecord')
      },
      lookParamter() { //弹框查询
        this.getParamListData()
      },
      handleChoseParamter() { //选择参数
        this.visible = true
      },
      handleChange(file, fileList) {

      },
      // uploadFile(params) {
      //   let fd = new FormData()
      //   fd.append('file', params.file)
      //   upload(fd)
      //     .then(res => {
      //       if (res.data.code === 200) {
      //         this.fileList = this.fileList.concat(res.data.data)
      //         this.$message.success(res.data.message)
      //       } else {
      //         this.$message.error(res.data.message)
      //       }
      //     })
      //     .catch(err => {
      //       console.log('error', err)
      //       alert('上传失败，请重新上传')
      //     })
      // },
      _itemHandleClose() {
        this.visible = false
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      handleSelectionChangeArr(val) {
        this.multipleSelection = val;
      },
      handleSelectionChange(val) {
        this.multipleParamSelection = val;
      }
    }
  }
</script>

<style lang="less" scoped>
  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #dcdfe6;
    padding-top: 10px;
    background: #fff;

    .el-dialog__title {
      font-size: 16px;
    }
  }

  ::v-deep .el-dialog__body {
    padding: 20px;
  }

  ::v-deep .el-dialog__footer {
    border-top: 1px solid #dcdfe6;
    padding-bottom: 10px;
  }

  ::v-deep .el-dialog__close.el-icon.el-icon-close {
    position: relative;
    top: -7px;

    &::before {
      content: '\e78d';
      font-size: 18px;
    }
  }

  .filDel {
    display: none;
    cursor: pointer;
  }

  .a-visited:hover {
    .filDel {
      display: inline-block;
    }

    .a-filDel {
      text-decoration: underline;
    }
  }

  .a-filDel {
    color: #217DFA;
  }

  .fileName {
    position: relative;

    .imgDiv {
      position: relative;
      float: left;
      margin: 0 18px 20px 0;
      border-radius: 5px;
    }

    img {
      display: block;
      width: 130px;
      height: 80px;
      border-radius: 5px;
    }

    .imgDelete {
      position: absolute;
      font-size: 24px;
      top: -10px;
      right: 4px;
      cursor: pointer;
    }

    .aDelete {
      position: absolute;
      font-size: 24px;
      top: -10px;
      cursor: pointer;
    }
  }

  .upDiv {
    .tip {
      margin-left: 10px;

      i {
        color: #FF4141;
        margin-right: 2px;
      }
    }

    .uploadBtn {
      color: #FF8E2F;
      border-color: #FF8E2F;
    }
  }

  .wrapper-form {
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .wrapper-top {
    height: 45px;
    padding: 10px 15px;
    line-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    float: right;
    width: 92px;
    line-height: 34px;
    height: 35px;
    opacity: 1;
    background: #ffffff;
    border: 2px solid #ff8c00;
    text-align: center;
    border-radius: 22px;
    cursor: pointer;
  }

  .apbtn {
    margin-left: 25px;
    background: #ff8c00;
    color: #ffffff;
  }



  .form-box {
    border: 1px solid #e5e5e5;

    .form-title {
      border-bottom: 1px solid #e5e5e5;
      line-height: 35px;
      padding-left: 30px;
      font-family: Source Han Sans CN Regular,
        Source Han Sans CN Regular-Regular;
      font-weight: bold;
      text-align: left;
      color: #333333;
    }

    .form-row {
      padding: 15px 30px;
    }
  }

  .table-box {
    border-bottom: 1px solid #e5e5e5;
    border-top: none;
  }

  .table-content {
    padding: 10px 20px;
    overflow: scroll;
  }
</style>