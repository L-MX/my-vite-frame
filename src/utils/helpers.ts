/*
* @Description: 一些公共的方法
* @Author: mxliu5
* @Date: 2023-08-11
*/

// 自定义一个require
export const require = (imgPath: string): string => {
  try {
    const handlePath = imgPath.replace("@", "..");
    let imgUrl = new URL(handlePath, import.meta.url).href;
    if (import.meta.env.MODE === "production") {
      imgUrl = imgUrl.replace("public", "dist");
    }
    return imgUrl;
  } catch (error) {
    console.warn(error);
    return ''
  }
};

// 自定义一个qs
export const queryString = (obj: any): string => {
  let queryString = ''
  for (let [key, value] of Object.entries(obj)) { // [key, value]集合
    queryString += `${key}=${value}&`
  }
  queryString = queryString.replace(/&$/, '') // 去除最后一个&
  return queryString
}

// 自定义一个时间转换器
export const format = (value: any, type: string) => {
  if (!value) return ''
  const D = new Date(value)
  const Y = D.getFullYear()
  const M = D.getMonth() + 1 < 10 ? `0${D.getMonth() + 1}` : D.getMonth() + 1
  const d = D.getDate() < 10 ? `0${D.getDate()}` : D.getDate()
  const h = D.getHours() < 10 ? `0${D.getHours()}` : D.getHours()
  const m = D.getMinutes() < 10 ? `0${D.getMinutes()}` : D.getMinutes()
  const s = D.getSeconds() < 10 ? `0${D.getSeconds()}` : D.getSeconds()
  if (type === 'YYYY-MM-DD') {
    return `${Y}-${M}-${d}`
  } else if (type == 'YYYY-MM-DD hh:mm') {
    return `${Y}-${M}-${d} ${h}:${m}`
  } else if (type == 'YYYY-MM-DD hh:mm:ss') {
    return `${Y}-${M}-${d} ${h}:${m}:${s}`
  } else if (type == 'YYYY/MM/DD') {
    return `${Y}/${M}/${d}`
  }
}

export const generateUID = (() => {
  let uid = 0
  return (prefix: any) => {
    uid += 1
    return `${prefix ? String(prefix) : ''}${uid}${Date.now()}`
  }
})()