import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import version from './version';
import auth from './auth';

export default combineReducers({
  reduxAsyncConnect,
  version,
  auth
});
