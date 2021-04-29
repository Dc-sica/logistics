<template>
  <ContainerGroup>
    <Container>
      总得记录些什么吧。
    </Container>
    <Container>
      <div>{{time}}</div>
      <div>
        <el-calendar>
          <template
            slot="dateCell"
            slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''" @click="toDetail(data.day)">
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
          </template>
        </el-calendar>
      </div>
    </Container>
  </ContainerGroup>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      time: new Date()
    }
  },
  methods: {
    toDetail (day) {
      console.log(day)
    }
  }
}
</script>

<style scoped>
  .is-selected {
    color: #1989FA;
  }
  p {
    height: 100%;
  }
</style>