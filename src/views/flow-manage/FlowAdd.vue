<template>
  <my-dialog
    custom-class="flow-add"
    :value="dialogVisible"
    title="新增流程"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <template #body> 
      <my-form
        ref="formRef"
        :rules="rules"
        :ruleForm="ruleForm"
        :formType="formType"
        :formItems="formItems"
        @submit="submit"
      >
      </my-form>
    </template>
  </my-dialog>
</template>

<script setup lang="ts">
import assign from "lodash/assign";
import pick from "lodash/pick";
import keys from "lodash/keys";
import { ref, reactive } from "vue";
import type { FormRules } from "element-plus";
import DialogForm from "@/hooks/dialogForm";
import { addFlow, updateFlow } from "@/api/flow";
import useCtx from "@/hooks/useCtx";
const { _this } = useCtx();
// hooks
const { formType, formRef, dialogVisible, handleConfirm, handleClose } =
  DialogForm();
// 所有的下拉列表
const getOptions = (): any => {
  return new Promise((resolve) => {
    const promise1 = new Promise((resolve) => {
      const options = [
        { value: "客服", label: "客服" },
        { value: "营销", label: "营销" },
        { value: "导购", label: "导购" },
        { value: "办公助手", label: "办公助手" },
        { value: "其他", label: "其他" },
      ];
      resolve(options);
    });
    const promise2 = new Promise((resolve) => {
      const options = [
        { value: "百度", label: "百度" },
        { value: "查询动车票", label: "查询动车票" },
        { value: "查询天气", label: "查询天气" },
        { value: "查询余额", label: "查询余额" },
        { value: "办理信用卡业务", label: "办理信用卡业务" },
      ];
      resolve(options);
    });
    Promise.all([promise1, promise2]).then((result) => {
      const [typeOptions, intentOptions] = result;
      formItems.value.type.options = typeOptions;
      formItems.value.intent.options = intentOptions;
      resolve(result);
    });
  });
};
// change相关操作
const typeChange = () => {
  // ruleForm.value = assign({}, ruleForm.value, {status: ''})
};
const intentChange = () => {
  //
};
// 表单
const defaultForm = {
  id: undefined,
  name: "",
  type: "",
  intent: [],
  desc: "",
};
let ruleForm = ref<any>(assign({}, defaultForm));
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入流程名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择流程类型", trigger: "change" }],
  intent: [{ required: true, message: "请选择关联意图", trigger: "change" }],
});
// 表单项
const formItems = ref<any>({
  name: { label: "流程名称", type: "input", maxlength: 30 },
  type: {
    label: "流程类型",
    type: "select",
    clearable: false,
    options: [],
    change: typeChange,
  },
  intent: {
    label: "关联意图",
    type: "select",
    clearable: false,
    multiple: true,
    options: [],
    change: intentChange,
  },
  desc: { label: "流程描述", type: "textarea" },
});
const openDialog = async (type: string, row: any) => {
  // 1.打开弹窗
  formType.value = type;
  dialogVisible.value = true;
  // 2.业务代码
  // 加载相关的下拉列表数据
  await getOptions();
  if (type === "edit") {
    ruleForm.value = pick(row, keys(defaultForm));
  } else {
    ruleForm.value = assign({}, defaultForm);
  }
  formRef.value.resetForm();
};
const emit = defineEmits(["reload"]);
const submit = (form: any) => {
  // 接口相关业务代码
  const _func = formType.value === "add" ? addFlow : updateFlow;
  const msg = formType.value === "add" ? "新增" : "修改";
  _func(form).then(() => {
    _this.$message.success(msg + "成功！");
    handleClose();
    emit("reload");
  });
};

defineExpose({ openDialog });
</script>

<style lang="scss" scoped></style>
