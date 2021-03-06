//Modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from "classnames";
//Styles
import './TodoListItem.css';
//Components
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import FormForEditing from "./FormForEditing/FormForEditing";


function TodoListItem(props) {
    const { task, id, setData, statusIsDone } = props;

    const [beingEdited, setBeingEdited] = useState(false);
    const [isDone, setIsDone] = useState(statusIsDone);

    const checkboxClass = cn('todoListItem', {'crossedText': isDone});
    return (
        <>
            {
                beingEdited ? (
                    <FormForEditing
                        task={task}
                        id={id}
                        setData={setData}
                        setBeingEdited={setBeingEdited}
                        isDone={isDone}
                        setIsDone={setIsDone}
                    />
                ) : (
                    <div className={checkboxClass}>
                        {task}
                        <div className='buttons'>
                            <DeleteButton
                                id={id}
                                setData={setData}
                            />
                            <EditButton
                                setBeingEdited={setBeingEdited}
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
}

TodoListItem.propTypes = {
    task: PropTypes.string,
    id: PropTypes.number.isRequired,
    statusIsDone: PropTypes.bool
};

TodoListItem.defaultProps = {
    task: 'task',
    statusIsDone: false
};

TodoListItem.displayName = "todoListItem";

export default TodoListItem;