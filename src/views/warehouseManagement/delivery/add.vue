<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleCancel">取消</el-button>
      <!-- <el-button class="btn-yellow" @click="handleSave">保存</el-button> -->
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </Container>
    <Container class="container-pannel" height="fill" scrollY="true">
      <div class="card-pannel">
        <div class="title">出库信息</div>
        <div class="card-content">
          <el-form ref="formInfo" :model="formInfo" :rules="rules" :inline="false" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="出库编号：">
                  <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请部门：">
                  <el-select placeholder="请选择" v-model="formInfo.status" clearable style="width:100%;">
                    <el-option value="0" label="禁用"></el-option>
                    <el-option value="1" label="启用"> </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请人：">
                  <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出库仓库：">
                  <el-input v-model="formInfo.name" clearable placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="金额：" prop="amount">
                  <el-input v-model="formInfo.name" clearable placeholder="请输入">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注：">
                  <el-input type="textarea" rows="4" v-model="formInfo.name" clearable placeholder="请输入描述，不超过300字" maxlength="300"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="card-pannel">
        <div class="title">物资明细</div>
        <div class="card-content">
          <div class="choseWz" @click="handleChooseWz"><span class="el-icon-plus"></span>选择物资</div>
          <el-table :data="tableData" border show-summary :header-cell-style="{background:'#E8EAED'}" :summary-method="getSummaries" stripe size="mini" highlight-current-row isFillHeight height="300px">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="名称" prop="materialName"></el-table-column>
            <el-table-column label="物料号" prop="materialCode" width="180"></el-table-column>
            <el-table-column label="包装" prop="packetName"></el-table-column>
            <el-table-column label="规格" prop="materialSpecs"></el-table-column>
            <el-table-column label="库存" prop="materialSpecs"></el-table-column>
            <el-table-column label="领用数量" prop="orderQuantity">
              <template slot-scope="scope">
                <el-form :model="scope.row" :rules='rules'>
                  <el-form-item prop="quantity" class="form-time">
                    <el-input v-model.trim="scope.row.quantity" type="number" :min="1" @input="_quanlityOrPriceChange(scope.row,scope.$index)"></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="单价(元)" prop="unitPrice"></el-table-column>
            <el-table-column label="金额(元)" prop="amount"></el-table-column>
            <el-table-column label="供应商" prop="supplierName"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scoped">
                <el-button class="btn-text-red" type="text" @click="handleDelete(scoped.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <Dialog title="选择物资" :visible="addVisible" @cancel="_itemHandleClose" @save="handleDlgSave" :footerBtns="[{text: '确定',type: 'primary',trigger: 'save',},
        {
          text: '取消',
          trigger: 'cancel',
        }]">
        <el-form style="margin-bottom:15px;" :inline="true" :model="formInline" ref="formInline" label-width="90px">
          <el-form-item label="名称：">
            <el-input placeholder="请输入" v-model="formInline.keyWord" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类：">
            <el-select placeholder="请选择" clearable v-model="formInline.supplier">
              <el-option v-for="(item,index) in classArr" :key="index" :value="item.supplierId" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="nowrap">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" border :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="30vh">
          <el-table-column label="名称" show-overflow-tooltip prop="name"></el-table-column>
          <el-table-column label="物料号" show-overflow-tooltip prop="code"></el-table-column>
          <el-table-column label="包装" prop="contacts"></el-table-column>
          <el-table-column label="规格" show-overflow-tooltip prop="phone"></el-table-column>
          <el-table-column label="分类" prop="bank"></el-table-column>
          <el-table-column label="库存" show-overflow-tooltip prop="bankAccount"></el-table-column>
        </el-table>
      </Dialog>

    </Container>
  </ContainerGroup>
</template>
<script>
  export default {
    name: 'add',
    data() {
      // var validatePass = (rule, value, callback) => {
      //   if (value < 0) {
      //     callback(new Error('请输入大于0，且最多两位小数的数字'))
      //   } else {
      //     callback()
      //   }
      // }
      // 验证金额为数字
      let checkNumber = (rule, value, callback) => {
        if (value) {
          if (!isNaN(value)) {
            callback();
          } else {
            callback(new Error("请输入数字"));
          }
        } else {
          callback();
        }
      }
      return {
        classArr: [],
        fileList: [],
        formInfo: {
          name: ''
        },
        supplierList: [],
        rules: {
          amount: [{
            required: false,
            message: '请输入数字',
            validator: checkNumber,
            trigger: 'blur'
          }],
        },
        tableData: [],
        addVisible: false,
        formInline: {}
      }
    },
    created() {

    },
    methods: {
      handleReset() { //重置
        for (let key in this.formInline) {
          this.formInline[key] = ''
        }
      },
      handleSearch() { //查询

      },
      handleDlgSave() { //提交

      },
      _itemHandleClose() {
        this.addVisible = false
      },
      handleChooseWz() { //选择物资
        this.addVisible = true
      },
      _quanlityOrPriceChange(row, index) {
        // console.log('row', row)
        let tempArr = JSON.parse(JSON.stringify(this.tableData))
        tempArr[index]['amount'] = Number(row.quantity) * Number(row.unitPrice)
        this.tableData = JSON.parse(JSON.stringify(tempArr))
      },
      handleDelete(row) { //删除

      },
      getInvoiceInfo(id) { //根据订单号获取发票信息
        // detailByPurchaseOrderNumber(id).then(res => {
        //   console.log('res', res)
        //   if (res.data.code === 200) {
        //     let arr = res.data.data || {}
        //     this.ticketsList = arr.invoiceNumber.split(";")
        //   }
        // })
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      uploadFile(params) {
        let fd = new FormData()
        fd.append('file', params.file)
        // upload(fd)
        //   .then(res => {
        //     if (res.data.code === 200) {
        //       this.fileList = this.fileList.concat(res.data.data)
        //       this.$message.success(res.data.message)
        //     } else {
        //       this.$message.error(res.data.message)
        //     }
        //   })
        //   .catch(err => {
        //     console.log('error', err)
        //     alert('上传失败，请重新上传')
        //   })
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      handleCancel() { //取消

      },
      handleSave() { //保存

      },
      handleSubmit() { //提交

      },
      // 合计总价
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index === 10) {
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[index] += ' 元';
            } else {
              sums[index] = 'N/A';
            }
          }
        });

        return sums;
      },

    }
  }
</script>
<style lang="less" scoped>
  .choseWz {
    height: 35px;
    border: 1px dashed #bfbfbf;
    line-height: 35px;
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .container-pannel {
    padding: 0px 0px !important;
    margin-top: 0px !important;
    background: #f0f2f5 !important;
    overflow-y: auto !important;
    box-shadow: none !important
  }

  .card-pannel {
    background: #fff;
    border-radius: 3px;
    box-shadow: 0px 1px 6px #ddd;
    box-sizing: border-box;
    margin-top: 10px;
    padding-bottom: 15px;

    .title {
      height: 35px;
      line-height: 35px;
      padding-left: 10px;
      border-bottom: 1px solid #e7ecf8;
      font-weight: bold;
    }

    .card-content {
      padding: 10px;
    }
  }

  .el-icon-circle-plus-outline,
  .el-icon-remove-outline {
    position: absolute;
    // right: 20px;
    right: -20px;
    top: 14px;
  }

  .btn-text-red {
    color: #FF5656 !important;
  }
</style>