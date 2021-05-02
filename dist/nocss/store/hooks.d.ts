import { Store, ActionCreator, ActionCreatorsMapObject } from 'redux';
import { TypedUseSelectorHook } from 'react-redux';
import { ReactFlowDispatch } from './index';
import * as actions from './actions';
import { ReactFlowAction } from './actions';
import { ReactFlowState } from '../types';
export declare const useTypedSelector: TypedUseSelectorHook<ReactFlowState>;
export declare type ActionCreatorSelector<Action> = (acts: typeof actions) => ActionCreator<Action>;
export declare type ActionMapObjectSelector<Action> = (acts: typeof actions) => ActionCreatorsMapObject<Action>;
export declare type ActionSelector<Action> = (acts: typeof actions) => ActionCreatorsMapObject<Action> | ActionCreator<Action>;
export declare function useStoreActions<Action extends ReactFlowAction>(actionSelector: ActionCreatorSelector<Action>): ActionCreator<Action>;
export declare function useStoreActions<Action extends ReactFlowAction>(actionSelector: ActionMapObjectSelector<Action>): ActionCreatorsMapObject<Action>;
export declare const useStoreState: TypedUseSelectorHook<ReactFlowState>;
export declare const useStore: () => Store<ReactFlowState, ReactFlowAction>;
export declare const useDispatch: ReactFlowDispatch;
