import { List } from 'immutable';

export const todoListSelector = state => state.getIn(['todos', 'todoList'], List());
export const isLoadingSelector = state => state.getIn(['todos', 'isLoading']);
export const errorSelector = state => state.getIn(['todos', 'error']);