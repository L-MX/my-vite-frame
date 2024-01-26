/* 判断节点数据结构 */
// import i18n from '@/utils/i18n'
export default {
  conditionGroups: [],
  judgeException: [],
  defaultNodeId: [],
  defaultCondition: {
    uid: -1,
    conditionGroupName: '默认动作', // 分支名称
    targetJumpType: undefined, // 分支动作
    targetNodeType: undefined, // 分支节点
    targetNodeId: undefined, // 下一节点
    sequenceFlowId: "",
    jump: null,
  },
};
