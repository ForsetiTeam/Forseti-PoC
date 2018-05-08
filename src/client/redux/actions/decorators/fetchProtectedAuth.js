// import { logOut }  from '../logOutAction';

export default function decoratorAuthCheck(/* dispatch*/) {
  return this
    .then(res => {
      if (res.status === 401) {
        /* if (dispatch) {
          dispatch(logOut());
        } else {
          logOut();
        }*/
        return Promise.reject('Unauthorized');
      }
      return res;
    });
}
