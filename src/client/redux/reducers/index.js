import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { routerReducer } from 'react-router-redux';

import version from './version';
import curUser from './curUser';
import community from './community';
import dispute from './dispute';
import metamask from './metamask';

export default combineReducers({
  reduxAsyncConnect,
  version,
  curUser,
  community,
  dispute,
  metamask,

  routing: routerReducer
});
