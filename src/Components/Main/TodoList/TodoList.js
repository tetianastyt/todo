import React, {useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './TodoList.css';
import FormForAdding from './FormForAdding/FormForAdding';
import TodoListItem from './TodoListItem/TodoListItem';
import {getTodoListData} from "../../../engine/core/todos/actions";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function useTodoListData() {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todos.todoList);
    const isLoading = useSelector(state => state.todos.isLoading);
    const error = useSelector(state => state.todos.error);

    const getRequest = useCallback(()  => {
        dispatch(getTodoListData())
    }, [dispatch]);

    return {
        data: todoList,
        getRequest,
        error,
        isLoading
    }
}

function ForDoingList() {
    const { data, getRequest, error, isLoading } = useTodoListData();
    if (error) throw error;
    const textInput = useRef(null);

    useEffect(() => {
        getRequest();
        textInput.current.focus();
    }, [getRequest]);

    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 70,
            maxWidth: 140,
            fontFamily: '"Open Sans"'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
            fontFamily: '"Open Sans"',
            fontSize: 18,
            '@media (max-width:560px)': {
                fontSize: 12
            }
        },
    }));
    const classes = useStyles();
    const [chosenCategory, setChosenCategory] = useState('');

    const handleChange = event => {
        setChosenCategory(event.target.value);
        console.log(chosenCategory);
    };

    return (
        <>
            <FormForAdding textInput={textInput}/>
                <Router>
                    <React.Fragment>
                        <div className="filter">
                            <FormControl className={classes.formControl}>
                                <Select value=''
                                        onChange={handleChange}
                                        displayEmpty className={classes.selectEmpty}>
                                    <Link to='/'>
                                        <MenuItem value="all">All</MenuItem>
                                    </Link>
                                    <Link to='/inprogress'>
                                        <MenuItem value="inProgress">In progress</MenuItem>
                                    </Link>
                                    <Link to='/done'>
                                        <MenuItem value="done">Done</MenuItem>
                                    </Link>
                                </Select>
                                <FormHelperText>Choose task's category</FormHelperText>
                            </FormControl>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="todoList_header">
                            <p><b>Tasks</b></p>
                            <p><b>Actions</b></p>
                        </div>

                        {isLoading &&
                            <div>Loading...</div>}

                        <Switch>
                            <Route exact path='/'>
                                {(data.map(t => (
                                    <TodoListItem
                                        key={t.id}
                                        id={t.id}
                                        task={t.task}
                                        statusIsDone={t.statusIsDone}
                                    />
                                )))}
                            </Route>
                            <Route path='/inprogress'>
                                {(data.filter(t => t.statusIsDone === false).map(t => (
                                    <TodoListItem
                                        key={t.id}
                                        id={t.id}
                                        task={t.task}
                                        statusIsDone={t.statusIsDone}
                                    />
                                )))}
                            </Route>
                            <Route path='/done'>
                                {(data.filter(t => t.statusIsDone === true).map(t => (
                                    <TodoListItem
                                        key={t.id}
                                        id={t.id}
                                        task={t.task}
                                        statusIsDone={t.statusIsDone}
                                    />
                                )))}
                            </Route>
                            <Route path="/error404">
                                <h1>Smth went wrong </h1>
                            </Route>
                            <Redirect to="/error404"/>
                            }
                        </Switch>
                    </React.Fragment>
                </Router>
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
