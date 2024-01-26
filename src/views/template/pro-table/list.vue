<template>
  <div class="template-list">
    <TablePage
      ref="tablePage"
      :withSelection="true"
      :query="query"
      :queryItems="queryItems"
      :transformQuery="transformQuery"
      :operation="{
        name: '模板',
        selectedTotal: selectedIds.length,
      }"
      :columns="columns"
      :operations="operations"
      :loadDataApi="getTemplateList"
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
import AddDialog from "./add.vue";
import ImportDialog from "./import.vue";
import { useI18n } from "vue-i18n";
import { getTemplateList, deleteTemplate } from "@/api/template";
import useCtx from "@/hooks/useCtx";
import tablePage from "@/hooks/tablePage";
const { t } = useI18n();
// hooks
const { _this, proxy } = useCtx();
const { query, queryItems, searchQuery, resetQuery } = tablePage();
// query
queryItems.value = {
  name: { label: "名称", value: "", type: "input" },
  type: { label: "类型", value: "", type: "select", multiple: true, options: [] },
  status: { label: "状态", value: "", type: "select", options: [{}] },
  date: {label: '日期', value: '', type: 'datePicker'},
  dateRange: {label: '日期范围', value: '', type: 'dateRange'},
  timeRange: {label: '时间范围', value: '', type: 'datetimeRange'},
};
const getOptions = () => {
  queryItems.value.type.options = [
    { value: 1, label: "类型1" },
    { value: 2, label: "类型2" },
    { value: 3, label: "类型3" }
  ]
  queryItems.value.status.options = [
    { value: 1, label: "未发布" },
    { value: 2, label: "已发布" },
    { value: 3, label: "审核中" },
    { value: 4, label: "审核不通过" },
  ]
}
getOptions()
const transformQuery = ({timeRange = [], dateRange =[], ...rest }) => {
  const [startTime, endTime] = timeRange
  const [startDate, endDate] = dateRange
  const query = {
    ...rest,
    startTime,
    endTime,
    startDate,
    endDate
  }
  return query
}

// table
const columns = ref([
  // 设置宽度的时候，需要至少保留一个width不是固定的，可用minWidth代替，否则可能出现大屏表格宽度未到100%的情况
  { prop: "name", label: "名称", width: 150 },
  { prop: "typeName", label: "类型", width: 150 },
  {
    prop: "status",
    label: "状态",
    width: 150,
    custom: "status",
    // 根据状态实际取值来定义
    customRender: [
      { value: 1, type: "success", name: "已发布" },
      { value: 2, type: "info", name: "未发布" },
      { value: 3, type: "warning", name: "上线审核中" },
      { value: 4, type: "danger", name: "上线未通过" },
      { value: 5, type: "danger", name: "下线未通过" },
      { value: 6, type: "primary", name: "下线审核中" },
    ],
  },
  { prop: "cityStr", label: "城市", width: 180 },
  { prop: "date", label: "日期", width: 150 },
  { prop: "age", label: "年龄", width: 100 },
  { prop: "school", label: "学校", width: 100 },
  { prop: "hobbyStr", label: "爱好", width: 200 },
  { prop: "desc", label: "描述", minWidth: 200 },
  { prop: "operation", label: "操作", width: 180, fixed: "right" },
]);
const transformListData = (data: any) => {
  return data.map((x: any) => {
    x.typeName = `类型${x.type}`;
    x.cityStr = Array.isArray(x.city) ? x.city.join('、') : x.city
    x.hobbyStr = Array.isArray(x.hobby) ? x.hobby.join('、') : x.hobby
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
      name: "proTableDetail",
      query: {
        id: record.id,
      },
    });
  },
  delete: (record: any) => {
    _this.$deleteConfirm({
      title: t('tip.deleteConfirmTitle', {t: '模板', n: record.name})
    }).then(() => {
      deleteTemplate(record.id).then(() => {
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

<style lang="scss" scoped>
</style>
