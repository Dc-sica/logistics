/* eslint-disable vue/require-prop-types */
<template>
  <div>
    <el-table
      ref="elTable"
      v-loading="loading"
      :data="data"
      border
      stripe
      :row-key="rowKey"
      style="width: 100%"
      header-row-class-name="ck-table-header"
      row-class-name="ck-table-row"
      size="small"
      :tree-props="{ children: children, hasChildren: hasChildren }"
      :height="height"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="index" width="55" type="index" />
      <el-table-column
        v-if="selection"
        width="55"
        type="selection"
      />
      <template v-for="(item, indexNum) in columns">
        <template v-if="item.type === 'expand'">
          <el-table-column :key="indexNum" type="expand">
            <template slot-scope="props">
              <slot :row="props" />
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            v-if="!item.render"
            :key="indexNum"
            show-overflow-tooltip
            :width="item.width"
            :prop="item.dataIndex"
            :label="item.title"
            :type="item.type"
          />
          <el-table-column
            v-if="item.render"
            :key="indexNum"
            width="200"
            :prop="item.dataIndex"
            :label="item.title"
            :type="item.type"
          >
            <template slot-scope="scope">
              <template v-if="item.render.length <= 3">
                <template v-for="(item3, index3) in item.render">
                  <TextButton
                    :key="index + '_' + index3"
                    :type="item3.type"
                    @click.native="btnClick(item3.handlerClick, scope.row)"
                  >{{ item3.label }}</TextButton>
                </template>
              </template>
              <template v-else>
                <el-dropdown
                  @command="
                    (fnIndex) => btnClickMore(item, item.render[fnIndex])
                  "
                >
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <template v-for="(item3, index3) in item.render">
                      <el-dropdown-item
                        :key="index3"
                        :command="index3"
                      >{{ item3.label }}
                      </el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <div style="overflow: hidden">
      <div style="float: right; margin-top: 20px">
        <el-pagination
          ref="pagination"
          background
          :total="pagination.total"
          :current-page="pagination.current"
          :page-size="pagination.pageSize"
          layout="prev, pager, next, sizes"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CkTable',
  // eslint-disable-next-line vue/require-prop-types
  props: ['columns', 'data', 'height', 'type', 'index', 'selection', 'pagination', 'children', 'hasChildren', 'loading', 'rowKey'],
  data() {
    return {
      lisenTimer: null,
      pageData: {
        current: 1,
        pageSize: 20
      }
    }
  },
  methods: {
    currentChange(currentPage) {
      this.pageData.current = currentPage
      this.$emit('paginationChange', this.pageData)
    },
    sizeChange(size) {
      this.pageData.pageSize = size
      this.pageData.current = 1
      this.$emit('paginationChange', this.pageData)
    },
    btnClick(handler, item) {
      handler && handler(item)
    },
    btnClickMore(row, fn) {
      fn.handlerClick && fn.handlerClick(row)
    },
    handleSelectionChange(row) {
      this.$emit('rowSelection', row)
    }
  }
}
</script>
<style lang="less">
.el-table--mini,
.el-table--small,
.el-table__expand-icon {
  font-size: 14px !important;
}
.ck-table-header {
  th {
    background: #f5f7fa !important;
    height: 1.2rem;
  }
}
.ck-table-row{
  td{
    height: 1.2rem;
  }
}
</style>
