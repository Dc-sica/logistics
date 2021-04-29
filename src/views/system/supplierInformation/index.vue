<template>

  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="name" clearable placeholder="名称/联系人/联系号码"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select placeholder="请选择" v-model="status" clearable>
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="serchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button icon="el-icon-plus" type="primary" @click="_addItemHandle">新建</el-button>
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table  :data="tableData" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#E8EAED'}"  stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip prop="name"></el-table-column>
        <el-table-column label="编号" show-overflow-tooltip prop="code"></el-table-column>
        <el-table-column label="联系人" prop="contacts"></el-table-column>
        <el-table-column label="联系号码" show-overflow-tooltip prop="phone"></el-table-column>
        <el-table-column label="开户行" prop="bank"></el-table-column>
        <el-table-column label="账号" show-overflow-tooltip prop="bankAccount"></el-table-column>
        <el-table-column label="联系地址" show-overflow-tooltip prop="address"></el-table-column>
        <el-table-column label="联系邮箱" show-overflow-tooltip prop="contactsEmail"></el-table-column>
        <el-table-column label="法人代表" prop="legalPerson"></el-table-column>
        <el-table-column label="工商注册号" show-overflow-tooltip prop="registerNumber"></el-table-column>
        <el-table-column label="厂商" show-overflow-tooltip prop="manufacturerName"></el-table-column>
        <el-table-column label="品牌" prop="brandName">
          <template slot-scope="scope">
            <div v-for="item in scope.row.brandName.split(',')" :key="item.name">
              {{item}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '启用': '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" v-if="scope.row.status === 1" effect="dark" content="禁用" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe72e;'" @click="_disableItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" v-else effect="dark" content="启用" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe6b4;'" @click="_disableItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    <!-- 新增 -->
    <Drawer
        :title="title"
        :visible="itemVisible"
        @cancel="_itemHandleClose"
        @confirm="_itemSaveHandle('itemForm')"
        width="40%"
        :hideFooter="isCha == 1 ? false : true"
        :footerBtns="[
          {
            text: '保存',
            type: 'primary',
            trigger: 'confirm',
          },
          {
            text: '取消',
            type: 'info',
            trigger: 'cancel',
          },
        ]"
      >
      <el-form :inline='false' style="width: 95%;" :rules="rules" ref="itemForm" :model="itemForm">
        <el-form-item label="编号：" v-if="this.isEdit" prop="code" label-width="100px">
          <el-input placeholder="编号" v-model="itemForm.code" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="name" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入名称" maxlength="40" v-model="itemForm.name"></el-input>
          <span v-else>{{itemForm.name}}</span>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入联系人" v-model="itemForm.contacts" maxlength="10"></el-input>
          <span v-else>{{itemForm.contacts}}</span>
        </el-form-item>
        <el-form-item label="联系号码：" prop="phone" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入联系号码" maxlength="11" v-model="itemForm.phone"></el-input>
          <span v-else>{{itemForm.phone}}</span>
        </el-form-item>
        <el-form-item label="开户行：" prop="bank" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入开户行" v-model="itemForm.bank" maxlength="20"></el-input>
          <span v-else>{{itemForm.bank}}</span>
        </el-form-item>
        <el-form-item label="账号：" prop="bankAccount" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入账号" @input="itemForm.bankAccount=itemForm.bankAccount.replace(/[^\d]/g,'')" v-model="itemForm.bankAccount" maxlength="20"></el-input>
          <span v-else>{{itemForm.bankAccount}}</span>
        </el-form-item>
        <el-form-item label="联系地址：" prop="address" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入联系地址" v-model="itemForm.address" maxlength="40"></el-input>
          <span v-else>{{itemForm.address}}</span>
        </el-form-item>
        <el-form-item label="法人代表：" prop="legalPerson" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入法人代表" v-model="itemForm.legalPerson" maxlength="4"></el-input>
          <span v-else>{{itemForm.legalPerson}}</span>
        </el-form-item>
        <el-form-item label="工商注册号：" prop="registerNumber" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入工商注册号" v-model="itemForm.registerNumber" maxlength="18"></el-input>
          <span v-else>{{itemForm.registerNumber}}</span>
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="contactsEmail" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入联系邮箱" v-model="itemForm.contactsEmail" maxlength="20"></el-input>
          <span v-else>{{itemForm.contactsEmail}}</span>
        </el-form-item>
        <el-form-item label="厂商：" label-width="100px">
          <el-select v-if="isCha == 1" v-model="firmValue" @input="firmChange" placeholder="请选择" style="width:100%;">
            <el-option v-for="item in firmOptions" :key="item.manufacturerId" :label="item.name" :value="item.manufacturerId">
            </el-option>
          </el-select>
          <span v-else>{{itemForm.manufacturerName}}</span>
          <!-- <el-tag v-else :key="tag" v-for="tag in itemForm.supplierName" type="info" :disable-transitions="false">
            {{tag}}
          </el-tag> -->
        </el-form-item>
        <el-form-item label="品牌：" label-width="100px">
          <el-select v-if="isCha == 1" v-model="suppValue" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="item in suppOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-tag v-else :key="tag" v-for="tag in itemForm.brandName" type="info" :disable-transitions="false">
            {{tag}}
          </el-tag>
        </el-form-item>
        <el-form-item label="状态：" label-width="100px" prop="status">
          <el-radio-group v-if="isCha == 1" v-model="itemForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
          <span v-else>{{itemForm.status == 1 ? '启用' : '禁用'}}</span>
        </el-form-item>
      </el-form>
    </Drawer>
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from './../../../components/pagination/index'
  import {
    updateStatus,
    selectSupplierPage,
    addSupplier,
    updateSupplier,
    // delSupplier,
    getManufacturer,
    getBrandInfo,
    supExport
  } from './../../../apis/supplierInformation/indexApi'
  export default {
    name: 'supplierInformation', //供应商管理
    components: {
      pagination
    },
    data() {
      return {
        multipleSelection: [],
        excelBtns: '',
        excelBtnList: [{
            label: "全部导出",
            value: "1",
          },
          {
            label: "批量导出",
            value: "2",
          },
        ],
        suppValue: [],
        suppOptions: [],
        firmValue: '',
        firmOptions: [],
        isCha: 1,
        name: '',
        status: '',
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
        itemVisible: false,
        direction: 'rtl',
        attrVisible: false,
        itemForm: {},
        title: '',
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          contacts: [{
            required: true,
            message: '请输入联系人',
            trigger: 'change'
          }],
          phone: [{
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
          }, {
            pattern: /^1[356789]\d{9}$/,
            message: '格式不正确'
          }],
        },
        currentObj: null,
        storeList: [],
        isEdit: false,
        supplierId: ''
      }
    },
    created() {
      this._getData()
      getManufacturer().then(res => {
        if (res.data.code === 200) {
          this.firmOptions = res.data.data
        }
      })
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 导出
      selectionHandle() {
        let params = {
          condition: this.name,
          status: this.status,
        };
        if (this.excelBtns == "1") {
          // 全部导出
          supExport(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "供应商信息.xlsx";
              downloadLink.click();
              window.URL.revokeObjectURL(downUrl);
            }
          });
          this.excelBtns = "";
        } else if (this.excelBtns == "2") {
          // 批量导出
          if (
            this.multipleSelection === undefined ||
            this.multipleSelection.length === 0
          ) {
            this.$message.warning("请选择要导出的数据");

            this.excelBtns = "";
            return false;
          } else {
            let ids = [];
            this.multipleSelection.forEach((element) => {
              ids.push(element.supplierId);
            });
            params.ids = ids
            supExport(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "供应商信息.xlsx";
                downloadLink.click();
                window.URL.revokeObjectURL(downUrl);
              }
            });
          }
          this.excelBtns = "";
        }

      },
      reset() {
        this.name = ''
        this.status = ''
      },
      _getData() {
        selectSupplierPage({
          condition: this.name,
          status: this.status,
          current: this.currentPage,
          size: this.pageSize
        }).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            this.tableData.map((item) => {
              if (item.brandName == null) {
                item.brandName = ''
              }
            })
          }
        })
      },
      serchHandle() {
        this.currentPage = 1
        this._getData()
      },
      _addItemHandle() {
        this.isCha = 1
        this.title = '新增供应商'
        this.itemVisible = true
        this.isEdit = false
        this.itemForm = {}
        this.itemForm.status = 1
      },
      _editItemHandle(row) {
        this.isCha = 1
        this.title = '编辑供应商'
        this.itemVisible = true
        this.isEdit = true
        let obj = JSON.parse(JSON.stringify(row))
        this.$nextTick(() => {
          this.itemForm = obj
          this.supplierId = obj.supplierId
          this.firmValue = this.itemForm.mfId
          this.firmChange(this.firmValue)
          if (this.itemForm.brand) {
            this.suppValue = this.itemForm.brand.split(',').map(Number)
          }
        })
      },
      _disableItemHandle(row) {
        let status = ''
        if (row.status === 1) {
          status = 0
        } else {
          status = 1
        }
        let parms = {
          id: row.supplierId,
          // status: status
        }
        updateStatus(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success('操作成功')
            this._getData()
          } else {
            this.$message.error(res.data.message)
          }
        })
      },

      _itemHandleClose() {
        this.itemVisible = false
        this.title = ''
        this.suppValue = [],
          this.suppOptions = [],
          this.firmValue = '',
          this.$refs['itemForm'].resetFields();
      },
      _itemSaveHandle(itemForm) {
        this.itemVisible = false
        this.title = ''
        if (this.isEdit) {
          this.updateHandle(itemForm)
        } else {
          this.addHandle(itemForm)
        }
        this._getData()
      },
      addHandle(itemForm) {
        let parms = {
          brand: this.suppValue,
          mfId: this.firmValue,
          code: this.itemForm.code,
          name: this.itemForm.name,
          contacts: this.itemForm.contacts,
          phone: this.itemForm.phone,
          bank: this.itemForm.bank,
          bankAccount: this.itemForm.bankAccount,
          address: this.itemForm.address,
          legalPerson: this.itemForm.legalPerson,
          registerNumber: this.itemForm.registerNumber,
          contactsEmail: this.itemForm.contactsEmail,
          status: this.itemForm.status
        }
        this.$refs[itemForm].validate((valid) => {
          if (valid) {
            addSupplier(parms).then(res => {
              if (res.data.code === 200) {
                this._itemHandleClose()
                this._getData()
              } else {
                this.$message.error(res.data.message)
              }
            })
          } else {
            console.log('error submit!!')
            this.itemVisible = true
            return false
          }
        })
      },
      updateHandle(itemForm) {
        let parms = {
          brand: this.suppValue,
          mfId: this.firmValue,
          supplierId: this.supplierId,
          code: this.itemForm.code,
          name: this.itemForm.name,
          contacts: this.itemForm.contacts,
          phone: this.itemForm.phone,
          bank: this.itemForm.bank,
          bankAccount: this.itemForm.bankAccount,
          address: this.itemForm.address,
          legalPerson: this.itemForm.legalPerson,
          registerNumber: this.itemForm.registerNumber,
          contactsEmail: this.itemForm.contactsEmail,
          status: this.itemForm.status
        }
        this.$refs[itemForm].validate((valid) => {
          if (valid) {
            updateSupplier(parms).then(res => {
              if (res.data.code === 200) {
                this._itemHandleClose()
                this._getData()
              } else {
                this.$message.error(res.data.message)
              }
            })
          } else {
            console.log('error submit!!')
            this.itemVisible = true
            return false
          }
        })
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      },
      _toDetailHandle(row) {
        // 查看
        this.title = '供应商详情'
        this.itemVisible = true
        this.isEdit = false
        this.isCha = 0
        let obj = JSON.parse(JSON.stringify(row))
        this.$nextTick(() => {
          this.itemForm = obj
          if (this.itemForm.brandName === '' || !this.itemForm.brandName) {
            this.itemForm.brandName = []
          } else {
            this.itemForm.brandName = this.itemForm.brandName.split(',')
          }
        })

      },
      // 获取厂商下对应品牌
      firmChange(val) {
        if (val) {
          this.suppOptions = []
          this.suppValue = []
          let params = {
            manufacturerId: val
          }
          getBrandInfo(params)
            .then((res) => {
              if (res.data.code === 200) {
                // 下拉品牌
                this.suppOptions = res.data.data
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch((error) => {
              this.$message.error(error)
            })
        }
      },
    }
  }
</script>
<style lang="less">
  .el-dialog__header {
    background: #1D93A8;

    .el-dialog__title {
      color: #fff;
    }

    .el-dialog__close {
      color: #fff;
    }
  }

  .el-drawer.rtl {
    width: 35% !important;
    overflow-y: scroll;

    .closeTitle {
      height: 50px;
      line-height: 50px;
      padding-top: 0;
      padding-left: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      border-bottom: 1px solid #e8eaed;
    }

    .close-icon {
      float: right;
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
<style lang="less" scoped>
  .el-tag+.el-tag {
    margin-left: 10px;
  }
  .wrapper {
    .wrapper-form {
      background: #fff;
      height: 45px;
      padding: 10px 15px;
      margin-bottom: 15px;
    }

    .warpper-table {
      background: #fff;
      box-sizing: border-box;
      padding: 15px;

      .table-btn {
        margin-bottom: 10px;
      }

      .addBtn {
        background: #1D93A8;
        color: #fff;
        // height: 36px;
        // float: left;
        margin-right: 20px;
        // padding: 10px 20px;
      }
    }
  }
</style>