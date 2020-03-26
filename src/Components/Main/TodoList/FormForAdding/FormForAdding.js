import React, { useCallback, useState } from 'react';
import plus from './plus.png';
import './FormForAdding.css';
import TodoListItem from "../TodoListItem/TodoListItem";
import {useDispatch} from "react-redux";
import {postTodoListData} from "../../../../engine/core/todos/actions";

function usePostTodoListData() {
    const dispatch = useDispatch();

    const postRequest = useCallback((task)  => {
        dispatch(postTodoListData(task))
    }, [dispatch]);

    return {
        postRequest
    }
}

function FormForAdding(props) {
    const { textInput } = props;
    const { postRequest } = usePostTodoListData();
    const [inputValue, setInputValue] = useState('');

    const onSubmitHandler = useCallback((ev) => {
        ev.preventDefault();
        if (ev.target[0].value.trim()) {
            const task = ev.target[0].value;
            postRequest(task);
            setInputValue('');
        } else {
            alert("your task can't be empty");
        }
        textInput.current.focus();
    }, [textInput, postRequest]);

    const handleInputChange = useCallback((ev) => {
        const value = ev.target.value;
        setInputValue(value);
    }, []);

    return (
            <form className="addNewItem" onSubmit={onSubmitHandler}>
                <input
                    className="styledInput"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="What should I do today?"
                    ref={textInput}
                />
                <input
                    type="image"
                    alt="addButton"
                    src={plus}
                />
            </form>
    )
}

TodoListItem.displayName = "FormForAdding";

export default FormForAdding;
