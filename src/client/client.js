import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

import configureStore from './redux/configureStore';

import App from './containers/App';

import './sources/scss/vendor/bootstrap.css';
import './sources/scss/custom/index.scss';

require('babel-polyfill');

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
