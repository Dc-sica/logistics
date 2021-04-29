<template>
  <ContainerGroup>
    <Container height="fill" scrollY="true">
      <el-tag @click="handleTag(item)" v-for="(item,index) in tagList" :key="index" :class="['tag-item',item.flag?'active':'']" type="info">{{item.value}}</el-tag>
      <div class="wrap-body">
        <component :is='compentname' :initInfo='initInfo'></component>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import allInquiry from '../../transport/compreInquiry/allInquiry'
  import accompanyInspection from '../../transport/compreInquiry/accompanyInspection'
  import transportSpecimen from '../../transport/compreInquiry/transportSpecimen'
  import transportGoods from '../../transport/compreInquiry/transportGoods'
  import {
    mapInit
  } from './../../../apis/taskList/indexApi'
  export default {
    name: 'compreInquiry',
    components: {
      allInquiry,
      accompanyInspection,
      transportSpecimen,
      transportGoods
    },
    data() {
      return {
        initInfo: {},
        compentname: 'allInquiry',
        tagList: [{
            id: 1,
            value: '全部',
            flag: true
          },
          {
            id: 2,
            value: '陪检',
            flag: false
          },
          {
            id: 3,
            value: '运送（标本）',
            flag: false
          },
          {
            id: 4,
            value: '运送（物品）',
            flag: false
          }
        ],
      }
    },
    created() {

    },
    mounted() {
      mapInit().then(res => {
        if (res.data.code === 200) {
          console.log(res)
          this.initInfo = res.data.data
          // this.$nextTick(() => {
          // this.init()
          // })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    methods: {
      handleTag(row) {
        this.tagList.forEach(item => {
          if (item.id === row.id) {
            item.flag = true
          } else {
            item.flag = false
          }
        })
        if (row.id == 1) {
          this.compentname = allInquiry
        } else if (row.id == 2) {
          this.compentname = accompanyInspection
        } else if (row.id == 3) {
          this.compentname = transportSpecimen
        } else if (row.id == 4) {
          this.compentname = transportGoods
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-tag.el-tag--info {
    width: 110px;
    padding: 0px !important;
    text-align: center;
    color: #333;
    background: #f2f6fd;
    border-top-right-radius: 10px;
    margin-right: 7px;
    top: -1px;
    border-radius: 0px 10px 0px 0px;
    border: none;

    &.active {
      background: #217DFA;
      color: #ffffff;
    }
  }

  .el-tag {
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
    top: -1px;
    font-size: 14px;
  }

  .wrap-body {
    border: 1px solid #E8EAED;
    // padding: 20px 20px;
    box-sizing: border-box;
    height: calc(100% - 35px);
  }
</style>