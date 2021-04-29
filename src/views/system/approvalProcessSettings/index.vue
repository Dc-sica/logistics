<template>
  <div class="main">
    <div class="box">
      <div class="title">库存管理</div>
      <div class="th p-clear" v-for="(item,index) in kcList" :key="index">
        <div class="t-left">{{item.name}}</div>
        <div class="t-right">
          <span class="li" v-if="item.username !== null" @click="getDetail('库存管理 - '+ item.name, item)">{{item.username}}</span>
          <span class="li add" v-else @click="_addHandle('库存管理 - '+ item.name, item)">+</span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="title">采购业务</div>
      <div class="th p-clear" v-for="(item,index) in cgList" :key="index">
        <div class="t-left">{{item.name}}</div>
        <div class="t-right">
          <span class="li"  v-if="item.username !== null" @click="getDetail('采购业务 - '+ item.name, item)">{{item.username}}</span>
          <span class="li add" v-else @click="_addHandle('采购业务 - '+ item.name, item)">+</span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="title">维修业务</div>
      <div class="th p-clear" v-for="(item,index) in repairList" :key="index">
        <div class="t-left">{{item.name}}</div>
        <div class="t-right">
          <span class="li"  v-if="item.username !== null" @click="getDetail('维修业务 - '+ item.name, item)">{{item.username}}</span>
          <span class="li add" v-else @click="_addHandle('维修业务 - '+ item.name, item)">+</span>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="title">陪检运送</div>
      <div class="th p-clear" v-for="(item,index) in projectList" :key="index">
        <div class="t-left">{{item.name}}</div>
        <div class="t-right">
          <span class="li"  v-if="item.username !== null" @click="getDetail('陪检运送 - '+ item.name, item)">{{item.username}}</span>
          <span class="li add" v-else @click="_addHandle('陪检运送 - '+ item.name, item)">+</span>
        </div>
      </div>
    </div>
    <!-- 新增 -->
    <Dialog
      :title='title'
      :visible="itemVisible"
      @cancel="_itemHandleClose"
      @save="_itemSaveHandle"
      :footerBtns="[
        {
          text: '保存',
          type: 'primary',
          trigger: 'save',
        },

        {
          text: '取消',
          type: 'primary',
          trigger: 'cancel',
        }
      ]"
    >
        <el-form :inline='false'
          :model="itemForm">
          <el-form-item label="名称："
            prop="name"
            label-width="70px">
            <el-input placeholder="请输入名称" clearable
              v-model="itemForm.name" @input="_getUserListPage"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" border
        show-summary
        style="width:500px"
        :header-cell-style="{background:'#E8EAED'}"
        stripe size="mini" highlight-current-row isFillHeight>
          <el-table-column label="选择"  align="center">
            <template slot-scope="scope">
              <el-radio :label="scope.row.name" v-model="radioVal"  @change="getTemplateRadio(scope.row)">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="名称"
          prop="name"></el-table-column>
          <el-table-column label="角色"
          prop="roleName"></el-table-column>
          <el-table-column label="科室"
          prop="deptName"></el-table-column>
        </el-table>
        <div v-show="total > 10">
          <pagination :total="total"
            :page="currentPage"
            :pageSize="pageSize"
            @pagation="pagationChange" />
        </div>
    </Dialog>
  </div>
</template>
<script>
import pagination from './../../../components/pagination/index'
import {
  getListPage, getUserListPage, addApprove, updateApprove
} from './../../../apis/approvalProcessSettings/indexApi'
export default {
  name: 'approvalProcessSettings', //审批流程设置
  components: {
    pagination
  },
  data () {
    return {
      itemVisible: false,
      title: '',
      itemForm: {},
      tableData: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      kcList: [],
      cgList: [],
      repairList: [],
      projectList: [],
      obj: {},
      radioVal: '',
      userId: '',
      userName: ''
    }
  },
  created () {
    this._getListPage()
  },
  methods: {
    _getListPage () {
      getListPage().then(res => {
        if (res.data.code === 200) {
          let kcList = [], cgList = [], repairList = [],projectList = []
          res.data.data.forEach(element => {
            if (element.typeName === '库存管理') {
              kcList.push(element)
            } else if (element.typeName === '采购业务') {
              cgList.push(element)
            } else if (element.typeName === '维修业务') {
              repairList.push(element)
            } else if (element.typeName === '陪检运送') {
              projectList.push(element)
            }
          })
          this.kcList = kcList
          this.cgList = cgList
          this.repairList = repairList
          this.projectList = projectList
        }
      })
    },
    _getUserListPage () {
      getUserListPage({
        name: this.itemForm.name
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _addHandle (title, row) {
      this.title = title
      this.itemVisible = true
      this.obj = row
      this.itemForm.name = ''
      this.radioVal = ''
      this._getUserListPage()
    },
    getDetail (title, row) {
      this.title = title
      this.itemVisible = true
      this.userId = row.userId
      this.userName = row.username
      this.radioVal = row.username
      this.obj = row
      this.itemForm.name = ''
      this._getUserListPage()
    },
    _itemHandleClose () {
      this.itemVisible = false
    },
    _itemSaveHandle () {
      this._edit()
    },
    _edit () {
      let parms = {
        "approveId": this.obj.approveId,
        "approveKey": this.obj.approveKey,
        "name": this.obj.name,
        "type": this.obj.type,
        "typeName": this.obj.typeName,
        "userId": this.userId,
        "username": this.userName
      }
      updateApprove(parms).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功')
          this.itemVisible = false
          this._getListPage()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getTemplateRadio (row) {
      this.radioVal = row.name
      this.userId = row.userId
      this.userName = row.name
    },
    pagationChange (payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getUserListPage()
    }
  }
}
</script>
<style lang="less">
.dialog-wrapper {
  .el-radio__label {
    display: none;
  }
}
</style>
<style lang="less" scoped>
.main {
  background: #fff;
  padding: 25px;
  .box {
    border: 1px solid #eee;
    margin-bottom: 60px;
    .title {
      text-align: center;
      line-height: 55px;
      font-weight: bold;
      font-size: 18px;
    }
    .th {
      .t-left {
        float: left;
        width: 20%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        border: 1px solid #eee;
        border-left: none;
        border-bottom: none;
        box-sizing: border-box;
      }
      .t-right {
        float: left;
        width: 80%;
        height: 55px;
        padding: 12px 0 0 38px;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        .li {
          display: block;
          float: left;
          padding: 5px 27px;
          min-width: 103px;
          height: 30px;
          border: 1px solid #2265FA;
          border-radius: 5px;
          box-sizing: border-box;
          text-align: center;
          margin-right: 35px;
          position: relative;
          .close {
            display: block;
            width: 14px;
            height: 14px;
            line-height: 14px;
            text-align: center;
            color: #fff;
            background: #FF8C00;
            border-radius: 50%;
            position: absolute;
            right: -5px;
            top: -7px;
            cursor: pointer;
          }
        }
        .li.add {
          width: 103px;
          height: 30px;
          color: #FF8C00;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
.dialog-wrapper {
  .el-radio__label {
    display: none;
  }
}
</style>