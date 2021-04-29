<template>
  <ContainerGroup class="wrapper">
    <Container>
      <el-button round
        class="cancelBtn"
        @click="_goback">返回</el-button>
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
              ref="formInfo">
              <el-col :span="12">
                <div class="h40"><span>任务类型：</span>{{type}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>任务状态：</span>{{formInfo.applicantUser}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>申请人：</span>{{formInfo.orderStatusName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>联系电话：</span>{{formInfo.applicantPhone}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>申请病区：</span>{{formInfo.areaName}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '陪检'">
                <div class="h40"><span>住院号：</span>{{formInfo.hospitalNo}}</div>
              </el-col>
             <el-col :span="12" v-show="type === '陪检'">
                <div class="h40"><span>病床号：</span>{{formInfo.bedNo}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '陪检'">
                <div class="h40"><span>病人姓名：</span>{{formInfo.patientName}}</div>
              </el-col>
              <el-col :span="24" v-show="type === '陪检'">
                <div class="h40 fl"><span>配送工具：</span></div>
                <div class="ul p-clear">
                  <div class="li active" 
                  v-for="(item,index) in toolsList"
                  :key="index">
                  {{item.name}}
                  </div>
                </div>
              </el-col>
              <el-col :span="24" v-show="type === '陪检'">
                <div class="h40 fl"><span>嘱托：</span></div>
                <div class="ul p-clear">
                  <div class="li active" 
                  v-for="(item,index) in entrustList"
                  :key="index">
                  {{item.name}}
                  </div>
                </div>
                <div class="remark">{{formInfo.remark}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '物品' || type === '标本'">
                <div class="h40"><span>紧急程度：</span>{{formInfo.urgentLevelName}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '物品'">
                <div class="h40"><span>运送类型：</span>{{formInfo.transportType === 0 ? '送回':'领取'}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '物品'">
                <div class="h40"><span>运送/领取时间：</span>{{formInfo.transportTime}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '物品'">
                <div class="h40"><span>运送/领取地：</span>{{formInfo.fromSpace}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '物品'">
                <div class="h40"><span>目的地：</span>{{formInfo.toSpace}}</div>
              </el-col>
              <el-col :span="24" v-show="type === '物品'">
                <div class="h40 fl"><span>物品：</span></div>
                <div class="ul p-clear">
                  <div class="li active" 
                  v-for="(item,index) in goodsList"
                  :key="index">
                  {{item.goodName}}
                  </div>
                </div>
              </el-col>
               <el-col :span="12" v-show="type === '标本'">
                <div class="h40"><span>运送时间：</span>{{formInfo.transportTime}}</div>
              </el-col>
              <el-col :span="12" v-show="type === '标本'">
                <div class="h40"><span>目的地：</span>{{formInfo.toSpace}}</div>
              </el-col>
              <el-col :span="24" v-show="type === '标本'">
                <div class="h40 fl"><span>运送工具：</span></div>
                <div class="ul p-clear">
                  <div class="li active" 
                  v-for="(item,index) in toolsList"
                  :key="index">
                  {{item.name}}
                  </div>
                </div>
              </el-col>
              <el-col :span="24" v-show="type === '标本'">
                <div class="h40 fl"><span>运送标本：</span></div>
                <div class="ul p-clear">
                  <div class="h40">急诊标本</div>
                  <div  style="margin-left:170px;">
                    <div class="li active" 
                      v-for="(item,index) in urgentSampleList"
                      :key="index">
                      {{item.sampleName}}
                    </div>
                  </div>
                  
                </div>
                <div class="ul p-clear" style="margin-left:170px;">
                  <div class="h40">常规标本</div>
                  <div class="li active" 
                    v-for="(item,index) in commonSampleList"
                    :key="index">
                    {{item.sampleName}}
                  </div>
                </div>
              </el-col>
              <el-col :span="24" v-show="type === '物品' || type === '标本'">
                <div class="h40 fl"><span>备注：</span>{{formInfo.remark}}</div>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt" v-show="type === '陪检'">
          检查信息
        </p>
        <div class="form-row p-clear" v-show="type === '陪检'">
          <div class="mt40 p-clear" v-for="(item, index) in checkList" :key="index">
            <el-col :span="6">
              <div class="h40"><span>检查项目：</span>{{item.checkName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="h40"><span>目的地：</span>{{item.destinationName}}</div>
            </el-col>
            <el-col :span="6">
              <div class="h40"><span>陪检时间：</span>{{item.keepTime}}</div>
            </el-col>
            <el-col :span="6">
              <div class="h40"><span>紧急程度：</span>{{item.urgentFlag === 0 ? '不紧急' : '紧急'}}</div>
            </el-col>
          </div>
        </div>
        <p class="form-title bt">
          受理信息
        </p>
        <div class="form-row p-clear">
          <el-col :span="12">
            <div class="h40"><span>审批人：</span>{{formInfo.username}}</div>
          </el-col>
          <el-col :span="12">
            <div class="h40"><span>审批日期：</span>{{formInfo.handlerTime}}</div>
          </el-col>
          <el-col :span="24">
            <div class="h40"><span>审批状态：</span>{{formInfo.handlerStatus === 1 ? '未受理':(formInfo.handlerStatus === 2 ? '已受理' : '已驳回')}}</div>
          </el-col>
          <el-col :span="24">
            <div class="h40"><span>审批意见：</span>{{formInfo.handlerRemark}}</div>
          </el-col>
        </div>
        <p class="form-title bt">
          护工人员信息
        </p>
        <div class="form-row p-clear">
          <el-col :span="8">
            <div class="group p-clear">
              <span class="sp h40"><i class="red">*</i>护工人员：</span>
              <el-select placeholder="请选择" clearable v-model="nursingUserId" @change="changeNurse">
                <el-option v-for="(item,index) in nurseList" :key="index" :value="item.userId" :label="item.name"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="group p-clear">
              <span class="sp h40"><i class="red">*</i>联系电话：</span>
              <el-input class="inp" disabled v-model="phone"></el-input>
            </div>
          </el-col>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import { selectTaskOrderByTaskTypes, operationOrder, listNursingGroupUser } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'getOrder',
  data () {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
      orderStatus: this.$route.query.orderStatus,
      formInfo: {},
      toolsList: [],
      entrustList: [],
      nurseList: [],
      checkList: [],
      goodsList: [],
      urgentSampleList: [],
      commonSampleList: [],
      taskOrderNumber: '',
      patientAreaId: '',
      nursingUserId: '',
      phone: '',
      userId: ''
    }
  },
  mounted () {
    const { userId } = JSON.parse(localStorage.getItem('userInfo'))
    this.userId = userId
    this.getDetail()
  },
  methods: {
    _goback () {
      this.$router.push('/myProject')
    },
    getNurseList () {
      listNursingGroupUser({
        patientAreaId: this.patientAreaId
      }).then(res => {
        if (res.data.code === 200) {
          this.nurseList = res.data.data
          this.nurseList.forEach(element => {
            element.userId = element.userId.toString()
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
          this.formInfo = res.data.data
          let tool = this.formInfo.tool?this.formInfo.tool.split(';'):[]
          tool.forEach(element => {
            let obj = {
              name: element
            }
            this.toolsList.push(obj)
          })
          let entrust = this.formInfo.entrust?this.formInfo.entrust.split(';'):[]
          entrust.forEach(element => {
            let obj = {
              name: element
            }
            this.entrustList.push(obj)
          })
          this.checkList = this.formInfo.taskKeepCheckList
          this.goodsList = this.formInfo.goodsVoList
          if (this.formInfo.urgentSampleList) {
            this.formInfo.urgentSampleList.forEach(element => {
              if (element.isSelected === 'true') {
                this.urgentSampleList.push(element)
              }
            })
          }
          if (this.formInfo.commonSampleList) {
            this.formInfo.commonSampleList.forEach(element => {
              if (element.isSelected === 'true') {
                this.commonSampleList.push(element)
              }
            })
          }
          this.patientAreaId = this.formInfo.areaId
          this.taskOrderNumber = this.formInfo.taskOrderNumber
          this.nursingUserId = this.formInfo.userId.toString()
          this.phone = this.formInfo.phone
          this.getNurseList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    changeNurse (val) {
      this.nurseList.forEach(element => {
        if (element.userId === val) {
          this.phone = element.phone
        }
      })
    },
    _onSubmit () {
      operationOrder({
        "currentUserId": this.userId,
        "repairOrderId": this.formInfo.taskOrderId,
        "repairOrderNumber": this.taskOrderNumber,
        "userId": this.formInfo.userId
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
          let curIndex = ''
          subPathList.forEach((element,index) => {
            if (element.text === '我的任务-转单') {
              curIndex = index
            }
          })
          subPathList.splice(curIndex, 1)
          localStorage.setItem('subPath', JSON.stringify(subPathList))
          this.$router.push('/myProject')
        } else {
          this.$message.error(res.data.message)
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
  .h40 {
    height: 40px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 170px;
      text-align: right;
    }
  }
  .fl {
    float: left;
  }
  .remark {
    margin: 20px 0 20px 170px;
    min-height: 80px;
    border: 1px solid #e8eaed;
    border-radius: 6px;
    padding: 5px;
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
        .dispatchTime {
          margin: 5px 0 15px;
          color: #333;
        }
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
        i {
          font-size: 18px;
          position: relative;
          left: -2px;
          top: 1px;
        }
      }
      .li.active {
        background: #217DFA;
        color: #fff;
        padding: 0 21px;
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
      margin-top: 15px;
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
    .group {
      margin-bottom: 30px;
      .sp {
        float: left;
        width: 130px;
        text-align: right;
        .red {
          color: red;
        }
      }
      .inp {
        width: 80%;
      }
      .text {
        float: left;
        width: 90%;
      }
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