import axios from 'axios';

import config from '../../../config/config';
import {
  fetchDecorator,
  fetchSuccessStatusDecorator,
  fetchProtectedAuth
} from '../decorators/index';

import { getToken } from '../../../services/localStore';

axios.interceptors.response.use(undefined, err => {
  const res = err.response;

  if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
    return Promise.resolve(res);
  }
});

export const REQUEST_DISPUTE_LIST_LOADING = 'REQUEST_DISPUTE_LIST_LOADING';
export const REQUEST_DISPUTE_LIST_SUCCESS = 'REQUEST_DISPUTE_LIST_SUCCESS';
export const REQUEST_DISPUTE_LIST_FAILURE = 'REQUEST_DISPUTE_LIST_FAILURE';

function requestDisputeList() {
  return {
    type: REQUEST_DISPUTE_LIST_LOADING
  };
}

function receiveDisputeList(list) {
  return {
    type: REQUEST_DISPUTE_LIST_SUCCESS,
    list
  };
}

function failureDisputeList(error) {
  return {
    type: REQUEST_DISPUTE_LIST_FAILURE,
    error
  };
}

export function fetchDisputeList(owner, status) {
  console.log('fetchDisputeList(', owner, status);
  return (dispatch, getState) => {
    if (shouldFetchDisputeList(getState())) {
      return dispatch(fetchDisputeListDo(owner, status));
    }
  };
}

function shouldFetchDisputeList() {
  return true;
}

function fetchDisputeListDo(owner, status) {
  return dispatch => {
    console.log('Fetch: DisputeList');
    dispatch(requestDisputeList());

    const token = getToken();

    return fetchDecorator(
      [
        resp => fetchProtectedAuth(resp, dispatch),
        fetchSuccessStatusDecorator
      ],
      axios.get(`${config.get('serverAPI')}dispute`, {
        params: { owner, status },
        headers: { Authorization: token }
      })
    )
      .then(res => {
        dispatch(receiveDisputeList(res.data));
      })
      .catch(err => {
        dispatch(failureDisputeList(err));
      });
  };
}
