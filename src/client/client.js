import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';

import configureStore from './redux/configureStore.js';
import SocketClient from './redux/socket/socketClient';

import App from './containers/App';

import './sources/scss/vendor/bootstrap.css';

require('babel-polyfill');

const initialState = window.REDUX_INITIAL_STATE || {};

const socketClient = new SocketClient();
const store = configureStore(initialState, socketClient);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
