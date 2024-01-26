/*
 * @Description: 封装一些全局提示类的方法
 * @Author: mxliu5
 * @Date: 2023-08-16
 */
import { h } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import i18n from '@/utils/i18n'
const $t: any = i18n.global.t

// 确认弹窗
export const $confirm = (options: any = {}, type: string) => {
  return new Promise((resolve: any) => {
    const isDel = type === 'delete'
    const {title, content} = options
    ElMessageBox({
      customClass: 'custom-lmx', // 给个自定义class 全局设置样式的时候防止污染其他子组件
      type: 'warning',
      message: h('div', {class: 'custom-message'}, [
        h('h3', null, title || $t('tip.warmTip')),
        h('p', null, isDel ? $t('tip.deleteTip') : content)
      ]),
      autofocus: false,
      showCancelButton: true,
      confirmButtonText: isDel ? $t('btn.delete') : $t('btn.confirm'),
      confirmButtonClass: isDel && 'el-button--danger',
      ...options,
      title: '',
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          done();
          resolve();
        } else {
          done();
        }
      },
    }).catch(() => {
      //
    });
  });
};

// 删除弹窗
export const $deleteConfirm = (options: any = {}) => {
  return new Promise((resolve: any) => {
    $confirm(options, 'delete').then(() => {
      resolve()
    })
  })
};

// 提示框
export const $message = (options: any = {}, type: string) => {
    const isStr = typeof(options) === 'string'
    options = isStr ? {message: options } : options // 如果传的string,则直接当做message使用
    ElMessage({
      customClass: 'custom-lmx',
      type,
      duration: 3000,
      ...options
    })
}
export const successMessage = (options: any = {}) => {
  $message(options, 'success')
}
export const warningMessage = (options: any = {}) => {
  $message(options, 'warning')
}
export const errorMessage = (options: any = {}) => {
  $message(options, 'error')
}