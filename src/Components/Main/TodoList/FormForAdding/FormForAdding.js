//Core
import React, { useCallback, useState } from 'react';
import {useDispatch} from "react-redux";
//Imgs
import plus from './plus.png';
//Style
import './FormForAdding.css';
//Components
import TodoListItem from "../TodoListItem/TodoListItem";
//Action
import {postTodoListData} from "../../../../engine/core/todos/actions";

function FormForAdding(props) {
    const { textInput } = props;
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const onSubmitHandler = useCallback((ev) => {
        ev.preventDefault();
        if (ev.target[0].value.trim()) {
            const task = ev.target[0].value;
            dispatch(postTodoListData(task));
            setInputValue('');
        } else {
            alert("your task can't be empty");
        }
        textInput.current.focus();
    }, [textInput, dispatch]);

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
