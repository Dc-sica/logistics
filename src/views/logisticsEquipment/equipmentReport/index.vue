<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" ref="formInline" label-width="100px">
        <el-form-item label="关键词搜索：">
          <el-input placeholder="设备名称/设备编号/型号搜索" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备分类：">
          <el-select placeholder="请选择" style="width:100%;" clearable v-model="formInline.typeId">
            <el-option v-for="(item,index) in shebeiClass" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备位置：">
          <el-input placeholder="请输入设备位置" v-model="formInline.location" clearable></el-input>
        </el-form-item>
        <el-form-item label="厂商：">
          <el-select placeholder="请选择" style="width:100%;" clearable v-model="formInline.manufacturerId">
            <el-option v-for="(item,index) in manufacturerList" :key="index" :value="item.manufacturerId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-select placeholder="请选择" style="width:100%;" clearable v-model="formInline.brandId">
            <el-option v-for="(item,index) in brandList" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select placeholder="请选择" style="width:100%;" v-model="formInline.status" clearable>
            <el-option value="1" label="开启"></el-option>
            <el-option value="0" label="关闭"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right;">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </Container>
    <Container>
      <el-table isFillHeight height="0" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" stripe size="mini" :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" border>
        <el-table-column label="设备名称" prop="name" width="140"></el-table-column>
        <el-table-column label="设备编号" prop="code" width="180"></el-table-column>
        <el-table-column label="型号" prop="model"></el-table-column>
        <el-table-column label="设备分类" prop="typeName"></el-table-column>
        <el-table-column label="设备位置" prop="location"></el-table-column>
        <el-table-column label="厂商" prop="manufacturerName"></el-table-column>
        <el-table-column label="品牌" prop="brandName"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            {{scope.row.status==1?'开启':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="维修次数" prop="maintenanceCount"></el-table-column>
        <el-table-column label="保养次数" prop=""></el-table-column>
        <el-table-column label="巡检次数" prop=""></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item-button" effect="dark" content="查看" placement="top">
              <el-button type="text" class="iconfont" v-html="'&#xe67e;'" @click="handleDetails(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
    </Container>
    <el-dialog width="350px" v-if="dialogVisible" :visible.sync="dialogVisible" :close-on-click-moda="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <!-- </div> -->
  </ContainerGroup>
</template>
<script>
  import configUrl from '../../../config/config.js'
  import {
    getManufacturerListPage,
    getBrandInfo,
    getSupplier,
  } from './../../../apis/manufacturerInformation/indexApi'
  import {
    getEquipmentPage,
    getParambuildInit,
    getQRCode,
    exportEquipment
  } from './../../../apis/logisticsEquipment/index'
  import pagination from './../../../components/pagination/index'
  export default {
    name: 'equipmentReport',
    components: {
      pagination
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imgSrc: require('../../../assets/image/ewm.png'),
        manufacturerList: [], //厂商
        brandList: [], //品牌
        supplierList: [], //经销商
        shebeiClass: [], //设备分类
        excelBtns: '',
        formDate: {},
        formInline: {
          buyStartDate: '', //开始购置日期
          buyEndDate: '', //结束购置日期
          repairStartDate: '', //开始保修日期
          repairEndDate: '' //结束保修日期
        },
        tableData: [],
        total: 0,
        pageSize: 20,
        currentPage: 1,
        loading: false,
        multipleSelection: [], //选中的table数据
        multipleSelectionCode: [], //选中的table的code数据
      }
    },
    created() {
      this._getData()
      this.getManufacturerListPageList()
      this.getBrandInfoList()
      this.getSupplierList()
      this.getParambuildInitList()
    },
    methods: {
      getParambuildInitList() { //获取设备分类下拉框
        getParambuildInit().then(res => {
          if (res.data.code === 200) {
            this.shebeiClass = res.data.data.equipmentTypeList
          }
        })
      },
      getSupplierList() { //获取经销商下拉框
        getSupplier().then(res => {
          if (res.data.code === 200) {
            this.supplierList = res.data.data
          }
        })
      },
      getBrandInfoList() { //获取品牌下拉框
        getBrandInfo().then(res => {
          if (res.data.code === 200) {
            this.brandList = res.data.data
          }
        })
      },
      getManufacturerListPageList() { //厂商下拉框
        getManufacturerListPage().then(res => {
          if (res.data.code === 200) {
            this.manufacturerList = res.data.data.list
          }
        })
      },
      handleSelectionChange(val) { //勾选复选框改变
        let arr = val.reduce((prev, current) => {
          prev.push(current.id)
          return prev
        }, [])
        this.multipleSelection = arr;
        this.multipleSelectionCode = val
      },
      _closeDrawerHandle() {
        this.drawerView = false
      },
      handleDetails(row) { //查看详情
        this.$router.push({
          path: '/equipmentReport/detail',
          query: {
            id: row.id
          }
        })
      },
      handleSearch() { //查询
        this.currentPage = 1
        this.pageSize = 10
        this._getData()
      },
      _getData() {
        if (this.formDate.gzDate) { //购置日期
          this.formInline.buyStartDate = this.formDate.gzDate[0]
          this.formInline.buyEndDate = this.formDate.gzDate[1]
        }
        if (this.formDate.wxDate) { //保质到期日
          this.formInline.repairStartDate = this.formDate.wxDate[0]
          this.formInline.repairEndDate = this.formDate.wxDate[1]
        }

        let params = {
          ...this.formInline,
          size: this.pageSize,
          current: this.currentPage
        }
        this.loading = true
        // console.log('params', params)
        getEquipmentPage(params).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list
            this.total = res.data.data.total
            this.currentPage = res.data.data.current
            this.pageSize = res.data.data.size
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
      },
      handleReset() { //重置
        for (let key in this.formInline) {
          this.formInline[key] = ''
        }
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      }
    }
  }
</script>
<style lang="less" scoped>
  .ewmImg {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 50%;
    }
  }

  .wrapper {
    .wrapper-form {
      background: #fff;
      padding: 10px 15px;
      margin-bottom: 15px;
    }

    .addBtn {
      background: #1D93A8;
      color: #fff;
      height: 36px;
      float: left;
      margin-right: 20px;
      padding: 10px 28px;
      margin-bottom: 15px;
      border-color: #1D93A8;
    }

    .wrapper-table {
      background: #fff;
      box-sizing: border-box;
      padding: 15px;
    }

    .drawer-wrapper {
      /deep/.el-drawer__header {
        span:focus {
          outline: none;
        }
      }
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