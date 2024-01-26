<template>
  <div class="flow-list">
    <TablePage
      ref="tablePage"
      :withSelection="true"
      :query="query"
      :queryItems="queryItems"
      :operation="{
        name: '流程',
        selectedTotal: selectedIds.length,
      }"
      :columns="columns"
      :operations="operations"
      :loadDataApi="getFlowList"
      :transformListData="transformListData"
      @search="searchQuery"
      @reset="resetQuery"
      @operation="handleOperation"
      @selection-change="handleSelectionChange"
    >
      <template #buttonGroup>
        <my-button type="add" @click="events.add">
          {{ $t('btn.addNew') }}
        </my-button>
        <my-button type="import" @click="events.import">
          {{ $t('btn.import') }}
        </my-button>
        <TooltipButton
          type="export"
          :handle="$t('btn.export')"
          :clickable="selectedIds.length > 0"
          @click="events.batchExport"
          >
          {{ $t('btn.batchExport') }}
        </TooltipButton>
        <TooltipButton
          type="delete"
          plain
          :handle="$t('btn.delete')"
          :clickable="selectedIds.length > 0"
          @click="events.batchDelete"
          > 
          {{ $t('btn.batchDelete') }}
        </TooltipButton>
      </template>
    </TablePage>
    <AddDialog ref="addRef" @reload="loadList" />
    <ImportDialog ref="importRef" @reload="loadList"/>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import AddDialog from "./FlowAdd.vue";
import ImportDialog from "./import.vue";
import { useI18n } from "vue-i18n";
import { getFlowList, deleteFlow } from "@/api/flow";
import useCtx from "@/hooks/useCtx";
import tablePage from "@/hooks/tablePage";
const { t } = useI18n();
// hooks
const { _this, proxy } = useCtx();
const { query, queryItems, searchQuery, resetQuery } = tablePage();

// query
queryItems.value = {
  name: { label: "流程名称", value: "", type: "input" },
  type: { label: "流程类型", value: "", type: "select", multiple: true, options: [] }
};
const getOptions = () => {
  queryItems.value.type.options = [
    { value: "客服", label: "客服" },
    { value: "营销", label: "营销" },
    { value: "导购", label: "导购" },
    { value: "办公助手", label: "办公助手" },
    { value: "其他", label: "其他" },
  ]
}
getOptions()

// table
const columns = ref([
  { prop: "name", label: "流程名称", width: 200 },
  { prop: "typeStr", label: "流程类型", width: 200 },
  { prop: "intentStr", label: "关联意图", width: 200 },
  { prop: "desc", label: "流程描述", minWidth: 200 },
  { prop: "operation", label: "操作", width: 180, fixed: "right" },
]);
const transformListData = (data: any) => {
  return data.map((x: any) => {
    x.typeStr = Array.isArray(x.type) ? x.type.join('、') : x.type
    x.intentStr = Array.isArray(x.intent) ? x.intent.join('、') : x.intent
    return x;
  });
};
const loadList = () => {
  proxy.$refs.tablePage.loadData();
};

// 操作
const operations = [
  { type: "detail", label: t("btn.see") },
  { type: "edit", label: t("btn.edit") },
  { type: "delete", label: t("btn.delete"), btnType: "danger" },
];
const handleOperation = (data: any) => {
  const { type, record } = data;
  if (type === "detail") {
    events.detail(record);
  } else if (type === "edit") {
    events.edit(record);
  } else if (type === "delete") {
    events.delete(record);
  }
};
// events
const events = reactive({
  add: () => {
    proxy.$refs.addRef?.openDialog("add");
  },
  edit: (record: any) => {
    proxy.$refs.addRef?.openDialog("edit", record);
  },
  detail: (record: any) => {
    _this.$router.push({
      name: "FlowDetail",
      query: {
        id: record.id,
      },
    });
  },
  delete: (record: any) => {
    _this.$deleteConfirm({
      title: t('tip.deleteConfirmTitle', {t: '流程', n: record.name})
    }).then(() => {
      deleteFlow(record.id).then(() => {
        _this.$message.success("删除成功！");
        loadList();
      });
    })
  },
  batchDelete: () => {
    _this.$deleteConfirm({
      title: t('tip.deleteBatchConfirmTitle', {count: selectedIds.value.length, name: '模板'})
    }).then(() => {  
      _this.$message.success("选中的数据为：" + selectedIds.value);
    })
  },
  batchExport: () => {
    _this.$message.success("选中的数据为：" + selectedIds.value);
  },
  import: () => {
    proxy.$refs.importRef?.openDialog()
  }
})

// 多选
const selectedIds = ref<any>([])
const handleSelectionChange = (arr: any) => {
  selectedIds.value = arr.map((v: any) => v.id)
};
</script>

<style scoped lang="scss"></style>
