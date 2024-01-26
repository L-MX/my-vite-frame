/*
* @Description: 表格组件公共的方法
* @Author: mxliu5
* @Date: 2023-08-14
*/
import { ref } from "vue";
import assign from 'lodash/assign'
export default () => {
  // 查询相关
  const query = ref<any>({})
  const queryItems = ref<any>({})
  const searchQuery = (obj: any) => {
    query.value = assign({}, query.value, obj)
  };
  const resetQuery = (obj: any) => {
    for (let key in obj) {
      queryItems.value[key].value = obj[key].value
    }
  };
  return {
    query,
    queryItems,
    searchQuery,
    resetQuery
  }
}