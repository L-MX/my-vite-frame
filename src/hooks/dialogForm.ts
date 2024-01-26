/*
* @Description: 弹窗表单组件公共的方法
* @Author: mxliu5
* @Date: 2023-08-14
*/
import { ref } from "vue";
export default () => {
  // 表单相关
  const formType = ref<string>('add')
  const formRef = ref<any>(null)
  // 弹窗相关
  const dialogVisible = ref<boolean>(false)
  const handleClose = () => {
    dialogVisible.value = false;
  };
  const handleConfirm = () => {
    formRef.value.submitForm();
  };
  return {
    formType,
    formRef,
    dialogVisible,
    handleClose,
    handleConfirm
  }
}