<template>
  <ContainerGroup id="containerGroup">
    <Container>
      <el-form :inline="true"
        ref="searchForm">
        <el-form-item label="名称："
          prop="name">
          <el-input v-model="name" clearable placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="状态："
          prop="status">
          <el-select placeholder="请选择"
            v-model="status">
            <el-option value="0"
              label="禁用"></el-option>
            <el-option value="1"
              label="启用"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类："
          prop="classify">
          <el-select placeholder="请选择"
            v-model="classify">
            <el-option v-for="(item,index) in categoryList" :key="index" :value="item.materialCategoryId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandle">查询</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-button icon="el-icon-plus"
          type="primary"
          @click="_addItemHandle">新增</el-button>
      </OperationContainer>
      <el-table :data="tableData" border
      :header-cell-style="{background:'#E8EAED'}"  stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column label="名称"
          prop="name"></el-table-column>
        <el-table-column label="物料号" show-overflow-tooltip
          prop="code"></el-table-column>
        <el-table-column label="分类"
          prop="categoryName"></el-table-column>
        <el-table-column label="型号"
          prop="materialType"></el-table-column>
        <el-table-column label="单位"
          prop="materialUnitName"></el-table-column>
        <el-table-column label="包装"
          prop="packetName"></el-table-column>
        <el-table-column label="采购价"
          prop="price"></el-table-column>
        <el-table-column label="供应商" show-overflow-tooltip
          prop="supplierName"></el-table-column>
        <el-table-column label="备注"
          prop="remark"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '启用': '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          prop="" width="130">
          <template slot-scope="scope">
            <el-tooltip class="item"
              effect="dark"
              content="编辑"
              placement="top">
              <el-button type="text"
                @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              v-if="scope.row.status === 1"
              effect="dark"
              content="禁用"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe72e;'"
                @click="_disableItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              v-else
              effect="dark"
              content="启用"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe6b4;'"
                @click="_disableItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item"
              effect="dark"
              content="库存"
              placement="top">
              <el-button type="text"
                class="iconfont"
                v-html="'&#xe7ab;'"
                @click="_stockItemHandle(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange" />
    <Drawer
        :title="title"
        :visible="itemVisible"
        @cancel="_itemHandleClose"
        @confirm="_itemSaveHandle('ruleForm')"
        width="40%"
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
      <el-form :inline='false' style="width: 95%;"
        :rules="rules"
        ref="ruleForm"
        :model="itemForm">
        <el-form-item label="名称："
          prop="name"
          label-width="100px">
          <el-input placeholder="请输入名称"
            v-model="itemForm.name" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="物料号："
          v-if="title === '编辑物资'"
          prop="code"
          label-width="100px">
          <el-input disabled
            v-model="itemForm.code"></el-input>
        </el-form-item>
        <el-form-item label="采购价："
          prop="price"
          label-width="100px">
          <el-input placeholder="请输入采购价"
            v-model="itemForm.price" oninput = "value=value.replace(/[^\d.]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="分类："
          label-width="100px"
          prop="materialCategory">
          <el-select placeholder="请选择"
            style="width:100%"
            v-model="itemForm.materialCategory">
            <el-option v-for="(item,index) in categoryList" :key="index" :value="item.materialCategoryId+'/'+item.name" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位："
          prop="unit"
          label-width="100px">
          <el-select placeholder="请选择"
            style="width:100%"
            v-model="itemForm.materialUnit">
            <el-option v-for="(item,index) in unitList" :key="index" :value="item.code" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="包装："
          prop="packet"
          label-width="100px">
          <el-select placeholder="请选择"
            style="width:100%"
            v-model="itemForm.packet">
            <el-option v-for="(item,index) in packetList" :key="index" :value="item.code" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商："
          label-width="100px"
          prop="supplierId">
          <el-select placeholder="请选择"
            style="width:100%"
            v-model="itemForm.supplierId">
            <el-option v-for="(item,index) in supplierList" :key="index" :value="item.supplierId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号："
          prop="materialType"
          label-width="100px">
          <el-input placeholder="请输入型号"
            v-model="itemForm.materialType" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="备注："
          label-width="100px"
          prop="remark">
          <el-input type="textarea"
            placeholder="请输入备注"
            v-model="itemForm.remark" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="图片："
          label-width="100px"
          prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action
            accept="image/*" 
            :auto-upload='false'
            :show-file-list="false"
            :on-change="beforeAvatarUpload"
          >
            <img v-if="itemForm.imageUrl" :src="itemForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态："
          label-width="100px"
          prop="status">
          <el-radio-group v-model="itemForm.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </Drawer>
    <Drawer
        :title="stockTitle"
        :visible="stockVisible"
        @cancel="_stockHandleClose('stockForm')"
        @confirm="_stockSaveHandle('stockForm')"
        width="40%"
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
      <el-form :inline='false' style="width: 95%;"
        :rules="stockrules"
        ref="stockForm"
        :model="stockForm">
        <el-form-item label="最小库存存量："
          prop="minCapacity"
          label-width="130px">
          <el-input placeholder="请输入最小库存存量"
            v-model="stockForm.minCapacity" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="安全库存存量："
          prop="secureCapacity"
          label-width="130px">
          <el-input placeholder="请输入安全库存存量"
            v-model="stockForm.secureCapacity" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="最大库存存量："
          prop="maxCapacity"
          label-width="130px">
          <el-input placeholder="请输入最大库存存量"
            v-model="stockForm.maxCapacity" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="可用量："
          prop="allowCapacity"
          label-width="130px">
          <el-input placeholder="请输入可用量"
            v-model="stockForm.allowCapacity" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
      </el-form>
    </Drawer>
    </Container>
    <!-- 新增 -->
  </ContainerGroup>
</template>
<script>
import pagination from './../../../components/pagination/index'
import {
  getListPage, addMaterial, editMaterial, getCategoryList, getSupplierList, getUnitList, getInventoryDetail, addInventory, updateInventory
} from './../../../apis/materialInformation/indexApi'
import { upload } from './../../../apis/commonApi'
export default {
  name: 'materialInformation', //物料信息
  components: {
    pagination
  },
  data () {
    return {
      name: '',
      status: '',
      classify: '',
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableData: [],
      itemVisible: false,
      direction: 'rtl',
      attrVisible: false,
      stockVisible: false,
      stockTitle: '',
      itemForm: {},
      stockForm: {},
      title: '',
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        price: [{ required: true, message: '请输入采购价', trigger: 'blur' }],
        materialCategory: [{ required: true, message: '请选择分类', trigger: 'change' }],
        materialUnit: [{ required: true, message: '请选择单位', trigger: 'change' }],
        packet: [{ required: true, message: '请选择包装', trigger: 'change' }],
        supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }]
      },
      stockrules: {
        minCapacity: [{ required: true, message: '请输入最小库存存量', trigger: 'blur' }],
        secureCapacity: [{ required: true, message: '请输入安全库存存量', trigger: 'blur' }],
        maxCapacity: [{ required: true, message: '请输入最大库存存量', trigger: 'blur' }],
        allowCapacity: [{ required: true, message: '请输入可用量', trigger: 'blur' }]
      },
      currentObj: null,
      storeList: [],
      categoryList: [],
      packetList: [],
      supplierList: [],
      unitList: [],
      materialId: '',
      isEdit: false,
      isStockEdit: false
    }
  },
  mounted () {
    this.getCategory()
    this.getSupplier()
    this.getUnit()
    this.getPacket()
    this._getData()
  },
  methods: {
    _getData () {
      getListPage({
        name: this.name,
        status: this.status,
        materialCategory: this.classify,
        current: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      })
    },
    searchHandle () {
      this.currentPage = 1
      this._getData()
    },
    getCategory () {
      getCategoryList({ status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.categoryList = res.data.data
        }
      })
    },
    getSupplier () {
      getSupplierList({ status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.supplierList = res.data.data
        }
      })
    },
    getPacket () {
      getUnitList({ categoryCode: 'packet', status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.packetList = res.data.data.sysDictList
        }
      })
    },
    getUnit () {
      getUnitList({ categoryCode: 'unit', status: 1 }).then(res => {
        if (res.data.code === 200) {
          this.unitList = res.data.data.sysDictList
        }
      })
    },
    _addItemHandle () {
      this.title = '新增物资'
      this.itemVisible = true
      this.isEdit = false
      this.itemForm = {}
      this.itemForm.status = 1
    },
    _editItemHandle (row) {
      this.title = '编辑物资'
      this.itemVisible = true
      this.isEdit = true
      this.materialId = row.materialId
      let obj = JSON.parse(JSON.stringify(row))
      this.$nextTick(() => {
        this.itemForm = obj
        console.log(this.itemForm)
        this.itemForm.materialCategory = obj.materialCategory+'/'+obj.categoryName
        this.itemForm.supplierId = Number(this.itemForm.supplierId)
      })
    },
    _disableItemHandle (row) {
      let status = ''
      if (row.status === 1) {
        status = 0
      } else {
        status = 1
      }
      let parms = {
        materialId: row.materialId,
        name: row.name,
        price: row.price,
        materialCategory: row.materialCategory,
        materialCategoryName: this.itemForm.categoryName,
        materialUnit: row.materialUnit,
        supplierId:row.supplierId,
        materialType: row.materialType,
        remark: row.remark,
        imageUrl: row.imageUrl,
        status: status
      }
      editMaterial(parms).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
          this._getData()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _stockItemHandle (row) {
      this.stockVisible = true
      this.stockTitle = '库存-' + row.name
      this.getInventory(row.materialId)
    },
    getInventory (id) {
      getInventoryDetail({id}).then(res => {
        if (res.data.code === 200) {
          if (res.data.data !== null) {
            this.stockForm = res.data.data
            this.isStockEdit = true
          } else {
            this.stockForm = {}
            this.isStockEdit = false
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    _stockHandleClose () {
      this.stockVisible = false
    },
    _stockSaveHandle (formName) {
      if (this.isStockEdit) {
        this.editStockHandle(formName)
      } else {
        this.addStockHandle(formName)
      }
    },
    addStockHandle (formName) {
      let parms = {
        "allowCapacity": this.stockForm.allowCapacity,
        "maxCapacity": this.stockForm.maxCapacity,
        "minCapacity": this.stockForm.minCapacity,
        "secureCapacity": this.stockForm.secureCapacity,
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addInventory(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success('添加成功')
              this.stockVisible = false
              this._getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          this.stockVisible = true
          return false
        }
      })
    },
    editStockHandle (formName) {
      let parms = {
        "allowCapacity": this.stockForm.allowCapacity,
        "inventoryId": this.stockForm.inventoryId,
        "maxCapacity": this.stockForm.maxCapacity,
        "minCapacity": this.stockForm.minCapacity,
        "secureCapacity": this.stockForm.secureCapacity,
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateInventory(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success('添加成功')
              this.stockVisible = false
              this._getData()
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          this.stockVisible = true
          return false
        }
      })
    },
    _itemHandleClose () {
      this.itemVisible = false
      this.title = ''
      this.currentObj = null
    },
    _itemSaveHandle (formName) {
      this.itemVisible = false
      this.title = ''
      this.currentObj = null
      if (this.isEdit) {
        this.editHandle(formName)
      } else {
        this.addHandle(formName)
      }
    },
    addHandle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let price = Number(this.itemForm.price)
          price = price.toFixed(2)
          let parms = {
            name: this.itemForm.name,
            price: price,
            materialCategory: this.itemForm.materialCategory.split('/')[0],
            materialCategoryName: this.itemForm.materialCategory.split('/')[1],
            materialUnit: this.itemForm.materialUnit,
            packet: this.itemForm.packet,
            supplierId: this.itemForm.supplierId,
            materialType: this.itemForm.materialType,
            remark: this.itemForm.remark,
            imageUrl: this.itemForm.imageUrl,
            status: this.itemForm.status
          }
          addMaterial(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success('添加成功')
              this.itemVisible = false
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
    editHandle (formName) {
      let parms = {
        materialId: this.materialId,
        name: this.itemForm.name,
        price: Number(this.itemForm.price).toFixed(2),
        materialCategory: this.itemForm.materialCategory.split('/')[0],
        materialCategoryName: this.itemForm.materialCategory.split('/')[1],
        materialUnit: this.itemForm.materialUnit,
        packet: this.itemForm.packet,
        supplierId: this.itemForm.supplierId,
        materialType: this.itemForm.materialType,
        remark: this.itemForm.remark,
        imageUrl: this.itemForm.imageUrl,
        status: this.itemForm.status
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editMaterial(parms).then(res => {
            if (res.data.code === 200) {
              this.$message.success('编辑成功')
              this.itemVisible = false
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
    beforeAvatarUpload(files) {
      let file = files.raw
      console.log(file)
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpge'
      ||file.type === 'image/gif'||file.type === 'image/tif'||file.type === 'image/bmp')

      if (!isJPG) {
        this.$message.error("上传图片只支持 .jpg.png.jpge.gif.tif.bmp 格式")
        return
      }
      let formData = new FormData()
      formData.append("file", file)

      upload(formData).then((res) => {
        if (res.data.code === 200) {
          // this.$message.success("图片上传成功")
          this.itemForm.imageUrl = res.data.data[0].url
          this.$forceUpdate()
        } else {
          this.$message.error(res.data.message)
        }
      });
    },
    pagationChange (payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getData()
    }
  }
}
</script>
<style lang="less">
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
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 70px;
  height: 70px;
  line-height: 70px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar {
  display: block;
  width: 100%;
  height: 100%;
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
</style>