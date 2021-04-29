<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="auto">
        <el-form-item label="报修单号：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="报修电话：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairPhone"></el-input>
        </el-form-item>
        <el-form-item label="报修人：">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairUserName"></el-input>
        </el-form-item>
        <el-form-item label="报修部门：">
          <el-select placeholder="请选择" v-model="searchForm.deptId" clearable>
            <el-option v-for="item in deptList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.commentStatus" clearable>
            <el-option :value="1" label="待评价"></el-option>
            <el-option :value="2" label="已评价"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修设备/设施：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.equipmentName"></el-input>
        </el-form-item>
        <el-form-item label="评分：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.mark"></el-input>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.warehouse" clearable>
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.sureTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="评价时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.markTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{word}}
            <i :class="showAll ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
          </el-button>
        </el-form-item>
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
        <el-table-column label="报修单号" width="130" prop="repairOrderNumber"></el-table-column>
        <el-table-column label="报修部门" prop="deptName"></el-table-column>
        <el-table-column label="报修人" prop="repairUserName"></el-table-column>
        <el-table-column label="报修电话" show-overflow-tooltip prop="repairPhone"></el-table-column>
        <el-table-column label="设备位置" prop="location"></el-table-column>
        <el-table-column label="报修设备/设施" width="120" show-overflow-tooltip prop="equipmentName"></el-table-column>
        <el-table-column label="报修描述" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="报修时间" show-overflow-tooltip prop="repairTime"></el-table-column>
        <el-table-column label="评分" prop="mark"></el-table-column>
        <el-table-column label="评价状态" prop="commentStatus">
          <template slot-scope="scope">
            <span>{{scope.row.commentStatus === 1 ? '待评价':'已评价'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价时间" show-overflow-tooltip prop="commentTime"></el-table-column>
        <el-table-column label="单据来源" prop="source">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
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
    pageListInit
  } from './../../../apis/repairManage/indexApi'
  import {
    getListPage,
    exportList
  } from './../../../apis/repairManage/serveEvaApi'

  export default {
    name: 'serveEva',
    components: {
      pagination
    },
    data() {
      return {
        searchForm: {
          repairOrderNumber: '',
          repairPhone: '',
          repairUserName: '',
          deptId: '',
          commentStatus: '',
          equipmentName: '',
          mark: '',
          source: '',
          markTime: '',
          sureTime: ''
        },
        deptList: [],
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
        tableData: [],
        multVal: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        drawerView: false,
        starValue: null,
        evaluate: '',
        showAll: true,
      }
    },
    computed: {
      word: function() {
        if (this.showAll == false) {
          return "展开";
        } else {
          return "收起";
        }
      }
    },
    mounted() {
      this.init()
      this._getData()
      this.$nextTick(function() {
        this.closeSearch()
      })
    },
    methods: {
      closeSearch() {
        this.showAll = !this.showAll
      },
      init() {
        pageListInit().then(res => {
          if (res.data.code === 200) {
            this.deptList = res.data.data.dept
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getData() {
        let parms = {
          "repairOrderNumber": this.searchForm.repairOrderNumber,
          "repairPhone": this.searchForm.repairPhone,
          "repairUserName": this.searchForm.repairUserName,
          "deptId": this.searchForm.deptId,
          "commentStatus": this.searchForm.commentStatus,
          "equipmentName": this.searchForm.equipmentName,
          "mark": this.searchForm.mark,
          "source": this.searchForm.source,
          "commentStartTime": this.searchForm.markTime ? this.searchForm.markTime[0] : '',
          "commentEndTime": this.searchForm.markTime ? this.searchForm.markTime[1] : '',
          "startTime": this.searchForm.sureTime ? this.searchForm.sureTime[0] : '',
          "endTime": this.searchForm.sureTime ? this.searchForm.sureTime[1] : '',
          "current": this.currentPage,
          "pageSize": this.pageSize
        }
        getListPage(parms).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleSelectionChange(val) {
        this.multVal = val
      },
      selectionHandle() {
        let params = {
          "repairOrderNumber": this.searchForm.repairOrderNumber,
          "repairPhone": this.searchForm.repairPhone,
          "repairUserName": this.searchForm.repairUserName,
          "deptId": this.searchForm.deptId,
          "commentStatus": this.searchForm.commentStatus,
          "equipmentName": this.searchForm.equipmentName,
          "mark": this.searchForm.mark,
          "source": this.searchForm.source,
          "commentStartTime": this.searchForm.markTime ? this.searchForm.markTime[0] : '',
          "commentEndTime": this.searchForm.markTime ? this.searchForm.markTime[1] : '',
          "startTime": this.searchForm.sureTime ? this.searchForm.sureTime[0] : '',
          "endTime": this.searchForm.sureTime ? this.searchForm.sureTime[1] : '',
        };
        if (this.excelBtns === '1') {
          exportList(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "服务评价.xlsx"
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
            let repairIds = []
            this.multVal.forEach(element => {
              repairIds.push(element.id)
            })
            exportList({
              repairIds: repairIds
            }).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                })
                let downloadLink = document.createElement("a")
                const URL = window.URL || window.webkitURL || window.moxURL
                let downUrl = URL.createObjectURL(blob)
                downloadLink.href = downUrl
                downloadLink.download = "服务评价.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }
      },
      _searchHandle() {
        this.currentPage = 1
        this._getData()
      },
      reset() {
        this.searchForm.repairOrderNumber = ''
        this.searchForm.repairPhone = ''
        this.searchForm.repairUserName = ''
        this.searchForm.deptId = ''
        this.searchForm.commentStatus = ''
        this.searchForm.equipmentName = ''
        this.searchForm.mark = ''
        this.searchForm.source = ''
        this.searchForm.markTime = ''
        this.searchForm.sureTime = ''
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: '/serveEvaluate/detail',
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
</style>