
<template>
  <ContainerGroup>
    <Container>
      <el-button class="cancelBtn" @click="_goback">返回</el-button>
      <el-button type="primary" @click="_downloadPDF">单据打印</el-button>
    </Container>
    <Container>
      <p class="form-title">退库信息</p>
      <div class="form-row">
        <el-row>
          <el-form :model="formInfo">
            <el-col :span="12">
              <div class="h40">
                <span>退库单号：</span>{{ formInfo.orderId }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="h40">
                <span>退库状态：</span>
                {{
                  formInfo.approvalStatus === 0
                    ? "未审批"
                    : formInfo.approvalStatus === 1
                    ? "已批准"
                    : formInfo.approvalStatus === 2
                    ? "已驳回"
                    : "已撤回"
                }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="h40">
                <span>申请人：</span>{{ formInfo.userName }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="h40">
                <span>申请部门：</span>{{ formInfo.deptName }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="h40"><span>联系方式：</span>{{ formInfo.phone }}</div>
            </el-col>
            <el-col :span="12">
              <div class="h40">
                <span>仓库：</span>{{ formInfo.warehouseName }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="h40">
                <span>录单时间：</span>{{ formInfo.applicationTime }}
              </div>
            </el-col>
            <el-col :span="12">
              <div class="h40">
                <span>过账转态：</span
                >{{ formInfo.applicationStatus === 1 ? "已过账" : "未过账" }}
              </div>
            </el-col>
            <el-col :span="24">
              <div class="h40"><span>备注：</span>{{ formInfo.remark }}</div>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </Container>
    <Container>
      <p class="form-title">物资明细</p>
      <div class="table-content">
        <el-table
          :data="tableData"
          border
          :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
          stripe
          size="mini"
          highlight-current-row
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
            show-overflow-tooltip
            prop="name"
          ></el-table-column>
          <el-table-column
            label="物料号"
            show-overflow-tooltip
            prop="materialId"
          ></el-table-column>
          <el-table-column
            label="包装"
            show-overflow-tooltip
            prop="packet"
          ></el-table-column>
          <el-table-column label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.materialSpecs }}{{ scope.row.materialUnitName }}
            </template>
          </el-table-column>
          <el-table-column
            label="库存"
            show-overflow-tooltip
            prop="inventoryCount"
          ></el-table-column>
          <el-table-column
            label="退库数量"
            show-overflow-tooltip
            prop="materialCount"
          ></el-table-column>
          <el-table-column label="单价(元)" show-overflow-tooltip prop="price">
          </el-table-column>
          <el-table-column
            label="金额(元)"
            show-overflow-tooltip
            prop="totalAmount"
          >
          </el-table-column>
          <el-table-column label="供应商" show-overflow-tooltip prop="supplier">
          </el-table-column>
        </el-table>
      </div>
    </Container>
    <Container>
      <p class="form-title">审批信息</p>
      <div class="form-row">
        <div class="ul p-clear">
          <div class="li">{{ formInfo.userName }}</div>
          <div class="arrow">
            <img src="@/assets/image/arrow.png" alt="" />
          </div>
          <div class="li active">{{ approveDetail.userName }}</div>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="h40">
              <span>审批人：</span>{{ approveDetail.userName }}
            </div>
          </el-col>
          <el-col :span="24">
            <div class="h40">
              <span>审批状态：</span>{{ approveDetail.approvalStatus }}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="h40">
              <span>审批日期：</span>{{ approveDetail.approvalTime }}
            </div>
          </el-col>
          <el-col :span="24">
            <div class="h40">
              <span>审批意见：</span>{{ approveDetail.remark }}
            </div>
          </el-col>
        </el-row>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import baseInfo from "./../../../config/config";
import {
  materialCollectionInfo,
  downloadPDF,
  updateApplicationStatus,
  materialCollectionApproveDetail,
} from "./../../../apis/materialRequisition";
export default {
  name: "setting",
  data() {
    return {
      formInfo: {},
      tableData: [],
      mainId: "",
      status: "",
      pdf_src: "",
      approveDetail: {},
    };
  },
  created() {
    const { id, status } = this.$route.query;
    this.mainId = id;
    this.status = status;
    this._getInfo();
  },
  methods: {
    _goback() {
      this.$router.push("/materialWithdrawal/examineList");
    },
    _getInfo() {
      let params = {
        id: this.mainId,
      };
      materialCollectionInfo(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.materialList;
          this.formInfo = JSON.parse(JSON.stringify(res.data.data));
          delete this.formInfo.materialList;
        } else {
          this.$message.error(res.data.message);
        }
      });
      materialCollectionApproveDetail({
        materialCollectionId: this.mainId,
      }).then((res) => {
        if (res.data.code === 200) {
          this.approveDetail = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 打印单据
    _downloadPDF() {
      let params = {
        id: this.mainId,
      };
      downloadPDF(params).then((res) => {
        if (res.data.code === 200) {
          this.pdf_src = baseInfo.DOWNLOAD_URL + res.data.data.data;
          window.open(
            `${baseInfo.PREVIEW_URL}?url=` + encodeURIComponent(this.pdf_src)
          );
          this.$message.success(res.data.message);
          if (this.status === "0") {
            this._checkAccount();
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 确认
    _checkAccount() {
      let params = {
        id: this.mainId,
      };
      updateApplicationStatus(params).then((res) => {
        if (res.data.code === 200) {
          this.$message.success(res.data.message);
          this.$router.go(0);
        } else {
          this.$message.error(res.data.message);
        }
      });
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
    width: 100px;
    text-align: right;
  }
}
.form-title {
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 18px;
}
.form-row {
  padding: 15px 30px;
  .ul {
    margin-bottom: 20px;
    .li {
      float: left;
      height: 40px;
      line-height: 40px;
      padding: 0 30px;
      border: 1px solid #dcdcdc;
      border-radius: 9px;
      margin-right: 30px;
    }
    .li.active {
      background: #217DFA;
      color: #fff;
    }
    .arrow {
      float: left;
      height: 40px;
      color: #999;
      font-size: 20px;
      line-height: 40px;
      margin-right: 30px;
    }
  }
}
.wrapper {
  .wrapper-form {
    background: #fff;
    height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }
  .h40 {
    height: 40px;
    line-height: 40px;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
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
      .form-title {
        border-bottom: 1px solid #e5e5e5;
        line-height: 60px;
        padding-left: 30px;
        font-family: Source Han Sans CN Regular,
          Source Han Sans CN Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #333333;
        font-size: 18px;
        background: #fcfcfc;
      }
      .form-row {
        padding: 15px 30px;
        .ul {
          margin-bottom: 20px;
          .li {
            float: left;
            height: 40px;
            line-height: 40px;
            padding: 0 30px;
            border: 1px solid #dcdcdc;
            border-radius: 9px;
            margin-right: 30px;
          }
          .li.active {
            background: #1d93a8;
            color: #fff;
          }
          .arrow {
            float: left;
            height: 40px;
            color: #999;
            font-size: 20px;
            line-height: 40px;
            margin-right: 30px;
          }
        }
      }
    }
    .btno {
      border-top: none;
    }
    .table-box {
      border-bottom: 1px solid #e5e5e5;
      border-top: none;
    }
    .table-content {
      padding: 20px;
      // height: 35vh;
      // overflow: scroll;
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
}
</style>