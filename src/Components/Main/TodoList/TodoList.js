import React, {useEffect, useState, useRef} from 'react'
import './TodoList.css'
import TodoListItem from './TodoListItem/TodoListItem'
import filter from './filter.png'
import Api from '../../../engine/services/api'
import FormForAdding from "./FormForAdding/FormForAdding";

function ForDoingList() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    if (error) throw error;
    const [isLoading, setIsLoading] = useState(false);
    const textInput = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        Api.getData()
            .then(res => setData(res.data))
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
        textInput.current.focus();
    }, []);

    return (
        <>
            <FormForAdding setData={setData} textInput={textInput}/>
            <img className="filter" src={filter} alt="filterButton"/>
            <div className="todoList_header">
                <p><b>Tasks</b></p>
                <p><b>Actions</b></p>
            </div>

            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data.reverse().map(t => (
                        <TodoListItem
                            key={t.id}
                            id={t.id}
                            task={t.task}
                            statusIsDone={t.statusIsDone}
                            setData={setData}
                        />
                    )))
            }
        </>
    );
}
function TodoList() {
    return (
        <div>
            <ForDoingList />
        </div>
    );
}

export default TodoList;
