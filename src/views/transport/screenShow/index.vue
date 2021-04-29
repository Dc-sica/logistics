<template>
  <ContainerGroup class="wrapper">
    <Container>
      <div class="wrapper-form">
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
                <h2 class="thirdC">{{countObj.count1}}</h2>
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
                <h2 class="thirdC">{{countObj.count2}}</h2>
              </li>
            </ul>
          </div>
          <div class="topinside">
            <ul>
              <li>
                <div class="header-icon-box" style="background-color:#FFC564;">
                  <span class="icoSpan iconfont" v-html="'&#xe882;'">
                  </span>
                </div>
              </li>
              <li>
                待陪检/运送
                <div class="secondB">
                  <!-- 未受理 -->
                  <el-progress :percentage="percentage" color="#FFC564" :stroke-width="strWidth" style="width: 120px;"></el-progress>
                </div>
              </li>
              <li>
                <h2 class="thirdC">{{countObj.count4}}</h2>
              </li>
            </ul>
          </div>
          <div class="topinside">
            <ul>
              <li>
                <div class="header-icon-box" style="background-color:#20ABE4;">
                  <span class="icoSpan iconfont" v-html="'&#xe64d;'">
                  </span>
                </div>
              </li>
              <li>
                陪检/运送中
                <div class="secondB">
                  <!-- 未受理 -->
                  <el-progress :percentage="percentage" color="#20ABE4" :stroke-width="strWidth" style="width: 120px;"></el-progress>
                </div>
              </li>
              <li>
                <h2 class="thirdC">{{countObj.count5}}</h2>
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
                <h2 class="thirdC">{{countObj.count7}}</h2>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </Container>
    <Container height="fill" scrollY="true">
      <el-table :data="tableData" border isFillHeight stripe height="0" size="mini" :header-cell-style="{ background: '#FAFAFA', height: '42px' }">
        <el-table-column label="任务编号" prop="taskOrderNumber"></el-table-column>
        <el-table-column label="申请病区" prop="areaName"></el-table-column>
        <el-table-column label="申请人" prop="applicantUserName"></el-table-column>
        <el-table-column label="联系电话" prop="applicationPhone"></el-table-column>
        <el-table-column label="任务类型" prop="taskTypeName" width="120px"></el-table-column>
        <el-table-column label="紧急程度" prop="urgentLevelName"></el-table-column>
        <el-table-column label="提交时间" prop="createTime"></el-table-column>
        <el-table-column label="任务状态">
          <template v-slot="scoped">
            <div>{{scoped.row.orderStatus|getTaskStatus}}</div>
          </template>
        </el-table-column>
        <el-table-column label="单据来源" prop="source"></el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from './../../../components/pagination/index'
  import {
    getTaskOrderStatistics,
    taskOrderPage
  } from './../../../apis/departmentReport'
  export default {
    name: 'screenShow', // 电子屏显示
    components: {
      pagination
    },
    data() {
      return {
        countObj: {},
        statusMountData: [],
        strWidth: 8,
        percentage: 39,
        // customColor: '#409eff',
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
        multipleSelection: [],
        excelBtnList: [{
            label: "全部导出",
            value: "1",
          },
          {
            label: "批量导出",
            value: "2",
          },
        ],
        excelBtns: '',
      }
    },
    created() {
      this.getStatusMount()
      this.getData()
    },
    filters: {
      getTaskStatus(value) {
        if (value === 1) {
          return '未受理'
        } else if (value === 2) {
          return '待派工'
        } else if (value === 3) {
          return '已驳回'
        } else if (value === 4) {
          return '待陪检/运送'
        } else if (value === 5) {
          return '陪检中/运送'
        } else if (value === 6) {
          return '已撤回'
        } else if (value === 7) {
          return '已完成'
        }
      }
    },
    methods: {
      getStatusMount() {
        getTaskOrderStatistics().then(res => {
          if (res.data.code == 200) {
            this.statusMountData = res.data.data
            this.statusMountData.forEach(ele => {
              if (ele.taskOrderStatusName == '未受理') {
                this.countObj.count1 = ele.taskOrderStatusCount
              } else if (ele.taskOrderStatusName == '待派工') {
                this.countObj.count2 = ele.taskOrderStatusCount
              } else if (ele.taskOrderStatusName == '待陪检/运送') {
                this.countObj.count4 = ele.taskOrderStatusCount
              } else if (ele.taskOrderStatusName == '陪检中/运送') {
                this.countObj.count5 = ele.taskOrderStatusCount
              } else if (ele.taskOrderStatusName == '已完成') {
                this.countObj.count7 = ele.taskOrderStatusCount
              }
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getData() {
        taskOrderPage({
          current: this.currentPage,
          size: this.pageSize
        }).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            // // 为空排除
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
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this.getData()
      }
    }
  }
</script>
<style lang="less" scoped>
  .wrapper {
    min-width: 1400px;
    position: relative;
    overflow: hidden;

    .wrapper-form {
      background: #fff;
      height: 120px;
      padding: 10px 15px;
      margin-bottom: 15px;
    }

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

  #nevbox {
    margin-top: 10px;
    margin-bottom: 15px;
  }
</style>