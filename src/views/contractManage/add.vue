<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit('formInfo1')">提交</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <ContainerGroup layout="row">
        <Container height="fill" scrollY="true">
          <el-form ref="formInfo1" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-form-item label="合同编号：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="合同名称：" prop="name">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="合同金额：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="合同类别：">
              <el-select placeholder="请选择" style="width:100%;" clearable v-model="formInfo.supplierCode">
                <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同经办人：" prop="supplierCode">
              <el-col :span="20">
                <el-select placeholder="请选择" style="width:100%;" :disabled="true" multiple collapse-tags clearable v-model="formInfo.supplierCode">
                  <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4" style="text-align:right;">
                <el-button icon="el-icon-plus" type="primary" @click="handleChoosePerson">选择成员</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="甲方：" prop="name">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="乙方：" prop="name">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="起始日期：" prop="name">
              <el-date-picker style="width:100%;" v-model="formInfo.value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期：">
              <el-date-picker style="width:100%;" v-model="formInfo.value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预算金额：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="中标总金额：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="合同总金额：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="采购类型：">
              <el-col :span="11">
                <el-select placeholder="请选择" style="width:100%;" multiple collapse-tags clearable v-model="formInfo.supplierCode">
                  <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-select placeholder="请选择" style="width:100%;" multiple collapse-tags clearable v-model="formInfo.supplierCode">
                  <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="采购方式：">
              <el-select placeholder="请选择" style="width:100%;" multiple collapse-tags clearable v-model="formInfo.supplierCode">
                <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </Container>
        <Container height="fill" scrollY="true" style="margin-left:10px;">
          <el-form ref="formInfo2" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-form-item label="甲方代表：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="甲方电话：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="供应商：">
              <el-select placeholder="请选择" style="width:100%;" clearable v-model="formInfo.supplierCode">
                <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="乙方代表：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="乙方电话：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="开户行：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="开户账号：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="审计和定金额：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="质保金比例：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">%</span>
              </el-input>
            </el-form-item>
            <el-form-item label="质保金：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="已付款金额：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="质保期：">
              <el-input v-model="formInfo.name" clearable placeholder="请输入">
                <span slot="append">年</span>
              </el-input>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-select placeholder="请选择" style="width:100%;" clearable v-model="formInfo.supplierCode">
                <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </Container>
        <Container height="fill" scrollY="true" style="margin-left:10px;">
          <el-form ref="formInfo3" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-form-item label="交货日期：">
              <el-date-picker style="width:100%;" v-model="formInfo.value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="交货地点：">
              <el-select placeholder="请选择" style="width:100%;" multiple collapse-tags clearable v-model="formInfo.supplierCode">
                <el-option v-for="(item,index) in supplierList" :key="index" :value="item.code" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="退还日期：">
              <el-date-picker style="width:100%;" v-model="formInfo.value1" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </Container>
      </ContainerGroup>
      <Dialog title="合同管理" :visible="addVisible" @cancel="_itemHandleClose" @save="handleDlgSave" :footerBtns="[{text: '确定',type: 'primary',trigger: 'save',},
        {
          text: '取消',
          trigger: 'cancel',
        }]">
        <el-form style="margin-bottom:15px;" :inline="true" :model="formInline" ref="formInline" label-width="90px">
          <el-form-item label="名称：">
            <el-input placeholder="请输入" v-model="formInline.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类：">
            <el-select placeholder="请选择" clearable v-model="formInline.name">
              <el-option v-for="(item,index) in classArr" :key="index" :value="item.supplierId" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </Dialog>
    </Container>
  </ContainerGroup>
</template>
<script>
  export default {
    name: 'add',
    data() {
      // 验证最小、最大原值为数字
      let checkNumber = (rule, value, callback) => {
        console.log(typeof value)
        if (!isNaN(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }
      return {
        classArr:[],
        supplierList:[],
        formInline:{},  
        addVisible: false,
        formInfo: {},
        rules: {
          name: [{
            required: true,
            message: '请填写',
            trigger: 'change'
          }],
        }
      }
    },
    created() {

    },
    methods: {
      handleReset(){

      },
      handleSearch(){

      },
      handleDlgSave() {

      },
      _itemHandleClose() {
        this.addVisible = false

      },
      handleSubmit(formName) { //提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(1)
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleChoosePerson() { //选择成员
        this.addVisible = true
      },
      handleCancel() { //取消

      },
    }
  }
</script>
<style lang="less" scoped>

</style>