<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" ref="formInline" label-width="100px">
        <el-form-item label="时间范围：">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务状态：">
          <el-select placeholder="请选择" clearable v-model="formInline.orderStatus" style="width:100%;">
            <el-option v-for="(item,index) in taskStatus" :key="index" :value="item.code" :label="item.message"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container height="fill" scrollY="true">
      <OperationContainer id="nevboxs">
        <el-select v-model="excelBtns" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table v-show="tableData.length>0" height="0" isFillHeight :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" border :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row>
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <template v-for="(item,index) in  tableHeader">
          <el-table-column :label="item.tableName" :prop="item.name" :key="index"></el-table-column>
        </template>
      </el-table>
    </Container>
    <!-- <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" /> -->
  </ContainerGroup>
</template>
<script>
  // import pagination from './../../../components/pagination/index'
  import {
    getTaskAnalysis,
    exportTaskStatistic
  } from '../../../apis/departmentReport/index'
  import {
    mapInit
  } from './../../../apis/taskList/indexApi'
  export default {
    name: 'departmentReport',
    components: {
      // pagination
    },
    data() {
      return {
        excelBtnList: [{
            label: "全部导出",
            value: "1",
          },
          {
            label: "批量导出",
            value: "2",
          },
        ],
        tableHeader: [],
        tableData: [],
        formDate: null,
        excelBtns: '',
        loading: false,
        formInline: {},
        taskStatus: [],
        total: 0,
        pageSize: 20,
        currentPage: 1,
        multipleSelection: []
      }
    },
    created() {
      this.getTaskStatus()
      this.getData()
    },
    methods: {
      getTaskStatus() { //获取任务状态
        mapInit().then(res => {
          if (res.data.code === 200) {
            this.taskStatus = res.data.data.taskStatus
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      selectionHandle() {
        if (this.formDate) { //时间范围
          this.formInline.startDate = this.formDate[0]
          this.formInline.endDate = this.formDate[1]
        } else {
          this.formInline.startDate = ''
          this.formInline.endDate = ''
        }
        let params = {
          ...this.formInline
        }
        if (this.excelBtns === '1') {
          exportTaskStatistic(params).then((res) => {
            if (res.status === 201) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "科室报表.xlsx"
              downloadLink.click()
              window.URL.revokeObjectURL(downUrl)
              this.excelBtns = ""
            }
          })
        } else {
          if (this.multipleSelection === undefined || this.multipleSelection.length === 0) {
            this.$message.warning("请选择要导出的数据")
            this.excelBtns = ""
            return false
          } else {
            params.dataMapList = this.multipleSelection
            exportTaskStatistic(params).then((res) => {
              if (res.status === 201) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                })
                let downloadLink = document.createElement("a")
                const URL = window.URL || window.webkitURL || window.moxURL
                let downUrl = URL.createObjectURL(blob)
                downloadLink.href = downUrl
                downloadLink.download = "科室报表.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }

      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this.getData()
      },
      handleSelectionChange(val) { //勾选复选框改变
        this.multipleSelection = val;
      },
      handleSearch() { //查询
        this.currentPage = 1
        this.pageSize = 10
        this.getData()
      },
      handleReset() { //重置
        for (let key in this.formInline) {
          this.formInline[key] = ''
        }
        this.formDate = null
      },
      getData() {
        if (this.formDate) { //时间范围
          this.formInline.startDate = this.formDate[0]
          this.formInline.endDate = this.formDate[1]
        }

        let params = {
          ...this.formInline
        }
        this.loading = true
        // console.log('params', params)
        getTaskAnalysis(params).then(res => {
          if (res.data.code === 200) {
            this.tableHeader = res.data.data.checkAnalysisList
            this.tableData = res.data.data.dataList
            this.total = res.data.data.total
            this.currentPage = res.data.data.current
            this.pageSize = res.data.data.size
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      },
    }
  }
</script>
<style lang="less" scoped>
</style>