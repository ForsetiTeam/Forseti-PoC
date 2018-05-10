import { push } from 'react-router-redux';
import axios from 'axios';

import config from '../../config/config';
import { setUser } from "../../services/localStore";
import {
  fetchDecorator,
  // fetchProtectedAuth,
  fetchSuccessStatusDecorator// ,
  // fetchFromJsonDecorator
} from './decorators';

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
  return !state.auth.loading && !state.auth.user;
}

function fetchRegisterDo(user) {
  return dispatch => {
    console.log('Fetch: Register');
    dispatch(requestRegister());

    return fetchDecorator(
      [
        // partial(fetchProtectedAuth, dispatch),
        // (...args) => fetchProtectedAuth(dispatch, ...args),
        fetchSuccessStatusDecorator// ,
      ],
      axios.post(`${config.get('serverAPI')}auth/register`, user)
    )
      .then((res) => {
        const resUser = res.data.user;
        setUser(resUser);
        dispatch(receiveRegister());
        dispatch(push('/'));
      })
      .catch(error => {
        dispatch(failureRegister(error.response.data));
      });
  };
}
