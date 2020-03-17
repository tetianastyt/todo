import React, {useCallback, useEffect, useState,} from 'react';
import Api from '../../../../../engine/services/api';
import './FormForEditing.css';
import PropTypes from "prop-types";

function FormForEditing(props) {
    const {
        setData,
        setBeingEdited,
        task,
        id,
        isDone,
        setIsDone,
        textInput_ed
    } = props;

    const [inputVal, setInputVal] = useState(task);

    useEffect(() => {
        textInput_ed.current.focus();
    });

    const onSubmitHandler_ed = useCallback((ev) => {
        ev.preventDefault();
       if (inputVal) {
        Api.editData(id, inputVal, isDone)
            .then(() => Api.getData()
                .then(res => setData(res.data))
                .finally(() => setBeingEdited(false)));
       } else {
           alert("your task can't be empty");
           textInput_ed.current.focus();
       }
    }, [inputVal, id, setBeingEdited, setData, isDone, textInput_ed]);

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
    isDone: PropTypes.number,
    //???????????  ---> string?
    textInput_ed: PropTypes.string
};

FormForEditing.defaultProps = {
    task: 'task',
    statusIsDone: false
};

FormForEditing.displayName = "FormForEditing";

export default FormForEditing;
