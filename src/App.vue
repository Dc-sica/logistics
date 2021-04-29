<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-06 10:50:50
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-18 09:41:03
 * @FilePath: /hos-logistics-management/src/App.vue
-->
<template>
  <div id="app">
    <router-view name="noFound"></router-view>
    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
