<template>
  <section id="sys-login">
    <div class="main-content p-clear">
      <div class="center-container">
        <div class="bg-img">
          <div class="left-bg"></div>
          <div class="right-bg">
            <div class="right-content p-right">
              <div class="right-login-box">
                <p style="text-align: center;font-size: 30px;color: #159FB8;">
                  医院后勤管理系统
                </p>
                <div class="login-content">
                  <el-form :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    class="demo-ruleForm">
                    <el-form-item label=""
                      prop="userName">
                      <i class="el-icon-user login-icon"></i>
                      <el-input v-model="ruleForm.userName"
                        class="login-input"
                        autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label=""
                      prop="password">
                      <i class="el-icon-lock login-icon"></i>
                      <el-input type="password"
                        v-model="ruleForm.password"
                        class="login-input"
                        autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <div
                        style="padding:10px 10px; margin-top:-20px;display:flex;justify-content: space-between;">
                        <p style="line-height:40px">
                          <el-checkbox v-model="checked">记住密码</el-checkbox>
                        </p>
                        <p>
                          <!-- <el-button type="text">忘记密码</el-button> -->
                        </p>
                      </div>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="login-btn p-cursor"
                        @click="login"
                        :loading="loading">{{loading?'正在登录...':'登录'}}</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- <div class="p-align-center login-footer">欢迎使用{{this.$baseInfo.BASE_TITLE}}</div> -->
    </div>
  </section>
</template>
<script>

import { setNewToken, setNewIdenity } from '../utils/publicFun'
import baseInfo from './../config/config'
import menuItems from './../utils/menuItems'
import { sysLogin, getInfo, getListByUserId } from './../apis/loginApi'
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      userName: '',
      passWord: '',
      checked: false,
      loading: false,
      errorTips: {
        userName: '',
        passWord: '',
        userId: ''
      },
      downUrl: baseInfo.DOWN_URL
    }
  },
  mounted () {
    if (localStorage.userName) {
      this.checked = true
      this.ruleForm.password = localStorage.password
      this.ruleForm.userName = localStorage.userName
      this.login()
    }
  },
  methods: {
    login () {
      const _that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          localStorage.menuTree = JSON.stringify(menuItems)
          sysLogin({
            username: this.ruleForm.userName,
            password: this.ruleForm.password
          }).then(res => {
            if (res.data.code === 200) {
              this.loading = false
              setNewToken(res.data.data.tokenHead + ' ' + res.data.data.token, 36000000)
              getInfo().then(res => {
                if (res.data.code === 200) {
                  // localStorage.menuTree = JSON.stringify(res.data.data.menus)
                  if (_that.checked) {
                    localStorage.userName = this.ruleForm.userName
                    localStorage.password = this.ruleForm.password
                  } else {
                    localStorage.removeItem('userName')
                    localStorage.removeItem('password')
                  }
                  localStorage.userInfo = JSON.stringify(res.data.data.userInfo)
                  localStorage.removeItem('subPath')
                  this.$router.push('/home')
                } else {
                  this.$message.error(res.data.message)
                }
              })
            } else {
              this.loading = false
              this.$message.error(res.data.message)
              // for (let i in this.errorTips) {
              //   this.errorTips[i] = ''
              // }
              // this.errorTips.passWord = '用户名或密码错误'
            }
          }).catch(error => {
            this.loading = false
            console.log(error)
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>
<style lang="less">
#sys-login {
  .login-content {
    /* .el-input__inner {
      border: none;
      border-bottom: 1px solid #8f97c0;
      border-radius: 0;
    } */
  }
  .download-url {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    a {
      color: #009eb9;
    }
  }

  .right-content {
    .el-form-item__error {
      left: 40px !important;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #159fb8;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #159fb8;
      border-color: #159fb8;
    }
  }
}
</style>
<style lang="less" scoped>
@import "~@/assets/css/login.less";
</style>
