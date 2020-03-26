import { SET_TODO_LIST_DATA } from './types';
import Api from '../../services/api/index'

export const setTodoListData = (data) => {
    return {
        type: SET_TODO_LIST_DATA,
        payload: data
    }
};
export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});
export const setTodoListDataLoading = (isLoading) => ({
    type: 'SET_TODO_LIST_DATA_LOADING',
    payload: isLoading,
});
export const getTodoListData = () => {
    return (dispatch) => {
        dispatch(setTodoListDataLoading(true));
            Api.getData()
                .then((res) => {
                    dispatch(setTodoListData(res.data.reverse())) // <- Записали данные в store
                })
                .catch((error) => {
                    dispatch(setError(error))
                })
                .finally(() => {
                    dispatch(setTodoListDataLoading(false))
                })
    }
};
export const postTodoListData = (task) => {
    return (dispatch) => {
        Api.postData(task)
            .then(() => Api.getData())
            .then((res) => {
                dispatch(setTodoListData(res.data.reverse())) // <- Записали данные в store
            })
            .catch((error) => {
                dispatch(setError(error))
            })
    }
};
export const deleteTodoListData = (id) => {
    return (dispatch) => {
        Api.deleteData(id)
            .then(() => Api.getData())
            .then((res) => dispatch(setTodoListData(res.data.reverse())))
            .catch((error) => {
            dispatch(setError(error))
        })
    }
};
export const editTodoListData = (id, inputVal, isDone) => {
    return (dispatch) => {
        Api.editData(id, inputVal, isDone)
            .then(() => Api.getData()
                .then((res) => {
                    dispatch(setTodoListData(res.data.reverse())) // <- Записали данные в store
                }))
            .catch((error) => {
                dispatch(setError(error))
            })
    }
};


