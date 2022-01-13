import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};
let enhancers = [];
let composeEnhancers;

if (process.env.NODE_ENV === 'development') {
  composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
}

enhancers = composeEnhancers(applyMiddleware(thunk));

export default createStore(rootReducer, initialState, enhancers);
