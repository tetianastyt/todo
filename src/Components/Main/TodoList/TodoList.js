import React, {useEffect, useState, useRef } from 'react';
import './TodoList.css';
import TodoListItem from './TodoListItem/TodoListItem';
import Api from '../../../engine/services/api';
import FormForAdding from "./FormForAdding/FormForAdding";
//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

function ForDoingList() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    if (error) throw error;
    const [isLoading, setIsLoading] = useState(false);
    const textInput = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        Api.getData()
            .then(res => setData(res.data.reverse()))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
        textInput.current.focus();
    }, []);

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
            <FormForAdding setData={setData} textInput={textInput}/>
            {isLoading ? (
                <>
                    <br/>
                    <br/>
                    <div>Loading...</div>
                </>
            ) : (
                <Router>
                    <React.Fragment>
                        <div className="filter">
                            <FormControl className={classes.formControl}>
                                <Select value={chosenCategory}
                                        onChange={handleChange}
                                        displayEmpty className={classes.selectEmpty}>
                                    <Link to='/'>
                                        <MenuItem value={"all"}>
                                            <em>All</em>
                                        </MenuItem>
                                    </Link>
                                    <Link to='/inprogress'>
                                        <MenuItem value={"inProgress"}>
                                            In progress
                                        </MenuItem>
                                    </Link>
                                    <Link to='/done'>
                                        <MenuItem value={"done"}>
                                            Done
                                        </MenuItem>
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

                        <Switch>
                            <Route exact path='/'>
                                {(data.map(t => (
                                    <TodoListItem
                                        key={t.id}
                                        id={t.id}
                                        task={t.task}
                                        statusIsDone={t.statusIsDone}
                                        setData={setData}
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
                                        setData={setData}
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
                                        setData={setData}
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
            )}
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
