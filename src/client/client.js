import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import registerServiceWorker from './registerServiceWorker';

import configureStore from './redux/configureStore';

import App from './containers/App';

import './sources/scss/vendor/bootstrap.css';
import './sources/scss/vendor/linearicons/style.css';
import './sources/scss/custom/index.scss';

require('babel-polyfill');

// redux working with navigation
const initialState = window.REDUX_INITIAL_STATE || {};
const history = createHistory();
const store = configureStore(initialState, history);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
