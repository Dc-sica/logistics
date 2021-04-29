<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleCancel">返回</el-button>
    </Container>
    <Container class="container-pannel" height="fill" scrollY="true">
      <div class="card-pannel">
        <div class="title">入库信息</div>
        <div class="card-content">
          <el-form ref="formInfo" :model="formInfo" :inline="false" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购订单编号：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请部门：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请人：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="入库仓库：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="金额：">
                  <span>{{formInfo.name}}</span>元
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="card-pannel">
        <div class="title">发票维护</div>
        <div class="card-content">
          <el-form :model="formInfo" ref="formInfo" label-width="100px" style="position:relative;">
            <el-row>
              <el-col :span="6">
                <el-form-item label="供应商：" prop="supplierName">
                  <span>{{formInfo.supplierCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="附件上传：" label-width="100px">
                  <p style="cursor:pointer;" v-for="(item,index) in fileList" :key="index" @click='_downLoad(item)'>
                    <span style="margin-right:10px;">{{item.name}}</span>
                    <span style="color:#217DFA;">立即下载</span>
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="发票号：" prop="purchaseOrderNumber">
                  <!-- <el-form v-if="!isInvoiceDo" :model="dynamicValidateForm" ref="dynamicValidateForm" class="demo-dynamic">
                    <el-form-item v-for="(domain) in dynamicValidateForm.domains" :key="domain.key">
                      <el-input v-model="domain.invoiceNumber" style="position:relative;"></el-input>
                    </el-form-item>
                  </el-form> -->
                  <div>
                    <div v-for="(item,index) in ticketsList" :key="index">{{item}}</div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="card-pannel">
        <div class="title">物资明细</div>
        <div class="card-content">
          <el-table :data="tableData" border :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="300px">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="名称" prop="materialName"></el-table-column>
            <el-table-column label="物料号" prop="materialCode" width="180"></el-table-column>
            <el-table-column label="包装" prop="packetName"></el-table-column>
            <el-table-column label="规格" prop="materialSpecs"></el-table-column>
            <el-table-column label="入库(包装)数量" prop="orderQuantity"></el-table-column>
            <el-table-column label="单价(元)" prop="unitPrice"></el-table-column>
            <el-table-column label="金额(元)" prop="amount"></el-table-column>
            <el-table-column label="供应商" prop="supplierName"></el-table-column>
            <el-table-column label="资金来源" prop="source"></el-table-column>
          </el-table>
        </div>
      </div>
    </Container>
  </ContainerGroup>
</template>
<script>
  export default {
    name: 'detail',
    data() {
      return {
        tableData: [],
        fileList: [],
        formInfo: {},
        ticketsList: [],
      }
    },
    created() {

    },
    methods: {
      _downLoad(obj, index) {
        window.open(obj.url)
      },
      handleCancel() {
        this.$router.push('/warehousing')
      }
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
</style>