<template>
  <ContainerGroup>
    <Container>
      <el-button @click="handleCancel">返回</el-button>
    </Container>
    <Container class="container-pannel" height="fill" scrollY="true">
      <!-- 直接出库 -->
      <div class="card-pannel" v-if="deliveryType==1">
        <div class="title">出库信息</div>
        <div class="card-content">
          <el-form ref="formInfo" :model="formInfo" :inline="false" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="出库编号：">
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
                <el-form-item label="出库仓库：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="过账状态：">
                  <span>{{formInfo.name}}</span>元
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账时间：">
                  <span>{{formInfo.name}}</span>元
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="备注：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!-- 物资领用 -->
      <div class="card-pannel" v-else>
        <div class="title">领用信息</div>
        <div class="card-content">
          <el-form ref="formInfo" :model="formInfo" :inline="false" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="领用单号：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领用状态：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="申请人：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请部门：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系方式：">
                  <span>{{formInfo.name}}</span>元
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="仓库：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="录单时间：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="过账状态：">
                  <span>{{formInfo.name}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
        <div class="title">物资明细</div>
        <div class="card-content">
          <el-table :data="tableData" border :header-cell-style="{background:'#E8EAED'}" stripe size="mini" highlight-current-row isFillHeight height="300px">
            <el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="名称" prop="materialName"></el-table-column>
            <el-table-column label="物料号" prop="materialCode" width="180"></el-table-column>
            <el-table-column label="包装" prop="packetName"></el-table-column>
            <el-table-column label="规格" prop="materialSpecs"></el-table-column>
            <el-table-column label="库存" prop="orderQuantity"></el-table-column>
            <el-table-column label="领用数量" prop="unitPrice"></el-table-column>
            <el-table-column label="单价(元)" prop="amount"></el-table-column>
            <el-table-column label="金额(元)" prop="amount"></el-table-column>
            <el-table-column label="供应商" prop="supplierName"></el-table-column>
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
        formInfo: {},
        deliveryType: 1,
      }
    },
    created() {

    },
    methods: {
      _downLoad(obj, index) {
        window.open(obj.url)
      },
      handleCancel() {
        this.$router.push('/delivery')
      }
    }
  }
</script>
<style lang="less" scoped>
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