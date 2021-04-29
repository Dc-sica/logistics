<template>
  <ContainerGroup class="wrapper">
    <Container>
      <el-button round
        class="cancelBtn"
        @click="_goback">取消</el-button>
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
              v-show="form"
              ref="formInfo"
              :rules="rules">
              <el-col :span="24">
                <el-form-item label="任务类型："
                  prop="taskType"
                  label-width="130px">
                  <el-select v-model="formInfo.taskType"
                    placeholder="请选择"
                    @change="taskTypeChange"
                    style="width:45.5%">
                      <el-option v-for="item in taskTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
            <!-- 陪检 -->
            <el-form :model="form1Info"
              v-show="formInfo.taskTypeName === '陪检'"
              ref="form1Info"
              :rules="rules1">
              <el-col :span="12">
                <el-form-item label="申请人："
                  label-width="130px"
                  prop="applicantUser">
                  <el-input placeholder="系统生成"
                    disabled
                    v-model="form1Info.applicantUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话："
                  label-width="130px"
                  prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled
                    v-model="form1Info.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请病区："
                  label-width="130px"
                  prop="areaId">
                  <el-select v-model="form1Info.areaId"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in areaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住院号："
                  label-width="130px"
                  prop="hospitalNo">
                  <el-input placeholder=""
                    v-model="form1Info.hospitalNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病床号："
                  label-width="130px"
                  prop="bedNo">
                  <el-input placeholder=""
                    v-model="form1Info.bedNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="病人姓名："
                  label-width="130px"
                  prop="patientName">
                  <el-input placeholder=""
                    v-model="form1Info.patientName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="配送工具："
                  label-width="130px"
                  prop="remark">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in toolsList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="toolsClick(item,index)">
                      {{item.name}}
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="嘱托："
                  label-width="130px"
                  prop="entrust">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in entrustList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="entrustClick(item,index)">
                      {{item.name}}
                    </div>
                  </div>
                  <el-input type="textarea"
                    placeholder="请输入描述，不超过300字"
                    show-word-limit
                    :rows="4"
                    v-model="form1Info.entrust"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!-- 标本 -->
            <el-form :model="form2Info"
              v-show="formInfo.taskTypeName === '标本'"
              ref="form2Info"
              :rules="rules2">
              <!-- <el-col :span="12">
                <el-form-item label="对象类型："
                  prop="taskObjectType"
                  label-width="130px">
                  <el-select v-model="form2Info.taskObjectType"
                    placeholder="请选择"
                    @change="objChange"
                    style="width:100%">
                    <el-option v-for="item in taskObjectTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="申请病区："
                  label-width="130px"
                  prop="areaId">
                  <el-select v-model="form2Info.areaId"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in areaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="紧急程度："
                  prop="urgentLevel"
                  label-width="130px">
                  <el-radio-group v-model="form2Info.urgentLevel">
                    <el-radio v-for="item in urgentLevelList" :key="item.dictId" :label="item.dictId">{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请人："
                  label-width="130px"
                  prop="applicantUser">
                  <el-input placeholder="系统生成"
                    disabled
                    v-model="form2Info.applicantUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话："
                  label-width="130px"
                  prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled
                    v-model="form2Info.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运送时间："
                  label-width="130px"
                  prop="transportTime">
                  <el-date-picker style="width:100%;"
                    v-model="form2Info.transportTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择运送时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目的地："
                  label-width="130px"
                  prop="destination">
                  <el-input placeholder="系统默认检验科，如有其他地方请填写"
                    v-model="form2Info.destination"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="运送工具："
                  label-width="130px"
                  prop="remark">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in toolsList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="toolsClick(item,index)">
                      {{item.name}}
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="运送标本："
                  label-width="130px"
                  prop="remark">
                  <div>急诊标本</div>
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in jzList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="jzClick(item,index)">
                      {{item.name}}
                      <i v-if="item.hasDel" @click="delJz(item,index)" class="iconfont delbtn">&#xe61b;</i>
                    </div>
                    <div class="li addli" @click="addHandle('急诊标本')">+</div>
                  </div>
                  <div>常规标本</div>
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in cgList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="cglick(item,index)">
                      {{item.name}}
                      <i v-if="item.hasDel" @click="delCg(item,index)" class="iconfont delbtn">&#xe61b;</i>
                    </div>
                    <div class="li addli" @click="addHandle('常规标本')">+</div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注："
                  label-width="130px"
                  prop="remark">
                  <el-input type="textarea"
                    placeholder="请输入描述，不超过300字"
                    show-word-limit
                    :rows="4"
                    v-model="form2Info.remark"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
            <!-- 物品 -->
            <el-form :model="form3Info"
              v-show="formInfo.taskTypeName === '物品'"
              ref="form3Info"
              :rules="rules3">
              <!-- <el-col :span="12">
                <el-form-item label="对象类型："
                  prop="taskObjectType"
                  label-width="130px">
                  <el-select v-model="form3Info.taskObjectType"
                    placeholder="请选择"
                    @change="objChange"
                    style="width:100%">
                    <el-option v-for="item in taskObjectTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="申请病区："
                  label-width="130px"
                  prop="areaId">
                  <el-select v-model="form3Info.areaId"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in areaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="紧急程度："
                  prop="urgentLevel"
                  label-width="130px">
                  <el-radio-group v-model="form3Info.urgentLevel">
                    <el-radio v-for="item in urgentLevelList" :key="item.dictId" :label="item.dictId">{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请人："
                  label-width="130px"
                  prop="applicantUser">
                  <el-input placeholder="系统生成"
                    disabled
                    v-model="form3Info.applicantUser"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话："
                  label-width="130px"
                  prop="applicantPhone">
                  <el-input placeholder="系统生成" disabled
                    v-model="form3Info.applicantPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item label="运送类型："
                  prop="transportType"
                  label-width="130px">
                  <el-select v-model="form3Info.transportType"
                    placeholder="请选择"
                    style="width:100%">
                    <el-option v-for="item in transportTypeList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.dictId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运送/领取时间："
                  label-width="130px"
                  prop="transportTime">
                  <el-date-picker style="width:100%;"
                    v-model="form3Info.transportTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择运送时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="运送/领取地："
                  prop="fromSpace"
                  label-width="130px">
                  <el-select v-model="form3Info.fromSpace"
                    placeholder="请选择"
                    @change="fromSpaceChange"
                    style="width:100%">
                    <el-option v-for="item in deptList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.name"></el-option>
                    <el-option label="其他" value="others"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="otherFromSpace">
                <el-form-item label="其他运送/领取地："
                  prop="destination"
                  label-width="130px">
                  <el-input placeholder="请填写其他地址"
                    v-model="form3Info.otherFromSpace"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="目的地："
                  label-width="130px"
                  prop="toSpace">
                  <el-select v-model="form3Info.toSpace"
                    placeholder="请选择"
                    @change="toSpaceChange"
                    style="width:100%">
                    <el-option v-for="item in deptList"
                      :key="item.dictId"
                      :label="item.name"
                      :value="item.name"></el-option>
                    <el-option label="其他" value="others"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="otherToSpace">
                <el-form-item label="其他目的地："
                  prop="otherToSpace"
                  label-width="130px">
                  <el-input placeholder="请填写其他地址"
                    v-model="form3Info.otherToSpace"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="物品："
                  label-width="130px"
                  prop="goods">
                  <div class="ul p-clear">
                    <div class="li" 
                      v-for="(item,index) in goodsList"
                      :key="index"
                      :class="item.isActive?'active':''"
                      @click="goodsClick(item,index)">
                      {{item.name}}
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注："
                  label-width="130px"
                  prop="remark">
                  <el-input type="textarea"
                    placeholder="请输入描述，不超过300字"
                    show-word-limit
                    :rows="4"
                    v-model="form3Info.remark"
                    :maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt" v-show="formInfo.taskTypeName === '陪检'">
          检查信息
        </p>
        <div class="form-row1" v-show="formInfo.taskTypeName === '陪检'">
          <div class="chooseBtn" @click="_chooseItem">+新增检查</div>
          <el-row>
            <el-form :model="form4Info"
              :rules="rules4">
              <div class="p-clear" v-for="(item, index) in checkList" :key="index">
                <el-col :span="7" class="pos">
                  <i class="star">*</i>
                  <el-form-item label="检查项目：" label-width="100px">
                    <el-select v-model="item.checkId"
                      style="width:70%"
                      placeholder="请选择">
                      <el-option v-for="item in checkTypeList"
                        :key="item.dictId"
                        :label="item.name"
                        :value="item.dictId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7" class="pos">
                  <i class="star">*</i>
                  <el-form-item label="目的地：" label-width="90px">
                    <el-select v-model="item.destinationId"
                      style="width:80%"
                      placeholder="请选择">
                      <el-option v-for="item in deptList"
                        :key="item.dictId"
                        :label="item.name"
                        :value="item.dictId"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="7" class="pos">
                  <i class="star">*</i>
                  <el-form-item label="陪检时间："
                    label-width="100px">
                    <el-date-picker style="width:90%"
                      v-model="item.keepTime"
                      type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2" class="line40">
                  <el-switch v-model="item.urgentFlag" 
                    @click.stop.native @change="active_text(item)" 
                    active-color="#FF8901" inactive-color="#E5E5E5" 
                    active-text="紧急"
                    inactive-text="一般"
                    :active-value="1" 
                    :inactive-value="0"></el-switch>
                </el-col>
                <el-col :span="1" class="line40">
                  <div class="delBtn" @click="_delHandle(item, index)">×</div>
                </el-col>
              </div>
            </el-form>
          </el-row>
        </div>
      </div>
      
    <!-- 添加标本 -->
    <el-dialog :visible="visible"
      class="dialog-wrapper"
      width="25%"
      title='添加标本名称'
      :before-close="_itemHandleClose">
      <div class="group p-clear">
        <el-input placeholder="不超过15个字" v-model="specimenName" maxlength="15"></el-input>
      </div>
      <div
        style="text-align:center; padding-top:10px;margin-top:10px;">
        <el-button round @click="_itemHandleClose" style="color:#FF8C00;border-color:#FF8C00;">取消</el-button>
        <el-button round
          type="primary" @click="addSpecimenHandle">添加</el-button>
      </div>
    </el-dialog>
    </Container>
  </ContainerGroup>
</template>
<script>
import { dictByCategoryId } from './../../../apis/commonApi'
import { getAreaList, addTaskOrder, addTransportSample, addTransportGoods } from './../../../apis/projectRegister/indexApi'

export default {
  name: 'add',
  data () {
    return {
      type: this.$route.query.type,
      drawerView: false,
      formInfo: {
        taskType: '',
        taskTypeName: '陪检',
        objTypeName: '',
        applicantUser: '',
        userId: '',
        applicantPhone: '',
      },
      form1Info: {
        applicantUser: '',
        applicantPhone: '',
        areaId: '',
        hospitalNo: '',
        bedNo: '',
        patientName: '',
        entrust: '',
        remark: ''
      },
      form2Info: {
        taskObjectType: '',
        areaId: '',
        urgentLevel: '',
        applicantUser: '',
        applicantPhone: '',
        transportTime: '',
        destination: '',
        remark: '',
      },
      form3Info: {
        taskObjectType: '',
        areaId: '',
        urgentLevel: '',
        applicantUser: '',
        applicantPhone: '',
        transportType: '',
        transportTime: '',
        toSpace: '',
        remark: '',
      },
      form: true,
      form4Info: {},
      rules: {
        taskType: [{ required: true, message: '请选择任务类型', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
      },
      rules1: {
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
        areaId: [{ required: true, message: '请选择病区', tirgger: "change" }],
        hospitalNo: [{ required: true, message: '请输入住院号', tirgger: "blur" }],
        bedNo: [{ required: true, message: '请输入病床号', tirgger: "blur" }],
        patientName: [{ required: true, message: '请输入病人姓名', tirgger: "blur" }],
        entrust: [{ required: true, message: '请输入描述', tirgger: "blur" }],
        remark: [{ required: true, message: '请输入备注', tirgger: "blur" }]
      },
      rules2: {
        taskObjectType: [{ required: true, message: '请选择对象类型', tirgger: "change" }],
        areaId: [{ required: true, message: '请选择病区', tirgger: "change" }],
        urgentLevel: [{ required: true, message: '请选择紧急程度', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
        transportTime: [{ required: true, message: '请选择运送时间', tirgger: "blur" }],
        // destination: [{ required: true, message: '请输入目的地', tirgger: "blur" }],
        remark: [{ required: true, message: '请输入备注', tirgger: "blur" }]
      },
      rules3: {
        taskObjectType: [{ required: true, message: '请选择对象类型', tirgger: "change" }],
        areaId: [{ required: true, message: '请选择病区', tirgger: "change" }],
        urgentLevel: [{ required: true, message: '请选择紧急程度', tirgger: "change" }],
        applicantUser: [{ required: true, message: '请输入申请人', tirgger: "blur" }],
        applicantPhone: [{ required: true, message: '请输入联系电话', tirgger: "blur" }],
        transportType: [{ required: true, message: '请选择运送类型', tirgger: "change" }],
        transportTime: [{ required: true, message: '请选择运送时间', tirgger: "change" }],
        fromSpace: [{ required: true, message: '请选择领取地', tirgger: "change" }],
        toSpace: [{ required: true, message: '请选择目的地', tirgger: "change" }],
        remark: [{ required: true, message: '请输入备注', tirgger: "blur" }]
      },
      rules4: {},
      tableData: [],
      taskTypeList: [],
      urgentLevelList: [],
      taskObjectTypeList: [],
      transportTypeList: [{
        dictId: '0',
        name: '送回'
      }, {
        dictId: '1',
        name: '领取'
      }],
      areaList: [],
      toolsList: [],
      entrustList: [],
      checkTypeList: [],
      deptList: [],
      goodsList: [],
      jzList: [],
      cgList: [],
      visible: false,
      specimenType: '',
      specimenName: '',
      checkList: [{
        checkId: '',
        destinationId: '',
        keepTime: '',
        urgentFlag: false
      }],
      tool: [],
      entrust: [],
      text: '运送',
      otherFromSpace: false,
      otherToSpace: false,
      goods: []
    }
  },
  mounted () {
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { name, phone, userId } = JSON.parse(userInfo)
      this.form1Info.applicantUser = name
      this.form1Info.userId = userId
      this.form1Info.applicantPhone = phone
      this.form2Info.applicantUser = name
      this.form2Info.userId = userId
      this.form2Info.applicantPhone = phone
      this.form3Info.applicantUser = name
      this.form3Info.userId = userId
      this.form3Info.applicantPhone = phone
    }
    this._getTaskTypeList()
    this._getAreaList()
    this._getTools()
    this._getEntrust()
    this._getCheckType()
    this._getDept()
    this._getLevel()
    this._getGoods()
    this._getjzList()
    this._getcgList()
  },
  methods: {
    _goback () {
      this.$router.push('/projectRegister')
    },
    // 获取任务类型
    _getTaskTypeList () {
      let params = {
        categoryCode: 'taskType',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.taskTypeList = res.data.data && res.data.data.sysDictList
          this.taskTypeList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
          this.taskTypeList.forEach(element => {
            if (this.type === element.name) {
              this.formInfo.taskType = element.dictId
              this.formInfo.taskTypeName = element.name
            }
          })
          
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取病区
    _getAreaList () {
      getAreaList().then(res => {
        if (res.data.code === 200) {
          this.areaList = res.data.data
          this.areaList.forEach(element => {
            element.id = element.id.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取运送工具
    _getTools () {
      let params = {
        categoryCode: 'tool',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.toolsList = res.data.data && res.data.data.sysDictList
          this.toolsList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取嘱托
    _getEntrust () {
      let params = {
        categoryCode: 'entrust',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.entrustList = res.data.data && res.data.data.sysDictList
          this.entrustList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取检查项目
    _getCheckType () {
      let params = {
        categoryCode: 'checkType',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.checkTypeList = res.data.data && res.data.data.sysDictList
          this.checkTypeList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取目的地
    _getDept () {
      let params = {
        categoryCode: 'dept',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.deptList = res.data.data && res.data.data.sysDictList
          this.deptList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取紧急程度
    _getLevel () {
      let params = {
        categoryCode: 'level',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.urgentLevelList = res.data.data && res.data.data.sysDictList
          this.urgentLevelList.forEach(element => {
            element.dictId = element.dictId.toString()
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取物品
    _getGoods () {
      let params = {
        categoryCode: 'goods',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.goodsList = res.data.data && res.data.data.sysDictList
          this.goodsList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取急诊标本
    _getjzList () {
      let params = {
        categoryCode: 'urgentSample',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.jzList = res.data.data && res.data.data.sysDictList
          this.jzList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 获取常规标本
    _getcgList () {
      let params = {
        categoryCode: 'commonSample',
        status: 1
      }
      dictByCategoryId(params).then(res => {
        if (res.data.code === 200) {
          this.cgList = res.data.data && res.data.data.sysDictList
          this.cgList.forEach(element => {
            element.dictId = element.dictId.toString()
            element.isActive = false
          })
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    taskTypeChange (val) {
      this.taskTypeList.forEach(element => {
        if (val === element.dictId) {
          this.formInfo.taskTypeName = element.name
          this.$forceUpdate()
        }
      })
    },
    fromSpaceChange (val) {
      if (val === 'others') {
        this.otherFromSpace = true
      } else {
        this.otherFromSpace = false
      }
    },
    toSpaceChange (val) {
      if (val === 'others') {
        this.otherToSpace = true
      } else {
        this.otherToSpace = false
      }
    },
    toolsClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.tool = []
      this.toolsList.forEach(element => {
        if (element.isActive) {
          this.tool.push(element.name)
        }
      })
      this.$forceUpdate()
    },
    liClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.$forceUpdate()
    },
    jzClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.$forceUpdate()
    },
    cglick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.$forceUpdate()
    },
    entrustClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.entrust = []
      this.entrustList.forEach(element => {
        if (element.isActive) {
          this.entrust.push(element.name)
        }
      })
      this.$forceUpdate()
    },
    goodsClick (item,index) {
      if (item.isActive) {
        item.isActive = false
      } else {
        item.isActive = true
      }
      this.goods = []
      this.goodsList.forEach(element => {
        if (element.isActive) {
          this.goods.push(element.dictId)
        }
      })
      this.$forceUpdate()
    },
    active_text (item) {
      console.log(item)
    },
    _delHandle (item, index) {
      this.checkList.splice(index,1)
    },
    _chooseItem () {
      let obj = {
        workerGroup: '',
        worker: '',
        phone: ''
      }
      this.checkList.push(obj)
    },
     addHandle (str) {
      this.visible = true
      this.specimenType = str
      this.specimenName = ''
    },
    _itemHandleClose () {
      this.visible = false
    },
    addSpecimenHandle () {
      if (this.specimenType === '常规标本') {
        let obj = {
          name: this.specimenName,
          isActive: false,
          hasDel: true
        }
        this.cgList.push(obj)
      } else {
        let obj = {
          name: this.specimenName,
          isActive: false,
          hasDel: true
        }
        this.jzList.push(obj)
      }
      this.visible = false
    },
    delJz (item,index) {
      this.jzList.splice(index,1)
    },
    delCg (item,index) {
      this.cgList.splice(index,1)
    },
    _onSubmit () {
      if (this.formInfo.taskTypeName === '陪检') {
        this.checkHandle()
      } else if (this.formInfo.taskTypeName === '标本') {
        this.specimenHandle()
      } else {
        this.goodsHandle()
      }
    },
    checkHandle () {
      if (this.checkList.length === 0) {
        this.$message.warning('请添加检查信息')
        return false
      } else {
        for (let i=0;i<this.checkList.length;i++) {
          if (this.checkList[i].checkId === '') {
            this.$message.warning('请选择检查项目')
            return false
          } else if (this.checkList[i].destinationId === '') {
            this.$message.warning('请选择目的地')
            return false
          } else if (this.checkList[i].keepTime === '') {
            this.$message.warning('请选择陪检时间')
            return false
          }
        }
      }
      let taskKeepCheckList = []
      this.checkList.forEach(element => {
        let obj = {
          checkId: element.checkId,
          destinationId: element.destinationId,
          keepTime: element.keepTime,
          urgentFlag: element.urgentFlag
        }
        taskKeepCheckList.push(obj)
      })
      let parms = {
        applicantId: this.form1Info.userId,
        taskType: this.formInfo.taskType,
        applicantUser: this.form1Info.applicantUser,
        applicantPhone: this.form1Info.applicantPhone,
        areaId: this.form1Info.areaId,
        hospitalNo: this.form1Info.hospitalNo,
        bedNo: this.form1Info.bedNo,
        patientName: this.form1Info.patientName,
        tool: this.tool.join(';'),
        entrust: this.entrust.join(';'),
        remark: this.form1Info.entrust,
        taskKeepCheckList: taskKeepCheckList,
        source: 2,
        taskOrderNumber: ''
      }
      this.$refs.form1Info.validate(valid => {
        if (valid) {
          addTaskOrder(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
              let curIndex = ''
              subPathList.forEach((element,index) => {
                if (element.text === '陪检运送') {
                  curIndex = index
                }
              })
              subPathList.splice(curIndex, 1)
              localStorage.setItem('subPath', JSON.stringify(subPathList))
              this.$router.push('/projectRegister')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    specimenHandle () {
      let commonSampleList = [], urgentSampleList = []
      this.jzList.forEach(element => {
        let obj = {
          sampleName: element.name,
          isDeleteAllow: element.hasDel?element.hasDel:false,
          isSelected: element.isActive
        }
        urgentSampleList.push(obj)
      })
      this.cgList.forEach(element => {
        let obj = {
          sampleName: element.name,
          isDeleteAllow: element.hasDel?element.hasDel:false,
          isSelected: element.isActive
        }
        commonSampleList.push(obj)
      })
      let parms = {
        applicantId: this.form1Info.userId,
        taskType: this.formInfo.taskType,
        areaId: this.form2Info.areaId,
        urgentLevel: this.form2Info.urgentLevel,
        applicantUser: this.form2Info.applicantUser,
        applicantPhone: this.form2Info.applicantPhone,
        taskTransportSample: {
          transportTime: this.form2Info.transportTime,
          destination: this.form2Info.destination,
          tool: this.tool.join(';'),
          remark: this.form2Info.remark
        },
        commonSampleList: commonSampleList,
        urgentSampleList: urgentSampleList,
        source: 2
      }
      this.$refs.form2Info.validate(valid => {
        if (valid) {
          addTransportSample(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
              let curIndex = ''
              subPathList.forEach((element,index) => {
                if (element.text === '陪检运送') {
                  curIndex = index
                }
              })
              subPathList.splice(curIndex, 1)
              localStorage.setItem('subPath', JSON.stringify(subPathList))
              this.$router.push('/projectRegister')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    goodsHandle () {
      let parms = {
        applicantId: this.form1Info.userId,
        taskType: this.formInfo.taskType,
        areaId: this.form3Info.areaId,
        urgentLevel: this.form3Info.urgentLevel,
        applicantUser: this.form3Info.applicantUser,
        applicantPhone: this.form3Info.applicantPhone,
        taskTransportGoods: {
          transportType: Number(this.form3Info.transportType),
          transportTime: this.form3Info.transportTime,
          fromSpace: this.form3Info.fromSpace === 'others'? this.form3Info.otherFromSpace: this.form3Info.fromSpace,
          toSpace: this.form3Info.toSpace === 'others'? this.form3Info.otherToSpace: this.form3Info.toSpace,
          goods: this.goods.join(';'),
          remark: this.form3Info.remark,
          taskOrderId: ''
        },
        source: 2
      }
      this.$refs.form3Info.validate(valid => {
        if (valid) {
          addTransportGoods(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message)
              let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
              let curIndex = ''
              subPathList.forEach((element,index) => {
                if (element.text === '陪检运送') {
                  curIndex = index
                }
              })
              subPathList.splice(curIndex, 1)
              localStorage.setItem('subPath', JSON.stringify(subPathList))
              this.$router.push('/projectRegister')
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  .wrapper-form {
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    height: calc(100vh - 150px);
    overflow: scroll;
    padding: 10px 15px;
    .wrapper-top {
      height: 45px;
      padding: 10px 15px;
      margin-bottom: 15px;
      line-height: 45px;
      text-align: right;
      display: flex;
      justify-content: space-between;
    }
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
        padding: 15px 30px;
      }
      .form-row1 {
        padding: 15px 80px;
      }
    }
    .ul {
      margin-bottom: 10px;
      .li {
        float: left;
        line-height: 42px;
        text-align: center;
        border: 1px solid #e8eaed;
        border-radius: 6px;
        padding: 0 30px;
        margin-right: 15px;
        cursor: pointer;
        position: relative;
        i {
          font-size: 16px;
          position: absolute;
          right: -5px;
          top: -20px;
        }
      }
      .li.active {
        background: #217DFA;
        color: #fff;
        // padding: 0 21px;
        i {
          color: #333;
        }
      }
    }
    .upDiv {
      .tip {
        margin-left: 10px;
        i {
          color: #FF4141;
          margin-right: 2px;
        }
      }
      .uploadBtn {
        color: #FF8E2F;
        border-color: #FF8E2F;
      }
    }
    .fileName {
      position: relative;
      .imgDiv {
        position: relative;
        float: left;
        margin: 0 18px 20px 0;
        border-radius: 5px;
      }
      img {
        display: block;
        width: 130px;
        height: 80px;
        border-radius: 5px;
      }
      .imgDelete {
        position: absolute;
        font-size: 24px;
        top: -10px;
        right: 4px;
        cursor: pointer;
      }
      .aDelete {
        position: absolute;
        font-size: 24px;
        top: -10px;
        cursor: pointer;
      }
    }
  }
  .pos {
    position: relative;
    .star {
      position: absolute;
      color: red;
      top: 15px;
      left: 6px;
    }
  }
  .delBtn {
    text-align: center;
    font-size: 30px;
    cursor: pointer;
  }
  .chooseBtn {
    height: 40px;
    color: #333;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    cursor: pointer;
  }
  .line40 {
    line-height: 40px;
    text-align: center;
  }
}
.bot-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  margin-top: 5px;
  .cancelBtn {
    border-color: #FF8E2F;
    color: #FF8E2F;
  }
}
.drawer-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  border-top: 1px solid #e5e5e5;
  margin-top: 5px;
}
</style>