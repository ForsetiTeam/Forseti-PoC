import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function (initialState = {}/* , socketClient*/) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
    )
  );

  store.subscribe(() => {
    if (typeof localStorage !== 'undefined')      {
      localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    }
  });

  return store;
}
