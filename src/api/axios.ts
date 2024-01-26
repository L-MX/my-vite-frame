import Axios, { AxiosError } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
/**
 * @returns  {AxiosResponse} result
 * @tutorial see more:https://github.com/onlyling/some-demo/tree/master/typescript-width-axios
 * @example
 * service.get<{data: string; code: number}>('/test').then(({data}) => { console.log(data.code) })
 */
const service = Axios.create({
  baseURL: '/api',
  timeout: 30000
})

// 设置全局loading变量
let loading: any = null
let needLoading = false
let needLoadingRequestCount = 0

function startLoading() {
  //使用Element loading-start 方法
  if (needLoading) {
    loading = ElLoading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
}

let t: any = null

function endLoading() {
  //使用Element loading-close 方法
  needLoading = false

  if (t != null) {
    clearTimeout(t)
  }
  if (loading) {
    loading.close()
  }
  needLoadingRequestCount = 0
}

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    needLoading = true
    //设置延时函数,超过800毫秒时显示loading
    t = setTimeout(startLoading, 800)
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  needLoadingRequestCount--
  if (needLoadingRequestCount <= 0) {
    endLoading()
  }
}

/**
 * @description 请求发起前的拦截器
 * @returns {AxiosRequestConfig} config
 */
service.interceptors.request.use((config: any) => {
  showFullScreenLoading()
  return config
})
/**
 * @description 响应收到后的拦截器
 * @returns {}
 */
service.interceptors.response.use(
  async (response: any) => {
    tryHideFullScreenLoading()
    //在这里可以根据状态码统一作响应失败的提示信息处理
    if (response.status === 200 || response.status === 201 || response.status === 204) {
      return Promise.resolve(response.data)
    } else {
      const _msg = response.data?.msg || response.data?.message
      ElMessage({ message: _msg || '系统异常，请联系管理员', type: 'error' })
      return Promise.reject()
    }
  },
  /** 请求无响应 */
  (error: AxiosError) => {
    tryHideFullScreenLoading()
    const redData: any = error.response && error.response.data
    let message = redData.msg || redData.message
    if (error.response?.status === 401) {
      ElMessage({ message, type: 'error' })
      return
    }
    ElMessage({ message, type: 'error' })
    return Promise.reject(error.response?.data)
  }
)

export default service
