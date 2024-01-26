/*
* @Description: 用于获取当前组件实例
* @Author: mxliu5
* @Date: 2023-07-04
*/
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
import {
  $confirm,
  $deleteConfirm,
  $message,
  successMessage,
  warningMessage,
  errorMessage 
} from '@/utils/app-tip'
const useCtx = () => {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const _this:any = instance?.appContext.config.globalProperties || {}
    const proxy:any = instance?.proxy
    // 全局赋值
    _this.$confirm =$confirm
    _this.$deleteConfirm = $deleteConfirm
    _this.$message = $message
    _this.$message.success = successMessage
    _this.$message.warning = warningMessage
    _this.$message.error = errorMessage
    return {
      _this,  // 用来引入router、message等一些全局信息
      proxy   // 用来引入 ref、nextTick、emit、props等全局信息
    }
}
export default useCtx
