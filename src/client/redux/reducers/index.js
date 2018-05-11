import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import version from './version';
import auth from './auth';
import community from './community';

export default combineReducers({
  reduxAsyncConnect,
  version,
  auth,
  community
});
