import { createApp, h } from 'vue'
import { generateUID } from '@/utils/helpers'
import Business from './business-node.vue'
import { CurvedEdgeModel } from '@logicflow/extension'

export default function registerBusiness (lf) {
  const nodeType = 'business'
  const El = Business
  lf.register(nodeType, ({ HtmlNode, HtmlNodeModel }) => {
    class ConnectNode extends HtmlNode {
      setHtml(rootEl) {
        const { properties } = this.props.model
        const el = document.createElement('div')
        rootEl.innerHTML = ''
        rootEl.appendChild(el)
        // 更新高度
        const updateHeight = (height) => {
          this.props.model.height = height
        }
        // 更新边
        const updateLinks = (isFold) => {
          this.props.model.updateBranchLinks(isFold)
        }
        // 自定义html节点
        const customHtml = createApp({
          render: () => h(El, {
            properties,
            onUpdateHeight: (height) => {
              updateHeight(height)
            },
            onUpdateLinks: () => {
              updateLinks()
            }
          })
        })
        customHtml.mount(el)
      }
    }
    class ConnectNodeModel extends HtmlNodeModel {
      // 更新分支连线的位置
      updateBranchLinks () {
        // 更新以当前节点为起点的连线位置
        this.outgoing.edges.forEach((edge) => {
          edge.updatePositionByAnchor && edge.updatePositionByAnchor() // 调用自定义的更新方案
        })
      }
      // 当properties发生变化会触发
      setAttributes () {
        setTimeout(() => {
          this.updateBranchLinks()
        })
      }
      initNodeData(data) {
        if (data.text) {
          data.text.editable = false
        }
        super.initNodeData(data)
        this.width = 220
        // 定义连接规则
        const rule = {
          message: '只允许出口节点连接入口节点',
          validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
            return (
              sourceAnchor.type === 'source' &&
              targetAnchor.type === 'target' && sourceNode.id !== targetNode.id
            )
          }
        }
        this.sourceRules.push(rule)
      }
      // 选中的轮廓框样式重写
      getOutlineStyle () {
        const style = super.getOutlineStyle()
        style.stroke = '#4DADFF'
        style.hover.stroke = '#4DADFF'
        return style
      }
      // 锚点拉出的连线样式修改
      getAnchorLineStyle (anchorInfo) {
        const style = super.getAnchorLineStyle()
        style.stroke = '#A5AEBE'
        return style
      }
      // 锚点样式重写
      getAnchorStyle (anchorInfo) {
        const style = super.getAnchorStyle(anchorInfo)
        let color = '#999'
        if (anchorInfo.type === 'source') {
          switch (anchorInfo.branchType) {
            case 'group': color = '#4b72ef'; break
            case 'error': color = '#eb3123'; break
          }
        }
        style.stroke = color
        style.r = 5
        style.hover.r = 8
        style.hover.fill = color
        style.hover.stroke = color
        return style
      }
      // 锚点位置自定义
      getDefaultAnchor () {
        const { width, height, x, y, id, properties } = this
        const anchorPositon = []
        // 添加入口锚点
        anchorPositon.push({
          x: x - width / 2,
          y: y,
          type: 'target',
          id: `${id}_targetAnchor`
        })
        // 添加出口锚点
        const titleH = 40           // 节点标题高度
        const marginH = 4           // magrin
        const branchTitleH = 42     // 分支标题
        const nodeY = (-height / 2) // 节点上方位置的y坐标
        const branchH = 34          // 分支项的高度
        const {groups, errors} = properties.nodeInfo
        // 分支
        if (groups) {
            groups.forEach((item, index) => {
            const offsetX = width / 2
            const baseY = nodeY + titleH + branchTitleH
            const offsetY = baseY + ((branchH + marginH) * index + (branchH / 2))
            anchorPositon.push({
              x: x + offsetX,
              y: properties.isFold ? y : y + offsetY,
              type: 'source',
              id: item.uid, // 分支的id作为锚点id
              branchType: 'group'
            })
          })
        }
          // 异常情况
        if (errors) {
          errors.forEach((item, index) => {
            const offsetX = width / 2
            const groupH = groups.length * (branchH + marginH)
            const baseY = nodeY + titleH + groupH + branchTitleH * 2 - 4
            const offsetY = baseY + ((branchH + marginH) * index + (branchH / 2))
            anchorPositon.push({
              x: x + offsetX,
              y: properties.isFold ? y : y + offsetY,
              type: 'source',
              id: item.uid, 
              branchType: 'error'
            })
          })
        }
        return anchorPositon
      }
      // 自定义节点id生成规则
      createId () {
        return generateUID()
      }
    }
    return {
      type: nodeType,
      view: ConnectNode,
      model: ConnectNodeModel
    }
  })
}
