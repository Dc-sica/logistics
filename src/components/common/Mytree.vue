<template>
  <div id="Mytree">
    <ul>
      <li v-for="item in childNodes" :key="item.id">
        <span
              :class="[item.dataCode===currentItem?'wenjian':'']">{{item.parentId==='0'?'':item.dataCode}}&nbsp;{{item.dataName}}</span>
        <Mytree v-if="item.childNodes " :childNodes="item.childNodes" :currentItem="currentItem">
        </Mytree>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Mytree',
  props: { childNodes: Array, currentItem: String },
  data () {
    return {}
  }

}
</script>
<style lang="less" scoped>
.wenjian {
  color: #1d93a8;
}
</style>
