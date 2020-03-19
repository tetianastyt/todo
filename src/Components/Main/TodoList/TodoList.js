import React, {useEffect, useState, useRef} from 'react';
import './TodoList.css';
import TodoListItem from './TodoListItem/TodoListItem';
import Api from '../../../engine/services/api';
import FormForAdding from "./FormForAdding/FormForAdding";
//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';

function ForDoingList() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    if (error) throw error;
    const [isLoading, setIsLoading] = useState(false);
    const textInput = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        Api.getData()
            .then(res => setData(res.data.reverse()))
            .catch(err => setError(err.message))
            .finally(() => setIsLoading(false));
        textInput.current.focus();
    }, []);

    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    const [chosenCategory, setChosenCategory] = useState("all");

    const handleChange = event => {
        setChosenCategory(event.target.value);
    };

    return (
        <>
            <FormForAdding setData={setData} textInput={textInput}/>
            <div className="filter">
                <FormControl className={classes.formControl}>
                    <NativeSelect
                        value={chosenCategory}
                        onChange={handleChange}
                        className={classes.selectEmpty}
                    >
                        <option value="all">All</option>
                        <option value="inProgress">In progress</option>
                        <option value="done">Done</option>
                    </NativeSelect>
                    <FormHelperText>Choose task's category</FormHelperText>
                </FormControl>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="todoList_header">
                <p><b>Tasks</b></p>
                <p><b>Actions</b></p>
            </div>

            {
                isLoading ? (
                    <div>Loading...</div>
                ) : chosenCategory === "all" ? (
                    data.map(t => (
                        <TodoListItem
                            key={t.id}
                            id={t.id}
                            task={t.task}
                            statusIsDone={t.statusIsDone}
                            setData={setData}
                        />
                    ))) : chosenCategory === "inProgress" ? (
                    data.filter(t => t.statusIsDone === false).map(t => (
                        <TodoListItem
                            key={t.id}
                            id={t.id}
                            task={t.task}
                            statusIsDone={t.statusIsDone}
                            setData={setData}
                        />
                    ))) : (
                    data.filter(t => t.statusIsDone === true).map(t => (
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
