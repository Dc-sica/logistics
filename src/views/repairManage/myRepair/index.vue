<template>
  <ContainerGroup>
    <Container>
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="auto">
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
        <el-form-item label="维修状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.repairStatus" clearable>
            <el-option v-for="item in repairStatus" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修设备/设施：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.equipmentName"></el-input>
        </el-form-item>
        <el-form-item label="紧急程度：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.urgentLevel" clearable>
            <el-option v-for="item in urgentLevel" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修人：" v-if="showAll">
          <el-input placeholder="请输入" clearable v-model="searchForm.repairOrderUser"></el-input>
        </el-form-item>
        <el-form-item label="单据来源：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.source" clearable>
            <el-option :value="1" label="公众号"></el-option>
            <el-option :value="2" label="电脑端"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接单类型：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.orderType" clearable>
            <el-option v-for="item in orderModel" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报修时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.repairTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="派工时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.dispatchTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完成时间：" v-if="showAll">
          <el-date-picker style="width:100%" size="small" v-model="searchForm.finishTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right;">
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
        <el-table-column label="报修单号" width="200px">
          <template slot-scope="scope">
            {{scope.row.repairOrderNumber}}<span class="warn" v-if="scope.row.urgentFlag">{{scope.row.urgentFlag ? '紧急' : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报修部门" prop="deptName"></el-table-column>
        <el-table-column label="报修人" prop="repairUserName"></el-table-column>
        <el-table-column label="报修电话" show-overflow-tooltip prop="repairPhone"></el-table-column>
        <el-table-column label="设备位置" prop="location" show-overflow-tooltip></el-table-column>
        <el-table-column label="报修设备/设施" width="120" show-overflow-tooltip prop="equipmentName"></el-table-column>
        <el-table-column label="报修描述" show-overflow-tooltip prop="remark"></el-table-column>
        <el-table-column label="报修时间" show-overflow-tooltip prop="repairTime"></el-table-column>
        <el-table-column label="维修状态">
          <template slot-scope="scope">
            <span :class="scope.row.repairStatus === 4?'red':''">{{scope.row.repairStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="派工时间" show-overflow-tooltip prop="dispatchTime"></el-table-column>
        <el-table-column label="维修人" prop="repairOrderUser"></el-table-column>
        <el-table-column label="完成时间" show-overflow-tooltip prop="finishTime"></el-table-column>
        <el-table-column label="接单类型" prop="orderTypeName"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" v-if="scope.row.repairStatus === 4 && scope.row.orderType === 3 &&  leaderFlag === 0" content="接单" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe635;'" @click="_toGetOrderHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="抢单" v-if="scope.row.repairStatus === 4 && scope.row.orderType === 1 &&  leaderFlag === 0" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe6cb;'" @click="_toRobOrderHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="采购物资" v-if="scope.row.repairStatus === 5 && scope.row.orderType === 2 &&  leaderFlag === 0" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe643;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="转单" v-if="scope.row.repairStatus === 5 && scope.row.orderType === 2 &&  leaderFlag === 0" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe7d4;'" @click="_toChangeHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" v-if="scope.row.repairStatus === 5 &&  leaderFlag === 1" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="完成维修" v-if="scope.row.repairStatus === 5" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe637;'" @click="_finishHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="派工" v-if="scope.row.repairStatus === 2 &&  leaderFlag === 1" placement="top">
              <el-button type="text" @click="_assignHandle(scope.row)">
                <i class="iconfont" style="font-size:14px;">&#xe785;</i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
      <!-- 侧边弹窗 -->
      <Drawer title="完成维修信息填写" :visible.sync="drawerView" @onOk="_onSave" @cancel="_drawerHandleClose" :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
         { type: 'primary', text: '保存', trigger: 'onOk' }
      ]">
        <div class="drawer-table-box">
          <div class="group">
            <div><i class="red">*</i>维修前照片：</div>
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
            <div><i class="red">*</i>维修后照片：</div>
            <div class="upDiv">
              <input type="file" style="display:none" @change="fileUpload2" ref="file2" multiple />
              <el-button type="default" class="uploadBtn" size="mini" @click="upLoadFile2">选择文件</el-button>
            </div>
            <div class="tip">支持扩展名：jpg, png, pdf, gif, tif, bmp...</div>
            <div class="fileName p-clear">
              <div class="imgDiv" v-for="(item, index) in fileList2" :key="index">
                <img :src="item.url" alt="">
                <i class="imgDelete" @click="deleteFile2(index)">×</i>
              </div>
            </div>
          </div>
          <div class="group">
            <div class="mb10"><i class="red">*</i>维修描述：</div>
            <el-input type="textarea" class="textarea" placeholder="请输入描述,不超过300字" show-word-limit :rows="4" v-model="evaluate" :maxlength="300"></el-input>
          </div>
        </div>
      </Drawer>
    </Container>
  </ContainerGroup>
</template>

<script>
  import pagination from './../../../components/pagination/index'
  import {
    upload
  } from './../../../apis/commonApi'
  import {
    pageListInit
  } from './../../../apis/repairManage/indexApi'
  import {
    getListPage,
    finishOrder
  } from './../../../apis/repairManage/myRepairApi'

  export default {
    name: 'myRepair',
    components: {
      pagination
    },
    data() {
      return {
        searchForm: {
          repairOrderNumber: '',
          repairUserName: '',
          deptId: '',
          repairStatus: '',
          startTime: '',
          endTime: '',
          source: '',
          urgentLevel: '',
          equipmentName: '',
          repairPhone: '',
          repairTime: '',
          dispatchTime: '',
          finishTime: ''
        },
        deptList: [],
        repairStatus: [],
        urgentLevel: [],
        orderModel: [],
        dispatchStatus: [],
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
        multVal: [],
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 20,
        id: '',
        deptId: '',
        repairUserId: '',
        repairOrderUserId: '',
        drawerView: false,
        starValue: null,
        evaluate: '',
        fileList: [],
        fileList2: [],
        leaderFlag: '',
        showAll: true,
        userId: ''
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
      let userInfo = localStorage.getItem('userInfo')
      if (userInfo) {
        const {
          leaderFlag, userId
        } = JSON.parse(userInfo)
        this.leaderFlag = leaderFlag
        this.userId = userId
      }
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
            this.repairStatus = res.data.data.repairStatus
            this.urgentLevel = res.data.data.urgentLevel
            this.orderModel = res.data.data.orderModel
            this.dispatchStatus = res.data.data.dispatchStatus
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _getData() {
        let parms = {
          repairOrderUserId: this.userId,
          repairOrderNumber: this.searchForm.repairOrderNumber,
          repairPhone: this.searchForm.repairPhone,
          repairUserName: this.searchForm.repairUserName,
          deptId: this.searchForm.deptId,
          repairStatus: this.searchForm.repairStatus,
          equipmentName: this.searchForm.equipmentName,
          urgentLevel: this.searchForm.urgentLevel,
          repairOrderUser: this.searchForm.repairOrderUser,
          source: this.searchForm.source,
          orderType: this.searchForm.orderType,
          startTime: this.searchForm.repairTime ? this.searchForm.repairTime[0] : '',
          endTime: this.searchForm.repairTime ? this.searchForm.repairTime[1] : '',
          dispatchStartTime: this.searchForm.dispatchTime ? this.searchForm.dispatchTime[0] : '',
          dispatchEndTime: this.searchForm.dispatchTime ? this.searchForm.dispatchTime[1] : '',
          startFinishTime: this.searchForm.finishTime ? this.searchForm.finishTime[0] : '',
          endFinishTime: this.searchForm.finishTime ? this.searchForm.finishTime[1] : '',
          current: this.currentPage,
          pageSize: this.pageSize,
        }
        getListPage(parms).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.tableData.forEach(element => {
              if (element.orderType === 1) {
                element.orderTypeName = '班组抢单'
              } else if (element.orderType === 2) {
                element.orderTypeName = '自动接单'
              } else if (element.orderType === 3) {
                element.orderTypeName = '手动接单'
              } else if (element.orderType === 4) {
                element.orderTypeName = '组长接单'
              }
              if (element.repairStatus === 7) {
                element.repairStatusName = '已完成'
                if (this.userId === element.applicantId || this.userId === element.repairUserId || this.deptId === element.deptId) {
                  element.evaluate = true
                } else {
                  element.evaluate = false
                }
              }
            })
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      handleSelectionChange(val) {
        this.multVal = val
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
        this.searchForm.repairStatus = ''
        this.searchForm.equipmentName = ''
        this.searchForm.urgentLevel = ''
        this.searchForm.repairOrderUser = ''
        this.searchForm.source = ''
        this.searchForm.orderType = ''
        this.searchForm.repairTime = ''
        this.searchForm.dispatchTime = ''
        this.searchForm.finishTime = ''
      },
      _toDetailHandle(row) {
        this.$router.push({
          path: '/myRepair/detail',
          query: {
            id: row.id
          }
        })
      },
      _toGetOrderHandle(row) {
        this.$router.push({
          path: '/myRepair/getOrder',
          query: {
            id: row.id,
            repairStatus: row.repairStatus,
            orderType: row.orderType
          }
        })
      },
      _toRobOrderHandle(row) {
        this.$router.push({
          path: '/myRepair/robOrder',
          query: {
            id: row.id,
            repairStatus: row.repairStatus,
            orderType: row.orderType
          }
        })
      },
      _toChangeHandle(row) {
        this.$router.push({
          path: '/myRepair/changeOrder',
          query: {
            id: row.id,
            repairStatus: row.repairStatus
          }
        })
      },
      _finishHandle(row) {
        this.drawerView = true
        this.id = row.id
        this.deptId = row.deptId
        this.repairOrderUserId = row.repairOrderUserId
      },
      _assignHandle(row) {
        this.$router.push({
          path: '/myRepair/assignOrder',
          query: {
            id: row.id,
            repairStatus: row.repairStatus
          }
        })
      },
      _editItemHandle(row) {
        this.$router.push({
          path: '/myRepair/editOrder',
          query: {
            id: row.id,
            repairStatus: row.repairStatus
          }
        })
      },
      _drawerHandleClose() {
        this.drawerView = false
      },
      fileUpload(event) {
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
      upLoadFile() {
        if (this.fileList.length >= 9) {
          this.$message.warning('最多上传9张图片')
          return false
        } else {
          this.$refs.file.click()
        }
      },
      fileUpload2(event) {
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
              this.fileList2.push(element)
            })
            this.$refs.file2.value = ''
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      upLoadFile2() {
        if (this.fileList.length >= 9) {
          this.$message.warning('最多上传9张图片')
          return false
        } else {
          this.$refs.file2.click()
        }
      },
      deleteFile(index) {
        this.fileList.splice(index, 1)
      },
      deleteFile2(index) {
        this.fileList2.splice(index, 1)
      },
      _onSave() {
        if (this.fileList.length === 0) {
          this.$message.warning('请上传维修前照片')
          return false
        }
        if (this.fileList2.length === 0) {
          this.$message.warning('请上传维修后照片')
          return false
        }
        if (this.evaluate === '') {
          this.$message.warning('请输入维修描述')
          return false
        }
        let repairBeforeImages = [],
          repairAfterImages = []
        this.fileList.forEach(element => {
          repairBeforeImages.push(element.url)
        })
        this.fileList2.forEach(element => {
          repairAfterImages.push(element.url)
        })
        let parms = {
          repairOrderId: this.id,
          deptId: this.deptId,
          repairUserId: this.repairOrderUserId,
          repairBeforeImages: repairBeforeImages.join(';'),
          repairAfterImages: repairAfterImages.join(';'),
          remark: this.evaluate
        }
        finishOrder(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.drawerView = false
            this.fileList = []
            this.fileList2 = []
            this.evaluate = ''
            this._getData()
          } else {
            this.$message.error(res.data.message)
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
  .red {
    color: red;
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
    }
  }
</style>