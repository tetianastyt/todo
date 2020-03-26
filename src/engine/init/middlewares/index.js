import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
    duration: true, // print the duration of each action?
    collapsed: true, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
    colors: {
        title: () => '#139BFE',
        prevState: () => '#1C5FAF',
        action: () => '#149945',
        nextState: () => '#A47104',
        error: () => '#ff0005',
    },
});
const dev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';
const middleware =[thunk];

if (dev) {
    middleware.push(logger);
}

export { dev, middleware }