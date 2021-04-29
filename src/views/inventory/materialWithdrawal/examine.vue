<template>
  <div class="wrapper">
    <div class="wrapper-table">
      <div class="form-box">
        <p class="form-title">
          领用信息
        </p>
        <div class="form-row">
          <el-row>
            <el-form :model="formInfo"
              ref="formInfo">
              <el-col :span="12">
                <div class="h40"><span>领用单号：</span>{{formInfo.orderId}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>领用状态：</span>
                {{formInfo.approvalStatus === 0?'未审批':(formInfo.approvalStatus === 1?'已批准':(formInfo.approvalStatus === 2?'已驳回':'已撤回'))}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>申请人：</span>{{formInfo.userName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>申请部门：</span>{{formInfo.deptName}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>联系方式：</span>{{formInfo.phone}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>仓库：</span>{{formInfo.warehouseName}}</div>
              </el-col>
             <el-col :span="12">
                <div class="h40"><span>录单时间：</span>{{formInfo.applicationTime}}</div>
              </el-col>
              <el-col :span="12">
                <div class="h40"><span>过账转态：</span>
                {{formInfo.applicationStatus === 0?'未过账':'已过账'}}</div>
              </el-col>
              <el-col :span="24">
                <div class="h40 fl"><span>备注：</span></div>
                <div class="h40 fl">{{formInfo.remark}}</div>
              </el-col>
            </el-form>
          </el-row>
        </div>
        <p class="form-title bt">
          物资明细
        </p>
        <div class="form-row p-clear">
          <div class="table-content">
          <el-table :data="tableData"
            border
            :header-cell-style="{background:'#E8EAED'}">
            <el-table-column label="序号"
              align="center"
              width="55"
              type="index"></el-table-column>
            <el-table-column label="名称"
              align="center"
              prop="name"></el-table-column>
            <el-table-column label="物料号"
              align="center"
              prop="materialId"></el-table-column>
            <el-table-column label="包装"
              align="center"
              prop="packet"></el-table-column>
            <el-table-column label="规格"
              align="center">
              <template slot-scope="scope">
                {{scope.row.materialSpecs}}{{scope.row.materialUnitName}}
              </template>
            </el-table-column>
            <el-table-column label="库存"
              align="center"
              prop="inventoryCount"></el-table-column>
            <el-table-column label="退库数量"
              align="center"
              prop="materialCount"></el-table-column>
            <el-table-column label="单价(元)"
              align="center"
              prop="price"></el-table-column>
            <el-table-column label="金额(元)"
              align="center"
              prop="totalAmount"></el-table-column>
            <el-table-column label="供应商"
              align="center"
              prop="supplier">
            </el-table-column>
          </el-table>
        </div>
        </div>
        <p class="form-title">
          审批信息
        </p>
        <div class="form-row p-clear">
          <el-col :span="12">
            <div class="group p-clear">
              <span class="sp h40"><i class="red">*</i>审批人：</span>
              <el-input class="inp" disabled v-model="name"></el-input>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="group p-clear">
              <span class="sp"><i class="red">*</i>审批意见：</span>
              <el-input type="textarea"
                class="text"
                placeholder="请输入描述，不超过300字"
                show-word-limit
                :rows="4"
                v-model="remark"
                :maxlength="300"></el-input>
            </div>
          </el-col>
        </div>
      </div>
      <div class="bot-button">
        <el-button round
          class="cancelBtn"
          @click="_goback">取消</el-button>
        <el-button round
          class="rejectBtn"
          @click="_reject">驳回</el-button>
        <el-button round
          type="primary"
          @click="_agree">同意</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { materialCollectionInfo, approvalMaterialCollection } from './../../../apis/materialRequisition'
export default {
  name: 'edit',
  data () {
    return {
      id: this.$route.query.id,
      drawerView: false,
      formInfo: {},
      formInline: {},
      formTable: {},
      tableData: [],
      warehouseList: [],
      supplierList: [],
      deptList: [],
      selectMaterial: [],
      typesData: [],
      materialList: [],
      liList: [],
      fileList: [],
      audioUrl: '',
      is_play: false,
      videoSrc: '',
      name: '',
      remark: '',
      userId: ''
    }
  },
  created () {
    this.getDetail()
  },
  mounted () {
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const { name, userId } = JSON.parse(userInfo)
      this.name = name
      this.userId = userId
    }
  },
  methods: {
    _goback () {
      this.$router.push('/materialWithdrawal/examineList')
    },
    getDetail () {
      let parms = {
        id: this.id
      }
      materialCollectionInfo(parms).then(res => {
        if (res.data.code === 200) {
          this.formInfo = JSON.parse(JSON.stringify(res.data.data))
          this.tableData = res.data.data.materialList
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _reject () {
      let parms = {
        "remark": this.remark,
        "approvalStatus": 2,
        "materialCollectionId": this.id,
        "userId": this.userId
      }
      if (this.remark === '') {
        this.$message.warning('请输入审批意见')
        return false
      }
      approvalMaterialCollection(parms).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
          let curIndex = ''
          subPathList.forEach((element,index) => {
            if (element.text === '物资退库-审批') {
              curIndex = index
            }
          })
          subPathList.splice(curIndex, 1)
          localStorage.setItem('subPath', JSON.stringify(subPathList))
          this.$router.push('/materialWithdrawal/examineList')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _agree () {
      let parms = {
        "remark": this.remark,
        "approvalStatus": 1,
        "materialCollectionId": this.id,
        "userId": this.userId
      }
      if (this.remark === '') {
        this.$message.warning('请输入审批意见')
        return false
      }
      approvalMaterialCollection(parms).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message)
          let subPathList = localStorage.getItem('subPath') && JSON.parse(localStorage.getItem('subPath')) || []
          let curIndex = ''
          subPathList.forEach((element,index) => {
            if (element.text === '物资退库-审批') {
              curIndex = index
            }
          })
          subPathList.splice(curIndex, 1)
          localStorage.setItem('subPath', JSON.stringify(subPathList))
          this.$router.push('/materialWithdrawal/examineList')
        } else {
          this.$message.error(res.data.message)
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
  .h40 {
    height: 40px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 170px;
      text-align: right;
    }
  }
  .fl {
    float: left;
  }
  .remark {
    margin: 5px 0 10px 0;
    border-radius: 6px;
    padding: 5px;
    width: 84%;
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
        i {
          font-size: 18px;
          position: relative;
          left: -2px;
          top: 1px;
        }
      }
      .li.active {
        background: #1d93a8;
        color: #fff;
        padding: 0 21px;
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
      margin-top: 15px;
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
  .group {
    margin-bottom: 30px;
    .sp {
      float: left;
      width: 130px;
      text-align: right;
      .red {
        color: red;
      }
    }
    .inp {
      width: 80%;
    }
    .text {
      float: left;
      width: 90%;
    }
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
  .rejectBtn {
    background: #FF5656;
    color: #fff;
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