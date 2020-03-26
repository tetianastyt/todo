import React, {useCallback, useRef, useState} from 'react';
import './DeleteButton.css';
import Modal from 'react-modal';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteTodoListData} from "../../../../engine/core/todos/actions";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '25%',
        width                 : '25%',
    }
};

function useDeleteTodoListData() {
    const dispatch = useDispatch();

    const deleteRequest = useCallback((task)  => {
        dispatch(deleteTodoListData(task))
    }, [dispatch]);

    return {
        deleteRequest,
    }
}

function DeleteButton(props){
    const { id } = props;
    const { deleteRequest } = useDeleteTodoListData();
    const [modalIsOpen, setIsOpen] = useState(false);
    const yepButton = useRef(null);

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        yepButton.current.focus();
    }
    function closeModal(){
        setIsOpen(false);
    }
    function deleteTask() {
        deleteRequest(id)
    }

    return (
        <div>
            <button className="button" onClick={openModal}>
                Delete
            </button>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <p>A u sure?</p>
                <button onClick={closeModal}>
                    Nope
                </button>
                <button
                    ref={yepButton}
                    onClick={() => {
                        deleteTask();
                        closeModal();
                    }}
                >
                    Yep
                </button>
            </Modal>
        </div>
    );
}

DeleteButton.propTypes = {
    id: PropTypes.number.isRequired
};

DeleteButton.displayName = "DeleteButton";

export default DeleteButton;

