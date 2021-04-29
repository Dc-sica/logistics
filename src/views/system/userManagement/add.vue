<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-button class="goback" @click="goback">取消</el-button>
      <el-button class="submit" type="primary" @click="submit('form')">提交</el-button>
    </Container>
    <Container height="fill" class="main">
      <el-form :inline="true"
      :rules="rules"
      :model="form"
      ref="form">
      <el-form-item label="真实姓名："
        prop="name"
        class="w32"
        label-width="140px">
        <el-input placeholder="请输入真实姓名" v-model="form.name" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="性别："
        label-width="140px"
        class="w32"
        prop="sex">
        <el-select placeholder="请选择"  style="width:220px;"
          v-model="form.sex">
          <el-option value="0"
            label="男"></el-option>
          <el-option value="1"
            label="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式："
        prop="phone"
        class="w32"
        label-width="140px">
        <el-input placeholder="请输入联系方式" v-model="form.phone" maxlength="11" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="工号："
        prop="code"
        class="w32"
        label-width="140px">
        <el-input placeholder="请输入工号" v-model="form.code" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="科室："
        label-width="140px"
        class="w32"
        prop="deptId">
        <el-select placeholder="请选择"
          style="width:220px;"
          v-model="form.deptId">
          <el-option v-for="(item,index) in deptList" :key="index" :value="item.dictId"
              :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色："
        v-if="!this.id"
        label-width="140px"
        class="w32"
        prop="role">
        <el-select placeholder="请选择"
          style="width:220px;"
          v-model="form.role">
          <el-option v-for="(item,index) in roleList" :key="index" :value="item.roleId"
              :label="item.roleName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就业时间："
        label-width="140px"
        class="w32"
        prop="time">
        <el-date-picker
          type="date"
          size="large"
          prefix-icon="el-icon-date"
          placeholder="请选择"
          v-model="form.time"
          format="yyyy-MM-dd"
          style="width:220px;"
          value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="账号状态："
        label-width="140px"
        prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="设置密码："
        v-if="!this.id"
        prop="password"
        label-width="140px"
        class="w100">
        <el-input placeholder="请输入密码" type="password" maxlength="16" v-model="form.password" autocomplete="new-password" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="再输入一次密码："
        v-if="!this.id"
        prop="passwordAgain"
        label-width="140px"
        class="w100">
        <el-input placeholder="请再输入一次密码" type="password" maxlength="16" v-model="form.passwordAgain" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="更改密码："
        v-if="this.id"
        label-width="140px"
        class="w100">
        <el-button @click="resetPass()">重置密码</el-button>
      </el-form-item>
    </el-form>
    </Container>
  </ContainerGroup>
</template>
<script>
import {
  getRole, getDept, addUser, updateUser, getOne, resetPassword
} from './../../../apis/userManagement/indexApi'
export default {
  name: 'addUser',
  data () {
   return {
     id: this.$route.query.id,
     isEdit: false,
     form: {},
     roleList: [],
     deptList: [],
     rules: {
      name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
      sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
      phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
      code: [{ required: true, message: '请输入工号', trigger: 'blur' }],
      deptId: [{ required: true, message: '请选择科室', trigger: 'change' }],
      role: [{ required: true, message: '请选择角色', trigger: 'change' }],
      time: [{ required: true, message: '请选择就业时间', trigger: 'change' }],
      status: [{ required: true, message: '请选择状态', trigger: 'change' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      passwordAgain: [{ required: true, message: '请再输入一次密码', trigger: 'blur' }],
     }
   }
  },
  created () {
    this.getRoleList()
    this.getDeptList()
    if (this.id) {
      this.getDetail()
      this.isEdit = true
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    getRoleList () {
      getRole().then(res => {
        if (res.data.code === 200) {
          this.roleList = res.data.data
        }
      })
    },
    getDeptList () {
      getDept({ categoryCode: 'dept', status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.deptList = res.data.data.sysDictList
        }
      })
    },
    getDetail () {
      getOne({ id: this.id }).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.data
          this.form.sex = this.form.sex.toString()
        }
      })
    },
    submit (formName) {
      if (this.isEdit) {
        this.editHandle(formName)
      } else {
        this.addHandle(formName)
      }
    },
    addHandle (formName) {
      let _this = this
      let parms = {
        name: this.form.name,
        sex: this.form.sex,
        phone: this.form.phone,
        code: this.form.code,
        deptId: this.form.deptId,
        roleIds: [this.form.role],
        time: this.form.time,
        status: this.form.status,
        password: this.form.password,
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.passwordAgain) {
            this.$message.warning('第二次输入密码不一致')
            return false
          }
          addUser(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success('新增成功')
              setTimeout(function(){
                _this.$router.go(-1)
              }, 500)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editHandle (formName) {
      let _this = this 
      let parms = {
        name: this.form.name,
        sex: this.form.sex,
        phone: this.form.phone,
        code: this.form.code,
        deptId: this.form.deptId,
        time: this.form.time,
        status: this.form.status
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success('编辑成功')
              setTimeout(function(){
                _this.$router.go(-1)
              }, 500)
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetPass () {
      resetPassword(this.form).then(res => {
        if (res.data.code === 200) {
          this.$message.success('重置成功')
        } else {
          this.$message.error(res.data.message)
        }
      })
    }
  }
}
</script>
<style lang='less'>
.main {
  .el-form-item__error {
    top: 125%;
  }
}
</style>
<style lang='less' scoped>
.main {
  height: calc(100% - 60px);
  background: #fff;
  padding: 30px;
  position: relative;
  .w32 {
    width: 32%;
    margin-bottom: 40px!important;
  }
  .w100 {
    width: 100%;
    margin-bottom: 40px;
  }
  .btn {
    position: absolute;
    bottom: 38px;
    left: 50%;
    transform: translateX(-50%);
    .goback {
      color: #FF8C00;
      border-radius: 20px;
      border-color: #FF8C00;
    }
    .submit {
      border-radius: 20px;
    }
  }
}
</style>