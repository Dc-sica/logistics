<template>
  <ContainerGroup class="wrapper">
    <Container>
      <el-button @click="_goback">返回</el-button>
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
                  <div  style="margin-left:105px;">
                    <div class="li active" 
                      v-for="(item,index) in urgentSampleList"
                      :key="index">
                      {{item.sampleName}}
                    </div>
                  </div>
                  
                </div>
                <div class="ul p-clear" style="margin-left:105px;">
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
          病人信息
        </p>
        <div class="form-row p-clear" v-show="type === '陪检'">
          <el-col :span="12">
            <div class="h40"><span>申请病区：</span>{{formInfo.areaName}}</div>
          </el-col>
          <el-col :span="12" v-show="type === '陪检'">
            <div class="h40"><span>住院号：</span>{{formInfo.hospitalNo}}</div>
          </el-col>
          <el-col :span="12" v-show="type === '陪检'">
            <div class="h40"><span>病人姓名：</span>{{formInfo.patientName}}</div>
          </el-col>
          <el-col :span="12" v-show="type === '陪检'">
            <div class="h40"><span>病床号：</span>{{formInfo.bedNo}}</div>
          </el-col>
        </div>
        <p class="form-title bt" v-show="type === '陪检'">
          检查信息
        </p>
        <div class="form-row p-clear" v-show="type === '陪检'">
          <div class="mt20 p-clear" v-for="(item, index) in checkList" :key="index">
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
          <el-col :span="12">
            <div class="h40"><span>护工人员：</span>{{formInfo.name}}</div>
          </el-col>
          <el-col :span="12">
            <div class="h40"><span>联系电话：</span>{{formInfo.phone}}</div>
          </el-col>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import { selectTaskOrderByTaskTypes } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'detail',
  data () {
    return {
      id: this.$route.query.id,
      type: this.$route.query.type,
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
      phone: ''
    }
  },
  mounted () {
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { name } = JSON.parse(userInfo)
      this.name = name
    }
    this.getDetail()
  },
  methods: {
    _goback () {
      this.$router.push('/projectDispatch')
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
      width: 105px;
      text-align: right;
    }
  }
  .fl {
    float: left;
  }
  .remark {
    margin: 20px 0 20px 105px;
    min-height: 80px;
    padding: 5px;
  }
  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
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
        line-height: 36px;
        text-align: center;
        border: 1px solid #e8eaed;
        border-radius: 6px;
        padding: 0 30px;
        margin-right: 15px;
        cursor: pointer;
        position: relative;
        top: 10px;
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
    .step-div {
      margin-left: 20px;
      .step {
        float: left;
        color: #fff;
        width: 238px;
        height: 51px;
        margin-right: 10px;
        box-sizing: border-box;
        text-align: center;
        background: url('../../..//assets/image/step3.png') no-repeat;
        .line51 {
          line-height: 51px;
        }
        .pt8 {
          padding-top: 8px;
        }
      }
      .step:first-child {
        background: url('../../..//assets/image/step1.png') no-repeat;
      }
      .step.cur {
        background: url('../../..//assets/image/step2.png') no-repeat;
      }
    }
    .mt20 {
      margin-top: 20px;
      .h40 {
        span {
          width: 90px;
        }
      }
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
.bot-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  margin-top: 5px;
  .cancelBtn {
    border-color: #FF8E2F;
    color: #FF8E2F;
  }
  .rejectBtn {
    background: #FF5656;
    color: #fff;
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
