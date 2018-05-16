import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';

export default function (initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const history = createHistory();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk),
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
