import { SET_TODO_LIST_DATA } from './types';
import { SET_TODO_LIST_DATA_LOADING } from "./types";
import { SET_ERROR } from "./types";

const initialState = {
    todoList: [],
    error: null,
    isLoading: false,
};

export function todosReducer(state = initialState, action) {
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
}
