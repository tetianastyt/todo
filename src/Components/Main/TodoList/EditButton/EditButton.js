import React, { useCallback, useState, } from 'react';
import './EditButton.css';

function EditButton(props){
    const {beingEdited, setBeingEdited} = props;
    const onEditing = useCallback(() => {
        setBeingEdited(true);
        console.log(beingEdited);
    },[])
    return (
        <div>
            <button
                className="button"
                onClick={onEditing}
            >
                Edit
            </button>
        </div>
    );
}


export default EditButton;
