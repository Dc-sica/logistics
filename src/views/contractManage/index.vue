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
        <el-form-item label="合同类型：">
          <el-select placeholder="请选择" clearable v-model="formInline.manufacturerId" style="width:100%;">
            <el-option v-for="(item,index) in department" :key="index" :value="item.manufacturerId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同金额：" v-if="showAll">
          <el-col :span="8">
            <el-form-item prop="minPrice">
              <el-input placeholder="请输入" v-model="formInline.minPrice" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align:center;margin-left:-10px;">~</el-col>
          <el-col :span="8">
            <el-form-item prop="maxPrice" v-if="showAll">
              <el-input placeholder="请输入" v-model="formInline.maxPrice" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="乙方名称：" v-if="showAll">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="乙方代表：" v-if="showAll">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="签约时间：" v-if="showAll">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间：" v-if="showAll">
          <el-date-picker size="small" style="width:100%;" value-format="yyyy-MM-dd" v-model="formDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同状态：" v-if="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.supplier" style="width:100%;">
            <el-option v-for="(item,index) in statusArr" :key="index" :value="item.supplierId" :label="item.name"></el-option>
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
        <el-table-column label="合同编号" show-overflow-tooltip prop="name"></el-table-column>
        <el-table-column label="合同名称" show-overflow-tooltip prop="code"></el-table-column>
        <el-table-column label="合同类型" prop="contacts"></el-table-column>
        <el-table-column label="合同金额(含税金额)" show-overflow-tooltip prop="phone"></el-table-column>
        <el-table-column label="甲方代表" prop="bank"></el-table-column>
        <el-table-column label="乙方名称" show-overflow-tooltip prop="bankAccount"></el-table-column>
        <el-table-column label="乙方代表" show-overflow-tooltip prop="address"></el-table-column>
        <el-table-column label="签约时间" show-overflow-tooltip prop="contactsEmail"></el-table-column>
        <el-table-column label="截止时间" prop="legalPerson"></el-table-column>
        <el-table-column label="合同状态">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '启用': '禁用'}}</span>
          </template>
        </el-table-column>
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
  import pagination from './../../components/pagination/index'
  export default {
    name: 'contractManage',
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
      handleDelete(row) { //删除

      },
      handleDetails() { //查看详情
        this.$router.push('/contractManage/detail')
      },
      handleEdit() { //编辑
        this.$router.push({
          path: '/contractManage/edit',
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
          path: '/contractManage/add',
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