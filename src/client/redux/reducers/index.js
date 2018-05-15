import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import version from './version';
import curUser from './curUser';
import community from './community';
import dispute from './dispute';

export default combineReducers({
  reduxAsyncConnect,
  version,
  curUser,
  community,
  dispute
});
