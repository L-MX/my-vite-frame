import { createApp } from 'vue'
import Tsy from './node-tsy.vue'
import Judge from './node-judge.vue'
import Htcl from './node-htcl.vue'
import Mxcl from './node-mxcl.vue'

export default function registerHtml (lf, nodeType) {
  let El = null
  switch (nodeType) {
    case 'tsy': El = Tsy; break;
    case 'xtpd': El = Judge; break;
    case 'htcl': El = Htcl; break;
    case 'mxcl': El = Mxcl; break;
  }
  lf.register(nodeType, ({ HtmlNode, HtmlNodeModel }) => {
    class ConnectNode extends HtmlNode {
      setHtml(rootEl) {
        const app = createApp(El)
        const el = document.createElement('div');
        el.style.height='100%'
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
        app.mount(el)  
      }
    }
    class ConnectNodeModel extends HtmlNodeModel {
      initNodeData(data) {
        if (data.text) {
          // data.text.editable = false
        }
        super.initNodeData(data)
        const width = 180
        const height = 80
        this.width = width
        this.height = height
        this.anchorsOffset = [
          [width / 2, 0],
          [0, height / 2],
          [-width / 2, 0],
          [0, -height/2],
        ]
      }
    }
    return {
      type: nodeType,
      view: ConnectNode,
      model: ConnectNodeModel
    }
  })
}
