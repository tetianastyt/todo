import React, { useState, } from 'react';
import Api from '../../../../engine/services/api';
import './DeleteButton.css';
import Modal from 'react-modal';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')
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
                }}>
                    <button onClick={closeModal}>
                        Nope
                    </button>
                    <button
                        type="submit">
                        Yep
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default DeleteButton;
