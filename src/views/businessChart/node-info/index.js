import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

import business from './business'

const raw = {
  business
}

export const NODE_INFOS = cloneDeep(raw)

export const getCertainNodeInfo = (type, defaults = {}) => {
  const info = raw[type]
  if (!info) {
    throw new Error(`No ${type} type node.`)
  }
  return assign(cloneDeep(info), defaults)
}