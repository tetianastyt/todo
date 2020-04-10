//Modules
import React, {useCallback, useEffect, useRef, useState,} from 'react';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
//Style
import './FormForEditing.css';
//Action
import {editTodoListData} from "../../../../../engine/core/todos/actions";


function FormForEditing(props) {
    const dispatch = useDispatch();
    const {
        setBeingEdited,
        task,
        id,
        isDone,
        setIsDone
    } = props;
    const [inputVal, setInputVal] = useState(task);
    const textInput_ed = useRef(null);

    useEffect(() => {
        textInput_ed.current.focus();
    }, [textInput_ed]);

    const onSubmitHandler_ed = useCallback((ev) => {
        ev.preventDefault();
        if (inputVal) {
            dispatch(editTodoListData(id, inputVal, isDone));
            setBeingEdited(false);
        } else {
            alert("your task can't be empty");
            textInput_ed.current.focus();
        }
    }, [inputVal, id, setBeingEdited, isDone, textInput_ed, dispatch]);

    const handleInputChanges = useCallback((ev) => {
        const value = ev.target.value;
        setInputVal(value);
    }, []);

    const handleCheckboxClick = useCallback((ev) => {
        const stat = ev.target.checked;
        setIsDone(stat);
    }, [setIsDone]);

    return (
        <form className="todoListItem" onSubmit={onSubmitHandler_ed}>
            <input
                type="checkbox"
                onChange={handleCheckboxClick}
                checked={isDone}
            />
            <input
                className="styledInput_edit"
                type="text"
                value={inputVal}
                onChange={handleInputChanges}
                ref={textInput_ed}
            />
            <button type="submit" className="button">Save</button>
        </form>
    )
}

FormForEditing.propTypes = {
    task: PropTypes.string,
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool
};

FormForEditing.defaultProps = {
    task: 'task',
    isDone: false
};

FormForEditing.displayName = "FormForEditing";

export default FormForEditing;
