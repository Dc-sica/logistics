
<template>
  <ContainerGroup>
    <Container>
      <el-button type="primary" @click="_printTicket">打印单据</el-button>
      <el-button type="primary" v-if="status === '0'" @click="_updateStatus"
        >过账</el-button
      >
      <!-- <el-button type="default">返回</el-button> -->
    </Container>
    <Container>
      <p class="form-title">直进直出</p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" ref="formInfo" :rules="rules">
            <el-col :span="6">
              <el-form-item
                label="供应商："
                prop="supplierId"
                label-width="100px"
              >
                <el-select
                  v-model="formInfo.supplierId"
                  disabled
                  style="width: 240px"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in supplierList"
                    :key="item.supplierId"
                    :value="item.supplierId"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="仓库："
                label-width="100px"
                prop="warehouseId"
              >
                <el-select
                  v-model="formInfo.warehouseId"
                  disabled
                  placeholder="请选择"
                  style="width: 240px"
                  clearable
                >
                  <el-option
                    v-for="item in warehouseList"
                    :key="item.warehouseId"
                    :value="item.warehouseId"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="部门：" label-width="100px" prop="deptId">
                <el-select
                  v-model="formInfo.deptId"
                  disabled
                  placeholder="请选择"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in deptList"
                    :key="item.dictId"
                    :label="item.name"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="录单日期："
                label-width="100px"
                prop="applyTime"
              >
                <el-date-picker
                  type="date"
                  disabled
                  placeholder="选择日期"
                  v-model="formInfo.applyTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="发票号："
                label-width="100px"
                prop="receiptNo"
              >
                <el-input
                  v-model="formInfo.receiptNo"
                  disabled
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="创建人："
                label-width="100px"
                prop="createrUser"
              >
                <el-input v-model="formInfo.createrUser" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="合计金额："
                label-width="100px"
                prop="totalPrice"
              >
                <el-input
                  v-model="formInfo.totalPrice"
                  disabled
                  placeholder="请输入"
                >
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：" label-width="100px" prop="remark">
                <el-input
                  type="textarea"
                  placeholder="请输入"
                  show-word-limit
                  v-model="formInfo.remark"
                  disabled
                  :maxlength="200"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">物资明细</p>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ background: '#FAFAFA' }"
        height="0"
        isFillHeight
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          width="55"
          type="index"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="物料号"
          show-overflow-tooltip
          prop="code"
        ></el-table-column>
        <el-table-column
          label="单位"
          show-overflow-tooltip
          prop="materialUnit"
        ></el-table-column>
        <el-table-column label="数量" show-overflow-tooltip prop="quantity">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.quantity"
              disabled
              type="number"
              :min="0"
              @input="_quanlityOrPriceChange(scope.row, scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单价(元)" show-overflow-tooltip prop="price">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.price"
              disabled
              type="number"
              :min="0"
              @input="_quanlityOrPriceChange(scope.row, scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="金额(元)" show-overflow-tooltip prop="amount">
        </el-table-column>
        <!--   <el-table-column label="供应商"
              show-overflow-tooltip
              prop="supplierCode">
              <template slot-scope="scope">
                <el-select v-model="scope.row.supplierCode"
                  @change="_supplierChange(scope.row,scope.$index)">
                  <el-option v-for="item in sourceList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"></el-option>
                </el-select>
              </template>
            </el-table-column> -->
        <el-table-column label="资金来源" show-overflow-tooltip prop="source">
          <!-- <el-input v-model="scope.row.source"></el-input> -->
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.source"
              @change="_sourceChange(scope.row, scope.$index)"
              disabled
            >
              <el-option
                v-for="(item, index) in sourceList"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <!--   <el-table-column label="操作"
              show-overflow-tooltip
              prop="">
              <template slot-scope="scope">
                <el-tooltip class="item"
                  effect="dark"
                  content="删除"
                  placement="top">
                  <el-button type="text"
                    @click="_delItemHandle(scope.row)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column> -->
      </el-table>
      <!-- 侧边弹窗 -->
      <!-- <el-drawer
        title="选择物资"
        :visible.sync="drawerView"
        class="drawer-wrapper"
        direction="rtl"
        size="40%"
        :before-close="_drawerHandleClose"
      >
        <div>
          <div>
            <el-form :inline="true" ref="formInline" :model="formInline">
              <el-form-item label="名称：" prop="name" label-width="60px">
                <el-input
                  placeholder="请输入"
                  v-model="formInline.name"
                ></el-input>
              </el-form-item>
              <el-form-item label="分类：" prop="code" label-width="60px">
                <el-select
                  placeholder="请选择"
                  v-model="formInline.code"
                  clearable
                >
                  <el-option
                    v-for="item in materialList"
                    :key="item.code"
                    :value="item.code"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="_materialSearch"
                  >查询</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="drawer-table-box">
            <el-table
              :data="typesData"
              ref="multipleTable"
              @selection-change="_handleSelectionChange"
              border
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="物料号" prop="code"></el-table-column>
              <el-table-column
                label="单位"
                prop="materialUnit"
              ></el-table-column>
              <el-table-column
                label="分类"
                prop="materialCategory"
              ></el-table-column>
            </el-table>
            <div class="drawer-button">
              <el-button round @click="_drawerHandleClose">取消</el-button>
              <el-button round type="primary" @click="_onSave">保存</el-button>
            </div>
          </div>
        </div>
      </el-drawer> -->
    </Container>
  </ContainerGroup>
</template>
<script>
import baseInfo from "./../../../config/config";
import {
  getMaterialList,
  getMaterialCategory,
} from "./../../../apis/commonApi";
import {
  updateInitById,
  itemUpdate,
  updateStatus,
  downloadPDF,
} from "./../../../apis/outAndIn/index";
export default {
  name: "setting",
  data() {
    return {
      drawerView: false,
      formInfo: {
        applyTime: null,
      },
      formInline: {},
      rules: {
        supplierId: [
          { required: true, message: "请选择供应商", tirgger: "change" },
        ],
        warehouseId: [
          { required: true, message: "请选择仓库", tirgger: "change" },
        ],
        deptId: [{ required: true, message: "请选择部门", tirgger: "change" }],
        applyTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        receiptNo: [
          { required: true, message: "请输入发票号", tirgger: "blur" },
        ],
        amount: [
          { required: true, message: "请输入合计金额", tirgger: "blur" },
        ],
      },
      tableData: [],
      warehouseList: [],
      supplierList: [],
      deptList: [],
      sourceList: [], // 资金来源
      selectMaterial: [],
      typesData: [],
      materialList: [],
      mainId: "",
      status: "",
    };
  },
  created() {
    const { id, status } = this.$route.query;
    this.mainId = id;
    this.status = status;
    this._getInitData();
  },
  methods: {
    _getInitData() {
      let params = {
        id: this.mainId,
      };
      updateInitById(params).then((res) => {
        if (res.data.code === 200) {
          res.data.data.supplier.forEach((item) => {
            item.supplierId = item.supplierId + "";
          });
          res.data.data.warehouse.forEach((item) => {
            item.warehouseId = item.warehouseId + "";
          });
          res.data.data.sourceList.forEach((item) => {
            item.dictId = item.dictId + "";
          });
          res.data.data.deptList.forEach((item) => {
            item.dictId = item.dictId + "";
          });
          this.supplierList = res.data.data.supplier;
          this.deptList = res.data.data.deptList;
          this.warehouseList = res.data.data.warehouse;
          this.sourceList = res.data.data.sourceList;
          res.data.data.detail.detailList.forEach((item) => {
            item.amount = item.price * item.quantity;
          });
          this.tableData = res.data.data.detail.detailList;
          this.formInfo = JSON.parse(JSON.stringify(res.data.data.detail));
          this.formInfo.supplierId = this.formInfo.supplierId + "";
          this.formInfo.warehouseId = this.formInfo.warehouseId + "";
          this.formInfo.deptId = this.formInfo.deptId + "";

          let userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            const { name, userId } = JSON.parse(userInfo);
            this.formInfo.createrUser = name;
          }
          delete this.formInfo.detailList;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 分类
    _getMaterialCategory() {
      getMaterialCategory().then((res) => {
        if (res.data.code === 200) {
          this.materialList = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 物资列表
    _getMaterialList() {
      let params = {
        ...this.formInline,
      };
      getMaterialList(params).then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            item.quantity = 0;
          });
          this.typesData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _quanlityOrPriceChange(row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData));
      tempArr[index]["amount"] = row.quantity * row.price;
      this.tableData = JSON.parse(JSON.stringify(tempArr));
    },
    _sourceChange(row, index) {
      const { supplierCode } = row;
      this.sourceList.forEach((item) => {
        if (item.code === supplierCode) {
          this.tableData[index]["supplierName"] = item.name;
        }
      });
    },
    // 过账
    _updateStatus() {
      let params = {
        id: this.mainId,
      };
      updateStatus(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this.$router.push("/outAndIn");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 打印单据
    _printTicket() {
      let params = {
        id: this.mainId,
      };
      downloadPDF(params).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data) {
            var pdf_src = baseInfo.DOWNLOAD_URL + res.data.data;
            console.log("pdf_src", pdf_src);
            window.open(
              `${baseInfo.PREVIEW_URL}?url=` + encodeURIComponent(pdf_src)
            );
          } else {
            this.$message.warning("data 返回空数据");
          }
        }
      });
    },

    _delItemHandle(row) {
      let params = {
        id: row.id,
      };
    },
    _handleSelectionChange(val) {
      this.selectMaterial = val;
    },

    _chooseItem() {
      this._getMaterialList();
      this._getMaterialCategory();
      this.drawerView = true;
    },
    _drawerHandleClose() {
      this.$refs["formInline"].resetFields();
      this.drawerView = false;
      this.selectMaterial = [];
    },
    // 查询
    _materialSearch() {
      this._getMaterialList();
    },
    _onSave() {
      if (this.selectMaterial.length !== 0) {
        this.selectMaterial.forEach((item) => {
          item.materialName = item.name;
          item.materialCode = item.code;
        });
        if (this.tableData.length <= 0) {
          this.tableData = this.selectMaterial;
        } else {
          let temp = this.tableData.filter((item) => {
            let objTemp = this.selectMaterial.filter(
              (ele) => item.materialCode === ele.code
            );
            if (objTemp.length > 0) {
              return objTemp;
            }
          });
          if (temp.length > 0) {
            this.$message.warning(
              `物资 ${temp[0].materialName} 已经添加,请重新选择`
            );
            this.selectMaterial = [];
            return false;
          } else {
            this.tableData = this.tableData.concat(this.selectMaterial);
          }
        }

        // this.tableData = this.tableData.concat(this.selectMaterial)
      }
      this._drawerHandleClose();
    },
  },
};
</script>
<style lang="less" scoped>
.form-title {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>