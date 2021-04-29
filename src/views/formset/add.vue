<template>
  <ContainerGroup>
    <Container>
      <p class="form-title">
        基本信息
      </p>
      <el-row>
        <el-form :inline="true" ref="tplForm" :rules="rules">
          <el-col :span="12">
            <el-form-item label="模板名称：" prop="name">
              <el-input v-model="tplForm.tplName" placeholder="请输入名称,不超过30个字" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表单类型：" prop="urgentLevel">
              <el-select v-model="tplForm.tplType" style="width:100%" placeholder="请选择" clearable>
                <el-option v-for="item in tplType" :key="item.dictId" :label="item.name" :value="item.dictId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：" label-width="70px" prop="remark">
              <el-input type="textarea" placeholder="请输入描述，不超过300字" style="width:500px;" show-word-limit :rows="3" v-model="tplForm.remark" :maxlength="300"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </Container>
    <Container height="fill" scrollY="true">
      <ContainerGroup layout="row">
        <Container class="content-right" height="fill" scrollY="true">
          <p class="form-title">表单设置</p>
          <transition-group style="min-width:500px;display:block;">
            <template v-show="$store.getters.getCustomerFormData.length>0">
              <div class="question-list-item" v-for="(item,index) in $store.getters.getCustomerFormData" :key="item.type+index" @click="choseActivItem(index)" :class="currentIndex===index?'active-ques-item':''">
                <component :is="item.type" :currentIndex="index" ref="question-items"></component>
                <el-button @click="deleteQuestionItem(index)" size="mini" class="delete-item-icon"><i class="el-icon-delete "></i>&nbsp;删除</el-button>
              </div>
              <!-- <div style="height:30px;width:100%;text-align:center" key="end"></div> -->
            </template>
          </transition-group>
          <div class="chooseBtn" @click="addType">+新增题型</div>
          <!-- <el-button @click="submit()">确定</el-button> -->
          <Container class="botSub">
            <div>
              <el-button @click="_goback">取消</el-button>
              <el-button type="primary" @click="submit()">提交</el-button>
            </div>
          </Container>
        </Container>
        <Container class="content-left">
          <p class="form-title">题型控件</p>
          <question-conf :currentIndex="currentIndex" v-if="currentIndex>-1"></question-conf>
        </Container>
        <!-- <add :rowId='rowId' :btnType='btnType' v-if="drawerView" :drawer='drawerView' @handleFresh="handleFresh" @closeHandle='_closeDrawerHandle' /> -->
        <!-- 驳回 -->
      </ContainerGroup>
      <Dialog title="新增题型" :visible="addVisible" @cancel="_itemHandleClose" @save="save" :footerBtns="[{text: '确定',type: 'primary',trigger: 'save',},
        {
          text: '取消',
          trigger: 'cancel',
        }]">
        <!-- <el-select v-model="quesType" style="width:100%" placeholder="请选择" clearable size="small">
          <el-option v-for="item in typeList" :key="item.type" :label="item.typeName" :value="item"></el-option>
        </el-select> -->
        <div v-for="(item) in typeList" :key="item.type" :id="item.type" @click="choseType(item)" :class="['item',item.flag?'active':'']">
          <i class="iconfont" v-html="item.icon"></i>
          {{item.typeName}}
        </div>
      </Dialog>
    </Container>
  </ContainerGroup>
</template>
<script>
  // import add from './add'
  import quesTypeList from './questionType.js'
  import questionConf from './questionConf/index'
  // 导入题型组件
  import singleChoice from './questionTypes/singleChoice.vue'
  import multipleChoice from './questionTypes/multipleChoice.vue'
  import dropDown from './questionTypes/dropDown.vue'
  import multipleInput from './questionTypes/multipleInput'
  import singleInput from './questionTypes/singleInput'

  import {
    mapInit
  } from "./../../apis/formset/indexApi";
  export default {
    name: 'add',
    //注册组件
    components: {
      questionConf,
      singleChoice,
      multipleChoice,
      dropDown,
      multipleInput,
      singleInput
    },
    props: {
      originItems: {
        type: Array,
        value: []
      },
      originValues: {
        type: Array,
        value: []
      }
    },
    data() {
      return {
        currentIndex: -1,
        quesType: '',
        addVisible: false,
        typeList: quesTypeList,
        title: '',
        // data: JSON.parse(JSON.stringify(data)),
        total: 0,
        pageSize: 20,
        currentPage: 1,
        drawerView: false,
        btnType: 1, //2-编辑 3-查看
        rowId: '',
        tplType: [],
        tplForm: {
          tplName: '',
          tplType: '',
          remark: ''
        },
        rules: {
          tplName: [{
            required: true,
            message: '请输入参数名称',
            trigger: 'blur'
          }, ],
          tplType: [{
            required: true,
            message: '请选择分类',
            trigger: ['blur', 'change']
          }]
        },
      }
    },
    created() {
      this.init()
      this.editIn()
    },
    watch: {
      originItems: {
        handler(val) {
          this.questionList = val
          console.log(111)
        }
      },
      originValues: {
        handler(val) {
          this.values = val
        }
      }
    },
    methods: {
      // 从编辑进
      editIn() {
        if (this.$route.query.type == 1) {
          this.$store.commit('setCustomerFormData', [{
            "type": "singleChoice",
            "typeName": "单选题",
            "isRequire": true,
            "icon": "&#xe627;",
            "title": "这是一道单选题",
            "selectItems": [{
              "label": "选项",
              "isRemark": ""
            }],
            "flag": true
          }, {
            "type": "multipleChoice",
            "typeName": "多选题",
            "isRequire": true,
            "title": "这是一道多选题",
            "icon": "&#xe608;",
            "selectItems": [{
              "label": "选项一",
              "isRemark": "true"
            }],
            "flag": true
          }, ])

        }

      },
      // 删除
      deleteQuestionItem(index) {
        console.log(this.$store.getters.getCustomerFormData)
        this.$store.getters.getCustomerFormData.splice(index, 1)
        console.log(this.$store.getters.getCustomerFormData)
        this.$store.commit('setCustomerFormData', this.$store.getters.getCustomerFormData)
      },
      _goback() {
        this.$router.go(-1)
      },
      choseType(row) {
        this.typeList.forEach(item => {
          if (item.typeName === row.typeName) {
            item.flag = true
          } else {
            item.flag = false
          }
        })
        this.$forceUpdate()
        console.log(row)
        this.quesType = row
      },
      addNewItems() {
        let storeData = JSON.parse(JSON.stringify(this.$store.getters.getCustomerFormData))
        let addItem = JSON.stringify(this.quesType)
        storeData.push(JSON.parse(addItem))
        this.$store.commit('setCustomerFormData', [])
        setTimeout(() => {
          this.$store.commit('setCustomerFormData', storeData)
          this.choseActivItem(storeData.length - 1)
          // this.$forceUpdate()
        }, 0)
        console.log(2, this.$store.getters.getCustomerFormData)
      },
      updateSort() {
        let storeData = this.$store.getters.getCustomerFormData
        this.$store.commit('setCustomerFormData', [])
        setTimeout(() => {
          this.$store.commit('setCustomerFormData', JSON.parse(JSON.stringify(storeData)))
        }, 0)
      },
      choseActivItem(currentIndex) {
        this.currentIndex = currentIndex
      },
      submit() {
        console.log(JSON.stringify(this.$store.getters.getCustomerFormData))
      },
      // 初始化
      init() {
        mapInit().then(res => {
          if (res.data.code == 200) {
            // 表单类型下拉
            this.tplType = res.data.data.tableType
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      // 新增题型
      addType() {
        this.addVisible = true
        // 去除选中
        this.typeList.map(item => {
          item.flag = false
        })
      },
      save() {
        console.log(this.quesType)
        this.addVisible = false
        this.addNewItems()
        // this.updateSort()
      },
      // 关闭题型弹框
      _itemHandleClose() {
        this.addVisible = false
      },
    },
    destroyed() {
      this.$store.commit('setCustomerFormData', [])
    }
  }
</script>
<style lang="less" scoped>
  .botSub {
    text-align: center;
    position: absolute;
    bottom: 10px;
    // border: 1px solid seagreen;
    width: calc(100vw - 616px);
    // margin: 0 auto;
  }

  .question-list-item {
    min-height: 90px;
    padding: 10px;
    position: relative;
    border-bottom: 1px solid #EEEEEE;
  }

  .chooseBtn {
    height: 40px;
    color: #333;
    text-align: center;
    line-height: 40px;
    margin-top: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    cursor: pointer;
  }

  .item {
    padding: 6px 12px;
    margin: 10px;
    border: dashed 1px #BFBFBF;

    &.active {
      background: #2178FB;
      // box-shadow: 0px 0px 10px #2178FB;
      // color: #ffffff;
    }
  }

  .item:hover {
    background-color: #2178FB;
    transition: border-color .3s, background-color .3s, color .3s;
    box-shadow: 0px 0px 10px #2178FB;
    cursor: pointer;
  }

  .form-title {
    border-bottom: 1px solid #e5e5e5;
    line-height: 30px;
    padding-left: 10px;
    font-family: Source Han Sans CN Regular,
      Source Han Sans CN Regular-Regular;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    color: #333333;
    background: #fcfcfc;
  }

  .content-left {
    // height: calc(100vh - 120px);
    flex: 0 0 300px;
    background: #fff;
    margin-left: 15px;
  }

  .content-right {
    background: #fff;
    flex: 1;
    width: 0;
    margin-bottom: 60px;
  }
</style>