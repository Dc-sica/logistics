<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_goback">返回</el-button>
      <el-button type="primary" v-if="repairStatus === '4' && orderType !== '1'" @click="_onSubmit">接单</el-button>
      <el-button type="primary" v-if="repairStatus === '4' && orderType === '1'" @click="_robSubmit">抢单</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="form-box">
        <p class="form-title">
          报修信息
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo" ref="formInfo">
              <el-col :span="12">
                <div class="h40"><span>维修单号：</span>{{formInfo.repairOrderNumber}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>报修状态：</span>{{formInfo.repairStatusName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>报修部门：</span>{{formInfo.deptName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>紧急程度：</span>{{formInfo.urgentLevelName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>报修人：</span>{{formInfo.repairUserName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>报修电话：</span>{{formInfo.repairPhone}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>申请人：</span>{{formInfo.applicantName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>联系电话：</span>{{formInfo.applicantPhone}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>设备/设施分类：</span>{{formInfo.equipmentTypeName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>设备位置：</span>{{formInfo.location}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>报修设备/设施：</span>{{formInfo.equipmentName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>报修日期：</span>{{formInfo.repairTime}}</div>
              </el-col>
              <el-col :span="24">
                <div class="h40 fl"><span>报修描述：</span></div>
                <div class="ul p-clear">
                  <div class="li active" v-for="(item,index) in liList" :key="index">
                    <i class="el-icon-check"></i>{{item.name}}
                  </div>
                </div>
                <div class="remark">{{formInfo.remark}}</div>
              </el-col>
              <div class="p-clear">
                <el-col :span="12">
                  <div class="h40 fl"><span>报修图片：</span></div>
                  <div class="fileName fl">
                    <div class="imgDiv" v-for="(item, index) in fileList" :key="index">
                      <img :src="item.url" alt="">
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="h40 fl"><span>报修视频：</span></div>
                  <div class="fileName" v-if="formInfo.repairVideo">
                    <video :src="formInfo.repairVideo" type="video/mp4" width="400" controls="controls"></video>
                  </div>
                </el-col>
              </div>
              <el-col :span="12">
                <div class="h40 fl"><span>报修语音：</span></div>
                <div class="fileName" v-if="formInfo.repairVoice">
                  <audio ref="audio" controls="controls" :src="formInfo.repairVoice"></audio>
                </div>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt">
          受理信息
        </p>
        <div class="form-row p-clear">
          <el-col :span="12">
            <div class="h40"><span>审批人：</span>{{formInfo.handlerUser}}</div>
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
          维修人信息
        </p>
        <div class="form-row1">
          <el-row>
            <el-form>
              <div class="dispatchTime">派工日期：{{formInfo.dispatchTime}}</div>
              <div class="p-clear" v-for="(item, index) in workerList" :key="index">
                <el-col :span="8">
                  <el-form-item label="维修组：">
                    {{item.groupName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="维修人：">
                    {{item.userName}}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话：">
                    {{item.phone}}
                  </el-form-item>
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
  import {
    repairOrderDetail
  } from './../../../apis/repairManage/indexApi'
  import {
    operationOrder
  } from './../../../apis/repairManage/myRepairApi'

  export default {
    name: 'getOrder',
    data() {
      return {
        id: this.$route.query.id,
        repairStatus: this.$route.query.repairStatus,
        orderType: this.$route.query.orderType,
        formInfo: {},
        workerList: [],
        liList: [],
        fileList: []
      }
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      _goback() {
        this.$router.push('/myRepair')
      },
      getDetail() {
        let parms = {
          id: this.id
        }
        repairOrderDetail(parms).then(res => {
          if (res.data.code === 200) {
            this.formInfo = res.data.data
            this.liList = res.data.data.equipmentLabels
            this.workerList = res.data.data.repairOrderUserList
            if (this.formInfo.repairImages !== '' && this.formInfo.repairImages !== null) {
              let arr = this.formInfo.repairImages.split(';')
              arr.forEach(element => {
                let obj = {
                  url: element
                }
                this.fileList.push(obj)
              })
            } else {
              this.fileList = []
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _onSubmit() {
        operationOrder({
          id: Number(this.id)
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
            let curIndex = ''
            subPathList.forEach((element, index) => {
              if (element.text === '接单') {
                curIndex = index
              }
            })
            subPathList.splice(curIndex, 1)
            localStorage.setItem('subPath', JSON.stringify(subPathList))
            this.$router.push('/myRepair')
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      _robSubmit() {
        operationOrder({
          id: Number(this.id)
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
            let curIndex = ''
            subPathList.forEach((element, index) => {
              if (element.text === '抢单') {
                curIndex = index
              }
            })
            subPathList.splice(curIndex, 1)
            localStorage.setItem('subPath', JSON.stringify(subPathList))
            this.$router.push('/myRepair')
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .h40 {
    height: 36px;
    line-height: 36px;

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

  .form-box {
    border: 1px solid #e5e5e5;

    .form-title {
      border-bottom: 1px solid #e5e5e5;
      line-height: 44px;
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
      line-height: 32px;
      text-align: center;
      border: 1px solid #e8eaed;
      border-radius: 6px;
      padding: 0 15px;
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
      padding: 0 15px;
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
</style>