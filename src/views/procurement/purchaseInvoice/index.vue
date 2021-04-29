<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="采购订单号：" prop="name">
          <el-input
            placeholder="请输入采购订单号"
            v-model.trim="formInline.purchaseOrderNumber"
            clearable
            @blur="handleChange"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购收货单号：" prop="name">
          <!-- <el-input placeholder="请输入采购单号" v-model="formInline.purchaseOrderNumber" clearable></el-input> -->
          <el-select
            placeholder="请选择"
            filterable
            clearable
            v-model="formInline.purchaseReceiptNumber"
            style="width: 100%"
          >
            <el-option
              v-for="(item, index) in purchaseReceiptNumberList"
              :key="index"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货日期：" prop="type">
            <el-form-item prop="startDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formInline.startDate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="endDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="formInline.endDate"
              ></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="供应商：" prop="supplierCode">
          <el-select
            placeholder="请选择"
            clearable
            v-model="formInline.supplierCode"
          >
            <el-option
              v-for="item in supplierList"
              :key="item.supplierId"
              :value="item.code"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_searchHandle">查询</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-button icon="el-icon-plus" @click="_addItemHandle" type="primary"
          >新建</el-button
        >
        <el-select
          v-model="excelBtns"
          @change="selectionHandle()"
          placeholder="导出数据"
        >
          <el-option
            v-for="item in excelBtnList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </OperationContainer>
      <el-table
        :height="tableHeight"
        :data="tableData"
        v-loading="loading"
        border
        @selection-change="handleSelectionChange"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
      >
        <el-table-column
          type="selection"
          width="55"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="采购订单单号"
          show-overflow-tooltip
          prop="purchaseOrderNumber"
        ></el-table-column>
        <el-table-column
          label="采购收货单号"
          show-overflow-tooltip
          prop="purchaseReceiptNumber"
        ></el-table-column>
        <el-table-column
          label="供应商"
          show-overflow-tooltip
          prop="supplierName"
        ></el-table-column>
        <el-table-column
          label="收货日期"
          show-overflow-tooltip
          prop="receivingDate"
        ></el-table-column>
        <el-table-column
          label="发票号"
          show-overflow-tooltip
          prop="invoiceNumber"
        ></el-table-column>
        <el-table-column
          label="备注"
          show-overflow-tooltip
          prop="remarks"
        ></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="详情"
              placement="top"
            >
              <el-button type="text" @click="_itemDetailHandle(scope.row)">
                <i class="el-icon-tickets"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="维护"
              placement="top"
            >
              <el-button type="text" @click="_itemSettingHandle(scope.row)">
                <i class="el-icon-setting"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div id="pagation">
        <pagination
          :total="total"
          :page="currentPage"
          :pageSize="pageSize"
          @pagation="pagationChange"
        />
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index";
import { geSupplierList } from "./../../../apis/commonApi";
import {
  getData,
  receiptListByOrderNum,
} from "./../../../apis/purchaseInvoice";

export default {
  name: "purchaseInvoice", // 采购发票维护
  components: {
    pagination,
  },
  data() {
    return {
      excelBtnList: [
        {
          label: "全部导出",
          value: "1",
        },
        {
          label: "批量导出",
          value: "2",
        },
      ],
      excelBtns: "",
      formInline: {
        startDate: null,
        endDate: null,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      tableHeight: "0px",
      tableData: [],
      supplierList: [],
      loading: false,
      multipleSelection: [], //选中的table数据
      purchaseReceiptNumberList: [],
    };
  },
  mounted() {
    this._geSupplierList();
    this._getData();
  },
  methods: {
    handleChange(value) {
      if (value) {
        console.log("value", value);
        receiptListByOrderNum(value).then((res) => {
          if (res.data.code === 200) {
            this.purchaseReceiptNumberList = res.data.data;
          }
        });
      }
    },
    handleSelectionChange(val) {
      //勾选复选框改变
      this.multipleSelection = val;
    },
    _addItemHandle() {
      //新建
      this.$router.push({
        path: "/purchaseInvoice/add",
      });
    },
    selectionHandle() {
      //导出数据
      if (this.multipleSelection.length === 0) {
        this.$message.warning("请勾选要导出的数据!");
        return false;
      }
      let params = {
        opinionContent: this.suggestion,
        startTime: this.yjTimeStart === null ? "" : this.yjTimeStart,
        endTime: this.yjTimeEnd === null ? "" : this.yjTimeEnd,
        handleStatus: this.status,
        deptId: this.dept,
        userName: this.name,
        sex: this.sex,
      };
      // if (this.excelBtns === '1') {
      //   exportAll(params).then((res) => {
      //     if (res.status === 200) {
      //       let blob = new Blob([res.data], {
      //         type: res.data.type + "charset=utf-8",
      //       })
      //       let downloadLink = document.createElement("a")
      //       const URL = window.URL || window.webkitURL || window.moxURL
      //       let downUrl = URL.createObjectURL(blob)
      //       downloadLink.href = downUrl
      //       downloadLink.download = "意见反馈.xlsx"
      //       downloadLink.click()
      //       window.URL.revokeObjectURL(downUrl)
      //       this.excelBtns = ""
      //     }
      //   })
      // } else {
      //   if (this.multVal === undefined || this.multVal.length === 0) {
      //     this.$message.warning("请选择要导出的数据")
      //     this.excelBtns = ""
      //     return false
      //   } else {
      //     let opinionIds = []
      //     this.multVal.forEach(element => {
      //       opinionIds.push(element.id)
      //     })
      //     exportAll({
      //       opinionIds: opinionIds
      //     }).then((res) => {
      //       if (res.status === 200) {
      //         let blob = new Blob([res.data], {
      //           type: res.data.type + "charset=utf-8",
      //         })
      //         let downloadLink = document.createElement("a")
      //         const URL = window.URL || window.webkitURL || window.moxURL
      //         let downUrl = URL.createObjectURL(blob)
      //         downloadLink.href = downUrl
      //         downloadLink.download = "意见反馈.xlsx"
      //         downloadLink.click()
      //         window.URL.revokeObjectURL(downUrl)
      //         this.excelBtns = ""
      //       }
      //     })
      //   }
      // }
    },
    _getArg() {
      const { startDate, endDate } = this.formInline;
      if (!startDate) {
        this.formInline.startDate = "";
      } else {
        this.formInline.startDate = this.$moment(startDate).format(
          "YYYY-MM-DD"
        );
      }
      if (!endDate) {
        this.formInline.endDate = "";
      } else {
        this.formInline.endDate = this.$moment(endDate).format("YYYY-MM-DD");
      }
      return this.formInline;
    },
    _geSupplierList() {
      geSupplierList().then((res) => {
        if (res.data.code === 200) {
          this.supplierList = res.data.data;
        }
      });
    },
    _searchHandle() {
      this.currentPage = 1;
      this.pageSize = 10;
      this._getData();
    },
    _getData() {
      let arg = this._getArg();
      let params = {
        ...arg,
        size: this.pageSize,
        current: this.currentPage,
      };
      this.loading = true;
      getData(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.currentPage = res.data.data.current;
          this.pageSize = res.data.data.size;
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false;
      });
    },
    _itemDetailHandle(row) {
      this.$router.push({
        path: "/purchaseInvoice/detail",
        query: {
          id: row.id,
        },
      });
    },
    _itemSettingHandle(row) {
      this.$router.push({
        path: "/purchaseInvoice/setting",
        query: {
          id: row.id,
        },
      });
    },
    pagationChange(payload) {
      this.currentPage = payload.page;
      this.pageSize = payload.pageSize;
      this._getData();
    },
  },
};
</script>
<style lang="less" scoped>
.addBtn {
  background: #1d93a8;
  color: #fff;
  height: 36px;
  float: left;
  margin-right: 20px;
  padding: 10px 20px;
}

.wrapper {
  .wrapper-form {
    background: #fff;
    // height: 45px;
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .wrapper-table {
    background: #fff;
    box-sizing: border-box;
    padding: 15px;
  }
}
</style>
<style lang="less">
#nevbox {
  margin-top: 15px;
  margin-bottom: 25px;

  .el-select {
    width: 130px;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0px;
    padding-left: 12px;
    height: 36px;
    color: #333;
    border-color: #cdcbcb;
  }

  .el-select .el-input .el-select__caret {
    color: #333;
    line-height: 36px;
  }

  .el-input__inner::placeholder {
    color: #333;
  }

  /* 谷歌 */
  .el-input__inner::-webkit-input-placeholder {
    color: #333;
  }

  /* 火狐 */
  .el-input__inner:-moz-placeholder {
    color: #333;
  }

  /*ie*/
  .el-input__inner:-ms-input-placeholder {
    color: #333;
  }
}
</style>