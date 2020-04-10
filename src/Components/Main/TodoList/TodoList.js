//Modules
import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Action
import { getTodoListData } from '../../../engine/core/todos/actions';
//Selectors
import * as selectors from '../../../engine/core/todos/selectors'
//Components
import FormForAdding from './FormForAdding/FormForAdding';
import TodoListItem from './TodoListItem/TodoListItem';
//Navigation
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
//Styles
import './TodoList.css';
import useStyles from "./TodolistMUI";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function useTodoListData() {
    const dispatch = useDispatch();
    const todoList = useSelector(selectors.todoListSelector);
    const isLoading = useSelector(selectors.isLoadingSelector);
    const error = useSelector(selectors.errorSelector);

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
    const classes = useStyles();
    if (error) throw error;
    const textInput = useRef(null);

    useEffect(() => {
        getRequest();
        textInput.current.focus();
    }, [getRequest]);

    return (
        <>
            <FormForAdding textInput={textInput}/>
                <Router>
                    <React.Fragment>
                        <div className="filter">
                            <FormControl className={classes.formControl}>
                                <Select value=""
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
                                        key={t.get('id')}
                                        id={t.get('id')}
                                        task={t.get('task')}
                                        statusIsDone={t.get('statusIsDone')}
                                        data = {data}
                                    />
                                )))}
                            </Route>
                            <Route path='/inprogress'>
                                {(data.filter(t => t.get('statusIsDone') === false).map(t => (
                                    <TodoListItem
                                        key={t.get('id')}
                                        id={t.get('id')}
                                        task={t.get('task')}
                                        statusIsDone={t.get('statusIsDone')}
                                    />
                                )))}
                            </Route>
                            <Route path='/done'>
                                {(data.filter(t => t.get('statusIsDone') === true).map(t => (
                                    <TodoListItem
                                        key={t.get('id')}
                                        id={t.get('id')}
                                        task={t.get('task')}
                                        statusIsDone={t.get('statusIsDone')}
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

/* const [chosenCategory, setChosenCategory] = useState('');
onChange={handleChange}
   const handleChange = event => {
       event.preventDefault();
       setChosenCategory(event.target.value);
       console.log(event.target.value);
   };*/
