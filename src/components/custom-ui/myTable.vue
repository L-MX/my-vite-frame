<template>
  <el-table
    :data="tableData"
    :border="border"
    style="width: 100%"
    :height="tableHeight"
    :show-overflow-tooltip="showOverflowTooltip"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" v-if="withSelection" />
    <el-table-column
      type="index"
      width="55"
      label="序号"
      fixed="left"
      v-if="withOrder"
    >
      <template #default="{ $index }">
        {{ (page.pageNum - 1) * page.pageSize + $index + 1 }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="(item, index) of columns"
      :key="index"
      :fixed="item.fixed"
      :prop="item.prop"
      :label="item.label"
      :min-width="item.minWidth"
      :width="item.width"
      :align="item.align"
    >
      <!-- 默认项 -->
      <template #default="scope" v-if="!item.custom">
        {{ getLabelTxt(scope.row[item.prop]) }}
      </template>
      <!-- 状态项 -->
      <template #default="scope" v-if="item.custom === 'status'">
        <template v-for="x of item.customRender" :key="key">
          <status-dot
            :type="x.type"
            :statusName="x.name"
            :reason="scope.row.statusReason"
            v-if="scope.row[item.prop] === x.value"
          />
        </template>
      </template>
      <!-- 操作项 -->
      <template #default="scope" v-if="item.prop === 'operation'">
        <template v-for="(operation, i) of operations">
          <!-- 禁用的按钮需要给出禁用提示 -->
          <el-tooltip
            placement="top"
            effect="dark"
            v-if="isDisabled(record, operation) && operation.disabledTips"
          >
            <template #content>{{ operation.disabledTips }} </template>
            <my-button
              link
              :type="operation.btnType || 'primary'"
              :key="'operation' + i"
              v-if="isExit(record, operation)"
              :disabled="isDisabled(record, operation)"
              @click="handleOperation(scope.row, operation)"
            >
              {{ operation.label }}
            </my-button>
          </el-tooltip>
          <my-button
            v-else
            link
            :type="operation.btnType || 'primary'"
            :key="'operation' + i"
            v-if="isExit(record, operation)"
            :disabled="isDisabled(record, operation)"
            @click="handleOperation(scope.row, operation)"
          >
            {{ operation.label }}
          </my-button>
        </template>
      </template>
    </el-table-column>
    <template #empty>
      <Empty :size="120" />
    </template>
  </el-table>
</template>

<script setup lang="ts">
import assign from "lodash/assign";
defineProps({
  border: { type: Boolean, default: true },
  columns: { type: Array<any>, default: () => [] },
  tableData: { type: Array, default: () => [] },
  operations: {
    type: Array,
    default() {
      return [];
    },
  },
  tableHeight: { type: Number, default: 380 },
  showOverflowTooltip: { type: Boolean, default: true },
  withSelection: { type: Boolean, default: false },
  withOrder: { type: Boolean, default: true },
  page: { type: Object, default: {} },
});
const emit = defineEmits(["operation", "selection-change"]);
const getLabelTxt = (label: any) => {
  if (typeof label === "string") {
    return label || "--";
  } else {
    return label;
  }
};
const handleOperation = (record: any, operation: any) => {
  emit(
    "operation",
    assign(
      {},
      { record },
      {
        type: operation.type,
      }
    )
  );
};
const handleSelectionChange = (arr: any) => {
  emit("selection-change", arr);
};

const isDisabled = (record: any, operation: any) => {
  return typeof operation.disabled === "function"
    ? !!operation.disabled(record)
    : !!operation.disabled;
};
const isExit = (record: any, operation: any) => {
  return typeof operation.exist === "function"
    ? !!operation.exist(record)
    : true;
};
</script>

<style lang="scss" scoped></style>
