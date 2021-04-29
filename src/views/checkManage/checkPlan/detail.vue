<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_goback">返回</el-button>
    </Container>
    <Container class="form-box">
        <p class="form-title">
          基本信息
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo"
              ref="formInfo">
              <el-col :span="8">
                <div class="h40"><span>巡检任务名称：</span>123</div>
              </el-col>
              <el-col :span="8">
                <div class="h40"><span>开始时间：</span>123</div>
              </el-col>
              <el-col :span="8">
                <div class="h40"><span>结束时间：</span>123</div>
              </el-col>
              <el-col :span="24">
                <div class="h40"><span>巡检频率：</span>123</div>
              </el-col>
              <el-col :span="8">
                <div class="h40"><span>巡检类型：</span>123</div>
              </el-col>
              <el-col :span="8">
                <div class="h40"><span>设备类型：</span>123</div>
              </el-col>
              <el-col :span="8">
                <div class="h40"><span>设备分类：</span>123</div>
              </el-col>
              <el-col :span="24">
                <div class="h40"><span>设备名称：</span>123</div>
              </el-col>
              <el-col :span="24">
                <div class="h40"><span>备注：</span>123</div>
              </el-col>
            </el-form>
          </el-row>
        </div>
    </Container>
    <Container class="form-box">
        <p class="form-title">
          表单设置
        </p>
        <div class="form-row">
        </div>
    </Container>
    <Container class="form-box">
      <p class="form-title">
        人员设置
      </p>
      <div class="form-row">
      </div>
    </Container>
  </ContainerGroup>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      formInfo: {}
    }
  },
  methods: {
    _goback () {}
  }
}
</script>

<style lang="less" scoped>
.form-box {
  border: 1px solid #e5e5e5;
  .form-title {
    border-bottom: 1px solid #e5e5e5;
    line-height: 44px;
    font-family: Source Han Sans CN Regular,
      Source Han Sans CN Regular-Regular;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    color: #333333;
    background: #fcfcfc;
  }
  .bt {
    border-top: 1px solid #e5e5e5;
  }
  .form-row {
    padding: 15px 30px;
  }
  .form-row1 {
    padding: 15px 80px;
  }
  .h40 {
    height: 40px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
  .fl {
    float: left;
  }
}
</style>