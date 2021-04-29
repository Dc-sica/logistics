<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleReturn">返回</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="wrapper">
        <div class="wrapper-header">
          <div class="title">
            <span class="info">基本信息</span>
            <span @click="handleLookDetail" class="link">查看详情<span class="el-icon-arrow-right"></span></span>
          </div>
          <div class="wrapper-header-pannel">
            <div class="imgbox">
              <div class="img"><img :src="!baseform.baseUrl?'../../../assets/image/repaiimg.png':baseform.baseUrl" alt="暂无图片" width="100%" height="100%"></div>
            </div>
            <el-form class="form formpadding" ref="form" :model="baseform" label-width="120px">
              <el-row class="row-pannel">
                <el-col :span="25">
                  <el-form-item label="设备名称：">
                    <span class="label-item">{{baseform.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="设备状态：">
                    <span class="label-item">{{baseform.status==1?'开启':'关闭'}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="型号：">
                    <span class="label-item">{{baseform.model}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="设备分类：">
                    <span class="label-item">{{baseform.typeName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="设备编号：">
                    <span class="label-item">{{baseform.code}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="25">
                  <el-form-item label="品牌：">
                    <span class="label-item" v-for="(item,index) in baseform.brandNameList" :key="index">{{item}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="设备位置：">
                    <span class="label-item">{{baseform.location}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="购置日期：">
                    <span class="label-item">{{baseform.buyDate}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="使用年限：">
                    <span class="label-item">{{baseform.usefulYears}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="25">
                  <el-form-item label="保修日期：">
                    <span class="label-item">{{baseform.repairEndDate}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="wrapper-body">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane class="ffff" label="维修记录" name="first">
              <div class="wrapper-body-pannel">
                <div class="time-pannel">
                  <div class="time-pannel-item" :class="[item.flag?'time-pannel-item-bg':'time-pannel-item-bgno']" @click="handleRecordinfo(item)" v-for="(item,index) in wxRecordList" :key="index">
                    <div class="border" :class="[item.flag?'borderbg':'bordernobg']"></div>
                    <div class="time-content">
                      <p>报修日期：<span>{{item.repairTime}}</span></p>
                      <p>报修部门：<span>{{item.deptName}}</span></p>
                      <p>报修人：<span>{{item.repairUserName}}</span></p>
                    </div>
                  </div>
                </div>
                <div class="detail-pannel">
                  <div class="title" v-if="wxRecordList.length>0">
                    <span class="info">报修信息</span>
                    <span @click="handleLookBxDetail" class="link">查看详情<span class="el-icon-arrow-right"></span></span>
                  </div>
                  <el-form class="form formpadding" ref="form" :model="form" label-width="120px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="维修单号：">
                          <span>{{form.repairOrderNumber}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="报修状态：">
                          <span>{{form.repairStatus}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修部门：">
                          <span>{{form.deptName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="紧急程度：">
                          <span>{{form.urgentLevel}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修人：">
                          <span>{{form.repairUserName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="报修电话：">
                          <span>{{form.repairPhone}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="申请人：">
                          <span>{{form.applicantName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话：">
                          <span>{{form.repairPhone}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修分类：">
                          <span>{{form.equipmentTypeName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="报修位置：">
                          <span>{{form.location}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修设备/设施：">
                          <span>{{form.equipmentName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="报修日期：">
                          <span>{{form.repairTime}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修描述：">
                          <el-tag v-for="(item,index) in form.labelsNameList" class="dscTag" :key="index"><span class="dscTag-img"><img :src="imgUrl" width="100%" height="100%"></span>{{item}}</el-tag>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="form.remark">
                      <el-col :span="24">
                        <el-form-item>
                          <div style="border:1px solid #E8EAED;padding:10px 15px;">{{form.remark}}</div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修图片：">
                          <div class="img-box" v-if="repairImagesList.length>0">
                            <div class="img" v-for="(item,index) in repairImagesList" :key="index"><img :src="item" alt="" width="100%" height="100%"></div>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="报修视频：">
                          <div class="fileName" v-if="form.repairVideo">
                            <video :src="form.repairVideo" type="video/mp4" width="400" controls="controls"></video>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="报修语音：">
                          <div class="fileName" v-if="form.repairVoice">
                            <audio ref="audio" controls="controls" :src="form.repairVoice"></audio>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                  <div class="title" style="border-top:1px solid #E8EAED;">
                    <span class="info">维修人信息</span>
                  </div>
                  <el-form class="form formpadding" ref="form" :model="form" label-width="120px">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="派工时间：">
                          <span>{{form.dispatchTime}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row class="list-wx" v-for="(item,index) in form.repairOrderUserList" :key="index">
                      <el-col :span="8">
                        <el-form-item label="维修组：">
                          <span>{{item.groupName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="维修人：">
                          <span>{{item.userName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="联系电话：">
                          <span>{{item.phone}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="保养记录" name="second">保养记录</el-tab-pane>
            <el-tab-pane label="巡检记录" name="third">巡检记录</el-tab-pane>
          </el-tabs>
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
    lookRecordById,
    getEquipmentRepairInfo
  } from './../../../apis/logisticsEquipment/index'
  export default {
    name: 'detail',
    data() {
      return {
        imgUrl: require('../../../assets/image/hqduihao.png'),
        baseform: {
          baseUrl: '',
        },
        imgSrc: require('../../../assets/image/ewm.png'),
        form: {},
        activeName: 'first',
        wxRecordList: [],
        repairImagesList: [], //报修图片
        repairVideoList: [], //报修视频
        repairVoiceList: [], //报修语音
        bxId: '',
      }
    },
    created() {

    },
    mounted() {
      this.lookRecordDataById(this.$route.query.id)
      this.getEquipmentRepairInfoData(this.$route.query.id)
    },
    methods: {
      handleLookBxDetail() { //报修详情查看
        this.$router.push({
          path: '/repairRegister/detail',
          query: {
            id: this.bxId
          }
        })
      },
      handleRecordinfo(row) { //获取维修记录详情
        this.wxRecordList.forEach(item => {
          if (row.repairId === item.repairId) {
            item.flag = true
          } else {
            item.flag = false
          }
        })

        let param = {
          id: row.repairId
        }
        this.bxId = row.repairId
        repairOrderDetail(param).then(res => {
          if (res.data.code == 200) {
            let result = res.data.data
            this.form = result
            if (result.repairImages) { //图片
              this.repairImagesList = result.repairImages.split(';')
            }
            if (result.repairVideo) { //视频
              this.repairVideoList = result.repairVideo.split(';')
            }

            if (result.repairVoice) { //语音
              this.repairVoiceList = result.repairVoice.split(';')
            }

          }
        })
      },
      getEquipmentRepairInfoData(value) { //获取设备维修记录
        let param = {
          id: value
        }
        getEquipmentRepairInfo(param).then(res => {
          if (res.data.code == 200) {
            let result = res.data.data
            this.wxRecordList = result.map((item, index) => {
              if (index == 0) {
                item.flag = true
                this.handleRecordinfo(item)
                this.bxId = item.repairId
              } else {
                item.flag = false
              }
              return item
            })
            this.wxRecordList = JSON.parse(JSON.stringify(this.wxRecordList))
          }
        })
      },
      lookRecordDataById(value) { //查看数据
        let param = {
          id: value
        }
        lookRecordById(param).then(res => {
          if (res.data.code == 200) {
            let result = res.data.data || {}
            this.baseform = result
            setTimeout(() => {
              if (result.equipmentPictureList && result.equipmentPictureList.length > 0) { //图片
                result.equipmentPictureList.forEach((item, index) => {
                  if (index == 0) {
                    this.baseform.baseUrl = item
                    this.$set(this.baseform, this.baseform)
                  }
                })
              }
            }, 100)
          }
        })
      },
      handleReturn() { //返回
        this.$router.push('/equipmentReport')
      },
      handleLookDetail() { //查看详情
        this.$router.push({
          path: '/equipmentRecord/detail',
          query: {
            id: this.$route.query.id
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style lang="less" scoped>
  ::v-deep .el-col-25 {
    width: 20%;
  }

  .list-wx {
    overflow-y: auto;
  }

  .row-pannel {
    display: flex;
    flex-wrap: wrap;
  }

  .label-item {
    display: inline-block;
    min-width: 100px;
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

  .formpadding {
    padding: 10px 15px;
  }

  .dscTag {
    display: inline-block;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    opacity: 1;
    background: #2265F9;
    color: #ffffff;

    .dscTag-img {
      display: inline-block;
      width: 16px;
      height: 16px;
      position: relative;
      top: 4px;
      margin-right: 5px;
    }
  }

  .wrapper {
    background-color: #FFFFFF;
    // padding: 15px 15px;
    box-sizing: border-box;
    overflow: auto;

    .wrapper-header {
      border: 1px solid #E8EAED;

      .wrapper-header-pannel {
        display: flex;
        padding: 10px 15px;

        .imgbox {
          flex: 0 0 100px;
          display: flex;
          justify-content: center;
          align-items: center;

          .img {
            height: 80px;
          }
        }

        .form {
          flex: 1;
        }
      }
    }

    .title {
      height: 30px;
      border-bottom: 1px solid #E8EAED;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      padding: 0px 15px;

      .info {
        font-size: 16px;
      }

      .link {
        color: #2265F9;
        cursor: pointer;
      }
    }


    .wrapper-body {
      margin-top: 20px;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #E8EAED;

      .wrapper-body-pannel {
        display: flex;
        flex-direction: row;
        height: 800px;

        .img-box {

          .img {
            width: 30%;
            height: 100px;
            min-width: 100px;
            display: inline-block;
            margin-right: 10px;
          }
        }

        .time-pannel {
          flex: 0 0 200px;
          margin-right: 20px;
          overflow-y: auto;

          .time-pannel-item {
            box-sizing: border-box;
            border: 1px solid #E8EAED;
            margin-bottom: 15px;
            display: flex;

            .border {
              width: 8px;
              // background-color: #fff;
              border-radius: 4px 0px 0px 4px;
            }

            .time-content {
              padding: 10px 15px;

            }

            p {
              line-height: 2;
            }

            &:hover {
              .border {
                background: #2265F9;
              }
            }
          }

          .time-pannel-item:hover {
            cursor: pointer;
            background-color: #E8EAED;
          }
        }

        .borderbg {
          background: #2265F9;
        }

        .bordernobg {
          background: #fff;
        }

        .time-pannel-item-bg {
          background-color: #E8EAED;
        }

        .time-pannel-item-bgno {
          background-color: white;
        }

        .detail-pannel {
          flex: 1;
          border: 1px solid #E8EAED;
          border-radius: 4px;

        }
      }
    }
  }
</style>