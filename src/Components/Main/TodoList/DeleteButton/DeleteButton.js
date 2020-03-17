import React, { useState } from 'react';
import Api from '../../../../engine/services/api';
import './DeleteButton.css';
import Modal from 'react-modal';
import PropTypes from "prop-types";

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

function DeleteButton(props){
    const { id, setData } = props;
    const [modalIsOpen,setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }
    function deleteTask() {
        Api.deleteData(id)
            .then(() => Api.getData()
                .then((res) => setData(res.data)))
    }


    return (
        <div>
            <button className="button" onClick={openModal}>
                Delete
            </button>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <p>A u sure?</p>
                <form onSubmit={() => {
                    deleteTask();
                    closeModal();
                }}
                >
                <button onClick={closeModal}>
                    Nope
                </button>
                <button
                    id="submit"
                    type="submit"
                >
                    Yep
                </button>
                </form>
            </Modal>
        </div>
    );
}

DeleteButton.propTypes = {
    id: PropTypes.number.isRequired
};

DeleteButton.displayName = "DeleteButton";

export default DeleteButton;

{/*
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
</button>*/}
