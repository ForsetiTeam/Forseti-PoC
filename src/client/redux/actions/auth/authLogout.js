import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import { removeUser } from '../../../services/localStore';

export function logOut() {
  return (dispatch) => {
    dispatch(logOutDo());
  };
}

function logOutDo() {
  return () => {
    return request('post', apiRoutes.authLogout())
      .then(() => {
        removeUser();
        window.location = '/';
      });
  };
}

