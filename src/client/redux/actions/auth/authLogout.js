import axios from 'axios';

import { removeUser } from '../../../services/localStore';
import config from '../../../config/config';

export function logOut() {
  return (dispatch) => {
    dispatch(logOutDo());
  };
}

function logOutDo() {
  return () => {
    return axios.post(`${config.get('serverAPI')}auth/logout`)
      .then(() => {
        removeUser();
        window.location = '/';
      });
  };
}

