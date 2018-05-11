import { push } from 'react-router-redux';
import axios from 'axios';

import config from '../../../config/config';
import { setUser, setToken } from '../../../services/localStore';
import {
  fetchDecorator,
  // fetchProtectedAuth,
  fetchSuccessStatusDecorator// ,
  // fetchFromJsonDecorator
} from '../decorators/index';

export const REQUEST_LOGIN_LOADING = 'REQUEST_LOGIN_LOADING';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE';

function requestLogin() {
  return {
    type: REQUEST_LOGIN_LOADING
  };
}

function receiveLogin() {
  return {
    type: REQUEST_LOGIN_SUCCESS
  };
}

function failureLogin(error) {
  return {
    type: REQUEST_LOGIN_FAILURE,
    error
  };
}

export function fetchLogin(account, sig) {
  return (dispatch, getState) => {
    if (shouldFetchLogin(getState())) {
      return dispatch(fetchLoginDo(account, sig));
    }
  };
}

function shouldFetchLogin(state) {
  return !state.auth.loading && !state.auth.user;
}

function fetchLoginDo(account, sig) {
  return dispatch => {
    console.log('Fetch: Login');
    dispatch(requestLogin());

    return fetchDecorator(
      [
        // partial(fetchProtectedAuth, dispatch),
        // (...args) => fetchProtectedAuth(dispatch, ...args),
        fetchSuccessStatusDecorator// ,
        // fetchFromJsonDecorator
      ],
      axios.post(`${config.get('serverAPI')}auth/login`, { account, sig })
      /*
    axios({
      method: 'post',
      url: `${config.get('serverAPI')}auth/login`,
      withCredentials: true,
      data: { account }
    })*/
    )
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.token);
        dispatch(receiveLogin());
        dispatch(push('/'));
      })
      .catch(error => {
        dispatch(failureLogin(error.response.data));
      });
  };
}
