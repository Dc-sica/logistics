<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-18 14:34:04
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 17:53:01
 * @FilePath: /hos-logistics-management/src/views/procurement/purchaseReceipt/stream.vue
-->

<template>
  <!-- <el-drawer title="单据流"
    class="drawer-wrapper"
    :visible.sync="drawer"
    direction="rtl"
    node-key="id"
    :before-close="handleClose">
    <el-tree :data="dataList"
      :props="defaultProps"
      @node-click="handleNodeClick"></el-tree>
  </el-drawer> -->
  <Drawer
    title="单据流"
    :visible.sync="drawer"
    @cancel="handleClose"
    hideFooter="true"
  >
    <OperationContainer>
      <el-tree :data="dataList"
      :props="defaultProps"
      @node-click="handleNodeClick"></el-tree>
    </OperationContainer>
  </Drawer>
</template>

<script>
import baseInfo from './../../../config/config'
export default {
  name: 'stream',//单据流，
  props: ['drawer', 'dataList'],
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      const { label } = data
      let type = label.split(' ')[0]
      let id = label.split(' ')[1]
      switch (type) {
        case '采购申请单号':
          window.open(`/purchaseRequisition?id=${id}`, '__blank')
          this.handleClose()
          break;
        case '采购订单号':
          window.open(`/purchaseOrder?id=${id}`, '__blank')
          this.handleClose()
          break;
        case '采购收货单号':
          window.open(`/purchaseReceipt?id=${id}`, '__blank')
          this.handleClose()
          break;
        case '采购退货单号':
          window.open(`/purchaseReturns?id=${id}`, '__blank')
          this.handleClose()
          break;
        default:
          break
      }

    },
    handleClose () {
      this.$emit('closeHandle')
    }
  }
}
</script>
<style lang="less" scoped>
.drawer-wrapper {
  /deep/ .el-drawer__header {
    background: #1c93a7;
    color: #fff;
    margin-bottom: 0;
    padding-bottom: 5px;
  }
}
</style>