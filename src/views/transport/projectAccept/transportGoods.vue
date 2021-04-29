<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true"
        ref="searchForm"
        :model="searchForm" label-width="auto">
        <el-form-item label="任务编号：" >
          <el-input placeholder="请输入"
            clearable
            v-model="searchForm.taskOrderNumber"></el-input>
        </el-form-item>
        <el-form-item label="申请病区：" >
          <el-select placeholder="请选择"
            v-model="searchForm.areaId">
            <el-option v-for="item in areaList"
              :key="item.dictId"
              :label="item.name"
              :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人：" >
          <el-input placeholder="请输入"
            clearable
            v-model="searchForm.applicantUser"></el-input>
        </el-form-item>
        <el-form-item label="运送类型：" >
          <el-select placeholder="请选择"
            v-model="searchForm.transportType">
            <el-option v-for="item in transportTypeList"
                    :key="item.dictId"
                    :label="item.name"
                    :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="紧急程度：" v-if="showAll">
          <el-select placeholder="请选择"
            v-model="searchForm.urgentLevel">
            <el-option v-for="item in urgentLevel"
              :key="item.dictId"
              :label="item.name"
              :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受理状态：" v-if="showAll">
          <el-select placeholder="请选择"
            v-model="searchForm.orderStatus">
            <el-option v-for="item in handlerStatus"
              :key="item.code"
              :label="item.value"
              :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择"
            v-model="searchForm.source">
            <el-option :value="1"
              label="公众号"></el-option>
            <el-option :value="2"
              label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物品：" v-if="showAll">
          <el-select placeholder="请选择" style="width: 100%;"
            v-model="searchForm.goodsList">
            <el-option v-for="item in goodsList"
              :key="item.dictId"
              :label="item.name"
              :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运送/领取时间：" v-if="showAll">
          <el-date-picker
            v-model="searchForm.goodsTransportTime"
            type="datetimerange" style="width:100%"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受理时间：" v-if="showAll">
          <el-date-picker style="width:100%"
            v-model="searchForm.handleTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary"
            @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text"  id="closeSearchBtn" @click="closeSearch">
            {{word}}
            <i :class="showAll ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
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
      <el-table :data="tableData"
        v-loading="loading"
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
       >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="任务编号" width="200px">
          <template slot-scope="scope">
            {{scope.row.taskOrderNumber}}
          </template>
        </el-table-column>
        <el-table-column label="申请病区"
          prop="areaName"></el-table-column>
        <el-table-column label="申请人"  prop="applicantUserName"></el-table-column>
        <el-table-column label="联系电话"
          prop="applicationPhone"></el-table-column>
        <el-table-column label="运送类型">
          <template slot-scope="scope">
            <span>{{scope.row.transportType === 0 ? '送回':'领取'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="物品" min-width="150">
          <template slot-scope="scope">
            <el-tag :key="tag.index" v-for="tag in scope.row.goodsNameList" type="info" :disable-transitions="false">
              {{tag}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="目的地"
          prop="toSpace"></el-table-column>
        <el-table-column label="是否紧急"
          prop="urgentLevelName"></el-table-column>
        <el-table-column label="运送/领取时间" show-overflow-tooltip prop="goodsTransportTime">
          </el-table-column>
        <el-table-column label="受理状态">
          <template slot-scope="scope">
            <span>{{scope.row.handlerStatus === 1 ? '未受理':(scope.row.handlerStatus === 2 ? '已受理':'已驳回')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="受理时间" prop="handlerTime">
          </el-table-column>
        <el-table-column label="单据来源">
          <template slot-scope="scope">
            <span>{{scope.row.source === 1 ? '公众号':'电脑端'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item"
              effect="dark"
              content="查看"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe67e;'"
                @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              v-if="scope.row.handlerStatus === 1"
              content="审核"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe666;'"
                @click="_editItemHandle(scope.row)">
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
import pagination from '../../../components/pagination/index'
import { pageListInit, getListPage, exportTaskOrderHandleGoodExcel } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'goods',
  components: {
    pagination
  },
  data () {
    return {
      userId: '',
      deptId: '',
      areaList: [],
      taskStatus: [],
      urgentLevel: [],
      goodsList: [],
      handlerStatus: [{
        code: 1,
        value: '未受理'
      }, {
        code: 2,
        value: '已受理'
      }, {
        code: 3,
        value: '已驳回'
      }],
      searchForm: {
        taskOrderNumber: '',
        areaId: '',
        applicantUser: '',
        orderStatus: '',
        source: '',
        urgentLevel: '',
        transportType: '',
        goodsList: '',
        goodsTransportTime: '',
        handleTime: ''
      },
      transportTypeList: [{
        dictId: '0',
        name: '送回'
      }, {
        dictId: '1',
        name: '领取'
      }],
      excelBtns: '',
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
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 20,
      evaluate: '',
      showAll: true
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
  mounted () {
    const { userId, deptId } = JSON.parse(localStorage.getItem('userInfo'))
    this.userId = userId
    this.deptId = deptId
    this.init()
    this.$nextTick(function() {
      this.closeSearch()
    })
  },
  methods: {
    closeSearch () {
      this.showAll = !this.showAll
    },
    init () {
      pageListInit().then(res => {
        if (res.data.code === 200) {
          this.areaList = res.data.data.patientArea
          this.taskStatus = res.data.data.taskStatus
          this.urgentLevel = res.data.data.urgentLevel
           this.goodsList = res.data.data.goods
           this.taskTypeList = res.data.data.taskType
          this.taskTypeList.forEach(element => {
            if (element.name === '物品') {
              this.taskType = element.dictId.toString()
              this._getData()
            }
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _getData () {
      let parms = {
        taskType: this.taskType,
        taskOrderNumber: this.searchForm.taskOrderNumber,
        areaId: this.searchForm.areaId,
        applicantUser: this.searchForm.applicantUser,
        orderStatus: this.searchForm.orderStatus,
        source: this.searchForm.source,
        urgentLevel: this.searchForm.urgentLevel,
        transportType: this.searchForm.transportType,
        goodsId: this.searchForm.goodsList,
        startGoodsTransportTime: this.searchForm.goodsTransportTime?this.searchForm.goodsTransportTime[0]:'',
        endGoodsTransportTime: this.searchForm.goodsTransportTime?this.searchForm.goodsTransportTime[1]:'',
        startHandleTime: this.searchForm.handleTime?this.searchForm.handleTime[0]:'',
        endHandleTime: this.searchForm.handleTime?this.searchForm.handleTime[1]:'',
        current: this.currentPage,
        size: this.pageSize,
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
     _toDetailHandle (row) {
      this.$router.push({
        path: '/projectAccept/detail',
        query: {
          id: row.id,
          type: row.taskTypeName
        }
      })
    },
    _editItemHandle (row) {
      this.$router.push({
        path: '/projectAccept/accept',
        query: {
          id: row.id,
          type: row.taskTypeName
        }
      })
    },
    _searchHandle () {
      this.currentPage = 1
      this._getData()
    },
    reset () {
      this.searchForm.taskOrderNumber = ''
      this.searchForm.areaId = ''
      this.searchForm.applicantUser = ''
      this.searchForm.orderStatus = ''
      this.searchForm.source = ''
      this.searchForm.urgentLevel = ''
      this.searchForm.goodsList = ''
      this.searchForm.goodsTransportTime = ''
      this.searchForm.handleTime = ''
      
    },
    handleSelectionChange (val) {
      this.multVal = val
    },
    selectionHandle () {
      let params = {
        taskType: this.taskType,
        taskOrderNumber: this.searchForm.taskOrderNumber,
        areaId: this.searchForm.areaId,
        applicantUser: this.searchForm.applicantUser,
        orderStatus: this.searchForm.orderStatus,
        source: this.searchForm.source,
        urgentLevel: this.searchForm.urgentLevel,
        transportType: this.searchForm.transportType,
        goodsId: this.searchForm.goodsList,
        startGoodsTransportTime: this.searchForm.goodsTransportTime?this.searchForm.goodsTransportTime[0]:'',
        endGoodsTransportTime: this.searchForm.goodsTransportTime?this.searchForm.goodsTransportTime[1]:'',
        startHandleTime: this.searchForm.handleTime?this.searchForm.handleTime[0]:'',
        endHandleTime: this.searchForm.handleTime?this.searchForm.handleTime[1]:'',
      };
      if (this.excelBtns === '1') {
        exportTaskOrderHandleGoodExcel(params).then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            })
            let downloadLink = document.createElement("a")
            const URL = window.URL || window.webkitURL || window.moxURL
            let downUrl = URL.createObjectURL(blob)
            downloadLink.href = downUrl
            downloadLink.download = "任务受理运送物品列表.xlsx"
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
          let idList = []
          this.multVal.forEach(element => {
            idList.push(element.id)
          })
          exportTaskOrderHandleGoodExcel({idList: idList}).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "任务受理运送物品列表.xlsx"
              downloadLink.click()
              window.URL.revokeObjectURL(downUrl)
              this.excelBtns = ""
            }
          })
        }
      }
    },
    pagationChange (payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getData()
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  .wrapper-form {
    background: #fff;
    padding: 10px 15px;
  }
  .warpper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
    .addBtn {
      background:#1D93A8;
      color:#fff;
      height: 36px;
      float: left;
      margin-right: 20px;
      padding: 10px 20px;
    }
    .span {
      float: left;
      margin-right: 5px;
      margin-bottom: 5px;
      background: #ff8901;
      color: #fff;
      padding: 5px 10px;
      text-align: center;
      border-radius: 5px;
    }
  }
  .warn {
    background: #FF5656;
    border-radius: 7px;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
  }
}
.el-tag--info {
  color: #FFF;
  background-color: #217DFA;
  border-color: #217DFA;
  min-width: 50px;
}

.el-tag+.el-tag {
  margin-left: 10px;
}
</style>