<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" label-width="auto">
        <el-row>
          <el-form-item label="意见内容：" prop="suggestion">
            <el-input placeholder="请输入" clearable v-model="suggestion"></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="name">
            <el-input placeholder="请输入" v-model="name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select placeholder="请选择" v-model="sex" clearable>
              <el-option value="0" label="男"></el-option>
              <el-option value="1" label="女"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科室：" prop="dept">
            <el-select placeholder="请选择" v-model="dept" clearable>
              <el-option v-for="(item,index) in deptList" :key="index" :value="item.dictId" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态：" prop="status">
            <el-select placeholder="请选择" v-model="status" clearable>
              <el-option value="0" label="未处理"></el-option>
              <el-option value="1" label="已处理"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="反馈时间：">
            <el-date-picker type="datetime" size="large" prefix-icon="el-icon-date" placeholder="请选择" v-model="yjTimeStart" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"></el-date-picker>&nbsp;-&nbsp;
            <el-date-picker type="datetime" size="large" prefix-icon="el-icon-date" placeholder="请选择" v-model="yjTimeEnd" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00"></el-date-picker>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" @click="searchHandle">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table :data="tableData" border :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="意见内容" show-overflow-tooltip prop="opinionContent"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex === 0 ? '男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="科室" show-overflow-tooltip prop="deptName"></el-table-column>
        <el-table-column label="反馈时间" show-overflow-tooltip prop="feedBackTime"></el-table-column>
        <el-table-column label="处理时间" show-overflow-tooltip prop="handleTime"></el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="scope">
            <span>{{scope.row.handleStatus === 0 ? '未处理':'已处理'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" min-width="120">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="去处理" v-if="scope.row.handleStatus === 0" placement="top">
              <el-button type="text" @click="_toDealHandle(scope.row)">
                <i class="el-icon-chat-dot-square"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from './../../../components/pagination/index'
  import {
    getListPage,
    getDeptList,
    exportAll
  } from './../../../apis/customerFeedback/indexApi'
  export default {
    name: 'customerFeedback', //用户反馈
    components: {
      pagination
    },
    data() {
      return {
        suggestion: '',
        name: '',
        yjTimeStart: '',
        yjTimeEnd: '',
        status: '',
        dept: '',
        sex: '',
        total: 0,
        pageSize: 20,
        currentPage: 1,
        deptList: [],
        tableData: [],
        excelBtns: '',
        excelBtnList: [{
            label: "全部导出",
            value: "1",
          },
          {
            label: "批量导出",
            value: "2",
          },
        ],
        multVal: []
      }
    },
    created() {
      this._getDeptList()
      this._getData()
    },
    methods: {
      _getData() {
        let parms = {
          "opinionContent": this.suggestion,
          "startTime": this.yjTimeStart === null ? '' : this.yjTimeStart,
          "endTime": this.yjTimeEnd === null ? '' : this.yjTimeEnd,
          "handleStatus": this.status,
          "deptId": this.dept,
          "userName": this.name,
          "sex": this.sex,
          "current": this.currentPage,
          "pageSize": this.pageSize
        }
        getListPage(parms).then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          }
        })
      },
      _getDeptList() {
        getDeptList().then(res => {
          if (res.data.code === 200) {
            this.deptList = res.data.data
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.suggestion = ''
        this.yjTimeStart = ''
        this.yjTimeEnd = ''
        this.status = ''
        this.dept = ''
        this.name = ''
        this.sex = ''
      },
      selectionHandle() {
        let params = {
          "opinionContent": this.suggestion,
          "startTime": this.yjTimeStart === null ? '' : this.yjTimeStart,
          "endTime": this.yjTimeEnd === null ? '' : this.yjTimeEnd,
          "handleStatus": this.status,
          "deptId": this.dept,
          "userName": this.name,
          "sex": this.sex,
        };
        if (this.excelBtns === '1') {
          exportAll(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "意见反馈.xlsx"
              downloadLink.click()
              window.URL.revokeObjectURL(downUrl)
              this.excelBtns = ""
            }
          })
        } else {
          if (this.multVal === undefined || this.multVal.length === 0) {
            this.$message.warning("请选择要导出的数据")
            this.excelBtns = ""
            return false
          } else {
            let opinionIds = []
            this.multVal.forEach(element => {
              opinionIds.push(element.id)
            })
            exportAll({
              opinionIds: opinionIds
            }).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                })
                let downloadLink = document.createElement("a")
                const URL = window.URL || window.webkitURL || window.moxURL
                let downUrl = URL.createObjectURL(blob)
                downloadLink.href = downUrl
                downloadLink.download = "意见反馈.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }
      },
      handleSelectionChange(val) {
        this.multVal = val
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: '/customerFeedback/detail',
          query: {
            id: row.id
          }
        })
      },
      _toDealHandle(row) {
        this.$router.push({
          path: '/customerFeedback/reply',
          query: {
            id: row.id
          }
        })
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      }
    }
  }
</script>
<style lang="less" scoped>
  // .wrapper {
  //   .wrapper-form {
  //     background: #fff;
  //     padding: 10px 15px;
  //     margin-bottom: 15px;
  //   }

  //   .mr1 {
  //     margin-right: 1%;
  //   }

  //   .warpper-table {
  //     background: #fff;
  //     box-sizing: border-box;
  //     padding: 15px;

  //     .table-btn {
  //       margin-bottom: 10px;
  //     }
  //   }
  // }
</style>