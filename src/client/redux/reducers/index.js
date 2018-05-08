import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import versionReducer                          from './version';

export default combineReducers({
  reduxAsyncConnect,
  version: versionReducer
});
