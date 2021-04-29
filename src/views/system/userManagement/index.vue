<template>
  
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true"
        ref="searchForm">
        <el-form-item label="工号："
          prop="number">
          <el-input v-model="number" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="姓名："
          prop="name">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="角色："
          prop="role">
          <el-select placeholder="请选择" multiple
            v-model="role">
            <el-option v-for="(item,index) in roleList" :key="index" :value="item.roleId"
              :label="item.roleName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别："
          prop="sex">
          <el-select placeholder="请选择"
            v-model="sex">
            <el-option value="0"
              label="男"></el-option>
            <el-option value="1"
              label="女"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室："
          prop="dept">
          <el-select placeholder="请选择"
            v-model="dept">
            <el-option v-for="(item,index) in deptList" :key="index" :value="item.dictId"
              :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle()">查询</el-button>
          <el-button @click="_reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-button icon="el-icon-plus"
          type="primary"
          @click="_addItemHandle">新增</el-button>
      </OperationContainer>
      <el-table :data="tableData" border
      :header-cell-style="{background:'#E8EAED'}"  stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="工号"
          prop="code"></el-table-column>
        <el-table-column label="姓名"
          prop="name"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex === 0 ? '男': '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室"
          prop="deptName"></el-table-column>
        <el-table-column label="联系方式"
          prop="phone"></el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.roleList" :key="index">
              {{item.roleName}}
            </span>
          </template>
          </el-table-column>
        <el-table-column label="就业时间"
          prop="time"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '开启': '关闭'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          prop="">
          <template slot-scope="scope">
            <el-tooltip class="item"
              effect="dark"
              content="编辑"
              placement="top">
              <el-button type="text"
                @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="删除"
              placement="top">
              <el-button type="text"
                @click="_delItemHandle(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
import pagination from './../../../components/pagination/index'
import {
  getListPage, getRole, getDept, delUser
} from './../../../apis/userManagement/indexApi'
export default {
  name: 'userManagement', //用户管理
  components: {
    pagination
  },
  data () {
    return {
      number: '',
      name: '',
      status: '',
      role: '',
      roleList: [],
      sex: '',
      dept: '',
      deptList: [],
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: []
    }
  },
  mounted () {
    this.getRoleList()
    this.getDeptList()
    this._getData()
  },
  methods: {
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
    _getData () {
      let parms = {
        code: this.number,
        name: this.name,
        roleId: this.role.toString(),
        sex: this.sex,
        deptId: this.dept,
        current: this.currentPage,
        size: this.pageSize,
        deleteFlag: 0
      }
      getListPage(parms).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      })
    },
    _addItemHandle () {
      this.$router.push({
        path: '/userManagement/add'
      })
    },
    _editItemHandle (row) {
      this.$router.push({
        path: '/userManagement/add',
        query: {
          id: row.userId
        }
      })
    },
    _delItemHandle (row) {
      let _this = this
      this.$confirm('是否确认删除该用户？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ id: row.userId }).then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this._getData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    _searchHandle () {
      this.currentPage = 1
      this._getData()
    },
    _reset () {
      this.number = ''
      this.name = ''
      this.role = ''
      this.sex = ''
      this.dept = ''
    },
    pagationChange (payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getData()
    }
  }
}
</script>
<style lang="less">

</style>
