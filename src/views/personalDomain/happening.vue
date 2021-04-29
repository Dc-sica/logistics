<template>
  <ContainerGroup>
    <Container>
      总得记录些什么吧。
    </Container>
    <Container>
      <el-input v-model="text" placeholder="输入" clearable style="width:50%;margin-right:20px;"></el-input>
      <el-button type="primary" @click="searchHandle">查询</el-button>
    </Container>
    <Container>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column label="歌名" prop="name"></el-table-column>
        <el-table-column label="歌手" prop="singers"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="_getDetailHandle(scope.row)">
              查看歌词
            </el-button>
          </template>
        </el-table-column>
      </el-table>
            <Drawer
        title="歌词"
        :visible.sync="drawerView"
        :footerBtns="[
          { type: 'info', text: '取消', trigger: 'cancel' }
        ]"
        @cancel="_drawerHandleClose"
        :before-close="_drawerHandleClose"
      >
        <p v-for="item in wordList" :key="item.index">{{item.substr(item.indexOf(']')+1,item.length)}}</p>
      </Drawer>
    </Container>
  </ContainerGroup>
</template>

<script>
 import { getList } from '../../apis/music/index'

export default {
  name: 'happening',
  data () {
    return {
      drawerView: false,
      text: '',
      tableData: [{
        name: '《从接受平庸的那时起》',
        singers: '南游记',
        id: '1471755938'
      },{
        name: '《告白气球》',
        singers: '周杰伦',
        id: '418603077'
      }],
      copyrightId: '',
      detail: '',
      wordList: []
    }
  },
  created () {
    // this.getData2()
  },
  methods: {
    searchHandle () {
      // 网易
      this._getSearch()
    },
    // 搜索参数 type: 'search'
    // search_type: 1单曲   10 专辑  100 歌手 1000歌单 1002 用户 1004mv 1006歌词 1009主播电台
    _getSearch () {
      getList({
        type: 'search',
        search_type: 1000,
        s: this.text
      }).then(res => {
        console.log(res.data)
      })
    },
    // type: 'lyric' 获取歌曲的歌词
    getData2 () {
      getList({
        type: 'lyric',
        id: this.id
      }).then(res => {
        this.detail = res.data.lrc.lyric
        // let a = this.subStringMulti(this.detail,'[',']')
        // console.log(this.detail.indexOf('['))
        this.wordList = this.detail.split('\n')
        this.drawerView = true
      })
    },
    _getDetailHandle (row) {
        this.id = row.id
        this.getData2()
    },
    _drawerHandleClose () {
      this.drawerView = false
    },
    
  }
}
</script>

<style>
.blue {
  color: blue;
}
</style>