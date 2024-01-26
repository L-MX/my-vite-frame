// 画布的一些配置项
const config = {
  background: {
    backgroundColor: '#f6f6f7'
  },
  // 网格配置
  grid: {
    size: 20,
    visible: true,
    type: 'dot', // dot：点 mesh：线
    config: {
      color: '#cccccf',
      thickness: 1
    }
  },
  // adjustEdgeMiddle: true,    // 只允许调整边的中间线段，不允许调整起始点相连的线段（只对polyline生效）
  adjustEdge: false,
  hoverOutline: false,       // 鼠标hover的时候是否显示节点外框 默认true
  nodeTextEdit: false,       // 是否允许编辑节点文本 默认为true
  edgeTextEdit: false,       // 是否允许编辑边的文本 默认为true
  multipleSelectKey: 'shift' // 按shift键框选多个
}
export default config
