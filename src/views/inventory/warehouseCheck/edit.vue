<template>
  <ContainerGroup>
    <Container>
      <p class="form-title">基本信息</p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" ref="formInfo" :rules="rules">
            <el-col :span="8">
              <el-form-item
                label="盘点部门："
                prop="deptId"
                label-width="170px"
              >
                <el-select
                  placeholder="请选择"
                  v-model="formInfo.deptId"
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
            <el-col :span="8">
              <el-form-item label="盘点人：" label-width="170px">
                <el-input
                  placeholder="系统生成"
                  style="width: 240px"
                  disabled
                  v-model="formInfo.createBy"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="盘点日期：" label-width="170px">
                <el-input
                  placeholder="系统生成"
                  v-model="formInfo.checkDate"
                  style="width: 240px"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="盘点仓库："
                label-width="170px"
                prop="checkWarehouseId"
              >
                <el-select
                  v-model="formInfo.checkWarehouseId"
                  placeholder="请选择"
                  @change="warehouseChange"
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
                  placeholder="请输入"
                  show-word-limit
                  :rows="4"
                  v-model="formInfo.remark"
                  :maxlength="200"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container scrollY="true">
      <p class="form-title">物资盘点（盘点仓库：{{ warehouseName }})</p>
      <div class="table-content">
        <el-tabs type="border-card" @tab-click="tabClick">
          <el-tab-pane v-for="(tab, i) in tabList" :key="i" :label="tab.name">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-for="(item, index) in materialList"
                :key="index"
                :label="item.name"
                :name="'name' + item.materialCategoryId"
              >
                <el-table
                  :data="tableData"
                  border
                  size="mini"
                  stripe
                  :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
                >
                  <el-table-column
                    label="序号"
                    width="50"
                    align="center"
                    type="index"
                  ></el-table-column>
                  <el-table-column
                    label="名称"
                    prop="materialName"
                    align="center"
                  ></el-table-column>
                  <el-table-column
                    label="物料号"
                    align="center"
                    prop="code"
                  ></el-table-column>
                  <el-table-column
                    label="包装"
                    align="center"
                    prop="packet"
                  ></el-table-column>
                  <el-table-column label="规格" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.materialSpecs
                      }}{{ scope.row.materialUnitName }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="物资分类"
                    align="center"
                    prop="materialCategoryName"
                  ></el-table-column>
                  <el-table-column
                    label="账面库存数"
                    align="center"
                    prop="stockTotal"
                  ></el-table-column>
                  <el-table-column label="实际盘点计数" align="center">
                    <template slot-scope="scope">
                      <el-form :model="scope.row" :rules="rules">
                        <el-form-item prop="realNum" style="margin-bottom: 0">
                          <el-input
                            v-model="scope.row.realNum"
                            type="text"
                            :min="1"
                            @input="_realNumChange(scope.row, scope.$index)"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="确认" align="center">
                    <template slot-scope="scope">
                      <el-checkbox
                        v-model="scope.row.status"
                        @change="_statusChange(scope.row, scope.$index)"
                      ></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </Container>
    <Container>
      <el-button @click="_goback">取消</el-button>
      <el-button type="primary" @click="_onSubmit">提交</el-button>
    </Container>
  </ContainerGroup>
</template>
<script>
import Container from "../../../components/global/Container.vue";
import { buildInit } from "./../../../apis/allocate/indexApi";
import {
  updateCheck,
  getMaterialCategory,
  queryStock,
  getCheckInfo,
  getStockQueryList,
} from "./../../../apis/allocate/warehouseCheckApi";
export default {
  components: { Container },
  name: "edit",
  data() {
    return {
      id: this.$route.query.id,
      formInfo: {
        deptId: "",
        checkWarehouseId: "",
      },
      rules: {
        deptId: [
          { required: true, message: "请选择盘点部门", tirgger: "change" },
        ],
        checkWarehouseId: [
          { required: true, message: "请选择盘点仓库", tirgger: "change" },
        ],
      },
      warehouseName: "",
      materialName: "",
      materialCategoryId: "",
      status: 0,
      materialList: [],
      tableData: [],
      warehouseList: [],
      deptList: [],
      selectMaterial: [],
      tabList: [
        {
          name: "未盘点",
        },
        {
          name: "已盘点",
        },
      ],
      activeName: "",
    };
  },
  created() {
    this.init();
    this._getDetail();
  },
  methods: {
    init() {
      buildInit().then((res) => {
        if (res.data.code === 200) {
          this.deptList = res.data.data.deptList;
          this.warehouseList = res.data.data.warehouseList;
          this.deptList.forEach((element) => {
            element.dictId = element.dictId.toString();
          });
          this.warehouseList.forEach((element) => {
            element.warehouseId = element.warehouseId.toString();
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _goback() {
      this.$router.push("/warehouseCheck");
    },
    warehouseChange(val) {
      this.warehouseList.forEach((element) => {
        if (val === element.warehouseId) {
          this.warehouseName = element.name;
          this._getMaterialCategory();
        }
      });
    },
    getQueryStock() {
      let parms = {
        checkId: this.id,
        materialCategoryId: this.materialCategoryId,
        warehouseName: this.warehouseName,
      };
      getStockQueryList(parms).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.tableData.forEach((element) => {
            element.status = element.status === 1 ? true : false;
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getFinishQueryStock() {
      let parms = {
        checkId: this.id,
        materialCategoryId: this.materialCategoryId,
        warehouseName: this.warehouseName,
        status: this.status,
      };
      queryStock(parms).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data;
          this.tableData.forEach((element) => {
            element.status = element.status === 1 ? true : false;
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getDetail() {
      getCheckInfo({
        id: this.id,
      }).then((res) => {
        if (res.data.code === 200) {
          res.data.data.deptId = res.data.data.deptId.toString();
          res.data.data.checkWarehouseId = res.data.data.checkWarehouseId.toString();
          this.formInfo = res.data.data;
          let userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            const { name } = JSON.parse(userInfo);
            this.formInfo.updateBy = name;
          }
          this.warehouseName = this.formInfo.checkWarehouseName;
          this._getMaterialCategory();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 分类
    _getMaterialCategory() {
      getMaterialCategory({
        warehouseName: this.warehouseName,
      }).then((res) => {
        if (res.data.code === 200) {
          this.materialList = res.data.data;
          if (this.materialList[0] !== undefined) {
            this.materialCategoryId = this.materialList[0].materialCategoryId;
            this.activeName = "name" + this.materialCategoryId;
            if (this.status === 1) {
              this.getFinishQueryStock();
            } else {
              this.getQueryStock();
            }
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _realNumChange(row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData));
      tempArr[index]["realNum"] = row.realNum.replace(/[^\d]/g,'');
      this.tableData = JSON.parse(JSON.stringify(tempArr));
    },
    _statusChange(row, index) {
      let tempArr = JSON.parse(JSON.stringify(this.tableData));
      this.tableData = JSON.parse(JSON.stringify(tempArr));
    },
    _onSubmit() {
      let checkDetailList = [];
      this.tableData.forEach((element) => {
        let obj = {
          materialId: Number(element.materialId),
          realNum: element.realNum,
          status: element.status ? 1 : 0,
        };
        checkDetailList.push(obj);
      });
      let parms = {
        id: Number(this.id),
        checkDetailList: checkDetailList,
        checkWarehouseId: Number(this.formInfo.checkWarehouseId),
        deptId: Number(this.formInfo.deptId),
        remark: this.formInfo.remark,
        createBy: this.formInfo.createBy,
        updateBy: this.formInfo.updateBy,
        source: 2,
      };
      updateCheck(parms).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this.$router.push("/warehouseCheck");
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    tabClick(tab) {
      if (tab.label === "未盘点") {
        this.status = 0;
      } else {
        this.status = 1;
      }
      this._getMaterialCategory();
    },
    handleClick(tab, event) {
      this.materialName = tab.label;
      this.materialCategoryId = tab.name.slice(4);
      if (this.status === 1) {
        this.getFinishQueryStock();
      } else {
        this.getQueryStock();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.form-title {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
}
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
    }
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