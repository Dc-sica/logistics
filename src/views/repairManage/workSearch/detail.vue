<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_goback">返回</el-button>
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
                  <div style="display: flex;flex-wrap: wrap;">
                    <div class="img-box" v-for="(item, index) in fileList" :key="index">
                      <div class="img">
                        <img :src="item.url" alt="" width="100%" height="100%">
                      </div>
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
            <el-col :span="20">
              <div class="h30"><span>派工日期：</span>{{formInfo.dispatchTime}}</div>
            </el-col>
          </el-row>
          <el-row>
            <div class="p-clear" v-for="(item, index) in workerList" :key="index">
              <el-col :span="8">
                <div class="h30"><span>维修组：</span>{{item.groupName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="h30"><span>维修人：</span>{{item.userName}}</div>
              </el-col>
              <el-col :span="7">
                <div class="h30"><span>联系电话：</span>{{item.phone}}</div>
              </el-col>
            </div>
          </el-row>
          <el-row style="background-color:#ececec;">
            <div class="p-clear" v-for="(item, index) in transferList" :key="index">
              <el-col :span="4">
                <div class="h30"><span>维修组：</span>{{item.groupName}}</div>
              </el-col>
              <el-col :span="6">
                <div class="h30"><span>维修人：</span>{{item.originUserName}}</div>
              </el-col>
              <el-col :span="6">
                <div class="h30"><span>转单人：</span>{{item.transferUserName}}</div>
              </el-col>
              <el-col :span="8">
                <div class="h30"><span>转单时间：</span>{{item.createTime}}</div>
              </el-col>
            </div>
          </el-row>
        </div>
        <div v-if="formInfo.repairStatusName == '已完成'">
          <div class="p-clear" v-for="(item, index) in repairOrderDetailList" :key="index">
            <p class="form-title bt">
              维修信息
            </p>
            <div>
              <el-col :span="12">
                <div class="h40 fl"><span>维修前照片：</span></div>
                <div style="display: flex;flex-wrap: wrap;">
                  <div class="img-box" v-for="(item, index) in berforeList" :key="index">
                    <div class="img">
                      <img :src="item.url" alt="" width="100%" height="100%">
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="h40 fl"><span>维修后照片：</span></div>
                <div style="display: flex;flex-wrap: wrap;">
                  <div class="img-box" v-for="(item, index) in afterList" :key="index">
                    <div class="img">
                      <img :src="item.url" alt="" width="100%" height="100%">
                    </div>
                  </div>
                </div>
              </el-col>
            </div>
            <el-col :span="24">
              <div class="h40 fl"><span>维修描述：</span>{{item.remark ? item.remark : '' }}</div>
            </el-col>
            <el-col :span="12">
              <div class="h40 fl"><span>签名：</span></div>
              <div class="fileName" v-if="item.signature">
                <img :src="item.signature" alt="">
              </div>
            </el-col>
          </div>
        </div>
        <p class="form-title bt" v-if="formInfo.commentStatus == 2">
          评价信息
        </p>
        <div class="form-row1" v-if="formInfo.commentStatus == 2">
          <el-row>
            <el-col>
              <div class="h40">评分人：{{formInfo.createBy}}</div>
            </el-col>
            <el-col>
              <div class="h40">评分：{{formInfo.mark}}</div>
            </el-col>
            <el-col>
              <div class="h40">评价：{{formInfo.commentRemark}}</div>
            </el-col>
          </el-row>
        </div>
        <!-- v-if="formInfo.commentStatus == 2" -->
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    detail
  } from './../../../apis/teamTask/indexApi'
  export default {
    name: 'workSearchDetail',
    data() {
      return {
        id: this.$route.query.id,
        repairOrderDetailList: [],
        afterList: [],
        berforeList: [],
        drawerView: false,
        formInfo: {},
        form2Info: {},
        rules2: {
          workerGroup: [{
            required: true,
            message: '请选择维修组',
            tirgger: "change"
          }],
          worker: [{
            required: true,
            message: '请选择维修人',
            tirgger: "change"
          }],
          phone: [{
            required: true,
            message: '请输入联系电话',
            tirgger: "blur"
          }],
        },
        tableData: [],
        workerList: [],
        warehouseList: [],
        supplierList: [],
        deptList: [],
        selectMaterial: [],
        typesData: [],
        materialList: [],
        liList: [],
        remark: '',
        fileList: [],
        audioUrl: '',
        is_play: false,
        videoSrc: '',
        transferList: []
      }
    },
    mounted() {

    },
    created() {
      const id = this.$route.query.id
      detail(id).then(res => {
        if (res.data.code === 200) {
          // console.log(res)
          this.formInfo = res.data.data
          // this.liList = res.data.data.equipmentLabels
          res.data.data.equipmentLabels.forEach(item => {
            if (item !== null) {
              this.liList = res.data.data.equipmentLabels
            }
          })
          this.workerList = res.data.data.repairOrderUserList
          this.repairOrderDetailList = res.data.data.repairOrderDetailList
          if (this.formInfo.repairOrderUserList !== null) {
            res.data.data.repairOrderUserList.forEach(item => {
              if (item.repairTransferLog !== null) {
                this.transferList.push(item.repairTransferLog)
              }
            })
          } else {
            this.transferList = []
          }
          if (this.formInfo.repairImages !== '' && this.formInfo.repairImages !== null) {
            let arr = this.formInfo.repairImages.split(';')
            arr.forEach(element => {
              let obj = {
                url: element
              }
              this.fileList.push(obj)
              // this.fileList = this.fileList.concat(obj)
            })
          } else {
            this.fileList = []
          }
          // 已完成状态下的维修信息
          if (this.repairOrderDetailList !== null) {
            this.repairOrderDetailList.forEach(item => {
              if (item !== null) {
                if (item.repairBeforeImages !== '') {
                  let arr = item.repairBeforeImages.split(';')
                  arr.forEach(element => {
                    let obj = {
                      url: element
                    }
                    this.berforeList.push(obj)
                  })
                }
                if (item.repairAfterImages !== '') {
                  let arr1 = item.repairAfterImages.split(';')
                  arr1.forEach(element => {
                    let obj = {
                      url: element
                    }
                    this.afterList.push(obj)
                  })
                }
              }
            })
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    methods: {
      _goback() {
        this.$router.push('/workSearch')
      },
      liClick(item, index) {
        if (item.isActive) {
          item.isActive = false
        } else {
          item.isActive = true
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .img-box {
    // width: 30%;
    width: 100px;

    .img {
      // width: 30%;
      height: 100px;
      // min-width: 100px;
      display: inline-block;
      margin: 10px 10px;
    }
  }

  .h30 {
    height: 36px;
    line-height: 36px;
  }

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
    min-width: 858px;

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

    // .imgDiv {
    //   position: relative;
    //   float: left;
    //   margin: 0 18px 20px 0;
    //   border-radius: 5px;
    // }

    // img {
    //   display: block;
    //   width: 130px;
    //   height: 80px;
    //   border-radius: 5px;
    // }

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