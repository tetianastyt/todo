import React, { useCallback, useState, } from 'react';
import Api from '../../../../engine/services/api';
import plus from './plus.png';
import './FormForAdding.css'

function FormForAdding(props) {
    const {setData} = props;
    const [inputValue, setInputValue] = useState('');

    const onSubmitHandler = useCallback((ev) => {
        ev.preventDefault();
        if (ev.target[0].value.trim()) {
            const task = ev.target[0].value;
            Api.postData(task)
                .then(() => Api.getData())
                .then(res => setData(res.data))
                .catch(error => console.log(error))
                .finally(() => setInputValue(''));
        }
    }, [setData])

    const handleInputChange = useCallback((ev) => {
        const value = ev.target.value;
        setInputValue(value);
    }, []);

    return (
            <form className="addNewItem" onSubmit={onSubmitHandler}>
                <input
                    className="styledInput"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="What should I do today?"
                />
                <input
                    type="image"
                    alt="addButton"
                    src={plus}
                />
            </form>
    )
}

export default FormForAdding;

