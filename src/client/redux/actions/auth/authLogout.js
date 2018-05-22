import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import { removeUser, removeToken } from '../../../services/localStore';

export const LOGOUT = 'LOGOUT';

export function fetchLogout() {
  return dispatch => {
    request('post', apiRoutes.authLogout());
    removeUser();
    removeToken();
    dispatch({
      type: LOGOUT
    });
    dispatch(push('/'));
  };
}

