import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";

import tsy from "./tsy";
import xtpd from "./xtpd";
import htcl from "./htcl";
import mxcl from "./mxcl";

const raw: any = {
  tsy,
  xtpd,
  htcl,
  mxcl,
};

export const NODE_INFOS = cloneDeep(raw);

export const getCertainNodeInfo = (type: string, defaults: any = {}) => {
  const info = raw[type];
  if (!info) {
    throw new Error(`No ${type} type node.`);
  }
  return assign(cloneDeep(info), defaults);
};
