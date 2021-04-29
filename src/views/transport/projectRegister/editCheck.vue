<template>
  <ContainerGroup class="wrapper">
    <Container>
      <el-button round
        class="cancelBtn"
        @click="_goback">取消</el-button>
      <el-button round
        type="primary"
        @click="_onSubmit">提交</el-button>
    </Container>
    <Container class="wrapper-table" height="fill" scrollY="true">
      <div class="form-box">
        <p class="form-title">
          基本信息
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo"
              ref="formInfo"
              :rules="rules">
              <el-col :span="12">
                <el-form-item label="任务类型："
                  prop="taskType"
                  label-width="130px">
                  <el-select v-model="formInfo.taskType"
                    placeholder="请选择"
                    disabled
                    style="width:100%">
                      <el-option v-for="item in taskTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
            <!-- 陪检 -->
            <el-form :model="form1Info"
              ref="form1Info"
              :rules="rules1">
              <el-col :span="12">
                <el-form-item label="申请人："
                  label-width="130px"
                  prop="applicantUser">
                  <el-input placeholder="系统生成"
                    disabled
                    v-model="form1Info.applicantUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话："
                  label-width="130px"
                  prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled
                    v-model="form1Info.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请病区："
                  label-width="130px"
                  prop="areaId">
                  <el-select v-model="form1Info.areaId"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in areaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住院号："
                  label-width="130px"
                  prop="hospitalNo">
                  <el-input placeholder=""
                    v-model="form1Info.hospitalNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病床号："
                  label-width="130px"
                  prop="bedNo">
                  <el-input placeholder=""
                    v-model="form1Info.bedNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病人姓名："
                  label-width="130px"
                  prop="patientName">
                  <el-input placeholder=""
                    v-model="form1Info.patientName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="配送工具："
                  label-width="130px"
                  prop="remark">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in toolsList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="toolsClick(item,index)">
                      {{item.name}}
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="嘱托："
                  label-width="130px"
                  prop="entrust">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in entrustList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="entrustClick(item,index)">
                      {{item.name}}
                    </div>
                  </div>
                  <el-input type="textarea"
                    placeholder="请输入描述，不超过300字"
                    show-word-limit
                    :rows="4"
                    v-model="form1Info.remark"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt">
          检查信息
        </p>
        <div class="form-row1">
          <div class="chooseBtn" @click="_chooseItem">+新增检查</div>
          <el-row>
            <el-form :model="form4Info"
              :rules="rules4">
              <div class="p-clear" v-for="(item, index) in checkList" :key="index">
                <el-col :span="7" class="pos">
                  <i class="star">*</i>
                  <el-form-item label="检查项目：" label-width="100px">
                    <el-select v-model="item.checkId"
                      style="width:70%"
                      placeholder="请选择">
                      <el-option v-for="item in checkTypeList"
                        :key="item.dictId"
                        :label="item.name"
                        :value="item.dictId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7" class="pos">
                  <i class="star">*</i>
                  <el-form-item label="目的地：" label-width="90px">
                    <el-select v-model="item.destinationId"
                      style="width:80%"
                      placeholder="请选择">
                      <el-option v-for="item in deptList"
                        :key="item.dictId"
                        :label="item.name"
                        :value="item.dictId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7" class="pos">
                  <i class="star">*</i>
                  <el-form-item label="陪检时间："
                    label-width="100px">
                    <el-date-picker style="width:90%"
                      v-model="item.keepTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2" class="line40">
                  <el-switch v-model="item.urgentFlag" 
                    @click.stop.native @change="active_text(item)" 
                    active-color="#FF8901" inactive-color="#E5E5E5" 
                    active-text="紧急"
                    inactive-text="一般"
                    :active-value="1" 
                    :inactive-value="0"></el-switch>
                </el-col>
                <el-col :span="1" class="line40">
                  <div class="delBtn" @click="_delHandle(item, index)">×</div>
                </el-col>
              </div>
            </el-form>
          </el-row>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import { dictByCategoryId } from './../../../apis/commonApi'
import { getAreaList, selectTaskOrderByTaskTypes, updTaskOrder } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'edit',
  data () {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
      drawerView: false,
      formInfo: {
        taskType: '',
        taskTypeName: '陪检',
        objTypeName: '',
        applicantUser: '',
        userId: '',
        applicantPhone: '',
      },
      form1Info: {
        
      },
      form4Info: {},
      rules: {
        taskType: [{ required: true, message: '请选择任务类型', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
      },
      rules1: {
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
        areaId: [{ required: true, message: '请选择病区', tirgger: "change" }],
        hospitalNo: [{ required: true, message: '请输入住院号', tirgger: "blur" }],
        bedNo: [{ required: true, message: '请输入病床号', tirgger: "blur" }],
        patientName: [{ required: true, message: '请输入病人姓名', tirgger: "blur" }],
        remark: [{ required: true, message: '请输入描述', tirgger: "blur" }],
      },
      rules4: {},
      tableData: [],
      taskTypeList: [],
      urgentLevelList: [],
      taskObjectTypeList: [],
      areaList: [],
      toolsList: [],
      entrustList: [],
      checkTypeList: [],
      deptList: [],
      goodsList: [],
      checkList: [{
        checkId: '',
        destinationId: '',
        keepTime: '',
        urgentFlag: false
      }],
      tool: [],
      entrust: []
    }
  },
  mounted () {
    this._getTaskTypeList()
    this._getAreaList()
    this._getTools()
    this._getEntrust()
    this._getCheckType()
    this._getDept()
    this._getLevel()
    this.getDetail()
  },
  methods: {
    _goback () {
      this.$router.push('/projectRegister')
    },
    // 获取任务类型
    _getTaskTypeList () {
      let params = {
        categoryCode: 'taskType',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.taskTypeList = res.data.data && res.data.data.sysDictList
          this.taskTypeList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
          if (this.type === '陪检') {
            this.formInfo.taskType = this.taskTypeList[0].dictId
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取病区
    _getAreaList () {
      getAreaList().then(res => {
        if (res.data.code === 200) {
          this.areaList = res.data.data
          this.areaList.forEach(element => {
            element.id = element.id.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取运送工具
    _getTools () {
      let params = {
        categoryCode: 'tool',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.toolsList = res.data.data && res.data.data.sysDictList
          this.toolsList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取嘱托
    _getEntrust () {
      let params = {
        categoryCode: 'entrust',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.entrustList = res.data.data && res.data.data.sysDictList
          this.entrustList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取检测项目
    _getCheckType () {
      let params = {
        categoryCode: 'checkType',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.checkTypeList = res.data.data && res.data.data.sysDictList
          this.checkTypeList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取目的地
    _getDept () {
      let params = {
        categoryCode: 'dept',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.deptList = res.data.data && res.data.data.sysDictList
          this.deptList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取紧急程度
    _getLevel () {
      let params = {
        categoryCode: 'level',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.urgentLevelList = res.data.data && res.data.data.sysDictList
          this.urgentLevelList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getDetail () {
      selectTaskOrderByTaskTypes({
        orderId: this.id
      }).then(res => {
        if (res.data.code === 200) {
          this.form1Info = res.data.data
          this.form1Info.areaId = this.form1Info.areaId.toString()
          let tool = this.form1Info.tool.split(';')
          this.toolsList.forEach(element => {
            tool.forEach(ele => {
              if (element.name === ele) {
                element.isActive = true
              }
            })
          })
          let entrust = this.form1Info.entrust.split(';')
          this.entrustList.forEach(element => {
            entrust.forEach(ele => {
              if (element.name === ele) {
                element.isActive = true
              }
            })
          })
          this.form1Info.taskKeepCheckList.forEach(element => {
            element.checkId = element.checkId.toString()
            element.destinationId = element.destinationId.toString()
          })
          this.checkList = this.form1Info.taskKeepCheckList
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    toolsClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.tool = []
      this.toolsList.forEach(element => {
        if (element.isActive) {
          this.tool.push(element.name)
        }
      })
      this.$forceUpdate()
    },
    entrustClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.entrust = []
      this.entrustList.forEach(element => {
        if (element.isActive) {
          this.entrust.push(element.name)
        }
      })
      this.$forceUpdate()
    },
    active_text (item) {
      console.log(item)
    },
    _delHandle (item, index) {
      this.checkList.splice(index,1)
    },
    _chooseItem () {
      let obj = {
        workerGroup: '',
        worker: '',
        phone: ''
      }
      this.checkList.push(obj)
    },
    _onSubmit () {
      if (this.checkList.length === 0) {
        this.$message.warning('请添加检查信息')
        return false
      } else {
        for (let i=0;i<this.checkList.length;i++) {
          if (this.checkList[i].checkId === '') {
            this.$message.warning('请选择检查项目')
            return false
          } else if (this.checkList[i].destinationId === '') {
            this.$message.warning('请选择目的地')
            return false
          } else if (this.checkList[i].keepTime === '') {
            this.$message.warning('请选择陪检时间')
            return false
          }
        }
      }
      let taskKeepCheckList = []
      this.checkList.forEach(element => {
        let obj = {
          checkId: element.checkId,
          destinationId: element.destinationId,
          keepTime: element.keepTime,
          urgentFlag: element.urgentFlag
        }
        taskKeepCheckList.push(obj)
      })
      let parms = {
        id: this.id,
        applicantId: this.form1Info.userId,
        taskType: this.formInfo.taskType,
        applicantUser: this.form1Info.applicantUser,
        applicantPhone: this.form1Info.applicantPhone,
        areaId: this.form1Info.areaId,
        hospitalNo: this.form1Info.hospitalNo,
        bedNo: this.form1Info.bedNo,
        patientName: this.form1Info.patientName,
        tool: this.tool.join(';'),
        entrust: this.entrust.join(';'),
        remark: this.form1Info.remark,
        taskKeepCheckList: taskKeepCheckList,
        source: 2,
        taskOrderNumber: ''
      }
      this.$refs.form1Info.validate(valid => {
        if (valid) {
          updTaskOrder(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
              let curIndex = ''
              subPathList.forEach((element,index) => {
                if (element.text === '陪检运送-编辑') {
                  curIndex = index
                }
              })
              subPathList.splice(curIndex, 1)
              localStorage.setItem('subPath', JSON.stringify(subPathList))
              this.$router.push('/projectRegister')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  .wrapper-form {
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    height: calc(100vh - 150px);
    overflow: scroll;
    padding: 10px 15px;
    .wrapper-top {
      height: 45px;
      padding: 10px 15px;
      margin-bottom: 15px;
      line-height: 45px;
      text-align: right;
      display: flex;
      justify-content: space-between;
    }
    .form-box {
      border: 1px solid #e5e5e5;
      .form-title {
        border-bottom: 1px solid #e5e5e5;
        line-height: 55px;
        padding-left: 30px;
        font-family: Source Han Sans CN Regular,
          Source Han Sans CN Regular-Regular;
        font-weight: bold;
        font-size: 18px;
        text-align: left;
        color: #333333;
        background: #fcfcfc;
      }
      .bt {
        border-top: 1px solid #e5e5e5;
      }
      .form-row {
        padding: 15px 30px;
      }
      .form-row1 {
        padding: 15px 80px;
      }
    }
    .ul {
      margin-bottom: 10px;
      .li {
        float: left;
        line-height: 42px;
        text-align: center;
        border: 1px solid #e8eaed;
        border-radius: 6px;
        padding: 0 30px;
        margin-right: 15px;
        cursor: pointer;
        position: relative;
        i {
          font-size: 18px;
          position: absolute;
          right: -5px;
          top: -20px;
        }
      }
      .li.active {
        background: #1d93a8;
        color: #fff;
        // padding: 0 21px;
      }
    }
    .upDiv {
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
        right: 4px;
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
  .pos {
    position: relative;
    .star {
      position: absolute;
      color: red;
      top: 15px;
      left: 6px;
    }
  }
  .delBtn {
    text-align: center;
    font-size: 30px;
    cursor: pointer;
  }
  .chooseBtn {
    height: 40px;
    color: #333;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    cursor: pointer;
  }
  .line40 {
    line-height: 40px;
    text-align: center;
  }
}
.bot-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  margin-top: 5px;
  .cancelBtn {
    border-color: #FF8E2F;
    color: #FF8E2F;
  }
}
.drawer-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  margin-top: 5px;
}
</style>