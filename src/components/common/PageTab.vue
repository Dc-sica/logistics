<template>
  <div ref="listCon" class="tab-list-content">
    <div ref="tabCon" class="tab-content animate">
      <div
        v-for="(item, index) in tabList"
        :key="item.url"
        class="tab-item"
        :class="currentIndex === index ? 'tab-active' : ''"
        @click.stop="activeCurrentItem(index)"
      >
        <span :title="item.name">{{ item.name }}</span>
        <i
          v-if="item.url !== '/home'"
          class="el-icon-close"
          @click.stop="removeCurrentItem(index)"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PageTab",
  data() {
    return {
      currentIndex: 0,
      containerWidth: "",
      blackPathList: ["/login"],
      tabList: [
        {
          name: "首页",
          url: "/home",
          path: "/home",
        },
      ],
    };
  },
  watch: {
    $route: {
      handler(val) {
        if (this.blackPathList.indexOf(val.path) > -1) {
          return
        }
        document.title = this.$baseInfo.BASE_TITLE + "-" + val.meta.text;
        // 当前栈中查找
        const activeIndex = this.tabList.filter((item, index) => {
          if (val.path === item.url) {
            this.currentIndex = index;
            return item;
          }
        });

        if (activeIndex.length === 0) {
          this.tabList.push({
            name: val.meta.text,
            path: val.fullPath,
            url: val.path,
          });
          this.activeCurrentItem(this.tabList.length - 1);
        } else {
          this.activeCurrentItem(this.currentIndex);
        }
      }
    },
  },
  mounted() {
    this.initContainerWidth();
    if (
      sessionStorage.pageTabList &&
      sessionStorage.activeIndex !== undefined
    ) {
      this.tabList = JSON.parse(sessionStorage.pageTabList);
      this.currentIndex = Number(sessionStorage.activeIndex);
      this.activeCurrentItem(this.currentIndex);
    }
    window.addEventListener("resize", this.initContainerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.initContainerWidth);
  },
  methods: {
    initContainerWidth() {
      this.containerWidth = this.$refs.listCon.offsetWidth;
    },
    activeCurrentItem(index) {
      if (
        this.$router.history.current.path !== this.tabList[index].url &&
        this.blackPathList.indexOf(this.$router.history.current.path) === -1
      ) {
        this.$router.push(this.tabList[index].path);
      }
      this.currentIndex = index;
      sessionStorage.activeIndex = this.currentIndex;
      sessionStorage.pageTabList = JSON.stringify(this.tabList)
      if (!this.$refs.tabCon) {
        return;
      }
      const itemWidth = (this.currentIndex + 1.5) * 120;
      if (itemWidth > this.containerWidth) {
        this.$refs.tabCon.style.marginLeft =
          this.containerWidth - itemWidth - 10 + "px";
      } else {
        this.$refs.tabCon.style.marginLeft = "0px";
      }
    },
    removeCurrentItem(index) {
      this.tabList.splice(index, 1);
      sessionStorage.pageTabList = JSON.stringify(this.tabList);
      if (index < this.currentIndex) {
        this.activeCurrentItem(this.currentIndex - 1);
        return;
      }
      if (index === this.currentIndex && index === this.tabList.length) {
        this.activeCurrentItem(index - 1);
        return;
      }
      if (index === this.currentIndex && index !== this.tabList.length) {
        this.activeCurrentItem(index);
      }
    },
  },
};
</script>
<style scoped lang="less">
// @import url("@/assets/style/public.less");
.tab-list-content {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.tab-content {
  height: 35px;
  white-space: nowrap;
}
.tab-active {
  background: #2265f9 !important;
  color: #fff !important;
  z-index: 9;
}
.tab-item {
  text-align: left;
  width: 120px;
  display: inline-block;
  margin-top: 5px;
  height: 32px;
  line-height: 32px;
  position: relative;
  border-top-right-radius: 10px;
  background: #f0f2f5;
  cursor: pointer;
  margin-right: 2px;
  color: #666;
  span {
    display: block;
    width: 70%;
    padding-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
.tab-item:nth-child(1) {
  border-top-left-radius: 0px !important;
  margin-left: 5px;
}
</style>
