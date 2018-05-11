import { logOut }  from '../auth/authLogout';

export default function decoratorAuthCheck(resp, dispatch) {
  return resp
    .then(res => {
      if (res.status === 401) {
        if (dispatch) {
          dispatch(logOut());
        } else {
          logOut();
        }
        return Promise.reject({ response: { data: 'Unauthorized' } });
      }
      return res;
    });
}
