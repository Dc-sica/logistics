<!--
 * @Author: Jason_Ma
 * @Date: 2021-01-08 13:46:24
 * @LastEditors: Jason_Ma
 * @LastEditTime: 2021-02-04 14:53:11
 * @FilePath: /hos-logistics-management/src/views/inventory/inventoryQuery/info.vue
-->
<template>
  <ContainerGroup>
    <div class="content">
      <Container class="content-left">
        <div class="content-left-title">物资分类</div>
        <ul class="types">
          <li
            v-for="(item, index) in categoryList"
            :key="index"
            :class="currentIndex === index ? 'currentItem' : ''"
            @click="_selectItem(item, index)"
          >
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </Container>
      <ContainerGroup class="content-right">
        <Container>
          <el-form :inline="true" :model="searchForm" ref="searchForm">
            <el-form-item label="物资名称：" prop="materialName">
              <el-input
                placeholder="请输入物资名称"
                clearable
                v-model="searchForm.materialName"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否显示0库存：" prop="showZero">
              <el-select
                placeholder="请选择"
                clearable
                v-model="searchForm.showZero"
              >
                <el-option value="0" label="不显示"></el-option>
                <el-option value="1" label="显示"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库：" prop="warehouseName">
              <el-input
                placeholder="请输入仓库名称"
                v-model="searchForm.warehouseName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="_searchHandle">查询</el-button>
            </el-form-item>
          </el-form>
        </Container>
        <Container>
          <el-table
            :data="tableData"
            v-loading="loading"
            border
            :header-cell-style="{ background: '#FAFAFA', height: '45px' }"
            stripe
            size="mini"
            highlight-current-row
            height="0"
            isFillHeight
          >
            <el-table-column
              label="仓库"
              prop="warehouseName"
            ></el-table-column>
            <el-table-column label="名称" prop="materialName"></el-table-column>
            <el-table-column label="条形码" prop="code"></el-table-column>
            <el-table-column
              label="分类"
              prop="materialCategoryName"
            ></el-table-column>
            <el-table-column
              label="规格"
              prop="materialSpecs"
            ></el-table-column>
            <el-table-column label="型号" prop="materialType"></el-table-column>
            <el-table-column label="单位" prop="materialUnit"></el-table-column>
            <el-table-column label="单价" prop="price"></el-table-column>
            <el-table-column
              label="库存总量"
              prop="stockTotal"
            ></el-table-column>
            <el-table-column
              label="库存总价"
              prop="stockTotalPrice"
            ></el-table-column>
            <el-table-column
              label="最小库存存量"
              prop="minCapacity"
            ></el-table-column>
            <el-table-column
              label="最大库存存量"
              prop="maxCapacity"
            ></el-table-column>
            <el-table-column
              label="安全库存存量"
              prop="secureCapacity"
            ></el-table-column>
          </el-table>

          <pagination
            :total="total"
            :page="currentPage"
            :pageSize="pageSize"
            @pagation="pagationChange"
          />
        </Container>
      </ContainerGroup>
    </div>
  </ContainerGroup>
</template>
<script>
import pagination from "./../../../components/pagination/index";
import { categoryList } from "./../../../apis/commonApi";
import { queryStock } from "./../../../apis/inventoryQuery/index";
export default {
  name: "purchaseInfo", // 库存查询
  components: {
    pagination,
  },
  data() {
    return {
      searchForm: {
        materialName: "",
        showZero: "",
        warehouseName: "",
      },
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      categoryList: [],
      currentIndex: 0,
      currentObj: null,
      loading: false,
    };
  },
  mounted() {
    this._categoryList();
  },
  methods: {
    _categoryList() {
      categoryList().then((res) => {
        if (res.data.code === 200) {
          this.categoryList = res.data.data;
          if (this.categoryList.length > 0) {
            this.currentObj = this.categoryList[0];
            this._getData();
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    _getData() {
      let params = {
        ...this.searchForm,
        materialCategoryId: this.currentObj.materialCategoryId,
        pageSize: this.pageSize,
        current: this.currentPage,
      };
      this.loading = true;
      queryStock(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          this.pageSize = res.data.data.size;
          this.currentPage = res.data.data.current;
        } else {
          this.$message.error(res.data.message);
        }
        this.loading = false;
      });
    },
    _searchHandle() {
      (this.pageSize = 10), (this.currentPage = 1);
      this._getData();
    },
    _selectItem(row, index) {
      this.currentIndex = index;
      (this.currentObj = row), this._getData();
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
.content {
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 100%;
  .content-left {
    width: 200px;
    background: #fff;
    margin-right: 10px;
    .content-left-title {
      padding: 12px 10px;
      font-size: 18px;
      color: #333;
      text-align: center;
      background: #f7f7f7;
      border-bottom: 1px solid #e8eaed;
    }
    .types {
      overflow-y: auto;
      li {
        padding:12px 10px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
      }
      .currentItem {
        background: #217dfa;
        color: #fff;
      }
    }
  }
  .content-right {
    flex-grow: 1;
  }
}
.wrapper-form {
  background: #fff;
  height: 45px;
  padding: 10px 15px;
  margin-bottom: 15px;
}
.wrapper-table {
  background: #fff;
  box-sizing: border-box;
  padding: 15px;
}
</style>