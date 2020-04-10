//Modules
import React, { useRef, useState } from 'react';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
//Components
import Modal from 'react-modal';
//Styles
import customStyles from "./ModalStyle";
import './DeleteButton.css';
//Action
import {deleteTodoListData} from "../../../../engine/core/todos/actions";

function DeleteButton(props){
    const { id } = props;
    const [modalIsOpen, setIsOpen] = useState(false);
    const yepButton = useRef(null);
    const dispatch = useDispatch();

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
        dispatch(deleteTodoListData(id));
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

