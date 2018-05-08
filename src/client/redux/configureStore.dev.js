import { applyMiddleware, createStore, compose } from 'redux';
import thunk                                     from 'redux-thunk';
// import DevTools                                  from '../DevTools';
import rootReducer                               from './reducers';
// import socketMiddleware                          from '../redux/socket/socketMiddleware';
import requestMiddleware                         from '../redux/request/requestMiddleware';

export default function (initialState = {}, socketClient) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      // applyMiddleware(socketMiddleware(socketClient)),
      applyMiddleware(requestMiddleware()),
      // DevTools.instrument()
    )
  );

  store.subscribe(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    }
  });

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default)
    );
  }

  return store;
}
