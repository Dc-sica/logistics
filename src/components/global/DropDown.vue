<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ label }}<i class="el-icon-arrow-down el-icon--right" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <template v-for="(item, index) in dropList">
        <template v-if="$parent[item.handlerClick]">
          <el-dropdown-item :key="index" @click="$parent[item.handlerClick]">{{
            item.label
          }}</el-dropdown-item>
        </template>
        <template v-else>
          <el-dropdown-item :key="index">{{ item.label }}</el-dropdown-item>
        </template>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'DropDown',
  // eslint-disable-next-line vue/require-prop-types
  props: ['label', 'dropList']
}
</script>
<style>
.el-dropdown-link{
  cursor: pointer;
}
</style>
