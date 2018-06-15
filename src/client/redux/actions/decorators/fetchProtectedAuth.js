import { fetchLogout }  from '../auth/authLogout';

export default function decoratorAuthCheck(resp, dispatch) {
  return resp
    .then(res => {
      if (res && res.status === 401) {
        dispatch(fetchLogout());
        return Promise.reject({ response: { data: 'Unauthorized' } });
      }
      return res;
    });
}
