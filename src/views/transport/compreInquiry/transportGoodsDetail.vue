<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleBack">返回</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <!-- <div class="wrapper"> -->
      <div class="wrapper-table">
        <div class="form-box">
          <p class="form-title">
            基本信息
          </p>
          <!-- 陪检 -->
          <div class="form-row" v-if="isPJStatus==98">
            <el-form :model="formInfo" ref="formInfo">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="任务类型：">
                    <span>{{formInfo.taskType==98?'陪检':formInfo.taskType==99?'标本':'物品'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="任务状态：">
                    <span>{{formInfo.orderStatusName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="申请病区：">
                    <span>{{formInfo.areaName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="申请人：">
                    <span>{{formInfo.applicantUserName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="联系电话：">
                    <span>{{formInfo.applicantPhone}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="住院号：">
                    <span>{{formInfo.hospitalNo}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="病床号：">
                    <span>{{formInfo.bedNo}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="病人姓名：">
                    <span>{{formInfo.patientName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="配送工具：">
                    <el-tag v-for="(item,index) in formInfo.toolNameList" class="dscTag" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="嘱托：">
                    <el-tag v-for="(item,index) in formInfo.entrustNameList" class="dscTag" :key="index">{{item}}</el-tag>
                    <div style="margin-left:54px;margin-top:-10px;">{{formInfo.keepRemark}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- 标本 -->
          <div class="form-row" v-if="isPJStatus==99">
            <el-form :model="formInfo" ref="formInfo">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="任务类型：">
                    <span>{{formInfo.taskType==98?'陪检':formInfo.taskType==99?'标本':'物品'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="申请病区：">
                    <span>{{formInfo.areaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="紧急程度：">
                    <span>{{formInfo.urgentLevelName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="申请人：">
                    <span>{{formInfo.applicantUserName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="联系电话：">
                    <span>{{formInfo.applicantPhone}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="运送时间：">
                    <span>{{formInfo.goodsTransportTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="目的地：">
                    <span>{{formInfo.toSpace}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="运送工具：">
                    <el-tag v-for="(item,index) in formInfo.toolNameList" class="dscTag" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="运送标本/急诊标本：">
                    <el-tag v-for="(item,index) in formInfo.urgentSampleList" class="dscTag" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="常规标本：">
                    <el-tag v-for="(item,index) in formInfo.commonSampleList" class="dscTag" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- 物品 -->
          <div class="form-row" v-if="isPJStatus==100">
            <el-form :model="formInfo" ref="formInfo">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="任务类型：">
                    <span>{{formInfo.taskType==98?'陪检':formInfo.taskType==99?'标本':'物品'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="申请病区：">
                    <span>{{formInfo.areaName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="紧急程度：">
                    <span>{{formInfo.urgentLevelName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="申请人：">
                    <span>{{formInfo.applicantUserName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="联系电话：">
                    <span>{{formInfo.applicantPhone}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="运送类型：">
                    <span>{{formInfo.transportType==1?'领取':'送回'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="运送/领取时间：">
                    <span>{{formInfo.goodsTransportTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="运送/领取地：">
                    <span>{{formInfo.fromSpace}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="目的地：">
                    <span>{{formInfo.toSpace}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="物品：">
                    <el-tag v-for="(item,index) in formInfo.goodsNameList" class="dscTag" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="form-box" v-if="isPJStatus==98">
          <p class="form-title">
            检查信息
          </p>
          <div class="form-row">
            <el-form>
              <div class="hg-pannel hg-pannel-jc">
                <el-row style="line-height:3;" v-for="(item,index) in formInfo.keepCheckList" :key="index">
                  <el-col :span="6">
                    <span class="label-item">检查类型:</span><span>{{item.checkName}}</span>
                  </el-col>
                  <el-col :span="6">
                    <span class="label-item">目的地:</span><span>{{item.destinationName}}</span>
                  </el-col>
                  <el-col :span="6">
                    <span class="label-item">陪检时间:</span><span>{{item.keepTime}}</span>
                  </el-col>
                  <el-col :span="6">
                    <span class="label-item">紧急程度:</span><span>{{item.urgentFlag==1?'紧急':'不紧急'}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
        <div class="form-box" v-if="showStatus==3||showStatus==4||showStatus==2||showStatus==5||showStatus==7">
          <p class="form-title">
            受理信息
          </p>
          <div class="form-row">
            <el-form :model="formInfo" ref="formInfo">
              <!-- <el-row>
              <el-col :span="18">
                <el-form-item>
                  <el-tag class="tag-item">张主任</el-tag><span class="arrow el-icon-arrow-right"></span>
                  <el-tag class="tag-item active">admin</el-tag><span class="arrow el-icon-arrow-right"></span>
                  <el-tag class="tag-item">刘主任</el-tag>
                </el-form-item>
              </el-col>
            </el-row> -->
              <el-row>
                <el-col :span="10">
                  <el-form-item label="审批人：">
                    <span>{{formInfo.handleUserName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="审批日期：">
                    <span>{{formInfo.handlerTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="审批状态：">
                    <span>{{formInfo.handlerStatus==1?'未受理':formInfo.handlerStatus==2?'已受理':'已驳回'}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="审批意见：">
                    <span>{{formInfo.handlerRemark}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="form-box" v-if="showStatus==4||showStatus==5||showStatus==7">
          <p class="form-title">
            护工人员信息
          </p>
          <div class="form-row">
            <el-form :model="formInfo">
              <el-row style="margin-bottom:15px;">
                <el-col :span="6">
                  <span class="label-item">护工人员:</span><span>{{formInfo.nursingUserName}}</span>
                </el-col>
                <el-col :span="6">
                  <span class="label-item">联系电话:</span><span>{{formInfo.nursingPhone}}</span>
                </el-col>
              </el-row>
              <div class="hg-pannel hg-pannel-wh">
                <el-row style="line-height:3;" v-for="(item,index) in formInfo.taskTransferLog" :key="index">
                  <el-col :span="6">
                    <span class="label-item">转单时间:</span><span>{{item.createTime}}</span>
                  </el-col>
                  <el-col :span="6">
                    <span class="label-item">护工小组:</span><span>{{item.groupName}}</span>
                  </el-col>
                  <el-col :span="6">
                    <span class="label-item">护工人员:</span><span>{{item.originalUsername}}</span>
                  </el-col>
                  <el-col :span="6">
                    <span class="label-item">转单人:</span><span>{{item.transferUsername}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
        <div class="form-box" v-if="showStatus==7">
          <p class="form-title">
            完成信息
          </p>
          <div class="form-row">
            <el-form>
              <el-row>
                <el-col :span="8">
                  <div class="marginbottom">照片凭证</div>
                  <div style="display: flex;flex-wrap: wrap;">
                    <div class="img-box" v-for="(item, index) in formInfo.taskOrderDetail&&formInfo.taskOrderDetail.images.split(';')" :key="index">
                      <div class="img">
                        <img :src="item" alt="" width="100%" height="100%">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="完成描述:">
                    <span>{{formInfo.taskOrderDetail&&formInfo.taskOrderDetail.remark}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="签名:">
                    <div class="sigerName"><img :src="formInfo.taskOrderDetail&&formInfo.taskOrderDetail.signature" alt="" width="100%" height="100%"></div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </Container>
    <!-- </div> -->
  </ContainerGroup>
</template>
<script>
  import {
    selectTaskOrderByTaskTypes
  } from './../../../apis/taskList/indexApi'
  export default {
    name: 'transportGoodsDetail',
    data() {
      return {
        showStatus: 1,
        isPJStatus: 98, //默认陪检
        recordfileList: [],
        formInfo: {

        },
      }
    },
    created() {
      this.isPJStatus = this.$route.query.projectType
      this.lookRecordDataById(this.$route.query.id)
    },
    methods: {
      handleBack() { //返回
        this.$router.go(-1)
      },
      lookRecordDataById(value) { //查看数据
        let param = {
          id: value
        }
        selectTaskOrderByTaskTypes(param).then(res => {
          if (res.data.code == 200) {
            let result = res.data.data || {}
            this.showStatus = result.orderStatus
            this.formInfo = result
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-form-item {
    margin-bottom: auto !important;
  }

  .img-box {
    width: 25%;
    min-width: 120px;
    padding-right: 5px;
    box-sizing: border-box;

    .img {
      height: 80px;
      display: inline-block;
    }
  }

  .label-item::after {
    padding-right: 12px;
    content: '';
  }

  .tag-item {
    min-width: 80px;
    text-align: center;

    &.active {
      background: #2265f9;
      color: #ffffff;
      border: none;
    }
  }

  .arrow {
    margin: 0px 15px;
  }

  .margintop {
    margin-top: 20px;
  }

  .marginbottom {
    margin-bottom: 20px;
  }

  .sigerName {
    display: inline-block;
    width: 120px;
    height: 80px;
  }

  .hg-pannel {
    // background: #ececec;
    margin-left: -9px;
    padding: 10px 10px 5px 10px;
    box-sizing: border-box;
    border-radius: 4px;
    max-height: 300px;
  }

  .hg-pannel-wh,
  .hg-pannel-jc {
    max-height: 200px;
    overflow-y: auto;
  }

  .dscTag {
    display: inline-block;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    opacity: 1;
    background: #2265f9;
    border-radius: NaNpx;
    color: #ffffff;

  }

  .filDel {
    display: none;
    cursor: pointer;
  }

  .a-visited:hover {
    .filDel {
      display: inline-block;
    }


  }

  .a-filDel {
    width: 120px;
    height: 45px;
    display: inline-block;
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

  }

  .wrapper-top {
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
    line-height: 45px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }

  .btn {
    float: right;
    width: 92px;
    line-height: 35px;
    height: 35px;
    opacity: 1;
    background: #ffffff;
    border: 2px solid #ff8c00;
    text-align: center;
    border-radius: 22px;
    cursor: pointer;
  }

  .apbtn {
    margin-left: 25px;
    background: #ff8c00;
    color: #ffffff;
  }

  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    height: calc(100vh - 245px);
    overflow-y: auto;
    padding: 10px 15px;

    .form-box {
      border: 1px solid #e5e5e5;

      .form-title {
        border-bottom: 1px solid #e5e5e5;
        line-height: 35px;
        padding-left: 30px;
        font-weight: bold;
        text-align: left;
        color: #333333;
      }

      .form-row {
        padding: 15px 30px;
      }
    }

    .table-box {
      border-bottom: 1px solid #e5e5e5;
      border-top: none;
    }

    .table-content {
      padding: 10px 20px;
      // height: 35vh;
      overflow: scroll;
    }
  }
</style>