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
            <!-- 标本 -->
            <el-form :model="form2Info"
              ref="form2Info"
              :rules="rules2">
              <el-col :span="12">
                <el-form-item label="申请病区："
                  label-width="130px"
                  prop="areaId">
                  <el-select v-model="form2Info.areaId"
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
                <el-form-item label="紧急程度："
                  prop="urgentLevel"
                  label-width="130px">
                  <el-radio-group v-model="form2Info.urgentLevel">
                    <el-radio v-for="item in urgentLevelList" :key="item.dictId" :label="item.dictId">{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请人："
                  label-width="130px"
                  prop="applicantUser">
                  <el-input placeholder="系统生成"
                    disabled
                    v-model="form2Info.applicantUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话："
                  label-width="130px"
                  prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled
                    v-model="form2Info.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运送时间："
                  label-width="130px"
                  prop="transportTime">
                  <el-date-picker style="width:100%;"
                    v-model="form2Info.transportTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择运送时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目的地："
                  label-width="130px"
                  prop="destination">
                  <el-input placeholder="系统默认检验科，如有其他地方请填写"
                    v-model="form2Info.destination"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="运送工具："
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
                <el-form-item label="运送标本："
                  label-width="130px"
                  prop="remark">
                  <div>急诊标本</div>
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in jzList"
                      :key="index"
                      :class="item.isSelected === 'true'?'active':''"
                      @click="jzClick(item,index)">
                      {{item.sampleName}}
                      <i v-if="item.isDeleteAllow === 'true'" @click="delJz(item,index)" class="iconfont delbtn">&#xe61b;</i>
                    </div>
                    <div class="li addli" @click="addHandle('急诊标本')">+</div>
                  </div>
                  <div>常规标本</div>
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in cgList"
                      :key="index"
                      :class="item.isSelected === 'true'?'active':''"
                      @click="cglick(item,index)">
                      {{item.sampleName}}
                      <i v-if="item.isDeleteAllow === 'true'" @click="delCg(item,index)" class="iconfont delbtn">&#xe61b;</i>
                    </div>
                    <div class="li addli" @click="addHandle('常规标本')">+</div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注："
                  label-width="130px"
                  prop="remark">
                  <el-input type="textarea"
                    placeholder="请输入描述，不超过300字"
                    show-word-limit
                    :rows="4"
                    v-model="form2Info.remark"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
      <!-- 添加标本 -->
    <el-dialog :visible="visible"
      class="dialog-wrapper"
      width="25%"
      title='添加标本名称'
      :before-close="_itemHandleClose">
      <div class="group p-clear">
        <el-input placeholder="不超过15个字" v-model="specimenName" maxlength="15"></el-input>
      </div>
      <div
        style="text-align:center; padding-top:10px;margin-top:10px;">
        <el-button round @click="_itemHandleClose" style="color:#FF8C00;border-color:#FF8C00;">取消</el-button>
        <el-button round
          type="primary" @click="addSpecimenHandle">添加</el-button>
      </div>
    </el-dialog>
    </Container>
  </ContainerGroup>
</template>
<script>
import { dictByCategoryId } from './../../../apis/commonApi'
import { getAreaList, selectTaskOrderByTaskTypes, updTaskTransportSample } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'edit',
  data () {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
      formInfo: {
        taskType: '',
        taskTypeName: '陪检',
        objTypeName: '',
        applicantUser: '',
        userId: '',
        applicantPhone: '',
      },
      form2Info: {
        taskObjectType: '',
        areaId: '',
        urgentLevel: '',
        applicantUser: '',
        applicantPhone: '',
        transportTime: '',
        destination: '',
        remark: '',
      },
      rules: {
        taskType: [{ required: true, message: '请选择任务类型', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
      },
      rules2: {
        taskObjectType: [{ required: true, message: '请选择对象类型', tirgger: "change" }],
        areaId: [{ required: true, message: '请选择病区', tirgger: "change" }],
        urgentLevel: [{ required: true, message: '请选择紧急程度', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
        transportTime: [{ required: true, message: '请选择运送时间', tirgger: "blur" }],
        // destination: [{ required: true, message: '请输入目的地', tirgger: "blur" }],
        remark: [{ required: true, message: '请输入备注', tirgger: "blur" }]
      },
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
      jzList: [],
      cgList: [],
      visible: false,
      specimenType: '',
      specimenName: '',
      tool: [],
      entrust: []
    }
  },
  mounted () {
    this._getTaskTypeList()
    this._getAreaList()
    this._getTools()
    this._getDept()
    this._getLevel()
    this._getjzList()
    this._getcgList()
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
          this.taskTypeList.forEach(element => {
            if (element.name === '标本') {
              this.formInfo.taskType = element.dictId
            }
          })
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
    // 获取急诊标本
    _getjzList () {
      let params = {
        categoryCode: 'urgentSample',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.jzList = res.data.data && res.data.data.sysDictList
          this.jzList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取常规标本
    _getcgList () {
      let params = {
        categoryCode: 'commonSample',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.cgList = res.data.data && res.data.data.sysDictList
          this.cgList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
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
    jzClick (item,index) {
      if (item.isSelected === 'true') {
        item.isSelected = 'false'
      } else {
        item.isSelected = 'true'
      }
      this.$forceUpdate()
    },
    cglick (item,index) {
      if (item.isSelected === 'true') {
        item.isSelected = 'false'
      } else {
        item.isSelected = 'true'
      }
      this.$forceUpdate()
    },
    addHandle (str) {
      this.visible = true
      this.specimenType = str
      this.specimenName = ''
    },
    _itemHandleClose () {
      this.visible = false
    },
    addSpecimenHandle () {
      if (this.specimenType === '常规标本') {
        let obj = {
          name: this.specimenName,
          isActive: false,
          isDeleteAllow: true
        }
        this.cgList.push(obj)
      } else {
        let obj = {
          name: this.specimenName,
          isActive: false,
          isDeleteAllow: true
        }
        this.jzList.push(obj)
      }
      this.visible = false
    },
    delJz (item,index) {
      this.jzList.splice(index,1)
    },
    delCg (item,index) {
      this.cgList.splice(index,1)
    },
    getDetail () {
      selectTaskOrderByTaskTypes({
        orderId: this.id
      }).then(res => {
        if (res.data.code === 200) {
          this.form2Info = res.data.data
          this.form2Info.areaId = this.form2Info.areaId.toString()
          this.form2Info.urgentLevel = this.form2Info.urgentLevel.toString()
          let tool = this.form2Info.tool?this.form2Info.tool.split(';'):''
          if (tool) {
            this.toolsList.forEach(element => {
              tool.forEach(ele => {
                if (element.name === ele) {
                  element.isActive = true
                }
              })
            })
          } 
          this.cgList = JSON.parse(this.form2Info.commonSample)
          this.jzList = JSON.parse(this.form2Info.urgentSample)
          this.$forceUpdate()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _onSubmit () {
      let parms = {
        id: this.id,
        applicantId: this.form2Info.userId,
        taskType: this.formInfo.taskType,
        areaId: this.form2Info.areaId,
        urgentLevel: this.form2Info.urgentLevel,
        applicantUser: this.form2Info.applicantUser,
        applicantPhone: this.form2Info.applicantPhone,
        taskTransportSample: {
          transportTime: this.form2Info.transportTime,
          destination: this.form2Info.destination,
          tool: this.tool.join(';'),
          remark: this.form2Info.remark
        },
        commonSampleList: this.cgList,
        urgentSampleList: this.jzList,
        source: 2
      }
      this.$refs.form2Info.validate(valid => {
        if (valid) {
          updTaskTransportSample(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
              let curIndex = ''
              subPathList.forEach((element,index) => {
                if (element.text === '运送(标本)-编辑') {
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
        background: #217DFA;
        color: #fff;
        // padding: 0 21px;
        i {
          color: #333;
        }
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