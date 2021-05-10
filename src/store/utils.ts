import { ElementId, ReactFlowState, HandleBounds, Node } from "../types";

// export function checkHandleConnected(
//   state: ReactFlowState,
//   handleId: ElementId
// ): any {
//   // check if the current handle is connected
//   return state.edges.find(
//     (edge) =>
//       (edge.source === state.connectionNodeId &&
//         edge.sourceHandle === handleId) ||
//       (edge.target === state.connectionNodeId && edge.targetHandle === handleId)
//   );
// }

const checkHandlesConnected = (
  state: ReactFlowState,
  handleId: ElementId | null,
  nodeId: ElementId | null
): boolean => {
  const edge = state.edges.find(
    (edge) =>
      (edge.sourceHandle === handleId && edge.source === nodeId) ||
      (edge.targetHandle === handleId && edge.target === nodeId)
  );
  if (edge === undefined) return false;
  return true;
};

const checkAndAssignStyle = (
  state: ReactFlowState,
  connectionHandle: HandleBounds,
  hover: boolean,
): HandleBounds => {
  if (connectionHandle.id !== state.connectionHandleId) {
    const connected = checkHandlesConnected(
      state,
      connectionHandle.id as ElementId,
      state.connectionNodeId
    );
    console.log(connected, 'connected');
    if (!connected && !hover) {
      console.log('hover styles');
      connectionHandle.styles = [
        `react-flow__handle-${connectionHandle.id}-hide`,
      ];
    } else connectionHandle.styles = null;
  } else {
    connectionHandle.styles = null;
  }
  return connectionHandle;
};

const loopThroughHandlesAndChangeStyles = (
  state: ReactFlowState,
  handles: HandleBounds[],
  hover: boolean,
): HandleBounds[] => {
  const newHandles: HandleBounds[] = handles.reduce(
    (res, handle): HandleBounds[] => {
      const newHandle = checkAndAssignStyle(state, handle, hover);
      res.push(newHandle);
      return res;
    },
    [] as HandleBounds[]
  );
  return newHandles;
};

export function changeOnClick(
  state: ReactFlowState,
  nodeId: ElementId | null,
  hover: boolean = false
): Node[] {
  console.log('hover');
  const nextNodes: Node[] = state.nodes.reduce((res, node): Node[] => {
    console.log(nodeId, 'nodeId');
    if (node.id === nodeId) {
      console.log(node, 'node found');
      const updatedNode = {
        ...node,
        __rf: {
          ...node.__rf,
        },
      };
      // changing source style
      const sources: HandleBounds[] = updatedNode.__rf.handleBounds.source;
      const newSources = sources
        ? loopThroughHandlesAndChangeStyles(state, sources, hover)
        : [];
      console.log(newSources);
      updatedNode.__rf.handleBounds.source = newSources;
      //changing target style
      const targets: HandleBounds[] = updatedNode.__rf.handleBounds.target;
      const newTargets: HandleBounds[] = targets
        ? loopThroughHandlesAndChangeStyles(state, targets, hover)
        : [];
      console.log(newTargets);
      updatedNode.__rf.handleBounds.target = newTargets;

      res.push(updatedNode);
    } else res.push(node);
    return res;
  }, [] as Node[]);
  return nextNodes;
}

export function toggleOnDrag(state: ReactFlowState, toggle: boolean): Node[] {
  const nextNodes: Node[] = state.nodes.reduce((res, node): Node[] => {
    if (node.id !== state.connectionNodeId) {
      const updatedNode = {
        ...node,
        __rf: {
          ...node.__rf,
        },
      };
      const targets: HandleBounds[] = updatedNode.__rf.handleBounds.target;
      if (targets) {
        const newTargets = targets.reduce((res, target): HandleBounds[] => {
          if (
            !checkHandlesConnected(state, String(target.id), updatedNode.id)
          ) {
            if (toggle) {
              target.styles = [`react-flow__handle-${target.id}-hide`];
            } else target.styles = [];
          }
          res.push(target);
          return res;
        }, [] as HandleBounds[]);
        updatedNode.__rf.handleBounds.target = newTargets;
      }
    }
    //
    return res;
  }, [] as Node[]);
  return nextNodes;
}

export function createAction<T extends string>(type: T): { type: T };
export function createAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function createAction(type: string, payload?: any) {
  return { type, payload };
}
