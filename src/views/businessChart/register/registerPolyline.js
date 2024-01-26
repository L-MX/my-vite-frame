/* 自定义带圆弧的折现 */
import { generateUID } from '@/utils/helpers'
import { CurvedEdge, CurvedEdgeModel } from '@logicflow/extension'
export default function registerPolyline (lf) {
  lf.register('polyline', () => {
    class ConnnectionModel extends CurvedEdgeModel {
      initEdgeData (data) {
        super.initEdgeData(data)
        this.radius = 5
      }
      // 自定义边的样式
      getEdgeStyle () {
        const style = super.getEdgeStyle()
        style.stroke = '#c2c7ce'
        return style
      }
      // 重写此方法，使保存数据是能带上锚点数据 （想要保存时能带上哪个属性，就重写这个属性-除默认的属性以外无需重写）
      getData () {
        const data = super.getData()
        data.sourceAnchorId = this.sourceAnchorId
        data.targetAnchorId = this.targetAnchorId
        return data
      }
      // 自定义方法 根据锚点的位置更新连线的位置
      updatePositionByAnchor () {
        // 源节点
        const sourceNodeModel = this.graphModel.getNodeModelById(this.sourceNodeId) // 当前连线的起始节点
        const sourceDefaultAnchor = sourceNodeModel.getDefaultAnchor() // 当前连线的起始节点上所有的锚点结合
        const sourceAnchor = sourceDefaultAnchor.find((anchor) => anchor.id === this.sourceAnchorId) // 当前连线的起始锚点
        // 目标节点
        const targetNodeModel = this.graphModel.getNodeModelById(this.targetNodeId)
        const targetDefaultAnchor = targetNodeModel.getDefaultAnchor()
        const targetAnchor = targetDefaultAnchor.find((anchor) => anchor.id === this.targetAnchorId)
        if (sourceAnchor) { // 如果当前连线起始锚点存在，则更新为该锚点的位置
          const startPoint = {
            x: sourceAnchor.x,
            y: sourceAnchor.y
          }
          this.updateStartPoint(startPoint)
          this.pointsList = []
          this.initPoints()
        } else { // 如果当前连线的起始锚点不存在(分支被删除了)，则直接删除当前连线
          lf.deleteEdge(this.id)
        }
        const endPoint = {
          x: targetAnchor.x,
          y: targetAnchor.y
        }
        this.updateEndPoint(endPoint)
      }
      setHovered (isHovered) {
        super.setHovered(isHovered)
        this.isAnimation = isHovered
      }
      getEdgeAnimationStyle () {
        const style = super.getEdgeAnimationStyle()
        style.animationName = 'lf_animate_dash'
        style.stroke = '#F28C2E'
        return style
      }
      // 自定义边id生成规则
      createId () {
        return generateUID()
      }
    }
    return {
      view: CurvedEdge,
      model: ConnnectionModel
    }
  })
}
