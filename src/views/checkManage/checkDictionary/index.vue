<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" label-width="90px">
        <el-form-item label="属性名称：">
          <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：">
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
        <el-select v-model="excelBtns" size="large" @change="selectionHandle()" placeholder="停用/启用">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button icon="el-icon-delete" type="primary" @click="handleAllData">批量删除</el-button>
      </OperationContainer>
      <el-table :data="tableData" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="属性名称" show-overflow-tooltip prop="name"></el-table-column>
        <el-table-column label="禁用/启用" show-overflow-tooltip prop="code">
          <template v-slot="scoped">
            <el-switch @change="handleAbleCan(scoped.row)" v-model="scoped.row.value" active-color="#217DFA" inactive-color="#d9d9d9"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="排序" show-overflow-tooltip prop="code"></el-table-column>
        <el-table-column label="创建时间" prop="contacts"></el-table-column>
        <el-table-column label="操作" prop="" width="100">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="数据项管理" placement="top">
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
    name: 'checkDictionary',
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
        formInfodl: {},
        formDate: null,
        formInline: {},
        showAll: false,
        excelBtns: '',
        excelBtnList: [{
            label: "启用",
            value: "1",
          },
          {
            label: "停用",
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
      handleAbleCan(row){//禁用、启用

      },
      handleEdit(row) { //编辑

      },
      handleDelete(row) { //删除

      },
      handleAllData() { //批量删除

      },
      handleCreate() {

      },
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
            this.$message.warning("请选择要停用/启用的数据");

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
      handleReset() {
        for (let key in this.formInline) {
          this.formInline[key] = ''
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .nowrap {
    float: right;
  }
</style>