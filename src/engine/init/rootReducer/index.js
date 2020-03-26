import { combineReducers } from "redux";
import { todosReducer } from "../../core/todos/reducer";

const rootReducer = () => combineReducers({
    todos: todosReducer,
});
export { rootReducer };