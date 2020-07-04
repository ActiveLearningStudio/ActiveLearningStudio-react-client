import { createStore, applyMiddleware, compose } from 'redux';
import * as History from 'history';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};
const enhancers = [];

export const history = History.createBrowserHistory();

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers,
);

export default createStore(rootReducer, initialState, composedEnhancers);
