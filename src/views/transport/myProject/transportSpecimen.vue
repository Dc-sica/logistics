<template>
  <ContainerGroup class="wrapper">
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
        <el-form-item label="运送样本：" >
          <el-select placeholder="请选择" style="width:100%;"
            v-model="searchForm.sampleIdList">
            <el-option v-for="item in sampleList"
              :key="item.dictId"
              :label="item.name"
              :value="item.name"></el-option>
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
        <el-form-item label="运送时间：" v-if="showAll">
          <el-date-picker style="width:100%;"
            v-model="searchForm.transportTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="任务状态：" v-if="showAll">
          <el-select placeholder="请选择"
            v-model="searchForm.orderStatus">
            <el-option v-for="item in taskStatus"
              :key="item.code"
              :label="item.message"
              :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派工时间：" v-if="showAll">
          <el-date-picker style="width:100%;"
            v-model="searchForm.dispatchTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间：" v-if="showAll">
          <el-date-picker style="width:100%"
            v-model="searchForm.finishTime"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="接单类型：" v-if="showAll">
          <el-select placeholder="请选择"
            v-model="searchForm.orderType">
            <el-option v-for="item in orderModel"
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
    <Container class="warpper-table">
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
      <el-table
         @selection-change="handleSelectionChange"
        :data="tableData"
        border
        v-loading="loading"
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
        <el-table-column label="任务编号" width="150px">
          <template slot-scope="scope">
            {{scope.row.taskOrderNumber}}
          </template>
        </el-table-column>
        <el-table-column label="申请病区"
          prop="areaName"></el-table-column>
        <el-table-column label="申请人"  prop="applicantUserName"></el-table-column>
        <el-table-column label="联系电话"
          prop="applicationPhone"></el-table-column>
        <el-table-column label="运送标本" min-width="200">
          <template slot-scope="scope">
            <el-tag
              :key="tag.index"
              v-for="tag in scope.row.isSelectedSampleList"
              type="info"
              :disable-transitions="false"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="紧急程度"
          prop="urgentLevelName"></el-table-column>
        <el-table-column label="运送时间" show-overflow-tooltip
          prop="createTime"></el-table-column>
        <el-table-column label="任务状态" prop="orderStatusName">
          </el-table-column>
        <el-table-column label="派工时间" prop="dispatchTime" show-overflow-tooltip>
          </el-table-column>
        <el-table-column label="护工人员">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.nursingUserNameList" :key="index">{{item}}</span>
          </template>
          </el-table-column>
        <el-table-column label="完成时间" prop="finishTime" show-overflow-tooltip>
          </el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName">
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
              v-if="scope.row.orderStatus === 4 && scope.row.orderType === 3 &&  nursingLeaderFlag === 0"
              content="接单"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe635;'"
                @click="_toGetOrderHandle(scope.row)">
              </el-button>
            </el-tooltip>
             <el-tooltip class="item"
              effect="dark"
              content="抢单"
              v-if="scope.row.orderStatus === 4 && scope.row.orderType === 1 &&  nursingLeaderFlag === 0"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe6cb;'"
                @click="_toRobOrderHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="转单"
              v-if="scope.row.orderStatus === 5 && (scope.row.orderType === 1 || scope.row.orderType === 1) &&  nursingLeaderFlag === 0"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe7d4;'"
                @click="_toChangeHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="编辑"
              v-if="scope.row.orderStatus === 5 &&  nursingLeaderFlag === 1"
              placement="top">
              <el-button type="text"
                @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="派工"
              v-if="scope.row.orderStatus === 2 &&  nursingLeaderFlag === 1"
              placement="top">
              <el-button type="text"
                @click="_dispatchHandle(scope.row)">
                <i class="iconfont" style="font-size:14px;">&#xe785;</i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="完成任务"
              v-if="scope.row.orderStatus === 5"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe637;'"
                @click="_finishHandle(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
        :page="currentPage"
        :pageSize="pageSize"
        @pagation="pagationChange" />
      <!-- 侧边弹窗 -->
      <Drawer title="完成任务信息填写"
        :visible.sync="drawerView"
        class="drawer-wrapper"
        :footerBtns="[
          { type: 'info', text: '取消', trigger: 'cancel' },
          { type: 'primary', text: '保存', trigger: 'onOk' },
        ]"
        @cancel="_drawerHandleClose"
        @onOk="_onSave"
        :before-close="_drawerHandleClose">
          <div class="group">
            <div><i class="red">*</i>照片凭证：</div>
            <div class="upDiv">
              <input type="file" style="display:none" @change="fileUpload" ref="file" multiple />
              <el-button type="default" class="uploadBtn" size="mini" @click="upLoadFile">选择文件</el-button>
            </div>
            <div class="tip">支持扩展名：jpg, png, pdf, gif, tif, bmp...</div>
            <div class="fileName p-clear">
              <div class="imgDiv" v-for="(item, index) in fileList" :key="index">
                <img :src="item.url" alt="">
                <i class="imgDelete" @click="deleteFile(index)">×</i>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="mb10"><i class="red">*</i>完成描述：</div>
            <el-input type="textarea"
              class="textarea"
              placeholder="请输入描述,不超过300字"
              show-word-limit
              :rows="4"
              v-model="evaluate"
              :maxlength="300"></el-input>
          </div>
      </Drawer>
    </Container>
  </ContainerGroup>
</template>

<script>
import pagination from '../../../components/pagination/index'
import { upload } from './../../../apis/commonApi'
import { pageListInit, getListPage, exportSample, completeOrder } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'specimen',
  components: {
    pagination
  },
  data () {
    return {
      userId: '',
      deptId: '',
      areaList: [],
      taskStatus: [],
      orderModel: [],
      urgentLevel: [],
      sampleList: [],
      destinationList: [],
      checkTypeList: [],
      searchForm: {
        taskOrderNumber: '',
        areaId: '',
        applicantUser: '',
        sampleIdList: '',
        source: '',
        urgentLevel: '',
        orderStatus: '',
        orderType: '',
        transportTime: '',
        dispatchTime: '',
        finishTime: ''
      },
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
      showAll: true,
      nursingLeaderFlag: '',
      drawerView: false,
      fileList: []
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
    const { userId, deptId, nursingLeaderFlag } = JSON.parse(localStorage.getItem('userInfo'))
    this.userId = userId
    this.deptId = deptId
    this.nursingLeaderFlag = nursingLeaderFlag

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
          this.orderModel = res.data.data.orderModel
          this.urgentLevel = res.data.data.urgentLevel
          this.taskTypeList = res.data.data.taskType
          this.destinationList = res.data.data.destination
          this.checkTypeList = res.data.data.checkType
          this.sampleList = res.data.data.sample
          this.taskTypeList.forEach(element => {
            if (element.name === '标本') {
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
        nursingUserId: this.userId,
        taskType: this.taskType,
        taskOrderNumber: this.searchForm.taskOrderNumber,
        areaId: this.searchForm.areaId,
        applicantUser: this.searchForm.applicantUser,
        orderStatus: this.searchForm.orderStatus,
        urgentLevel: this.searchForm.urgentLevel,
        sampleName: this.searchForm.sampleIdList,
        source: this.searchForm.source,
        orderType: this.searchForm.orderType,
        startTransportTime: this.searchForm.transportTime?this.searchForm.transportTime[0]:'',
        endTransportTime: this.searchForm.transportTime?this.searchForm.transportTime[1]:'',
        startDispatchTime: this.searchForm.dispatchTime?this.searchForm.dispatchTime[0]:'',
        endDispatchTime: this.searchForm.dispatchTime?this.searchForm.dispatchTime[1]:'',
        startFinishTime: this.searchForm.finishTime?this.searchForm.finishTime[0]:'',
        endFinishTime: this.searchForm.finishTime?this.searchForm.finishTime[1]:'',
        current: this.currentPage,
        size: this.pageSize,
      }
      if (this.searchForm.orderType === 4) {
        delete parms.nursingUserId
      }
      getListPage(parms).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.tableData.forEach((element) => {
            element.commonSampleList = JSON.parse(element.commonSampleList);
            element.urgentSampleList = JSON.parse(element.urgentSampleList);
            // 筛选选中的运送标本
            element.isSelectedSampleList = [];
            if (element.commonSampleList) {
              element.commonSampleList.forEach((ele) => {
                if (ele.isSelected === "true") {
                  element.isSelectedSampleList.push(ele.sampleName);
                }
              });
              element.urgentSampleList.forEach((ele) => {
                if (ele.isSelected === "true") {
                  element.isSelectedSampleList.push(ele.sampleName);
                }
              });
            }
          });
          this.total = res.data.data.total
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _toDetailHandle (row) {
      this.$router.push({
        path: '/myProject/detail',
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus
        }
      })
    },
    _toGetOrderHandle (row) {
      this.$router.push({
        path: '/myProject/getOrders',
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus
        }
      })
    },
    _toRobOrderHandle (row) {
      this.$router.push({
        path: '/myProject/robOrders',
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus
        }
      })
    },
    _toChangeHandle (row) {
      this.$router.push({
        path: '/myProject/changeOrder',
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus
        }
      })
    },
    _finishHandle (row) {
      this.drawerView = true
      this.taskOrderId = row.id
    },
    _editItemHandle (row) {
      this.$router.push({
        path: '/myProject/edit',
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus
        }
      })
    },
    _dispatchHandle (row) {
      this.$router.push({
        path: '/myProject/dispatch',
        query: {
          id: row.id,
          type: row.taskTypeName,
          orderStatus: row.orderStatus
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
      this.searchForm.sampleIdList = ''
      this.searchForm.source = ''
      this.searchForm.urgentLevel = ''
      this.searchForm.orderStatus = ''
      this.searchForm.orderType = ''
      this.searchForm.transportTime = ''
      this.searchForm.dispatchTime = ''
      this.searchForm.finishTime = ''
    },
    _drawerHandleClose () {
      this.drawerView = false
    },
    deleteFile (index) {
      this.fileList.splice(index,1)
    },
    fileUpload (event) {
      let files = event.target.files
      let maxSize = 1024 * 1024 * 10
      let formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > maxSize) {
          this.$message.error('上传文件不能大于10M')
          return false
        } else {
          formData.append('file', files[i])
        }
      }
      upload(formData).then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((element) => {
            this.fileList.push(element)
          })
          this.$refs.file.value = ''
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    upLoadFile () {
      if (this.fileList.length >= 9) {
        this.$message.warning('最多上传9张图片')
        return false
      } else {
        this.$refs.file.click()
      }
    },
    _onSave () {
      let images = []
      this.fileList.forEach(element => {
        images.push(element.url)
      })
      completeOrder({
        deptId: this.deptId,
        nursingUserId: this.userId,
        images: images.join(';'),
        remark: this.evaluate,
        taskOrderId: this.taskOrderId
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          this.drawerView = false
          this._getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleSelectionChange (val) {
      this.multVal = val
    },
    selectionHandle () {
      let params = {
        nursingUserId: this.userId,
        taskType: this.taskType,
        taskOrderNumber: this.searchForm.taskOrderNumber,
        areaId: this.searchForm.areaId,
        applicantUser: this.searchForm.applicantUser,
        orderStatus: this.searchForm.orderStatus,
        urgentLevel: this.searchForm.urgentLevel,
        sampleName: this.searchForm.sampleIdList,
        source: this.searchForm.source,
        orderType: this.searchForm.orderType,
        startTransportTime: this.searchForm.transportTime?this.searchForm.transportTime[0]:'',
        endTransportTime: this.searchForm.transportTime?this.searchForm.transportTime[1]:'',
        startDispatchTime: this.searchForm.dispatchTime?this.searchForm.dispatchTime[0]:'',
        endDispatchTime: this.searchForm.dispatchTime?this.searchForm.dispatchTime[1]:'',
        startFinishTime: this.searchForm.finishTime?this.searchForm.finishTime[0]:'',
        endFinishTime: this.searchForm.finishTime?this.searchForm.finishTime[1]:'',
      };
      if (this.searchForm.orderType === 4) {
        delete params.nursingUserId
      }
      if (this.excelBtns === '1') {
        exportSample(params).then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], {
              type: res.data.type + "charset=utf-8",
            })
            let downloadLink = document.createElement("a")
            const URL = window.URL || window.webkitURL || window.moxURL
            let downUrl = URL.createObjectURL(blob)
            downloadLink.href = downUrl
            downloadLink.download = "运送标本列表.xlsx"
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
          exportSample({idList: idList}).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "运送标本列表.xlsx"
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
  }
  .warn {
    background: #FF5656;
    border-radius: 7px;
    color: #fff;
    padding: 5px 10px;
    margin-left: 5px;
  }
  .group {
    margin: 0 0 20px;
    padding-left: 18px;
    .sp {
      float: left;
      width: 60px;
    }
    .red {
      color: red;
      margin-right: 5px;
    }
    .mb10 {
      margin-bottom: 10px;
    }
    .textarea {
      float: left;
      width: 85%;
    }
    .upDiv {
      margin: 10px 0;
      .tip {
        margin-left: 10px;
        i {
          color: #FF4141;
          margin-right: 2px;
        }
      }
      .uploadBtn {
        color: #FF8E2F;
        border-color: #FF8E2F;
      }
    }
    .fileName {
      position: relative;
      margin-top: 10px;
      .imgDiv {
        position: relative;
        float: left;
        margin: 0 18px 20px 0;
        border-radius: 5px;
      }
      img {
        display: block;
        width: 130px;
        height: 80px;
        border-radius: 5px;
      }
      .imgDelete {
        position: absolute;
        font-size: 24px;
        top: -10px;
        right: -5px;
        cursor: pointer;
      }
      .aDelete {
        position: absolute;
        font-size: 24px;
        top: -10px;
        cursor: pointer;
      }
    }
  }
}
.el-tag--info {
  color: #FFF;
  background-color: #217DFA;
  border-color: #217DFA;
  min-width: 50px;
}

.el-tag {
  margin: 0 10px 10px 0;
}
.drawer-wrapper {
  .group {
    margin: 30px 0 50px;
    padding-left: 18px;
    .sp {
      float: left;
      width: 60px;
    }
    .textarea {
      float: left;
      width: 85%;
    }
  }
}
</style>