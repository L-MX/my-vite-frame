export default function registerStart (lf) {
    lf.register('start', ({ CircleNode, CircleNodeModel, h }) => {
      class StartNode extends CircleNode {
        getLabelShape () {
          const {model} = this.props
          const {
            x,
            y
          } = model
          return h(
            'text',
            {
              fill: '#4DADFF',
              fontSize: 12,
              x: x - 12,
              y: y + 4,
              width: 50,
              height: 25
            },
            'Start'
          )
        }
        getShape () {
          const {model} = this.props
          const {
            x,
            y,
            r,
          } = model
          const {
            fill,
            stroke,
            strokeWidth} = model.getNodeStyle()
          return h(
            'g',
            {
            },
            [
              h(
                'circle',
                {
                  cx: x,
                  cy: y,
                  r,
                  fill,
                  stroke,
                  strokeWidth
                }
              ),
              this.getLabelShape()
            ]
          )
        }
      }
      class StartModel extends CircleNodeModel {
        // 自定义节点形状属性
        initNodeData(data) {
          data.text = {
            value: (data.text && data.text.value) || '',
            x: data.x,
            y: data.y + 35,
            dragable: false,
            editable: true
          }
          super.initNodeData(data)
          this.r = 20
        }
        // 自定义节点样式属性
        getNodeStyle() {
          const style = super.getNodeStyle()
          style.stroke = '#e2e7ee'
          return style
        }
        // 自定义锚点样式
        getAnchorStyle() {
          const style = super.getAnchorStyle()
          style.stroke = '#4DADFF'
          style.r = 5
          style.hover.r = 8
          style.hover.fill = '#4DADFF'
          style.hover.stroke = '#4DADFF'
          return style;
        }
        // 锚点拉出的连线样式修改
        getAnchorLineStyle () {
          const style = super.getAnchorLineStyle()
          style.stroke = '#A5AEBE'
          return style
        }
        // 自定义节点outline
        getOutlineStyle() {
          const style = super.getOutlineStyle();
          style.stroke = '#999'
          return style
        }
        // 计算锚点位置
        getDefaultAnchor () {
          const { width, x, y, id } = this
          const anchorPositon = []
          // 添加入口锚点
          anchorPositon.push({
            x: x + width / 2,
            y: y,
            type: 'source',
            id: `${id}_sourceAnchor`
          })
          return anchorPositon
        }
        getConnectedTargetRules () {
          const rules = super.getConnectedTargetRules()
          const notAsTarget = {
            message: '起始节点不能作为连线的终点',
            validate: () => false
          }
          rules.push(notAsTarget)
          return rules
        }
      }
      return {
        view: StartNode,
        model: StartModel
      }
    })
  }
  