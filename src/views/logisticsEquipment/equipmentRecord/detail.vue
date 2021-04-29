<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_backHandle">返回</el-button>
    </Container>
    <Container height="fill" scrollY="true">
      <div class="form-box">
        <p class="form-title">基本信息</p>
        <div class="form-row">
          <el-form :model="formInfo" ref="formInfo" :rules="rules" label-width="110px">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="设备名称：" prop="name">
                  <span>{{ formInfo.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任人：">
                  <span>{{ formInfo.userName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设备分类：" prop="typeId">
                  <span>{{ formInfo.typeName }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="原值：" prop="price">
                  <span>{{ formInfo.price }}</span>元
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="型号：" prop="model">
                  <span>{{ formInfo.model }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="条形码：">
                  <span>{{ formInfo.barCode }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="状态：" prop="status">
                  <span>{{ formInfo.status == 1 ? "开启" : "关闭" }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="购置日期：" prop="buyDate">
                  <span>{{ formInfo.buyDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用年限：" prop="usefulYears">
                  <span>{{ formInfo.usefulYears }}</span>年
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <!-- <el-col :span="8">
                <el-form-item label="已使用年限：">
                  <el-input v-model="formInfo.name" placeholder="请输入">
                    <template slot="append">月</template></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="设备位置：">
                  <span>{{ formInfo.location }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="责任科室：">
                  <span>{{ formInfo.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="报修描述标签：">
                  <span>{{ formInfo.labelsList }}</span>
                  <el-tag v-for="(item, index) in formInfo.labelsNameList" class="dscTag" :key="index"><span class="dscTag-img"><img :src="imgUrl" width="100%" height="100%" /></span>{{ item }}</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-box">
        <div class="form-box table-box">
          <p class="form-title">
            参数信息
          </p>
          <div class="table-content">
            <el-table height="25vh" size="small" :data="tableData" border @selection-change="handleSelectionChangeArr" highlight-current-row>
              <el-table-column label="参数编码" prop="code"></el-table-column>
              <el-table-column label="参数名称" prop="name"></el-table-column>
              <el-table-column label="分类名称" prop="typeName"></el-table-column>
              <el-table-column label="参数值" prop="unit"></el-table-column>
              <el-table-column label="参数单位" prop="unitName"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="form-box">
        <p class="form-title">维保信息</p>
        <div class="form-row">
          <el-form :model="formInfo" ref="formInfo1" :rules="rules" label-width="110px">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="厂商：" prop="manufacturerId">
                  <span>{{ formInfo.manufacturerName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌：">
                  <span>{{
                    formInfo.brandNameList && formInfo.brandNameList.join(";")
                  }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="厂家联系人：">
                  <span>{{ formInfo.contacts }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="厂家联系方式：">
                  <span>{{ formInfo.phoneff }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修人：">
                  <span>{{ formInfo.repairUser }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修电话：" prop="repairUserPhone">
                  <span>{{ formInfo.repairUserPhone }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="供应商：">
                  <span>{{
                    formInfo.supplierName && formInfo.supplierName.join(";")
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保修日期：" prop="repairEndDate">
                  <span>{{ formInfo.repairEndDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="维修公司：">
                  <span>{{ formInfo.repairEndDate }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="form-box">
        <p class="form-title">附件</p>
        <div class="form-row">
          <el-form :model="formInfo" ref="formInfo2" :rules="rules" label-width="110px">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="保修图片：">
                  <div class="fileName">
                    <div class="imgDiv" style="top: 15px" v-for="(item, index) in fileList" :key="index">
                      <img :src="item.url" alt="" />
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备档案：">
                  <div class="fileName">
                    <div class="a-visited" style="display: block" v-for="(item, index) in recordfileList" :key="index">
                      <a class="a-filDel" style="margin-right: 10px" :href="item.url" target="_blank" :download="item.name">{{
                        item.name
                      }}</a>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-dialog v-if="visible" :close-on-click-modal="false" :visible="visible" class="dialog-wrapper" width="700px" title="选择参数" :before-close="_itemHandleClose">
        <el-form size="small" :inline="true" :model="formInfoParam" class="demo-form-inline">
          <el-form-item label="参数名称:">
            <el-input v-model.trim="formInfoParam.name"></el-input>
          </el-form-item>
          <el-form-item label="单位:">
            <el-select v-model="formInfoParam.unitId" placeholder="请选择">
              <el-option v-for="(item, index) in unitList" :key="index" :label="item.name" :value="item.dictId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="lookParamter">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table size="small" :data="tableParamData" border @selection-change="handleSelectionChange" highlight-current-row>
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="参数编码" align="center" prop="code"></el-table-column>
          <el-table-column label="参数名称" align="center" prop="name"></el-table-column>
          <el-table-column label="分类名称" align="center" prop="typeName" width="180"></el-table-column>
          <el-table-column label="参数值" align="center" prop="unit"></el-table-column>
          <el-table-column label="参数单位" prop="unitName"></el-table-column>
          <el-table-column label="备注" align="center" prop="remark"></el-table-column>
        </el-table>
        <div style="text-align: center; padding-top: 10px; margin-top: 10px">
          <el-button size="small" @click="_itemHandleClose" style="color: #ff8c00; border-color: #ff8c00">取消</el-button>
          <el-button size="small" @click="handleSubmitParam" type="primary">提交</el-button>
        </div>
      </el-dialog>
    </Container>
  </ContainerGroup>
</template>

<script>
  import {
    upload
  } from "./../../../apis/commonApi";
  import {
    getManufacturerListPage,
    getBrandInfo,
    getSupplier,
  } from "./../../../apis/manufacturerInformation/indexApi";
  import {
    getParambuildInit,
    getAllPersonlist,
    getBuildInit,
    getParamList,
    addEquipmentData,
    lookRecordById,
  } from "./../../../apis/logisticsEquipment/index";
  import {
    getDept
  } from "./../../../apis/userManagement/indexApi";
  export default {
    name: "edit",
    data() {
      // 验证手机
      let checkPhone = (rule, value, callback) => {
        let reg = /^1[345789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入11位手机号"));
        } else {
          callback();
        }
      };
      // 验证使用年限为正整数
      let checkUsefulYears = (rule, value, callback) => {
        if (Number.isInteger(Number(value)) && Number(value) > 0) {
          callback();
        } else {
          callback(new Error("请输入正整数"));
        }
      };

      return {
        imgUrl: require("../../../assets/image/hqduihao.png"),
        formInfoParam: {},
        supplierList: [], //经销商
        brandList: [], //品牌
        manufacturerList: [], //厂商
        tagdscList: [],
        personList: [],
        deptList: [],
        shebeiClass: [],
        tableData: [],
        warehouseList: [],
        visible: false,
        fileList: [],
        recordfileList: [],
        formInfo: {
          name: "",
        },
        multipleSelection: [],
        multipleParamSelection: [],
        rules: {
          name: [{
            required: true,
            message: "请输入设备名称",
            trigger: "blur",
          }, ],
          typeId: [{
            required: true,
            message: "请选择设备分类",
            trigger: "blur",
          }, ],
          price: [{
              required: true,
              message: "请输入原值",
              trigger: "blur",
            },
            {
              type: "number",
              message: "原值必须为数字值",
            },
          ],
          model: [{
            required: true,
            message: "请输入型号",
            trigger: "blur",
          }, ],
          status: [{
            required: true,
            message: "请选择状态",
            trigger: "blur",
          }, ],
          buyDate: [{
            required: true,
            message: "请选择购置日期",
            trigger: "blur",
          }, ],
          manufacturerId: [{
            required: true,
            message: "请选择厂商",
            trigger: "blur",
          }, ],
          repairEndDate: [{
            required: true,
            message: "请选择保修日期",
            trigger: "blur",
          }, ],
          repairUserPhone: [{
            type: "number",
            validator: checkPhone,
            message: "请输入11位有效手机号号码",
            trigger: ["blur", "change"],
          }, ],
          usefulYears: [{
            type: "number",
            validator: checkUsefulYears,
            message: "请输入正整数",
            trigger: ["blur", "change"],
          }, ],
        },
        tableParamData: [],
        unitList: [],
      };
    },
    created() {
      this.getSupplierList();
      this.getManufacturerListPageList();
      this.getParambuildInitList();
      this.getBrandInfoList();
      this.getAllPersonlistArr();
      this.getBuildInitlist();
      this.getParamListData();
      this.getunitList();
      this.lookRecordDataById(this.$route.query.id);
    },
    methods: {
      lookRecordDataById(value) {
        //查看数据
        let param = {
          id: value,
        };
        lookRecordById(param).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            let result = res.data.data || {};
            this.formInfo = result;
            setTimeout(() => {
              this.formInfo.status = result.status + "";
              this.formInfo.phoneff = result.phone;
              result.paramCheckDoList.forEach((item) => {
                item.unit = item.value;
              });
              this.tableData = result.paramCheckDoList;
              if (result.archives&&result.archives.length > 0) {
                //设备档案文件
                result.archives.forEach((item) => {
                  this.recordfileList.push({
                    name: item.substr(item.lastIndexOf("/") + 1),
                    url: item,
                  });
                });
              }
              if (result.equipmentPictureList&&result.equipmentPictureList.length > 0) {
                //图片
                result.equipmentPictureList.forEach((item) => {
                  this.fileList.push({
                    name: item.substr(item.lastIndexOf("/") + 1),
                    url: item,
                  });
                });
              }
            }, 100);
          }
        });
      },
      handleGetPhonePerson(value) {
        //选择厂商填充厂家联系人、联系方式
        this.manufacturerList.forEach((item) => {
          if (value === item.manufacturerId) {
            this.formInfo.contacts = item.contacts;
            this.formInfo.phoneff = item.phone;
          }
        });
      },
      handleSubmitParam() {
        //参数弹窗提交
        if (this.multipleParamSelection.length === 0) {
          this.$message.warning("请选择要提交的数据");
          return false;
        }
        this._itemHandleClose();
        this.tableData = this.multipleParamSelection;
      },
      getParamListData() {
        //获取设备参数
        let param = {
          ...this.formInfoParam,
        };
        getParamList(param).then((res) => {
          if (res.data.code === 200) {
            this.tableParamData = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      deleteFile(row) {
        //删除图片
        let index = this.fileList.indexOf(row);
        if (index > -1) {
          this.fileList.splice(index, 1);
        }
      },
      deleterecordFile(row) {
        //删除上传文件
        let index = this.recordfileList.indexOf(row);
        if (index > -1) {
          this.recordfileList.splice(index, 1);
        }
      },
      recordfileUpload(event) {
        let files = event.target.files;
        let maxSize = 1024 * 1024 * 10;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSize) {
            this.$message.error("上传文件不能大于10M");
            return false;
          } else {
            formData.append("file", files[i]);
          }
        }
        upload(formData).then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              this.recordfileList.push(element);
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      fileUpload(event) {
        let files = event.target.files;
        let maxSize = 1024 * 1024 * 10;
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSize) {
            this.$message.error("上传文件不能大于10M");
            return false;
          } else {
            formData.append("file", files[i]);
          }
        }
        upload(formData).then((res) => {
          if (res.data.code === 200) {
            res.data.data.forEach((element) => {
              this.fileList.push(element);
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      upLoadRecordFile() {
        this.$refs.recordfile.click();
      },
      upLoadFile() {
        if (this.fileList.length >= 9) {
          this.$message.warning("最多上传9张图片");
          return false;
        } else {
          this.$refs.file.click();
        }
      },
      getSupplierList() {
        //获取经销商下拉框
        getSupplier().then((res) => {
          if (res.data.code === 200) {
            this.supplierList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getBrandInfoList() {
        //获取品牌下拉框
        getBrandInfo().then((res) => {
          if (res.data.code === 200) {
            this.brandList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getManufacturerListPageList() {
        //厂商下拉框
        getManufacturerListPage().then((res) => {
          if (res.data.code === 200) {
            this.manufacturerList = res.data.data.list;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      handleDeletePreteme(row) {
        //参数列表删除
        let index = this.tableData.indexOf(row);
        if (index > -1) {
          this.tableData.splice(index, 1);
        }
      },
      getBuildInitlist() {
        //获取标签描述
        getBuildInit().then((res) => {
          if (res.data.code === 200) {
            this.tagdscList = res.data.data.repairDescriptionList; //维修标签描述
            this.deptList = res.data.data.deptList; //科室
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getAllPersonlistArr() {
        //获取全部责任人
        getAllPersonlist().then((res) => {
          if (res.data.code === 200) {
            this.personList = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getunitList() {
        //获取单位
        getDept({
          categoryCode: "unit",
          status: 1,
        }).then((res) => {
          if (res.data.code === 200) {
            this.unitList = res.data.data.sysDictList;
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      getParambuildInitList() {
        //获取设备分类下拉框
        getParambuildInit().then((res) => {
          if (res.data.code === 200) {
            this.shebeiClass = res.data.data.equipmentTypeList;
            this.shebeiClass.forEach((item) => {
              if (item.typeId == this.formInfo.typeId) {
                this.formInfo.typeName = item.name;
              }
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      handleApproval(formName) {
        //确定
        let paramListnew = [];
        let fileListnew = []; //图片
        let recordfileListnew = []; //备案文件
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach((item) => {
            paramListnew.push({
              paramId: item.id,
              value: item.unit,
            });
          });
        }
        if (this.fileList.length > 0) {
          this.fileList.forEach((item) => {
            fileListnew.push(item.url);
          });
        }
        if (this.recordfileList.length > 0) {
          this.recordfileList.forEach((item) => {
            recordfileListnew.push(item.url);
          });
        }
        let param = {
          ...this.formInfo,
          equipmentPictureList: fileListnew, //图片
          archives: recordfileListnew, //设备档案文件
          paramList: paramListnew, //参数列表
        };
        let validTrue = [];
        formName.forEach((item) => {
          this.$refs[item].validate((valid) => {
            if (valid) {
              validTrue.push(valid);
            }
          });
        });
        if (validTrue.length == 2) {
          addEquipmentData(param).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              this.$router.push({
                path: "/equipmentRecord",
              });
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.warning("请检查数据填写格式");
        }
      },
      _backHandle() {
        //取消
        this.$router.push("/equipmentRecord");
      },
      lookParamter() {
        //弹框查询
        this.getParamListData();
      },
      handleChoseParamter() {
        //选择参数
        this.visible = true;
      },
      handleChange(file, fileList) {},
      // uploadFile(params) {
      //   let fd = new FormData()
      //   fd.append('file', params.file)
      //   upload(fd)
      //     .then(res => {
      //       if (res.data.code === 200) {
      //         this.fileList = this.fileList.concat(res.data.data)
      //         this.$message.success(res.data.message)
      //       } else {
      //         this.$message.error(res.data.message)
      //       }
      //     })
      //     .catch(err => {
      //       console.log('error', err)
      //       alert('上传失败,请重新上传')
      //     })
      // },
      _itemHandleClose() {
        this.visible = false;
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handleSelectionChangeArr(val) {
        this.multipleSelection = val;
      },
      handleSelectionChange(val) {
        this.multipleParamSelection = val;
      },
    },
  };
</script>

<style lang="less" scoped>
  .dscTag {
    display: inline-block;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    opacity: 1;
    background: #2265F9;
    border-radius: NaNpx;
    color: #ffffff;

    .dscTag-img {
      display: inline-block;
      width: 16px;
      height: 16px;
      position: relative;
      top: 4px;
      margin-right: 5px;
    }
  }

  .filDel {
    display: none;
    cursor: pointer;
  }

  .a-visited:hover {
    .filDel {
      display: inline-block;
    }

    .a-filDel {
      text-decoration: underline;
    }
  }

  .a-filDel {
    color: #2265F9;
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

  .upDiv {
    .tip {
      margin-left: 10px;

      i {
        color: #ff4141;
        margin-right: 2px;
      }
    }

    .uploadBtn {
      color: #ff8e2f;
      border-color: #ff8e2f;
    }
  }

  .wrapper-form {
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .wrapper-top {
    height: 45px;
    padding: 10px 15px;
    line-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    float: right;
    width: 92px;
    line-height: 34px;
    height: 35px;
    opacity: 1;
    background: #ffffff;
    border: 2px solid #ff8c00;
    text-align: center;
    border-radius: 22px;
    cursor: pointer;
  }

  .apbtn {
    margin-left: 25px;
    background: #ff8c00;
    color: #ffffff;
  }


  .form-box {
    border: 1px solid #e5e5e5;

    .form-title {
      border-bottom: 1px solid #e5e5e5;
      line-height: 35px;
      padding-left: 30px;
      font-weight: bold;
      text-align: left;
      color: #333333;
    }

    .form-row {
      padding: 15px 30px;
    }
  }

  .table-box {
    border-bottom: 1px solid #e5e5e5;
    border-top: none;
  }

  .table-content {
    padding: 10px 20px;
    overflow: scroll;
  }
</style>