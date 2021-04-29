<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-06 11:32:34
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-08 13:45:56
 * @FilePath: /hos-logistics-management/src/views/Home.vue
-->
<template>
  <div id="sys-home">
    <header-bar @getLeftShow="getLeftShow" @changeChild="getChild"></header-bar>
    <div class="p-clear main-box">
      <!-- 侧边 -->
      <sider-bar class="p-left"  :leftShow="leftShow" :menuData="menuDataList"></sider-bar>
      <!--  -->
      <div class="main-content p-animation"
        :class="{'main-large':!leftShow}">
        <div class="mian-container" >
          <PageTab/>
          <router-view style="height:calc(100% - 35px);margin:0px 10px;"/>
        </div>
        <div class="footer-info">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from '../components/common/headerBar'
import siderBar from '../components/common/siderBar'
import routeList from '../routeList'
import PageTab from '@/components/common/PageTab'
export default {
  name: 'home',
  components: {
    headerBar,
    siderBar,
    PageTab
  },
  data () {
    return {
      breadList: [],
      leftShow: true,
      subPathList: [],
      currentIndex: '',
      visible: false,
      top: 0,
      left: 0,
      selectedIndex: '',
      menuDataList:[]
    }
  },
  created () {
    this.subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
    let index = this.subPathList.findIndex(item => item.path === this.$route.path)
    if (index !== -1) {
      this.currentIndex = index
    } else {
      this.subPathList.push({
        path: this.$route.path,
        text: this.$route.meta.text,
        query: this.$route.query,
        params: this.$route.params,
        fullPath: this.$route.fullPath
      })
      this.currentIndex = this.subPathList.length - 1
    }
  },
  methods: {
    getChild (list) {
      this.menuDataList = list
    },
    _currentSubPath (item, index) {
      this.currentIndex = index
      this.$router.push(item.fullPath)
    },
    _delSubPath (item, index) {
      if (item.fullPath === '/home') {
        return false
      }
      this.subPathList.splice(index, 1)
      this.currentIndex = index - 1
      let { path, query } = this.subPathList[this.currentIndex]
      this.$router.push({
        path,
        query
      })
      localStorage.setItem('subPath', JSON.stringify(this.subPathList))
      if (this.subPathList.length === 0) {
        this.$router.push('/home')
      }
    },
    setBread (to) {
      this.subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
      let index = this.subPathList.findIndex(item => item.path === to.path)
      if (index === -1) {
        this.subPathList.push({
          path: to.path,
          text: to.meta.text,
          query: to.query,
          params: to.params,
          fullPath: to.fullPath
        })
        this.currentIndex = this.subPathList.length - 1
      } else {
        this.currentIndex = index
      }
    },
    goPrev (currentUrl) {
      routeList[1].children.forEach(item => {
        if (item.text === currentUrl) {
          this.$router.push(item.path)
        }
      })
    },
    getLeftShow () {
      this.leftShow = !this.leftShow
    },
    openMenu (e, index) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedIndex = index
    },
    // 刷新选中
    refreshSelectedTag () {
      let fullPath = this.subPathList[this.selectedIndex].fullPath
      this.$nextTick(() => {
        this.$router.replace({ path: fullPath })
      })
    },
    // 关闭选中
    closeSelectedTag (view) {
      this.subPathList.splice(this.selectedIndex, 1)
      this.currentIndex = this.selectedIndex - 1
      let { path, query } = this.subPathList[this.currentIndex]
      this.$router.push({
        path,
        query
      })
      localStorage.setItem('subPath', JSON.stringify(this.subPathList))
      this.visible = false
      if (this.subPathList.length === 0) {
        this.$router.push('/home')
      }
    },
    // 关闭除选中外其他
    closeOthersTags () {
      let arr = []
      if (this.selectedIndex === 0) {
        arr.push(this.subPathList[0])
        this.subPathList.splice(0, this.subPathList.length)
        this.subPathList = arr
        localStorage.setItem('subPath', JSON.stringify(arr))
        let { path, query } = arr[0]
        this.$router.push({
          path,
          query
        })
      } else {
        arr.push(this.subPathList[0])
        arr.push(this.subPathList[this.selectedIndex])
        this.subPathList.splice(0, this.subPathList.length)
        this.subPathList = arr
        localStorage.setItem('subPath', JSON.stringify(arr))
        let { path, query } = arr[1]
        this.$router.push({
          path,
          query
        })
      }
      this.visible = false
    },
    // 关闭所有
    closeAllTags (view) {
      let arr = []
      arr.push(this.subPathList[0])
      this.subPathList.splice(0, this.subPathList.length)
      this.subPathList = arr
      localStorage.setItem('subPath', JSON.stringify(arr))
      let { path, query } = arr[0]
      this.$router.push({
        path,
        query
      })
      this.visible = false
    },
    closeMenu () {
      this.visible = false
    }
  },
  watch: {
    $route (to, from) {
      this.setBread(to)
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  }
}
</script>
<style lang="less">
.el-scrollbar__bar {
  bottom: 0px !important;
}
.el-scrollbar__thumb {
  width: auto !important;
}
</style>
<style lang="less" scoped>
@import "~@/assets/css/home.less";
.bread {
  margin-bottom: 10px;
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.el-scrollbar {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
