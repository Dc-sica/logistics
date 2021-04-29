<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" ref="formInline" label-width="90px">
        <el-form-item label="订单编号：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="领用人：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="领用部门：">
          <el-select placeholder="请选择" clearable v-model="formInline.manufacturerId" style="width:100%;">
            <el-option v-for="(item,index) in department" :key="index" :value="item.manufacturerId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：" v-if="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.supplier" style="width:100%;">
            <el-option v-for="(item,index) in statusArr" :key="index" :value="item.supplierId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="录单日期：" v-if="showAll">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="过账日期：" v-if="showAll">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商：" v-if="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.supplier" style="width:100%;">
            <el-option v-for="(item,index) in supplierArr" :key="index" :value="item.supplierId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="nowrap">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{word}}
            <i :class="showAll ? 'el-icon-arrow-up ': 'el-icon-arrow-down'"></i>
          </el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button icon="el-icon-plus" type="primary" @click="handleCreate">新建</el-button>
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table :data="tableData" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="出库单号" show-overflow-tooltip prop="name"></el-table-column>
        <el-table-column label="出库来源" show-overflow-tooltip prop="code"></el-table-column>
        <el-table-column label="出库仓库" prop="contacts"></el-table-column>
        <el-table-column label="申请部门" show-overflow-tooltip prop="phone"></el-table-column>
        <el-table-column label="申请人" prop="bank"></el-table-column>
        <el-table-column label="出库日期" show-overflow-tooltip prop="bankAccount"></el-table-column>
        <el-table-column label="过账日期" show-overflow-tooltip prop="address"></el-table-column>
        <el-table-column label="过账状态" show-overflow-tooltip prop="contactsEmail"></el-table-column>
        <el-table-column label="操作" prop="" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="handleDetails(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="text" @click="handleEdit(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" v-if="scope.row.status === 1" effect="dark" content="过账" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe62e;'" @click="handleguozhang(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" v-if="scope.row.status === 1" effect="dark" content="删除" placement="top">
              <el-button type="text" class="el-icon-delete" @click="handleDelete(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from './../../../components/pagination/index'
  export default {
    name: 'delivery',
    components: {
      pagination
    },
    data() {
      return {
        supplierArr: [],
        formDate: null,
        formInline: {},
        showAll: false,
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
        multipleSelection: [],
        department: [],
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
        statusArr: []
      }
    },
    created() {

    },
    computed: {
      word: function() {
        if (this.showAll == false) {
          return "展开";
        } else {
          return "收起";
        }
      }
    },
    methods: {
      handleDelete() { //删除

      },
      handleDetails(row) { //查看详情
        if (row) {//直接出库
          this.$router.push('/warehousing/detail')
        } else {//物资领用
          this.$router.push('/warehousing/detail')
        }


      },
      handleEdit() { //编辑
        this.$router.push({
          path: '/warehousing/edit',
          query: 2
        })
      },
      handleguozhang() { //过账

      },
      pagationChange() {

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      // 导出
      selectionHandle() {
        let params = {
          condition: this.name,
          status: this.status,
        };
        if (this.excelBtns == "1") {
          // 全部导出
          // supExport(params).then((res) => {
          //   if (res.status === 200) {
          //     let blob = new Blob([res.data], {
          //       type: res.data.type + "charset=utf-8",
          //     });
          //     let downloadLink = document.createElement("a");
          //     const URL = window.URL || window.webkitURL || window.moxURL;
          //     let downUrl = URL.createObjectURL(blob);
          //     downloadLink.href = downUrl;
          //     downloadLink.download = "供应商信息.xlsx";
          //     downloadLink.click();
          //     window.URL.revokeObjectURL(downUrl);
          //   }
          // });
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
              ids.push(element.supplierId);
            });
            params.ids = ids
            // supExport(params).then((res) => {
            //   if (res.status === 200) {
            //     let blob = new Blob([res.data], {
            //       type: res.data.type + "charset=utf-8",
            //     });
            //     let downloadLink = document.createElement("a");
            //     const URL = window.URL || window.webkitURL || window.moxURL;
            //     let downUrl = URL.createObjectURL(blob);
            //     downloadLink.href = downUrl;
            //     downloadLink.download = "供应商信息.xlsx";
            //     downloadLink.click();
            //     window.URL.revokeObjectURL(downUrl);
            //   }
            // });
          }
          this.excelBtns = "";
        }

      },
      closeSearch() {
        this.showAll = !this.showAll
      },
      handleSearch() {

      },
      handleReset() {},
      handleCreate() { //新建
        this.$router.push({
          path: '/delivery/add',
          query: 1
        })

      }
    }
  }
</script>
<style lang="less" scoped>
  .nowrap {
    float: right;
  }
</style>