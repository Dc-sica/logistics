<template>
  <ContainerGroup>
    <Container>
       <div class="title">暖气片巡检列表 <span>33.33%</span></div>
       <el-form :inline="true" ref="searchForm" style="float:right;">
        <el-form-item label="">
          <el-input
            placeholder="请输入"
            v-model="searchForm.projectName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-form-item prop="startTime">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="searchForm.startTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="endTime">
              <el-date-picker
                placeholder="结束日期"
                v-model="searchForm.endTime"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
       </el-form>
    </Container>
    <Container>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待巡检" name="second"></el-tab-pane>
        <el-tab-pane label="巡检中" name="third"></el-tab-pane>
        <el-tab-pane label="已完成" name="fourth"></el-tab-pane>
        <el-tab-pane label="未完成" name="five"></el-tab-pane>
      </el-tabs>
      <el-table
        :data="tableData" border 
        v-loading="loading"
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column label="巡检编号" prop=""></el-table-column>
        <el-table-column label="任务名称" prop=""></el-table-column>
        <el-table-column label="巡检类型" prop=""></el-table-column>
        <el-table-column label="设备类型" prop=""></el-table-column>
        <el-table-column label="分类名称" prop=""></el-table-column>
        <el-table-column label="设备名称" prop=""></el-table-column>
        <el-table-column label="巡检频率" prop=""></el-table-column>
        <el-table-column label="完成时间" prop=""></el-table-column>
        <el-table-column label="是否异常" prop=""></el-table-column>
        <el-table-column label="工作人员" prop=""></el-table-column>
        <el-table-column label="巡检状态" prop=""></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="查看"
                placement="top"
              >
                <el-button
                  type="text"
                  class="iconfont"
                  v-html="'&#xe67e;'"
                  @click="_toDetailHandle(scope.row)"
                >
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
      </el-table>
    </Container>
  </ContainerGroup>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      searchForm: {},
      activeName: 'first',
      loading: false,
      tableData: []
    }
  },
  methods: {
    _searchHandle () {},
    reset () {},
    handleClick () {}
  }
}
</script>

<style lang="less" scoped>
.title {
  float: left;
  line-height: 40px;
  font-size: 18px;
  font-weight: 500;
  color: #555;
  span {
    color: #FD4C4C;
  }
}
</style>