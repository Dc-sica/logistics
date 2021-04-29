<template>
  <ContainerGroup>
    <Container>
      <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" label-width="auto">
        <el-form-item label="关键词搜索：">
          <el-input placeholder="设备/设施名称/设备编号/型号" v-model="formInline.keyWord" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备分类：">
          <el-select placeholder="请选择" clearable v-model="formInline.typeId" style="width:100%;">
            <el-option v-for="(item,index) in shebeiClass" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="厂商：">
          <el-select placeholder="请选择" clearable v-model="formInline.manufacturerId" style="width:100%;">
            <el-option v-for="(item,index) in manufacturerList" :key="index" :value="item.manufacturerId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-select placeholder="请选择" clearable v-model="formInline.brandId" style="width:100%;">
            <el-option v-for="(item,index) in brandList" :key="index" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商：" v-if="showAll">
          <el-select placeholder="请选择" clearable v-model="formInline.supplier" style="width:100%;">
            <el-option v-for="(item,index) in supplierList" :key="index" :value="item.supplierId" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购置日期：" v-if="showAll">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formDate.gzDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="保质到期日：" v-if="showAll">
          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="formDate.wxDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="showAll" label="原值：">
          <el-col :span="8">
            <el-form-item prop="minPrice">
              <el-input placeholder="最小原值" v-model="formInline.minPrice" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="text-align:center;margin-left:-10px;">~</el-col>
          <el-col :span="8">
            <el-form-item prop="maxPrice">
              <el-input placeholder="最大原值" v-model="formInline.maxPrice" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="状态：" v-if="showAll">
          <el-select placeholder="请选择" v-model="formInline.status" clearable style="width:100%;">
            <el-option value="1" label="开启"></el-option>
            <el-option value="0" label="关闭"></el-option>
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
        <el-button type="primary" size="mini" @click="handleAdd"><span class="el-icon-plus" style="margin-right:5px;"></span>添加</el-button>
        <el-select size="mini" v-model="excelBtns" @change="selectionHandle()" placeholder="导出数据">
          <el-option v-for="item in excelBtnList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" size="mini" class="addBtn" @click="handlePrintEWM">二维码打印</el-button>
      </OperationContainer>
      <!-- :height="tableHeight+'px'"  -->
      <el-table isFillHeight stripe height="0" size="mini" :header-cell-style="{ background: '#FAFAFA', height: '42px' }" :data="tableData" v-loading="loading" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" fixed="left">
        </el-table-column>
        <el-table-column label="设备/设施名称" prop="name" width="140"></el-table-column>
        <el-table-column label="设备编号" prop="code" width="180"></el-table-column>
        <el-table-column label="型号" prop="model" show-overflow-tooltip></el-table-column>
        <el-table-column label="设备分类" prop="typeName"></el-table-column>
        <el-table-column label="设备位置" prop="location" width="120"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            {{scope.row.status==1?'开启':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="厂商" prop="manufacturerName"></el-table-column>
        <el-table-column label="品牌" prop="brandName" show-overflow-tooltip></el-table-column>
        <el-table-column label="供应商" prop="supplier" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column label="购置日期" prop="buyDate" width="120"></el-table-column>
        <el-table-column label="原值(元)" prop="price"></el-table-column>
        <el-table-column label="使用年限(年)" prop="usefulYears" width="120"></el-table-column>
        <el-table-column label="已使用年限(月)" prop="usedMonths" width="120"></el-table-column>
        <el-table-column label="质保到期日期" prop="repairEndDate" width="120"></el-table-column>
        <el-table-column label="负责科室" prop="deptName"></el-table-column>
        <el-table-column label="责任人" prop="userName"></el-table-column>
        <el-table-column label="二维码" prop="barCode">
          <template v-slot="scope">
            <div class="ewmImg" @click="getQRCodeData(scope.row)">
              <div><img :src="imgSrc" width="100%" height="100%" /></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" fixed="right">
          <template slot-scope="scope">
            <div>
              <el-tooltip class="item-button" effect="dark" content="查看" placement="top">
                <el-button class="iconfont" v-html="'&#xe67e;'" type="text" @click="handleDetails(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item-button" effect="dark" content="编辑" placement="top">
                <el-button type="text" @click="handleEdit(scope.row)">
                  <i class="iconfont" style="font-size:14px;">&#xe699;</i>
                </el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination id="pagin" :total="total" :page="currentPage" :pageSize="pageSize" @pagation="pagationChange" />
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
    name: 'equipmentClass',
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
        topHeight: '0',
        tableHeight: 500,
        showAll: true,
        dialogImageUrl: '',
        dialogVisible: false,
        imgSrc: require('../../../assets/image/ewm.png'),
        manufacturerList: [], //厂商
        brandList: [], //品牌
        supplierList: [], //经销商
        shebeiClass: [], //设备分类
        excelBtnList: [{
            label: "全部导出",
            value: "1",
          },
          {
            label: "批量导出",
            value: "2",
          },
        ],
        excelBtns: '',
        formDate: {},
        formInline: {
          buyStartDate: '', //开始购置日期
          buyEndDate: '', //结束购置日期
          repairStartDate: '', //开始保修日期
          repairEndDate: '' //结束保修日期
        },
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
    computed: {
      word: function() {
        if (this.showAll == false) {
          return "展开";
        } else {
          return "收起";
        }
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.closeSearch()
      })
      // window.onresize = () => {
      //   this.handleControlChange()
      // }
    },
    methods: {
      closeSearch() {
        this.showAll = !this.showAll
        // this.handleControlChange()
        // if (this.showAll == false) {
        //   searchBoxHeght.style.height = 130 + "px"
        // } else {
        //   searchBoxHeght.style.height = "auto"
        // }
      },
      handleControlChange() {
        this.$nextTick(() => {
          var searchBoxHeght = document.getElementById("searchBox")
          var wrapHeight = document.getElementsByClassName('wrapper')[0].clientHeight
          var btnHeight = document.getElementById('nevbox')
          var paginationHeight = document.getElementById('pagin')
          this.topHeight = wrapHeight - searchBoxHeght.clientHeight
          this.tableHeight = this.topHeight - btnHeight.clientHeight - paginationHeight.clientHeight - 50
        })
      },
      selectionHandle() {
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
          idList: this.multipleSelection || []
        }
        if (this.excelBtns === '1') {
          exportEquipment(params).then((res) => {
            if (res.status === 201) {
              let blob = new Blob([res.data], {
                type: res.data.type + "charset=utf-8",
              })
              let downloadLink = document.createElement("a")
              const URL = window.URL || window.webkitURL || window.moxURL
              let downUrl = URL.createObjectURL(blob)
              downloadLink.href = downUrl
              downloadLink.download = "设备档案.xlsx"
              downloadLink.click()
              window.URL.revokeObjectURL(downUrl)
              this.excelBtns = ""
            }
          })
        } else {
          if (this.multipleSelection === undefined || this.multipleSelection.length === 0) {
            this.$message.warning("请选择要导出的数据")
            this.excelBtns = ""
            return false
          } else {
            exportEquipment({
              idList: this.multipleSelection
            }).then((res) => {
              if (res.status === 201) {
                let blob = new Blob([res.data], {
                  type: res.data.type + "charset=utf-8",
                })
                let downloadLink = document.createElement("a")
                const URL = window.URL || window.webkitURL || window.moxURL
                let downUrl = URL.createObjectURL(blob)
                downloadLink.href = downUrl
                downloadLink.download = "设备档案.xlsx"
                downloadLink.click()
                window.URL.revokeObjectURL(downUrl)
                this.excelBtns = ""
              }
            })
          }
        }

      },

      getQRCodeData(row, type) { //获取二维码
        console.log('row', row)
        let param = {
          code: row.code
        }
        getQRCode(param).then(res => {
          if (res.data.code === 200) {
            if (!type) {
              // this.dialogImageUrl = configUrl.BASE_URL + 'work/' + res.data.data
              this.dialogVisible = true
              this.dialogImageUrl = 'http://192.168.31.186:9090/work/' + res.data.data
            } else {
              this.downFile('http://192.168.31.186:9090/work/' + res.data.data, row.name)
            }
            console.log('this.dialogImageUrl', this.dialogImageUrl)
          }
        })
      },
      downFile(imgsrc, name) { //下载图片地址和图片名
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");

        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          if (document.fireEvent) {
            window.open(a.href);
          } else { // 触发a的单击事件
            a.dispatchEvent(event, {
              bubbles: true,
              cancelable: true,
              view: window
            });
          }
        };
        image.src = imgsrc;
      },
      handlePrintEWM() { //二维码打印
        console.log('this.multipleSelectionCode', this.multipleSelectionCode)
        if (this.multipleSelectionCode.length == 0) {
          this.$message.warning('请选择要打印的二维码数据!')
          return false
        }
        this.multipleSelectionCode.forEach(item => {
          this.getQRCodeData(item, 1)
        })

      },

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
      handleAdd() { //添加
        this.$router.push({
          path: '/equipmentRecord/add',
          query: {
            // id: row.id
          }
        })
      },
      handleDetails(row) { //查看详情
        this.$router.push({
          path: '/equipmentRecord/detail',
          query: {
            id: row.id
          }
        })
      },
      handleEdit(row) { //编辑
        this.$router.push({
          path: '/equipmentRecord/edit',
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
        } else {
          this.formInline.buyStartDate = ''
          this.formInline.buyEndDate = ''
        }
        if (this.formDate.wxDate) { //保质到期日
          this.formInline.repairStartDate = this.formDate.wxDate[0]
          this.formInline.repairEndDate = this.formDate.wxDate[1]
        } else {
          this.formInline.repairStartDate = ''
          this.formInline.repairEndDate = ''
        }


        // if (this.formInline.minPrice) {
        //   this.formInline.minPrice = this.formInline.minPrice + ''
        // } else {
        //   this.formInline.minPrice = ''
        // }
        // if (this.formInline.maxPrice) {
        //   this.formInline.maxPrice = this.formInline.maxPrice + ''
        // } else {
        //   this.formInline.maxPrice = ''
        // }
        let params = {
          ...this.formInline,
          size: this.pageSize,
          current: this.currentPage
        }
        this.loading = true
        console.log('params', params)
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
        this.formDate.gzDate = ''
        this.formDate.wxDate = ''
      },
      pagationChange(payload) {
        this.currentPage = payload.page
        this.pageSize = payload.pageSize
        this._getData()
      }
    },
    destroyed() {
      window.onresize = null
    }
  }
</script>
<style lang="less" scoped>
  .nowrap {
    // min-width: 190px;
    float: right;
  }

  .ewmImg {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      width: 40%;
      line-height: 1;
    }
  }

  .addBtn {
    width: 80px;
  }
</style>