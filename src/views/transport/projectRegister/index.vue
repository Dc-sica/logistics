

<template>
  <div class="wrap">
    <div class="block"></div>
    <el-tag :class="activeIndex === index ? 'active' : ''" v-for="(item,index) in groupList" :key="index" @click="tagClick(item,index)" type="info">{{item.value}}</el-tag>
    <div class="wrap-body">
      <component :is='compentname' :initInfo='initInfo'></component>
    </div>
  </div>
</template>
<script>
export default {
  name: 'projectRegister',
  components: {
    whole(resolve) {
      require(['./components/allPart'], resolve)
    },
    accInspection(resolve) {
      require(['./components/accompanyCheck'], resolve)
    },
    specimen(resolve) {
      require(['./components/transportSpecimen'], resolve)
    },
    goods(resolve) {
      require(['./components/transportGoods'], resolve)
    }
  },
  data () {
    return {
      compentname: '',
      initInfo: {},
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
  mounted () {
    this.init()
  },
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
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    background: white;
    height: 100%;
    padding: 0 20px 25px;
    box-sizing: border-box;
    .block {
      height: 10px;
      background: #f0f2f5;
      margin-bottom: 20px;
      margin-left: -20px;
      width: calc(100% + 40px);
    }
    .el-tag {
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-right: 10px;
      cursor: pointer;
      top: -1px;
      font-size: 14px;
    }

    .wrap-body {
      border: 1px solid #E8EAED;
      padding: 10px 15px;
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
  }
</style>
