import { ElementId, ReactFlowState, Node } from "../types";
export declare function changeOnClickAndHoverHandler(state: ReactFlowState, nodeId: ElementId | null | undefined, hover?: boolean | undefined): Node[];
export declare function toggleOnDrag(state: ReactFlowState, toggle?: boolean | undefined): Node[];
export declare function createAction<T extends string>(type: T): {
    type: T;
};
export declare function createAction<T extends string, P extends any>(type: T, payload: P): {
    type: T;
    payload: P;
};
