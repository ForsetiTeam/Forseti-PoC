import { applyMiddleware, createStore, compose } from 'redux';
import thunk                                     from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
// import DevTools                                  from './DevTools';
import rootReducer                               from './reducers';
import requestMiddleware                         from '../redux/request/requestMiddleware';

export default function (initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const history = createHistory();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
      applyMiddleware(requestMiddleware()),
      // DevTools.instrument()
      applyMiddleware(routerMiddleware(history))
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
