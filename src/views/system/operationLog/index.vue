<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="查看时间：">
          <el-date-picker range-separator="至" type="datetimerange" value-format="yyyy-MM-dd  HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" v-model="operationTime"></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <el-table :data="tableData" border
      :header-cell-style="{background:'#E8EAED'}"  stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="操作人" prop="operateUserName"></el-table-column>
        <el-table-column label="操作模块" prop="operateModule"></el-table-column>
        <el-table-column label="操作内容" prop="operateContent"></el-table-column>
        <el-table-column label="操作时间" prop="updateTime"></el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from './../../../components/pagination/index'
  import {
    selectOperateLogPage
  } from './../../../apis/operationLog/indexApi'
  export default {
    name: 'operationLog', // 操作日志
    components: {
      pagination
    },
    data() {
      return {
        operationTime: [],
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
        endtime: '',
        startTime: ''
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        if (this.operationTime == null) {
          this.endtime = ''
          this.startTime = ''
        } else {
          this.endtime = this.operationTime[1]
          this.startTime = this.operationTime[0]
        }
        selectOperateLogPage({
          endTime: this.endtime,
          startTime: this.startTime,
          current: this.currentPage,
          size: this.pageSize
        }).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            // 为空排除
            // this.tableData.map((item) => {
            //   if (item.brandName == null) {
            //     item.brandName = ''
            //   }
            //   if (item.supplierName == null) {
            //     item.supplierName = ''
            //   }
            // })
          }
        })
      },
      searchHandle() {
        this.currentPage = 1
        this.getData()
      },
      reset() {
        this.operationTime = []
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this.getData()
      }
    }
  }
</script>
<style lang="less" scoped>
  // .el-tag+.el-tag {
  //   margin-left: 10px;
  // }

  // .button-new-tag {
  //   margin-left: 10px;
  //   height: 32px;
  //   line-height: 30px;
  //   padding-top: 0;
  //   padding-bottom: 0;
  // }

</style>