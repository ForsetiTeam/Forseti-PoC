import { push } from 'react-router-redux';
import { request } from '../utils/axios';

import { setUser, setToken } from '../../../services/localStore';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator
} from '../decorators/index';
import apiRoutes from '../../apiRoutes';

export const REQUEST_REGISTER_LOADING = 'REQUEST_REGISTER_LOADING';
export const REQUEST_REGISTER_SUCCESS = 'REQUEST_REGISTER_SUCCESS';
export const REQUEST_REGISTER_FAILURE = 'REQUEST_REGISTER_FAILURE';

function requestRegister() {
  return {
    type: REQUEST_REGISTER_LOADING
  };
}

function receiveRegister() {
  return {
    type: REQUEST_REGISTER_SUCCESS
  };
}

function failureRegister(error) {
  return {
    type: REQUEST_REGISTER_FAILURE,
    error
  };
}

export function fetchRegister(user) {
  return (dispatch, getState) => {
    if (shouldFetchRegister(getState())) {
      return dispatch(fetchRegisterDo(user));
    }
  };
}

function shouldFetchRegister(state) {
  return !state.currentUser.loading && !state.currentUser.user;
}

function fetchRegisterDo(user) {
  return dispatch => {
    console.log('Fetch: Register');
    dispatch(requestRegister());

    return fetchDecorator(
      [
        fetchSuccessStatusDecorator
      ],
      request('post', apiRoutes.authRegister(), user)
    )
      .then((res) => {
        setUser(res.data.user);
        setToken(res.data.token);
        dispatch(receiveRegister());
        dispatch(push('/'));
      })
      .catch(err => {
        dispatch(failureRegister(err));
      });
  };
}
