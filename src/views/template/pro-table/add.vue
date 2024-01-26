<template>
  <my-dialog
    custom-class="template-add"
    :value="dialogVisible"
    title="新增模板"
    width="600px"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <template #body>
      <my-form
        ref="formRef"
        labelWidth="80px"
        :rules="rules"
        :ruleForm="ruleForm"
        :formType="formType"
        :formItems="formItems"
        @submit="submit">
      </my-form>
    </template>
  </my-dialog>
</template>

<script setup lang="ts">
import assign from 'lodash/assign'
import pick from 'lodash/pick'
import keys from 'lodash/keys'
import { ref, reactive } from "vue";
import type { FormRules } from 'element-plus'
import DialogForm from "@/hooks/dialogForm";
import { addTemplate, updateTemplate } from '@/api/template'
import useCtx from "@/hooks/useCtx";
const { _this } = useCtx();
// hooks
const { formType, formRef, dialogVisible, handleConfirm, handleClose } = DialogForm()
// 所有的下拉列表
const getOptions = (): any => {
  return new Promise(resolve => {
    const promise1 = new Promise(resolve => {
      const options = [
        {value: 1, label: '类型1'},
        {value: 2, label: '类型2'},
        {value: 3, label: '类型3'}
      ]
      resolve(options)
    })
    const promise2 = new Promise(resolve => {
      const options = [
        {value: 1, label: '已发布'},
        {value: 2, label: '未发布'},
        {value: 3, label: '上线审核中'},
        {value: 4, label: '上线未通过'},
        {value: 5, label: '下线未通过'},
        {value: 6, label: '下线审核中'}
      ]
      resolve(options)
    })
    const promise3 = new Promise(resolve => {
      const options = [
        {value: '合肥', label: '合肥'},
        {value: '南京', label: '南京'},
        {value: '上海', label: '上海'},
        {value: '北京', label: '北京'},
        {value: '青岛', label: '青岛'},
        {value: '成都', label: '成都'}
      ]
      resolve(options)
    })
    const promise4 = new Promise(resolve => {
      const options = [
        {value: '北京大学', label: '北京大学'},
        {value: '清华大学', label: '清华大学'},
        {value: '复旦大学', label: '复旦大学'}
      ]
      resolve(options)
    })
    const promise5 = new Promise(resolve => {
      const options = [
        {value: '唱歌', label: '唱歌'},
        {value: '跳舞', label: '跳舞'},
        {value: '羽毛球', label: '羽毛球'},
        {value: '游泳', label: '游泳'},
        {value: '跑步', label: '跑步'}
      ]
      resolve(options)
    })
    Promise.all([promise1, promise2, promise3, promise4, promise5]).then(result => {
      const [typeOptions, statusOptions, cityOptions, schoolOptions, hobbyOptions] = result
      formItems.value.type.options = typeOptions
      formItems.value.status.options = statusOptions
      formItems.value.city.options = cityOptions
      formItems.value.school.options = schoolOptions
      formItems.value.hobby.options = hobbyOptions
      resolve(result)
    })
  })
}
// change相关操作
const typeChange = () => {
  // ruleForm.value = assign({}, ruleForm.value, {status: ''})
}
// 表单
const defaultForm = {
  id: undefined,
  name: '',
  type: '',
  status: '',
  desc: '',
  city: [],
  date: '',
  age: '',
  isEnd: false,
  school: '',
  hobby: []
}
let ruleForm = ref<any>(assign({}, defaultForm))
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})
// 表单项
const formItems = ref<any>({
  name: { label: "名称", type: "input", maxlength: 30},
  type: { label: "类型", type: "select", clearable: false, options: [], change: typeChange},
  status: { label: "状态", type: "select", clearable: false, options: []},
  city: { label: "城市", type: "select", options: [], multiple: true},
  date: {label: "日期", type: 'datePicker'},
  age: {label: "年龄", type: 'inputNumber', min: 1, max: 100, step: 1},
  isEnd: {label: "开关", type: 'switch'},
  school: {label: "学校", type: 'radio'},
  hobby: {label: "爱好", type: 'checkbox', options: []},
  // dateRange: {label: "日期范围", type: 'dateRange'},
  // timeRange: {label: "时间范围", type: 'datetimeRange'},
  desc: { label: "描述", type: "textarea", maxlength: 50, showWordLmit: true},
})
const openDialog = async (type: string, row: any) => {
  // 1.打开弹窗
  formType.value = type
  dialogVisible.value = true
  // 2.业务代码
  // 加载相关的下拉列表数据
  await getOptions()
  if (type === 'edit') {
    ruleForm.value = pick(row, keys(defaultForm))
    // 控制编辑操作需要禁用的项【按需参考】
    const disabledProps = ['status']
    for(let key in formItems.value) {
      if (disabledProps.indexOf(key) > -1) {
        formItems.value[key].disabled = true
      }
    }
  } else {
    ruleForm.value = assign({}, defaultForm)
    for(let key in formItems.value) {
      formItems.value[key].disabled = false
    }
  }
  formRef.value.resetForm()
};
const emit = defineEmits(['reload'])
const submit = (form: any) => {
  // 接口相关业务代码，执行完成后关闭弹窗
  const _func = formType.value === 'add' ? addTemplate : updateTemplate
  const msg = formType.value === 'add' ? '新增': '修改'
  _func(form).then(() => {
    _this.$message.success(msg + '成功！')
    handleClose()
    emit('reload')
  })
}

defineExpose({ openDialog });
</script>

<style lang="scss" scoped></style>
