<template>
  <div id="sider-bar"
    :class="{ 'hide-menu': !leftShow }"
    class="p-animation scrollbar">
    <el-menu router
      mode="vertical"
      :collapse="!leftShow"
      :collapse-transition="false">
      <sidebar-item v-for="item in treeData"
        :key="item.menuId"
        :index="item.path"
        :item="item"
        @click="linkrouter(obj)" />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from '../common/sideBarItem'
export default {
  name: 'siderbar',
  components: { SidebarItem },
  props: {
    leftShow: Boolean,
    menuData:Array
  },
  data () {
    return {
      currentPath: '/home',
      topLen: 0,
      defaultProps: {
        children: 'childNodes',
        label: 'name'
      },
      routersData: [],
      treeData: [],
    }
  },
  created () {
  },
 
  methods: {
    setCurrentPath (hroutePath) {
      this.currentPath = hroutePath
    },
    linkrouter (obj) {
      this.$router.push({ path: obj.path })
    },
    getMenusTree () {
      this.treeData = JSON.parse(localStorage.menuTree)
    },

  },
  watch: {
    menuData:{
      handler (val) { 
        this.treeData = val
       
      },
      deep:true
    }
  }
}
</script>

<style lang="less" scoped>
.hide-menu {
  width: 58px !important;
  .el-submenu__icon-arrow {
    display: none;
  }
}
.menu-tips-box {
  position: fixed;
  border: 1px solid #eeee;
  border-radius: 3px;
  box-shadow: 0px 2px 6px #999;
  top: 0px;
  left: 62px;
  background: #fff;
  color: #999;
  font-size: 12px;
  padding: 8px 8px;
}
#sider-bar {
  height: calc(100vh - 50px);
  width: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #E8ECF8;
  color: #fff;
}
#sider-bar /deep/ .el-menu {
  // background: #1c93a7;
  border-right: none;
  // margin-top: 10px;
  margin:15px;
}

#sider-bar /deep/ .el-menu-item:hover {
  background-color: #2178FB;
  color:#fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px #2178FB;
}

#sider-bar /deep/ .el-menu-item:focus {
  background-color: #2178FB;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #2178FB;
}
// #sider-bar /deep/.el-menu-item i {
//   color: #fff;
// }
// #sider-bar /deep/ .el-menu-item {
//   color: #fff;
// }
// #sider-bar /deep/ .el-submenu__title {
//   color: #fff;
// }
// #sider-bar /deep/ .el-submenu__title i {
//   color: #fff;
// }

// #sider-bar /deep/ .el-submenu__title:hover:hover {
//   background-color: #2178FB;
// }

</style>
<style>
.el-menu{
  background: none !important;
}

.el-menu-item.active{
  background: #2178FB !important;
  color: #fff !important;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #2178FB;
}
.el-menu-item.active i{
  color: #fff !important;
}
.el-menu-item.is-active i{
  color: #fff !important;
}
.hide-menu {
  width: 58px !important;
}
.hide-menu span {
  display: none;
}
.hide-menu .el-submenu__icon-arrow {
  display: none;
}
</style>
