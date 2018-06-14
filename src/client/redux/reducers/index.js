import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import version from './version';
import currentUser from './currentUser';
import community from './community';
import dispute from './dispute';
import metamask from './metamask';
import display from './interface';

export default combineReducers({
  version,
  currentUser,
  community,
  dispute,
  metamask,
  display,

  routing: routerReducer
});
