import { applyMiddleware, createStore, compose } from 'redux';
import thunk                                     from 'redux-thunk';
import rootReducer                               from './reducers';
// import socketMiddleware                          from '../redux/socket/socketMiddleware';
import requestMiddleware                         from '../redux/request/requestMiddleware';

export default function (initialState = {}/* , socketClient*/) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      // applyMiddleware(socketMiddleware(socketClient)),
      applyMiddleware(requestMiddleware()),
    )
  );

  store.subscribe(() => {
    if (typeof localStorage !== 'undefined')      {
      localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    }
  });

  return store;
}
