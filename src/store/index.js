import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';

const preloadedState = {};

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);
const store = createStore(rootReducer, preloadedState, composedEnhancers);
if (window.__RUNTIME_CONFIG__?.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}
export default store;
