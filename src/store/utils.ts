import { ElementId, ReactFlowState, HandleBounds, Node } from "../types";
var sourceConnectedFound = false;
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
  nodeId: ElementId,
  hover: boolean
): HandleBounds => {
  if (connectionHandle.id !== state.connectionHandleId) {
    const connected = checkHandlesConnected(
      state,
      connectionHandle.id as ElementId,
      nodeId
    );
    // handle should not be connected and hover must be false
    if (!connected && !hover) {
      connectionHandle.styles = [
        `react-flow__handle-${connectionHandle.id}-hide`,
      ];
    } else if (!connected && sourceConnectedFound) {
      connectionHandle.styles = [
        `react-flow__handle-${connectionHandle.id}-hide`,
      ];
    } else connectionHandle.styles = null;
  }
  return connectionHandle;
};

const loopThroughHandlesAndChangeStyles = (
  state: ReactFlowState,
  handles: HandleBounds[],
  nodeId: ElementId,
  hover: boolean
): HandleBounds[] => {
  const newHandles: HandleBounds[] = handles.reduce(
    (res, handle): HandleBounds[] => {
      const newHandle = checkAndAssignStyle(state, handle, nodeId, hover);
      res.push(newHandle);
      return res;
    },
    [] as HandleBounds[]
  );
  return newHandles;
};

export function changeOnClickAndHoverHandler(
  state: ReactFlowState,
  nodeId: ElementId | null | undefined,
  hover: boolean | undefined = false
): Node[] {
  const nextNodes: Node[] = state.nodes.reduce((res, node): Node[] => {
    if (node.id === nodeId) {
      const updatedNode = {
        ...node,
        __rf: {
          ...node.__rf,
        },
      };
      // changing source style
      const sources: HandleBounds[] = updatedNode.__rf.handleBounds.source;
      if (
        sources &&
        sources.length &&
        updatedNode.type === "singleSourceNode"
      ) {
        const connected = sources.find((source) =>
          checkHandlesConnected(state, String(source.id), updatedNode.id)
        );
        connected ? (sourceConnectedFound = true) : null;
      } else sourceConnectedFound = false;
      const newSources = sources
        ? loopThroughHandlesAndChangeStyles(state, sources, nodeId, hover)
        : [];
      updatedNode.__rf.handleBounds.source = newSources;
      //changing target style
      const targets: HandleBounds[] = updatedNode.__rf.handleBounds.target;
      const newTargets: HandleBounds[] = targets
        ? loopThroughHandlesAndChangeStyles(state, targets, nodeId, hover)
        : [];
      updatedNode.__rf.handleBounds.target = newTargets;

      res.push(updatedNode);
    } else res.push(node);
    return res;
  }, [] as Node[]);
  return nextNodes;
}

export function toggleOnDrag(
  state: ReactFlowState,
  toggle: boolean | undefined = false
): Node[] {
  const nextNodes: Node[] = state.nodes.reduce((res, node): Node[] => {
    if (node.id !== state.connectionNodeId) {
      const updatedNode = {
        ...node,
        __rf: {
          ...node.__rf,
        },
      };
      const targets: HandleBounds[] = updatedNode.__rf.handleBounds.target;
      var singleTargetHandleConnected = false;
      if (updatedNode.type === "singleTargetNode") {
        const connected = targets.find((target) =>
          checkHandlesConnected(state, String(target.id), updatedNode.id)
        );
        connected ? (singleTargetHandleConnected = true) : null;
      }
      if (targets) {
        const newTargets = targets.reduce((res, target): HandleBounds[] => {
          if (
            !checkHandlesConnected(state, String(target.id), updatedNode.id)
          ) {
            if (toggle || singleTargetHandleConnected) {
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
