<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" ref="searchForm">
        <el-form-item label="巡检编号：">
          <el-input
            placeholder="请输入巡检编号"
            v-model="searchForm.orderId"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="任务名称：">
          <el-input
            placeholder="请输入"
            v-model="searchForm.projectName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="巡检类型：">
          <el-select
            placeholder="请选择"
            v-model="searchForm.checkType"
            clearable
          >
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型：">
          <el-select
            placeholder="请选择"
            v-model="searchForm.checkType"
            clearable
          >
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称：">
          <el-select placeholder="请选择" v-model="searchForm.checkType" clearable>
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：" v-if="showAll">
          <el-input
            placeholder="请输入"
            v-model="searchForm.deviceName"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="公司名称：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.checkType" clearable>
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="searchForm.checkType" clearable>
            <el-option
              v-for="item in checkTypeList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" v-if="showAll">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="searchForm.startTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              placeholder="选择日期"
              v-model="searchForm.endTime"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="结束时间：" v-if="showAll">
          <el-form-item>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="searchForm.startTime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              placeholder="选择日期"
              v-model="searchForm.endTime"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="_searchHandle">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button type="text" id="closeSearchBtn" @click="closeSearch">
            {{ word }}
            <i
              :class="showAll ? 'el-icon-arrow-up ' : 'el-icon-arrow-down'"
            ></i>
          </el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <OperationContainer id="nevboxs">
        <el-button icon="el-icon-plus" type="primary" @click="_addItemHandle"
          >新建</el-button
        >
        <el-select
          v-model="excelBtns"
          size="large"
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
        :data="tableData" border 
        @selection-change="handleSelectionChange"
        v-loading="loading"
        :header-cell-style="{ background: '#FAFAFA', height: '42px' }"
        stripe
        size="mini"
        highlight-current-row
        isFillHeight
        height="0"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="巡检编号" prop=""></el-table-column>
        <el-table-column label="任务名称" prop=""></el-table-column>
        <el-table-column label="巡检类型" prop=""></el-table-column>
        <el-table-column label="设备类型" prop=""></el-table-column>
        <el-table-column label="分类名称" prop=""></el-table-column>
        <el-table-column label="设备名称" prop=""></el-table-column>
        <el-table-column label="开始时间" prop=""></el-table-column>
        <el-table-column label="结束时间" prop=""></el-table-column>
        <el-table-column label="巡检频率" prop=""></el-table-column>
        <el-table-column label="公司名称" prop=""></el-table-column>
        <el-table-column label="计划状态" prop="">
          
        </el-table-column>
        <el-table-column label="任务状态" prop="">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
            @click.stop.native @change="active_text(scope.row)"
            active-color="#217DFA" inactive-color="#E5E5E5" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看"
              placement="top"
            >
              <el-button
                type="text"
                class="iconfont"
                v-html="'&#xe67e;'"
                @click="_toDetailHandle(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="text" @click="_editItemHandle(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item-button" effect="dark" content="删除" placement="top">
              <el-button type="text" @click="_removeHandle(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page="currentPage"
        :pageSize="pageSize"
        @pagation="pagationChange"
      />
    </Container>
  </ContainerGroup>
</template>

<script>
import pagination from '../../../components/pagination/index'
export default {
  name: "checkPlan",
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        orderId: '',
        projectName: '',
        checkType: '',
        deviceName: '',
        startTime: '',
        endTime: ''
      },
      checkTypeList: [{
        id: '1',
        name: '123'
      }],
      showAll: true,
      excelBtns: "",
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
      multVal: [],
      loading: false,
      tableData: [{
        status: 1
      }],
      currentPage: 1,
      total: 0,
      pageSize: 20,
    }
  },
  computed: {
    word: function () {
      if (this.showAll == false) {
        return "展开"
      } else {
        return "收起"
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.closeSearch()
    });
  },
  methods: {
    closeSearch () {
      this.showAll = !this.showAll
    },
    _getData () {},
    _searchHandle () {

    },
    reset () {},
    _addItemHandle() {
      this.$router.push({
        path: "/checkManage/add"
      })
    },
    handleSelectionChange (val) {
      this.multVal = val
    },
    selectionHandle () {},
    _toDetailHandle () {
       this.$router.push({
        path: "/checkManage/detail"
      })
    },
    _editItemHandle () {},
    _removeHandle () {},
    pagationChange(payload) {
      this.currentPage = payload.page
      this.pageSize = payload.pageSize
      this._getData()
    },
  }
}
</script>

<style>

</style>