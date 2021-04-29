<template>
  <ContainerGroup>
    <Container>
      <el-button class="goback" @click="goback">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="group">
        <span>姓名：{{detail.userName}}</span>
      </div>
      <div class="group">
        <span>性别：{{detail.sex === 0 ? '男':'女'}}</span>
      </div>
      <div class="group">
        <span>科室：{{detail.deptName}}</span>
      </div>
      <div class="group">
        <span>反馈时间：{{detail.feedBackTime}}</span>
      </div>
      <div class="group">
        <div>反馈内容：{{detail.opinionContent}}</div>
        <div class="img p-clear" v-if="picArr.length > 0">
          <!-- <img v-for="(item,index) in picArr" :key="index" :src="item" alt=""> -->
          <el-image style="width: 100px; height: 100px;margin-right:20px;" v-for="(item,index) in picArr" :key="index" :src="item" :preview-src-list="picArr">
          </el-image>
        </div>
      </div>
      <div class="group mt15 p-clear">
        <span class="sp">回复：</span>
        <el-input placeholder="请输入内容" type="textarea" class="textarea" v-model="reply" maxlength="300">
        </el-input>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    getDetail,
    getReply
  } from './../../../apis/customerFeedback/indexApi'
  export default {
    name: 'customerFeedbackReply',
    data() {
      return {
        id: this.$route.query.id,
        detail: {},
        reply: '',
        picArr: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      goback() {
        this.$router.go(-1)
      },
      _getDetail() {
        getDetail(this.id).then(res => {
          if (res.data.code === 200) {
            this.detail = res.data.data
            if (this.detail.pictureUrl === null || this.detail.pictureUrl === '') {
              this.picArr = []
            } else {
              this.picArr = this.detail.pictureUrl.split(';')
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      submit() {
        let parms = {
          "opinionId": this.id,
          "replyContent": this.reply
        }
        getReply(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success('回复成功')
            this.$router.go(-1)
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .textarea {
    float: left;
    width: 70%;
    height: 200px;

    .el-textarea__inner {
      height: 100%;
    }
  }
</style>
<style lang="less" scoped>
  .group {
    line-height: 40px;
    color: #333;
    word-break: break-all;

    .sp {
      float: left;
      line-height: 1;
    }

    .textarea {
      float: left;
      width: 70%;
      .el-textarea__inner {
        height: 100%;
      }
    }

    .img {
      padding-left: 65px;
    }

    img {
      display: block;
      float: left;
      width: 150px;
      height: 100px;
      margin-right: 10px;
    }
  }

  .mt15 {
    margin-top: 15px;
  }

  .btn {
    margin-top: 130px;
    text-align: center;

    .goback {
      color: #FF8C00;
      width: 70px;
      border-radius: 20px;
      border-color: #FF8C00;
    }

    .submit {
      border-radius: 20px;
      width: 70px;
    }
  }
</style>