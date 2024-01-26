

/* 将画布json 转换成 后端需要的格式 */
export const transformChartData = (jsonData) => {
  const {nodes, edges} = jsonData
  return {
    nodes,
    edges
  }
}

/* 将后端返回的格式 转换成 画布需要的格式*/
export const transformJsonData = (chartData) => {
  const {nodes, edges} = chartData
  return {
    nodes,
    edges
  }
}