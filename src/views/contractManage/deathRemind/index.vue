<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" label-width="90px">
        <el-form-item label="合同编号：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="合同名称：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="签约时间：">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间：" v-if="showAll">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
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
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </OperationContainer>
      <el-table :data="tableData" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="截止时间" show-overflow-tooltip prop="name"></el-table-column>
        <el-table-column label="合同编号" show-overflow-tooltip prop="code"></el-table-column>
        <el-table-column label="合同名称" show-overflow-tooltip prop="code"></el-table-column>
        <el-table-column label="合同类型" prop="contacts"></el-table-column>
        <el-table-column label="合同金额(含税金额)" show-overflow-tooltip prop="phone"></el-table-column>
        <el-table-column label="甲方代表" prop="bank"></el-table-column>
        <el-table-column label="乙方名称" show-overflow-tooltip prop="bankAccount"></el-table-column>
        <el-table-column label="乙方代表" show-overflow-tooltip prop="address"></el-table-column>
        <el-table-column label="签约时间" show-overflow-tooltip prop="contactsEmail"></el-table-column>
        <el-table-column label="操作" prop="" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="handleDetails(scope.row)">
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
      <Dialog title="合同到期提醒" :visible="addVisible" @cancel="_itemHandleClose" :footerBtns="[
        {
          text: '取消',
          trigger: 'cancel',
        }]">
        <el-form ref="formInfo1" :model="formInfodl" :rules="rules" :inline="false" label-width="100px">
          <el-col :span="12">
            <el-form-item label="合同编号：">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同名称：" prop="name">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同金额：">
              <span>{{formInfodl.name}}</span>元
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同类别：">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方代表：" prop="name">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方名称：" prop="name">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方代表：" prop="name">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止时间：">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约时间：">
              <span>{{formInfodl.name}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </Dialog>
    </Container>
  </ContainerGroup>
</template>
<script>
  import pagination from '../../../components/pagination/index'
  export default {
    name: 'deathRemind',
    components: {
      pagination
    },
    data() {
      // 验证最小、最大原值为数字
      let checkNumber = (rule, value, callback) => {
        console.log(typeof value)
        if (!isNaN(value)) {
          callback();
        } else {
          callback(new Error("请输入数字"));
        }
      }
      return {
        formInfodl:{},
        formDate:null,
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
        statusArr: [],
        rules: {
          minPrice: [{
            required: true,
            validator: checkNumber,
            message: '请输入数字',
            trigger: 'blur'
          }],
          maxPrice: [{
            validator: checkNumber,
            message: '请输入数字',
            trigger: 'blur'
          }],
        },
        addVisible: false,
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
      _itemHandleClose() {
        this.addVisible = false
      },
      handleDetails() { //查看详情
        this.$router.push('/contractManage/detail')
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
      handleReset() {}
    }
  }
</script>
<style lang="less" scoped>
  .nowrap {
    float: right;
  }
</style>