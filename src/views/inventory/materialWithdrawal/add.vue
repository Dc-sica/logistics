<template>
  <ContainerGroup>
    <Container>
      <el-button class="cancelBtn" @click="_goback">取消</el-button>
      <el-button type="primary" @click="_onSubmit">提交</el-button>
    </Container>
    <Container>
      <p class="form-title">领用信息</p>
      <el-row>
        <el-form :model="formInfo" ref="formInfo" :rules="rules">
          <el-col :span="8">
            <el-form-item label="申请部门：" prop="deptId" label-width="170px">
              <el-select
                placeholder="请选择"
                style="width: 240px"
                disabled
                v-model="formInfo.deptId"
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
          <el-col :span="8">
            <el-form-item label="申请人：" label-width="170px" prop="name">
              <el-input
                placeholder="系统生成"
                style="width: 240px"
                disabled
                v-model="formInfo.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系方式："
              label-width="170px"
              prop="userPhone"
            >
              <el-input
                placeholder="系统生成"
                style="width: 240px"
                disabled
                v-model="formInfo.userPhone"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库：" label-width="170px" prop="warehouseId">
              <el-select
                v-model="formInfo.warehouseId"
                placeholder="请选择"
                style="width: 240px"
              >
                <el-option
                  v-for="item in warehouseList"
                  :key="item.warehouseId"
                  :label="item.name"
                  :value="item.warehouseId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：" label-width="170px" prop="remark">
              <el-input
                type="textarea"
                placeholder="请输入描述，不超过300字"
                show-word-limit
                :rows="4"
                v-model="formInfo.remark"
                :maxlength="300"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </Container>
    <Container>
      <p class="form-title">物资信息</p>
      <OperationContainer
        ><el-button @click="_chooseItem" type="primary">
          +选择物资
        </el-button></OperationContainer
      >

      <el-table
        :data="tableData"
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
        stripe
        size="mini"
        highlight-current-row
        height="0"
        isFillHeight
      >
        <el-table-column
          label="序号"
          width="50"
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
          label="包装"
          show-overflow-tooltip
          prop="packetName"
        ></el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.materialSpecs }}{{ scope.row.materialUnitName }}
          </template>
        </el-table-column>
        <el-table-column
          label="库存"
          show-overflow-tooltip
          prop="allowCapacity"
        ></el-table-column>
        <el-table-column
          label="退库数量"
          show-overflow-tooltip
          prop="materialCount"
          width="240px"
        >
          <template slot-scope="scope">
            <el-form :model="scope.row" :rules="rules">
              <el-form-item prop="materialCount" style="margin-bottom: 0">
                <el-input
                  v-model.trim="scope.row.materialCount"
                  type="number"
                  :min="1"
                  @input="_quanlityOrPriceChange(scope.row, scope.$index)"
                ></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="单价(元)" show-overflow-tooltip prop="price">
        </el-table-column>
        <el-table-column label="金额(元)" show-overflow-tooltip prop="amount">
        </el-table-column>
        <el-table-column
          label="供应商"
          show-overflow-tooltip
          prop="supplierName"
        >
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
      class="drawer-wrapper"
      direction="rtl"
      size="43%"
      :before-close="_drawerHandleClose"
      @cancel="_drawerHandleClose"
      @onOk="_onSave"
      :footerBtns="[
        { text: '取消', type: 'info', trigger: 'cancel' },
        { text: '保存', type: 'primary', trigger: 'onOk' },
      ]"
    >
      <el-form :inline="true" ref="formInline" :model="formInline">
        <el-form-item label="名称：" prop="name" label-width="60px">
          <el-input placeholder="请输入" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="分类：" prop="materialCategory" label-width="60px">
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

      <el-table
        :data="typesData"
        ref="multipleTable"
        @selection-change="_handleSelectionChange"
        border
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="物料号" prop="code"></el-table-column>
        <el-table-column label="单位" prop="materialUnitName"></el-table-column>
        <el-table-column label="分类" prop="categoryName"></el-table-column>
      </el-table>
    </Drawer>
  </ContainerGroup>
</template>
<script>
import {
  getMaterialList,
  getMaterialCategory,
} from "./../../../apis/commonApi";
import { getInitData } from "./../../../apis/outAndIn/index";
import { materialRequisitionPC } from "./../../../apis/materialRequisition/index";

export default {
  name: "add",
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
      formInfo: {},
      formInline: {},
      formTable: {},
      rules: {
        // deptId: [{ required: true, message: '请选择部门', tirgger: "blur" }],
        // createBy: [{ required: true, message: '请输入申请人', tirgger: "change" }],
        // date: [{ required: true, message: '请输入录单日期', tirgger: "change" }],
        warehouseId: [
          { required: true, message: "请选择仓库", tirgger: "change" },
        ],
        remark: [{ required: true, message: "请输入备注", tirgger: "blur" }],
        materialCount: [
          { required: true, message: "请输入数量", tirgger: "blur" },
          { validator: validatePass, trigger: "blur" },
          {
            pattern: /^((?!0)\d+(.\d{1,2})?)$/,
            message: "请输入正数,最多两位小数点",
          },
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
      warehouseName: "",
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { name, deptId, userId, phone } = JSON.parse(userInfo);
      this.formInfo.deptId = deptId;
      this.formInfo.name = name;
      this.formInfo.userId = userId;
      this.formInfo.userPhone = phone;
    }
    this._getInitData();
  },
  methods: {
    transferFromChange(val) {
      this.warehouseList.forEach((element) => {
        if (val === element.warehouseId) {
          this.warehouseName = element.name;
        }
      });
    },
    _goback() {
      this.$router.push("/materialWithdrawal");
    },
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
            item.materialCount = 1;
            item.amount = item.materialCount * item.price;
          });
          this.typesData = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _quanlityOrPriceChange(row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData));
      tempArr[index]["amount"] = (row.materialCount * row.price).toFixed(2);
      this.tableData = JSON.parse(JSON.stringify(tempArr));
    },
    // 保存
    _onSubmit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          let flag = this.tableData.filter((item) => {
            if (item.materialCount === "" || item.materialCount < 0) {
              this.$message.warning("请输入大于0的数字");
              return item;
            }
          });
          if (flag.length > 0) {
            return false;
          }

          let params = {
            ...this.formInfo,
            applicationCategory: 1,
            materialList: this.tableData,
          };
          materialRequisitionPC(params).then((res) => {
            if (res.data.code === 200) {
              this.$message.success("添加成功");
              this.$router.push("/materialWithdrawal");
            } else {
              this.$message.error(res.data.message);
            }
          });
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
      }
      this._drawerHandleClose();
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper-form {
  background: #fff;
  height: 45px;
  padding: 10px 15px;
  margin-bottom: 15px;
}
.form-title {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
}
.form-row {
  padding: 15px 30px;
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
  }
  .table-box {
    border-bottom: 1px solid #e5e5e5;
    border-top: none;
  }
  .table-content {
    padding: 10px 20px;
  }
}

.drawer-wrapper {
  /deep/ .el-drawer__body {
    padding: 5px 10px;
  }
  /deep/ .el-drawer__header {
    border-bottom: 1px solid #e5e5e5;
    background: #1d93a8;
    color: #fff;
    padding: 10px 20px;
    margin-bottom: 15px;
    span:focus {
      outline: none;
    }
  }
}

.drawer-table-box {
  // height: 74vh;
  height: calc(100vh - 140px);
  .el-drawer__header {
  }
  .el-table {
    height: 75vh;
  }
}
.bot-button {
  line-height: 60px;
  height: 60px;
  text-align: center;
  margin-top: 5px;
  .cancelBtn {
    border-color: #ff8e2f;
    color: #ff8e2f;
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