import React, {useState} from 'react';
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
    task: PropTypes.string
};

TodoListItem.defaultProps = {
    task: 'task'
};

TodoListItem.displayName = "todoListItem";

export default TodoListItem;
