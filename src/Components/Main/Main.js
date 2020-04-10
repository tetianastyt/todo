//Core
import React from 'react';
//Components
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import TodoList from "./TodoList/TodoList";
//Style
import './Main.css';

function Main() {
    return (
        <div className="wrapper">
            <ErrorBoundary>
                <TodoList />
            </ErrorBoundary>
        </div>
    );
}

export default Main;
