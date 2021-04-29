<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleApproval">提交</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="wrap-panner">
        <div class="title-pannel">扫描管理设置</div>
        <div class="choose-pannel">
          <div class="choose-item">
            <div>是否有硬件设备（*组长接单模式不兼容扫码管理）</div>
            <div class="radio-box">
              <el-radio-group v-model="scan">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="title-pannel">接单设置</div>
        <div class="choose-pannel">
          <div class="choose-item">
            <div>病员：（*接单模式更改后，功能次日生效）</div>
            <div class="radio-box">
              <el-radio-group v-model="modelNow7">
                <el-radio :label="1">班组抢单</el-radio>
                <el-radio :label="2">自动接单</el-radio>
                <el-radio :label="3">手动接单</el-radio>
                <el-radio :label="4">组长接单</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="choose-item">
            <div>标本：（*接单模式更改后，功能次日生效）</div>
            <div class="radio-box">
              <el-radio-group v-model="modelNow9">
                <el-radio :label="1">班组抢单</el-radio>
                <el-radio :label="2">自动接单</el-radio>
                <el-radio :label="3">手动接单</el-radio>
                <el-radio :label="4">组长接单</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="choose-item">
            <div>物品：（*接单模式更改后，功能次日生效）</div>
            <div class="radio-box">
              <el-radio-group v-model="modelNow8">
                <el-radio :label="1">班组抢单</el-radio>
                <el-radio :label="2">自动接单</el-radio>
                <el-radio :label="3">手动接单</el-radio>
                <el-radio :label="4">组长接单</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="title-pannel">任务完成条件</div>
        <div class="choose-pannel">
          <div class="choose-item">
            <div>任务完成是否需要填写资料</div>
            <div class="radio-box">
              <el-radio-group v-model="takeModelNow">
                <el-radio :label="1">必填</el-radio>
                <el-radio :label="0">非必填</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  import {
    getOrderSettingList,
    updateDeliveryOrderSetting
  } from '../../../apis/ordersManagement/indexApi'
  export default {
    name: 'functionSetUp',
    data() {
      return {
        scan: 0,
        modelNow7: 1,
        modelNow8: 1,
        modelNow9: 1,
        takeModelNow: 0,
        listData: [],
      }
    },
    created() {
      this.getOrderData()
    },
    methods: {
      handleCancel() { //取消
        this.getOrderData()
      },
      handleApproval() {
        let param = []
        this.listData.forEach(item => {
          if (item.module == '硬件') {
            item.scanModelNow = this.scan
          } else if (item.module == '病员') {
            item.modelNow = this.modelNow7
          } else if (item.module == '物品') {
            item.modelNow = this.modelNow8
          } else if (item.module == '标本') {
            item.modelNow = this.modelNow9
          } else if (item.module == '任务') {
            item.takeModelNow = this.takeModelNow
          }
          param.push(item)
        })
        updateDeliveryOrderSetting(param).then(res => {
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      getOrderData() {
        getOrderSettingList().then(res => {
          if (res.data.code === 200) {
            let result = res.data.data || []
            this.listData = result
            result.filter(item => {
              return item.id >= 6
            }).forEach(item => {
              if (item.module == '硬件') {
                this.scan = item.scanModelNow
              } else if (item.module == '病员') {
                this.modelNow7 = item.modelNow
              } else if (item.module == '物品') {
                this.modelNow8 = item.modelNow
              } else if (item.module == '标本') {
                this.modelNow9 = item.modelNow
              } else if (item.module == '任务') {
                this.takeModelNow = item.takeModelNow
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .wrapper-btn {
    height: 50px;
    background-color: white;
    margin-top: 15px;
    line-height: 50px;
    text-align: center;
  }

  .btn {
    display: inline-block;
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


  .wrap-panner {
    border: 1px solid #E8EAED;
    border-bottom: none
  }

  .title-pannel {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #E8EAED;
    font-size: 14px;
    font-weight: 600;

  }

  .choose-pannel {
    .choose-item {
      border-bottom: 1px solid #E8EAED;
      padding: 15px 15px;
      box-sizing: border-box;
    }

    .radio-box {
      margin-top: 15px;
    }
  }
</style>