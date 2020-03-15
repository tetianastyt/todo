import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './TodoListItem.css';
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import FormForEditing from "./FormForEditing/FormForEditing";

function TodoListItem(props) {
    const { task, id, setData } = props;
    const [beingEdited, setBeingEdited] = useState(false);

    return (
        <>
            {
                beingEdited ? (
                    <FormForEditing
                        task={task}
                        id={id}
                        setData={setData}
                        setBeingEdited={setBeingEdited}
                    />
                ) : (
                    <div className="todoListItem">
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
}

TodoListItem.displayName = "todoListItem"

export default TodoListItem;
