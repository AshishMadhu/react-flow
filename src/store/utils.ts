import { ElementId, ReactFlowState } from "../types";

export function checkHandleConnected(
  state: ReactFlowState,
  handleId: ElementId
): any {
  return state.edges.find(
    (edge) =>
      (edge.source === state.connectionNodeId &&
        edge.sourceHandle === handleId) ||
      (edge.target === state.connectionNodeId && edge.targetHandle === handleId)
  );
}
export function createAction<T extends string>(type: T): { type: T };
export function createAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function createAction(type: string, payload?: any) {
  return { type, payload };
}
