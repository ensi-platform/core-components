import { useReducer, useCallback, Dispatch } from 'react';
import { ActionType } from '../enums';

export type Action<T> = {
    type: ActionType;
    payload?: T;
};

export const usePopupState = <T>(initialState: T): [T, Dispatch<Action<T>>] => {
    const reducer = useCallback(
        (state: T = initialState, action: Action<T>): T => {
            switch (action.type) {
                case ActionType.Edit:
                case ActionType.Delete: {
                    return { ...state, ...action.payload, action: action.type, open: true };
                }
                case ActionType.Add: {
                    return { ...state, action: action.type, open: true };
                }
                case ActionType.PreClose: {
                    return { ...state, ...action.payload, action: action.type, open: false };
                }
                case ActionType.Close: {
                    return { ...initialState, action: action.type, open: false };
                }
                default: {
                    return state;
                }
            }
        },
        [initialState]
    );
    return useReducer(reducer, initialState);
};
