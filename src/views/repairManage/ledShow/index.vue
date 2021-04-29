<template>
  <ContainerGroup class="wrapper">
    <Container>
      <div class="topOut">
        <div class="topinside">
          <ul>
            <li>
              <div class="header-icon-box" style="background-color: rgba(244, 116, 109);">
                <span class="icoSpan iconfont" v-html="'&#xe660;'">
                </span>
              </div>
            </li>
            <li>
              未受理
              <div class="secondB">
                <!-- 未受理 -->
                <el-progress :percentage="percentage" color="#F4746D" :stroke-width="strWidth" style="width: 120px;"></el-progress>
              </div>
            </li>
            <li>
              <h2 class="thirdC">{{repairOneCount}}</h2>
            </li>
          </ul>
        </div>
        <div class="topinside">
          <ul>
            <li>
              <div class="header-icon-box" style="background-color:#24B4CE;">
                <span class="icoSpan iconfont" v-html="'&#xe648;'">
                </span>
              </div>
            </li>
            <li>
              待派工
              <div class="secondB">
                <!-- 未受理 -->
                <el-progress :percentage="percentage" color="#24B4CE" :stroke-width="strWidth" style="width: 120px;"></el-progress>
              </div>
            </li>
            <li>
              <h2 class="thirdC">{{repairTwoCount}}</h2>
            </li>
          </ul>
        </div>
        <div class="topinside">
          <ul>
            <li>
              <div class="header-icon-box" style="background-color:#FFC564;">
                <span class="icoSpan iconfont" v-html="'&#xe667;'">
                </span>
              </div>
            </li>
            <li>
              待维修
              <div class="secondB">
                <!-- 未受理 -->
                <el-progress :percentage="percentage" color="#FFC564" :stroke-width="strWidth" style="width: 120px;"></el-progress>
              </div>
            </li>
            <li>
              <h2 class="thirdC">{{repairThreeCount}}</h2>
            </li>
          </ul>
        </div>
        <div class="topinside">
          <ul>
            <li>
              <div class="header-icon-box" style="background-color:#20ABE4;">
                <span class="icoSpan iconfont" v-html="'&#xe724;'">
                </span>
              </div>
            </li>
            <li>
              维修中
              <div class="secondB">
                <!-- 未受理 -->
                <el-progress :percentage="percentage" color="#20ABE4" :stroke-width="strWidth" style="width: 120px;"></el-progress>
              </div>
            </li>
            <li>
              <h2 class="thirdC">{{repairFourCount}}</h2>
            </li>
          </ul>
        </div>
        <div class="topinside">
          <ul>
            <li>
              <div class="header-icon-box" style="background-color:#1D93A8;">
                <span class="icoSpan iconfont" v-html="'&#xe635;'">
                </span>
              </div>
            </li>
            <li>
              已完成
              <div class="secondB">
                <!-- 未受理 -->
                <el-progress :percentage="percentage" color="#1D93A8" :stroke-width="strWidth" style="width: 120px;"></el-progress>
              </div>
            </li>
            <li>
              <h2 class="thirdC">{{repairFiveCount}}</h2>
            </li>
          </ul>
        </div>

      </div>

    </Container>
    <Container>
      <el-table :data="tableData" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0" border>
        <el-table-column label="报修部门" prop="deptName">
          <template slot-scope="scope">
            {{scope.row.deptName}}<span class="warn" v-if="scope.row.urgentFlag">{{scope.row.urgentFlag ? '紧急' : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报修人" prop="repairUserName"></el-table-column>
        <el-table-column label="报修电话" prop="repairPhone"></el-table-column>
        <el-table-column label="报修地点" prop="location"></el-table-column>
        <el-table-column label="报修设备/设施" prop="equipmentName" width="120px"></el-table-column>
        <el-table-column label="报修描述" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="报修时间" show-overflow-tooltip prop="repairTime"></el-table-column>
        <el-table-column label="维修状态" prop="repairStatusName">
          <template slot-scope="scope">
            <span class="urgent" v-if="scope.row.repairStatusName == '待维修'">{{scope.row.repairStatusName}}</span>
            <span v-else>
              {{scope.row.repairStatusName}}
            </span>
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
    getRepairStatistics
  } from './../../../apis/ledShow/indexApi'
  export default {
    name: 'ledShow', // 电子屏显示
    components: {
      pagination
    },
    data() {
      return {
        repairOneCount: 0,
        repairTwoCount: 0,
        repairThreeCount: 0,
        repairFourCount: 0,
        repairFiveCount: 0,
        strWidth: 8,
        percentage: 39,
        // customColor: '#409eff',
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        getRepairStatistics().then(res => {
          if (res.data.code === 200) {
            this.topCount = res.data.data
            this.topCount.forEach(ele => {
              if (ele.repairStatusName == '未受理') {
                this.repairOneCount = ele.repairStatusCount
              } else if (ele.repairStatusName == '待派工') {
                this.repairTwoCount = ele.repairStatusCount
              } else if (ele.repairStatusName == '待维修') {
                this.repairThreeCount = ele.repairStatusCount
              } else if (ele.repairStatusName == '维修中') {
                this.repairFourCount = ele.repairStatusCount
              } else if (ele.repairStatusName == '已完成') {
                this.repairFiveCount = ele.repairStatusCount
              }
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
        getListPage({
          current: this.currentPage,
          size: this.pageSize
        }).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.tableData.forEach(element => {
              if (element.repairStatus === 1) {
                element.repairStatusName = '未受理'
              } else if (element.repairStatus === 2) {
                element.repairStatusName = '待派工'
              } else if (element.repairStatus === 3) {
                element.repairStatusName = '已驳回'
              } else if (element.repairStatus === 4) {
                element.repairStatusName = '已派工'
              } else if (element.repairStatus === 5) {
                element.repairStatusName = '维修中'
              } else if (element.repairStatus === 6) {
                element.repairStatusName = '已撤回'
              } else if (element.repairStatus === 7) {
                element.repairStatusName = '已完成'
              }
            })
            this.total = res.data.data.total
          }
        })
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
  .urgent {
    color: red;
  }

  .wrapper {
    min-width: 1400px;
    overflow: hidden;
    .warn {
      background: #FF5656;
      border-radius: 7px;
      color: #fff;
      padding: 5px 10px;
      margin-left: 5px;
    }
  }

  /deep/.el-progress__text {
    display: none;
  }

  .header-icon-box {
    // background-color: rgba(244, 116, 109);
    margin-top: 36px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: block;
    position: relative;

    .icoSpan {
      margin: 0 8px 0 0;
      position: absolute;
      bottom: -24px;
      right: 2px;
      color: #fff;
    }
  }

  ul {
    width: 100%;
    height: 135px;
    // background: red;
    display: flex;
    margin: auto;
    // margin-top: 100px;
    // padding: 0 10px;
    align-items: center;
  }

  li {
    height: 135px;
    width: 40px;
    display: inline-block;

    &:nth-child(1) {
      max-width: 45px;
      min-width: 45px;
      text-align: right;
      flex: 1;
    }

    &:nth-child(2) {
      text-align: center;
      min-width: 130px;
      position: relative;

      .secondB {
        display: block;
        width: 100px;
        margin-top: -36px;
        margin-left: 15px;

      }
    }

    &:nth-child(3) {
      text-align: center;
      min-width: 52px;
      flex: 1;

      .thirdC {
        position: absolute;
        font-size: 43px;
        margin-top: 15px;
      }
    }
  }

  .iconfont {
    font-size: 46px;
  }

  .topOut {
    padding: 10px 10px;
    margin-top: -15px;
    display: flex;

    .topinside {
      line-height: 115px;
      height: 135px;
      flex: 1;

    }

  }
</style>