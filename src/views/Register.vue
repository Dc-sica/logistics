<template>
  <section id="sys-login">
    <div class="main-content p-clear">
      <div class="center-container">
        <div class="bg-img p-clear">
          <div class="right-content p-right">
            <div class="right-login-box">
              <div class="login-content">
                <div class="regist-form">
                  <el-form :inline="false"
                    :label-position="left"
                    :model="formInline"
                    ref="formInline"
                    :rules="rules"
                    class="demo-form-inline">
                    <el-form-item label="账号"
                      label-width="80px"
                      prop="accountName">
                      <el-input v-model="formInline.accountName"
                        placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码"
                      label-width="80px"
                      prop="phone">
                      <el-input v-model="formInline.phone"
                        placeholder="请输入手机号码"></el-input>
                    </el-form-item>

                    <el-form-item label="旧密码"
                      label-width="80px"
                      prop="passWord">
                      <el-input v-model="formInline.passWord"
                        placeholder="6-16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码"
                      label-width="80px"
                      prop="passWord">
                      <el-input v-model="formInline.passWord"
                        placeholder="6-16位密码，区分大小写"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码"
                      label-width="80px"
                      prop="passWord">
                      <el-input v-model="formInline.passWord"
                        placeholder="6-16位密码，区分大小写"></el-input>
                    </el-form-item>

                    <el-form-item class="register-btn">
                      <div style="display: flex;justify-content: space-around;">
                        <el-button class="reg-btn">取消</el-button>
                        <el-button class="reg-btn"
                          type="primary"
                          @click="submitForm('formInline')">保存</el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      userName: '',
      passWord: '',
      checked: false,
      loading: false,
      errorTips: {
        userName: '',
        passWord: '',
        userId: ''
      },
      formInline: {
        accountName: '',
        userName: '',
        passWord: '',
        deptName: '',
        confirmPwd: '',
        phone: '',
        remark: ''

      },
      rules: {
        user: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/css/register.less";
</style>
