import fetch                              from 'isomorphic-fetch';
import { removeUser } from '../../../services/localStore';
import config from '../../../config/config';
export function logOut() {
  return (dispatch) => {
    dispatch(logOutDo());
  };
}

function logOutDo() {
  return () => {
    return fetch(`${config.get('serverAPI')}auth/logout`, {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      credentials: 'same-origin'
    })
      .then(() => {
        removeUser();
        window.location = '/';
      });
  };
}
