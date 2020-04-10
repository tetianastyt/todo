import {createReducer} from 'redux-immutablejs';
import {fromJS, Map, List} from 'immutable'
import * as types from './types';

const initialState = Map({
    todoList: List(),
    error: null,
    isLoading: false,
});

export const todosReducer= createReducer(initialState, {
    [types.SET_TODO_LIST_DATA]: (state, action) => {
        const data = fromJS(action.payload);
        return state.setIn(['todoList'], data);
    },
    [types.SET_ERROR]: (state, action) => (
        state.setIn(['error'], action.payload)
    ),
    [types.SET_TODO_LIST_DATA_LOADING]: (state, action) => (
        state.setIn(['isLoading'], action.payload)
    ),
});


/*export function todosReducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_TODO_LIST_DATA: {
            return {
                ...state, //new state
                todoList: payload
            }
        }
        case SET_TODO_LIST_DATA_LOADING: {
            return {
                ...state,
                isLoading: payload
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: payload
            }
        }
        default: {
            return state;
        }
    }
}*/
