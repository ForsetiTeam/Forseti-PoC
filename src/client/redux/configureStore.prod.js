import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';

export default function (initialState = {}, history) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
    )
  );

  store.subscribe(() => {
    if (typeof localStorage !== 'undefined')      {
      localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    }
  });

  return store;
}
