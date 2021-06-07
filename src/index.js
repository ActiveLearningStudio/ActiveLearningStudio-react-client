import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import 'react-widgets/dist/css/react-widgets.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import App from './containers/App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import './config';
import 'assets/css/main-style.scss';

library.add(fas);
library.add(far);

const trackingId = 'UA-1841781-14';
ReactGA.initialize(trackingId, {
  debug: true,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
