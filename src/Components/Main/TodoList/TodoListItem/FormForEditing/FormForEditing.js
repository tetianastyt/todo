import React, { useCallback, useState } from 'react';
import Api from '../../../../../engine/services/api';
import './FormForEditing.css'

function FormForEditing(props) {
    const {task, id, setData, setBeingEdited} = props;
    const [inputVal, setInputVal] = useState(task);

    const onSubmitHandler_ed = useCallback((ev) => {
        ev.preventDefault();
        if(inputVal.trim()){
        Api.editData(id, inputVal)
            .then(() => Api.getData())
            .then(res => setData(res.data))
            .finally(() => setBeingEdited(false));
    } else {
        alert("your task can't be empty")}
        }, [inputVal, id, setBeingEdited, setData])

    const handleInputChanges = useCallback((ev) => {
        const value = ev.target.value;
        setInputVal(value);
    }, []);

    return (
        <form className="todoListItem" onSubmit={onSubmitHandler_ed}>
            <input type="checkbox"/>
            <input
                className="styledInput_edit"
                type="text"
                value={inputVal}
                onChange={handleInputChanges}
            />
            <button type="submit" className="button">Save</button>
        </form>
    )
}

export default FormForEditing;

