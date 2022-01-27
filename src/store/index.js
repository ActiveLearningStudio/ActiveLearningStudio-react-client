import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};
const enhancers = [];

if (window.__RUNTIME_CONFIG__.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(thunk), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
