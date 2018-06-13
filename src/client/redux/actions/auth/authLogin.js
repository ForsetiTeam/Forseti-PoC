import { push } from 'react-router-redux';

import { request } from '../utils/axios';
import apiRoutes from '../../apiRoutes';

import { setUser, setToken } from '../../../services/localStore';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator
} from '../decorators/index';

export const REQUEST_LOGIN_LOADING = 'REQUEST_LOGIN_LOADING';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE';

function requestLogin() {
  return {
    type: REQUEST_LOGIN_LOADING
  };
}

function receiveLogin(user) {
  return {
    type: REQUEST_LOGIN_SUCCESS,
    user
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
  return !state.currentUser.loading && !state.currentUser.user;
}

export function fetchLoginDo(account, sig) {
  return dispatch => {
    console.log('Fetch: Login');
    dispatch(requestLogin());

    return fetchDecorator(
      [
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.authLogin(), { account, sig })
    )
      .then(res => {
        setUser(res.data.user);
        setToken(res.data.token);
        dispatch(receiveLogin(res.data.user));
        dispatch(push('/'));
      })
      .catch(error => {
        dispatch(failureLogin(error.message));
      });
  };
}
