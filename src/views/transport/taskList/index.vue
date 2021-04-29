<template>
  <ContainerGroup class="wrap">
    <Container height="fill" scrollY="true">
      <el-tag :class="activeIndex === index ? 'active' : ''" v-for="(item,index) in groupList" :key="index" @click="tagClick(item,index)" type="info">{{item.value}}</el-tag>
      <div class="wrap-body">
        <component :is='compentname' :initInfo='initInfo'></component>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    mapInit
  } from './../../../apis/taskList/indexApi'
  import {
    getInfo
  } from './../../../apis/teamTask/indexApi'
  export default {
    name: 'taskList',
    components: {
      whole(resolve) {
        require(['../../transport/taskList/whole'], resolve)
      },
      accInspection(resolve) {
        require(['../../transport/taskList/accInspection'], resolve)
      },
      specimen(resolve) {
        require(['../../transport/taskList/specimen'], resolve)
      },
      goods(resolve) {
        require(['../../transport/taskList/goods'], resolve)
      }
    },
    data() {
      return {
        groupId: 0,
        initInfo: {},
        compentname: '',
        activeIndex: 0,
        groupList: [{
            id: 1,
            value: '全部',
            componentName: 'whole'
          },
          {
            id: 2,
            value: '陪检',
            componentName: 'accInspection'
          },
          {
            id: 3,
            value: '运送（标本）',
            componentName: 'specimen'
          },
          {
            id: 4,
            value: '运送（物品）',
            componentName: 'goods'
          }
        ],
      }
    },
    mounted() {
      // 获取当前组
      getInfo().then(res => {
        if (res.data.code === 200) {
          this.groupId = res.data.data.userInfo.nursingGroupId
        } else {
          this.$message.error(res.data.message)
        }
      })
      // 获取所有下拉
      mapInit().then(res => {
        if (res.data.code === 200) {
          this.initInfo = res.data.data
          this.initInfo.groupId = this.groupId
          this.init()
        } else {
          this.$message.error(res.data.message)
        }
      })

    },
    created() {},
    methods: {
      init() {
        this.compentname = 'whole'
      },
      tagClick(item, index) {
        this.activeIndex = index
        if (item.id == 1) {
          this.compentname = 'whole'
        }
        if (item.id == 2) {
          this.compentname = 'accInspection'
        }
        if (item.id == 3) {
          this.compentname = 'specimen'
        }
        if (item.id == 4) {
          this.compentname = 'goods'
        }
      },

    },
  }
</script>
<style lang="less" scoped>
  // .wrap {
  //   background: white;
  //   height: 100%;
  //   padding: 25px 20px;
  //   box-sizing: border-box;

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
      // padding: 10px 15px;
      box-sizing: border-box;
      height: calc(100% - 55px);
    }

    .el-tag.el-tag--info {
      width: 110px;
      padding: 0px !important;
      text-align: center;
      color: #333;
      background: #f2f6fd;
      border-top-right-radius: 10px;
      border-radius: 0px 10px 0px 0px;
      border: none;
      margin-right: 7px;
      top: -1px;

      &.active {
        background: #217DFA;
        color: #ffffff;
      }
    }
  // }
</style>