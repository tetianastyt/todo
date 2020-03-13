import React from 'react';
import './Main.css';
import TodoList from "./TodoList/TodoList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

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
