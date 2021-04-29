<template>
  <ContainerGroup class="wrapper">
    <Container>
      <el-button round
        class="cancelBtn"
        @click="_goback">取消</el-button>
      <el-button round
        class="cancelBtn"
        @click="_goback">保存</el-button>
      <el-button round
        type="primary"
        @click="_onSubmit">提交</el-button>
    </Container>
    <Container class="wrapper-table" height="fill" scrollY="true">
      <div class="form-box">
        <p class="form-title">
          基本信息
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo"
              ref="formInfo"
              :rules="rules">
              <el-col :span="8">
                <el-form-item label="巡检任务名称："
                  prop="projectName">
                  <el-input placeholder="不超过20字" style="width:60%"
                    v-model="formInfo.projectName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间："
                  prop="startTime">
                  <el-date-picker  style="width:50%"
                    v-model="formInfo.startTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束时间："
                  prop="endTime">
                  <el-date-picker style="width:50%"
                    v-model="formInfo.endTime"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="巡检频率："
                  prop="frequency">
                  <el-radio-group class="fl line40" v-model="formInfo.frequency" @change="radioChange">
                    <el-radio label="1">每天</el-radio>
                    <el-radio label="2">单次</el-radio>
                    <el-radio label="3">循环</el-radio>
                  </el-radio-group>
                  <!-- 单次选择时间 -->
                  <el-date-picker class="fl" v-show="formInfo.frequency === '2'"
                    style="width:20%;margin-left:20px;"
                    v-model="formInfo.frequencyTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="时间">
                  </el-date-picker>
                  <!-- 循环选择次数 -->
                  <div v-show="formInfo.frequency === '3'" class="fl">
                    <el-input placeholder="" v-model="formInfo.num" style="width:20%;margin-left:20px;"></el-input>
                    <el-select v-model="formInfo.cycle" placeholder="请选择" style="width:20%;margin-left:20px;">
                      <el-option v-for="item in cycleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"></el-option>
                    </el-select>
                    <el-input placeholder="" v-model="formInfo.num" style="width:20%;margin: 0 20px;"></el-input>次
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="巡检类型："
                  prop="checkType">
                  <el-select v-model="formInfo.checkType" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备类型："
                  prop="deviceType">
                  <el-select v-model="formInfo.deviceType" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备分类："
                  prop="deviceStyle">
                  <el-select v-model="formInfo.deviceStyle" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备名称："
                  prop="deviceName">
                  <el-select v-model="formInfo.deviceStyle" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注："
                label-width="77px"
                  prop="remark">
                  <el-input type="textarea"
                    placeholder="请输入描述，不超过300字"
                    show-word-limit
                    :rows="4"
                    v-model="formInfo.remark"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt">
          表单设置
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="form2Info">
              <el-col :span="8">
                <el-form-item label="表单名称："
                  prop="checkType">
                  <el-select v-model="formInfo.checkType" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt">
          任务步骤
        </p>
        <div class="form-row1">
          <div class="chooseBtn" @click="_chooseItem">+新增步骤</div>
        </div>
        <p class="form-title bt">
          人员设置
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="form3Info">
              <el-col :span="8">
                <el-form-item label="公司名称："
                  prop="checkType">
                  <el-select v-model="formInfo.checkType" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="小组名称："
                  prop="checkType">
                  <el-select v-model="formInfo.checkType" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工作人员："
                  prop="checkType">
                  <el-select v-model="formInfo.checkType" style="width:50%"
                    placeholder="请选择">
                    <el-option v-for="item in cycleList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
      <!-- 侧边弹窗 -->
      <Drawer title="选择设备/空间" :visible.sync="drawerView" size="60%" @cancel="_drawerHandleClose">
        <ContainerGroup>
          <Container>
            <el-form :inline="true" ref="formInline" :model="formInline">
              <el-form-item label="设备/空间名称：">
                <el-input placeholder="请输入" v-model="formInline.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="分类名称：">
                <el-select placeholder="请选择" v-model="formInline.sex" clearable>
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型：">
                <el-select placeholder="请选择" v-model="formInline.sex" clearable>
                  <el-option value="0" label="男"></el-option>
                  <el-option value="1" label="女"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="float: right;">
                <el-button type='primary' @click="_drawerSearch">查询</el-button>
                <el-button @click="_drawerReset">重置</el-button>
              </el-form-item>
            </el-form>
          </Container>
          <Container>
            <OperationContainer id="nevboxs">
              <el-select v-model="drawerBtns" size="large" @change="_drawerSelectionHandle()" placeholder="批量操作">
                <el-option v-for="item in addBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </OperationContainer>
            <el-table :data="deviceData" ref="multipleTable" 
              :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" 
              highlight-current-row isFillHeight height="0" 
              @selection-change="_handleWorkerSelectionChange" border>
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="设备/空间名称" prop="code" show-overflow-tooltip></el-table-column>
              <el-table-column label="所在位置" prop="name" show-overflow-tooltip></el-table-column>
              <el-table-column label="二维码" prop="sex"></el-table-column>
              <el-table-column label="条形码" prop="phone" show-overflow-tooltip></el-table-column>
              <el-table-column label="执行类型" prop="deptName" show-overflow-tooltip></el-table-column>
              <el-table-column label="表单名称" prop="time" show-overflow-tooltip></el-table-column>
              <el-table-column label="状态" prop="time" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <span class="pointer" @click="addWorker(scope.row)">添加</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="drawerTotal" :page="drawerCurrentPage" :pageSize="drawerPageSize" @pagation="drawerPagationChange" />
          </Container>
        </ContainerGroup>
      </Drawer>
    </Container>
  </ContainerGroup>
</template>

<script>
  import pagination from './../../../components/pagination/index'

export default {
  name: 'add',
  components: {
    pagination
  },
  data () {
    return {
      formInfo: {
        projectName: '',
        startTime: '',
        endTime: '',
        frequency: '',
        checkType: '',
        deviceType: '',
        deviceStyle: '',
        deviceName: ''
      },
      rules: {
        projectName: [{ required: true, message: '请输入巡检任务名称', tirgger: "blur" }],
        startTime: [{ required: true, message: '请选择开始时间', tirgger: "blur" }],
        endTime: [{ required: true, message: '请选择结束时间', tirgger: "blur" }],
        frequency: [{ required: true, message: '请选择巡检频率', tirgger: "change" }],
        checkType: [{ required: true, message: '请选择巡检类型', tirgger: "change" }],
        deviceType: [{ required: true, message: '请选择设备类型', tirgger: "change" }],
        deviceStyle: [{ required: true, message: '请选择设备分类', tirgger: "change" }],
        deviceName: [{ required: true, message: '请选择设备分类', tirgger: "change" }],
      },
      form2Info: {

      },
      form3Info: {},
      cycleList: [{
        id: '1',
        name: '周'
      },{
        id: '2',
        name: '月'
      },{
        id: '3',
        name: '季'
      },{
        id: '4',
        name: '年'
      }],
      drawerView: false,
      formInline: {
      },
      drawerBtns: '',
        addBtnList: [{
            label: "添加全部",
            value: "1",
          },
          {
            label: "批量添加",
            value: "2",
          },
        ],
        drawerMultVal: [],
        deviceData: [],
        drawerTotal: 0,
        drawerCurrentPage: 1,
        drawerPageSize: 20,
    }
  },
  methods: {
    _goback () {
      this.$router.push({
        path: "/checkManage"
      })
    },
    radioChange (val) {},
    _chooseItem () {
      this.drawerView = true
    },
    _drawerSearch () {},
    _drawerReset () {},
    _drawerSelectionHandle() {

    },
    _drawerHandleClose() {
      this.drawerView = false
    },
    _handleWorkerSelectionChange(val) {
      this.drawerMultVal = val
    },
    drawerPagationChange(payload) {
      this.drawerCurrentPage = payload.page
      this.drawerPageSize = payload.pageSize
    },
    _onSubmit () {}
  }
}
</script>

<style lang="less" scoped>
.form-box {
  border: 1px solid #e5e5e5;
  .form-title {
    border-bottom: 1px solid #e5e5e5;
    line-height: 55px;
    padding-left: 30px;
    font-family: Source Han Sans CN Regular,
      Source Han Sans CN Regular-Regular;
    font-weight: bold;
    font-size: 18px;
    text-align: left;
    color: #333333;
    background: #fcfcfc;
  }
  .bt {
    border-top: 1px solid #e5e5e5;
  }
  .form-row {
    padding: 15px 30px 0;
  }
  .form-row1 {
    padding: 20px;
  }
  .chooseBtn {
    height: 40px;
    color: #333;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
    border: 1px dashed #e5e5e5;
    border-radius: 6px;
    cursor: pointer;
  }
}
.fl {
  float: left;
}
.line40 {
  line-height: 40px;
  .el-radio {
    margin-top: 13px;
  }
}
</style>