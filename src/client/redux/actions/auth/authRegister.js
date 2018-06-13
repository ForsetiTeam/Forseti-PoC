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

function receiveRegister(user) {
  return {
    type: REQUEST_REGISTER_SUCCESS,
    user
  };
}

function failureRegister(error, validatorError) {
  return {
    type: REQUEST_REGISTER_FAILURE,
    error,
    validatorError
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
      .then(res => {
        setUser(res.data.user);
        setToken(res.data.token);
        dispatch(receiveRegister(res.data.user));
        dispatch(push('/'));
      })
      .catch(error => {
        dispatch(failureRegister(error.message, error.errors));
      });
  };
}
