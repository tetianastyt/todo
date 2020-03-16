import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './TodoListItem.css';
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import FormForEditing from "./FormForEditing/FormForEditing";
import cn from "classnames";

function TodoListItem(props) {
    const { task, id, setData, statusIsDone } = props;
    const [beingEdited, setBeingEdited] = useState(false);
    const [isDone, setIsDone] = useState(statusIsDone);

    const textInput_ed = useRef(null);

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
                        textInput_ed={textInput_ed}
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
