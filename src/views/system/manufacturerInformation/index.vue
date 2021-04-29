<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true" ref="searchForm">
          <el-form-item label="关键词搜索：" prop="name">
            <el-input v-model="name" placeholder="名称/联系人/联系号码" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-select placeholder="请选择" v-model="status" clearable>
              <el-option value="0" label="禁用"></el-option>
              <el-option value="1" label="启用"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float:right;">
            <el-button type="primary" @click="searchHandle">查询</el-button>
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
      <el-table :data="tableData" border :header-cell-style="{background:'#E8EAED'}" @selection-change="handleSelectionChange" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="厂商名称" prop="name"></el-table-column>
        <el-table-column label="联系人" prop="contacts"></el-table-column>
        <el-table-column label="联系方式" prop="phone"></el-table-column>
        <el-table-column label="品牌" prop="brandName">
          <template slot-scope="scope">
            <div v-for="item in scope.row.brandName.split(',')" :key="item.name">
              {{item}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="供应商" prop="supplierName">
          <template slot-scope="scope">
            <div v-for="item in scope.row.supplierName.split(',')" :key="item.name">
              {{item}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @click.stop.native @change="active_text(scope.row)" active-color="#217DFA" inactive-color="#E5E5E5" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
        <el-form-item label="厂商名称：" prop="name" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入厂商名称" maxlength="40" v-model="itemForm.name"></el-input>
          <span v-else>{{itemForm.name}}</span>
        </el-form-item>
        <el-form-item label="联系人：" prop="contacts" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入联系人" v-model="itemForm.contacts" maxlength="10"></el-input>
          <span v-else>{{itemForm.contacts}}</span>
        </el-form-item>
        <el-form-item label="联系方式：" prop="phone" label-width="100px">
          <el-input v-if="isCha == 1" placeholder="请输入联系方式" maxlength="11" v-model="itemForm.phone"></el-input>
          <span v-else>{{itemForm.phone}}</span>
        </el-form-item>
        <el-form-item v-if="isCha == 1" label="品牌：" label-width="100px">
          <el-tag :key="tag.id" v-for="tag in itemForm.brandName" type="info" closable :disable-transitions="false" @close="handleTagClose(tag)">
            {{tag.name}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
        </el-form-item>
        <el-form-item v-else label="品牌：" label-width="100px">
          <el-tag :key="tag.id" v-for="tag in itemForm.brandName" type="info" :disable-transitions="false">
            {{tag.name}}
          </el-tag>
        </el-form-item>
        <el-form-item label="供应商：" label-width="100px">
          <el-select v-if="isCha == 1" v-model="suppValue" multiple placeholder="请选择" style="width:100%;">
            <el-option v-for="item in suppOptions" :key="item.supplierId" :label="item.name" :value="item.supplierId">
            </el-option>
          </el-select>
          <el-tag v-else :key="tag" v-for="tag in itemForm.supplierName" type="info" :disable-transitions="false">
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
    getManufacturerListPage,
    updateStatus,
    selectManufacturerById,
    getSupplier,
    addBrand,
    delBrand,
    getBrandInfo,
    mExport,
    updateManufacturer,
    addManufacturer
  } from './../../../apis/manufacturerInformation/indexApi'
  export default {
    name: 'manufacturerInformation', // 厂商管理
    components: {
      pagination
    },
    data() {
      return {
        isCha: 1,
        suppValue: [],
        suppOptions: [],
        inputVisible: false,
        inputValue: '',
        multipleSelection: [],
        isEdit: false,
        itemForm: {},
        direction: 'rtl',
        title: '',
        itemVisible: false,
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
        name: '',
        status: '',
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
        dialogVisible: false,
        categoryId: '',
        ruleForm: {
          name: "",
          sort: "",
          status: false,
        },
        rules: {
          name: [{
            required: true,
            message: "请输入厂商名称",
            trigger: "blur"
          }, ],
          contacts: [{
            required: true,
            message: "请输入联系人",
            trigger: "blur"
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
        arrList: []
      }
    },
    created() {
      this.getData()
      getSupplier().then(res => {
        if (res.data.code === 200) {
          this.suppOptions = res.data.data
        }
      })
    },
    methods: {
      getData() {
        getManufacturerListPage({
          condition: this.name,
          status: this.status,
          current: this.currentPage,
          size: this.pageSize
        }).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            // 为空排除
            this.tableData.map((item) => {
              if (item.brandName == null) {
                item.brandName = ''
              }
              if (item.supplierName == null) {
                item.supplierName = ''
              }
            })
          }
        })
      },
      _itemSaveHandle(itemForm) {
        this.$refs[itemForm].validate((valid) => {
          if (valid) {
            if (this.isEdit) {
              let parms = {
                brand: this.itemForm.brandName.map((item) => {
                  return item.id
                }),
                contacts: this.itemForm.contacts,
                manufacturerId: this.editId,
                name: this.itemForm.name,
                phone: this.itemForm.phone,
                status: this.itemForm.status,
                supplier: this.suppValue
              }
              updateManufacturer(parms).then(res => {
                if (res.data.code === 200) {
                  this._itemHandleClose()
                  this.getData()
                } else {
                  this.$message.error(res.data.message)
                }
              })
            } else {
              let parms = {
                brand: this.itemForm.brandName.map((item) => {
                  return item.id
                }),
                contacts: this.itemForm.contacts,
                name: this.itemForm.name,
                phone: this.itemForm.phone,
                status: this.itemForm.status,
                supplier: this.suppValue
              }
              addManufacturer(parms).then(res => {
                if (res.data.code === 200) {
                  this._itemHandleClose()
                  this.getData()
                } else {
                  this.$message.error(res.data.message)
                }
              })

            }
          } else {
            console.log('error submit!!')
            this.itemVisible = true
            return false
          }
        })
      },
      _itemHandleClose() {
        this.itemVisible = false
        this.title = ''
        this.suppValue = []
        this.itemForm.brandName = ''
        this.$refs['itemForm'].resetFields();
      },
      // 导出
      selectionHandle() {
        let params = {
          condition: this.name,
          status: this.status,
        };
        if (this.excelBtns == "1") {
          // 全部导出
          mExport(params).then((res) => {
            if (res.status === 200) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              });
              let downloadLink = document.createElement("a");
              const URL = window.URL || window.webkitURL || window.moxURL;
              let downUrl = URL.createObjectURL(blob);
              downloadLink.href = downUrl;
              downloadLink.download = "厂商信息.xlsx";
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
              ids.push(element.manufacturerId);
            });
            params.ids = ids
            mExport(params).then((res) => {
              if (res.status === 200) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                });
                let downloadLink = document.createElement("a");
                const URL = window.URL || window.webkitURL || window.moxURL;
                let downUrl = URL.createObjectURL(blob);
                downloadLink.href = downUrl;
                downloadLink.download = "厂商信息.xlsx";
                downloadLink.click();
                window.URL.revokeObjectURL(downUrl);
              }
            });
          }
          this.excelBtns = "";
        }
      },
      searchHandle() {
        this.currentPage = 1
        this.getData()
      },
      reset() {
        this.name = ''
        this.status = ''
      },
      _toDetailHandle(row) {
        // 查看
        this.title = '厂商详情'
        this.itemVisible = true
        this.isEdit = false
        this.isCha = 0
        let obj = JSON.parse(JSON.stringify(row))
        this.$nextTick(() => {
          this.itemForm = obj
          // this.supplierId = obj.supplierId
          getBrandInfo({
            manufacturerId: row.manufacturerId
          }).then(res => {
            if (res.data.code === 200) {
              this.itemForm.brandName = res.data.data
            }
          })
          if (this.itemForm.supplierName === '' || !this.itemForm.supplierName) {
            this.itemForm.supplierName = []
          } else {
            this.itemForm.supplierName = this.itemForm.supplierName.split(',')
          }
        })

      },
      _addItemHandle() {
        this.isCha = 1
        this.title = '新增厂商'
        this.itemVisible = true
        this.isEdit = false
        this.itemForm.status = 1
        // this.$nextTick(() => {
        //   this.itemForm = {}
        //   this.itemForm.brandName = []
        // })
        // this.itemForm = {}
        // this.itemForm.brandName = []
        // this.itemForm.brand = []
      },
      _editItemHandle(row) {
        this.isCha = 1
        this.title = '编辑厂商'
        this.itemVisible = true
        this.isEdit = true
        this.editId = row.manufacturerId
        selectManufacturerById({
          id: row.manufacturerId,
        }).then(res => {
          if (res.data.code === 200) {
            // this.$nextTick(() => {
            this.itemForm = res.data.data
            getBrandInfo({
              manufacturerId: row.manufacturerId
            }).then(res => {
              if (res.data.code === 200) {
                this.itemForm.brandName = res.data.data
              }
            })
            if (this.itemForm.supplier) {
              this.suppValue = this.itemForm.supplier.split(',').map(Number)
            }
            // })
          }
        })
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        // 新增品牌
        let inputValue = this.inputValue;
        if (inputValue) {
          if (!this.itemForm.brandName) {
            this.itemForm.brandName = []
          }
          addBrand({
            name: this.inputValue,
          }).then(res => {
            if (res.data.code === 200) {
              let obj = res.data.data
              let arr = this.itemForm.brandName
              arr.push(obj)
              this.$forceUpdate()
            }
          })
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      handleTagClose(tag) {
        let arr = this.itemForm.brandName
        arr.splice(arr.indexOf(tag), 1)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      active_text(row) {
        let parms = {
          id: row.manufacturerId
        }
        updateStatus(parms).then(res => {
          if (res.data.code === 200) {
            this.$message.success('修改成功')
            this.getData()
          } else {
            this.$message.success('操作失败')
          }
        })
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this.getData()
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
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