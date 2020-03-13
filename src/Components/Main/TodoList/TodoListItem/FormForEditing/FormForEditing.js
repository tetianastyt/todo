import React, { useCallback, useState, } from 'react';
import Api from '../../../../../engine/services/index';
import './FormForEditing.css'

function FormForEditing(props) {
    const task = props.task;
    //const id = props.id;
    const {setData, setBeingEdited} = props;
    const [inputVal, setInputVal] = useState(task);
    //const setBeingEdited = props.setBeingEdited;

    const onSubmitHandler_ed = useCallback((ev) => {
        ev.preventDefault();
        if (ev.target[0].value.trim()) {
            const editedTask = ev.target[0].value;
            console.log(editedTask);
            console.log(props.id);
            Api.editData(props.id, editedTask)
                .then(() => Api.getData()
                    .then(res => setData(res.data))
                    .finally(() => setBeingEdited(false)));
        }
    }, [])

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

