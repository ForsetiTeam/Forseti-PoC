import React from 'react';
import ReactDOM   from 'react-dom';
/*
import { browserHistory, Router } from 'react-router';
//import routes from './redux/routes.jsx';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore.js';
import SocketClient from './redux/socket/socketClient';
import { ReduxAsyncConnect } from 'redux-connect';

const initialState = window.REDUX_INITIAL_STATE || {};

const socketClient = new SocketClient();
const store = configureStore(initialState, socketClient);

const component = (
	<Provider store={store}>
		<Router render={(props) => <ReduxAsyncConnect {...props}/>} history={browserHistory}>
			{routes}
		</Router>
	</Provider>
);*/
const component = (<div>Helloworld</div>);

ReactDOM.render(component, document.getElementById('root'));
