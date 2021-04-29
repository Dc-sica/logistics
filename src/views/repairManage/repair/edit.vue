<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_goback">取消</el-button>
      <el-button type="primary" @click="_onSubmit">提交</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="form-box">
        <p class="form-title">
          新增报修
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo" ref="formInfo" :rules="rules">
              <el-col :span="12">
                <el-form-item label="报修部门：" prop="deptId" label-width="130px">
                  <el-select v-model="formInfo.deptId" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in deptList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="紧急程度：" label-width="130px" prop="urgentLevel">
                  <el-select v-model="formInfo.urgentLevel" style="width:100%" placeholder="请选择">
                    <el-option v-for="item in urgentLevelList" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报修人：" label-width="130px" @change="nameChange" prop="repairUserId">
                  <el-select v-model="formInfo.repairUserId" placeholder="请选择" style="width:100%">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="item in repairUserList" :key="item.userId" :label="item.name" :value="item.userId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报修电话：" label-width="130px" prop="repairPhone">
                  <el-input placeholder="系统生成" disabled v-model="formInfo.repairPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请人：" label-width="130px" prop="applicantName">
                  <el-input placeholder="系统生成" disabled v-model="formInfo.applicantName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" label-width="130px" prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled v-model="formInfo.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备/设施分类：" label-width="130px" @change="typeChange" prop="equipmentTypeId">
                  <el-select v-model="formInfo.equipmentTypeId" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in equipmentType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备位置：" label-width="130px" prop="location">
                  <el-input placeholder="根据设备默认显示" disabled v-model="formInfo.location"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报修设备/设施：" label-width="130px" prop="equipmentId">
                  <el-select v-model="formInfo.equipmentId" placeholder="请选择" style="width:100%">
                    <el-option v-for="item in equipmentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="报修描述：" label-width="130px" prop="remark">
                  <div class="ul p-clear">
                    <div class="li" v-for="(item,index) in liList" :key="index" :class="item.isActive?'active':''" @click="liClick(item,index)">
                      <i v-if="item.isActive" class="el-icon-check"></i>{{item.name}}
                    </div>
                  </div>
                  <el-input type="textarea" placeholder="请输入描述，不超过300字" show-word-limit :rows="4" v-model="formInfo.remark" :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
              <div class="p-clear">
                <el-col :span="12">
                  <el-form-item label="报修图片：" label-width="130px" prop="picture">
                    <div class="upDiv">
                      <input type="file" style="display:none" @change="fileUpload" ref="file" multiple />
                      <el-button type="default" class="uploadBtn" size="mini" @click="upLoadFile">上传文件</el-button>
                      <span class="tip"><i>*</i>最多上传9张图片</span>
                    </div>
                    <div class="tip">支持扩展名：jpg, png, pdf, gif, tif, bmp...</div>
                    <div class="fileName">
                      <div class="imgDiv" v-for="(item, index) in fileList" :key="index">
                        <img :src="item.url" alt="">
                        <i class="imgDelete" @click="deleteFile(index)">×</i>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="报修视频：" label-width="130px" prop="video">
                    <div class="upDiv">
                      <input type="file" style="display:none" @change="fileUpload2" ref="file2" />
                      <el-button type="default" class="uploadBtn" size="mini" @click="upLoadFile2">上传文件</el-button>
                      <span class="tip"><i>*</i>最多上传1视频</span>
                    </div>
                    <div class="tip">支持扩展名：MP4,WebM,Ogg</div>
                    <div class="fileName" v-if="formInfo.repairVideo">
                      <video :src="formInfo.repairVideo" type="video/mp4" width="400" controls="controls"></video>
                      <i class="aDelete" @click="deleteVideo">×</i>
                    </div>
                  </el-form-item>
                </el-col>
              </div>
              <el-col :span="12">
                <el-form-item label="报修语音：" label-width="130px" prop="audio">
                  <div class="upDiv">
                    <input type="file" style="display:none" @change="fileUpload3" ref="file3" />
                    <el-button type="default" class="uploadBtn" size="mini" @click="upLoadFile3">上传文件</el-button>
                    <span class="tip"><i>*</i>最多上传1个文件</span>
                  </div>
                  <div class="tip">支持扩展名：Wav, MP3, Ogg</div>
                  <div class="fileName" v-if="formInfo.repairVoice">
                    <audio ref="audio" controls="controls" :src="formInfo.repairVoice"></audio>
                    <i class="aDelete" @click="deleteAudio">×</i>
                  </div>
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
  import {
    upload,
    uploadVideo
  } from './../../../apis/commonApi'
  import {
    getAddInit,
    getEquipmentList,
    getRepairUserList,
    repairOrderDetail,
    editRepairOrder
  } from './../../../apis/repairManage/indexApi'

  export default {
    name: 'edit',
    data() {
      return {
        id: this.$route.query.id,
        drawerView: false,
        formInfo: {
          applyTime: this.$moment(new Date()).format('YYYY-MM-DD'),
        },
        formInline: {},
        formTable: {},
        rules: {
          deptId: [{
            required: true,
            message: '请选择报修部门',
            tirgger: "change"
          }],
          urgentLevel: [{
            required: true,
            message: '请选择紧急程度',
            tirgger: "change"
          }],
          repairUserId: [{
            required: true,
            message: '请选择报修人',
            tirgger: "change"
          }],
          repairPhone: [{
            required: true,
            message: '请输入报修电话',
            tirgger: "blur"
          }],
          applicantName: [{
            required: true,
            message: '请输入申请人',
            tirgger: "blur"
          }],
          applicantPhone: [{
            required: true,
            message: '请输入联系电话',
            tirgger: "blur"
          }],
          location: [{
            required: true,
            message: '请输入设备位置',
            tirgger: "blur"
          }],
          equipmentTypeId: [{
            required: true,
            message: '请选择设备/设施分类',
            tirgger: "change"
          }],
          equipmentId: [{
            required: true,
            message: '请选择报修设备/设施',
            tirgger: "change"
          }],
          remark: [{
            required: true,
            message: '请输入报修描述',
            tirgger: "blur"
          }],
        },
        tableData: [],
        deptList: [],
        urgentLevelList: [],
        equipmentType: [],
        repairUserList: [],
        equipmentList: [],
        liList: [],
        fileList: [],
        audioUrl: '',
        is_play: false,
        videoSrc: ''
      }
    },
    created() {
      this.init()
    },
    mounted() {
      this.getDetail()
    },
    methods: {
      init() {
        getAddInit().then(res => {
          if (res.data.code === 200) {
            this.userId = res.data.data.applyUser.userId
            this.formInfo.username = res.data.data.applyUser.name
            this.formInfo.userphone = res.data.data.applyUser.phone
            this.deptList = res.data.data.dept
            this.deptList.forEach(element => {
              element.dictId = element.dictId.toString()
            })
            this.urgentLevelList = res.data.data.urgentLevel
            this.urgentLevelList.forEach(element => {
              element.dictId = element.dictId.toString()
            })
            this.equipmentType = res.data.data.equipmentType
            this.equipmentType.forEach(element => {
              element.id = element.id.toString()
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
        this.equipmentLists()
      },
      equipmentLists() {
        getEquipmentList({
          typeId: this.formInfo.equipmentTypeId
        }).then(res => {
          if (res.data.code === 200) {
            this.equipmentList = res.data.data
            this.equipmentList.forEach(element => {
              element.id = element.id.toString()
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      typeChange() {
        this.equipmentLists()
      },
      deviceChange(val) {
        if (val !== '' || val !== undefined) {
          this.formInfo.deviceAddress = val.split('/')[1]
          // 获取报修描述列表
          this.equipmentList.forEach(element => {
            if (val.split('/')[0] === element.id) {
              this.liList = element.labels
              this.liList.forEach(ele => {
                ele.isActive = false
              })
            }
          })
        }
      },
      repairList() {
        getRepairUserList({
          deptId: this.formInfo.deptId
        }).then(res => {
          if (res.data.code === 200) {
            this.repairUserList = res.data.data
            this.repairUserList.forEach(element => {
              element.userId = element.userId.toString()
            })
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      deptChange() {
        this.formInfo.repairName = ''
        this.repairList()
      },
      nameChange(val) {
        val
        // 获取报修人电话
        if (val !== '' || val !== undefined) {
          this.repairUserList.forEach(element => {
            if (element.userId === val) {
              this.formInfo.repairPhone = element.phone
            }
          })
        }
      },
      _goback() {
        this.$router.push('/repairRegister')
      },
      getDetail() {
        let parms = {
          id: this.id
        }
        repairOrderDetail(parms).then(res => {
          if (res.data.code === 200) {
            res.data.data.deptId = res.data.data.deptId.toString()
            res.data.data.urgentLevel = res.data.data.urgentLevel.toString()
            res.data.data.repairUserId = res.data.data.repairUserId.toString()
            res.data.data.equipmentTypeId = res.data.data.equipmentTypeId.toString()
            res.data.data.equipmentId = res.data.data.equipmentId.toString()
            this.formInfo = res.data.data
            res.data.data.equipmentLabels.forEach(element => {
              res.data.data.repairLabels.forEach(ele => {
                if (element.dictId.toString() === ele) {
                  element.isActive = true
                } else {
                  element.isActive = false
                }
              })
            })
            this.liList = res.data.data.equipmentLabels
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
            if (this.formInfo.deptId) {
              this.repairList()
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      liClick(item, index) {
        if (item.isActive) {
          item.isActive = false
        } else {
          item.isActive = true
        }
        this.$forceUpdate()
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
        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('file', files[i])
        }
        uploadVideo(formData).then((res) => {
          if (res.data.code === 200) {
            this.formInfo.repairVideo = res.data.data[0].url
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      upLoadFile2() {
        this.$refs.file2.click()
      },
      fileUpload3(event) {
        let files = event.target.files
        let formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('file', files[i])
        }
        uploadVideo(formData).then((res) => {
          if (res.data.code === 200) {
            this.formInfo.repairVoice = res.data.data[0].url
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      upLoadFile3() {
        this.$refs.file3.click()
      },
      deleteFile(index) {
        this.fileList.splice(index, 1)
      },
      deleteVideo() {
        this.formInfo.repairVideo = ''
      },
      deleteAudio() {
        this.formInfo.repairVoice = ''
      },
      _onSubmit() {
        let repairLabels = []
        this.liList.forEach(element => {
          if (element.isActive) {
            repairLabels.push(element.dictId.toString())
          }
        })
        let repairImages = []
        this.fileList.forEach(element => {
          repairImages.push(element.url)
        })
        let parms = {
          'id': this.id,
          "deptId": Number(this.formInfo.deptId),
          "urgentLevel": Number(this.formInfo.urgentLevel),
          "repairUserId": Number(this.formInfo.repairUserId),
          "applicantId": this.formInfo.applicantId,
          "equipmentId": Number(this.formInfo.equipmentId),
          "equipmentTypeId": Number(this.formInfo.equipmentTypeId),
          "remark": this.formInfo.remark,
          "repairLabels": repairLabels,
          "repairImages": repairImages.join(';'),
          "repairVideo": this.formInfo.repairVideo,
          "repairVoice": this.formInfo.repairVoice,
          "source": 2
        }
        this.$refs.formInfo.validate(valid => {
          if (valid) {
            editRepairOrder(parms).then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message)
                let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
                let curIndex = ''
                subPathList.forEach((element, index) => {
                  if (element.text === '报修登记-编辑') {
                    curIndex = index
                  }
                })
                subPathList.splice(curIndex, 1)
                localStorage.setItem('subPath', JSON.stringify(subPathList))
                this.$router.push('/repairRegister')
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
    }

    .form-row {
      padding: 15px 30px;
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
</style>