<template>
  <ContainerGroup>
    <Container>
      <el-button @click="goback">取消</el-button>
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
      <div class="group">
        <div>回复：{{detail.replyContent}}</div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    getDetail
  } from './../../../apis/customerFeedback/indexApi'
  export default {
    name: 'customerFeedbackDetail', //反馈详情
    data() {
      return {
        id: this.$route.query.id,
        detail: {},
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
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .group {
    line-height: 40px;
    color: #333;
    word-break: break-all;

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
</style>