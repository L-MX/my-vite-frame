import axios from './axios'
// import { queryString } from '@/utils/helpers'

// 列表
export function getTemplateList (data?: any) {
  if (data) {
    return axios.get('/templates?' + `_page=${data._page}&_limit=${data._limit}&_sort=id&_order=desc`)
  } else {
    return axios.get('/templates')
  }
    // const qsParams = queryString({_sort: 'desc', ...data})
  // return axios.get('/templates?' + qsParams)
} 

// 新增
export function addTemplate (data: any) {
  return axios.post('/templates', data)
}

// 修改
export function updateTemplate (data: any) {
  let url = '/templates'
  if (data.id) url += `/${data.id}`
  return axios.patch(url, data)
}

// 删除
export function deleteTemplate (id: number) {
  let url = `/templates/${id}`
  return axios.delete(url)
}

