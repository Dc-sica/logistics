<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleCancel">返回</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <ContainerGroup layout="row">
        <Container height="fill" scrollY="true">
          <el-form ref="formInfo1" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-form-item label="合同编号：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="合同名称：" prop="name">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="合同金额：">
              <span>{{formInfo.name}}</span>元
            </el-form-item>
            <el-form-item label="合同类别：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="合同经办人：" prop="supplierCode">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="甲方：" prop="name">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="乙方：" prop="name">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="起始日期：" prop="name">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="截止日期：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="预算金额：">
              <span>{{formInfo.name}}</span>元
            </el-form-item>
            <el-form-item label="中标总金额：">
              <span>{{formInfo.name}}</span>元
            </el-form-item>
            <el-form-item label="合同总金额：">
              <span>{{formInfo.name}}</span>元
            </el-form-item>
            <el-form-item label="采购类型：">
              <el-col :span="11">
                <span>{{formInfo.name}}</span>
              </el-col>
              <el-col :span="11" :offset="2">
                <span>{{formInfo.name}}</span>
              </el-col>
            </el-form-item>
            <el-form-item label="采购方式：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
          </el-form>
        </Container>
        <Container height="fill" scrollY="true" style="margin-left:10px;">
          <el-form ref="formInfo2" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-form-item label="甲方代表：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="甲方电话：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="供应商：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="乙方代表：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="乙方电话：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="开户行：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="开户账号：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="联系人：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="联系电话：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="审计和定金额：">
              <span>{{formInfo.name}}</span>元
            </el-form-item>
            <el-form-item label="质保金比例：">
              <span>{{formInfo.name}}</span>%
            </el-form-item>
            <el-form-item label="质保金：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="已付款金额：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="质保期：">
              <span>{{formInfo.name}}</span>年
            </el-form-item>
            <el-form-item label="付款方式：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
          </el-form>
        </Container>
        <Container height="fill" scrollY="true" style="margin-left:10px;">
          <el-form ref="formInfo3" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-form-item label="交货日期：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="交货地点：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
            <el-form-item label="退还日期：">
              <span>{{formInfo.name}}</span>
            </el-form-item>
          </el-form>
        </Container>
      </ContainerGroup>
    </Container>
  </ContainerGroup>
</template>
<script>
  export default {
    name: 'detail',
    data() {
      return {
        classArr: [],
        supplierList: [],
        formInline: {},
        formInfo: {}
      }
    },
    created() {

    },
    methods: {
      handleCancel() { //取消
        this.$router.push('/contractManage')
      },
    }
  }
</script>
<style lang="less" scoped>

</style>