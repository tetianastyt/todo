//Core
import React, { useCallback } from 'react';
//Style
import './EditButton.css';

function EditButton(props){
    const { setBeingEdited } = props;

    const onEditing = useCallback(() => {
        setBeingEdited(true);
    },[setBeingEdited]);

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
