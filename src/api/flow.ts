import axios from './axios'
// import { queryString } from '@/utils/helpers'
const _url = '/flows'

// 列表
export function getFlowList (data?: any) {
  if (data) {
    return axios.get(_url + `?_page=${data._page}&_limit=${data._limit}&_sort=id&_order=desc`)
  } else {
    return axios.get(_url)
  }
} 

// 新增
export function addFlow (data: any) {
  return axios.post(_url, data)
}

// 修改
export function updateFlow (data: any) {
  let url = _url
  if (data.id) url += `/${data.id}`
  return axios.patch(url, data)
}

// 删除
export function deleteFlow (id: number) {
  let url = `${_url}/${id}`
  return axios.delete(url)
}

