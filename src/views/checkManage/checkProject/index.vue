<template>
  <ContainerGroup>
    <Container class="con">
      <div>
        <el-tabs class="eltabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="日" name="day"></el-tab-pane>
          <el-tab-pane label="周" name="week"></el-tab-pane>
          <el-tab-pane label="月" name="month"></el-tab-pane>
          <el-tab-pane label="季" name="quarter"></el-tab-pane>
          <el-tab-pane label="年" name="year"></el-tab-pane>
        </el-tabs>
        <!-- 选择日 -->
        <div v-show="activeName === 'day'" class="selDiv">
          <el-date-picker
            type="date"
            align="right"
            placeholder="选择日期"
            v-model="searchForm.dayTime"
          ></el-date-picker>
        </div>
        <!-- 选择周 -->
        <div v-show="activeName === 'week'" class="selDiv">
          <el-date-picker style="float:left"
            type="date"
            align="right"
            placeholder="选择日期"
            v-model="searchForm.weekstartTime"
          ></el-date-picker>
          <el-date-picker style="margin-left:10px;float:left"
            type="date"
            align="right"
            placeholder="选择日期"
            v-model="searchForm.weekendTime"
          ></el-date-picker>
        </div>
        <!-- 选择月 -->
        <div v-show="activeName === 'month'" class="selDiv">
          <el-date-picker
            type="month"
            align="right"
            placeholder="选择月份"
            v-model="searchForm.monthTime"
          ></el-date-picker>
        </div>
        <!-- 选择季度 -->
        <div v-show="activeName === 'quarter'" class="selDiv">
          <el-date-picker style="float:left"
            type="month"
            align="right"
            placeholder="选择月份"
            v-model="searchForm.quarterStartTime"
          ></el-date-picker>
          <el-date-picker style="margin-left:10px;float:left"
            type="month"
            align="right"
            placeholder="选择月份"
            v-model="searchForm.quarterEndTime"
          ></el-date-picker>
        </div>
        <!-- 选择年 -->
        <div v-show="activeName === 'year'" class="selDiv">
          <el-date-picker
            type="year"
            align="right"
            placeholder="选择年份"
            v-model="searchForm.yearTime"
          ></el-date-picker>
        </div>
      </div>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="任务名称：">
          <el-input
            placeholder="请输入"
            v-model="searchForm.projectName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="巡检类型：">
          <el-select
            placeholder="请选择"
            v-model="searchForm.checkType"
            clearable
          >
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型：">
          <el-select
            placeholder="请选择"
            v-model="searchForm.deviceType"
            clearable
          >
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-select placeholder="请选择" v-model="searchForm.checkType" clearable>
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：" v-if="showAll">
          <el-input
            placeholder="请输入"
            v-model="searchForm.deviceName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工作人员：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.checkType" clearable>
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.checkType" clearable>
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{ word }}
            <i
              :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"
            ></i>
          </el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container height="fill" scrollY="true" style="box-shadow:none">
        <div class="change"></div>
        <div class="card-div">
          <div class="ul p-clear">
            <div class="li" v-for="(item,index) in tableData" :key="index" @click="toList()">
              <div class="li-head">
                <span class="icon"></span>
                <span class="title">电梯巡检</span>
                <span class="progress">33.33%</span>
              </div>
              <div class="li-info">
                <div class="check-type">
                  <span class="sp">巡检类型：</span>
                  <span>设备类型</span>
                </div>
                <div class="device-type">
                  <span class="sp">设备类型：</span>
                  <span>其他设备</span>
                </div>
                <div class="cate-name">
                  <span class="sp">分类名称：</span>
                  <span>电梯</span>
                </div>
                <div class="worker">
                  <span class="sp">工作人员：</span>
                  <span class="sp2">张杰</span>
                </div>
                <div class="com-name">
                  <span class="sp">公司名称：</span>
                  <span>东吴物业商业管理有限公司</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <OperationContainer id="nevboxs">
          <el-select
            v-model="excelBtns"
            size="large"
            @change="selectionHandle()"
            placeholder="导出数据"
          >
            <el-option
              v-for="item in excelBtnList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </OperationContainer>
        <el-table
          :data="tableData" border 
          @selection-change="handleSelectionChange"
          v-loading="loading"
          :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
          stripe
          size="mini"
          highlight-current-row
          isFillHeight
          height="0"
        >
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column label="巡检编号" prop=""></el-table-column>
          <el-table-column label="任务名称" prop=""></el-table-column>
          <el-table-column label="巡检类型" prop=""></el-table-column>
          <el-table-column label="设备类型" prop=""></el-table-column>
          <el-table-column label="分类名称" prop=""></el-table-column>
          <el-table-column label="设备名称" prop=""></el-table-column>
          <el-table-column label="开始时间" prop=""></el-table-column>
          <el-table-column label="结束时间" prop=""></el-table-column>
          <el-table-column label="巡检频率" prop=""></el-table-column>
          <el-table-column label="公司名称" prop=""></el-table-column>
          <el-table-column label="任务状态" prop="">
            <template slot-scope="scope">
              {{scope.row.status === 1 ? '启用' : '停用'}}
            </template>
          </el-table-column>
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
        </el-table> -->
    </Container>
    <Container style="margin-top:0;box-shadow:none">
      <pagination
        :total="total"
        :page="currentPage"
        :pageSize="pageSize"
        @pagation="pagationChange"
      />
    </Container>
  </ContainerGroup>
</template>

<script>
import pagination from '../../../components/pagination/index'

export default {
  name: "checkProject",
  components: {
    pagination,
  },
  data (){
    return {
      activeName: 'first',
      searchForm: {
        orderId: '',
        projectName: '',
        checkType: '',
        deviceName: '',
        startTime: '',
        endTime: ''
      },
      checkTypeList: [{
        id: '1',
        name: '123'
      }],
      showAll: true,
      tableData: [{
        title: '123',
        progress: '33.33%',
        checkType: 'sss',
        deviceType: 'aaa',
        cateName: 'sss',
        comName: 'aaaa',
        worker: '123',
        status: 1
      },{
        title: '123',
        progress: '33.33%',
        checkType: 'sss',
        deviceType: 'aaa',
        cateName: 'sss',
        comName: 'aaaa',
        worker: '123',
        status: 1
      },{
        title: '123',
        progress: '33.33%',
        checkType: 'sss',
        deviceType: 'aaa',
        cateName: 'sss',
        comName: 'aaaa',
        worker: '123',
        status: 1
      },{
        title: '123',
        progress: '33.33%',
        checkType: 'sss',
        deviceType: 'aaa',
        cateName: 'sss',
        comName: 'aaaa',
        worker: '123',
        status: 1
      },{
        title: '123',
        progress: '33.33%',
        checkType: 'sss',
        deviceType: 'aaa',
        cateName: 'sss',
        comName: 'aaaa',
        worker: '123',
        status: 1
      }],
      excelBtns: "",
      excelBtnList: [
        {
          label: "全部导出",
          value: "1",
        },
        {
          label: "批量导出",
          value: "2",
        },
      ],
      multVal: [],
      loading: false,
      currentPage: 1,
      total: 0,
      pageSize: 20,
    }
  },
  computed: {
    word: function () {
      if (this.showAll == false) {
        return "展开"
      } else {
        return "收起"
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.closeSearch()
    });
  },
  methods: {
    closeSearch () {
      this.showAll = !this.showAll
    },
    _getData () {},
    _searchHandle () {
      this.currentPage = 1
      this._getData()
    },
    reset () {},
    handleClick () {},
    handleSelectionChange (val) {
      this.multVal = val
    },
    selectionHandle () {},
    toList () {
      this.$router.push({
        path: "/checkProject/list"
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
<style lang="less">
.selDiv {
  .el-icon-date {
    line-height: 32px;
  }
}
</style>
<style lang="less" scoped>
.con {
  position: relative;
  .selDiv {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 11;
  }
}
.card-div {
  .ul {
    padding: 15px 0 15px 15px;
    .li {
      float: left;
      width: 24%;
      margin-right: 1%;
      margin-bottom: 12px;
      padding: 18px;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      box-shadow: 0px 1px 7px 0px rgba(9,9,9,0.07); 
      box-sizing: border-box;
      .li-head {
        position: relative;
        .icon {
          display: block;
          float: left;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #217cfa;
        }
        .title {
          line-height: 40px;
          margin-left: 10px;
        }
        .progress {
          display: block;
          padding: 10px 10px 10px 20px;
          color: #fff;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          background: #217cfa;
          position: absolute;
          right: -18px;
          top: 0;
        }
      }
      .li-info {
        line-height: 30px;
        .check-type {
          float: left;
          width: 60%;
        }
        .device-type {
          float: left;
          width: 40%;
        }
        .cate-name {
          float: left;
          width: 60%;
        }
        .worker {
          float: left;
          width: 40%;
        }
        .sp {
          color: #777;
          float: left;
        }
        .sp2 {
          float: left;
          width: 50%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .li:nth-child(4n) {
      margin-right: 0;
    }
  }
}
</style>