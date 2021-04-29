<template>
  <ContainerGroup>
    <Container>
      <el-button @click="_goback">返回</el-button>
    </Container>
    <Container>
      <p class="form-title">基本信息</p>
      <el-row>
        <el-form>
          <el-col :span="6">
            <div class="h40">
              <span>申请部门：</span>{{ formInfo.deptName }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="h40"><span>申请人：</span>{{ formInfo.createBy }}</div>
          </el-col>
          <el-col :span="6">
            <div class="h40">
              <span>录单日期：</span>{{ formInfo.transferDate }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="h40">
              <span>发货仓库（调拨前）：</span>{{ formInfo.transferFromName }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="h40">
              <span>收货仓库（调拨后）：</span>{{ formInfo.transferToName }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="h40">
              <span>合计金额：</span>{{ formInfo.amount }}元
            </div>
          </el-col>
          <el-col :span="24">
            <div class="h40">
              <span>状态：</span>{{ formInfo.approveStatusName }}
            </div>
          </el-col>
          <el-col :span="24">
            <div class="h40"><span>备注：</span>{{ formInfo.remark }}</div>
          </el-col>
        </el-form>
      </el-row>
    </Container>
    <Container>
      <p class="form-title">
        调拨物资（发货仓库：{{ formInfo.transferFromName }})
      </p>
      <el-table
        :data="formInfo.materialList"
        border
        show-summary
        :summary-method="getSummaries"
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
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="物料号"
          show-overflow-tooltip
          prop="code"
        ></el-table-column>
        <el-table-column
          label="包装"
          show-overflow-tooltip
          prop="packet"
        ></el-table-column>
        <el-table-column label="规格" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.materialSpecs }}{{ scope.row.materialUnit }}
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          show-overflow-tooltip
          prop="materialCount"
        >
        </el-table-column>
        <el-table-column label="单价(元)" show-overflow-tooltip prop="price">
        </el-table-column>
        <el-table-column
          label="金额(元)"
          show-overflow-tooltip
          prop="totalAmount"
        >
        </el-table-column>
      </el-table>
    </Container>
  </ContainerGroup>
</template>

<script>
import { getTransferInfo } from "./../../../apis/allocate/indexApi";

export default {
  name: "detail",
  data() {
    return {
      id: this.$route.query.id,
      formInfo: {},
      tableData: [],
    };
  },
  mounted() {
    this._getDetail();
  },
  methods: {
    _goback() {
      this.$router.push("/allocate");
    },
    _getDetail() {
      getTransferInfo({
        id: this.id,
      }).then((res) => {
        if (res.data.code === 200) {
          this.formInfo = res.data.data;
          if (this.formInfo.approveStatus === 1) {
            this.formInfo.approveStatusName = "未确认";
          } else if (this.formInfo.approveStatus === 2) {
            this.formInfo.approveStatusName = "已确认";
          } else if (this.formInfo.approveStatus === 3) {
            this.formInfo.approveStatusName = "已驳回";
          } else if (this.formInfo.approveStatus === 4) {
            this.formInfo.approveStatusName = "已撤回";
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 2) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
  },
};
</script>

<style lang="less" scoped>
.form-title {
  border-bottom: 1px solid #e5e5e5;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.h40 {
  height: 30px;
  line-height: 30px;
  span {
    display: inline-block;
    width: 170px;
    text-align: right;
  }
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