<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-11 09:08:19
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-05 10:35:29
 * @FilePath: /hos-logistics-management/src/views/inventory/outAndIn/itemAdd.vue
-->

<template>
  <ContainerGroup>
    <Container>
      <div>
        <!-- <el-button style="background:#1D93A8;color:#fff;">过账</el-button> -->
        <el-button @click="_addAndSave" type="primary">保存并新增</el-button>
      </div>
      <div>
        <!-- <el-button type="default">返回</el-button> -->
      </div>
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
                  v-model.trim="formInfo.receiptNo"
                  :maxlength="10"
                  :show-word-limit="true"
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
                  v-model.trim="formInfo.totalPrice"
                  type="number"
                  :min="0"
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
                  :maxlength="200"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="采购物资：" required label-width="100px">
                <el-button type="primary" @click="_chooseItem"
                  >选择物资</el-button
                >
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
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        height="0"
        isFillHeight
      >
        <el-table-column
          label="序号"
          width="55"
          show-overflow-tooltip
          type="index"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="materialName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="物料号"
          show-overflow-tooltip
          prop="materialCode"
        ></el-table-column>
        <el-table-column
          label="单位"
          show-overflow-tooltip
          prop="materialUnitName"
        ></el-table-column>
        <el-table-column
          label="数量"
          show-overflow-tooltip
          prop="quantity"
          width="240px"
        >
          <template slot-scope="scope">
            <el-form :model="scope.row" :rules="rules">
              <el-form-item prop="quantity">
                <el-input
                  v-model.trim="scope.row.quantity"
                  type="number"
                  :min="1"
                  @input="_quanlityOrPriceChange(scope.row, scope.$index)"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="单价(元)"
          show-overflow-tooltip
          width="240px"
          prop="price"
        >
          <template slot-scope="scope">
            <el-form :model="scope.row" :rules="rules">
              <el-form-item prop="price">
                <el-input
                  v-model="scope.row.price"
                  type="number"
                  :min="1"
                  @input="_quanlityOrPriceChange(scope.row, scope.$index)"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="金额(元)" show-overflow-tooltip prop="amount">
        </el-table-column>
        <el-table-column label="资金来源" show-overflow-tooltip prop="source">
          <template slot-scope="scope">
            <el-form :model="scope.row" :rules="rules">
              <el-form-item prop="source">
                <el-select
                  v-model="scope.row.source"
                  clearable
                  @change="_sourceChange(scope.row, scope.$index)"
                >
                  <el-option
                    v-for="(item, index) in sourceList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip prop="">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-popconfirm
                :title="`确定要删除 ${scope.row.name} 吗?`"
                @confirm="_delItemHandle(scope.$index)"
              >
                <el-button type="text" slot="reference">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </Container>
    <!-- 侧边弹窗 -->
    <Drawer
      title="选择物资"
      :visible.sync="drawerView"
      @onOk="_onSave"
      @cancel="_drawerHandleClose"
      :footerBtns="[
        { type: 'info', text: '取消', trigger: 'cancel' },
         { type: 'primary', text: '保存', trigger: 'onOk' }
      ]"
    >
      <OperationContainer>
        <el-form :inline="true" ref="formInline" :model="formInline">
          <el-form-item label="名称：" prop="name" label-width="60px">
            <el-input placeholder="请输入" v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item
            label="分类："
            prop="materialCategory"
            label-width="60px"
          >
            <el-select
              placeholder="请选择"
              v-model="formInline.materialCategory"
              clearable
            >
              <el-option
                v-for="item in materialList"
                :key="item.code"
                :value="item.materialCategoryId"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_materialSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </OperationContainer>
      <div class="drawer-table-box">
        <el-table
          :data="typesData"
          ref="multipleTable"
          @selection-change="_handleSelectionChange"
          border
          stripe
        size="mini"
        highlight-current-row
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="名称" prop="name"></el-table-column>
          <el-table-column label="物料号" prop="code"></el-table-column>
          <el-table-column
            label="单位"
            prop="materialUnitName"
          ></el-table-column>
          <el-table-column label="分类" prop="categoryName"></el-table-column>
        </el-table>
      </div>
    </Drawer>
  </ContainerGroup>
</template>
<script>
import {
  getMaterialList,
  getMaterialCategory,
} from "./../../../apis/commonApi";
import { getInitData, addItem } from "./../../../apis/outAndIn/index";
export default {
  name: "setting",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入大于0，且最多两位小数的数字"));
      } else {
        callback();
      }
    };
    return {
      drawerView: false,
      formInfo: {
        applyTime: this.$moment(new Date()).format("YYYY-MM-DD"),
      },
      formInline: {},
      formTable: {},
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
          { pattern: /^[0-9]{1,10}$/, message: "最多输入十位数字" },
        ],
        totalPrice: [
          { required: true, message: "请输入合计金额", tirgger: "blur" },
          {
            pattern: /^(\d+(.\d{1,2})?)$/,
            message: "请输入正数,且最多保留两位小数点",
          },
        ],
        quantity: [
          { required: true, message: "请输入数量", tirgger: "blur" },
          { validator: validatePass, trigger: "blur" },
          {
            pattern: /^((?!0)\d+(.\d{1,2})?)$/,
            message: "请输入正数,最多两位小数点",
          },
        ],
        price: [
          { required: true, message: "请输入金额", tirgger: "blur" },
          { validator: validatePass, trigger: "blur" },
          {
            pattern: /^((?!0)\d+(.\d{1,2})?)$/,
            message: "请输入正数,最多两位小数点",
          },
        ],
        source: [
          { required: true, message: "请选择资金来源", tirgger: "change" },
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
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { name, userId } = JSON.parse(userInfo);
      this.formInfo.createrUser = name;
    }
    this._getInitData();
  },
  methods: {
    _getInitData() {
      getInitData().then((res) => {
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
      const { materialCategory } = this.formInline;
      if (materialCategory === "") {
        delete this.formInline.materialCategory;
      }
      let params = {
        ...this.formInline,
      };
      getMaterialList(params).then((res) => {
        if (res.data.code === 200) {
          res.data.data.forEach((item) => {
            item.quantity = 1;
            item.amount = item.quantity * item.price;
          });
          this.typesData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _quanlityOrPriceChange(row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData));
      tempArr[index]["amount"] = (row.quantity * row.price).toFixed(2);
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
    // 保存
    _addAndSave() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          let flag = this.tableData.filter((item) => {
            if (item.quantity === "" || item.quantity < 0) {
              this.$message.warning("请输入大于0的数字");
              return item;
            }
            if (item.price === "" || item.price <= 0) {
              this.$message.warning("请输入大于0的数字");
              return item;
            }
            if (item.source === "" || item.source === undefined) {
              this.$message.warning("请选择来源");
              return item;
            }
          });
          if (flag.length > 0) {
            return false;
          }
          const { applyTime } = this.formInfo;
          this.formInfo.applyTime = this.$moment(applyTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          let params = {
            ...this.formInfo,
            detailList: this.tableData,
          };
          addItem(params).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("添加成功");
              this.$router.push("/outAndIn");
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          // this.$message.warning(JSON.stringify(valid))
        }
      });
    },

    _delItemHandle(index) {
      this.tableData.splice(index, 1);
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