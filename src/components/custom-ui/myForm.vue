<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    :label-width="labelWidth"
    :size="formSize"
    status-icon
    style="padding-right: 20px"
  >
    <el-form-item v-for="elem of formArr" :label="elem.label" :prop="elem.key">
      <!-- 文本框 -->
      <el-input
        v-if="elem.type === 'input'"
        v-model="form[elem.key]"
        :placeholder="elem.placeholder || `请输入`"
        :clearable="elem.clearable === false"
        :maxlength="elem.maxlength || name_maxlength"
        :disabled="elem.disabled"
        :readonly="elem.readonly"
      />
      <!-- 文本域 -->
      <el-input
        v-if="elem.type === 'textarea'"
        type="textarea"
        v-model="form[elem.key]"
        :placeholder="elem.placeholder || `请输入`"
        :clearable="elem.clearable === false"
        :maxlength="elem.maxlength || desc_maxlength"
        :disabled="elem.disabled"
        :readonly="elem.readonly"
        :show-word-limit="elem.showWordLmit"
      />
      <!-- 数字输入框 -->
      <el-input-number
        v-if="elem.type === 'inputNumber'"
        v-model="form[elem.key]"
        :min="elem.min"
        :max="elem.max"
        :step="elem.step"
        :disabled="elem.disabled"
        :readonly="elem.readonly"
        />
      <!-- 单选按钮 -->
      <el-radio-group
        v-if="elem.type === 'radio'"
        v-model="form[elem.key]"
        :disabled="elem.disabled"
        @change="elem.change"
      >
        <el-radio 
          v-for="item of elem.options"
          :key="item.value"
          :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <!-- 多选按钮 -->
      <el-checkbox-group 
        v-if="elem.type === 'checkbox'"
        v-model="form[elem.key]"
        :disabled="elem.disabled"
        @change="elem.change">
        <el-checkbox 
          v-for="item of elem.options"
          :key="item.value"
          :label="item.value">
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
      <!-- 开关 -->
      <el-switch 
        v-if="elem.type === 'switch'"
        v-model="form[elem.key]"
        :active-value="elem.active" 
        :inactive-value="elem.inactive" 
        @change="elem.change">
      </el-switch>
      <!-- 下拉选择框 -->
      <el-select
        v-if="elem.type === 'select'"
        v-model="form[elem.key]"
        :placeholder="elem.placeholder || `请选择`"
        :clearable="elem.clearable === false"
        :multiple="elem.multiple"
        collapse-tags
        :max-collapse-tags="elem.maxTag || 0"
        :disabled="elem.disabled"
        @change="elem.change"
        style="width: 100%"
      >
        <el-option
          v-for="item of elem.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <!-- 日期选择框 -->
      <el-date-picker
        v-else-if="elem.type === 'datePicker'"
        v-model="form[elem.key]"
        :format="elem.format || dateFormat"
        :value-format="elem.format || dateFormat"
        type="date"
        :placeholder="$t('time.chooseDate')"
        :picker-options="elem.pickerOptions"
        :clearable="elem.clearable === false"
        :disabled="elem.disabled"
        @change="elem.change"
        style="width: 100%"
      >
      </el-date-picker>
      <!-- 日期选择范围 -->
      <el-date-picker
        v-else-if="elem.type === 'dateRange'"
        v-model="form[elem.key]"
        type="daterange"
        :range-separator="$t('time.to')"
        :start-placeholder="$t('time.startDate')"
        :end-placeholder="$t('time.endDate')"
        :pickerOptions="elem.pickerOptions"
        :clearable="elem.clearable === false"
        :disabled="elem.disabled"
        :format="elem.format || dateFormat"
        :value-format="elem.format || dateFormat"
        @change="elem.change"
      >
      </el-date-picker>
      <!-- 日期时间选择范围 -->
      <el-date-picker
        v-else-if="elem.type === 'datetimeRange'"
        v-model="form[elem.key]"
        type="datetimerange"
        :range-separator="$t('time.to')"
        :start-placeholder="$t('time.startTime')"
        :end-placeholder="$t('time.endTime')"
        :pickerOptions="elem.pickerOptions"
        :clearable="elem.clearable === false"
        :disabled="elem.disabled"
        :format="elem.format || datetimeFormat"
        :value-format="elem.format || datetimeFormat"
        @change="elem.change"
      >
      </el-date-picker>
      <!-- 文件上传 -->
      
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import type { FormInstance } from "element-plus";
import { NAME_MAX_LENGTH, DESC_MAX_LENGTH } from "@/utils/constants";
const props = defineProps({
  labelWidth: { type: String, default: "100px" },
  formSize: { type: String, default: "default" },
  formType: { type: String, default: "add" },
  rules: { type: Object },
  ruleForm: { type: Object },
  formItems: { type: Array<any>, default: () => [] },
});
const emit = defineEmits(["submit"]);
const name_maxlength = ref<number>(NAME_MAX_LENGTH);
const desc_maxlength = ref<number>(DESC_MAX_LENGTH);
const dateFormat = ref<string>('YYYY-MM-DD')
const datetimeFormat =  ref<string>('YYYY-MM-DD hh:mm:ss')
const ruleFormRef = ref<FormInstance>();
// 将对象格式的表单项转成数组，方便遍历
const formArr: any = computed(() => {
  let arr = [];
  for (let key in props.formItems) {
    arr.push({
      key,
      ...props.formItems[key],
    });
  }
  return arr;
});
const form = ref<any>({});
watch(
  () => props.ruleForm,
  (nu) => {
    form.value = nu;
  }
);
const submitForm = () => {
  const formEl: FormInstance | undefined = ruleFormRef.value;
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit("submit", { ...form.value });
    }
  });
};
const resetForm = () => {
  const formEl: FormInstance | undefined = ruleFormRef.value;
  if (!formEl) return;
  formEl.resetFields();
};
defineExpose({
  submitForm,
  resetForm,
});
</script>

<style lang="scss" scoped></style>
