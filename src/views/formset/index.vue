<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="模板名称：" prop="name">
          <el-input v-model="name" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer>
        <el-button type="primary" icon="el-icon-plus" style="" @click="_addItemHandle">新建</el-button>
      </OperationContainer>
      <el-table :data="tableData" border v-loading="tableLoading" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" highlight-current-row isFillHeight height="0">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="表单名称" prop="tableName"></el-table-column>
        <el-table-column label="表单类型" prop="tableTypeName">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @click.stop.native @change="active_text(scope.row)" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="提交时间" prop="submitTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="_toDetailHandle(scope.row)">
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
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
  import pagination from "./../../components/pagination/index";
  import {
    updateStatus,
    getTableSettingInfo,
  } from "./../../apis/formset/indexApi";
  export default {
    name: "formset", // 表单设置
    components: {
      pagination,
    },
    data() {
      return {
        tableLoading: false,
        name: "",
        total: 0,
        pageSize: 20,
        currentPage: 1,
        tableData: [],
      };
    },
    created() {
      this._getData();
    },
    methods: {
      _getData() {
        let parms = {
          tableName: this.name,
          size: this.pageSize,
          current: this.currentPage,
        };
        this.tableLoading = true;
        getTableSettingInfo(parms).then((res) => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
          this.tableLoading = false;
        });
      },
      searchHandle() {
        this.currentPage = 1;
        this._getData();
      },
      reset() {
        this.name = "";
      },
      // 查看
      _toDetailHandle() {

      },
      _addItemHandle() {
        //新建
        this.$router.push({
          path: "/formset/add",
        })
      },
      _editItemHandle(row) {
        this.$router.push({
          path: "/formset/add",
          query: {
            // detil: row,
            type: 1, //编辑
          },
        })
        // this.titleText = "编辑嘱托";
        // this.dialogVisible = true;
        // let obj = JSON.parse(JSON.stringify(row));
        // this.$nextTick(() => {
        //   this.ruleForm.id = obj.id;
        //   this.ruleForm.name = obj.name;
        //   this.ruleForm.sort = obj.sort;
        //   this.ruleForm.areaValue = obj.areaIdList;
        //   this.ruleForm.status = obj.status;
        // });
      },
      active_text(row) {
        updateStatus(row.id).then((res) => {
          if (res.data.code === 200) {
            this.$message.success("修改成功");
            this._getData();
          } else {
            this.$message.success("操作失败");
          }
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