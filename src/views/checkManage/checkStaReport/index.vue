<template>
  <ContainerGroup>
    <Container>
      <el-tabs class="eltabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日任务" name="day"></el-tab-pane>
        <el-tab-pane label="周任务" name="week"></el-tab-pane>
        <el-tab-pane label="月任务" name="month"></el-tab-pane>
        <el-tab-pane label="季任务" name="quarter"></el-tab-pane>
        <el-tab-pane label="年任务" name="year"></el-tab-pane>
      </el-tabs>
    </Container>
  </ContainerGroup>
</template>
<script>
  export default {
    name: 'checkStaReport',
    data() {
      return {
        activeName: 'day',
      }
    },
    created() {

    },
    methods: {
      handleClick() {},
    }
  }
</script>