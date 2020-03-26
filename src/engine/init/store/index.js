import { createStore, applyMiddleware, compose } from "redux";
import  { dev, middleware } from "../middlewares";
import { rootReducer } from "../rootReducer";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = dev && devtools ? devtools : compose;

const store = createStore(
    rootReducer(),
    composeEnhancers(applyMiddleware(...middleware)),
);

// sagaMiddleWare.run(rootSaga);

export { store };
