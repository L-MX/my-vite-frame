<!-- 
  管理端列表页公共组件：所有列表交互引入该组件，方便后期统一维护 
  包括：筛选栏、操作栏、列表栏、分页栏
-->
<template>
  <div class="table-page-wrapper" ref="table-page-wrapper">
    <!-- 查询栏 -->
    <div class="query-wrapper" ref="custom-query" v-if="widthQuery">
      <Query 
        :queryItems="queryItems" 
        @search="searchQuery"
        @reset="resetQuery"
        @toggle="toggleQuery"/>
    </div>
    <!-- 操作栏 -->
    <div class="operation-wrapper" ref="custom-operation" v-if="withOperate">
      <Operation v-bind="operation" :totalRows="page.total">
        <template #buttonGroup>
          <slot name="buttonGroup"></slot>
        </template>
      </Operation>
    </div>
    <!-- 表格 -->
    <div class="table-wrapper" style="padding-top: 0">
      <my-table
        v-bind="table"
        :page="page"
        @operation="handleOperation"
        @selection-change="handleSelectionChange"/>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrapper" ref="custom-pagination" v-if="withPagination" v-show="page.total > 10">
      <Pagination
        v-bind="page"
        @current-change="currentChange"
        @size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted, nextTick, watch } from "vue";
import assign from 'lodash/assign'
import useCtx from "@/hooks/useCtx"
const { proxy } = useCtx();
const props = defineProps({
  // 查询操作相关
  widthQuery: { type: Boolean, default: true },
  query: { default () { return { } } },
  queryItems: { type: Object, default () {return {} } },
  withOperate: { type: Boolean, default: true },
  operation: { type: Object, default: {} },
  // 分页相关
  withPagination: { type: Boolean, default: true },
  defaultPageSizes: { type: Array, default () { return [10, 20, 30, 40, 50] } },
  // 列表相关
  tableData: {type: Array, default () {return [] } },
  columns: {type: Array, default () {return [] } },
  operations: {type: Array, default () {return [] } },
  showOverflowTooltip: { type: Boolean, default: true },
  withSelection: { type: Boolean, default: false },
  withOrder: { type: Boolean, default: true},
  // 列表查询接口
  loadDataApi: { type: Function, default: (e: any) => e },
  // 处理请求参数
  transformQuery: { type: Function, default: (e: any) => e },
  // 加载完数据之后，对数据的转换逻辑
  transformListData: { type: Function, default: (e: any) => e},
})
const emit = defineEmits(['operation', 'selection-change', 'search', 'reset'])

watch(
  () => props.query,
  () => {
    page.pageNum = 1
    loadData()
  }
)

// 操作
const handleOperation = (data: any) => {
  emit('operation', data)
}

// 多选
const handleSelectionChange = (arr: any) => {
  emit('selection-change', arr)
}

// 查询
const searchQuery = (query: any) => {
  emit('search', query)
}
const resetQuery = (query: any) => {
  emit('reset', query)
}
const toggleQuery = () => {
  nextTick(() => {
    mediaHeight()
  })
}

// 分页
const page = reactive({
  pageNum: 1,
  pageSize: props.defaultPageSizes[0] as number,
  pageSizes: props.defaultPageSizes as Array<number>,
  total: 30,
});
const currentChange = (val: number) => {
  page.pageNum = val;
  loadData()
};
const sizeChange = (val: number) => {
  page.pageSize = val;
  loadData()
};
// 表格
const table = reactive({
  columns: props.columns,
  operations: props.operations,
  tableData: props.tableData,
  showOverflowTooltip: props.showOverflowTooltip,
  withSelection: props.withSelection,
  withOrder: props.withOrder,
  tableHeight: 0
});

// 因为mock的接口查不到总数量  因此通过此方法数据总条数，来实现分页
props.loadDataApi().then((res: any) => {
  page.total = res && res.length
  // 分页数据加载完成后再加载高度
  nextTick(() => {
    mediaHeight()
  })
}).catch(() => {
  nextTick(() => {
    mediaHeight()
  })
})

// 根据分页和query加载列表数据
const loadData = () => {
  const data = {
    _page: page.pageNum,
    _limit: page.pageSize
  }
  const pageData = props.withPagination ? data : {}
  const params = props.transformQuery(assign({}, pageData, props.query))
  return props.loadDataApi(params).then((res: any) => {
    table.tableData = props.transformListData(res)
  })
}
loadData()


// 计算表格高度
const mediaHeight = () => {
  const contextHeight = proxy.$refs["table-page-wrapper"]?.offsetHeight;
  const queryHeight = proxy.$refs["custom-query"]?.offsetHeight;
  const operationHeight = proxy.$refs["custom-operation"]?.offsetHeight;
  const paginationHeight = proxy.$refs["custom-pagination"]?.offsetHeight;
  table.tableHeight = contextHeight - (queryHeight + operationHeight + paginationHeight + 18);
};

/* 生命周期 */
onMounted(() => {
  window.addEventListener("resize", mediaHeight);
}),
onUnmounted(() => {
  window.addEventListener("resize", mediaHeight);
});
defineExpose({ loadData });
</script>

<style lang="scss" scoped>
.table-page-wrapper {
  height: 100%;
  >div {
    @include area-padding;
  }
  .query-wrapper {
    padding-bottom: 0;
    border-bottom: 1px solid $border-color-split;
  }
  .pagination-wrapper {
    border-top: 1px solid $border-color-split;
    @include flexCenter()
  }
}
</style>
