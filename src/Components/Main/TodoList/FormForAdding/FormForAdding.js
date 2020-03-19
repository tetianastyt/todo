import React, { useCallback, useState } from 'react';
import Api from '../../../../engine/services/api';
import plus from './plus.png';
import './FormForAdding.css';
import TodoListItem from "../TodoListItem/TodoListItem";

function FormForAdding(props) {
    const {setData, textInput} = props;
    const [inputValue, setInputValue] = useState('');

    const onSubmitHandler = useCallback((ev) => {
        ev.preventDefault();
        if (ev.target[0].value.trim()) {
            const task = ev.target[0].value;
            Api.postData(task)
                .then(() => Api.getData())
                .then(res => setData(res.data.reverse()))
                .catch(error => console.log(error))
                .finally(() => setInputValue(''));
        } else {
            alert("your task can't be empty");
        }
        textInput.current.focus();
    }, [setData, textInput]);

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
