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
              <el-col :span="24">
                <el-form-item label="任务类型："
                  prop="taskType"
                  label-width="130px">
                  <el-select v-model="formInfo.taskType"
                    placeholder="请选择"
                    disabled
                    style="width:45.5%">
                      <el-option v-for="item in taskTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
            <!-- 物品 -->
            <el-form :model="form3Info"
              ref="form3Info"
              :rules="rules3">
              <el-col :span="12">
                <el-form-item label="申请病区："
                  label-width="130px"
                  prop="areaId">
                  <el-select v-model="form3Info.areaId"
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
                  <el-radio-group v-model="form3Info.urgentLevel">
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
                    v-model="form3Info.applicantUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话："
                  label-width="130px"
                  prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled
                    v-model="form3Info.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="运送类型："
                  prop="transportType"
                  label-width="130px">
                  <el-select v-model="form3Info.transportType"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in transportTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运送/领取时间："
                  label-width="130px"
                  prop="transportTime">
                  <el-date-picker style="width:100%;"
                    v-model="form3Info.transportTime"
                    type="datetime"
                    placeholder="选择运送时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运送/领取地："
                  prop="fromSpace"
                  label-width="130px">
                  <el-select v-model="form3Info.fromSpace"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in deptList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.name"></el-option>
                    <el-option label="其他" value="others"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="form3Info.otherFromSpace">
                <el-form-item label="其他运送/领取地："
                  prop="destination"
                  label-width="130px">
                  <el-input placeholder="请填写其他地址"
                    v-model="form3Info.otherFromSpace"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目的地："
                  label-width="130px"
                  prop="toSpace">
                  <el-select v-model="form3Info.toSpace"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in deptList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.name"></el-option>
                    <el-option label="其他" value="others"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="form3Info.otherToSpace">
                <el-form-item label="其他目的地："
                  prop="otherToSpace"
                  label-width="130px">
                  <el-input placeholder="请填写其他地址"
                    v-model="form3Info.otherToSpace"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="物品："
                  label-width="130px"
                  prop="remark">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in goodsList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="goodsClick(item,index)">
                      {{item.name}}
                    </div>
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
                    v-model="form3Info.remark"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import { dictByCategoryId } from './../../../apis/commonApi'
import { getAreaList, selectTaskOrderByTaskTypes, updTaskTransportGoods } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'edit',
  data () {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
      transportTypeList: [{
        dictId: '0',
        name: '送回'
      }, {
        dictId: '1',
        name: '领取'
      }],
      formInfo: {
        taskType: '',
        taskTypeName: '陪检',
        objTypeName: '',
        applicantUser: '',
        userId: '',
        applicantPhone: '',
      },
      form3Info: {
        taskObjectType: '',
        areaId: '',
        urgentLevel: '',
        applicantUser: '',
        applicantPhone: '',
        transportType: '',
        transportTime: '',
        fromSpace: '',
        otherFromSpace: '',
        toSpace: '',
        otherToSpace: '',
        remark: '',
      },
      form4Info: {},
      rules: {
        taskType: [{ required: true, message: '请选择任务类型', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
      },
      rules3: {
        taskObjectType: [{ required: true, message: '请选择对象类型', tirgger: "change" }],
        areaId: [{ required: true, message: '请选择病区', tirgger: "change" }],
        urgentLevel: [{ required: true, message: '请选择紧急程度', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
        transportTime: [{ required: true, message: '请选择运送时间', tirgger: "change" }],
        fromSpace: [{ required: true, message: '请选择领取地', tirgger: "change" }],
        toSpace: [{ required: true, message: '请输入目的地', tirgger: "blur" }],
        remark: [{ required: true, message: '请输入备注', tirgger: "blur" }]
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
      tool: [],
      entrust: [],
      goods: []
    }
  },
  mounted () {
    this._getTaskTypeList()
    this._getAreaList()
    this._getDept()
    this._getLevel()
    this._getGoods()
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
            if (element.name === '物品') {
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
    // 获取物品
    _getGoods () {
      let params = {
        categoryCode: 'goods',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.goodsList = res.data.data && res.data.data.sysDictList
          this.goodsList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    goodsClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.goods = []
      this.goodsList.forEach(element => {
        if (element.isActive) {
          this.goods.push(element.dictId)
        }
      })
      this.$forceUpdate()
    },
    getDetail () {
      selectTaskOrderByTaskTypes({
        orderId: this.id
      }).then(res => {
        if (res.data.code === 200) {
          this.form3Info = res.data.data
          this.form3Info.otherFromSpace = ''
          this.form3Info.otherToSpace = ''
          this.form3Info.areaId = this.form3Info.areaId.toString()
          this.form3Info.urgentLevel = this.form3Info.urgentLevel.toString()
          this.form3Info.transportType = this.form3Info.transportType.toString()
          let goods = this.form3Info.goods.split(';')
          this.goodsList.forEach(element => {
            goods.forEach(ele => {
              if (element.dictId === ele) {
                element.isActive = true
                this.goods.push(element.dictId)
              }
            })
          })
          let val = this.form3Info.fromSpace
          let val2 = this.form3Info.toSpace
          let arr = []
          this.deptList.forEach(element => {
            arr.push(element.name)
          })
          if (arr.indexOf(this.form3Info.fromSpace)) {
            this.form3Info.fromSpace = 'others'
            this.form3Info.otherFromSpace = val
          }
          if (arr.indexOf(this.form3Info.toSpace)) {
            this.form3Info.toSpace = 'others'
            this.form3Info.otherToSpace = val2
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _onSubmit () {
     let parms = {
       id: this.id,
        applicantId: this.form3Info.userId,
        taskType: this.formInfo.taskType,
        areaId: this.form3Info.areaId,
        urgentLevel: this.form3Info.urgentLevel,
        applicantUser: this.form3Info.applicantUser,
        applicantPhone: this.form3Info.applicantPhone,
        taskTransportGoods: {
          transportType: Number(this.form3Info.transportType),
          transportTime: this.form3Info.transportTime,
          fromSpace: this.form3Info.fromSpace === 'others'? this.form3Info.otherFromSpace: this.form3Info.fromSpace,
          toSpace: this.form3Info.toSpace === 'others'? this.form3Info.otherToSpace: this.form3Info.toSpace,
          goods: this.goods.join(';'),
          remark: this.form3Info.remark,
          taskOrderId: ''
        },
        source: 2
      }
      this.$refs.form3Info.validate(valid => {
        if (valid) {
          updTaskTransportGoods(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
              let curIndex = ''
              subPathList.forEach((element,index) => {
                if (element.text === '运送(物品)-编辑') {
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