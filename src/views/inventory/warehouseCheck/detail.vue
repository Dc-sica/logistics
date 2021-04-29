<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_goback">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">基本信息</p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo" ref="formInfo">
            <el-col :span="6">
              <div class="h40">
                <span>盘点部门：</span>{{ formInfo.deptName }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="h40">
                <span>盘点人：</span>{{ formInfo.createBy }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="h40">
                <span>盘点日期：</span>{{ formInfo.checkDate }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="h40">
                <span>盘点仓库：</span>{{ formInfo.checkWarehouseName }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="h40">
                <span>确认人：</span>{{ formInfo.approveName }}
              </div>
            </el-col>
            <el-col :span="6">
              <div class="h40">
                <span>确认日期：</span>{{ formInfo.approveTime }}
              </div>
            </el-col>
            <el-col :span="24">
              <div class="h40"><span>备注：</span>{{ formInfo.remark }}</div>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container height="fill" scrollY="true">
      <p class="form-title">
        物资盘点（盘点仓库：{{ formInfo.checkWarehouseName }})
      </p>
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
                stripe
                size="mini"
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
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </Container>
  </ContainerGroup>
</template>
<script>
import {
  getCheckInfo,
  getMaterialCategory,
  queryStock,
  getStockQueryList,
} from "./../../../apis/allocate/warehouseCheckApi";
export default {
  name: "setting",
  data() {
    return {
      id: this.$route.query.id,
      drawerView: false,
      formInfo: {},
      tableData: [],
      materialName: "",
      warehouseList: [],
      supplierList: [],
      deptList: [],
      materialList: [],
      activeName: "",
      tabList: [
        {
          name: "未盘点",
        },
        {
          name: "已盘点",
        },
      ],
      status: 0,
    };
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { name, userId } = JSON.parse(userInfo);
      this.formInfo.createrUser = name;
    }
    this._getDetail();
  },
  methods: {
    _goback() {
      this.$router.push("/warehouseCheck");
    },
    _getDetail() {
      getCheckInfo({
        id: this.id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.formInfo = res.data.data;
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
.h40 {
  height: 30px;
  line-height: 30px;
  span {
    display: inline-block;
    width: 170px;
    text-align: right;
  }
}
.form-title {
  border-bottom: 1px solid #e5e5e5;
  margin-bottom:10px;
  padding-bottom:5px;
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
</style>